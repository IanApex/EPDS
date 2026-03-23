import type { StorybookConfig } from '@storybook/vue3-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    'storybook-addon-pseudo-states',
  ],
  framework: '@storybook/vue3-vite',
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      base: process.env.STORYBOOK_BASE || '/',
      resolve: {
        alias: {
          '@icons': path.resolve(dirname, '../icon'),
          '@logos': path.resolve(dirname, '../Logos'),
        },
      },
    });
  },
};
export default config;