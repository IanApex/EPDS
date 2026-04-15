import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SrpFilterColor from './SrpFilterColor.vue'
import type { ColorOption } from './SrpFilterColor.vue'

const EXTERIOR_COLORS: ColorOption[] = [
  { value: 'white',  label: 'White',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #ffffff, #e0e0e0)' },
  { value: 'silver', label: 'Silver', count: 8, swatch: 'radial-gradient(circle at 35% 35%, #d0d3d6, #9ba0a5)' },
  { value: 'gold',   label: 'Gold',   count: 8, swatch: 'radial-gradient(circle at 35% 35%, #e6b422, #b8860b)' },
  { value: 'gray',   label: 'Gray',   count: 8, swatch: 'radial-gradient(circle at 35% 35%, #a0a4a8, #6b7075)' },
  { value: 'red',    label: 'Red',    count: 8, swatch: 'radial-gradient(circle at 35% 35%, #e8242c, #a01020)' },
  { value: 'orange', label: 'Orange', count: 8, swatch: 'radial-gradient(circle at 35% 35%, #f39c12, #d35400)' },
  { value: 'yellow', label: 'Yellow', count: 8, swatch: 'radial-gradient(circle at 35% 35%, #f1c40f, #d4ac0d)' },
  { value: 'green',  label: 'Green',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #3a7d28, #1a4a10)' },
  { value: 'blue',   label: 'Blue',   count: 8, swatch: 'radial-gradient(circle at 35% 35%, #2980b9, #1a4f7a)' },
  { value: 'purple', label: 'Purple', count: 8, swatch: 'radial-gradient(circle at 35% 35%, #9b59b6, #6c3483)' },
  { value: 'beige',  label: 'Beige',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #f5e6c8, #d2b48c)' },
  { value: 'brown',  label: 'Brown',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #a0724a, #6d4c2e)' },
  { value: 'black',  label: 'Black',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #555555, #1a1a1a)' },
]

const INTERIOR_COLORS: ColorOption[] = [
  { value: 'black',  label: 'Black',  count: 12, swatch: 'radial-gradient(circle at 35% 35%, #555555, #1a1a1a)' },
  { value: 'gray',   label: 'Gray',   count: 10, swatch: 'radial-gradient(circle at 35% 35%, #a0a4a8, #6b7075)' },
  { value: 'beige',  label: 'Beige',  count: 6,  swatch: 'radial-gradient(circle at 35% 35%, #f5e6c8, #d2b48c)' },
  { value: 'brown',  label: 'Brown',  count: 4,  swatch: 'radial-gradient(circle at 35% 35%, #a0724a, #6d4c2e)' },
  { value: 'red',    label: 'Red',    count: 2,  swatch: 'radial-gradient(circle at 35% 35%, #e8242c, #a01020)' },
  { value: 'white',  label: 'White',  count: 1,  swatch: 'radial-gradient(circle at 35% 35%, #ffffff, #e0e0e0)' },
]

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterColor',
  component: SrpFilterColor,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  args: {
    exteriorColors: EXTERIOR_COLORS,
    interiorColors: INTERIOR_COLORS,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterColor>

export default meta
type Story = StoryObj<typeof SrpFilterColor>

export const Default: Story = {
  name: 'Default — Exterior (no selection)',
  args: {
    mode:              'exterior',
    selectedExterior:  [],
    selectedInterior:  [],
    committedExterior: [],
    committedInterior: [],
  },
}

export const RedSelected: Story = {
  name: 'Red selected (Exterior)',
  args: {
    mode:              'exterior',
    selectedExterior:  ['red'],
    selectedInterior:  [],
    committedExterior: [],
    committedInterior: [],
  },
}

export const ReturningExterior: Story = {
  name: 'Returning — Red floats to top',
  args: {
    mode:              'exterior',
    selectedExterior:  ['red'],
    selectedInterior:  [],
    committedExterior: ['red'],
    committedInterior: [],
  },
}

export const InteriorView: Story = {
  name: 'Interior tab',
  args: {
    mode:              'interior',
    selectedExterior:  [],
    selectedInterior:  [],
    committedExterior: [],
    committedInterior: [],
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: (args) => ({
    components: { SrpFilterColor },
    setup() {
      const mode    = ref<'exterior' | 'interior'>('exterior')
      const selExt  = ref<string[]>([])
      const selInt  = ref<string[]>([])
      return { args, mode, selExt, selInt }
    },
    template: `
      <div>
        <SrpFilterColor
          :exteriorColors="args.exteriorColors"
          :interiorColors="args.interiorColors"
          v-model:mode="mode"
          v-model:selectedExterior="selExt"
          v-model:selectedInterior="selInt"
        />
        <p style="padding:8px 16px;font-size:12px;color:#666">
          Mode: {{ mode }} ·
          Exterior: {{ selExt.length ? selExt.join(', ') : 'all' }} ·
          Interior: {{ selInt.length ? selInt.join(', ') : 'all' }}
        </p>
      </div>
    `,
  }),
}
