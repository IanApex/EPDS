<script setup lang="ts">
import { computed } from 'vue'
import SrpFilterChild from '@/components/SrpFilterChild/SrpFilterChild.vue'

export interface ConditionOption {
  value: string
  label: string
  count: number
}

const props = withDefaults(defineProps<{
  /** Condition options (e.g. New, Pre-owned, Certified pre-owned) */
  options: ConditionOption[]
  /** Currently selected condition values */
  selected?: string[]
  /** Snapshot of selected values at panel open — used to float returning rows to top */
  committed?: string[]
}>(), {
  selected:  () => [],
  committed: () => [],
})

const emit = defineEmits<{
  'update:selected': [values: string[]]
}>()

/**
 * When the panel opens with prior selections, those items float to the top
 * (returning state). Everything else follows in its original order.
 * While the panel is open, newly toggled items stay in place (no reorder).
 */
const sortedOptions = computed(() => {
  if (props.committed.length === 0) {
    return { top: [] as ConditionOption[], bottom: props.options }
  }
  const top    = props.options.filter(o =>  props.committed.includes(o.value))
  const bottom = props.options.filter(o => !props.committed.includes(o.value))
  return { top, bottom }
})

function isSelected(value: string) {
  return props.selected.includes(value)
}

function isReturning(value: string) {
  return props.committed.includes(value) && props.selected.includes(value)
}

function toggle(value: string, on: boolean) {
  if (on) {
    emit('update:selected', [...props.selected, value])
  } else {
    emit('update:selected', props.selected.filter(v => v !== value))
  }
}
</script>

<template>
  <div class="srp-condition">
    <SrpFilterChild
      v-for="opt in sortedOptions.top"
      :key="opt.value"
      :label="opt.label"
      :count="opt.count"
      :selected="isSelected(opt.value)"
      :returning="isReturning(opt.value)"
      @update:selected="toggle(opt.value, $event)"
    />
    <SrpFilterChild
      v-for="opt in sortedOptions.bottom"
      :key="opt.value"
      :label="opt.label"
      :count="opt.count"
      :selected="isSelected(opt.value)"
      @update:selected="toggle(opt.value, $event)"
    />
  </div>
</template>

<style scoped>
.srp-condition {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
