<script setup lang="ts">
defineProps<{
  /**
   * Visual variant of the button.
   * - `primary`   — filled green (Figma: "Buttons/Primary", "Buttons/Tertiary")
   * - `secondary` — outlined (Figma: "Buttons/Secondary", "Buttons/TertiaryOutlined", dark variants)
   */
  variant?: 'primary' | 'secondary'
  /**
   * Visual size of the button.
   * - `md` — 56px height, 16px text
   * - `sm` — 40px height, 14px text
   */
  size?: 'md' | 'sm'
  /**
   * Colour theme — controls the secondary outlined border/text colour.
   * - `light` — dark border and text on light backgrounds (default)
   * - `dark`  — white border and text for use on dark backgrounds
   * No effect on the primary variant.
   */
  theme?: 'light' | 'dark'
  /**
   * Text label. Alternatively use the default slot.
   */
  label?: string
  /**
   * Disables the button and applies the disabled visual state.
   */
  disabled?: boolean
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="base-button"
    :class="[
      `base-button--${variant ?? 'primary'}`,
      `base-button--${size ?? 'md'}`,
      (variant === 'secondary' || !variant) ? `base-button--${theme ?? 'light'}` : '',
    ]"
    :disabled="disabled"
    @click="!disabled && $emit('click', $event)"
  >
    <span class="base-button__label">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 336px;
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  font-family: var(--font-family-btn);
  font-weight: var(--font-weight-btn);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    border-width 0.1s ease;
}

/* ─── Sizes ────────────────────────────────────────────── */
.base-button--md {
  height: 56px;
  padding: 13px 40px;
  font-size: var(--font-size-btn);
  line-height: var(--line-height-btn);
  letter-spacing: var(--letter-spacing-btn);
}

.base-button--sm {
  height: 40px;
  padding: 13px 24px;
  font-size: var(--font-size-btn-sm);
  line-height: var(--line-height-btn-sm);
  letter-spacing: var(--letter-spacing-btn-sm);
}

/* ─── Primary variant ──────────────────────────────────── */
.base-button--primary {
  border: var(--border-width-thick) solid transparent;
  background-color: var(--color-action-primary);
  color: var(--color-neutral-100);
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-action-primary-hover);
  text-decoration: underline;
}

.base-button--primary:active:not(:disabled) {
  background-color: var(--color-action-primary-press);
  text-decoration: none;
}

.base-button--primary:focus-visible {
  outline: none;
  border-color: var(--color-focus-ring);
  overflow: clip;
}

.base-button--primary:disabled {
  background-color: var(--color-neutral-secondary-90);
  color: var(--color-neutral-70);
  cursor: not-allowed;
}

/* ─── Secondary variant — shared ──────────────────────────
 * Border is always 3px transparent so outer dimensions never
 * shift. The visible border is rendered via inset box-shadow,
 * which draws inside the button and affects no surrounding layout.
 * -------------------------------------------------------- */
.base-button--secondary {
  border: 3px solid transparent;
  background-color: transparent;
}

.base-button--secondary:disabled {
  box-shadow: none;
  background-color: var(--color-neutral-secondary-90);
  color: var(--color-neutral-70);
  cursor: not-allowed;
}

/* Focus-visible overrides the theme colour with accessibility blue */
.base-button--secondary:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 3px var(--color-focus-ring);
}

/* ─── Secondary — light theme (dark border on light bg) ─ */
.base-button--secondary.base-button--light {
  box-shadow: inset 0 0 0 2px var(--color-neutral-0);
  color: var(--color-neutral-0);
}

.base-button--secondary.base-button--light:hover:not(:disabled) {
  box-shadow: inset 0 0 0 3px var(--color-neutral-0);
}

.base-button--secondary.base-button--light:active:not(:disabled) {
  box-shadow: inset 0 0 0 3px var(--color-neutral-0);
  background-color: var(--color-neutral-95);
}

/* ─── Secondary — dark theme (white border on dark bg) ── */
.base-button--secondary.base-button--dark {
  box-shadow: inset 0 0 0 2px var(--color-neutral-100);
  color: var(--color-neutral-100);
}

.base-button--secondary.base-button--dark:hover:not(:disabled) {
  box-shadow: inset 0 0 0 3px var(--color-neutral-100);
}

.base-button--secondary.base-button--dark:active:not(:disabled) {
  box-shadow: inset 0 0 0 3px var(--color-neutral-100);
  background-color: var(--color-neutral-0);
}

/* ─── Label ────────────────────────────────────────────── */
.base-button__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  text-align: center;
}
</style>
