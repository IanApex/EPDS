import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ContentTile from './ContentTile.vue'

const meta = {
  title: 'Molecules/ContentTile',
  component: ContentTile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Content card used for marketing tiles and banners. Combines a heading, body copy, a LinkCta, ' +
          'and an optional decorative circular image.\n\n' +
          '**Types:** `tile` — tall vertical card (460px); `banner` — short horizontal card\n\n' +
          '**Sizes:** `sm` 280px · `md` 327px · `lg` 420px · `xl` 690px (banner only)\n\n' +
          '**Image location:** `top` — circle protrudes from the top edge; `bottom` — from the bottom edge\n\n' +
          '```html\n' +
          '<ContentTile\n' +
          '  heading="Find your perfect car"\n' +
          '  body="Browse thousands of vehicles at EchoPark."\n' +
          '  link-label="Shop now"\n' +
          '  link-href="/shop"\n' +
          '/>\n' +
          '```\n\n' +
          'Figma: "Content Tiles".',
      },
    },
  },
  argTypes: {
    type:          { control: 'radio',  options: ['tile', 'banner'] },
    size:          { control: 'radio',  options: ['sm', 'md', 'lg', 'xl'] },
    imageLocation: { control: 'radio',  options: ['top', 'bottom'] },
    heading:       { control: 'text' },
    body:          { control: 'text' },
    linkLabel:     { control: 'text' },
    linkHref:      { control: 'text' },
    imageUrl:      { control: 'text' },
  },
  args: {
    type: 'tile',
    size: 'lg',
    imageLocation: 'top',
    heading: 'Find your perfect car',
    body: 'Browse our curated selection of pre-owned vehicles, all priced transparently with no-haggle pricing.',
    linkLabel: 'Shop now',
    linkHref: undefined,
    imageUrl: undefined,
  },
} satisfies Meta<typeof ContentTile>

export default meta
type Story = StoryObj<typeof meta>

// ─── Tiles ────────────────────────────────────────────────────────────────────

export const TileLgImageTop: Story = {
  name: 'Tile — LG, image top',
  args: { type: 'tile', size: 'lg', imageLocation: 'top' },
  render: (args) => ({
    components: { ContentTile },
    setup() { return { args } },
    template: `<div style="padding:24px;display:inline-block;"><ContentTile v-bind="args" /></div>`,
  }),
}

export const TileLgImageBottom: Story = {
  name: 'Tile — LG, image bottom',
  args: { type: 'tile', size: 'lg', imageLocation: 'bottom' },
  render: (args) => ({
    components: { ContentTile },
    setup() { return { args } },
    template: `<div style="padding:24px;display:inline-block;"><ContentTile v-bind="args" /></div>`,
  }),
}

export const TileMdImageTop: Story = {
  name: 'Tile — MD, image top',
  args: { type: 'tile', size: 'md', imageLocation: 'top' },
  render: (args) => ({
    components: { ContentTile },
    setup() { return { args } },
    template: `<div style="padding:24px;display:inline-block;"><ContentTile v-bind="args" /></div>`,
  }),
}

export const TileSmImageTop: Story = {
  name: 'Tile — SM, image top',
  args: { type: 'tile', size: 'sm', imageLocation: 'top' },
  render: (args) => ({
    components: { ContentTile },
    setup() { return { args } },
    template: `<div style="padding:24px;display:inline-block;"><ContentTile v-bind="args" /></div>`,
  }),
}

// ─── Banners ──────────────────────────────────────────────────────────────────

export const BannerLg: Story = {
  name: 'Banner — LG',
  args: { type: 'banner', size: 'lg', imageLocation: 'bottom', heading: 'Ready to trade in?' },
  render: (args) => ({
    components: { ContentTile },
    setup() { return { args } },
    template: `<div style="padding:24px;display:inline-block;"><ContentTile v-bind="args" /></div>`,
  }),
}

export const BannerMd: Story = {
  name: 'Banner — MD',
  args: { type: 'banner', size: 'md', imageLocation: 'bottom', heading: 'Ready to trade in?' },
  render: (args) => ({
    components: { ContentTile },
    setup() { return { args } },
    template: `<div style="padding:24px;display:inline-block;"><ContentTile v-bind="args" /></div>`,
  }),
}

export const BannerSm: Story = {
  name: 'Banner — SM',
  args: { type: 'banner', size: 'sm', imageLocation: 'bottom', heading: 'Ready to trade in?' },
  render: (args) => ({
    components: { ContentTile },
    setup() { return { args } },
    template: `<div style="padding:24px;display:inline-block;"><ContentTile v-bind="args" /></div>`,
  }),
}

export const BannerXl: Story = {
  name: 'Banner — XL (row layout)',
  parameters: {
    docs: {
      description: {
        story: 'XL banners use a horizontal row layout: text on the left, CTA on the right. The decorative circle peeks from the left edge.',
      },
    },
  },
  args: {
    type: 'banner',
    size: 'xl',
    imageLocation: 'top',
    heading: 'Ready to trade in?',
    body: 'Get a competitive offer on the spot — no obligation to purchase.',
  },
  render: (args) => ({
    components: { ContentTile },
    setup() { return { args } },
    template: `<div style="padding:24px;display:inline-block;"><ContentTile v-bind="args" /></div>`,
  }),
}

// ─── All tile sizes ───────────────────────────────────────────────────────────

export const AllTileSizes: Story = {
  name: 'All tile sizes',
  parameters: {
    docs: {
      description: {
        story: 'SM (280px), MD (327px), and LG (420px) tiles displayed side by side.',
      },
    },
  },
  render: () => ({
    components: { ContentTile },
    setup() {
      const heading = 'Find your perfect car'
      const body = 'Browse our selection of pre-owned vehicles at transparent, no-haggle prices.'
      const linkLabel = 'Shop now'
      return { heading, body, linkLabel }
    },
    template: `
      <div style="padding:24px;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;">
        <ContentTile type="tile" size="sm" imageLocation="top" :heading="heading" :body="body" :linkLabel="linkLabel" />
        <ContentTile type="tile" size="md" imageLocation="top" :heading="heading" :body="body" :linkLabel="linkLabel" />
        <ContentTile type="tile" size="lg" imageLocation="top" :heading="heading" :body="body" :linkLabel="linkLabel" />
      </div>
    `,
  }),
}

export const AllBannerSizes: Story = {
  name: 'All banner sizes',
  parameters: {
    docs: {
      description: {
        story: 'SM (280px), MD (327px), LG (420px), and XL (690px) banners stacked.',
      },
    },
  },
  render: () => ({
    components: { ContentTile },
    setup() {
      const heading = 'Ready to trade in?'
      const body = 'Get a competitive offer on the spot — no obligation to purchase.'
      const linkLabel = 'Get an offer'
      return { heading, body, linkLabel }
    },
    template: `
      <div style="padding:24px;display:flex;flex-direction:column;gap:24px;align-items:flex-start;">
        <ContentTile type="banner" size="sm" imageLocation="bottom" :heading="heading" :body="body" :linkLabel="linkLabel" />
        <ContentTile type="banner" size="md" imageLocation="bottom" :heading="heading" :body="body" :linkLabel="linkLabel" />
        <ContentTile type="banner" size="lg" imageLocation="bottom" :heading="heading" :body="body" :linkLabel="linkLabel" />
        <ContentTile type="banner" size="xl" imageLocation="top"    :heading="heading" :body="body" :linkLabel="linkLabel" />
      </div>
    `,
  }),
}
