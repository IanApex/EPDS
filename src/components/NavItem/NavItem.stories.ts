import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NavItem from './NavItem.vue'

const meta = {
  title: 'Atoms/Navigation/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single navigation item — atom for the global header (currently themed for Sonic Automotive).\n\n' +
          'Two Figma variants are folded into one component:\n\n' +
          '- **No dropdown** (default) — Figma node `7639:20395`\n' +
          '- **With dropdown** (`:dropdown="true"`) — Figma node `7639:20405` — adds an 8 px-gap 24×24 chevron that points Down by default + hover and flips Up when `active`.\n\n' +
          'States: **Default**, **Hover** (label underline + steel-blue), **Active** (Roboto Black 900 — current page on no-dropdown, open menu on dropdown), **Focus** (3 px Accessibility90 border + lighter steel-blue text `#566F8F`).\n\n' +
          '**Brand awareness** — colour comes from `--color-nav-*` tokens declared in both primitives files with identical Figma values; switch the **Brand** toolbar to verify both modes render the same nav appearance.\n\n' +
          'Renders as `<button>` by default or `<a>` when `href` is set. Dropdown variants automatically wire `aria-haspopup="true"` and `aria-expanded` from `active`.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    dropdown: { control: 'boolean', description: 'Show the trailing chevron (with-dropdown variant).' },
    href: { control: 'text', description: 'Renders as `<a>` when set.' },
    target: { control: 'text' },
    ariaLabel: { control: 'text' },
    onClick: { action: 'click' },
  },
  args: {
    label: 'Navigation',
    active: false,
    dropdown: false,
  },
} satisfies Meta<typeof NavItem>

export default meta
type Story = StoryObj<typeof meta>

// ─── No-dropdown variant (default) ────────────────────────

export const Default: Story = {}

export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
    docs: { description: { story: 'Hover — label underlined, steel-blue (`#445366`).' } },
  },
}

export const Active: Story = {
  args: { active: true },
  parameters: {
    docs: {
      description: {
        story:
          'Current page — Roboto Black 900. When rendered as an anchor (`href` set) this also applies `aria-current="page"`.',
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

// ─── With-dropdown variant ────────────────────────────────

export const DropdownDefault: Story = {
  name: 'Dropdown / Default',
  args: { dropdown: true },
  parameters: {
    docs: { description: { story: 'With-dropdown — 24×24 Down chevron at 8 px gap.' } },
  },
}

export const DropdownHover: Story = {
  name: 'Dropdown / Hover',
  args: { dropdown: true },
  parameters: { pseudo: { hover: true } },
}

export const DropdownActive: Story = {
  name: 'Dropdown / Active',
  args: { dropdown: true, active: true },
  parameters: {
    docs: {
      description: {
        story:
          'Open dropdown — Roboto Black 900 + chevron flipped Up. Sets `aria-expanded="true"`.',
      },
    },
  },
}

export const DropdownFocus: Story = {
  name: 'Dropdown / Focus',
  args: { dropdown: true, active: true },
  parameters: {
    pseudo: { focusVisible: true },
    docs: {
      description: {
        story: 'Focus on an open dropdown — keeps the bold + Up chevron, adds the focus ring.',
      },
    },
  },
}

// ─── Anchor variant ───────────────────────────────────────

export const AsAnchor: Story = {
  name: 'As anchor tag',
  args: { href: '#shop' },
  parameters: {
    docs: {
      description: {
        story:
          'When `href` is provided the component renders as an `<a>` tag. `aria-current="page"` is applied automatically when `active` is true (no-dropdown variant only).',
      },
    },
  },
}

export const ActiveAnchor: Story = {
  name: 'Active anchor (current page)',
  args: { href: '#shop', active: true },
}

// ─── Showcase ─────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states — no dropdown',
  render: () => ({
    components: { NavItem },
    template: `
      <div style="display: flex; align-items: center; gap: 64px; padding: 16px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <NavItem label="Navigation" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Default</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <NavItem label="Navigation" class="pseudo-hover" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Hover</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <NavItem label="Navigation" :active="true" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Active</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <NavItem label="Navigation" class="pseudo-focus-visible" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Focus</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    pseudo: { hover: ['.pseudo-hover'], focusVisible: ['.pseudo-focus-visible'] },
  },
}

export const AllStatesDropdown: Story = {
  name: 'All states — with dropdown',
  render: () => ({
    components: { NavItem },
    template: `
      <div style="display: flex; align-items: center; gap: 64px; padding: 16px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <NavItem label="Navigation" :dropdown="true" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Default</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <NavItem label="Navigation" :dropdown="true" class="pseudo-hover" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Hover</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <NavItem label="Navigation" :dropdown="true" :active="true" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Active</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <NavItem label="Navigation" :dropdown="true" :active="true" class="pseudo-focus-visible" />
          <span style="font: 12px Roboto, sans-serif; color: #666B70;">Focus</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    pseudo: { hover: ['.pseudo-hover'], focusVisible: ['.pseudo-focus-visible'] },
  },
}

// ─── Interactive ──────────────────────────────────────────

export const DropdownInteractive: Story = {
  name: 'Dropdown / Interactive (click to toggle)',
  render: () => ({
    components: { NavItem },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="padding: 24px;">
        <NavItem v-model:active="open" :dropdown="true">Finance</NavItem>
        <p style="margin-top: 16px; font: 14px Roboto, sans-serif; color: #666B70;">
          Menu open: <strong>{{ open ? 'true' : 'false' }}</strong>
        </p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Click the nav item to toggle the active state. The component toggles `active` itself ' +
          '(via `update:active`) only for the **dropdown** variant — plain links never toggle on ' +
          'click; their parent app sets `active` from the current route.',
      },
    },
  },
}

export const NavBarPreview: Story = {
  name: 'In a nav bar',
  render: () => ({
    components: { NavItem },
    setup() {
      const openMenu = ref<string | null>(null)
      const toggle = (id: string) => {
        openMenu.value = openMenu.value === id ? null : id
      }
      return { openMenu, toggle }
    },
    template: `
      <nav aria-label="Primary" style="display: flex; align-items: center; gap: 32px; padding: 24px;">
        <NavItem href="#shop" :active="true">Shop</NavItem>
        <NavItem href="#sell">Sell or trade-in</NavItem>
        <NavItem
          :dropdown="true"
          :active="openMenu === 'finance'"
          @click.prevent="toggle('finance')"
        >Finance</NavItem>
        <NavItem
          :dropdown="true"
          :active="openMenu === 'about'"
          @click.prevent="toggle('about')"
        >About us</NavItem>
        <NavItem href="#support">Support</NavItem>
      </nav>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Compositional preview — anchor nav items, the current page, and two dropdown triggers in one bar. ' +
          'Click a dropdown item to toggle it open; the parent enforces single-open behaviour by tracking ' +
          'which menu is open and resetting siblings.',
      },
    },
  },
}
