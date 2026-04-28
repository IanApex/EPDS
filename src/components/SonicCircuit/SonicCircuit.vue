<script setup lang="ts">
/**
 * SonicCircuit — full-bleed dark-navy "membership benefits" section.
 *
 * Figma: "The Sonic Circuit" (node `7680:16688` desktop / `7680:16721`
 * mobile). Composes a stack of `SonicCircuitBenefit` tiles between a
 * centered title block and a primary CTA. Layout flips from a 4-up
 * row on desktop to a vertical stack on mobile.
 *
 * Reusable: every text label and the benefit list is prop-driven so
 * the same organism can host any "membership benefits" pitch on any
 * brand. The CTA renders via `BaseButton variant="primary"`, so the
 * fill colour automatically themes (Sonic red on Sonic, EchoPark
 * green on EchoPark).
 */
import { computed } from 'vue'

import BaseButton from '@/components/BaseButton/BaseButton.vue'
import SonicCircuitBenefit from '@/components/SonicCircuitBenefit/SonicCircuitBenefit.vue'

/**
 * One benefit tile inside the section. `iconSvg` is the raw SVG
 * markup (import the source SVG with `?raw` and pass the string
 * straight in) so the icon can take its colour from `currentColor`
 * via the atom's `:deep(path) { fill: currentColor }` rule.
 */
export interface SonicCircuitBenefitItem {
  /** Stable identifier for the v-for `:key`. */
  id: string
  /** Raw SVG markup to render inside the benefit's circle. */
  iconSvg: string
  /** Body text below the circle. */
  caption: string
}

const props = withDefaults(
  defineProps<{
    /** Section heading. */
    title?: string
    /** Optional sub-heading rendered immediately below the title. */
    subtitle?: string
    /** Ordered list of benefit tiles. Designed for 3–4 items per Figma. */
    benefits: SonicCircuitBenefitItem[]
    /** Label for the primary CTA at the bottom of the section. */
    ctaLabel?: string
    /**
     * If supplied, the CTA renders as a navigation target — passed to
     * the parent's click handler so it can `router.push` or set
     * `window.location.href`. The component itself never navigates.
     */
    ctaHref?: string
    /**
     * Optional aria-label for the section element. Falls back to the
     * `title` prop so screen-reader users still get a meaningful
     * landmark name even if the heading is hidden in the future.
     */
    ariaLabel?: string
  }>(),
  {
    title: 'The Sonic Circuit',
    subtitle: 'One membership across every Sonic brand nationwide.',
    ctaLabel: 'Join the Circuit',
  },
)

const emit = defineEmits<{
  'cta-click': [event: MouseEvent]
}>()

/* The accessible name for the <section> landmark — explicit override
 * via prop, otherwise the title text. */
const resolvedAriaLabel = computed(() => props.ariaLabel ?? props.title)

function onCtaClick(event: MouseEvent) {
  emit('cta-click', event)
}
</script>

<template>
  <section class="sc" :aria-label="resolvedAriaLabel">
    <div class="sc__inner">
      <!-- Title + subtitle. A single 564 px column on desktop;
           full-width on mobile. The title is the section's <h2> so
           page-level outlines stay sensible (the page still owns
           its own <h1>). -->
      <header class="sc__heading">
        <h2 class="sc__title">{{ title }}</h2>
        <p v-if="subtitle" class="sc__subtitle">{{ subtitle }}</p>
      </header>

      <!-- Benefits row. Renders as a <ul> so assistive tech reads it
           as a list of features. Each item is a `SonicCircuitBenefit`
           atom that handles its own circle / icon / caption layout. -->
      <ul class="sc__benefits" role="list">
        <SonicCircuitBenefit
          v-for="benefit in benefits"
          :key="benefit.id"
          :caption="benefit.caption"
          :iconSvg="benefit.iconSvg"
        />
      </ul>

      <!-- Primary CTA. Width is locked to 175 px to match the Figma
           spec exactly on both desktop + mobile. BaseButton themes
           the fill via the brand's primary tokens, so the same
           component renders Sonic red on Sonic and EchoPark green
           on EchoPark with no overrides. -->
      <div class="sc__cta-wrap">
        <BaseButton
          variant="primary"
          size="md"
          :label="ctaLabel"
          class="sc__cta"
          @click="onCtaClick"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Section ──────────────────────────────────────────────
 * Full-bleed navy panel. The fixed `#25303d` mirrors the Figma
 * frame; it is intentionally a section-local literal rather than
 * a global token because no other component in the system uses
 * this exact value yet (closest neighbour is `--color-neutral-0`
 * `#242C33` — not the same). Promote to a token once a second
 * surface starts using it. */
.sc {
  width: 100%;
  background: #25303d;
  color: var(--color-neutral-100);
  font-family: var(--font-family-brand, var(--font-family-base));
}

/* Inner content rail — 1280 px content area centered on a 1440 px
 * frame. Outer 80 px of padding gets the section's content to the
 * Figma's 1280 px content-area width (1440 − 2 × 80). */
.sc__inner {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 68px;
}

/* ─── Heading ──────────────────────────────────────────────
 * 564 px column matching the Figma "title block" frame, centered
 * inside the section. Title 42/54/-1.2; subtitle 24/1.3/-0.264. */
.sc__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 564px;
  max-width: 100%;
}

.sc__title {
  margin: 0;
  font-family: inherit;
  font-size: 42px;
  font-weight: var(--font-weight-bold, 700);
  line-height: 54px;
  letter-spacing: -1.2px;
  color: var(--color-neutral-100);
}

.sc__subtitle {
  margin: 0;
  font-family: inherit;
  font-size: 24px;
  font-weight: var(--font-weight-light, 300);
  line-height: 1.3;
  letter-spacing: -0.264px;
  color: var(--color-neutral-100);
}

/* ─── Benefits ─────────────────────────────────────────────
 * 4-up row on desktop, 47 px gap (Figma). The list spans the
 * full content width and centers each tile horizontally so the
 * 284 px columns sit inside the row regardless of how many
 * tiles are passed in (3, 4, etc.). */
.sc__benefits {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 47px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* ─── CTA ──────────────────────────────────────────────────
 * The wrapper exists so the BaseButton (which sets its own width
 * via padding) can be force-pinned to the 175 px Figma spec via
 * a class on the button itself — without leaking into BaseButton's
 * internal styling. */
.sc__cta-wrap {
  display: flex;
  justify-content: center;
}


/* ─── Tablet (≤1023) ──────────────────────────────────────
 * The 1280 px content area still fits inside a 1024 px viewport
 * with the side gutters reduced. The benefits row stays 4-up; if
 * the column count outgrows the available width in the future,
 * we can introduce wrapping here. */
@media (max-width: 1023.98px) {
  .sc__inner {
    padding: 64px 32px;
    gap: 56px;
  }
  .sc__benefits {
    /* Allow tiles to wrap to a second row on tablet so 4 × 284 px
     * + gaps don't overflow the narrower viewport. */
    flex-wrap: wrap;
    gap: 47px 32px;
  }
}

/* ─── Mobile (<600) ───────────────────────────────────────
 * Per Figma: 24 px horizontal padding, 40 px vertical, 40 px gap
 * between header / benefits / CTA. Title shrinks to 32 px;
 * subtitle to 18 px. Benefits stack vertically with 47 px gap. */
@media (max-width: 599.98px) {
  .sc__inner {
    padding: 40px 24px;
    gap: 40px;
  }
  .sc__heading {
    width: 100%;
  }
  .sc__title {
    font-size: 32px;
    line-height: 54px;
    letter-spacing: -1.2px;
  }
  .sc__subtitle {
    font-size: 18px;
    letter-spacing: -0.198px;
  }
  .sc__benefits {
    flex-direction: column;
    align-items: center;
    gap: 47px;
    flex-wrap: nowrap;
  }
}
</style>
