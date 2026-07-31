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
surviving copy is the deployed bundle on Netlify. **Do not run another
production deploy until it has been recovered from the Netlify dashboard,
committed, and `netlify/functions/` has been removed from `.gitignore`.** The
`[functions]` declarations in `netlify.toml` configure a source file; they do
not preserve an already-deployed bundle when that source is missing.

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
browser. Airtable PAT resources can be restricted to a base or workspace, not
to one table. The durable fix is to move `LacrosseIQ` into a dedicated base and
scope this site's minimum-permission PAT to that base.

Airtable formula double-quoted string literals support backslash escaping.
`lit()` in `search-moments.mjs` escapes backslashes and embedded double quotes
before interpolating bounded user input into `filterByFormula`.
