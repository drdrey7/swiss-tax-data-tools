#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeTaxDataset, packageNormalizedFolder, stableStringify, validateTaxDataset } from "./index.js";

function usage(): string {
  return [
    "Usage:",
    "  swiss-tax-data validate <file>",
    "  swiss-tax-data normalize <input> --out <output>",
    "  swiss-tax-data package <folder> --out <dist>"
  ].join("\n");
}

function getOption(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index === -1) {
    return undefined;
  }

  return args[index + 1];
}

async function readJson(file: string): Promise<unknown> {
  return JSON.parse(await readFile(file, "utf8")) as unknown;
}

async function validateCommand(file: string | undefined): Promise<number> {
  if (!file) {
    console.error(usage());
    return 2;
  }

  const input = await readJson(file);
  const result = validateTaxDataset(input);
  if (result.valid) {
    console.log(`Valid Swiss tax dataset: ${file}`);
    return 0;
  }

  console.error(`Invalid Swiss tax dataset: ${file}`);
  for (const issue of result.issues) {
    console.error(`- ${issue.path}: ${issue.message}`);
  }

  return 1;
}

async function normalizeCommand(inputFile: string | undefined, args: string[]): Promise<number> {
  const outFile = getOption(args, "--out");
  if (!inputFile || !outFile) {
    console.error(usage());
    return 2;
  }

  const input = await readJson(inputFile);
  const normalized = normalizeTaxDataset(input);
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, stableStringify(normalized), "utf8");
  console.log(`Wrote normalized dataset: ${outFile}`);
  return 0;
}

async function packageCommand(folder: string | undefined, args: string[]): Promise<number> {
  const outDir = getOption(args, "--out");
  if (!folder || !outDir) {
    console.error(usage());
    return 2;
  }

  const manifest = await packageNormalizedFolder(folder, outDir);
  console.log(`Packaged ${manifest.files.length} file(s): ${path.join(outDir, "manifest.json")}`);
  return 0;
}

async function main(): Promise<number> {
  const [, , command, firstArg, ...rest] = process.argv;
  const args = [firstArg, ...rest].filter((arg): arg is string => Boolean(arg));

  if (command === "validate") {
    return validateCommand(firstArg);
  }

  if (command === "normalize") {
    return normalizeCommand(firstArg, args);
  }

  if (command === "package") {
    return packageCommand(firstArg, args);
  }

  console.error(usage());
  return 2;
}

main()
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
