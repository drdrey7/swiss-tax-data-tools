# swiss-tax-data-tools

Open-source TypeScript tools for importing, validating, normalizing, and packaging official Swiss tax datasets for public Swiss salary and tax calculator projects.

Swiss tax data is hard because it is split across federal, cantonal, municipal, and sometimes church-tax sources. Formats vary by authority and year, municipalities can change, and public calculators need traceable source metadata rather than copied assumptions. This project helps developers prepare datasets safely; it does not provide official tax calculations by itself.

## Scope

- Validate source JSON files against a minimal public-safe data model.
- Normalize canton, tax year, municipality, and tax-type records into deterministic order.
- Package normalized JSON files with a deterministic `manifest.json`.
- Keep fixture/test data clearly marked as sample data.

## Non-goals

- No invented Swiss tax formulas.
- No fake official tables.
- No private product code, commercial logic, billing, secrets, Supabase, or storage configuration.
- No tax, legal, or financial advice.

Developers must verify official sources before using any dataset in production.

## Install

```sh
npm install
npm run build
```

The CLI binary is named `swiss-tax-data`.

## CLI Usage

Validate a source JSON file:

```sh
npx swiss-tax-data validate examples/sample-source-data.json
```

Normalize a source JSON file:

```sh
npx swiss-tax-data normalize examples/sample-source-data.json --out examples/normalized-output.json
```

Package normalized JSON files:

```sh
npx swiss-tax-data package examples --out dist-data
```

The package command copies normalized JSON files and writes a deterministic `manifest.json` with file names, SHA-256 hashes, byte sizes, and record counts.

## Data Model

Each dataset contains:

- `country`: must be `CH`
- `canton`: official two-letter canton code
- `tax_year`: integer tax year
- `municipality`: `id` and `name`
- `tax_type`: dataset tax category
- `source`: metadata including source name, official source URL, retrieval date, and checksum or content hash
- `records`: source records
- `is_fixture`: required for sample data

See [docs/data-model.md](docs/data-model.md) for the full model and validation rules.

## Why Codex Helps Maintain It

Codex can help maintainers add import adapters, write validation tests, update documentation, and review deterministic output changes. Human maintainers still need to verify official source URLs, legal usage terms, and tax-domain correctness.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Contributions should include source provenance, validation coverage, and deterministic output where applicable.

## Security

Do not submit secrets, private datasets, private infrastructure configuration, or commercial product logic. See [SECURITY.md](SECURITY.md).

## License

MIT
