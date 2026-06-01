# Contributing

Thanks for helping improve `swiss-tax-data-tools`.

## Ground Rules

- Use only public-safe code and data.
- Do not add secrets, private product logic, billing logic, Supabase configuration, storage credentials, or proprietary datasets.
- Do not invent official Swiss tax formulas or tables.
- Mark all sample data as fixtures with `is_fixture: true`.
- Cite official source metadata for real datasets and verify source terms before publication.

## Development

```sh
npm install
npm run typecheck
npm test
npm run build
```

## Pull Requests

Pull requests should explain:

- What data model or tooling behavior changed.
- Which official source category is affected, if any.
- How deterministic output was verified.
- What tests were added or updated.

## Data Contributions

Data-source pull requests must include source metadata, official source URL, retrieval date, and checksum or content hash. Maintainers may reject data that cannot be independently verified.
