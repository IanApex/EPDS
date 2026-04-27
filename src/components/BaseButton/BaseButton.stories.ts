import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseButton from './BaseButton.vue'

const meta = {
  title: 'Atoms/Buttons/BaseButton',
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

// ─── Sonic Brand: Full Figma matrix ──────────────────────
// Use the Brand toolbar dropdown (top-right) to switch to "Sonic
// Automotive" — the matrix below mirrors the Figma "Buttons" frame
// (3 variants × 2 sizes × 3 states). State-specific styling is
// rendered live via storybook-addon-pseudo-states classes
// (`pseudo-hover`, `pseudo-active`) applied per-cell.
//
// Sonic Figma names map to the BaseButton `theme` prop as follows:
//   Sonic "Primary"          → variant="primary"
//   Sonic "Secondary / Dark" → variant="secondary" theme="light"
//                              (dark border + dark text on light bg)
//   Sonic "Secondary / Light"→ variant="secondary" theme="dark"
//                              (white border + white text on dark bg)
//
// The labels below use Sonic's naming for parity with Figma.

export const SonicAllStates: Story = {
  name: 'Sonic — All States',
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: grid; grid-template-columns: auto 1fr 1fr 1fr; row-gap: 24px; column-gap: 24px; align-items: center;">
        <div></div>
        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #666b70;">Default</div>
        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #666b70;">Hover</div>
        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #666b70;">Pressed</div>

        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #666b70; white-space: nowrap;">Primary / Large</div>
        <BaseButton label="Shop all rides" variant="primary" size="md" />
        <BaseButton label="Shop all rides" variant="primary" size="md" class="pseudo-hover" />
        <BaseButton label="Shop all rides" variant="primary" size="md" class="pseudo-active" />

        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #666b70; white-space: nowrap;">Primary / Small</div>
        <BaseButton label="Shop all rides" variant="primary" size="sm" />
        <BaseButton label="Shop all rides" variant="primary" size="sm" class="pseudo-hover" />
        <BaseButton label="Shop all rides" variant="primary" size="sm" class="pseudo-active" />

        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #666b70; white-space: nowrap;">Secondary Dark / Large</div>
        <BaseButton label="Shop all rides" variant="secondary" theme="light" size="md" />
        <BaseButton label="Shop all rides" variant="secondary" theme="light" size="md" class="pseudo-hover" />
        <BaseButton label="Shop all rides" variant="secondary" theme="light" size="md" class="pseudo-active" />

        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #666b70; white-space: nowrap;">Secondary Dark / Small</div>
        <BaseButton label="Shop all rides" variant="secondary" theme="light" size="sm" />
        <BaseButton label="Shop all rides" variant="secondary" theme="light" size="sm" class="pseudo-hover" />
        <BaseButton label="Shop all rides" variant="secondary" theme="light" size="sm" class="pseudo-active" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Sonic "Primary" + "Secondary / Dark" rows from the Figma "Buttons" frame. Switch the Brand toolbar to "Sonic Automotive" to render with Sonic tokens.',
      },
    },
  },
}

export const SonicAllStatesLight: Story = {
  name: 'Sonic — Secondary / Light (on dark bg)',
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: grid; grid-template-columns: auto 1fr 1fr 1fr; row-gap: 24px; column-gap: 24px; align-items: center;">
        <div></div>
        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #ffffff;">Default</div>
        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #ffffff;">Hover</div>
        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #ffffff;">Pressed</div>

        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #ffffff; white-space: nowrap;">Secondary Light / Large</div>
        <BaseButton label="Shop all rides" variant="secondary" theme="dark" size="md" />
        <BaseButton label="Shop all rides" variant="secondary" theme="dark" size="md" class="pseudo-hover" />
        <BaseButton label="Shop all rides" variant="secondary" theme="dark" size="md" class="pseudo-active" />

        <div style="font-family: Roboto, sans-serif; font-size: 12px; color: #ffffff; white-space: nowrap;">Secondary Light / Small</div>
        <BaseButton label="Shop all rides" variant="secondary" theme="dark" size="sm" />
        <BaseButton label="Shop all rides" variant="secondary" theme="dark" size="sm" class="pseudo-hover" />
        <BaseButton label="Shop all rides" variant="secondary" theme="dark" size="sm" class="pseudo-active" />
      </div>
    `,
  }),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Sonic "Secondary / Light" — white border + white text used on dark backgrounds (BaseButton `theme="dark"`). Switch the Brand toolbar to "Sonic Automotive" to render with Sonic tokens.',
      },
    },
  },
}
