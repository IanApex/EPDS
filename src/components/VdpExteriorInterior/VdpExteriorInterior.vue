<script setup lang="ts">
/**
 * VDP "Exterior & Interior" section — vehicle attribute grid with an
 * H3 heading on top and a responsive grid of label/value pairs below.
 * Sibling to `VdpPackagesOptions`; sits in the same VDP content column
 * with the same 1283 px max content width.
 *
 * Each row can optionally render a 16 px left-of-value "swatch":
 *   - `color`: solid-fill circle (paint code / exterior color)
 *   - `image`: rounded-square textured with a URL (upholstery photo)
 *   - omit:   plain text value (wheels, trim, body style, seats)
 *
 * Figma: desktop `Frame 13951:51143`, tablet `Frame 13951:51180`,
 *         mobile `Frame 13951:51207`.
 *
 * ─── Design-system substitutions vs. Figma ──────────────────
 * - Text color `#262626` (Figma "Anthracite") → `--color-neutral-0`
 *   (`#242C33`), the canonical primary text token.
 * - Label (14 px regular uppercase) uses `--text-body-sm-*` tokens
 *   + `text-transform: uppercase`; letter-spacing left at token default.
 * - Value (16 px bold) uses `--text-subhead-*` tokens; line-height
 *   resolves to 22.4 px rather than Figma's literal 20 px so the scale
 *   stays on-token.
 * - Row gap on desktop is `--spacing-lg` (56 px) rather than Figma's
 *   60 px; all other spacing (40 px / 32 px / 24 px / 8 px / 4 px) is
 *   already on the DS scale and used as-is.
 */

export type SwatchType = 'color' | 'image'

export interface AttributeItem {
  /** Small uppercase label, e.g. "Color" or "Body Style". */
  label: string
  /** Main bold value, e.g. "Arctic Race Blue metallic". */
  value: string
  /**
   * Optional visual swatch rendered immediately before the value.
   * Omit for plain-text rows (wheels, interior trim, etc.).
   */
  swatchType?: SwatchType
  /** CSS color for `swatchType: 'color'`. */
  swatchColor?: string
  /** Image URL for `swatchType: 'image'`. */
  swatchImageUrl?: string
  /** Accessible description for the swatch. Defaults to the label. */
  swatchAlt?: string
}

withDefaults(defineProps<{
  /** Section heading. */
  label?: string
  /** Attribute rows rendered in the responsive grid. */
  attributes: AttributeItem[]
}>(), {
  label: 'Exterior & Interior',
})
</script>

<template>
  <section class="vdp-ei" aria-labelledby="vdp-ei-title">
    <header class="vdp-ei__title-col">
      <h2 id="vdp-ei-title" class="vdp-ei__title">{{ label }}</h2>
    </header>

    <dl v-if="attributes.length" class="vdp-ei__grid">
      <div
        v-for="(item, i) in attributes"
        :key="`${item.label}-${i}`"
        class="vdp-ei__item"
      >
        <dt class="vdp-ei__label">{{ item.label }}</dt>
        <dd class="vdp-ei__value-row">
          <span
            v-if="item.swatchType === 'color'"
            class="vdp-ei__swatch vdp-ei__swatch--color"
            :style="{ backgroundColor: item.swatchColor || 'transparent' }"
            :aria-label="item.swatchAlt || item.label"
            role="img"
          />
          <span
            v-else-if="item.swatchType === 'image' && item.swatchImageUrl"
            class="vdp-ei__swatch vdp-ei__swatch--image"
            :style="{ backgroundImage: `url(${item.swatchImageUrl})` }"
            :aria-label="item.swatchAlt || item.label"
            role="img"
          />
          <span class="vdp-ei__value">{{ item.value }}</span>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
/* ─── Desktop (≥ lg) ──────────────────────────────────────
 * Figma desktop frame 13951:51143 (1283 wide). Title stacks
 * above a 4-column attribute grid with a 56 px row gap (DS
 * `--spacing-lg`; Figma shows ~60 px, snapped to the nearest
 * token). The grid fills the full content column. */
.vdp-ei {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--spacing-sm); /* 40px between title and grid */
  width: 100%;
  font-family: var(--font-family-base);
  color: var(--color-neutral-0);
}

.vdp-ei__title-col {
  min-width: 0;
}

.vdp-ei__title {
  margin: 0;
  font-size: var(--text-h3-size);             /* 32px */
  font-weight: var(--text-h3-weight);         /* light */
  line-height: var(--text-h3-line-height);    /* 1.2 */
  letter-spacing: var(--text-h3-letter-spacing);
  color: var(--color-neutral-0);
}

.vdp-ei__grid {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: var(--spacing-xxs);  /* 24px */
  row-gap: var(--spacing-lg);      /* 56px */
  min-width: 0;
}

/* ─── Attribute cell ─────────────────────────────────────
 * Uppercase 14 px label with a 4 px gap before the 16 px bold
 * value; swatch (if present) sits 8 px left of the value and
 * is vertically centered. `min-width: 0` lets long values
 * wrap instead of stretching the grid. */
.vdp-ei__item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-quarck); /* 4px */
  min-width: 0;
}

.vdp-ei__label {
  margin: 0;
  font-size: var(--text-body-sm-size);         /* 14px */
  font-weight: var(--text-body-sm-weight);     /* regular */
  line-height: var(--text-body-sm-line-height);
  letter-spacing: var(--text-body-sm-letter-spacing);
  text-transform: uppercase;
  color: var(--color-neutral-0);
}

.vdp-ei__value-row {
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-nano); /* 8px */
  min-width: 0;
}

.vdp-ei__value {
  flex: 1 1 auto;
  min-width: 0;
  font-size: var(--text-subhead-size);         /* 16px */
  font-weight: var(--text-subhead-weight);     /* bold */
  line-height: var(--text-subhead-line-height);
  letter-spacing: var(--text-subhead-letter-spacing);
  color: var(--color-neutral-0);
}

/* ─── Swatch chip ─────────────────────────────────────────
 * 16 × 16 visual marker. `color` type renders a circle; image
 * type renders a 4 px-radius rounded square textured with the
 * provided URL (cover-fit so odd crops still read cleanly).
 * A 1 px inset border keeps very light swatches (e.g. ivory
 * white) legible against the white page. */
.vdp-ei__swatch {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 10%);
}

.vdp-ei__swatch--color {
  border-radius: 50%;
}

.vdp-ei__swatch--image {
  border-radius: var(--border-radius-sm, 4px);
}

/* ─── Tablet (< lg) ───────────────────────────────────────
 * Figma tablet frame 13951:51180 (802 wide). 3-column grid
 * with a 32 px row gap (`--spacing-xs`); section is inset
 * 80 px on each side to match the frame's title + content
 * x=80 origin. */
@media (max-width: 1023.98px) {
  .vdp-ei {
    padding: 0 var(--spacing-xxl); /* 80px */
    gap: var(--spacing-xs);        /* 32px title → grid */
  }

  .vdp-ei__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: var(--spacing-xs);    /* 32px */
  }
}

/* ─── Mobile (< md) ───────────────────────────────────────
 * Figma mobile frame 13951:51207 (377 wide). 2-column grid,
 * section inset drops to 24 px to match the frame's left/right
 * gutter. Row gap stays at 32 px per Figma. */
@media (max-width: 599.98px) {
  .vdp-ei {
    padding: 0 var(--spacing-xxs); /* 24px */
  }

  .vdp-ei__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
