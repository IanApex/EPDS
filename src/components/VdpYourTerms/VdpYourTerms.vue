<script setup lang="ts">
import LinkCta from '../LinkCta'

/**
 * VDP "Your Vehicle. Your Terms." section — three icon-led option tiles
 * (Finance / Lease / Fast Track) with a section heading and a per-tile
 * arrow link CTA. Sits below the Standout Features band on the VDP.
 *
 * Figma: desktop `13953:10389`, tablet `13953:10412`, mobile `13953:10368`.
 *
 * ─── Design-system substitutions vs. Figma ──────────────────
 * - Section heading uses `--text-h3-*` (32 px) across all breakpoints
 *   rather than Figma's 40 px desktop value — matches the h3 rhythm
 *   used by every other below-the-fold VDP section (packages, exterior
 *   & interior, standout features).
 * - Tile title (`Finance` / `Lease` / ...) uses `--text-h3-*` (32 px) on
 *   desktop and `--text-h4-*` (26 px) on tablet/mobile (Figma's literal
 *   24 px snaps up to the closest in-scale token).
 * - Tile description uses `--text-body-lg-*` tokens (16 px / 1.5 line-
 *   height ≈ 24 px vs. Figma's literal 28 px — the extra 4 px read as
 *   incidental and the 1.5 ratio keeps the VDP on-scale).
 * - Link CTA reuses the existing `LinkCta` component with `arrow` +
 *   `theme="light"` instead of open-coding the 14 px Figma treatment.
 *   `font-size-btn` (16 px) matches the desktop Figma value exactly
 *   and is a slight step-up (16 vs. 14 px) on tablet/mobile — in line
 *   with the rest of the VDP's link rhythm.
 * - Horizontal tile gap on desktop snaps to `--spacing-xxs` (24 px)
 *   with `justify-content: space-between` redistributing the rest;
 *   vertical gap between stacked tiles is `--spacing-md` (48 px) to
 *   match Figma on tablet + mobile.
 */

export interface YourTermsOption {
  /** Large tile title, e.g. "Finance". */
  title: string
  /** Supporting body copy. */
  description: string
  /**
   * Raw SVG markup for the option's illustrative icon, typically
   * imported via `@icons/...svg?raw`. Rendered at 64 px height,
   * hug-width (preserves the asset's natural aspect ratio).
   */
  iconSvg?: string
  /** Link label, e.g. "Apply for Financing". */
  linkLabel: string
  /** Optional href; omit to render the link as a `<button>`. */
  linkHref?: string
}

withDefaults(defineProps<{
  /** Section heading. */
  label?: string
  /** Exactly 3 tiles are expected; extras are rendered as-is. */
  options: YourTermsOption[]
}>(), {
  label: 'Your Vehicle. Your Terms.',
})

const emit = defineEmits<{
  /** Fired when any tile's link CTA is activated. */
  'click:option': [payload: { option: YourTermsOption, index: number, event: MouseEvent }]
}>()

function onLinkClick(option: YourTermsOption, index: number, event: MouseEvent) {
  emit('click:option', { option, index, event })
}
</script>

<template>
  <!--
    "Your Vehicle. Your Terms." finance-options section. Title sits
    above a 3-column tile row on desktop; the row collapses into a
    single stacked column on tablet + mobile. Each tile is a fixed
    composition — icon → title → description → arrow link — so the
    link always anchors to the bottom on desktop regardless of the
    description's wrap count.
  -->
  <section class="vdp-terms" aria-labelledby="vdp-terms-title">
    <h2 id="vdp-terms-title" class="vdp-terms__title">{{ label }}</h2>

    <ul v-if="options.length" class="vdp-terms__list">
      <li
        v-for="(option, i) in options"
        :key="`${option.title}-${i}`"
        class="vdp-terms__item"
      >
        <div class="vdp-terms__content">
          <span
            v-if="option.iconSvg"
            class="vdp-terms__icon"
            aria-hidden="true"
            v-html="option.iconSvg"
          />
          <h3 class="vdp-terms__item-title">{{ option.title }}</h3>
          <p class="vdp-terms__description">{{ option.description }}</p>
        </div>

        <LinkCta
          class="vdp-terms__link"
          :label="option.linkLabel"
          :href="option.linkHref"
          arrow
          theme="light"
          @click="(e: MouseEvent) => onLinkClick(option, i, e)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
/* ─── Container ──────────────────────────────────────────
 * Single-column layout: centered section title above a
 * horizontal tile row. `--spacing-lg` (56 px) snaps Figma's
 * 60 px title→content gap to the nearest token. */
.vdp-terms {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg); /* 56px */
  width: 100%;
  font-family: var(--font-family-base);
  color: var(--color-neutral-0);
}

.vdp-terms__title {
  margin: 0;
  font-size: var(--text-h3-size);             /* 32px */
  font-weight: var(--text-h3-weight);         /* light */
  line-height: var(--text-h3-line-height);    /* 1.2 */
  letter-spacing: var(--text-h3-letter-spacing);
  color: var(--color-neutral-0);
  text-align: center;
}

/* ─── Desktop tile row (≥ lg) ─────────────────────────────
 * 3-tile flex row, `justify-content: space-between` matches
 * the Figma layout where each tile caps at ~323 px and the
 * remaining space distributes between columns. Align-items
 * stretch lets each tile grow to the row's tallest height so
 * the link CTAs anchor on a shared baseline. */
.vdp-terms__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: var(--spacing-xxs); /* 24px */
}

/* ─── Tile ───────────────────────────────────────────────
 * Fixed composition: icon → title → description stacked in
 * `.content`, link pinned to the bottom via `margin-top:
 * auto`. `max-width` matches the Figma 323 px column so
 * wider viewports leave breathing room on either side of
 * the row rather than ballooning each column. */
.vdp-terms__item {
  flex: 1 1 0;
  min-width: 0;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs); /* 24px between content stack & link */
}

.vdp-terms__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs); /* 16px */
}

/* Shared 72 × 72 icon box (matches the Figma Fast-Track container)
 * sized to comfortably hold both the tall multi-colour EchoPark
 * illustrative icons (~120 × 132 natural viewBox) and the shorter
 * Sonic outline icons (landscape for Fast-Track at ~66 × 35). The
 * inner SVG is capped via `max-*: 100%` so each asset scales to its
 * natural aspect ratio while staying within the shared bounding box
 * — this keeps the three tiles' icons optically balanced regardless
 * of which brand's icon set the host passes in. */
.vdp-terms__icon {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 72px;
  height: 72px;
  flex: 0 0 auto;
}

.vdp-terms__icon :deep(svg) {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
}

.vdp-terms__item-title {
  margin: 0;
  font-size: var(--text-h3-size);             /* 32px */
  font-weight: var(--text-h3-weight);         /* light */
  line-height: var(--text-h3-line-height);    /* 1.2 */
  letter-spacing: var(--text-h3-letter-spacing);
  color: var(--color-neutral-0);
}

.vdp-terms__description {
  margin: 0;
  font-size: var(--text-body-lg-size);         /* 16px */
  font-weight: var(--text-body-lg-weight);     /* regular */
  line-height: var(--text-body-lg-line-height); /* 1.5 */
  letter-spacing: var(--text-body-lg-letter-spacing);
  color: var(--color-neutral-0);
}

/* Pin link to the bottom of each tile so desktop rows line
 * up on a shared baseline even when description wrap counts
 * differ across tiles. */
.vdp-terms__link {
  margin-top: auto;
  align-self: flex-start;
}

/* ─── Tablet (< lg) ───────────────────────────────────────
 * Figma frame 13953:10412 (802 wide). Tiles stack vertically
 * with a 48 px gap; the section takes an 80 px horizontal
 * inset matching the rest of the tablet VDP. Title→content
 * gap tightens to 40 px per Figma. */
@media (max-width: 1023.98px) {
  .vdp-terms {
    padding: 0 var(--spacing-xxl); /* 80px */
    gap: var(--spacing-sm);        /* 40px */
  }

  .vdp-terms__list {
    flex-direction: column;
    gap: var(--spacing-md); /* 48px */
  }

  .vdp-terms__item {
    max-width: none;
  }

  .vdp-terms__item-title {
    font-size: var(--text-h4-size);             /* 26px */
    line-height: var(--text-h4-line-height);
    letter-spacing: var(--text-h4-letter-spacing);
  }
}

/* ─── Mobile (< md) ───────────────────────────────────────
 * Figma frame 13953:10368 (377 wide). Title aligns left per
 * Figma; horizontal inset drops to 24 px to match the rest
 * of the mobile VDP gutter. Title→content gap tightens to
 * 32 px. */
@media (max-width: 599.98px) {
  .vdp-terms {
    padding: 0 var(--spacing-xxs); /* 24px */
    gap: var(--spacing-xs);        /* 32px */
  }

  .vdp-terms__title {
    text-align: left;
  }
}

/* ─── Sonic brand overrides ───────────────────────────────
 * Activated when the document root carries `data-brand="sonic"`
 * (set by Storybook's brand toolbar and host apps that wire up
 * the Sonic theme). Mirrors the pattern used in
 * `VdpPackagesOptions` — the component stays brand-agnostic by
 * default; Sonic-specific visual tweaks live in scoped CSS:
 *
 *   1. Icon container picks up `--color-action-primary` so
 *      `currentColor`-fill SVGs (the orange Bank-Outline / Cash /
 *      Fast-Track icons passed in from `VdpPage` for the Sonic
 *      brand) adopt Sonic's orange primary. EchoPark
 *      multi-colour illustrative icons have hardcoded per-path
 *      fills and ignore the inherited `color` value — so this
 *      rule only ever visually affects `currentColor` icons.
 *   2. The `LinkCta` arrow caret swaps to the same primary
 *      colour, matching the treatment used by the sibling
 *      VDP sections (see `VdpPackagesOptions`). */
[data-brand='sonic'] .vdp-terms__icon {
  color: var(--color-action-primary);
}

[data-brand='sonic'] .vdp-terms :deep(.link-cta__arrow path) {
  fill: var(--color-action-primary);
}
</style>
