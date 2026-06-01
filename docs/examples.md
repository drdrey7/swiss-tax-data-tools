# Examples

These examples use the fixture data in `examples/`. Fixture data is sample-only and is not official Swiss tax data.

## Validate fixture data

```sh
npm run build
node dist/cli.js validate examples/sample-source-data.json
```

Expected result:

```text
Valid Swiss tax dataset: examples/sample-source-data.json
```

Use this before accepting a source file into a data-preparation workflow.

## Normalize source data

```sh
node dist/cli.js normalize examples/sample-source-data.json --out /tmp/swiss-tax-data-normalized.json
```

The output JSON is deterministic:

- object keys are written in a stable order;
- records are sorted by municipality id, municipality name, tax type, and stable record content;
- fixture markers and source metadata are preserved.

## Package a folder

Create a folder with one or more normalized JSON files, then package it:

```sh
mkdir -p /tmp/swiss-tax-data-package-input
cp examples/normalized-output.json /tmp/swiss-tax-data-package-input/zh-2024-fixture.json
node dist/cli.js package /tmp/swiss-tax-data-package-input --out /tmp/swiss-tax-data-package
```

Expected result:

```text
Packaged 1 file(s): /tmp/swiss-tax-data-package/manifest.json
```

The output folder contains the normalized JSON files plus `manifest.json`.

## Read `manifest.json`

A manifest entry looks like this:

```json
{
  "files": [
    {
      "bytes": 748,
      "name": "zh-2024-fixture.json",
      "records_count": 2,
      "sha256": "..."
    }
  ],
  "schema_version": "1.0.0"
}
```

The manifest is intended for review and reproducibility. It records:

- file name;
- byte size;
- SHA-256 hash;
- record count;
- schema version.

Do not treat fixture package output as official tax data. Real datasets require verified official source metadata and human review before publication.
