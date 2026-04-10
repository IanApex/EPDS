import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tooltip from './Tooltip.vue'
import infoSvg from '../../../icon/Style=Alerts, Detail=Info, Icon=NA.svg?raw'

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Click-to-toggle context hint. Displayed when a user clicks or focuses a UI element ' +
          'such as an icon, highlighted word, or button. Dark bubble with a caret that can align ' +
          'center, right, or left.',
      },
    },
  },
  argTypes: {
    text:       { control: 'text' },
    ariaLabel:  { control: 'text' },
    caretAlign: { control: 'select', options: ['center', 'right', 'left'] },
    closeOnClickOutside: { control: 'boolean' },
    closeOnEscape:       { control: 'boolean' },
  },
  args: {
    text:       'Tooltip',
    ariaLabel:  'More information',
    caretAlign: 'center',
    closeOnClickOutside: true,
    closeOnEscape: true,
  },
  decorators: [
    () => ({
      template: '<div style="padding: 120px 200px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

const infoIcon = `<span style="display:contents">${infoSvg}</span>`

/* ── Center caret (default) ── */

export const CenterDefault: Story = {
  name: 'Center — Default',
  render: (args) => ({
    components: { Tooltip },
    setup() { return { args, infoIcon } },
    template: `
      <Tooltip v-bind="args">
        <template #icon><span v-html="infoIcon" /></template>
      </Tooltip>
    `,
  }),
}

/* ── Right caret ── */

export const RightCaret: Story = {
  name: 'Right — Caret',
  args: { caretAlign: 'right' },
  render: (args) => ({
    components: { Tooltip },
    setup() { return { args, infoIcon } },
    template: `
      <Tooltip v-bind="args">
        <template #icon><span v-html="infoIcon" /></template>
      </Tooltip>
    `,
  }),
}

/* ── Left caret ── */

export const LeftCaret: Story = {
  name: 'Left — Caret',
  args: { caretAlign: 'left' },
  render: (args) => ({
    components: { Tooltip },
    setup() { return { args, infoIcon } },
    template: `
      <Tooltip v-bind="args">
        <template #icon><span v-html="infoIcon" /></template>
      </Tooltip>
    `,
  }),
}

/* ── Long text (wraps within 175px max-width) ── */

export const LongText: Story = {
  name: 'Long text',
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  },
  render: (args) => ({
    components: { Tooltip },
    setup() { return { args, infoIcon } },
    template: `
      <Tooltip v-bind="args">
        <template #icon><span v-html="infoIcon" /></template>
      </Tooltip>
    `,
  }),
}

/* ── All Orientations ── */

export const AllOrientations: Story = {
  name: 'All orientations',
  render: () => ({
    components: { Tooltip },
    setup() { return { infoIcon } },
    template: `
      <div style="display: flex; gap: 120px; align-items: flex-start;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <p style="margin: 0; font-size: 14px; font-weight: 500; color: #242C33;">Center</p>
          <Tooltip text="Tooltip" ariaLabel="Center tooltip" caretAlign="center" :closeOnClickOutside="true" :closeOnEscape="true">
            <template #icon><span v-html="infoIcon" /></template>
          </Tooltip>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <p style="margin: 0; font-size: 14px; font-weight: 500; color: #242C33;">Right</p>
          <Tooltip text="Tooltip" ariaLabel="Right tooltip" caretAlign="right" :closeOnClickOutside="true" :closeOnEscape="true">
            <template #icon><span v-html="infoIcon" /></template>
          </Tooltip>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <p style="margin: 0; font-size: 14px; font-weight: 500; color: #242C33;">Left</p>
          <Tooltip text="Tooltip" ariaLabel="Left tooltip" caretAlign="left" :closeOnClickOutside="true" :closeOnEscape="true">
            <template #icon><span v-html="infoIcon" /></template>
          </Tooltip>
        </div>
      </div>
    `,
  }),
}

/* ── Interactive ── */

export const Interactive: Story = {
  args: {
    text: 'Based on $1,000 down and 60 months at 4.79% APR',
    ariaLabel: 'Payment information',
    caretAlign: 'center',
    closeOnClickOutside: true,
    closeOnEscape: true,
  },
  render: (args) => ({
    components: { Tooltip },
    setup() { return { args, infoIcon } },
    template: `
      <Tooltip v-bind="args">
        <template #icon><span v-html="infoIcon" /></template>
      </Tooltip>
    `,
  }),
}

/* ── SRP payment context ── */

export const SrpPaymentContext: Story = {
  name: 'SRP — Payment info context',
  render: () => ({
    components: { Tooltip },
    setup() { return { infoIcon } },
    template: `
      <div style="display: inline-flex; align-items: center; gap: 4px; font-family: Roboto, sans-serif; font-size: 12px; color: #242C33;">
        <span style="text-decoration: underline; cursor: pointer;">$250—$1,450/mo</span>
        <Tooltip
          text="Based on $1,000 down and 60 months at 4.79% APR"
          ariaLabel="Payment info"
          caretAlign="center"
          :closeOnClickOutside="true"
          :closeOnEscape="true"
        >
          <template #icon><span v-html="infoIcon" /></template>
        </Tooltip>
      </div>
    `,
  }),
}
