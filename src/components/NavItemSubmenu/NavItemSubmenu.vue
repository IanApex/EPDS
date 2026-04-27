<script setup lang="ts">
/**
 * Sub-menu navigation item — the leaf-level link inside a drilled-in mobile
 * sub-menu (the level below `NavItemMobile`). No chevron — clicking simply
 * navigates to the destination.
 *
 * Figma: "Submenu" (node 7639:20454).
 *
 * Rendered as `<button>` by default or `<a>` when `href` is set. Layout is
 * content-sized (inline-flex); the parent menu container controls stacking
 * and full-width tap targets.
 *
 * Shares the global `--color-nav-*` tokens with `NavItem` and
 * `NavItemMobile`. Note typography differs from the parent rows:
 * line-height 1.5 (vs 1) and tighter letter-spacing -0.352 px.
 */
withDefaults(defineProps<{
  /** Visible label. Alternatively use the default slot. */
  label?: string
  /**
   * `true` when this row should render in its bold "pressed" state. Typical
   * use: mark the currently-selected sub-menu link. The same visual is also
   * applied transiently via `:active` for tactile press feedback, so leave
   * `false` for normal rows.
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
    class="nav-item-submenu"
    :class="{ 'nav-item-submenu--active': active }"
    :type="href ? undefined : 'button'"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-current="href && active ? 'page' : undefined"
    :aria-pressed="!href && active ? 'true' : undefined"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </component>
</template>

<style scoped>
.nav-item-submenu {
  /* Content-sized inline link. Layout-stable focus ring: 3px transparent
   * border + 4px horizontal padding are reserved at all times so toggling
   * :focus-visible never shifts surrounding rows. */
  display: inline-flex;
  align-items: center;
  border: 3px solid transparent;
  padding: 0 4px;
  background: none;
  cursor: pointer;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-size: 16px;
  font-weight: var(--font-weight-regular);
  line-height: 1.5;
  letter-spacing: -0.352px;
  color: var(--color-nav-text, var(--color-neutral-0));
  text-decoration: none;
  white-space: nowrap;
  text-align: left;
  transition: color 0.12s ease;
}

a.nav-item-submenu {
  text-decoration: none;
}

/* ─── Hover (only when not active) ───────────────────────── */
.nav-item-submenu:hover:not(.nav-item-submenu--active):not(:disabled) {
  color: var(--color-nav-text-hover, var(--color-action-accent));
  text-decoration: underline;
  text-underline-offset: 2px;
  text-decoration-skip-ink: none;
}

/* ─── Pressed (touch-feedback) + Active prop ─────────────── */
.nav-item-submenu--active,
.nav-item-submenu:active:not(:disabled) {
  color: var(--color-nav-text-active, var(--color-neutral-0));
  /* Roboto Black per Figma — falls back to bold (700) where 900 isn't loaded. */
  font-weight: 900;
  text-decoration: none;
}

/* ─── Focus (keyboard) ───────────────────────────────────── */
.nav-item-submenu:focus-visible {
  outline: none;
  border-color: var(--color-nav-focus-ring, var(--color-focus-ring));
  color: var(--color-nav-text-focus, var(--color-action-accent-muted));
  text-decoration: none;
}

.nav-item-submenu.nav-item-submenu--active:focus-visible {
  font-weight: 900;
}
</style>
