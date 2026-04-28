import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import BrandShowcaseCard from './BrandShowcaseCard.vue'
import SonicOemGrid from './SonicOemGrid.vue'
import './BrandShowcaseCard.stories.css'

/* ─── Sonic Automotive seed assets ────────────────────────
 * The molecule is brand-agnostic, but the Figma frame is
 * Sonic Automotive — these stories reuse the same photo,
 * white knockout logo, full-colour logo, and body copy that
 * the Figma design pitches the card with. The 23-OEM grid
 * lives in the colocated `SonicOemGrid` helper component
 * so its layout + per-mark dimensions are real scoped CSS
 * rather than inline styles. */
import sonicBgUrl     from '../../../Photos/Sonic Automotive/bwsonic.png'
import saLogoWhiteUrl from '@logos/Color=SA-White.svg?url'
import saLogoColorUrl from '@logos/Color=SA-FullColor.svg?url'

const sonicArgs = {
  name: 'Sonic Automotive',
  imageUrl: sonicBgUrl,
  tagline: 'New & certified pre-owned cars',
  logoLight: saLogoWhiteUrl,
  logoColor: saLogoColorUrl,
  description:
    'With over 100 dealerships & 16 service centers across the nation, ' +
    'we offer new and certified pre-owned cars from these brands:',
  ctaLabel: 'Shop new & certified cars',
} as const

const meta = {
  title: 'Molecules/BrandShowcaseCard',
  component: BrandShowcaseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Selectable brand-portfolio card with three states: ' +
          '`default` (dark photo + white logo), `hover` (brand-coloured ' +
          'scrim), and `selected` (white scrim + colour logo + brand ' +
          'content + primary CTA). Designed for the Sonic Group ' +
          'brand-portfolio organism — the parent owns "exactly-one ' +
          'selected" group logic. Every visual detail is prop-driven ' +
          'so the same molecule renders Sonic Automotive, EchoPark, ' +
          'Tactical Fleet, Powersports, etc. without overrides. Pass ' +
          'brand-specific expanded-state content (OEM logo grid, stat ' +
          'blocks, …) via the `#selected-content` slot. The CTA is a ' +
          '`BaseButton size="sm" variant="primary"` so it inherits the ' +
          "host page's brand colour automatically.",
      },
    },
  },
  args: { ...sonicArgs, selected: false },
  argTypes: {
    imageUrl: { control: false },
    logoLight: { control: false },
    logoColor: { control: false },
    selected: { control: 'boolean' },
  },
} satisfies Meta<typeof BrandShowcaseCard>

export default meta
type Story = StoryObj<typeof meta>

/** Default state — dark navy scrim, white logo + tagline. */
export const Default: Story = {}

/**
 * Hover state — Sonic-red scrim. Triggered via the
 * `pseudo-states` addon so the card renders with `:hover`
 * applied permanently for visual reference.
 */
export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
}

/**
 * Selected state — white scrim, colour logo, body copy, the
 * Sonic 23-OEM grid (rendered through `SonicOemGrid` in the
 * `#selected-content` slot), and the primary CTA.
 */
export const Selected: Story = {
  args: { selected: true },
  render: (args) => ({
    components: { BrandShowcaseCard, SonicOemGrid },
    setup: () => ({ args }),
    template: `
      <BrandShowcaseCard v-bind="args">
        <template #selected-content>
          <SonicOemGrid />
        </template>
      </BrandShowcaseCard>
    `,
  }),
}

/**
 * Side-by-side preview of all three states using the same
 * Sonic Automotive seed data. Useful for QA / Figma parity
 * sweeps in a single Storybook frame. The middle card is
 * pinned to its hover scrim via the `.bsc--collapsed.hovered`
 * pseudo-state hook so the preview reads correctly without
 * forcing the reviewer to mouse over the card.
 */
export const AllStates: Story = {
  render: (args) => ({
    components: { BrandShowcaseCard, SonicOemGrid },
    setup: () => ({ args }),
    template: `
      <div class="bsc-stories__row">
        <div class="bsc-stories__cell">
          <p class="bsc-stories__label">Default</p>
          <BrandShowcaseCard v-bind="args" :selected="false" />
        </div>

        <div class="bsc-stories__cell">
          <p class="bsc-stories__label">Hover</p>
          <BrandShowcaseCard v-bind="args" :selected="false" class="bsc-stories__hovered" />
        </div>

        <div class="bsc-stories__cell">
          <p class="bsc-stories__label">Selected</p>
          <BrandShowcaseCard v-bind="args" :selected="true">
            <template #selected-content>
              <SonicOemGrid />
            </template>
          </BrandShowcaseCard>
        </div>
      </div>
    `,
  }),
}

/**
 * Interactive: click the card to expand it; click another
 * card (or the same card after a parent reset) to collapse.
 * In production the parent organism owns "exactly-one"
 * selection logic — this story stubs that with two cards
 * and a local active-id ref.
 */
export const Interactive: Story = {
  render: () => ({
    components: { BrandShowcaseCard, SonicOemGrid },
    setup() {
      /* `active` holds the currently expanded card's id, or null
       * when nothing is selected. The molecule only emits
       * `update:selected: true` (never false), so the parent owns
       * the "switch / collapse" decisions: clicking a different
       * card moves the selection; clicking the same card while it
       * is already selected is a no-op (matches production UX). */
      const active = ref<string | null>('sonic')
      function select(id: string) {
        active.value = id
      }
      return { sonic: sonicArgs, active, select }
    },
    template: `
      <div class="bsc-stories__row">
        <BrandShowcaseCard
          v-bind="sonic"
          :selected="active === 'sonic'"
          @update:selected="select('sonic')"
          @cta-click="(e) => { e.preventDefault(); console.log('[Story] CTA clicked: Sonic') }"
        >
          <template #selected-content>
            <SonicOemGrid />
          </template>
        </BrandShowcaseCard>

        <BrandShowcaseCard
          v-bind="sonic"
          name="Sonic Automotive — clone"
          :selected="active === 'sonic-2'"
          @update:selected="select('sonic-2')"
        >
          <template #selected-content>
            <SonicOemGrid />
          </template>
        </BrandShowcaseCard>
      </div>
    `,
  }),
}
