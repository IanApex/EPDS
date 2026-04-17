<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseSlider from '@/components/BaseSlider/BaseSlider.vue'

const props = withDefaults(defineProps<{
  /** Oldest model year in the current result set */
  absMin?: number
  /** Newest model year (typically current calendar year) */
  absMax?: number
  /** Currently selected min year — bind with v-model:minYear */
  minYear?: number
  /** Currently selected max year — bind with v-model:maxYear */
  maxYear?: number
}>(), {
  absMin:  2012,
  absMax:  2026,
  minYear: 2012,
  maxYear: 2026,
})

const emit = defineEmits<{
  'update:minYear': [year: number]
  'update:maxYear': [year: number]
  commit: [payload: { minYear: number; maxYear: number }]
}>()

const sliderMin = ref(props.minYear)
const sliderMax = ref(props.maxYear)

// Min options: absMin → absMax ascending (oldest first)
const minOptions = computed(() => {
  const opts: number[] = []
  for (let y = props.absMin; y <= props.absMax; y++) opts.push(y)
  return opts
})

// Max options: absMax → absMin descending (current year first)
const maxOptions = computed(() => {
  const opts: number[] = []
  for (let y = props.absMax; y >= props.absMin; y--) opts.push(y)
  return opts
})

function emitCommit() {
  emit('commit', { minYear: sliderMin.value, maxYear: sliderMax.value })
}

// Slider → emit live + sync dropdowns
watch(sliderMin, (v) => { emit('update:minYear', v) })
watch(sliderMax, (v) => { emit('update:maxYear', v) })

// Parent resets → sync internals
watch(() => props.minYear, (v) => { sliderMin.value = v })
watch(() => props.maxYear, (v) => { sliderMax.value = v })

function onMinSelect(e: Event) {
  const v = Number((e.target as HTMLSelectElement).value)
  sliderMin.value = v
  if (sliderMin.value > sliderMax.value) {
    sliderMax.value = sliderMin.value
    emit('update:maxYear', sliderMax.value)
  }
  emitCommit()
}

function onMaxSelect(e: Event) {
  const v = Number((e.target as HTMLSelectElement).value)
  sliderMax.value = v
  if (sliderMax.value < sliderMin.value) {
    sliderMin.value = sliderMax.value
    emit('update:minYear', sliderMin.value)
  }
  emitCommit()
}
</script>

<template>
  <div class="srp-year">
    <!-- Min / Max selects -->
    <div class="srp-year__selects">
      <div class="srp-year__select-group">
        <label class="srp-year__label" for="srp-year-min">Min</label>
        <select
          id="srp-year-min"
          class="srp-year__select"
          :value="sliderMin"
          @change="onMinSelect"
        >
          <option v-for="y in minOptions" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>

      <div class="srp-year__select-group">
        <label class="srp-year__label" for="srp-year-max">Max</label>
        <select
          id="srp-year-max"
          class="srp-year__select"
          :value="sliderMax"
          @change="onMaxSelect"
        >
          <option v-for="y in maxOptions" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>

    <!-- Dual-thumb range slider -->
    <div @pointerup="emitCommit">
      <BaseSlider
        :range="true"
        :min="absMin"
        :max="absMax"
        :step="1"
        v-model:minValue="sliderMin"
        v-model:maxValue="sliderMax"
      />
    </div>
  </div>
</template>

<style scoped>
.srp-year {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);   /* 16px */
  padding: var(--spacing-xxxs);
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font-family-base);
}

/* ─── Select row ───────────────────────────────────────────── */
.srp-year__selects {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.srp-year__select-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.srp-year__label {
  font-size: var(--text-body-sm-size);          /* 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-40);
}

.srp-year__select {
  height: 40px;
  width: 100px;
  box-sizing: border-box;
  padding: 0 28px 0 8px;
  border: var(--border-width-hairline) solid var(--color-neutral-80);
  border-radius: var(--border-radius-md);       /* 8px */
  background: var(--color-neutral-100);
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: 1;
  color: var(--color-neutral-0);
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s ease;

  /* Chevron via inline SVG data-URI */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5' stroke='%23242C33' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  background-size: 24px 24px;
}

.srp-year__select:focus {
  border-color: var(--color-action-accent-hover);
}
</style>
