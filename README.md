# Impossible G organization profile

This repository publishes the public Impossible G organization profile and keeps the shared GitHub brand package used by the service repositories.

- `profile/README.md` is rendered on the organization Overview page.
- `brand/manifest.json` contains durable descriptions, topics, and service accents.
- `brand/services/` contains canonical repository illustrations and social previews.
- `tools/sync-brand.mjs` copies canonical assets into local service repositories.

The visual assets are generated from the website design system with `npm run brand:github` in the website repository.
