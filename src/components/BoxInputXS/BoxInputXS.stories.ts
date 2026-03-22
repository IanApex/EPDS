import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BoxInputXS from './BoxInputXS.vue'

import timeSvg from '../../../icon/Style=Location, Detail=Time, Icon=NA.svg?raw'
import calendarSvg from '../../../icon/Style=Location, Detail=Calendar, Icon=NA.svg?raw'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/BoxInput/XS',
  component: BoxInputXS,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Extra-small (48px) styled radio-button option box. ' +
          'Place multiple instances in a `<fieldset>` sharing the same `name` prop — ' +
          'only one can be selected at a time.\n\n' +
          'Bind the group\'s selected value with `v-model`:\n\n' +
          '```html\n' +
          '<fieldset style="display:flex;gap:8px;border:none;padding:0">\n' +
          '  <BoxInputXS v-model="choice" name="yn" value="yes" label="Yes" />\n' +
          '  <BoxInputXS v-model="choice" name="yn" value="no"  label="No"  />\n' +
          '</fieldset>\n' +
          '```\n\n' +
          '**States** (driven by value + CSS `:has()`):\n\n' +
          '| State | Background | Border (inset shadow) |\n' +
          '|-------|------------|-----------------------|\n' +
          '| Default | White | 1px `--color-neutral-90` |\n' +
          '| Hover | `--color-neutral-95` | 1px `--color-neutral-90` |\n' +
          '| Selected | White | 2px `--color-base-primary-50` |\n' +
          '| Focus | Any | 3px `--color-accessibility-80` |\n\n' +
          'Optional `#icon` slot renders a 16×16 SVG pinned to the left edge (import with `?raw`).\n\n' +
          'Figma: "Inputs/BoxInputs/XS".',
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
} satisfies Meta<typeof BoxInputXS>

export default meta
type Story = StoryObj<typeof meta>

// ─── Default (unselected) ─────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { label: 'Label', modelValue: '' },
}

// ─── Hover ────────────────────────────────────────────────────────────────────

export const Hover: Story = {
  name: 'Hover',
  args: { label: 'Label', modelValue: '' },
  parameters: { pseudo: { hover: true } },
}

// ─── Selected ─────────────────────────────────────────────────────────────────

export const Selected: Story = {
  name: 'Selected',
  args: { label: 'Label', modelValue: 'opt1' },
}

// ─── Focus ────────────────────────────────────────────────────────────────────

export const FocusSelected: Story = {
  name: 'Focus selected',
  args: { label: 'Label', modelValue: 'opt1' },
  parameters: { pseudo: { focusVisible: true } },
}

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: 'Disabled',
  args: { label: 'Label', modelValue: '', disabled: true },
}

// ─── With icon ────────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With icon',
  args: { label: '9:00 AM', modelValue: '' },
  render: (args) => ({
    components: { BoxInputXS },
    setup: () => ({ args, timeSvg }),
    template: `
      <BoxInputXS v-bind="args">
        <template #icon>
          <span v-html="timeSvg" style="display:contents" />
        </template>
      </BoxInputXS>
    `,
  }),
}

export const WithIconSelected: Story = {
  name: 'With icon — selected',
  args: { label: '9:00 AM', value: 'opt1', modelValue: 'opt1' },
  render: WithIcon.render,
}

// ─── Interactive group ────────────────────────────────────────────────────────

export const YesNoGroup: Story = {
  name: 'Interactive — Yes / No group',
  parameters: {
    docs: {
      description: {
        story: 'Live example: clicking a box updates the group selection.',
      },
    },
  },
  render: () => ({
    components: { BoxInputXS },
    setup() {
      const selected = ref('')
      return { selected }
    },
    template: `
      <fieldset style="display:flex;gap:8px;border:none;padding:0;margin:0;">
        <legend style="font-family:Roboto,sans-serif;font-size:14px;color:#6b7280;margin-bottom:8px;width:100%;">
          Would you like a test drive?
        </legend>
        <BoxInputXS v-model="selected" name="ynGroup" value="yes" label="Yes" />
        <BoxInputXS v-model="selected" name="ynGroup" value="no"  label="No"  />
      </fieldset>
    `,
  }),
}

export const TimeSlotGroup: Story = {
  name: 'Interactive — Time slot group (with icons)',
  parameters: {
    docs: {
      description: {
        story: 'Multiple time-slot options sharing a group with the time icon.',
      },
    },
  },
  render: () => ({
    components: { BoxInputXS },
    setup() {
      const selected = ref('')
      return { selected, timeSvg }
    },
    template: `
      <fieldset style="display:flex;flex-wrap:wrap;gap:8px;border:none;padding:0;margin:0;">
        <legend style="font-family:Roboto,sans-serif;font-size:14px;color:#6b7280;margin-bottom:8px;width:100%;">
          Select a time
        </legend>
        <BoxInputXS v-model="selected" name="timeGroup" value="9am"  label="9:00 AM">
          <template #icon><span v-html="timeSvg" style="display:contents" /></template>
        </BoxInputXS>
        <BoxInputXS v-model="selected" name="timeGroup" value="10am" label="10:00 AM">
          <template #icon><span v-html="timeSvg" style="display:contents" /></template>
        </BoxInputXS>
        <BoxInputXS v-model="selected" name="timeGroup" value="11am" label="11:00 AM">
          <template #icon><span v-html="timeSvg" style="display:contents" /></template>
        </BoxInputXS>
        <BoxInputXS v-model="selected" name="timeGroup" value="12pm" label="12:00 PM">
          <template #icon><span v-html="timeSvg" style="display:contents" /></template>
        </BoxInputXS>
      </fieldset>
    `,
  }),
}

export const CategoryGroup: Story = {
  name: 'Interactive — Category group',
  parameters: {
    docs: {
      description: {
        story: 'Category-based selection without icons.',
      },
    },
  },
  render: () => ({
    components: { BoxInputXS },
    setup() {
      const selected = ref('')
      return { selected, calendarSvg }
    },
    template: `
      <fieldset style="display:flex;flex-wrap:wrap;gap:8px;border:none;padding:0;margin:0;">
        <legend style="font-family:Roboto,sans-serif;font-size:14px;color:#6b7280;margin-bottom:8px;width:100%;">
          Vehicle type
        </legend>
        <BoxInputXS v-model="selected" name="catGroup" value="suv"   label="SUV" />
        <BoxInputXS v-model="selected" name="catGroup" value="sedan" label="Sedan" />
        <BoxInputXS v-model="selected" name="catGroup" value="truck" label="Truck" />
        <BoxInputXS v-model="selected" name="catGroup" value="ev"    label="Electric" />
      </fieldset>
    `,
  }),
}

// ─── All visual states ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  parameters: {
    docs: {
      description: {
        story: 'All four visual states displayed side by side.',
      },
    },
  },
  render: () => ({
    components: { BoxInputXS },
    setup: () => ({ timeSvg }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;padding:16px;">
        <div>
          <p style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin:0 0 8px;">Without icon</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <BoxInputXS name="s1" value="a" model-value=""   label="Default" />
              <span style="font-size:11px;color:#9ca3af;">Default</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <BoxInputXS name="s2" value="a" model-value="a"  label="Selected" />
              <span style="font-size:11px;color:#9ca3af;">Selected</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <BoxInputXS name="s3" value="a" model-value=""   label="Disabled" disabled />
              <span style="font-size:11px;color:#9ca3af;">Disabled</span>
            </div>
          </div>
        </div>
        <div>
          <p style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;margin:0 0 8px;">With icon</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <BoxInputXS name="s4" value="a" model-value=""   label="9:00 AM">
                <template #icon><span v-html="timeSvg" style="display:contents" /></template>
              </BoxInputXS>
              <span style="font-size:11px;color:#9ca3af;">Default</span>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
              <BoxInputXS name="s5" value="a" model-value="a"  label="9:00 AM">
                <template #icon><span v-html="timeSvg" style="display:contents" /></template>
              </BoxInputXS>
              <span style="font-size:11px;color:#9ca3af;">Selected</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
