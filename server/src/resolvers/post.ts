import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";
import { Upvote } from "../entities/Upvote";

@InputType()
class PostInput {
  @Field()
  title!: string;
  @Field()
  text!: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() root: Post) {
    if (root.text.length >= 50) {
      return root.text.slice(0, 50) + "...";
    }
    return root.text;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg("postId", () => Int) postId: number,
    @Arg("value", () => Int) value: number,
    @Arg("voteStatus", () => Int) voteStatus: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpvote = value !== -1;
    const realValue = isUpvote ? 1 : -1;
    const { userId } = req.session;

    const upvote = await Upvote.findOne({ where: { postId, userId } });

    // the user has voted on the post before
    // and the are changing their vote

    if (upvote && upvote.value === realValue && upvote.value === voteStatus) {
      await getConnection().transaction(async (tm) => {
        // update post
        await tm.query(
          `
          update post
          set points = points - $1
          where id = $2
           `,
          [realValue, postId]
        );
        // update upvote
        await tm.query(
          `
          delete from upvote
          where "postId" = $1 and "userId" = $2
          `,
          [postId, userId]
        );
      });
    } else if (
      upvote &&
      upvote.value !== realValue &&
      upvote.value !== voteStatus
    ) {
      await getConnection().transaction(async (tm) => {
        // update upvote
        await tm.query(
          `
          update upvote
          set value = $1
          where "postId" = $2 and "userId" = $3
          `,
          [realValue, postId, userId]
        );
        // update post
        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
          `,
          [2 * realValue, postId]
        );
      });
    } else if (!upvote) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          insert into upvote ("userId","postId","value")
          values($1, $2, $3)
        `,
          [userId, postId, realValue]
        );
        await tm.query(
          `
        update post
        set points = points + $1
        where id = $2
        `,
          [realValue, postId]
        );
      });
    }
    return true;
  }

  // Get one Post
  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id, { relations: ["creator"] });
  }

  // Get all posts
  @Query(() => PaginatedPosts)
  async posts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(limit, 50);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];
    if (req.session.userId) {
      replacements.push(req.session.userId);
    }
    let cursorIndex = 3;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
      cursorIndex = replacements.length;
    }
    const posts = await getConnection().query(
      `
    select p.*,
    json_build_object(
      'id', u.id,
      'username', u.username,
      'email', u.email,
      'createdAt', u."createdAt",
      'updatedAt', u."updatedAt"
    ) creator,
    ${
      req.session.userId
        ? '(select value from upvote where "userId" = $2 and "postId" = p.id) "voteStatus"'
        : 'null as "voteStatus"'
    }
    from post p
    inner join public.user u on u.id = p."creatorId"
    ${cursor ? `where p."createdAt" < $${cursorIndex}` : ""}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );

    // const qb = getConnection()
    //   .getRepository(Post)
    //   .createQueryBuilder("p")
    //   .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
    //   .orderBy('p."createdAt"', "DESC")
    //   .take(realLimitPlusOne);
    // if (cursor) {
    //   qb.where('p."createdAt" < :cursor', {
    //     cursor: new Date(parseInt(cursor)),
    //   });
    // }
    // const posts = await qb.getMany();
    // test ds
    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  // Create post
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  // Update Post
  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("id") id: number,
    @Arg("input") input: PostInput
  ): Promise<Post | null> {
    const { title, text } = input;
    const post = await Post.findOne({ where: { id } });
    if (!post) {
      return null;
    } else if (typeof title !== "undefined" && title !== "") {
      Post.update({ id }, { title });
    }
    return post;
  }

  // Delete Post
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const post = await Post.findOne(id);
    if (!post) {
      return false;
    }
    if (post.creatorId !== req.session.userId) {
      throw new Error("Not authorized");
    }
    await Upvote.delete({ postId: id });

    await Post.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
