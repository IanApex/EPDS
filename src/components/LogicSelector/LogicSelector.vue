<script setup lang="ts">
/**
 * LogicSelector — compact single-choice picker that drives form logic.
 *
 * Selecting an option dynamically shows/hides related fields below it.
 * Unlike JourneySelector (routing) or BoxSelector (styled radio strip),
 * this is neutral in tone — inline with a form, not a decision card.
 *
 * Usage:
 *   <LogicSelector
 *     v-model="employmentStatus"
 *     name="employment"
 *     :options="[
 *       { value: 'employed',   label: 'Employed'   },
 *       { value: 'military',   label: 'Military'   },
 *       { value: 'retired',    label: 'Retired'    },
 *       { value: 'unemployed', label: 'Unemployed' },
 *       { value: 'other',      label: 'Other'      },
 *     ]"
 *     error="Select an employment status"
 *   />
 *
 * Build guidelines (Figma):
 *   - No default selection — user must make a cognitive decision
 *   - Chips wrap on mobile (flex-wrap)
 *   - 8px gap between chips
 *   - 4px gap between chip row and error message
 *   - State retained when user returns to this step
 */
export interface LogicSelectorOption {
  value: string
  label: string
}

const props = withDefaults(defineProps<{
  /** All selectable options. */
  options: LogicSelectorOption[]
  /** Radio group name — must be unique per page. */
  name: string
  /** Currently selected value (bind with v-model). */
  modelValue?: string
  /** Disables the entire group. */
  disabled?: boolean
  /** Validation error message shown below the chips. */
  error?: string
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function select(value: string) {
  if (!props.disabled) emit('update:modelValue', value)
}
</script>

<template>
  <div
    class="logic-selector"
    :class="{ 'logic-selector--disabled': disabled }"
    role="group"
  >
    <!-- Chip row — wraps on narrow viewports -->
    <div class="logic-selector__chips">
      <label
        v-for="opt in options"
        :key="opt.value"
        class="logic-selector__chip"
        :class="{ 'logic-selector__chip--selected': modelValue === opt.value }"
      >
        <!-- Visually hidden native radio for keyboard nav + screen readers -->
        <input
          type="radio"
          class="logic-selector__radio"
          :name="name"
          :value="opt.value"
          :checked="modelValue === opt.value"
          :disabled="disabled"
          @change="select(opt.value)"
        />
        <span class="logic-selector__chip-label">{{ opt.label }}</span>
      </label>
    </div>

    <!-- Error — 4px below the chip row (Figma: top: 48px = 44px chip + 4px) -->
    <p v-if="error" class="logic-selector__error">{{ error }}</p>
  </div>
</template>

<style scoped>
/* ─── Container ────────────────────────────────────────── */
.logic-selector {
  display: inline-flex;
  flex-direction: column;
  gap: 4px; /* 4px between chip row and error message */
}

.logic-selector--disabled {
  opacity: var(--opacity-level-medium);
  pointer-events: none;
}

/* ─── Chip row ──────────────────────────────────────────── */
.logic-selector__chips {
  display: flex;
  flex-wrap: wrap; /* stacks vertically on narrow viewports */
  gap: 8px;
}

/* ─── Individual chip ───────────────────────────────────── */
.logic-selector__chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 8px 12px;
  box-sizing: border-box;
  border-radius: 4px;

  background: var(--color-neutral-100); /* white */
  color: var(--color-neutral-40);       /* #666B70 */
  cursor: pointer;

  /* 1px border via inset shadow — no layout shift on focus width change */
  box-shadow: inset 0 0 0 1px var(--color-neutral-85);

  transition:
    background-color 0.12s ease,
    color            0.12s ease,
    box-shadow       0.12s ease;
}

/* ─── Hover (unselected) ────────────────────────────────── */
.logic-selector__chip:hover:not(.logic-selector__chip--selected) {
  background: var(--color-neutral-90); /* #E8E9EB */
}
.logic-selector__chip:hover:not(.logic-selector__chip--selected) .logic-selector__chip-label {
  text-decoration: underline;
}

/* ─── Selected ──────────────────────────────────────────── */
/*
  Dark fill + white text. Border becomes a subtle light highlight
  on the dark surface (same ParkGray80 colour, 1px).
*/
.logic-selector__chip--selected {
  background: var(--color-neutral-20); /* #313D47 */
  color: var(--color-neutral-100);     /* white */
}

/* ─── Focus (via :has — works on both selected and unselected) ─ */
/*
  2px Blue80 (#6FCFFF) replaces the default 1px border.
  Using :has() keeps the hidden radio's focus-visible accessible.
*/
.logic-selector__chip:has(.logic-selector__radio:focus-visible) {
  outline: none;
  box-shadow: inset 0 0 0 2px #6fcfff; /* --color-system-blue-80, no token yet */
}

/* ─── Hidden radio ──────────────────────────────────────── */
.logic-selector__radio {
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

/* ─── Chip label text ───────────────────────────────────── */
.logic-selector__chip-label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);    /* 14px */
  font-weight: var(--font-weight-regular); /* 400 */
  line-height: 22px;
  white-space: nowrap;
  text-align: center;
}

/* ─── Error message ─────────────────────────────────────── */
/*
  Shown 4px below the chip row (via the parent's gap: 4px).
  Uses warning-40 red in light context; font matches label/overline style.
*/
.logic-selector__error {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  line-height: 16px;
  letter-spacing: 0.2px;
  color: var(--color-warning-40); /* #B30715 */
}
</style>
