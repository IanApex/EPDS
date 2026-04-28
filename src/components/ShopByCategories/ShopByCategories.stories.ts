import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ShopByCategories from './ShopByCategories.vue'

import commutersImg from '../../../Photos/Sonic Automotive/person walk.png'
import safetyImg from '../../../Photos/Sonic Automotive/buckle kid.png'
import lowMaintImg from '../../../Photos/Sonic Automotive/Sun chick.png'
import budgetImg from '../../../Photos/Sonic Automotive/paper people.png'
import reliableImg from '../../../Photos/Sonic Automotive/yellow car.png'

import familyImg from '../../../Photos/People/Group 248.png'
import cargoImg from '../../../Photos/Car only/image 2.png'
import adventureImg from '../../../Photos/People/shutterstock_1410313490.png'
import suvImg from '../../../Photos/VDP cars/image 16.png'

import sedanImg from '../../../Photos/VDP cars/cfa99e19968d4f81aa521218dbaf67c2 1.png'
import coupeImg from '../../../Photos/VDP cars/52a8fde74d96462597f12bb544d62cf5 1.png'
import convertibleImg from '../../../Photos/People/Hero image.png'
import luxRearImg from '../../../Photos/Car only/shutterstock_1574869534.png'

import nascarPackImg from '../../../Photos/Nascar promo/GettyImages-1432054667.png'
import nascarCamaroImg from '../../../Photos/Nascar promo/GettyImages-1432017440.png'
import speedwayImg from '../../../Photos/Nascar promo/GettyImages-1494366714.png'

const seedCategories = [
  {
    id: 'starting-out',
    label: 'Starting out',
    tiles: [
      { label: 'Commuters',          imageUrl: commutersImg, href: '#srp-commuters' },
      { label: 'High safety ratings', imageUrl: safetyImg,    href: '#srp-safety' },
      { label: 'Low maintenance',    imageUrl: lowMaintImg,  href: '#srp-low-maintenance' },
      { label: 'Budget-friendly',    imageUrl: budgetImg,    href: '#srp-budget' },
      { label: 'Reliable brands',    imageUrl: reliableImg,  href: '#srp-reliable' },
    ],
  },
  {
    id: 'room-to-grow',
    label: 'Room to grow',
    tiles: [
      { label: 'Family SUVs',        imageUrl: familyImg,    href: '#srp-family-suv' },
      { label: 'Three-row seating',  imageUrl: cargoImg,     href: '#srp-three-row' },
      { label: 'Weekend adventures', imageUrl: adventureImg, href: '#srp-adventure' },
      { label: 'Top safety picks',   imageUrl: suvImg,       href: '#srp-top-safety' },
      { label: 'Hybrid & EV',        imageUrl: safetyImg,    href: '#srp-hybrid-ev' },
    ],
  },
  {
    id: 'luxury-rides',
    label: 'Luxury rides',
    tiles: [
      { label: 'Executive sedans',     imageUrl: sedanImg,       href: '#srp-executive-sedan' },
      { label: 'Performance coupes',   imageUrl: coupeImg,       href: '#srp-performance-coupe' },
      { label: 'Premium SUVs',         imageUrl: suvImg,         href: '#srp-premium-suv' },
      { label: 'Convertibles',         imageUrl: convertibleImg, href: '#srp-convertibles' },
      { label: 'Certified pre-owned',  imageUrl: luxRearImg,     href: '#srp-cpo-luxury' },
    ],
  },
  {
    id: 'thrill-seeking-toys',
    label: 'Thrill-seeking toys',
    tiles: [
      { label: 'Sports cars',          imageUrl: coupeImg,        href: '#srp-sports-car' },
      { label: 'Track-ready performance', imageUrl: nascarPackImg, href: '#srp-track-ready' },
      { label: 'Iconic muscle',        imageUrl: nascarCamaroImg, href: '#srp-muscle' },
      { label: 'Convertibles',         imageUrl: convertibleImg,  href: '#srp-thrill-convertibles' },
      { label: 'Speedway thrills',     imageUrl: speedwayImg,     href: '#srp-speedway' },
    ],
  },
]

const meta = {
  title: 'Organisms/ShopByCategories',
  component: ShopByCategories,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Tabbed marketing grid of `ShopTile`s for the homepage "shop by …" ' +
          'patterns. Title + subhead + tab strip live in a 1440 px header ' +
          'rail; the tile grid lives in a 1280 px rail beneath. On mobile ' +
          'the tab strip scrolls horizontally and the tiles stack vertically.',
      },
    },
  },
  args: {
    title: 'A ride for every moment',
    subtitle: 'What\u2019s yours?',
    categories: seedCategories,
  },
} satisfies Meta<typeof ShopByCategories>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All four tabs from the Sonic homepage seed. Click any tab — or use ' +
          'Left / Right arrows when the tab list is focused — to switch tile sets.',
      },
    },
  },
}

export const StartingOut: Story = {
  name: 'Starting out (default tab)',
  args: { modelValue: 'starting-out' },
}

export const RoomToGrow: Story = {
  args: { modelValue: 'room-to-grow' },
}

export const LuxuryRides: Story = {
  args: { modelValue: 'luxury-rides' },
}

export const ThrillSeekingToys: Story = {
  args: { modelValue: 'thrill-seeking-toys' },
}

/** Three-tile category — fills a single 3-up row with no second row. */
export const ThreeTilesOnly: Story = {
  args: {
    title: 'Quick picks',
    subtitle: 'Three-up demo',
    categories: [
      {
        id: 'three',
        label: 'Three',
        tiles: [
          { label: 'Commuters',          imageUrl: commutersImg, href: '#' },
          { label: 'High safety ratings', imageUrl: safetyImg,    href: '#' },
          { label: 'Low maintenance',    imageUrl: lowMaintImg,  href: '#' },
        ],
      },
    ],
  },
}

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
}
