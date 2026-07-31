# BTB Lacrosse IQ

Concept search and film intelligence library. Single-page vanilla JS app served
by Netlify, with Netlify Edge Functions as the API and Airtable as the store.

Live: **btb-lacrosse-iq.netlify.app**

## Architecture

```
index.html          the whole UI (vanilla JS, Tailwind via CDN)
netlify/edge-functions/
  search-moments.mjs   GET  /api/search-moments   query the LacrosseIQ table
  save-moments.mjs     POST /api/save-moments     write breakdown moments
  list-games.mjs       GET  /api/list-games       list games
```

Airtable base `appvLo6AOYhFmBsQ9`, table `LacrosseIQ`. The Edge Functions read
`AIRTABLE_PAT` from the environment.

## ⚠️ Deploys are manual

**Pushing to `main` does not deploy this site.** There is no Git-linked
continuous deployment — the live deploy has `deploy_source: "cli"` and no
commit ref. Production is shipped by hand:

```bash
netlify deploy --prod
```

As of 2026-07-31 production was roughly six weeks behind `main`. Before you
deploy, check what has accumulated:

```bash
git log --oneline
```

## ⚠️ A live function's source is not in this repo

`/api/analyze-video` is deployed and serving, but `netlify/functions/` is
gitignored, so its source is not here and not in any known clone. The only
surviving copy is the deployed bundle on Netlify. **Recover it from the Netlify
dashboard, commit it, and remove `netlify/functions/` from `.gitignore` before
that bundle is replaced.** The `[functions]` blocks in `netlify.toml` are kept
deliberately for this reason — removing them would break that function's 60s
timeout on the next deploy.

## Unwired code

`js/taxonomy.js` (76KB) and `js/search.js` (19KB) are **not loaded by
`index.html`**. Together they are about 95KB of the repo's 104KB, and they
implement the concept-search engine this project is named for.

They are kept because they are real work, not scaffolding. Either wire them
into `index.html` or move them somewhere that makes their status obvious —
but don't assume the site is using them, because it isn't.

## Security notes

`/api/save-moments` writes into a base that also holds Players, Payments,
Waivers and Staff Auth. It is called from the browser, so it has no client
secret; it is guarded by an origin allowlist and a 200-item cap. **That is
abuse protection, not authentication** — `Origin` is forgeable outside a
browser. The durable fix is an Airtable PAT scoped to the `LacrosseIQ` table
only, so this endpoint cannot reach the other tables at all.

Airtable formula string literals have no escape sequence. When interpolating
user input into `filterByFormula`, strip quote characters — do not try to
escape them. See `lit()` in `search-moments.mjs`.
