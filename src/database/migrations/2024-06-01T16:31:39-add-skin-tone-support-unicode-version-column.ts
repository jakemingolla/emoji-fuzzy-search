import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("emoji")
    .addColumn("skin_tone_support_unicode_version", "text")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("emoji")
    .dropColumn("skin_tone_support_unicode_version");
}
