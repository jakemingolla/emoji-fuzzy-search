import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("emoji")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("slug", "varchar", (col) => col.notNull().unique())
    .addColumn("group", "varchar", (col) => col.notNull())
    .addColumn("emoji_version", "varchar", (col) => col.notNull())
    .addColumn("unicode_version", "varchar", (col) => col.notNull())
    .addColumn("skin_tone_support", "boolean", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("emoji").execute();
}
