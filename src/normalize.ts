import { SCHEMA_VERSION, type TaxDataset, type TaxRecord } from "./schema.js";
import { assertValidTaxDataset } from "./validate.js";

export function stableStringify(value: unknown): string {
  return `${stringifySorted(value, 0)}\n`;
}

function stringifySorted(value: unknown, depth: number): string {
  const indent = "  ".repeat(depth);
  const nextIndent = "  ".repeat(depth + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    return `[\n${value.map((item) => `${nextIndent}${stringifySorted(item, depth + 1)}`).join(",\n")}\n${indent}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(([, entryValue]) => entryValue !== undefined);
    if (entries.length === 0) {
      return "{}";
    }

    entries.sort(([left], [right]) => left.localeCompare(right));
    return `{\n${entries
      .map(([key, entryValue]) => `${nextIndent}${JSON.stringify(key)}: ${stringifySorted(entryValue, depth + 1)}`)
      .join(",\n")}\n${indent}}`;
  }

  return JSON.stringify(value) ?? "null";
}

function recordSortKey(record: TaxRecord): string {
  const municipality = record.municipality;
  const municipalityId = municipality?.id ?? "";
  const municipalityName = municipality?.name ?? "";
  const taxType = record.tax_type ?? "";

  return [municipalityId, municipalityName, taxType, stableStringify(record)].join("\u0000");
}

export function normalizeTaxDataset(input: unknown, options: { requireFixtureMarker?: boolean } = {}): TaxDataset {
  const dataset = assertValidTaxDataset(input, options);
  const records = [...dataset.records].sort((left, right) => recordSortKey(left).localeCompare(recordSortKey(right)));

  return {
    ...dataset,
    schema_version: dataset.schema_version ?? SCHEMA_VERSION,
    country: "CH",
    canton: dataset.canton,
    tax_year: dataset.tax_year,
    tax_type: dataset.tax_type,
    records
  };
}
