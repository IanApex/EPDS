import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseButton from './BaseButton.vue'

const meta = {
  title: 'Components/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary CTA button in two sizes. ' +
          '`md` maps to Figma "Buttons/Primary" (56px); ' +
          '`sm` maps to Figma "Buttons/Tertiary" (40px). ' +
          'All interaction states are handled via CSS pseudo-classes.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label. Also accepts content via the default slot.',
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'],
      description: 'Visual size of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button.',
    },
    onClick: { action: 'click' },
  },
  args: {
    label: 'Pick up here',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Medium (default) ────────────────────────────────────

export const Default: Story = {}

export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Hover — darker green + underlined text.' } },
  },
}

export const Active: Story = {
  parameters: {
    pseudo: { active: true },
    docs: { description: { story: 'Pressed/active — bright green.' } },
  },
}

export const Focus: Story = {
  parameters: {
    pseudo: { focusVisible: true },
    docs: { description: { story: 'Focus-visible — primary green with accessibility blue ring.' } },
  },
}

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: { description: { story: 'Disabled — muted grey, not interactive.' } },
  },
}

// ─── Small ───────────────────────────────────────────────

export const SmallDefault: Story = {
  name: 'Small / Default',
  args: { size: 'sm' },
}

export const SmallHover: Story = {
  name: 'Small / Hover',
  args: { size: 'sm' },
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Small hover — darker green + underlined text.' } },
  },
}

export const SmallActive: Story = {
  name: 'Small / Active',
  args: { size: 'sm' },
  parameters: {
    pseudo: { active: true },
  },
}

export const SmallFocus: Story = {
  name: 'Small / Focus',
  args: { size: 'sm' },
  parameters: {
    pseudo: { focusVisible: true },
  },
}

export const SmallDisabled: Story = {
  name: 'Small / Disabled',
  args: { size: 'sm', disabled: true },
}

// ─── Both sizes together ──────────────────────────────────

export const SizeComparison: Story = {
  name: 'Size comparison',
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <BaseButton label="Pick up here" size="md" />
        <BaseButton label="Pick up here" size="sm" />
      </div>
    `,
  }),
  parameters: {
    docs: { description: { story: 'Side-by-side comparison of md (56px) and sm (40px) sizes.' } },
  },
}
