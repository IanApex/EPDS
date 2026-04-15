<script setup lang="ts">
import { computed } from 'vue'
import SrpFilterChild from '@/components/SrpFilterChild/SrpFilterChild.vue'

export interface DriveTransOption {
  value: string
  label: string
  count: number
}

const props = withDefaults(defineProps<{
  /** Drive type options (inventory order) */
  driveTypes: DriveTransOption[]
  /** Transmission options (inventory order) */
  transmissions: DriveTransOption[]
  /** Currently selected drive type values */
  selectedDriveTypes?: string[]
  /** Currently selected transmission values */
  selectedTransmissions?: string[]
  /** Snapshot of selected drive types at panel open */
  committedDriveTypes?: string[]
  /** Snapshot of selected transmissions at panel open */
  committedTransmissions?: string[]
}>(), {
  selectedDriveTypes:     () => [],
  selectedTransmissions:  () => [],
  committedDriveTypes:    () => [],
  committedTransmissions: () => [],
})

const emit = defineEmits<{
  'update:selectedDriveTypes':    [values: string[]]
  'update:selectedTransmissions': [values: string[]]
}>()

// ─── Drive type sorting ──────────────────────────────────────
const sortedDriveTypes = computed(() => {
  if (props.committedDriveTypes.length === 0) return { top: [] as DriveTransOption[], bottom: props.driveTypes }
  const top    = props.driveTypes.filter(o =>  props.committedDriveTypes.includes(o.value))
  const bottom = props.driveTypes.filter(o => !props.committedDriveTypes.includes(o.value))
  return { top, bottom }
})

// ─── Transmission sorting ────────────────────────────────────
const sortedTransmissions = computed(() => {
  if (props.committedTransmissions.length === 0) return { top: [] as DriveTransOption[], bottom: props.transmissions }
  const top    = props.transmissions.filter(o =>  props.committedTransmissions.includes(o.value))
  const bottom = props.transmissions.filter(o => !props.committedTransmissions.includes(o.value))
  return { top, bottom }
})

function isDriveSelected(value: string)    { return props.selectedDriveTypes.includes(value) }
function isDriveReturning(value: string)   { return props.committedDriveTypes.includes(value) && props.selectedDriveTypes.includes(value) }
function isTransSelected(value: string)    { return props.selectedTransmissions.includes(value) }
function isTransReturning(value: string)   { return props.committedTransmissions.includes(value) && props.selectedTransmissions.includes(value) }

function toggleDrive(value: string, on: boolean) {
  if (on) {
    emit('update:selectedDriveTypes', [...props.selectedDriveTypes, value])
  } else {
    emit('update:selectedDriveTypes', props.selectedDriveTypes.filter(v => v !== value))
  }
}

function toggleTrans(value: string, on: boolean) {
  if (on) {
    emit('update:selectedTransmissions', [...props.selectedTransmissions, value])
  } else {
    emit('update:selectedTransmissions', props.selectedTransmissions.filter(v => v !== value))
  }
}
</script>

<template>
  <div class="srp-drive-trans">

    <!-- Drive type section -->
    <div class="srp-drive-trans__section">
      <p class="srp-drive-trans__section-title">Drive type</p>

      <SrpFilterChild
        v-for="opt in sortedDriveTypes.top"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isDriveSelected(opt.value)"
        :returning="isDriveReturning(opt.value)"
        @update:selected="toggleDrive(opt.value, $event)"
      />
      <SrpFilterChild
        v-for="opt in sortedDriveTypes.bottom"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isDriveSelected(opt.value)"
        @update:selected="toggleDrive(opt.value, $event)"
      />
    </div>

    <!-- Transmission section -->
    <div class="srp-drive-trans__section">
      <p class="srp-drive-trans__section-title">Transmission</p>

      <SrpFilterChild
        v-for="opt in sortedTransmissions.top"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isTransSelected(opt.value)"
        :returning="isTransReturning(opt.value)"
        @update:selected="toggleTrans(opt.value, $event)"
      />
      <SrpFilterChild
        v-for="opt in sortedTransmissions.bottom"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isTransSelected(opt.value)"
        @update:selected="toggleTrans(opt.value, $event)"
      />
    </div>

  </div>
</template>

<style scoped>
.srp-drive-trans {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.srp-drive-trans__section {
  display: flex;
  flex-direction: column;
}

.srp-drive-trans__section-title {
  padding: var(--spacing-xxxs) var(--spacing-xxs);   /* 16px 24px */
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}
</style>
