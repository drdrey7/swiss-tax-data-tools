## Summary

## Data and Source Safety

- [ ] No secrets, private product code, billing logic, or private infrastructure configuration.
- [ ] Fixture data is marked with `is_fixture: true`.
- [ ] Official source metadata is included where real data is involved.
- [ ] No invented Swiss tax formulas or fake official tables.

## Verification

- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`
