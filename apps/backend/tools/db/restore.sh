#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "❌ Usage: ./restore.sh <backup-file.sql>"
  exit 1
fi

echo "♻ Restoring database from $1..."

psql "$DATABASE_URL" < "$1"

echo "✅ Restore complete."
