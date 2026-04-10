import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Pagination from './Pagination.vue'

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Standard pagination control with arrow buttons, numbered pages inside a pill container, ' +
          'and smart ellipsis logic. Arrow buttons hide (opacity 0) when at the first/last page.\n\n' +
          '**Number states:** Default, Hover (Accent90 bg + bold), Pressed, Active (Accent40 bg, white), Focus (Accent80 ring)\n\n' +
          '**Arrow states:** Default (white, Neutral90 border), Hover (Accent90 bg), Pressed, Focus (Accent80 ring)\n\n' +
          'On mobile (< 600px) the pill container stretches to fill available width.',
      },
    },
  },
  argTypes: {
    totalPages: { control: { type: 'number', min: 1, max: 500 } },
    modelValue: { control: { type: 'number', min: 1 } },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPageActive: Story = {
  name: 'First Page Active',
  args: {
    totalPages: 217,
    modelValue: 1,
  },
}

export const Pages2To3Active: Story = {
  name: 'Pages 2–3 Active',
  args: {
    totalPages: 217,
    modelValue: 3,
  },
}

export const MiddlePageActive: Story = {
  name: 'Middle Page Active',
  args: {
    totalPages: 217,
    modelValue: 4,
  },
}

export const LastPageActive: Story = {
  name: 'Last Page Active',
  args: {
    totalPages: 217,
    modelValue: 217,
  },
}

export const Only2Pages: Story = {
  name: 'Only 2 Pages',
  args: {
    totalPages: 2,
    modelValue: 1,
  },
}

export const Only3Pages: Story = {
  name: 'Only 3 Pages',
  args: {
    totalPages: 3,
    modelValue: 3,
  },
}

export const Interactive: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1)
      return { page }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; font-family: Roboto, sans-serif;">
        <Pagination v-model="page" :totalPages="217" />
        <p style="font-size: 14px; color: #666B70;">Current page: {{ page }} / 217</p>
      </div>
    `,
  }),
}

export const AllPagePositions: Story = {
  name: 'All Page Positions',
  render: () => ({
    components: { Pagination },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47;">First page active</span>
          <Pagination :totalPages="217" :modelValue="1" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47;">Pages 2–3 active</span>
          <Pagination :totalPages="217" :modelValue="3" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47;">Middle page active</span>
          <Pagination :totalPages="217" :modelValue="4" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47;">Last page active</span>
          <Pagination :totalPages="217" :modelValue="217" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47;">Only 2 pages</span>
          <Pagination :totalPages="2" :modelValue="1" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47;">Only 3 pages</span>
          <Pagination :totalPages="3" :modelValue="3" />
        </div>
      </div>
    `,
  }),
}

export const MobileWidth: Story = {
  name: 'Mobile Width (330px)',
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(4)
      return { page }
    },
    template: `
      <div style="max-width: 330px;">
        <Pagination v-model="page" :totalPages="217" />
        <p style="font-family: Roboto, sans-serif; font-size: 12px; color: #666B70; margin-top: 8px;">Page {{ page }} / 217</p>
      </div>
    `,
  }),
}
