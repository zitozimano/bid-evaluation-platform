import { Injectable } from "@nestjs/common";
import archiver from "archiver";
import { createWriteStream } from "fs";
import { join } from "path";

@Injectable()
export class CouncilZipService {
  async generateCouncilZip(tenderId: string) {
    // Determine output path for the ZIP
    const outputPath = join(
      process.cwd(),
      "generated",
      `council-pack-${tenderId}.zip`
    );

    // Determine which files belong to this tender
    // You can replace this with your real file resolution logic
    const files: { path: string; name: string }[] = await this.resolveFilesForTender(
      tenderId
    );

    // Create ZIP archive
    const archive = archiver("zip", { zlib: { level: 9 } });
    const output = createWriteStream(outputPath);

    archive.pipe(output);

    for (const file of files) {
      archive.file(file.path, { name: file.name });
    }

    await archive.finalize();

    return outputPath;
  }

  // Stub — replace with your real implementation
  private async resolveFilesForTender(
    tenderId: string
  ): Promise<{ path: string; name: string }[]> {
    return [];
  }
}
