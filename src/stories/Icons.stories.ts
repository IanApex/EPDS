import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'

// ─── Asset imports (raw SVG strings — Vite built-in, no plugin needed) ────────

const systemIconModules = import.meta.glob<string>(
  '/icon/Style=*.svg',
  { eager: true, query: '?raw', import: 'default' },
)

const illustrativeModules = import.meta.glob<string>(
  '/icon/Icon=Illustrative, Name=*.svg',
  { eager: true, query: '?raw', import: 'default' },
)

const vehicleLargeModules = import.meta.glob<string>(
  '/icon/Icon Type=Vehicle Descriptors, Size=Large, Theme=*.svg',
  { eager: true, query: '?raw', import: 'default' },
)

const vehicleMediumModules = import.meta.glob<string>(
  '/icon/Icon Type=Vehicle Descriptors, Size=Medium, Theme=*.svg',
  { eager: true, query: '?raw', import: 'default' },
)

const vehicleSmallModules = import.meta.glob<string>(
  '/icon/Icon Type=Vehicle Descriptors, Size=Small, Theme=*.svg',
  { eager: true, query: '?raw', import: 'default' },
)

const vehicleDescriptorModules = import.meta.glob<string>(
  '/icon/Style=Vehicle-Descriptors, *.svg',
  { eager: true, query: '?raw', import: 'default' },
)

const mediumModules = import.meta.glob<string>(
  '/icon/Style=Medium, *.svg',
  { eager: true, query: '?raw', import: 'default' },
)

const smallModules = import.meta.glob<string>(
  '/icon/Style=Small, *.svg',
  { eager: true, query: '?raw', import: 'default' },
)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function filename(path: string) {
  return path.split('/').pop()!.replace('.svg', '')
}

function extractProp(name: string, str: string): string {
  const m = str.match(new RegExp(`${name}=([^,\\.]+)`))
  return m ? m[1].trim() : ''
}

function groupByStyle(modules: Record<string, string>) {
  const groups: Record<string, Array<{ label: string; svg: string }>> = {}
  for (const [path, svg] of Object.entries(modules)) {
    const name = filename(path)
    const style = extractProp('Style', name)
    const detail = extractProp('Detail', name)
    const icon = extractProp('Icon', name)
    const label = [detail, icon !== 'NA' ? icon : ''].filter(Boolean).join(' · ')
    if (!groups[style]) groups[style] = []
    groups[style].push({ label: label || name, svg })
  }
  return groups
}

function flatList(modules: Record<string, string>, labelFn: (name: string) => string) {
  return Object.entries(modules).map(([path, svg]) => ({
    label: labelFn(filename(path)),
    svg,
  }))
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const IconTile = defineComponent({
  props: {
    label: { type: String, required: true },
    svg: { type: String, required: true },
    dark: { type: Boolean, default: false },
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
            gap: '6px',
            padding: '12px 8px',
            borderRadius: '6px',
            background: props.dark ? '#242C33' : '#F5F6F7',
            minWidth: '88px',
            maxWidth: '104px',
          },
        },
        [
          h('div', {
            innerHTML: props.svg,
            style: 'line-height: 0; display: flex; align-items: center; justify-content: center;',
          }),
          h(
            'span',
            {
              style: {
                fontSize: '10px',
                textAlign: 'center',
                lineHeight: '1.3',
                color: props.dark ? '#fff' : '#242C33',
                wordBreak: 'break-word',
              },
            },
            props.label,
          ),
        ],
      )
  },
})

const SectionHeading = defineComponent({
  props: { text: { type: String, required: true } },
  setup(props) {
    return () =>
      h(
        'h3',
        {
          style: {
            margin: '24px 0 8px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#6B7280',
          },
        },
        props.text,
      )
  },
})

const IconGrid = defineComponent({
  props: {
    icons: {
      type: Array as () => Array<{ label: string; svg: string }>,
      required: true,
    },
    dark: { type: Boolean, default: false },
  },
  setup(props) {
    return () =>
      h(
        'div',
        { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } },
        props.icons.map((item) =>
          h(IconTile, { label: item.label, svg: item.svg, dark: props.dark }),
        ),
      )
  },
})

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta = {
  title: 'Foundations/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**System icons** (Style=…) are 24×24 single-colour SVGs. ' +
          'Import with `?raw` and render via `v-html`; ' +
          'use `fill: currentColor` via `:deep(path)` to inherit the surrounding text colour.\n\n' +
          '**Illustrative icons** are multi-colour display icons.\n\n' +
          '**Vehicle Descriptor icons** exist in Large, Medium, and Small sizes.',
      },
    },
    controls: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─── System icons ─────────────────────────────────────────────────────────────

export const SystemIcons: Story = {
  name: 'System Icons',
  render: () => {
    const groups = groupByStyle(systemIconModules)
    return defineComponent({
      components: { SectionHeading, IconGrid },
      setup() { return { groups } },
      template: `
        <div style="padding: 16px; font-family: sans-serif;">
          <template v-for="(icons, category) in groups" :key="category">
            <SectionHeading :text="String(category)" />
            <IconGrid :icons="icons" />
          </template>
        </div>
      `,
    })
  },
}

// ─── Illustrative icons ───────────────────────────────────────────────────────

export const IllustrativeIcons: Story = {
  name: 'Illustrative Icons',
  render: () => {
    const icons = flatList(
      illustrativeModules,
      (name) => extractProp('Name', name).replace(/-/g, ' '),
    )
    return defineComponent({
      components: { IconGrid },
      setup() { return { icons } },
      template: `<div style="padding: 16px;"><IconGrid :icons="icons" /></div>`,
    })
  },
}

// ─── Vehicle Descriptor icons ─────────────────────────────────────────────────

export const VehicleDescriptors: Story = {
  name: 'Vehicle Descriptor Icons',
  render: () => {
    const large = flatList(vehicleLargeModules, (n) => extractProp('Theme', n))
    const medium = flatList(vehicleMediumModules, (n) => extractProp('Theme', n))
    const small = flatList(vehicleSmallModules, (n) => extractProp('Theme', n))
    const style = flatList(vehicleDescriptorModules, (n) => {
      const detail = extractProp('Detail', n)
      const icon = extractProp('Icon', n)
      return [detail, icon !== 'NA' ? icon : ''].filter(Boolean).join(' · ')
    })
    return defineComponent({
      components: { SectionHeading, IconGrid },
      setup() { return { large, medium, small, style } },
      template: `
        <div style="padding: 16px; font-family: sans-serif;">
          <SectionHeading text="Large" />
          <IconGrid :icons="large" />
          <SectionHeading text="Medium" />
          <IconGrid :icons="medium" />
          <SectionHeading text="Small" />
          <IconGrid :icons="small" />
          <SectionHeading text="Style = Vehicle Descriptors" />
          <IconGrid :icons="style" />
        </div>
      `,
    })
  },
}

// ─── Medium & Small utility icons ─────────────────────────────────────────────

export const UtilityIcons: Story = {
  name: 'Utility Icons (Medium & Small)',
  render: () => {
    const medium = flatList(mediumModules, (n) => {
      const icon = extractProp('Icon', n)
      return icon !== 'NA' ? icon : extractProp('Detail', n)
    })
    const small = flatList(smallModules, (n) => {
      const icon = extractProp('Icon', n)
      return icon !== 'NA' ? icon : extractProp('Detail', n)
    })
    return defineComponent({
      components: { SectionHeading, IconGrid },
      setup() { return { medium, small } },
      template: `
        <div style="padding: 16px; font-family: sans-serif;">
          <SectionHeading text="Medium — Neutral20 background" />
          <IconGrid :icons="medium" />
          <SectionHeading text="Small — White" />
          <IconGrid :icons="small" :dark="true" />
        </div>
      `,
    })
  },
}
