import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ArrowCircleButton from './ArrowCircleButton.vue'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/CTAs/ArrowCircleButton',
  component: ArrowCircleButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Circular navigation / action button designed to sit over image and carousel backgrounds. ' +
          'The background colour is semi-transparent so the underlying content shows through.\n\n' +
          '**Theme is derived automatically** from `size` + `direction` — no separate theme prop:\n\n' +
          '| `size` | `direction` | Background | Icon colour |\n' +
          '|--------|-------------|------------|-------------|\n' +
          '| `sm` | `right` / `left` | Dark semi-transparent | White |\n' +
          '| `sm` | `expand` | Primary50 green | White |\n' +
          '| `lg` | `right` / `left` | White semi-transparent | Dark |\n\n' +
          '`ariaLabel` is **required** — no visible text.\n\n' +
          'Figma: "Buttons/ArrowCircle".',
      },
    },
  },
  argTypes: {
    direction: { control: 'select', options: ['right', 'left', 'expand'] },
    size: { control: 'select', options: ['sm', 'lg'] },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    direction: 'right',
    size: 'sm',
    ariaLabel: 'Next',
    disabled: false,
  },
} satisfies Meta<typeof ArrowCircleButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Shared background styles ─────────────────────────────────────────────────

const darkBg = { backgrounds: { default: 'dark' } }
const imageBg = {
  backgrounds: { default: 'dark' },
  docs: { canvas: { style: { background: 'url("https://placehold.co/600x200/555/888") center/cover' } } },
}

// ─── Small — dark theme (right / left) ───────────────────────────────────────

export const SmallRight: Story = {
  name: 'Small · Right (default)',
  args: { direction: 'right', size: 'sm', ariaLabel: 'Next' },
  parameters: darkBg,
}

export const SmallLeft: Story = {
  name: 'Small · Left',
  args: { direction: 'left', size: 'sm', ariaLabel: 'Previous' },
  parameters: darkBg,
}

export const SmallRightHover: Story = {
  name: 'Small · Hover',
  args: { direction: 'right', size: 'sm', ariaLabel: 'Next' },
  parameters: { ...darkBg, pseudo: { hover: true } },
}

export const SmallRightPressed: Story = {
  name: 'Small · Pressed',
  args: { direction: 'right', size: 'sm', ariaLabel: 'Next' },
  parameters: { ...darkBg, pseudo: { active: true } },
}

export const SmallRightFocus: Story = {
  name: 'Small · Focus',
  args: { direction: 'right', size: 'sm', ariaLabel: 'Next' },
  parameters: { ...darkBg, pseudo: { focusVisible: true } },
}

// ─── Small — green theme (expand) ────────────────────────────────────────────

export const SmallExpand: Story = {
  name: 'Small · Expand',
  args: { direction: 'expand', size: 'sm', ariaLabel: 'Expand gallery' },
  parameters: darkBg,
}

export const SmallExpandHover: Story = {
  name: 'Small · Expand — Hover',
  args: { direction: 'expand', size: 'sm', ariaLabel: 'Expand gallery' },
  parameters: { ...darkBg, pseudo: { hover: true } },
}

// ─── Large — white theme ──────────────────────────────────────────────────────

export const LargeRight: Story = {
  name: 'Large · Right',
  args: { direction: 'right', size: 'lg', ariaLabel: 'Next' },
  parameters: darkBg,
}

export const LargeLeft: Story = {
  name: 'Large · Left',
  args: { direction: 'left', size: 'lg', ariaLabel: 'Previous' },
  parameters: darkBg,
}

export const LargeRightHover: Story = {
  name: 'Large · Hover',
  args: { direction: 'right', size: 'lg', ariaLabel: 'Next' },
  parameters: { ...darkBg, pseudo: { hover: true } },
}

export const LargeRightFocus: Story = {
  name: 'Large · Focus',
  args: { direction: 'right', size: 'lg', ariaLabel: 'Next' },
  parameters: { ...darkBg, pseudo: { focusVisible: true } },
}

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    ...darkBg,
    docs: {
      description: {
        story: 'All direction + size combinations side by side. Shown on dark background to demonstrate the semi-transparent backgrounds.',
      },
    },
  },
  render: () => ({
    components: { ArrowCircleButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
        <div>
          <p style="color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 8px; opacity: .6;">Small · Dark (right / left)</p>
          <div style="display: flex; align-items: center; gap: 12px;">
            <ArrowCircleButton direction="left"  size="sm" aria-label="Previous" />
            <ArrowCircleButton direction="right" size="sm" aria-label="Next" />
          </div>
        </div>
        <div>
          <p style="color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 8px; opacity: .6;">Small · Green (expand)</p>
          <div style="display: flex; align-items: center; gap: 12px;">
            <ArrowCircleButton direction="expand" size="sm" aria-label="Expand gallery" />
          </div>
        </div>
        <div>
          <p style="color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 8px; opacity: .6;">Large · White (right / left)</p>
          <div style="display: flex; align-items: center; gap: 12px;">
            <ArrowCircleButton direction="left"  size="lg" aria-label="Previous" />
            <ArrowCircleButton direction="right" size="lg" aria-label="Next" />
          </div>
        </div>
      </div>
    `,
  }),
}
