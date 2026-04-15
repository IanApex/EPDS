import type { Meta, StoryObj } from '@storybook/vue3'
import SrpFilterDistance from './SrpFilterDistance.vue'
import type { DistanceStoreItem } from './SrpFilterDistance.vue'

// ─── Shared mock data ─────────────────────────────────────────────────────────

const STORES: DistanceStoreItem[] = [
  { id: 'co-springs',  name: 'EchoPark Colorado Springs', distanceMiles: 9  },
  { id: 'centennial',  name: 'EchoPark Centennial',        distanceMiles: 29 },
  { id: 'thornton',    name: 'EchoPark Thornton',          distanceMiles: 36 },
  { id: 'aurora',      name: 'EchoPark Aurora',            distanceMiles: 44 },
  { id: 'lakewood',    name: 'EchoPark Lakewood',          distanceMiles: 51 },
  { id: 'fort-collins',name: 'EchoPark Fort Collins',      distanceMiles: 67 },
  { id: 'boulder',     name: 'EchoPark Boulder',           distanceMiles: 72 },
  { id: 'pueblo',      name: 'EchoPark Pueblo',            distanceMiles: 88 },
  { id: 'greeley',     name: 'EchoPark Greeley',           distanceMiles: 95 },
]

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title:     'Molecules/SRP Filters/SrpFilterDistance',
  component: SrpFilterDistance,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'light' },
  },
  args: {
    zipCode:            '75214',
    stores:             STORES,
    storeCountInRadius: 2,
  },
  argTypes: {
    mode:   { control: 'radio', options: ['radius', 'store'] },
    radius: { control: { type: 'select' }, options: [25, 50, 100, 150, 200, 250] },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="width:306px;border:1px solid #e8e9eb;background:#fff"><story /></div>',
    }),
  ],
} satisfies Meta<typeof SrpFilterDistance>

export default meta
type Story = StoryObj<typeof SrpFilterDistance>

// ─── Scenario A — Shop by radius ──────────────────────────────────────────────

export const ScenarioARadius: Story = {
  name: 'A — Shop by radius (250 mi, 2 stores)',
  args: {
    mode:   'radius',
    radius: 250,
  },
}

export const ScenarioARadiusSingular: Story = {
  name: 'A — Shop by radius (singular: 1 store)',
  args: {
    mode:               'radius',
    radius:             100,
    storeCountInRadius: 1,
  },
}

// ─── Scenario B — Shop by store (default, 1 auto-selected / locked) ───────────

export const ScenarioBStore: Story = {
  name: 'B — Shop by store (1 locked selection)',
  args: {
    mode:           'store',
    selectedStores: ['co-springs'],
  },
}

// ─── Scenario B.1 — Multiple stores selected ─────────────────────────────────

export const ScenarioB1MultiSelect: Story = {
  name: 'B.1 — Shop by store (multiple selected)',
  args: {
    mode:           'store',
    selectedStores: ['co-springs', 'centennial'],
  },
}

// ─── Scenario C — Show more (expanded, all stores visible) ───────────────────
// There is no direct "expanded" prop — user clicks "Show more" interactively.
// This story starts with store mode + many stores to make the "Show more" visible.
export const ScenarioCShowMore: Story = {
  name: 'C — Show more available (3 shown by default)',
  args: {
    mode:           'store',
    selectedStores: ['co-springs'],
  },
}

// ─── Scenario: only 2 stores (no Show more) ──────────────────────────────────

export const FewStores: Story = {
  name: 'Store mode — 2 stores (no Show more)',
  args: {
    mode:           'store',
    selectedStores: ['co-springs'],
    stores:         STORES.slice(0, 2),
  },
}

// ─── Interactive ─────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive',
  args: {
    mode:           'radius',
    radius:         250,
    selectedStores: [],
  },
}
