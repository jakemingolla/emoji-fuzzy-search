import data from "../data/emojis.json";
import { db } from "../src/database";

async function main() {
  await db.deleteFrom("emoji").execute();

  for await (const [value, rest] of Object.entries(data)) {
    await db
      .insertInto("emoji")
      .values({
        value,
        ...rest,
      })
      .execute();
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
