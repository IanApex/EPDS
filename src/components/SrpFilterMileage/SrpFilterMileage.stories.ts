import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SrpFilterMileage from './SrpFilterMileage.vue'

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterMileage',
  component: SrpFilterMileage,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  args: {
    absMax:     150_000,
    modelValue: 150_000,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterMileage>

export default meta
type Story = StoryObj<typeof SrpFilterMileage>

export const Default: Story = {
  name: 'Default (150k max)',
}

export const Selected60k: Story = {
  name: '60,000 or less selected',
  args: {
    modelValue: 60_000,
  },
}

export const HighCeiling: Story = {
  name: 'High ceiling (220k — result set has 212k car)',
  args: {
    absMax:     220_000,
    modelValue: 220_000,
  },
}

export const LowCeiling: Story = {
  name: 'Low ceiling (50k)',
  args: {
    absMax:     50_000,
    modelValue: 50_000,
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { SrpFilterMileage },
    setup() {
      const mileage = ref(args.modelValue ?? 150_000)
      return { args, mileage }
    },
    template: `
      <div>
        <SrpFilterMileage
          :absMax="args.absMax"
          v-model="mileage"
        />
        <p style="padding:8px 16px;font-size:12px;color:#666">
          Selected: {{ mileage.toLocaleString() }} or less
        </p>
      </div>
    `,
  }),
}
