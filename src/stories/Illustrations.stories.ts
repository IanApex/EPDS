import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'

const svgUrls = import.meta.glob<string>(
  '/Illustrations/*.svg',
  { eager: true, query: '?url', import: 'default' },
)

const pngUrls = import.meta.glob<string>(
  '/Illustrations/*.png',
  { eager: true, query: '?url', import: 'default' },
)

function filename(path: string) {
  return path.split('/').pop()!.replace(/\.\w+$/, '')
}

function labelFromFilename(name: string) {
  const eqIdx = name.indexOf('=')
  const base = eqIdx > -1 ? name.slice(eqIdx + 1).trim() : name
  const is2x = base.endsWith('@2x')
  const clean = is2x ? base.slice(0, -3) : base
  const spaced = clean.replace(/([a-z])([A-Z])/g, '$1 $2')
  return is2x ? `${spaced} (@2x)` : spaced
}

function buildList(modules: Record<string, string>) {
  return Object.entries(modules).map(([path, url]) => ({
    label: labelFromFilename(filename(path)),
    url,
  }))
}

const IllustrationTile = defineComponent({
  props: {
    label: { type: String, required: true },
    url: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '20px 16px',
            borderRadius: '8px',
            background: '#F5F6F7',
            border: '1px solid #E2E4E7',
          },
        },
        [
          h('img', {
            src: props.url,
            alt: props.label,
            style: { maxWidth: '280px', maxHeight: '180px', objectFit: 'contain' },
          }),
          h(
            'span',
            {
              style: {
                fontSize: '11px',
                color: '#6B7280',
                textAlign: 'center',
              },
            },
            props.label,
          ),
        ],
      )
  },
})

const meta = {
  title: 'Atoms/Illustrations',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-colour illustrations used for marketing content, empty states, hero sections, ' +
          'and 190-point inspection badges. Imported as static URLs (`?url`) to preserve original fills. ' +
          '@2x variants are provided for high-DPI displays.',
      },
    },
    controls: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllIllustrations: Story = {
  name: 'All Illustrations',
  render: () => {
    const all = buildList(svgUrls)
    const standard = all.filter((i) => !i.label.includes('@2x'))
    const retina = all.filter((i) => i.label.includes('@2x'))

    return defineComponent({
      components: { IllustrationTile },
      setup() { return { standard, retina } },
      template: `
        <div style="padding: 16px; font-family: sans-serif;">
          <h3 style="margin: 0 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7280;">
            Standard (1x)
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
            <IllustrationTile v-for="item in standard" :key="item.label" :label="item.label" :url="item.url" />
          </div>
          <h3 style="margin: 28px 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7280;">
            Retina (2x)
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
            <IllustrationTile v-for="item in retina" :key="item.label" :label="item.label" :url="item.url" />
          </div>
        </div>
      `,
    })
  },
}

export const RasterImages: Story = {
  name: 'Raster Images (PNG)',
  render: () => {
    const all = buildList(pngUrls)
    const inspection = all.filter((i) => i.label.startsWith('Size'))
    const other = all.filter((i) => !i.label.startsWith('Size'))

    return defineComponent({
      components: { IllustrationTile },
      setup() { return { inspection, other } },
      template: `
        <div style="padding: 16px; font-family: sans-serif;">
          <h3 style="margin: 0 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7280;">
            190-Point Inspection
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
            <IllustrationTile v-for="item in inspection" :key="item.label" :label="item.label" :url="item.url" />
          </div>
          <h3 style="margin: 28px 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7280;">
            Finance
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
            <IllustrationTile v-for="item in other" :key="item.label" :label="item.label" :url="item.url" />
          </div>
        </div>
      `,
    })
  },
}
