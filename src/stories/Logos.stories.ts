import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'

// ─── Asset imports (as URLs to preserve original multi-colour fills) ──────────
// ?url is a Vite built-in — no plugin required.

const brandLogoUrls = import.meta.glob<string>(
  '/Logos/*.svg',
  { eager: true, query: '?url', import: 'default' },
)

const thirdPartyLogoUrls = import.meta.glob<string>(
  '/Logos/3rd Party/*.svg',
  { eager: true, query: '?url', import: 'default' },
)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function filename(path: string) {
  return path.split('/').pop()!.replace('.svg', '')
}

function labelFromFilename(name: string) {
  // "Color=EP-FullColor" → "EP-FullColor"
  // "Property 1=EP-FullColor" → "EP-FullColor (Property 1)"
  // "2024_consumer_satisfaction_logo" → "2024 Consumer Satisfaction"
  const eqIdx = name.indexOf('=')
  if (eqIdx > -1) {
    const prop = name.slice(0, eqIdx).trim()
    const val = name.slice(eqIdx + 1).trim()
    return prop === 'Color' ? val : `${val} (${prop})`
  }
  return name.replace(/_/g, ' ').replace(/logo$/i, '').trim()
}

function buildList(modules: Record<string, string>) {
  return Object.entries(modules).map(([path, url]) => ({
    label: labelFromFilename(filename(path)),
    url,
  }))
}

// ─── Logo tile component ──────────────────────────────────────────────────────

const LogoTile = defineComponent({
  props: {
    label: { type: String, required: true },
    url: { type: String, required: true },
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
            gap: '8px',
            padding: '20px 16px',
            borderRadius: '8px',
            background: props.dark ? '#242C33' : '#F5F6F7',
            border: `1px solid ${props.dark ? '#3E4A53' : '#E2E4E7'}`,
          },
        },
        [
          h('img', {
            src: props.url,
            alt: props.label,
            style: { maxWidth: '160px', maxHeight: '64px', objectFit: 'contain' },
          }),
          h(
            'span',
            {
              style: {
                fontSize: '11px',
                color: props.dark ? '#CDD0D4' : '#6B7280',
                textAlign: 'center',
              },
            },
            props.label,
          ),
        ],
      )
  },
})

const LogoGrid = defineComponent({
  props: {
    logos: {
      type: Array as () => Array<{ label: string; url: string }>,
      required: true,
    },
    dark: { type: Boolean, default: false },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px',
          },
        },
        props.logos.map((l) => h(LogoTile, { label: l.label, url: l.url, dark: props.dark })),
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
            margin: '28px 0 12px',
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

// ─── Storybook meta ───────────────────────────────────────────────────────────

const meta = {
  title: 'Atoms/Logos',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'All EchoPark brand logos and approved third-party logos. ' +
          'Logos are imported as static URLs (not as Vue components) ' +
          'to preserve their original multi-colour fills.',
      },
    },
    controls: { disable: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ─── EchoPark brand logos ─────────────────────────────────────────────────────

export const BrandLogos: Story = {
  name: 'EchoPark Brand Logos',
  render: () => {
    const logos = buildList(brandLogoUrls)
    const light = logos.filter(
      (l) => !l.label.toLowerCase().includes('white') && !l.label.toLowerCase().includes('green'),
    )
    const dark = logos.filter(
      (l) => l.label.toLowerCase().includes('white') || l.label.toLowerCase().includes('green'),
    )
    return defineComponent({
      components: { SectionHeading, LogoGrid },
      setup() { return { light, dark } },
      template: `
        <div style="padding: 16px; font-family: sans-serif;">
          <SectionHeading text="Light backgrounds" />
          <LogoGrid :logos="light" />
          <SectionHeading text="Dark backgrounds" />
          <LogoGrid :logos="dark" :dark="true" />
        </div>
      `,
    })
  },
}

// ─── Third-party logos ────────────────────────────────────────────────────────

export const ThirdPartyLogos: Story = {
  name: '3rd Party Logos',
  render: () => {
    const logos = buildList(thirdPartyLogoUrls)
    return defineComponent({
      components: { SectionHeading, LogoGrid },
      setup() { return { logos } },
      template: `
        <div style="padding: 16px; font-family: sans-serif;">
          <SectionHeading text="Third-party / partner logos" />
          <LogoGrid :logos="logos" />
        </div>
      `,
    })
  },
}
