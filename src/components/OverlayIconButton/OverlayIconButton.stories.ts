import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h, ref } from 'vue'
import OverlayIconButton from './OverlayIconButton.vue'

import imageStackSvg  from '../../../icon/Style=Media, Detail=Image, Icon=NA.svg?raw'
import heartFilledSvg from '../../../icon/Style=Account, Detail=Heart-Filled, Icon=NA.svg?raw'

function makeIconSlot(svgString: string) {
  return defineComponent({
    render: () => h('span', { innerHTML: svgString, style: 'display: contents' }),
  })
}

const PhotosIcon = makeIconSlot(imageStackSvg)
const HeartIcon  = makeIconSlot(heartFilledSvg)

const HERO_IMAGE =
  'https://content.homenetiol.com/scaler/1600/900/eb9a7bffdd55493f8934eb98a5b0be7c.jpg'

const meta = {
  title: 'Atoms/Buttons/OverlayIconButton',
  component: OverlayIconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '40 × 40 circular icon button for placement over a photo. White ' +
          'surface with an accent-coloured icon; `selected` flips to an ' +
          'accent fill with a white icon. Icon slot inherits `currentColor`, ' +
          'so SVG fills track hover and selected states automatically.\n\n' +
          '`ariaLabel` is required; set `ariaPressed` for toggle semantics.',
      },
    },
  },
  argTypes: {
    ariaLabel:   { control: 'text' },
    selected:    { control: 'boolean' },
    ariaPressed: { control: 'boolean' },
    disabled:    { control: 'boolean' },
  },
  args: {
    ariaLabel: 'Save to favorites',
    selected:  false,
    disabled:  false,
  },
} satisfies Meta<typeof OverlayIconButton>

export default meta
type Story = StoryObj<typeof meta>

const backdrop =
  `background-image: url('${HERO_IMAGE}'); ` +
  `background-size: cover; background-position: center; ` +
  `padding: 32px; border-radius: 8px; display: inline-flex; gap: 8px;`

export const Default: Story = {
  render: (args) => ({
    components: { OverlayIconButton, HeartIcon },
    setup() { return { args } },
    template: `
      <div style="${backdrop}">
        <OverlayIconButton v-bind="args" @click="console.log('[OverlayIconButton] click')">
          <template #icon><HeartIcon /></template>
        </OverlayIconButton>
      </div>
    `,
  }),
}

export const Selected: Story = {
  name: 'Selected',
  args: { ariaLabel: 'Remove from favorites', selected: true, ariaPressed: true },
  render: (args) => ({
    components: { OverlayIconButton, HeartIcon },
    setup() { return { args } },
    template: `
      <div style="${backdrop}">
        <OverlayIconButton v-bind="args" @click="console.log('[OverlayIconButton] click')">
          <template #icon><HeartIcon /></template>
        </OverlayIconButton>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    components: { OverlayIconButton, HeartIcon },
    setup() { return { args } },
    template: `
      <div style="${backdrop}">
        <OverlayIconButton v-bind="args">
          <template #icon><HeartIcon /></template>
        </OverlayIconButton>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  name: 'Interactive (photos + favorite toggle)',
  render: () => ({
    components: { OverlayIconButton, PhotosIcon, HeartIcon },
    setup() {
      const favorited = ref(false)
      return { favorited }
    },
    template: `
      <div style="${backdrop}">
        <OverlayIconButton
          aria-label="View all photos"
          @click="console.log('[OverlayIconButton] open photos')"
        >
          <template #icon><PhotosIcon /></template>
        </OverlayIconButton>

        <OverlayIconButton
          :aria-label="favorited ? 'Remove from favorites' : 'Save to favorites'"
          :selected="favorited"
          :aria-pressed="favorited"
          @click="favorited = !favorited"
        >
          <template #icon><HeartIcon /></template>
        </OverlayIconButton>
      </div>
    `,
  }),
}
