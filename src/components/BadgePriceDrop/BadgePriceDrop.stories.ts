import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BadgePriceDrop from './BadgePriceDrop.vue'

const meta = {
  title: 'Atoms/BadgePriceDrop',
  component: BadgePriceDrop,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    showIcon: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['srp', 'vdp'],
    },
  },
} satisfies Meta<typeof BadgePriceDrop>

export default meta
type Story = StoryObj<typeof meta>

/* ── SRP variant ── */

export const SrpDefault: Story = {
  name: 'SRP — Default',
  args: { label: 'New price drop', variant: 'srp' },
}

export const SrpWithAmount: Story = {
  name: 'SRP — With Amount',
  args: { label: 'Just dropped $2,000', variant: 'srp' },
}

export const SrpNoIcon: Story = {
  name: 'SRP — No Icon',
  args: { label: 'New price drop', variant: 'srp', showIcon: false },
}

/* ── VDP variant ── */

export const VdpDefault: Story = {
  name: 'VDP — Default',
  args: { label: '$1,000 price drop', variant: 'vdp' },
}

export const VdpNoIcon: Story = {
  name: 'VDP — No Icon',
  args: { label: '$1,000 price drop', variant: 'vdp', showIcon: false },
}

/* ── All States ── */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { BadgePriceDrop },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666B70;">SRP — with icon</p>
          <BadgePriceDrop label="New price drop" variant="srp" />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666B70;">SRP — with amount</p>
          <BadgePriceDrop label="Just dropped $2,000" variant="srp" />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666B70;">SRP — no icon</p>
          <BadgePriceDrop label="New price drop" variant="srp" :showIcon="false" />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666B70;">VDP — with icon</p>
          <BadgePriceDrop label="$1,000 price drop" variant="vdp" />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; color: #666B70;">VDP — no icon</p>
          <BadgePriceDrop label="$1,000 price drop" variant="vdp" :showIcon="false" />
        </div>
      </div>
    `,
  }),
}

/* ── Interactive ── */

export const Interactive: Story = {
  args: {
    label: 'New price drop',
    variant: 'srp',
    showIcon: true,
  },
}

/* ── On Card Context ── */

export const OnSrpTile: Story = {
  name: 'SRP — On Card (Context)',
  render: () => ({
    components: { BadgePriceDrop },
    template: `
      <div style="position: relative; width: 345px; height: 200px; border-radius: 8px; overflow: hidden; background: #e5e7eb;">
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #666B70; font-size: 14px;">
          Vehicle image placeholder
        </div>
        <div style="position: absolute; top: 0; left: 0; z-index: 2;">
          <BadgePriceDrop label="New price drop" variant="srp" />
        </div>
      </div>
    `,
  }),
}

export const OnSrpTileWithAmount: Story = {
  name: 'SRP — On Card With Amount (Context)',
  render: () => ({
    components: { BadgePriceDrop },
    template: `
      <div style="position: relative; width: 345px; height: 200px; border-radius: 8px; overflow: hidden; background: #e5e7eb;">
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #666B70; font-size: 14px;">
          Vehicle image placeholder
        </div>
        <div style="position: absolute; top: 0; left: 0; z-index: 2;">
          <BadgePriceDrop label="Just dropped $2,000" variant="srp" />
        </div>
      </div>
    `,
  }),
}
