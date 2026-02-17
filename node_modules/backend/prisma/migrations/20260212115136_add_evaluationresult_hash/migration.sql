/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `EvaluationResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `EvaluationResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EvaluationResult" ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationResult_hash_key" ON "EvaluationResult"("hash");
