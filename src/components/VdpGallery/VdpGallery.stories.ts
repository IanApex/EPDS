import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import VdpGallery from './VdpGallery.vue'

const HERO_IMAGE =
  'https://content.homenetiol.com/scaler/1600/900/eb9a7bffdd55493f8934eb98a5b0be7c.jpg'

const meta = {
  title: 'Molecules/VdpGallery',
  component: VdpGallery,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'VDP above-the-fold hero — left column. Renders the primary vehicle photo ' +
          'inside an 864 × 455 frame with two overlay icon buttons pinned top-right: ' +
          'a **tinted** photos icon (opens the full gallery) and a **solid** favorite ' +
          'heart with a selected state. Both share the 40 × 40 circular footprint of ' +
          '`MediumIconButton` but use a distinct white-surface treatment so they stay ' +
          'legible over any photo.\n\n' +
          '**Props** — bind `v-model:favorited` for two-way favorite state. Listen ' +
          'for `@click:photos` to open the gallery modal/route.\n\n' +
          'Figma: node `13948:43354` (gallery frame), `13948:43357` (photos), `13948:43358` (favorite).',
      },
    },
    backgrounds: { default: 'neutral-95' },
  },
  argTypes: {
    imageUrl:   { control: 'text' },
    imageAlt:   { control: 'text' },
    title:      { control: 'text' },
    imageCount: { control: { type: 'number', min: 1 } },
    favorited:  { control: 'boolean' },
  },
  args: {
    imageUrl:   HERO_IMAGE,
    title:      '2026 BMW X5 M60i',
    imageCount: 24,
    favorited:  false,
  },
} satisfies Meta<typeof VdpGallery>

export default meta
type Story = StoryObj<typeof meta>

const simpleTemplate = `
  <div style="padding:32px; max-width:900px;">
    <VdpGallery
      v-bind="args"
      @update:favorited="args.favorited = $event"
      @click:photos="console.log('[VdpGallery] open photos')"
    />
  </div>
`

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    components: { VdpGallery },
    setup() { return { args } },
    template: simpleTemplate,
  }),
}

export const NoImage: Story = {
  name: 'No image (placeholder)',
  args: { imageUrl: undefined },
  render: (args) => ({
    components: { VdpGallery },
    setup() { return { args } },
    template: simpleTemplate,
  }),
}

export const Favorited: Story = {
  name: 'Favorited',
  args: { favorited: true },
  render: (args) => ({
    components: { VdpGallery },
    setup() { return { args } },
    template: simpleTemplate,
  }),
}

export const Interactive: Story = {
  name: 'Interactive (toggle favorite, log photos click)',
  parameters: {
    docs: {
      description: {
        story:
          'Click the heart to toggle favorite. Click the gallery icon to emit `click:photos` (logged to console).',
      },
    },
  },
  render: () => ({
    components: { VdpGallery },
    setup() {
      const favorited = ref(false)
      const onPhotos = () => console.log('[VdpGallery] open photos')
      return { favorited, onPhotos }
    },
    template: `
      <div style="padding:32px; max-width:900px;">
        <VdpGallery
          title="2026 BMW X5 M60i"
          image-url="${HERO_IMAGE}"
          :image-count="24"
          :favorited="favorited"
          @update:favorited="favorited = $event"
          @click:photos="onPhotos"
        />
        <p style="margin-top:16px;font-size:14px;color:#666;">
          Favorited: {{ favorited }}
        </p>
      </div>
    `,
  }),
}
