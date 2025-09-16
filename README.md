# Capillaroscopy Companion — PoC

Online proof-of-concept for capillaroscopy image analysis.  
**Frontend:** Next.js (Vercel) → **Server-to-Server** → **Model API:** FastAPI + ViT.

---

## Quick Start

```bash
pnpm install
cp .env.example .env.local   # then set values (see below)
pnpm dev                     # http://localhost:3000
```

## Testing

```bash
pnpm test
pnpm test:coverage
```

---

## Development

Install once (already in devDeps here; run if missing):

```bash
pnpm dev            # http://localhost:3000
# or
pnpm build && pnpm start
```

## Linting & Formatting

Auto for Commit and Push: Husky calls lint-staged → ESLint --fix + Prettier.

Manual:

```bash
pnpm fix            # eslint --fix + prettier --write
pnpm lint           # nur eslint
pnpm format         # nur prettier --write
pnpm format:check   # prettier --check (CI-freundlich)
```

## API Contract (Model API)

Response (Shortform):

```json
{
  "TODO": "Define the expected JSON response structure from the Model API here."
}
```
