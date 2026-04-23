<script setup lang="ts">
import { computed, ref } from 'vue'

import GlobalHeader from '@/components/GlobalHeader/GlobalHeader.vue'
import type { NavLink } from '@/components/GlobalHeader/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter.vue'
import type { FooterLinkColumn, SocialLink, LegalLink } from '@/components/GlobalFooter/GlobalFooter.vue'

import VdpGallery from '@/components/VdpGallery/VdpGallery.vue'
import VdpSummary from '@/components/VdpSummary/VdpSummary.vue'
import VdpPackagesOptions, { type PackageItem } from '@/components/VdpPackagesOptions'
import VdpExteriorInterior, { type AttributeItem } from '@/components/VdpExteriorInterior'
import VdpStandoutFeatures, { type StandoutFeature } from '@/components/VdpStandoutFeatures'
import VdpYourTerms, { type YourTermsOption } from '@/components/VdpYourTerms'

import headsUpDisplayIcon     from '@icons/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Heads Up Display.svg?raw'
import massagingSeatIcon      from '@icons/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Massaging Seat.svg?raw'
import powerMoonroofIcon      from '@icons/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Power Moonroof.svg?raw'
import remoteKeylessEntryIcon from '@icons/Icon Type=Vehicle Descriptors, Size=Medium, Theme=Remote Keyless Entry.svg?raw'

import financeIcon from '@icons/Icon=Illustrative, Name=Finance.svg?raw'
import payCashIcon from '@icons/Icon=Illustrative, Name=Pay-Cash.svg?raw'
import preQualIcon from '@icons/Icon=Illustrative, Name=Pre-Qual.svg?raw'

import sonicBankIcon      from '@icons/Style=Finance-Sonic, Detail=Payment, Icon=Bank-Outline.svg?raw'
import sonicCashIcon      from '@icons/Style=Finance-Sonic, Detail=Payment, Icon=Cash.svg?raw'
import sonicFastTrackIcon from '@icons/Style=Finance-Sonic, Detail=Payment, Icon=Fast-Track.svg?raw'

import saLogoDefaultUrl from '@logos/Color=SA-FullColor.svg?url'

const props = withDefaults(
  defineProps<{
    brandName?: string
    phoneNumber?: string
  }>(),
  { brandName: 'Sonic Automotive', phoneNumber: '(877) 708-4049' },
)

const isSonic = computed(() => props.brandName.toLowerCase().includes('sonic'))

/* ─── Header / footer brand config ───────────────────────
 * Mirrors the white-label pattern established by SrpPage.
 * -------------------------------------------------------- */
const headerLogoUrl = computed(() => (isSonic.value ? saLogoDefaultUrl : undefined))

const headerNavLinks = computed<NavLink[] | undefined>(() =>
  isSonic.value
    ? [
        { label: 'New cars' },
        { label: 'Used cars' },
        { label: 'Sell your car' },
        { label: 'More', dropdown: true },
      ]
    : undefined,
)

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

/* ─── Vehicle seed data (matches Figma) ─────────────────── */
const vehicle = {
  year:        2026,
  make:        'BMW',
  model:       'X5 M60i',
  trim:        '',
  price:       '50,000',
  priceLabel:  'MSRP',
  dealerName:  'BMW of Birmingham',
  ctaLabel:    'Test Drive',
  vin:         '5UX33EU01T9307218',
  stockNumber: 'T9307218',
  imageUrl:
    'https://content.homenetiol.com/scaler/1600/900/eb9a7bffdd55493f8934eb98a5b0be7c.jpg',
  imageCount:  24,
}

const favorited = ref(false)

/* ─── Packages & Options seed data ───────────────────────
 * Representative BMW X5 M60i option list; mirrors the
 * VdpPackagesOptions Storybook sample so the page reads
 * naturally against the vehicle above. */
const packages: PackageItem[] = [
  {
    title: 'Premium Package',
    body:
      'Adds heated front seats, a heated steering wheel, a Harman Kardon ' +
      'surround-sound system, soft-close automatic doors, and a wireless ' +
      'device charging tray in the front console.',
  },
  {
    title: 'M Sport Package',
    body:
      'Includes the M Sport aerodynamic kit, 21-inch M wheels with ' +
      'performance tires, M Sport brakes with blue calipers, an ' +
      'M leather steering wheel, and a dark-headliner interior trim.',
  },
  {
    title: 'Executive Package',
    body:
      'Includes heated and ventilated front seats with massage, rear-seat ' +
      'heating, a panoramic Sky Lounge LED roof, four-zone automatic ' +
      'climate control, and acoustic side-window glass.',
  },
]

/* ─── Exterior & Interior seed data ──────────────────────
 * Mirrors the Figma Exterior & Interior frame — two rows of
 * four attributes on desktop, reflowing to 3 / 2 columns on
 * tablet / mobile via the component's own CSS grid. */
const exteriorInteriorAttributes: AttributeItem[] = [
  {
    label:        'Color',
    value:        'Arctic Race Blue metallic',
    swatchType:   'color',
    swatchColor:  '#1F3A5F',
  },
  {
    label:        'Upholstery',
    value:        'Ivory white',
    swatchType:   'color',
    swatchColor:  '#F6F1E7',
  },
  { label: 'Wheels',        value: '22" M Aero Black 1027M Wheels' },
  { label: 'Interior Trim', value: 'M Dark Silver Interior' },
  { label: 'Body Style',    value: 'SUV' },
  { label: 'Seats',         value: '5 seats' },
]

/* ─── Standout Features seed data ────────────────────────
 * Three-image mosaic (hero + two thumbs) paired with four
 * icon-labeled highlight chips, all rendered with the same
 * visual weight. */
const standoutImages = [
  { src: vehicle.imageUrl, alt: `${vehicle.year} ${vehicle.make} ${vehicle.model} interior` },
  {
    src:
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=450&fit=crop',
    alt: 'Ivory white leather rear seats',
  },
  {
    src:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=450&fit=crop',
    alt: 'Exterior front angle',
  },
]

const standoutFeatures: StandoutFeature[] = [
  { label: 'Heads up display',             iconSvg: headsUpDisplayIcon },
  { label: 'Ventilated Massage Seats',     iconSvg: massagingSeatIcon },
  { label: 'Panoramic Moonroof',           iconSvg: powerMoonroofIcon },
  { label: 'Comfort Access Keyless Entry', iconSvg: remoteKeylessEntryIcon },
]

/* ─── Your Vehicle. Your Terms. seed data ───────────────
 * Three financing options with brand-aware iconography:
 *  - EchoPark: multi-colour illustrative icons (Finance /
 *    Pay-Cash / Pre-Qual) from the EPDS icon set.
 *  - Sonic: the orange `currentColor`-fill outline icons that
 *    match the Sonic Figma treatment; tinted via the Sonic
 *    data-brand override baked into `VdpYourTerms`. */
const yourTermsOptions = computed<YourTermsOption[]>(() => [
  {
    title:       'Finance',
    description:
      'Build equity with every payment, own your vehicle outright at ' +
      'payoff, and drive without mileage restrictions.',
    iconSvg:     isSonic.value ? sonicBankIcon : financeIcon,
    linkLabel:   'Apply for Financing',
    linkHref:    '#',
  },
  {
    title:       'Lease',
    description:
      'Enjoy payments tailored to you and always drive the latest ' +
      'model. Upgrade every 2–3 years—no trade-in negotiations, no hassle.',
    iconSvg:     isSonic.value ? sonicCashIcon : payCashIcon,
    linkLabel:   'Lease This Car',
    linkHref:    '#',
  },
  {
    title:       'Fast Track',
    description:
      'Get ahead before you arrive. Estimate your trade-in value, ' +
      'explore current offers, and start your credit application—all ' +
      'from home.',
    iconSvg:     isSonic.value ? sonicFastTrackIcon : preQualIcon,
    linkLabel:   'Get Started',
    linkHref:    '#',
  },
])

/* Stubs — host app will wire these to real flows / gallery modals. */
function onTestDrive() {
  console.log('[VdpPage] test drive requested', vehicle.stockNumber)
}
function onSeeStorePrice() {
  console.log('[VdpPage] see store price', vehicle.stockNumber)
}
function onOpenPhotos() {
  console.log('[VdpPage] open photo gallery', vehicle.stockNumber)
}
function onSeeAllPackages() {
  console.log('[VdpPage] see all packages & options', vehicle.stockNumber)
}
function onYourTermsClick(payload: { option: YourTermsOption, index: number }) {
  console.log('[VdpPage] your-terms option clicked', payload.option.title, vehicle.stockNumber)
}
</script>

<template>
  <div class="vdp-page">
    <GlobalHeader
      variant="global-search"
      zipCode="35223"
      :phoneNumber="phoneNumber"
      :brandName="brandName"
      :logoUrl="headerLogoUrl"
      :navLinks="headerNavLinks"
    />

    <main class="vdp-page__main">
      <!-- ── Above-the-fold hero row ───────────────────── -->
      <section class="vdp-page__hero" aria-label="Vehicle hero">
        <VdpGallery
          class="vdp-page__gallery"
          :image-url="vehicle.imageUrl"
          :image-count="vehicle.imageCount"
          :title="`${vehicle.year} ${vehicle.make} ${vehicle.model}`"
          :favorited="favorited"
          @update:favorited="favorited = $event"
          @click:photos="onOpenPhotos"
        />

        <VdpSummary
          class="vdp-page__summary"
          :year="vehicle.year"
          :make="vehicle.make"
          :model="vehicle.model"
          :trim="vehicle.trim"
          :price="vehicle.price"
          :price-label="vehicle.priceLabel"
          :dealer-name="vehicle.dealerName"
          :cta-label="vehicle.ctaLabel"
          :vin="vehicle.vin"
          :stock-number="vehicle.stockNumber"
          @click:cta="onTestDrive"
          @click:secondary="onSeeStorePrice"
        />
      </section>

      <!-- ── Installed Packages & Options ──────────────── -->
      <VdpPackagesOptions
        class="vdp-page__packages"
        :packages="packages"
        see-all-href="#"
        @click:see-all="onSeeAllPackages"
      />

      <!-- ── Exterior & Interior ───────────────────────── -->
      <VdpExteriorInterior
        class="vdp-page__exterior-interior"
        :attributes="exteriorInteriorAttributes"
      />

      <!-- ── Standout Features ─────────────────────────────
           Full-bleed within the page's max-width container: the
           gray feature band reaches the page edges on desktop /
           mobile via negative horizontal margins that cancel the
           page gutter (tablet already has zero page padding). -->
      <VdpStandoutFeatures
        class="vdp-page__standout-features"
        :images="standoutImages"
        :features="standoutFeatures"
      />

      <!-- ── Your Vehicle. Your Terms. ─────────────────────
           Three-tile finance-options row (Finance / Lease /
           Fast Track). Spaced 80 px below the Standout
           Features band per Figma 13953:10389. -->
      <VdpYourTerms
        class="vdp-page__your-terms"
        :options="yourTermsOptions"
        @click:option="onYourTermsClick"
      />

      <!--
        TODO: Below-the-fold VDP sections (specs, features, CTA tile,
        protection plans, FAQ, SEO carousel, etc.) land in a follow-up.
      -->
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
.vdp-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-0);
  font-family: var(--font-family-base);
}

.vdp-page__main {
  flex: 1 1 auto;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 32px 80px;
  box-sizing: border-box;
}

/* ─── Hero row ─────────────────────────────────────────── */
.vdp-page__hero {
  display: flex;
  align-items: center;
  gap: 80px;
  width: 100%;
}

.vdp-page__gallery {
  flex: 1 1 864px;
  min-width: 0;
}

.vdp-page__summary {
  flex: 0 0 416px;
}

/* ─── Below-the-fold sections ─────────────────────────────
 * Each sub-section sits 80 px below the previous block per
 * Figma. Applying `margin-top` per-section (rather than a
 * shared flex/grid gap) keeps the hero row self-contained
 * and makes it easy to reorder or insert new sections later. */
.vdp-page__packages,
.vdp-page__exterior-interior,
.vdp-page__standout-features,
.vdp-page__your-terms {
  margin-top: var(--spacing-xxl); /* 80px */
}

/* Standout Features breaks out of the page's 32 px desktop
 * gutter so its gray feature band can reach the edges of the
 * 1440 max-width container (matching Figma frame 13951:55390).
 * The component's own internal 80 px padding re-inset its
 * content so it still reads at the same horizontal rhythm as
 * the rest of the page. */
.vdp-page__standout-features {
  margin-left:  calc(-1 * var(--spacing-xs)); /* -32px */
  margin-right: calc(-1 * var(--spacing-xs));
}

/* Between xlg and lg (1024–1279) we let the gallery shrink gracefully
 * while keeping the summary at its fixed 416 px column width. */
@media (max-width: 1279.98px) {
  .vdp-page__hero {
    gap: var(--spacing-xxl, 40px);
  }
}

/* ─── Tablet (<1024) ──────────────────────────────────────
 * Stack the hero vertically: gallery spans the full content
 * width, summary sits below with an 80 px internal horizontal
 * inset per Figma (tablet frame 864 wide, summary body at
 * x=80, width=704).
 *
 * Page-level horizontal padding is zeroed here so the gallery
 * can go edge-to-edge full-bleed. Every below-the-fold section
 * (VdpSummary, VdpPackagesOptions, VdpExteriorInterior) already
 * owns an 80 px side inset at this breakpoint, so gutters stay
 * consistent without the page container double-padding them. */
@media (max-width: 1023.98px) {
  .vdp-page__main {
    padding-left: 0;
    padding-right: 0;
  }

  .vdp-page__hero {
    flex-direction: column;
    align-items: center;
    gap: 80px;
  }

  .vdp-page__gallery {
    flex: 1 1 auto;
  }

  .vdp-page__summary {
    flex: 1 1 auto;
    padding: 0 80px;
  }
}

/* ─── Mobile (<600) ───────────────────────────────────────
 * Per Figma mobile frame 3069 (419 wide): gallery spans edge
 * to edge of the content area, summary sits flush below it
 * with the page gutter dropping to 24 px (matching the 24 px
 * internal inset shown inside the 419 px frame). The 80 px
 * summary inset used on tablet is removed — page padding
 * alone handles horizontal rhythm at this size. */
@media (max-width: 599.98px) {
  .vdp-page__main {
    padding: var(--spacing-xs, 32px) 24px var(--spacing-xl, 40px);
  }

  .vdp-page__hero {
    gap: var(--spacing-xxs, 24px);
  }

  .vdp-page__summary {
    padding: 0;
  }

  /* Mobile uses a 24 px page gutter; re-balance the Standout
   * Features break-out so the band still reaches the page
   * container edges. */
  .vdp-page__standout-features {
    margin-left:  calc(-1 * var(--spacing-xxs)); /* -24px */
    margin-right: calc(-1 * var(--spacing-xxs));
  }
}

/* Tablet already zeros the page gutter (see `.vdp-page__main`
 * rule above), so the Standout Features section needs no
 * horizontal break-out there — cancel the desktop negative
 * margin so the component sits flush with the page edges. */
@media (max-width: 1023.98px) {
  .vdp-page__standout-features {
    margin-left:  0;
    margin-right: 0;
  }
}
</style>
