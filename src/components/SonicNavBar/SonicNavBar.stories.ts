import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { onMounted, ref } from 'vue'
import SonicNavBar from './SonicNavBar.vue'
import type { NavBarItem } from './SonicNavBar.vue'

// ───────────────────────────────────────────────────────────
// Shared seed data — matches the Figma "Shop rides" mega-menu.
// ───────────────────────────────────────────────────────────
const navItems: NavBarItem[] = [
  {
    key: 'shop',
    label: 'Shop rides',
    dropdown: [
      {
        heading: 'Shop by ride',
        links: [
          { label: 'New cars',                href: '#' },
          { label: 'Certified pre-owned cars', href: '#' },
          { label: 'Used cars',               href: '#' },
          { label: 'Powersports',             href: '#' },
          { label: 'Luxury & exotics',        href: '#' },
        ],
      },
      {
        heading: 'Shop by type',
        links: [
          { label: 'Sedans',                 href: '#' },
          { label: 'Trucks',                 href: '#' },
          { label: 'SUVs & crossovers',      href: '#' },
          { label: 'Coupes & convertibles',  href: '#' },
          { label: 'EVs & hybrids',          href: '#' },
          { label: 'ATVs',                   href: '#' },
          { label: 'UTVs',                   href: '#' },
          { label: 'Motorcycles',            href: '#' },
          { label: 'Watercraft',             href: '#' },
        ],
      },
    ],
  },
  {
    key: 'stores',
    label: 'Our stores',
    dropdown: [
      {
        heading: 'Find a store',
        links: [
          { label: 'Browse all stores', href: '#' },
          { label: 'Find by ZIP',       href: '#' },
          { label: 'Schedule a visit',  href: '#' },
        ],
      },
    ],
  },
  {
    key: 'service',
    label: 'Service & parts',
    dropdown: [
      {
        heading: 'Service',
        links: [
          { label: 'Schedule service', href: '#' },
          { label: 'Recalls',          href: '#' },
          { label: 'Tire center',      href: '#' },
        ],
      },
      {
        heading: 'Parts & gear',
        links: [
          { label: 'OEM parts',        href: '#' },
          { label: 'Accessories',      href: '#' },
          { label: 'Apparel',          href: '#' },
        ],
      },
    ],
  },
  {
    key: 'sell',
    label: 'Sell/Trade',
    href: '#sell',
  },
  {
    key: 'company',
    label: 'Our Company',
    dropdown: [
      {
        heading: 'About Sonic',
        links: [
          { label: 'Who we are',  href: '#' },
          { label: 'Newsroom',    href: '#' },
          { label: 'Investors',   href: '#' },
          { label: 'Careers',     href: '#' },
        ],
      },
    ],
  },
]

const meta = {
  title: 'Organisms/SonicNavBar',
  component: SonicNavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sonic-style global navigation bar. Composes every nav atom in the system: `NavItem` (desktop primary nav + dropdown triggers), `NavItemMobile` (mobile drawer parent rows), `NavItemSubmenu` (drilled submenu leaf links), `MenuToggle` (hamburger / close), `NavIconButton` (favourites + profile), `BaseButton` (primary CTA), and `Divider` (mobile drilled submenu separator).\n\n' +
          'Five Figma states ship as stories: **Default** (desktop bar), **Variant 2** (mobile bar), **Variant 3** (desktop with mega-menu open), **Variant 4** (mobile drawer with parent list), **Variant 5** (mobile drawer drilled into a parent submenu).\n\n' +
          '**Interactions** (full):\n' +
          '- Click a desktop dropdown trigger to open / close its mega-menu (only one open at a time).\n' +
          '- Click outside the bar — or press `Escape` — to close any open mega-menu.\n' +
          '- Mobile: hamburger toggles the drawer; clicking a parent row with a `dropdown` drills into the submenu (back arrow / `Escape` returns).\n' +
          '- Body scroll locks while the mobile drawer is open (mirrors the `Overlay` atom).\n\n' +
          '**Brand awareness**: Every visual is token-driven. The CTA renders red on Sonic / green on EchoPark via `BaseButton variant="primary"`. The brand-coloured top border on the mega-menu and mobile drawer reads from `--color-nav-active-indicator` (Sonic dark red `#D9320D` / EchoPark green). All nav text colours come from the global `--color-nav-*` family already shared across `NavItem` / `NavItemMobile` / `NavItemSubmenu` / `MenuToggle` / `NavIconButton`.\n\n' +
          'The "Sonic" name reflects the Figma source frame, but the component is brand-agnostic — flip the Storybook **Brand** toolbar to **EchoPark** to see the same layout themed green.',
      },
    },
  },
  argTypes: {
    navItems:        { control: 'object' },
    logoHref:        { control: 'text' },
    brandName:       { control: 'text' },
    ctaLabel:        { control: 'text' },
    favoritesSelected: { control: 'boolean' },
    profileSelected:   { control: 'boolean' },
    forceMobile:     { control: 'boolean' },
    onCtaClick:           { action: 'cta-click' },
    onFavoritesClick:     { action: 'favorites-click' },
    onProfileClick:       { action: 'profile-click' },
    onSubmenuLinkClick:   { action: 'submenu-link-click' },
    onNavItemClick:       { action: 'nav-item-click' },
  },
  args: {
    navItems,
    brandName: 'Sonic Automotive',
    ctaLabel: 'Join the Sonic Circuit',
    forceMobile: false,
  },
} satisfies Meta<typeof SonicNavBar>

export default meta
type Story = StoryObj<typeof meta>

// ───────────────────────────────────────────────────────────
// Helper: a tall placeholder body so the sticky bar has
// content to scroll past in the desktop stories.
// ───────────────────────────────────────────────────────────
const placeholderBody = `
  <div style="padding: 80px; min-height: 1200px; background: var(--color-neutral-95, #F4F5F7);">
    <h1 style="font: 700 32px/1.2 Roboto, sans-serif; color: #292B2E; margin: 0 0 16px;">Page content</h1>
    <p style="font: 400 16px/1.5 Roboto, sans-serif; color: #666B70; max-width: 640px;">
      Scroll to see the navigation bar stay sticky. Click a dropdown trigger above to open the mega-menu — it slots in below the bar with the brand-coloured top border.
    </p>
  </div>
`

// ───────────────────────────────────────────────────────────
// Stories
// ───────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default — desktop bar',
  render: (args) => ({
    components: { SonicNavBar },
    setup: () => ({ args, placeholderBody }),
    template: `
      <div>
        <SonicNavBar v-bind="args" />
        <div v-html="placeholderBody" />
      </div>
    `,
  }),
}

export const Variant2: Story = {
  name: 'Variant 2 — mobile bar',
  args: { forceMobile: true },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story:
          'Mobile bar collapsed. Logo on the left, favourites + profile + hamburger on the right. The `forceMobile` prop applies the mobile layout regardless of the Storybook canvas width so the frame matches the Figma 375 px artboard.',
      },
    },
  },
  render: (args) => ({
    components: { SonicNavBar },
    setup: () => ({ args }),
    template: `
      <div style="width: 375px; border: 1px dashed #D4D7D9;">
        <SonicNavBar v-bind="args" />
        <div style="height: 600px; background: var(--color-neutral-95, #F4F5F7);" />
      </div>
    `,
  }),
}

export const Variant3: Story = {
  name: 'Variant 3 — desktop mega-menu open',
  args: { favoritesSelected: false },
  render: (args) => ({
    components: { SonicNavBar },
    setup() {
      const barRef = ref<InstanceType<typeof SonicNavBar> | null>(null)
      onMounted(() => {
        // Simulate "Shop rides" being clicked on initial render so the
        // mega-menu is visible without user interaction.
        const trigger = document.querySelector<HTMLButtonElement>(
          '.snb__nav .nav-item:first-child',
        )
        trigger?.click()
      })
      return { args, placeholderBody, barRef }
    },
    template: `
      <div>
        <SonicNavBar ref="barRef" v-bind="args" />
        <div v-html="placeholderBody" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Desktop bar with the **Shop rides** dropdown active — the mega-menu panel sits flush below the bar with a brand-coloured top border (Sonic dark red `#D9320D`, EchoPark green when the brand toolbar is flipped). The `Shop rides` `NavItem` is in its bold-active state with the chevron rotated up.',
      },
    },
  },
}

export const Variant4: Story = {
  name: 'Variant 4 — mobile drawer parent list',
  args: { forceMobile: true },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story:
          'Mobile drawer open at the parent level — five `NavItemMobile` rows with chevrons, "Join the Sonic Circuit" CTA pinned to the bottom. Click any row with a dropdown to drill into its submenu (Variant 5).',
      },
    },
  },
  render: (args) => ({
    components: { SonicNavBar },
    setup() {
      onMounted(() => {
        const hamburger = document.querySelector<HTMLButtonElement>('.snb__hamburger')
        hamburger?.click()
      })
      return { args }
    },
    template: `
      <div style="width: 375px; height: 720px; border: 1px dashed #D4D7D9; position: relative; overflow: hidden;">
        <SonicNavBar v-bind="args" />
      </div>
    `,
  }),
}

export const Variant5: Story = {
  name: 'Variant 5 — mobile drilled submenu',
  args: { forceMobile: true },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story:
          'Mobile drawer drilled into "Shop rides" — back-arrow header on top, then each section ("Shop by ride", "Shop by type") rendered as a labelled block of `NavItemSubmenu` links separated by a `Divider`. Same drill-in/drill-out pattern as the SRP filter panel: tap back to return to the parent list.',
      },
    },
  },
  render: (args) => ({
    components: { SonicNavBar },
    setup() {
      onMounted(() => {
        // Open drawer, then drill into the first parent row.
        const hamburger = document.querySelector<HTMLButtonElement>('.snb__hamburger')
        hamburger?.click()
        requestAnimationFrame(() => {
          const firstParent = document.querySelector<HTMLButtonElement>(
            '.snb__drawer-row:first-child .nav-item-mobile',
          )
          firstParent?.click()
        })
      })
      return { args }
    },
    template: `
      <div style="width: 375px; height: 920px; border: 1px dashed #D4D7D9; position: relative; overflow: hidden;">
        <SonicNavBar v-bind="args" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  name: 'Interactive (click to explore)',
  render: (args) => ({
    components: { SonicNavBar },
    setup: () => ({ args, placeholderBody }),
    template: `
      <div>
        <SonicNavBar v-bind="args" />
        <div v-html="placeholderBody" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive instance: click a desktop dropdown to toggle its mega-menu, click outside or press `Escape` to dismiss. Resize the canvas below 1024 px to surface the mobile bar — tap the hamburger to open the drawer, tap a parent row to drill in, tap the back arrow to drill out.',
      },
    },
  },
}
