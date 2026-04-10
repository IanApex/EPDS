<script lang="ts">
export interface StepperStep {
  label: string
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  steps: StepperStep[]
  modelValue?: number
}>(), {
  modelValue: 1,
})

const totalSteps = computed(() => props.steps.length)
const currentLabel = computed(() => props.steps[props.modelValue - 1]?.label ?? '')
const nextLabel = computed(() => props.steps[props.modelValue]?.label ?? '')

const RADIUS = 38
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const progressOffset = computed(() => {
  const fraction = (props.modelValue - 1) / totalSteps.value
  return CIRCUMFERENCE * (1 - fraction)
})
</script>

<template>
  <div class="stepper" role="group" :aria-label="`Step ${modelValue} of ${totalSteps}: ${currentLabel}`">
    <div class="stepper__circle">
      <svg class="stepper__svg" viewBox="0 0 90 90" aria-hidden="true">
        <circle
          class="stepper__track"
          cx="45" cy="45" :r="RADIUS"
        />
        <circle
          class="stepper__fill"
          cx="45" cy="45" :r="RADIUS"
          :stroke-dasharray="CIRCUMFERENCE"
          :stroke-dashoffset="progressOffset"
        />
      </svg>
      <div class="stepper__counter">
        <span class="stepper__number">{{ modelValue }}</span>
        <span class="stepper__of">of {{ totalSteps }}</span>
      </div>
    </div>

    <div class="stepper__text">
      <p class="stepper__label">{{ currentLabel }}</p>
      <p v-if="nextLabel" class="stepper__next">Next: {{ nextLabel }}</p>
    </div>
  </div>
</template>

<style scoped>
.stepper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxxs);
  width: 331px;
  max-width: 100%;
}

/* ─── Circle ─────────────────────────────────────────────── */
.stepper__circle {
  position: relative;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
}

.stepper__svg {
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.stepper__track {
  fill: none;
  stroke: var(--color-neutral-90);
  stroke-width: 8;
}

.stepper__fill {
  fill: none;
  stroke: var(--color-base-primary-60);
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.4s ease;
}

.stepper__counter {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: baseline;
  justify-content: center;
  padding-top: 28px;
  gap: 2px;
  pointer-events: none;
}

.stepper__number {
  font-family: var(--font-family-base);
  font-size: 26px;
  font-weight: var(--font-weight-bold);
  line-height: 32px;
  letter-spacing: 0.4px;
  color: var(--color-neutral-0);
}

.stepper__of {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
}

/* ─── Text ───────────────────────────────────────────────── */
.stepper__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 0%;
  min-width: 0;
}

.stepper__label {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: 26px;
  font-weight: var(--font-weight-bold);
  line-height: 32px;
  letter-spacing: 0.4px;
  color: var(--color-neutral-0);
}

.stepper__next {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: #666B70;
}
</style>
