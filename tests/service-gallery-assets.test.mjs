import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

import { services } from "../src/data/services.ts";
import { outputs } from "../scripts/service-gallery-manifest.mjs";

const assetsDir = path.resolve(
  process.cwd(),
  "src/assets/images/site/Servicios",
);
const servicesComponentPath = path.resolve(
  process.cwd(),
  "src/components/Services.astro",
);

test("service galleries expose five avif assets per service with stable names", async () => {
  assert.equal(services.length, 6, "expected 6 configured services");

  for (const service of services) {
    assert.equal(
      service.images.length,
      5,
      `service ${service.id} should expose exactly 5 gallery images`,
    );

    for (const [index, image] of service.images.entries()) {
      assert.match(
        image,
        new RegExp(`^${service.id}-0${index + 1}-[a-z0-9-]+\\.avif$`),
        `service ${service.id} image ${index + 1} should use a stable AVIF filename`,
      );

      const imagePath = path.join(assetsDir, image);
      await fs.access(imagePath);
    }
  }
});

test("service gallery manifest does not reuse the same source image", () => {
  const seen = new Map();

  for (const output of outputs) {
    const previous = seen.get(output.source);

    assert.equal(
      previous,
      undefined,
      `source ${output.source} is reused by ${previous} and ${output.file}`,
    );

    seen.set(output.source, output.file);
  }
});

test("service cards surface gallery imagery before opening the modal", async () => {
  const component = await fs.readFile(servicesComponentPath, "utf8");

  assert.match(component, /service-card-media/);
  assert.match(component, /service\.images\[0\]/);
  assert.match(component, /service\.images\.slice\(1,\s*4\)/);
  assert.match(component, /5 fotos/);
});

test("service modal gives the main gallery image a large editorial crop", async () => {
  const component = await fs.readFile(servicesComponentPath, "utf8");

  assert.match(component, /id="modal-main-image"[^>]*class="[^"]*object-cover/);
});

test("services section renders marketing content without entrance opacity dependencies", async () => {
  const component = await fs.readFile(servicesComponentPath, "utf8");

  assert.doesNotMatch(component, /animate-fade-in-(up|down)/);
  assert.doesNotMatch(component, /animate-delay-/);
});
