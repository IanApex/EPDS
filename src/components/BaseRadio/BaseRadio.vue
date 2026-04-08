<script setup lang="ts">
/**
 * BaseRadio — a single radio button with an optional label.
 *
 * Group multiple BaseRadio components together using the same `name` prop
 * and bind a shared v-model (string) that holds the currently-selected value.
 *
 * Usage:
 *   <div role="radiogroup" aria-labelledby="groupLabel">
 *     <BaseRadio
 *       v-for="opt in options"
 *       :key="opt.value"
 *       v-model="chosen"
 *       name="myGroup"
 *       :value="opt.value"
 *       :label="opt.label"
 *     />
 *   </div>
 *
 * Build guidelines (Figma):
 *   - Circle: 24×24px, 2px inside border
 *   - Inner dot: 12×12px, centered — visible when selected
 *   - Gap between circle and label text: 12px
 *   - Gap between radio items in a list: 16px
 *   - Wrapped label text indents to align with the first line (achieved via flex + align-items: start)
 *   - One radio must be selected by default in a group upon page load
 *   - Only use when exactly one answer is allowed; make it clear users can't multi-select
 */
withDefaults(defineProps<{
  /** The value this radio represents. Matched against modelValue to determine checked state. */
  value: string
  /** Radio group name — all radios in a group must share the same name. */
  name: string
  /** Currently selected value for the group (bind with v-model). */
  modelValue?: string
  /** Visible label text next to the circle. Pass nothing to render an unlabelled radio. */
  label?: string
  /** Disables this radio button. */
  disabled?: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label
    class="base-radio"
    :class="{ 'base-radio--disabled': disabled }"
  >
    <!-- Visually hidden native radio — provides all keyboard nav and screen-reader semantics -->
    <input
      type="radio"
      class="base-radio__input"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="emit('update:modelValue', value)"
    />

    <!--
      Custom circle. States driven by adjacent sibling selector on the hidden input.
      ::before pseudo-element renders the inner dot (shown when checked).
    -->
    <span class="base-radio__circle" aria-hidden="true" />

    <span v-if="label" class="base-radio__label">{{ label }}</span>
  </label>
</template>

<style scoped>
/* ─── Label wrapper ─────────────────────────────────────────── */
/*
  flex + align-items: start means the circle sits at the top of the
  first text line; if the label wraps, subsequent lines indent to
  align with where the text started — not with the circle edge.
*/
.base-radio {
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.base-radio--disabled {
  cursor: not-allowed;
  opacity: var(--opacity-level-medium);
}

/* ─── Hidden native input ───────────────────────────────────── */
.base-radio__input {
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

/* ─── Custom circle ─────────────────────────────────────────── */
/*
  24×24px circle with a 2px ring and a centred inner dot (::before).
  box-sizing: border-box keeps outer diameter fixed as border width changes.
*/
.base-radio__circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--color-neutral-40);
  background: var(--color-neutral-100);
  box-sizing: border-box;
  position: relative;

  transition:
    border-color  0.12s ease,
    border-width  0.12s ease,
    box-shadow    0.12s ease;
}

/* ─── Inner dot (::before) ──────────────────────────────────── */
/*
  12×12px filled circle. Hidden by default; revealed when checked.
  Absolutely centred inside the 24px circle.
*/
.base-radio__circle::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-action-primary);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition:
    opacity   0.12s ease,
    transform 0.12s ease;
}

/* ─── Label text ────────────────────────────────────────────── */
.base-radio__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);    /* 16px */
  font-weight: var(--font-weight-regular); /* 400 */
  line-height: 24px;
  color: var(--color-neutral-0);
}

/* ════════════════════════════════════════════════════════════
   STATE STYLES — driven by the hidden input's state via ~ combinator
   ════════════════════════════════════════════════════════════ */

/* ─── Hover (unselected) ────────────────────────────────────── */
/*
  Ring thickens to 3px; label gets underline.
  box-sizing: border-box ensures the outer 24px dimension stays fixed.
*/
.base-radio:hover:not(.base-radio--disabled) .base-radio__input:not(:checked) ~ .base-radio__circle {
  border-width: 3px;
}
.base-radio:hover:not(.base-radio--disabled) .base-radio__input:not(:checked) ~ .base-radio__label {
  text-decoration: underline;
}

/* ─── Checked ───────────────────────────────────────────────── */
.base-radio__input:checked ~ .base-radio__circle {
  border-color: var(--color-action-primary);
}
.base-radio__input:checked ~ .base-radio__circle::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* ─── Hover + Checked ───────────────────────────────────────── */
.base-radio:hover:not(.base-radio--disabled) .base-radio__input:checked ~ .base-radio__circle {
  border-color: var(--color-action-primary-hover);
}
.base-radio:hover:not(.base-radio--disabled) .base-radio__input:checked ~ .base-radio__label {
  text-decoration: underline;
}

/* ─── Focus (any state) ─────────────────────────────────────── */
/*
  2px Accessibility80 ring drawn outside the circle edge.
  Replaces the default browser outline entirely.
*/
.base-radio__input:focus-visible ~ .base-radio__circle {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

/* ─── Disabled (selected) — grey dot ───────────────────────── */
.base-radio--disabled .base-radio__input:checked ~ .base-radio__circle {
  border-color: var(--color-neutral-85);
}
.base-radio--disabled .base-radio__input:checked ~ .base-radio__circle::before {
  background: var(--color-neutral-85);
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
/* Disabled unselected ring — neutral grey */
.base-radio--disabled .base-radio__input:not(:checked) ~ .base-radio__circle {
  border-color: var(--color-neutral-85);
}
</style>
