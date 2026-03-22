<script setup lang="ts">
/**
 * BoxInputLG — large single-select option box (132px height).
 *
 * Vertical card layout: bold label in a header section separated by a
 * divider line, description text below. Typical usage is a short label
 * (1–2 words) like "Certified" with a sentence of supporting detail.
 *
 *   <BoxInputLG
 *     v-model="selected"
 *     name="condition"
 *     value="certified"
 *     label="Certified"
 *     description="Passed a 190-point inspection with a 12-month warranty."
 *   />
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** This option's value — emitted when selected. */
  value: string
  /** Radio group name — all options in the same group must share the same name. */
  name: string
  /** Bold header label (1–2 words, e.g. "Certified", "Yes", "Monthly"). */
  label?: string
  /** Supporting description shown below the divider. */
  description?: string
  /** Currently selected value in the group (bind with v-model). */
  modelValue?: string
  disabled?: boolean
}>(), {
  label: 'Label',
  description: 'This is a description',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isSelected = computed(() => props.modelValue === props.value)

function handleChange() {
  if (!props.disabled) emit('update:modelValue', props.value)
}
</script>

<template>
  <label
    class="box-input-lg"
    :class="{
      'box-input-lg--selected': isSelected,
      'box-input-lg--disabled': disabled,
    }"
  >
    <!-- Visually hidden native radio -->
    <input
      type="radio"
      class="box-input-lg__radio"
      :name="name"
      :value="value"
      :checked="isSelected"
      :disabled="disabled"
      @change="handleChange"
    />

    <!-- Header: bold label + divider line -->
    <span class="box-input-lg__header">
      <slot name="label">{{ label }}</slot>
    </span>

    <!-- Body: description text -->
    <span class="box-input-lg__body">
      <slot name="description">{{ description }}</slot>
    </span>
  </label>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.box-input-lg {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 132px;
  min-width: 278px;
  box-sizing: border-box;

  border-radius: var(--border-radius-md);
  background: var(--color-neutral-100);
  cursor: pointer;
  overflow: hidden; /* clips inner header shadow to rounded corners */

  /* Outer border — 1px Neutral85 (slightly darker than XS/SM/MD per Figma) */
  box-shadow: inset 0 0 0 1px var(--color-neutral-85);

  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

/* ─── Hover ────────────────────────────────────────────── */
.box-input-lg:hover:not(.box-input-lg--disabled) {
  background: var(--color-neutral-95);
}

/* ─── Selected ─────────────────────────────────────────── */
.box-input-lg--selected {
  background: var(--color-neutral-100);
  box-shadow: inset 0 0 0 2px var(--color-base-primary-50);
}

/* ─── Focus ────────────────────────────────────────────── */
.box-input-lg:has(.box-input-lg__radio:focus-visible) {
  box-shadow: inset 0 0 0 3px var(--color-accessibility-80);
}

/* ─── Disabled ─────────────────────────────────────────── */
.box-input-lg--disabled {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
}

/* ─── Hidden radio ─────────────────────────────────────── */
.box-input-lg__radio {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ─── Header (bold label + divider line) ───────────────── */
.box-input-lg__header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 16px;
  box-sizing: border-box;

  font-family: var(--font-family-base);
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  line-height: 24px;
  color: var(--color-neutral-0);

  /* Divider line — uses bottom shadow so height never shifts */
  box-shadow: 0 1px 0 0 var(--color-neutral-85);

  transition: box-shadow 0.15s ease;
}

/* Divider matches outer border on selected */
.box-input-lg--selected .box-input-lg__header {
  box-shadow: 0 2px 0 0 var(--color-base-primary-50);
}

/* Divider matches outer border on focus */
.box-input-lg:has(.box-input-lg__radio:focus-visible) .box-input-lg__header {
  box-shadow: 0 3px 0 0 var(--color-accessibility-80);
}

/* ─── Body (description text) ──────────────────────────── */
.box-input-lg__body {
  flex: 1 0 0;
  display: flex;
  align-items: flex-start;
  padding: 16px;
  box-sizing: border-box;

  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);    /* 14px */
  font-weight: var(--text-body-sm-weight); /* 400 */
  line-height: 22px;
  color: var(--color-neutral-0);
}
</style>
