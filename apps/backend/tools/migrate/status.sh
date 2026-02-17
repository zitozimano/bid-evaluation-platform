#!/bin/bash
set -e

echo "📊 Checking migration status..."

npx prisma migrate status

echo "✅ Status check complete."
