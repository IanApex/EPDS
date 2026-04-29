import type { Meta, StoryObj } from '@storybook/vue3-vite'

import ImageContentCard from './ImageContentCard.vue'

import servicePhotoUrl from '../../../Photos/Sonic Automotive/saherodt.jpg'
import engineIconSvg from '../../../icon/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Engine.svg?raw'

const meta = {
  title: 'Organisms/ImageContentCard',
  component: ImageContentCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'White-label promotional card with a full-bleed photo panel ' +
          'and a heading + body + CTA content column.\n\n' +
          'Two independent props control the desktop layout:\n' +
          '- `imagePosition` — which side the photo sits on (`left` / `right`)\n' +
          '- `imageProportion` — whether the photo column is wider (`large` = 58 %) ' +
          'or narrower (`small` = 42 %)\n\n' +
          'Combined they give four layouts: image-large-left (default), ' +
          'image-small-left, image-large-right, image-small-right.\n\n' +
          'Mobile: image always stacks above content at 180 px, ' +
          'CTA stretches full-width. All colours are token-driven — ' +
          "the CTA automatically inherits the host page's " +
          '`--color-btn-primary-*` brand tokens.',
      },
    },
  },
  argTypes: {
    imagePosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
    },
    imageProportion: {
      control: { type: 'radio' },
      options: ['large', 'small'],
    },
  },
  args: {
    imageUrl: servicePhotoUrl,
    imageAlt: '',
    iconSvg: engineIconSvg,
    heading: 'Service',
    body:
      'From routine maintenance to collision repair, our service and ' +
      'parts centers are spread across the country to help you ' +
      'whenever you need us.',
    ctaLabel: 'Find service & parts centers',
    imagePosition: 'left',
    imageProportion: 'large',
  },
} satisfies Meta<typeof ImageContentCard>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ImageLargeLeft (default) — big photo on the left (~58 %),
 * content column on the right. Matches the Figma desktop spec.
 */
export const ImageLargeLeft: Story = {}

/**
 * TextLargeRight — narrow photo on the left (~42 %),
 * wide content column on the right. Use when the copy needs
 * more breathing room than the image.
 */
export const TextLargeRight: Story = {
  args: { imagePosition: 'left', imageProportion: 'small' },
}

/**
 * ImageLargeRight — wide photo on the right (~58 %),
 * narrow content column on the left. Alternating-row variant
 * that gives the image the dominant visual weight.
 */
export const ImageLargeRight: Story = {
  args: { imagePosition: 'right', imageProportion: 'large' },
}

/**
 * TextLargeLeft — wide content column on the left,
 * narrow photo on the right (~42 %). Use for alternating rows
 * where the copy is the main focus.
 */
export const TextLargeLeft: Story = {
  args: { imagePosition: 'right', imageProportion: 'small' },
}

/** No icon — heading renders without a preceding icon. */
export const NoIcon: Story = {
  args: { iconSvg: undefined },
}

/** Mobile viewport — image stacks on top, full-width CTA. */
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    layout: 'fullscreen',
  },
}
