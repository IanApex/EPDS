<script setup lang="ts">
/**
 * ImageContentCard — white-label promotional card with a full-bleed
 * photo panel and a text + CTA content column.
 *
 * Figma: "Group 255" (node 7693:2940). The Sonic Automotive
 * "Service" card is the reference instance; all brand-specific
 * values (colours, copy, image, icon) are fully prop-driven so
 * the same component works across any sub-brand or topic.
 *
 * Two independent props control the desktop layout:
 *   `imagePosition` — which side the photo sits on (left / right)
 *   `imageProportion` — whether the photo column is the wider one
 *                       (large = 58 %, small = 42 %)
 * Combined they cover all four useful layouts:
 *   image-large-left  (default) · image-small-left
 *   image-large-right           · image-small-right
 *
 * Mobile: image always stacks above the content at 180 px,
 * CTA stretches full-width per the Figma mobile spec.
 *
 * Colour theming is automatic: the CTA uses `BaseButton
 * variant="primary"`, which picks up the host page's
 * `--color-btn-primary-*` tokens — red on Sonic, green on
 * EchoPark, etc. — without any prop intervention.
 */
import { computed, useSlots } from 'vue'
import BaseButton from '../BaseButton/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    /** URL of the photo that fills the image panel. */
    imageUrl: string
    /**
     * Accessible alt text for the image. Pass '' for purely
     * decorative photos (default) or a descriptive string when
     * the image carries meaning not expressed by the heading/body.
     */
    imageAlt?: string
    /**
     * Raw SVG markup for the icon beside the heading. Import the
     * SVG asset with `?raw` and pass the string directly. Fills
     * should use `currentColor` so the icon inherits the heading
     * colour automatically. Omit to render the heading without
     * a preceding icon, or override via the `#icon` slot.
     */
    iconSvg?: string
    /** Primary heading — the topic label (e.g. "Service"). */
    heading: string
    /** Descriptive body paragraph below the heading. */
    body: string
    /** Primary CTA button label. */
    ctaLabel: string
    /**
     * Side the image panel occupies on desktop.
     * - `'left'`  — image left, content right (default)
     * - `'right'` — image right, content left
     * On mobile the image always stacks above content regardless
     * of this value.
     */
    imagePosition?: 'left' | 'right'
    /**
     * Vertical alignment of the content column.
     * - `'center'` — content is vertically centred in the card (default)
     * - `'top'`    — content anchors to the top of the column; use in
     *               stacking/scroll-animated contexts so the heading
     *               is visible when only the top of the card peeks out.
     */
    contentAlign?: 'center' | 'top'
    /**
     * Whether the image panel is the wider or narrower column
     * on desktop.
     * - `'large'` — image column is 58 %, content is 42 % (default)
     * - `'small'` — image column is 42 %, content is 58 %
     *
     * Combined with `imagePosition` this gives four layouts:
     * | position | proportion | result                          |
     * |----------|------------|---------------------------------|
     * | left     | large      | big photo left, narrow text right |
     * | left     | small      | narrow photo left, wide text right |
     * | right    | large      | narrow text left, big photo right |
     * | right    | small      | wide text left, narrow photo right |
     */
    imageProportion?: 'large' | 'small'
  }>(),
  {
    imageAlt: '',
    imagePosition: 'left',
    imageProportion: 'large',
    contentAlign: 'center',
  },
)

const emit = defineEmits<{
  /**
   * Fired when the CTA is clicked. The parent is responsible
   * for navigation — the component never navigates itself.
   */
  'cta-click': [event: MouseEvent]
}>()

const slots = useSlots()

/**
 * Computes `grid-template-columns` for the 2×2 matrix of
 * imagePosition × imageProportion.
 *
 * When imagePosition='left' the image occupies column 1 (DOM order).
 * When imagePosition='right' CSS `order` swaps the columns visually,
 * so the image ends up in column 2 — meaning the grid column sizes
 * must be inverted relative to the 'left' case.
 *
 * Truth table (image column always gets the assigned fr value):
 *   left  + large → 58fr 42fr   (image in col 1 → col 1 is larger)
 *   left  + small → 42fr 58fr   (image in col 1 → col 1 is smaller)
 *   right + large → 42fr 58fr   (image in col 2 → col 2 is larger)
 *   right + small → 58fr 42fr   (image in col 2 → col 2 is smaller)
 */
const gridColumns = computed(() => {
  const imgLeft  = props.imagePosition  !== 'right'
  const imgLarge = props.imageProportion !== 'small'
  return (imgLeft === imgLarge) ? '58fr 42fr' : '42fr 58fr'
})

function onCtaClick(event: MouseEvent) {
  emit('cta-click', event)
}
</script>

<template>
  <div
    class="icc"
    :class="[`icc--image-${imagePosition}`]"
    :style="{ '--icc-columns': gridColumns }"
  >
    <!-- Photo panel. aria-hidden when the image is decorative
         (imageAlt=''); the heading + body already describe
         the card's purpose in that case. -->
    <div
      class="icc__image-wrap"
      :aria-hidden="imageAlt === '' ? 'true' : undefined"
    >
      <img
        :src="imageUrl"
        :alt="imageAlt"
        class="icc__image"
      />
    </div>

    <!-- Content column: icon + heading, body, CTA. -->
    <div class="icc__content" :class="{ 'icc__content--top': contentAlign === 'top' }">
      <div class="icc__text">
        <div class="icc__header">
          <!-- Icon: prefer the #icon slot for full control;
               fall back to the iconSvg prop for the common
               case of a single raw-SVG icon. -->
          <span
            v-if="slots.icon || iconSvg"
            class="icc__icon"
            aria-hidden="true"
          >
            <slot name="icon">
              <span v-html="iconSvg" />
            </slot>
          </span>

          <h2 class="icc__heading">{{ heading }}</h2>
        </div>

        <p class="icc__body">{{ body }}</p>
      </div>

      <BaseButton
        class="icc__cta"
        variant="primary"
        size="md"
        :label="ctaLabel"
        @click="onCtaClick"
      />
    </div>
  </div>
</template>

<style scoped>
/* ─── Card root ────────────────────────────────────────────
 * CSS grid drives the side-by-side desktop layout. The 58/42
 * column split matches the Figma image-panel proportion.
 * `overflow: hidden` clips the image to the card boundary
 * and keeps the border-radius crisp on the photo corners.
 * The top shadow (`0 -4px`) creates a subtle lift effect
 * where this card butts against the section above it. */
.icc {
  display: grid;
  grid-template-columns: var(--icc-columns, 58fr 42fr);
  min-height: 447px;
  overflow: hidden;
  border-radius: 2px;
  background: var(--color-neutral-95, #f2f2f2);
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.08);
}

/* Flip column order for imagePosition="right". DOM order
 * stays image-first for screen readers in both orientations. */
.icc--image-right .icc__image-wrap { order: 2; }
.icc--image-right .icc__content    { order: 1; }

/* ─── Image panel ──────────────────────────────────────────
 * Absolutely-positioned image fills its grid cell completely,
 * maintaining aspect ratio via object-fit:cover. The wrapper
 * is the positioned parent and its grid sizing determines
 * the rendered dimensions. */
.icc__image-wrap {
  position: relative;
  overflow: hidden;
}

.icc__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* ─── Content column ───────────────────────────────────────
 * Vertically centred flex column. The 32px gap separates the
 * text block from the CTA, matching the Figma `gap-[32px]`.
 * Horizontal padding gives clearance from the image edge and
 * the card's outer edge. */
.icc__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding: 48px 56px;
  box-sizing: border-box;
}

.icc__text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* ─── Icon + heading row ───────────────────────────────────
 * Inline-flex keeps the icon and heading on a single line.
 * align-items:center visually centres the icon against the
 * heading's cap-height for balanced weight. */
.icc__header {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Icon wrapper: fixed 40px square so any SVG or raster image
 * passed via the prop or #icon slot renders at a consistent
 * size. :deep rules rewrite SVG fill/stroke to currentColor
 * so icon colour tracks the heading without extra props. */
.icc__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  color: var(--color-neutral-0);
}

.icc__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.icc__icon :deep(path),
.icc__icon :deep(rect),
.icc__icon :deep(circle),
.icc__icon :deep(polygon) {
  fill: currentColor;
}

.icc__heading {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: var(--font-weight-bold, 700);
  font-size: 36px;
  line-height: 1.3;
  letter-spacing: -0.396px;
  color: var(--color-neutral-0);
}

.icc__body {
  margin: 0;
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-regular, 400);
  font-size: 24px;
  line-height: 29px;
  letter-spacing: -0.5px;
  color: var(--color-neutral-0);
}

/* Top-aligned variant: anchor heading to card top so it's
 * visible in scroll-stacking peek contexts. 24px top padding
 * matches the Figma peek-header offset (node 7693:2681). */
.icc__content--top {
  justify-content: flex-start;
  padding-top: 24px;
}

/* Align the CTA to the start of the cross axis (left-align
 * in the column) so it doesn't stretch to the column width
 * on desktop. Overridden to full-width on mobile below. */
.icc__cta {
  flex-shrink: 0;
  align-self: flex-start;
}

/* ─── Mobile (≤ 599px) ─────────────────────────────────────
 * Single-column stack: image on top at a fixed 180px, content
 * below. imagePosition is ignored on mobile — image always
 * leads. The CTA stretches full-width per the Figma mobile
 * spec; override max-width from BaseButton's 336px cap. */
@media (max-width: 599.98px) {
  .icc {
    grid-template-columns: 1fr;
    min-height: 0;
    box-shadow: 0 -4px 2px 0 rgba(0, 0, 0, 0.08);
  }

  .icc--image-right .icc__image-wrap,
  .icc__image-wrap {
    order: 0;
    position: relative;
    height: 180px;
  }

  .icc--image-right .icc__content,
  .icc__content {
    order: 1;
    gap: 24px;
    padding: 24px;
  }

  .icc__text {
    gap: 8px;
  }

  .icc__header {
    gap: 8px;
  }

  .icc__icon {
    width: 28px;
    height: 28px;
  }

  .icc__heading {
    font-size: 24px;
    letter-spacing: -0.264px;
  }

  .icc__body {
    font-size: 16px;
    line-height: 29px;
  }

  /* Full-width CTA: align-self:stretch expands the wrapper;
   * max-width:none overrides BaseButton's 336px default. */
  .icc__cta {
    align-self: stretch;
    max-width: none;
    width: 100%;
  }
}
</style>
