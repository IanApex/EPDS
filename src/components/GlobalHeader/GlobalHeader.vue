<script setup lang="ts">
import { computed, ref } from 'vue'

import menuSvg    from '../../../icon/Style=Display, Detail=Menu, Icon=Menu.svg?raw'
import searchSvg  from '../../../icon/Style=Display, Detail=Default, Icon=Search.svg?raw'
import mapSvg     from '../../../icon/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'
import heartSvg   from '../../../icon/Style=Account, Detail=Heart-Filled, Icon=NA.svg?raw'
import profileSvg from '../../../icon/Style=Account, Detail=Profile-Circle, Icon=NA.svg?raw'
import phoneSvg   from '../../../icon/Style=Communication, Detail=Support, Icon=Phone.svg?raw'
import downSvg    from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Down-Small.svg?raw'

import logoDefaultUrl    from '../../../Logos/Color=Default.svg?url'
import logoGreenWhiteUrl from '../../../Logos/Color=GreenWhite.svg?url'

export interface NavLink {
  label:    string
  href?:    string
  dropdown?: boolean
}

const props = withDefaults(defineProps<{
  /**
   * Layout / colour variant:
   * - `global`          — standard white header, nav + actions
   * - `global-search`   — same but with a search bar below the nav bar
   * - `homepage`        — transparent bg, white text, for hero overlay
   * - `homepage-search` — transparent + search bar below
   * - `purchase`        — minimal: logo left, phone number right
   */
  variant?: 'global' | 'global-search' | 'homepage' | 'homepage-search' | 'purchase'
  /**
   * `false` (default) = signed-in: shows profile icon
   * `true` = guest: replaces profile icon with green "Sign in" pill
   */
  guest?: boolean
  /** Location zip code shown in the location widget */
  zipCode?: string
  /** Phone number shown in the purchase variant */
  phoneNumber?: string
  /** Placeholder for the search input */
  searchPlaceholder?: string
  /** href for the logo link */
  logoHref?: string
  /** Desktop nav link items. The last item with `dropdown: true` gets a chevron. */
  navLinks?: NavLink[]
}>(), {
  variant:           'global',
  guest:             false,
  zipCode:           '75214',
  phoneNumber:       '000-000-0000',
  searchPlaceholder: 'Search make, model, or feature',
  logoHref:          '/',
  navLinks: () => [
    { label: 'Shop cars' },
    { label: 'Sell/Trade' },
    { label: 'Finance' },
    { label: 'More', dropdown: true },
  ],
})

const emit = defineEmits<{
  /** User submitted the search form */
  'search':          [query: string]
  /** Hamburger button clicked (tablet/mobile) */
  'menu-click':      [event: MouseEvent]
  /** Location widget clicked */
  'location-click':  [event: MouseEvent]
  /** Favorites heart clicked */
  'favorites-click': [event: MouseEvent]
  /** Profile icon clicked (signed-in state) */
  'profile-click':   [event: MouseEvent]
  /** "Sign in" button clicked (guest state) */
  'sign-in-click':   [event: MouseEvent]
  /** "More" nav item clicked (desktop) */
  'more-click':      [event: MouseEvent]
}>()

const isHomepage = computed(() =>
  props.variant === 'homepage' || props.variant === 'homepage-search'
)
const isPurchase = computed(() => props.variant === 'purchase')
const hasSearch  = computed(() =>
  props.variant === 'global-search' || props.variant === 'homepage-search'
)

const logoSrc = computed(() =>
  isHomepage.value ? logoGreenWhiteUrl : logoDefaultUrl
)

const searchQuery = ref('')
function submitSearch() {
  emit('search', searchQuery.value)
}
</script>

<template>
  <header
    class="gh"
    :class="[`gh--${variant}`, { 'gh--guest': guest }]"
  >

    <!-- ═══════════════════════════════════════════════
         PURCHASE layout — logo left, phone right
         ═══════════════════════════════════════════════ -->
    <div v-if="isPurchase" class="gh__purchase">
      <a :href="logoHref" class="gh__logo-wrap">
        <img :src="logoDefaultUrl" alt="EchoPark Automotive" class="gh__logo gh__logo--lg" />
      </a>
      <div class="gh__phone">
        <span class="gh__phone-icon" aria-hidden="true" v-html="phoneSvg" />
        <a :href="`tel:${phoneNumber.replace(/\D/g, '')}`" class="gh__phone-num">
          {{ phoneNumber }}
        </a>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════
         STANDARD layout (global / homepage)
         ═══════════════════════════════════════════════ -->
    <template v-else>

      <!-- ── Main bar ──────────────────────────────── -->
      <div class="gh__bar">

        <!-- Left column: hamburger+logo (TB/MB) or nav links (DT) -->
        <div class="gh__left">

          <!-- Hamburger — TB/MB only -->
          <button
            class="gh__hamburger"
            aria-label="Open menu"
            @click="emit('menu-click', $event)"
          >
            <span class="gh__icon" aria-hidden="true" v-html="menuSvg" />
          </button>

          <!-- Logo — TB/MB only (inside left column) -->
          <a :href="logoHref" class="gh__logo-wrap gh__logo-wrap--compact" aria-label="EchoPark home">
            <img :src="logoSrc" alt="EchoPark Automotive" class="gh__logo gh__logo--sm" />
          </a>

          <!-- Nav links — DT only -->
          <nav class="gh__nav" aria-label="Main navigation">
            <template v-for="link in navLinks" :key="link.label">
              <button
                v-if="link.dropdown"
                class="gh__nav-link gh__nav-more"
                @click="emit('more-click', $event)"
              >
                {{ link.label }}
                <span class="gh__nav-chevron" aria-hidden="true" v-html="downSvg" />
              </button>
              <a v-else :href="link.href || '#'" class="gh__nav-link">
                {{ link.label }}
              </a>
            </template>
          </nav>
        </div>

        <!-- Center column: logo — DT only -->
        <a :href="logoHref" class="gh__logo-wrap gh__logo-wrap--center" aria-label="EchoPark home">
          <img :src="logoSrc" alt="EchoPark Automotive" class="gh__logo gh__logo--lg" />
        </a>

        <!-- Right column: location + icons -->
        <div class="gh__right">

          <!-- Location widget -->
          <button
            class="gh__location"
            :aria-label="`Change pickup location, currently ${zipCode}`"
            @click="emit('location-click', $event)"
          >
            <span class="gh__location-text">
              <span class="gh__location-hint">Picking up closest to</span>
              <span class="gh__location-zip">{{ zipCode }}</span>
            </span>
            <span class="gh__icon gh__location-pin" aria-hidden="true" v-html="mapSvg" />
          </button>

          <!-- Favorites -->
          <button
            class="gh__icon-btn"
            aria-label="Saved favorites"
            @click="emit('favorites-click', $event)"
          >
            <span class="gh__icon" aria-hidden="true" v-html="heartSvg" />
          </button>

          <!-- Profile (signed in) -->
          <button
            v-if="!guest"
            class="gh__icon-btn"
            aria-label="My account"
            @click="emit('profile-click', $event)"
          >
            <span class="gh__icon" aria-hidden="true" v-html="profileSvg" />
          </button>

          <!-- Sign in (guest) -->
          <button
            v-else
            class="gh__sign-in"
            @click="emit('sign-in-click', $event)"
          >
            <span class="gh__sign-in-icon" aria-hidden="true" v-html="profileSvg" />
            <span class="gh__sign-in-label">Sign in</span>
          </button>

        </div>
      </div><!-- /.gh__bar -->

      <!-- ── Search bar (global-search / homepage-search) ── -->
      <div v-if="hasSearch" class="gh__search-row">
        <form class="gh__search" role="search" @submit.prevent="submitSearch">
          <input
            v-model="searchQuery"
            type="search"
            class="gh__search-input"
            :placeholder="searchPlaceholder"
            aria-label="Search vehicles"
          />
          <button type="submit" class="gh__search-btn" aria-label="Submit search">
            <span class="gh__icon" aria-hidden="true" v-html="searchSvg" />
          </button>
        </form>
      </div>

    </template>
  </header>
</template>

<style scoped>
/* ─── Theme tokens ─────────────────────────────────────────
   Override per variant so all children just use --gh-* vars.
   ─────────────────────────────────────────────────────────── */
.gh {
  --gh-bg:         var(--color-neutral-100);
  --gh-border:     var(--color-neutral-90);
  --gh-text:       var(--color-neutral-0);
  --gh-hint:       var(--color-neutral-40);
  --gh-zip:        var(--color-action-accent);
  --gh-icon-color: var(--color-neutral-0);
}

/* Homepage / transparent variant → all elements go white */
.gh--homepage,
.gh--homepage-search {
  --gh-bg:         transparent;
  --gh-border:     transparent;
  --gh-text:       var(--color-neutral-100);
  --gh-hint:       var(--color-neutral-100);
  --gh-zip:        var(--color-neutral-100);
  --gh-icon-color: var(--color-neutral-100);
}

/* ─── Shell ────────────────────────────────────────────── */
.gh {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--gh-bg);
  border-bottom: var(--border-width-hairline) solid var(--gh-border);
  box-sizing: border-box;
  color: var(--gh-text);
  font-family: var(--font-family-base);
}

/* ─── Purchase layout ──────────────────────────────────── */
.gh__purchase {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px var(--spacing-xxs);   /* 12px 24px */
  box-sizing: border-box;
}

.gh__phone {
  display: flex;
  align-items: center;
  gap: 4px;
}

.gh__phone-icon {
  display: inline-flex;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--color-action-accent);
}

.gh__phone-icon :deep(svg) { width: 16px; height: 16px; }
.gh__phone-icon :deep(path) { fill: var(--color-action-accent); }

.gh__phone-num {
  font-size: var(--text-body-sm-size);    /* 14px */
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-action-accent);
  text-decoration: none;
}

.gh__phone-num:hover {
  text-decoration: underline;
}

/* ─── Main bar ─────────────────────────────────────────── */
.gh__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--spacing-xxxs) var(--spacing-xxs);  /* 16px 24px */
  box-sizing: border-box;
}

/* ─── Left column ──────────────────────────────────────── */
.gh__left {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxxs);   /* 16px */
  flex: 1;
}

/* ─── Hamburger ────────────────────────────────────────── */
.gh__hamburger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--gh-icon-color);
  flex-shrink: 0;
}

.gh__hamburger:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}

/* ─── Desktop nav ──────────────────────────────────────── */
.gh__nav {
  display: none;    /* hidden on mobile/tablet — shown in DT via media query */
  align-items: center;
  gap: var(--spacing-xs);   /* 32px */
}

.gh__nav-link {
  font-size: var(--text-body-lg-size);   /* 16px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--gh-text);
  text-decoration: none;
  white-space: nowrap;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.gh__nav-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.gh__nav-link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

.gh__nav-more {
  display: inline-flex;
  align-items: center;
  gap: 0;
}

.gh__nav-chevron {
  display: inline-flex;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.gh__nav-chevron :deep(svg) { width: 16px; height: 16px; }
.gh__nav-chevron :deep(path) { fill: var(--gh-icon-color); }

/* ─── Logo ─────────────────────────────────────────────── */
.gh__logo-wrap {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
}

.gh__logo-wrap:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 4px;
  border-radius: var(--border-radius-sm);
}

.gh__logo {
  display: block;
  object-fit: contain;
}

.gh__logo--sm  { height: 28px; width: auto; }
.gh__logo--lg  { height: 36px; width: auto; }

/* DT center logo: hidden on TB/MB */
.gh__logo-wrap--center {
  display: none;
}

/* TB/MB compact logo (inside left column): shown on TB/MB */
.gh__logo-wrap--compact {
  display: inline-flex;
}

/* ─── Right column ─────────────────────────────────────── */
.gh__right {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxxs);   /* 16px */
  flex: 1;
  justify-content: flex-end;
}

/* ─── Location widget ──────────────────────────────────── */
.gh__location {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--gh-text);
}

.gh__location:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}

.gh__location-text {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  text-align: right;
}

.gh__location-hint {
  display: none;    /* shown on DT via media query */
  font-size: var(--text-label-size);     /* 12px */
  font-weight: var(--font-weight-regular);
  line-height: 1;
  letter-spacing: 0.2px;
  color: var(--gh-hint);
  white-space: nowrap;
}

.gh__location-zip {
  font-size: var(--text-body-sm-size);   /* 14px */
  font-weight: var(--font-weight-medium);
  line-height: 1;
  color: var(--gh-zip);
  white-space: nowrap;
}

.gh__location-pin {
  color: var(--gh-icon-color);
}

/* ─── Generic icon ─────────────────────────────────────── */
.gh__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--gh-icon-color);
}

.gh__icon :deep(svg) { width: 24px; height: 24px; }
.gh__icon :deep(path) { fill: currentColor; }

/* ─── Icon button ──────────────────────────────────────── */
.gh__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--gh-icon-color);
  flex-shrink: 0;
}

.gh__icon-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 3px;
  border-radius: var(--border-radius-circular);
}

/* ─── Sign in button (guest) ───────────────────────────── */
.gh__sign-in {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 32px;
  padding: 4px 12px 4px 4px;
  border: none;
  border-radius: var(--border-radius-pill);
  background: var(--color-action-primary);
  cursor: pointer;
  flex-shrink: 0;
}

.gh__sign-in:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.gh__sign-in-icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
  color: var(--color-neutral-100);
}

.gh__sign-in-icon :deep(svg) { width: 24px; height: 24px; }
.gh__sign-in-icon :deep(path) { fill: currentColor; }

.gh__sign-in-label {
  font-size: var(--text-label-size);     /* 12px */
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-default);
  letter-spacing: 0.2px;
  color: var(--color-neutral-100);
  white-space: nowrap;
}

/* ─── Search row ───────────────────────────────────────── */
.gh__search-row {
  width: 100%;
  padding: 0 var(--spacing-xxs) var(--spacing-micro);   /* 0 24px 12px */
  box-sizing: border-box;
}

.gh__search {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);    /* 24px */
  width: 100%;
  padding: var(--spacing-xxxs) var(--spacing-xxs);  /* 16px 24px */
  box-sizing: border-box;
  background: var(--color-neutral-secondary-95);
  border-radius: var(--border-radius-pill);
}

.gh__search-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  outline: none;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.gh__search-input::placeholder {
  color: var(--color-neutral-40);
}

/* Remove browser's native search cancel button */
.gh__search-input::-webkit-search-cancel-button { display: none; }

.gh__search-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-neutral-40);
  flex-shrink: 0;
}

.gh__search-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--border-radius-circular);
}

/* Search icon is always dark gray, even on homepage (transparent) variants */
.gh__search-btn .gh__icon {
  color: var(--color-neutral-40);
}

.gh__search-btn .gh__icon :deep(path) {
  fill: var(--color-neutral-40);
}

/* ─────────────────────────────────────────────────────────
   Tablet  600 – 1023px
   ─────────────────────────────────────────────────────── */
@media (min-width: 600px) {
  .gh__bar {
    padding: var(--spacing-xxxs) 40px;
  }

  .gh__right {
    gap: var(--spacing-xxxs);
  }

  .gh__search-row {
    padding: 0 40px 8px;
  }
}

/* ─────────────────────────────────────────────────────────
   Desktop  ≥ 992px
   ─────────────────────────────────────────────────────── */
@media (min-width: 992px) {

  /* Main bar: taller, 56px side padding (992–1439px) */
  .gh__bar {
    padding: 18px 56px;
  }

  /* Left column: shrink to flex:1, show nav, hide hamburger */
  .gh__left {
    gap: 0;    /* nav has its own gap */
  }

  .gh__hamburger {
    display: none;
  }

  .gh__logo-wrap--compact {
    display: none;
  }

  .gh__nav {
    display: flex;
    gap: var(--spacing-xxxs);   /* 16px — compact for 992–1199px */
  }

  /* Center logo: visible on DT, absolutely centred with flex trick */
  .gh__logo-wrap--center {
    display: inline-flex;
    flex-shrink: 0;
  }

  /* Location hint label (two-line) visible on DT */
  .gh__location-hint {
    display: block;
  }

  /* Right column: tighter gap on DT */
  .gh__right {
    gap: var(--spacing-xxs);   /* 24px */
  }

  /* Search row: 56px side padding (992–1439px) */
  .gh__search-row {
    padding: 0 48px 12px;
  }

  /* Purchase: wider padding on DT */
  .gh__purchase {
    padding: 12px 24px;
  }
}

/* ─────────────────────────────────────────────────────────
   Desktop  ≥ 1200px  — nav links expand to 32px gap
   ─────────────────────────────────────────────────────── */
@media (min-width: 1200px) {
  .gh__nav {
    gap: var(--spacing-xs);   /* 32px */
  }
}

/* ─────────────────────────────────────────────────────────
   Wide desktop  ≥ 1440px
   ─────────────────────────────────────────────────────── */
@media (min-width: 1440px) {
  .gh__bar {
    padding: 18px 120px;
  }

  .gh__search-row {
    padding: 0 112px 12px;
  }
}
</style>
