import fs from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import {
  OUTPUT_DIR,
  SOURCE_CACHE_DIR,
  outputs,
  sources,
} from "./service-gallery-manifest.mjs";

const repoRoot = process.cwd();
const sourceCacheDir = path.join(repoRoot, SOURCE_CACHE_DIR);
const outputDir = path.join(repoRoot, OUTPUT_DIR);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function resolveSourceExtension(source) {
  if (source.type === "local") {
    return path.extname(source.path) || ".jpg";
  }

  const pathname = new URL(source.url).pathname;
  return path.extname(pathname) || ".jpg";
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function materializeSource(key, source) {
  if (source.type === "local") {
    return path.join(repoRoot, source.path);
  }

  const ext = resolveSourceExtension(source);
  const cachePath = path.join(sourceCacheDir, `${key}${ext}`);

  if (await fileExists(cachePath)) {
    return cachePath;
  }

  const response = await fetch(source.url);
  if (!response.ok) {
    throw new Error(`Failed to download ${key}: ${response.status} ${response.statusText}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(cachePath, buffer);
  return cachePath;
}

function toExtractPixels(metadata, extract) {
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  const left = Math.max(0, Math.floor(width * extract.left));
  const top = Math.max(0, Math.floor(height * extract.top));
  const extractWidth = Math.max(1, Math.floor(width * extract.width));
  const extractHeight = Math.max(1, Math.floor(height * extract.height));

  return {
    left,
    top,
    width: Math.min(extractWidth, width - left),
    height: Math.min(extractHeight, height - top),
  };
}

async function buildOutput(config) {
  const source = sources[config.source];
  if (!source) {
    throw new Error(`Unknown source "${config.source}" for ${config.file}`);
  }

  const sourcePath = await materializeSource(config.source, source);
  let pipeline = sharp(sourcePath, { failOn: "none" });
  const metadata = await pipeline.metadata();

  if (config.extract) {
    pipeline = pipeline.extract(toExtractPixels(metadata, config.extract));
  }

  if (config.modulate) {
    pipeline = pipeline.modulate(config.modulate);
  }

  pipeline = pipeline
    .resize(1280, 853, {
      fit: "cover",
      position: config.position ?? "attention",
      withoutEnlargement: false,
    })
    .sharpen();

  const outputPath = path.join(outputDir, config.file);
  await pipeline.avif({ quality: 72, effort: 6 }).toFile(outputPath);
  return outputPath;
}

async function main() {
  await ensureDir(sourceCacheDir);
  await ensureDir(outputDir);

  for (const output of outputs) {
    const outputPath = await buildOutput(output);
    console.log(`generated ${path.relative(repoRoot, outputPath)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
