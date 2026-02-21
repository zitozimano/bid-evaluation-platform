import { pdfToImage } from "./pdf-to-image";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import * as fs from "fs";

export async function diffPdfs(
  pdfA: string,
  pdfB: string,
  outputDir: string
) {
  const aDir = `${outputDir}/a`;
  const bDir = `${outputDir}/b`;
  const diffDir = `${outputDir}/diff`;

  await pdfToImage(pdfA, aDir);
  await pdfToImage(pdfB, bDir);

  if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
  }

  const pages = fs.readdirSync(aDir);

  for (const page of pages) {
    const imgA = PNG.sync.read(fs.readFileSync(`${aDir}/${page}`));
    const imgB = PNG.sync.read(fs.readFileSync(`${bDir}/${page}`));

    const { width, height } = imgA;
    const diff = new PNG({ width, height });

    pixelmatch(
      imgA.data,
      imgB.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    fs.writeFileSync(`${diffDir}/${page}`, PNG.sync.write(diff));
  }

  return diffDir;
}
