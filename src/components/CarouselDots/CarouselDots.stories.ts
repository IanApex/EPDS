import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import CarouselDots from './CarouselDots.vue'

const meta = {
  title: 'Molecules/CarouselDots',
  component: CarouselDots,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Carousel page-indicator dots. One dot per slide; all dots share the same dark fill and light gray ring; the active dot is larger.\n\n' +
          '**Fill:** `--color-neutral-20` · **Border:** 1px `--color-neutral-90` · **Inactive:** 8×8px · **Active:** 12×12px · **Gap:** `--spacing-xxxs` (16px)\n\n' +
          'Bind `v-model` to the carousel\'s current slide index (0-based). ' +
          'Clicking a dot emits the target index so the parent can sync the carousel.\n\n' +
          '```html\n' +
          '<CarouselDots :count="images.length" v-model="currentSlide" />\n' +
          '```\n\n' +
          'Figma: "SRP Tile Carousel Dots".',
      },
    },
  },
  argTypes: {
    count:      { control: { type: 'number', min: 1, max: 20 } },
    modelValue: { control: { type: 'number', min: 0 } },
  },
  args: {
    count:      9,
    modelValue: 0,
  },
} satisfies Meta<typeof CarouselDots>

export default meta
type Story = StoryObj<typeof meta>

// ─── Static positions ──────────────────────────────────────────────────────────

export const FirstActive: Story = {
  name: 'First active',
  args: { count: 9, modelValue: 0 },
  render: (args) => ({
    components: { CarouselDots },
    setup() { return { args } },
    template: `<div style="padding:24px;"><CarouselDots v-bind="args" /></div>`,
  }),
}

export const MiddleActive: Story = {
  name: 'Middle active',
  args: { count: 9, modelValue: 4 },
  render: (args) => ({
    components: { CarouselDots },
    setup() { return { args } },
    template: `<div style="padding:24px;"><CarouselDots v-bind="args" /></div>`,
  }),
}

export const LastActive: Story = {
  name: 'Last active',
  args: { count: 9, modelValue: 8 },
  render: (args) => ({
    components: { CarouselDots },
    setup() { return { args } },
    template: `<div style="padding:24px;"><CarouselDots v-bind="args" /></div>`,
  }),
}

// ─── Interactive ───────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (click dots)',
  parameters: {
    docs: {
      description: { story: 'Click any dot to move the active position.' },
    },
  },
  render: () => ({
    components: { CarouselDots },
    setup() {
      const current = ref(0)
      return { current }
    },
    template: `
      <div style="padding:24px;display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <CarouselDots :count="9" v-model="current" />
        <p style="font-size:14px;color:#666;">Active index: {{ current }}</p>
      </div>
    `,
  }),
}

// ─── Different counts ──────────────────────────────────────────────────────────

export const VariousCounts: Story = {
  name: 'Various counts',
  parameters: {
    docs: {
      description: { story: '3, 5, 9, and 15 dots — each with the middle dot active.' },
    },
  },
  render: () => ({
    components: { CarouselDots },
    template: `
      <div style="padding:24px;display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <CarouselDots :count="3"  :modelValue="1" />
        <CarouselDots :count="5"  :modelValue="2" />
        <CarouselDots :count="9"  :modelValue="4" />
        <CarouselDots :count="15" :modelValue="7" />
      </div>
    `,
  }),
}
