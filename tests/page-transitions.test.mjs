import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function read(relativePath) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

test("layout enables Astro client-side page transitions", async () => {
  const layout = await read("src/layouts/Layout.astro");

  assert.match(layout, /import\s+\{\s*ClientRouter\s*\}\s+from\s+"astro:transitions"/);
  assert.match(layout, /<ClientRouter\s*\/>/);
});

test("layout declares an explicit mobile viewport scale", async () => {
  const layout = await read("src/layouts/Layout.astro");

  assert.match(
    layout,
    /<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1"\s*\/>/,
  );
});

test("interactive components reinitialize on astro:page-load", async () => {
  const files = [
    "src/layouts/Layout.astro",
    "src/components/Header.astro",
    "src/components/Services.astro",
    "src/components/Contact.astro",
    "src/components/Quote.astro",
  ];

  for (const file of files) {
    const contents = await read(file);
    assert.match(
      contents,
      /astro:page-load/,
      `${file} should hook into astro:page-load`,
    );
  }
});

test("clients component does not rely on DOMContentLoaded for page transitions", async () => {
  const clients = await read("src/components/Clients.astro");
  assert.doesNotMatch(clients, /DOMContentLoaded/);
});
