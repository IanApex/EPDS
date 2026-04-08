<script setup lang="ts">
/**
 * BoxInputMD — medium single-select option box (86px height).
 *
 * Designed for location/store selection: bold primary label on the left,
 * optional secondary and tertiary sub-lines below it, and a right-aligned
 * side label (e.g. distance "4 mi").
 *
 * The optional #secondary-icon slot (e.g. a map-pin SVG) is shown only in
 * the default state — it is hidden on hover, selected, and focus per Figma.
 *
 * Usage:
 *   <BoxInputMD
 *     v-model="selected"
 *     name="location"
 *     value="charlotte"
 *     primary-label="EchoPark Charlotte"
 *     secondary-label="123 Main St, Charlotte, NC"
 *     side-label="4 mi"
 *   >
 *     <template #secondary-icon>
 *       <span v-html="mapPinSvg" style="display:contents" />
 *     </template>
 *   </BoxInputMD>
 */
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** This option's value — emitted when selected. */
  value: string
  /** Radio group name — all options in the same group must share the same name. */
  name: string
  /** Bold primary label (e.g. store name "EchoPark Charlotte"). Always visible. */
  primaryLabel?: string
  /** Optional secondary line below the primary label (e.g. address). */
  secondaryLabel?: string
  /** Optional tertiary line below the secondary label (e.g. hours or city). */
  tertiaryLabel?: string
  /** Right-aligned label (e.g. distance "4 mi"). */
  sideLabel?: string
  /** Currently selected value in the group (bind with v-model). */
  modelValue?: string
  disabled?: boolean
}>(), {
  primaryLabel: 'Label',
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
    class="box-input-md"
    :class="{
      'box-input-md--selected': isSelected,
      'box-input-md--disabled': disabled,
    }"
  >
    <!-- Visually hidden native radio -->
    <input
      type="radio"
      class="box-input-md__radio"
      :name="name"
      :value="value"
      :checked="isSelected"
      :disabled="disabled"
      @change="handleChange"
    />

    <!-- Left: stacked text content -->
    <span class="box-input-md__content">
      <span class="box-input-md__primary">
        <slot name="primary">{{ primaryLabel }}</slot>
      </span>

      <span v-if="secondaryLabel || $slots['secondary-icon']" class="box-input-md__secondary">
        <!--
          Map-pin or other 16×16 icon — only rendered in default state.
          CSS hides it on hover / selected / focus via :has() and modifier class.
          Import with ?raw and wrap in a span:
            <template #secondary-icon>
              <span v-html="mapPinSvg" style="display:contents" />
            </template>
        -->
        <span v-if="$slots['secondary-icon']" class="box-input-md__secondary-icon" aria-hidden="true">
          <slot name="secondary-icon" />
        </span>
        <span v-if="secondaryLabel" class="box-input-md__secondary-text">{{ secondaryLabel }}</span>
      </span>

      <span v-if="tertiaryLabel" class="box-input-md__tertiary">{{ tertiaryLabel }}</span>
    </span>

    <!-- Right: side label (e.g. distance) -->
    <span v-if="sideLabel" class="box-input-md__side-label">{{ sideLabel }}</span>
  </label>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.box-input-md {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 86px;
  min-width: 126px;
  padding: 24px;
  box-sizing: border-box;

  border-radius: var(--border-radius-md);
  background: var(--color-neutral-100);
  cursor: pointer;

  /* Default 1px border as inset shadow — no layout shift when weight changes */
  box-shadow: inset 0 0 0 1px var(--color-neutral-90);

  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

/* ─── Hover ────────────────────────────────────────────── */
.box-input-md:hover:not(.box-input-md--disabled) {
  background: var(--color-neutral-95);
}

/* ─── Selected ─────────────────────────────────────────── */
.box-input-md--selected {
  background: var(--color-neutral-100);
  box-shadow: inset 0 0 0 2px var(--color-action-primary);
}

/* ─── Focus ────────────────────────────────────────────── */
.box-input-md:has(.box-input-md__radio:focus-visible) {
  box-shadow: inset 0 0 0 3px var(--color-focus-ring);
}

/* ─── Disabled ─────────────────────────────────────────── */
.box-input-md--disabled {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
}

/* ─── Hidden radio ─────────────────────────────────────── */
.box-input-md__radio {
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

/* ─── Left content column ──────────────────────────────── */
.box-input-md__content {
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
}

/* ─── Primary label (bold headline) ───────────────────── */
.box-input-md__primary {
  font-family: var(--font-family-base);
  font-size: 16px;
  font-weight: var(--font-weight-bold);
  line-height: 24px;
  color: var(--color-neutral-0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

/* ─── Secondary line (icon + text) ────────────────────── */
.box-input-md__secondary {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

/* Hide the secondary icon on hover / selected / focus —
   it only appears in the resting default state per Figma */
.box-input-md:hover .box-input-md__secondary-icon,
.box-input-md--selected .box-input-md__secondary-icon,
.box-input-md:has(.box-input-md__radio:focus-visible) .box-input-md__secondary-icon {
  display: none;
}

.box-input-md__secondary-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  line-height: 0;
  color: var(--color-neutral-0);
}

.box-input-md__secondary-icon :deep(path),
.box-input-md__secondary-icon :deep(circle),
.box-input-md__secondary-icon :deep(rect) {
  fill: currentColor;
}

.box-input-md__secondary-text,
.box-input-md__tertiary {
  font-family: var(--font-family-base);
  font-size: 12px;
  font-weight: var(--font-weight-regular);
  line-height: 16px;
  letter-spacing: 0.2px;
  color: var(--color-neutral-0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── Right side label (e.g. distance) ────────────────── */
.box-input-md__side-label {
  flex-shrink: 0;
  width: 77px;

  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size); /* 14px */
  font-weight: var(--text-body-sm-weight); /* 400 */
  line-height: 22px;
  color: var(--color-neutral-0);
  text-align: right;
}
</style>
