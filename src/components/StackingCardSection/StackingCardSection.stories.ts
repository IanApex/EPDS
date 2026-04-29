import type { Meta, StoryObj } from '@storybook/vue3-vite'

import StackingCardSection from './StackingCardSection.vue'

import drivePhotoUrl    from '../../../Photos/Sonic Automotive/yellow car.png'
import sellPhotoUrl     from '../../../Photos/Sonic Automotive/saheromb.jpg'
import servicePhotoUrl  from '../../../Photos/Sonic Automotive/saherodt.jpg'

import steeringIconSvg  from '../../../icon/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Steering.svg?raw'
import priceTagIconSvg  from '../../../icon/Style=Finance, Detail=Payment, Icon=Price-Tag.svg?raw'
import engineIconSvg    from '../../../icon/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Engine.svg?raw'

const meta = {
  title: 'Organisms/StackingCardSection',
  component: StackingCardSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Scroll-driven stacking card section. Cards begin fully expanded; ' +
          'as the user scrolls down each subsequent card rises to cover the one above it, ' +
          'leaving only the icon + heading strip (PEEK_H = 80 px) peeking out. ' +
          'Scroll back up to progressively re-expand. ' +
          'On mobile (< 600 px) the animation is disabled and cards render as a plain ' +
          'vertical stack.',
      },
    },
  },
  args: {
    title: 'Car ownership made easy',
    subtitle: 'Everything you need, all in one place.',
    cards: [
      {
        imageUrl: drivePhotoUrl,
        imageAlt: '',
        iconSvg: steeringIconSvg,
        heading: 'Drive',
        body:
          'Shop thousands of new and pre-owned vehicles from the comfort of your home ' +
          'or visit one of our conveniently located dealerships nationwide.',
        ctaLabel: 'Shop vehicles',
        imagePosition: 'left',
        imageProportion: 'large',
      },
      {
        imageUrl: sellPhotoUrl,
        imageAlt: '',
        iconSvg: priceTagIconSvg,
        heading: 'Sell',
        body:
          'Get a competitive offer for your current vehicle in minutes. ' +
          'Trade it in or sell it outright — the choice is yours.',
        ctaLabel: 'Get an offer',
        imagePosition: 'right',
        imageProportion: 'large',
      },
      {
        imageUrl: servicePhotoUrl,
        imageAlt: '',
        iconSvg: engineIconSvg,
        heading: 'Service',
        body:
          'From routine maintenance to collision repair, our service and parts centers ' +
          'are spread across the country to help you whenever you need us.',
        ctaLabel: 'Find service & parts centers',
        imagePosition: 'left',
        imageProportion: 'large',
      },
    ],
  },
} satisfies Meta<typeof StackingCardSection>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default — full-page animated layout. Scroll down inside the
 * story canvas to watch the cards stack. The section extends
 * ~800 px beyond the viewport to create the scroll track.
 */
export const Default: Story = {}

/**
 * Mobile — animation disabled, cards render as a plain vertical
 * stack. Image stacks above content per the ImageContentCard
 * mobile spec.
 */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}
