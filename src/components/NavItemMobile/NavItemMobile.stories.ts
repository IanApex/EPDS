import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NavItemMobile from './NavItemMobile.vue'

const meta = {
  title: 'Atoms/Navigation/NavItemMobile',
  component: NavItemMobile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Mobile parent navigation item — the drill-in row used inside the mobile menu drawer.\n\n' +
          'Figma: "Navigation / hidden menu" (node `7639:20419`).\n\n' +
          'Tapping the row navigates into a sub-menu / sub-page; **the chevron always points right** ' +
          'and never rotates (unlike the desktop `NavItem` dropdown variant which toggles open/close).\n\n' +
          'States: **Default**, **Hover** (label underline + steel-blue), **Pressed** (Roboto Black 900 — ' +
          'fired transiently via `:active` and persistently via the `active` prop), **Focus** (3 px ' +
          'Accessibility90 border + lighter steel-blue text `#566F8F`).\n\n' +
          'Layout: full-width row with `justify-content: space-between` so the label sits flush left and ' +
          'the chevron pins to the right edge of the menu container.\n\n' +
          'Typography: 18 px / line-height 1 / letter-spacing -0.036 px (vs 16 px / -0.032 px on desktop ' +
          '`NavItem`). Shares the global `--color-nav-*` tokens.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    active: {
      control: 'boolean',
      description: 'Persistent "pressed" visual — typically marks the currently-drilled-in branch.',
    },
    href: { control: 'text', description: 'Renders as `<a>` when set.' },
    target: { control: 'text' },
    ariaLabel: { control: 'text' },
    onClick: { action: 'click' },
  },
  args: {
    label: 'Navigation',
    active: false,
  },
  decorators: [
    /* The component is `width: 100%` by design; constrain the demo to a
     * Figma-sized 156 px so single-state stories don't stretch the canvas. */
    (story) => ({
      components: { story },
      template: '<div style="width: 280px; padding: 16px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof NavItemMobile>

export default meta
type Story = StoryObj<typeof meta>

// ─── Single-state stories ─────────────────────────────────

export const Default: Story = {}

export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Hover — label underlined, steel-blue (`#445366`).' } },
  },
}

export const Pressed: Story = {
  args: { active: true },
  parameters: {
    docs: {
      description: {
        story:
          'Pressed — Roboto Black 900 in `#292B2E`. The same visual fires transiently via `:active` ' +
          'on touch press; pass `active="true"` to lock it on persistently (e.g. while a drilled-in ' +
          'sub-menu page is open).',
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
  args: { href: '#shop' },
  parameters: {
    docs: { description: { story: 'When `href` is provided the row renders as an `<a>` tag.' } },
  },
}

// ─── Showcase ─────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 16px;"><story /></div>',
    }),
  ],
  render: () => ({
    components: { NavItemMobile },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 156px); gap: 32px;">
        <div style="display: flex; flex-direction: column; align-items: stretch; gap: 8px;">
          <NavItemMobile label="Navigation" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70; text-align: center;">Default</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: stretch; gap: 8px;">
          <NavItemMobile label="Navigation" class="pseudo-hover" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70; text-align: center;">Hover</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: stretch; gap: 8px;">
          <NavItemMobile label="Navigation" :active="true" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70; text-align: center;">Pressed</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: stretch; gap: 8px;">
          <NavItemMobile label="Navigation" class="pseudo-focus-visible" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70; text-align: center;">Focus</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    pseudo: { hover: ['.pseudo-hover'], focusVisible: ['.pseudo-focus-visible'] },
    docs: { description: { story: 'Side-by-side reference for the four Figma states.' } },
  },
}

export const MobileMenuPreview: Story = {
  name: 'In a mobile menu drawer',
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 16px; background: #F4F5F7;"><story /></div>',
    }),
  ],
  render: () => ({
    components: { NavItemMobile },
    template: `
      <nav
        aria-label="Mobile primary"
        style="
          width: 320px;
          background: #fff;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          border: 1px solid #E8E9EB;
          border-radius: 8px;
        "
      >
        <NavItemMobile href="#shop">Shop</NavItemMobile>
        <NavItemMobile href="#sell">Sell or trade-in</NavItemMobile>
        <NavItemMobile href="#finance" :active="true">Finance</NavItemMobile>
        <NavItemMobile href="#about">About us</NavItemMobile>
        <NavItemMobile href="#support">Support</NavItemMobile>
      </nav>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Compositional preview — five drill-in rows in a 320 px-wide drawer with one row marked as ' +
          'the currently-drilled-in branch. The chevron pins to the right edge of each row regardless ' +
          'of label length.',
      },
    },
  },
}

export const VariableLabels: Story = {
  name: 'Variable label widths',
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 16px;"><story /></div>',
    }),
  ],
  render: () => ({
    components: { NavItemMobile },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 280px;">
        <NavItemMobile label="Shop" />
        <NavItemMobile label="Sell or trade-in" />
        <NavItemMobile label="Finance" />
        <NavItemMobile label="About us" />
        <NavItemMobile label="Service and protection" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates that the chevron stays pinned to the right edge regardless of label length — ' +
          '`justify-content: space-between` does the work.',
      },
    },
  },
}
