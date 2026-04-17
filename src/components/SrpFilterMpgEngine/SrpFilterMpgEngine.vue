<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseSlider from '@/components/BaseSlider/BaseSlider.vue'
import SrpFilterChild from '@/components/SrpFilterChild/SrpFilterChild.vue'

export interface EngineTypeOption {
  value: string
  label: string
  count: number
}

const props = withDefaults(defineProps<{
  /** Lowest MPG in the current result set */
  absMin?: number
  /** Highest MPG in the current result set */
  absMax?: number
  /** Currently selected min MPG — bind with v-model:minMpg */
  minMpg?: number
  /** Currently selected max MPG — bind with v-model:maxMpg */
  maxMpg?: number
  /** Engine type options */
  engineTypes: EngineTypeOption[]
  /** Currently selected engine type values */
  selectedEngines?: string[]
  /** Snapshot of selected engines at panel open for returning state */
  committedEngines?: string[]
}>(), {
  absMin:           18,
  absMax:           100,
  minMpg:           18,
  maxMpg:           100,
  selectedEngines:  () => [],
  committedEngines: () => [],
})

const emit = defineEmits<{
  'update:minMpg':          [value: number]
  'update:maxMpg':          [value: number]
  'update:selectedEngines': [values: string[]]
}>()

// ─── MPG range ────────────────────────────────────────────────
const sliderMin = ref(props.minMpg)
const sliderMax = ref(props.maxMpg)

watch(sliderMin, (v) => { emit('update:minMpg', v) })
watch(sliderMax, (v) => { emit('update:maxMpg', v) })

watch(() => props.minMpg, (v) => { sliderMin.value = v })
watch(() => props.maxMpg, (v) => { sliderMax.value = v })

function onMinInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  if (!raw) return
  let v = Number(raw)
  if (v < props.absMin) v = props.absMin
  if (v > props.absMax) v = props.absMax
  sliderMin.value = v
  if (sliderMin.value > sliderMax.value) {
    sliderMax.value = sliderMin.value
    emit('update:maxMpg', sliderMax.value)
  }
}

function onMaxInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  if (!raw) return
  let v = Number(raw)
  if (v < props.absMin) v = props.absMin
  if (v > props.absMax) v = props.absMax
  sliderMax.value = v
  if (sliderMax.value < sliderMin.value) {
    sliderMin.value = sliderMax.value
    emit('update:minMpg', sliderMin.value)
  }
}

// ─── Engine types ────────────────────────────────────────────
const sortedEngineTypes = computed(() => {
  if (props.committedEngines.length === 0) return { top: [] as EngineTypeOption[], bottom: props.engineTypes }
  const top    = props.engineTypes.filter(o =>  props.committedEngines.includes(o.value))
  const bottom = props.engineTypes.filter(o => !props.committedEngines.includes(o.value))
  return { top, bottom }
})

function isEngineSelected(value: string) {
  return props.selectedEngines.includes(value)
}

function isEngineReturning(value: string) {
  return props.committedEngines.includes(value) && props.selectedEngines.includes(value)
}

function toggleEngine(value: string, on: boolean) {
  if (on) {
    emit('update:selectedEngines', [...props.selectedEngines, value])
  } else {
    emit('update:selectedEngines', props.selectedEngines.filter(v => v !== value))
  }
}
</script>

<template>
  <div class="srp-mpg-engine">
    <!-- ─── MPG (highway) section ──────────────────────── -->
    <div class="srp-mpg-engine__mpg">
      <p class="srp-mpg-engine__section-title">MPG (highway)</p>

      <div class="srp-mpg-engine__inputs">
        <div class="srp-mpg-engine__input-group">
          <label class="srp-mpg-engine__label" for="srp-mpg-min">Min</label>
          <input
            id="srp-mpg-min"
            class="srp-mpg-engine__input"
            type="text"
            inputmode="numeric"
            :value="sliderMin"
            @blur="onMinInput"
            @keydown.enter="($event.target as HTMLInputElement).blur()"
          />
        </div>

        <div class="srp-mpg-engine__input-group">
          <label class="srp-mpg-engine__label" for="srp-mpg-max">Max</label>
          <input
            id="srp-mpg-max"
            class="srp-mpg-engine__input"
            type="text"
            inputmode="numeric"
            :value="sliderMax"
            @blur="onMaxInput"
            @keydown.enter="($event.target as HTMLInputElement).blur()"
          />
        </div>
      </div>

      <BaseSlider
        :range="true"
        :min="absMin"
        :max="absMax"
        :step="1"
        v-model:minValue="sliderMin"
        v-model:maxValue="sliderMax"
      />
    </div>

    <!-- ─── Engine type section ────────────────────────── -->
    <div class="srp-mpg-engine__engine">
      <p class="srp-mpg-engine__section-title">Engine type</p>

      <!-- Returning selections float to top of this section -->
      <SrpFilterChild
        v-for="opt in sortedEngineTypes.top"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isEngineSelected(opt.value)"
        :returning="isEngineReturning(opt.value)"
        @update:selected="toggleEngine(opt.value, $event)"
      />

      <SrpFilterChild
        v-for="opt in sortedEngineTypes.bottom"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isEngineSelected(opt.value)"
        @update:selected="toggleEngine(opt.value, $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.srp-mpg-engine {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: var(--font-family-base);
}

/* ─── MPG section ──────────────────────────────────────────── */
.srp-mpg-engine__mpg {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);          /* 16px */
  padding: var(--spacing-xxxs);      /* 16px */
}

.srp-mpg-engine__section-title {
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  margin: 0;
}

/* ─── Min / Max inputs ─────────────────────────────────────── */
.srp-mpg-engine__inputs {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.srp-mpg-engine__input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.srp-mpg-engine__label {
  font-size: var(--text-body-sm-size);          /* 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-40);
}

.srp-mpg-engine__input {
  height: 40px;
  width: 100px;
  box-sizing: border-box;
  padding: 0 8px;
  border: var(--border-width-hairline) solid var(--color-neutral-80);
  border-radius: var(--border-radius-md);       /* 8px */
  background: var(--color-neutral-100);
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: 1;
  color: var(--color-neutral-0);
  outline: none;
  transition: border-color 0.15s ease;
}

.srp-mpg-engine__input:focus {
  border-color: var(--color-action-accent-hover);
}

/* ─── Engine type section ──────────────────────────────────── */
.srp-mpg-engine__engine {
  display: flex;
  flex-direction: column;
}

.srp-mpg-engine__engine > .srp-mpg-engine__section-title {
  padding: var(--spacing-xxxs) var(--spacing-xxs);   /* 16px 24px */
}
</style>
