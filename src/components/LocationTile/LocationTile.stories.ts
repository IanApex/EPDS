import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LocationTile from './LocationTile.vue'

const STORE_PHOTO = 'https://www.echopark.com/-/media/project/sonic/echopark/all-store-images/grand-prarie/grandprarie_listimage-dt_v2.jpg?h=512&w=482&hash=970167BCF95985F958787C798F429EB5'

const meta = {
  title: 'Components/LocationTile',
  component: LocationTile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Store location card for location-selection flows. Two sizes: `desktop` (544px, horizontal) and `mobile` (241px, vertical).\n\n' +
          '**Selected state:** green (`--color-base-primary-60`) 2px inset border.\n\n' +
          '**Links:** pass `directionsHref` and `shopHref` to make the action areas navigate.\n\n' +
          '```html\n' +
          '<LocationTile\n' +
          '  storeName="Dallas (Grand Prairie)"\n' +
          '  address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"\n' +
          '  distance="12 Miles"\n' +
          '  phoneNumber="(866) 533-5175"\n' +
          '  :imageUrl="storePhoto"\n' +
          '  directionsHref="https://maps.google.com/?q=..."\n' +
          '  directionsTarget="_blank"\n' +
          '  shopHref="/stores/dallas-grand-prairie"\n' +
          '/>\n' +
          '```\n\n' +
          'Figma: "Location Tiles".',
      },
    },
  },
  argTypes: {
    size:     { control: 'radio',    options: ['desktop', 'mobile'] },
    selected: { control: 'boolean' },
  },
  args: {
    storeName:   'Dallas (Grand Prairie)',
    address:     '2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052',
    distance:    '12 Miles',
    phoneNumber: '(866) 533-5175',
    imageUrl:    STORE_PHOTO,
    size:        'desktop',
    selected:    false,
    directionsHref:   'https://maps.google.com/',
    directionsTarget: '_blank',
    shopHref:    '/stores/dallas-grand-prairie',
    shopTarget:  '_self',
  },
} satisfies Meta<typeof LocationTile>

export default meta
type Story = StoryObj<typeof meta>

// ─── Desktop ──────────────────────────────────────────────────────────────────

export const DesktopDefault: Story = {
  name: 'Desktop — Default',
  args: { size: 'desktop', selected: false },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}

export const DesktopSelected: Story = {
  name: 'Desktop — Selected',
  args: { size: 'desktop', selected: true },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

export const MobileDefault: Story = {
  name: 'Mobile — Default',
  args: { size: 'mobile', selected: false },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}

export const MobileSelected: Story = {
  name: 'Mobile — Selected',
  args: { size: 'mobile', selected: true },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}

// ─── All four states ──────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  parameters: {
    docs: {
      description: { story: 'Desktop default, desktop selected, mobile default, mobile selected.' },
    },
  },
  render: () => ({
    components: { LocationTile },
    setup() { return { photo: STORE_PHOTO } },
    template: `
      <div style="padding:24px;display:flex;flex-direction:column;gap:24px;">
        <LocationTile
          storeName="Dallas (Grand Prairie)" address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
          distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
          size="desktop" :selected="false"
          directionsHref="https://maps.google.com/" directionsTarget="_blank"
          shopHref="/stores/dallas-grand-prairie"
        />
        <LocationTile
          storeName="Dallas (Grand Prairie)" address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
          distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
          size="desktop" :selected="true"
          directionsHref="https://maps.google.com/" directionsTarget="_blank"
          shopHref="/stores/dallas-grand-prairie"
        />
        <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;">
          <LocationTile
            storeName="Dallas (Grand Prairie)" address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
            distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
            size="mobile" :selected="false"
            directionsHref="https://maps.google.com/" directionsTarget="_blank"
            shopHref="/stores/dallas-grand-prairie"
          />
          <LocationTile
            storeName="Dallas (Grand Prairie)" address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
            distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
            size="mobile" :selected="true"
            directionsHref="https://maps.google.com/" directionsTarget="_blank"
            shopHref="/stores/dallas-grand-prairie"
          />
        </div>
      </div>
    `,
  }),
}

// ─── No image (placeholder) ───────────────────────────────────────────────────

export const NoImage: Story = {
  name: 'No image (placeholder)',
  args: { imageUrl: undefined },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}
