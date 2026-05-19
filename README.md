# EPDS — EchoPark Design System

A Vue 3 component library built from Figma foundations using the Figma Dev Mode MCP.

## Stack

- **Vue 3** + TypeScript (`<script setup>`)
- **Vite 8** — app dev + **ESM library build** (`dist/epds.js`, `dist/epds.css`, `dist/index.d.ts`)
- **Storybook 10** (docs, a11y, pseudo-states, Chromatic)
- **CSS custom properties** for design tokens (`src/epds.css` bundles primitives → semantic → scales + reset)

## Getting started

```bash
npm install
npm run storybook     # component library at http://localhost:6006
npm run dev           # minimal app shell at http://localhost:5173
npm run build         # production library → dist/ (epds.js, epds.css, types)
npm run build:app     # optional SPA shell → dist-app/ (does not overwrite dist/)
npm run typecheck     # full project (includes stories): vue-tsc -b
```

## CI & deployments (GitHub Actions)

Three workflows run on this repo:

| Workflow | Trigger | What it does |
|----------|---------|----------------|
| **CI** (`.github/workflows/ci.yml`) | Push + pull requests targeting `main` | `npm ci` then **`npm run build`** — proves the publishable library (`dist/epds.js`, `dist/epds.css`, `dist/index.d.ts`) typechecks and bundles on a clean runner. |
| **Deploy Storybook** (`.github/workflows/deploy-storybook.yml`) | Push to `main` (+ manual dispatch) | `npm ci` then **`npm run build-storybook`**; publishes the static Storybook site to **GitHub Pages** (`STORYBOOK_BASE` is set for the `/EPDS/` path). |
| **Publish** (`.github/workflows/publish.yml`) | GitHub Release published (+ manual dispatch) | `npm ci` → `npm run build` → `npm publish --provenance` to the public npm registry as `@ianapex/epds`. Requires the `NPM_TOKEN` repo secret. |

Ensure **Pages** is configured to deploy from GitHub Actions in the repo settings.

## Recent tooling notes (maintainers)

- **`src/vite-env.d.ts`** — declares `declare module '*?url'` so TypeScript resolves deep imports such as `@logos/OEMs/Audi.svg?url` (Vite’s default `*.svg?url` pattern only matched single path segments).
- **`tsconfig.app.json`** — extends the Vue DOM base via `./node_modules/@vue/tsconfig/tsconfig.dom.json` so editors reliably resolve the shared preset (bare `@vue/tsconfig/...` can fail in some environments without a full `npm install`).
- **`BrandShowcaseCard` Sonic OEM grid** — split into `SonicOemLogoCell.vue`, `SonicOemLogoCells.vue`, and `SonicOemGrid.vue` for clearer typings and Storybook previews.

## Using EPDS in another app

Install from the public npm registry:

```bash
npm install @ianapex/epds vue
```

In the host app, ensure **Roboto** (300/400/500/700) is loaded (see `index.html` in this repo). Then import components — the global token CSS is pulled in via the package entry (sideEffects-aware bundlers will include it automatically):

```ts
import { BaseButton, tokens, breakpoints } from '@ianapex/epds'
// Safety net if your bundler strips side-effect CSS:
import '@ianapex/epds/style.css'
```

`vue` **^3.5** is a peer dependency — the host must provide it.

### Releasing a new version

1. Bump `"version"` in `package.json` (semver).
2. Commit + push to `main`; wait for CI green.
3. Create a **GitHub Release** with a tag matching the version (e.g. `v0.2.0`).
4. The **Publish** workflow runs `npm publish --provenance`. Requires the repo secret `NPM_TOKEN` (an [npm automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens)).

## Project structure

```
src/
├── index.ts              # library entry — re-exports components + tokens; imports epds.css
├── epds.css              # @import chain: primitives → semantic → tokens.css → style.css
├── tokens/
│   ├── tokens.css
│   ├── tokens.ts
│   └── breakpoints.ts
├── components/
│   └── ComponentName/
│       ├── ComponentName.vue
│       ├── ComponentName.stories.ts
│       └── index.ts
└── main.ts               # local dev: imports epds.css + mounts App.vue
```

Full token map, component specs, Storybook conventions, and Figma workflow live in **`.cursor/rules/design-system.mdc`**.

## Adding components

1. Open Figma and select a component
2. In Cursor, ask: *"generate a Vue component for this"*
3. The Figma MCP extracts design context; add the component and register it in **`src/index.ts`**

## Committing

Commit and push as usual; after a push to `main`, check the **Actions** tab for green **CI** and **Deploy Storybook** runs. Run `git log --oneline` for history.
