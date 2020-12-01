import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Field } from "type-graphql";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Upvote extends BaseEntity {
  @Column({ type: "int" })
  value: number;
  @Field()
  @PrimaryColumn()
  userID: number;

  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @PrimaryColumn()
  postID: number;

  @ManyToOne(() => Post, (post) => post.upvotes)
  post: Post;
}
