import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'

import BrandPortfolio, { type BrandShowcaseEntry } from './BrandPortfolio.vue'
import BaseButton from '../BaseButton/BaseButton.vue'
import EchoParkLocationsGrid from '../BrandShowcaseCard/EchoParkLocationsGrid.vue'
import PowersportsLogoRow from '../BrandShowcaseCard/PowersportsLogoRow.vue'
import SonicOemGrid from '../BrandShowcaseCard/SonicOemGrid.vue'
import './BrandPortfolio.stories.css'

/* ─── Brand seed assets ────────────────────────────────────
 * Photos + logos for the 4 Sonic Group sub-brands shown in
 * the Figma "Brand Portfolio" frame. Each brand brings its
 * own dark photo, white knockout logo (collapsed state), and
 * full-colour logo (expanded state). The Powersports brand
 * does not yet ship a colour SVG, so we feed it the white
 * knockout for both lights — the white scrim of the selected
 * state still reads correctly because the logo is already
 * a saturated red mark. */
import sonicBgUrl       from '../../../Photos/Sonic Automotive/bwsonic.png'
import echoparkBgUrl    from '../../../Photos/Sonic Automotive/bwechopark.png'
import tacticalBgUrl    from '../../../Photos/Sonic Automotive/bwtacticalfleet.png'
import powersportsBgUrl from '../../../Photos/Sonic Automotive/bwtmp.png'

/* `Color=SA-White.svg` is the dedicated all-white Sonic
 * Automotive knockout (created alongside `Color=SA-FullColor`).
 * `Color=White.svg` is the all-white EchoPark knockout — the
 * Logos/ folder uses brand-agnostic `Color=*` filenames for
 * EP, so SA's white variant is namespaced with the `SA-`
 * prefix to disambiguate. Picking the wrong file silently
 * swaps brand identities between cards. */
import saLogoWhiteUrl from '@logos/Color=SA-White.svg?url'
import saLogoColorUrl from '@logos/Color=SA-FullColor.svg?url'
import epLogoWhiteUrl from '@logos/Color=White.svg?url'
import epLogoColorUrl from '@logos/Color=Default.svg?url'
import tfLogoWhiteUrl from '@logos/TacticalFleet.svg?url'
import tfLogoColorUrl from '@logos/TacticalFleet-color.svg?url'
import psLogoWhiteUrl from '@logos/Powersports_logo_knockout_F2 1.svg?url'
import psLogoColorUrl from '@logos/Brand Logo=Sonic Powersports, Type=Color.svg?url'

/* Tactical Fleet's brand colour is a deep luxury blue that
 * the Figma uses for both its hover scrim and (subtly) its
 * description text accents. EchoPark's hover uses brand
 * green; Powersports leans on the same Sonic red as the
 * default. */
const ECHOPARK_HOVER  = 'rgba(63, 137, 0, 0.7)'
const TACTICAL_HOVER  = 'rgba(36, 56, 95, 0.7)'

const brands: BrandShowcaseEntry[] = [
  {
    key: 'sonic',
    name: 'Sonic Automotive',
    imageUrl: sonicBgUrl,
    tagline: 'New & certified pre-owned cars',
    logoLight: saLogoWhiteUrl,
    logoColor: saLogoColorUrl,
    description:
      'With over 100 dealerships & 16 service centers across the nation, ' +
      'we offer new and certified pre-owned cars from these brands:',
    ctaLabel: 'Shop new & certified cars',
  },
  {
    key: 'echopark',
    name: 'EchoPark',
    imageUrl: echoparkBgUrl,
    tagline: 'Quality used cars at unbeatable prices',
    logoLight: epLogoWhiteUrl,
    logoLightHeight: 56,
    logoColor: epLogoColorUrl,
    logoColorHeight: 51,
    description:
      'Premium nearly-new used cars at unbeatable prices, ' +
      'available across 16 EchoPark locations:',
    hoverScrimColor: ECHOPARK_HOVER,
    /* `ctaLabel: undefined` — EchoPark uses the organism's
     * `#cta-echopark` slot to render a primary + secondary
     * CTA pair. Setting `ctaLabel` to `undefined` suppresses
     * the molecule's default single-button render. */
    ctaLabel: undefined,
  },
  {
    key: 'tactical',
    name: 'Tactical Fleet',
    imageUrl: tacticalBgUrl,
    tagline: 'Luxury & exotic vehicles',
    logoLight: tfLogoWhiteUrl,
    logoLightHeight: 60,
    logoColor: tfLogoColorUrl,
    logoColorHeight: 60,
    description:
      'Our luxury exotic segment operates two premium locations ' +
      'in Dallas and Charlotte. Tactical Fleet specializes in ' +
      'curating exceptional exotic and luxury vehicles with ' +
      'transparent pricing and unparalleled expertise. Since 2018,' +
      'we\'ve redefined the high-performance car buying ' +
      'experience for collectors and enthusiasts nationwide.',
    hoverScrimColor: TACTICAL_HOVER,
    ctaLabel: 'Shop luxury exotics',
  },
  {
    key: 'powersports',
    name: 'Sonic Powersports',
    imageUrl: powersportsBgUrl,
    tagline: 'Motorcycles, ATVs & watercraft',
    logoLight: psLogoWhiteUrl,
    logoLightHeight: 80,
    logoColor: psLogoColorUrl,
    logoColorHeight: 70,
    description:
      'From the daily commute to the weekend escape — ' +
      'motorcycles, UTVs, ATVs, and watercraft from these ' +
      'Sonic Powersports dealerships:',
    ctaLabel: 'Shop powersports',
  },
]

const meta = {
  title: 'Organisms/BrandPortfolio',
  component: BrandPortfolio,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sonic Group brand-portfolio organism. Composes 4 ' +
          '`BrandShowcaseCard` molecules with **exactly-one** ' +
          'selection state — clicking any collapsed card ' +
          'animates the row so the new card grows to 384 px ' +
          'while the other three flex equally to fill the ' +
          'remaining width. The expanded card surfaces brand-' +
          'specific content (OEM logo grid for Sonic, city ' +
          'list for EchoPark, description-only for Tactical ' +
          'Fleet, dealership-logo row for Powersports) via ' +
          'per-brand named slots (`#content-<key>`). EchoPark ' +
          'also overrides the CTA via `#cta-<key>` to render ' +
          "a primary + secondary pair. The molecule's " +
          'collapsed-state hover scrim swap is preserved.',
      },
    },
  },
  args: { brands },
  argTypes: {
    brands: { control: false },
    modelValue: { control: false },
  },
} satisfies Meta<typeof BrandPortfolio>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default — all four cards collapsed (no selection). Matches
 * the Figma "all default" frame at the top of the brand-
 * portfolio selection.
 */
export const Default: Story = {
  args: { modelValue: null, selectFirstByDefault: false },
  render: (args) => ({
    components: { BrandPortfolio },
    setup: () => ({ args }),
    template: `
      <div class="bp-stories__frame">
        <p class="bp-stories__label">All cards collapsed</p>
        <BrandPortfolio v-bind="args" />
      </div>
    `,
  }),
}

/**
 * Sonic Automotive selected — 4×6 OEM logo grid, single
 * primary CTA. Matches Figma frame "Sonic selected".
 */
export const SonicSelected: Story = {
  args: { modelValue: 'sonic' },
  render: (args) => ({
    components: { BrandPortfolio, SonicOemGrid },
    setup: () => ({ args }),
    template: `
      <div class="bp-stories__frame">
        <p class="bp-stories__label">Sonic Automotive expanded</p>
        <BrandPortfolio v-bind="args">
          <template #content-sonic>
            <SonicOemGrid />
          </template>
        </BrandPortfolio>
      </div>
    `,
  }),
}

/**
 * EchoPark selected — 3-column city list + primary
 * "Shop used cars" + secondary "Find a location" CTA pair.
 * Demonstrates the per-brand `#cta-<key>` slot.
 */
export const EchoParkSelected: Story = {
  args: { modelValue: 'echopark' },
  render: (args) => ({
    components: { BrandPortfolio, EchoParkLocationsGrid, BaseButton },
    setup: () => ({ args }),
    template: `
      <div class="bp-stories__frame">
        <p class="bp-stories__label">EchoPark expanded</p>
        <BrandPortfolio v-bind="args" data-brand="echopark">
          <template #content-echopark>
            <EchoParkLocationsGrid />
          </template>
          <template #cta-echopark="{ onCtaClick }">
            <BaseButton
              variant="primary"
              size="sm"
              label="Shop used cars"
              @click="onCtaClick"
            />
            <BaseButton
              variant="secondary"
              size="sm"
              label="Find a location"
              @click="onCtaClick"
            />
          </template>
        </BrandPortfolio>
      </div>
    `,
  }),
}

/**
 * Tactical Fleet selected — description-only body (no slot
 * content), single primary CTA. Validates the molecule's
 * empty-slot behaviour: the description fills the available
 * space and the CTA stays bottom-pinned.
 */
export const TacticalFleetSelected: Story = {
  args: { modelValue: 'tactical' },
  render: (args) => ({
    components: { BrandPortfolio },
    setup: () => ({ args }),
    template: `
      <div class="bp-stories__frame">
        <p class="bp-stories__label">Tactical Fleet expanded</p>
        <BrandPortfolio v-bind="args" />
      </div>
    `,
  }),
}

/**
 * Powersports selected — 3 dealership logos in a row,
 * single primary CTA.
 */
export const PowersportsSelected: Story = {
  args: { modelValue: 'powersports' },
  render: (args) => ({
    components: { BrandPortfolio, PowersportsLogoRow },
    setup: () => ({ args }),
    template: `
      <div class="bp-stories__frame">
        <p class="bp-stories__label">Powersports expanded</p>
        <BrandPortfolio v-bind="args">
          <template #content-powersports>
            <PowersportsLogoRow />
          </template>
        </BrandPortfolio>
      </div>
    `,
  }),
}

/**
 * Interactive — fully wired sandbox. Clicking any collapsed
 * card animates the row's reflow. The `null` initial state
 * mirrors the "Default" story so reviewers can see the
 * smooth transition into the first selection.
 */
export const Interactive: Story = {
  args: { modelValue: null, selectFirstByDefault: false },
  render: (args) => ({
    components: {
      BrandPortfolio,
      SonicOemGrid,
      EchoParkLocationsGrid,
      PowersportsLogoRow,
      BaseButton,
    },
    setup() {
      const selected = ref<string | null>(null)
      function onCtaClick(payload: { key: string; event: MouseEvent }) {
        payload.event.preventDefault()
        // eslint-disable-next-line no-console
        console.log('[Story] CTA clicked:', payload.key)
      }
      return { args, selected, onCtaClick }
    },
    template: `
      <div class="bp-stories__frame">
        <p class="bp-stories__label">
          Click any card — the selected card grows to 384 px and
          the other three reflow to fill the remaining row.
        </p>
        <BrandPortfolio
          v-bind="args"
          v-model="selected"
          @cta-click="onCtaClick"
        >
          <template #content-sonic>
            <SonicOemGrid />
          </template>
          <template #content-echopark>
            <EchoParkLocationsGrid />
          </template>
          <template #cta-echopark="{ onCtaClick: localOnCta }">
            <BaseButton
              variant="primary"
              size="sm"
              label="Shop used cars"
              @click="localOnCta"
            />
            <BaseButton
              variant="secondary"
              size="sm"
              label="Find a location"
              @click="localOnCta"
            />
          </template>
          <template #content-powersports>
            <PowersportsLogoRow />
          </template>
        </BrandPortfolio>
      </div>
    `,
  }),
}
