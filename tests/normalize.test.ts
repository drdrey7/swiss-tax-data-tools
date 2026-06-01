import { describe, expect, it } from "vitest";
import sample from "../examples/sample-source-data.json";
import normalizedFixture from "../examples/normalized-output.json";
import { normalizeTaxDataset, stableStringify } from "../src/normalize.js";

describe("normalizeTaxDataset", () => {
  it("sorts records deterministically", () => {
    const normalized = normalizeTaxDataset(sample, { requireFixtureMarker: true });

    expect(normalized.records.map((record) => record.municipality?.id)).toEqual(["0001", "0261"]);
    expect(stableStringify(normalized)).toBe(stableStringify(normalizedFixture));
  });
});
