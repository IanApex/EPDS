import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SrpFilterCondition from './SrpFilterCondition.vue'
import type { ConditionOption } from './SrpFilterCondition.vue'

const CONDITION_OPTIONS: ConditionOption[] = [
  { value: 'new',                 label: 'New',                  count: 1245 },
  { value: 'pre-owned',           label: 'Pre-owned',            count: 2110 },
  { value: 'certified-pre-owned', label: 'Certified pre-owned',  count: 389 },
]

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterCondition',
  component: SrpFilterCondition,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
    docs: {
      description: {
        component:
          'Sonic Automotive SRP **Condition** filter — lets shoppers choose between **New**, **Pre-owned**, and **Certified pre-owned** inventory. Only used on the Sonic variant of the SRP (EchoPark only sells used vehicles).',
      },
    },
  },
  args: {
    options: CONDITION_OPTIONS,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterCondition>

export default meta
type Story = StoryObj<typeof SrpFilterCondition>

export const Default: Story = {
  name: 'Default (no selection)',
  args: {
    selected:  [],
    committed: [],
  },
}

export const NewSelected: Story = {
  name: 'New selected',
  args: {
    selected:  ['new'],
    committed: [],
  },
}

export const MultipleSelected: Story = {
  name: 'New + Certified pre-owned',
  args: {
    selected:  ['new', 'certified-pre-owned'],
    committed: [],
  },
}

export const AllSelected: Story = {
  name: 'All three selected',
  args: {
    selected:  ['new', 'pre-owned', 'certified-pre-owned'],
    committed: [],
  },
}

export const Returning: Story = {
  name: 'Returning — prior selections float to top',
  args: {
    selected:  ['pre-owned'],
    committed: ['pre-owned'],
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { SrpFilterCondition },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected }
    },
    template: `
      <div>
        <SrpFilterCondition
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
