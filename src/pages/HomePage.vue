<script setup lang="ts">
import { computed } from 'vue'

import GlobalFooter from '@/components/GlobalFooter/GlobalFooter.vue'
import type { FooterLinkColumn, SocialLink, LegalLink } from '@/components/GlobalFooter/GlobalFooter.vue'
import SonicNavBar from '@/components/SonicNavBar/SonicNavBar.vue'
import { sonicNavItems } from '@/pages/sonicNavItems'

import saLogoDefaultUrl from '@logos/Color=SA-FullColor.svg?url'

/**
 * Sonic Automotive Homepage — page-level composition (Storybook only).
 *
 * Scaffolding pass: chrome only.
 *   - Sticky `SonicNavBar` (mega-menu + mobile drawer) at the top.
 *   - Sonic-configured `GlobalFooter` at the bottom.
 *   - Empty `<main>` for sections to drop in one at a time. Each section
 *     manages its **own** internal max-width / gutter (no page-level
 *     content rail), so marketing bands can go full-bleed when they
 *     want to and constrained when they don't.
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
 * Mirrors the white-label pattern used by SrpPage / VdpPage.
 * Today the homepage only ships a Sonic story; if/when an
 * EchoPark variant lands these computeds gracefully fall
 * back to the EP defaults baked into GlobalFooter. */
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
</script>

<template>
  <div class="home-page">
    <!-- Sticky Sonic nav. Homepage has no top-of-viewport sticky
         element competing for space, so we leave the bar's default
         sticky behaviour on. -->
    <SonicNavBar
      :nav-items="sonicNavItems"
      :brand-name="brandName"
    />

    <main class="home-page__main">
      <!--
        Sections drop in here one at a time. Each section is responsible
        for its own internal max-width + horizontal gutter (e.g. a hero
        can go full-bleed, a marketing tile row can constrain itself to
        1440 px, etc.).
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
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-0);
  font-family: var(--font-family-base);
}

/* No max-width / horizontal padding on `main` — each section owns
 * its own container. The flex: 1 keeps the footer pinned to the
 * bottom of the viewport when sections are sparse. */
.home-page__main {
  flex: 1 1 auto;
  width: 100%;
}
</style>
