import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  db.schema
    .alterTable("emoji")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn("deleted_at", "timestamp")
    .execute();

  await sql`
    CREATE  FUNCTION update_emoji_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$ language 'plpgsql';
    `.execute(db);

  await sql`
    CREATE TRIGGER emoji_before_update
        BEFORE UPDATE
        ON
            emoji
        FOR EACH ROW
    EXECUTE PROCEDURE update_emoji_updated_at();
  `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`DROP TRIGGER emoji_before_update ON emoji;`.execute(db);
  await sql`DROP FUNCTION update_emoji_updated_at();`.execute(db);

  db.schema
    .alterTable("emoji")
    .dropColumn("created_at")
    .dropColumn("updated_at")
    .dropColumn("deleted_at")
    .execute();
}
