<script setup lang="ts">
import { computed } from 'vue'

import GlobalFooter from '@/components/GlobalFooter/GlobalFooter.vue'
import type { FooterLinkColumn, SocialLink, LegalLink } from '@/components/GlobalFooter/GlobalFooter.vue'
import SonicNavBar from '@/components/SonicNavBar/SonicNavBar.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import ShopByCategories from '@/components/ShopByCategories/ShopByCategories.vue'
import type { ShopByCategory } from '@/components/ShopByCategories/ShopByCategories.vue'
import SonicCircuit from '@/components/SonicCircuit/SonicCircuit.vue'
import type { SonicCircuitBenefitItem } from '@/components/SonicCircuit/SonicCircuit.vue'
import StackingCardSection from '@/components/StackingCardSection/StackingCardSection.vue'
import type { StackingCardEntry } from '@/components/StackingCardSection/StackingCardSection.vue'
import BrandPortfolio from '@/components/BrandPortfolio/BrandPortfolio.vue'
import type { BrandShowcaseEntry } from '@/components/BrandPortfolio/BrandPortfolio.vue'
import SonicOemGrid from '@/components/BrandShowcaseCard/SonicOemGrid.vue'
import EchoParkLocationsGrid from '@/components/BrandShowcaseCard/EchoParkLocationsGrid.vue'
import PowersportsLogoRow from '@/components/BrandShowcaseCard/PowersportsLogoRow.vue'
import { sonicNavItems } from '@/pages/sonicNavItems'

import saLogoDefaultUrl from '@logos/Color=SA-FullColor.svg?url'

/* ─── Brand portfolio assets ───────────────────────────────
 * Each sub-brand brings a dark photo (collapsed background),
 * a white knockout logo (collapsed state), and a full-colour
 * logo (expanded state). EchoPark expanded uses `Color=Default.svg`
 * (51 px tall per spec). Sonic Powersports expanded uses the
 * full-colour mark `Brand Logo=Sonic Powersports, Type=Color.svg`. */
import sonicBgUrl       from '../../Photos/Sonic Automotive/bwsonic.png'
import echoparkBgUrl    from '../../Photos/Sonic Automotive/bwechopark.png'
import tacticalBgUrl    from '../../Photos/Sonic Automotive/bwtacticalfleet.png'
import powersportsBgUrl from '../../Photos/Sonic Automotive/bwtmp.png'

/* Sonic Automotive: dedicated all-white knockout SVG (created
 * to match `Color=SA-FullColor.svg`'s geometry but with white
 * fills for collapsed-state cards on dark backgrounds).
 * EchoPark: `Color=White.svg` is the all-white EP logo (the
 * Logos/ folder uses brand-agnostic `Color=*` filenames for
 * EP, so the SA white logo is namespaced as `Color=SA-White.svg`). */
import saLogoWhiteUrl from '@logos/Color=SA-White.svg?url'
import saLogoColorUrl from '@logos/Color=SA-FullColor.svg?url'
import epLogoWhiteUrl from '@logos/Color=White.svg?url'
import epLogoColorUrl from '@logos/Color=Default.svg?url'
import tfLogoWhiteUrl from '@logos/TacticalFleet.svg?url'
import tfLogoColorUrl from '@logos/TacticalFleet-color.svg?url'
import psLogoWhiteUrl from '@logos/Powersports_logo_knockout_F2 1.svg?url'
import psLogoColorUrl from '@logos/Brand Logo=Sonic Powersports, Type=Color.svg?url'

import heroDesktopUrl from '../../Photos/Sonic Automotive/saherodt.jpg'
import heroMobileUrl  from '../../Photos/Sonic Automotive/saheromb.jpg'

/* ─── Sonic Circuit icons ──────────────────────────────────
 * Raw SVGs — every fill is rewritten to `currentColor` by the
 * `SonicCircuitBenefit` atom, so the same icons tint white inside
 * the section's translucent disks. */
import circuitMapPinSvg   from '../../icon/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'
import circuitCoinSvg     from '../../icon/Style=Finance, Detail=Payment, Icon=Coin.svg?raw'
import circuitSteeringSvg from '../../icon/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Steering.svg?raw'
import circuitMedalSvg    from '../../icon/Icon Type=Vehicle Descriptors, Size=Small, Theme=Medal.svg?raw'
import priceTagIconSvg    from '../../icon/Style=Finance, Detail=Payment, Icon=Price-Tag.svg?raw'
import engineIconSvg      from '../../icon/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Engine.svg?raw'

/* ─── ShopByCategories imagery ─────────────────────────────
 * Real photos from `Photos/`, mapped to each tab's tile set.
 * Reused across tabs where a single image fits multiple cohorts. */
import commutersImg from '../../Photos/Sonic Automotive/person walk.png'
import safetyImg from '../../Photos/Sonic Automotive/buckle kid.png'
import lowMaintImg from '../../Photos/Sonic Automotive/Sun chick.png'
import budgetImg from '../../Photos/Sonic Automotive/paper people.png'
import reliableImg from '../../Photos/Sonic Automotive/yellow car.png'

import familyImg from '../../Photos/People/Group 248.png'
import cargoImg from '../../Photos/Car only/image 2.png'
import adventureImg from '../../Photos/People/shutterstock_1410313490.png'
import suvImg from '../../Photos/VDP cars/image 16.png'

import sedanImg from '../../Photos/VDP cars/cfa99e19968d4f81aa521218dbaf67c2 1.png'
import coupeImg from '../../Photos/VDP cars/52a8fde74d96462597f12bb544d62cf5 1.png'
import convertibleImg from '../../Photos/People/Hero image.png'
import luxRearImg from '../../Photos/Car only/shutterstock_1574869534.png'

import nascarPackImg from '../../Photos/Nascar promo/GettyImages-1432054667.png'
import nascarCamaroImg from '../../Photos/Nascar promo/GettyImages-1432017440.png'
import speedwayImg from '../../Photos/Nascar promo/GettyImages-1494366714.png'

/**
 * Sonic Automotive Homepage — page-level composition (Storybook only).
 *
 * Sections drop in one at a time. Each section manages its **own**
 * internal max-width / gutter (no page-level content rail), so marketing
 * bands can go full-bleed when they want and constrained when they don't.
 */
const props = withDefaults(
  defineProps<{
    brandName?: string
    phoneNumber?: string
  }>(),
  { brandName: 'Sonic Automotive', phoneNumber: '(877) 708-4049' },
)

const isSonic = computed(() => props.brandName.toLowerCase().includes('sonic'))

/* ─── Footer brand config ────────────────────────────────
 * Mirrors the white-label pattern used by SrpPage / VdpPage. */
const footerLogoUrl = computed(() => (isSonic.value ? saLogoDefaultUrl : undefined))

const footerLinkColumns = computed<FooterLinkColumn[] | undefined>(() =>
  isSonic.value
    ? [
        {
          heading: 'Shop',
          links: [
            { label: 'New vehicles',    href: '#' },
            { label: 'Used vehicles',   href: '#' },
            { label: 'Sell your car',   href: '#' },
            { label: 'Finance',         href: '#' },
            { label: 'Service & parts', href: '#' },
            { label: 'Special offers',  href: '#' },
          ],
        },
        {
          heading: 'About',
          links: [
            { label: 'Find a dealership',      href: '#' },
            { label: 'About Sonic Automotive', href: '#' },
            { label: 'Reviews',                href: '#' },
            { label: 'Careers',                href: '#' },
            { label: 'Investor relations',     href: '#' },
          ],
        },
        {
          heading: 'Support',
          links: [
            { label: 'Help center',     href: '#' },
            { label: 'Contact us',      href: '#' },
            { label: 'Accessibility',   href: '#' },
            { label: 'Manage cookies',  href: '#' },
            { label: 'Sitemap',         href: '#' },
          ],
        },
      ]
    : undefined,
)

const footerSocialLinks = computed<SocialLink[] | undefined>(() =>
  isSonic.value
    ? [
        { platform: 'facebook',  href: 'https://facebook.com/sonicautomotive',  ariaLabel: 'Facebook' },
        { platform: 'x',         href: 'https://x.com/sonicautomotive',         ariaLabel: 'X' },
        { platform: 'youtube',   href: 'https://youtube.com/sonicautomotive',   ariaLabel: 'YouTube' },
        { platform: 'instagram', href: 'https://instagram.com/sonicautomotive', ariaLabel: 'Instagram' },
      ]
    : undefined,
)

const footerLegalLinks = computed<LegalLink[] | undefined>(() =>
  isSonic.value
    ? [
        { label: 'Privacy policy', href: '#' },
        { label: 'Terms of use',   href: '#' },
      ]
    : undefined,
)

const footerTrustBadges = computed(() => (isSonic.value ? [] : undefined))

const footerCopyrightText = computed(() =>
  isSonic.value
    ? `Copyright \u00A9 2026 Sonic Automotive, Inc. All Rights Reserved.`
    : undefined,
)

/* ─── Hero handlers (stubbed) ────────────────────────── */
function onShopAllRides() {
  console.log('[HomePage] hero CTA: Shop all rides')
}
function onFindALocation() {
  console.log('[HomePage] hero CTA: Find a location')
}
function onJoinCircuit() {
  console.log('[HomePage] Sonic Circuit CTA: Join the Circuit')
}

function onOwnershipCtaClick(payload: { index: number; event: MouseEvent }) {
  payload.event.preventDefault()
  console.log('[HomePage] Ownership card CTA:', payload.index)
}

/* ─── Car ownership stacking cards ─────────────────────────
 * Drive / Sell / Service cards reuse icons + photos already
 * imported for the circuit section and hero respectively. */
const ownershipCards: StackingCardEntry[] = [
  {
    imageUrl: reliableImg,
    iconSvg: circuitSteeringSvg,
    heading: 'Drive',
    body:
      'Shop thousands of new and pre-owned vehicles from the comfort ' +
      'of your home or visit one of our conveniently located dealerships nationwide.',
    ctaLabel: 'Shop vehicles',
    imagePosition: 'left',
    imageProportion: 'large',
  },
  {
    imageUrl: heroMobileUrl,
    iconSvg: priceTagIconSvg,
    heading: 'Sell',
    body:
      'Get a competitive offer for your current vehicle in minutes. ' +
      'Trade it in or sell it outright — the choice is yours.',
    ctaLabel: 'Get an offer',
    imagePosition: 'right',
    imageProportion: 'large',
  },
  {
    imageUrl: heroDesktopUrl,
    iconSvg: engineIconSvg,
    heading: 'Service',
    body:
      'From routine maintenance to collision repair, our service and ' +
      'parts centers are spread across the country to help you whenever you need us.',
    ctaLabel: 'Find service & parts centers',
    imagePosition: 'left',
    imageProportion: 'large',
  },
]

/* ─── Brand portfolio CTA handler ───────────────────────────
 * BrandPortfolio emits a single `cta-click` carrying the brand
 * key + native event. Production wires this to the appropriate
 * destination per brand; here we just log for the page demo. */
function onBrandCtaClick(payload: { key: string; event: MouseEvent }) {
  payload.event.preventDefault()
  console.log('[HomePage] Brand portfolio CTA:', payload.key)
}

/* ─── Sonic Circuit benefits (Figma node 7680:16688) ───────
 * Four membership benefits rendered inside the dark navy section
 * directly below "A ride for every moment". The captions match the
 * Figma copy verbatim; iconography reuses existing system icons
 * (map-pin, coin, steering, medal) tinted white via currentColor. */
const sonicCircuitBenefits: SonicCircuitBenefitItem[] = [
  {
    id: 'earn',
    iconSvg: circuitMapPinSvg,
    caption: 'Earn points on every purchase, trade, and service across the nation',
  },
  {
    id: 'redeem',
    iconSvg: circuitCoinSvg,
    caption: 'Redeem points for free or discounted service visits, merch, or speedway tickets',
  },
  {
    id: 'next-ride',
    iconSvg: circuitSteeringSvg,
    caption: 'Use your points toward your next ride at any Sonic store',
  },
  {
    id: 'priority',
    iconSvg: circuitMedalSvg,
    caption: 'Service & purchase priority for quicker visits',
  },
]

/* ─── Shop-by-categories seed data ─────────────────────────
 * Each category renders its own set of tiles when its tab is
 * active. Hrefs are placeholders; in production these will
 * point at brand-specific custom SRPs (faceted / pre-filtered). */
const shopCategories: ShopByCategory[] = [
  {
    id: 'starting-out',
    label: 'Starting out',
    tiles: [
      { label: 'Commuters',           imageUrl: commutersImg, href: '#srp-commuters' },
      { label: 'High safety ratings', imageUrl: safetyImg,    href: '#srp-safety' },
      { label: 'Low maintenance',     imageUrl: lowMaintImg,  href: '#srp-low-maintenance' },
      { label: 'Budget-friendly',     imageUrl: budgetImg,    href: '#srp-budget' },
      { label: 'Reliable brands',     imageUrl: reliableImg,  href: '#srp-reliable' },
    ],
  },
  {
    id: 'room-to-grow',
    label: 'Room to grow',
    tiles: [
      { label: 'Family SUVs',         imageUrl: familyImg,    href: '#srp-family-suv' },
      { label: 'Three-row seating',   imageUrl: cargoImg,     href: '#srp-three-row' },
      { label: 'Weekend adventures',  imageUrl: adventureImg, href: '#srp-adventure' },
      { label: 'Top safety picks',    imageUrl: suvImg,       href: '#srp-top-safety' },
      { label: 'Hybrid & EV',         imageUrl: safetyImg,    href: '#srp-hybrid-ev' },
    ],
  },
  {
    id: 'luxury-rides',
    label: 'Luxury rides',
    tiles: [
      { label: 'Executive sedans',    imageUrl: sedanImg,       href: '#srp-executive-sedan' },
      { label: 'Performance coupes',  imageUrl: coupeImg,       href: '#srp-performance-coupe' },
      { label: 'Premium SUVs',        imageUrl: suvImg,         href: '#srp-premium-suv' },
      { label: 'Convertibles',        imageUrl: convertibleImg, href: '#srp-convertibles' },
      { label: 'Certified pre-owned', imageUrl: luxRearImg,     href: '#srp-cpo-luxury' },
    ],
  },
  {
    id: 'thrill-seeking-toys',
    label: 'Thrill-seeking toys',
    tiles: [
      { label: 'Sports cars',             imageUrl: coupeImg,        href: '#srp-sports-car' },
      { label: 'Track-ready performance', imageUrl: nascarPackImg,   href: '#srp-track-ready' },
      { label: 'Iconic muscle',           imageUrl: nascarCamaroImg, href: '#srp-muscle' },
      { label: 'Convertibles',            imageUrl: convertibleImg,  href: '#srp-thrill-convertibles' },
      { label: 'Speedway thrills',        imageUrl: speedwayImg,     href: '#srp-speedway' },
    ],
  },
]

/* ─── Brand portfolio seed (Figma node 7682:20293) ──────────
 * "Meet the Sonic brand" section. Order, taglines, and asset
 * choices match the Figma "Brand Portfolio / homepage" frame
 * exactly: Sonic → EchoPark → Powersports → Tactical Fleet.
 * Selected-state copy + CTA labels reuse the marketing strings
 * established in `BrandPortfolio.stories.ts` so a sub-brand
 * card renders identically on the page and in Storybook. */
const ECHOPARK_HOVER_SCRIM = 'rgba(63, 137, 0, 0.7)'
const TACTICAL_HOVER_SCRIM = 'rgba(36, 56, 95, 0.7)'

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
    tagline: 'Used cars',
    logoLight: epLogoWhiteUrl,
    logoLightHeight: 56,
    logoColor: epLogoColorUrl,
    logoColorHeight: 51,
    description:
      'Premium nearly-new used cars at unbeatable prices, ' +
      'available across 16 EchoPark locations:',
    hoverScrimColor: ECHOPARK_HOVER_SCRIM,
    /* `ctaLabel: undefined` suppresses the molecule's default
     * single-button render so the `#cta-echopark` slot below
     * can supply EchoPark's primary + secondary pair. */
    ctaLabel: undefined,
  },
  {
    key: 'powersports',
    name: 'Sonic Powersports',
    imageUrl: powersportsBgUrl,
    tagline: 'Powersport toys',
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
  {
    key: 'tactical',
    name: 'Tactical Fleet',
    imageUrl: tacticalBgUrl,
    tagline: 'Luxury exotic cars',
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
    hoverScrimColor: TACTICAL_HOVER_SCRIM,
    ctaLabel: 'Shop luxury exotics',
  },
]
</script>

<template>
  <div class="home-page">
    <!-- Sticky Sonic nav. Sits opaque on top of the hero image, which
         intentionally extends behind it on desktop (the hero allocates
         121 px top padding so the headline reads ~49 px below where the
         72 px nav bottoms out). -->
    <SonicNavBar
      :nav-items="sonicNavItems"
      :brand-name="brandName"
    />

    <main class="home-page__main">
      <!-- ── Hero ─────────────────────────────────────────
           Full-bleed background image with a centered 1280 px content
           rail. Heading sits top-left of the rail; CTAs sit bottom-
           right. Mobile stacks the image full-bleed with the heading
           at the top and a side-by-side CTA row pinned to the bottom. -->
      <section class="home-hero" aria-label="Sonic Automotive welcome">
        <!-- BG image swaps source at the 600 px mobile breakpoint to keep
             the geometric image collage tuned for each viewport class. -->
        <picture class="home-hero__media">
          <source media="(min-width: 600px)" :srcset="heroDesktopUrl" />
          <img
            class="home-hero__image"
            :src="heroMobileUrl"
            alt=""
            aria-hidden="true"
          />
        </picture>

        <div class="home-hero__inner">
          <div class="home-hero__copy">
            <h1 class="home-hero__heading">
              At every stage of ownership, we ride with you
            </h1>
            <p class="home-hero__subhead">This is Sonic Automotive</p>
          </div>

          <div class="home-hero__ctas">
            <BaseButton
              class="home-hero__cta"
              variant="primary"
              size="md"
              label="Shop all rides"
              @click="onShopAllRides"
            />
            <BaseButton
              class="home-hero__cta"
              variant="secondary"
              size="md"
              theme="dark"
              label="Find a location"
              @click="onFindALocation"
            />
          </div>
        </div>
      </section>

      <!-- ── Shop by categories ────────────────────────────
           Tabbed grid of category tiles linking to custom SRPs.
           Sits 80 px below the hero on desktop / tablet, tighter
           on mobile (the section's internal gap already provides
           breathing room above the tab strip). -->
      <ShopByCategories
        class="home-page__shop-categories"
        :categories="shopCategories"
      />

      <!-- ── Sonic Circuit ─────────────────────────────────
           Full-bleed dark navy panel pitching the rewards membership.
           Same 80 / 40 px top spacing as Shop by Categories. The
           section is a brand-themed organism (CTA fills with the
           brand's primary colour automatically). -->
      <SonicCircuit
        class="home-page__sonic-circuit"
        :benefits="sonicCircuitBenefits"
        cta-href="#join-circuit"
        @cta-click="onJoinCircuit"
      />

      <!-- ── Car ownership made easy ─────────────────────────
           Scroll-driven stacking card section (Drive / Sell / Service).
           Sits between the Sonic Circuit panel and the brand portfolio. -->
      <StackingCardSection
        class="home-page__ownership"
        title="Car ownership made easy"
        subtitle="Everything you need, all in one place."
        :cards="ownershipCards"
        :sticky-offset="72"
        @cta-click="onOwnershipCtaClick"
      />

      <!-- ── Meet the Sonic brand ──────────────────────────
           Brand portfolio organism — 4 selectable cards (Sonic,
           EchoPark, Powersports, Tactical Fleet). Section title
           lives outside the organism so the homepage controls
           the heading typography while `BrandPortfolio` owns the
           card row + selection animation. 80 / 40 px top spacing
           matches the rest of the page. Per-brand `#content-*`
           slots forward selected-state helpers (OEM grid, city
           list, dealership-logo row) without making the organism
           import every helper itself. EchoPark's `#cta-echopark`
           slot provides a primary + secondary CTA pair. -->
      <section
        class="home-brand-portfolio"
        aria-labelledby="home-brand-portfolio-title"
      >
        <h2 id="home-brand-portfolio-title" class="home-brand-portfolio__title">
          Meet the Sonic brand
        </h2>

        <BrandPortfolio
          class="home-brand-portfolio__cards"
          :brands="brands"
          :model-value="null"
          :select-first-by-default="false"
          @cta-click="onBrandCtaClick"
        >
          <template #content-sonic>
            <SonicOemGrid />
          </template>
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
          <template #content-powersports>
            <PowersportsLogoRow />
          </template>
        </BrandPortfolio>
      </section>
    </main>

    <GlobalFooter
      :phoneNumber="phoneNumber"
      :brandName="brandName"
      :logoUrl="footerLogoUrl"
      :linkColumns="footerLinkColumns"
      :socialLinks="footerSocialLinks"
      :trustBadges="footerTrustBadges"
      :legalLinks="footerLegalLinks"
      :copyrightText="footerCopyrightText"
    />
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-0);
  font-family: var(--font-family-base);
}

.home-page__main {
  flex: 1 1 auto;
  width: 100%;
}

/* Section spacing: 80 px below the hero on desktop / tablet (Figma).
 * Mobile keeps a tighter 40 px so the page stays scannable on small
 * screens without leaving a large dead-air gap above the tab strip. */
.home-page__shop-categories,
.home-page__sonic-circuit,
.home-page__ownership,
.home-brand-portfolio {
  margin-top: 80px;
}
@media (max-width: 599.98px) {
  .home-page__shop-categories,
  .home-page__sonic-circuit,
  .home-page__ownership,
  .home-brand-portfolio {
    margin-top: 40px;
  }
}

/* ─── Meet the Sonic brand ────────────────────────────────
 * Figma node 7682:20293 — white section with the "Meet the
 * Sonic brand" heading **left-aligned with the first card**,
 * sitting above the BrandPortfolio organism. Section gutter
 * is 80 px on desktop (matches the Figma frame's px-[80px])
 * and tightens to 24 px on mobile so each card has enough
 * side margin in the stacked layout. 38 px gap between
 * heading and card row mirrors the Figma `gap-[38px]` exactly.
 *
 * Both the title and the BrandPortfolio share the same
 * 1286 px content rail (matches `BrandPortfolio.bp__row`'s
 * max-width) so the title's left edge always lines up with
 * the first card's left edge — regardless of how wide the
 * section's white background stretches. */
.home-brand-portfolio {
  display: flex;
  flex-direction: column;
  gap: 38px;
  padding: 0 80px 80px;
  background: var(--color-neutral-100);
}

.home-brand-portfolio__title,
.home-brand-portfolio__cards {
  width: 100%;
  max-width: 1286px;
  margin: 0 auto;
}

.home-brand-portfolio__title {
  text-align: left;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: var(--font-weight-bold, 700);
  font-size: 42px;
  line-height: 54px;
  letter-spacing: -1.2px;
  color: var(--color-neutral-0);
}

@media (max-width: 1023.98px) {
  .home-brand-portfolio {
    padding: 0 32px;
  }
  .home-brand-portfolio__title {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.8px;
  }
}

@media (max-width: 599.98px) {
  .home-brand-portfolio {
    gap: 24px;
    padding: 0 0 0;
  }
  .home-brand-portfolio__title {
    padding: 0 24px;
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.8px;
  }
}

/* ─── Hero ────────────────────────────────────────────────
 * Desktop: full-bleed background image; the hero **starts at y=0** of
 * the page and extends behind the sticky nav. The 121 px top padding
 * inside `.home-hero__inner` gives the headline ~49 px of breathing
 * room below the 72 px nav. Section sits flush against the viewport
 * top on first paint so the hero image fills the area behind the nav.
 *
 * The inner content rail is capped at 1280 px (Figma: invisible
 * 1280 px content area inside the 1440 px frame, leaving 80 px gutters
 * on each side). The rail uses flex-column with the heading pinned to
 * the top and the CTA group pushed to the bottom-right via
 * `margin-top: auto` + `align-self: flex-end`, matching the Figma
 * absolute placement (top-left headline + bottom-right CTAs).
 * -------------------------------------------------------- */
.home-hero {
  position: relative;
  width: 100%;
  min-height: 717px;
  overflow: hidden;
  /* Negative top margin pulls the hero up behind the 72 px sticky nav.
   * Combined with the 121 px top padding on `.home-hero__inner`, the
   * heading still appears 49 px below where the nav visually ends. */
  margin-top: -72px;
  isolation: isolate;
}

/* Top-anchored linear gradient overlay (Figma Rectangle 486 desktop /
 * Rectangle 485 mobile) — darkens the top of the hero so the white
 * headline + subhead read cleanly over the image. Sits between the
 * image (z=0) and the content (z=2). Desktop: top 78% of section
 * (558 / 717 from Figma). Mobile: top 75% (379 / 502). */
.home-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
  pointer-events: none;
}

.home-hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.home-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.home-hero__inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  min-height: 717px;
  margin: 0 auto;
  /* No horizontal padding at >=1280 viewports — the 1280 content rail
   * IS the Figma "invisible content area" (text + CTAs). Below 1280 we
   * tighten with safety gutters via a media query further down. */
  padding: 121px 0 48px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.home-hero__copy {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 818px;
  color: var(--color-neutral-100);
}

.home-hero__heading {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: 900;
  font-size: 64px;
  line-height: 1.26;
  letter-spacing: -0.704px;
}

.home-hero__subhead {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: 300;
  font-size: 40px;
  line-height: 1.3;
  letter-spacing: -0.44px;
}

.home-hero__ctas {
  margin-top: auto;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Lock each CTA to the Figma 175 px width so the button pair reads as
 * a tidy matched set regardless of label length. BaseButton is content-
 * sized by default; this is a hero-specific override only. */
.home-hero__cta {
  width: 175px;
  max-width: 175px;
}

/* ─── Narrow desktop (<1280) ──────────────────────────────
 * Add 32 px safety gutters once the viewport drops below the 1280 px
 * content rail so the headline doesn't bump the viewport edge. */
@media (max-width: 1279.98px) {
  .home-hero__inner {
    padding-left: 32px;
    padding-right: 32px;
  }
}

/* ─── Tablet (<1024) ──────────────────────────────────────
 * Below 1024 px scale the headline + subhead down so they still fit
 * comfortably without wrapping awkwardly. */
@media (max-width: 1023.98px) {
  .home-hero__inner {
    padding-top: 121px;
    padding-bottom: 40px;
  }
  .home-hero__heading {
    font-size: 48px;
    letter-spacing: -0.528px;
  }
  .home-hero__subhead {
    font-size: 28px;
    letter-spacing: -0.308px;
  }
}

/* ─── Mobile (<600) ───────────────────────────────────────
 * Stacked layout. The mobile nav is 64 px tall, so we cancel the
 * desktop -72 / +121 nav-clearance maths and use a more compact
 * 32 px top padding (the mobile nav already sits in normal flow
 * above this section on real devices). CTAs span the row evenly,
 * each `flex: 1`. */
@media (max-width: 599.98px) {
  .home-hero {
    margin-top: 0;
    min-height: 502px;
  }

  /* Mobile gradient covers the top 75% (379 / 502 from Figma). */
  .home-hero::before {
    height: 75%;
  }

  .home-hero__inner {
    min-height: 502px;
    padding: 32px 24px;
  }

  .home-hero__copy {
    gap: 8px;
    max-width: 329px;
  }

  .home-hero__heading {
    font-size: 32px;
    letter-spacing: -0.352px;
  }

  .home-hero__subhead {
    font-size: 18px;
    letter-spacing: -0.198px;
    line-height: 1.3;
  }

  .home-hero__ctas {
    align-self: stretch;
    width: 100%;
    gap: 16px;
  }

  /* Both CTAs share the row evenly on mobile (Figma flex-1 / flex-1). */
  .home-hero__cta {
    flex: 1 1 0;
    width: auto;
    max-width: none;
    min-width: 0;
  }
}
</style>
