# Release Checklist

Use this checklist before tagging a release.

## Quality Gates

- [ ] Run `npm run ci`.
- [ ] Run `npm audit`.
- [ ] Run `git diff --check` before committing release changes.

## Safety Review

- [ ] Audit for `.env` files and credential-like strings.
- [ ] Confirm no private product code or private infrastructure configuration is included.
- [ ] Confirm fixture examples are clearly marked with `is_fixture: true`.
- [ ] Confirm no unverified official tax datasets were added.
- [ ] Confirm no Swiss tax formulas were invented or added without verified official sources.

## Documentation

- [ ] Update `CHANGELOG.md`.
- [ ] Confirm README usage examples still work.
- [ ] Confirm docs mention any new commands or data-model changes.

## Release

- [ ] Tag the release, for example `git tag v0.1.0`.
- [ ] Push the tag with `git push origin v0.1.0`.
- [ ] Create a GitHub release from the tag.
- [ ] Include a short note that the project is unofficial and does not bundle official datasets unless that changes in a verified future release.
