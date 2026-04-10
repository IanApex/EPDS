import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SrpTile from './SrpTile.vue'

const CAR_IMAGE = 'https://content.homenetiol.com/scaler/400/400/eb9a7bffdd55493f8934eb98a5b0be7c.jpg'
const VDP_HREF  = '#'

const meta = {
  title: 'Molecules/SRPTile',
  component: SrpTile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Search Results Page vehicle tile. Reuses `SmallIconButton`, `ArrowCircleButton`, ' +
          '`MediumIconButton`, `TileCta`, and `CarouselDots`.\n\n' +
          '**Props** — bind `v-model:favorited` and `v-model:imageIndex` for two-way state. ' +
          'Listen for `@calculator` and `@test-drive` events to open the respective flows.\n\n' +
          '**ADA**: 10 distinct focusable elements per spec. Stock # has `user-select: text` ' +
          'so store associates can copy it on tablets.',
      },
    },
    backgrounds: {
      default: 'neutral-95',
    },
  },
  argTypes: {
    year:            { control: 'text' },
    mileage:         { control: 'text' },
    stockNumber:     { control: 'text' },
    title:           { control: 'text' },
    price:           { control: 'text' },
    monthlyPayment:  { control: 'text' },
    tooltipText:     { control: 'text' },
    deliveryLabel:   { control: 'text' },
    deliveryStore:   { control: 'text' },
    deliveryDistance:{ control: 'text' },
    imageUrl:        { control: 'text' },
    imageCount:      { control: { type: 'number', min: 1 } },
    imageIndex:      { control: { type: 'number', min: 0 } },
    favorited:       { control: 'boolean' },
    href:            { control: 'text' },
    badgeLabel:      { control: 'text' },
  },
  args: {
    year:             '2020',
    mileage:          '126k mi',
    stockNumber:      'PDW077969',
    title:            'Chevrolet Colorado Crew Cab ZR2',
    price:            '30,499',
    monthlyPayment:   '$250—$1,450/mo',
    tooltipText:      'Based on $1,000 down and 60 months at 4.79% APR',
    deliveryLabel:    'Pick up today at',
    deliveryStore:    'Charlotte-South Park',
    deliveryDistance: '(125 mi)',
    imageUrl:         CAR_IMAGE,
    imageCount:       1,
    imageIndex:       0,
    favorited:        false,
    href:             VDP_HREF,
  },
} satisfies Meta<typeof SrpTile>

export default meta
type Story = StoryObj<typeof meta>

// ─── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

// ─── No image ─────────────────────────────────────────────────────────────────

export const NoImage: Story = {
  name: 'No image (placeholder)',
  args: { imageUrl: undefined },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

// ─── Favorited ────────────────────────────────────────────────────────────────

export const Favorited: Story = {
  name: 'Favorited',
  args: { favorited: true },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

// ─── Carousel (multiple images) ───────────────────────────────────────────────

export const Carousel: Story = {
  name: 'Carousel (9 images)',
  args: { imageCount: 9, imageIndex: 0 },
  parameters: {
    docs: {
      description: { story: 'Hover the image area to reveal prev/next arrows. Dots appear at the bottom.' },
    },
  },
  render: (args) => ({
    components: { SrpTile },
    setup() {
      const idx = ref(args.imageIndex ?? 0)
      return { args, idx }
    },
    template: `
      <div style="padding:32px;">
        <SrpTile v-bind="args" :imageIndex="idx" @update:imageIndex="idx = $event" />
      </div>
    `,
  }),
}

// ─── Last image overlay ───────────────────────────────────────────────────────

export const LastImageOverlay: Story = {
  name: 'Last image overlay',
  args: { imageCount: 9, imageIndex: 8 },
  parameters: {
    docs: {
      description: { story: 'When the user reaches the final image, a blurred overlay with "See car details" appears.' },
    },
  },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

// ─── No delivery info ─────────────────────────────────────────────────────────

export const NoDelivery: Story = {
  name: 'No delivery info',
  args: { deliveryLabel: undefined, deliveryStore: undefined, deliveryDistance: undefined },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

// ─── No monthly payment ───────────────────────────────────────────────────────

export const NoMonthlyPayment: Story = {
  name: 'No monthly payment',
  args: { monthlyPayment: undefined },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

// ─── No href (static card) ────────────────────────────────────────────────────

export const StaticCard: Story = {
  name: 'No href (static card)',
  args: { href: undefined },
  parameters: {
    docs: {
      description: { story: 'When no `href` is provided the card renders without any VDP anchor links.' },
    },
  },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

// ─── Price-drop badge ────────────────────────────────────────────────────────

export const WithBadge: Story = {
  name: 'With price-drop badge',
  args: { badgeLabel: 'New price drop' },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

export const WithBadgeAmount: Story = {
  name: 'With price-drop amount',
  args: { badgeLabel: 'Just dropped $2,000' },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (all state)',
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive: toggle favorite, step through carousel arrows & dots, ' +
          'open tooltip, and emit calculator / test-drive events (logged to console).',
      },
    },
  },
  render: () => ({
    components: { SrpTile },
    setup() {
      const favorited  = ref(false)
      const imageIndex = ref(0)
      return { favorited, imageIndex }
    },
    template: `
      <div style="padding:32px;">
        <SrpTile
          year="2020"
          mileage="126k mi"
          stockNumber="PDW077969"
          title="Chevrolet Colorado Crew Cab ZR2"
          price="30,499"
          monthlyPayment="$250—$1,450/mo"
          tooltipText="Based on $1,000 down and 60 months at 4.79% APR"
          deliveryLabel="Pick up today at"
          deliveryStore="Charlotte-South Park"
          deliveryDistance="(125 mi)"
          imageUrl="${CAR_IMAGE}"
          :imageCount="9"
          :imageIndex="imageIndex"
          :favorited="favorited"
          href="#"
          @update:favorited="favorited = $event"
          @update:imageIndex="imageIndex = $event"
          @calculator="console.log('calculator')"
          @test-drive="console.log('test-drive')"
        />
        <p style="margin-top:16px;font-size:14px;color:#666;">
          Favorited: {{ favorited }} · Image: {{ imageIndex }}
        </p>
      </div>
    `,
  }),
}

// ─── Shipping variant ─────────────────────────────────────────────────────────

export const ShippingVariant: Story = {
  name: 'Shipping delivery variant',
  args: {
    deliveryLabel:    'Ship for $3,000 to',
    deliveryStore:    'Denver, CO',
    deliveryDistance: undefined,
  },
  render: (args) => ({
    components: { SrpTile },
    setup() { return { args } },
    template: `<div style="padding:32px;"><SrpTile v-bind="args" /></div>`,
  }),
}
