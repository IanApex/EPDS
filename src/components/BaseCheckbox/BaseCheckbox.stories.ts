import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseCheckbox from './BaseCheckbox.vue'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Inputs/BaseCheckbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single checkbox with label. Supports `v-model` (boolean).\n\n' +
          '**Build guidelines (Figma):**\n' +
          '- 12px gap between box and label — built in\n' +
          '- **16px between items** in a list — add `gap: 16px` to the wrapping column\n' +
          '- Long labels wrap; wrapped text aligns under the first line (box is top-aligned)\n\n' +
          '```html\n' +
          '<BaseCheckbox v-model="agreed" label="I agree to the terms and conditions" />\n' +
          '```\n\n' +
          '| State | Box | Label |\n' +
          '|-------|-----|-------|\n' +
          '| Default | 2px Neutral0 border, white bg | Regular |\n' +
          '| Hover | 3px Neutral0 border | Underline |\n' +
          '| Pressed | 3px border + 14×14 Primary50 inner fill | Underline |\n' +
          '| Focus | 2px Accessibility80 border | Regular |\n' +
          '| Selected | Primary50 fill + white check | Regular |\n' +
          '| Hover Selected | Primary40 fill + white check | Underline |\n' +
          '| Focus Selected | Primary50 fill + 2px inset Accessibility80 | Regular |\n' +
          '| Disabled | Neutral85 border, opacity medium | Regular |\n' +
          '| Disabled Selected | Neutral85 fill + white check, opacity medium | Regular |\n\n' +
          'Figma: "Inputs/Checkboxes".',
      },
    },
  },
  argTypes: {
    label:      { control: 'text' },
    modelValue: { control: 'boolean' },
    disabled:   { control: 'boolean' },
  },
  args: {
    label:      'Checkbox',
    modelValue: false,
    disabled:   false,
  },
} satisfies Meta<typeof BaseCheckbox>

export default meta
type Story = StoryObj<typeof meta>

// ─── Individual states ────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default (unchecked)',
  args: { modelValue: false },
}

export const Hover: Story = {
  name: 'Hover',
  args: { modelValue: false },
  parameters: { pseudo: { hover: true } },
}

export const Pressed: Story = {
  name: 'Pressed',
  args: { modelValue: false },
  parameters: { pseudo: { active: true } },
}

export const Focus: Story = {
  name: 'Focus',
  args: { modelValue: false },
  parameters: { pseudo: { focusVisible: true } },
}

export const Selected: Story = {
  name: 'Selected (checked)',
  args: { modelValue: true },
}

export const HoverSelected: Story = {
  name: 'Hover selected',
  args: { modelValue: true },
  parameters: { pseudo: { hover: true } },
}

export const FocusSelected: Story = {
  name: 'Focus selected',
  args: { modelValue: true },
  parameters: { pseudo: { focusVisible: true } },
}

export const Disabled: Story = {
  name: 'Disabled (unchecked)',
  args: { modelValue: false, disabled: true },
}

export const DisabledSelected: Story = {
  name: 'Disabled selected',
  args: { modelValue: true, disabled: true },
}

// ─── All states grid ──────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  parameters: {
    docs: {
      description: {
        story: 'All 9 Figma states displayed together.',
      },
    },
  },
  render: () => ({
    components: { BaseCheckbox },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:24px;padding:16px;align-items:flex-start;">
        <div v-for="item in states" :key="item.name" style="display:flex;flex-direction:column;align-items:flex-start;gap:6px;">
          <BaseCheckbox :model-value="item.checked" :disabled="item.disabled" label="Checkbox" />
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">{{ item.name }}</span>
        </div>
      </div>
    `,
    setup() {
      return {
        states: [
          { name: 'Default',          checked: false, disabled: false },
          { name: 'Selected',         checked: true,  disabled: false },
          { name: 'Disabled',         checked: false, disabled: true  },
          { name: 'Disabled Selected',checked: true,  disabled: true  },
        ],
      }
    },
  }),
}

// ─── Long label wrapping ──────────────────────────────────────────────────────

export const LongLabel: Story = {
  name: 'Long label — wraps to two lines',
  args: {
    label: 'Option 03 that has a really long name so it goes to two lines',
    modelValue: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Wrapped text indents to align with the start of the first line — the box stays top-aligned.',
      },
    },
  },
}

// ─── Interactive list ─────────────────────────────────────────────────────────

export const CheckboxList: Story = {
  name: 'Interactive — Checkbox list (16px gap)',
  parameters: {
    docs: {
      description: {
        story: '16px gap between items as per Figma build guidelines.',
      },
    },
  },
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      const values = ref<string[]>([])
      const options = ['Option 01', 'Option 02', 'Option 03', 'Option 04']
      const isChecked = (opt: string) => values.value.includes(opt)
      const toggle = (opt: string) => {
        const idx = values.value.indexOf(opt)
        if (idx === -1) values.value.push(opt)
        else values.value.splice(idx, 1)
      }
      return { options, isChecked, toggle, values }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
        <BaseCheckbox
          v-for="opt in options"
          :key="opt"
          :label="opt"
          :model-value="isChecked(opt)"
          @update:model-value="toggle(opt)"
        />
        <p style="font-family:Roboto,sans-serif;font-size:12px;color:#9ca3af;margin:8px 0 0;">
          Selected: <strong>{{ values.join(', ') || '—' }}</strong>
        </p>
      </div>
    `,
  }),
}

export const MixedList: Story = {
  name: 'Interactive — Mixed with long labels',
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      const values = ref<string[]>(['opt2'])
      const options = [
        { id: 'opt1', label: 'Option 01' },
        { id: 'opt2', label: 'Option 02' },
        { id: 'opt3', label: 'Option 03 that has a really long name so it goes to two lines' },
        { id: 'opt4', label: 'Option 04' },
      ]
      const isChecked = (id: string) => values.value.includes(id)
      const toggle = (id: string) => {
        const idx = values.value.indexOf(id)
        if (idx === -1) values.value.push(id)
        else values.value.splice(idx, 1)
      }
      return { options, isChecked, toggle }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;max-width:300px;">
        <BaseCheckbox
          v-for="opt in options"
          :key="opt.id"
          :label="opt.label"
          :model-value="isChecked(opt.id)"
          @update:model-value="toggle(opt.id)"
        />
      </div>
    `,
  }),
}
