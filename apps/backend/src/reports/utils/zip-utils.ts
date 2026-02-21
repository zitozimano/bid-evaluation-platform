import archiver from "archiver";
import { Response } from "express";
import { createReadStream } from "fs";

export function streamZipToResponse(
  res: Response,
  files: { path: string; name: string }[],
  zipName: string
) {
  const archive = archiver("zip", { zlib: { level: 9 } });

  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", `attachment; filename="${zipName}"`);

  archive.pipe(res);

  for (const file of files) {
    archive.file(file.path, { name: file.name });
  }

  archive.finalize();
}
