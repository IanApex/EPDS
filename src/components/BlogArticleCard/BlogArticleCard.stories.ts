import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BlogArticleCard from './BlogArticleCard.vue'
import sampleImage from '../../../Photos/People/gettyimages-1138128053-2048x2048.png'

const meta = {
  title: 'Molecules/BlogArticleCard',
  component: BlogArticleCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Blog / article teaser card with two variants: **photo** (hero image + gradient overlay) and ' +
          '**branded** (green panel with EchoPark logo). ' +
          'Width is 384 px with 240 px media panel and 16 px border-radius.\n\n' +
          'When `href` is provided, the entire card becomes an `<a>` element.',
      },
    },
  },
  argTypes: {
    variant:  { control: 'radio', options: ['photo', 'branded'] },
    meta:     { control: 'text' },
    title:    { control: 'text' },
    imageUrl: { control: 'text' },
    href:     { control: 'text' },
    target:   { control: 'text' },
  },
  args: {
    meta: 'August 10, 2021 • Name of Category',
    title: 'Tips for first-time car buyers to have the best experience',
  },
} satisfies Meta<typeof BlogArticleCard>

export default meta
type Story = StoryObj<typeof meta>

export const Photo: Story = {
  args: {
    variant: 'photo',
    imageUrl: sampleImage,
  },
}

export const PhotoNoImage: Story = {
  name: 'Photo — No Image (Placeholder)',
  args: {
    variant: 'photo',
    imageUrl: '',
  },
}

export const Branded: Story = {
  args: {
    variant: 'branded',
  },
}

export const AsLink: Story = {
  name: 'As Link (hover underline)',
  args: {
    variant: 'photo',
    imageUrl: sampleImage,
    href: '#',
  },
}

export const ThreeUp: Story = {
  name: 'Three-Up Layout',
  render: () => ({
    components: { BlogArticleCard },
    setup() {
      return { sampleImage }
    },
    template: `
      <div style="display: flex; gap: 24px; flex-wrap: wrap;">
        <BlogArticleCard
          variant="photo"
          meta="August 10, 2021 • Buying Tips"
          title="Tips for first-time car buyers to have the best experience"
          :imageUrl="sampleImage"
        />
        <BlogArticleCard
          variant="branded"
          meta="July 15, 2021 • EchoPark News"
          title="EchoPark expands to 5 new locations across the southeast"
        />
        <BlogArticleCard
          variant="photo"
          meta="June 3, 2021 • Maintenance"
          title="How to keep your car running smoothly during summer road trips"
          :imageUrl="sampleImage"
        />
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { BlogArticleCard },
    setup() {
      return { sampleImage }
    },
    template: `
      <div style="display: flex; gap: 32px; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-family: Roboto, sans-serif; font-size: 12px; color: #666B70;">Article photo</span>
          <BlogArticleCard
            variant="photo"
            meta="August 10, 2021 • Name of Category"
            title="Tips for first-time car buyers to have the best experience"
            :imageUrl="sampleImage"
          />
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-family: Roboto, sans-serif; font-size: 12px; color: #666B70;">Article Branded</span>
          <BlogArticleCard
            variant="branded"
            meta="August 10, 2021 • Name of Category"
            title="Tips for first-time car buyers to have the best experience"
          />
        </div>
      </div>
    `,
  }),
}
