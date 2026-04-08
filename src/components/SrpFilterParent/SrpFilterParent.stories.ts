import type { Meta, StoryObj } from '@storybook/vue3-vite'
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
    hasSelection: { control: 'boolean' },
    disabled:     { control: 'boolean' },
  },
  args: {
    label:        'Body style',
    hasSelection: false,
    disabled:     false,
  },
} satisfies Meta<typeof SrpFilterParent>

export default meta
type Story = StoryObj<typeof meta>

const w = 'width:306px;'

// ─── Static states ────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    components: { SrpFilterParent },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterParent v-bind="args" /></div>`,
  }),
}

export const WithSelection: Story = {
  name: 'Has selection (bold)',
  args: { hasSelection: true },
  parameters: {
    docs: {
      description: { story: 'Label renders bold when one or more child filters are active.' },
    },
  },
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

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    components: { SrpFilterParent },
    template: `
      <div style="${w}display:flex;flex-direction:column;">
        <SrpFilterParent label="Body style" />
        <SrpFilterParent label="Body style" :hasSelection="true" />
        <SrpFilterParent label="Body style" :disabled="true" />
      </div>
    `,
  }),
}
