import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BoxInputLG from './BoxInputLG.vue'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Inputs/Box Input/LG',
  component: BoxInputLG,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Large (132px) styled radio-button option box with a vertical card layout.\n\n' +
          'A **bold header label** (1–2 words) sits above a **horizontal divider**, with ' +
          '**description text** filling the lower section. The divider line thickens to match ' +
          'the outer border on each interaction state — no layout shift.\n\n' +
          '```html\n' +
          '<BoxInputLG\n' +
          '  v-model="selected"\n' +
          '  name="condition"\n' +
          '  value="certified"\n' +
          '  label="Certified"\n' +
          '  description="Passed a 190-point inspection with a 12-month warranty."\n' +
          '/>\n' +
          '```\n\n' +
          '| State | Outer border | Divider |\n' +
          '|-------|-------------|--------|\n' +
          '| Default | 1px `--color-neutral-85` | 1px `--color-neutral-85` |\n' +
          '| Hover | 1px neutral-85 + neutral-95 bg | same |\n' +
          '| Selected | 2px `--color-base-primary-50` | 2px Primary50 |\n' +
          '| Focus | 3px `--color-accessibility-80` | 3px Accessibility80 |\n\n' +
          'Figma: "Inputs/BoxInputs/Large".',
      },
    },
  },
  argTypes: {
    label:       { control: 'text' },
    description: { control: 'text' },
    value:       { control: 'text' },
    name:        { control: 'text' },
    disabled:    { control: 'boolean' },
  },
  args: {
    label:       'Label',
    description: 'This is a description',
    value:       'opt1',
    name:        'story-group',
    modelValue:  '',
    disabled:    false,
  },
} satisfies Meta<typeof BoxInputLG>

export default meta
type Story = StoryObj<typeof meta>

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { label: 'Label', description: 'This is a description', modelValue: '' },
}

export const Hover: Story = {
  name: 'Hover',
  args: { label: 'Label', description: 'This is a description', modelValue: '' },
  parameters: { pseudo: { hover: true } },
}

export const Selected: Story = {
  name: 'Selected',
  args: { label: 'Label', description: 'This is a description', modelValue: 'opt1' },
}

export const FocusSelected: Story = {
  name: 'Focus selected',
  args: { label: 'Label', description: 'This is a description', modelValue: 'opt1' },
  parameters: { pseudo: { focusVisible: true } },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: { label: 'Label', description: 'This is a description', modelValue: '', disabled: true },
}

// ─── Interactive groups ───────────────────────────────────────────────────────

export const ConditionGroup: Story = {
  name: 'Interactive — Vehicle condition',
  parameters: {
    docs: {
      description: {
        story: 'A typical 2-option selection for vehicle condition.',
      },
    },
  },
  render: () => ({
    components: { BoxInputLG },
    setup() {
      const selected = ref('')
      return { selected }
    },
    template: `
      <fieldset style="display:flex;gap:8px;border:none;padding:0;margin:0;">
        <legend style="font-family:Roboto,sans-serif;font-size:14px;color:#6b7280;margin-bottom:8px;width:100%;">
          Vehicle condition
        </legend>
        <BoxInputLG
          v-model="selected"
          name="condition"
          value="certified"
          label="Certified"
          description="Passed a 190-point inspection and comes with a 12-month warranty."
        />
        <BoxInputLG
          v-model="selected"
          name="condition"
          value="standard"
          label="As-is"
          description="Sold as inspected — great value without the certified premium."
        />
      </fieldset>
    `,
  }),
}

export const PaymentGroup: Story = {
  name: 'Interactive — Payment frequency',
  parameters: {
    docs: {
      description: {
        story: 'Yes / No or short-label patterns work well with LG boxes.',
      },
    },
  },
  render: () => ({
    components: { BoxInputLG },
    setup() {
      const selected = ref('')
      return { selected }
    },
    template: `
      <fieldset style="display:flex;gap:8px;border:none;padding:0;margin:0;">
        <legend style="font-family:Roboto,sans-serif;font-size:14px;color:#6b7280;margin-bottom:8px;width:100%;">
          How would you like to pay?
        </legend>
        <BoxInputLG
          v-model="selected"
          name="payment"
          value="finance"
          label="Finance"
          description="Spread payments over time with our flexible financing options."
        />
        <BoxInputLG
          v-model="selected"
          name="payment"
          value="cash"
          label="Cash"
          description="Pay in full today and drive home with no monthly obligations."
        />
        <BoxInputLG
          v-model="selected"
          name="payment"
          value="lease"
          label="Lease"
          description="Lower monthly payments with the option to upgrade every few years."
        />
      </fieldset>
    `,
  }),
}

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => ({
    components: { BoxInputLG },
    template: `
      <div style="display:flex;gap:12px;padding:16px;align-items:flex-start;flex-wrap:wrap;">
        <div v-for="item in [
          { label: 'Default',   mv: '',     name: 's1' },
          { label: 'Selected',  mv: 'opt1', name: 's2' },
          { label: 'Disabled',  mv: '',     name: 's3', disabled: true },
        ]" :key="item.label" style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          <BoxInputLG
            :name="item.name"
            value="opt1"
            :model-value="item.mv"
            label="Certified"
            description="Passed a 190-point inspection with a 12-month warranty."
            :disabled="item.disabled"
          />
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">
            {{ item.label }}
          </span>
        </div>
      </div>
    `,
  }),
}
