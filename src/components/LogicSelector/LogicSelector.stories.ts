import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, computed } from 'vue'
import LogicSelector from './LogicSelector.vue'
import SelectDropdown from '../SelectDropdown/SelectDropdown.vue'

const employmentOptions = [
  { value: 'employed',   label: 'Employed'   },
  { value: 'military',   label: 'Military'   },
  { value: 'retired',    label: 'Retired'    },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'other',      label: 'Other'      },
]

const tradeOptions = [
  { value: 'yes', label: 'Yes, I have a trade-in' },
  { value: 'no',  label: 'No trade-in'            },
]

const paymentOptions = [
  { value: 'cash',    label: 'Cash'    },
  { value: 'finance', label: 'Finance' },
]

const meta: Meta<typeof LogicSelector> = {
  title: 'Components/Inputs/LogicSelector',
  component: LogicSelector,
  parameters: {
    backgrounds: { default: 'light' },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    error:    { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof LogicSelector>

// ─── Individual states ──────────────────────────────────

/** No selection — user must choose (Figma: no default on load). */
export const Default: Story = {
  args: { name: 'status-default', options: employmentOptions },
  render: (args) => ({
    components: { LogicSelector },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<div style="padding:40px;"><LogicSelector v-bind="args" v-model="value" /></div>`,
  }),
}

/** One chip selected — dark fill, white text. */
export const WithSelection: Story = {
  args: { name: 'status-selected', options: employmentOptions, modelValue: 'employed' },
  render: (args) => ({
    components: { LogicSelector },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding:40px;"><LogicSelector v-bind="args" v-model="value" /></div>`,
  }),
}

/** Hover state on one chip (use storybook-addon-pseudo-states). */
export const HoverState: Story = {
  name: 'Hover (on unselected chip)',
  args: { name: 'status-hover', options: employmentOptions },
  parameters: { pseudo: { hover: '.logic-selector__chip:nth-child(2)' } },
  render: (args) => ({
    components: { LogicSelector },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<div style="padding:40px;"><LogicSelector v-bind="args" v-model="value" /></div>`,
  }),
}

/** Focus ring on a chip. */
export const FocusState: Story = {
  name: 'Focus',
  args: { name: 'status-focus', options: employmentOptions, modelValue: 'employed' },
  parameters: { pseudo: { focusVisible: '.logic-selector__chip:first-child' } },
  render: (args) => ({
    components: { LogicSelector },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding:40px;"><LogicSelector v-bind="args" v-model="value" /></div>`,
  }),
}

/** Validation error — shown when user hasn't chosen. */
export const ErrorState: Story = {
  args: {
    name:    'status-error',
    options: employmentOptions,
    error:   'Select an employment status',
  },
  render: (args) => ({
    components: { LogicSelector },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `<div style="padding:40px;padding-bottom:64px;"><LogicSelector v-bind="args" v-model="value" /></div>`,
  }),
}

/** Disabled group. */
export const Disabled: Story = {
  args: {
    name:       'status-disabled',
    options:    employmentOptions,
    modelValue: 'retired',
    disabled:   true,
  },
  render: (args) => ({
    components: { LogicSelector },
    setup() {
      const value = ref(args.modelValue ?? '')
      return { args, value }
    },
    template: `<div style="padding:40px;"><LogicSelector v-bind="args" v-model="value" /></div>`,
  }),
}

// ─── All states panel ───────────────────────────────────

export const AllStates: Story = {
  render: () => ({
    components: { LogicSelector },
    setup() {
      const none     = ref('')
      const selected = ref('employed')
      const disabled = ref('retired')
      return { none, selected, disabled, employmentOptions }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:40px;padding:40px;">
        <div>
          <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0 0 12px;">No selection</p>
          <LogicSelector v-model="none" name="all-none" :options="employmentOptions" />
        </div>
        <div>
          <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0 0 12px;">Selection active</p>
          <LogicSelector v-model="selected" name="all-sel" :options="employmentOptions" />
        </div>
        <div style="padding-bottom:24px;">
          <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0 0 12px;">Error (no selection)</p>
          <LogicSelector v-model="none" name="all-err" :options="employmentOptions" error="Select an employment status" />
        </div>
        <div>
          <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0 0 12px;">Disabled</p>
          <LogicSelector v-model="disabled" name="all-dis" :options="employmentOptions" :disabled="true" />
        </div>
      </div>`,
  }),
}

// ─── Core usage: form logic demo ────────────────────────

/**
 * Demonstrates the key use case: selecting an option dynamically
 * shows/hides dependent form fields below.
 *
 * Employed → employer name, phone, title, start date, pay type
 * Other options → a single free-text "Other" field
 * Unemployed → no extra fields
 */
export const DrivesFormFields: Story = {
  name: 'Drives form fields (employment)',
  render: () => ({
    components: { LogicSelector, SelectDropdown },
    setup() {
      const status = ref('')
      const showEmployerFields = computed(() =>
        ['employed', 'military'].includes(status.value)
      )
      const showOtherField = computed(() => status.value === 'other')

      const months = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December']
        .map((l, i) => ({ value: String(i + 1), label: l }))

      return { status, showEmployerFields, showOtherField, employmentOptions, months }
    },
    template: `
      <div style="max-width:400px;padding:40px;display:flex;flex-direction:column;gap:24px;">
        <div>
          <p style="font:400 16px/1.5 Roboto,sans-serif;color:#242C33;margin:0 0 8px;">
            What is your employment status?
          </p>
          <LogicSelector
            v-model="status"
            name="employment-demo"
            :options="employmentOptions"
            :error="!status ? 'Select an employment status' : ''"
          />
        </div>

        <!-- Fields shown only for Employed / Military -->
        <template v-if="showEmployerFields">
          <div style="border-top:1px solid #E8E9EB;padding-top:20px;display:flex;flex-direction:column;gap:16px;">
            <div>
              <label style="display:block;font:400 12px/1.4 Roboto,sans-serif;color:#666B70;margin-bottom:4px;">
                Employer name
              </label>
              <input
                style="width:100%;border:none;border-bottom:2px solid #BCBFC2;padding:4px 0;font:400 16px/24px Roboto,sans-serif;outline:none;background:transparent;"
                placeholder="Employer name"
              />
            </div>
            <div>
              <label style="display:block;font:400 12px/1.4 Roboto,sans-serif;color:#666B70;margin-bottom:4px;">
                Job title
              </label>
              <input
                style="width:100%;border:none;border-bottom:2px solid #BCBFC2;padding:4px 0;font:400 16px/24px Roboto,sans-serif;outline:none;background:transparent;"
                placeholder="Job title"
              />
            </div>
            <div style="display:flex;gap:16px;">
              <SelectDropdown
                label="Start month"
                name="start-month"
                :options="months"
                theme="light"
                style="flex:1;"
              />
              <SelectDropdown
                label="Start year"
                name="start-year"
                :options="[{value:'2024',label:'2024'},{value:'2023',label:'2023'},{value:'2022',label:'2022'},{value:'2021',label:'2021'}]"
                theme="light"
                style="flex:1;"
              />
            </div>
            <div>
              <p style="font:400 14px/22px Roboto,sans-serif;color:#242C33;margin:0 0 8px;">
                How is your pay set?
              </p>
              <LogicSelector
                v-model="status"
                name="pay-type"
                :options="[{value:'hourly',label:'Hourly'},{value:'salary',label:'Salary'}]"
              />
            </div>
          </div>
        </template>

        <!-- Field shown only for Other -->
        <template v-if="showOtherField">
          <div style="border-top:1px solid #E8E9EB;padding-top:20px;">
            <label style="display:block;font:400 12px/1.4 Roboto,sans-serif;color:#666B70;margin-bottom:4px;">
              Please describe your employment
            </label>
            <input
              style="width:100%;border:none;border-bottom:2px solid #BCBFC2;padding:4px 0;font:400 16px/24px Roboto,sans-serif;outline:none;background:transparent;"
              placeholder="Describe your situation"
            />
          </div>
        </template>

        <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0;">
          Status: <strong>{{ status || '—' }}</strong>
        </p>
      </div>`,
  }),
}

// ─── Other selector examples ────────────────────────────

export const TradeIn: Story = {
  name: 'Trade-in (Yes / No)',
  render: () => ({
    components: { LogicSelector },
    setup() {
      const value = ref('')
      return { value, tradeOptions }
    },
    template: `
      <div style="padding:40px;">
        <p style="font:400 16px/1.5 Roboto,sans-serif;color:#242C33;margin:0 0 8px;">
          Do you have a vehicle to trade in?
        </p>
        <LogicSelector v-model="value" name="trade" :options="tradeOptions" />
        <p style="font:12px/1 Roboto,sans-serif;color:#666;margin-top:12px;">Selected: {{ value || '—' }}</p>
      </div>`,
  }),
}

export const PaymentType: Story = {
  render: () => ({
    components: { LogicSelector },
    setup() {
      const value = ref('')
      return { value, paymentOptions }
    },
    template: `
      <div style="padding:40px;">
        <p style="font:400 16px/1.5 Roboto,sans-serif;color:#242C33;margin:0 0 8px;">
          How would you like to pay?
        </p>
        <LogicSelector v-model="value" name="payment" :options="paymentOptions" />
      </div>`,
  }),
}

/** Mobile wrapping: chips wrap when container is narrow. */
export const MobileWrapping: Story = {
  render: () => ({
    components: { LogicSelector },
    setup() {
      const value = ref('employed')
      return { value, employmentOptions }
    },
    template: `
      <div style="padding:40px;width:240px;">
        <p style="font:400 14px/1.4 Roboto,sans-serif;color:#666;margin:0 0 8px;">
          Container: 240px (chips wrap)
        </p>
        <LogicSelector v-model="value" name="mobile" :options="employmentOptions" />
      </div>`,
  }),
}
