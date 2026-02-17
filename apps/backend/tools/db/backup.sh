#!/bin/bash
set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backup_$TIMESTAMP.sql"

echo "📦 Creating backup: $BACKUP_FILE"

pg_dump \
  --dbname="$DATABASE_URL" \
  --format=plain \
  --no-owner \
  --no-privileges \
  > $BACKUP_FILE

echo "✅ Backup complete: $BACKUP_FILE"
