import archiver from "archiver";
import { PassThrough } from "stream";

export async function zipFilesToBuffer(
  files: { path: string; name: string }[]
): Promise<Buffer> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = new PassThrough();

  const chunks: Buffer[] = [];

  stream.on("data", (chunk) => chunks.push(chunk));

  archive.pipe(stream);

  for (const file of files) {
    archive.file(file.path, { name: file.name });
  }

  await archive.finalize();

  return Buffer.concat(chunks);
}
