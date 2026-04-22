<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

import Accordion from '../Accordion'
import LinkCta from '../LinkCta'

import { media } from '@/tokens/breakpoints'

/**
 * A single row in the packages & options accordion list.
 *
 * `body` is rendered as plain text inside the expanded accordion. For
 * richer per-row markup, slot-based content can be layered on top in a
 * later pass (named slots keyed by index) — v1 keeps the API flat so
 * host pages can drive the list from a data array.
 */
export interface PackageItem {
  /** Accordion header label — e.g. "Premium Package". */
  title: string
  /** Expanded body copy. Hidden when empty. */
  body?: string
  /** Whether the row renders initially open. */
  open?: boolean
}

const props = withDefaults(defineProps<{
  /** Section heading. */
  label?: string
  /** Packages & options rows. */
  packages: PackageItem[]
  /**
   * `See all …` link label shown below the accordion stack. Hidden
   * when both `seeAllLabel` and `seeAllHref` resolve to falsy.
   */
  seeAllLabel?: string
  /** Anchor href for the see-all link. Omit to render as a button. */
  seeAllHref?: string
}>(), {
  label:        'Installed Packages & Options',
  seeAllLabel:  'See all packages & options',
})

const emit = defineEmits<{
  /** Fired when the see-all link is activated. */
  'click:see-all': [event: MouseEvent]
}>()

/* ─── Responsive accordion size ─────────────────────────────
 * Figma uses `Accordion_SM` on the mobile frame (377 wide) and
 * `Accordion_LG` on tablet + desktop. The switchover is the
 * `md` breakpoint (600 px) in `breakpoints.ts`. We drive the
 * existing Accordion's `size` prop reactively so we don't have
 * to fork its CSS. */
const isMdUp = ref(false)

let mql: MediaQueryList | undefined
function onMqChange(event: MediaQueryListEvent) {
  isMdUp.value = event.matches
}

onMounted(() => {
  if (typeof window === 'undefined') return
  mql = window.matchMedia(media.md)
  isMdUp.value = mql.matches
  mql.addEventListener('change', onMqChange)
})

onBeforeUnmount(() => {
  mql?.removeEventListener('change', onMqChange)
})

/* ─── Per-row open state ─────────────────────────────────────
 * `item.open` is an *initial* value only — once the user clicks
 * a row we want the accordion to toggle freely. The existing
 * Accordion component treats `modelValue` as controlled (no
 * internal fallback) as soon as any value is passed, so we own
 * a local boolean per row and wire it up via `v-model`. */
const openStates = ref<boolean[]>([])

watch(
  () => props.packages,
  (pkgs) => {
    openStates.value = pkgs.map((p) => Boolean(p.open))
  },
  { immediate: true, deep: false },
)

function onSeeAllClick(event: MouseEvent) {
  emit('click:see-all', event)
}
</script>

<template>
  <!--
    VDP "Installed Packages & Options" section. Title + accordion list +
    see-all link. Desktop puts the title beside the content (2-col grid);
    tablet stacks with an 80 px side inset; mobile drops the inset to
    align everything with the accordion labels.
  -->
  <section class="vdp-pkgs" aria-labelledby="vdp-pkgs-title">
    <header class="vdp-pkgs__title-col">
      <h2 id="vdp-pkgs-title" class="vdp-pkgs__title">{{ label }}</h2>
    </header>

    <div class="vdp-pkgs__content">
      <ul v-if="packages.length" class="vdp-pkgs__list">
        <li
          v-for="(item, i) in packages"
          :key="`${item.title}-${i}`"
          class="vdp-pkgs__item"
        >
          <Accordion
            :label="item.title"
            :size="isMdUp ? 'lg' : 'sm'"
            v-model="openStates[i]"
          >
            <template v-if="item.body">
              {{ item.body }}
            </template>
          </Accordion>
        </li>
      </ul>

      <LinkCta
        v-if="seeAllLabel || seeAllHref"
        class="vdp-pkgs__see-all"
        :label="seeAllLabel"
        :href="seeAllHref"
        arrow
        theme="light"
        @click="onSeeAllClick"
      />
    </div>
  </section>
</template>

<style scoped>
/* ─── Desktop (≥ lg) ──────────────────────────────────────
 * Figma frame 2846 (1283 wide). Title column on the left
 * (~441 px target, collapses if the container is narrower),
 * content column on the right, 80 px gap between them.
 * Section title aligns to the accordion card top. */
.vdp-pkgs {
  display: grid;
  grid-template-columns: minmax(0, 441px) minmax(0, 1fr);
  gap: var(--spacing-xxl); /* 80px */
  align-items: start;
  width: 100%;
  font-family: var(--font-family-base);
  color: var(--color-neutral-0);
}

.vdp-pkgs__title-col {
  min-width: 0;
}

.vdp-pkgs__title {
  margin: 0;
  font-size: var(--text-h3-size);             /* 32px */
  font-weight: var(--text-h3-weight);         /* light */
  line-height: var(--text-h3-line-height);    /* 1.25 → ~40px */
  letter-spacing: var(--text-h3-letter-spacing);
  color: var(--color-neutral-0);
}

.vdp-pkgs__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs); /* 32px between accordion stack and see-all */
  min-width: 0;
}

/* ─── Accordion stack ─────────────────────────────────────
 * Figma shows a tight 1 px gap between rows (rounded cards
 * visually butted together). We use 8 px so the 16 px card
 * radius stays legible without collapsing borders. */
.vdp-pkgs__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-nano); /* 8px */
}

.vdp-pkgs__item {
  display: block;
}

/* See-all link sits flush-left in the content column, offset
 * 24 px inward on desktop so it aligns with the accordion label
 * (matches Figma Frame 3072 wrapper on the desktop frame). */
.vdp-pkgs__see-all {
  align-self: flex-start;
  padding-left: var(--spacing-xxs); /* 24px */
}

/* ─── Tablet (< lg) ───────────────────────────────────────
 * Figma frame 2987 (802 wide). Stack title above content with
 * a 32 px gap (Figma shows ~30 px). Section is inset 80 px on
 * each side to match the frame's title + content x=80 origin. */
@media (max-width: 1023.98px) {
  .vdp-pkgs {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--spacing-xs); /* 32px */
    padding: 0 var(--spacing-xxl); /* 80px */
  }

  /* On tablet + mobile Figma shows the link flush with the
   * accordion card edge, not the label. */
  .vdp-pkgs__see-all {
    padding-left: 0;
  }
}

/* ─── Mobile (< md) ───────────────────────────────────────
 * Figma frame 3070 (377 wide). Accordions span edge-to-edge
 * of the section; only the title carries a 24 px inset so it
 * lines up with the accordion label. Section-level padding
 * is removed to let the accordions reach the frame edge. */
@media (max-width: 599.98px) {
  .vdp-pkgs {
    padding: 0;
  }

  .vdp-pkgs__title-col {
    padding: 0 var(--spacing-xxs); /* 24px */
  }
}

/* ─── Sonic brand overrides ───────────────────────────────
 * Activated when the document root carries `data-brand="sonic"`
 * (set by Storybook's brand toolbar and host apps that wire up
 * the Sonic theme). These are *structural* changes that can't
 * be expressed as token swaps:
 *
 *   1. Accordion cards flatten into a flush rule-separated list
 *      — no rounded corners, no side borders; a single 1 px
 *      divider between rows plus a matching top/bottom rule on
 *      the list itself.
 *   2. Accordion caret picks up the Sonic primary red
 *      (via `--color-action-primary`, which maps to red in
 *      sonic.css and green in echopark.css).
 *   3. The see-all link's arrow adopts the same primary color
 *      while the link's text stays in the accent (steel blue)
 *      palette — only the caret shifts. */
[data-brand='sonic'] .vdp-pkgs__list {
  gap: 0;
  border-top: var(--border-width-hairline, 1px) solid var(--color-neutral-85);
}

[data-brand='sonic'] .vdp-pkgs :deep(.accordion) {
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: var(--border-width-hairline, 1px) solid var(--color-neutral-85);
}

/* Keep the hover treatment — only the bottom edge reacts. */
[data-brand='sonic'] .vdp-pkgs :deep(.accordion:has(.accordion__trigger:hover)) {
  border-bottom-color: var(--color-neutral-80);
}

[data-brand='sonic'] .vdp-pkgs :deep(.accordion__chevron path) {
  fill: var(--color-action-primary);
}

[data-brand='sonic'] .vdp-pkgs :deep(.link-cta__arrow path) {
  fill: var(--color-action-primary);
}
</style>
