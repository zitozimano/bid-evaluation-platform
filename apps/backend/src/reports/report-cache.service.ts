import { Injectable } from "@nestjs/common";

interface CacheEntry {
  buffer: Buffer;
  mime: string;
  filename: string;
  expiresAt: number;
}

@Injectable()
export class ReportCacheService {
  private cache = new Map<string, CacheEntry>();
  private readonly TTL_MS = 5 * 60_000; // 5 minutes

  private makeKey(type: string, tenderId: string, runHash?: string) {
    return `${type}::${tenderId}::${runHash ?? "nohash"}`;
  }

  set(type: string, tenderId: string, runHash: string | null, buffer: Buffer, mime: string, filename: string) {
    const key = this.makeKey(type, tenderId, runHash ?? undefined);

    this.cache.set(key, {
      buffer,
      mime,
      filename,
      expiresAt: Date.now() + this.TTL_MS,
    });
  }

  get(type: string, tenderId: string, runHash: string | null) {
    const key = this.makeKey(type, tenderId, runHash ?? undefined);
    const entry = this.cache.get(key);

    if (!entry) return null;
    if (entry.expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }

  invalidateTender(tenderId: string) {
    for (const key of this.cache.keys()) {
      if (key.includes(`::${tenderId}::`)) {
        this.cache.delete(key);
      }
    }
  }
}
