import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { SCHEMA_VERSION, type PackageManifest } from "./schema.js";
import { stableStringify } from "./normalize.js";

function sha256(buffer: Buffer): string {
  return createHash("sha256").update(buffer).digest("hex");
}

function countRecords(parsed: unknown): number {
  if (parsed && typeof parsed === "object" && Array.isArray((parsed as { records?: unknown }).records)) {
    return (parsed as { records: unknown[] }).records.length;
  }

  return 0;
}

export async function packageNormalizedFolder(folder: string, outDir: string): Promise<PackageManifest> {
  const entries = await readdir(folder, { withFileTypes: true });
  const jsonFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json") && entry.name !== "manifest.json")
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  await mkdir(outDir, { recursive: true });

  const files = [];
  for (const name of jsonFiles) {
    const sourcePath = path.join(folder, name);
    const outPath = path.join(outDir, name);
    const contents = await readFile(sourcePath);
    const parsed = JSON.parse(contents.toString("utf8")) as unknown;
    const normalizedBytes = Buffer.from(stableStringify(parsed), "utf8");

    await writeFile(outPath, normalizedBytes);

    files.push({
      name,
      sha256: sha256(normalizedBytes),
      bytes: normalizedBytes.byteLength,
      records_count: countRecords(parsed)
    });
  }

  const manifest: PackageManifest = {
    schema_version: SCHEMA_VERSION,
    files
  };

  await writeFile(path.join(outDir, "manifest.json"), stableStringify(manifest), "utf8");
  return manifest;
}
