import type { Meta, StoryObj } from '@storybook/vue3-vite'

import SonicCircuit from './SonicCircuit.vue'
import type { SonicCircuitBenefitItem } from './SonicCircuit.vue'

/* Raw SVG strings for each benefit. Source SVGs use a hardcoded
 * Neutral fill (#242C33 / #313D47), but the `SonicCircuitBenefit`
 * atom rewrites every fill to `currentColor` via `:deep()`, so the
 * icons render in `#D0D4D9` inside the section's translucent
 * circles regardless of source colour. */
import mapPinSvg   from '../../../icon/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'
import coinSvg     from '../../../icon/Style=Finance, Detail=Payment, Icon=Coin.svg?raw'
import steeringSvg from '../../../icon/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Steering.svg?raw'
import medalSvg    from '../../../icon/Icon Type=Vehicle Descriptors, Size=Small, Theme=Medal.svg?raw'

const seedBenefits: SonicCircuitBenefitItem[] = [
  {
    id: 'earn',
    iconSvg: mapPinSvg,
    caption: 'Earn points on every purchase, trade, and service across the nation',
  },
  {
    id: 'redeem',
    iconSvg: coinSvg,
    caption: 'Redeem points for free or discounted service visits, merch, or speedway tickets',
  },
  {
    id: 'next-ride',
    iconSvg: steeringSvg,
    caption: 'Use your points toward your next ride at any Sonic store',
  },
  {
    id: 'priority',
    iconSvg: medalSvg,
    caption: 'Service & purchase priority for quicker visits',
  },
]

const meta = {
  title: 'Organisms/SonicCircuit',
  component: SonicCircuit,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'neutral-95' },
    docs: {
      description: {
        component:
          'Full-bleed dark-navy section pitching the Sonic Circuit ' +
          'rewards membership. Composes a row of `SonicCircuitBenefit` ' +
          'atoms (icon-on-circle + caption) between a centered title ' +
          'block and a primary `BaseButton` CTA. Every label and the ' +
          'benefit list is prop-driven, so the same organism can host ' +
          'any "membership benefits" section on any brand — the CTA ' +
          'fills with the brand\u2019s primary colour automatically.',
      },
    },
  },
  args: {
    benefits: seedBenefits,
    ctaHref: '#join-circuit',
  },
} satisfies Meta<typeof SonicCircuit>

export default meta
type Story = StoryObj<typeof meta>

/** Default Sonic Circuit pitch matching the Figma frame. */
export const Default: Story = {}

/** Mobile (< 600 px) — benefits stack vertically; type scales down. */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}

/** Three benefits — proves the row centers its tiles regardless of count. */
export const ThreeBenefits: Story = {
  args: {
    benefits: seedBenefits.slice(0, 3),
  },
}

/** Two benefits — minimum useful count, tiles still center horizontally. */
export const TwoBenefits: Story = {
  args: {
    benefits: seedBenefits.slice(0, 2),
  },
}

/** Custom copy + a generic-sounding label demonstrate the section is
 *  reusable beyond Sonic-branded contexts (any benefits-row layout). */
export const CustomCopy: Story = {
  args: {
    title: 'EchoPark Rewards',
    subtitle: 'Member perks for every step of your ownership journey.',
    ctaLabel: 'Become a member',
    benefits: [
      { id: 'a', iconSvg: mapPinSvg,   caption: 'Reserve any car at any of our nationwide stores' },
      { id: 'b', iconSvg: coinSvg,     caption: 'Save more with members-only pricing on every vehicle' },
      { id: 'c', iconSvg: steeringSvg, caption: 'Skip the line on test drives and trade-in appraisals' },
      { id: 'd', iconSvg: medalSvg,    caption: 'Priority service & maintenance scheduling' },
    ],
  },
}
