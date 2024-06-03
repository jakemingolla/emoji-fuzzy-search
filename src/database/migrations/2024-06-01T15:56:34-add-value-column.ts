import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .alterTable("emoji")
    .addColumn("value", "text", (col) => col.notNull().unique())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  db.schema.alterTable("emoji").dropColumn("value").execute();
}
