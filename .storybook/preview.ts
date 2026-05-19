import type { Preview } from '@storybook/vue3-vite'
import '../src/epds.css'
import sonicCss from '../src/tokens/primitives/sonic.css?raw'
import wireframeCss from '../src/tokens/primitives/wireframe.css?raw'

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand theme',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'echopark',  title: 'EchoPark' },
          { value: 'sonic',     title: 'Sonic Automotive' },
          { value: 'wireframe', title: 'Wireframe' },
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

      /* ── Sonic primitives — injected globally on :root (existing pattern) ── */
      const sonicId = 'epds-brand-override'
      let sonicEl = document.getElementById(sonicId) as HTMLStyleElement | null
      if (brand === 'sonic') {
        if (!sonicEl) {
          sonicEl = document.createElement('style')
          sonicEl.id = sonicId
          document.head.appendChild(sonicEl)
        }
        sonicEl.textContent = sonicCss
      } else {
        sonicEl?.remove()
      }

      /* ── Wireframe theme — scoped to [data-theme="wireframe"] ─────────────
       * Rules are scoped so they only activate when `<html>` carries the
       * `data-theme="wireframe"` attribute (set below). The <style> sheet
       * is injected only when the theme is active so non-wireframe stories
       * carry zero overhead.
       *
       * Each Storybook story renders in its own preview iframe with its
       * own document, so flipping the attribute on `documentElement` is
       * already scoped to a single iframe — there is no cross-story
       * leakage to guard against. Mirrors the Sonic pattern above. */
      const wireframeId = 'epds-wireframe-theme'
      let wireframeEl = document.getElementById(wireframeId) as HTMLStyleElement | null
      if (brand === 'wireframe') {
        if (!wireframeEl) {
          wireframeEl = document.createElement('style')
          wireframeEl.id = wireframeId
          document.head.appendChild(wireframeEl)
        }
        wireframeEl.textContent = wireframeCss
      } else {
        wireframeEl?.remove()
      }

      /* Surface the active brand on the root element so components can
       * apply brand-specific *structural* overrides via CSS selectors
       * (e.g. `[data-brand="sonic"] .my-component`). Wireframe falls
       * back to EchoPark structure so layout overrides (button radius,
       * etc.) stay consistent — only colour and imagery change. */
      const structuralBrand = brand === 'wireframe' ? 'echopark' : brand
      document.documentElement.setAttribute('data-brand', structuralBrand)

      /* Activate the wireframe theme by tagging `<html>` so the
       * `[data-theme="wireframe"]` rules in wireframe.css take effect.
       * Removed when any other brand is selected so EchoPark / Sonic
       * render normally. */
      if (brand === 'wireframe') {
        document.documentElement.setAttribute('data-theme', 'wireframe')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }

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
