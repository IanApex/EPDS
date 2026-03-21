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
          'CTA button in two variants and two sizes.\n\n' +
          '**primary** — filled green. `md` = Figma "Buttons/Primary" (56px); `sm` = Figma "Buttons/Tertiary" (40px).\n\n' +
          '**secondary** — outlined dark. Figma "Buttons/Secondary" (56px only).\n\n' +
          'All interaction states are handled via CSS pseudo-classes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Visual variant.',
    },
    size: {
      control: 'radio',
      options: ['md', 'sm'],
      description: 'Visual size.',
    },
    label: {
      control: 'text',
      description: 'Button label. Also accepts content via the default slot.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button.',
    },
    onClick: { action: 'click' },
  },
  args: {
    label: 'Pick up here',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Primary / Medium ────────────────────────────────────

export const PrimaryDefault: Story = {
  name: 'Primary / Default',
}

export const PrimaryHover: Story = {
  name: 'Primary / Hover',
  parameters: { pseudo: { hover: true } },
}

export const PrimaryActive: Story = {
  name: 'Primary / Active',
  parameters: { pseudo: { active: true } },
}

export const PrimaryFocus: Story = {
  name: 'Primary / Focus',
  parameters: { pseudo: { focusVisible: true } },
}

export const PrimaryDisabled: Story = {
  name: 'Primary / Disabled',
  args: { disabled: true },
}

// ─── Primary / Small ─────────────────────────────────────

export const PrimarySmDefault: Story = {
  name: 'Primary Small / Default',
  args: { size: 'sm' },
}

export const PrimarySmHover: Story = {
  name: 'Primary Small / Hover',
  args: { size: 'sm' },
  parameters: { pseudo: { hover: true } },
}

export const PrimarySmDisabled: Story = {
  name: 'Primary Small / Disabled',
  args: { size: 'sm', disabled: true },
}

// ─── Secondary ───────────────────────────────────────────

export const SecondaryDefault: Story = {
  name: 'Secondary / Default',
  args: { variant: 'secondary' },
}

export const SecondaryHover: Story = {
  name: 'Secondary / Hover',
  args: { variant: 'secondary' },
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Border widens from 2px to 4px on hover.' } },
  },
}

export const SecondaryActive: Story = {
  name: 'Secondary / Active',
  args: { variant: 'secondary' },
  parameters: {
    pseudo: { active: true },
    docs: { description: { story: 'Thick border + neutral-95 fill on press.' } },
  },
}

export const SecondaryFocus: Story = {
  name: 'Secondary / Focus',
  args: { variant: 'secondary' },
  parameters: {
    pseudo: { focusVisible: true },
    docs: { description: { story: 'Thick accessibility-blue border on focus-visible.' } },
  },
}

export const SecondaryDisabled: Story = {
  name: 'Secondary / Disabled',
  args: { variant: 'secondary', disabled: true },
}

// ─── Secondary / Small ───────────────────────────────────

export const SecondarySmDefault: Story = {
  name: 'Secondary Small / Default',
  args: { variant: 'secondary', size: 'sm' },
}

export const SecondarySmHover: Story = {
  name: 'Secondary Small / Hover',
  args: { variant: 'secondary', size: 'sm' },
  parameters: { pseudo: { hover: true } },
}

export const SecondarySmActive: Story = {
  name: 'Secondary Small / Active',
  args: { variant: 'secondary', size: 'sm' },
  parameters: { pseudo: { active: true } },
}

export const SecondarySmFocus: Story = {
  name: 'Secondary Small / Focus',
  args: { variant: 'secondary', size: 'sm' },
  parameters: { pseudo: { focusVisible: true } },
}

export const SecondarySmDisabled: Story = {
  name: 'Secondary Small / Disabled',
  args: { variant: 'secondary', size: 'sm', disabled: true },
}

// ─── Secondary Dark / Medium ─────────────────────────────

const darkBg = { backgrounds: { default: 'dark' } }

export const SecondaryDarkDefault: Story = {
  name: 'Secondary Dark / Default',
  args: { variant: 'secondary', theme: 'dark' },
  parameters: { ...darkBg },
}

export const SecondaryDarkHover: Story = {
  name: 'Secondary Dark / Hover',
  args: { variant: 'secondary', theme: 'dark' },
  parameters: { ...darkBg, pseudo: { hover: true } },
}

export const SecondaryDarkActive: Story = {
  name: 'Secondary Dark / Active',
  args: { variant: 'secondary', theme: 'dark' },
  parameters: {
    ...darkBg,
    pseudo: { active: true },
    docs: { description: { story: 'Pressed fills with neutral-0 (dark bg) instead of neutral-95.' } },
  },
}

export const SecondaryDarkFocus: Story = {
  name: 'Secondary Dark / Focus',
  args: { variant: 'secondary', theme: 'dark' },
  parameters: { ...darkBg, pseudo: { focusVisible: true } },
}

export const SecondaryDarkDisabled: Story = {
  name: 'Secondary Dark / Disabled',
  args: { variant: 'secondary', theme: 'dark', disabled: true },
  parameters: { ...darkBg },
}

// ─── Secondary Dark / Small ──────────────────────────────

export const SecondarySmDarkDefault: Story = {
  name: 'Secondary Small Dark / Default',
  args: { variant: 'secondary', size: 'sm', theme: 'dark' },
  parameters: { ...darkBg },
}

export const SecondarySmDarkHover: Story = {
  name: 'Secondary Small Dark / Hover',
  args: { variant: 'secondary', size: 'sm', theme: 'dark' },
  parameters: { ...darkBg, pseudo: { hover: true } },
}

export const SecondarySmDarkActive: Story = {
  name: 'Secondary Small Dark / Active',
  args: { variant: 'secondary', size: 'sm', theme: 'dark' },
  parameters: { ...darkBg, pseudo: { active: true } },
}

export const SecondarySmDarkFocus: Story = {
  name: 'Secondary Small Dark / Focus',
  args: { variant: 'secondary', size: 'sm', theme: 'dark' },
  parameters: { ...darkBg, pseudo: { focusVisible: true } },
}

export const SecondarySmDarkDisabled: Story = {
  name: 'Secondary Small Dark / Disabled',
  args: { variant: 'secondary', size: 'sm', theme: 'dark', disabled: true },
  parameters: { ...darkBg },
}

// ─── Comparisons ─────────────────────────────────────────

export const VariantComparison: Story = {
  name: 'Variant comparison',
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <BaseButton label="Pick up here" variant="primary" />
        <BaseButton label="Pick up here" variant="secondary" />
      </div>
    `,
  }),
  parameters: {
    docs: { description: { story: 'Primary (filled) and secondary (outlined) side by side.' } },
  },
}

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
}

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <BaseButton label="Primary md" variant="primary" size="md" />
          <BaseButton label="Primary sm" variant="primary" size="sm" />
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <BaseButton label="Secondary md" variant="secondary" size="md" />
          <BaseButton label="Secondary sm" variant="secondary" size="sm" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: { description: { story: 'Full 2×2 matrix of variant × size.' } },
  },
}
