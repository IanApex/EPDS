import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BoxSelector from './BoxSelector.vue'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Inputs/BoxSelector',
  component: BoxSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Segmented radio-button control for 2–4 closely related options.\n\n' +
          'All chips are equal-width inside a 280px container. The Neutral85 background ' +
          'of the container creates the 1px divider gaps between chips.\n\n' +
          '```html\n' +
          '<BoxSelector\n' +
          '  v-model="condition"\n' +
          '  name="condition"\n' +
          '  :options="[\n' +
          '    { value: \'new\',  label: \'New\'  },\n' +
          '    { value: \'used\', label: \'Used\' },\n' +
          '  ]"\n' +
          '/>\n' +
          '```\n\n' +
          '| Chip state | Background | Text colour | Weight |\n' +
          '|-----------|------------|-------------|--------|\n' +
          '| Unselected | White | `--color-neutral-40` | Regular |\n' +
          '| Hover | `--color-neutral-40` | White | Regular |\n' +
          '| Selected | `--color-neutral-20` | White | **Bold** |\n\n' +
          'Figma: "Inputs/Box Selectors/Sets".',
      },
    },
  },
  argTypes: {
    modelValue: { control: 'text' },
    name:       { control: 'text' },
    disabled:   { control: 'boolean' },
  },
  args: {
    name:       'story',
    modelValue: 'a',
    disabled:   false,
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
    ],
  },
} satisfies Meta<typeof BoxSelector>

export default meta
type Story = StoryObj<typeof meta>

// ─── Option counts ────────────────────────────────────────────────────────────

export const TwoOptions: Story = {
  name: '2 options',
  args: {
    name:       'two',
    modelValue: 'a',
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
    ],
  },
}

export const ThreeOptions: Story = {
  name: '3 options',
  args: {
    name:       'three',
    modelValue: 'a',
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
    ],
  },
}

export const FourOptions: Story = {
  name: '4 options',
  args: {
    name:       'four',
    modelValue: 'a',
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
      { value: 'd', label: 'Label' },
    ],
  },
}

export const HoverState: Story = {
  name: 'Hover (unselected chip)',
  args: {
    name:       'hover',
    modelValue: 'a',
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
    ],
  },
  parameters: { pseudo: { hover: '.box-selector__chip:nth-child(2)' } },
}

export const PressedState: Story = {
  name: 'Pressed (unselected chip)',
  args: {
    name:       'pressed',
    modelValue: 'a',
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
    ],
  },
  parameters: { pseudo: { active: '.box-selector__chip:nth-child(2)' } },
}

export const FocusSelected: Story = {
  name: 'Focus selected',
  args: {
    name:       'focus',
    modelValue: 'a',
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
    ],
  },
  parameters: { pseudo: { focusVisible: true } },
}

export const NoneSelected: Story = {
  name: 'None selected (uncontrolled start)',
  args: {
    name:       'none',
    modelValue: '',
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
    ],
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    name:       'disabled',
    modelValue: 'a',
    disabled:   true,
    options: [
      { value: 'a', label: 'Label' },
      { value: 'b', label: 'Label' },
      { value: 'c', label: 'Label' },
    ],
  },
}

// ─── Interactive examples ─────────────────────────────────────────────────────

export const YesNo: Story = {
  name: 'Interactive — Yes / No',
  render: () => ({
    components: { BoxSelector },
    setup() {
      const selected = ref('yes')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <BoxSelector
          v-model="selected"
          name="yn"
          :options="[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]"
        />
        <p style="font-family:Roboto,sans-serif;font-size:12px;color:#9ca3af;margin:0;">
          Selected: <strong>{{ selected || '—' }}</strong>
        </p>
      </div>
    `,
  }),
}

export const VehicleCondition: Story = {
  name: 'Interactive — Vehicle condition',
  render: () => ({
    components: { BoxSelector },
    setup() {
      const selected = ref('certified')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <BoxSelector
          v-model="selected"
          name="condition"
          :options="[
            { value: 'certified', label: 'Certified' },
            { value: 'used',      label: 'Used'      },
          ]"
        />
        <p style="font-family:Roboto,sans-serif;font-size:12px;color:#9ca3af;margin:0;">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
}

export const PriceRange: Story = {
  name: 'Interactive — Price range (3 options)',
  render: () => ({
    components: { BoxSelector },
    setup() {
      const selected = ref('10k-20k')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <BoxSelector
          v-model="selected"
          name="price"
          :options="[
            { value: 'under-10k', label: 'Under $10k' },
            { value: '10k-20k',   label: '$10k–$20k'  },
            { value: 'over-20k',  label: 'Over $20k'  },
          ]"
        />
        <p style="font-family:Roboto,sans-serif;font-size:12px;color:#9ca3af;margin:0;">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
}

export const TransmissionType: Story = {
  name: 'Interactive — Transmission (4 options)',
  render: () => ({
    components: { BoxSelector },
    setup() {
      const selected = ref('any')
      return { selected }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <BoxSelector
          v-model="selected"
          name="transmission"
          :options="[
            { value: 'any',    label: 'Any'    },
            { value: 'auto',   label: 'Auto'   },
            { value: 'manual', label: 'Manual' },
            { value: 'ev',     label: 'EV'     },
          ]"
        />
        <p style="font-family:Roboto,sans-serif;font-size:12px;color:#9ca3af;margin:0;">
          Selected: <strong>{{ selected }}</strong>
        </p>
      </div>
    `,
  }),
}

// ─── All counts at once ───────────────────────────────────────────────────────

export const AllCounts: Story = {
  name: 'All option counts',
  parameters: {
    docs: {
      description: {
        story: '2, 3, and 4-option variants stacked to show chip sizing.',
      },
    },
  },
  render: () => ({
    components: { BoxSelector },
    setup() {
      const s2 = ref('a')
      const s3 = ref('a')
      const s4 = ref('a')
      return { s2, s3, s4 }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
        <div style="display:flex;flex-direction:column;gap:4px;">
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">2 options</span>
          <BoxSelector v-model="s2" name="all2"
            :options="[{ value:'a', label:'Label' },{ value:'b', label:'Label' }]" />
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">3 options</span>
          <BoxSelector v-model="s3" name="all3"
            :options="[{ value:'a', label:'Label' },{ value:'b', label:'Label' },{ value:'c', label:'Label' }]" />
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;">
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">4 options</span>
          <BoxSelector v-model="s4" name="all4"
            :options="[{ value:'a', label:'Label' },{ value:'b', label:'Label' },{ value:'c', label:'Label' },{ value:'d', label:'Label' }]" />
        </div>
      </div>
    `,
  }),
}
