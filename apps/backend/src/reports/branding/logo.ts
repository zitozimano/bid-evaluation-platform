import * as fs from "fs";
import * as path from "path";

export class LogoLoader {
  static async load(logoUrl?: string | null): Promise<Buffer | undefined> {
    try {
      if (logoUrl && fs.existsSync(logoUrl)) {
        return fs.readFileSync(logoUrl);
      }
    } catch (err) {
      console.error("Failed to load tenant logo:", err);
    }

    const fallback = path.join(
      __dirname,
      "../../../assets/default-logo.png"
    );

    if (fs.existsSync(fallback)) {
      return fs.readFileSync(fallback);
    }

    return undefined;
  }
}
