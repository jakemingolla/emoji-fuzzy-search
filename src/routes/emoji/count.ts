import { type Context } from ".";

const handler = async ({ db }: Context) => {
  const result = await db
    .selectFrom("emoji")
    .select((emoji) => emoji.fn.countAll().as("records"))
    .executeTakeFirst();

  return { records: result?.records || 0 };
};

export default handler;
