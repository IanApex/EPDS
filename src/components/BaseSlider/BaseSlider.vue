<script setup lang="ts">
/**
 * BaseSlider — a styled range input in single or dual-thumb (range) mode.
 *
 * Single thumb (max-only):
 *   <BaseSlider v-model="mileage" :max="200000" track-min-label="0" track-max-label="200,000" />
 *
 * Dual thumb (range/min-max):
 *   <BaseSlider
 *     range
 *     v-model:min-value="priceMin"
 *     v-model:max-value="priceMax"
 *     :min="0"
 *     :max="50000"
 *     track-min-label="$0"
 *     track-max-label="$50,000"
 *   />
 *
 * Build guidelines (Figma):
 *   - Track: 4px height, 11px border-radius, Neutral80 (unfilled) / Neutral20 (filled)
 *   - Thumb: 24×24px solid Neutral20 circle
 *   - Hover cursor: grab (open hand); Active cursor: grabbing (closed hand)
 *   - Focus: 2px Accessibility80 ring outside the thumb
 *   - Labels below the track: 14px/22px Roboto Regular, Neutral40
 *   - 8px gap between the slider track area and the range labels
 *   - The companion label + value input ABOVE the slider are placed by the parent,
 *     with 16px gap from that input down to this component (Figma build guideline)
 *   - Min/max ranges and step increments are determined per use-case by the designer
 *   - Inputs above dynamically update as the thumb moves during drag
 */
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  /** Current value — single-thumb mode (bind with v-model). */
  modelValue?: number
  /** Minimum bound. */
  min?: number
  /** Maximum bound (required). */
  max: number
  /** Step increment. */
  step?: number
  /** Enable dual-thumb range mode. */
  range?: boolean
  /** Lower-bound value for range mode (bind with v-model:minValue). */
  minValue?: number
  /** Upper-bound value for range mode (bind with v-model:maxValue). */
  maxValue?: number
  /** Label shown at the left end of the track (e.g. "0" or "$0"). */
  trackMinLabel?: string
  /** Label shown at the right end of the track (e.g. "200,000" or "$50,000"). */
  trackMaxLabel?: string
  /** Disables the slider. */
  disabled?: boolean
}>(), {
  min: 0,
  step: 1,
  range: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'update:minValue': [value: number]
  'update:maxValue': [value: number]
}>()

function toPercent(val: number): number {
  return ((val - props.min) / (props.max - props.min)) * 100
}

const singlePercent = computed(() =>
  props.modelValue !== undefined ? toPercent(props.modelValue) : 0,
)
const minPercent = computed(() =>
  props.minValue !== undefined ? toPercent(props.minValue) : 0,
)
const maxPercent = computed(() =>
  props.maxValue !== undefined ? toPercent(props.maxValue) : 100,
)

/** Inline style for the filled portion of the visual track. */
const fillStyle = computed(() => {
  if (props.range) {
    return {
      left: `${minPercent.value}%`,
      width: `${maxPercent.value - minPercent.value}%`,
    }
  }
  return { left: '0%', width: `${singlePercent.value}%` }
})

/**
 * Which thumb gets z-index 3 (on top of the max input's z-index 2).
 * Determined on every pointerdown based on click position:
 *   - click is closer to min thumb → min on top (user wants to drag left)
 *   - click is closer to max thumb → max on top (user wants to drag right)
 *   - exact overlap: click left of the position → min; right/at → max
 * This lets both thumbs remain reachable in every overlap scenario.
 */
const minIsOnTop = ref(false)
const trackAreaRef = ref<HTMLElement | null>(null)

function onTrackPointerDown(e: PointerEvent) {
  if (!props.range || !trackAreaRef.value) return

  const rect     = trackAreaRef.value.getBoundingClientRect()
  const clickPct = ((e.clientX - rect.left) / rect.width) * 100

  const distToMin = Math.abs(clickPct - minPercent.value)
  const distToMax = Math.abs(clickPct - maxPercent.value)

  // Closest thumb wins. When equidistant (overlap): left of overlap → min,
  // right of (or at) overlap → max, so both directions are always reachable.
  minIsOnTop.value = distToMin < distToMax ||
    (distToMin === distToMax && clickPct < minPercent.value)
}

function onSingleInput(e: Event) {
  emit('update:modelValue', Number((e.target as HTMLInputElement).value))
}
function onMinInput(e: Event) {
  const input = e.target as HTMLInputElement
  const val   = Number(input.value)
  const ceil  = props.maxValue ?? props.max

  if (val > ceil) {
    // Snap the native thumb back so it stops at the max thumb's position
    input.value = String(ceil)
    emit('update:minValue', ceil)
  } else {
    emit('update:minValue', val)
  }
}

function onMaxInput(e: Event) {
  const input  = e.target as HTMLInputElement
  const val    = Number(input.value)
  const floor  = props.minValue ?? props.min

  if (val < floor) {
    // Snap the native thumb back so it stops at the min thumb's position
    input.value = String(floor)
    emit('update:maxValue', floor)
  } else {
    emit('update:maxValue', val)
  }
}
</script>

<template>
  <div
    class="base-slider"
    :class="{ 'base-slider--disabled': disabled }"
  >
    <!--
      Track area: 24px tall (thumb height).
      A custom visual track div sits behind the native input(s).
      Native inputs are transparent except for their thumbs.
    -->
    <div
      ref="trackAreaRef"
      class="base-slider__track-area"
      @pointerdown="onTrackPointerDown"
    >

      <!-- Custom visual track: grey background + coloured fill overlay -->
      <div class="base-slider__track" aria-hidden="true">
        <div class="base-slider__track-fill" :style="fillStyle" />
      </div>

      <!-- Single thumb -->
      <input
        v-if="!range"
        type="range"
        class="base-slider__input"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        aria-label="Slider value"
        @input="onSingleInput"
      />

      <!-- Dual thumb — min (lower) -->
      <!--
        Both inputs share the same full min/max range so neither thumb
        drifts when the other moves. Crossing is prevented in JS by
        snapping input.value back before emitting.
        z-index is set dynamically on pointerdown based on click position.
      -->
      <input
        v-if="range"
        type="range"
        class="base-slider__input"
        :style="{ zIndex: minIsOnTop ? 3 : 1 }"
        :min="min"
        :max="max"
        :step="step"
        :value="minValue"
        :disabled="disabled"
        aria-label="Minimum value"
        @input="onMinInput"
      />

      <!-- Dual thumb — max (upper) -->
      <input
        v-if="range"
        type="range"
        class="base-slider__input"
        style="z-index: 2"
        :min="min"
        :max="max"
        :step="step"
        :value="maxValue"
        :disabled="disabled"
        aria-label="Maximum value"
        @input="onMaxInput"
      />
    </div>

    <!-- Range labels below track -->
    <div
      v-if="trackMinLabel !== undefined || trackMaxLabel !== undefined"
      class="base-slider__labels"
    >
      <span class="base-slider__label">{{ trackMinLabel }}</span>
      <span class="base-slider__label">{{ trackMaxLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
/* ─── Outer wrapper ────────────────────────────────────────── */
.base-slider {
  display: flex;
  flex-direction: column;
  gap: 8px; /* 8px between slider and labels (Figma build guideline) */
  width: 100%;
}

.base-slider--disabled {
  opacity: var(--opacity-level-medium);
  pointer-events: none;
}

/* ─── Track area ────────────────────────────────────────────── */
/*
  24px = thumb height. The custom visual track is vertically centred
  inside here; the native input(s) are stacked on top, filling the
  full area with a transparent track.
*/
.base-slider__track-area {
  position: relative;
  height: 24px;
  display: flex;
  align-items: center;
}

/* ─── Custom visual track ───────────────────────────────────── */
/*
  4px bar, absolutely centred in the 24px area.
  Neutral80 background = the "empty" portion.
  overflow: hidden clips the fill inside the rounded ends.
*/
.base-slider__track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  transform: translateY(-50%);
  border-radius: 11px;
  background: var(--color-neutral-80);
  overflow: hidden;
  pointer-events: none;
}

/* Filled portion: Neutral20 (dark charcoal) */
.base-slider__track-fill {
  position: absolute;
  top: 0;
  height: 100%;
  background: var(--color-neutral-20);
}

/* ─── Native range input(s) ─────────────────────────────────── */
/*
  Absolutely fills the track area. Track pseudo-elements are made
  transparent so only the custom visual track is visible. Pointer
  events are routed through to the thumbs only.
*/
.base-slider__input {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  pointer-events: none;
  cursor: grab;
  outline: none;
}

/* ── webkit: hide native track ──────────────────────────────── */
.base-slider__input::-webkit-slider-runnable-track {
  height: 4px;
  background: transparent;
}

/* ── Firefox: hide native track ─────────────────────────────── */
.base-slider__input::-moz-range-track {
  height: 4px;
  background: transparent;
  border: none;
}

/* ── webkit: thumb ──────────────────────────────────────────── */
.base-slider__input::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-neutral-20);
  cursor: grab;
  border: none;
  box-shadow: none;
  transition: background-color 0.12s ease, box-shadow 0.12s ease;
  /* Centre on the 4px track: -(24 - 4) / 2 = -10 */
  margin-top: -10px;
}

.base-slider__input:hover:not(:disabled)::-webkit-slider-thumb {
  background: var(--color-action-primary-hover);
}

.base-slider__input:active::-webkit-slider-thumb {
  background: var(--color-action-primary-press);
  cursor: grabbing;
}

.base-slider__input:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

/* ── Firefox: thumb ─────────────────────────────────────────── */
.base-slider__input::-moz-range-thumb {
  pointer-events: all;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-neutral-20);
  border: none;
  cursor: grab;
  transition: background-color 0.12s ease, box-shadow 0.12s ease;
}

.base-slider__input:hover:not(:disabled)::-moz-range-thumb {
  background: var(--color-action-primary-hover);
}

.base-slider__input:active::-moz-range-thumb {
  background: var(--color-action-primary-press);
  cursor: grabbing;
}

.base-slider__input:focus-visible::-moz-range-thumb {
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

/* ─── Labels ────────────────────────────────────────────────── */
.base-slider__labels {
  display: flex;
  justify-content: space-between;
}

.base-slider__label {
  font-family: var(--font-family-base);
  font-size: 14px;
  font-weight: var(--font-weight-regular); /* 400 */
  line-height: 22px;
  color: var(--color-neutral-40);
}
</style>
