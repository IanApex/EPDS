import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SelectDropdown from './SelectDropdown.vue'

const months: Array<{ value: string; label: string }> = [
  { value: 'jan', label: 'January' },
  { value: 'feb', label: 'February' },
  { value: 'mar', label: 'March' },
  { value: 'apr', label: 'April' },
  { value: 'may', label: 'May' },
  { value: 'jun', label: 'June' },
  { value: 'jul', label: 'July' },
  { value: 'aug', label: 'August' },
  { value: 'sep', label: 'September' },
  { value: 'oct', label: 'October' },
  { value: 'nov', label: 'November' },
  { value: 'dec', label: 'December' },
]

const states: Array<{ value: string; label: string }> = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
]

const employment: Array<{ value: string; label: string }> = [
  { value: 'full',    label: 'Fully employed' },
  { value: 'part',    label: 'Part-time' },
  { value: 'self',    label: 'Self-employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'student', label: 'Student' },
  { value: 'other',   label: 'Other' },
]

const meta: Meta<typeof SelectDropdown> = {
  title: 'Atoms/Inputs/SelectDropdown',
  component: SelectDropdown,
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
  argTypes: {
    theme:    { control: 'radio',   options: ['light', 'dark'] },
    disabled: { control: 'boolean' },
    error:    { control: 'text' },
    label:    { control: 'text' },
    modelValue: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof SelectDropdown>

// ─── Light mode ─────────────────────────────────────────

/** Empty / no selection — label acts as placeholder. */
export const LightDefault: Story = {
  args: {
    label:    'Select a month',
    options:  months,
    theme:    'light',
  },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding: 32px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

/** A value has been selected — label floats above. */
export const LightFilled: Story = {
  args: {
    label:      'Select a month',
    options:    months,
    modelValue: 'jul',
    theme:      'light',
  },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding: 32px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

/** Error state — inline error message below the underline. */
export const LightError: Story = {
  args: {
    label:   'Select a month',
    options: months,
    theme:   'light',
    error:   'Please select a month',
  },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<div style="padding: 32px; padding-bottom: 56px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

/** Filled + error — floating label + error visible together. */
export const LightFilledError: Story = {
  args: {
    label:      'Select a month',
    options:    months,
    modelValue: 'mar',
    theme:      'light',
    error:      'This selection is no longer valid',
  },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding: 32px; padding-bottom: 56px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

/** Disabled with a pre-filled value. */
export const LightDisabledFilled: Story = {
  args: {
    label:      'Select a month',
    options:    months,
    modelValue: 'jul',
    theme:      'light',
    disabled:   true,
  },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding: 32px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

// ─── Dark mode ─────────────────────────────────────────

/** Dark default — empty. */
export const DarkDefault: Story = {
  args: {
    label:   'Select a month',
    options: months,
    theme:   'dark',
  },
  parameters: { backgrounds: { default: 'dark' } },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<div style="padding: 32px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

/** Dark filled — label floats, value shown in white. */
export const DarkFilled: Story = {
  args: {
    label:      'Select a month',
    options:    months,
    modelValue: 'jul',
    theme:      'dark',
  },
  parameters: { backgrounds: { default: 'dark' } },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding: 32px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

/** Dark error state. */
export const DarkError: Story = {
  args: {
    label:   'Select a month',
    options: months,
    theme:   'dark',
    error:   'Error message',
  },
  parameters: { backgrounds: { default: 'dark' } },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<div style="padding: 32px; padding-bottom: 56px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

/** Dark disabled with pre-filled value — underline hidden per Figma. */
export const DarkDisabledFilled: Story = {
  args: {
    label:      'Select a month',
    options:    months,
    modelValue: 'jul',
    theme:      'dark',
    disabled:   true,
  },
  parameters: { backgrounds: { default: 'dark' } },
  render: (args) => ({
    components: { SelectDropdown },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding: 32px; width: 328px;">
      <SelectDropdown v-bind="args" v-model="value" />
    </div>`,
  }),
}

// ─── All states (light) ─────────────────────────────────

export const AllStatesLight: Story = {
  parameters: { backgrounds: { default: 'light' } },
  render: () => ({
    components: { SelectDropdown },
    setup() {
      const empty    = ref('')
      const filled   = ref('jul')
      const disabled = ref('jul')
      return { empty, filled, disabled, months }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 40px; width: 328px;">
        <div>
          <p style="font-size:12px;color:#666;margin-bottom:24px;font-family:Roboto,sans-serif;">Default (empty)</p>
          <SelectDropdown v-model="empty" label="Select a month" :options="months" theme="light" />
        </div>
        <div>
          <p style="font-size:12px;color:#666;margin-bottom:24px;font-family:Roboto,sans-serif;">Filled</p>
          <SelectDropdown v-model="filled" label="Select a month" :options="months" theme="light" />
        </div>
        <div style="padding-bottom: 24px;">
          <p style="font-size:12px;color:#666;margin-bottom:24px;font-family:Roboto,sans-serif;">Error (empty)</p>
          <SelectDropdown v-model="empty" label="Select a month" :options="months" theme="light" error="Please select a month" />
        </div>
        <div>
          <p style="font-size:12px;color:#666;margin-bottom:24px;font-family:Roboto,sans-serif;">Disabled filled</p>
          <SelectDropdown v-model="disabled" label="Select a month" :options="months" theme="light" :disabled="true" />
        </div>
      </div>
    `,
  }),
}

// ─── All states (dark) ──────────────────────────────────

export const AllStatesDark: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => ({
    components: { SelectDropdown },
    setup() {
      const empty    = ref('')
      const filled   = ref('jul')
      const disabled = ref('jul')
      return { empty, filled, disabled, months }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 40px; width: 328px;">
        <div>
          <p style="font-size:12px;color:#d4d7d9;margin-bottom:24px;font-family:Roboto,sans-serif;">Default (empty)</p>
          <SelectDropdown v-model="empty" label="Select a month" :options="months" theme="dark" />
        </div>
        <div>
          <p style="font-size:12px;color:#d4d7d9;margin-bottom:24px;font-family:Roboto,sans-serif;">Filled</p>
          <SelectDropdown v-model="filled" label="Select a month" :options="months" theme="dark" />
        </div>
        <div style="padding-bottom: 24px;">
          <p style="font-size:12px;color:#d4d7d9;margin-bottom:24px;font-family:Roboto,sans-serif;">Error (empty)</p>
          <SelectDropdown v-model="empty" label="Select a month" :options="months" theme="dark" error="Error message" />
        </div>
        <div>
          <p style="font-size:12px;color:#d4d7d9;margin-bottom:24px;font-family:Roboto,sans-serif;">Disabled filled</p>
          <SelectDropdown v-model="disabled" label="Select a month" :options="months" theme="dark" :disabled="true" />
        </div>
      </div>
    `,
  }),
}

// ─── Realistic usage examples ───────────────────────────

/** The width adapts to content — shown at different practical widths. */
export const WidthVariants: Story = {
  parameters: { backgrounds: { default: 'light' } },
  render: () => ({
    components: { SelectDropdown },
    setup() {
      const state      = ref('AK')
      const employment = ref('full')
      return {
        state,
        employment,
        states,
        employmentOpts: [
          { value: 'full',    label: 'Fully employed' },
          { value: 'part',    label: 'Part-time' },
          { value: 'self',    label: 'Self-employed' },
          { value: 'retired', label: 'Retired' },
        ],
      }
    },
    template: `
      <div style="display: flex; align-items: flex-end; gap: 40px; padding: 40px;">
        <SelectDropdown
          v-model="state"
          label="Enter a state"
          :options="states"
          theme="light"
          style="width: 96px;"
        />
        <SelectDropdown
          v-model="employment"
          label="Employment status"
          :options="employmentOpts"
          theme="light"
          style="width: 225px;"
        />
      </div>
    `,
  }),
}

/** Interactive demo — try selecting values. */
export const Interactive: Story = {
  render: () => ({
    components: { SelectDropdown },
    setup() {
      const month  = ref('')
      const stateV = ref('')
      const hasError = ref(false)
      return { month, stateV, hasError, months, states }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px; padding: 40px; max-width: 400px;">
        <SelectDropdown
          v-model="month"
          label="Select a month"
          :options="months"
          theme="light"
          style="width: 100%;"
        />
        <SelectDropdown
          v-model="stateV"
          label="Enter a state"
          :options="states"
          theme="light"
          style="width: 100%;"
          :error="!stateV && hasError ? 'Please select a state' : ''"
        />
        <button
          style="align-self:flex-start;padding:8px 16px;cursor:pointer;"
          @click="hasError = true"
        >Validate</button>
        <p style="font-size:12px;color:#666;font-family:Roboto,sans-serif;">
          Month: {{ month || '—' }} &nbsp;|&nbsp; State: {{ stateV || '—' }}
        </p>
      </div>
    `,
  }),
}
