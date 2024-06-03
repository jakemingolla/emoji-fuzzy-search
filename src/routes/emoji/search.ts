import { type Context } from ".";
import { sql } from "kysely";
import { t } from "elysia";

const handler = async ({ db, query }: Context) => {
  const results = await db
    .selectFrom("emoji")
    .selectAll()
    // TODO injection attack
    .orderBy(sql`SIMILARITY(name, ${query.q})`, "desc")
    .limit(5)
    .execute();

  return Response.json({ results });
};

export default handler;
