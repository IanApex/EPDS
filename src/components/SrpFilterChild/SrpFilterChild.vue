<script setup lang="ts">
import checkSvg from '../../../icon/Style=Display, Detail=Default, Icon=Check-Small.svg?raw'

withDefaults(defineProps<{
  /** Visible option label, e.g. "4WD" */
  label: string
  /** Inventory count, e.g. 82 — shown as "(82)" in Neutral40 */
  count?: number
  /** Whether this option is currently checked (bind with v-model) */
  selected?: boolean
  /**
   * "Returning to selected" state — option was previously applied and the
   * user has returned to the filter panel. Renders a light-green background
   * to indicate a saved, active selection.
   */
  returning?: boolean
}>(), {
  selected:  false,
  returning: false,
})

const emit = defineEmits<{
  'update:selected': [value: boolean]
}>()
</script>

<template>
  <label
    class="srp-fc"
    :class="{
      'srp-fc--selected':  selected,
      'srp-fc--returning': returning,
    }"
  >
    <!-- Hidden checkbox for a11y — grouped by parent's name attribute on the container -->
    <input
      type="checkbox"
      class="srp-fc__input"
      :checked="selected"
      @change="emit('update:selected', ($event.target as HTMLInputElement).checked)"
    />

    <!-- Checkmark badge (visible when selected or returning) -->
    <span
      v-if="selected || returning"
      class="srp-fc__check"
      aria-hidden="true"
      v-html="checkSvg"
    />

    <!-- Label + count -->
    <span class="srp-fc__content">
      <span class="srp-fc__label">{{ label }}</span>
      <span v-if="count !== undefined" class="srp-fc__count">({{ count }})</span>
    </span>

    <!-- Optional trailing vehicle icon slot -->
    <span v-if="$slots['trailing-icon']" class="srp-fc__trailing" aria-hidden="true">
      <slot name="trailing-icon" />
    </span>
  </label>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.srp-fc {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-nano);               /* 8px */
  width: 100%;
  height: 56px;
  padding: var(--spacing-xxxs) var(--spacing-xxs);  /* 16px 24px */
  box-sizing: border-box;

  background: var(--color-neutral-100);
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);

  cursor: pointer;
  user-select: none;

  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

/* ─── Visually-hidden checkbox ─────────────────────────── */
.srp-fc__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* ─── Checkmark badge ──────────────────────────────────── */
.srp-fc__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: var(--color-base-primary-50);
  border-radius: var(--border-radius-sm);  /* 4px */
}

.srp-fc__check :deep(svg) {
  width: 24px;
  height: 24px;
}

.srp-fc__check :deep(path) {
  fill: var(--color-neutral-100);
}

/* ─── Label + count ────────────────────────────────────── */
.srp-fc__content {
  display: flex;
  align-items: baseline;
  gap: 4px;
  min-width: 0;
  flex: 1;
}

.srp-fc__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  white-space: nowrap;
}

.srp-fc__count {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-light);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-40);
  white-space: nowrap;
}

/* ─── Trailing icon slot (vehicle descriptor) ──────────── */
.srp-fc__trailing {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 48px;
  height: 20px;
  overflow: hidden;
}

.srp-fc__trailing :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right center;
}

/* ─── Hover ────────────────────────────────────────────── */
.srp-fc:hover {
  background: var(--color-neutral-95);
}

/* Underline text on hover when selected */
.srp-fc--selected:hover .srp-fc__content,
.srp-fc--returning:hover .srp-fc__content {
  text-decoration: underline;
  text-decoration-color: var(--color-neutral-20);
  text-underline-offset: 2px;
}

/* ─── Pressed ──────────────────────────────────────────── */
.srp-fc:active {
  background: var(--color-neutral-90);
  border-top-color: var(--color-neutral-90);
  border-bottom-color: var(--color-neutral-90);
}

/* ─── Focus ────────────────────────────────────────────── */
.srp-fc:has(.srp-fc__input:focus-visible) {
  outline: 3px solid var(--color-accessibility-80);
  outline-offset: -3px;
}

/* ─── Touch/hover ──────────────────────────────────────── */
@media (hover: none) {
  .srp-fc:active {
    background: rgba(0, 111, 166, 0.15);
    border-top-color: var(--color-accent-40);
    border-bottom-color: var(--color-accent-40);
  }
}

/* ─── Returning to selected ────────────────────────────── */
.srp-fc--returning {
  background: var(--color-base-primary-90);
}

.srp-fc--returning:hover {
  background: var(--color-base-primary-90);
}

/* Slightly darker pressed state over the green bg */
.srp-fc--returning:active {
  background: var(--color-base-primary-90);
}

.srp-fc--returning:active::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.06);
  pointer-events: none;
}
</style>
