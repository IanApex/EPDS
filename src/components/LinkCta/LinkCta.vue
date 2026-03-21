<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * Link label text. Alternatively use the default slot.
   */
  label?: string
  /**
   * Show a right-arrow icon after the label.
   * Figma: "With arrow" / "Without arrow" variants.
   */
  arrow?: boolean
  /**
   * Colour theme.
   * - `light` — Accent40/30 palette; for use on light backgrounds
   * - `dark`  — Accent80/90 palette; for use on dark backgrounds
   */
  theme?: 'light' | 'dark'
  /**
   * When provided the component renders as an `<a>` tag.
   * When omitted it renders as a `<button>`.
   */
  href?: string
  /** Target for the anchor tag (e.g. '_blank'). Only used when href is set. */
  target?: string
  disabled?: boolean
}>(), {
  arrow: false,
  theme: 'light',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="link-cta"
    :class="`link-cta--${theme}`"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :disabled="!href ? disabled : undefined"
    :aria-disabled="href && disabled ? 'true' : undefined"
    @click="!disabled && $emit('click', $event)"
  >
    <span class="link-cta__label">
      <slot>{{ label }}</slot>
    </span>

    <svg
      v-if="arrow"
      class="link-cta__arrow"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.5 6l6 6-6 6"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </component>
</template>

<style scoped>
.link-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-quarck);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: var(--font-family-btn);
  font-size: var(--font-size-btn);
  font-weight: var(--font-weight-btn);
  line-height: var(--line-height-btn);
  letter-spacing: var(--letter-spacing-btn);
  text-decoration: none;
  border-radius: 2px;
  transition: color 0.15s ease;
}

.link-cta:focus-visible {
  outline: 3px solid var(--color-accessibility-80);
  outline-offset: 2px;
}

/* ─── Light theme ──────────────────────────────────────── */
.link-cta--light {
  color: var(--color-accent-40);
}

.link-cta--light:hover:not(:disabled):not([aria-disabled='true']) {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.link-cta--light:active:not(:disabled):not([aria-disabled='true']) {
  color: var(--color-accent-30);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ─── Dark theme ───────────────────────────────────────── */
.link-cta--dark {
  color: var(--color-accent-80);
}

.link-cta--dark:hover:not(:disabled):not([aria-disabled='true']) {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.link-cta--dark:active:not(:disabled):not([aria-disabled='true']) {
  color: var(--color-accent-90);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ─── Disabled ─────────────────────────────────────────── */
.link-cta:disabled,
.link-cta[aria-disabled='true'] {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Arrow icon ───────────────────────────────────────── */
.link-cta__arrow {
  flex-shrink: 0;
}
</style>
