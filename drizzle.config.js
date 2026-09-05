import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "mysql://root:@localhost:3306/belajar_vibe_coding",
  },
});
