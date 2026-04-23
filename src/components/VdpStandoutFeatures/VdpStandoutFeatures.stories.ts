import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VdpStandoutFeatures, { type StandoutFeature } from './'

import headsUpDisplayIcon     from '@icons/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Heads Up Display.svg?raw'
import massagingSeatIcon      from '@icons/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Massaging Seat.svg?raw'
import powerMoonroofIcon      from '@icons/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Power Moonroof.svg?raw'
import remoteKeylessEntryIcon from '@icons/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Remote Keyless Entry.svg?raw'

const meta = {
  title: 'Organisms/VdpStandoutFeatures',
  component: VdpStandoutFeatures,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'VDP "Standout Features" organism — a photo mosaic sitting flush ' +
          'above a neutral-surface feature strip.\n\n' +
          '**Composition** — top half is a 1-hero + 2-thumb gallery; bottom ' +
          'half is a gray band with an H3 heading and a row of icon + text ' +
          'chips. Icons accept raw SVG strings imported via the project\'s ' +
          '`@icons/...svg?raw` pattern.\n\n' +
          '**Responsive**\n' +
          '- ≥ 1024 px: hero + stacked thumbs side-by-side; 4 chips in a ' +
          '  single row (`justify-content: space-between`); 80 px band inset\n' +
          '- 600 – 1023 px: hero on top, 2-up thumb row below; 2×2 chip grid; ' +
          '  32 px vertical / 80 px horizontal band inset\n' +
          '- < 600 px: same stacked gallery, tighter aspect ratios; single ' +
          '  column of chips; 24 px horizontal band inset\n\n' +
          '**Design-system notes** — Figma\'s literal `#F2F2F2` gray maps to ' +
          '`--color-neutral-95` (`#F4F5F7`); text color `#313D47` resolves to ' +
          '`--color-neutral-20` (exact token match). Image gaps normalize to ' +
          '8 px / `--spacing-nano` on all breakpoints (Figma\'s 13 px desktop ' +
          'value is off-scale).\n\n' +
          'Figma: desktop `Frame 13951:55390`, tablet `Frame 13951:55451`, ' +
          'mobile `Frame 13951:55479`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
  },
} satisfies Meta<typeof VdpStandoutFeatures>

export default meta
type Story = StoryObj<typeof meta>

/* ─── Sample data ─────────────────────────────────────────
 * Hosted Unsplash photos keep the stories self-contained with
 * no local image dependency. Any 2:1-ish automotive photo
 * works; host apps will pass real VDP imagery. */
const SAMPLE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?w=1600&h=900&fit=crop',
    alt: 'BMW X5 M60i cockpit view',
  },
  {
    src: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop',
    alt: 'Ivory white leather rear seats',
  },
  {
    src: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=450&fit=crop',
    alt: 'Exterior front angle in Arctic Race Blue',
  },
]

const SAMPLE_FEATURES: StandoutFeature[] = [
  { label: 'Heads up display',             iconSvg: headsUpDisplayIcon },
  { label: 'Ventilated Massage Seats',     iconSvg: massagingSeatIcon },
  { label: 'Panoramic Moonroof',           iconSvg: powerMoonroofIcon },
  { label: 'Comfort Access Keyless Entry', iconSvg: remoteKeylessEntryIcon },
]

const DEFAULT_ARGS = {
  label:    'Standout Features',
  images:   SAMPLE_IMAGES,
  features: SAMPLE_FEATURES,
}

const RENDER = (args: typeof DEFAULT_ARGS) => ({
  components: { VdpStandoutFeatures },
  setup() { return { args } },
  template: `
    <div style="max-width:1440px;margin:0 auto;">
      <VdpStandoutFeatures v-bind="args" />
    </div>
  `,
})

/* ─── Breakpoint stories ───────────────────────────────────── */

export const Desktop: Story = {
  name: 'Desktop (≥ 1024)',
  args: DEFAULT_ARGS,
  parameters: { viewport: { defaultViewport: 'responsive' } },
  render: RENDER,
}

export const Tablet: Story = {
  name: 'Tablet (600–1023)',
  args: DEFAULT_ARGS,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
      viewports: {
        tablet: {
          name: 'Tablet (802)',
          styles: { width: '802px', height: '1100px' },
          type: 'tablet',
        },
      },
    },
  },
  render: RENDER,
}

export const Mobile: Story = {
  name: 'Mobile (< 600)',
  args: DEFAULT_ARGS,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
      viewports: {
        mobile: {
          name: 'Mobile (377)',
          styles: { width: '377px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  render: RENDER,
}

/* ─── Content variants ─────────────────────────────────────── */

export const HeroOnly: Story = {
  name: 'Hero image only (no thumbs)',
  args: {
    ...DEFAULT_ARGS,
    images: SAMPLE_IMAGES.slice(0, 1),
  },
  render: RENDER,
}

export const ThreeFeatures: Story = {
  name: 'Three features',
  args: {
    ...DEFAULT_ARGS,
    features: SAMPLE_FEATURES.slice(0, 3),
  },
  render: RENDER,
}

export const TextOnlyChips: Story = {
  name: 'Chips without icons',
  args: {
    ...DEFAULT_ARGS,
    features: SAMPLE_FEATURES.map(({ label }) => ({ label })),
  },
  render: RENDER,
}
