# Codex for OSS Application Draft

This document is a paste-ready draft for the OpenAI Codex for OSS application. It intentionally avoids private information, exaggerated adoption claims, and any claim that the project is official.

## Project Description

`swiss-tax-data-tools` is a new open-source TypeScript toolkit for developers building public Swiss salary or tax calculator projects. It provides a small CLI and library to validate, normalize, and package Swiss tax source datasets with clear provenance and deterministic outputs.

The project does not bundle official datasets and does not implement Swiss tax formulas. Its first goal is to make data preparation safer and more reviewable: contributors can mark fixtures clearly, attach source metadata, normalize records in a stable order, and package output with a reproducible manifest.

## Why Swiss Tax Data Tooling Matters

Swiss tax data is fragmented across federal, cantonal, municipal, and sometimes church-tax sources. Formats, terminology, municipality identifiers, tax years, and publication practices vary. Public calculators need a careful data pipeline so maintainers can review provenance, detect accidental fixture use, and avoid untraceable copied assumptions.

A small, honest toolkit helps civic-tech and open-data developers separate data preparation from tax calculation logic. That separation matters because tax formulas and official datasets must be verified independently from official sources.

## Maintainer Role

André is the project maintainer. The maintainer role is to keep the repository public-safe, review schema and validation changes, verify that examples stay marked as fixtures, maintain documentation, and require source provenance for any future real-data adapters.

The maintainer will not treat Codex output as authoritative tax guidance. Human review remains required for official source verification, legal reuse terms, and domain correctness.

## Why the Project Is Useful Despite Being New

The repository is new, so it should not claim adoption, production use, stars, downloads, or official endorsement. Its usefulness is practical and scoped:

- It provides a working CLI for `validate`, `normalize`, and `package`.
- It includes tests for schema validation and deterministic output.
- It documents fixture data versus official data.
- It gives contributors a safe structure for future import adapters.
- It makes the public-safety boundaries explicit from the start.

That makes it a credible foundation for an OSS project even before it has a community.

## How Codex Will Help Maintain It

Codex can help maintain the project by:

- drafting import adapter skeletons for specific official source formats;
- expanding validation tests and edge cases;
- generating JSON Schema exports from the TypeScript model;
- improving CLI ergonomics and error messages;
- reviewing diffs for deterministic-output regressions;
- keeping documentation, examples, and release checklists up to date;
- helping triage contributor issues into small, testable tasks.

Codex is especially useful here because the project benefits from many small, careful, repeatable changes rather than one large implementation.

## How API Credits Would Be Used

API credits would be used for public OSS maintenance work only:

- implementing and testing source-adapter prototypes;
- writing and improving validation rules;
- generating tests for edge cases and deterministic packaging;
- reviewing documentation for clarity and safety;
- preparing contributor-friendly issue templates and examples;
- checking changes for accidental private or non-public data inclusion.

Credits would not be used to submit applications automatically, to process private product code, or to generate unverified official tax data.

## Current Status

Current release target: `v0.1.0` initial toolkit.

Implemented:

- TypeScript CLI and library structure.
- `validate`, `normalize`, and `package` commands.
- Minimal Swiss tax source-data schema.
- Deterministic JSON output and manifest generation.
- Fixture examples clearly labelled as non-official sample data.
- Vitest coverage and GitHub Actions CI.
- Security, contribution, data-model, source, and roadmap documentation.

## Roadmap

Near-term roadmap:

- JSON Schema export.
- Checksum verification helper.
- ESTV/FTA source adapter research.
- Canton source adapter template.
- Municipality history helper.
- Better examples for contributor-submitted datasets.

All roadmap items require human verification of official sources and reuse terms before real data is published.

## Public Benefit

The project can help open-source Swiss salary and tax calculator maintainers build safer public data pipelines. It encourages traceable metadata, deterministic outputs, fixture labelling, and reviewable changes. This reduces the risk of mixing test data with real data or relying on undocumented transformations.

## Honest Limitations

- The project is new and has no claimed adoption.
- It is not official and is not affiliated with Swiss authorities.
- It does not provide tax, legal, or financial advice.
- It does not calculate taxes by itself.
- It does not bundle official datasets.
- It cannot replace human verification of official source material.
- Future adapters may require careful review of source licences and publication terms.

## Short Form Field Versions

### Project description, under 500 characters

`swiss-tax-data-tools` is a new TypeScript OSS toolkit for validating, normalizing, and packaging Swiss tax source datasets for public calculator projects. It focuses on provenance, fixture labelling, deterministic output, and safe contribution workflows. It does not bundle official datasets or calculate taxes.

### Why it matters, under 500 characters

Swiss tax data is fragmented across federal, cantonal, municipal, and other sources. Public calculator projects need traceable, reproducible data preparation so maintainers can review changes and avoid guessed formulas or unmarked fixture data. This project provides a small, safe foundation for that workflow.

### Maintainer role, under 500 characters

André maintains the project, reviews schema and documentation changes, keeps examples public-safe, and requires provenance for future real-data adapters. The maintainer verifies that Codex-assisted changes remain honest, tested, deterministic, and do not claim official status or unverified adoption.

### How Codex will help, under 500 characters

Codex will help implement small adapter prototypes, expand validation tests, improve CLI error messages, generate JSON Schema exports, update docs, and review deterministic-output changes. Human review will still verify official sources, legal reuse terms, and tax-domain correctness.

### How API credits would be used, under 500 characters

API credits would support public OSS maintenance: source-adapter prototypes, validation rules, deterministic packaging tests, documentation improvements, and safety reviews for accidental private or non-public data. Credits would not be used to submit forms, process private product code, or invent tax data.

### Limitations, under 500 characters

The project is new, unofficial, and has no claimed adoption. It does not calculate taxes, provide legal or financial advice, or bundle official datasets. Developers must verify official sources, reuse terms, and calculation logic independently before using any dataset in production.
