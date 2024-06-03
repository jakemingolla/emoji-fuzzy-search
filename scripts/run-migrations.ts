import * as path from "path";
import { Pool } from "pg";
import { promises as fs } from "fs";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
  type MigrationResult,
} from "kysely";
import { db } from "../src/database";

async function migrateToLatest() {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "../src/database/migrations"),
    }),
  });

  let error: unknown;
  let results: MigrationResult[] | undefined;
  if (Bun.argv.includes("--up-to-latest")) {
    ({ error, results } = await migrator.migrateToLatest());
  } else if (Bun.argv.includes("--up")) {
    ({ error, results } = await migrator.migrateUp());
  } else if (Bun.argv.includes("--down")) {
    ({ error, results } = await migrator.migrateDown());
  } else {
    throw new Error(
      "Invalid `migration:run` command. Use either '--up-to-latest', '--up', or '--down'.",
    );
  }

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`Failed to execute migration "${it.migrationName}"`);
    }
  });

  if (results?.length === 0) {
    console.log("Up to date - no migrations were executed.");
  }

  if (error) {
    console.error("Failed to migrate:");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
