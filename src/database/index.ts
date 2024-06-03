import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { type DB } from "../types/database";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      user: "user",
      password: "pass",
      host: "localhost",
      database: "postgres",
    }),
  }),
  plugins: [new CamelCasePlugin()],
});
