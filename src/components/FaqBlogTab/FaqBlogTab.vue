<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** This option's value — emitted when selected. */
  value: string
  /** Radio group name — all options in the same group must share the same name. */
  name: string
  /** Visible label text. */
  label: string
  /** Currently selected value in the group (bind with v-model). */
  modelValue?: string
  disabled?: boolean
}>(), {
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
    class="fbt"
    :class="{
      'fbt--selected': isSelected,
      'fbt--disabled': disabled,
    }"
  >
    <!-- Visually hidden native radio — preserves semantics + keyboard nav -->
    <input
      type="radio"
      class="fbt__radio"
      :name="name"
      :value="value"
      :checked="isSelected"
      :disabled="disabled"
      @change="handleChange"
    />

    <div class="fbt__container">
      <!--
        Illustrative icon (85×93px area).
        Import SVG with ?url and render as <img>:
          <template #icon>
            <img :src="guideIcon" alt="" />
          </template>
      -->
      <div class="fbt__icon" aria-hidden="true">
        <slot name="icon" />
      </div>

      <span class="fbt__label">{{ label }}</span>
    </div>
  </label>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.fbt {
  position: relative;
  display: inline-flex;
  width: 176px;
  height: 180px;
  box-sizing: border-box;
  border-radius: var(--border-radius-lg);
  background: var(--color-neutral-100);
  cursor: pointer;

  /* Default 1px border as inset shadow — no layout shift as weight changes */
  box-shadow: inset 0 0 0 1px var(--color-neutral-85);

  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

/* ─── Hover ─────────────────────────────────────────────── */
.fbt:hover:not(.fbt--disabled) {
  background: var(--color-neutral-secondary-95);
}

/* ─── Selected ──────────────────────────────────────────── */
.fbt--selected {
  background: var(--color-neutral-100);
  box-shadow: inset 0 0 0 2px var(--color-neutral-0);
}

/* ─── Focus (keyboard navigation — any state) ───────────── */
.fbt:has(.fbt__radio:focus-visible) {
  box-shadow: inset 0 0 0 3px var(--color-focus-ring);
}

/* ─── Disabled ──────────────────────────────────────────── */
.fbt--disabled {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
}

/* ─── Hidden radio input ────────────────────────────────── */
.fbt__radio {
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

/* ─── Inner layout ──────────────────────────────────────── */
.fbt__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  height: 100%;
  padding: 28px 16px;
  box-sizing: border-box;
  pointer-events: none;
}

/* ─── Illustrative icon (85×93px) ───────────────────────── */
.fbt__icon {
  width: 85px;
  height: 93px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fbt__icon :deep(img),
.fbt__icon :deep(svg) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ─── Label text ────────────────────────────────────────── */
.fbt__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  text-align: center;
}
</style>
