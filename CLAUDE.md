# EchoPark Design System (EPDS) — Project Knowledge

## Stack
- **Framework**: Vue 3 with `<script setup>` + TypeScript (Composition API only — no Options API)
- **Build**: Vite 8, `@vitejs/plugin-vue`, `vite-svg-loader`
- **Docs/Testing**: Storybook 10 (`@storybook/vue3-vite`) — addons: docs, a11y (errors on violation), vitest, pseudo-states, Chromatic
- **Styling**: CSS custom properties in `src/tokens/tokens.css`, scoped `<style>` blocks in SFCs
- **Token TS wrapper**: `src/tokens/tokens.ts`
- **Breakpoints**: `src/tokens/breakpoints.ts` (JS constants — CSS vars can't be used in `@media`)
- **Font**: Roboto via Google Fonts (weights 300/400/500/700) — loaded in `index.html` and `.storybook/preview-head.html`
- **Path aliases**: `@/` → `src/`, `@icons/` → `icon/`, `@logos/` → `Logos/`

## Project Structure

```
EPDS/
├── index.html                        ← Google Fonts link lives here
├── icon/                             ← All SVG icons (Figma exports, original names kept)
│   ├── Style=Account, Detail=..., Icon=NA.svg   ← system icons (24×24, fill=#242C33)
│   ├── Style=Arrows, Detail=No-Tail, Icon=Right.svg
│   ├── Icon=Illustrative, Name=*.svg            ← multi-colour illustrative icons
│   └── Icon Type=Vehicle Descriptors, *.svg     ← vehicle icons (Large/Medium/Small)
├── Logos/                            ← Brand + 3rd-party logos (multi-colour SVGs)
│   ├── Color=*.svg                   ← EchoPark brand logo variants
│   ├── Property 1=*.svg
│   └── 3rd Party/                   ← Partner/trust logos
├── src/
│   ├── tokens/
│   │   ├── tokens.css                ← ALL design tokens (source of truth)
│   │   ├── tokens.ts                 ← TypeScript token map (CSS var references)
│   │   └── breakpoints.ts            ← Breakpoint constants for JS/media queries
│   ├── components/
│   │   └── ComponentName/
│   │       ├── ComponentName.vue
│   │       ├── ComponentName.stories.ts
│   │       └── index.ts
│   ├── stories/                      ← Foundation/asset gallery stories
│   │   ├── Icons.stories.ts
│   │   └── Logos.stories.ts
│   ├── vite-env.d.ts                 ← SVG import type declarations
│   ├── App.vue
│   ├── main.ts                       ← imports tokens.css + style.css
│   └── style.css                     ← global resets only
├── .storybook/
│   ├── main.ts
│   ├── preview.ts                    ← imports tokens.css + style.css
│   └── preview-head.html             ← Google Fonts link for Storybook iframe
└── .cursor/rules/design-system.mdc  ← Cursor rules mirror of this file
```

## Components Built

### `TextBoxSM` — `src/components/TextBoxSM/`
- **Figma**: "Inputs/TextBoxSM" — single-line numeric/text input; 44px fixed height
- **Props**: `label: string` (**required**), `modelValue?: string`, `prefix?: string`, `suffix?: string`, `name?: string`, `type?: string` (default `text`), `inputmode?: string`, `maxlength?: number`, `disabled?: boolean`, `error?: string`, `autocomplete?: string`
- **Emits**: `update:modelValue: [value: string]`
- **Border**: 2px `--color-neutral-85` default → `--color-accent-30` focused → `--color-warning-50` error
- **Label**: floating, `opacity: 0` when empty+unfocused, `opacity: 1` when focused or has value
- **Input text**: 16px right-aligned; prefix/suffix always `--color-neutral-40`
- **Disabled**: `opacity: --opacity-level-medium`

### `TextBoxLG` — `src/components/TextBoxLG/`
- **Figma**: "Inputs/TextBoxLG" — multi-line textarea; 140px fixed height
- **Props**: `label: string` (**required**), `modelValue?: string`, `name?: string`, `maxlength?: number` (default 500), `disabled?: boolean`, `error?: string`, `autocomplete?: string`
- **Emits**: `update:modelValue: [value: string]`
- **Textarea**: `resize: none`, `overflow-y: auto`
- **Character counter**: shown bottom-right when focused; turns `--color-warning-50` at limit
- **Error**: shown bottom-left in same footer row as counter

### `BaseSlider` — `src/components/BaseSlider/`
- **Figma**: "Inputs/Slider" — single-thumb (max only) and dual-thumb (range/min-max) variants
- **Props**: `modelValue?: number`, `minValue?: number`, `maxValue?: number`, `min?: number` (default 0), `max: number` (**required**), `step?: number` (default 1), `range?: boolean` (default false), `trackMinLabel?: string`, `trackMaxLabel?: string`, `disabled?: boolean`
- **Track**: 4px height, `--color-neutral-80` unfilled, `--color-neutral-20` filled — custom div (not native track)
- **Thumb**: 24×24px `--color-neutral-20` circle; focus ring `box-shadow: 0 0 0 2px --color-accessibility-80`
- **Dual-thumb overlap fix**: min input gets `z-index: 3` when `minPercent > 95%`
- **Usage rules**: always pair with a label + value input above (never standalone)

### `SegmentedControl` — `src/components/SegmentedControl/`
- **Figma**: "Inputs/SegmentedControl" — pill-shaped track of 2–3 mutually exclusive options
- **Props**: `options: SegmentedControlOption[]` (**required**, `{ value, label }`), `name: string` (**required**), `modelValue?: string`, `disabled?: boolean`
- **Auto-select**: emits `options[0].value` on `onMounted` if `modelValue` is empty
- **Container**: `height: 38px`, `border-radius: 42px`, `border: 1px solid --color-neutral-85`
- **Chip states**: Default → Hover (Neutral90 fill) → Selected (Primary50 fill, white text) → Focus (Selected + accessibility ring)
- **Accessibility**: visually hidden `<input type="radio">`, `role="group"` on container

### `BaseRadio` — `src/components/BaseRadio/`
- **Figma**: "Inputs/RadioButton" — single radio; compose multiples into a group with shared `name`
- **Props**: `value: string` (**required**), `name: string` (**required**), `modelValue?: string`, `label?: string`, `disabled?: boolean`
- **Anatomy**: 24×24px outer ring + 12×12px inner dot (shown when checked) + optional label; gap: 12px
- **Outer ring states**: Default 2px Neutral40 → Hover 3px Neutral40 → Checked 2px Primary50 → Disabled 2px Neutral85
- **Hover text**: `text-decoration: underline` on label

### `ModalTabs` — `src/components/ModalTabs/`
- **Figma**: "Navigation/ModalTabs" — horizontal tabs for modals and slide-in panels only
- **Props**: `tabs: ModalTab[]` (**required**, `{ id, label }`), `modelValue?: string`, `showSeparator?: boolean` (default `true`)
- **Slot**: `#default="{ activeId }"` — parent shows/hides content with `v-show`
- **Auto-select**: emits first tab's id on `onMounted` if `modelValue` is empty
- **Keyboard**: roving tabindex; Left/Right arrows cycle between tabs
- **Tab anatomy**: `height: 34px`; active indicator bar is `::after`, `bottom: 0; right: 24px`
- **Bar states**: no bar → 1px (hover inactive) → 2px (active) → 3px (active+hover). All `--color-accent-40`

### `LogicSelector` — `src/components/LogicSelector/`
- **Figma**: "Inputs/LogicSelectors" — compact inline single-choice picker that drives form logic
- **Props**: `options: LogicSelectorOption[]` (**required**, `{ value, label }`), `name: string` (**required**), `modelValue?: string`, `disabled?: boolean`, `error?: string`
- **Key UX rules**: No default selection on load. State persists when user returns to the step.
- **Chip size**: `height: 44px`, `padding: 8px 12px`, `border-radius: 4px`
- **States**: Unselected (white/Neutral85 border) → Hover (Neutral90 bg) → Selected (Neutral20 bg, white text) → Focus (2px #6fcfff border) → Disabled (opacity medium)

### `JourneySelector` — `src/components/JourneySelector/`
- **Figma**: "Inputs/JourneySelectors" — one-click card that immediately routes the user into a flow
- **Props**: `label: string` (**required**), `selected?: boolean`, `disabled?: boolean`, `href?: string`, `target?: string`
- **Slots**: `#icon` — 24×24 SVG imported with `?raw`
- **Size**: `90px` height, `min-width: 120px`; use `style="flex:1"` on each card
- **Background**: always `--color-accent-90`
- **UX guideline**: allow ~5-second delay between `select` emit and page navigation

### `SelectDropdown` — `src/components/SelectDropdown/`
- **Figma**: "Inputs/Dropdowns" — underline-style native select with floating label
- **Props**: `label: string` (**required**), `options: SelectOption[]` (**required**, `{ value, label }`), `modelValue?: string`, `theme?: 'light' | 'dark'`, `disabled?: boolean`, `error?: string`, `name?: string`
- **Architecture**: native `<select>` element (`appearance: none`) per Figma guideline
- **Underline only** — no box border. Fixed control height: 34px. Error is `position: absolute; top: 38px`
- **Chevron**: `icon/Style=Arrows, Detail=No-Tail, Icon=Down.svg?raw` rendered with `v-html`

### `BaseCheckbox` — `src/components/BaseCheckbox/`
- **Figma**: "Inputs/Checkboxes"
- **Props**: `label?: string`, `modelValue?: boolean`, `disabled?: boolean`
- **Box**: 24×24px, `border-radius: 4px`, `box-sizing: border-box`
- **Check icon**: `icon/Style=Display, Detail=Default, Icon=Check-Small.svg?raw` via `v-html`
- **9 states**: Default, Hover, Pressed, Focus, Selected, Hover Selected, Focus Selected, Disabled, Disabled Selected

### `BoxSelector` — `src/components/BoxSelector/`
- **Figma**: "Inputs/Box Selectors/Sets" — segmented radio control for 2–4 options
- **Props**: `options: BoxSelectorOption[]` (**required**, 2–4 items), `name: string` (**required**), `modelValue?: string`, `disabled?: boolean`
- **Structure**: Container (`280px`, Neutral85 bg, `gap: 1px`) — the bg *is* the 1px divider
- **Chip**: `height: 42px`, `flex: 1`, selected = bold; unselected = regular weight

### `BoxInputLG` — `src/components/BoxInputLG/`
- **Figma**: "Inputs/BoxInputs/Large" — 132px vertical card-style selection box
- **Props**: `value: string` (**required**), `name: string` (**required**), `label?: string`, `description?: string`, `modelValue?: string`, `disabled?: boolean`
- **Divider**: `box-shadow` on header — thickens with state (1px → 2px → 3px), no layout shift
- **`overflow: hidden`** on root clips inner header shadow to rounded corners

### `BoxInputMD` — `src/components/BoxInputMD/`
- **Figma**: "Inputs/BoxInputs/Medium" — 86px location/store selection box
- **Props**: `value: string` (**required**), `name: string` (**required**), `primaryLabel?: string`, `secondaryLabel?: string`, `tertiaryLabel?: string`, `sideLabel?: string`, `modelValue?: string`, `disabled?: boolean`
- **Slots**: `#secondary-icon` — only shown in default state; CSS hides on hover/selected/focus
- **Dimensions**: `height: 86px; padding: 24px; min-width: 126px`

### `BoxInputSM` — `src/components/BoxInputSM/`
- **Figma**: "Inputs/BoxInputs/Small" — identical API to BoxInputXS; visual differences:
  - Height: **64px**, Padding: **24px uniform**, Min-width: **140px**, Icon offset: **24px**

### `BoxInputXS` — `src/components/BoxInputXS/`
- **Figma**: "Inputs/BoxInputs/XS" — 48px selection box (styled radio button)
- **Props**: `value: string` (**required**), `name: string` (**required**), `label?: string`, `modelValue?: string`, `disabled?: boolean`
- **Slots**: `#icon` (optional 16×16 SVG at `left: 16px`, import with `?raw`)
- **States**: Default (1px Neutral90) → Hover (Neutral95 bg) → Selected (2px Primary50) → Focus (3px Accessibility80)
- **Dimensions**: `height: 48px; min-width: 175px; border-radius: 8px; padding: 12px 16px`

### `VideoControlButton` — `src/components/VideoControlButton/`
- **Figma**: "Buttons/VideoControls" — 40×40px circular media control button
- **Props**: `ariaLabel: string` (**required**), `color?: 'dark' | 'light'` (default `'dark'`), `disabled?: boolean`, `href?: string`, `target?: string`
- **Themes**: dark = Neutral20 bg, white icon; light = rgba(255,255,255,0.6), dark icon
- **Focus**: `border: 3px solid transparent` base → `border-color: --color-accessibility-80` on focus

### `ArrowCircleButton` — `src/components/ArrowCircleButton/`
- **Figma**: "Buttons/ArrowCircle" — circular navigation/action button for image & carousel overlays
- **Props**: `ariaLabel: string` (**required**), `direction?: 'right' | 'left' | 'expand'` (default `'right'`), `size?: 'sm' | 'lg'` (default `'sm'`), `disabled?: boolean`, `href?: string`, `target?: string`
- **Theme is derived from size + direction** — not a separate prop:
  - `sm` + `right|left` → dark (semi-transparent neutral bg, white icon)
  - `sm` + `expand` → green (Primary50)
  - `lg` + `right|left` → white (rgba white bg, dark icon)
- **Sizes**: sm = 32×32px; lg = 64×64px; icon always 24×24px

### `SmallIconButton` — `src/components/SmallIconButton/`
- **Figma**: "IconButtons/Favorite" — 32×32 toggle button
- **Props**: `ariaLabel: string` (**required**), `selected?: boolean`, `disabled?: boolean`
- **Key difference**: white background + neutral grey border (NOT Accent blue)
- **Border**: real `border` (not box-shadow) — `box-sizing: border-box` keeps outer size exactly 32px
- **Icon colour**: Neutral70 unselected → Primary50 selected → Primary55 hover+selected

### `MediumIconButton` — `src/components/MediumIconButton/`
- **Figma**: "IconButtons/Calculator" — 40×40px icon-only circular button
- **Props**: `ariaLabel: string` (**required**), `href?: string`, `target?: string`, `disabled?: boolean`
- **Icon size**: 20×20px (not 24×24)
- **Color scheme**: Accent (blue) — same as TileCta

### `TileCta` — `src/components/TileCta/`
- **Figma**: "IconButtons/SrpTile"
- **Props**: `label?: string`, `href?: string`, `target?: string`, `disabled?: boolean`
- **Slots**: `#icon` (leading 24×24 SVG), default (label text)
- **Color scheme**: Accent (blue) — NOT primary green
- **Base**: `border: 3px solid transparent` + `box-shadow: inset 0 0 0 2px --color-accent-40`

### `IconButton` — `src/components/IconButton/`
- **Figma**: "IconButtons/SignIn"
- **Props**: `label?: string`, `disabled?: boolean`
- **Slots**: `#icon` (leading 24×24 SVG — import from `@icons/` using `?component`)
- **Always**: small (40px), primary green — no variant/size/theme props
- **States**: default=Primary50, hover=Primary40+underline, pressed=Primary55, focus=3px Accessibility80

### `LinkCta` — `src/components/LinkCta/`
- **Figma**: "CommonInputs/TextLink" (light), "CommonInputs/TextLink Dark" (dark)
- **Props**: `label?: string`, `arrow?: boolean` (default `false`), `theme?: 'light' | 'dark'` (default `'light'`), `href?: string`, `target?: string`, `disabled?: boolean`
- **Light states**: Accent40; **Dark states**: Accent80
- **Focus ring**: 3px solid Accessibility80, outline-offset 2px, border-radius 2px (rectangular)

### `BaseButton` — `src/components/BaseButton/`
- **Figma**: "Buttons/Primary" (primary md), "Buttons/Tertiary" (primary sm), "Buttons/Secondary" (secondary light md), "Buttons/TertiaryOutlined" (secondary light sm), "Buttons/SecondaryDark" (secondary dark md), "Buttons/TertiaryDark" (secondary dark sm)
- **Props**: `variant?: 'primary' | 'secondary'`, `size?: 'md' | 'sm'`, `theme?: 'light' | 'dark'`, `label?: string`, `disabled?: boolean`
- **Sizes**: `md` = 56px h, 16px text; `sm` = 40px h, 14px text
- **Storybook backgrounds**: light (#FFFFFF), dark (#242C33), neutral-95 (#F4F5F7) — registered in preview.ts

### `BaseToggle` — `src/components/BaseToggle/`
- **Figma**: "Inputs/Toggle" — 48×28px pill switch; immediate-effect setting control
- **Props**: `modelValue?: boolean`, `disabled?: boolean`, `label?: string`, `name?: string`
- **Emits**: `update:modelValue: [value: boolean]`
- **Track**: 48×28px, `border-radius: 18px` — Off: `--color-neutral-70` → On: `--color-base-primary-55`
- **Thumb**: 24×24px white circle; slides `left: 2px` (off) → `left: 22px` (on) via CSS transition
- **Check icon**: `Check-Small.svg?raw` shown in thumb when on, colour `--color-base-primary-55`
- **Focus ring**: `box-shadow: 0 0 0 2px --color-accessibility-80` on `focus-visible`
- **Disabled**: `opacity: --opacity-level-medium`

### `TextField` — `src/components/TextField/`
- Most recently added component (see latest commit)

## Token Reference

### Figma variable name → CSS custom property convention
- `Base Colors/Primary50`             → `--color-base-primary-50`
- `Accent Colors/Accent90`            → `--color-accent-90`
- `Neutral Colors/Neutral70`          → `--color-neutral-70`
- `Neutral Colors/SecondaryNeutral90` → `--color-neutral-secondary-90`
- `Neutral Colors/TertiaryNeutral90`  → `--color-neutral-tertiary-90`
- `Feedback Colors/Warning50`         → `--color-warning-50`
- `Feedback Colors/Acceessibility80`  → `--color-accessibility-80`
- `$border-radius-sm`                 → `--border-radius-sm`
- `$opacity-level-medium`             → `--opacity-level-medium`
- `$font-weight-bold`                 → `--font-weight-bold`
- `Heading/H1`                        → `--text-h1-*`
- `Paragraph/Body LG`                 → `--text-body-lg-*`
- `Button/BTN`                        → `--font-*-btn`

### Color tokens
```
--color-base-primary-40/50/55/60/90
--color-accent-30/40/60/80/85/90
--color-neutral-0/20/40/70/80/85/90/95/100
--color-neutral-secondary-40/70/80/85/90/95
--color-neutral-tertiary-70/80/85/90/95
--color-warning-40/50/90
--color-alert-50/70/80/90
--color-system-red-60
--color-accessibility-80
--color-white          (alias: --color-neutral-100)
--color-parkgray-0     (alias: --color-neutral-0)
```

### Spacing tokens
Stack/inline scale: `--spacing-quarck(4) nano(8) micro(12) xxxs(16) xxs(24) xs(32) sm(40) md(48) lg(56) xl(64) xxl(80) xxxl(120) huge(160) giant(200)`
Inset default: `--spacing-inset-quarck/nano/xs/sm/md/lg`
Inset squish: `--spacing-squish-quarck/nano/sm/md/lg` (L/R = 2× T/B)
Inset stretch: `--spacing-stretch-quarck/nano/xs/sm/md/lg` (T/B = 2× L/R)

### Border tokens
Radius: `--border-radius-none/sm(4)/md(8)/lg(16)/pill(9999)/circular(50%)`
Width: `--border-width-none/hairline(1)/thin(2)/thick(4)/heavy(8)`

### Opacity & shadow tokens
Opacity: `--opacity-level-semiopaque(.8) intense(.64) medium(.32) light(.16) semitransparent(.08)`
Shadow: `--shadow-level-1/2/3/4`

### Typography tokens
Font family: `--font-family-base` ("Roboto", sans-serif)
Font weights: `--font-weight-light(300) regular(400) medium(500) bold(700)`
Line heights: `--line-height-default(1) xs(1.1) sm(1.2) md(1.4) lg(1.5)`
Text styles (each has `-size`, `-weight`, `-line-height`, `-letter-spacing`):
`--text-h1-* --text-h2-* --text-h3-* --text-h4-* --text-h5-*`
`--text-h2-bold-* --text-h5-bold-* --text-h6-bold-*`
`--text-subhead-* --text-body-lg-* --text-body-sm-* --text-label-*`
Button text: `--font-family-btn --font-size-btn --font-weight-btn --line-height-btn --letter-spacing-btn`

### Grid tokens
`--grid-columns-sm/md/lg/xlg/max`
`--grid-padding-sm(24)/md(24)/lg(32)/xlg(32)/max(32)`
Breakpoints (JS only — `breakpoints.ts`): sm=0 md=600 lg=1024 xlg=1440 max=1920

## Design Token Rules
- **Always** use CSS custom properties — never hardcode raw color/spacing/radius/typography values
- When adding a new token, add to both `tokens.css` AND `tokens.ts` simultaneously
- Old/legacy aliases (`warmgray-*`, `parkgray-70`, `green-50`) are NOT to be used

## Component Rules
- Every component in its own folder: `src/components/ComponentName/`
- Use `<script setup lang="ts">`, `defineProps<{}>()`, `defineEmits<{}>()` — no Options API
- `<style scoped>` only — no global selectors in component files
- No inline styles unless dynamically computed

## Storybook Rules
- Stories co-located in component folder, CSF3 format (`satisfies Meta<typeof Component>`)
- Use `storybook-addon-pseudo-states` for hover/active/focus-visible stories
- a11y is set to `'error'` — failing stories must be fixed, not suppressed
- Story title grouping:
  - **Buttons**: `'Components/Buttons/ComponentName'` — all button/CTA/link components + JourneySelector
  - **Inputs**: `'Components/Inputs/ComponentName'` — all form controls (checkbox, toggle, radio, slider, selectors, text inputs, dropdowns)
  - **Box Inputs** (sub-group): `'Components/Inputs/Box Input/SizeName'` (e.g. `'Components/Inputs/Box Input/XS'`)
  - **Navigation**: `'Components/Navigation/ComponentName'` — ModalTabs and future nav components
  - **Foundations**: `'Foundations/ComponentName'` — Icons, Logos

## Icon & Logo System

### SVG loader setup
- **Plugin**: `vite-svg-loader` (`defaultImport: 'component'`)
- **Aliases**: `@icons/` → `icon/`, `@logos/` → `Logos/`

### System icons (`icon/Style=*.svg`)
- 24×24, single-colour `fill="#242C33"`, always imported with `?component`
- In components needing colour inheritance: `css .my-wrapper :deep(path) { fill: currentColor; }`

### Illustrative icons (`icon/Icon=Illustrative, Name=*.svg`)
- Multi-colour — do NOT attempt to override colours

### Logos (`Logos/`)
- Always import with `?url`: `import epLogo from '@logos/Color=Default.svg?url'`
- Use in `<img src="epLogo" alt="EchoPark" />` — NEVER as inline Vue component

## Naming Conventions
- Components: PascalCase (`BaseButton`, `FormInput`)
- Props: camelCase; emits: camelCase (`"update:modelValue"`, `"click"`)
- CSS custom properties: kebab-case matching Figma variable name pattern
- Story titles: `'Components/GroupName/ComponentName'`

## Accessibility
- Semantic HTML first; ARIA only when native semantics are insufficient
- Storybook a11y addon errors must be resolved before considering a component done
