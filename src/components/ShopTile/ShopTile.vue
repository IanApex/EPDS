<script setup lang="ts">
import { computed } from 'vue'

/**
 * ShopTile — image tile with gradient overlay and bold white headline.
 *
 * Used in marketing "shop by …" grids (e.g. the homepage "A ride for
 * every moment" section). Renders as an `<a>` when `href` is provided;
 * otherwise as a `<button>` so it's still keyboard-focusable / clickable
 * for parent-driven routing.
 *
 * Layout: 240 px tall, full-bleed background image with a top-anchored
 * dark gradient (so the white label reads cleanly) and a 32 / Bold white
 * label pinned to the top-left at 24 px inset. Width is owned by the
 * parent grid (flex / grid `1fr`).
 */
const props = withDefaults(
  defineProps<{
    /** Headline text shown over the image (top-left). */
    label: string
    /** Background image URL (Vite-imported asset URL string). */
    imageUrl: string
    /** Optional href — when set the tile renders as a real link. */
    href?: string
    target?: string
    /**
     * Decorative-by-default. Pass non-empty `imageAlt` only when the photo
     * carries information beyond the label (rarely the case for category
     * tiles — the label already names the destination).
     */
    imageAlt?: string
  }>(),
  { imageAlt: '' },
)

defineEmits<{
  click: [event: MouseEvent]
}>()

const isLink = computed(() => !!props.href)

const linkRel = computed(() =>
  props.href && props.target === '_blank' ? 'noopener noreferrer' : undefined,
)
</script>

<template>
  <component
    :is="isLink ? 'a' : 'button'"
    class="shop-tile"
    :href="isLink ? href : undefined"
    :target="isLink ? target : undefined"
    :rel="linkRel"
    :type="isLink ? undefined : 'button'"
    @click="$emit('click', $event)"
  >
    <img
      class="shop-tile__image"
      :src="imageUrl"
      :alt="imageAlt"
      :aria-hidden="imageAlt ? undefined : 'true'"
    />
    <span class="shop-tile__scrim" aria-hidden="true" />
    <span class="shop-tile__label">{{ label }}</span>
  </component>
</template>

<style scoped>
/* The tile is its own positioning context so the image, gradient and
 * label can stack via absolute / relative without bleeding out. */
.shop-tile {
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
  height: 240px;
  padding: 24px;
  box-sizing: border-box;
  border: 0;
  border-radius: 2px; /* Sonic spec — matches `--button-border-radius` on Sonic */
  overflow: hidden;
  background: var(--color-neutral-95);
  color: var(--color-neutral-100);
  cursor: pointer;
  text-align: left;
  text-decoration: none;
  font-family: var(--font-family-brand, var(--font-family-base));
  /* Reserve focus-ring space without layout shift. */
  outline: 3px solid transparent;
  outline-offset: 0;
  transition: outline-color 120ms ease;
}

.shop-tile:focus-visible {
  outline-color: var(--color-focus-ring);
}

.shop-tile__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 0;
}

/* Three-stop scrim from Figma (rgba(41,43,46,0.8) → 0.53 → 0.16),
 * top-anchored so the bold label at the top-left sits on the darkest
 * portion of the tile. The tail of the gradient (~60% down) lifts to
 * 0.16 alpha so the lower part of the photo shows through. */
.shop-tile__scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(41, 43, 46, 0.8) 19.712%,
    rgba(41, 43, 46, 0.53) 60.097%,
    rgba(41, 43, 46, 0.16) 100%
  );
}

.shop-tile__label {
  position: relative;
  z-index: 2;
  display: block;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -1.2px;
  color: var(--color-neutral-100);
}

/* Hover affordance: subtle underline on the label so the tile reads
 * unambiguously as a click target. */
.shop-tile:hover .shop-tile__label,
.shop-tile:focus-visible .shop-tile__label {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
}

/* ─── Mobile (<600) ───────────────────────────────────────
 * Figma mobile shows tile labels at 28 px Bold (vs 32 px on desktop).
 * Same 240 px height so vertical stacking reads consistent. */
@media (max-width: 599.98px) {
  .shop-tile__label {
    font-size: 28px;
    letter-spacing: -1.05px;
  }
}
</style>
