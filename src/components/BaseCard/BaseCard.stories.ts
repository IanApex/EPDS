import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseCard from './BaseCard.vue'

const meta = {
  title: 'Components/BaseCard',
  component: BaseCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Content container with a white background, 1px Neutral90 border, and 8px rounded corners.\n\n' +
          '**Sizes:** `min` = 280px wide, `max` = 420px wide\n\n' +
          '**Content padding:** 24px on all sides — built in.\n\n' +
          '**Height** is always determined by content — not fixed.\n\n' +
          '```html\n' +
          '<BaseCard size="max">\n' +
          '  <h3>Card title</h3>\n' +
          '  <p>Card body content.</p>\n' +
          '</BaseCard>\n' +
          '```\n\n' +
          'Figma: "UI Components/Card base".',
      },
    },
  },
  argTypes: {
    size: { control: 'radio', options: ['min', 'max'] },
  },
  args: {
    size: 'min',
  },
} satisfies Meta<typeof BaseCard>

export default meta
type Story = StoryObj<typeof meta>

const sampleContent = `
  <div style="display:flex;flex-direction:column;gap:12px;">
    <h3 style="font-family:Roboto,sans-serif;font-size:20px;font-weight:700;margin:0;color:#242C33;">Card title</h3>
    <p style="font-family:Roboto,sans-serif;font-size:16px;margin:0;color:#242C33;line-height:1.5;">
      Card body content. The 24px padding is built into the card on all sides.
    </p>
  </div>
`

// ─── Size variants ────────────────────────────────────────────────────────────

export const MinWidth: Story = {
  name: 'Min — 280px',
  args: { size: 'min' },
  render: (args) => ({
    components: { BaseCard },
    setup() { return { args } },
    template: `<div style="padding:24px;"><BaseCard v-bind="args">${sampleContent}</BaseCard></div>`,
  }),
}

export const MaxWidth: Story = {
  name: 'Max — 420px',
  args: { size: 'max' },
  render: (args) => ({
    components: { BaseCard },
    setup() { return { args } },
    template: `<div style="padding:24px;"><BaseCard v-bind="args">${sampleContent}</BaseCard></div>`,
  }),
}

// ─── Both sizes ───────────────────────────────────────────────────────────────

export const BothSizes: Story = {
  name: 'Both sizes',
  parameters: {
    docs: {
      description: {
        story: 'Min (280px) and Max (420px) side by side.',
      },
    },
  },
  render: () => ({
    components: { BaseCard },
    template: `
      <div style="display:flex;gap:24px;padding:24px;align-items:flex-start;flex-wrap:wrap;">
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
          <BaseCard size="min">${sampleContent}</BaseCard>
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">Min — 280px</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
          <BaseCard size="max">${sampleContent}</BaseCard>
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">Max — 420px</span>
        </div>
      </div>
    `,
  }),
}

// ─── Overflow clipping ────────────────────────────────────────────────────────

export const OverflowClipping: Story = {
  name: 'Overflow clipping',
  parameters: {
    docs: {
      description: {
        story: 'Content that extends to the card edge (e.g. images, coloured headers) is clipped by the rounded corners.',
      },
    },
  },
  render: () => ({
    components: { BaseCard },
    template: `
      <div style="padding:24px;">
        <BaseCard size="max">
          <div style="margin:-24px -24px 16px;height:120px;background:linear-gradient(135deg,#3E8500,#5C9C08);border-radius:8px 8px 0 0;"></div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <h3 style="font-family:Roboto,sans-serif;font-size:20px;font-weight:700;margin:0;color:#242C33;">Image card</h3>
            <p style="font-family:Roboto,sans-serif;font-size:16px;margin:0;color:#242C33;line-height:1.5;">
              A full-bleed header is clipped to the card's border-radius by <code>overflow: hidden</code>.
            </p>
          </div>
        </BaseCard>
      </div>
    `,
  }),
}
