<script setup lang="ts">
/**
 * Underline text field (light/dark, default + feedback variant).
 *
 * Layout (Figma usage): when placing multiple text fields in a grid or flex wrap, use
 * 48px vertical and 16px horizontal gap between fields — e.g. `gap: var(--spacing-md) var(--spacing-xxxs)`.
 * Use the same 48px vertical gap between a text field and **any** following sibling in a column
 * (another control, body copy, links, etc.).
 */
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue?: string
    name?: string
    type?: string
    inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
    maxlength?: number
    disabled?: boolean
    error?: string
    autocomplete?: string
    theme?: 'light' | 'dark'
    variant?: 'default' | 'feedback'
  }>(),
  {
    type: 'text',
    disabled: false,
    theme: 'light',
    variant: 'default',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const inputEl = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const hasValue = computed(() => !!(props.modelValue && props.modelValue.length > 0))

const inputId = computed(
  () => props.name ?? `text-field-${Math.random().toString(36).slice(2, 7)}`,
)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function focusInput() {
  inputEl.value?.focus()
}

function onBlur() {
  isFocused.value = false
  emit('blur')
}
</script>

<template>
  <div
    class="text-field"
    :class="[
      `text-field--${theme}`,
      `text-field--${variant}`,
      {
        'text-field--focused': isFocused,
        'text-field--has-value': hasValue,
        'text-field--disabled': disabled,
        'text-field--error': !!error,
      },
    ]"
  >
    <label class="text-field__label" :for="inputId">{{ label }}</label>

    <div class="text-field__control" @click="focusInput">
      <input
        :id="inputId"
        ref="inputEl"
        class="text-field__input"
        :name="name"
        :type="type"
        :inputmode="inputmode"
        :maxlength="maxlength"
        :value="modelValue"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :placeholder="label"
        @input="onInput"
        @focus="isFocused = true"
        @blur="onBlur"
      />
    </div>

    <div class="text-field__line" />

    <p v-if="error" class="text-field__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.text-field {
  position: relative;
  display: inline-flex;
  flex-direction: column;
}

/* ── Floating label ────────────────────────────────────────────────── */
/*
  Figma Text field (light): empty state keeps label slot at -16px (opacity 0);
  filled / focus float the caption to -12px (Paragraph/Label over the value).
*/
.text-field__label {
  position: absolute;
  left: 0;
  top: -16px;
  font-family: var(--font-family-base);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  line-height: 16px;
  letter-spacing: 0.2px;
  pointer-events: none;
  white-space: nowrap;
  opacity: 0;
  transition:
    opacity 0.15s ease,
    color 0.15s ease,
    top 0.15s ease;
}

.text-field--focused .text-field__label,
.text-field--has-value .text-field__label {
  top: -12px;
  opacity: 1;
}

/* Label colors — light */
.text-field--light .text-field__label {
  color: var(--color-neutral-70);
}

.text-field--light.text-field--focused .text-field__label {
  color: var(--color-action-accent-hover);
}

/* Label colors — dark */
.text-field--dark .text-field__label {
  color: var(--color-neutral-85);
}

.text-field--dark.text-field--focused .text-field__label {
  color: var(--color-focus-ring);
}

/* ── Control area ──────────────────────────────────────────────────── */
.text-field__control {
  display: flex;
  align-items: center;
  height: 32px;
  cursor: text;
}

.text-field--feedback .text-field__control {
  background: var(--color-neutral-95);
  padding: 0 8px;
}

.text-field--disabled .text-field__control {
  cursor: not-allowed;
  opacity: var(--opacity-level-medium);
}

/* ── Input ─────────────────────────────────────────────────────────── */
.text-field__input {
  flex: 1 0 0;
  min-width: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-family-base);
  font-size: 16px;
  font-weight: var(--font-weight-regular);
  line-height: 24px;
  padding: 0;
}

/* Input text color — light */
.text-field--light .text-field__input {
  color: var(--color-neutral-0);
}

.text-field--light .text-field__input::placeholder {
  color: var(--color-neutral-40);
}

/* Input text color — dark */
.text-field--dark .text-field__input {
  color: var(--color-neutral-90);
}

.text-field--dark .text-field__input::placeholder {
  color: var(--color-neutral-85);
}

.text-field__input:disabled {
  cursor: not-allowed;
}

/* Hide placeholder when focused or has value (label replaces it) */
.text-field--focused .text-field__input::placeholder,
.text-field--has-value .text-field__input::placeholder {
  color: transparent;
}

/* ── Underline ─────────────────────────────────────────────────────── */
.text-field__line {
  height: 2px;
  width: 100%;
  transition: background-color 0.15s ease;
}

/* Line colors — light */
.text-field--light .text-field__line {
  background-color: var(--color-neutral-80);
}

.text-field--light.text-field--focused .text-field__line {
  background-color: var(--color-action-accent-hover);
}

/* Line colors — dark */
.text-field--dark .text-field__line {
  background-color: var(--color-neutral-85);
}

.text-field--dark.text-field--focused .text-field__line {
  background-color: var(--color-focus-ring);
}

/* Error line override */
.text-field--error .text-field__line {
  background-color: var(--color-feedback-error);
}

/* ── Error message ─────────────────────────────────────────────────── */
.text-field__error {
  position: absolute;
  top: 38px;
  left: 0;
  font-family: var(--font-family-base);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  line-height: 16px;
  margin: 0;
  white-space: nowrap;
}

.text-field--light .text-field__error {
  color: var(--color-feedback-error-text);
}

.text-field--dark .text-field__error {
  color: #FA848E;
}
</style>
