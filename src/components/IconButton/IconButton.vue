<script setup lang="ts">
defineProps<{
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
    class="icon-button"
    :disabled="disabled"
    @click="!disabled && $emit('click', $event)"
  >
    <!--
      Icon slot — pass any 24×24 SVG using currentColor so it automatically
      inherits the correct colour for each interaction state.
      Example: <template #icon><MyIcon /></template>
    -->
    <span v-if="$slots.icon" class="icon-button__icon" aria-hidden="true">
      <slot name="icon" />
    </span>

    <span class="icon-button__label">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<style scoped>
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 4px 16px;
  border: 3px solid transparent;
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  background-color: var(--color-action-primary);
  color: var(--color-neutral-100);
  font-family: var(--font-family-btn);
  font-size: var(--font-size-btn);
  font-weight: var(--font-weight-btn);
  line-height: var(--line-height-btn);
  letter-spacing: var(--letter-spacing-btn);
  white-space: nowrap;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.icon-button:hover:not(:disabled) {
  background-color: var(--color-action-primary-hover);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.icon-button:active:not(:disabled) {
  background-color: var(--color-action-primary-press);
  text-decoration: none;
}

.icon-button:focus-visible {
  outline: none;
  border-color: var(--color-focus-ring);
  overflow: clip;
}

.icon-button:disabled {
  background-color: var(--color-neutral-secondary-90);
  color: var(--color-neutral-70);
  cursor: not-allowed;
}

/* ─── Icon ─────────────────────────────────────────────── */
.icon-button__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.icon-button__icon :deep(path),
.icon-button__icon :deep(circle),
.icon-button__icon :deep(rect),
.icon-button__icon :deep(polygon) {
  fill: currentColor;
}

/* ─── Label ────────────────────────────────────────────── */
.icon-button__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
</style>
