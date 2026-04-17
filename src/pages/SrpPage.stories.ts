import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SrpPage from './SrpPage.vue'

const meta = {
  title: 'Pages/SRP',
  component: SrpPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SrpPage>

export default meta
type Story = StoryObj<typeof meta>

export const EchoPark: Story = {
  name: 'EchoPark Brand',
  globals: {
    brand: 'echopark',
  },
}

export const SonicAutomotive: Story = {
  name: 'Sonic Automotive Brand',
  args: {
    brandName: 'Sonic Automotive',
  },
  globals: {
    brand: 'sonic',
  },
}
