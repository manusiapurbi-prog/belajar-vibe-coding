import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";

const connectionUri =
  process.env.DATABASE_URL ||
  "mysql://root:@localhost:3306/belajar_vibe_coding";

const connectionPool = mysql.createPool({
  uri: connectionUri,
});

export const db = drizzle(connectionPool, { schema, mode: "default" });
export * from "./schema.js";
