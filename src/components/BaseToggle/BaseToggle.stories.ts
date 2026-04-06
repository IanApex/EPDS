import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseToggle from './BaseToggle.vue'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/BaseToggle',
  component: BaseToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A toggle (switch) input for settings that take immediate effect — no confirmation needed.\n\n' +
          '**Build guidelines (Figma):**\n' +
          '- Place the toggle on the **right side** of its label for mobile clickability\n' +
          '- For 2+ lines of content, align toggle to the **top-right**\n' +
          '- Minimum **24px gap** between label text and toggle\n' +
          '- Make the **entire row/card clickable**, not just the toggle itself\n\n' +
          '```html\n' +
          '<BaseToggle v-model="enabled" label="Show cars that ship" />\n' +
          '```\n\n' +
          '| State | Track | Thumb |\n' +
          '|-------|-------|-------|\n' +
          '| Off | Neutral70 | White circle, left:2px |\n' +
          '| On | Primary55 | White circle + check, right:2px |\n' +
          '| Focus | Off + Accessibility80 ring | — |\n' +
          '| Focus On | On + Accessibility80 ring | — |\n' +
          '| Disabled | Off, opacity medium | — |\n' +
          '| Disabled On | On, opacity medium | — |\n\n' +
          'Figma: "Inputs/Toggle".',
      },
    },
  },
  argTypes: {
    modelValue: { control: 'boolean' },
    disabled:   { control: 'boolean' },
    label:      { control: 'text' },
    name:       { control: 'text' },
  },
  args: {
    modelValue: false,
    disabled:   false,
    label:      'Toggle label',
    name:       'toggle',
  },
} satisfies Meta<typeof BaseToggle>

export default meta
type Story = StoryObj<typeof meta>

// ─── Individual states ────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Off (default)',
  args: { modelValue: false },
}

export const On: Story = {
  name: 'On (selected)',
  args: { modelValue: true },
}

export const Focus: Story = {
  name: 'Focus — off',
  args: { modelValue: false },
  parameters: { pseudo: { focusVisible: true } },
}

export const FocusOn: Story = {
  name: 'Focus — on',
  args: { modelValue: true },
  parameters: { pseudo: { focusVisible: true } },
}

export const Disabled: Story = {
  name: 'Disabled — off',
  args: { modelValue: false, disabled: true },
}

export const DisabledOn: Story = {
  name: 'Disabled — on',
  args: { modelValue: true, disabled: true },
}

// ─── No label ─────────────────────────────────────────────────────────────────

export const NoLabel: Story = {
  name: 'No label (standalone)',
  args: { label: undefined },
  parameters: {
    docs: {
      description: {
        story: 'Toggle without a built-in label — wrap in a row with adjacent text in the parent.',
      },
    },
  },
}

// ─── All states grid ──────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  parameters: {
    docs: {
      description: {
        story: 'All Figma states displayed together.',
      },
    },
  },
  render: () => ({
    components: { BaseToggle },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:32px;padding:16px;align-items:flex-start;">
        <div v-for="item in states" :key="item.name" style="display:flex;flex-direction:column;align-items:flex-start;gap:8px;">
          <BaseToggle :model-value="item.on" :disabled="item.disabled" />
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">{{ item.name }}</span>
        </div>
      </div>
    `,
    setup() {
      return {
        states: [
          { name: 'Default',          on: false, disabled: false },
          { name: 'On',               on: true,  disabled: false },
          { name: 'Disabled',         on: false, disabled: true  },
          { name: 'Disabled On',      on: true,  disabled: true  },
        ],
      }
    },
  }),
}

// ─── Interactive list ─────────────────────────────────────────────────────────

export const ToggleList: Story = {
  name: 'Interactive — settings list',
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent toggles in a list — each in its own row with 24px gap between label and toggle.',
      },
    },
  },
  render: () => ({
    components: { BaseToggle },
    setup() {
      const settings = ref([
        { id: 'ship',   label: 'Show cars that ship',       on: false },
        { id: 'emails', label: 'Sign up for emails',         on: false },
        { id: 'texts',  label: 'Receive text messages',      on: true  },
        { id: 'calls',  label: 'Receive phone calls',        on: false },
      ])
      return { settings }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;max-width:360px;">
        <div
          v-for="s in settings"
          :key="s.id"
          style="display:flex;align-items:center;justify-content:space-between;gap:24px;"
        >
          <span style="font-family:Roboto,sans-serif;font-size:16px;color:#242C33;line-height:1.5;">
            {{ s.label }}
          </span>
          <BaseToggle v-model="s.on" :name="s.id" />
        </div>
      </div>
    `,
  }),
}
