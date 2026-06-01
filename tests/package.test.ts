import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import normalizedFixture from "../examples/normalized-output.json";
import { packageNormalizedFolder } from "../src/package.js";
import { stableStringify } from "../src/normalize.js";

describe("packageNormalizedFolder", () => {
  it("creates manifest.json", async () => {
    const inputDir = await mkdtemp(path.join(tmpdir(), "swiss-tax-data-input-"));
    const outDir = await mkdtemp(path.join(tmpdir(), "swiss-tax-data-out-"));
    await writeFile(path.join(inputDir, "zh-2024.json"), stableStringify(normalizedFixture), "utf8");

    const manifest = await packageNormalizedFolder(inputDir, outDir);
    const manifestFile = JSON.parse(await readFile(path.join(outDir, "manifest.json"), "utf8")) as unknown;

    expect(manifest.files).toHaveLength(1);
    expect(manifestFile).toEqual(manifest);
  });

  it("package output is deterministic", async () => {
    const inputDir = await mkdtemp(path.join(tmpdir(), "swiss-tax-data-input-"));
    const outDirA = await mkdtemp(path.join(tmpdir(), "swiss-tax-data-out-a-"));
    const outDirB = await mkdtemp(path.join(tmpdir(), "swiss-tax-data-out-b-"));
    await writeFile(path.join(inputDir, "zh-2024.json"), stableStringify(normalizedFixture), "utf8");

    await packageNormalizedFolder(inputDir, outDirA);
    await packageNormalizedFolder(inputDir, outDirB);

    const manifestA = await readFile(path.join(outDirA, "manifest.json"), "utf8");
    const manifestB = await readFile(path.join(outDirB, "manifest.json"), "utf8");
    const dataA = await readFile(path.join(outDirA, "zh-2024.json"), "utf8");
    const dataB = await readFile(path.join(outDirB, "zh-2024.json"), "utf8");

    expect(manifestA).toBe(manifestB);
    expect(dataA).toBe(dataB);
  });
});
