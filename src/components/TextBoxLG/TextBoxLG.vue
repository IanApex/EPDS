<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue?: string
    name?: string
    maxlength?: number
    disabled?: boolean
    error?: string
    autocomplete?: string
  }>(),
  {
    maxlength: 500,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaEl = ref<HTMLTextAreaElement | null>(null)
const isFocused = ref(false)
const charCount = computed(() => props.modelValue?.length ?? 0)
const hasValue = computed(() => charCount.value > 0)

const inputId = computed(
  () => props.name ?? `text-box-lg-${Math.random().toString(36).slice(2, 7)}`,
)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}

function focusTextarea() {
  textareaEl.value?.focus()
}
</script>

<template>
  <div
    class="text-box-lg"
    :class="{
      'text-box-lg--focused': isFocused,
      'text-box-lg--has-value': hasValue,
      'text-box-lg--disabled': disabled,
      'text-box-lg--error': !!error,
    }"
  >
    <label class="text-box-lg__label" :for="inputId">{{ label }}</label>

    <div class="text-box-lg__control" @click="focusTextarea">
      <textarea
        :id="inputId"
        ref="textareaEl"
        class="text-box-lg__textarea"
        :name="name"
        :maxlength="maxlength"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :value="modelValue"
        :placeholder="label"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>

    <!-- Error and character counter sit on the same row below the border -->
    <div class="text-box-lg__footer">
      <p v-if="error" class="text-box-lg__error" role="alert">{{ error }}</p>
      <span
        v-if="maxlength && isFocused"
        class="text-box-lg__counter"
        :class="{ 'text-box-lg__counter--at-limit': charCount >= maxlength }"
      >
        {{ charCount }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.text-box-lg {
  position: relative;
  display: inline-block;
}

/* ── Floating label ──────────────────────────────────────────────────────── */
.text-box-lg__label {
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

.text-box-lg--focused .text-box-lg__label,
.text-box-lg--has-value .text-box-lg__label {
  opacity: 1;
}

/* ── Control (bordered box) ──────────────────────────────────────────────── */
.text-box-lg__control {
  height: 140px;
  box-sizing: border-box;
  border: 2px solid var(--color-neutral-85);
  border-radius: 8px;
  background: var(--color-neutral-100);
  padding: 16px;
  cursor: text;
  transition: border-color 0.15s ease;
}

.text-box-lg--focused .text-box-lg__control {
  border-color: var(--color-accent-30);
}

.text-box-lg--error .text-box-lg__control {
  border-color: var(--color-warning-50);
}

.text-box-lg--disabled .text-box-lg__control {
  cursor: not-allowed;
  opacity: var(--opacity-level-medium);
}

/* ── Textarea ────────────────────────────────────────────────────────────── */
.text-box-lg__textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-neutral-0);
  padding: 0;
  box-sizing: border-box;
  overflow-y: auto;
}

.text-box-lg__textarea::placeholder {
  color: var(--color-neutral-40);
}

.text-box-lg__textarea:disabled {
  cursor: not-allowed;
}

/* ── Footer row (error + counter) ───────────────────────────────────────── */
.text-box-lg__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  min-height: 0;
  margin-top: 4px;
}

.text-box-lg__error {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: var(--color-warning-50);
  margin: 0;
}

.text-box-lg__counter {
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: var(--color-neutral-40);
  white-space: nowrap;
  margin-left: auto;
}

.text-box-lg__counter--at-limit {
  color: var(--color-warning-50);
}
</style>
