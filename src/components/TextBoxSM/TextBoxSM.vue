<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue?: string
    prefix?: string
    suffix?: string
    name?: string
    type?: string
    inputmode?: string
    maxlength?: number
    disabled?: boolean
    error?: string
    autocomplete?: string
  }>(),
  {
    type: 'text',
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputEl = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const hasValue = computed(() => !!(props.modelValue && props.modelValue.length > 0))

const inputId = computed(() => props.name ?? `text-box-sm-${Math.random().toString(36).slice(2, 7)}`)

// Prefix on left → value/placeholder hugs the right; suffix on right → value/placeholder hugs the left
const inputAlign = computed<'left' | 'right'>(() => (props.prefix ? 'right' : 'left'))

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function focusInput() {
  inputEl.value?.focus()
}
</script>

<template>
  <div
    class="text-box-sm"
    :class="{
      'text-box-sm--focused': isFocused,
      'text-box-sm--has-value': hasValue,
      'text-box-sm--disabled': disabled,
      'text-box-sm--error': !!error,
    }"
  >
    <label class="text-box-sm__label" :for="inputId">{{ label }}</label>

    <div class="text-box-sm__control" @click="focusInput">
      <span v-if="prefix" class="text-box-sm__affix">{{ prefix }}</span>
      <input
        :id="inputId"
        ref="inputEl"
        class="text-box-sm__input"
        :name="name"
        :type="type"
        :inputmode="inputmode"
        :maxlength="maxlength"
        :value="modelValue"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :placeholder="label"
        :style="{ textAlign: inputAlign }"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <span v-if="suffix" class="text-box-sm__affix text-box-sm__affix--suffix">{{ suffix }}</span>
    </div>

    <p v-if="error" class="text-box-sm__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.text-box-sm {
  position: relative;
  display: inline-block;
}

/* ── Floating label ──────────────────────────────────────────────────────── */
.text-box-sm__label {
  position: absolute;
  left: 0;
  top: -20px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: var(--color-neutral-40);
  pointer-events: none;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.text-box-sm--focused .text-box-sm__label,
.text-box-sm--has-value .text-box-sm__label {
  opacity: 1;
}

/* ── Control (bordered box) ──────────────────────────────────────────────── */
.text-box-sm__control {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 8px;
  gap: 0;
  box-sizing: border-box;
  border: 2px solid var(--color-neutral-85);
  border-radius: 8px;
  background: var(--color-neutral-100);
  cursor: text;
  transition: border-color 0.15s ease;
}

.text-box-sm--focused .text-box-sm__control {
  border-color: var(--color-accent-30);
}

.text-box-sm--error .text-box-sm__control {
  border-color: var(--color-warning-50);
}

.text-box-sm--disabled .text-box-sm__control {
  cursor: not-allowed;
  opacity: var(--opacity-level-medium);
}

/* ── Affix (prefix / suffix) ─────────────────────────────────────────────── */
.text-box-sm__affix {
  flex-shrink: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--color-neutral-40);
  white-space: nowrap;
  pointer-events: none;
}

.text-box-sm__affix--suffix {
  margin-left: 2px;
}

/* ── Input ───────────────────────────────────────────────────────────────── */
.text-box-sm__input {
  flex: 1 0 0;
  min-width: 0;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--color-neutral-0);
  /* text-align driven by :style binding (prefix → right, suffix/none → left) */
  padding: 0;
}

.text-box-sm__input::placeholder {
  color: var(--color-neutral-40);
  /* placeholder inherits text-align from the input element */
}

.text-box-sm__input:disabled {
  cursor: not-allowed;
}

/* ── Error message ───────────────────────────────────────────────────────── */
.text-box-sm__error {
  position: absolute;
  top: 48px; /* 44px height + 4px gap */
  left: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-warning-50);
  margin: 0;
  white-space: nowrap;
}
</style>
