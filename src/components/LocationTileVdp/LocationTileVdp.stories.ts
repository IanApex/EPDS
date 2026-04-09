import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LocationTileVdp from './LocationTileVdp.vue'

const meta = {
  title: 'Molecules/LocationTileVdp',
  component: LocationTileVdp,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Non-interactive VDP location tile. Three types communicate shipping/pickup availability for a vehicle.\n\n' +
          '**Types:** `not-available` · `pick-up-today` · `shipping-available`\n\n' +
          '**Sizes:** `desktop` (380×138px) · `mobile` (328×162px)\n\n' +
          '```html\n' +
          '<LocationTileVdp\n' +
          '  type="pick-up-today"\n' +
          '  storeName="EchoPark Marietta"\n' +
          '  distance="(677 mi from 75214)"\n' +
          '  price="Free"\n' +
          '/>\n' +
          '```\n\n' +
          'Figma: "Location Tile VDP".',
      },
    },
  },
  argTypes: {
    type: { control: 'radio', options: ['not-available', 'pick-up-today', 'shipping-available'] },
    size: { control: 'radio', options: ['desktop', 'mobile'] },
  },
  args: {
    type:      'pick-up-today',
    size:      'desktop',
    storeName: 'EchoPark Marietta',
    distance:  '(677 mi from 75214)',
    price:     'Free',
  },
} satisfies Meta<typeof LocationTileVdp>

export default meta
type Story = StoryObj<typeof meta>

// ─── Desktop variants ─────────────────────────────────────────────────────────

export const DesktopNotAvailable: Story = {
  name: 'Desktop — Not available',
  args: { type: 'not-available', size: 'desktop', storeName: undefined, distance: undefined, price: undefined },
  render: (args) => ({
    components: { LocationTileVdp },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTileVdp v-bind="args" /></div>`,
  }),
}

export const DesktopPickUpToday: Story = {
  name: 'Desktop — Pick up today',
  args: { type: 'pick-up-today', size: 'desktop', storeName: 'EchoPark Marietta', distance: '(677 mi from 75214)', price: 'Free' },
  render: (args) => ({
    components: { LocationTileVdp },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTileVdp v-bind="args" /></div>`,
  }),
}

export const DesktopShippingAvailable: Story = {
  name: 'Desktop — Shipping available',
  args: { type: 'shipping-available', size: 'desktop', storeName: 'EchoPark Charlotte', distance: '(9 mi from 75214)', price: '$399' },
  render: (args) => ({
    components: { LocationTileVdp },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTileVdp v-bind="args" /></div>`,
  }),
}

// ─── Mobile variants ──────────────────────────────────────────────────────────

export const MobileNotAvailable: Story = {
  name: 'Mobile — Not available',
  args: { type: 'not-available', size: 'mobile', storeName: undefined, distance: undefined, price: undefined },
  render: (args) => ({
    components: { LocationTileVdp },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTileVdp v-bind="args" /></div>`,
  }),
}

export const MobilePickUpToday: Story = {
  name: 'Mobile — Pick up today',
  args: { type: 'pick-up-today', size: 'mobile', storeName: 'EchoPark Marietta', distance: '(677 mi from 75214)', price: 'Free' },
  render: (args) => ({
    components: { LocationTileVdp },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTileVdp v-bind="args" /></div>`,
  }),
}

export const MobileShippingAvailable: Story = {
  name: 'Mobile — Shipping available',
  args: { type: 'shipping-available', size: 'mobile', storeName: 'EchoPark Charlotte', distance: '(9 mi from 75214)', price: '$399' },
  render: (args) => ({
    components: { LocationTileVdp },
    setup() { return { args } },
    template: `<div style="padding:24px;"><LocationTileVdp v-bind="args" /></div>`,
  }),
}

// ─── All six at once ──────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: { description: { story: 'All three types × two sizes.' } },
  },
  render: () => ({
    components: { LocationTileVdp },
    template: `
      <div style="padding:24px;display:flex;flex-direction:column;gap:24px;">
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
          <LocationTileVdp type="not-available"      size="desktop" />
          <LocationTileVdp type="pick-up-today"      size="desktop" storeName="EchoPark Marietta"  distance="(677 mi from 75214)" price="Free" />
          <LocationTileVdp type="shipping-available" size="desktop" storeName="EchoPark Charlotte" distance="(9 mi from 75214)"   price="$399" />
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
          <LocationTileVdp type="not-available"      size="mobile" />
          <LocationTileVdp type="pick-up-today"      size="mobile" storeName="EchoPark Marietta"  distance="(677 mi from 75214)" price="Free" />
          <LocationTileVdp type="shipping-available" size="mobile" storeName="EchoPark Charlotte" distance="(9 mi from 75214)"   price="$399" />
        </div>
      </div>
    `,
  }),
}
