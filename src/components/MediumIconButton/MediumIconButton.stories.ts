import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'
import MediumIconButton from './MediumIconButton.vue'

// ─── Icon helper ──────────────────────────────────────────────────────────────

import calculatorSvg from '../../../icon/Style=Finance, Detail=Payment, Icon=Calculator.svg?raw'

function makeIconSlot(svgString: string) {
  return defineComponent({
    render: () => h('span', { innerHTML: svgString, style: 'display: contents' }),
  })
}

const CalculatorIcon = makeIconSlot(calculatorSvg)

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atoms/Buttons/MediumIconButton',
  component: MediumIconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Circular 40×40 icon-only CTA in the Accent blue palette. ' +
          'Used for compact contextual actions (e.g. open calculator, launch tool).\n\n' +
          '`ariaLabel` is **required** — there is no visible text so the label is the only ' +
          'accessible description for screen readers.\n\n' +
          'Use the `#icon` slot to supply an SVG. Import with `?raw` and wrap in ' +
          '`<span style="display:contents" v-html="mySvg" />` — the fill inherits ' +
          '`currentColor` automatically through all states.\n\n' +
          'Icon renders at 20×20 inside the 40×40 circle.\n\n' +
          'Figma: "IconButtons/Calculator".',
      },
    },
  },
  argTypes: {
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    href: { control: 'text' },
    onClick: { action: 'click' },
  },
  args: {
    ariaLabel: 'Open calculator',
    disabled: false,
  },
} satisfies Meta<typeof MediumIconButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Render helper ────────────────────────────────────────────────────────────

const withCalculator = {
  render: (args: Record<string, unknown>) => ({
    components: { MediumIconButton, CalculatorIcon },
    setup() { return { args } },
    template: `
      <MediumIconButton v-bind="args" @click="args.onClick">
        <template #icon><CalculatorIcon /></template>
      </MediumIconButton>
    `,
  }),
}

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = { ...withCalculator }

export const Hover: Story = {
  ...withCalculator,
  name: 'Hover',
  parameters: {
    pseudo: { hover: true },
    docs: {
      description: { story: 'Border thickens to 3px and steps to Accent30 (#004D80).' },
    },
  },
}

export const Active: Story = {
  ...withCalculator,
  name: 'Active (Pressed)',
  parameters: {
    pseudo: { active: true },
    docs: {
      description: { story: '3px Accent40 border + Accent90 (#E6F1F5) fill.' },
    },
  },
}

export const Focus: Story = {
  ...withCalculator,
  name: 'Focus',
  parameters: {
    pseudo: { focusVisible: true },
    docs: {
      description: { story: '3px Accessibility80 (#4095BF) inset border.' },
    },
  },
}

export const Disabled: Story = {
  ...withCalculator,
  args: { disabled: true },
  parameters: {
    docs: {
      description: { story: 'SecondaryNeutral90 background, Neutral70 icon — no border.' },
    },
  },
}

export const AsAnchor: Story = {
  ...withCalculator,
  name: 'As anchor tag',
  args: { href: '#calculator', ariaLabel: 'Open calculator' },
  parameters: {
    docs: {
      description: { story: 'Renders as `<a>` when `href` is provided.' },
    },
  },
}

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => ({
    components: { MediumIconButton, CalculatorIcon },
    template: `
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 16px;">
        <MediumIconButton aria-label="Default">
          <template #icon><CalculatorIcon /></template>
        </MediumIconButton>
        <MediumIconButton aria-label="Disabled" :disabled="true">
          <template #icon><CalculatorIcon /></template>
        </MediumIconButton>
      </div>
    `,
  }),
}

// ─── Icon variety ─────────────────────────────────────────────────────────────
// Shows the component is icon-agnostic — any SVG from the icon library works.

import searchSvg from '../../../icon/Style=Display, Detail=Default, Icon=Search.svg?raw'
import locationSvg from '../../../icon/Style=Location, Detail=Drop-Pin, Icon=NA.svg?raw'
import phoneSvg from '../../../icon/Style=Communication, Detail=Support, Icon=Phone.svg?raw'

export const IconVariety: Story = {
  name: 'With different icons',
  parameters: {
    docs: {
      description: {
        story: 'Any 24×24 system icon from `icon/` works — the component scales it to 20×20 and inherits colour.',
      },
    },
  },
  render: () => ({
    components: { MediumIconButton },
    setup() {
      const SearchIcon = makeIconSlot(searchSvg)
      const LocationIcon = makeIconSlot(locationSvg)
      const PhoneIcon = makeIconSlot(phoneSvg)
      return { SearchIcon, LocationIcon, PhoneIcon, CalculatorIcon }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 16px;">
        <MediumIconButton aria-label="Search">
          <template #icon><SearchIcon /></template>
        </MediumIconButton>
        <MediumIconButton aria-label="Location">
          <template #icon><LocationIcon /></template>
        </MediumIconButton>
        <MediumIconButton aria-label="Call us">
          <template #icon><PhoneIcon /></template>
        </MediumIconButton>
        <MediumIconButton aria-label="Calculator">
          <template #icon><CalculatorIcon /></template>
        </MediumIconButton>
      </div>
    `,
  }),
}
