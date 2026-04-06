import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseAccordion from './BaseAccordion.vue'

const meta = {
  title: 'Components/BaseAccordion',
  component: BaseAccordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Expandable disclosure component. Full header row is clickable. Animates 250ms ease.\n\n' +
          '**Sizes:** `sm` — 16px Light label; `lg` — 22px Light label\n\n' +
          '**Spacing:** 24px padding all sides, 12px gap between label and body when open\n\n' +
          '**Guidelines:**\n' +
          '- Labels should clearly describe the content within\n' +
          '- Allow multiple items open simultaneously — do not enforce one-at-a-time\n' +
          '- Do not nest accordions inside accordions\n' +
          '- On mobile, anchor the user to the top of the newly opened item\n\n' +
          '```html\n' +
          '<BaseAccordion label="How does the trade-in process work?">\n' +
          '  We make it easy — bring your car in and we handle the rest.\n' +
          '</BaseAccordion>\n' +
          '```\n\n' +
          'Figma: "Components/Accordion".',
      },
    },
  },
  argTypes: {
    label:      { control: 'text' },
    size:       { control: 'radio', options: ['sm', 'lg'] },
    modelValue: { control: 'boolean' },
  },
  args: {
    label: 'How does your trade-in process work?',
    size: 'sm',
    modelValue: false,
  },
} satisfies Meta<typeof BaseAccordion>

export default meta
type Story = StoryObj<typeof meta>

const bodyText = 'We make it simple — bring your vehicle to any EchoPark location and our team will appraise it on the spot. You\'ll get a competitive offer with no obligation to purchase.'

// ─── States ───────────────────────────────────────────────────────────────────

export const ClosedSm: Story = {
  name: 'Small — closed',
  args: { size: 'sm', modelValue: false },
  render: (args) => ({
    components: { BaseAccordion },
    setup() { return { args, bodyText } },
    template: `<div style="padding:24px;max-width:500px;"><BaseAccordion v-bind="args">{{ bodyText }}</BaseAccordion></div>`,
  }),
}

export const OpenSm: Story = {
  name: 'Small — open',
  args: { size: 'sm', modelValue: true },
  render: (args) => ({
    components: { BaseAccordion },
    setup() { return { args, bodyText } },
    template: `<div style="padding:24px;max-width:500px;"><BaseAccordion v-bind="args">{{ bodyText }}</BaseAccordion></div>`,
  }),
}

export const ClosedLg: Story = {
  name: 'Large — closed',
  args: { size: 'lg', modelValue: false, label: 'How does your trade-in process work?' },
  render: (args) => ({
    components: { BaseAccordion },
    setup() { return { args, bodyText } },
    template: `<div style="padding:24px;max-width:840px;"><BaseAccordion v-bind="args">{{ bodyText }}</BaseAccordion></div>`,
  }),
}

export const OpenLg: Story = {
  name: 'Large — open',
  args: { size: 'lg', modelValue: true, label: 'How does your trade-in process work?' },
  render: (args) => ({
    components: { BaseAccordion },
    setup() { return { args, bodyText } },
    template: `<div style="padding:24px;max-width:840px;"><BaseAccordion v-bind="args">{{ bodyText }}</BaseAccordion></div>`,
  }),
}

export const FocusSm: Story = {
  name: 'Small — focus',
  args: { size: 'sm', modelValue: false },
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => ({
    components: { BaseAccordion },
    setup() { return { args, bodyText } },
    template: `<div style="padding:24px;max-width:500px;"><BaseAccordion v-bind="args">{{ bodyText }}</BaseAccordion></div>`,
  }),
}

// ─── Interactive — single item ────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive — single item',
  render: () => ({
    components: { BaseAccordion },
    setup() {
      const open = ref(false)
      return { open, bodyText }
    },
    template: `
      <div style="padding:24px;max-width:500px;">
        <BaseAccordion
          v-model="open"
          label="How does your trade-in process work?"
        >{{ bodyText }}</BaseAccordion>
      </div>
    `,
  }),
}

// ─── Interactive — FAQ list (multiple open allowed) ───────────────────────────

export const FaqList: Story = {
  name: 'Interactive — FAQ list (sm)',
  parameters: {
    docs: {
      description: {
        story: 'Multiple items can be open simultaneously. 24px gap between items.',
      },
    },
  },
  render: () => ({
    components: { BaseAccordion },
    setup() {
      const items = ref([
        {
          label: 'How does your trade-in process work?',
          body: 'Bring your vehicle to any EchoPark location and our team will appraise it on the spot. You\'ll get a competitive offer with no obligation to purchase.',
          open: false,
        },
        {
          label: 'Do I get to test drive the car before I buy?',
          body: 'Absolutely. We encourage every customer to take a test drive. Just let a team member know which vehicle you\'re interested in.',
          open: false,
        },
        {
          label: 'What lenders does EchoPark use?',
          body: 'We work with a wide network of lenders to find competitive financing options for all credit profiles.',
          open: false,
        },
        {
          label: 'Does EchoPark offer servicing?',
          body: 'EchoPark focuses on the car-buying experience. For servicing, we can recommend trusted partners in your area.',
          open: false,
        },
      ])
      return { items }
    },
    template: `
      <div style="padding:24px;max-width:500px;display:flex;flex-direction:column;gap:24px;">
        <BaseAccordion
          v-for="(item, i) in items"
          :key="i"
          v-model="item.open"
          :label="item.label"
          size="sm"
        >{{ item.body }}</BaseAccordion>
      </div>
    `,
  }),
}

export const FaqListLg: Story = {
  name: 'Interactive — FAQ list (lg)',
  render: () => ({
    components: { BaseAccordion },
    setup() {
      const items = ref([
        {
          label: 'How does your trade-in process work?',
          body: 'Bring your vehicle to any EchoPark location and our team will appraise it on the spot. You\'ll get a competitive offer with no obligation to purchase.',
          open: false,
        },
        {
          label: 'What lenders does EchoPark use?',
          body: 'We work with a wide network of lenders to find competitive financing options for all credit profiles.',
          open: false,
        },
        {
          label: 'I have bad credit. Can I still finance with EchoPark?',
          body: 'Yes — we work with lenders who specialize in a variety of credit situations. Fill out our financing application to see your options.',
          open: false,
        },
      ])
      return { items }
    },
    template: `
      <div style="padding:24px;max-width:840px;display:flex;flex-direction:column;gap:24px;">
        <BaseAccordion
          v-for="(item, i) in items"
          :key="i"
          v-model="item.open"
          :label="item.label"
          size="lg"
        >{{ item.body }}</BaseAccordion>
      </div>
    `,
  }),
}
