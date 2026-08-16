import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const require = createRequire(import.meta.url);

async function renderFirstPage(pdfPath, outPath, scale = 1.5) {
  const data = new Uint8Array(await fs.readFile(pdfPath));
  const loadingTask = getDocument({
    data,
    useSystemFonts: true,
    disableWorker: true,
  });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext("2d");

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  await fs.writeFile(outPath, await canvas.encode("png"));
  console.log(`Wrote ${outPath} (${Math.ceil(viewport.width)}x${Math.ceil(viewport.height)})`);
}

const root = path.resolve("public/ypl");
const files = [
  ["Data.pdf", "data-cover.png"],
  ["DRK.pdf", "drk-cover.png"],
  ["Campaign.pdf", "campaign-cover.png"],
];

for (const [pdfName, coverName] of files) {
  await renderFirstPage(path.join(root, pdfName), path.join(root, coverName));
}

console.log("Done");
