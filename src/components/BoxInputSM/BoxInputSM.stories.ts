import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BoxInputSM from './BoxInputSM.vue'
import BoxInputXS from '../BoxInputXS/BoxInputXS.vue'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Inputs/Box Input/SM',
  component: BoxInputSM,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Small (64px) styled radio-button option box. Identical API to `BoxInputXS` — ' +
          'the only visual differences are the taller height and uniform 24px padding.\n\n' +
          'Bind the group\'s selected value with `v-model`:\n\n' +
          '```html\n' +
          '<fieldset style="display:flex;gap:8px;border:none;padding:0">\n' +
          '  <BoxInputSM v-model="choice" name="yn" value="yes" label="Yes" />\n' +
          '  <BoxInputSM v-model="choice" name="yn" value="no"  label="No"  />\n' +
          '</fieldset>\n' +
          '```\n\n' +
          '| State | Background | Border (inset shadow) |\n' +
          '|-------|------------|-----------------------|\n' +
          '| Default | White | 1px `--color-neutral-90` |\n' +
          '| Hover | `--color-neutral-95` | 1px `--color-neutral-90` |\n' +
          '| Selected | White | 2px `--color-base-primary-50` |\n' +
          '| Focus | Any | 3px `--color-accessibility-80` |\n\n' +
          'Figma: "Inputs/BoxInputs/Small".',
      },
    },
  },
  argTypes: {
    label:    { control: 'text' },
    value:    { control: 'text' },
    name:     { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    label:      'Label',
    value:      'opt1',
    name:       'story-group',
    modelValue: '',
    disabled:   false,
  },
} satisfies Meta<typeof BoxInputSM>

export default meta
type Story = StoryObj<typeof meta>

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { label: 'Label', modelValue: '' },
}

export const Hover: Story = {
  name: 'Hover',
  args: { label: 'Label', modelValue: '' },
  parameters: { pseudo: { hover: true } },
}

export const Selected: Story = {
  name: 'Selected',
  args: { label: 'Label', modelValue: 'opt1' },
}

export const FocusSelected: Story = {
  name: 'Focus selected',
  args: { label: 'Label', modelValue: 'opt1' },
  parameters: { pseudo: { focusVisible: true } },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: { label: 'Label', modelValue: '', disabled: true },
}

// ─── Interactive groups ───────────────────────────────────────────────────────

export const YesNoGroup: Story = {
  name: 'Interactive — Yes / No group',
  render: () => ({
    components: { BoxInputSM },
    setup() {
      const selected = ref('')
      return { selected }
    },
    template: `
      <fieldset style="display:flex;gap:8px;border:none;padding:0;margin:0;">
        <legend style="font-family:Roboto,sans-serif;font-size:14px;color:#6b7280;margin-bottom:8px;width:100%;">
          Would you like a test drive?
        </legend>
        <BoxInputSM v-model="selected" name="ynSm" value="yes" label="Yes" />
        <BoxInputSM v-model="selected" name="ynSm" value="no"  label="No"  />
      </fieldset>
    `,
  }),
}

export const TimeSlotGroup: Story = {
  name: 'Interactive — Time slot group',
  render: () => ({
    components: { BoxInputSM },
    setup() {
      const selected = ref('')
      return { selected }
    },
    template: `
      <fieldset style="display:flex;flex-wrap:wrap;gap:8px;border:none;padding:0;margin:0;">
        <legend style="font-family:Roboto,sans-serif;font-size:14px;color:#6b7280;margin-bottom:8px;width:100%;">
          Select a time
        </legend>
        <BoxInputSM v-model="selected" name="timeSmGroup" value="9am"  label="9:00 AM" />
        <BoxInputSM v-model="selected" name="timeSmGroup" value="10am" label="10:00 AM" />
        <BoxInputSM v-model="selected" name="timeSmGroup" value="11am" label="11:00 AM" />
        <BoxInputSM v-model="selected" name="timeSmGroup" value="12pm" label="12:00 PM" />
      </fieldset>
    `,
  }),
}

// ─── Side-by-side size comparison ────────────────────────────────────────────

export const SizeComparison: Story = {
  name: 'XS vs SM comparison',
  parameters: {
    docs: {
      description: {
        story: 'XS (48px) and SM (64px) shown side by side across all states.',
      },
    },
  },
  render: () => ({
    components: { BoxInputXS, BoxInputSM },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;padding:16px;font-family:Roboto,sans-serif;">

        <!-- Header row -->
        <div style="display:grid;grid-template-columns:80px 1fr 1fr;gap:8px;align-items:center;">
          <span></span>
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;text-align:center;">XS — 48px</span>
          <span style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;text-align:center;">SM — 64px</span>
        </div>

        <!-- Default -->
        <div style="display:grid;grid-template-columns:80px 1fr 1fr;gap:8px;align-items:center;">
          <span style="font-size:11px;color:#9ca3af;">Default</span>
          <div style="display:flex;justify-content:center;">
            <BoxInputXS name="xs-cmp" value="a" model-value="" label="Label" />
          </div>
          <div style="display:flex;justify-content:center;">
            <BoxInputSM name="sm-cmp" value="a" model-value="" label="Label" />
          </div>
        </div>

        <!-- Selected -->
        <div style="display:grid;grid-template-columns:80px 1fr 1fr;gap:8px;align-items:center;">
          <span style="font-size:11px;color:#9ca3af;">Selected</span>
          <div style="display:flex;justify-content:center;">
            <BoxInputXS name="xs-sel" value="a" model-value="a" label="Label" />
          </div>
          <div style="display:flex;justify-content:center;">
            <BoxInputSM name="sm-sel" value="a" model-value="a" label="Label" />
          </div>
        </div>

        <!-- Disabled -->
        <div style="display:grid;grid-template-columns:80px 1fr 1fr;gap:8px;align-items:center;">
          <span style="font-size:11px;color:#9ca3af;">Disabled</span>
          <div style="display:flex;justify-content:center;">
            <BoxInputXS name="xs-dis" value="a" model-value="" label="Label" disabled />
          </div>
          <div style="display:flex;justify-content:center;">
            <BoxInputSM name="sm-dis" value="a" model-value="" label="Label" disabled />
          </div>
        </div>

      </div>
    `,
  }),
}
