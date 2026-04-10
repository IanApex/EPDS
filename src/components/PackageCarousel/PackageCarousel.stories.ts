import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PackageCarousel from './PackageCarousel.vue'
import type { PackageItem } from './PackageCarousel.vue'

const twoPackages: PackageItem[] = [
  {
    title: 'Transmission: 8-Speed Auto...',
    description: 'Comfort Access Keyless Entry, 4-Zone Automatic Climate Control, SiriusXM Satellite Radio w/1 Year...',
    seeMoreHref: '#',
  },
  {
    title: 'Engine: 5.7L V8 HEMI MDS...',
    description: 'Electronically Controlled Throttle, Engine Oil Heat Exchanger, GVWR: 6,900 lbs, Heavy Duty Engine Cool.',
  },
]

const threePackages: PackageItem[] = [
  ...twoPackages,
  {
    title: 'Convenience Package',
    description: 'Comfort Access Keyless Entry, 4-Zone Automatic Climate Control, SiriusXM Satellite Radio w/1 Year...',
    seeMoreHref: '#',
  },
]

const fivePackages: PackageItem[] = [
  ...threePackages,
  {
    title: 'Comfort Package',
    description: 'Comfort Access Keyless Entry, 4-Zone Automatic Climate Control, SiriusXM Satellite Radio w/1 Year...',
    seeMoreHref: '#',
  },
  {
    title: 'Luxury Package',
    description: 'Electronically Controlled Throttle, Engine Oil Heat Exchanger, GVWR: 6,900 lbs, Heavy Duty Engine Cool.',
  },
]

const sixPackages: PackageItem[] = [
  ...fivePackages,
  {
    title: 'Quick order package 28h 24V',
    description: 'Engine: 3.6L V6 24V VVT UPG I w/ ESS, Transmission: 8-Speed Automatic (850RE).',
  },
]

const meta = {
  title: 'Organisms/PackageCarousel',
  component: PackageCarousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal card carousel for vehicle packages & installed options (VDP page).\n\n' +
          '**Cards:** 272px wide, 16px radius, 1px Neutral90 border, title + description + optional "See more" link.\n\n' +
          '**< 3 items:** no arrows, no progress bar.\n' +
          '**≥ 3 items:** arrows appear at edges, progress bar fills as you scroll.\n\n' +
          'Uses native CSS scroll-snap for smooth card-by-card scrolling. ' +
          'A white gradient fade on the right edge hints at more content.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    packages: { control: 'object' },
  },
} satisfies Meta<typeof PackageCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const TwoPackages: Story = {
  name: 'Less than 3 (no arrows/progress)',
  args: {
    packages: twoPackages,
  },
}

export const ThreePackages: Story = {
  name: '3 Packages (arrows + progress)',
  args: {
    packages: threePackages,
  },
}

export const FivePackages: Story = {
  name: '5 Packages',
  args: {
    packages: fivePackages,
  },
}

export const SixPackages: Story = {
  name: '6 Packages (long scroll)',
  args: {
    packages: sixPackages,
  },
}

export const ConstrainedWidth: Story = {
  name: 'Constrained Width (800px)',
  render: () => ({
    components: { PackageCarousel },
    setup() {
      return { fivePackages }
    },
    template: `
      <div style="max-width: 800px;">
        <PackageCarousel :packages="fivePackages" />
      </div>
    `,
  }),
}

export const MobileWidth: Story = {
  name: 'Mobile Width (375px)',
  render: () => ({
    components: { PackageCarousel },
    setup() {
      return { fivePackages }
    },
    template: `
      <div style="max-width: 375px; overflow: hidden;">
        <PackageCarousel :packages="fivePackages" />
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { PackageCarousel },
    setup() {
      return { twoPackages, threePackages, fivePackages }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; max-width: 800px;">
        <div>
          <p style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47; margin: 0 0 8px;">2 packages — no controls</p>
          <PackageCarousel :packages="twoPackages" />
        </div>
        <div>
          <p style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47; margin: 0 0 8px;">3 packages — arrows + progress</p>
          <PackageCarousel :packages="threePackages" />
        </div>
        <div>
          <p style="font-family: Roboto, sans-serif; font-size: 12px; font-weight: 700; color: #313D47; margin: 0 0 8px;">5 packages — scrollable</p>
          <PackageCarousel :packages="fivePackages" />
        </div>
      </div>
    `,
  }),
}
