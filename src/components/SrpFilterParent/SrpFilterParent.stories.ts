import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SrpFilterParent from './SrpFilterParent.vue'

const meta = {
  title: 'Components/SRP Filters/FilterParent',
  component: SrpFilterParent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Expandable category header for SRP sidebar filters. ' +
          '`v-model` controls the open/closed state. ' +
          'Set `hasSelection` to bold the label when child filters are active. ' +
          '`disabled` renders the "Common Inputs" state (muted label, no chevron).',
      },
    },
    backgrounds: { default: 'light' },
  },
  argTypes: {
    label:        { control: 'text' },
    open:         { control: 'boolean' },
    hasSelection: { control: 'boolean' },
    disabled:     { control: 'boolean' },
  },
  args: {
    label:        'Body style',
    open:         false,
    hasSelection: false,
    disabled:     false,
  },
} satisfies Meta<typeof SrpFilterParent>

export default meta
type Story = StoryObj<typeof meta>

const w = 'width:306px;'

// ─── Static states ────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default (collapsed)',
  render: (args) => ({
    components: { SrpFilterParent },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterParent v-bind="args" /></div>`,
  }),
}

export const Open: Story = {
  name: 'Open (expanded)',
  args: { open: true },
  render: (args) => ({
    components: { SrpFilterParent },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterParent v-bind="args" /></div>`,
  }),
}

export const WithSelection: Story = {
  name: 'Has selection (bold)',
  args: { hasSelection: true },
  render: (args) => ({
    components: { SrpFilterParent },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterParent v-bind="args" /></div>`,
  }),
}

export const WithSelectionOpen: Story = {
  name: 'Has selection + open',
  args: { hasSelection: true, open: true },
  render: (args) => ({
    components: { SrpFilterParent },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterParent v-bind="args" /></div>`,
  }),
}

export const Disabled: Story = {
  name: 'Disabled / Common Inputs',
  args: { disabled: true },
  parameters: {
    docs: {
      description: { story: 'Muted label, no chevron — used inside a common-input form context.' },
    },
  },
  render: (args) => ({
    components: { SrpFilterParent },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterParent v-bind="args" /></div>`,
  }),
}

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (toggle)',
  parameters: {
    docs: {
      description: { story: 'Click to open/close. Chevron rotates 90°.' },
    },
  },
  render: () => ({
    components: { SrpFilterParent },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="${w}">
        <SrpFilterParent label="Body style" :open="open" @update:open="open = $event" />
        <p style="margin-top:8px;font-size:12px;color:#666;">open: {{ open }}</p>
      </div>
    `,
  }),
}
