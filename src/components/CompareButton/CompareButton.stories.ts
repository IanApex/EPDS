import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import CompareButton from './CompareButton.vue'

const meta = {
  title: 'Atoms/Buttons/CompareButton',
  component: CompareButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '32×32 pill-shaped toggle used on SRP (Search Results Page) tiles to add a vehicle to the **compare** list.\n\n' +
          '**Un-added** (default): white circle, 1px `Neutral90` border, `+` icon in `--color-action-primary` (green for EchoPark, red for Sonic).\n\n' +
          '**Un-added hover/focus**: pill expands to the **left** to reveal the "Compare" label — 14px Roboto Medium text in `Neutral0`. Focus swaps the border to `--color-focus-ring`.\n\n' +
          '**Added** (after click): circle fills with `--color-action-primary`, check icon in white.\n\n' +
          '**Added hover/focus**: pill expands to reveal the "Remove" label in white.\n\n' +
          'The icon is pinned to the right edge and does **not** move during the expand/collapse animation — only the label column grows to the left.\n\n' +
          'Brand colour comes from the `--color-action-primary` semantic token, so switching the **Brand** toolbar from EchoPark to Sonic swaps both the `+` icon colour (unselected) and the fill (selected) automatically.\n\n' +
          '`v-model:selected` is supported; the parent receives `update:selected` and the raw `click` event on every activation.\n\n' +
          'Figma: "Buttons/Compare".',
      },
    },
  },
  argTypes: {
    selected: { control: 'boolean' },
    compareLabel: { control: 'text' },
    removeLabel: { control: 'text' },
    ariaLabelUnselected: { control: 'text' },
    ariaLabelSelected: { control: 'text' },
    'onUpdate:selected': { action: 'update:selected' },
    onClick: { action: 'click' },
  },
  args: {
    selected: false,
    compareLabel: 'Compare',
    removeLabel: 'Remove',
  },
} satisfies Meta<typeof CompareButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Single-state stories (match the 6 Figma states) ──────────────────────────

export const UnaddedDefault: Story = {
  name: 'Un-added (default)',
  parameters: {
    docs: { description: { story: '32×32 white circle with `+` icon in the brand primary colour.' } },
  },
}

export const UnaddedHover: Story = {
  name: 'Un-added (hover)',
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Pill expands left to show "Compare" in `Neutral0`. The `+` icon stays pinned on the right.' } },
  },
}

export const UnaddedFocus: Story = {
  name: 'Un-added (focus)',
  parameters: {
    pseudo: { focusVisible: true },
    docs: { description: { story: 'Pill expands left, 1px `--color-focus-ring` border replaces the neutral border.' } },
  },
}

export const AddedDefault: Story = {
  name: 'Added (default)',
  args: { selected: true },
  parameters: {
    docs: { description: { story: '32×32 `--color-action-primary` circle with white check.' } },
  },
}

export const AddedHover: Story = {
  name: 'Added (hover)',
  args: { selected: true },
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Pill expands left to reveal "Remove" in white.' } },
  },
}

export const AddedFocus: Story = {
  name: 'Added (focus)',
  args: { selected: true },
  parameters: {
    pseudo: { focusVisible: true },
    docs: { description: { story: 'Pill expands, border becomes `--color-focus-ring`.' } },
  },
}

// ─── All Figma states grid ────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side view of the two base states. Hover or tab to each to see the expanded hover and focus states live.',
      },
    },
  },
  render: () => ({
    components: { CompareButton },
    template: `
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 16px; background: #fff;">
        <CompareButton aria-label="Un-added default" />
        <CompareButton aria-label="Added default" :selected="true" />
      </div>
    `,
  }),
}

// ─── Interactive toggle ───────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (click to toggle)',
  parameters: {
    docs: {
      description: {
        story:
          'Hover → pill expands to show "Compare". Click → becomes "Added" (brand-primary circle + check). Hover while added → shows "Remove". Mouse off → collapses back to the check circle.',
      },
    },
  },
  render: () => ({
    components: { CompareButton },
    setup() {
      const added = ref(false)
      return { added }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; padding: 16px;">
        <CompareButton v-model:selected="added" />
        <span style="font-family: Roboto, sans-serif; font-size: 13px; color: #666;">
          {{ added ? 'Added to compare' : 'Not in compare list' }}
        </span>
      </div>
    `,
  }),
}

// ─── SRP tile context (mimics real-world placement) ───────────────────────────

export const SrpTileContext: Story = {
  name: 'SRP tile context',
  parameters: {
    docs: {
      description: {
        story:
          'Preview of how the CompareButton sits on an SRP tile — top-right corner overlaid on the vehicle photo area. The icon stays pinned to the right edge on expand/collapse.',
      },
    },
  },
  render: () => ({
    components: { CompareButton },
    setup() {
      const added = ref(false)
      return { added }
    },
    template: `
      <div style="position: relative; width: 320px; height: 220px; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #cfd9dc 0%, #7f8b94 100%); font-family: Roboto, sans-serif;">
        <div style="position: absolute; top: 12px; right: 12px;">
          <CompareButton v-model:selected="added" />
        </div>
        <div style="position: absolute; bottom: 12px; left: 12px; color: #fff; font-weight: 700; font-size: 16px;">
          2023 Sample Vehicle
        </div>
      </div>
    `,
  }),
}
