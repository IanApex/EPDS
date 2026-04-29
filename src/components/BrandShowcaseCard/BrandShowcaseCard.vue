<script setup lang="ts">
/**
 * BrandShowcaseCard — selectable brand-portfolio card with three
 * visual states: default, hover, and selected.
 *
 * Figma: "Card" (default node `7669:6028`, hover `7669:6031`,
 * selected `7669:6034`). Designed for the Sonic Group's
 * brand-portfolio organism, where the parent renders one card per
 * sub-brand (Sonic Automotive, EchoPark, Tactical Fleet,
 * Powersports, …) and exactly one card is "selected" / expanded
 * at a time. The selected card swaps its dark photo treatment for
 * a bright white scrim, surfaces a coloured logo + descriptive
 * paragraph + brand-specific content (provided via the
 * `#selected-content` slot) + a primary CTA.
 *
 * The molecule is intentionally brand-agnostic: every visual
 * detail that varies per brand (background photo, logos, scrim
 * colours) is a prop. The default scrim values match the Sonic
 * Automotive Figma frame so a Sonic-only consumer can render the
 * card without overriding anything beyond `name`, `imageUrl`,
 * and the two logo URLs.
 *
 * The CTA is a real `BaseButton variant="primary" size="sm"` —
 * brand-themed via the global `--color-btn-primary-*` tokens, so
 * a card automatically inherits the host page's brand colours
 * (red on Sonic, green on EchoPark). If a parent organism needs
 * to render multiple sub-brand cards on the same page, wrap each
 * card in a `data-brand` ancestor so each card's BaseButton
 * picks up the right primary colour.
 *
 * Click semantics:
 * - When **not** selected, clicking anywhere on the card emits
 *   `update:selected: true` (parent toggles state).
 * - When already selected, the card itself is a no-op; only the
 *   inner CTA is interactive. The parent organism owns the
 *   "switch selection" logic — clicking another card in the
 *   group is what flips this one back to collapsed.
 *
 * Accessibility:
 * - Collapsed: card root is `role="button"` with `aria-pressed`
 *   reflecting `selected` state and full keyboard support
 *   (Enter / Space).
 * - Selected: the role / tabindex / aria-pressed come off so the
 *   inner BaseButton is the only interactive element. This keeps
 *   ARIA semantics clean (no nested buttons announced by AT) and
 *   matches the pointer behaviour (the surrounding card is no
 *   longer clickable in the selected state).
 */
import { computed, useSlots } from 'vue'
import BaseButton from '../BaseButton/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    /** Brand name. Used for accessible labels + image alt fallback. */
    name: string
    /**
     * Background photo URL (full-bleed in both collapsed and
     * expanded states). Pre-darkened photography reads best — the
     * default scrim is dark navy at 70 % alpha.
     */
    imageUrl: string
    /**
     * One-line marketing tag rendered below the white logo in the
     * collapsed state. Hidden in the expanded state.
     */
    tagline?: string
    /**
     * URL to the brand's white-knockout logo, used for the
     * collapsed (default + hover) state. Import with `?url`.
     */
    logoLight: string
    /**
     * Optional override for the rendered height of the white
     * logo (px). Defaults to the Figma SA value of `83 px`. Pass
     * a smaller / larger value if a brand's lock-up needs it.
     */
    logoLightHeight?: number
    /**
     * URL to the brand's full-colour logo, shown at the top of
     * the expanded card. Import with `?url`. If omitted, the
     * expanded state falls back to the white logo on a colour-
     * neutral disc (rare — most brands ship a colour mark).
     */
    logoColor?: string
    /**
     * Optional override for the rendered height of the colour
     * logo (px). Defaults to `57 px` (Figma SA value).
     */
    logoColorHeight?: number
    /**
     * Body copy shown below the colour logo in the expanded
     * state. Roboto Regular 14 / 22 / -0.5px.
     */
    description?: string
    /**
     * Override for the hover-state scrim. Defaults to Sonic red
     * at 70 % alpha — match this to your brand's primary colour
     * to keep the hover feel on-brand.
     */
    hoverScrimColor?: string
    /**
     * Override for the default-state scrim. Defaults to the same
     * dark navy used by the homepage hero (`rgba(37, 45, 55, 0.7)`)
     * so dealership photography reads consistently across brands.
     */
    defaultScrimColor?: string
    /**
     * Override for the selected-state scrim. Defaults to white at
     * 90 % alpha so the photo whispers behind the foreground
     * content without competing for attention.
     */
    selectedScrimColor?: string
    /** Label rendered inside the bottom CTA in the expanded state. */
    ctaLabel?: string
    /** Two-way bound selected flag. The parent owns "exactly-one" group logic. */
    selected?: boolean
    /** Optional custom aria-label; falls back to a name-derived label. */
    ariaLabel?: string
  }>(),
  {
    logoLightHeight: 83,
    logoColorHeight: 57,
    hoverScrimColor: 'rgba(242, 73, 34, 0.7)',
    defaultScrimColor: 'rgba(37, 45, 55, 0.7)',
    selectedScrimColor: 'rgba(255, 255, 255, 0.9)',
    selected: false,
  },
)

const emit = defineEmits<{
  'update:selected': [value: boolean]
  /** Fires when the user expands the card (i.e. selects it). */
  'select': [event: Event]
  /** Fires when the user clicks the CTA in the expanded state. */
  'cta-click': [event: MouseEvent]
}>()

const slots = useSlots()
const hasSelectedContent = computed(() => Boolean(slots['selected-content']))

/* CSS custom properties drive the per-state scrim colours and
 * the logo heights. Setting them inline at the root lets scoped
 * CSS use stable selectors (`:hover`, `&--selected`) without
 * needing dynamic class manipulation. */
const rootStyle = computed(() => ({
  '--bsc-default-scrim': props.defaultScrimColor,
  '--bsc-hover-scrim': props.hoverScrimColor,
  '--bsc-selected-scrim': props.selectedScrimColor,
  '--bsc-logo-light-height': `${props.logoLightHeight}px`,
  '--bsc-logo-color-height': `${props.logoColorHeight}px`,
}))

const resolvedAriaLabel = computed(() =>
  props.ariaLabel ??
  (props.selected ? `${props.name} — currently selected` : `Show details for ${props.name}`),
)

function selectCard(event: Event) {
  if (props.selected) return
  emit('update:selected', true)
  emit('select', event)
}

function onClick(event: MouseEvent) {
  selectCard(event)
}

function onKeydown(event: KeyboardEvent) {
  if (props.selected) return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectCard(event)
  }
}

function onCtaClick(event: MouseEvent) {
  /* Stop the click from bubbling to the card root. While the
   * root's click handler is a no-op in the selected state, this
   * future-proofs the component against parents that might
   * re-introduce click-anywhere behaviour. */
  event.stopPropagation()
  emit('cta-click', event)
}
</script>

<template>
  <div
    class="bsc"
    :class="{ 'bsc--selected': selected, 'bsc--collapsed': !selected }"
    :style="rootStyle"
    :role="selected ? undefined : 'button'"
    :tabindex="selected ? undefined : 0"
    :aria-pressed="selected ? undefined : 'false'"
    :aria-label="resolvedAriaLabel"
    @click="onClick"
    @keydown="onKeydown"
  >
    <!-- Background photo + scrim. The image is full-bleed and
         pre-mounted in both states; the scrim layer above swaps
         colour by state (dark navy / brand-colour hover / 90%
         white when selected). -->
    <div class="bsc__bg" aria-hidden="true">
      <img :src="imageUrl" alt="" class="bsc__bg-image" />
      <div class="bsc__scrim" />
    </div>

    <!-- Collapsed (default + hover) content: white logo + tagline,
         vertically centred. -->
    <div v-if="!selected" class="bsc__collapsed">
      <img
        :src="logoLight"
        :alt="`${name} logo`"
        class="bsc__logo-light"
      />
      <p v-if="tagline" class="bsc__tagline">{{ tagline }}</p>
    </div>

    <!-- Expanded (selected) content. Layout:
           [colour logo + description]   ← header
           [#selected-content slot]      ← brand-specific body
           [CTA]                          ← bottom-pinned action
    -->
    <div v-else class="bsc__expanded">
      <div class="bsc__expanded-content">
        <header class="bsc__expanded-header">
          <img
            v-if="logoColor"
            :src="logoColor"
            :alt="`${name} logo`"
            class="bsc__logo-color"
          />
          <p v-if="description" class="bsc__description">
            {{ description }}
          </p>
        </header>

        <div v-if="hasSelectedContent" class="bsc__expanded-body">
          <slot name="selected-content" />
        </div>
      </div>

      <!-- Default CTA: a single primary BaseButton driven by `ctaLabel`.
           Consumers who need richer CTA layouts (e.g. EchoPark's
           primary + secondary pair) can override the entire CTA
           area via the `#cta` slot, which receives the inner
           click handler so analytics still fire from one place. -->
      <div v-if="$slots.cta || ctaLabel" class="bsc__cta-area">
        <slot name="cta" :onCtaClick="onCtaClick">
          <BaseButton
            class="bsc__cta"
            variant="primary"
            size="sm"
            :label="ctaLabel"
            @click="onCtaClick"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── Card root ────────────────────────────────────────────
 * Fixed height (455 px) in both states; width grows from
 * 322 px (collapsed) to 384 px (expanded) per Figma. Both
 * widths are exposed as CSS variables so the parent
 * organism (e.g. `BrandPortfolio`) can override them with
 * flex-friendly values (`auto` collapsed, fixed selected)
 * to make the row reflow as one card expands. The width
 * transition animates the "expand on selection" gesture
 * without re-layout flashing. */
.bsc {
  position: relative;
  flex-shrink: 0;
  width: var(--bsc-width-collapsed, 322px);
  height: var(--bsc-height, 455px);
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  font-family: var(--font-family-brand, var(--font-family-base));
  transition: width 0.3s ease, flex-basis 0.3s ease, flex-grow 0.3s ease;
}

.bsc--selected {
  width: var(--bsc-width-selected, 384px);
  cursor: default;
}

/* Focus ring — only meaningful in the collapsed state, where
 * the card root is the interactive `role="button"` surface.
 * The selected state strips the role so this never fires there. */
.bsc:focus-visible {
  outline: 3px solid var(--color-focus-ring, var(--color-accessibility-80));
  outline-offset: 2px;
}

/* ─── Background photo + scrim ─────────────────────────────
 * The photo + scrim live in a dedicated absolutely-positioned
 * layer below the foreground content so the entire card area
 * (including padding) is covered. The scrim's `background` is
 * the per-state hook — colour + alpha switch via CSS without
 * touching the markup. */
.bsc__bg {
  position: absolute;
  inset: 0;
}

.bsc__bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.bsc__scrim {
  position: absolute;
  inset: 0;
  background: var(--bsc-default-scrim);
  transition: background 0.2s ease;
}

.bsc--collapsed:hover .bsc__scrim {
  background: var(--bsc-hover-scrim);
}

.bsc--selected .bsc__scrim {
  background: var(--bsc-selected-scrim);
}

/* ─── Collapsed content ───────────────────────────────────
 * Vertically + horizontally centred. The white logo height
 * comes from the `--bsc-logo-light-height` var so a brand
 * can override the default 83 px without touching CSS. */
.bsc__collapsed {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  box-sizing: border-box;
}

.bsc__logo-light {
  display: block;
  height: var(--bsc-logo-light-height);
  width: auto;
  max-width: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.bsc__tagline {
  margin: 0;
  font-family: inherit;
  font-size: 18px;
  font-weight: var(--font-weight-light, 300);
  line-height: 1.3;
  letter-spacing: -0.198px;
  color: var(--color-neutral-100);
  text-align: center;
}

/* ─── Expanded content ────────────────────────────────────
 * 24 px inset, vertically distributed: content (logo +
 * description + slot) flexes to fill the card; the CTA is
 * bottom-pinned via the wrapper's `gap: 32px`.
 * NOTE: when the slot is empty, the content area shrinks
 * naturally and the CTA stays at the bottom — no visual
 * jumping for brands that don't ship a logo grid. */
.bsc__expanded {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 24px;
  box-sizing: border-box;
}

.bsc__expanded-content {
  flex: 1 0 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.bsc__expanded-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.bsc__logo-color {
  display: block;
  height: var(--bsc-logo-color-height);
  width: auto;
  max-width: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.bsc__description {
  margin: 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: var(--font-weight-regular, 400);
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: center;
  color: var(--color-neutral-0);
}

.bsc__expanded-body {
  flex: 1 0 0;
  min-height: 0;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
}

/* ─── CTA ──────────────────────────────────────────────────
 * Default render: a single `BaseButton size="sm" variant="primary"`
 * brand-themed via the global `--color-btn-*` tokens (red on
 * Sonic, green on EchoPark). The local override below pins
 * the CTA area to the bottom of the card and lets the slot
 * version center its content (e.g. EchoPark's primary +
 * secondary pair sits in a 16 px-gap row). */
.bsc__cta-area {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.bsc__cta {
  flex-shrink: 0;
}
</style>
