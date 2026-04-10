import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'

const carOnly = import.meta.glob<string>(
  '/Photos/Car only/*.png',
  { eager: true, query: '?url', import: 'default' },
)

const echoParkTeam = import.meta.glob<string>(
  '/Photos/EchoPark team/*.png',
  { eager: true, query: '?url', import: 'default' },
)

const nascarPromo = import.meta.glob<string>(
  '/Photos/Nascar promo/*.png',
  { eager: true, query: '?url', import: 'default' },
)

const people = import.meta.glob<string>(
  '/Photos/People/*.png',
  { eager: true, query: '?url', import: 'default' },
)

const serviceProtection = import.meta.glob<string>(
  '/Photos/Service and protection/*.png',
  { eager: true, query: '?url', import: 'default' },
)

const vdpCars = import.meta.glob<string>(
  '/Photos/VDP cars/*.png',
  { eager: true, query: '?url', import: 'default' },
)

function filename(path: string) {
  return path.split('/').pop()!.replace(/\.\w+$/, '')
}

function buildList(modules: Record<string, string>) {
  return Object.entries(modules).map(([path, url]) => ({
    label: filename(path),
    url,
  }))
}

const PhotoTile = defineComponent({
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
            padding: '12px',
            borderRadius: '8px',
            background: '#F5F6F7',
            border: '1px solid #E2E4E7',
          },
        },
        [
          h('img', {
            src: props.url,
            alt: props.label,
            style: {
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '4px',
            },
          }),
          h(
            'span',
            {
              style: {
                fontSize: '11px',
                color: '#6B7280',
                textAlign: 'center',
                wordBreak: 'break-all',
              },
            },
            props.label,
          ),
        ],
      )
  },
})

function categorySection(title: string, items: { label: string; url: string }[]) {
  return defineComponent({
    components: { PhotoTile },
    setup() { return { items } },
    template: `
      <div style="padding: 16px; font-family: sans-serif;">
        <h3 style="margin: 0 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7280;">
          ${title} (${items.length})
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;">
          <PhotoTile v-for="item in items" :key="item.label" :label="item.label" :url="item.url" />
        </div>
      </div>
    `,
  })
}

const meta = {
  title: 'Atoms/Photos',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Photography assets used across the site — hero banners, VDP imagery, team photos, ' +
          'NASCAR promotions, and service/protection visuals. Organized by category subfolder.',
      },
    },
    controls: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const CarOnly: Story = {
  name: 'Car Only',
  render: () => categorySection('Car Only', buildList(carOnly)),
}

export const EchoParkTeam: Story = {
  name: 'EchoPark Team',
  render: () => categorySection('EchoPark Team', buildList(echoParkTeam)),
}

export const NascarPromo: Story = {
  name: 'NASCAR Promo',
  render: () => categorySection('NASCAR Promo', buildList(nascarPromo)),
}

export const People: Story = {
  name: 'People',
  render: () => categorySection('People', buildList(people)),
}

export const ServiceAndProtection: Story = {
  name: 'Service & Protection',
  render: () => categorySection('Service & Protection', buildList(serviceProtection)),
}

export const VdpCars: Story = {
  name: 'VDP Cars',
  render: () => categorySection('VDP Cars', buildList(vdpCars)),
}

export const AllPhotos: Story = {
  name: 'All Photos',
  render: () => {
    const categories = [
      { title: 'Car Only', items: buildList(carOnly) },
      { title: 'EchoPark Team', items: buildList(echoParkTeam) },
      { title: 'NASCAR Promo', items: buildList(nascarPromo) },
      { title: 'People', items: buildList(people) },
      { title: 'Service & Protection', items: buildList(serviceProtection) },
      { title: 'VDP Cars', items: buildList(vdpCars) },
    ]
    return defineComponent({
      components: { PhotoTile },
      setup() { return { categories } },
      template: `
        <div style="padding: 16px; font-family: sans-serif;">
          <div v-for="cat in categories" :key="cat.title" style="margin-bottom: 32px;">
            <h3 style="margin: 0 0 12px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6B7280;">
              {{ cat.title }} ({{ cat.items.length }})
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;">
              <PhotoTile v-for="item in cat.items" :key="item.label" :label="item.label" :url="item.url" />
            </div>
          </div>
        </div>
      `,
    })
  },
}
