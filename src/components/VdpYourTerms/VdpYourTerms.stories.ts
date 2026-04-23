import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VdpYourTerms, { type YourTermsOption } from './'

import financeIcon from '@icons/Icon=Illustrative, Name=Finance.svg?raw'
import payCashIcon from '@icons/Icon=Illustrative, Name=Pay-Cash.svg?raw'
import preQualIcon from '@icons/Icon=Illustrative, Name=Pre-Qual.svg?raw'

import sonicBankIcon      from '@icons/Style=Finance-Sonic, Detail=Payment, Icon=Bank-Outline.svg?raw'
import sonicCashIcon      from '@icons/Style=Finance-Sonic, Detail=Payment, Icon=Cash.svg?raw'
import sonicFastTrackIcon from '@icons/Style=Finance-Sonic, Detail=Payment, Icon=Fast-Track.svg?raw'

const meta = {
  title: 'Organisms/VdpYourTerms',
  component: VdpYourTerms,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'VDP "Your Vehicle. Your Terms." organism — a three-tile ' +
          'finance-options grid (Finance / Lease / Fast Track) rendered ' +
          'below the Standout Features band.\n\n' +
          '**Composition** — H3 section heading above a row of tiles; each ' +
          'tile stacks icon → title → description → arrow link, with the ' +
          'link anchored to a shared baseline on desktop.\n\n' +
          '**Responsive**\n' +
          '- ≥ 1024 px: 3-column tile row (`justify-content: space-between`), ' +
          '  centered H3, 56 px title → content gap\n' +
          '- 600 – 1023 px: tiles stack vertically (48 px gap), section is ' +
          '  inset 80 px horizontally, 40 px title → content gap\n' +
          '- < 600 px: same stacked layout, section inset drops to 24 px, ' +
          '  H3 left-aligns, 32 px title → content gap\n\n' +
          '**Design-system notes** — Reuses `LinkCta` (arrow + light theme) ' +
          'for the per-tile CTA; illustrative icons resolve to ' +
          '`Icon=Illustrative, Name=Finance.svg`, `…=Pay-Cash.svg` and ' +
          '`…=Pre-Qual.svg` from the EPDS icon set. Section heading stays ' +
          'on `--text-h3-*` (32 px) across all breakpoints to match the rest ' +
          'of the VDP rhythm; tile titles step down to `--text-h4-*` (26 px) ' +
          'on tablet / mobile.\n\n' +
          'Figma: desktop `13953:10389`, tablet `13953:10412`, mobile ' +
          '`13953:10368`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
  },
} satisfies Meta<typeof VdpYourTerms>

export default meta
type Story = StoryObj<typeof meta>

/* ─── Sample data ───────────────────────────────────────── */
const SAMPLE_OPTIONS: YourTermsOption[] = [
  {
    title:       'Finance',
    description:
      'Build equity with every payment, own your vehicle outright at ' +
      'payoff, and drive without mileage restrictions.',
    iconSvg:     financeIcon,
    linkLabel:   'Apply for Financing',
    linkHref:    '#',
  },
  {
    title:       'Lease',
    description:
      'Enjoy payments tailored to you and always drive the latest ' +
      'model. Upgrade every 2–3 years—no trade-in negotiations, no hassle.',
    iconSvg:     payCashIcon,
    linkLabel:   'Lease This Car',
    linkHref:    '#',
  },
  {
    title:       'Fast Track',
    description:
      'Get ahead before you arrive. Estimate your trade-in value, ' +
      'explore current offers, and start your credit application—all ' +
      'from home.',
    iconSvg:     preQualIcon,
    linkLabel:   'Get Started',
    linkHref:    '#',
  },
]

/* Sonic variant — same copy with the orange `currentColor`-fill
 * outline icons. The icon tint + arrow caret swap are driven by
 * `[data-brand='sonic']` overrides in the component itself, so
 * stories simply swap the icon assets and toggle the brand via
 * Storybook's Brand toolbar to see the orange treatment. */
const SONIC_OPTIONS: YourTermsOption[] = [
  { ...SAMPLE_OPTIONS[0], iconSvg: sonicBankIcon      },
  { ...SAMPLE_OPTIONS[1], iconSvg: sonicCashIcon      },
  { ...SAMPLE_OPTIONS[2], iconSvg: sonicFastTrackIcon },
]

const DEFAULT_ARGS = {
  label:   'Your Vehicle. Your Terms.',
  options: SAMPLE_OPTIONS,
}

const RENDER = (args: typeof DEFAULT_ARGS) => ({
  components: { VdpYourTerms },
  setup() { return { args } },
  template: `
    <div style="max-width:1440px;margin:0 auto;padding:32px;">
      <VdpYourTerms v-bind="args" />
    </div>
  `,
})

/* ─── Breakpoint stories ───────────────────────────────── */

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
          styles: { width: '377px', height: '1200px' },
          type: 'mobile',
        },
      },
    },
  },
  render: RENDER,
}

/* ─── Sonic variant ────────────────────────────────────── */

export const SonicVariant: Story = {
  name: 'Sonic brand (orange outline icons)',
  args: {
    ...DEFAULT_ARGS,
    options: SONIC_OPTIONS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sonic Automotive variant — uses the orange `currentColor`-fill ' +
          'outline icons (Bank / Cash / Fast-Track) shipped with the EPDS ' +
          'icon set. Toggle the **Brand** toolbar to **Sonic Automotive** ' +
          'to see the orange icon tint and orange `LinkCta` arrow caret ' +
          'kick in via the component\'s `[data-brand="sonic"]` overrides.',
      },
    },
  },
  render: RENDER,
}

/* ─── Content variants ─────────────────────────────────── */

export const WithoutIcons: Story = {
  name: 'Tiles without icons',
  args: {
    ...DEFAULT_ARGS,
    options: SAMPLE_OPTIONS.map(({ iconSvg: _iconSvg, ...rest }) => rest),
  },
  render: RENDER,
}

export const TwoOptions: Story = {
  name: 'Two options',
  args: {
    ...DEFAULT_ARGS,
    options: SAMPLE_OPTIONS.slice(0, 2),
  },
  render: RENDER,
}
