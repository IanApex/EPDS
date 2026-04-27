<script setup lang="ts">
/**
 * Single navigation item — atom for the global header (currently themed for
 * Sonic Automotive). Two Figma variants are folded into one component:
 *
 *   • "Navigation / no dropdown"   (node 7639:20395)  →  default
 *   • "Navigation / with dropdown" (node 7639:20405)  →  dropdown
 *
 * Pass `dropdown` to render the trailing 24×24 chevron. The chevron points
 * Down by default + hover and Up when `active` is true (matches Figma's
 * Active / Focus Selected states, which signal an open/selected dropdown).
 *
 * Styling is brand-aware via `--color-nav-*` tokens (defined in both
 * primitives files with identical values for now).
 */
import chevronDownSvg from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Down.svg?raw'

const props = withDefaults(defineProps<{
  /** Visible label. Alternatively use the default slot. */
  label?: string
  /**
   * `true` when this nav item represents the current page (no-dropdown
   * variant) or has an open menu (dropdown variant). Renders bold
   * (Roboto Black 900), flips the chevron up on the dropdown variant,
   * and applies `aria-current="page"` to anchors / `aria-pressed="true"`
   * to buttons.
   *
   * Use with `v-model:active`. For dropdown items the component toggles
   * this on click; for plain links the parent owns it (typically wired
   * to the current route).
   */
  active?: boolean
  /** Show the trailing 24×24 chevron (with-dropdown variant). */
  dropdown?: boolean
  /** When provided the component renders as an `<a>` instead of a `<button>`. */
  href?: string
  /** Anchor target (e.g. `_blank`). */
  target?: string
  /** Accessible label override when slot/label is not descriptive enough. */
  ariaLabel?: string
}>(), {
  active: false,
  dropdown: false,
})

const emit = defineEmits<{
  /**
   * Fired when the active state should change. Emitted automatically on
   * click for the dropdown variant (toggle open/close); plain links never
   * emit this — they leave routing-driven active state to the parent.
   */
  'update:active': [value: boolean]
  /** Fired on every click. Parents may intercept (analytics, prevent default, …). */
  click: [event: MouseEvent]
}>()

function onClick(event: MouseEvent) {
  if (props.dropdown) {
    emit('update:active', !props.active)
  }
  emit('click', event)
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="nav-item"
    :class="{
      'nav-item--active': active,
      'nav-item--dropdown': dropdown,
    }"
    :type="href ? undefined : 'button'"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-current="href && active && !dropdown ? 'page' : undefined"
    :aria-pressed="!href && active && !dropdown ? 'true' : undefined"
    :aria-haspopup="dropdown ? 'true' : undefined"
    :aria-expanded="dropdown ? (active ? 'true' : 'false') : undefined"
    :aria-label="ariaLabel"
    @click="onClick"
  >
    <span class="nav-item__label">
      <slot>{{ label }}</slot>
    </span>

    <span
      v-if="dropdown"
      class="nav-item__chevron"
      aria-hidden="true"
      v-html="chevronDownSvg"
    />
  </component>
</template>

<style scoped>
.nav-item {
  /* Layout-stable focus ring: 3px transparent border + 4px horizontal padding
   * are reserved at all times so toggling :focus-visible never shifts the
   * surrounding nav layout. */
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 3px solid transparent;
  padding: 0 4px;
  background: none;
  cursor: pointer;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-size: 16px;
  font-weight: var(--font-weight-regular);
  line-height: 1;
  letter-spacing: -0.032px;
  color: var(--color-nav-text, var(--color-neutral-0));
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.12s ease;
}

a.nav-item {
  text-decoration: none;
}

/* ─── Hover (only when not active) ───────────────────────── */
.nav-item:hover:not(.nav-item--active):not(:disabled) .nav-item__label {
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: none;
}

.nav-item:hover:not(.nav-item--active):not(:disabled) {
  color: var(--color-nav-text-hover, var(--color-action-accent));
}

/* ─── Active (current page / open dropdown) ──────────────── */
.nav-item--active {
  color: var(--color-nav-text-active, var(--color-neutral-0));
  /* Roboto Black per Figma — falls back to bold (700) where 900 isn't loaded. */
  font-weight: 900;
}

/* ─── Focus (keyboard) ───────────────────────────────────── */
.nav-item:focus-visible {
  outline: none;
  border-color: var(--color-nav-focus-ring, var(--color-focus-ring));
  color: var(--color-nav-text-focus, var(--color-action-accent-muted));
  text-decoration: none;
}

.nav-item.nav-item--active:focus-visible {
  font-weight: 900;
}

/* ─── Chevron (dropdown variant) ─────────────────────────── */
.nav-item__chevron {
  display: inline-flex;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  /* Flip Down → Up by rotating when the dropdown is open / active. */
  transition: transform 0.15s ease;
}

.nav-item--active .nav-item__chevron {
  transform: rotate(180deg);
}

.nav-item__chevron :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

/* The bundled chevron SVG ships with `fill="#242C33"` baked in. Override so
 * the icon tracks the same `currentColor` as the label across all states. */
.nav-item__chevron :deep(path) {
  fill: currentColor;
}
</style>
