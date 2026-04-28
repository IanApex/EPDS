<script lang="ts">
/**
 * EchoParkLocationsGrid — story / organism helper that renders
 * the 3-column EchoPark city list shown in the EchoPark
 * selected-state card.
 *
 * Lives next to `BrandShowcaseCard.vue` (alongside `SonicOemGrid`)
 * because it is EchoPark's marketing payload for that card's
 * `#selected-content` slot. Each sub-brand owns its own helper:
 * Sonic Automotive ships an OEM logo grid, EchoPark a city list,
 * Powersports a row of dealership logos, Tactical Fleet just a
 * description (no helper needed).
 *
 * The order + column placement mirrors the Figma "EchoPark — selected"
 * frame exactly so the visual hierarchy reads top-to-bottom inside
 * each column rather than left-to-right across rows. Long names
 * (e.g. "Colorado Springs", "New Braunfels") fit on one line at
 * the card's expanded width; if a brand later adds more cities,
 * the grid reflows naturally without code changes.
 */

/** Public type — exported so consumers can type their own
 *  custom location arrays when overriding the default list. */
export interface EchoParkLocation {
  /** Stable id (used as Vue list key). */
  id: string
  /** Display label rendered in the cell. */
  label: string
}

/* Default city list pulled directly from the Figma "EchoPark
 * selected" frame, rendered in column-major order so column 1
 * holds the first ⅓ of cities, column 2 the next ⅓, etc.
 * The grid's `grid-auto-flow: column` rule handles the
 * column-first layout so this list reads top-to-bottom in
 * the source as well.
 *
 * Declared in a **separate `<script>` block** (not `<script setup>`)
 * because Vue's `defineProps()` macro is hoisted out of the setup
 * function at compile time and cannot reference any locals declared
 * inside `<script setup>` — even those declared above it. Plain
 * `<script>` blocks execute at true module scope, so consts here
 * are safe to reference from `defineProps` defaults below. */
export const DEFAULT_ECHOPARK_LOCATIONS: EchoParkLocation[] = [
  { id: 'birmingham',       label: 'Birmingham' },
  { id: 'colorado-springs', label: 'Colorado Springs' },
  { id: 'houston-sw',       label: 'Houston SW' },
  { id: 'new-braunfels',    label: 'New Braunfels' },
  { id: 'sacramento',       label: 'Sacramento' },
  { id: 'thornton',         label: 'Thornton' },

  { id: 'centennial',       label: 'Centennial' },
  { id: 'grand-prairie',    label: 'Grand Prairie' },
  { id: 'las-vegas',        label: 'Las Vegas' },
  { id: 'phoenix',          label: 'Phoenix' },
  { id: 'san-antonio',      label: 'San Antonio' },

  { id: 'charlotte',        label: 'Charlotte' },
  { id: 'houston-north',    label: 'Houston North' },
  { id: 'nashville',        label: 'Nashville' },
  { id: 'raleigh',          label: 'Raleigh' },
  { id: 'st-louis',         label: 'St Louis' },
]
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Locations to render. Defaults to the 16 EchoPark cities
     * from the Figma frame; pass a custom array for marketing
     * variants or per-region lists.
     */
    locations?: EchoParkLocation[]
  }>(),
  {
    locations: () => DEFAULT_ECHOPARK_LOCATIONS,
  },
)

const items = computed(() => props.locations)
</script>

<template>
  <ul class="eplg" role="list">
    <li
      v-for="loc in items"
      :key="loc.id"
      class="eplg__cell"
    >
      {{ loc.label }}
    </li>
  </ul>
</template>

<style scoped>
/* 3 columns × 6 rows, column-first flow so the list reads
 * top-to-bottom per column (matches Figma column order). The
 * empty 17th / 18th cells in column 3 / 6 collapse to zero
 * height because they have no `<li>` to render. */
.eplg {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(6, min-content);
  grid-auto-flow: column;
  column-gap: 16px;
  row-gap: 16px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-size: 14px;
  font-weight: var(--font-weight-light, 300);
  line-height: 22px;
  letter-spacing: -0.5px;
  color: var(--color-neutral-0);
  text-align: left;
}

.eplg__cell {
  display: block;
  white-space: nowrap;
}
</style>
