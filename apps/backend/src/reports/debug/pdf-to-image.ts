import { fromPath } from "pdf2pic";
import * as fs from "fs";

export async function pdfToImage(pdfPath: string, outputDir: string) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const converter = fromPath(pdfPath, {
    density: 150,
    saveFilename: "page",
    savePath: outputDir,
    format: "png",
    width: 1200,
    height: 1600,
  });

  return await converter.bulk(-1); // convert all pages
}
