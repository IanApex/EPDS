import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SrpFilterFeatures from './SrpFilterFeatures.vue'
import type { FeatureOption } from './SrpFilterFeatures.vue'

import thirdRowSeatIcon  from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=3rd Row Seat.svg?raw'
import backupCameraIcon  from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Backup Camera.svg?raw'
import blindSpotIcon     from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Blind Spot.svg?raw'
import heatedSeatsIcon   from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Heated Seats.svg?raw'
import leatherSeatsIcon  from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Leather Seats.svg?raw'
import sunroofIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Sunroof Moonroof.svg?raw'

const POPULAR: FeatureOption[] = [
  { value: '3rd-row-seat',      label: '3rd row seat',       count: 102, icon: thirdRowSeatIcon },
  { value: 'backup-camera',     label: 'Backup camera',      count: 102, icon: backupCameraIcon },
  { value: 'blind-spot-monitor',label: 'Blind spot monitor', count: 102, icon: blindSpotIcon },
  { value: 'heated-seats',      label: 'Heated seats',       count: 102, icon: heatedSeatsIcon },
  { value: 'leather-seats',     label: 'Leather(ette) seats',count: 102, icon: leatherSeatsIcon },
  { value: 'sunroof',           label: 'Sunroof/Moonroof',   count: 102, icon: sunroofIcon },
]

const MORE: FeatureOption[] = [
  { value: 'adaptive-cruise',   label: 'Adaptive cruise control', count: 102 },
  { value: 'android-auto',      label: 'Android Auto',            count: 102 },
  { value: 'apple-carplay',     label: 'Apple CarPlay',           count: 102 },
]

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterFeatures',
  component: SrpFilterFeatures,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  args: {
    popular: POPULAR,
    more:    MORE,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterFeatures>

export default meta
type Story = StoryObj<typeof SrpFilterFeatures>

export const Default: Story = {
  name: 'Default (none selected)',
  args: {
    selected:  [],
    committed: [],
  },
}

export const OneSelected: Story = {
  name: 'One selected (Backup camera)',
  args: {
    selected:  ['backup-camera'],
    committed: [],
  },
}

export const ReturningSelections: Story = {
  name: 'Returning — selected items float to top',
  args: {
    selected:  ['backup-camera', 'android-auto'],
    committed: ['backup-camera', 'android-auto'],
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { SrpFilterFeatures },
    setup() {
      const sel = ref<string[]>([])
      return { args, sel }
    },
    template: `
      <div>
        <SrpFilterFeatures
          :popular="args.popular"
          :more="args.more"
          v-model:selected="sel"
        />
        <p style="padding:8px 16px;font-size:12px;color:#666">
          Selected (AND): {{ sel.length ? sel.join(', ') : 'none' }}
        </p>
      </div>
    `,
  }),
}
