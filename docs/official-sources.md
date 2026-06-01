# Official Sources

Swiss tax datasets can come from several official source categories. This document intentionally avoids unverified download URLs. Add exact URLs only after verification.

## Federal Sources

- ESTV/FTA tax calculator and related public data: TODO verification required.
- Federal direct tax guidance and tables: TODO verification required.
- Federal withholding-tax publications where applicable: TODO verification required.

## Cantonal Sources

Cantons publish tax rates, multipliers, deductions, forms, and guidance through their own tax administrations. Coverage and formats vary by canton and tax year.

- Cantonal ordinary tax data: TODO verification required.
- Cantonal withholding tax data: TODO verification required.
- Cantonal deductions and allowances: TODO verification required.
- Cantonal tax multiplier publications: TODO verification required.

## Municipal Sources

Municipal tax data may be published by cantonal authorities, municipalities, or official statistical portals depending on the canton.

- Municipal tax multipliers: TODO verification required.
- Municipality identifiers and historical municipality changes: TODO verification required.

## Church Tax

Church tax can apply depending on canton, municipality, denomination, and personal circumstances. Source coverage and legal treatment vary.

- Church tax rates or multipliers where applicable: TODO verification required.

## Ordinary Tax and Withholding Tax

Ordinary tax and withholding tax are separate categories and should not be merged without explicit source-backed modeling. Datasets should identify their `tax_type` clearly.

## Source Verification Checklist

- Confirm the publisher is an official authority or authorized official channel.
- Confirm the tax year.
- Capture source name, official URL, retrieval date, and checksum or content hash.
- Check reuse terms before publishing data.
- Preserve enough provenance for maintainers and downstream developers to audit changes.
