<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * Maximum mileage ceiling derived from the result set, rounded up to the
   * nearest 10k. E.g. if the highest-mileage car is 212k → pass 220000.
   */
  absMax?: number
  /** Currently selected max mileage — bind with v-model */
  modelValue?: number
}>(), {
  absMax:     150_000,
  modelValue: 150_000,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const STEP = 10_000

const options = computed(() => {
  const opts: { value: number; label: string }[] = []
  for (let m = STEP; m <= props.absMax; m += STEP) {
    opts.push({
      value: m,
      label: `${m.toLocaleString('en-US')} or less`,
    })
  }
  return opts
})

function onChange(e: Event) {
  emit('update:modelValue', Number((e.target as HTMLSelectElement).value))
}
</script>

<template>
  <div class="srp-mileage">
    <select
      class="srp-mileage__select"
      :value="modelValue"
      aria-label="Maximum mileage"
      @change="onChange"
    >
      <option
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
      >
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.srp-mileage {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);   /* 16px */
  padding: var(--spacing-xxxs);
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font-family-base);
}

.srp-mileage__select {
  height: 40px;
  box-sizing: border-box;
  padding: 0 32px 0 8px;
  border: var(--border-width-hairline) solid var(--color-neutral-80);
  border-radius: var(--border-radius-md);
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
  width: fit-content;

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath d='M7 10l5 5 5-5' stroke='%23242C33' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  background-size: 24px 24px;
}

.srp-mileage__select:focus {
  border-color: var(--color-accent-30);
}
</style>
