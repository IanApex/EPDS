<script setup lang="ts">
import { computed, watch } from 'vue'
import Overlay          from '../Overlay/Overlay.vue'
import SrpTile          from '../SrpTile/SrpTile.vue'
import SmallIconButton  from '../SmallIconButton/SmallIconButton.vue'
import MediumIconButton from '../MediumIconButton/MediumIconButton.vue'

import closeSvg from '../../../icon/Style=Display, Detail=Default, Icon=Close.svg?raw'

/**
 * Vehicle shape consumed by the compare tool. The first block of fields is
 * passed straight through to the inner `SrpTile` column header; the second
 * block drives the comparison-rows grid below the tiles. All comparison
 * fields are optional — missing values render as the em-dash placeholder.
 */
export interface CompareVehicle {
  id: number | string

  // ── Tile header fields (passed through to SrpTile) ──
  year: string
  mileage: string
  stockNumber?: string
  title: string
  price: string
  monthlyPayment?: string
  deliveryLabel?: string
  deliveryStore?: string
  deliveryDistance?: string
  vehicleStatus?: 'on-lot' | 'in-transit'
  imageUrl?: string
  imageCount?: number
  favorited?: boolean
  href?: string

  // ── Comparison-only fields ──
  trim?: string
  bodyStyle?: string
  engine?: string
  transmission?: string
  driveType?: string
  mpgCity?: number | string
  mpgHwy?: number | string
  exteriorColor?: string
  interiorColor?: string
  features?: string[]
}

const props = withDefaults(defineProps<{
  /** Open / closed state (v-model). */
  modelValue: boolean
  /** Ordered list of vehicles to show. Each one becomes a sticky column header. */
  vehicles: CompareVehicle[]
  /** Title in the modal header. */
  title?: string
  /**
   * When `true`, the `vehicleStatus` field is passed through to each `SrpTile`
   * so the tile's status row (On the lot / In transit) is rendered. Mirrors
   * the `SrpPage` Sonic-only pattern.
   */
  isSonic?: boolean
  /**
   * Copy shown when no vehicles are selected — only used while the modal is
   * still open (e.g. the user removed every vehicle before closing).
   */
  emptyLabel?: string
}>(), {
  title:      'Compare vehicles',
  isSonic:    false,
  emptyLabel: 'No vehicles to compare. Add at least one from the search results to keep going.',
})

const emit = defineEmits<{
  'update:modelValue':  [value: boolean]
  /** Mirror of `SrpTile`'s favorite toggle, scoped to a specific vehicle id. */
  'update:favorited':   [payload: { id: CompareVehicle['id']; value: boolean }]
  /** X clicked on a tile — parent removes the vehicle from compare. */
  remove:               [payload: { id: CompareVehicle['id'] }]
}>()

/**
 * Auto-close when the last vehicle is removed inside the modal. Keeps the
 * modal usable at counts of 1 (empty-state messaging) but bails out cleanly
 * once the list is fully empty so the user lands back on the SRP — which
 * still holds its pre-open state (scroll / filters / pills).
 */
watch(
  () => props.vehicles.length,
  (next, prev) => {
    if (props.modelValue && next === 0 && (prev ?? 0) > 0) {
      emit('update:modelValue', false)
    }
  },
)

function close() {
  emit('update:modelValue', false)
}

function onTileFavorite(id: CompareVehicle['id'], value: boolean) {
  emit('update:favorited', { id, value })
}

function onRemove(id: CompareVehicle['id']) {
  emit('remove', { id })
}

// ── Comparison rows ─────────────────────────────────────────────────────────
// Everything `SrpTile` already shows in the sticky header (year / mileage /
// stock # / title / price / monthly payment / vehicle status / delivery info)
// is intentionally excluded here to avoid redundancy.

interface RowDef {
  key: string
  label: string
  get: (v: CompareVehicle) => string
}
interface SectionDef {
  key: string
  heading: string
  rows: RowDef[]
}

const NOT_AVAILABLE = '—'
function fmt(v: unknown): string {
  if (v === null || v === undefined || v === '') return NOT_AVAILABLE
  return String(v)
}

const sections: SectionDef[] = [
  {
    key: 'basics',
    heading: 'Basics',
    rows: [
      { key: 'trim',      label: 'Trim',       get: v => fmt(v.trim) },
      { key: 'bodyStyle', label: 'Body style', get: v => fmt(v.bodyStyle) },
    ],
  },
  {
    key: 'drivetrain',
    heading: 'Drivetrain & efficiency',
    rows: [
      { key: 'engine',       label: 'Engine',           get: v => fmt(v.engine) },
      { key: 'transmission', label: 'Transmission',     get: v => fmt(v.transmission) },
      { key: 'driveType',    label: 'Drive type',       get: v => fmt(v.driveType) },
      {
        key: 'mpg',
        label: 'MPG (city / hwy)',
        get: (v) => {
          if (v.mpgCity == null && v.mpgHwy == null) return NOT_AVAILABLE
          const c = v.mpgCity == null ? '—' : String(v.mpgCity)
          const h = v.mpgHwy  == null ? '—' : String(v.mpgHwy)
          return `${c} / ${h}`
        },
      },
    ],
  },
  {
    key: 'color',
    heading: 'Color',
    rows: [
      { key: 'extColor', label: 'Exterior color', get: v => fmt(v.exteriorColor) },
      { key: 'intColor', label: 'Interior color', get: v => fmt(v.interiorColor) },
    ],
  },
  {
    key: 'features',
    heading: 'Features',
    rows: [
      {
        key: 'features',
        label: 'Features',
        get: (v) => {
          if (!v.features || v.features.length === 0) return NOT_AVAILABLE
          return v.features.join(', ')
        },
      },
    ],
  },
]

/**
 * Grid columns: 1 sticky-left label column + N vehicle columns. The CSS
 * custom property is read by `grid-template-columns` so the grid grows
 * with the vehicle count without an exhaustive media-query stack.
 */
const vehicleCount = computed(() => props.vehicles.length)
</script>

<template>
  <Overlay
    :modelValue="modelValue"
    :zIndex="1000"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <div class="compare-tool__center">
      <div
        class="compare-tool"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
      >
        <!-- ── Header ─────────────────────────────────────────────────── -->
        <header class="compare-tool__header">
          <h2 class="compare-tool__title">{{ title }}</h2>
          <MediumIconButton
            ariaLabel="Close compare tool"
            @click="close"
          >
            <template #icon>
              <span v-html="closeSvg" style="display:contents" />
            </template>
          </MediumIconButton>
        </header>

        <!-- ── Body: vertical + horizontal scroll container ──────────── -->
        <div class="compare-tool__body">
          <!-- Empty state — only reached briefly if vehicles drop to 0
               before the auto-close watcher fires. -->
          <div
            v-if="vehicleCount === 0"
            class="compare-tool__empty"
          >
            {{ emptyLabel }}
          </div>

          <template v-else>
            <!-- Sticky tile bar — a single solid horizontal band that
                 covers the full body width as comparison rows scroll up
                 behind it. The inner grid uses the exact same column
                 template as the comparison grid below, so columns align
                 perfectly during horizontal scroll. -->
            <div class="compare-tool__tile-bar">
              <div
                class="compare-tool__tile-grid"
                :style="{ '--vehicle-count': vehicleCount }"
              >
                <div
                  class="compare-tool__tile-cell--label"
                  aria-hidden="true"
                />
                <div
                  v-for="v in vehicles"
                  :key="`tile-${v.id}`"
                  class="compare-tool__tile-cell"
                >
                  <div class="compare-tool__tile-wrap">
                    <SrpTile
                      :year="v.year"
                      :mileage="v.mileage"
                      :stockNumber="v.stockNumber"
                      :title="v.title"
                      :price="v.price"
                      :monthlyPayment="v.monthlyPayment"
                      :deliveryLabel="v.deliveryLabel"
                      :deliveryStore="v.deliveryStore"
                      :deliveryDistance="v.deliveryDistance"
                      :vehicleStatus="isSonic ? v.vehicleStatus : undefined"
                      :imageUrl="v.imageUrl"
                      :imageCount="v.imageCount ?? 1"
                      :favorited="v.favorited"
                      :href="v.href"
                      @update:favorited="onTileFavorite(v.id, $event)"
                    />
                    <div class="compare-tool__remove">
                      <SmallIconButton
                        :ariaLabel="`Remove ${v.title} from compare`"
                        @click="onRemove(v.id)"
                      >
                        <template #icon>
                          <span v-html="closeSvg" style="display:contents" />
                        </template>
                      </SmallIconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Comparison rows grid — same column template as the tile
                 bar so columns line up. -->
            <div
              class="compare-tool__compare-grid"
              :style="{ '--vehicle-count': vehicleCount }"
            >
              <template v-for="section in sections" :key="section.key">
                <div class="compare-tool__section-heading">
                  {{ section.heading }}
                </div>

                <template v-for="row in section.rows" :key="row.key">
                  <div class="compare-tool__row-label">
                    {{ row.label }}
                  </div>
                  <div
                    v-for="v in vehicles"
                    :key="`${row.key}-${v.id}`"
                    class="compare-tool__value-cell"
                  >
                    {{ row.get(v) }}
                  </div>
                </template>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Overlay>
</template>

<style scoped>
/* ─── Centered modal panel ─────────────────────────────────────────────── */

/* Sits inside the `Overlay` scrim. `pointer-events: none` lets clicks on the
 * empty area outside the panel reach the scrim, which closes the modal. */
.compare-tool__center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxs);
  pointer-events: none;
}

.compare-tool {
  position: relative;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  /* ~95% viewport width, capped at 1280px (Figma desktop grid max). */
  width: min(1280px, 95vw);
  max-height: 88vh;

  background: var(--color-neutral-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-level-3);
  overflow: hidden;
}

/* ─── Header ───────────────────────────────────────────────────────────── */
.compare-tool__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xxxs);
  padding: var(--spacing-xxs) var(--spacing-xxs) var(--spacing-xxxs);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  flex-shrink: 0;
  background: var(--color-neutral-100);
}

.compare-tool__title {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-h4-size, 24px);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-h4-line-height, 1.2);
  color: var(--color-neutral-0);
}

/* ─── Scrollable body ──────────────────────────────────────────────────── */
/* The body owns both scroll axes. Inside it sit two stacked children:
 *  1. `.compare-tool__tile-bar` — sticky-top solid horizontal band
 *  2. `.compare-tool__compare-grid` — the comparison rows below
 * Both use the same column template (via CSS custom properties) so they
 * align perfectly during horizontal scroll, and both `min-width: 100%`
 * so they always extend at least to the body's full visible width. */
.compare-tool__body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background: var(--color-neutral-100);
  -webkit-overflow-scrolling: touch;

  /* Shared column-template tokens so the tile bar and compare grid line up. */
  --label-col-w:   180px;
  --vehicle-col-w: 280px;
}

.compare-tool__empty {
  padding: var(--spacing-md) var(--spacing-xxs);
  text-align: center;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  color: var(--color-neutral-40);
}

/* ── Sticky tile bar ──────────────────────────────────────────────────
 * A single block element that sticks to the top of the scrolling body.
 * `width: max-content` + `min-width: 100%` makes the bar **at least** as
 * wide as the visible body and grow to its content's max-content when
 * there are more vehicles than fit horizontally. The solid background
 * means anything scrolling underneath is fully hidden — no peeking
 * through column gaps or to the left of the tiles. */
.compare-tool__tile-bar {
  position: sticky;
  top: 0;
  z-index: 5;

  width: max-content;
  min-width: 100%;
  box-sizing: border-box;

  background: var(--color-neutral-100);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  padding: var(--spacing-xxs);
}

.compare-tool__tile-grid {
  display: grid;
  grid-template-columns:
    var(--label-col-w)
    repeat(var(--vehicle-count), var(--vehicle-col-w));
  column-gap: var(--spacing-xxxs);   /* 16px between tiles */
  align-items: start;
}

/* Empty top-left cell (above the label column). No content — its only
 * job is to reserve the label column in the tile-grid so the vehicle
 * tiles line up with the value columns below. */
.compare-tool__tile-cell--label {
  /* intentionally empty */
}

.compare-tool__tile-wrap {
  position: relative;
}

/* X (remove) overlay — top-left of each tile, mirroring the favorite
 * heart that the tile already places at top-right. Uses SmallIconButton so
 * the affordance shape matches the favorite (32×32 white circle). */
.compare-tool__remove {
  position: absolute;
  top: var(--spacing-xxxs);   /* 16px */
  left: var(--spacing-xxxs);
  z-index: 6;                  /* above tile internal z-indices (max ~6) */
}

/* ── Comparison rows grid ─────────────────────────────────────────────
 * Same column template as the tile-grid so values land directly under
 * their corresponding tile. `min-width: 100%` matches the tile bar's
 * minimum width — keeps the two grids the same width even when the
 * column count is low. */
.compare-tool__compare-grid {
  display: grid;
  grid-template-columns:
    var(--label-col-w)
    repeat(var(--vehicle-count), var(--vehicle-col-w));
  column-gap: var(--spacing-xxxs);
  align-items: start;

  width: max-content;
  min-width: 100%;
  box-sizing: border-box;
  padding: var(--spacing-xxs);
}

/* ── Section headings ──────────────────────────────────────────────── */
.compare-tool__section-heading {
  grid-column: 1 / -1;
  font-family: var(--font-family-base);
  font-size: var(--text-h6-bold-size, 18px);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-h6-bold-line-height, 1.2);
  color: var(--color-neutral-0);
  padding: var(--spacing-xxs) 0 var(--spacing-micro);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  margin-bottom: var(--spacing-nano);

  /* Pin label-side of heading flush with the sticky-left column so
   * horizontal scrolling never reveals the heading offset. */
  position: sticky;
  left: var(--spacing-xxs);  /* match compare-grid padding-left */
  background: var(--color-neutral-100);
}

/* ── Row label (column 1) — sticky to the left edge ─────────────────── */
.compare-tool__row-label {
  position: sticky;
  left: var(--spacing-xxs);  /* match compare-grid padding-left */
  z-index: 1;
  background: var(--color-neutral-100);
  padding: var(--spacing-nano) 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-40);
}

/* ── Value cells ────────────────────────────────────────────────────── */
.compare-tool__value-cell {
  padding: var(--spacing-nano) 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
  word-break: break-word;
}

/* ─── Responsive ───────────────────────────────────────────────────────── */

/* Tablet — keep the vehicle column at SrpTile's natural minimum (280px) so
 * the tile never has to overflow its grid cell, and slim the label column
 * down to free more horizontal room for tile columns. Anything beyond what
 * fits horizontally lives behind a horizontal scroll. */
@media (max-width: 1023.98px) {
  .compare-tool__body {
    --label-col-w: 140px;
    --vehicle-col-w: 280px;
  }
}

/* Mobile — full-screen overlay to maximize real estate. The panel fills
 * the viewport (no border-radius, no outer padding) and the body uses the
 * full remaining height. Vehicle columns stay at SrpTile's natural 280px
 * minimum so the tile never gets squished or overlaps the next column —
 * narrow phones simply swipe horizontally to walk through the vehicles. */
@media (max-width: 599.98px) {
  .compare-tool__center {
    padding: 0;
  }
  .compare-tool {
    width: 100vw;
    height: 100vh;
    /* `dvh` accounts for mobile browser chrome (URL bar) collapsing — falls
     * back to the `100vh` rule above on browsers that don't support it. */
    height: 100dvh;
    max-width: 100vw;
    max-height: 100vh;
    max-height: 100dvh;
    border-radius: 0;
    box-shadow: none;
  }
  .compare-tool__header {
    padding: var(--spacing-xxxs) var(--spacing-xxxs) var(--spacing-micro);
  }
  .compare-tool__tile-bar {
    padding: var(--spacing-xxxs);
  }
  .compare-tool__compare-grid {
    padding: var(--spacing-xxxs);
  }
  .compare-tool__section-heading,
  .compare-tool__row-label {
    /* Re-anchor sticky-left to the smaller compare-grid padding. */
    left: var(--spacing-xxxs);
  }
  .compare-tool__body {
    --label-col-w: 96px;
    --vehicle-col-w: 280px;
  }
}
</style>
