import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MenuToggle from './MenuToggle.vue'

const meta = {
  title: 'Atoms/Navigation/MenuToggle',
  component: MenuToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Mobile menu hamburger / close toggle. The button shows the hamburger icon when the drawer is closed and the X (close) icon when it\'s open.\n\n' +
          'Figma frames: "Hamburger menu / closed" (closed/hamburger states, node `7639:20490`) and the open/X states immediately below (node `7639:20520`).\n\n' +
          'Click toggles `open` automatically — works as `v-model:open` out of the box, matching `NavItem` (dropdown variant) and `CompareButton`.\n\n' +
          'States: **Default**, **Hover** (steel-blue `#445366`), **Pressed** (lighter steel-blue `#566F8F`, fired transiently via `:active`), **Focus** (3 px Accessibility90 border `#6FCFFF`).\n\n' +
          'Layout-stable focus ring — outer size is fixed at 30 × 30 with `box-sizing: border-box` and a permanent 3 px transparent border; inner icon is always 24 × 24. Toggling `:focus-visible` never shifts the surrounding header layout.\n\n' +
          'Shares the global `--color-nav-*` tokens with `NavItem` / `NavItemMobile` / `NavItemSubmenu`. Uses the bundled `Style=Display, Detail=Menu, Icon=Menu.svg` and `Style=Display, Detail=Default, Icon=Close.svg`; both inherit `currentColor` so all four state colours flow through the icon automatically.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean', description: '`true` shows the X (close) icon; `false` shows the hamburger.' },
    ariaLabel: { control: 'text', description: 'Override the computed `Open menu` / `Close menu` label.' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    open: false,
    disabled: false,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 24px;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof MenuToggle>

export default meta
type Story = StoryObj<typeof meta>

// ─── Closed (hamburger) states ────────────────────────────

export const ClosedDefault: Story = {
  name: 'Closed / Default',
}

export const ClosedHover: Story = {
  name: 'Closed / Hover',
  parameters: { pseudo: { hover: true } },
}

export const ClosedPressed: Story = {
  name: 'Closed / Pressed',
  parameters: {
    pseudo: { active: true },
    docs: { description: { story: 'Mouse / touch press — lighter steel-blue `#566F8F`.' } },
  },
}

export const ClosedFocus: Story = {
  name: 'Closed / Focus',
  parameters: { pseudo: { focusVisible: true } },
}

// ─── Open (X / close) states ──────────────────────────────

export const OpenDefault: Story = {
  name: 'Open / Default',
  args: { open: true },
}

export const OpenHover: Story = {
  name: 'Open / Hover',
  args: { open: true },
  parameters: { pseudo: { hover: true } },
}

export const OpenPressed: Story = {
  name: 'Open / Pressed',
  args: { open: true },
  parameters: { pseudo: { active: true } },
}

export const OpenFocus: Story = {
  name: 'Open / Focus',
  args: { open: true },
  parameters: { pseudo: { focusVisible: true } },
}

// ─── Disabled ─────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true },
}

// ─── Showcase ─────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 24px;"><story /></div>',
    }),
  ],
  render: () => ({
    components: { MenuToggle },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 60px); grid-template-rows: auto auto; gap: 24px 48px; align-items: center; justify-items: center;">
        <MenuToggle />
        <MenuToggle class="pseudo-hover" />
        <MenuToggle class="pseudo-active" />
        <MenuToggle class="pseudo-focus-visible" />

        <MenuToggle :open="true" />
        <MenuToggle :open="true" class="pseudo-hover" />
        <MenuToggle :open="true" class="pseudo-active" />
        <MenuToggle :open="true" class="pseudo-focus-visible" />
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 60px); gap: 24px 48px; margin-top: 16px; justify-items: center;">
        <span style="font: 12px Roboto, sans-serif; color: #666B70;">Default</span>
        <span style="font: 12px Roboto, sans-serif; color: #666B70;">Hover</span>
        <span style="font: 12px Roboto, sans-serif; color: #666B70;">Pressed</span>
        <span style="font: 12px Roboto, sans-serif; color: #666B70;">Focus</span>
      </div>
    `,
  }),
  parameters: {
    pseudo: {
      hover: ['.pseudo-hover'],
      active: ['.pseudo-active'],
      focusVisible: ['.pseudo-focus-visible'],
    },
    docs: {
      description: {
        story: 'Top row: closed (hamburger). Bottom row: open (X). Same four states each.',
      },
    },
  },
}

// ─── Interactive ──────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (click to toggle)',
  render: () => ({
    components: { MenuToggle },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <MenuToggle v-model:open="open" />
        <span style="font: 14px Roboto, sans-serif; color: #666B70;">
          Drawer is <strong>{{ open ? 'open' : 'closed' }}</strong>
        </span>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Click the button to flip between hamburger and X. The component toggles `open` itself ' +
          'via `update:open`, so wiring `v-model:open` to the parent drawer state is all that\'s needed.',
      },
    },
  },
}
