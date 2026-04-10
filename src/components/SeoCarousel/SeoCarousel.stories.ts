import type { Meta, StoryObj } from '@storybook/vue3'
import SeoCarousel from './SeoCarousel.vue'
import type { SeoCarouselItem } from './SeoCarousel.vue'

const MAKES: SeoCarouselItem[] = [
  { label: 'Used Acura', href: '/used-acura' },
  { label: 'Used Buick', href: '/used-buick' },
  { label: 'Used Chrysler', href: '/used-chrysler' },
  { label: 'Used Ford', href: '/used-ford' },
  { label: 'Used Honda', href: '/used-honda' },
  { label: 'Used Jaguar', href: '/used-jaguar' },
  { label: 'Used Mitsubishi', href: '/used-mitsubishi' },
  { label: 'Used Mazda', href: '/used-mazda' },
  { label: 'Used Ram', href: '/used-ram' },
  { label: 'Used Toyota', href: '/used-toyota' },
  { label: 'Used Audi', href: '/used-audi' },
  { label: 'Used Cadillac', href: '/used-cadillac' },
  { label: 'Used Dodge', href: '/used-dodge' },
]

const BODY_STYLES: SeoCarouselItem[] = [
  { label: 'Used Convertibles', href: '/used-convertibles' },
  { label: 'Used Hatchbacks', href: '/used-hatchbacks' },
  { label: 'Used SUVs', href: '/used-suvs' },
  { label: 'Used Coupes', href: '/used-coupes' },
  { label: 'Used Sedans', href: '/used-sedans' },
  { label: 'Used Minivans/Vans', href: '/used-minivans' },
  { label: 'Crossovers', href: '/crossovers' },
  { label: 'Trucks', href: '/trucks' },
  { label: 'Wagons', href: '/wagons' },
]

const meta = {
  title: 'Molecules/SeoCarousel',
  component: SeoCarousel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal SEO link carousel inside a pill-shaped container. Displays scrollable keyword links with left/right chevron navigation. Used at the bottom of SRP and location pages for internal linking.',
      },
    },
  },
  argTypes: {
    heading: { control: 'text' },
    items: { control: 'object' },
  },
} satisfies Meta<typeof SeoCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const ByMake: Story = {
  args: {
    heading: 'Used cars by make',
    items: MAKES,
  },
}

export const ByBodyStyle: Story = {
  args: {
    heading: 'Used cars by body style',
    items: BODY_STYLES,
  },
}

export const ByMakeInCity: Story = {
  args: {
    heading: 'Used cars in Dallas by make',
    items: MAKES,
  },
}

export const FewItems: Story = {
  args: {
    heading: 'Popular makes',
    items: MAKES.slice(0, 4),
  },
}

export const MobileWidth: Story = {
  args: {
    heading: 'Used cars in Dallas by make',
    items: MAKES,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  decorators: [
    () => ({
      template: '<div style="max-width: 327px"><story /></div>',
    }),
  ],
}

export const AllVariants: Story = {
  render: () => ({
    components: { SeoCarousel },
    setup() {
      return { MAKES, BODY_STYLES }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px; max-width: 1071px">
        <SeoCarousel heading="Used cars by make" :items="MAKES" />
        <SeoCarousel heading="Used cars by body style" :items="BODY_STYLES" />
      </div>
    `,
  }),
}

export const AllVariantsMobile: Story = {
  render: () => ({
    components: { SeoCarousel },
    setup() {
      return { MAKES, BODY_STYLES }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 40px; max-width: 327px">
        <SeoCarousel heading="Used cars in Dallas by make" :items="MAKES" />
        <SeoCarousel heading="Used cars in Dallas by body type" :items="BODY_STYLES" />
      </div>
    `,
  }),
}
