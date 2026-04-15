<script setup lang="ts">
import { computed } from 'vue'
import SegmentedControl from '@/components/SegmentedControl/SegmentedControl.vue'
import SrpFilterChild from '@/components/SrpFilterChild/SrpFilterChild.vue'

export interface ColorOption {
  value: string
  label: string
  count: number
  /** CSS background for the swatch circle (gradient or solid) */
  swatch: string
}

const props = withDefaults(defineProps<{
  /** Exterior color options */
  exteriorColors: ColorOption[]
  /** Interior color options */
  interiorColors: ColorOption[]
  /** 'exterior' or 'interior' — bind with v-model:mode */
  mode?: 'exterior' | 'interior'
  /** Selected exterior color values */
  selectedExterior?: string[]
  /** Selected interior color values */
  selectedInterior?: string[]
  /** Committed exterior snapshot for returning state */
  committedExterior?: string[]
  /** Committed interior snapshot for returning state */
  committedInterior?: string[]
}>(), {
  mode:               'exterior',
  selectedExterior:   () => [],
  selectedInterior:   () => [],
  committedExterior:  () => [],
  committedInterior:  () => [],
})

const emit = defineEmits<{
  'update:mode':             [value: 'exterior' | 'interior']
  'update:selectedExterior': [values: string[]]
  'update:selectedInterior': [values: string[]]
}>()

const modeOptions = [
  { value: 'exterior', label: 'Exterior' },
  { value: 'interior', label: 'Interior' },
]

const activeColors = computed(() =>
  props.mode === 'exterior' ? props.exteriorColors : props.interiorColors,
)

const activeSelected = computed(() =>
  props.mode === 'exterior' ? props.selectedExterior : props.selectedInterior,
)

const activeCommitted = computed(() =>
  props.mode === 'exterior' ? props.committedExterior : props.committedInterior,
)

const sorted = computed(() => {
  const committed = activeCommitted.value
  if (committed.length === 0) return { top: [] as ColorOption[], bottom: activeColors.value }
  const top    = activeColors.value.filter(o =>  committed.includes(o.value))
  const bottom = activeColors.value.filter(o => !committed.includes(o.value))
  return { top, bottom }
})

function isSelected(value: string) {
  return activeSelected.value.includes(value)
}

function isReturning(value: string) {
  return activeCommitted.value.includes(value) && activeSelected.value.includes(value)
}

function toggle(value: string, on: boolean) {
  const current = activeSelected.value
  const next = on ? [...current, value] : current.filter(v => v !== value)
  if (props.mode === 'exterior') {
    emit('update:selectedExterior', next)
  } else {
    emit('update:selectedInterior', next)
  }
}
</script>

<template>
  <div class="srp-color">
    <!-- Segmented Control -->
    <div class="srp-color__header">
      <SegmentedControl
        name="color-mode"
        :options="modeOptions"
        :modelValue="mode"
        @update:modelValue="emit('update:mode', $event as 'exterior' | 'interior')"
      />
    </div>

    <!-- Returning selections float to top -->
    <SrpFilterChild
      v-for="opt in sorted.top"
      :key="opt.value"
      :label="opt.label"
      :count="opt.count"
      :selected="isSelected(opt.value)"
      :returning="isReturning(opt.value)"
      @update:selected="toggle(opt.value, $event)"
    >
      <template #trailing-icon>
        <span
          class="srp-color__swatch"
          :style="{ background: opt.swatch }"
          aria-hidden="true"
        />
      </template>
    </SrpFilterChild>

    <!-- Remaining colors -->
    <SrpFilterChild
      v-for="opt in sorted.bottom"
      :key="opt.value"
      :label="opt.label"
      :count="opt.count"
      :selected="isSelected(opt.value)"
      @update:selected="toggle(opt.value, $event)"
    >
      <template #trailing-icon>
        <span
          class="srp-color__swatch"
          :style="{ background: opt.swatch }"
          aria-hidden="true"
        />
      </template>
    </SrpFilterChild>
  </div>
</template>

<style scoped>
.srp-color {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.srp-color__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xxs);            /* 24px */
  padding: var(--spacing-xxxs) var(--spacing-xxs);  /* 16px 24px */
}

.srp-color__swatch {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
