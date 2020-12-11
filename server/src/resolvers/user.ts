import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { UsernameAndPasswordInput } from "./UsernameAndPasswordInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection } from "typeorm";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // this is the current user Tomi and its ok to show Tomi his email
    if (req.session.userID === user.id) {
      return user.email;
    }
    // current user wants to see someone elses email so it will be empty
    return "";
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 6) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "Password length has to be greater than 6",
          },
        ],
      };
    }

    const key = FORGET_PASSWORD_PREFIX + token;
    const userID = await redis.get(key);

    if (!userID) {
      return {
        errors: [
          {
            field: "token",
            message: "Token not valid",
          },
        ],
      };
    }

    const userIDNum = parseInt(userID);
    const user = await User.findOne({ where: { userIDNum } });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User no longer exists",
          },
        ],
      };
    }
    const newHashedPassword = await argon2.hash(newPassword);
    await User.update({ id: userIDNum }, { password: newHashedPassword });

    redis.del(key);

    // log in user after changing the password
    req.session.userID = user.id;

    return { user };
  }

  @Mutation(() => String)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // email is not in the db
      return "Check your email";
    }
    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    ); // 3 days
    let text = `<a href="http://localhost:3000/change-password/${token}">reset password</a>`;
    await sendEmail(email, text);
    return "Check your email";
  }

  // Me
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.userID) {
      return null;
    }

    return User.findOne(req.session.userID);
  }

  // Register
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernameAndPasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning("*")
        .execute();
      user = result.raw[0];
      // user = await User.create({
      //   username: options.username,
      //   email: options.email,
      //   password: hashedPassword,
      // }).save();
    } catch (error) {
      if (error.code === "23505") {
        if (error.detail.includes("username")) {
          return {
            errors: [
              {
                field: "username",
                message: "Username already taken",
              },
            ],
          };
        } else if (error.detail.includes("email")) {
          return {
            errors: [
              {
                field: "email",
                message: "Email already taken",
              },
            ],
          };
        }
      }
    }
    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userID = user.id;

    return { user };
  }
  // Login
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") UsernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      UsernameOrEmail.includes("@")
        ? { where: { email: UsernameOrEmail } }
        : { where: { username: UsernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that username or email doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "username or password incorrect",
          },
        ],
      };
    }
    req.session.userID = user.id;
    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
