<script setup lang="ts">
import { ref, watch } from 'vue'
import SegmentedControl from '@/components/SegmentedControl/SegmentedControl.vue'
import BaseSlider from '@/components/BaseSlider/BaseSlider.vue'

const props = withDefaults(defineProps<{
  /** Absolute price bounds derived from the current result set */
  priceAbsMin?: number
  priceAbsMax?: number
  /** Current applied price filter values */
  priceMin?: number
  priceMax?: number
  /** Absolute monthly-payment bounds derived from the current result set */
  paymentAbsMin?: number
  paymentAbsMax?: number
  /** Current applied payment filter values */
  paymentMin?: number
  paymentMax?: number
}>(), {
  priceAbsMin:    5_000,
  priceAbsMax:   70_000,
  priceMin:       5_000,
  priceMax:      70_000,
  paymentAbsMin:    250,
  paymentAbsMax:  1_250,
  paymentMin:       250,
  paymentMax:     1_250,
})

const emit = defineEmits<{
  'update:priceMin':    [value: number]
  'update:priceMax':   [value: number]
  'update:paymentMin': [value: number]
  'update:paymentMax': [value: number]
  /**
   * Fires when the user *finishes* adjusting — slider thumb released or
   * text input blurred. Use this to update pill/badge state.
   */
  commit: [payload: { priceMin: number; priceMax: number; paymentMin: number; paymentMax: number }]
}>()

const PRICE_STEP   = 1_000
const PAYMENT_STEP = 50

const modeOptions = [
  { value: 'price',   label: 'Price'   },
  { value: 'payment', label: 'Payment' },
]
const mode = ref<string>('price')

// ─── Internal slider values ───────────────────────────────────
const sliderPriceMin = ref(props.priceMin)
const sliderPriceMax = ref(props.priceMax)
const sliderPayMin   = ref(props.paymentMin)
const sliderPayMax   = ref(props.paymentMax)

// ─── Input display strings ────────────────────────────────────
const minInput = ref('')
const maxInput = ref('')

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US')
}
function parse(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ''), 10) || 0
}
function snapTo(n: number, step: number): number {
  return Math.round(n / step) * step
}

function refreshInputs() {
  if (mode.value === 'price') {
    minInput.value = fmt(sliderPriceMin.value)
    maxInput.value = fmt(sliderPriceMax.value)
  } else {
    minInput.value = fmt(sliderPayMin.value)
    maxInput.value = fmt(sliderPayMax.value)
  }
}
refreshInputs()

watch(mode, refreshInputs)

// Emit live updates + sync display on slider change
watch(sliderPriceMin, (v) => {
  emit('update:priceMin', v)
  if (mode.value === 'price') minInput.value = fmt(v)
})
watch(sliderPriceMax, (v) => {
  emit('update:priceMax', v)
  if (mode.value === 'price') maxInput.value = fmt(v)
})
watch(sliderPayMin, (v) => {
  emit('update:paymentMin', v)
  if (mode.value === 'payment') minInput.value = fmt(v)
})
watch(sliderPayMax, (v) => {
  emit('update:paymentMax', v)
  if (mode.value === 'payment') maxInput.value = fmt(v)
})

// Sync internal state when the parent resets values externally (e.g. pill dismiss)
watch(() => props.priceMin,    (v) => { sliderPriceMin.value = v })
watch(() => props.priceMax,    (v) => { sliderPriceMax.value = v })
watch(() => props.paymentMin,  (v) => { sliderPayMin.value   = v })
watch(() => props.paymentMax,  (v) => { sliderPayMax.value   = v })

// ─── Commit helpers ───────────────────────────────────────────
function emitCommit() {
  emit('commit', {
    priceMin:   sliderPriceMin.value,
    priceMax:   sliderPriceMax.value,
    paymentMin: sliderPayMin.value,
    paymentMax: sliderPayMax.value,
  })
}

// ─── Input handlers ───────────────────────────────────────────
function onMinFocus(e: FocusEvent) {
  // Show bare number so user can type without formatting
  const raw = mode.value === 'price' ? sliderPriceMin.value : sliderPayMin.value
  minInput.value = String(raw);
  (e.target as HTMLInputElement).select()
}
function onMaxFocus(e: FocusEvent) {
  const raw = mode.value === 'price' ? sliderPriceMax.value : sliderPayMax.value
  maxInput.value = String(raw);
  (e.target as HTMLInputElement).select()
}

function applyMin() {
  const n = parse(minInput.value)
  if (mode.value === 'price') {
    sliderPriceMin.value = snapTo(
      Math.max(props.priceAbsMin, Math.min(n, sliderPriceMax.value - PRICE_STEP)),
      PRICE_STEP,
    )
    minInput.value = fmt(sliderPriceMin.value)
  } else {
    sliderPayMin.value = snapTo(
      Math.max(props.paymentAbsMin, Math.min(n, sliderPayMax.value - PAYMENT_STEP)),
      PAYMENT_STEP,
    )
    minInput.value = fmt(sliderPayMin.value)
  }
  emitCommit()
}
function applyMax() {
  const n = parse(maxInput.value)
  if (mode.value === 'price') {
    sliderPriceMax.value = snapTo(
      Math.min(props.priceAbsMax, Math.max(n, sliderPriceMin.value + PRICE_STEP)),
      PRICE_STEP,
    )
    maxInput.value = fmt(sliderPriceMax.value)
  } else {
    sliderPayMax.value = snapTo(
      Math.min(props.paymentAbsMax, Math.max(n, sliderPayMin.value + PAYMENT_STEP)),
      PAYMENT_STEP,
    )
    maxInput.value = fmt(sliderPayMax.value)
  }
  emitCommit()
}
</script>

<template>
  <div class="srp-ppf">
    <!-- Price | Payment tab -->
    <SegmentedControl
      :options="modeOptions"
      name="srp-price-payment-mode"
      v-model="mode"
    />

    <!-- Min/Max inputs + dual-thumb range slider -->
    <div class="srp-ppf__body">
      <div class="srp-ppf__inputs">
        <div class="srp-ppf__input-group">
          <label class="srp-ppf__input-label" for="srp-ppf-min">Min</label>
          <input
            id="srp-ppf-min"
            class="srp-ppf__input"
            type="text"
            inputmode="numeric"
            v-model="minInput"
            @focus="onMinFocus"
            @blur="applyMin"
            @keydown.enter.prevent="applyMin"
          />
        </div>

        <div class="srp-ppf__input-group">
          <label class="srp-ppf__input-label" for="srp-ppf-max">Max</label>
          <input
            id="srp-ppf-max"
            class="srp-ppf__input"
            type="text"
            inputmode="numeric"
            v-model="maxInput"
            @focus="onMaxFocus"
            @blur="applyMax"
            @keydown.enter.prevent="applyMax"
          />
        </div>
      </div>

      <!-- pointerup covers mouse-release and touch-end on the native range input -->
      <div @pointerup="emitCommit">
        <BaseSlider
          v-if="mode === 'price'"
          :range="true"
          :min="priceAbsMin"
          :max="priceAbsMax"
          :step="PRICE_STEP"
          v-model:minValue="sliderPriceMin"
          v-model:maxValue="sliderPriceMax"
        />
        <BaseSlider
          v-else
          :range="true"
          :min="paymentAbsMin"
          :max="paymentAbsMax"
          :step="PAYMENT_STEP"
          v-model:minValue="sliderPayMin"
          v-model:maxValue="sliderPayMax"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── Outer wrapper ─────────────────────────────────────────── */
.srp-ppf {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);   /* 16px between segments */
  padding: var(--spacing-xxxs) var(--spacing-xxxs) var(--spacing-xxs); /* 16px 16px 24px */
  width: 100%;
  box-sizing: border-box;
}

/* ─── Body (inputs + slider) ────────────────────────────────── */
.srp-ppf__body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);   /* 24px */
}

/* ─── Min / Max input row ────────────────────────────────────── */
.srp-ppf__inputs {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--spacing-nano);   /* 8px */
}

.srp-ppf__input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: none;
}

.srp-ppf__input-label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);   /* 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-40);
}

.srp-ppf__input {
  height: 40px;
  width: 100px;
  box-sizing: border-box;
  padding: 0 8px;
  border: var(--border-width-hairline) solid var(--color-neutral-85);
  border-radius: var(--border-radius-md);  /* 8px */
  background: var(--color-neutral-100);
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);   /* 16px */
  font-weight: var(--font-weight-regular);
  line-height: 1;
  color: var(--color-neutral-0);
  outline: none;
  transition: border-color 0.15s ease;
}

.srp-ppf__input:focus {
  border-color: var(--color-action-accent-hover);
}

/* ─── SegmentedControl: fixed 88px chips, centred ───────────── */
.srp-ppf :deep(.segmented-control) {
  width: fit-content;
  align-self: center;
}

.srp-ppf :deep(.segmented-control__chip) {
  flex: 0 0 88px;
}
</style>
