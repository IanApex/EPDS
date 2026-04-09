import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'
import TileCta from './TileCta.vue'

// ─── Icon helper ──────────────────────────────────────────────────────────────
// Import SVG as raw string (Vite built-in ?raw — no plugin required).
// Wrap in a span with display:contents so it renders as the direct flex child
// of .tile-cta__icon and the fill: currentColor CSS rule applies correctly.

import testDriveSvg from '../../../icon/Icon Type=Vehicle Descriptors, Size=Small, Theme=Test Drive.svg?raw'

function makeIconSlot(svgString: string) {
  return defineComponent({
    render: () => h('span', { innerHTML: svgString, style: 'display: contents' }),
  })
}

const TestDriveIcon = makeIconSlot(testDriveSvg)

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atoms/Buttons/TileCta',
  component: TileCta,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Outlined pill-shaped CTA with a leading icon. Used on SRP tiles for contextual actions ' +
          '(e.g. "Test drive", "Get price").\n\n' +
          'Renders as `<button>` by default; pass `href` to render as `<a>`.\n\n' +
          'Use the `#icon` slot to supply any 24×24 SVG. Import with `?raw` and wrap in ' +
          '`<span style="display:contents" v-html="mySvg" />` so the icon inherits the ' +
          'current text colour automatically through all interaction states.\n\n' +
          'Figma: "IconButtons/SrpTile".',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
    onClick: { action: 'click' },
  },
  args: {
    label: 'Test drive',
    disabled: false,
  },
} satisfies Meta<typeof TileCta>

export default meta
type Story = StoryObj<typeof meta>

// ─── Render helper ────────────────────────────────────────────────────────────

const withTestDrive = {
  render: (args: Record<string, unknown>) => ({
    components: { TileCta, TestDriveIcon },
    setup() { return { args } },
    template: `
      <TileCta v-bind="args" @click="args.onClick">
        <template #icon><TestDriveIcon /></template>
        {{ args.label }}
      </TileCta>
    `,
  }),
}

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = { ...withTestDrive }

export const Hover: Story = {
  ...withTestDrive,
  name: 'Hover',
  parameters: {
    pseudo: { hover: true },
    docs: {
      description: { story: 'Border thickens to 3px and steps to Accent30 (#004D80) — both border and text change.' },
    },
  },
}

export const Active: Story = {
  ...withTestDrive,
  name: 'Active (Pressed)',
  parameters: {
    pseudo: { active: true },
    docs: {
      description: { story: '3px Accent40 border + Accent90 (#E6F1F5) background fill.' },
    },
  },
}

export const Focus: Story = {
  ...withTestDrive,
  name: 'Focus',
  parameters: {
    pseudo: { focusVisible: true },
    docs: {
      description: { story: '3px Accessibility80 (#4095BF) inset border — no separate outline needed.' },
    },
  },
}

export const Disabled: Story = {
  ...withTestDrive,
  args: { disabled: true },
  parameters: {
    docs: {
      description: { story: 'SecondaryNeutral90 background, Neutral70 text and icon — no border.' },
    },
  },
}

// ─── As anchor ────────────────────────────────────────────────────────────────

export const AsAnchor: Story = {
  ...withTestDrive,
  name: 'As anchor tag',
  args: { href: '#test-drive', label: 'Test drive' },
  parameters: {
    docs: {
      description: { story: 'Renders as `<a>` when `href` is provided.' },
    },
  },
}

// ─── Label-only (no icon) ─────────────────────────────────────────────────────

export const NoIcon: Story = {
  name: 'Without icon',
  args: { label: 'Test drive' },
  parameters: {
    docs: {
      description: { story: 'The `#icon` slot is optional — renders as a compact pill button without a leading icon.' },
    },
  },
}

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => ({
    components: { TileCta, TestDriveIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 16px;">
        <TileCta label="Default">
          <template #icon><TestDriveIcon /></template>
        </TileCta>
        <TileCta label="Disabled" :disabled="true">
          <template #icon><TestDriveIcon /></template>
        </TileCta>
        <TileCta label="Without icon" />
      </div>
    `,
  }),
}
