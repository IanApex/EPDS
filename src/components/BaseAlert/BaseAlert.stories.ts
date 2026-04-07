import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseAlert from './BaseAlert.vue'

const meta = {
  title: 'Components/BaseAlert',
  component: BaseAlert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline feedback banner. Five variants cover all message types.\n\n' +
          '**Variants:** `error`, `warning`, `success`, `notification`\n\n' +
          '**Anatomy:** 24px icon + 8px gap + content area. 16px padding all sides. 16px border-radius.\n\n' +
          '**Accessibility:** `role="alert"` (assertive) on `error` and `warning`; `role="status"` (polite) on others.\n\n' +
          '```html\n' +
          '<BaseAlert variant="success" title="Trade-in submitted">\n' +
          '  We\'ll follow up within one business day.\n' +
          '</BaseAlert>\n' +
          '```\n\n' +
          'Figma: "Components/Alert".',
      },
    },
  },
  argTypes: {
    variant: { control: 'radio', options: ['error', 'warning', 'success', 'notification'] },
    title:   { control: 'text' },
  },
  args: {
    variant: 'warning',
    title: '',
  },
} satisfies Meta<typeof BaseAlert>

export default meta
type Story = StoryObj<typeof meta>

const defaultBody = 'This is an alert message with supporting detail that helps the user understand what happened and what to do next.'

// ─── Individual variants ──────────────────────────────────────────────────────

export const Error: Story = {
  name: 'Error',
  args: {
    variant: 'error',
    title: 'Something went wrong',
  },
  render: (args) => ({
    components: { BaseAlert },
    setup() { return { args, defaultBody } },
    template: `<div style="padding:24px;max-width:600px;"><BaseAlert v-bind="args">{{ defaultBody }}</BaseAlert></div>`,
  }),
}

export const Warning: Story = {
  name: 'Warning',
  args: {
    variant: 'warning',
    title: 'Heads up',
  },
  render: (args) => ({
    components: { BaseAlert },
    setup() { return { args, defaultBody } },
    template: `<div style="padding:24px;max-width:600px;"><BaseAlert v-bind="args">{{ defaultBody }}</BaseAlert></div>`,
  }),
}

export const Success: Story = {
  name: 'Success',
  args: {
    variant: 'success',
    title: 'Trade-in submitted',
  },
  render: (args) => ({
    components: { BaseAlert },
    setup() { return { args, defaultBody } },
    template: `<div style="padding:24px;max-width:600px;"><BaseAlert v-bind="args">{{ defaultBody }}</BaseAlert></div>`,
  }),
}

export const Notification: Story = {
  name: 'Notification',
  args: {
    variant: 'notification',
    title: 'New message from your advisor',
  },
  render: (args) => ({
    components: { BaseAlert },
    setup() { return { args, defaultBody } },
    template: `<div style="padding:24px;max-width:600px;"><BaseAlert v-bind="args">{{ defaultBody }}</BaseAlert></div>`,
  }),
}

// ─── Body-only (no title) ─────────────────────────────────────────────────────

export const BodyOnly: Story = {
  name: 'Body only (no title)',
  args: { variant: 'warning' },
  render: (args) => ({
    components: { BaseAlert },
    setup() { return { args } },
    template: `<div style="padding:24px;max-width:600px;"><BaseAlert v-bind="args">Your session will expire in 5 minutes. Save your progress.</BaseAlert></div>`,
  }),
}

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: 'All four variants stacked for visual comparison.',
      },
    },
  },
  render: () => ({
    components: { BaseAlert },
    template: `
      <div style="padding:24px;max-width:600px;display:flex;flex-direction:column;gap:16px;">
        <BaseAlert variant="error"        title="Something went wrong">Your payment could not be processed. Please check your card details and try again.</BaseAlert>
        <BaseAlert variant="warning"      title="Heads up">Your pre-approval expires in 3 days. Complete your purchase to lock in this rate.</BaseAlert>
        <BaseAlert variant="success"      title="Trade-in submitted">We'll appraise your vehicle and follow up within one business day.</BaseAlert>
        <BaseAlert variant="notification" title="New message from your advisor">Your advisor has replied to your financing inquiry.</BaseAlert>
      </div>
    `,
  }),
}
