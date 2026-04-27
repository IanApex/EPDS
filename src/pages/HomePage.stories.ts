import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HomePage from './HomePage.vue'

const meta = {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sonic Automotive Homepage — page-level composition. Composes ' +
          '`SonicNavBar` (sticky, mega-menu + mobile drawer) and ' +
          '`GlobalFooter` (Sonic-configured). Sections drop in one at a ' +
          'time as they ship; each manages its own internal max-width.',
      },
    },
  },
} satisfies Meta<typeof HomePage>

export default meta
type Story = StoryObj<typeof meta>

export const SonicAutomotive: Story = {
  name: 'Sonic Automotive Brand',
  args: {
    brandName: 'Sonic Automotive',
  },
  globals: {
    brand: 'sonic',
  },
}
