# Data Model

`swiss-tax-data-tools` uses a minimal schema that is safe for open-source repositories and public Swiss salary or tax calculator projects. The schema describes source datasets; it does not encode official tax calculations.

## Dataset Fields

- `schema_version`: optional in source input, added during normalization.
- `country`: must be `CH`.
- `canton`: one of `AG`, `AI`, `AR`, `BE`, `BL`, `BS`, `FR`, `GE`, `GL`, `GR`, `JU`, `LU`, `NE`, `NW`, `OW`, `SG`, `SH`, `SO`, `SZ`, `TG`, `TI`, `UR`, `VD`, `VS`, `ZG`, `ZH`.
- `tax_year`: integer tax year.
- `municipality`: optional dataset-level municipality with `id` and `name`.
- `tax_type`: source dataset category, for example ordinary tax, withholding tax, or a fixture-only test category.
- `source`: required source metadata.
- `is_fixture`: must be `true` for sample, fixture, or test data.
- `records`: array of source records.

## Source Metadata

`source` must include:

- `name`
- `official_url`
- `retrieved_at`
- `checksum` or `content_hash`

The tool validates that these fields exist. Maintainers must still verify that the source is official, current, legally reusable, and appropriate for the intended tax year.

## Fixture vs Official Data

Fixture data is sample data used for tests, examples, and documentation. It must be marked with `is_fixture: true` and must not be presented as official Swiss tax data.

Official data should come from verified public authorities or authorized official distribution channels. Do not add generated, guessed, scraped without permission, or proprietary datasets.

## Deterministic Normalization

Normalization:

- Adds `schema_version` when missing.
- Preserves source metadata.
- Sorts records by municipality id, municipality name, tax type, and stable record content.
- Writes JSON with sorted object keys and two-space indentation.

This makes diffs reviewable and package outputs reproducible.

## Validation Rules

Validation rejects:

- Invalid canton code.
- Invalid tax year.
- Missing source metadata.
- Missing source checksum or content hash.
- Missing municipality `id` or `name` when records are municipality-scoped.
- Sample/example data that is not marked as fixture when fixture validation is required.

## No Official Tax Calculations

This project does not calculate tax liability, implement official formulas, or provide tax/legal advice. Developers must verify official sources and calculation logic independently.
