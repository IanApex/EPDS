import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VdpSummary from './VdpSummary.vue'

const meta = {
  title: 'Molecules/VdpSummary',
  component: VdpSummary,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'VDP above-the-fold summary column (right side). Composes the title stack, ' +
          'price row with optional secondary `See Store Price` button, dealer ' +
          'location, primary CTA, and the VIN / Stock # meta row. Reuses `BaseButton` ' +
          'for both buttons so Sonic and EchoPark brand colors apply automatically.\n\n' +
          '**Events** — `@click:cta` for the primary action, `@click:secondary` for the ' +
          'See Store Price button.\n\n' +
          'Figma: node `13948:43443` (Group 1631).',
      },
    },
    backgrounds: { default: 'neutral-95' },
  },
  argTypes: {
    year:           { control: 'text' },
    make:           { control: 'text' },
    model:          { control: 'text' },
    trim:           { control: 'text' },
    price:          { control: 'text' },
    priceLabel:     { control: 'text' },
    secondaryLabel: { control: 'text' },
    dealerName:     { control: 'text' },
    ctaLabel:       { control: 'text' },
    vin:            { control: 'text' },
    stockNumber:    { control: 'text' },
  },
  args: {
    year:           '2026',
    make:           'BMW',
    model:          'X5 M60i',
    trim:           '',
    price:          '50,000',
    priceLabel:     'MSRP',
    secondaryLabel: 'See Store Price',
    dealerName:     'BMW of Birmingham',
    ctaLabel:       'Test Drive',
    vin:            '5UX33EU01T9307218',
    stockNumber:    'T9307218',
  },
} satisfies Meta<typeof VdpSummary>

export default meta
type Story = StoryObj<typeof meta>

const WRAPPER = `
  <div style="padding:32px; max-width:520px;">
    <VdpSummary
      v-bind="args"
      @click:cta="console.log('[VdpSummary] cta click')"
      @click:secondary="console.log('[VdpSummary] secondary click')"
    />
  </div>
`

export const Default: Story = {
  name: 'Default (Sonic BMW hero)',
  render: (args) => ({
    components: { VdpSummary },
    setup() { return { args } },
    template: WRAPPER,
  }),
}

export const LongModelName: Story = {
  name: 'Long model / trim',
  args: {
    make:  'Mercedes-Benz',
    model: 'GLS 580',
    trim:  '4MATIC Premium Plus',
  },
  render: (args) => ({
    components: { VdpSummary },
    setup() { return { args } },
    template: WRAPPER,
  }),
}

export const NoTrim: Story = {
  name: 'No trim',
  args: { trim: '' },
  render: (args) => ({
    components: { VdpSummary },
    setup() { return { args } },
    template: WRAPPER,
  }),
}

export const CustomCtaLabel: Story = {
  name: 'Custom CTA label',
  args: { ctaLabel: 'Reserve now' },
  render: (args) => ({
    components: { VdpSummary },
    setup() { return { args } },
    template: WRAPPER,
  }),
}

export const NoSecondary: Story = {
  name: 'Primary CTA only',
  args: { secondaryLabel: '' },
  parameters: {
    docs: {
      description: {
        story:
          'When the secondary label is blank the `See Store Price` button is hidden — ' +
          'useful for brands / pricing configurations where only the primary action ' +
          'is relevant.',
      },
    },
  },
  render: (args) => ({
    components: { VdpSummary },
    setup() { return { args } },
    template: WRAPPER,
  }),
}
