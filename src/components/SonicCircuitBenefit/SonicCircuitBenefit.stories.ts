import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SonicCircuitBenefit from './SonicCircuitBenefit.vue'

/* Raw SVG strings — each is rewritten to currentColor by the
 * atom's `:deep()` rule, so they all render in the same
 * `#D0D4D9` against the disk regardless of their source fill. */
import mapPinSvg   from '../../../icon/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'
import coinSvg     from '../../../icon/Style=Finance, Detail=Payment, Icon=Coin.svg?raw'
import steeringSvg from '../../../icon/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Steering.svg?raw'
import medalSvg    from '../../../icon/Icon Type=Vehicle Descriptors, Size=Small, Theme=Medal.svg?raw'

const meta = {
  title: 'Atoms/SonicCircuitBenefit',
  component: SonicCircuitBenefit,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'sonic-navy',
      values: [
        { name: 'sonic-navy', value: '#25303D' },
      ],
    },
    docs: {
      description: {
        component:
          'Single icon-on-circle + caption tile used by `SonicCircuit`. ' +
          'Renders a 102 px translucent-white disk on desktop and a ' +
          '64 px disk on mobile; the inner SVG inherits `currentColor` ' +
          '(`#D0D4D9`) so a single icon source tints uniformly against ' +
          'the dark section background. Pass the icon SVG as a raw ' +
          'string via the `iconSvg` prop (import with `?raw`).',
      },
    },
  },
  args: {
    caption: 'Earn points on every purchase, trade, and service across the nation',
    iconSvg: mapPinSvg,
  },
  argTypes: {
    caption: { control: 'text' },
    iconSvg: { control: false },
  },
} satisfies Meta<typeof SonicCircuitBenefit>

export default meta
type Story = StoryObj<typeof meta>

export const MapPin: Story = {}

export const Coin: Story = {
  args: {
    caption: 'Redeem points for free or discounted service visits, merch, or speedway tickets',
    iconSvg: coinSvg,
  },
}

export const Steering: Story = {
  args: {
    caption: 'Use your points toward your next ride at any Sonic store',
    iconSvg: steeringSvg,
  },
}

export const Medal: Story = {
  args: {
    caption: 'Service & purchase priority for quicker visits',
    iconSvg: medalSvg,
  },
}

/** Mobile preview — same atom, viewport drops it to the 64 px disk. */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}
