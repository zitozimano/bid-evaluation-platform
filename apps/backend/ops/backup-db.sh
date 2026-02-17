#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./ops/backup-db.sh postgres://user:pass@host:5432/dbname ./backups

DATABASE_URL="${1:-}"
BACKUP_DIR="${2:-./backups}"

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is required as first argument"
  exit 1
fi

mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
FILENAME="$BACKUP_DIR/db-backup-$TIMESTAMP.sql"

echo "Backing up to $FILENAME"
PGPASSWORD=$(echo "$DATABASE_URL" | sed -E 's/.*:(.*)@.*/\1/') \
pg_dump "$DATABASE_URL" > "$FILENAME"

echo "Backup complete."
