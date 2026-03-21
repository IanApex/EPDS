<script setup lang="ts">
defineProps<{
  /**
   * Text label for the button. Alternatively, use the default slot.
   */
  label?: string
  /**
   * Visual size of the button.
   * - `md` — 56px height, 16px text (Figma: "Buttons/Primary")
   * - `sm` — 40px height, 14px text (Figma: "Buttons/Tertiary")
   */
  size?: 'md' | 'sm'
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
    :class="`base-button--${size ?? 'md'}`"
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
  border: var(--border-width-thick) solid transparent;
  background-color: var(--color-base-primary-50);
  font-family: var(--font-family-btn);
  font-weight: var(--font-weight-btn);
  color: var(--color-neutral-100);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
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

/* ─── Interaction states ───────────────────────────────── */
.base-button:hover:not(:disabled) {
  background-color: var(--color-base-primary-40);
  text-decoration: underline;
}

.base-button:active:not(:disabled) {
  background-color: var(--color-base-primary-60);
  text-decoration: none;
}

.base-button:focus-visible {
  outline: none;
  border-color: var(--color-accessibility-80);
  overflow: clip;
}

.base-button:disabled {
  background-color: var(--color-neutral-secondary-90);
  color: var(--color-neutral-70);
  cursor: not-allowed;
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
