<script setup lang="ts">
/**
 * VDP "Standout Features" section — a photo mosaic on top and a
 * gray-band feature strip below. Sized to sit flush with the page's
 * edges on desktop / mobile (the host page is expected to wrap this
 * component in a container that breaks out of its horizontal gutters;
 * see `VdpPage` for the reference integration).
 *
 * Figma: desktop `Frame 13951:55390`, tablet `Frame 13951:55451`,
 *         mobile `Frame 13951:55479`.
 *
 * ─── Design-system substitutions vs. Figma ──────────────────
 * - Feature-band background `#F2F2F2` → `--color-neutral-95`
 *   (`#F4F5F7`), the canonical "gray surface" token.
 * - Text color `#313D47` → `--color-neutral-20` (exact token match;
 *   Figma's literal is the DS token's actual value).
 * - Image gap normalized to 8 px (`--spacing-nano`) on every
 *   breakpoint — Figma shows 13 px on desktop which is off the 8-pt
 *   scale; the 5 px delta is visually imperceptible.
 * - Gallery image border radius snaps to `--border-radius-md` (8 px).
 * - Band vertical padding snaps to `--spacing-xxl` (80 px) on
 *   desktop / `--spacing-xs` (32 px) on tablet + mobile.
 */

export interface StandoutImage {
  src: string
  alt?: string
}

export interface StandoutFeature {
  /** Display label, e.g. "Heads up display". */
  label: string
  /** Raw SVG markup, typically imported via `@icons/...svg?raw`. */
  iconSvg?: string
}

withDefaults(defineProps<{
  /** Section heading. */
  label?: string
  /**
   * Gallery images — exactly 3 are expected: [hero, thumb1, thumb2].
   * Additional images are ignored. Missing thumbs collapse gracefully
   * so a single hero image still renders on its own.
   */
  images: StandoutImage[]
  /** Feature chips rendered in the gray band. */
  features: StandoutFeature[]
}>(), {
  label: 'Standout Features',
})
</script>

<template>
  <section class="vdp-sf" aria-labelledby="vdp-sf-title">
    <!-- ── Photo mosaic ──────────────────────────────────
         Desktop: big hero on the left + 2 stacked thumbs on
         the right. Tablet / mobile: stack hero above a 2-up
         thumb row. -->
    <div class="vdp-sf__gallery">
      <img
        v-if="images[0]"
        class="vdp-sf__hero"
        :src="images[0].src"
        :alt="images[0].alt || ''"
      />
      <div v-if="images[1] || images[2]" class="vdp-sf__thumbs">
        <img
          v-if="images[1]"
          class="vdp-sf__thumb"
          :src="images[1].src"
          :alt="images[1].alt || ''"
        />
        <img
          v-if="images[2]"
          class="vdp-sf__thumb"
          :src="images[2].src"
          :alt="images[2].alt || ''"
        />
      </div>
    </div>

    <!-- ── Gray feature band ─────────────────────────────── -->
    <div class="vdp-sf__band">
      <div class="vdp-sf__band-inner">
        <h2 id="vdp-sf-title" class="vdp-sf__title">{{ label }}</h2>

        <ul v-if="features.length" class="vdp-sf__features">
          <li
            v-for="(feature, i) in features"
            :key="`${feature.label}-${i}`"
            class="vdp-sf__feature"
          >
            <span
              v-if="feature.iconSvg"
              class="vdp-sf__icon"
              aria-hidden="true"
              v-html="feature.iconSvg"
            />
            <span class="vdp-sf__feature-label">
              {{ feature.label }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Container ──────────────────────────────────────────
 * Component spans the full width of its host container and
 * lays out its two children (gallery + band) vertically with
 * no gap — the gray band sits flush against the bottom of the
 * last gallery row, matching Figma. */
.vdp-sf {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: var(--font-family-base);
  color: var(--color-neutral-20);
}

/* ─── Desktop gallery (≥ lg) ─────────────────────────────
 * 2-column flex row: hero ~2fr on the left, a stacked column
 * of 2 thumbs ~1fr on the right. 8 px gap between everything
 * (Figma shows 13 px between the stacked thumbs; snapped to
 * the `--spacing-nano` 8 px token). */
.vdp-sf__gallery {
  display: flex;
  gap: var(--spacing-nano); /* 8px */
  width: 100%;
}

.vdp-sf__hero {
  flex: 2 1 0;
  min-width: 0;
  width: 100%;
  aspect-ratio: 957 / 540;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  display: block;
}

.vdp-sf__thumbs {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-nano); /* 8px */
}

.vdp-sf__thumb {
  width: 100%;
  aspect-ratio: 475 / 263;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
  display: block;
}

/* ─── Gray feature band ──────────────────────────────────
 * Fills the full component width with a neutral surface
 * background; content inside is inset 80 px horizontally
 * per Figma so it aligns with the 80 px tablet page-gutter
 * rhythm used elsewhere on the VDP. */
.vdp-sf__band {
  background-color: var(--color-neutral-95); /* #F4F5F7 */
  padding: var(--spacing-xxl);               /* 80px all sides */
  box-sizing: border-box;
}

.vdp-sf__band-inner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm); /* 40px title → features */
}

.vdp-sf__title {
  margin: 0;
  font-size: var(--text-h3-size);             /* 32px */
  font-weight: var(--text-h3-weight);         /* light */
  line-height: var(--text-h3-line-height);    /* 1.2 */
  letter-spacing: var(--text-h3-letter-spacing);
  color: var(--color-neutral-20);
}

/* ─── Feature chips ──────────────────────────────────────
 * Desktop: 4-column flex row, each chip hugs its content and
 * the row distributes remaining space via `justify-content:
 * space-between`. Chips always read as icon + 8 px gap + text
 * label, vertically centered. */
.vdp-sf__features {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--spacing-xxxs); /* 16px fallback gap for wrap edge cases */
}

.vdp-sf__feature {
  display: flex;
  align-items: center;
  gap: var(--spacing-nano); /* 8px */
  min-width: 0;
}

.vdp-sf__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  color: var(--color-neutral-20);
}

.vdp-sf__icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.vdp-sf__feature-label {
  font-size: var(--text-subhead-size);         /* 16px */
  line-height: var(--text-subhead-line-height);
  letter-spacing: var(--text-subhead-letter-spacing);
  color: var(--color-neutral-20);
  font-weight: var(--font-weight-regular);
}

/* ─── Tablet (< lg) ──────────────────────────────────────
 * Gallery stacks: hero full-width on top, 2-up thumb row
 * below with an 8 px gap. Band padding tightens vertically
 * (`--spacing-xs` 32 px) and the feature list becomes a
 * 2-column CSS grid with a 32 px row gap. */
@media (max-width: 1023.98px) {
  .vdp-sf__gallery {
    flex-direction: column;
  }

  .vdp-sf__hero {
    aspect-ratio: 802 / 456;
  }

  .vdp-sf__thumbs {
    flex-direction: row;
  }

  /* Clear the base `width: 100%` so the two thumbs share the
   * row evenly via `flex: 1 1 0` instead of each stretching
   * to the full row width. */
  .vdp-sf__thumb {
    width: auto;
    flex: 1 1 0;
    min-width: 0;
    aspect-ratio: 397 / 287;
  }

  .vdp-sf__band {
    padding: var(--spacing-xs) var(--spacing-xxl); /* 32px / 80px */
  }

  .vdp-sf__features {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: var(--spacing-xs); /* 32px */
    column-gap: var(--spacing-nano);
  }
}

/* ─── Mobile (< md) ──────────────────────────────────────
 * Same vertical stack as tablet with tighter image aspects
 * and a single-column feature list. Band inset drops to the
 * 24 px page-gutter used elsewhere on mobile VDP. */
@media (max-width: 599.98px) {
  .vdp-sf__hero {
    aspect-ratio: 375 / 213;
  }

  .vdp-sf__thumb {
    aspect-ratio: 183.5 / 164;
  }

  .vdp-sf__band {
    padding: var(--spacing-xs) var(--spacing-xxs); /* 32px / 24px */
  }

  .vdp-sf__features {
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--spacing-xs); /* 32px */
  }
}
</style>
