import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LinkCta from './LinkCta.vue'

const meta = {
  title: 'Atoms/Buttons/LinkCta',
  component: LinkCta,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline text link CTA. Renders as `<button>` by default or `<a>` when `href` is provided.\n\n' +
          '**light** — Accent40/30 palette (Figma: "CommonInputs/TextLink"). For light backgrounds.\n\n' +
          '**dark** — Accent80/90 palette (Figma: "CommonInputs/TextLink Dark"). For dark backgrounds.\n\n' +
          'Optional right-arrow icon via the `arrow` prop.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    arrow: { control: 'boolean', description: 'Show right-arrow icon.' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    href: { control: 'text', description: 'Renders as `<a>` when set.' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    label: 'Link CTA',
    arrow: false,
    theme: 'light',
    disabled: false,
  },
} satisfies Meta<typeof LinkCta>

export default meta
type Story = StoryObj<typeof meta>

const dark = { backgrounds: { default: 'dark' } }

// ─── Light — without arrow ───────────────────────────────

export const LightDefault: Story = { name: 'Light / Default' }

export const LightHover: Story = {
  name: 'Light / Hover',
  parameters: { pseudo: { hover: true } },
}

export const LightActive: Story = {
  name: 'Light / Active',
  parameters: {
    pseudo: { active: true },
    docs: { description: { story: 'Pressed — steps to Accent30 (darker blue).' } },
  },
}

export const LightFocus: Story = {
  name: 'Light / Focus',
  parameters: {
    pseudo: { focusVisible: true },
    docs: { description: { story: '3px Accessibility80 outline, 2px offset.' } },
  },
}

// ─── Light — with arrow ──────────────────────────────────

export const LightArrowDefault: Story = {
  name: 'Light / Arrow / Default',
  args: { arrow: true },
}

export const LightArrowHover: Story = {
  name: 'Light / Arrow / Hover',
  args: { arrow: true },
  parameters: { pseudo: { hover: true } },
}

export const LightArrowActive: Story = {
  name: 'Light / Arrow / Active',
  args: { arrow: true },
  parameters: { pseudo: { active: true } },
}

export const LightArrowFocus: Story = {
  name: 'Light / Arrow / Focus',
  args: { arrow: true },
  parameters: { pseudo: { focusVisible: true } },
}

// ─── Dark — without arrow ────────────────────────────────

export const DarkDefault: Story = {
  name: 'Dark / Default',
  args: { theme: 'dark' },
  parameters: { ...dark },
}

export const DarkHover: Story = {
  name: 'Dark / Hover',
  args: { theme: 'dark' },
  parameters: { ...dark, pseudo: { hover: true } },
}

export const DarkActive: Story = {
  name: 'Dark / Active',
  args: { theme: 'dark' },
  parameters: {
    ...dark,
    pseudo: { active: true },
    docs: { description: { story: 'Pressed — steps to Accent90 (lighter blue on dark bg).' } },
  },
}

export const DarkFocus: Story = {
  name: 'Dark / Focus',
  args: { theme: 'dark' },
  parameters: { ...dark, pseudo: { focusVisible: true } },
}

// ─── Dark — with arrow ───────────────────────────────────

export const DarkArrowDefault: Story = {
  name: 'Dark / Arrow / Default',
  args: { theme: 'dark', arrow: true },
  parameters: { ...dark },
}

export const DarkArrowHover: Story = {
  name: 'Dark / Arrow / Hover',
  args: { theme: 'dark', arrow: true },
  parameters: { ...dark, pseudo: { hover: true } },
}

export const DarkArrowActive: Story = {
  name: 'Dark / Arrow / Active',
  args: { theme: 'dark', arrow: true },
  parameters: { ...dark, pseudo: { active: true } },
}

export const DarkArrowFocus: Story = {
  name: 'Dark / Arrow / Focus',
  args: { theme: 'dark', arrow: true },
  parameters: { ...dark, pseudo: { focusVisible: true } },
}

// ─── As anchor ───────────────────────────────────────────

export const AsAnchor: Story = {
  name: 'As anchor tag',
  args: { href: 'https://echopark.com', target: '_blank', arrow: true },
  parameters: {
    docs: { description: { story: 'Renders as `<a>` when `href` is provided. Adds `rel="noopener noreferrer"` automatically for `target="_blank"`.' } },
  },
}

// ─── Comparison ──────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: () => ({
    components: { LinkCta },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; align-items: center; gap: 32px; padding: 16px;">
          <LinkCta label="Light, no arrow" theme="light" />
          <LinkCta label="Light, with arrow" theme="light" :arrow="true" />
        </div>
        <div style="display: flex; align-items: center; gap: 32px; padding: 16px; background: #242C33; border-radius: 8px;">
          <LinkCta label="Dark, no arrow" theme="dark" />
          <LinkCta label="Dark, with arrow" theme="dark" :arrow="true" />
        </div>
      </div>
    `,
  }),
}
