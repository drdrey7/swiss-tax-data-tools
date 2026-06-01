# Changelog

All notable changes to this project will be documented in this file.

This project follows a simple release-note format while it is early-stage.

## v0.1.0 - Initial toolkit

Initial public release foundation for `swiss-tax-data-tools`.

### Added

- CLI command: `swiss-tax-data validate <file>`.
- CLI command: `swiss-tax-data normalize <input> --out <output>`.
- CLI command: `swiss-tax-data package <folder> --out <dist>`.
- Minimal schema validation for Swiss tax source-data files.
- Valid Swiss canton-code validation.
- Required source metadata checks.
- Fixture-marker validation for sample/example data.
- Deterministic normalization of records.
- Deterministic package output with `manifest.json`.
- Fixture examples for source and normalized data.
- Vitest coverage for validation, normalization, and packaging.
- GitHub Actions CI for install, typecheck, test, and build.
- Documentation for data model, official-source categories, roadmap, examples, releases, contribution, and security.

### Notes

- No official datasets are bundled.
- No Swiss tax formulas are implemented.
- Fixture data is sample-only and must not be treated as official tax data.
