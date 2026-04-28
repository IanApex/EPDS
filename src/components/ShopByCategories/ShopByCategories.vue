<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'

import ShopTile from '@/components/ShopTile/ShopTile.vue'

/**
 * ShopByCategories — section organism that drives a tabbed marketing
 * grid of `ShopTile`s.
 *
 * Figma: homepage "A ride for every moment" frame. Title + subhead sit
 * inside the same horizontal rail as the tab bar (80 px gutters on
 * desktop, 24 px on mobile). The tile grid lives in its own 1280 px
 * rail below. Tabs select which tile set is rendered. On mobile the
 * tab row scrolls horizontally (categories naturally overflow the
 * 375 px viewport).
 *
 * The component is uncontrolled by default (auto-selects the first
 * category on mount). Pass `v-model` to drive the active tab from
 * outside (e.g. when persisting tab state across route changes).
 */
export interface ShopByCategoryTile {
  /** Headline rendered on the tile (passed through to `ShopTile.label`). */
  label: string
  /** Image asset URL. Use Vite imports (`?url` or default JPG/PNG imports). */
  imageUrl: string
  /** Destination URL for the tile (custom SRP, landing page, etc.). */
  href?: string
  target?: string
  imageAlt?: string
}

export interface ShopByCategory {
  /** Stable identifier; also used as the tab's accessible id. */
  id: string
  /** Tab label. */
  label: string
  /** Tile set rendered when this tab is active. */
  tiles: ShopByCategoryTile[]
}

const props = withDefaults(
  defineProps<{
    /** Section heading (Figma: "A ride for every moment"). */
    title?: string
    /** Section subhead (Figma: "What's yours?"). */
    subtitle?: string
    /** Tabs + their tile sets. The first item auto-selects on mount. */
    categories: ShopByCategory[]
    /** Active tab id (v-model). Falls back to `categories[0].id`. */
    modelValue?: string
  }>(),
  {
    title: 'A ride for every moment',
    subtitle: 'What\u2019s yours?',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'tile-click': [{ category: ShopByCategory; tile: ShopByCategoryTile; event: MouseEvent }]
}>()

/* ─── Active-tab state ─────────────────────────────────── */
const internalActive = ref<string>(props.modelValue ?? props.categories[0]?.id ?? '')

watch(
  () => props.modelValue,
  (v) => {
    if (v && v !== internalActive.value) internalActive.value = v
  },
)

onMounted(() => {
  if (!props.modelValue && props.categories[0]) {
    internalActive.value = props.categories[0].id
    emit('update:modelValue', internalActive.value)
  }
})

const activeId = computed(() => internalActive.value)

const activeCategory = computed(
  () => props.categories.find((c) => c.id === activeId.value) ?? props.categories[0],
)

function selectTab(id: string) {
  internalActive.value = id
  emit('update:modelValue', id)
}

/* ─── Keyboard nav for the tab list (roving Left/Right arrows). ── */
const tabRefs = ref<HTMLButtonElement[]>([])
function setTabRef(el: Element | unknown, index: number) {
  if (el instanceof HTMLButtonElement) tabRefs.value[index] = el
}

function onTabKey(e: KeyboardEvent, index: number) {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return
  e.preventDefault()
  const last = props.categories.length - 1
  let next = index
  if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1
  else if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = last
  const nextCat = props.categories[next]
  if (!nextCat) return
  selectTab(nextCat.id)
  // Move focus to the newly-selected tab so screen readers track it.
  tabRefs.value[next]?.focus()
}

function onTileClick(
  category: ShopByCategory,
  tile: ShopByCategoryTile,
  event: MouseEvent,
) {
  emit('tile-click', { category, tile, event })
}
</script>

<template>
  <section class="sbc" :aria-label="title">
    <!-- ── Header rail (title + subhead + tab bar) ────────────── -->
    <header class="sbc__header">
      <div class="sbc__heading">
        <h2 class="sbc__title">{{ title }}</h2>
        <p v-if="subtitle" class="sbc__subtitle">{{ subtitle }}</p>
      </div>

      <!-- Tab bar lives inside an inner wrapper that owns the
           horizontal scroll on mobile + the bottom hairline. -->
      <div class="sbc__tabs-wrap">
        <div
          class="sbc__tabs"
          role="tablist"
          :aria-label="title + ' categories'"
        >
          <button
            v-for="(cat, i) in categories"
            :key="cat.id"
            :ref="(el) => setTabRef(el, i)"
            type="button"
            role="tab"
            class="sbc__tab"
            :class="{ 'sbc__tab--active': cat.id === activeId }"
            :id="`sbc-tab-${cat.id}`"
            :aria-selected="cat.id === activeId"
            :aria-controls="`sbc-panel-${cat.id}`"
            :tabindex="cat.id === activeId ? 0 : -1"
            @click="selectTab(cat.id)"
            @keydown="(e) => onTabKey(e, i)"
          >
            <span class="sbc__tab-label">{{ cat.label }}</span>
            <span class="sbc__tab-bar" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

    <!-- ── Tile grid for the active tab ────────────────────────── -->
    <div
      v-if="activeCategory"
      :id="`sbc-panel-${activeCategory.id}`"
      class="sbc__grid"
      role="tabpanel"
      :aria-labelledby="`sbc-tab-${activeCategory.id}`"
    >
      <ShopTile
        v-for="tile in activeCategory.tiles"
        :key="tile.label"
        class="sbc__tile"
        :label="tile.label"
        :image-url="tile.imageUrl"
        :href="tile.href"
        :target="tile.target"
        :image-alt="tile.imageAlt"
        @click="(e) => onTileClick(activeCategory, tile, e)"
      />
    </div>
  </section>
</template>

<style scoped>
/* Section root — vertical gap between the header rail and the tile
 * grid matches Figma's 67 px gap on desktop, dropping to 24 px on
 * mobile so the tighter viewport doesn't waste vertical space. */
.sbc {
  display: flex;
  flex-direction: column;
  gap: 67px;
  width: 100%;
  background: var(--color-neutral-100);
  font-family: var(--font-family-brand, var(--font-family-base));
  color: var(--color-neutral-0);
}

/* ─── Header rail ──────────────────────────────────────────
 * Same 1440 → 1280 px rail as the desktop hero (80 px gutters).
 * The headline + subhead sit in their own 555 px column inside
 * the rail; the tab bar spans the full rail width with a 1 px
 * hairline along its bottom edge.
 * ---------------------------------------------------------- */
.sbc__header {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.sbc__heading {
  display: flex;
  flex-direction: column;
  /* Subhead sits flush below the title — tracking + line-height
   * handle the optical breathing room. */
}

.sbc__title {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: 700;
  font-size: 42px;
  line-height: 54px;
  letter-spacing: -1.2px;
  color: var(--color-nav-text, var(--color-neutral-0));
}

.sbc__subtitle {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: 300;
  font-size: 24px;
  line-height: 1.3;
  letter-spacing: -0.264px;
  color: var(--color-nav-text, var(--color-neutral-0));
}

/* Wrapper around the actual tab strip so we can:
 *   1. Apply the bottom hairline to the full rail width.
 *   2. Allow horizontal scrolling on mobile without showing a
 *      visible scrollbar.
 *   3. Keep the visible track flush with the rail edges. */
.sbc__tabs-wrap {
  margin-top: 23px; /* Figma: 23 px from subhead baseline to tab text. */
  border-bottom: 1px solid rgba(68, 83, 102, 0.1);
  /* `min-height` reserves space for tab + 2 px active bar so the
   * underline never shifts adjacent layout when tabs change. */
  min-height: 34px;
}

.sbc__tabs {
  display: flex;
  align-items: stretch;
  /* Each tab owns its own right padding (24 px) so removing the
   * last tab's right padding via :last-child stays optional. */
  gap: 0;
}

/* Individual tab — labelled button with a bottom indicator bar.
 * The bar is part of the button so its height (0 → 2 px) doesn't
 * change the button's outer height (label + 16 gap + 2 bar = 34 px).
 * Inactive tabs render the bar transparent at the same 2 px height. */
.sbc__tab {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  padding: 0 24px 0 0;
  margin: 0;
  border: 0;
  background: transparent;
  color: var(--color-nav-text, var(--color-neutral-0));
  cursor: pointer;
  font-family: inherit;
  /* Reserve 3 px focus border via outline so the active red bar
   * underneath is unaffected by focus state. */
  outline: 3px solid transparent;
  outline-offset: -3px;
  transition: outline-color 120ms ease, color 120ms ease;
  white-space: nowrap;
}

.sbc__tab:focus-visible {
  outline-color: var(--color-nav-focus-ring, var(--color-focus-ring));
}

.sbc__tab-label {
  display: inline-flex;
  align-items: center;
  height: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
}

.sbc__tab:hover:not(.sbc__tab--active) .sbc__tab-label {
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Active indicator. Default to 0 height so inactive tabs reserve
 * no vertical space; switch to 2 px and the brand active-indicator
 * colour (Sonic dark red / EchoPark green) when the tab is selected. */
.sbc__tab-bar {
  display: block;
  width: 100%;
  height: 0;
  background: var(--color-nav-active-indicator, var(--color-action-primary));
  transition: height 120ms ease;
}

.sbc__tab--active .sbc__tab-bar {
  height: 2px;
}

/* ─── Tile grid ────────────────────────────────────────────
 * 1280 px rail centered in the viewport with 16 px gaps. Each tile
 * uses `flex: 1 1 calc((100% - 32px) / 3)` so a 3-up row fills the
 * rail exactly. Wrapped tiles on a partial second row stretch to
 * fill the remaining width — for the Figma seed of 5 tiles this
 * yields 3 + 2, with the second row's tiles each at ~50 % width.
 * ---------------------------------------------------------- */
.sbc__grid {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 80px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.sbc__tile {
  flex: 1 1 calc((100% - 32px) / 3);
  min-width: 0;
}

/* ─── Narrow desktop (<1280) ──────────────────────────────
 * Pull the header / grid gutters down to 32 px so the rail
 * never bumps the viewport edge. */
@media (max-width: 1279.98px) {
  .sbc__header,
  .sbc__grid {
    padding-left: 32px;
    padding-right: 32px;
  }
}

/* ─── Tablet (<1024) ──────────────────────────────────────
 * Headline + subhead scale down to keep optical balance on
 * mid-width viewports, matching the hero's tablet rule. */
@media (max-width: 1023.98px) {
  .sbc {
    gap: 40px;
  }
  .sbc__title {
    font-size: 36px;
    line-height: 44px;
    letter-spacing: -1px;
  }
  .sbc__subtitle {
    font-size: 20px;
    letter-spacing: -0.22px;
  }
}

/* ─── Mobile (<600) ───────────────────────────────────────
 * • Header gutters drop to 24 px (matches the mobile hero).
 * • Tab strip becomes horizontally scrollable so categories
 *   that don't fit (e.g. "Thrill-seeking toys") are reachable
 *   via swipe. We hide the scrollbar visually but keep the
 *   touch / wheel scrolling behaviour native.
 * • Tile grid stacks vertically (each tile at 100 % width).
 * --------------------------------------------------------- */
@media (max-width: 599.98px) {
  .sbc {
    gap: 24px;
  }
  .sbc__header {
    padding: 0 24px;
    gap: 5px;
  }
  .sbc__title {
    font-size: 32px;
    line-height: 54px;
    letter-spacing: -1.2px;
  }
  .sbc__subtitle {
    font-size: 18px;
    letter-spacing: -0.198px;
  }

  .sbc__tabs-wrap {
    /* Allow the strip to scroll horizontally; clip overflow on
     * the wrap so the bottom hairline reaches the rail edges. */
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    /* Hide the scrollbar — categories are clearly more-than-one-row
     * indicators visually (overflow + tab right padding). */
    scrollbar-width: none;
  }
  .sbc__tabs-wrap::-webkit-scrollbar {
    display: none;
  }

  .sbc__tabs {
    /* Lay out as an inline-flex so the strip sizes to its own
     * content (lets the scroll container compute overflow). */
    width: max-content;
  }

  .sbc__grid {
    padding: 0 20px; /* Mobile rail: 20 px to match Figma 335 / 375. */
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 16px;
  }
  .sbc__tile {
    flex: 0 0 auto;
    width: 100%;
  }
}
</style>
