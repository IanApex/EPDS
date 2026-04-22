import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VdpExteriorInterior, { type AttributeItem } from './'

const meta = {
  title: 'Organisms/VdpExteriorInterior',
  component: VdpExteriorInterior,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'VDP "Exterior & Interior" section — an H3 heading stacked above ' +
          'a responsive grid of vehicle attribute rows (label + bold value, ' +
          'optionally preceded by a color or image swatch).\n\n' +
          '**Composition** — section title (H3) + `<dl>` grid of ' +
          '`<dt>`/`<dd>` pairs. Each row optionally renders a 16 px swatch ' +
          '(circle for `color` type, rounded-square image for `image` type).\n\n' +
          '**Responsive**\n' +
          '- ≥ 1024 px: 4-column grid, 56 px row gap (`--spacing-lg`)\n' +
          '- 600 – 1023 px: 3-column grid, 32 px row gap, 80 px side inset\n' +
          '- < 600 px: 2-column grid, 32 px row gap, 24 px side inset\n\n' +
          '**Design-system notes** — Figma\'s literal `#262626` resolves to ' +
          '`--color-neutral-0` (`#242C33`); labels use `--text-body-sm-*` + ' +
          '`text-transform: uppercase`; values use `--text-subhead-*`. ' +
          'Desktop row gap snaps to the DS 56 px token rather than Figma\'s ' +
          'literal 60 px.\n\n' +
          'Figma: desktop `Frame 13951:51143`, tablet `Frame 13951:51180`, ' +
          'mobile `Frame 13951:51207`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
  },
} satisfies Meta<typeof VdpExteriorInterior>

export default meta
type Story = StoryObj<typeof meta>

/* ─── Sample attribute data ──────────────────────────────────
 * Representative BMW X5 M60i option list matching the Figma
 * frames. The upholstery row uses a color swatch (ivory white)
 * rather than a photographic patch so stories stay asset-free
 * — host apps can pass a real image URL via `swatchImageUrl`. */
const SAMPLE_ATTRIBUTES: AttributeItem[] = [
  {
    label: 'Color',
    value: 'Arctic Race Blue metallic',
    swatchType: 'color',
    swatchColor: '#1F3A5F',
  },
  {
    label: 'Upholstery',
    value: 'Ivory white',
    swatchType: 'color',
    swatchColor: '#F6F1E7',
  },
  {
    label: 'Wheels',
    value: '22" M Aero Black 1027M Wheels',
  },
  {
    label: 'Interior Trim',
    value: 'M Dark Silver Interior',
  },
  {
    label: 'Body Style',
    value: 'SUV',
  },
  {
    label: 'Seats',
    value: '5 seats',
  },
]

const DEFAULT_ARGS = {
  label:      'Exterior & Interior',
  attributes: SAMPLE_ATTRIBUTES,
}

const RENDER = (args: typeof DEFAULT_ARGS) => ({
  components: { VdpExteriorInterior },
  setup() { return { args } },
  template: `
    <div style="padding:40px 32px;max-width:1440px;margin:0 auto;">
      <VdpExteriorInterior v-bind="args" />
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

export const WithoutSwatches: Story = {
  name: 'All plain-text (no swatches)',
  args: {
    ...DEFAULT_ARGS,
    attributes: SAMPLE_ATTRIBUTES.map(({ label, value }) => ({ label, value })),
  },
  render: RENDER,
}

export const ImageSwatch: Story = {
  name: 'Upholstery with image swatch',
  args: {
    ...DEFAULT_ARGS,
    attributes: [
      SAMPLE_ATTRIBUTES[0],
      {
        label: 'Upholstery',
        value: 'Ivory white',
        swatchType: 'image',
        swatchImageUrl:
          'https://images.unsplash.com/photo-1567016546367-c27a0d56712e?w=64&h=64&fit=crop',
        swatchAlt: 'Ivory white perforated leather sample',
      },
      ...SAMPLE_ATTRIBUTES.slice(2),
    ],
  },
  render: RENDER,
}

export const ShortList: Story = {
  name: 'Four attributes only',
  args: {
    ...DEFAULT_ARGS,
    attributes: SAMPLE_ATTRIBUTES.slice(0, 4),
  },
  render: RENDER,
}

export const LongValue: Story = {
  name: 'Long value wraps gracefully',
  args: {
    ...DEFAULT_ARGS,
    attributes: [
      ...SAMPLE_ATTRIBUTES.slice(0, 3),
      {
        label: 'Interior Trim',
        value: 'M Dark Silver Aluminum Tetragon with exclusive stitching',
      },
      ...SAMPLE_ATTRIBUTES.slice(4),
    ],
  },
  render: RENDER,
}
