<script setup lang="ts">
import { computed } from 'vue'

import facebookSvg  from '../../../icon/Style=Communication, Detail=Social, Icon=Facebook.svg?raw'
import xSvg         from '../../../icon/Style=Communication, Detail=Social, Icon=X.svg?raw'
import youtubeSvg   from '../../../icon/Style=Communication, Detail=Social, Icon=YouTube.svg?raw'
import instagramSvg from '../../../icon/Style=Communication, Detail=Social, Icon=Instagram.svg?raw'
import tiktokSvg    from '../../../icon/Style=Communication, Detail=Social, Icon=tiktok.svg?raw'
import phoneSvg     from '../../../icon/Style=Communication, Detail=Support, Icon=Phone.svg?raw'

import epLogoUrl from '../../../Logos/Property 1=EP-GreenWhite.svg?url'
import bbbUrl  from '../../../Logos/3rd Party/badges-bbb-new-version.svg?url'
import sealUrl from '../../../Logos/3rd Party/2026-seal 1.svg?url'

export interface FooterLinkColumn {
  heading: string
  links: { label: string; href: string }[]
}

export interface SocialLink {
  platform: string
  href: string
  ariaLabel: string
}

export interface TrustBadge {
  src: string
  alt: string
  height?: number
}

export interface LegalLink {
  label: string
  href: string
}

const socialIconMap: Record<string, string> = {
  facebook:  facebookSvg,
  x:         xSvg,
  youtube:   youtubeSvg,
  instagram: instagramSvg,
  tiktok:    tiktokSvg,
}

const props = withDefaults(defineProps<{
  phoneNumber?: string
  logoHref?: string
  /** Logo image URL */
  logoUrl?: string
  /** Accessible brand name (used in alt text, aria-labels, and copyright) */
  brandName?: string
  /** Footer navigation link columns */
  linkColumns?: FooterLinkColumn[]
  /** Social media icon links */
  socialLinks?: SocialLink[]
  /** Trust/award badge images shown in the bottom bar */
  trustBadges?: TrustBadge[]
  /** Legal / privacy links shown in the bottom bar */
  legalLinks?: LegalLink[]
  /** Override the default copyright line (otherwise derived from brandName) */
  copyrightText?: string
}>(), {
  phoneNumber: '(877) 708-4049',
  logoHref:    '/',
  logoUrl:     epLogoUrl,
  brandName:   'EchoPark Automotive',
  linkColumns: () => [
    {
      heading: 'Shop',
      links: [
        { label: 'Shop cars', href: '#' },
        { label: 'Sell/Trade', href: '#' },
        { label: 'Finance', href: '#' },
        { label: 'Protection plans', href: '#' },
        { label: 'Get financing', href: '#' },
        { label: 'Shop brand-new cars', href: '#' },
        { label: 'Shop powersports', href: '#' },
      ],
    },
    {
      heading: 'About',
      links: [
        { label: 'Find a location', href: '#' },
        { label: 'About EchoPark', href: '#' },
        { label: 'Reviews', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Investor relations', href: '#' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'Help center & FAQs', href: '#' },
        { label: 'OwnerZone', href: '#' },
        { label: 'Contact us', href: '#' },
        { label: 'Accessibility', href: '#' },
        { label: 'Manage cookies', href: '#' },
        { label: 'Sitemap', href: '#' },
        { label: 'Share feedback', href: '#' },
      ],
    },
  ],
  socialLinks: () => [
    { platform: 'facebook',  href: 'https://facebook.com/echopark',  ariaLabel: 'Facebook' },
    { platform: 'x',         href: 'https://x.com/echopark',         ariaLabel: 'X' },
    { platform: 'youtube',   href: 'https://youtube.com/echopark',   ariaLabel: 'YouTube' },
    { platform: 'instagram', href: 'https://instagram.com/echopark', ariaLabel: 'Instagram' },
    { platform: 'tiktok',    href: 'https://tiktok.com/@echopark',   ariaLabel: 'TikTok' },
  ],
  trustBadges: () => [
    { src: bbbUrl,  alt: 'Better Business Bureau', height: 40 },
    { src: sealUrl, alt: '2026 Award Seal',        height: 50 },
  ],
  legalLinks: () => [
    { label: 'Privacy policy',      href: '#' },
    { label: 'Terms of use',        href: '#' },
    { label: 'Do not sell my info', href: '#' },
  ],
})

const copyrightLine = computed(() =>
  props.copyrightText ?? `Copyright \u00A9 2026 ${props.brandName}, Inc. All Rights Reserved.`
)
</script>

<template>
  <footer class="gf">
    <div class="gf__inner">

      <!-- ── Main row ──────────────────────────────────────── -->
      <!--
        Mobile/Tablet: flex column  [brand row] [social row] [links grid] [bottom]
        Desktop:       flex row     brand | Shop | About | Support | phone
        The .gf__links wrapper uses display:contents on DT so the 3 cols
        participate directly in gf__main's space-between flex row.
      -->
      <div class="gf__main">

        <!--
          Brand column — single source of truth for logo, phone, and social.

          Structure:
            .gf__brand             flex column (all viewports)
              .gf__brand-top       flex row: logo left | phone right (MB/TB)
                                             logo only (DT — phone moves to gf__phone--dt)
              .gf__social          icon row: centered (MB/TB), left-aligned (DT)
        -->
        <div class="gf__brand">
          <div class="gf__brand-top">
            <a :href="logoHref" class="gf__logo-link" :aria-label="`${brandName} — home`">
              <img class="gf__logo" :src="logoUrl" :alt="brandName" />
            </a>
            <!-- Phone: right side of brand-top on MB/TB; hidden on DT -->
            <div class="gf__phone gf__phone--brand" aria-label="Call us">
              <span class="gf__phone-icon" aria-hidden="true" v-html="phoneSvg" />
              <a :href="`tel:${phoneNumber.replace(/\D/g,'')}`" class="gf__phone-num">
                {{ phoneNumber }}
              </a>
            </div>
          </div>

          <!-- Single social row — always inside brand, centered on MB/TB, left on DT -->
          <div v-if="socialLinks.length" class="gf__social" aria-label="Social media">
            <a
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.href"
              class="gf__social-link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.ariaLabel"
            ><span class="gf__social-icon" v-html="socialIconMap[social.platform]" /></a>
          </div>
        </div>

        <!-- Link columns
             On DT: display:contents makes the 3 cols direct flex children of gf__main
             On MB/TB: grid container                                            -->
        <nav class="gf__links" aria-label="Footer navigation">
          <div v-for="col in linkColumns" :key="col.heading" class="gf__link-col">
            <h3 class="gf__link-heading">{{ col.heading }}</h3>
            <ul class="gf__link-list">
              <li v-for="link in col.links" :key="link.label">
                <a :href="link.href" class="gf__link">{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Phone: DT only (far right of main row) -->
        <div class="gf__phone gf__phone--dt" aria-label="Call us">
          <span class="gf__phone-icon" aria-hidden="true" v-html="phoneSvg" />
          <a :href="`tel:${phoneNumber.replace(/\D/g,'')}`" class="gf__phone-num gf__phone-num--dt">
            {{ phoneNumber }}
          </a>
        </div>

      </div><!-- /gf__main -->

      <!-- ── Bottom bar ───────────────────────────────────── -->
      <div class="gf__bottom">
        <div class="gf__legal">
          <p class="gf__copyright">{{ copyrightLine }}</p>
          <p v-if="legalLinks.length" class="gf__privacy">
            <template v-for="(link, i) in legalLinks" :key="link.label">
              <span v-if="i > 0" class="gf__sep" aria-hidden="true">|</span>
              <a :href="link.href" class="gf__legal-link">{{ link.label }}</a>
            </template>
          </p>
        </div>
        <div v-if="trustBadges.length" class="gf__badges">
          <img
            v-for="badge in trustBadges"
            :key="badge.alt"
            class="gf__badge"
            :src="badge.src"
            :alt="badge.alt"
            :style="badge.height ? { height: `${badge.height}px`, width: 'auto' } : undefined"
          />
        </div>
      </div>

    </div><!-- /gf__inner -->
  </footer>
</template>

<style scoped>
/* ─── Root — container query anchor ───────────────────────── */
/*
  container-type on .gf (no padding) means the container size == the
  full rendered width of the footer element.  Breakpoints then fire
  based on the component's own width, not the viewport — so Storybook
  wrapper divs (max-width: 768px etc.) constrain the layout correctly.
*/
.gf {
  container-type: inline-size;
  container-name: gf;
  background: var(--color-neutral-0);
  width: 100%;
  box-sizing: border-box;
}

.gf__inner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);      /* 32px between main and bottom */
  padding: var(--spacing-xxs); /* 24px */
  box-sizing: border-box;
}

/* ─── Main row ─────────────────────────────────────────────── */
/* Mobile: column stack */
.gf__main {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);      /* 32px */
  width: 100%;
}

/* ─── Brand ────────────────────────────────────────────────── */
/* Always a column: brand-top row on top, social row below */
.gf__brand {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);      /* 32px between brand-top and social */
  width: 100%;
}

/* brand-top: logo left, phone right on MB/TB */
.gf__brand-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.gf__logo-link {
  display: inline-flex;
  flex-shrink: 0;
  text-decoration: none;
}

.gf__logo-link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 4px;
  border-radius: var(--border-radius-sm);
}

.gf__logo {
  display: block;
  height: 56px;
  width: auto;
  object-fit: contain;
}

/* ─── Phone ────────────────────────────────────────────────── */
.gf__phone {
  display: flex;
  align-items: center;
  gap: 4px;
}

.gf__phone-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.gf__phone-icon :deep(svg)  { width: 24px; height: 24px; }
.gf__phone-icon :deep(path) { fill: var(--color-neutral-100); }

.gf__phone-num {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-100);
  text-decoration: none;
  white-space: nowrap;
}

.gf__phone-num:hover { text-decoration: underline; text-underline-offset: 2px; }

/* DT: big bold phone */
.gf__phone-num--dt {
  font-size: 22px;
  font-weight: var(--font-weight-bold);
  line-height: 26px;
}

/* DT phone column hidden on MB/TB */
.gf__phone--dt { display: none; }

/* ─── Social icons ─────────────────────────────────────────── */
.gf__social {
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: center;     /* centered on MB/TB */
}

.gf__social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  text-decoration: none;
  border-radius: var(--border-radius-circular);
}

.gf__social-link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 3px;
}

.gf__social-icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
  pointer-events: none;
}

.gf__social-icon :deep(svg)    { width: 24px; height: 24px; }
.gf__social-icon :deep(path)   { fill: var(--color-neutral-100); }
.gf__social-icon :deep(rect)   { fill: var(--color-neutral-100); }
.gf__social-icon :deep(circle) { fill: var(--color-neutral-100); }

/* ─── Link columns ─────────────────────────────────────────── */
/* Mobile: 2-column grid */
.gf__links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl) var(--spacing-xxs);  /* 32px rows, 24px cols */
}

.gf__link-col {
  display: flex;
  flex-direction: column;
  gap: 13px;
}

.gf__link-heading {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--text-label-line-height);
  letter-spacing: 0.2px;
  color: #a2a6ab;
  margin: 0;
}

.gf__link-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);   /* 16px */
}

.gf__link {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-100);
  text-decoration: none;
  white-space: nowrap;
}

.gf__link:hover { text-decoration: underline; text-underline-offset: 2px; }
.gf__link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─── Bottom bar ───────────────────────────────────────────── */
/* Mobile: centered column */
.gf__bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);     /* 32px */
}

.gf__legal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xxxs);   /* 16px */
  text-align: center;
}

.gf__copyright,
.gf__privacy {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: 0.2px;
  color: var(--color-neutral-100);
  margin: 0;
}

.gf__sep {
  margin: 0 6px;
}

.gf__legal-link {
  color: var(--color-neutral-100);
  text-decoration: none;
  white-space: nowrap;
}

.gf__legal-link:hover { text-decoration: underline; text-underline-offset: 2px; }
.gf__legal-link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

.gf__badges {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);    /* 24px */
}

.gf__badge { display: block; object-fit: contain; height: 40px; width: auto; }

/* ──────────────────────────────────────────────────────────────
   Tablet  — component width ≥ 600px
   ────────────────────────────────────────────────────────── */
@container gf (min-width: 600px) {
  .gf__inner {
    padding: var(--spacing-xxs) 40px;
  }

  /* Links: 3-column row, content-width centered */
  .gf__links {
    grid-template-columns: repeat(3, auto);
    justify-content: center;
    column-gap: 55px;
    row-gap: 0;
  }
}

/* ──────────────────────────────────────────────────────────────
   Desktop  — component width ≥ 992px
   ────────────────────────────────────────────────────────── */
@container gf (min-width: 992px) {
  .gf__inner {
    padding: 40px 56px;
    gap: var(--spacing-xxs);  /* 24px between main and bottom */
  }

  /* Main row: horizontal, all children spaced out */
  .gf__main {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 40px;
  }

  /* Brand: fixed-width shrink-0 column */
  .gf__brand {
    flex-shrink: 0;
    width: auto;
    gap: var(--spacing-xxs);  /* 24px between brand-top and social */
  }

  /* brand-top only shows logo on DT (phone moves to its own column) */
  .gf__phone--brand { display: none; }
  .gf__phone--dt    { display: flex; flex-shrink: 0; }

  .gf__logo {
    height: 103px;
    width: 175px;
  }

  /* Social: left-aligned on DT */
  .gf__social {
    justify-content: flex-start;
  }

  /* Links: display:contents dissolves the wrapper so the 3 cols
     become direct flex children of gf__main                     */
  .gf__links {
    display: contents;
  }

  /* Bottom: horizontal row */
  .gf__bottom {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--spacing-xxs);
  }

  .gf__legal {
    flex-direction: row;
    align-items: flex-end;
    text-align: left;
    gap: var(--spacing-xl);   /* 32px between copyright and privacy */
  }

  .gf__badges {
    gap: var(--spacing-xxxs); /* 16px */
    flex-shrink: 0;
  }
}

/* ──────────────────────────────────────────────────────────────
   Wide desktop  — component width ≥ 1440px
   ────────────────────────────────────────────────────────── */
@container gf (min-width: 1440px) {
  .gf__inner {
    padding: 40px 120px;
  }
}
</style>
