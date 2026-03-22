<script setup lang="ts">
import { computed } from 'vue'

// Icons imported as raw SVG strings — no plugin required
import tailRightSvg from '../../../icon/Style=Arrows, Detail=Tail, Icon=Right.svg?raw'
import tailLeftSvg from '../../../icon/Style=Arrows, Detail=Tail, Icon=Left.svg?raw'
import expandSvg from '../../../icon/Style=Media, Detail=Expand, Icon=NA.svg?raw'

const props = withDefaults(defineProps<{
  /**
   * Arrow direction.
   * - `right` / `left` — navigation arrows with a tail
   * - `expand`          — expand/resize icon (small size only in Figma)
   */
  direction?: 'right' | 'left' | 'expand'
  /**
   * Circle size.
   * - `sm` — 32×32, dark semi-transparent (right/left) or Primary green (expand)
   * - `lg` — 64×64, white semi-transparent background with dark icon
   */
  size?: 'sm' | 'lg'
  /**
   * Accessible label — required because there is no visible text.
   */
  ariaLabel: string
  disabled?: boolean
  /** Renders as `<a>` when provided, `<button>` otherwise. */
  href?: string
  target?: string
}>(), {
  direction: 'right',
  size: 'sm',
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

/**
 * Theme is derived from size + direction — not a separate prop.
 *   sm + right|left → "dark"  (rgba dark semi-transparent, white icon)
 *   sm + expand     → "green" (Primary50, white icon)
 *   lg + any        → "white" (rgba white semi-transparent, dark icon)
 */
const theme = computed(() => {
  if (props.size === 'lg') return 'white'
  if (props.direction === 'expand') return 'green'
  return 'dark'
})

const iconSvg = computed(() => {
  if (props.direction === 'left') return tailLeftSvg
  if (props.direction === 'expand') return expandSvg
  return tailRightSvg
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="arrow-circle-btn"
    :class="[`arrow-circle-btn--${size}`, `arrow-circle-btn--${theme}`]"
    :aria-label="ariaLabel"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :disabled="!href ? disabled : undefined"
    :aria-disabled="href && disabled ? 'true' : undefined"
    @click="!disabled && $emit('click', $event)"
  >
    <span
      class="arrow-circle-btn__icon"
      aria-hidden="true"
      v-html="iconSvg"
    />
  </component>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.arrow-circle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;

  /* 3px transparent border reserves focus-ring space — size stays constant */
  border: 3px solid transparent;
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  text-decoration: none;

  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

/* ─── Sizes ────────────────────────────────────────────── */
.arrow-circle-btn--sm { width: 32px;  height: 32px; }
.arrow-circle-btn--lg { width: 64px;  height: 64px; }

/* ─── Focus (shared) ───────────────────────────────────── */
.arrow-circle-btn:focus-visible {
  outline: none;
  border-color: var(--color-accessibility-80);
}

/* ─── Disabled (shared) ────────────────────────────────── */
.arrow-circle-btn:disabled,
.arrow-circle-btn[aria-disabled='true'] {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Theme: dark ──────────────────────────────────────── */
/* Small right / left on image overlays — dark pill, white icon */
.arrow-circle-btn--dark {
  background: rgba(36, 44, 51, 0.3); /* Neutral0 @ 30% */
  color: var(--color-neutral-100);
}
.arrow-circle-btn--dark:hover:not(:disabled):not([aria-disabled='true']) {
  background: rgba(36, 44, 51, 0.6); /* Neutral0 @ 60% */
}
.arrow-circle-btn--dark:active:not(:disabled):not([aria-disabled='true']) {
  background: rgba(36, 44, 51, 0.75); /* Neutral0 @ 75% */
}

/* ─── Theme: green ─────────────────────────────────────── */
/* Small expand button — solid Primary green, white icon */
.arrow-circle-btn--green {
  background: var(--color-base-primary-50);
  color: var(--color-neutral-100);
}
.arrow-circle-btn--green:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-base-primary-40);
}
.arrow-circle-btn--green:active:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-base-primary-60);
}

/* ─── Theme: white ─────────────────────────────────────── */
/* Large right / left on image overlays — white pill, dark icon */
.arrow-circle-btn--white {
  background: rgba(255, 255, 255, 0.6); /* white @ 60% */
  color: var(--color-neutral-0);
}
.arrow-circle-btn--white:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-neutral-100); /* full white */
}
.arrow-circle-btn--white:active:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-neutral-100);
}

/* ─── Icon ─────────────────────────────────────────────── */
.arrow-circle-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

/* Override the SVG's hardcoded fill so it tracks currentColor */
.arrow-circle-btn__icon :deep(path) {
  fill: currentColor;
}
</style>
