// apps/backend/src/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Avoid duplicate PrismaClient instances in dev (hot reload)
  // eslint-disable-next-line no-var
  var __PRISMA__: PrismaClient | undefined;
}

/**
 * Create Prisma client with environment‑aware logging and safe defaults.
 */
function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["error", "warn"]
        : ["error", "warn"], // keep dev logs clean; enable "query" only when debugging
    errorFormat: "pretty",
  });
}

// Reuse client in dev; create fresh in production
export const prisma = global.__PRISMA__ ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__PRISMA__ = prisma;
}

/**
 * Initialize Prisma safely.
 * - Ensures the client is connected before use
 * - Prevents multiple connections in dev
 * - Adds optional retry logic
 */
let initialized = false;

export async function initPrisma() {
  if (initialized) return prisma;

  try {
    await prisma.$connect();
    initialized = true;
    console.log("[prisma] connected");
  } catch (err) {
    console.error("[prisma] connection failed:", err);

    // Optional retry logic
    if (process.env.NODE_ENV !== "production") {
      console.log("[prisma] retrying in 2 seconds...");
      await new Promise((res) => setTimeout(res, 2000));
      return initPrisma();
    }

    throw err;
  }

  return prisma;
}

/**
 * Graceful shutdown for NestJS / Node
 */
process.on("beforeExit", async () => {
  try {
    await prisma.$disconnect();
    console.log("[prisma] disconnected");
  } catch (err) {
    console.error("[prisma] disconnect error:", err);
  }
});
