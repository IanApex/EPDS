# EPDS — EchoPark Design System

A Vue 3 component library built from Figma foundations using the Figma Dev Mode MCP.

## Stack

- **Vue 3** + TypeScript (`<script setup>`)
- **Vite 8**
- **Storybook 10** (docs, a11y, vitest, pseudo-states, Chromatic)
- **CSS custom properties** for all design tokens

## Getting started

```bash
npm install
npm run storybook     # component library at http://localhost:6006
npm run dev           # app dev server at http://localhost:5173
```

## Project structure

```
src/
├── tokens/
│   ├── tokens.css        # CSS custom properties — source of truth for all design tokens
│   ├── tokens.ts         # TypeScript token map (autocomplete + type safety)
│   └── breakpoints.ts    # Grid breakpoint constants (sm/md/lg/xlg/max)
├── components/
│   └── ComponentName/
│       ├── ComponentName.vue
│       ├── ComponentName.stories.ts
│       └── index.ts
└── main.ts
```

## Design tokens

All tokens are sourced from Figma via the Figma Dev Mode MCP and live in `src/tokens/tokens.css`.
Categories: colors, spacing, border radius/width, opacity, shadows, typography, grid.

See `.cursor/rules/design-system.mdc` for the full token reference and Figma-to-CSS naming map.

## Adding components

1. Open Figma and select a component
2. In Cursor, ask: *"generate a Vue component for this"*
3. The Figma MCP will extract design context and generate the `.vue` + `.stories.ts` files

## Committing

Commits are made manually on demand — run `git log --oneline` to see history.
