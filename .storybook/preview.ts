import type { Preview } from '@storybook/vue3-vite'
import '../src/epds.css'
import sonicCss from '../src/tokens/primitives/sonic.css?raw'

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand theme',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'echopark', title: 'EchoPark' },
          { value: 'sonic', title: 'Sonic Automotive' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: 'echopark',
  },
  decorators: [
    (story, context) => {
      const brand = context.globals.brand || 'echopark'
      const id = 'epds-brand-override'
      let el = document.getElementById(id) as HTMLStyleElement | null

      if (brand === 'sonic') {
        if (!el) {
          el = document.createElement('style')
          el.id = id
          document.head.appendChild(el)
        }
        el.textContent = sonicCss
      } else {
        el?.remove()
      }

      /* Surface the active brand on the root element so components can
       * apply brand-specific *structural* overrides via CSS selectors
       * (e.g. `[data-brand="sonic"] .my-component`). Token-only brand
       * differences still flow through sonic.css above — this hook is
       * only for shape / layout changes that can't be expressed as
       * custom-property swaps. */
      document.documentElement.setAttribute('data-brand', brand)

      return story()
    },
  ],
  parameters: {
    options: {
      /**
       * Sidebar: top-level groups sort in this order, then alphabetically by full title.
       * Storybook 10 requires this comparator to be written inline here (not a hoisted reference).
       * Change the `order` array to reorder Atoms / Molecules / Organisms / Components.
       */
      storySort: (a, b) => {
        const order = ['Atoms', 'Molecules', 'Organisms', 'Components', 'Pages']
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
