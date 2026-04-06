import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h, ref } from 'vue'
import SmallIconButton from './SmallIconButton.vue'

// ─── Icon helpers ─────────────────────────────────────────────────────────────

import heartFilledSvg from '../../../icon/Style=Account, Detail=Heart-Filled, Icon=NA.svg?raw'
import bookmarkFilledSvg from '../../../icon/Style=Account, Detail=Bookmark-Filled, Icon=NA.svg?raw'

function makeIconSlot(svgString: string) {
  return defineComponent({
    render: () => h('span', { innerHTML: svgString, style: 'display: contents' }),
  })
}

const HeartFilledIcon = makeIconSlot(heartFilledSvg)
const BookmarkFilledIcon = makeIconSlot(bookmarkFilledSvg)

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Buttons/SmallIconButton',
  component: SmallIconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '32×32 circular **toggle** button with a white background and neutral border. ' +
          'Used for save/favourite actions on product cards.\n\n' +
          '**Unselected**: grey icon (`Neutral70`).\n\n' +
          '**Selected**: green icon (`Primary50`) — steps to `Primary55` on hover.\n\n' +
          'Parent component is responsible for toggling `selected` in response to the `click` emit.\n\n' +
          '`ariaLabel` is **required** — no visible text. The browser announces the label ' +
          'together with the `aria-pressed` state automatically.\n\n' +
          'Figma: "IconButtons/Favorite".',
      },
    },
  },
  argTypes: {
    ariaLabel: { control: 'text' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    ariaLabel: 'Save to favourites',
    selected: false,
    disabled: false,
  },
} satisfies Meta<typeof SmallIconButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Render helpers ───────────────────────────────────────────────────────────

const withHeart = {
  render: (args: Record<string, unknown>) => ({
    components: { SmallIconButton, HeartFilledIcon },
    setup() { return { args } },
    template: `
      <SmallIconButton v-bind="args" @click="args.onClick">
        <template #icon><HeartFilledIcon /></template>
      </SmallIconButton>
    `,
  }),
}

// ─── States ───────────────────────────────────────────────────────────────────

export const DefaultUnselected: Story = {
  ...withHeart,
  name: 'Default (unselected)',
}

export const DefaultSelected: Story = {
  ...withHeart,
  name: 'Default (selected)',
  args: { selected: true },
  parameters: {
    docs: { description: { story: 'Icon turns Primary50 green when selected.' } },
  },
}

export const HoverUnselected: Story = {
  ...withHeart,
  name: 'Hover (unselected)',
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Border thickens to 2px Neutral90.' } },
  },
}

export const HoverSelected: Story = {
  ...withHeart,
  name: 'Hover (selected)',
  args: { selected: true },
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Icon steps from Primary50 to Primary55 on hover.' } },
  },
}

export const Focus: Story = {
  ...withHeart,
  name: 'Focus',
  parameters: {
    pseudo: { focusVisible: true },
    docs: { description: { story: '3px Accessibility80 inset border, icon stays grey.' } },
  },
}

export const FocusSelected: Story = {
  ...withHeart,
  name: 'Focus (selected)',
  args: { selected: true },
  parameters: {
    pseudo: { focusVisible: true },
    docs: { description: { story: '3px Accessibility80 inset border, icon stays green.' } },
  },
}

export const Disabled: Story = {
  ...withHeart,
  args: { disabled: true },
  parameters: {
    docs: { description: { story: 'Reduced opacity, cursor not-allowed.' } },
  },
}

// ─── Interactive toggle ───────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (click to toggle)',
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates parent-managed toggle. The parent holds state and flips `selected` on each `click` emit.',
      },
    },
  },
  render: () => ({
    components: { SmallIconButton, HeartFilledIcon },
    setup() {
      const isSaved = ref(false)
      function toggle() { isSaved.value = !isSaved.value }
      return { isSaved, toggle }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
        <SmallIconButton
          :selected="isSaved"
          :aria-label="isSaved ? 'Remove from favourites' : 'Save to favourites'"
          @click="toggle"
        >
          <template #icon><HeartFilledIcon /></template>
        </SmallIconButton>
        <span style="font-size: 13px; color: #666;">{{ isSaved ? 'Saved ♥' : 'Not saved' }}</span>
      </div>
    `,
  }),
}

// ─── All states comparison ────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => ({
    components: { SmallIconButton, HeartFilledIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 16px;">
        <SmallIconButton aria-label="Unselected">
          <template #icon><HeartFilledIcon /></template>
        </SmallIconButton>
        <SmallIconButton aria-label="Selected" :selected="true">
          <template #icon><HeartFilledIcon /></template>
        </SmallIconButton>
        <SmallIconButton aria-label="Disabled" :disabled="true">
          <template #icon><HeartFilledIcon /></template>
        </SmallIconButton>
      </div>
    `,
  }),
}

// ─── Icon variety ─────────────────────────────────────────────────────────────

export const IconVariety: Story = {
  name: 'With different icons',
  parameters: {
    docs: {
      description: {
        story: 'Any system icon works — shown here with Bookmark-Filled.',
      },
    },
  },
  render: () => ({
    components: { SmallIconButton, HeartFilledIcon, BookmarkFilledIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
        <SmallIconButton aria-label="Save to favourites">
          <template #icon><HeartFilledIcon /></template>
        </SmallIconButton>
        <SmallIconButton aria-label="Save to favourites" :selected="true">
          <template #icon><HeartFilledIcon /></template>
        </SmallIconButton>
        <SmallIconButton aria-label="Bookmark">
          <template #icon><BookmarkFilledIcon /></template>
        </SmallIconButton>
        <SmallIconButton aria-label="Bookmark" :selected="true">
          <template #icon><BookmarkFilledIcon /></template>
        </SmallIconButton>
      </div>
    `,
  }),
}
