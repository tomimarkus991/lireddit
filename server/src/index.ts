import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection, ConnectionOptions } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Upvote } from "./entities/Upvote";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import path from "path";

const main = async () => {
  const config: ConnectionOptions = {
    type: "postgres",
    database: "lireddit",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: false,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Upvote],
  };
  try {
    let connection = await createConnection({ ...config });
    await connection.runMigrations();
  } catch (error) {
    console.log("Error while connecting to the database", error);
    return error;
  }

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }) as any
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "qowiueojwojfalksdjoqiwueo",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(5000, () => console.log("server started on localhost:5000"));
};

main().catch((err) => console.error(err));
