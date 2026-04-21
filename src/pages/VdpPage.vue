<script setup lang="ts">
import { computed, ref } from 'vue'

import GlobalHeader from '@/components/GlobalHeader/GlobalHeader.vue'
import type { NavLink } from '@/components/GlobalHeader/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter.vue'
import type { FooterLinkColumn, SocialLink, LegalLink } from '@/components/GlobalFooter/GlobalFooter.vue'

import VdpGallery from '@/components/VdpGallery/VdpGallery.vue'
import VdpSummary from '@/components/VdpSummary/VdpSummary.vue'

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

/* Below the xlg breakpoint (<1440) we let the gallery shrink gracefully
 * while keeping the summary fixed; mobile treatment is out of scope for
 * the first pass and is covered by the TODO in the plan. */
@media (max-width: 1279.98px) {
  .vdp-page__hero {
    gap: var(--spacing-xxl, 40px);
  }
}
</style>
