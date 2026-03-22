<script setup lang="ts">
/**
 * BaseCheckbox — single checkbox with label.
 *
 * Supports v-model (boolean). Compose multiple in a column (gap: 16px) for lists.
 *
 *   <BaseCheckbox v-model="agreed" label="I agree to the terms" />
 *
 * Build guidelines (from Figma):
 *   - 12px gap between box and label (built in)
 *   - 16px between checkbox items in a list — add gap: 16px to the wrapping column
 *   - Long label text wraps; wrapped text aligns under the first line (box stays top-aligned)
 */
import { computed } from 'vue'
import checkSvg from '../../../icon/Style=Display, Detail=Default, Icon=Check-Small.svg?raw'

const props = withDefaults(defineProps<{
  /** Text label shown beside the checkbox. */
  label?: string
  /** Checked state (bind with v-model). */
  modelValue?: boolean
  disabled?: boolean
}>(), {
  label: 'Checkbox',
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checked = computed({
  get: () => props.modelValue ?? false,
  set: (val: boolean) => emit('update:modelValue', val),
})
</script>

<template>
  <label
    class="checkbox"
    :class="{ 'checkbox--disabled': disabled }"
  >
    <input
      v-model="checked"
      type="checkbox"
      class="checkbox__input"
      :disabled="disabled"
    />

    <!-- Custom visual box -->
    <span class="checkbox__box" aria-hidden="true">
      <!-- Check icon — hidden until checked via CSS -->
      <span class="checkbox__check">
        <span v-html="checkSvg" style="display:contents" />
      </span>
    </span>

    <!-- Label — wraps naturally; indents under itself, not the box -->
    <span v-if="label || $slots.default" class="checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
/* ─── Container ────────────────────────────────────────── */
.checkbox {
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

/* ─── Visually hidden native input ─────────────────────── */
.checkbox__input {
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

/* ─── Custom box ────────────────────────────────────────── */
.checkbox__box {
  position: relative;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-neutral-0);
  border-radius: 4px;
  background: var(--color-neutral-100);
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.1s ease,
    border-color 0.1s ease,
    border-width 0.1s ease;
}

/* ─── Hover (unchecked) ─────────────────────────────────── */
.checkbox:hover:not(.checkbox--disabled) .checkbox__box {
  border-width: 3px;
}
.checkbox:hover:not(.checkbox--disabled) .checkbox__label {
  text-decoration: underline;
}

/* ─── Pressed / Active (unchecked) ─────────────────────── */
/* Thicker border + 14×14 Primary50 inner fill before checking */
.checkbox:active:not(.checkbox--disabled) .checkbox__input:not(:checked) ~ .checkbox__box {
  border-width: 3px;
}
.checkbox:active:not(.checkbox--disabled) .checkbox__input:not(:checked) ~ .checkbox__box::before {
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1px;
  background: var(--color-base-primary-50);
}
.checkbox:active:not(.checkbox--disabled) .checkbox__input:not(:checked) ~ .checkbox__label {
  text-decoration: underline;
}

/* ─── Focus (unchecked) ─────────────────────────────────── */
.checkbox__input:focus-visible ~ .checkbox__box {
  outline: none;
  border-color: var(--color-accessibility-80);
}

/* ─── Checked ───────────────────────────────────────────── */
.checkbox__input:checked ~ .checkbox__box {
  background: var(--color-base-primary-50);
  border-color: var(--color-base-primary-50);
}
.checkbox__input:checked ~ .checkbox__box .checkbox__check {
  opacity: 1;
}

/* ─── Hover checked ─────────────────────────────────────── */
.checkbox:hover:not(.checkbox--disabled) .checkbox__input:checked ~ .checkbox__box {
  background: var(--color-base-primary-40);
  border-color: var(--color-base-primary-40);
}

/* ─── Focus checked ─────────────────────────────────────── */
.checkbox__input:checked:focus-visible ~ .checkbox__box {
  background: var(--color-base-primary-50);
  border-color: var(--color-base-primary-50);
  box-shadow: inset 0 0 0 2px var(--color-accessibility-80);
}

/* ─── Disabled ──────────────────────────────────────────── */
.checkbox--disabled {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
}
.checkbox--disabled .checkbox__box {
  border-color: var(--color-neutral-85);
}
.checkbox--disabled .checkbox__input:checked ~ .checkbox__box {
  background: var(--color-neutral-85);
  border-color: var(--color-neutral-85);
}

/* ─── Check icon ────────────────────────────────────────── */
.checkbox__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  opacity: 0;
  color: var(--color-neutral-100);
  line-height: 0;
  transition: opacity 0.1s ease;
}

.checkbox__check :deep(path) {
  fill: currentColor;
}

/* ─── Label text ────────────────────────────────────────── */
.checkbox__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);      /* 16px */
  font-weight: var(--text-body-lg-weight);  /* 400 */
  line-height: var(--text-body-lg-line-height); /* 1.5 → 24px */
  color: var(--color-neutral-0);
}
</style>
