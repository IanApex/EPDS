/// <reference types="vite/client" />

/**
 * Vite’s client types use patterns like `*.svg?url`, which only match a single
 * path segment. Aliased deep imports (e.g. `@logos/OEMs/Audi.svg?url`) need a
 * catch‑all so `vue-tsc` can resolve the module and type the default export.
 */
declare module '*?url' {
  const src: string
  export default src
}
