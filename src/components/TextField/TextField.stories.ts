import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TextField from './TextField.vue'

const meta: Meta<typeof TextField> = {
  title: 'Atoms/Inputs/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    modelValue: { control: 'text' },
    type: { control: 'text' },
    inputmode: { control: 'text' },
    maxlength: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    theme: { control: 'radio', options: ['light', 'dark'] },
    variant: { control: 'radio', options: ['default', 'feedback'] },
  },
  args: {
    label: 'Label',
    theme: 'light',
    variant: 'default',
  },
  decorators: [
    () => ({
      template:
        '<div style="padding: 32px; display: flex; flex-wrap: wrap; align-items: flex-end; gap: var(--spacing-md) var(--spacing-xxxs);"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof TextField>

/* ─── Light Mode States ──────────────────────────────────────────── */

export const Default: Story = {
  args: { label: 'Label', modelValue: '' },
}

export const Filled: Story = {
  args: { label: 'Label', modelValue: 'Input' },
}

export const DisabledFilled: Story = {
  args: { label: 'Label', modelValue: 'Input', disabled: true },
}

export const WithError: Story = {
  args: { label: 'Label', modelValue: '', error: 'Error message' },
}

export const LightModeAllStates: Story = {
  render: () => ({
    components: { TextField },
    template: `
      <div style="display: flex; gap: var(--spacing-xxxs); padding: 32px 32px 48px; align-items: flex-end;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TextField label="Label" model-value="" style="width: 304px;" />
          <span style="font-size: 12px; color: #666B70;">Default</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TextField label="Label" model-value="Input" style="width: 304px;" />
          <span style="font-size: 12px; color: #666B70;">Filled</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TextField label="Label" model-value="Input" :disabled="true" style="width: 304px;" />
          <span style="font-size: 12px; color: #666B70;">Disabled Filled</span>
        </div>
      </div>
    `,
  }),
}

/* ─── Dark Mode States ───────────────────────────────────────────── */

export const DarkModeDefault: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: { label: 'Label', modelValue: '', theme: 'dark' },
}

export const DarkModeFilled: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  args: { label: 'Label', modelValue: 'Input', theme: 'dark' },
}

export const DarkModeAllStates: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => ({
    components: { TextField },
    template: `
      <div style="display: flex; gap: var(--spacing-xxxs); padding: 32px 32px 48px; align-items: flex-end;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TextField label="Label" model-value="" theme="dark" style="width: 304px;" />
          <span style="font-size: 12px; color: #D4D7D9;">Default</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TextField label="Label" model-value="Input" theme="dark" style="width: 304px;" />
          <span style="font-size: 12px; color: #D4D7D9;">Filled</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TextField label="Label" model-value="Input" theme="dark" :disabled="true" style="width: 304px;" />
          <span style="font-size: 12px; color: #D4D7D9;">Disabled Filled</span>
        </div>
      </div>
    `,
  }),
}

/* ─── UI Feedback Variant ────────────────────────────────────────── */

export const FeedbackDefault: Story = {
  args: { label: 'Label', modelValue: '', variant: 'feedback' },
}

export const FeedbackFilled: Story = {
  args: { label: 'Label', modelValue: 'Input', variant: 'feedback' },
}

export const FeedbackAllStates: Story = {
  render: () => ({
    components: { TextField },
    template: `
      <div style="display: flex; gap: var(--spacing-xxxs); padding: 32px 32px 48px; align-items: flex-end;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TextField label="Label" model-value="" variant="feedback" style="width: 304px;" />
          <span style="font-size: 12px; color: #666B70;">Default</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <TextField label="Label" model-value="Input" variant="feedback" style="width: 304px;" />
          <span style="font-size: 12px; color: #666B70;">Filled</span>
        </div>
      </div>
    `,
  }),
}

/* ─── Figma usage: spacing between fields ───────────────────────── */

export const UsageSpacingBetweenFields: Story = {
  name: 'Usage — spacing between fields',
  render: () => ({
    components: { TextField },
    setup() {
      const row1a = ref('Input')
      const row1b = ref('Input')
      return { row1a, row1b }
    },
    template: `
      <div style="font-family: var(--font-family-base); padding: var(--spacing-xxs);">
        <p style="margin: 0 0 var(--spacing-xxxs); max-width: 36rem; font-size: 14px; line-height: 1.5; color: var(--color-neutral-0);">
          Figma usage rule: <strong>48px</strong> vertical and <strong>16px</strong> horizontal spacing between text fields,
          regardless of width or state. Example: <code>display: grid</code> or flex wrap with
          <code>gap: var(--spacing-md) var(--spacing-xxxs)</code>.
        </p>
        <div
          style="display: grid; grid-template-columns: repeat(2, max-content); gap: var(--spacing-md) var(--spacing-xxxs); justify-content: start; align-items: end;"
        >
          <TextField label="Label" v-model="row1a" style="width: 304px;" />
          <TextField label="Label" v-model="row1b" style="width: 304px;" />
          <TextField label="Label" model-value="" class="pseudo-focus-within" style="width: 304px;" />
          <TextField label="Label" model-value="" style="width: 328px;" />
        </div>
      </div>
    `,
  }),
}

/* ─── Interactive ────────────────────────────────────────────────── */

export const Interactive: Story = {
  render: () => ({
    components: { TextField },
    setup() {
      const name = ref('')
      const email = ref('')
      const phone = ref('555-0123')
      return { name, email, phone }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-md) var(--spacing-xxxs); padding: 32px; align-items: flex-end;">
        <TextField label="Full name" v-model="name" style="width: 280px;" />
        <TextField label="Email" v-model="email" type="email" style="width: 280px;" />
        <TextField label="Phone" v-model="phone" type="tel" style="width: 200px;" />
      </div>
    `,
  }),
}

export const InteractiveDark: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  render: () => ({
    components: { TextField },
    setup() {
      const name = ref('')
      const price = ref('29,000')
      return { name, price }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-md) var(--spacing-xxxs); padding: 32px; align-items: flex-end;">
        <TextField label="Full name" v-model="name" theme="dark" style="width: 280px;" />
        <TextField label="Price" v-model="price" theme="dark" style="width: 200px;" />
      </div>
    `,
  }),
}

export const InteractiveFeedback: Story = {
  render: () => ({
    components: { TextField },
    setup() {
      const rate = ref('')
      const term = ref('60')
      return { rate, term }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-md) var(--spacing-xxxs); padding: 32px; align-items: flex-end;">
        <TextField label="APR" v-model="rate" variant="feedback" style="width: 120px;" />
        <TextField label="Term (months)" v-model="term" variant="feedback" style="width: 120px;" />
      </div>
    `,
  }),
}
