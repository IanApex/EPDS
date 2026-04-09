import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import JourneySelector from './JourneySelector.vue'

// Icons imported as raw SVG strings
import profileSvg  from '../../../icon/Style=Account, Detail=Profile-Common, Icon=NA.svg?raw'
import profileCircleSvg from '../../../icon/Style=Account, Detail=Profile-Circle, Icon=NA.svg?raw'
import storeSvg    from '../../../icon/Style=Black, Detail=Black-Outline, Icon=Store.svg?raw'
import cardSvg     from '../../../icon/Style=Finance, Detail=Payment, Icon=Card-1.svg?raw'
import bankSvg     from '../../../icon/Style=Finance, Detail=Payment, Icon=Bank.svg?raw'

const meta: Meta<typeof JourneySelector> = {
  title: 'Atoms/Buttons/JourneySelector',
  component: JourneySelector,
  parameters: {
    backgrounds: { default: 'light' },
  },
  argTypes: {
    selected:  { control: 'boolean' },
    disabled:  { control: 'boolean' },
    label:     { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof JourneySelector>

// ─── Individual states ──────────────────────────────────

export const Default: Story = {
  args: { label: 'By myself', selected: false },
  render: (args) => ({
    components: { JourneySelector },
    setup() { return { args, profileSvg } },
    template: `
      <div style="padding: 40px;">
        <JourneySelector v-bind="args">
          <template #icon><span v-html="profileSvg" style="display:contents" /></template>
        </JourneySelector>
      </div>`,
  }),
}

export const HoverState: Story = {
  name: 'Hover',
  args: { label: 'By myself', selected: false },
  parameters: { pseudo: { hover: true } },
  render: (args) => ({
    components: { JourneySelector },
    setup() { return { args, profileSvg } },
    template: `
      <div style="padding: 40px;">
        <JourneySelector v-bind="args">
          <template #icon><span v-html="profileSvg" style="display:contents" /></template>
        </JourneySelector>
      </div>`,
  }),
}

export const Selected: Story = {
  args: { label: 'By myself', selected: true },
  render: (args) => ({
    components: { JourneySelector },
    setup() { return { args, profileSvg } },
    template: `
      <div style="padding: 40px;">
        <JourneySelector v-bind="args">
          <template #icon><span v-html="profileSvg" style="display:contents" /></template>
        </JourneySelector>
      </div>`,
  }),
}

export const FocusState: Story = {
  name: 'Focus',
  args: { label: 'By myself', selected: false },
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => ({
    components: { JourneySelector },
    setup() { return { args, profileSvg } },
    template: `
      <div style="padding: 40px;">
        <JourneySelector v-bind="args">
          <template #icon><span v-html="profileSvg" style="display:contents" /></template>
        </JourneySelector>
      </div>`,
  }),
}

export const Disabled: Story = {
  args: { label: 'By myself', disabled: true },
  render: (args) => ({
    components: { JourneySelector },
    setup() { return { args, profileSvg } },
    template: `
      <div style="padding: 40px;">
        <JourneySelector v-bind="args">
          <template #icon><span v-html="profileSvg" style="display:contents" /></template>
        </JourneySelector>
      </div>`,
  }),
}

// ─── All states ─────────────────────────────────────────

export const AllStates: Story = {
  render: () => ({
    components: { JourneySelector },
    setup() { return { profileSvg } },
    template: `
      <div style="display:flex; gap:24px; padding:40px; flex-wrap:wrap; align-items:flex-start;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <JourneySelector label="Default">
            <template #icon><span v-html="profileSvg" style="display:contents"/></template>
          </JourneySelector>
          <span style="font:12px/1 Roboto,sans-serif;color:#666;">Default</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <JourneySelector label="Selected" :selected="true">
            <template #icon><span v-html="profileSvg" style="display:contents"/></template>
          </JourneySelector>
          <span style="font:12px/1 Roboto,sans-serif;color:#666;">Selected</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <JourneySelector label="Disabled" :disabled="true">
            <template #icon><span v-html="profileSvg" style="display:contents"/></template>
          </JourneySelector>
          <span style="font:12px/1 Roboto,sans-serif;color:#666;">Disabled</span>
        </div>
      </div>`,
  }),
}

// ─── Usage: 2-option group ──────────────────────────────

/**
 * How do you want to apply? — 2 paths.
 * Clicking immediately selects; no "Continue" button needed.
 */
export const TwoOptions: Story = {
  render: () => ({
    components: { JourneySelector },
    setup() {
      const chosen = ref<string | null>(null)
      return { chosen, profileSvg, profileCircleSvg }
    },
    template: `
      <div style="padding: 40px; max-width: 400px;">
        <p style="font:300 22px/1.2 Roboto,sans-serif;color:#242C33;margin:0 0 16px;text-align:center;">
          How do you want to apply?
        </p>
        <div style="display:flex;gap:16px;">
          <JourneySelector
            label="By myself"
            :selected="chosen === 'solo'"
            style="flex:1;"
            @select="chosen = 'solo'"
          >
            <template #icon><span v-html="profileSvg" style="display:contents"/></template>
          </JourneySelector>
          <JourneySelector
            label="With co-applicant"
            :selected="chosen === 'co'"
            style="flex:1;"
            @select="chosen = 'co'"
          >
            <template #icon><span v-html="profileCircleSvg" style="display:contents"/></template>
          </JourneySelector>
        </div>
        <p style="font:12px/1 Roboto,sans-serif;color:#666;margin-top:16px;text-align:center;">
          Selected: {{ chosen ?? '—' }}
        </p>
      </div>`,
  }),
}

// ─── Usage: 3-option group ──────────────────────────────

export const ThreeOptions: Story = {
  render: () => ({
    components: { JourneySelector },
    setup() {
      const chosen = ref<string | null>(null)
      return { chosen, profileSvg, profileCircleSvg, storeSvg }
    },
    template: `
      <div style="padding: 40px; max-width: 560px;">
        <p style="font:300 22px/1.2 Roboto,sans-serif;color:#242C33;margin:0 0 16px;text-align:center;">
          How do you want to apply?
        </p>
        <div style="display:flex;gap:16px;">
          <JourneySelector
            label="By myself"
            :selected="chosen === 'solo'"
            style="flex:1;"
            @select="chosen = 'solo'"
          >
            <template #icon><span v-html="profileSvg" style="display:contents"/></template>
          </JourneySelector>
          <JourneySelector
            label="With co-applicant"
            :selected="chosen === 'co'"
            style="flex:1;"
            @select="chosen = 'co'"
          >
            <template #icon><span v-html="profileCircleSvg" style="display:contents"/></template>
          </JourneySelector>
          <JourneySelector
            label="As a business"
            :selected="chosen === 'biz'"
            style="flex:1;"
            @select="chosen = 'biz'"
          >
            <template #icon><span v-html="storeSvg" style="display:contents"/></template>
          </JourneySelector>
        </div>
        <p style="font:12px/1 Roboto,sans-serif;color:#666;margin-top:16px;text-align:center;">
          Selected: {{ chosen ?? '—' }}
        </p>
      </div>`,
  }),
}

// ─── Usage: 4-option group ──────────────────────────────

export const FourOptions: Story = {
  render: () => ({
    components: { JourneySelector },
    setup() {
      const chosen = ref<string | null>(null)
      return { chosen, profileSvg, profileCircleSvg, storeSvg, cardSvg }
    },
    template: `
      <div style="padding: 40px; max-width: 720px;">
        <p style="font:300 22px/1.2 Roboto,sans-serif;color:#242C33;margin:0 0 16px;text-align:center;">
          How would you like to pay?
        </p>
        <div style="display:flex;gap:16px;">
          <JourneySelector
            label="By myself"
            :selected="chosen === 'solo'"
            style="flex:1;"
            @select="chosen = 'solo'"
          >
            <template #icon><span v-html="profileSvg" style="display:contents"/></template>
          </JourneySelector>
          <JourneySelector
            label="With co-applicant"
            :selected="chosen === 'co'"
            style="flex:1;"
            @select="chosen = 'co'"
          >
            <template #icon><span v-html="profileCircleSvg" style="display:contents"/></template>
          </JourneySelector>
          <JourneySelector
            label="As a business"
            :selected="chosen === 'biz'"
            style="flex:1;"
            @select="chosen = 'biz'"
          >
            <template #icon><span v-html="storeSvg" style="display:contents"/></template>
          </JourneySelector>
          <JourneySelector
            label="Financing"
            :selected="chosen === 'finance'"
            style="flex:1;"
            @select="chosen = 'finance'"
          >
            <template #icon><span v-html="cardSvg" style="display:contents"/></template>
          </JourneySelector>
        </div>
        <p style="font:12px/1 Roboto,sans-serif;color:#666;margin-top:16px;text-align:center;">
          Selected: {{ chosen ?? '—' }}
        </p>
      </div>`,
  }),
}

// ─── Usage: payment type example ───────────────────────

export const PaymentPaths: Story = {
  name: 'Payment paths (Cash vs Finance)',
  render: () => ({
    components: { JourneySelector },
    setup() {
      const chosen = ref<string | null>(null)
      return { chosen, cardSvg, bankSvg }
    },
    template: `
      <div style="padding: 40px; max-width: 400px;">
        <p style="font:300 22px/1.2 Roboto,sans-serif;color:#242C33;margin:0 0 16px;text-align:center;">
          How would you like to pay?
        </p>
        <div style="display:flex;gap:16px;">
          <JourneySelector
            label="One applicant"
            :selected="chosen === 'cash'"
            style="flex:1;"
            @select="chosen = 'cash'"
          >
            <template #icon><span v-html="bankSvg" style="display:contents"/></template>
          </JourneySelector>
          <JourneySelector
            label="Two applicants"
            :selected="chosen === 'finance'"
            style="flex:1;"
            @select="chosen = 'finance'"
          >
            <template #icon><span v-html="cardSvg" style="display:contents"/></template>
          </JourneySelector>
        </div>
        <p style="font:12px/1 Roboto,sans-serif;color:#666;margin-top:16px;text-align:center;">
          Selected: {{ chosen ?? '—' }}
        </p>
      </div>`,
  }),
}
