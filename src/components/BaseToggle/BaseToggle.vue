<script setup lang="ts">
import { computed } from 'vue'
import checkSvg from '../../../icon/Style=Display, Detail=Default, Icon=Check-Small.svg?raw'

const props = withDefaults(defineProps<{
  /** Checked/on state — bind with v-model. */
  modelValue?: boolean
  disabled?: boolean
  /** Optional label rendered beside the toggle. */
  label?: string
  name?: string
}>(), {
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
    class="toggle"
    :class="{ 'toggle--disabled': disabled }"
  >
    <input
      v-model="checked"
      type="checkbox"
      class="toggle__input"
      :disabled="disabled"
      :name="name"
    />

    <!-- Track + Thumb -->
    <span class="toggle__track" aria-hidden="true">
      <span class="toggle__thumb">
        <span class="toggle__check" v-html="checkSvg" />
      </span>
    </span>

    <!-- Optional label -->
    <span v-if="label" class="toggle__label">{{ label }}</span>
  </label>
</template>

<style scoped>
/* ─── Container ───────────────────────────────────────────── */
.toggle {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

/* ─── Hidden native input ─────────────────────────────────── */
.toggle__input {
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

/* ─── Track ───────────────────────────────────────────────── */
.toggle__track {
  position: relative;
  flex-shrink: 0;
  width: 48px;
  height: 28px;
  border-radius: 18px;
  background: var(--color-neutral-70);
  box-sizing: border-box;
  transition: background-color 0.2s ease, box-shadow 0.15s ease;
}

/* ─── Thumb ───────────────────────────────────────────────── */
.toggle__thumb {
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-neutral-100);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.2s ease;
}

/* ─── Check icon inside thumb ─────────────────────────────── */
.toggle__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  opacity: 0;
  color: var(--color-action-primary-press);
  line-height: 0;
  transition: opacity 0.15s ease;
}

.toggle__check :deep(svg) {
  width: 16px;
  height: 16px;
}

.toggle__check :deep(path) {
  fill: currentColor;
}

/* ─── On (checked) ────────────────────────────────────────── */
.toggle__input:checked ~ .toggle__track {
  background: var(--color-action-primary-press);
}

.toggle__input:checked ~ .toggle__track .toggle__thumb {
  left: 22px; /* 48 - 24 - 2 */
}

.toggle__input:checked ~ .toggle__track .toggle__check {
  opacity: 1;
}

/* ─── Focus ring ──────────────────────────────────────────── */
.toggle__input:focus-visible ~ .toggle__track {
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

/* ─── Disabled ────────────────────────────────────────────── */
.toggle--disabled {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
}

/* ─── Label ───────────────────────────────────────────────── */
.toggle__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--text-body-lg-weight);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}
</style>
