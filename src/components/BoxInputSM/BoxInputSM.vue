<script setup lang="ts">
/**
 * BoxInputSM — small single-select option box (64px height).
 *
 * Identical API to BoxInputXS — the only visual differences are:
 *   height 64px (vs 48px), padding 24px uniform (vs 12px/16px),
 *   min-width 140px (vs 175px).
 *
 * Usage: place multiple instances inside a <fieldset> sharing the same `name`.
 * They behave as styled radio buttons — only one can be selected at a time.
 *
 *   <BoxInputSM v-model="selected" name="yesNo" value="yes" label="Yes" />
 *   <BoxInputSM v-model="selected" name="yesNo" value="no"  label="No"  />
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** This option's value — emitted when selected. */
  value: string
  /** Radio group name — all options in the same group must share the same name. */
  name: string
  /** Visible label text. */
  label?: string
  /** Currently selected value in the group (bind with v-model). */
  modelValue?: string
  disabled?: boolean
}>(), {
  label: 'Label',
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
    class="box-input-sm"
    :class="{
      'box-input-sm--selected': isSelected,
      'box-input-sm--disabled': disabled,
    }"
  >
    <!-- Visually hidden native radio — preserves semantics + keyboard nav -->
    <input
      type="radio"
      class="box-input-sm__radio"
      :name="name"
      :value="value"
      :checked="isSelected"
      :disabled="disabled"
      @change="handleChange"
    />

    <!--
      Optional leading icon (16×16), pinned to the left edge.
      Import SVG with ?raw and render with v-html:
        <template #icon>
          <span v-html="timeSvg" style="display:contents" />
        </template>
    -->
    <span v-if="$slots.icon" class="box-input-sm__icon" aria-hidden="true">
      <slot name="icon" />
    </span>

    <span class="box-input-sm__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.box-input-sm {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  min-width: 140px;
  padding: 24px;
  box-sizing: border-box;

  border-radius: var(--border-radius-md);
  background: var(--color-neutral-100);
  cursor: pointer;

  /* Default 1px border as inset shadow — no layout shift as weight changes */
  box-shadow: inset 0 0 0 1px var(--color-neutral-90);

  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

/* ─── Hover ────────────────────────────────────────────── */
.box-input-sm:hover:not(.box-input-sm--disabled) {
  background: var(--color-neutral-95);
}

/* ─── Selected ─────────────────────────────────────────── */
.box-input-sm--selected {
  background: var(--color-neutral-100);
  box-shadow: inset 0 0 0 2px var(--color-action-primary);
}

/* ─── Focus (keyboard navigation) ─────────────────────── */
.box-input-sm:has(.box-input-sm__radio:focus-visible) {
  box-shadow: inset 0 0 0 3px var(--color-focus-ring);
}

/* ─── Disabled ─────────────────────────────────────────── */
.box-input-sm--disabled {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
}

/* ─── Hidden radio input ───────────────────────────────── */
.box-input-sm__radio {
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

/* ─── Leading icon (16×16, vertically centred, left-pinned) */
.box-input-sm__icon {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  line-height: 0;
}

.box-input-sm__icon :deep(path),
.box-input-sm__icon :deep(circle),
.box-input-sm__icon :deep(rect) {
  fill: currentColor;
}

/* ─── Label text ───────────────────────────────────────── */
.box-input-sm__label {
  flex: 1 0 0;
  min-width: 0;

  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--text-body-lg-weight);
  line-height: var(--text-body-lg-line-height);
  letter-spacing: var(--text-body-lg-letter-spacing);

  color: var(--color-neutral-0);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
