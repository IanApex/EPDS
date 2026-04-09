import type { Meta, StoryObj } from '@storybook/vue3-vite'
import GlobalHeader from './GlobalHeader.vue'

const meta = {
  title: 'Organisms/GlobalHeader',
  component: GlobalHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-width site header. Handles all viewports (DT/TB/MB) via internal CSS breakpoints and all page-context variants.\n\n' +
          '**Variants:**\n' +
          '- `global` — standard white bar with nav links (DT) or hamburger (TB/MB)\n' +
          '- `global-search` — same but with a search bar below the nav bar\n' +
          '- `homepage` — transparent bg, white text/icons for hero overlay\n' +
          '- `homepage-search` — transparent + search bar\n' +
          '- `purchase` — minimal: logo left, phone number right\n\n' +
          '**Auth state:** `guest` prop swaps the profile icon for a green "Sign in" pill.\n\n' +
          'Listen for `@menu-click`, `@location-click`, `@favorites-click`, `@profile-click`, `@sign-in-click`, `@more-click`, `@search`.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    variant:  {
      control: 'select',
      options: ['global', 'global-search', 'homepage', 'homepage-search', 'purchase'],
    },
    guest:       { control: 'boolean' },
    zipCode:     { control: 'text' },
    phoneNumber: { control: 'text' },
  },
  args: {
    variant:     'global',
    guest:       false,
    zipCode:     '75214',
    phoneNumber: '888-475-7268',
  },
} satisfies Meta<typeof GlobalHeader>

export default meta
type Story = StoryObj<typeof meta>

// ─── Desktop variants ─────────────────────────────────────────────────────────

export const GlobalDefault: Story = {
  name: 'DT — Global (signed in)',
  args: { variant: 'global', guest: false },
  render: (args) => ({
    components: { GlobalHeader },
    setup() { return { args } },
    template: `<GlobalHeader v-bind="args" />`,
  }),
}

export const GlobalGuest: Story = {
  name: 'DT — Global (guest / Sign in)',
  args: { variant: 'global', guest: true },
  render: (args) => ({
    components: { GlobalHeader },
    setup() { return { args } },
    template: `<GlobalHeader v-bind="args" />`,
  }),
}

export const GlobalSearch: Story = {
  name: 'DT — GlobalSearch (signed in)',
  args: { variant: 'global-search', guest: false },
  render: (args) => ({
    components: { GlobalHeader },
    setup() { return { args } },
    template: `<GlobalHeader v-bind="args" />`,
  }),
}

export const GlobalSearchGuest: Story = {
  name: 'DT — GlobalSearch (guest)',
  args: { variant: 'global-search', guest: true },
  render: (args) => ({
    components: { GlobalHeader },
    setup() { return { args } },
    template: `<GlobalHeader v-bind="args" />`,
  }),
}

export const Homepage: Story = {
  name: 'DT — Homepage (transparent, white)',
  args: { variant: 'homepage', guest: false },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: { story: 'Transparent bg — designed to overlay a hero image. All text and icons are white.' },
    },
  },
  render: (args) => ({
    components: { GlobalHeader },
    setup() { return { args } },
    template: `
      <div style="background:#242c33;min-height:200px;">
        <GlobalHeader v-bind="args" />
      </div>
    `,
  }),
}

export const HomepageGuest: Story = {
  name: 'DT — Homepage (guest)',
  args: { variant: 'homepage', guest: true },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => ({
    components: { GlobalHeader },
    setup() { return { args } },
    template: `
      <div style="background:#242c33;min-height:200px;">
        <GlobalHeader v-bind="args" />
      </div>
    `,
  }),
}

export const HomepageSearch: Story = {
  name: 'DT — HomepageSearch',
  args: { variant: 'homepage-search', guest: false },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: (args) => ({
    components: { GlobalHeader },
    setup() { return { args } },
    template: `
      <div style="background:#242c33;min-height:200px;">
        <GlobalHeader v-bind="args" />
      </div>
    `,
  }),
}

export const Purchase: Story = {
  name: 'DT — Purchase (minimal)',
  args: { variant: 'purchase' },
  parameters: {
    docs: {
      description: { story: 'Minimal header for purchase/checkout flow. Logo left, phone number right.' },
    },
  },
  render: (args) => ({
    components: { GlobalHeader },
    setup() { return { args } },
    template: `<GlobalHeader v-bind="args" />`,
  }),
}

// ─── Responsive showcase ──────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants stacked',
  parameters: {
    docs: {
      description: { story: 'All five variants in order. Resize the viewport to see DT/TB/MB responsive behaviour.' },
    },
  },
  render: () => ({
    components: { GlobalHeader },
    template: `
      <div style="display:flex;flex-direction:column;gap:0;">
        <GlobalHeader variant="global"          :guest="false" />
        <GlobalHeader variant="global"          :guest="true"  />
        <GlobalHeader variant="global-search"   :guest="false" />
        <GlobalHeader variant="global-search"   :guest="true"  />
        <div style="background:#242c33">
          <GlobalHeader variant="homepage"        :guest="false" />
        </div>
        <div style="background:#242c33">
          <GlobalHeader variant="homepage"        :guest="true"  />
        </div>
        <div style="background:#242c33">
          <GlobalHeader variant="homepage-search" :guest="false" />
        </div>
        <GlobalHeader variant="purchase" phone-number="888-475-7268" />
      </div>
    `,
  }),
}
