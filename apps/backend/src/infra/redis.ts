import { createClient } from "redis";

const url = process.env.REDIS_URL || "redis://localhost:6379";

export const redisClient = createClient({ url });

redisClient.on("error", (err) => {
  console.error("Redis error:", err.message);
});

export async function initRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

export async function closeRedis() {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
}
