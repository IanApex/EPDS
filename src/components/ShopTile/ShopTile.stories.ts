import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ShopTile from './ShopTile.vue'

import commutersImg from '../../../Photos/Sonic Automotive/person walk.png'
import safetyImg from '../../../Photos/Sonic Automotive/buckle kid.png'
import lowMaintImg from '../../../Photos/Sonic Automotive/Sun chick.png'
import budgetImg from '../../../Photos/Sonic Automotive/paper people.png'
import reliableImg from '../../../Photos/Sonic Automotive/yellow car.png'

const meta = {
  title: 'Atoms/ShopTile',
  component: ShopTile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '`ShopTile` — image tile with three-stop dark gradient overlay and a ' +
          'bold white headline pinned to the top-left. Used in marketing ' +
          '"shop by …" grids (homepage `ShopByCategories`, future landing ' +
          'pages). Renders as an `<a>` when `href` is provided.',
      },
    },
  },
  args: {
    label: 'Commuters',
    imageUrl: commutersImg,
    href: '#',
  },
  argTypes: {
    label: { control: 'text' },
    imageUrl: { control: false },
    href: { control: 'text' },
    target: { control: 'text' },
    imageAlt: { control: 'text' },
  },
  render: (args) => ({
    components: { ShopTile },
    setup: () => ({ args }),
    template: '<div style="width:416px"><shop-tile v-bind="args" /></div>',
  }),
} satisfies Meta<typeof ShopTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HighSafetyRatings: Story = {
  args: { label: 'High safety ratings', imageUrl: safetyImg },
}

export const LowMaintenance: Story = {
  args: { label: 'Low maintenance', imageUrl: lowMaintImg },
}

export const BudgetFriendly: Story = {
  args: { label: 'Budget-friendly', imageUrl: budgetImg },
}

export const ReliableBrands: Story = {
  args: { label: 'Reliable brands', imageUrl: reliableImg },
}

export const AsButton: Story = {
  name: 'No href (button)',
  args: { href: undefined },
}

/** Demonstrates how the tile flexes inside a 3-up grid row (homepage spec). */
export const InRow: Story = {
  name: 'In a 3-up row',
  render: () => ({
    components: { ShopTile },
    setup: () => ({
      tiles: [
        { label: 'Commuters', imageUrl: commutersImg },
        { label: 'High safety ratings', imageUrl: safetyImg },
        { label: 'Low maintenance', imageUrl: lowMaintImg },
      ],
    }),
    template: `
      <div style="display:flex;gap:16px;width:1280px;max-width:100%">
        <div v-for="t in tiles" :key="t.label" style="flex:1 1 0;min-width:0">
          <shop-tile v-bind="t" href="#" />
        </div>
      </div>
    `,
  }),
}
