<script setup lang="ts">
import { computed } from 'vue'
import addSvg from '../../../icon/Style=Display, Detail=Default, Icon=Add.svg?raw'
import checkSvg from '../../../icon/Style=Display, Detail=Default, Icon=Check.svg?raw'

const props = withDefaults(defineProps<{
  /**
   * Whether the vehicle/item is currently in the compare list.
   * When `true`, the button shows the check icon and (on hover/focus) the
   * "Remove" label. When `false`, shows the add (+) icon and "Compare" label.
   * Use with `v-model:selected` for two-way binding.
   */
  selected?: boolean
  /**
   * Label revealed on hover/focus when the item is **not** in the compare list.
   * Defaults to `"Compare"`.
   */
  compareLabel?: string
  /**
   * Label revealed on hover/focus when the item **is** in the compare list.
   * Defaults to `"Remove"`.
   */
  removeLabel?: string
  /**
   * Override the computed `aria-label` when unselected.
   * Default is `"Add to compare"`.
   */
  ariaLabelUnselected?: string
  /**
   * Override the computed `aria-label` when selected.
   * Default is `"Remove from compare"`.
   */
  ariaLabelSelected?: string
}>(), {
  selected: false,
  compareLabel: 'Compare',
  removeLabel: 'Remove',
})

const emit = defineEmits<{
  /** Fired whenever the button is clicked with the next selection state. */
  'update:selected': [value: boolean]
  /** Fired on every click (parent may intercept for analytics etc.). */
  click: [event: MouseEvent]
}>()

const labelText = computed(() => (props.selected ? props.removeLabel : props.compareLabel))
const iconSvg = computed(() => (props.selected ? checkSvg : addSvg))
const computedAriaLabel = computed(() => {
  if (props.selected) return props.ariaLabelSelected ?? 'Remove from compare'
  return props.ariaLabelUnselected ?? 'Add to compare'
})

function onClick(event: MouseEvent) {
  emit('update:selected', !props.selected)
  emit('click', event)
}
</script>

<template>
  <span class="compare-btn-anchor">
    <button
      type="button"
      class="compare-btn"
      :class="{ 'compare-btn--selected': selected }"
      :aria-label="computedAriaLabel"
      :aria-pressed="selected"
      @click="onClick"
    >
      <span class="compare-btn__label-wrap" aria-hidden="true">
        <span class="compare-btn__label">{{ labelText }}</span>
      </span>
      <span class="compare-btn__icon" aria-hidden="true" v-html="iconSvg" />
    </button>
  </span>
</template>

<style scoped>
/* ─── Anchor slot ────────────────────────────────────────
 * Fixed 32×32 layout slot. The button inside is absolutely
 * positioned against this anchor so when it expands leftward
 * the parent layout (SRP tile, button row, etc.) never shifts
 * and the icon stays pinned to the RIGHT edge regardless of
 * surrounding layout (flow, flex, grid, absolute-positioned).
 * -------------------------------------------------------- */
.compare-btn-anchor {
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;
  vertical-align: middle;
}

/* ─── Button (collapsed 32×32 circle) ────────────────────
 * `position: absolute; right: 0` pins the right edge to the
 * anchor's right edge. Growth happens to the LEFT as the
 * label-wrap animates its `max-width` on hover/focus.
 *
 * `padding-right` stays constant at 3px so the icon remains
 * exactly 3px from the outer right (4px including the 1px
 * border) — it never moves horizontally.
 *
 * `justify-content: flex-end` + `max-width` on the label-wrap
 * makes the word "reveal" out of the icon (right-to-left)
 * rather than sliding in from an unrelated left edge.
 * -------------------------------------------------------- */
.compare-btn {
  position: absolute;
  top: 0;
  right: 0;

  display: inline-flex;
  align-items: center;
  justify-content: flex-end;

  height: 32px;
  min-width: 32px;
  padding: 0 3px;
  box-sizing: border-box;

  border: 1px solid var(--color-neutral-90);
  border-radius: var(--border-radius-pill);
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-0);

  font-family: var(--font-family-base);
  font-size: 14px;
  font-weight: var(--font-weight-medium);
  line-height: 14px;
  letter-spacing: 0;

  cursor: pointer;

  transition:
    padding-left 0.2s ease,
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

/* ─── Hover / focus: expand pill to the left ─────────────
 * Raise z-index so the expanded pill reliably sits above
 * any overlapping siblings (adjacent buttons, tile content).
 * -------------------------------------------------------- */
.compare-btn:hover,
.compare-btn:focus-visible {
  padding-left: 12px;
  z-index: 1;
}

/* ─── Focus ring (Accessibility80) ───────────────────────── */
.compare-btn:focus-visible {
  outline: none;
  border-color: var(--color-focus-ring);
}

/* ─── Selected (item is in compare list) ─────────────────── */
.compare-btn--selected {
  background-color: var(--color-action-primary);
  color: var(--color-neutral-100);
}

/* ─── Label ───────────────────────────────────────────────
 * `max-width: 0` collapses the wrap while `overflow: hidden`
 * clips the text. `margin-right` carries the 5px gap between
 * label and icon — applied only when expanded so the icon
 * sits flush at the right while collapsed.
 *
 * `max-width: 200px` is a generous ceiling; flex always
 * resolves to the label's real intrinsic width since the
 * inner `<span>` is `white-space: nowrap`, so no visual
 * "over-shoot" past the word.
 * -------------------------------------------------------- */
.compare-btn__label-wrap {
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
  max-width: 0;
  margin-right: 0;
  flex-shrink: 0;
  transition:
    max-width 0.25s ease,
    margin-right 0.2s ease;
}

.compare-btn:hover .compare-btn__label-wrap,
.compare-btn:focus-visible .compare-btn__label-wrap {
  max-width: 200px;
  margin-right: 5px;
}

.compare-btn__label {
  white-space: nowrap;
}

/* ─── Icon ──────────────────────────────────────────────── */
.compare-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  /* Unselected icon uses the brand primary colour (green for EchoPark,
     red for Sonic). Selected state overrides below to white. */
  color: var(--color-action-primary);
}

.compare-btn--selected .compare-btn__icon {
  color: var(--color-neutral-100);
}

/* Icon SVG inherits the icon wrapper's `color` via `currentColor`. */
.compare-btn__icon :deep(path),
.compare-btn__icon :deep(circle),
.compare-btn__icon :deep(rect),
.compare-btn__icon :deep(polygon) {
  fill: currentColor;
}
</style>
