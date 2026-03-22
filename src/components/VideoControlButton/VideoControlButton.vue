<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * Colour theme.
   * - `dark`  — Neutral20 background (#313D47), white icon. For use on dark/video backgrounds.
   * - `light` — White semi-transparent background, dark icon. For use on light backgrounds.
   */
  color?: 'dark' | 'light'
  /**
   * Accessible label — required because there is no visible text.
   */
  ariaLabel: string
  disabled?: boolean
  /** Renders as `<a>` when provided, `<button>` otherwise. */
  href?: string
  target?: string
}>(), {
  color: 'dark',
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="video-ctrl-btn"
    :class="`video-ctrl-btn--${color}`"
    :aria-label="ariaLabel"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :disabled="!href ? disabled : undefined"
    :aria-disabled="href && disabled ? 'true' : undefined"
    @click="!disabled && $emit('click', $event)"
  >
    <!--
      Icon slot — pass any 24×24 SVG.
      Import with ?raw and wrap in a span so fill: currentColor
      in the CSS adapts the icon colour to each theme + state.
      Example:
        <template #icon>
          <span v-html="playSvg" style="display:contents" />
        </template>
    -->
    <span class="video-ctrl-btn__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </component>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.video-ctrl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;

  width: 40px;
  height: 40px;

  /* 3px transparent border always reserves focus-ring space — no layout shift */
  border: 3px solid transparent;
  border-radius: var(--border-radius-pill);

  cursor: pointer;
  text-decoration: none;

  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

/* ─── Focus (shared) ───────────────────────────────────── */
.video-ctrl-btn:focus-visible {
  outline: none;
  border-color: var(--color-accessibility-80);
}

/* ─── Disabled (shared) ────────────────────────────────── */
.video-ctrl-btn:disabled,
.video-ctrl-btn[aria-disabled='true'] {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Theme: dark ──────────────────────────────────────── */
/* Neutral20 default → Neutral0 on hover/press; white icon  */
.video-ctrl-btn--dark {
  background: var(--color-neutral-20);
  color: var(--color-neutral-100);
}
.video-ctrl-btn--dark:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-neutral-0);
}
.video-ctrl-btn--dark:active:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-neutral-0);
}
.video-ctrl-btn--dark:focus-visible {
  background: var(--color-neutral-0);
}

/* ─── Theme: light ─────────────────────────────────────── */
/* White semi-transparent → full white; dark icon           */
.video-ctrl-btn--light {
  background: rgba(255, 255, 255, 0.6);
  color: var(--color-neutral-0);
}
.video-ctrl-btn--light:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-neutral-100);
}
.video-ctrl-btn--light:active:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-neutral-100);
}
.video-ctrl-btn--light:focus-visible {
  background: var(--color-neutral-100);
}

/* ─── Icon ─────────────────────────────────────────────── */
.video-ctrl-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

/* Override SVG hardcoded fill so it inherits currentColor */
.video-ctrl-btn__icon :deep(path),
.video-ctrl-btn__icon :deep(circle),
.video-ctrl-btn__icon :deep(rect),
.video-ctrl-btn__icon :deep(polygon) {
  fill: currentColor;
}
</style>
