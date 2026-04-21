import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VdpPage from './VdpPage.vue'

const meta = {
  title: 'Pages/VDP',
  component: VdpPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Vehicle Detail Page demo — **desktop, Sonic-only, above-the-fold**. ' +
          'Composes `GlobalHeader` (Sonic variant) + `VdpGallery` + `VdpSummary` + ' +
          '`GlobalFooter` (Sonic variant). Below-the-fold sections are intentionally ' +
          'out of scope for this first pass.',
      },
    },
  },
} satisfies Meta<typeof VdpPage>

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
