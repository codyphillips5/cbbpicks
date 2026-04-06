# Deploy and operations (CBB Picks)

## Static site (GitHub Pages)

1. Push HTML, `scripts/`, `json/`, and `styles.css` to the branch GitHub Pages serves (often `master` / `main` or `gh-pages`).
2. JSON feeds are loaded from `window.CBB_JSON_BASE` (default `https://codyphillips5.github.io/cbbpicks/json`). Override in HTML before `scripts/config.js` if you fork the repo or use another host.
3. Optional error monitoring: set `window.CBB_SENTRY_DSN` before `scripts/sentry-loader.js` runs (same pattern as config overrides).

## Firebase

- Web credentials live in `scripts/config.js` (`CBB_FIREBASE_CONFIG`). Firebase client config is not secret, but keep one canonical project for all pages.
- Deploy Firestore rules from `firebase/firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

Review rules against your actual collection names (`week1`…`week18`, `Users`, `users`, etc.) before deploying to production.

### App Check (optional)

After rules are strict, enable [Firebase App Check](https://firebase.google.com/docs/app-check) for the web app to reduce scripted abuse.

## Content Security Policy (CSP)

For tighter security on a host that supports custom headers (not default GitHub Pages), start from a policy that allows:

- `script-src` your origin, `https://www.gstatic.com`, `https://cdn.jsdelivr.net`, `https://cdnjs.cloudflare.com`, `https://ajax.googleapis.com`, `https://browser.sentry-cdn.com` (if using Sentry), and hash or nonce for any inline scripts you keep.
- `connect-src` your Pages origin, `https://*.googleapis.com`, `https://*.firebaseio.com`, `https://*.cloudfunctions.net`, and Sentry ingest hosts if applicable.

Tune iteratively; the compat Firebase SDK and CDNs require explicit allowlisting.

## Caching

- Short cache or `no-cache` for `*.html` during active seasons so users pick up script changes.
- Long cache for versioned static assets if you introduce hashed filenames (e.g. via Vite build output).

## Firebase JS SDK upgrade (v6 → modular v9+)

The site uses the **compat** v6 script tags. A later migration can:

1. Add a bundler (this repo includes Vite scaffolding).
2. Switch to `import { initializeApp } from 'firebase/app'` and modular Auth/Firestore APIs.
3. Remove global `auth` / `db` in favor of explicit imports in each module.

Do this in a dedicated branch; behavior and bundle layout change enough to warrant regression testing on picks, results, and login flows.

## Local development

```bash
npm install
npm run lint
npm test
npm run dev    # Vite dev server
```

## E2E tests

```bash
npx playwright install
npm run e2e
```

Playwright starts `vite` via config when running tests; ensure port `5173` is free.
