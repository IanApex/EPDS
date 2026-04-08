<script setup lang="ts">
import rightArrowSvg from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Right.svg?raw'

withDefaults(defineProps<{
  /** Filter category label, e.g. "Body style" */
  label: string
  /** True when one or more children are selected — renders label in bold */
  hasSelection?: boolean
  /**
   * Disabled / "Common Inputs" state — mutes the label to Neutral40
   * and hides the chevron. Used when this row is part of a common-input
   * form rather than an interactive filter.
   */
  disabled?: boolean
}>(), {
  hasSelection: false,
  disabled:     false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="srp-fp"
    :class="{
      'srp-fp--has-selection': hasSelection,
      'srp-fp--disabled':      disabled,
    }"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <span class="srp-fp__label">{{ label }}</span>
    <span
      v-if="!disabled"
      class="srp-fp__chevron"
      aria-hidden="true"
      v-html="rightArrowSvg"
    />
  </button>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.srp-fp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: var(--spacing-xxxs) var(--spacing-xxs);   /* 16px 24px */
  box-sizing: border-box;

  background: var(--color-neutral-100);
  border: none;
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);

  cursor: pointer;
  text-align: left;

  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

/* ─── Label ────────────────────────────────────────────── */
.srp-fp__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);      /* 16px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Bold when children are selected */
.srp-fp--has-selection .srp-fp__label {
  font-weight: var(--font-weight-bold);
}

/* Muted when in common-inputs / disabled state */
.srp-fp--disabled .srp-fp__label {
  color: var(--color-neutral-40);
}

/* ─── Chevron ──────────────────────────────────────────── */
.srp-fp__chevron {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  transition: transform 0.25s ease;
}

.srp-fp__chevron :deep(path) {
  fill: var(--color-neutral-0);
}

/* Rotate 90° clockwise when open (points downward) */
/* ─── Hover ────────────────────────────────────────────── */
.srp-fp:hover:not(:disabled) {
  background: var(--color-neutral-95);
}

/* ─── Pressed ──────────────────────────────────────────── */
.srp-fp:active:not(:disabled) {
  background: var(--color-neutral-90);
  border-top-color: var(--color-neutral-90);
  border-bottom-color: var(--color-neutral-90);
}

/* ─── Focus ────────────────────────────────────────────── */
.srp-fp:focus-visible {
  outline: 3px solid var(--color-accessibility-80);
  outline-offset: -3px;
}

/* ─── Touch/hover (touchscreen active state) ───────────── */
@media (hover: none) {
  .srp-fp:active:not(:disabled) {
    background: rgba(0, 111, 166, 0.15);
    border-top-color: var(--color-accent-40);
    border-bottom-color: var(--color-accent-40);
  }
}
</style>
