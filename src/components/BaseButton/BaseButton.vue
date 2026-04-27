<script setup lang="ts">
defineProps<{
  /**
   * Visual variant of the button.
   * - `primary`   — filled green (Figma: "Buttons/Primary", "Buttons/Tertiary")
   * - `secondary` — outlined (Figma: "Buttons/Secondary", "Buttons/TertiaryOutlined", dark variants)
   */
  variant?: 'primary' | 'secondary'
  /**
   * Visual size of the button. Exact dimensions are brand-driven via
   * the `--btn-md-*` / `--btn-sm-*` and `--font-*-btn` tokens.
   * - `md` — EchoPark 56px / Sonic 48px ("Large")
   * - `sm` — 40px both brands ("Small")
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
  border-radius: var(--button-border-radius);
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
  height: var(--btn-md-height);
  padding: var(--btn-md-padding);
  font-size: var(--font-size-btn);
  font-weight: var(--font-weight-btn);
  line-height: var(--line-height-btn);
  letter-spacing: var(--letter-spacing-btn);
}

.base-button--sm {
  height: var(--btn-sm-height);
  padding: var(--btn-sm-padding);
  font-size: var(--font-size-btn-sm);
  font-weight: var(--font-weight-btn-sm);
  line-height: var(--line-height-btn-sm);
  letter-spacing: var(--letter-spacing-btn-sm);
}

/* ─── Primary variant ──────────────────────────────────── */
.base-button--primary {
  border: var(--border-width-thick) solid transparent;
  background-color: var(--color-btn-primary-surface);
  color: var(--color-btn-primary-text);
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-btn-primary-surface-hover);
  text-decoration: underline;
}

.base-button--primary:active:not(:disabled) {
  background-color: var(--color-btn-primary-surface-press);
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
 * No real border — the visible frame is rendered as an
 * `inset box-shadow`, which paints at the outer edge of the
 * button and does NOT consume layout space. This keeps the
 * secondary's visible footprint identical to the primary's
 * filled bg footprint (both reach the full button height/width
 * defined by `--btn-*-height` / `--btn-*-padding`). Border-width
 * transitions on hover/press change the shadow size only and
 * therefore never shift inner content.
 * -------------------------------------------------------- */
.base-button--secondary {
  border: none;
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

/* ─── Secondary — light theme ──────────────────────────────
 * Surface / border / text are driven by semantic tokens so a
 * brand can swap the outlined look for a filled one without
 * touching this component.
 * -------------------------------------------------------- */
.base-button--secondary.base-button--light {
  box-shadow: inset 0 0 0 2px var(--color-btn-secondary-border);
  background-color: var(--color-btn-secondary-surface);
  color: var(--color-btn-secondary-text);
}

.base-button--secondary.base-button--light:hover:not(:disabled) {
  box-shadow: inset 0 0 0 3px var(--color-btn-secondary-border);
  background-color: var(--color-btn-secondary-surface-hover);
}

.base-button--secondary.base-button--light:active:not(:disabled) {
  box-shadow: inset 0 0 0 var(--btn-secondary-press-border-width) var(--color-btn-secondary-border);
  background-color: var(--color-btn-secondary-surface-press);
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
  box-shadow: inset 0 0 0 var(--btn-secondary-press-border-width) var(--color-neutral-100);
  background-color: var(--color-btn-secondary-surface-press-dark);
}

/* ─── Sonic-only structural override ───────────────────────
 * Per Sonic Figma "Buttons" frame, secondary variants underline
 * the label on hover. EchoPark's secondaries do not. The
 * [data-brand] hook on <html> is the documented escape hatch for
 * brand differences that cannot be expressed via token swaps.
 * -------------------------------------------------------- */
[data-brand="sonic"] .base-button--secondary:hover:not(:disabled) {
  text-decoration: underline;
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
