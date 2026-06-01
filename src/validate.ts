import { isValidCantonCode, type TaxDataset, type TaxRecord, type ValidationIssue, type ValidationResult } from "./schema.js";

const MIN_TAX_YEAR = 1900;
const MAX_TAX_YEAR = 2200;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasFixtureMarker(value: Record<string, unknown>): boolean {
  return value.is_fixture === true;
}

function validateMunicipality(value: unknown, path: string, issues: ValidationIssue[]): void {
  if (!isPlainObject(value)) {
    issues.push({ path, message: "Municipality must be an object." });
    return;
  }

  if (!isNonEmptyString(value.id)) {
    issues.push({ path: `${path}.id`, message: "Municipality id is required." });
  }

  if (!isNonEmptyString(value.name)) {
    issues.push({ path: `${path}.name`, message: "Municipality name is required." });
  }
}

function validateSource(value: unknown, issues: ValidationIssue[]): void {
  if (!isPlainObject(value)) {
    issues.push({ path: "source", message: "Source metadata is required." });
    return;
  }

  if (!isNonEmptyString(value.name)) {
    issues.push({ path: "source.name", message: "Source name is required." });
  }

  if (!isNonEmptyString(value.official_url)) {
    issues.push({ path: "source.official_url", message: "Official source URL is required." });
  }

  if (!isNonEmptyString(value.retrieved_at)) {
    issues.push({ path: "source.retrieved_at", message: "Source retrieval date is required." });
  }

  if (!isNonEmptyString(value.checksum) && !isNonEmptyString(value.content_hash)) {
    issues.push({ path: "source", message: "Source checksum or content_hash is required." });
  }
}

function validateRecords(records: unknown, datasetHasMunicipality: boolean, issues: ValidationIssue[]): void {
  if (!Array.isArray(records)) {
    issues.push({ path: "records", message: "Records must be an array." });
    return;
  }

  records.forEach((record: unknown, index: number) => {
    if (!isPlainObject(record)) {
      issues.push({ path: `records.${index}`, message: "Record must be an object." });
      return;
    }

    if (!datasetHasMunicipality) {
      validateMunicipality((record as TaxRecord).municipality, `records.${index}.municipality`, issues);
    }
  });
}

export function validateTaxDataset(input: unknown, options: { requireFixtureMarker?: boolean } = {}): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!isPlainObject(input)) {
    return { valid: false, issues: [{ path: "$", message: "Dataset must be a JSON object." }] };
  }

  if (input.country !== "CH") {
    issues.push({ path: "country", message: "Country must be CH." });
  }

  if (!isValidCantonCode(input.canton)) {
    issues.push({ path: "canton", message: "Invalid Swiss canton code." });
  }

  const taxYear = input.tax_year;
  if (typeof taxYear !== "number" || !Number.isInteger(taxYear) || taxYear < MIN_TAX_YEAR || taxYear > MAX_TAX_YEAR) {
    issues.push({ path: "tax_year", message: `Tax year must be an integer from ${MIN_TAX_YEAR} to ${MAX_TAX_YEAR}.` });
  }

  if (!isNonEmptyString(input.tax_type)) {
    issues.push({ path: "tax_type", message: "Tax type is required." });
  }

  const datasetHasMunicipality = input.municipality !== undefined;
  if (datasetHasMunicipality) {
    validateMunicipality(input.municipality, "municipality", issues);
  }

  validateSource(input.source, issues);
  validateRecords(input.records, datasetHasMunicipality, issues);

  if (options.requireFixtureMarker && !hasFixtureMarker(input)) {
    issues.push({ path: "is_fixture", message: "Sample/example data must be marked with is_fixture: true." });
  }

  return { valid: issues.length === 0, issues };
}

export function assertValidTaxDataset(input: unknown, options: { requireFixtureMarker?: boolean } = {}): TaxDataset {
  const result = validateTaxDataset(input, options);
  if (!result.valid) {
    const details = result.issues.map((issue) => `${issue.path}: ${issue.message}`).join("\n");
    throw new Error(`Invalid tax dataset:\n${details}`);
  }

  return input as TaxDataset;
}
