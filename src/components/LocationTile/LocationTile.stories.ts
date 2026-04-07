import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
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
          'Selectable store location card. Use like a radio group — multiple tiles share the same `name` and bind to the same `v-model`.\n\n' +
          '**Sizes:** `desktop` (544px horizontal) · `mobile` (241px vertical)\n\n' +
          '**Selected state:** 2px green (`--color-base-primary-60`) outline, no layout shift.\n\n' +
          '```html\n' +
          '<LocationTile\n' +
          '  v-model="selectedStore"\n' +
          '  value="grand-prairie"\n' +
          '  name="store-select"\n' +
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
    size: { control: 'radio', options: ['desktop', 'mobile'] },
  },
  args: {
    value:       'grand-prairie',
    name:        'store-select',
    storeName:   'Dallas (Grand Prairie)',
    address:     '2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052',
    distance:    '12 Miles',
    phoneNumber: '(866) 533-5175',
    imageUrl:    STORE_PHOTO,
    size:        'desktop',
    modelValue:  '',
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
  args: { size: 'desktop', modelValue: '' },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}

export const DesktopSelected: Story = {
  name: 'Desktop — Selected',
  args: { size: 'desktop', modelValue: 'grand-prairie' },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}

// ─── Mobile ───────────────────────────────────────────────────────────────────

export const MobileDefault: Story = {
  name: 'Mobile — Default',
  args: { size: 'mobile', modelValue: '' },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}

export const MobileSelected: Story = {
  name: 'Mobile — Selected',
  args: { size: 'mobile', modelValue: 'grand-prairie' },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}

// ─── Interactive group ────────────────────────────────────────────────────────

export const InteractiveGroup: Story = {
  name: 'Interactive group',
  parameters: {
    docs: {
      description: { story: 'Click a tile to select it. Demonstrates v-model across a list.' },
    },
  },
  render: () => ({
    components: { LocationTile },
    setup() {
      const selected = ref('')
      return { selected, photo: STORE_PHOTO }
    },
    template: `
      <div style="padding:24px;display:flex;flex-direction:column;gap:16px;">
        <LocationTile
          v-model="selected" name="store-select"
          value="grand-prairie" storeName="Dallas (Grand Prairie)"
          address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
          distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
          directionsHref="https://maps.google.com/" directionsTarget="_blank"
          shopHref="/stores/dallas-grand-prairie"
        />
        <LocationTile
          v-model="selected" name="store-select"
          value="houston" storeName="Houston (Katy)"
          address="20711 Katy Freeway, Katy, TX 77450"
          distance="28 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
          directionsHref="https://maps.google.com/" directionsTarget="_blank"
          shopHref="/stores/houston-katy"
        />
      </div>
    `,
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
          name="s1" value="a" modelValue=""
          storeName="Dallas (Grand Prairie)" address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
          distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
          size="desktop"
          directionsHref="https://maps.google.com/" directionsTarget="_blank"
          shopHref="/stores/dallas-grand-prairie"
        />
        <LocationTile
          name="s2" value="a" modelValue="a"
          storeName="Dallas (Grand Prairie)" address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
          distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
          size="desktop"
          directionsHref="https://maps.google.com/" directionsTarget="_blank"
          shopHref="/stores/dallas-grand-prairie"
        />
        <div style="display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;">
          <LocationTile
            name="s3" value="a" modelValue=""
            storeName="Dallas (Grand Prairie)" address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
            distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
            size="mobile"
            directionsHref="https://maps.google.com/" directionsTarget="_blank"
            shopHref="/stores/dallas-grand-prairie"
          />
          <LocationTile
            name="s4" value="a" modelValue="a"
            storeName="Dallas (Grand Prairie)" address="2615 W Interstate 20 Frontage Rd Grand Prairie, TX 75052"
            distance="12 Miles" phoneNumber="(866) 533-5175" :imageUrl="photo"
            size="mobile"
            directionsHref="https://maps.google.com/" directionsTarget="_blank"
            shopHref="/stores/dallas-grand-prairie"
          />
        </div>
      </div>
    `,
  }),
}

// ─── No image ─────────────────────────────────────────────────────────────────

export const NoImage: Story = {
  name: 'No image (placeholder)',
  args: { imageUrl: undefined },
  render: (args) => ({
    components: { LocationTile },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTile v-bind="args" /></div>`,
  }),
}
