<script setup lang="ts">
withDefaults(defineProps<{
  /** Accessible label — required, since there is no visible text. */
  ariaLabel: string
  /** Selected / pressed state: flips to accent fill with a white icon. */
  selected?: boolean
  /** Mirrors native `aria-pressed` for toggle buttons. */
  ariaPressed?: boolean
  disabled?: boolean
}>(), {
  selected: false,
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    type="button"
    class="oib"
    :class="{ 'oib--selected': selected }"
    :aria-label="ariaLabel"
    :aria-pressed="ariaPressed"
    :disabled="disabled"
    @click="!disabled && $emit('click', $event)"
  >
    <span class="oib__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped>
.oib {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  border-radius: var(--border-radius-pill);
  background-color: var(--color-neutral-100);
  color: var(--color-action-accent);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
}

.oib:hover:not(:disabled) {
  color: var(--color-action-accent-hover);
}

.oib:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}

.oib:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.oib--selected {
  background-color: var(--color-action-accent);
  color: var(--color-neutral-100);
}

.oib--selected:hover:not(:disabled) {
  background-color: var(--color-action-accent-hover);
  color: var(--color-neutral-100);
}

.oib__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.oib__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.oib__icon :deep(path),
.oib__icon :deep(circle),
.oib__icon :deep(rect),
.oib__icon :deep(polygon),
.oib__icon :deep(polyline),
.oib__icon :deep(ellipse) {
  fill: currentColor;
}
</style>
