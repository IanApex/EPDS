<script setup lang="ts">
import SegmentedControl from '../SegmentedControl/SegmentedControl.vue'
import TextField from '../TextField/TextField.vue'
import SelectDropdown from '../SelectDropdown/SelectDropdown.vue'
import BaseButton from '../BaseButton/BaseButton.vue'
import LinkCta from '../LinkCta/LinkCta.vue'
import type { SelectOption } from '../SelectDropdown/SelectDropdown.vue'

import infoSvg from '../../../icon/Style=Alerts, Detail=Info, Icon=NA.svg?raw'
import { CAR_OFFER_DEFAULT_STATE_OPTIONS } from './carOfferDefaultStates'

const OFFER_TYPE = {
  vin: 'vin',
  license: 'license',
} as const

export type CarOfferType = (typeof OFFER_TYPE)[keyof typeof OFFER_TYPE]

const props = withDefaults(
  defineProps<{
    /** Active entry mode — bind with v-model:offerType */
    offerType?: CarOfferType
    /** VIN field — bind with v-model:vin */
    vin?: string
    /** License plate field — bind with v-model:licensePlate */
    licensePlate?: string
    /** Selected state code — bind with v-model:state */
    state?: string
    /** Options for the state `<select>` (license mode). */
    stateOptions?: SelectOption[]
    disabled?: boolean
  }>(),
  {
    offerType: 'vin',
    vin: '',
    licensePlate: '',
    state: '',
    stateOptions: () => CAR_OFFER_DEFAULT_STATE_OPTIONS,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:offerType': [value: CarOfferType]
  'update:vin': [value: string]
  'update:licensePlate': [value: string]
  'update:state': [value: string]
  submit: []
  'vin-help': []
}>()

const segmentedOptions = [
  { value: OFFER_TYPE.vin, label: 'VIN' },
  { value: OFFER_TYPE.license, label: 'License plate' },
]

function setOfferType(v: string) {
  if (v === OFFER_TYPE.vin || v === OFFER_TYPE.license) {
    emit('update:offerType', v)
  }
}

function onSubmit() {
  emit('submit')
}

function onVinHelp(e: MouseEvent) {
  e.preventDefault()
  emit('vin-help')
}
</script>

<template>
  <div class="car-offer-input-card">
    <div class="car-offer-input-card__segmented">
      <SegmentedControl
        name="car-offer-input-type"
        :model-value="offerType"
        :options="segmentedOptions"
        :disabled="disabled"
        @update:model-value="setOfferType"
      />
    </div>

    <template v-if="offerType === 'vin'">
      <div class="car-offer-input-card__block">
        <TextField
          class="car-offer-input-card__field"
          label="Enter a VIN"
          name="car-offer-vin"
          :model-value="vin"
          :disabled="disabled"
          autocomplete="off"
          @update:model-value="emit('update:vin', $event)"
        />
        <div class="car-offer-input-card__vin-help">
          <LinkCta
            label="Where is my VIN?"
            :arrow="false"
            theme="light"
            :disabled="disabled"
            @click="onVinHelp"
          />
          <button
            type="button"
            class="car-offer-input-card__info"
            aria-label="Where is my VIN?"
            :disabled="disabled"
            @click="onVinHelp"
          >
            <span class="car-offer-input-card__info-icon" aria-hidden="true" v-html="infoSvg" />
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="car-offer-input-card__block car-offer-input-card__block--plate">
        <TextField
          class="car-offer-input-card__field"
          label="Enter license plate"
          name="car-offer-plate"
          :model-value="licensePlate"
          :disabled="disabled"
          autocomplete="off"
          @update:model-value="emit('update:licensePlate', $event)"
        />
        <div class="car-offer-input-card__state">
          <SelectDropdown
            label="State"
            name="car-offer-state"
            :options="stateOptions"
            :model-value="state"
            :disabled="disabled"
            @update:model-value="emit('update:state', $event)"
          />
        </div>
      </div>
    </template>

    <BaseButton
      class="car-offer-input-card__cta"
      variant="primary"
      size="md"
      :disabled="disabled"
      @click="onSubmit"
    >
      Get an instant offer
    </BaseButton>
  </div>
</template>

<style scoped>
.car-offer-input-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xxs);
  width: 100%;
  max-width: 328px;
  padding: var(--spacing-xxs);
  box-sizing: border-box;
  background: var(--color-neutral-100);
  border: var(--border-width-hairline) solid var(--color-neutral-90);
  border-radius: var(--spacing-xxs);
  box-shadow: var(--shadow-level-2);
}

.car-offer-input-card__segmented {
  width: 220px;
  max-width: 100%;
}

.car-offer-input-card__block {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-nano);
  width: 100%;
}

/* Same vertical rhythm as TextField usage (48px between stacked fields / controls). */
.car-offer-input-card__block--plate {
  gap: var(--spacing-md);
}

.car-offer-input-card__field {
  width: 100%;
}

.car-offer-input-card__field :deep(.text-field) {
  width: 100%;
}

.car-offer-input-card__vin-help {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-nano);
}

.car-offer-input-card__info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-neutral-0);
  line-height: 0;
}

.car-offer-input-card__info:disabled {
  cursor: not-allowed;
  opacity: var(--opacity-level-medium);
}

.car-offer-input-card__info:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}

.car-offer-input-card__info-icon :deep(path) {
  fill: currentColor;
}

.car-offer-input-card__state {
  width: 100%;
  max-width: 151px;
}

.car-offer-input-card__state :deep(.select-dropdown) {
  width: 100%;
}

.car-offer-input-card__cta {
  width: 100%;
  max-width: 280px;
}
</style>
