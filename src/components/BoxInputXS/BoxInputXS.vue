<script setup lang="ts">
/**
 * BoxInputXS — extra-small single-select option box (48px height).
 *
 * Usage: place multiple instances inside a <fieldset> sharing the same `name`.
 * They behave as styled radio buttons — only one can be selected at a time.
 *
 * v-model binds the currently selected value across the group:
 *   <BoxInputXS v-model="selected" name="yesNo" value="yes"  label="Yes" />
 *   <BoxInputXS v-model="selected" name="yesNo" value="no"   label="No"  />
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
    class="box-input-xs"
    :class="{
      'box-input-xs--selected': isSelected,
      'box-input-xs--disabled': disabled,
    }"
  >
    <!-- Visually hidden native radio — preserves semantics + keyboard nav -->
    <input
      type="radio"
      class="box-input-xs__radio"
      :name="name"
      :value="value"
      :checked="isSelected"
      :disabled="disabled"
      @change="handleChange"
    />

    <!--
      Optional leading icon (16×16).
      Import SVG with ?raw and render with v-html:
        <template #icon>
          <span v-html="timeSvg" style="display:contents" />
        </template>
    -->
    <span v-if="$slots.icon" class="box-input-xs__icon" aria-hidden="true">
      <slot name="icon" />
    </span>

    <span class="box-input-xs__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.box-input-xs {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  min-width: 175px;
  padding: 12px 16px;
  box-sizing: border-box;

  border-radius: var(--border-radius-md);
  background: var(--color-neutral-100);
  cursor: pointer;

  /* Default 1px border rendered as inset shadow — no layout shift as weight changes */
  box-shadow: inset 0 0 0 1px var(--color-neutral-90);

  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

/* ─── Hover ────────────────────────────────────────────── */
.box-input-xs:hover:not(.box-input-xs--disabled) {
  background: var(--color-neutral-95);
}

/* ─── Selected ─────────────────────────────────────────── */
.box-input-xs--selected {
  background: var(--color-neutral-100);
  box-shadow: inset 0 0 0 2px var(--color-base-primary-50);
}

/* ─── Focus (keyboard navigation — any state) ──────────── */
.box-input-xs:has(.box-input-xs__radio:focus-visible) {
  box-shadow: inset 0 0 0 3px var(--color-accessibility-80);
}

/* ─── Disabled ─────────────────────────────────────────── */
.box-input-xs--disabled {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
}

/* ─── Hidden radio input ───────────────────────────────── */
.box-input-xs__radio {
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
.box-input-xs__icon {
  position: absolute;
  left: 16px;
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

.box-input-xs__icon :deep(path),
.box-input-xs__icon :deep(circle),
.box-input-xs__icon :deep(rect) {
  fill: currentColor;
}

/* ─── Label text ───────────────────────────────────────── */
.box-input-xs__label {
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
