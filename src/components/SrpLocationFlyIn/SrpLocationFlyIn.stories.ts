import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SrpLocationFlyIn from './SrpLocationFlyIn.vue'
import type { LocationStoreItem } from './SrpLocationFlyIn.vue'

// ─── Mock data ────────────────────────────────────────────────────────────────

const STORES: LocationStoreItem[] = [
  { id: 'co-springs',   name: 'EchoPark Colorado Springs', distanceMiles: 9,  address: '1234 Powers Blvd, Colorado Springs, CO 80920', phone: '(719) 555-0101' },
  { id: 'centennial',   name: 'EchoPark Centennial',        distanceMiles: 29, address: '6820 S. Havana St, Centennial, CO 80112',      phone: '(720) 555-0202' },
  { id: 'thornton',     name: 'EchoPark Thornton',          distanceMiles: 36, address: '9501 Grant St, Thornton, CO 80229',            phone: '(720) 555-0303' },
  { id: 'aurora',       name: 'EchoPark Aurora',            distanceMiles: 44, address: '15500 E. Colfax Ave, Aurora, CO 80011',        phone: '(720) 555-0404' },
  { id: 'lakewood',     name: 'EchoPark Lakewood',          distanceMiles: 51, address: '1950 S. Wadsworth Blvd, Lakewood, CO 80227',  phone: '(303) 555-0505' },
]

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title:     'Molecules/SRP Filters/SrpLocationFlyIn',
  component: SrpLocationFlyIn,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  args: {
    zipCode: '75214',
    stores:  STORES,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff;min-height:600px;position:relative;overflow:hidden"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpLocationFlyIn>

export default meta
type Story = StoryObj<typeof SrpLocationFlyIn>

// ─── Default — 5 stores ───────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default (5 stores)',
}

// ─── One other store ──────────────────────────────────────────────────────────

export const TwoStores: Story = {
  name: '2 stores (1 nearest + 1 other)',
  args: {
    stores: STORES.slice(0, 2),
  },
}

// ─── Only the nearest store (no "other stores" section) ──────────────────────

export const OneStore: Story = {
  name: '1 store only (no "Other stores" section)',
  args: {
    stores: STORES.slice(0, 1),
  },
}

// ─── No stores ────────────────────────────────────────────────────────────────

export const NoStores: Story = {
  name: 'No stores',
  args: {
    stores: [],
  },
}

// ─── Interactive — zip change updates the displayed zip ───────────────────────

export const Interactive: Story = {
  name: 'Interactive (zip change)',
  render: (args) => ({
    components: { SrpLocationFlyIn },
    setup() {
      const zip = ref(args.zipCode ?? '75214')
      function onClose() { /* no-op in isolation */ }
      function onZipChange(newZip: string) { zip.value = newZip }
      return { args, zip, onClose, onZipChange }
    },
    template: `
      <SrpLocationFlyIn
        :zipCode="zip"
        :stores="args.stores"
        @close="onClose"
        @update:zipCode="onZipChange"
      />
    `,
  }),
}

// ─── AllVariants — side-by-side snapshot ─────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  decorators: [
    () => ({
      template: '<div style="display:flex;gap:24px;align-items:flex-start"><story /></div>',
    }),
  ],
  render: (args) => ({
    components: { SrpLocationFlyIn },
    setup() { return { args } },
    template: `
      <div style="width:306px;border:1px solid #e8e9eb;background:#fff;min-height:600px;overflow:hidden">
        <SrpLocationFlyIn zipCode="75214" :stores="args.stores" />
      </div>
      <div style="width:306px;border:1px solid #e8e9eb;background:#fff;min-height:600px;overflow:hidden">
        <SrpLocationFlyIn zipCode="80210" :stores="args.stores.slice(0,1)" />
      </div>
    `,
  }),
}
