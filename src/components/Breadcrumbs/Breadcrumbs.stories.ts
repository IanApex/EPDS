import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Breadcrumbs from './Breadcrumbs.vue'
import type { BreadcrumbItem } from './Breadcrumbs.vue'

const basicItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Link', href: '/link' },
  { label: 'Link', href: '/link/sub' },
  { label: 'Link', href: '/link/sub/deep' },
  { label: 'Link Link' },
  { label: 'Link' },
]

const accountItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Account', href: '/account' },
  { label: 'Order History' },
]

const srpItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop Cars', href: '/shop' },
  { label: 'Used Cars' },
]

const deepItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Account', href: '/account' },
  { label: 'Link', href: '/link' },
  { label: 'Link', href: '/link/a' },
  { label: 'Link', href: '/link/b' },
  { label: 'Link Link', href: '/link/c' },
  { label: 'Link', href: '/link/d' },
  { label: 'Link', href: '/link/e' },
  { label: 'Link', href: '/link/f' },
  { label: 'Link', href: '/link/g' },
  { label: 'Link', href: '/link/h' },
  { label: 'Link', href: '/link/i' },
  { label: 'Link', href: '/link/j' },
  { label: 'Link', href: '/link/k' },
  { label: 'Link', href: '/link/l' },
  { label: 'Link', href: '/link/m' },
  { label: 'Link', href: '/link/n' },
  { label: 'Link' },
]

const meta = {
  title: 'Molecules/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Breadcrumb navigation bar used at the top of pages for wayfinding. ' +
          'Only previous pages are clickable (blue links); the current page is dark text. ' +
          'Optional phone number on the right (hidden on mobile).\n\n' +
          'Fixed height: 48px (16px top/bottom padding). ' +
          'Typography: Roboto Regular 12px, 0.2px letter-spacing. ' +
          'Link color: `--color-accent-30` (#004D80).',
      },
    },
  },
  argTypes: {
    items: { control: 'object' },
    phone: { control: 'text' },
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: basicItems,
  },
}

export const WithPhone: Story = {
  name: 'With Phone Number',
  args: {
    items: basicItems,
    phone: '(877) 708-4049',
  },
}

export const AccountBreadcrumb: Story = {
  name: 'Account Page',
  args: {
    items: accountItems,
  },
}

export const SRPWithPhone: Story = {
  name: 'SRP with Phone',
  args: {
    items: srpItems,
    phone: '(877) 708-4049',
  },
}

export const ManyItems: Story = {
  name: 'Many Items (wrapping)',
  args: {
    items: deepItems,
    phone: '(877) 708-4049',
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Breadcrumbs },
    setup() {
      return { basicItems, accountItems, srpItems, deepItems }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0;">
        <div style="border-bottom: 1px solid #E8E9EB;">
          <Breadcrumbs :items="basicItems" />
        </div>
        <div style="border-bottom: 1px solid #E8E9EB;">
          <Breadcrumbs :items="srpItems" phone="(877) 708-4049" />
        </div>
        <div style="border-bottom: 1px solid #E8E9EB;">
          <Breadcrumbs :items="accountItems" />
        </div>
        <div>
          <Breadcrumbs :items="deepItems" phone="(877) 708-4049" />
        </div>
      </div>
    `,
  }),
}
