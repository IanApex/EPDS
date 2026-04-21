import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SrpFilterVehicleStatus from './SrpFilterVehicleStatus.vue'
import type { VehicleStatusOption } from './SrpFilterVehicleStatus.vue'

const VEHICLE_STATUS_OPTIONS: VehicleStatusOption[] = [
  { value: 'on-lot',     label: 'On the lot', count: 1845 },
  { value: 'in-transit', label: 'In transit', count: 412 },
]

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterVehicleStatus',
  component: SrpFilterVehicleStatus,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component:
          'SRP **Vehicle status** filter — narrows inventory to cars currently **On the lot** or still **In transit** to a store. Multi-select via checkbox; returning selections float to the top when the panel re-opens (matches `SrpFilterCondition` / other SRP filters).',
      },
    },
  },
  args: {
    options: VEHICLE_STATUS_OPTIONS,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterVehicleStatus>

export default meta
type Story = StoryObj<typeof SrpFilterVehicleStatus>

export const Default: Story = {
  name: 'Default (no selection)',
  args: {
    selected:  [],
    committed: [],
  },
}

export const OnLotSelected: Story = {
  name: 'On the lot selected',
  args: {
    selected:  ['on-lot'],
    committed: [],
  },
}

export const InTransitSelected: Story = {
  name: 'In transit selected',
  args: {
    selected:  ['in-transit'],
    committed: [],
  },
}

export const BothSelected: Story = {
  name: 'Both selected',
  args: {
    selected:  ['on-lot', 'in-transit'],
    committed: [],
  },
}

export const Returning: Story = {
  name: 'Returning — prior selection floats to top',
  args: {
    selected:  ['in-transit'],
    committed: ['in-transit'],
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { SrpFilterVehicleStatus },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected }
    },
    template: `
      <div>
        <SrpFilterVehicleStatus
          :options="args.options"
          v-model:selected="selected"
        />
        <p style="padding:8px 16px;font-size:12px;color:#666">
          Selected: {{ selected.length ? selected.join(', ') : 'all' }}
        </p>
      </div>
    `,
  }),
}
