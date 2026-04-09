import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseSlider from './BaseSlider.vue'

const meta: Meta<typeof BaseSlider> = {
  title: 'Atoms/Inputs/BaseSlider',
  component: BaseSlider,
  tags: ['autodocs'],
  argTypes: {
    modelValue:    { control: { type: 'number' } },
    min:           { control: { type: 'number' } },
    max:           { control: { type: 'number' } },
    step:          { control: { type: 'number' } },
    range:         { control: 'boolean' },
    minValue:      { control: { type: 'number' } },
    maxValue:      { control: { type: 'number' } },
    trackMinLabel: { control: 'text' },
    trackMaxLabel: { control: 'text' },
    disabled:      { control: 'boolean' },
  },
  decorators: [
    () => ({ template: '<div style="max-width:320px; padding:16px;"><story /></div>' }),
  ],
}
export default meta

type Story = StoryObj<typeof BaseSlider>

/* ─── Companion input CSS (shared across stories) ─────────── */
const inputStyle = `
  height:38px; border:1px solid var(--color-neutral-85);
  border-radius:8px; display:flex; align-items:center;
  padding:0 8px; box-sizing:border-box;
  font-family:var(--font-family-base);
  font-size:16px; color:var(--color-neutral-0);
  background:white; outline:none; width:100%;
  -moz-appearance:textfield;
`.replace(/\s+/g, ' ').trim()

/* ─── Single thumb (max only) ─────────────────────────────── */

export const SingleDefault: Story = {
  name: 'Single — Default',
  args: {
    modelValue:    0,
    min:           0,
    max:           200000,
    step:          1000,
    trackMinLabel: '0',
    trackMaxLabel: '200,000',
  },
}

export const SingleMidValue: Story = {
  name: 'Single — Mid Value',
  args: {
    modelValue:    80000,
    min:           0,
    max:           200000,
    step:          1000,
    trackMinLabel: '0',
    trackMaxLabel: '200,000',
  },
}

export const SingleAtMax: Story = {
  name: 'Single — At Max',
  args: {
    modelValue:    200000,
    min:           0,
    max:           200000,
    step:          1000,
    trackMinLabel: '0',
    trackMaxLabel: '200,000',
  },
}

export const SingleDisabled: Story = {
  name: 'Single — Disabled',
  args: {
    modelValue:    60000,
    min:           0,
    max:           200000,
    step:          1000,
    trackMinLabel: '0',
    trackMaxLabel: '200,000',
    disabled:      true,
  },
}

/* ─── Dual thumb (range / min-max) ───────────────────────── */

export const RangeDefault: Story = {
  name: 'Range — Default',
  args: {
    range:         true,
    minValue:      0,
    maxValue:      50000,
    min:           0,
    max:           50000,
    step:          500,
    trackMinLabel: '$0',
    trackMaxLabel: '$50,000',
  },
}

export const RangeMidValues: Story = {
  name: 'Range — Mid Values',
  args: {
    range:         true,
    minValue:      1000,
    maxValue:      40000,
    min:           0,
    max:           50000,
    step:          500,
    trackMinLabel: '$0',
    trackMaxLabel: '$50,000',
  },
}

export const RangeDisabled: Story = {
  name: 'Range — Disabled',
  args: {
    range:         true,
    minValue:      5000,
    maxValue:      30000,
    min:           0,
    max:           50000,
    step:          500,
    trackMinLabel: '$0',
    trackMaxLabel: '$50,000',
    disabled:      true,
  },
}

/* ─── Interactive — Mileage (single) ──────────────────────── */
export const InteractiveSingle: Story = {
  name: 'Interactive — Mileage (single)',
  render: () => ({
    components: { BaseSlider },
    setup() {
      const mileage     = ref(80000)
      const inputRef    = ref<HTMLInputElement | null>(null)

      /** Commit a raw string value to the slider, clamped within 0–200,000. */
      function commitMileage(raw: string) {
        const num = parseInt(raw.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(num)) {
          mileage.value = Math.max(0, Math.min(200000, num))
        }
        // Restore display to the clamped value
        if (inputRef.value) inputRef.value.value = mileage.value.toLocaleString()
      }

      function onBlur(e: FocusEvent) {
        commitMileage((e.target as HTMLInputElement).value)
      }
      function onKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
          commitMileage((e.target as HTMLInputElement).value);
          (e.target as HTMLInputElement).blur()
        }
      }

      return { mileage, inputRef, onBlur, onKeydown }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; font-family:var(--font-family-base); max-width:320px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
          <span style="font-size:16px; font-weight:700; color:var(--color-neutral-0); line-height:24px; white-space:nowrap;">Mileage</span>
          <input
            ref="inputRef"
            type="text"
            inputmode="numeric"
            :value="mileage.toLocaleString()"
            style="${inputStyle}; text-align:right; width:100px;"
            @blur="onBlur"
            @keydown="onKeydown"
            @focus="$event.target.select()"
            aria-label="Mileage value"
          />
        </div>
        <BaseSlider
          v-model="mileage"
          :min="0"
          :max="200000"
          :step="1000"
          track-min-label="0"
          track-max-label="200,000"
        />
      </div>
    `,
  }),
}

/* ─── Interactive — Price Range (dual) ───────────────────── */
export const InteractiveRange: Story = {
  name: 'Interactive — Price Range (dual)',
  render: () => ({
    components: { BaseSlider },
    setup() {
      const priceMin  = ref(1000)
      const priceMax  = ref(40000)
      const minRef    = ref<HTMLInputElement | null>(null)
      const maxRef    = ref<HTMLInputElement | null>(null)

      const ABS_MIN = 0
      const ABS_MAX = 50000
      const STEP    = 500

      function commitMin(raw: string) {
        const num = parseInt(raw.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(num)) {
          priceMin.value = Math.max(ABS_MIN, Math.min(num, priceMax.value - STEP))
        }
        if (minRef.value) minRef.value.value = '$' + priceMin.value.toLocaleString()
      }
      function commitMax(raw: string) {
        const num = parseInt(raw.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(num)) {
          priceMax.value = Math.min(ABS_MAX, Math.max(num, priceMin.value + STEP))
        }
        if (maxRef.value) maxRef.value.value = '$' + priceMax.value.toLocaleString()
      }

      function onMinBlur(e: FocusEvent) { commitMin((e.target as HTMLInputElement).value) }
      function onMaxBlur(e: FocusEvent) { commitMax((e.target as HTMLInputElement).value) }
      function onMinKey(e: KeyboardEvent) {
        if (e.key === 'Enter') { commitMin((e.target as HTMLInputElement).value);(e.target as HTMLInputElement).blur() }
      }
      function onMaxKey(e: KeyboardEvent) {
        if (e.key === 'Enter') { commitMax((e.target as HTMLInputElement).value);(e.target as HTMLInputElement).blur() }
      }

      return { priceMin, priceMax, minRef, maxRef, onMinBlur, onMaxBlur, onMinKey, onMaxKey }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; font-family:var(--font-family-base); max-width:320px;">
        <div style="display:flex; justify-content:space-between; gap:8px;">
          <div style="display:flex; flex-direction:column; gap:4px; flex:1;">
            <span style="font-size:14px; color:var(--color-neutral-40); line-height:22px;">Min</span>
            <input
              ref="minRef"
              type="text"
              inputmode="numeric"
              :value="'$' + priceMin.toLocaleString()"
              style="${inputStyle}"
              @blur="onMinBlur"
              @keydown="onMinKey"
              @focus="$event.target.select()"
              aria-label="Minimum price"
            />
          </div>
          <div style="display:flex; flex-direction:column; gap:4px; flex:1;">
            <span style="font-size:14px; color:var(--color-neutral-40); line-height:22px; text-align:right;">Max</span>
            <input
              ref="maxRef"
              type="text"
              inputmode="numeric"
              :value="'$' + priceMax.toLocaleString()"
              style="${inputStyle}; text-align:right;"
              @blur="onMaxBlur"
              @keydown="onMaxKey"
              @focus="$event.target.select()"
              aria-label="Maximum price"
            />
          </div>
        </div>
        <BaseSlider
          range
          v-model:min-value="priceMin"
          v-model:max-value="priceMax"
          :min="0"
          :max="50000"
          :step="500"
          track-min-label="$0"
          track-max-label="$50,000"
        />
      </div>
    `,
  }),
}

/* ─── Interactive — Monthly Payment (single) ─────────────── */
export const InteractiveMonthlyPayment: Story = {
  name: 'Interactive — Monthly Payment (single)',
  render: () => ({
    components: { BaseSlider },
    setup() {
      const payment  = ref(750)
      const inputRef = ref<HTMLInputElement | null>(null)

      function commit(raw: string) {
        const num = parseInt(raw.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(num)) payment.value = Math.max(0, Math.min(1500, num))
        if (inputRef.value) inputRef.value.value = '$' + payment.value.toLocaleString()
      }
      function onBlur(e: FocusEvent) { commit((e.target as HTMLInputElement).value) }
      function onKey(e: KeyboardEvent) {
        if (e.key === 'Enter') { commit((e.target as HTMLInputElement).value);(e.target as HTMLInputElement).blur() }
      }

      return { payment, inputRef, onBlur, onKey }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; font-family:var(--font-family-base); max-width:320px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
          <span style="font-size:16px; font-weight:700; color:var(--color-neutral-0); line-height:24px; white-space:nowrap;">Monthly payment</span>
          <input
            ref="inputRef"
            type="text"
            inputmode="numeric"
            :value="'$' + payment.toLocaleString()"
            style="${inputStyle}; text-align:right; width:100px;"
            @blur="onBlur"
            @keydown="onKey"
            @focus="$event.target.select()"
            aria-label="Monthly payment value"
          />
        </div>
        <BaseSlider
          v-model="payment"
          :min="0"
          :max="1500"
          :step="50"
          track-min-label="$0"
          track-max-label="$1,500"
        />
      </div>
    `,
  }),
}

/* ─── Interactive — Down Payment (single) ────────────────── */
export const InteractiveDownPayment: Story = {
  name: 'Interactive — Down Payment (single)',
  render: () => ({
    components: { BaseSlider },
    setup() {
      const dp       = ref(5000)
      const inputRef = ref<HTMLInputElement | null>(null)

      function commit(raw: string) {
        const num = parseInt(raw.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(num)) dp.value = Math.max(0, Math.min(24000, num))
        if (inputRef.value) inputRef.value.value = '$' + dp.value.toLocaleString()
      }
      function onBlur(e: FocusEvent) { commit((e.target as HTMLInputElement).value) }
      function onKey(e: KeyboardEvent) {
        if (e.key === 'Enter') { commit((e.target as HTMLInputElement).value);(e.target as HTMLInputElement).blur() }
      }

      return { dp, inputRef, onBlur, onKey }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; font-family:var(--font-family-base); max-width:320px;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
          <span style="font-size:16px; font-weight:700; color:var(--color-neutral-0); line-height:24px; white-space:nowrap;">Downpayment</span>
          <input
            ref="inputRef"
            type="text"
            inputmode="numeric"
            :value="'$' + dp.toLocaleString()"
            style="${inputStyle}; text-align:right; width:100px;"
            @blur="onBlur"
            @keydown="onKey"
            @focus="$event.target.select()"
            aria-label="Down payment value"
          />
        </div>
        <BaseSlider
          v-model="dp"
          :min="0"
          :max="24000"
          :step="500"
          track-min-label="0"
          track-max-label="$24,000"
        />
      </div>
    `,
  }),
}

/* ─── Both Types Overview ─────────────────────────────────── */
export const BothTypes: Story = {
  name: 'Both Types Overview',
  render: () => ({
    components: { BaseSlider },
    setup() {
      const mileage    = ref(100000)
      const priceMin   = ref(5000)
      const priceMax   = ref(35000)
      const milRef     = ref<HTMLInputElement | null>(null)
      const pMinRef    = ref<HTMLInputElement | null>(null)
      const pMaxRef    = ref<HTMLInputElement | null>(null)

      function commitMil(raw: string) {
        const n = parseInt(raw.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(n)) mileage.value = Math.max(0, Math.min(200000, n))
        if (milRef.value) milRef.value.value = mileage.value.toLocaleString()
      }
      function commitPMin(raw: string) {
        const n = parseInt(raw.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(n)) priceMin.value = Math.max(0, Math.min(n, priceMax.value - 500))
        if (pMinRef.value) pMinRef.value.value = '$' + priceMin.value.toLocaleString()
      }
      function commitPMax(raw: string) {
        const n = parseInt(raw.replace(/[^0-9]/g, ''), 10)
        if (!isNaN(n)) priceMax.value = Math.min(50000, Math.max(n, priceMin.value + 500))
        if (pMaxRef.value) pMaxRef.value.value = '$' + priceMax.value.toLocaleString()
      }

      const enterBlur = (commit: (v: string) => void) => (e: KeyboardEvent) => {
        if (e.key === 'Enter') { commit((e.target as HTMLInputElement).value);(e.target as HTMLInputElement).blur() }
      }

      return {
        mileage, priceMin, priceMax,
        milRef, pMinRef, pMaxRef,
        commitMil, commitPMin, commitPMax,
        onMilKey: enterBlur(commitMil),
        onPMinKey: enterBlur(commitPMin),
        onPMaxKey: enterBlur(commitPMax),
      }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:40px; font-family:var(--font-family-base); max-width:320px;">

        <!-- Single thumb -->
        <div>
          <p style="font-size:12px; color:var(--color-neutral-40); margin:0 0 12px;">Single thumb (max only)</p>
          <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:16px;">
            <span style="font-size:16px; font-weight:700; color:var(--color-neutral-0);">Mileage</span>
            <input
              ref="milRef"
              type="text"
              inputmode="numeric"
              :value="mileage.toLocaleString()"
              style="${inputStyle}; text-align:right; width:100px;"
              @blur="e => commitMil(e.target.value)"
              @keydown="onMilKey"
              @focus="$event.target.select()"
            />
          </div>
          <BaseSlider
            v-model="mileage"
            :min="0" :max="200000" :step="1000"
            track-min-label="0" track-max-label="200,000"
          />
        </div>

        <!-- Dual thumb -->
        <div>
          <p style="font-size:12px; color:var(--color-neutral-40); margin:0 0 12px;">Dual thumb (range / min-max)</p>
          <div style="display:flex; justify-content:space-between; gap:8px; margin-bottom:16px;">
            <div style="display:flex; flex-direction:column; gap:4px; flex:1;">
              <span style="font-size:14px; color:var(--color-neutral-40);">Min</span>
              <input
                ref="pMinRef"
                type="text"
                inputmode="numeric"
                :value="'$' + priceMin.toLocaleString()"
                style="${inputStyle}"
                @blur="e => commitPMin(e.target.value)"
                @keydown="onPMinKey"
                @focus="$event.target.select()"
              />
            </div>
            <div style="display:flex; flex-direction:column; gap:4px; flex:1;">
              <span style="font-size:14px; color:var(--color-neutral-40); text-align:right;">Max</span>
              <input
                ref="pMaxRef"
                type="text"
                inputmode="numeric"
                :value="'$' + priceMax.toLocaleString()"
                style="${inputStyle}; text-align:right;"
                @blur="e => commitPMax(e.target.value)"
                @keydown="onPMaxKey"
                @focus="$event.target.select()"
              />
            </div>
          </div>
          <BaseSlider
            range
            v-model:min-value="priceMin"
            v-model:max-value="priceMax"
            :min="0" :max="50000" :step="500"
            track-min-label="$0" track-max-label="$50,000"
          />
        </div>

      </div>
    `,
  }),
}
