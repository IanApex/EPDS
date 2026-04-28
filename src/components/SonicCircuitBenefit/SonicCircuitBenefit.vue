<script setup lang="ts">
/**
 * SonicCircuitBenefit — single icon-on-circle + caption tile.
 *
 * Building block for `SonicCircuit` (Figma "The Sonic Circuit"
 * section). Render shape: a 102 px (desktop) / 64 px (mobile)
 * circle with a translucent white fill, a `#D0D4D9` icon centered
 * inside, and a white regular-weight caption below.
 *
 * Tile is purely presentational — no click target, no link. The
 * parent section owns the CTA.
 *
 * The icon is passed as a raw SVG string via the `iconSvg` prop
 * (import the source SVG with `?raw`). The atom renders the SVG
 * directly into `.scb__icon` via `v-html` — no consumer-side
 * wrapper element — so the SVG is a direct child of the sized
 * 78 × 78 box and its `path` fills inherit `currentColor`
 * (driven by the wrapper's `color` value).
 *
 *   <SonicCircuitBenefit
 *     :iconSvg="mapPinSvg"
 *     caption="Earn points everywhere"
 *   />
 */
defineProps<{
  /** Body text rendered below the circle (16 px, white, centered). */
  caption: string
  /**
   * Raw SVG markup for the icon. Import the source SVG with `?raw`.
   * Every `path / circle / rect / polygon / polyline / ellipse` fill
   * is rewritten to `currentColor` so a single SVG asset tints
   * uniformly regardless of its source `fill` attribute.
   */
  iconSvg: string
}>()
</script>

<template>
  <li class="scb">
    <span class="scb__circle" aria-hidden="true">
      <!-- v-html renders the SVG as a direct child of `.scb__icon`,
           so the 78×78 sizing on the wrapper applies to the SVG
           itself (`:deep(svg) { width:100%; height:100% }`). -->
      <span class="scb__icon" v-html="iconSvg" />
    </span>
    <p class="scb__caption">{{ caption }}</p>
  </li>
</template>

<style scoped>
/* ─── Tile ─────────────────────────────────────────────────
 * Fixed-width column (284 px on desktop / 100 % on mobile)
 * with a 16 px gap between the icon disk and the caption text.
 * Renders as <li> so the parent organism's <ul> contributes
 * proper list semantics for assistive tech (the visible
 * appearance is that of a feature card, but the underlying
 * structure is a benefits list). */
.scb {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  width: 284px;
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--color-neutral-100);
}

/* Circle disk — 102 × 102 px with a 15% white tint. Mirrors the
 * Figma `imgEllipse61` SVG (semi-transparent white circle). The
 * disk pre-multiplies onto whatever the section background is
 * (Sonic navy `#25303d`), producing the "frosted" feel from the
 * design. */
.scb__circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 102px;
  height: 102px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

/* Icon wrapper sized to the Figma 78 × 78 inner art. v-html drops
 * the SVG in as a direct child of this element, so the 78 × 78
 * sizing applies to the SVG via the `:deep(svg) { 100% }` rule
 * below. `color` drives `currentColor` on the SVG fills — Figma
 * spec is `#D0D4D9` (warm light grey) against the navy disk. */
.scb__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 78px;
  color: #D0D4D9;
}

/* Force the SVG to fill the 78 × 78 wrapper regardless of source
 * dimensions (icon SVGs in the system are 24 / 32 / 80 px). */
.scb__icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

/* Tint every fillable SVG element via currentColor so all four
 * icons render in the same `#D0D4D9` against the disk regardless
 * of the source SVG's own fill attributes. */
.scb__icon :deep(path),
.scb__icon :deep(circle),
.scb__icon :deep(rect),
.scb__icon :deep(polygon),
.scb__icon :deep(polyline),
.scb__icon :deep(ellipse) {
  fill: currentColor;
}

/* Caption — 16 / 22 / -0.5 px regular, centered. The width is
 * controlled by the parent `.scb` (284 px column). */
.scb__caption {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-size: 16px;
  font-weight: var(--font-weight-regular, 400);
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: center;
  color: var(--color-neutral-100);
}

/* ─── Mobile (<600) ───────────────────────────────────────
 * Mobile shrinks the disk to 64 px and the inner art to 49 px,
 * and lets the caption fill the available column width since
 * the parent organism stacks tiles vertically below 600 px. */
@media (max-width: 599.98px) {
  .scb {
    width: 100%;
  }
  .scb__circle {
    width: 64px;
    height: 64px;
  }
  .scb__icon {
    /* Figma values: 48.941 px ≈ 49 px. */
    width: 49px;
    height: 49px;
  }
}
</style>
