import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProtectionPlansGraphic from './ProtectionPlansGraphic.vue'

const meta = {
  title: 'Molecules/ProtectionPlansGraphic',
  component: ProtectionPlansGraphic,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Protection plans infographic showing a vehicle with annotated coverage areas. ' +
          'Four callouts: windshield, ding & dent, interior/exterior appearance, and engine & core systems. ' +
          'Two sizes: **lg** (desktop) and **sm** (mobile/compact).',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
  },
} satisfies Meta<typeof ProtectionPlansGraphic>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  name: 'Large (Desktop)',
  args: { size: 'lg' },
  render: (args) => ({
    components: { ProtectionPlansGraphic },
    setup() { return { args } },
    template: '<ProtectionPlansGraphic v-bind="args" />',
  }),
}

export const Small: Story = {
  name: 'Small (Mobile)',
  args: { size: 'sm' },
  render: (args) => ({
    components: { ProtectionPlansGraphic },
    setup() { return { args } },
    template: '<ProtectionPlansGraphic v-bind="args" />',
  }),
}

export const SideBySide: Story = {
  name: 'Size Comparison',
  render: () => ({
    components: { ProtectionPlansGraphic },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px;">
        <div>
          <p style="margin: 0 0 12px; font-size: 12px; color: #666B70; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Large (Desktop)</p>
          <ProtectionPlansGraphic size="lg" />
        </div>
        <div>
          <p style="margin: 0 0 12px; font-size: 12px; color: #666B70; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Small (Mobile)</p>
          <ProtectionPlansGraphic size="sm" />
        </div>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  args: { size: 'lg' },
  render: (args) => ({
    components: { ProtectionPlansGraphic },
    setup() { return { args } },
    template: '<ProtectionPlansGraphic v-bind="args" />',
  }),
}
