export const SCHEMA_VERSION = "1.0.0";

export const VALID_CANTON_CODES = [
  "AG",
  "AI",
  "AR",
  "BE",
  "BL",
  "BS",
  "FR",
  "GE",
  "GL",
  "GR",
  "JU",
  "LU",
  "NE",
  "NW",
  "OW",
  "SG",
  "SH",
  "SO",
  "SZ",
  "TG",
  "TI",
  "UR",
  "VD",
  "VS",
  "ZG",
  "ZH"
] as const;

export type CantonCode = (typeof VALID_CANTON_CODES)[number];

export interface Municipality {
  id: string;
  name: string;
}

export interface SourceMetadata {
  name: string;
  official_url: string;
  retrieved_at: string;
  checksum?: string;
  content_hash?: string;
}

export interface TaxRecord {
  municipality?: Municipality;
  tax_type?: string;
  [key: string]: unknown;
}

export interface TaxDataset {
  schema_version?: string;
  country: "CH";
  canton: CantonCode;
  tax_year: number;
  municipality?: Municipality;
  tax_type: string;
  source: SourceMetadata;
  is_fixture?: boolean;
  records: TaxRecord[];
}

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface PackageManifestFile {
  name: string;
  sha256: string;
  bytes: number;
  records_count: number;
}

export interface PackageManifest {
  schema_version: string;
  files: PackageManifestFile[];
}

export function isValidCantonCode(value: unknown): value is CantonCode {
  return typeof value === "string" && VALID_CANTON_CODES.includes(value as CantonCode);
}
