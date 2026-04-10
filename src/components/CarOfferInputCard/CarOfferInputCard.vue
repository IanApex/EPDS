<script setup lang="ts">
import { ref } from 'vue'
import SegmentedControl from '../SegmentedControl/SegmentedControl.vue'
import TextField from '../TextField/TextField.vue'
import SelectDropdown from '../SelectDropdown/SelectDropdown.vue'
import BaseButton from '../BaseButton/BaseButton.vue'
import type { SelectOption } from '../SelectDropdown/SelectDropdown.vue'

import TooltipComp from '../Tooltip/Tooltip.vue'
import infoSvg from '../../../icon/Style=Alerts, Detail=Info, Icon=NA.svg?raw'
import { CAR_OFFER_DEFAULT_STATE_OPTIONS } from './carOfferDefaultStates'

const OFFER_TYPE = {
  vin: 'vin',
  license: 'license',
} as const

export type CarOfferType = (typeof OFFER_TYPE)[keyof typeof OFFER_TYPE]

const ERR_VIN = 'Enter a valid 17-character VIN.'
const ERR_PLATE = 'Enter a valid license plate.'
const ERR_STATE_REQUIRED = 'This field is required.'

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
}>()

const segmentedOptions = [
  { value: OFFER_TYPE.vin, label: 'VIN' },
  { value: OFFER_TYPE.license, label: 'License plate' },
]

const showVinError = ref(false)
const showPlateError = ref(false)
const showStateError = ref(false)

function isValidVin(v: string) {
  return v.trim().length === 17
}

function isValidPlate(v: string) {
  return v.trim().length > 0
}

function isValidState(v: string) {
  return v.trim().length > 0
}

function clearErrors() {
  showVinError.value = false
  showPlateError.value = false
  showStateError.value = false
}

function setOfferType(v: string) {
  if (v === OFFER_TYPE.vin || v === OFFER_TYPE.license) {
    clearErrors()
    emit('update:offerType', v)
  }
}

function onVinUpdate(value: string) {
  emit('update:vin', value)
  if (isValidVin(value)) showVinError.value = false
}

function onVinBlur() {
  if (props.disabled) return
  showVinError.value = !isValidVin(props.vin)
}

function onPlateUpdate(value: string) {
  emit('update:licensePlate', value)
  if (isValidPlate(value)) showPlateError.value = false
}

function onPlateBlur() {
  if (props.disabled) return
  showPlateError.value = !isValidPlate(props.licensePlate)
}

function onStateUpdate(value: string) {
  emit('update:state', value)
  if (isValidState(value)) showStateError.value = false
}

function onStateBlur() {
  if (props.disabled) return
  showStateError.value = !isValidState(props.state)
}

function onSubmit() {
  if (props.disabled) return
  if (props.offerType === OFFER_TYPE.vin) {
    if (!isValidVin(props.vin)) {
      showVinError.value = true
      return
    }
    showVinError.value = false
    emit('submit')
    return
  }

  let ok = true
  if (!isValidPlate(props.licensePlate)) {
    showPlateError.value = true
    ok = false
  } else {
    showPlateError.value = false
  }
  if (!isValidState(props.state)) {
    showStateError.value = true
    ok = false
  } else {
    showStateError.value = false
  }
  if (!ok) return
  emit('submit')
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
          :error="showVinError ? ERR_VIN : undefined"
          :maxlength="17"
          autocomplete="off"
          @update:model-value="onVinUpdate"
          @blur="onVinBlur"
        />
        <div class="car-offer-input-card__vin-help">
          <p class="car-offer-input-card__vin-hint">Where is my VIN?</p>
          <TooltipComp
            text="A VIN is a 17 character long number that you can find inside your door or on the windshield of your car."
            ariaLabel="Where is my VIN?"
            caretAlign="left"
            :closeOnClickOutside="true"
            :closeOnEscape="true"
          >
            <template #icon>
              <span v-html="infoSvg" style="display:contents" />
            </template>
          </TooltipComp>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="car-offer-input-card__block">
        <TextField
          class="car-offer-input-card__field"
          label="Enter license plate"
          name="car-offer-plate"
          :model-value="licensePlate"
          :disabled="disabled"
          :error="showPlateError ? ERR_PLATE : undefined"
          autocomplete="off"
          @update:model-value="onPlateUpdate"
          @blur="onPlateBlur"
        />
        <div class="car-offer-input-card__state">
          <SelectDropdown
            label="State"
            name="car-offer-state"
            :options="stateOptions"
            :model-value="state"
            :disabled="disabled"
            :error="showStateError ? ERR_STATE_REQUIRED : undefined"
            @update:model-value="onStateUpdate"
            @blur="onStateBlur"
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
  /* Match TextField usage: 48px between segmented control, form block, and CTA. */
  gap: var(--spacing-md);
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
  /* 48px after the primary TextField to the next row (dropdown, links, helper text, etc.). */
  gap: var(--spacing-md);
  width: 100%;
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

.car-offer-input-card__vin-hint {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--text-body-sm-weight);
  line-height: var(--text-body-sm-line-height);
  letter-spacing: var(--text-body-sm-letter-spacing);
  color: var(--color-neutral-40);
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
