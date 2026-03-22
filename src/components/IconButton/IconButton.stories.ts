import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'
import IconButton from './IconButton.vue'
import profileCircleSvg from '../../../icon/Style=Account, Detail=Profile-Circle, Icon=NA.svg?raw'

/** Wraps the raw SVG string so it can be used in the #icon slot. */
const ProfileCircleIcon = defineComponent({
  render: () => h('span', { innerHTML: profileCircleSvg, style: 'display: contents' }),
})

const meta = {
  title: 'Components/CTAs/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Small primary button with a leading icon slot.\n\n' +
          'Always 40px tall, always primary green — use for icon-labelled actions ' +
          'like "Sign in". Pass any 24×24 SVG using `currentColor` via the `#icon` slot ' +
          'so it inherits all interaction state colours automatically.\n\n' +
          'Figma: "IconButtons/SignIn".',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    label: 'Sign in',
    disabled: false,
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

const withIcon = {
  render: (args: Record<string, unknown>) => ({
    components: { IconButton, ProfileCircleIcon },
    setup() { return { args } },
    template: `
      <IconButton v-bind="args" @click="args.onClick">
        <template #icon><ProfileCircleIcon /></template>
        {{ args.label }}
      </IconButton>
    `,
  }),
}

// ─── States ──────────────────────────────────────────────

export const Default: Story = { ...withIcon }

export const Hover: Story = {
  ...withIcon,
  name: 'Hover',
  parameters: { pseudo: { hover: true } },
}

export const Active: Story = {
  ...withIcon,
  name: 'Active (Pressed)',
  parameters: {
    pseudo: { active: true },
    docs: { description: { story: 'Steps to Primary55 (#5C9C08) — a lighter green.' } },
  },
}

export const Focus: Story = {
  ...withIcon,
  name: 'Focus',
  parameters: {
    pseudo: { focusVisible: true },
    docs: { description: { story: '3px Accessibility80 border; background stays Primary50.' } },
  },
}

export const Disabled: Story = {
  ...withIcon,
  args: { disabled: true },
}

// ─── Label-only (no icon slot) ────────────────────────────

export const NoIcon: Story = {
  name: 'Without icon',
  args: { label: 'Continue' },
  parameters: {
    docs: { description: { story: 'Works without the `#icon` slot — renders as a compact primary button.' } },
  },
}

// ─── All states comparison ────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => ({
    components: { IconButton, ProfileCircleIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; padding: 16px;">
        <IconButton label="Default">
          <template #icon><ProfileCircleIcon /></template>
        </IconButton>
        <IconButton label="Disabled" :disabled="true">
          <template #icon><ProfileCircleIcon /></template>
        </IconButton>
      </div>
    `,
  }),
}
