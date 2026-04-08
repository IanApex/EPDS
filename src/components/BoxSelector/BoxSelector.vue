<script setup lang="ts">
/**
 * BoxSelector — segmented radio-button control for 2–4 closely related options.
 *
 * Renders as a single joined pill of equal-width chips. The Neutral85 background
 * of the container shows through as the 1px gap/divider between chips.
 *
 * Usage:
 *   <BoxSelector
 *     v-model="condition"
 *     name="condition"
 *     :options="[
 *       { value: 'new',  label: 'New'  },
 *       { value: 'used', label: 'Used' },
 *     ]"
 *   />
 */
export interface BoxSelectorOption {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  /** 2–4 options (Figma enforces this range). */
  options: BoxSelectorOption[]
  /** Currently selected value (bind with v-model). */
  modelValue?: string
  /** Radio group name — must be unique per page if multiple selectors are used. */
  name: string
  disabled?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function select(value: string) {
  if (!props.disabled) emit('update:modelValue', value)
}
</script>

<template>
  <div
    class="box-selector"
    :class="{ 'box-selector--disabled': disabled }"
    role="radiogroup"
  >
    <label
      v-for="(option, i) in options"
      :key="option.value"
      class="box-selector__chip"
      :class="{
        'box-selector__chip--first':    i === 0,
        'box-selector__chip--last':     i === options.length - 1,
        'box-selector__chip--selected': modelValue === option.value,
      }"
    >
      <!-- Visually hidden native radio for keyboard nav + screen readers -->
      <input
        type="radio"
        class="box-selector__radio"
        :name="name"
        :value="option.value"
        :checked="modelValue === option.value"
        :disabled="disabled"
        @change="select(option.value)"
      />
      <span class="box-selector__label">{{ option.label }}</span>
    </label>
  </div>
</template>

<style scoped>
/* ─── Container ────────────────────────────────────────── */
/*
  1px padding + Neutral85 background = the visible gap/divider between chips.
  gap: 1px between chips exposes that background colour as the separator line.
*/
.box-selector {
  display: inline-flex;
  gap: 1px;
  padding: 1px;
  background: var(--color-neutral-85);
  border-radius: 4px;
  overflow: hidden;
  width: 280px;
  box-sizing: border-box;
}

.box-selector--disabled {
  opacity: var(--opacity-level-medium);
  pointer-events: none;
}

/* ─── Individual chip ──────────────────────────────────── */
.box-selector__chip {
  position: relative;
  flex: 1 0 0;
  height: 42px;
  max-height: 42px;
  min-width: 68px;
  max-width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;

  background: var(--color-neutral-100);
  color: var(--color-neutral-40);

  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

/* Round the outer corners of first and last chips only */
.box-selector__chip--first { border-radius: 3px 0 0 3px; }
.box-selector__chip--last  { border-radius: 0 3px 3px 0; }

/* ─── Hover (unselected only) ──────────────────────────── */
.box-selector__chip:hover:not(.box-selector__chip--selected) {
  background: var(--color-neutral-40);
  color: var(--color-neutral-100);
}
.box-selector__chip:hover:not(.box-selector__chip--selected) .box-selector__label {
  text-decoration: underline;
}

/* ─── Pressed / Active (unselected) ───────────────────── */
/* Dark bg like selected, but text still regular + underlined */
.box-selector__chip:active:not(.box-selector__chip--selected) {
  background: var(--color-neutral-20);
  color: var(--color-neutral-100);
}
.box-selector__chip:active:not(.box-selector__chip--selected) .box-selector__label {
  text-decoration: underline;
}

/* ─── Selected ─────────────────────────────────────────── */
.box-selector__chip--selected {
  background: var(--color-neutral-20);
  color: var(--color-neutral-100);
}

/* ─── Focus Selected (keyboard nav) ───────────────────── */
/* 3px inset Accessibility80 border — inset stays inside chip bounds */
.box-selector__chip:has(.box-selector__radio:focus-visible) {
  box-shadow: inset 0 0 0 3px var(--color-focus-ring);
  outline: none;
}

/* ─── Hidden radio input ───────────────────────────────── */
.box-selector__radio {
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

/* ─── Label text ───────────────────────────────────────── */
.box-selector__label {
  display: block;
  width: 100%;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);   /* 14px */
  line-height: 22px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Unselected: regular weight */
  font-weight: var(--font-weight-regular);
}

/* Selected chip label: bold */
.box-selector__chip--selected .box-selector__label {
  font-weight: var(--font-weight-bold);
}
</style>
