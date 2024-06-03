echo "Enter description for migration?"
echo ""
read description

description=$(echo $description | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
file_name=src/database/migrations/$(date +"%Y-%m-%dT%H:%M:%S")-$description.ts

cat > $file_name <<- EOM
import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
EOM

echo ""
echo "Created the following migration: $file_name"
