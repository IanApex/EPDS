import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SrpFilterYear from './SrpFilterYear.vue'

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterYear',
  component: SrpFilterYear,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  args: {
    absMin:  2012,
    absMax:  2026,
    minYear: 2012,
    maxYear: 2026,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterYear>

export default meta
type Story = StoryObj<typeof SrpFilterYear>

export const Default: Story = {
  name: 'Default (full range)',
}

export const NarrowRange: Story = {
  name: 'Narrow range selected',
  args: {
    minYear: 2018,
    maxYear: 2022,
  },
}

export const SingleYear: Story = {
  name: 'Single year selected',
  args: {
    minYear: 2020,
    maxYear: 2020,
  },
}

export const SmallResultSet: Story = {
  name: 'Small result set (2019–2024)',
  args: {
    absMin:  2019,
    absMax:  2024,
    minYear: 2019,
    maxYear: 2024,
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { SrpFilterYear },
    setup() {
      const minY = ref(args.minYear ?? 2012)
      const maxY = ref(args.maxYear ?? 2026)
      return { args, minY, maxY }
    },
    template: `
      <div>
        <SrpFilterYear
          :absMin="args.absMin"
          :absMax="args.absMax"
          v-model:minYear="minY"
          v-model:maxYear="maxY"
        />
        <p style="padding:8px 16px;font-size:12px;color:#666">
          Selected: {{ minY }} – {{ maxY }}
        </p>
      </div>
    `,
  }),
}
