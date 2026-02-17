#!/bin/bash
set -e

echo "🚀 Running Prisma migrations in production..."

npx prisma migrate deploy

echo "✅ Migrations applied."
