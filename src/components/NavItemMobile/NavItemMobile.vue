<script setup lang="ts">
/**
 * Mobile parent navigation item — the drill-in row used inside the mobile
 * menu drawer. Tapping the row navigates the user into a sub-menu (or a
 * sub-page); unlike the desktop dropdown variant it never toggles open/close,
 * so the trailing chevron always points right.
 *
 * Figma: "Navigation / hidden menu" (node 7639:20419).
 *
 * Anatomy: full-width row, `justify-content: space-between` so the label
 * pushes left and the chevron pins to the right edge of whatever container
 * the row lives in (typically a 100%-width drawer).
 *
 * Shares the global `--color-nav-*` tokens with `NavItem`.
 */
import chevronRightSvg from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Right.svg?raw'

withDefaults(defineProps<{
  /** Visible label. Alternatively use the default slot. */
  label?: string
  /**
   * `true` when this row should render in its bold "pressed" state (the
   * Figma "Pressed" visual). Typical use: mark the currently-drilled-in
   * branch in a breadcrumb-style mobile nav. The same visual is also
   * applied transiently via `:active` for tactile touch feedback during
   * press, so leave this `false` for normal rows.
   */
  active?: boolean
  /** When provided the row renders as an `<a>` instead of a `<button>`. */
  href?: string
  /** Anchor target (e.g. `_blank`). */
  target?: string
  /** Accessible label override when slot/label is not descriptive enough. */
  ariaLabel?: string
}>(), {
  active: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="nav-item-mobile"
    :class="{ 'nav-item-mobile--active': active }"
    :type="href ? undefined : 'button'"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <span class="nav-item-mobile__label">
      <slot>{{ label }}</slot>
    </span>

    <span
      class="nav-item-mobile__chevron"
      aria-hidden="true"
      v-html="chevronRightSvg"
    />
  </component>
</template>

<style scoped>
.nav-item-mobile {
  /* Fills its container so label + chevron span the full mobile-menu width.
   * Layout-stable focus ring: 3px transparent border + 4px horizontal
   * padding are reserved at all times so toggling :focus-visible never
   * shifts the surrounding rows. */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
  border: 3px solid transparent;
  padding: 0 4px;
  background: none;
  cursor: pointer;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-size: 18px;
  font-weight: var(--font-weight-regular);
  line-height: 1;
  letter-spacing: -0.036px;
  color: var(--color-nav-text, var(--color-neutral-0));
  text-decoration: none;
  text-align: left;
  transition: color 0.12s ease;
}

a.nav-item-mobile {
  text-decoration: none;
}

/* ─── Hover (only when not active) ───────────────────────── */
.nav-item-mobile:hover:not(.nav-item-mobile--active):not(:disabled) {
  color: var(--color-nav-text-hover, var(--color-action-accent));
}

.nav-item-mobile:hover:not(.nav-item-mobile--active):not(:disabled) .nav-item-mobile__label {
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: none;
}

/* ─── Pressed (touch-feedback) + Active prop ─────────────── */
.nav-item-mobile--active,
.nav-item-mobile:active:not(:disabled) {
  color: var(--color-nav-text-active, var(--color-neutral-0));
  /* Roboto Black per Figma — falls back to bold (700) where 900 isn't loaded. */
  font-weight: 900;
  text-decoration: none;
}

.nav-item-mobile--active .nav-item-mobile__label,
.nav-item-mobile:active:not(:disabled) .nav-item-mobile__label {
  text-decoration: none;
}

/* ─── Focus (keyboard) ───────────────────────────────────── */
.nav-item-mobile:focus-visible {
  outline: none;
  border-color: var(--color-nav-focus-ring, var(--color-focus-ring));
  color: var(--color-nav-text-focus, var(--color-action-accent-muted));
  text-decoration: none;
}

.nav-item-mobile.nav-item-mobile--active:focus-visible {
  font-weight: 900;
}

/* ─── Chevron (always Right, never rotates) ──────────────── */
.nav-item-mobile__chevron {
  display: inline-flex;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.nav-item-mobile__chevron :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

/* The bundled chevron SVG ships with `fill="#242C33"` baked in. Override so
 * the icon tracks the same `currentColor` as the label across all states. */
.nav-item-mobile__chevron :deep(path) {
  fill: currentColor;
}
</style>
