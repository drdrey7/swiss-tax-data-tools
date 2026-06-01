import { describe, expect, it } from "vitest";
import sample from "../examples/sample-source-data.json";
import { validateTaxDataset } from "../src/validate.js";

describe("validateTaxDataset", () => {
  it("passes the valid sample fixture", () => {
    const result = validateTaxDataset(sample, { requireFixtureMarker: true });

    expect(result.valid).toBe(true);
    expect(result.issues).toEqual([]);
  });

  it("rejects an invalid canton", () => {
    const result = validateTaxDataset({ ...sample, canton: "XX" });

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({ path: "canton", message: "Invalid Swiss canton code." });
  });

  it("rejects an invalid year", () => {
    const result = validateTaxDataset({ ...sample, tax_year: 1800 });

    expect(result.valid).toBe(false);
    expect(result.issues[0]?.path).toBe("tax_year");
  });

  it("rejects missing metadata", () => {
    const result = validateTaxDataset({ ...sample, source: undefined });

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({ path: "source", message: "Source metadata is required." });
  });

  it("rejects sample data without a fixture marker when required", () => {
    const { is_fixture: _isFixture, ...withoutFixtureMarker } = sample;

    const result = validateTaxDataset(withoutFixtureMarker, { requireFixtureMarker: true });

    expect(result.valid).toBe(false);
    expect(result.issues).toContainEqual({
      path: "is_fixture",
      message: "Sample/example data must be marked with is_fixture: true."
    });
  });
});
