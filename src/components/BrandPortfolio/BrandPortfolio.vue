<script setup lang="ts">
/**
 * BrandPortfolio — organism that composes 4 (or more) `BrandShowcaseCard`
 * molecules into the Sonic Group's "explore our brands" row.
 *
 * Figma: "Brand Portfolio" frame (default + each of the 4 selected
 * states — Sonic Automotive / EchoPark / Tactical Fleet / Powersports).
 * The first frame at the top shows all four cards in their default
 * (collapsed) state; the other four sub-frames each show one card
 * expanded with that brand's selected-state content (OEM logo grid,
 * city list, description-only body, dealership-logo row).
 *
 * Responsibilities (the molecule + organism contract):
 * - The molecule (`BrandShowcaseCard`) owns the per-card visuals
 *   (default / hover / selected scrims, logo + tagline / colour
 *   logo + description + slot + CTA) and only emits
 *   `update:selected: true` when a collapsed card is clicked. It
 *   never collapses itself.
 * - The organism (this component) owns the **exactly-one selection**
 *   state: clicking a collapsed card moves the selection to that
 *   card; clicking the already-selected card is a no-op (the UX
 *   never lets the user collapse to zero — there is always one
 *   brand "in focus"). The organism also accepts `null` as the
 *   initial selection so the first-load story can render all four
 *   cards in their default state, matching the Figma's "all
 *   collapsed" frame.
 * - Layout: a single horizontal row that flexes its children. The
 *   selected card grows to 384 px (Figma spec) while the other
 *   three flex equally to fill the remaining space, with width
 *   transitions on each card so the swap reads as a smooth
 *   reflow rather than a snap. On mobile the row falls back to
 *   a vertical stack — each card keeps its 322 / 384 px width
 *   (Figma did not redesign this organism for mobile yet, so we
 *   preserve the desktop card spec and just stack vertically).
 *
 * Brand-specific assets, descriptions, and selected-state content
 * are all driven by the `brands` prop. Each brand entry includes
 * its own assets, copy, and an optional `slot` field declaring
 * which named slot the parent should render for the selected
 * state (`'sonic-oem-grid' | 'echopark-locations' | 'powersports-logos' | null`).
 * The organism then forwards that selection through its own
 * named slots (`#sonic-content`, `#echopark-content`, …) so a
 * host page wires in the helpers it wants without the organism
 * importing every helper itself.
 */
import { computed, ref, watch } from 'vue'

import BrandShowcaseCard from '../BrandShowcaseCard/BrandShowcaseCard.vue'

/* ─── Public types ─────────────────────────────────────────
 * `BrandShowcaseEntry` collects every prop a single card needs.
 * Mirrors `BrandShowcaseCard`'s prop surface so a parent can
 * configure a portfolio with one declarative array. */
export interface BrandShowcaseEntry {
  /** Stable id used for selection state + Vue list keys. */
  key: string
  name: string
  imageUrl: string
  tagline?: string
  logoLight: string
  logoLightHeight?: number
  logoColor?: string
  logoColorHeight?: number
  description?: string
  hoverScrimColor?: string
  defaultScrimColor?: string
  selectedScrimColor?: string
  /**
   * CTA label rendered inside the card's expanded state. Set to
   * `null` (or omit) to suppress the CTA — useful for brands
   * whose selected-state slot already includes its own
   * call-to-action (e.g. EchoPark's primary + secondary pair
   * passed through the card's `#cta` slot). The organism
   * forwards `cta-click` events out via `cta-click`.
   */
  ctaLabel?: string
}

const props = withDefaults(
  defineProps<{
    /** The cards to render, left-to-right (top-to-bottom on mobile). */
    brands: BrandShowcaseEntry[]
    /**
     * Two-way bound key of the currently selected card. Pass
     * `null` to render the "all-collapsed" state matching the
     * Figma's first frame. Defaults to the first brand's key
     * if `modelValue` is `undefined` at mount.
     */
    modelValue?: string | null
    /**
     * If true, the organism initialises its internal selection
     * to the first brand's key when `modelValue` is `undefined`.
     * Set to `false` to keep all four cards collapsed by default.
     */
    selectFirstByDefault?: boolean
  }>(),
  {
    modelValue: undefined,
    selectFirstByDefault: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  'select': [key: string]
  'cta-click': [event: { key: string; event: MouseEvent }]
}>()

/* ─── Selection state ─────────────────────────────────────
 * `selectedKey` mirrors `modelValue` when controlled and
 * falls back to the first brand's key when uncontrolled +
 * `selectFirstByDefault`. The molecule never emits "deselect"
 * so the organism always has an answer to "which card is
 * expanded?" after the first interaction.
 */
const internalKey = ref<string | null>(
  props.modelValue !== undefined
    ? props.modelValue
    : (props.selectFirstByDefault && props.brands[0] ? props.brands[0].key : null),
)

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) internalKey.value = value
  },
)

const selectedKey = computed(() => internalKey.value)

function selectBrand(key: string) {
  if (selectedKey.value === key) return
  internalKey.value = key
  emit('update:modelValue', key)
  emit('select', key)
}

function onCtaClick(key: string, event: MouseEvent) {
  emit('cta-click', { key, event })
}
</script>

<template>
  <section class="bp" aria-label="Brand portfolio">
    <ul class="bp__row" role="list">
      <li
        v-for="brand in brands"
        :key="brand.key"
        class="bp__slot"
        :class="{ 'bp__slot--selected': brand.key === selectedKey }"
      >
        <BrandShowcaseCard
          :name="brand.name"
          :image-url="brand.imageUrl"
          :tagline="brand.tagline"
          :logo-light="brand.logoLight"
          :logo-light-height="brand.logoLightHeight"
          :logo-color="brand.logoColor"
          :logo-color-height="brand.logoColorHeight"
          :description="brand.description"
          :hover-scrim-color="brand.hoverScrimColor"
          :default-scrim-color="brand.defaultScrimColor"
          :selected-scrim-color="brand.selectedScrimColor"
          :cta-label="brand.ctaLabel"
          :selected="brand.key === selectedKey"
          @update:selected="selectBrand(brand.key)"
          @cta-click="(event) => onCtaClick(brand.key, event)"
        >
          <!-- Forward the per-brand selected-state content slot.
               Hosts pass content via `#content-<brand.key>` so
               the organism doesn't have to know about every
               brand's helper component up front. -->
          <template
            v-if="brand.key === selectedKey && $slots[`content-${brand.key}`]"
            #selected-content
          >
            <slot :name="`content-${brand.key}`" />
          </template>

          <!-- Per-brand CTA override slot — for brands like EchoPark
               that need a primary + secondary CTA pair instead of
               the default single button. Hosts pass content via
               `#cta-<brand.key>`; the organism passes through the
               molecule's `onCtaClick` so analytics still fire from
               a single emit. -->
          <template
            v-if="brand.key === selectedKey && $slots[`cta-${brand.key}`]"
            #cta="ctaProps"
          >
            <slot :name="`cta-${brand.key}`" v-bind="ctaProps" />
          </template>
        </BrandShowcaseCard>
      </li>
    </ul>
  </section>
</template>

<style scoped>
/* ─── Section ──────────────────────────────────────────────
 * Edge-to-edge container so a host page can place the
 * organism in any width context (centred 1286 px hero, full-
 * bleed homepage section, sidebar, etc.). The row inside
 * caps itself at the Figma 1286 px max-width. */
.bp {
  display: block;
  width: 100%;
}

/* ─── Row ───────────────────────────────────────────────────
 * Horizontal flex of card slots. The selected slot has a
 * fixed flex-basis of 384 px (Figma spec); the other slots
 * flex-grow equally to fill the remaining width, capped at
 * the card's 322 px collapsed width via min/max-width hooks
 * on the inner card so the row never balloons each card
 * beyond its design size.
 *
 * NOTE: there is intentionally **no** gap between cards.
 * The Figma frame butts the cards directly against each
 * other so the photos read as a continuous strip. The
 * BrandShowcaseCard root has `overflow: hidden` so its
 * scrim + photo never bleed into a neighbour. */
.bp__row {
  display: flex;
  width: 100%;
  max-width: 1286px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  align-items: stretch;
}

/* Each slot mirrors the card's footprint. Collapsed slots
 * flex equally (so 3 collapsed cards split the space when 1
 * is selected); the selected slot is fixed at 384 px. The
 * width transition matches the molecule's own 0.3 s ease
 * so both layers animate in lockstep. */
.bp__slot {
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  max-width: 322px;
  align-items: stretch;
  transition: flex-basis 0.3s ease, max-width 0.3s ease;
}

.bp__slot--selected {
  flex: 0 0 384px;
  max-width: 384px;
}

/* Tell the embedded molecule to fill its slot on the
 * collapsed axis but keep its 384 px width when selected.
 * `:deep()` reaches into the molecule's scoped styles to
 * override the CSS variables exposed in `BrandShowcaseCard`. */
.bp__slot :deep(.bsc) {
  --bsc-width-collapsed: 100%;
  --bsc-width-selected: 100%;
  width: 100%;
}

/* ─── Mobile (≤ 599 px) ─────────────────────────────────────
 * Figma did not yet ship a mobile redesign for the multi-
 * card row, so we preserve the desktop card spec and stack
 * the cards vertically. Selected card stays 384 px wide
 * (centred); collapsed cards stay 322 px wide (centred).
 * The wrapper still drives selection state, so
 * tap-to-expand works the same as desktop. */
@media (max-width: 599.98px) {
  .bp__row {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    max-width: 100%;
  }

  .bp__slot,
  .bp__slot--selected {
    flex: 0 0 auto;
    width: 322px;
    max-width: 322px;
  }

  .bp__slot--selected {
    width: 384px;
    max-width: 384px;
  }

  /* Reset the collapsed/selected width vars so the molecule
   * uses its own defaults (322 / 384 px) on mobile rather
   * than 100 % of the centred slot. */
  .bp__slot :deep(.bsc) {
    --bsc-width-collapsed: 322px;
    --bsc-width-selected: 384px;
    width: var(--bsc-width-collapsed);
  }

  .bp__slot--selected :deep(.bsc) {
    width: var(--bsc-width-selected);
  }
}
</style>
