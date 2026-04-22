import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VdpPackagesOptions, { type PackageItem } from './'

const meta = {
  title: 'Organisms/VdpPackagesOptions',
  component: VdpPackagesOptions,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'VDP "Installed Packages & Options" section — a Sonic-Automotive ' +
          'treatment of the packages list that leverages the existing ' +
          '`Accordion` component.\n\n' +
          '**Composition** — section title, a stack of `Accordion` rows ' +
          '(one per package / option) and a `LinkCta` "see all" link.\n\n' +
          '**Responsive** — matches the three Figma frames:\n' +
          '- ≥ 1024 px: title + content in a 2-column grid (80 px gap)\n' +
          '- 600 – 1023 px: stacked single column, 80 px section inset, ' +
          '  `Accordion` in `lg` size\n' +
          '- < 600 px: stacked, accordions edge-to-edge, title inset 24 px, ' +
          '  `Accordion` in `sm` size\n\n' +
          '**Events** — `@click:see-all` fires when the footer link is ' +
          'activated.\n\n' +
          'Figma: desktop `Frame 2846`, tablet `Frame 2987`, mobile `Frame 3070`.',
      },
    },
  },
  argTypes: {
    label:       { control: 'text' },
    seeAllLabel: { control: 'text' },
    seeAllHref:  { control: 'text' },
  },
} satisfies Meta<typeof VdpPackagesOptions>

export default meta
type Story = StoryObj<typeof meta>

/* ─── Sample package data ────────────────────────────────────
 * Representative BMW X5 M60i options, long enough to exercise
 * real-world copy in the expanded accordion body. */
const SAMPLE_PACKAGES: PackageItem[] = [
  {
    title: 'Premium Package',
    body:
      'Adds heated front seats, a heated steering wheel, a Harman Kardon ' +
      'surround-sound system, soft-close automatic doors, and a wireless ' +
      'device charging tray in the front console.',
  },
  {
    title: 'M Sport Package',
    body:
      'Includes the M Sport aerodynamic kit, 21-inch M wheels with ' +
      'performance tires, M Sport brakes with blue calipers, an ' +
      'M leather steering wheel, and a dark-headliner interior trim.',
  },
  {
    title: 'Executive Package',
    body:
      'Includes heated and ventilated front seats with massage, rear-seat ' +
      'heating, a panoramic Sky Lounge LED roof, four-zone automatic ' +
      'climate control, and acoustic side-window glass.',
  },
]

const DEFAULT_ARGS = {
  label:       'Installed Packages & Options',
  packages:    SAMPLE_PACKAGES,
  seeAllLabel: 'See all packages & options',
  seeAllHref:  '#',
}

const RENDER = (args: typeof DEFAULT_ARGS) => ({
  components: { VdpPackagesOptions },
  setup() { return { args } },
  template: `
    <div style="padding:40px 32px;max-width:1440px;margin:0 auto;">
      <VdpPackagesOptions
        v-bind="args"
        @click:see-all="console.log('[VdpPackagesOptions] see-all click')"
      />
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
          styles: { width: '802px', height: '900px' },
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

export const TwoPackages: Story = {
  name: 'Two packages',
  args: {
    ...DEFAULT_ARGS,
    packages: SAMPLE_PACKAGES.slice(0, 2),
  },
  render: RENDER,
}

export const WithFirstOpen: Story = {
  name: 'First row initially open',
  args: {
    ...DEFAULT_ARGS,
    packages: [
      { ...SAMPLE_PACKAGES[0], open: true },
      SAMPLE_PACKAGES[1],
      SAMPLE_PACKAGES[2],
    ],
  },
  render: RENDER,
}

export const WithoutSeeAll: Story = {
  name: 'Without see-all link',
  args: {
    ...DEFAULT_ARGS,
    seeAllLabel: '',
    seeAllHref:  '',
  },
  render: RENDER,
}

export const LongList: Story = {
  name: 'Long list (6 items)',
  args: {
    ...DEFAULT_ARGS,
    packages: [
      ...SAMPLE_PACKAGES,
      {
        title: 'Driving Assistance Professional Package',
        body:
          'Adds Active Cruise Control with Stop & Go, Active Lane Keeping ' +
          'Assistant, Emergency Stop Assistant, and the Extended Traffic ' +
          'Jam Assistant for hands-off driving on mapped highways.',
      },
      {
        title: 'Parking Assistance Package',
        body:
          'Includes Parking Assistant Plus, a Surround View Camera, and ' +
          'Drive Recorder for hands-off parking and a full 360° view of ' +
          'the vehicle while maneuvering.',
      },
      {
        title: 'Trailer Hitch with Electrical Equipment',
        body:
          'Factory-installed Class III trailer hitch rated to tow up to ' +
          '7,200 lbs, with integrated sway control and a trailer-brake ' +
          'controller.',
      },
    ],
  },
  render: RENDER,
}
