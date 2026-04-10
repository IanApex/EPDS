import type { Meta, StoryObj } from '@storybook/vue3-vite'
import GapGraphic from './GapGraphic.vue'

const meta = {
  title: 'Molecules/GapGraphic',
  component: GapGraphic,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'GAP (Guaranteed Asset Protection) infographic showing a split car image ' +
          'with insurance payout vs. total loss protection coverage. ' +
          'Two sizes: **lg** (desktop) and **sm** (mobile/compact).',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
  },
} satisfies Meta<typeof GapGraphic>

export default meta
type Story = StoryObj<typeof meta>

/* ── Large ── */

export const Large: Story = {
  name: 'Large (Desktop)',
  args: { size: 'lg' },
  render: (args) => ({
    components: { GapGraphic },
    setup() { return { args } },
    template: '<GapGraphic v-bind="args" />',
  }),
}

/* ── Small ── */

export const Small: Story = {
  name: 'Small (Mobile)',
  args: { size: 'sm' },
  render: (args) => ({
    components: { GapGraphic },
    setup() { return { args } },
    template: '<GapGraphic v-bind="args" />',
  }),
}

/* ── Side-by-side ── */

export const SideBySide: Story = {
  name: 'Size Comparison',
  render: () => ({
    components: { GapGraphic },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px;">
        <div>
          <p style="margin: 0 0 12px; font-size: 12px; color: #666B70; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Large (Desktop)</p>
          <GapGraphic size="lg" />
        </div>
        <div>
          <p style="margin: 0 0 12px; font-size: 12px; color: #666B70; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Small (Mobile)</p>
          <GapGraphic size="sm" />
        </div>
      </div>
    `,
  }),
}

/* ── Interactive ── */

export const Interactive: Story = {
  args: { size: 'lg' },
  render: (args) => ({
    components: { GapGraphic },
    setup() { return { args } },
    template: '<GapGraphic v-bind="args" />',
  }),
}
