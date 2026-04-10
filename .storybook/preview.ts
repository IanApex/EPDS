import type { Preview } from '@storybook/vue3-vite'
import '../src/epds.css'

const preview: Preview = {
  parameters: {
    options: {
      /**
       * Sidebar: top-level groups sort in this order, then alphabetically by full title.
       * Storybook 10 requires this comparator to be written inline here (not a hoisted reference).
       * Change the `order` array to reorder Atoms / Molecules / Organisms / Components.
       */
      storySort: (a, b) => {
        const order = ['Atoms', 'Molecules', 'Organisms', 'Components']
        const root = (title) => (title.split('/')[0] ?? '')
        const rank = (title) => {
          const i = order.indexOf(root(title))
          return i === -1 ? order.length : i
        }
        const byRoot = rank(a.title) - rank(b.title)
        if (byRoot !== 0) return byRoot
        return a.title.localeCompare(b.title, undefined, { numeric: true })
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark',  value: '#242C33' },
        { name: 'neutral-95', value: '#F4F5F7' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    docs: {
      toc: true,
    },
  },
}

export default preview
