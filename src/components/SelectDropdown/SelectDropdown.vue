<script setup lang="ts">
/**
 * SelectDropdown — underline-style native select with floating label.
 *
 * Uses the device's native <select> picker (Figma guideline).
 * Supports light (default) and dark themes, optional error message.
 *
 *   <SelectDropdown
 *     v-model="month"
 *     label="Select a month"
 *     :options="months"
 *   />
 *
 * Build guidelines (Figma):
 *   - Control: 34px fixed height, underline flush at the bottom (2px)
 *   - Floating label: 12px above the control top when filled/focused
 *   - Error message: 4px below the underline (absolute top: 38px)
 *   - Entire component is clickable (label click focuses the select)
 *   - Width adapts to the grid; pass a width class/style from outside
 *   - Re-opening the picker always shows the current selection highlighted
 */
import { computed, ref } from 'vue'
import chevronSvg from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Down.svg?raw'

export interface SelectOption {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  /** Floating label text (also acts as placeholder when empty). */
  label: string
  /** List of selectable options. */
  options: SelectOption[]
  /** Currently selected value (bind with v-model). */
  modelValue?: string
  /** Light (default) or dark theme. */
  theme?: 'light' | 'dark'
  /** Disables the select. */
  disabled?: boolean
  /** Error message shown below the underline. */
  error?: string
  /** HTML name attribute for form submission. */
  name?: string
}>(), {
  theme: 'light',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isFocused = ref(false)
const hasValue  = computed(() => !!props.modelValue)

function onChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLSelectElement).value)
}
</script>

<template>
  <!--
    Outer wrapper is `position: relative` so the floating label and
    error message can be absolutely placed without affecting flow height.
  -->
  <div
    class="select-dropdown"
    :class="[
      `select-dropdown--${theme}`,
      { 'select-dropdown--has-value': hasValue },
      { 'select-dropdown--focused':   isFocused },
      { 'select-dropdown--disabled':  disabled  },
      { 'select-dropdown--error':     !!error   },
    ]"
  >
    <!-- Floating label — sits at placeholder level when empty, floats up when filled -->
    <label class="select-dropdown__label" :for="name">{{ label }}</label>

    <!-- 34px control row: native select + chevron + underline -->
    <div class="select-dropdown__control">
      <select
        :id="name"
        :name="name"
        class="select-dropdown__select"
        :value="modelValue"
        :disabled="disabled"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <!-- Empty placeholder option (hidden once a value is selected) -->
        <option value="" disabled :selected="!hasValue" />
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :selected="opt.value === modelValue"
        >{{ opt.label }}</option>
      </select>

      <!-- Chevron icon -->
      <span class="select-dropdown__chevron" aria-hidden="true">
        <span v-html="chevronSvg" style="display:contents" />
      </span>

      <!-- Underline — inside control so it's part of the 34px height -->
      <span class="select-dropdown__line" />
    </div>

    <!-- Error message — absolutely positioned so it never shifts layout height -->
    <p v-if="error" class="select-dropdown__error">{{ error }}</p>
  </div>
</template>

<style scoped>
/* ─── Container ────────────────────────────────────────── */
/*
  Fixed 34px — the control fills this exactly.
  Floating label is absolute (above) and error is absolute (below),
  so neither changes the flow height of this element.
*/
.select-dropdown {
  position: relative;
  display: inline-block;
  height: 34px;
}

/* ─── Floating label ────────────────────────────────────── */
/*
  Default: overlays the select text at the same vertical position,
           acting as a visible placeholder (pointer-events: none).
  Filled / focused: floats 12px above the control top edge (top: -12px).
  From Figma: floating label is positioned at `top: -12px` on the wrapper.
*/
.select-dropdown__label {
  position: absolute;
  left: 0;
  /* Stop before the 24px chevron + 8px gap — never overlaps the icon */
  right: 32px;
  /* Vertically centred in the 32px text area (34px - 2px line).
     24px line-height text centred in 32px → (32 - 24) / 2 = 4px from top */
  top: 4px;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);     /* 16px */
  font-weight: var(--text-body-lg-weight); /* 400 */
  line-height: 24px;
  letter-spacing: 0;

  transition:
    top 0.15s ease,
    font-size 0.15s ease,
    line-height 0.15s ease,
    color 0.15s ease;
}

/* Floats to 12px above the control top (Figma: top-[-12px]) */
.select-dropdown--has-value .select-dropdown__label,
.select-dropdown--focused .select-dropdown__label {
  top: -12px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
}

/* ─── Control row ───────────────────────────────────────── */
/*
  34px fixed height. Select text is vertically centred above the 2px
  underline. Figma: outer flex h-[34px] justify-end pb-[1px]; text row
  flex-1 with mb-[-1px]; line h-[2px] mb-[-1px] — net result: select
  text fills the upper ~32px, line is flush at bottom.
*/
.select-dropdown__control {
  position: relative;
  height: 34px;
  display: flex;
  align-items: center;
  /* 2px for the absolute underline at bottom — keeps select text above it */
  padding-bottom: 2px;
  box-sizing: border-box;
}

/* ─── Native select ─────────────────────────────────────── */
.select-dropdown__select {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  padding: 0;
  margin: 0;

  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);     /* 16px */
  font-weight: var(--text-body-lg-weight); /* 400 */
  line-height: 16px;

  /* 8px gap between text and chevron (Figma: gap-[8px] in text row) */
  padding-right: 32px;
}

.select-dropdown__select:disabled {
  cursor: not-allowed;
}

/* ─── Chevron icon ──────────────────────────────────────── */
.select-dropdown__chevron {
  position: absolute;
  right: 0;
  /* Centre in the text area above the 2px line: top = (32px / 2) = 16px */
  top: calc(50% - 1px);
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  pointer-events: none;
  flex-shrink: 0;
}

.select-dropdown__chevron :deep(path) {
  fill: currentColor;
}

/* ─── Underline ─────────────────────────────────────────── */
/*
  Absolutely positioned flush at the bottom of the 34px control.
  Figma: line h-[2px] mb-[-1px] at bottom of flex container.
*/
.select-dropdown__line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
}

/* ─── Error message ─────────────────────────────────────── */
/*
  Absolutely positioned so it never shifts layout height.
  34px (control) + 4px gap = 38px from wrapper top (Figma: top-[38px]).
*/
.select-dropdown__error {
  position: absolute;
  left: 0;
  top: 38px;
  margin: 0;
  font-family: var(--font-family-base);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  line-height: 16px;
  letter-spacing: 0.2px;
  white-space: nowrap;
}

/* ════════════════════════════════════════════════════════
   LIGHT THEME (default)
   ════════════════════════════════════════════════════════ */
.select-dropdown--light .select-dropdown__label {
  color: var(--color-neutral-40); /* grey placeholder */
}
.select-dropdown--light.select-dropdown--has-value .select-dropdown__label,
.select-dropdown--light.select-dropdown--focused .select-dropdown__label {
  color: var(--color-neutral-70); /* #A2A6AB — floating label when filled */
}

.select-dropdown--light .select-dropdown__select {
  color: var(--color-neutral-40); /* grey when empty */
}
.select-dropdown--light.select-dropdown--has-value .select-dropdown__select {
  color: var(--color-neutral-0); /* dark when filled */
}

.select-dropdown--light .select-dropdown__chevron {
  color: var(--color-neutral-0);
}

.select-dropdown--light .select-dropdown__line {
  background: var(--color-neutral-80); /* #BCBFC2 */
}
.select-dropdown--light.select-dropdown--focused .select-dropdown__line {
  background: var(--color-focus-ring);
}

.select-dropdown--light .select-dropdown__error {
  color: var(--color-feedback-error-text); /* #B30715 dark red */
}

/* Light disabled */
.select-dropdown--light.select-dropdown--disabled .select-dropdown__select {
  opacity: var(--opacity-level-medium);
}
.select-dropdown--light.select-dropdown--disabled .select-dropdown__label {
  color: var(--color-neutral-70);
  opacity: var(--opacity-level-medium);
}

/* ════════════════════════════════════════════════════════
   DARK THEME
   ════════════════════════════════════════════════════════ */
.select-dropdown--dark .select-dropdown__label {
  color: var(--color-neutral-85); /* #D4D7D9 — grey placeholder on dark */
}
.select-dropdown--dark.select-dropdown--has-value .select-dropdown__label,
.select-dropdown--dark.select-dropdown--focused .select-dropdown__label {
  color: var(--color-neutral-85);
}

.select-dropdown--dark .select-dropdown__select {
  color: var(--color-neutral-85);
}
.select-dropdown--dark.select-dropdown--has-value .select-dropdown__select {
  color: var(--color-neutral-100); /* white when filled */
}

.select-dropdown--dark .select-dropdown__chevron {
  color: var(--color-neutral-100);
}

.select-dropdown--dark .select-dropdown__line {
  background: var(--color-neutral-85);
}
.select-dropdown--dark.select-dropdown--focused .select-dropdown__line {
  background: var(--color-focus-ring);
}

.select-dropdown--dark .select-dropdown__error {
  color: #fa848e; /* pink-red for dark bg — no token yet */
}

/* Dark disabled */
.select-dropdown--dark.select-dropdown--disabled .select-dropdown__line {
  display: none; /* Figma: line is removed on dark disabled */
}
.select-dropdown--dark.select-dropdown--disabled .select-dropdown__select {
  opacity: var(--opacity-level-medium);
}
</style>
