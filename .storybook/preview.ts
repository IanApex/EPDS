import type { Preview } from '@storybook/vue3-vite'
import '../src/tokens/primitives/echopark.css'
import '../src/tokens/semantic.css'
import '../src/tokens/tokens.css'
import '../src/style.css'

const preview: Preview = {
  parameters: {
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
