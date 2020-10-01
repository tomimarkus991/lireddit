import { __user__, __pass__, __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post],
  dbName: "lireddit",
  user: __user__,
  password: __pass__,
  type: "postgresql",
  debug: true,
} as Parameters<typeof MikroORM.init>[0];
