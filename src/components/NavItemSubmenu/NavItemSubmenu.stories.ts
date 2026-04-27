import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NavItemSubmenu from './NavItemSubmenu.vue'

const meta = {
  title: 'Atoms/Navigation/NavItemSubmenu',
  component: NavItemSubmenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Sub-menu navigation item — the leaf-level link inside a drilled-in mobile sub-menu (the level below `NavItemMobile`).\n\n' +
          'Figma: "Submenu" (node `7639:20454`).\n\n' +
          'No chevron — clicking simply navigates to the destination. Content-sized inline link; the parent ' +
          'menu container controls stacking and full-width tap targets.\n\n' +
          'States: **Default**, **Hover** (underline + steel-blue), **Pressed** (Roboto Black 900 — fired ' +
          'transiently via `:active` and persistently via the `active` prop), **Focus** (3 px Accessibility90 ' +
          'border + lighter steel-blue text `#566F8F`).\n\n' +
          'Typography differs from the parent rows: 16 px / **line-height 1.5** / **letter-spacing -0.352 px** ' +
          '(vs `NavItemMobile`\'s 18 px / 1 / -0.036 px). Shares the global `--color-nav-*` tokens.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    active: {
      control: 'boolean',
      description: 'Persistent "pressed" visual — typically marks the current sub-menu page.',
    },
    href: { control: 'text', description: 'Renders as `<a>` when set.' },
    target: { control: 'text' },
    ariaLabel: { control: 'text' },
    onClick: { action: 'click' },
  },
  args: {
    label: 'Submenu',
    active: false,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 16px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof NavItemSubmenu>

export default meta
type Story = StoryObj<typeof meta>

// ─── Single-state stories ─────────────────────────────────

export const Default: Story = {}

export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Hover — underlined, steel-blue (`#445366`).' } },
  },
}

export const Pressed: Story = {
  args: { active: true },
  parameters: {
    docs: {
      description: {
        story:
          'Pressed — Roboto Black 900 in `#292B2E`. Same visual fires transiently via `:active` on touch ' +
          'press; pass `active="true"` to lock it on persistently (e.g. for the current sub-menu page).',
      },
    },
  },
}

export const FocusSelected: Story = {
  name: 'Focus',
  parameters: {
    pseudo: { focusVisible: true },
    docs: {
      description: {
        story: 'Keyboard focus — 3 px Accessibility90 border + lighter steel-blue text `#566F8F`.',
      },
    },
  },
}

// ─── Anchor variant ───────────────────────────────────────

export const AsAnchor: Story = {
  name: 'As anchor tag',
  args: { href: '#new-cars' },
  parameters: {
    docs: {
      description: {
        story:
          'When `href` is provided the row renders as an `<a>` tag; `aria-current="page"` is applied ' +
          'automatically when `active` is true.',
      },
    },
  },
}

// ─── Showcase ─────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => ({
    components: { NavItemSubmenu },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 120px); gap: 32px; align-items: start;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <NavItemSubmenu label="Submenu" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Default</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <NavItemSubmenu label="Submenu" class="pseudo-hover" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Hover</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <NavItemSubmenu label="Submenu" :active="true" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Pressed</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <NavItemSubmenu label="Submenu" class="pseudo-focus-visible" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Focus</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    pseudo: { hover: ['.pseudo-hover'], focusVisible: ['.pseudo-focus-visible'] },
    docs: { description: { story: 'Side-by-side reference for the four Figma states.' } },
  },
}

export const SubmenuList: Story = {
  name: 'In a sub-menu list',
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 16px; background: #F4F5F7;"><story /></div>',
    }),
  ],
  render: () => ({
    components: { NavItemSubmenu },
    template: `
      <nav
        aria-label="Finance sub-menu"
        style="
          width: 320px;
          background: #fff;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
          border: 1px solid #E8E9EB;
          border-radius: 8px;
        "
      >
        <NavItemSubmenu href="#calculator">Payment calculator</NavItemSubmenu>
        <NavItemSubmenu href="#prequalify" :active="true">Pre-qualify</NavItemSubmenu>
        <NavItemSubmenu href="#trade-in">Get a trade-in offer</NavItemSubmenu>
        <NavItemSubmenu href="#protection">Protection plans</NavItemSubmenu>
        <NavItemSubmenu href="#faq">Financing FAQ</NavItemSubmenu>
      </nav>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Compositional preview — five sub-menu links inside a 320 px-wide container with one item ' +
          'marked as the current page. The parent flex column controls vertical stacking and 24 px row gap.',
      },
    },
  },
}
