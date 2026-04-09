<script setup lang="ts">
/**
 * SegmentedControl — a pill-shaped track of 2–3 mutually exclusive options.
 *
 * Used to switch between related views or filters where exactly one option must
 * always be active (e.g. SRP filters, view toggles). The first option is
 * auto-selected on mount if no modelValue is provided.
 *
 * Usage:
 *   <SegmentedControl
 *     v-model="view"
 *     name="view-toggle"
 *     :options="[
 *       { value: 'list',  label: 'List'  },
 *       { value: 'grid',  label: 'Grid'  },
 *     ]"
 *   />
 *
 * Build guidelines (Figma):
 *   - Container: 38px height, 4px padding, 1px Neutral85 border, 42px border-radius
 *   - Chip: 30px height, 16px left/right padding, 8px top/bottom padding, 69px border-radius
 *   - Chip text: 14px/14px Roboto Medium (500), Neutral0 (default/hover), white (selected)
 *   - Gap between chips: 1px
 *   - Chips share the track width equally (each column matches the widest label’s needs when the
 *     parent constrains width — e.g. VIN + License plate in a fixed-width row)
 *   - Default fill: none; Hover fill: Neutral90; Selected fill: Primary50
 *   - Focus ring: 2px Accessibility80 outside the selected chip
 *   - First chip is always auto-selected on page arrival
 *   - Users cannot select more than one chip (mutually exclusive)
 *   - Designed for 2 or 3 options; do not use with more than 3
 */
import { onMounted } from 'vue'

export interface SegmentedControlOption {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  /** 2–3 options. The first is auto-selected on mount if modelValue is unset. */
  options: SegmentedControlOption[]
  /** Radio group name — must be unique per page. */
  name: string
  /** Currently active value (bind with v-model). */
  modelValue?: string
  /** Disables the entire control. */
  disabled?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

onMounted(() => {
  if (!props.modelValue && props.options.length > 0) {
    emit('update:modelValue', props.options[0].value)
  }
})

function select(value: string) {
  if (!props.disabled) emit('update:modelValue', value)
}
</script>

<template>
  <div
    class="segmented-control"
    :class="{ 'segmented-control--disabled': disabled }"
    role="group"
    :aria-label="name"
  >
    <label
      v-for="opt in options"
      :key="opt.value"
      class="segmented-control__chip"
      :class="{ 'segmented-control__chip--selected': modelValue === opt.value }"
    >
      <!-- Visually hidden radio provides keyboard nav + screen-reader semantics -->
      <input
        type="radio"
        class="segmented-control__radio"
        :name="name"
        :value="opt.value"
        :checked="modelValue === opt.value"
        :disabled="disabled"
        @change="select(opt.value)"
      />
      <span class="segmented-control__label">{{ opt.label }}</span>
    </label>
  </div>
</template>

<style scoped>
/* ─── Track / Container ─────────────────────────────────────── */
/*
  38px total = 4px padding-top + 30px chip + 4px padding-bottom.
  1px Neutral85 border. 42px border-radius creates the pill shape.
  1px gap between chips matches Figma's gap-[1px].
*/
.segmented-control {
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: 1px;
  padding: 4px;
  height: 38px;
  border-radius: 42px;
  border: 1px solid var(--color-neutral-85);
  background: var(--color-neutral-100);
  box-sizing: border-box;
}

.segmented-control--disabled {
  opacity: var(--opacity-level-medium);
  pointer-events: none;
  cursor: not-allowed;
}

/* ─── Individual chip ───────────────────────────────────────── */
/*
  30px height, 16px horizontal padding, 8px vertical padding.
  69px border-radius makes each chip a fully-rounded pill.
  No background by default — shows through to the white track.
*/
.segmented-control__chip {
  position: relative;
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 8px 16px;
  border-radius: 69px;
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
  background: transparent;

  transition:
    background-color 0.12s ease,
    box-shadow       0.12s ease;
}

/* ─── Hover (unselected) ────────────────────────────────────── */
.segmented-control__chip:hover:not(.segmented-control__chip--selected) {
  background: var(--color-neutral-90);
}

/* ─── Selected ──────────────────────────────────────────────── */
.segmented-control__chip--selected {
  background: var(--color-action-primary);
}

/* ─── Focus ring (via :has) ─────────────────────────────────── */
/*
  2px Accessibility80 ring outside the chip edge.
  :has() keeps the hidden radio's focus-visible accessible without
  a visible border on the chip itself.
*/
.segmented-control__chip:has(.segmented-control__radio:focus-visible) {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

/* ─── Hidden radio ──────────────────────────────────────────── */
.segmented-control__radio {
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

/* ─── Label text ────────────────────────────────────────────── */
.segmented-control__label {
  font-family: var(--font-family-base);
  font-size: 14px;
  font-weight: var(--font-weight-medium); /* 500 */
  line-height: 14px;
  letter-spacing: 0;
  color: var(--color-neutral-0);
  pointer-events: none;

  transition: color 0.12s ease;
}

/* White text on selected chip */
.segmented-control__chip--selected .segmented-control__label {
  color: var(--color-neutral-100);
}
</style>
