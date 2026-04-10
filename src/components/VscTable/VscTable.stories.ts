import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VscTable from './VscTable.vue'

const meta = {
  title: 'Molecules/VscTable',
  component: VscTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Vehicle Service Contract comparison table showing repair costs with and without a VSC plan. ' +
          'Two sizes: **lg** (desktop) and **sm** (mobile/compact). ' +
          'The "with plan" column is visually emphasised with a card shadow and green accent text.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
  },
} satisfies Meta<typeof VscTable>

export default meta
type Story = StoryObj<typeof meta>

/* ── Large ── */

export const Large: Story = {
  name: 'Large (Desktop)',
  args: { size: 'lg' },
  render: (args) => ({
    components: { VscTable },
    setup() { return { args } },
    template: '<VscTable v-bind="args" />',
  }),
}

/* ── Small ── */

export const Small: Story = {
  name: 'Small (Mobile)',
  args: { size: 'sm' },
  render: (args) => ({
    components: { VscTable },
    setup() { return { args } },
    template: '<div style="max-width: 360px;"><VscTable v-bind="args" /></div>',
  }),
}

/* ── Custom rows ── */

export const CustomRows: Story = {
  name: 'Custom Data',
  args: {
    size: 'lg',
    rows: [
      { label: 'Transmission', withoutPlan: '$3,800', withPlan: '$100' },
      { label: 'Suspension', withoutPlan: '$1,200', withPlan: '$100' },
      { label: 'Cooling system', withoutPlan: '$975', withPlan: '$100' },
    ],
  },
  render: (args) => ({
    components: { VscTable },
    setup() { return { args } },
    template: '<VscTable v-bind="args" />',
  }),
}

/* ── Side-by-side comparison ── */

export const SideBySide: Story = {
  name: 'Size Comparison',
  render: () => ({
    components: { VscTable },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px;">
        <div>
          <p style="margin: 0 0 12px; font-size: 12px; color: #666B70; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Large (Desktop)</p>
          <VscTable size="lg" />
        </div>
        <div>
          <p style="margin: 0 0 12px; font-size: 12px; color: #666B70; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Small (Mobile)</p>
          <div style="max-width: 360px;">
            <VscTable size="sm" />
          </div>
        </div>
      </div>
    `,
  }),
}

/* ── Interactive ── */

export const Interactive: Story = {
  args: { size: 'lg' },
  render: (args) => ({
    components: { VscTable },
    setup() { return { args } },
    template: '<div style="max-width: 560px;"><VscTable v-bind="args" /></div>',
  }),
}
