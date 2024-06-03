import { Elysia, t } from "elysia";
import count from "./count";
import search from "./search";
import { db } from "../../database";

const app = new Elysia({ prefix: "/emoji" })
  .decorate("db", db)
  .get("/count", count)
  .get("/search", search, {
    query: t.Object({
      q: t.String(),
    }),
  });

export type Context = { db: typeof db; query: any };

export default app;
