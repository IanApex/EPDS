<script setup lang="ts">
/**
 * Generic nav-area icon button — used for the Favorites heart, the Profile
 * avatar, and any other 24 × 24 icon that lives in the global header next to
 * the primary nav. Pure shape primitive: the consumer passes the SVG via the
 * `#icon` slot and decides where the click should go.
 *
 * Figma frames: Favorites heart (node `7639:21078`, "Hamburger menu" frame —
 * Figma label is misleading; it's the Favorites icon) and Profile avatar
 * (node `7639:21038`, "Icon" frame). Same four states drive both.
 *
 * State map (matches the rest of the nav family):
 *   - Default                         → `--color-nav-text`         (#292B2E)
 *   - Hover                           → `--color-nav-text-hover`   (#445366)
 *   - Pressed (`:active`) + Selected  → `--color-nav-text-focus`   (#566F8F)
 *   - Focus (`:focus-visible`)        → 3 px `--color-nav-focus-ring` border
 *
 * `selected` is the persistent "you are on this page" indicator — same colour
 * as the transient `:active` press feedback. This is the icon equivalent of
 * the bold-weight active state on `NavItem` / `NavItemMobile` / `NavItemSubmenu`
 * (icons can't bold, so the design uses colour instead).
 *
 * Layout-stable focus ring: 30 × 30 outer with `box-sizing: border-box` and
 * a permanent 3 px transparent border. Inner icon is always 24 × 24.
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Accessible label — required because there is no visible text. */
  ariaLabel: string
  /**
   * Persistent "selected / current page" state. Renders the icon in the
   * lighter steel-blue (`--color-nav-text-focus`, #566F8F).
   */
  selected?: boolean
  /** Renders as `<a>` when provided, `<button>` otherwise. */
  href?: string
  target?: string
  disabled?: boolean
}>(), {
  selected: false,
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => (props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :class="['nav-icon-btn', { 'nav-icon-btn--selected': selected }]"
    :type="tag === 'button' ? 'button' : undefined"
    :href="tag === 'a' ? href : undefined"
    :target="tag === 'a' ? target : undefined"
    :rel="tag === 'a' && target === '_blank' ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel"
    :aria-current="tag === 'a' && selected ? 'page' : undefined"
    :aria-pressed="tag === 'button' ? selected : undefined"
    :disabled="tag === 'button' && disabled ? true : undefined"
    :aria-disabled="tag === 'a' && disabled ? 'true' : undefined"
    @click="(e: MouseEvent) => !disabled && $emit('click', e)"
  >
    <span class="nav-icon-btn__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </component>
</template>

<style scoped>
.nav-icon-btn {
  /* 30 × 30 outer; the 3 px transparent border reserves focus-ring space at
   * all times so toggling :focus-visible never shifts the surrounding header
   * layout. Inner icon area is 24 × 24. Mirrors `MenuToggle` exactly. */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  box-sizing: border-box;
  border: 3px solid transparent;
  padding: 0;
  background: none;
  cursor: pointer;
  text-decoration: none;
  color: var(--color-nav-text, var(--color-neutral-0));

  transition:
    color 0.12s ease,
    border-color 0.12s ease;
}

.nav-icon-btn[disabled],
.nav-icon-btn[aria-disabled='true'] {
  cursor: not-allowed;
  opacity: var(--opacity-level-medium);
  pointer-events: none;
}

/* ─── Hover ──────────────────────────────────────────────── */
.nav-icon-btn:hover {
  color: var(--color-nav-text-hover, var(--color-action-accent));
}

/* ─── Pressed (mouse / touch) ────────────────────────────── */
.nav-icon-btn:active {
  color: var(--color-nav-text-focus, var(--color-action-accent-muted));
}

/* ─── Selected (persistent current-page state) ───────────── */
.nav-icon-btn--selected,
.nav-icon-btn--selected:hover {
  color: var(--color-nav-text-focus, var(--color-action-accent-muted));
}

/* ─── Focus (keyboard) ───────────────────────────────────── */
.nav-icon-btn:focus-visible {
  outline: none;
  border-color: var(--color-nav-focus-ring, var(--color-focus-ring));
}

/* ─── Icon wrapper ───────────────────────────────────────── */
.nav-icon-btn__icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
}

.nav-icon-btn__icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

/* The bundled account / display SVGs ship with `fill="#242C33"` baked in.
 * Override so the icon tracks the same `currentColor` as the button across
 * all states. Covers paths plus the occasional circle / rect used in the
 * profile / heart marks. */
.nav-icon-btn__icon :deep(path),
.nav-icon-btn__icon :deep(circle),
.nav-icon-btn__icon :deep(rect),
.nav-icon-btn__icon :deep(polygon),
.nav-icon-btn__icon :deep(polyline),
.nav-icon-btn__icon :deep(ellipse) {
  fill: currentColor;
}
</style>
