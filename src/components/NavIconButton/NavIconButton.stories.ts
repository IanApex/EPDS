import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NavIconButton from './NavIconButton.vue'

import heartFilledSvg   from '../../../icon/Style=Account, Detail=Heart-Filled, Icon=NA.svg?raw'
import profileCircleSvg from '../../../icon/Style=Account, Detail=Profile-Circle, Icon=NA.svg?raw'

const meta = {
  title: 'Atoms/Navigation/NavIconButton',
  component: NavIconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Generic 24 × 24 nav-area icon button. Used by the global header for the Favorites heart, the Profile avatar, and any future single-icon nav action (Cart, Notifications, etc.). Pure shape primitive — the consumer passes the SVG via the `#icon` slot and decides where the click goes.\n\n' +
          'Figma frames: Favorites heart (node `7639:21078`) and Profile avatar (node `7639:21038`). Same four states drive both.\n\n' +
          '**State map** (matches the rest of the nav family):\n' +
          '- Default → `--color-nav-text` (`#292B2E`)\n' +
          '- Hover → `--color-nav-text-hover` (`#445366`)\n' +
          '- Pressed (`:active`) **and** Selected → `--color-nav-text-focus` (`#566F8F`)\n' +
          '- Focus (`:focus-visible`) → 3 px Accessibility90 border (`#6FCFFF`)\n\n' +
          '`selected` is the persistent "you are on this page" indicator (icon equivalent of the bold-weight active state on `NavItem`).\n\n' +
          'Layout-stable focus ring — 30 × 30 outer with `box-sizing: border-box` and a permanent 3 px transparent border; inner icon area is 24 × 24. Renders as `<button>` by default and as `<a>` when `href` is supplied (active anchors get `aria-current="page"`).\n\n' +
          'Shares the global `--color-nav-*` tokens with `NavItem` / `NavItemMobile` / `NavItemSubmenu` / `MenuToggle`. The icon SVG inherits `currentColor` so all four state colours flow through automatically.',
      },
    },
  },
  argTypes: {
    ariaLabel: { control: 'text' },
    selected: { control: 'boolean', description: 'Persistent "current page" state — renders the icon in `--color-nav-text-focus` (#566F8F).' },
    href: { control: 'text', description: 'Renders the button as an `<a>` when set.' },
    target: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    ariaLabel: 'Saved favorites',
    selected: false,
    disabled: false,
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 24px; display: inline-flex;"><story /></div>',
    }),
  ],
} satisfies Meta<typeof NavIconButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Favorites (heart) ────────────────────────────────────

export const FavoritesDefault: Story = {
  name: 'Favorites / Default',
  render: (args) => ({
    components: { NavIconButton },
    setup: () => ({ args, heartFilledSvg }),
    template: `<NavIconButton v-bind="args"><template #icon><span v-html="heartFilledSvg" /></template></NavIconButton>`,
  }),
}

export const FavoritesHover: Story = {
  name: 'Favorites / Hover',
  parameters: { pseudo: { hover: true } },
  render: FavoritesDefault.render,
}

export const FavoritesPressed: Story = {
  name: 'Favorites / Pressed',
  parameters: {
    pseudo: { active: true },
    docs: { description: { story: 'Mouse / touch press — lighter steel-blue `#566F8F`.' } },
  },
  render: FavoritesDefault.render,
}

export const FavoritesSelected: Story = {
  name: 'Favorites / Selected (current page)',
  args: { selected: true },
  parameters: {
    docs: { description: { story: 'Persistent "current page" state — same colour as Pressed but driven by the `selected` prop.' } },
  },
  render: FavoritesDefault.render,
}

export const FavoritesFocus: Story = {
  name: 'Favorites / Focus',
  parameters: { pseudo: { focusVisible: true } },
  render: FavoritesDefault.render,
}

// ─── Profile (avatar) ─────────────────────────────────────

const profileArgs = { ariaLabel: 'Account profile' }

export const ProfileDefault: Story = {
  name: 'Profile / Default',
  args: profileArgs,
  render: (args) => ({
    components: { NavIconButton },
    setup: () => ({ args, profileCircleSvg }),
    template: `<NavIconButton v-bind="args"><template #icon><span v-html="profileCircleSvg" /></template></NavIconButton>`,
  }),
}

export const ProfileHover: Story = {
  name: 'Profile / Hover',
  args: profileArgs,
  parameters: { pseudo: { hover: true } },
  render: ProfileDefault.render,
}

export const ProfilePressed: Story = {
  name: 'Profile / Pressed',
  args: profileArgs,
  parameters: { pseudo: { active: true } },
  render: ProfileDefault.render,
}

export const ProfileSelected: Story = {
  name: 'Profile / Selected (current page)',
  args: { ...profileArgs, selected: true },
  render: ProfileDefault.render,
}

export const ProfileFocus: Story = {
  name: 'Profile / Focus',
  args: profileArgs,
  parameters: { pseudo: { focusVisible: true } },
  render: ProfileDefault.render,
}

// ─── As anchor ────────────────────────────────────────────

export const AsAnchor: Story = {
  args: { ariaLabel: 'Saved favorites', href: '#favorites' },
  render: (args) => ({
    components: { NavIconButton },
    setup: () => ({ args, heartFilledSvg }),
    template: `<NavIconButton v-bind="args"><template #icon><span v-html="heartFilledSvg" /></template></NavIconButton>`,
  }),
  parameters: {
    docs: { description: { story: 'When `href` is supplied the component renders as `<a>`. Selected anchors get `aria-current="page"` automatically.' } },
  },
}

// ─── All states grid ──────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 24px;"><story /></div>',
    }),
  ],
  render: () => ({
    components: { NavIconButton },
    setup: () => ({ heartFilledSvg, profileCircleSvg }),
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 60px); grid-template-rows: auto auto; gap: 24px 48px; align-items: center; justify-items: center;">
        <NavIconButton aria-label="Favorites">
          <template #icon><span v-html="heartFilledSvg" /></template>
        </NavIconButton>
        <NavIconButton aria-label="Favorites" class="pseudo-hover">
          <template #icon><span v-html="heartFilledSvg" /></template>
        </NavIconButton>
        <NavIconButton aria-label="Favorites" :selected="true">
          <template #icon><span v-html="heartFilledSvg" /></template>
        </NavIconButton>
        <NavIconButton aria-label="Favorites" class="pseudo-focus-visible">
          <template #icon><span v-html="heartFilledSvg" /></template>
        </NavIconButton>

        <NavIconButton aria-label="Profile">
          <template #icon><span v-html="profileCircleSvg" /></template>
        </NavIconButton>
        <NavIconButton aria-label="Profile" class="pseudo-hover">
          <template #icon><span v-html="profileCircleSvg" /></template>
        </NavIconButton>
        <NavIconButton aria-label="Profile" :selected="true">
          <template #icon><span v-html="profileCircleSvg" /></template>
        </NavIconButton>
        <NavIconButton aria-label="Profile" class="pseudo-focus-visible">
          <template #icon><span v-html="profileCircleSvg" /></template>
        </NavIconButton>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 60px); gap: 24px 48px; margin-top: 16px; justify-items: center;">
        <span style="font: 12px Roboto, sans-serif; color: #666B70;">Default</span>
        <span style="font: 12px Roboto, sans-serif; color: #666B70;">Hover</span>
        <span style="font: 12px Roboto, sans-serif; color: #666B70;">Selected</span>
        <span style="font: 12px Roboto, sans-serif; color: #666B70;">Focus</span>
      </div>
    `,
  }),
  parameters: {
    pseudo: {
      hover: ['.pseudo-hover'],
      focusVisible: ['.pseudo-focus-visible'],
    },
    docs: { description: { story: 'Top row: Favorites heart. Bottom row: Profile avatar. Same four states each.' } },
  },
}

// ─── Header context ───────────────────────────────────────

export const HeaderRowPreview: Story = {
  name: 'Header row preview',
  render: () => ({
    components: { NavIconButton },
    setup() {
      const favSelected  = ref(false)
      const profSelected = ref(false)
      return { favSelected, profSelected, heartFilledSvg, profileCircleSvg }
    },
    template: `
      <div style="display: inline-flex; align-items: center; gap: 24px; padding: 16px 24px; background: #fff; border: 1px solid #E8E9EB; border-radius: 8px;">
        <NavIconButton
          aria-label="Saved favorites"
          :selected="favSelected"
          @click="favSelected = !favSelected"
        >
          <template #icon><span v-html="heartFilledSvg" /></template>
        </NavIconButton>
        <NavIconButton
          aria-label="Account profile"
          :selected="profSelected"
          @click="profSelected = !profSelected"
        >
          <template #icon><span v-html="profileCircleSvg" /></template>
        </NavIconButton>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Both icons composed side-by-side as they appear in the global header. Click each to toggle its `selected` state and see the lighter "current page" colour.',
      },
    },
  },
}
