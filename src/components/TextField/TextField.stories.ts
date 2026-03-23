import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import TextField from './TextField.vue'

const meta: Meta<typeof TextField> = {
  title: 'Components/Inputs/TextField',
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
      template: '<div style="padding: 32px; display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-end;"><story /></div>',
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
      <div style="display: flex; gap: 48px; padding: 32px 32px 48px; align-items: flex-end;">
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
      <div style="display: flex; gap: 48px; padding: 32px 32px 48px; align-items: flex-end;">
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
      <div style="display: flex; gap: 48px; padding: 32px 32px 48px; align-items: flex-end;">
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
      <div style="display: flex; gap: 24px; padding: 32px; align-items: flex-end;">
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
      <div style="display: flex; gap: 24px; padding: 32px; align-items: flex-end;">
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
      <div style="display: flex; gap: 24px; padding: 32px; align-items: flex-end;">
        <TextField label="APR" v-model="rate" variant="feedback" style="width: 120px;" />
        <TextField label="Term (months)" v-model="term" variant="feedback" style="width: 120px;" />
      </div>
    `,
  }),
}
