import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SrpFilterDriveTrans from './SrpFilterDriveTrans.vue'
import type { DriveTransOption } from './SrpFilterDriveTrans.vue'

const DRIVE_TYPES: DriveTransOption[] = [
  { value: 'fwd', label: 'FWD',  count: 843 },
  { value: 'awd', label: 'AWD',  count: 1843 },
  { value: '4wd', label: '4WD',  count: 843 },
  { value: 'rwd', label: 'RWD',  count: 843 },
]

const TRANSMISSIONS: DriveTransOption[] = [
  { value: 'automatic', label: 'Automatic', count: 3444 },
  { value: 'manual',    label: 'Manual',    count: 4 },
]

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterDriveTrans',
  component: SrpFilterDriveTrans,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  args: {
    driveTypes:    DRIVE_TYPES,
    transmissions: TRANSMISSIONS,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterDriveTrans>

export default meta
type Story = StoryObj<typeof SrpFilterDriveTrans>

export const Default: Story = {
  name: 'Default (no selection)',
  args: {
    selectedDriveTypes:    [],
    selectedTransmissions: [],
    committedDriveTypes:   [],
    committedTransmissions:[],
  },
}

export const DriveSelected: Story = {
  name: 'FWD selected',
  args: {
    selectedDriveTypes:    ['fwd'],
    selectedTransmissions: [],
    committedDriveTypes:   [],
    committedTransmissions:[],
  },
}

export const BothSelected: Story = {
  name: 'FWD + Automatic selected',
  args: {
    selectedDriveTypes:    ['fwd'],
    selectedTransmissions: ['automatic'],
    committedDriveTypes:   [],
    committedTransmissions:[],
  },
}

export const ReturningBoth: Story = {
  name: 'Returning — selections float to section tops',
  args: {
    selectedDriveTypes:    ['fwd'],
    selectedTransmissions: ['automatic'],
    committedDriveTypes:   ['fwd'],
    committedTransmissions:['automatic'],
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { SrpFilterDriveTrans },
    setup() {
      const selDrives = ref<string[]>([])
      const selTrans  = ref<string[]>([])
      return { args, selDrives, selTrans }
    },
    template: `
      <div>
        <SrpFilterDriveTrans
          :driveTypes="args.driveTypes"
          :transmissions="args.transmissions"
          v-model:selectedDriveTypes="selDrives"
          v-model:selectedTransmissions="selTrans"
        />
        <p style="padding:8px 16px;font-size:12px;color:#666">
          Drive: {{ selDrives.length ? selDrives.join(', ') : 'all' }} ·
          Trans: {{ selTrans.length ? selTrans.join(', ') : 'all' }}
        </p>
      </div>
    `,
  }),
}
