# Codex for OSS Application Draft

## Project Description

`swiss-tax-data-tools` is a standalone TypeScript Node.js toolkit for validating, normalizing, and packaging official Swiss tax datasets for public Swiss salary and tax calculator projects.

## Why It Matters

Swiss tax data is distributed across federal, cantonal, municipal, and other official sources. Public calculator projects need reproducible data preparation, clear provenance, and reviewable changes instead of untraceable copies or guessed formulas.

## Maintainer Role

Maintainers review schema changes, verify official source metadata, keep fixtures clearly marked, and ensure the repository remains public-safe.

## How Codex Will Help

Codex can help add import adapters, expand validation coverage, update documentation, create deterministic test fixtures, and review changes for reproducibility and public-safety issues.

## Current Status

The project starts with a minimal schema, CLI commands for validation, normalization, and packaging, fixture examples, documentation, and CI.

## Roadmap

Near-term work includes source adapter examples, stricter validation, JSON Schema export, and clearer data contribution workflows.

## Public Benefit

The project helps open-source salary and tax calculator maintainers prepare Swiss tax datasets with traceable metadata and deterministic outputs.

## Honest Limitations

The project does not provide official tax calculations by itself. It does not replace tax, legal, or financial advice. Maintainers and downstream developers must verify official sources, legal reuse terms, and calculation logic.
