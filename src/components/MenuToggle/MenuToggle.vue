<script setup lang="ts">
/**
 * Mobile menu hamburger / close toggle. The button shows the hamburger icon
 * when the drawer is closed and the X (close) icon when it's open. Clicking
 * toggles `open` so it works as `v-model:open` out of the box, matching the
 * pattern used by `NavItem` (dropdown variant) and `CompareButton`.
 *
 * Figma frames: "Hamburger menu / closed" (node 7639:20490 — closed/hamburger
 * icon states) and the open/X states immediately below it (node 7639:20520).
 *
 * Layout-stable focus ring: 30×30 outer with `box-sizing: border-box` and a
 * permanent 3px transparent border. On `:focus-visible` the border-color
 * becomes Accessibility90 (`#6FCFFF`) — no size shift. Inner icon area is
 * always 24×24.
 *
 * Shares the global `--color-nav-*` tokens with the rest of the nav family.
 */
import { computed } from 'vue'
import menuSvg from '../../../icon/Style=Display, Detail=Menu, Icon=Menu.svg?raw'
import closeSvg from '../../../icon/Style=Display, Detail=Default, Icon=Close.svg?raw'

const props = withDefaults(defineProps<{
  /**
   * Whether the mobile menu drawer is currently open. When `true` the button
   * renders the X (close) icon; when `false` it renders the hamburger.
   * Use with `v-model:open` for two-way binding — the component toggles
   * this on click.
   */
  open?: boolean
  /**
   * Override the computed accessible label. Defaults to `'Open menu'` when
   * closed and `'Close menu'` when open.
   */
  ariaLabel?: string
  disabled?: boolean
}>(), {
  open: false,
  disabled: false,
})

const emit = defineEmits<{
  /** Fired with the next `open` value whenever the button is clicked. */
  'update:open': [value: boolean]
  /** Fired on every click — parent may intercept for analytics etc. */
  click: [event: MouseEvent]
}>()

const computedAriaLabel = computed(() =>
  props.ariaLabel ?? (props.open ? 'Close menu' : 'Open menu'),
)

function onClick(event: MouseEvent) {
  if (props.disabled) return
  emit('update:open', !props.open)
  emit('click', event)
}
</script>

<template>
  <button
    type="button"
    class="menu-toggle"
    :class="{ 'menu-toggle--open': open }"
    :aria-label="computedAriaLabel"
    :aria-expanded="open"
    :aria-pressed="open"
    :disabled="disabled"
    @click="onClick"
  >
    <span
      class="menu-toggle__icon"
      aria-hidden="true"
      v-html="open ? closeSvg : menuSvg"
    />
  </button>
</template>

<style scoped>
.menu-toggle {
  /* 30×30 outer with `box-sizing: border-box` — the 3px transparent border
   * reserves focus-ring space at all times so toggling :focus-visible never
   * shifts the surrounding header layout. Inner icon area is 24×24. */
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
  color: var(--color-nav-text, var(--color-neutral-0));
  transition:
    color 0.12s ease,
    border-color 0.12s ease;
}

.menu-toggle:disabled {
  cursor: not-allowed;
  opacity: var(--opacity-level-medium);
}

/* ─── Hover ──────────────────────────────────────────────── */
.menu-toggle:hover:not(:disabled) {
  color: var(--color-nav-text-hover, var(--color-action-accent));
}

/* ─── Pressed (mouse / touch) ────────────────────────────── */
.menu-toggle:active:not(:disabled) {
  color: var(--color-nav-text-focus, var(--color-action-accent-muted));
}

/* ─── Focus (keyboard) ───────────────────────────────────── */
.menu-toggle:focus-visible {
  outline: none;
  border-color: var(--color-nav-focus-ring, var(--color-focus-ring));
}

/* ─── Icon wrapper ───────────────────────────────────────── */
.menu-toggle__icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
}

.menu-toggle__icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

/* The bundled menu / close SVGs ship with `fill="#242C33"` baked in. Override
 * so the icon tracks the same `currentColor` as the button across all
 * states (default, hover, pressed). */
.menu-toggle__icon :deep(path) {
  fill: currentColor;
}
</style>
