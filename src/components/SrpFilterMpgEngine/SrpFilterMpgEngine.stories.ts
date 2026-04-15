import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SrpFilterMpgEngine from './SrpFilterMpgEngine.vue'
import type { EngineTypeOption } from './SrpFilterMpgEngine.vue'

const ENGINE_TYPES: EngineTypeOption[] = [
  { value: 'diesel-6',  label: 'Diesel 6-cyl', count: 8 },
  { value: 'gas-3',     label: 'Gas 3-cyl',    count: 100 },
  { value: 'gas-4',     label: 'Gas 4-cyl',    count: 2100 },
  { value: 'gas-6',     label: 'Gas 6-cyl',    count: 845 },
  { value: 'gas-8',     label: 'Gas 8-cyl',    count: 153 },
  { value: 'hybrid',    label: 'Hybrid',        count: 34 },
]

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterMpgEngine',
  component: SrpFilterMpgEngine,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  args: {
    absMin:      18,
    absMax:      100,
    engineTypes: ENGINE_TYPES,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterMpgEngine>

export default meta
type Story = StoryObj<typeof SrpFilterMpgEngine>

export const Default: Story = {
  name: 'Default (no selection)',
  args: {
    minMpg:           18,
    maxMpg:           100,
    selectedEngines:  [],
    committedEngines: [],
  },
}

export const MpgRangeSelected: Story = {
  name: 'MPG range narrowed',
  args: {
    minMpg:           25,
    maxMpg:           60,
    selectedEngines:  [],
    committedEngines: [],
  },
}

export const EngineSelected: Story = {
  name: 'Engine type selected (Gas 4-cyl)',
  args: {
    minMpg:           18,
    maxMpg:           100,
    selectedEngines:  ['gas-4'],
    committedEngines: [],
  },
}

export const ReturningEngines: Story = {
  name: 'Returning — selected engine floats to top',
  args: {
    minMpg:           18,
    maxMpg:           100,
    selectedEngines:  ['gas-4'],
    committedEngines: ['gas-4'],
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { SrpFilterMpgEngine },
    setup() {
      const minMpg = ref(18)
      const maxMpg = ref(100)
      const selEngines = ref<string[]>([])
      return { args, minMpg, maxMpg, selEngines }
    },
    template: `
      <div>
        <SrpFilterMpgEngine
          :absMin="args.absMin"
          :absMax="args.absMax"
          :engineTypes="args.engineTypes"
          v-model:minMpg="minMpg"
          v-model:maxMpg="maxMpg"
          v-model:selectedEngines="selEngines"
        />
        <p style="padding:8px 16px;font-size:12px;color:#666">
          MPG: {{ minMpg }}–{{ maxMpg }} ·
          Engines: {{ selEngines.length ? selEngines.join(', ') : 'all' }}
        </p>
      </div>
    `,
  }),
}
