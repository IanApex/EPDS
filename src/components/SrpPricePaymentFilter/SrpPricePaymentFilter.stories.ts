import type { Meta, StoryObj } from '@storybook/vue3'
import SrpPricePaymentFilter from './SrpPricePaymentFilter.vue'

const meta = {
  title:     'Molecules/SRP Filters/PricePaymentFilter',
  component: SrpPricePaymentFilter,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    priceAbsMin:   { control: 'number' },
    priceAbsMax:   { control: 'number' },
    priceMin:      { control: 'number' },
    priceMax:      { control: 'number' },
    paymentAbsMin: { control: 'number' },
    paymentAbsMax: { control: 'number' },
    paymentMin:    { control: 'number' },
    paymentMax:    { control: 'number' },
  },
} satisfies Meta<typeof SrpPricePaymentFilter>

export default meta
type Story = StoryObj<typeof meta>

/** Default state — "Price" tab, full range (no filter applied) */
export const PriceDefault: Story = {
  args: {
    priceAbsMin: 5_000,
    priceAbsMax: 70_000,
    priceMin:    5_000,
    priceMax:    70_000,
  },
  decorators: [() => ({ template: '<div style="width:306px;background:#fff;padding:0"><story /></div>' })],
}

/** Price tab with a narrowed range applied */
export const PriceFiltered: Story = {
  args: {
    priceAbsMin: 5_000,
    priceAbsMax: 70_000,
    priceMin:    10_000,
    priceMax:    40_000,
  },
  decorators: [() => ({ template: '<div style="width:306px;background:#fff;padding:0"><story /></div>' })],
}

/** "Payment" tab, full range */
export const PaymentDefault: Story = {
  args: {
    paymentAbsMin: 250,
    paymentAbsMax: 1_250,
    paymentMin:    250,
    paymentMax:    1_250,
  },
  decorators: [() => ({ template: '<div style="width:306px;background:#fff;padding:0"><story /></div>' })],
}

/** "Payment" tab with a narrowed range applied */
export const PaymentFiltered: Story = {
  args: {
    paymentAbsMin: 250,
    paymentAbsMax: 1_250,
    paymentMin:    500,
    paymentMax:    900,
  },
  decorators: [() => ({ template: '<div style="width:306px;background:#fff;padding:0"><story /></div>' })],
}

/** Fully interactive — try both tabs, drag sliders, type values */
export const Interactive: Story = {
  render: (args) => ({
    components: { SrpPricePaymentFilter },
    setup() {
      const { ref } = window.Vue ?? { ref: () => ({ value: 0 }) }
      const priceMin   = ref(args.priceMin   ?? 5_000)
      const priceMax   = ref(args.priceMax   ?? 70_000)
      const paymentMin = ref(args.paymentMin ?? 250)
      const paymentMax = ref(args.paymentMax ?? 1_250)
      return { args, priceMin, priceMax, paymentMin, paymentMax }
    },
    template: `
      <div style="width:306px;background:#fff;padding:0;font-family:Roboto,sans-serif">
        <SrpPricePaymentFilter
          v-bind="args"
          v-model:priceMin="priceMin"
          v-model:priceMax="priceMax"
          v-model:paymentMin="paymentMin"
          v-model:paymentMax="paymentMax"
        />
        <div style="padding:16px;font-size:12px;color:#666">
          Price: \${{ priceMin.toLocaleString() }} – \${{ priceMax.toLocaleString() }}<br/>
          Payment: \${{ paymentMin }} – \${{ paymentMax }}
        </div>
      </div>
    `,
  }),
  args: {
    priceAbsMin:   5_000,
    priceAbsMax:  70_000,
    priceMin:      5_000,
    priceMax:     70_000,
    paymentAbsMin:   250,
    paymentAbsMax: 1_250,
    paymentMin:      250,
    paymentMax:    1_250,
  },
}
