import type { Meta, StoryObj } from '@storybook/vue3-vite'
import GlobalFooter from './GlobalFooter.vue'

const meta = {
  title: 'Organisms/GlobalFooter',
  component: GlobalFooter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-width site footer. Handles all viewports (DT/TB/MB) via CSS breakpoints.\n\n' +
          '- **Mobile** (<600px) — stacked: logo+phone, social row, 2-column link grid, bottom\n' +
          '- **Tablet** (600–991px) — stacked: logo+phone, social row, 3-column link row, bottom\n' +
          '- **Desktop** (≥992px) — horizontal: [logo+social] [Shop] [About] [Support] [phone], bottom bar',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    phoneNumber: { control: 'text' },
    logoHref:    { control: 'text' },
  },
  args: {
    phoneNumber: '(877) 708-4049',
    logoHref:    '/',
  },
} satisfies Meta<typeof GlobalFooter>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  name: 'DT — Desktop (≥992px)',
  render: (args) => ({
    components: { GlobalFooter },
    setup() { return { args } },
    template: `<GlobalFooter v-bind="args" />`,
  }),
}

export const Tablet: Story = {
  name: 'TB — Tablet (600–991px)',
  parameters: {
    docs: {
      description: { story: 'Component width fixed at 768px — uses container queries, not viewport.' },
    },
  },
  render: (args) => ({
    components: { GlobalFooter },
    setup() { return { args } },
    template: `
      <div style="width:768px;overflow:hidden;">
        <GlobalFooter v-bind="args" />
      </div>
    `,
  }),
}

export const Mobile: Story = {
  name: 'MB — Mobile (<600px)',
  parameters: {
    docs: {
      description: { story: 'Component width fixed at 390px — uses container queries, not viewport.' },
    },
  },
  render: (args) => ({
    components: { GlobalFooter },
    setup() { return { args } },
    template: `
      <div style="width:390px;overflow:hidden;">
        <GlobalFooter v-bind="args" />
      </div>
    `,
  }),
}

export const AllViewports: Story = {
  name: 'All viewports stacked',
  parameters: {
    docs: {
      description: { story: 'Desktop (full), tablet (768px) and mobile (390px) shown together.' },
    },
  },
  render: (args) => ({
    components: { GlobalFooter },
    setup() { return { args } },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;background:#f4f5f7;padding:24px;">
        <div>
          <p style="font-family:sans-serif;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;margin:0 0 8px;">Desktop — full width</p>
          <GlobalFooter v-bind="args" />
        </div>
        <div style="width:768px;overflow:hidden;">
          <p style="font-family:sans-serif;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;margin:0 0 8px;">Tablet — 768px</p>
          <GlobalFooter v-bind="args" />
        </div>
        <div style="width:390px;overflow:hidden;">
          <p style="font-family:sans-serif;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#6b7280;margin:0 0 8px;">Mobile — 390px</p>
          <GlobalFooter v-bind="args" />
        </div>
      </div>
    `,
  }),
}
