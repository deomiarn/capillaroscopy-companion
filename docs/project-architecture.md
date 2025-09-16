# Capillaroscopy Companion (PoC)

End-to-end **online** PoC for capillaroscopy image analysis.  
**Web**: Next.js (App Router, Vercel) → server proxy → **Model API**: FastAPI + ViT (hosted).  
**Data**: test images only, no PII, no persistence.

```pgsql
-- Architecture (overview)
-- Browser
--   -> Next.js (Vercel)  /app/(dashboard)
--   -> /api/analyze (server route handler, server-to-server)
--   -> FastAPI + ViT (Render/Cloud Run): POST /analyze
--   <- JSON { model_hash, results[{ filename, scores, pattern, latency_ms }] }
--   -> optional /api/export/{csv,pdf} (server-side exports)
```

## 2) Project Structure (high level)

```
src/
  app/                   # routes (App Router) + server route handlers
    (dashboard)/page.tsx
    api/
      analyze/route.ts   # proxy -> MODEL_API_URL/analyze
      export/{csv,pdf}/route.ts
  features/              # domain modules (DDD-lite)
    analysis/{ui,services,schema.ts,types.ts}
    export/services/{pdf.ts,csv.ts}
  components/{ui,common}
  services/http/modelApi.ts
  lib/{format.ts,constants.ts}
tests/                   # vitest tests (e.g., **/*.test.tsx)

```

Path alias: `@/*` → `src/*`.
