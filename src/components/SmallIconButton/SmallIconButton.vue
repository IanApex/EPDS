<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * Accessible label — required because there is no visible text.
   * Screen readers will announce this along with the pressed state.
   */
  ariaLabel: string
  /**
   * Toggle state. When true the icon renders in the selected (green) colour.
   * Reflected as aria-pressed on the root button element.
   */
  selected?: boolean
  disabled?: boolean
}>(), {
  selected: false,
  disabled: false,
})

defineEmits<{
  /** Emitted on every click. Parent is responsible for toggling `selected`. */
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="small-icon-btn"
    :class="{ 'small-icon-btn--selected': selected }"
    :aria-label="ariaLabel"
    :aria-pressed="selected"
    :disabled="disabled"
    @click="!disabled && $emit('click', $event)"
  >
    <!--
      Icon slot — pass any 24×24 SVG via #icon.
      Import with ?raw and wrap in a span:
        <template #icon>
          <span v-html="mySvg" style="display:contents" />
        </template>
      The fill: currentColor CSS below maps the icon colour to each state.
    -->
    <span class="small-icon-btn__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped>
.small-icon-btn {
  /* Fixed 32×32 circle — box-sizing: border-box means outer size stays
     exactly 32px regardless of border-width, so no layout shift occurs. */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  box-sizing: border-box;

  border: 1px solid var(--color-neutral-90);
  border-radius: var(--border-radius-pill);

  background-color: var(--color-neutral-100);
  cursor: pointer;

  /* Default: grey icon (unselected) */
  color: var(--color-neutral-70);

  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    border-width 0.15s ease;
}

/* ─── Hover (unselected) ───────────────────────────────── */
.small-icon-btn:hover:not(:disabled) {
  border-width: 2px;
}

/* ─── Selected state ───────────────────────────────────── */
.small-icon-btn--selected {
  color: var(--color-action-primary);
}

/* ─── Hover (selected) ─────────────────────────────────── */
.small-icon-btn--selected:hover:not(:disabled) {
  color: var(--color-action-primary-press);
  border-width: 2px;
}

/* ─── Focus ────────────────────────────────────────────── */
.small-icon-btn:focus-visible {
  outline: none;
  border: 3px solid var(--color-focus-ring);
}

/* ─── Disabled ─────────────────────────────────────────── */
.small-icon-btn:disabled {
  color: var(--color-neutral-80);
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
}

/* ─── Icon ─────────────────────────────────────────────── */
.small-icon-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

/* Icon inherits the component's currentColor for all states */
.small-icon-btn__icon :deep(path),
.small-icon-btn__icon :deep(circle),
.small-icon-btn__icon :deep(rect),
.small-icon-btn__icon :deep(polygon) {
  fill: currentColor;
}
</style>
