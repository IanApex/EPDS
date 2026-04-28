<script setup lang="ts">
/**
 * Sonic-style global navigation bar — the full organism that ships the
 * five Figma states (Default desktop bar, Variant 2 mobile bar, Variant 3
 * desktop bar with mega-menu open, Variant 4 mobile drawer with parent
 * list, Variant 5 mobile drawer drilled into a parent's submenu).
 *
 * Composes the existing nav atoms:
 *   - `NavItem`            — desktop primary nav links + dropdown triggers
 *   - `NavItemMobile`      — mobile drawer parent rows
 *   - `NavItemSubmenu`     — drilled submenu leaf links
 *   - `MenuToggle`         — mobile hamburger / close
 *   - `NavIconButton`      — favourites + profile icons
 *   - `BaseButton`         — primary CTA ("Join the Sonic Circuit")
 *   - `Divider`            — visual separator inside the drilled submenu
 *
 * Brand awareness: every visual token is brand-tokenised. The primary CTA
 * is `BaseButton variant="primary"` so it themes red on Sonic / green on
 * EchoPark; the active-indicator border (top of mega-menu and mobile
 * drawer) reads from `--color-nav-active-indicator`. Component itself is
 * not brand-locked.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import NavItem        from '../NavItem/NavItem.vue'
import NavItemMobile  from '../NavItemMobile/NavItemMobile.vue'
import NavItemSubmenu from '../NavItemSubmenu/NavItemSubmenu.vue'
import MenuToggle     from '../MenuToggle/MenuToggle.vue'
import NavIconButton  from '../NavIconButton/NavIconButton.vue'
import BaseButton     from '../BaseButton/BaseButton.vue'
import Divider        from '../Divider/Divider.vue'

import heartFilledSvg   from '../../../icon/Style=Account, Detail=Heart-Filled, Icon=NA.svg?raw'
import profileCircleSvg from '../../../icon/Style=Account, Detail=Profile-Circle, Icon=NA.svg?raw'
import leftSvg          from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Left.svg?raw'

import sonicLogoUrl from '../../../Logos/Color=SA-FullColor.svg?url'

// ───────────────────────────────────────────────────────────
// Public types
// ───────────────────────────────────────────────────────────

export interface NavBarLink {
  label: string
  href?: string
}

export interface NavBarSection {
  heading: string
  links: NavBarLink[]
}

export interface NavBarItem {
  /** Stable identifier for tracking which dropdown is open. */
  key: string
  label: string
  /** Direct link target — only used when `dropdown` is omitted. */
  href?: string
  /**
   * When provided, the item becomes a dropdown trigger. Each section
   * renders as a labelled column on desktop and a labelled block in
   * the drilled mobile submenu.
   */
  dropdown?: NavBarSection[]
}

// ───────────────────────────────────────────────────────────
// Props / emits
// ───────────────────────────────────────────────────────────

const props = withDefaults(defineProps<{
  /** Top-level nav items rendered inline (desktop) and as parent rows (mobile). */
  navItems: NavBarItem[]
  logoUrl?: string
  logoHref?: string
  brandName?: string
  ctaLabel?: string
  ctaHref?: string
  favoritesHref?: string
  profileHref?: string
  /** Persistent "current page" state for the favorites icon. */
  favoritesSelected?: boolean
  /** Persistent "current page" state for the profile icon. */
  profileSelected?: boolean
  /**
   * Force the mobile layout regardless of viewport — primarily for
   * Storybook frames where the canvas is narrower than the actual
   * mobile breakpoint media query.
   */
  forceMobile?: boolean
  /**
   * Pin the bar to the top of the viewport with `position: sticky`
   * so the mega-menu and drawer always sit beneath it as the user
   * scrolls. Disable when the host page already has a top-level
   * sticky element (e.g. the SRP sidebar at `top: 0`) to avoid
   * stacking conflicts.
   */
  sticky?: boolean
}>(), {
  logoUrl: sonicLogoUrl,
  logoHref: '/',
  brandName: 'Sonic Automotive',
  ctaLabel: 'Join the Sonic Circuit',
  ctaHref: undefined,
  favoritesHref: '/favorites',
  profileHref: '/account',
  favoritesSelected: false,
  profileSelected: false,
  forceMobile: false,
  sticky: true,
})

const emit = defineEmits<{
  'cta-click':        [event: MouseEvent]
  'favorites-click':  [event: MouseEvent]
  'profile-click':    [event: MouseEvent]
  /** Fired when a leaf link inside a dropdown section is clicked. */
  'submenu-link-click': [payload: { item: NavBarItem; link: NavBarLink; event: MouseEvent }]
  /** Fired when a non-dropdown nav item is clicked (e.g. Sell/Trade). */
  'nav-item-click':     [payload: { item: NavBarItem; event: MouseEvent }]
}>()

// ───────────────────────────────────────────────────────────
// State
// ───────────────────────────────────────────────────────────

/** Desktop: which dropdown (by key) is currently open. */
const desktopActiveKey = ref<string | null>(null)

/** Mobile: is the drawer open at all? */
const mobileOpen = ref(false)

/** Mobile: which parent has the user drilled into? */
const mobileDrillKey = ref<string | null>(null)

const rootRef = ref<HTMLElement | null>(null)

const activeDesktopItem = computed(() =>
  props.navItems.find(i => i.key === desktopActiveKey.value && i.dropdown) ?? null,
)

const drilledMobileItem = computed(() =>
  props.navItems.find(i => i.key === mobileDrillKey.value && i.dropdown) ?? null,
)

// ───────────────────────────────────────────────────────────
// Desktop dropdown handlers
// ───────────────────────────────────────────────────────────

function onDropdownUpdate(key: string, next: boolean) {
  // When a `NavItem dropdown` toggles, mirror it onto our single-active
  // tracker. Opening one dropdown closes any other that's open.
  desktopActiveKey.value = next ? key : (desktopActiveKey.value === key ? null : desktopActiveKey.value)
}

function onPlainNavClick(item: NavBarItem, event: MouseEvent) {
  // Plain (non-dropdown) link — emit and let the parent (or the anchor's
  // own href) handle navigation. We also collapse any open dropdown.
  desktopActiveKey.value = null
  emit('nav-item-click', { item, event })
}

function onSubmenuLinkClick(item: NavBarItem, link: NavBarLink, event: MouseEvent) {
  // Close menus on navigation so the next page renders cleanly.
  desktopActiveKey.value = null
  mobileOpen.value = false
  mobileDrillKey.value = null
  emit('submenu-link-click', { item, link, event })
}

// ───────────────────────────────────────────────────────────
// Mobile drawer handlers
// ───────────────────────────────────────────────────────────

function onHamburgerToggle(next: boolean) {
  mobileOpen.value = next
  if (!next) mobileDrillKey.value = null
}

function drillInto(item: NavBarItem) {
  // Mobile: clicking a parent row with a dropdown drills into the submenu.
  // Plain rows just route via their own anchor / emit.
  if (item.dropdown && item.dropdown.length > 0) {
    mobileDrillKey.value = item.key
  } else {
    mobileOpen.value = false
    emit('nav-item-click', { item, event: new MouseEvent('click') })
  }
}

function drillOut() {
  mobileDrillKey.value = null
}

function onCtaClick(event: MouseEvent) {
  // Honour an explicit `ctaHref` so callers don't have to wrap the bar in
  // their own anchor — but always emit so analytics / parent listeners fire.
  if (props.ctaHref && typeof window !== 'undefined') {
    window.location.href = props.ctaHref
  }
  emit('cta-click', event)
}

// ───────────────────────────────────────────────────────────
// Click-outside + ESC handling
// ───────────────────────────────────────────────────────────

function onDocumentClick(event: MouseEvent) {
  if (!desktopActiveKey.value) return
  const target = event.target as Node | null
  if (rootRef.value && target && !rootRef.value.contains(target)) {
    desktopActiveKey.value = null
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  // Priority: drilled submenu → parent drawer → desktop dropdown.
  if (mobileDrillKey.value) {
    mobileDrillKey.value = null
    return
  }
  if (mobileOpen.value) {
    mobileOpen.value = false
    return
  }
  if (desktopActiveKey.value) {
    desktopActiveKey.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})

// Body scroll lock while the mobile drawer is open. Mirrors the
// pattern used by `Overlay`.
const lockedScrollY = ref(0)
watch(mobileOpen, (open) => {
  if (open) {
    lockedScrollY.value = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${lockedScrollY.value}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
  } else {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    window.scrollTo(0, lockedScrollY.value)
  }
})
</script>

<template>
  <header
    ref="rootRef"
    class="snb"
    :class="{
      'snb--mobile-forced': forceMobile,
      'snb--megamenu-open': !!activeDesktopItem,
      'snb--drawer-open': mobileOpen,
      'snb--sticky': sticky,
    }"
  >
    <!-- ─────────────────────── Top toolbar ─────────────────────── -->
    <div class="snb__bar">
      <a class="snb__logo" :href="logoHref" :aria-label="brandName + ' home'">
        <img :src="logoUrl" :alt="brandName" />
      </a>

      <!-- Desktop primary nav (hidden on mobile via CSS) -->
      <nav class="snb__nav" :aria-label="brandName + ' primary navigation'">
        <NavItem
          v-for="item in navItems"
          :key="item.key"
          :label="item.label"
          :dropdown="!!item.dropdown"
          :href="item.dropdown ? undefined : item.href"
          :active="desktopActiveKey === item.key"
          @update:active="(next) => onDropdownUpdate(item.key, next)"
          @click="(e: MouseEvent) => !item.dropdown && onPlainNavClick(item, e)"
        />
      </nav>

      <!-- Right-hand utility cluster -->
      <div class="snb__utility">
        <div class="snb__icons">
          <NavIconButton
            :ariaLabel="'Saved favorites'"
            :href="favoritesHref"
            :selected="favoritesSelected"
            @click="(e: MouseEvent) => emit('favorites-click', e)"
          >
            <template #icon><span v-html="heartFilledSvg" /></template>
          </NavIconButton>
          <NavIconButton
            :ariaLabel="'Account profile'"
            :href="profileHref"
            :selected="profileSelected"
            @click="(e: MouseEvent) => emit('profile-click', e)"
          >
            <template #icon><span v-html="profileCircleSvg" /></template>
          </NavIconButton>
        </div>

        <!-- Desktop CTA (hidden on mobile via CSS) -->
        <BaseButton
          class="snb__cta-desktop"
          variant="primary"
          size="sm"
          :label="ctaLabel"
          @click="onCtaClick"
        />

        <!-- Mobile hamburger toggle (hidden on desktop via CSS) -->
        <MenuToggle
          class="snb__hamburger"
          :open="mobileOpen"
          @update:open="onHamburgerToggle"
        />
      </div>
    </div>

    <!-- ──────────────── Desktop mega-menu panel ───────────────── -->
    <div
      v-if="activeDesktopItem"
      class="snb__megamenu"
      role="region"
      :aria-label="activeDesktopItem.label + ' menu'"
    >
      <div class="snb__megamenu-inner">
        <section
          v-for="section in activeDesktopItem.dropdown"
          :key="section.heading"
          class="snb__section"
        >
          <h3 class="snb__section-heading">{{ section.heading }}</h3>
          <ul class="snb__section-list">
            <li
              v-for="link in section.links"
              :key="link.label"
              class="snb__section-item"
            >
              <a
                :href="link.href"
                class="snb__section-link"
                @click="(e: MouseEvent) => onSubmenuLinkClick(activeDesktopItem!, link, e)"
              >{{ link.label }}</a>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- ────────────────── Mobile drawer pane ──────────────────── -->
    <div
      v-if="mobileOpen"
      class="snb__drawer"
      :aria-label="brandName + ' navigation menu'"
    >
      <!-- Parent list (Variant 4) -->
      <div
        v-if="!drilledMobileItem"
        class="snb__drawer-parent"
        role="navigation"
        :aria-label="brandName + ' main menu'"
      >
        <ul class="snb__drawer-list">
          <li v-for="item in navItems" :key="item.key" class="snb__drawer-row">
            <NavItemMobile
              :label="item.label"
              :href="item.dropdown ? undefined : item.href"
              @click="(e: MouseEvent) => { e.preventDefault?.(); drillInto(item) }"
            />
          </li>
        </ul>

        <BaseButton
          class="snb__cta-mobile"
          variant="primary"
          size="sm"
          :label="ctaLabel"
          @click="onCtaClick"
        />
      </div>

      <!-- Drilled submenu (Variant 5) -->
      <div
        v-else
        class="snb__drawer-submenu"
        role="navigation"
        :aria-label="drilledMobileItem.label + ' submenu'"
      >
        <button
          type="button"
          class="snb__back"
          @click="drillOut"
        >
          <span class="snb__back-icon" v-html="leftSvg" />
          <span class="snb__back-label">{{ drilledMobileItem.label }}</span>
        </button>

        <template v-for="(section, sectionIdx) in drilledMobileItem.dropdown" :key="section.heading">
          <Divider
            v-if="sectionIdx > 0"
            class="snb__submenu-divider"
            color="light"
          />
          <section class="snb__submenu-section">
            <h3 class="snb__section-heading">{{ section.heading }}</h3>
            <ul class="snb__submenu-list">
              <li
                v-for="link in section.links"
                :key="link.label"
                class="snb__submenu-item"
              >
                <NavItemSubmenu
                  :label="link.label"
                  :href="link.href"
                  @click="(e: MouseEvent) => onSubmenuLinkClick(drilledMobileItem!, link, e)"
                />
              </li>
            </ul>
          </section>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ───────────────────────────────────────────────────────────
 * Root
 * Translucent backdrop-blurred surface matching the Figma
 * frame: rgba(255,255,255,0.95) + 6.75px blur + soft drop
 * shadow. The header is `position: sticky` so the mega-menu
 * and mobile drawer slide out without losing context.
 * ─────────────────────────────────────────────────────────── */
.snb {
  position: relative;
  z-index: 100;

  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6.75px);
  -webkit-backdrop-filter: blur(6.75px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);

  font-family: var(--font-family-brand);
  color: var(--color-nav-text);
}

.snb--sticky {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
}

/* ─────────────────────── Toolbar (desktop default) ─────── */
.snb__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  height: 72px;
  padding: 16px 80px;
}

.snb__logo {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
}

.snb__logo img {
  display: block;
  height: 41px;
  width: auto;
}

/* Desktop primary nav (inline links) */
.snb__nav {
  display: flex;
  align-items: center;
  gap: 49px;
  flex: 1 1 auto;
  min-width: 0;
}

.snb__utility {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}

.snb__icons {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* Mobile-only chrome — hidden on desktop */
.snb__hamburger {
  display: none;
}

/* ─────────────────────── Mega-menu panel (Variant 3) ──── */
.snb__megamenu {
  /* Absolutely positioned beneath the toolbar so opening the menu
   * overlays page content instead of pushing it down. `top: 100%`
   * pins it directly under whatever the bar's current height
   * resolves to (72px desktop / 64px mobile-forced), and `left/right: 0`
   * stretches it the full width of the sticky header. The header's
   * own `z-index: 100` carries through the absolutely-positioned
   * child, so result tiles / chips bar / sticky sidebar all sit
   * beneath it. The brand-coloured top border is the "active nav
   * surface" cue (Sonic dark red, EchoPark green). */
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border-top: 1px solid var(--color-nav-active-indicator);
  padding: 40px 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6.75px);
  -webkit-backdrop-filter: blur(6.75px);
  /* Soft drop shadow mirrors the bar's own elevation so the
   * floating panel reads as part of the header surface. */
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);
}

.snb__megamenu-inner {
  display: flex;
  align-items: flex-start;
  gap: 119px;
  max-width: 1280px;
}

.snb__section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.snb__section-heading {
  margin: 0;
  font-size: 18px;
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  color: var(--color-nav-text);
}

.snb__section-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Desktop mega-menu lays out a "Shop by type" section in two columns
 * via flex-wrap once it grows past ~280px. */
.snb__section:nth-child(2) .snb__section-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  column-gap: 70px;
  row-gap: 16px;
  min-width: 380px;
}

.snb__section-link {
  font-size: 16px;
  font-weight: var(--font-weight-regular);
  line-height: 1.5;
  letter-spacing: -0.032px;
  color: var(--color-nav-text);
  text-decoration: none;
  transition: color 0.12s ease;
}

.snb__section-link:hover {
  color: var(--color-nav-text-hover);
  text-decoration: underline;
}

.snb__section-link:focus-visible {
  outline: 3px solid var(--color-nav-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─────────────────────── Mobile drawer (Variant 4 + 5) ── */
.snb__drawer {
  /* The drawer fills the viewport below the 64px mobile toolbar.
   * `border-top` lights up the active-indicator colour to mirror
   * the desktop mega-menu treatment. */
  display: none;
  border-top: 1px solid var(--color-nav-active-indicator);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6.75px);
  -webkit-backdrop-filter: blur(6.75px);
  padding: 32px 24px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.snb__drawer-parent {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 40px;
}

.snb__drawer-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1 1 auto;
}

.snb__drawer-row {
  display: block;
}

.snb__cta-mobile {
  width: 100%;
  max-width: none;
  margin-top: auto;
}

/* Drilled submenu (Variant 5) */
.snb__drawer-submenu {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.snb__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 3px solid transparent;
  padding: 0 4px;
  cursor: pointer;
  color: var(--color-nav-text);
  box-sizing: border-box;
}

.snb__back:hover {
  color: var(--color-nav-text-hover);
}

.snb__back:focus-visible {
  outline: none;
  border-color: var(--color-nav-focus-ring);
}

.snb__back-icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
}

.snb__back-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.snb__back-icon :deep(path) {
  fill: currentColor;
}

.snb__back-label {
  /* Drilled-in title: 20px Roboto Black 900 — the design treats it
   * as the active "you are here" header rather than a section title. */
  font-size: 20px;
  font-weight: 900;
  font-variation-settings: 'wdth' 100;
  line-height: 1.5;
  letter-spacing: -0.04px;
  color: var(--color-nav-text);
}

.snb__submenu-section {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.snb__submenu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.snb__submenu-item {
  display: block;
}

.snb__submenu-divider {
  margin: 8px 0;
  width: 290px;
  max-width: 100%;
}

/* ─────────────────────── Responsive ─────────────────────── */
/* Mid-range desktop (1280–1439): the Figma spec is tuned to a
 * 1440 viewport with 80 px gutters + 49 px nav gap. Below 1440
 * the primary nav items collide with the utility cluster. We
 * reclaim horizontal real estate progressively — first by
 * dropping the 80 px page gutter to 32 px, then by tightening
 * the nav-item gap and the cluster spacing — so the desktop
 * layout keeps working all the way down to the 1024 mobile
 * breakpoint without dropping any nav links or CTAs. */
@media (max-width: 1439.98px) and (min-width: 1024px) {
  .snb__bar {
    padding-left: 32px;
    padding-right: 32px;
    gap: 24px;
  }
  .snb__nav {
    gap: 32px;
  }
  .snb__megamenu {
    padding-left: 32px;
    padding-right: 32px;
  }
}

/* Tighter still between 1024 and 1280: drop the nav gap and the
 * utility cluster's internal gaps so the long Sonic primary-nav
 * labels ("Service, parts & gear", "Our Company") don't run into
 * the icons + CTA. */
@media (max-width: 1279.98px) and (min-width: 1024px) {
  .snb__nav {
    gap: 24px;
  }
  .snb__utility,
  .snb__icons {
    gap: 16px;
  }
}

/* Below 1200 the long Sonic primary-nav labels still overlap the
 * utility cluster even at the tightest gap. Drop the desktop CTA
 * ("Join the Sonic Circuit") so the icons can sit flush next to
 * the nav. The CTA still appears in the mobile drawer (<1024) and
 * at 1200+ desktop. */
@media (max-width: 1199.98px) and (min-width: 1024px) {
  .snb__cta-desktop {
    display: none;
  }
}

/* Mobile <1024px: collapse the desktop nav + CTA, surface the
 * hamburger, swap in the drawer below the bar. The `forceMobile`
 * prop applies the same rules unconditionally for Storybook
 * frames where the canvas is narrower than the viewport. */
@media (max-width: 1023.98px) {
  .snb__bar {
    height: 64px;
    padding: 11px 24px;
    gap: 24px;
  }

  .snb__logo img {
    height: 37px;
  }

  .snb__nav,
  .snb__cta-desktop {
    display: none;
  }

  .snb__hamburger {
    display: inline-flex;
  }

  .snb__megamenu {
    display: none;
  }

  .snb__drawer {
    display: block;
  }
}

/* Forced mobile (Storybook narrow frames) */
.snb--mobile-forced .snb__bar {
  height: 64px;
  padding: 11px 24px;
  gap: 24px;
}
.snb--mobile-forced .snb__logo img { height: 37px; }
.snb--mobile-forced .snb__nav,
.snb--mobile-forced .snb__cta-desktop { display: none; }
.snb--mobile-forced .snb__hamburger { display: inline-flex; }
.snb--mobile-forced .snb__megamenu { display: none; }
.snb--mobile-forced .snb__drawer { display: block; }
</style>
