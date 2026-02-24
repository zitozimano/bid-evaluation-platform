import { readFile } from 'fs/promises';

export class LogoLoader {
  static async load(urlOrPath?: string | null): Promise<Buffer | undefined> {
    if (!urlOrPath) {
      return undefined;
    }

    // Minimal implementation!: treat as local path if it looks like one.
    try {
      if (urlOrPath.startsWith('/') || urlOrPath.startsWith('./')) {
        return await readFile(urlOrPath);
      }

      // For now, ignore remote URLs and just skip logo instead of failing.
      return undefined;
    } catch {
      return undefined;
    }
  }
}
