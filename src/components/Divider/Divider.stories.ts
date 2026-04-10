import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Divider from './Divider.vue'

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A 1px rule used to separate content and create visual hierarchy ' +
          '(e.g., between sections, cards, or form groups). ' +
          'Avoid overusing — only where necessary for meaningful separation.',
      },
    },
  },
  argTypes: {
    color:       { control: 'select', options: ['light', 'dark'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

/* ── Horizontal ── */

export const HorizontalLight: Story = {
  name: 'Horizontal — Light',
  args: { color: 'light', orientation: 'horizontal' },
  render: (args) => ({
    components: { Divider },
    setup() { return { args } },
    template: `
      <div style="width: 320px; padding: 16px;">
        <Divider v-bind="args" />
      </div>
    `,
  }),
}

export const HorizontalDark: Story = {
  name: 'Horizontal — Dark',
  args: { color: 'dark', orientation: 'horizontal' },
  render: (args) => ({
    components: { Divider },
    setup() { return { args } },
    template: `
      <div style="width: 320px; padding: 16px;">
        <Divider v-bind="args" />
      </div>
    `,
  }),
}

/* ── Vertical ── */

export const VerticalLight: Story = {
  name: 'Vertical — Light',
  args: { color: 'light', orientation: 'vertical' },
  render: (args) => ({
    components: { Divider },
    setup() { return { args } },
    template: `
      <div style="height: 120px; padding: 16px;">
        <Divider v-bind="args" />
      </div>
    `,
  }),
}

export const VerticalDark: Story = {
  name: 'Vertical — Dark',
  args: { color: 'dark', orientation: 'vertical' },
  render: (args) => ({
    components: { Divider },
    setup() { return { args } },
    template: `
      <div style="height: 120px; padding: 16px;">
        <Divider v-bind="args" />
      </div>
    `,
  }),
}

/* ── All variants ── */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Divider },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 400px;">
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666B70;">Horizontal — Light (Neutral90)</p>
          <Divider color="light" />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666B70;">Horizontal — Dark (Neutral40)</p>
          <Divider color="dark" />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666B70;">Vertical — Light &amp; Dark (120px tall)</p>
          <div style="display: flex; gap: 32px; height: 120px;">
            <Divider color="light" orientation="vertical" />
            <Divider color="dark" orientation="vertical" />
          </div>
        </div>
      </div>
    `,
  }),
}

/* ── In-context: card section separator ── */

export const CardContext: Story = {
  name: 'Card — Section separator',
  render: () => ({
    components: { Divider },
    template: `
      <div style="width: 280px; padding: 16px; border: 1px solid #E8E9EB; border-radius: 8px; font-family: Roboto, sans-serif;">
        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #242C33;">
          <span>Down payment</span><span>$ 1,000</span>
        </div>
        <div style="margin: 8px 0;">
          <Divider />
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #242C33;">
          <span>Remaining loan payoff</span><span>$ 4,000</span>
        </div>
        <div style="margin: 8px 0;">
          <Divider />
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; color: #242C33;">
          <span>Applied to purchase</span><span>$9,000</span>
        </div>
      </div>
    `,
  }),
}

/* ── Interactive ── */

export const Interactive: Story = {
  args: {
    color: 'light',
    orientation: 'horizontal',
  },
  render: (args) => ({
    components: { Divider },
    setup() { return { args } },
    template: `
      <div :style="args.orientation === 'vertical' ? 'height: 120px; padding: 16px;' : 'width: 320px; padding: 16px;'">
        <Divider v-bind="args" />
      </div>
    `,
  }),
}
