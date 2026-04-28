import type { NavBarItem } from '@/components/SonicNavBar/SonicNavBar.vue'

/**
 * Shared Sonic Automotive primary-nav structure used by every page-level
 * composition (`SrpPage`, `VdpPage`, ...). Centralised so a future copy
 * change in Figma only needs a single edit to flow across both pages.
 *
 * Mirrors the seed data exercised in `SonicNavBar.stories.ts` so the
 * Storybook page stories and the live page demos stay in lock-step.
 */
export const sonicNavItems: NavBarItem[] = [
  {
    key: 'shop',
    label: 'Shop rides',
    dropdown: [
      {
        heading: 'Shop by ride',
        links: [
          { label: 'New cars',                 href: '#' },
          { label: 'Certified pre-owned cars', href: '#' },
          { label: 'Used cars',                href: '#' },
          { label: 'Powersports',              href: '#' },
          { label: 'Luxury & exotics',         href: '#' },
        ],
      },
      {
        heading: 'Shop by type',
        links: [
          { label: 'Sedans',                href: '#' },
          { label: 'Trucks',                href: '#' },
          { label: 'SUVs & crossovers',     href: '#' },
          { label: 'Coupes & convertibles', href: '#' },
          { label: 'EVs & hybrids',         href: '#' },
          { label: 'ATVs',                  href: '#' },
          { label: 'UTVs',                  href: '#' },
          { label: 'Motorcycles',           href: '#' },
          { label: 'Watercraft',            href: '#' },
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
          { label: 'OEM parts',   href: '#' },
          { label: 'Accessories', href: '#' },
          { label: 'Apparel',     href: '#' },
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
          { label: 'Who we are', href: '#' },
          { label: 'Newsroom',   href: '#' },
          { label: 'Investors',  href: '#' },
          { label: 'Careers',    href: '#' },
        ],
      },
    ],
  },
]
