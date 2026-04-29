<script setup lang="ts">
/**
 * StackingCardSection — scroll-driven stacking card organism.
 *
 * Figma: "Group 254" (node 7693:2907). The left frame shows the
 * three cards fully expanded (Drive / Sell / Service); the right
 * frame shows the end-state where lower cards have risen to cover
 * the ones above, leaving only each card's icon + heading strip
 * peeking out.
 *
 * Scroll mechanics
 * ────────────────
 * The section is taller than the viewport by `totalScroll` px.
 * An inner sticky wrapper locks to `top: 0` and acts as the
 * "camera" for the animation. Cards are absolutely positioned
 * inside it and translated upward as the user scrolls, using
 * `translate3d` for GPU compositing with no layout reflow.
 *
 * At progress = 0 (section just entered viewport):
 *   Card 0 is fully visible; cards 1 and 2 are below the fold,
 *   clipped by `overflow: hidden` on the sticky wrapper.
 *
 * At progress = 1 (bottom of scroll track reached):
 *   Every card has risen to its stacked position — only the
 *   top `PEEK_H` px of each earlier card remains visible.
 *   The last card is fully expanded at the bottom.
 *
 * translateY for card i = (i × PEEK_H − i × (CARD_H + GAP)) × progress
 *                       = −i × (CARD_H + GAP − PEEK_H) × progress
 *
 * z-index increases with card index so later cards always render
 * on top of earlier ones — "lower card covers the one above it."
 *
 * On mobile (< 600 px) the animation is disabled; cards render
 * as a plain vertical stack in normal document flow.
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ImageContentCard from '../ImageContentCard/ImageContentCard.vue'

/** One card's worth of data — mirrors `ImageContentCard`'s public props. */
export interface StackingCardEntry {
  imageUrl: string
  imageAlt?: string
  iconSvg?: string
  heading: string
  body: string
  ctaLabel: string
  imagePosition?: 'left' | 'right'
  imageProportion?: 'large' | 'small'
}

const CARD_H     = 447   // px — ImageContentCard fixed height
const GAP        = 34    // px — gap between cards in the expanded state
const PEEK_H     = 80    // px — strip of each earlier card that remains visible when stacked
const SCALE_MIN  = 0.95  // scale of a card at the moment it is fully covered

const props = withDefaults(
  defineProps<{
    /** Section heading (e.g. "Car ownership made easy"). */
    title: string
    /** Optional sub-heading below the title. */
    subtitle?: string
    /** Cards rendered in top-to-bottom order. Designed for 3 items. */
    cards: StackingCardEntry[]
    /**
     * Pixels from the viewport top where the sticky wrapper should lock.
     * Set this to the height of any fixed/sticky nav bar so the sticky
     * content starts below it rather than behind it.
     * Default: 0 (flush with viewport top).
     */
    stickyOffset?: number
  }>(),
  { stickyOffset: 0 },
)

const emit = defineEmits<{
  /**
   * Fired when a card's CTA is clicked.
   * `index` is the 0-based position in the `cards` array.
   */
  'cta-click': [{ index: number; event: MouseEvent }]
}>()

// ─── Scroll state ──────────────────────────────────────────

const sectionRef   = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)
const shouldAnimate  = ref(false)

/** Extra px the section extends beyond 100vh to create scroll distance. */
const totalScroll = computed(() =>
  (props.cards.length - 1) * (CARD_H + GAP - PEEK_H),
)

/** Natural (un-translated) height of the cards block. */
const naturalCardsHeight = computed(() =>
  props.cards.length * CARD_H + (props.cards.length - 1) * GAP,
)

function updateProgress() {
  if (!sectionRef.value || !shouldAnimate.value) return
  const top = sectionRef.value.getBoundingClientRect().top
  // Animation starts when section.top reaches stickyOffset (nav bottom),
  // not when it reaches 0 (viewport top).
  scrollProgress.value = Math.max(0, Math.min(1, (props.stickyOffset - top) / totalScroll.value))
}

let rafId: number | null = null
function onScroll() {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    updateProgress()
    rafId = null
  })
}

onMounted(() => {
  shouldAnimate.value = window.matchMedia('(min-width: 600px)').matches
  window.addEventListener('scroll', onScroll, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  if (rafId !== null) cancelAnimationFrame(rafId)
})

// ─── Derived styles ─────────────────────────────────────────

/**
 * CSS custom properties injected on the section root so the
 * stylesheet can reference them without inline duplication.
 */
const sectionStyle = computed(() =>
  shouldAnimate.value
    ? {
        '--scss-total-scroll': `${totalScroll.value}px`,
        '--scss-sticky-top':   `${props.stickyOffset}px`,
      }
    : {},
)

/**
 * Position + transform for each card wrapper.
 *
 * Sequential stacking: the N-1 card transitions are divided into
 * N-1 equal scroll segments.  Card i (i ≥ 1) only begins rising
 * once segment i-1 has fully completed — i.e. the previous card
 * is already fully covered before the next one starts moving.
 *
 * Scale: while card i is being covered (during segment i), it
 * shrinks from 1 → SCALE_MIN, anchored at its top edge, giving
 * a depth-receding effect as the covering card slides over it.
 */
const cardWrapStyles = computed(() => {
  const n        = props.cards.length
  const segments = Math.max(n - 1, 1)

  return props.cards.map((_, i) => {
    if (!shouldAnimate.value) return {}

    const naturalTop = i * (CARD_H + GAP)

    // ── Translation ────────────────────────────────────────
    // Card i accumulates a delta for every segment k < i:
    //   • During segment k = i-1 it overlaps the card above it.
    //   • During segments k < i-1 it follows the card above,
    //     preserving the gap while that card does its own overlap.
    // This means card 2 glides with card 1 during segment 0, then
    // only starts its own overlap once segment 0 is complete.
    let translateY = 0
    for (let k = 0; k < i; k++) {
      const segStart = k / segments
      const segEnd   = (k + 1) / segments
      const p = Math.max(0, Math.min(1,
        (scrollProgress.value - segStart) / (segEnd - segStart),
      ))
      translateY -= (CARD_H + GAP - PEEK_H) * p
    }

    // ── Scale ──────────────────────────────────────────────
    // Scale compounds across every segment from i onward: card 0
    // is multiplied down by each subsequent stacking event, so it
    // ends up smaller than card 1 which ends up smaller than card 2.
    // transform-origin: top center keeps the peek strip anchored.
    let scale = 1
    for (let k = i; k < n - 1; k++) {
      const segStart = k / segments
      const segEnd   = (k + 1) / segments
      const p = Math.max(0, Math.min(1,
        (scrollProgress.value - segStart) / (segEnd - segStart),
      ))
      scale *= 1 - (1 - SCALE_MIN) * p
    }

    return {
      top: `${naturalTop}px`,
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      zIndex: i + 1,
    }
  })
})

/** Height of the cards container (needed for absolute child flow). */
const cardsContainerStyle = computed(() =>
  shouldAnimate.value ? { height: `${naturalCardsHeight.value}px` } : {},
)

function onCtaClick(index: number, event: MouseEvent) {
  emit('cta-click', { index, event })
}
</script>

<template>
  <section
    ref="sectionRef"
    class="scss"
    :class="{ 'scss--animated': shouldAnimate }"
    :style="sectionStyle"
    :aria-label="title"
  >
    <!-- Sticky viewport: locks in place while the scroll track plays out.
         overflow:hidden clips cards that are still below the fold. -->
    <div class="scss__sticky">
      <header class="scss__header">
        <h2 class="scss__title">{{ title }}</h2>
        <p v-if="subtitle" class="scss__subtitle">{{ subtitle }}</p>
      </header>

      <!-- Cards container: in animated mode, cards are absolutely
           positioned here with JS transforms; in mobile/fallback
           mode, flex column with gap. -->
      <div class="scss__cards" :style="cardsContainerStyle">
        <div
          v-for="(card, i) in cards"
          :key="card.heading"
          class="scss__card"
          :style="cardWrapStyles[i]"
        >
          <!--
            contentAlign="top" anchors the heading to the card's
            top edge so it stays visible inside the PEEK_H strip
            when a later card slides up over this one.
            On mobile (shouldAnimate=false) we pass 'center' so
            standalone cards look balanced.
          -->
          <ImageContentCard
            v-bind="card"
            :content-align="shouldAnimate ? 'top' : 'center'"
            @cta-click="onCtaClick(i, $event)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Section (scroll track) ───────────────────────────────
 * Height = (viewport area below the nav) + totalScroll.
 * Subtracting --scss-sticky-top ensures the section bottom
 * hits the viewport bottom exactly when the animation
 * completes — no dead scroll and no trailing whitespace. */
.scss--animated {
  height: calc(100vh - var(--scss-sticky-top, 0px) + var(--scss-total-scroll));
}

/* ─── Sticky viewport ──────────────────────────────────────
 * Animated: position:sticky + overflow:hidden acts as the
 * "camera". top = nav height so the content locks just below
 * the nav instead of behind it. height fills the remaining
 * viewport below that offset.
 * Mobile: drops to relative flow with visible overflow so
 * all cards render naturally. */
.scss__sticky {
  display: flex;
  flex-direction: column;
  gap: 88px;
  padding: 60px 80px 0;
  box-sizing: border-box;
}

.scss--animated .scss__sticky {
  position: sticky;
  top: var(--scss-sticky-top, 0px);
  height: calc(100vh - var(--scss-sticky-top, 0px));
  overflow: hidden;
}

/* ─── Header ───────────────────────────────────────────────
 * Matches the Figma title block: 42px bold heading + 24px
 * light subtitle, 8px gap, dark text. */
.scss__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.scss__title {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: var(--font-weight-bold, 700);
  font-size: 42px;
  line-height: 54px;
  letter-spacing: -1.2px;
  color: var(--color-neutral-0);
}

.scss__subtitle {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: var(--font-weight-light, 300);
  font-size: 24px;
  line-height: 1.3;
  letter-spacing: -0.264px;
  color: var(--color-neutral-0);
}

/* ─── Cards container ──────────────────────────────────────
 * Animated: height set via inline style (naturalCardsHeight)
 * to give absolutely-positioned children a containing block.
 * Mobile: flex column with gap — normal stacked layout. */
.scss__cards {
  position: relative;
  width: 100%;
  flex: 1 1 auto;
}

.scss:not(.scss--animated) .scss__cards {
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: auto;
}

/* ─── Card wrapper ─────────────────────────────────────────
 * Animated: absolutely positioned + GPU-composited transform.
 * will-change:transform tells the browser to promote this
 * layer ahead of time, eliminating paint during scroll.
 * Mobile: relative flow, transform reset. */
.scss--animated .scss__card {
  position: absolute;
  left: 0;
  right: 0;
  will-change: transform;
  transform-origin: top center;
}

/* ─── Mobile (≤ 599px) ─────────────────────────────────────
 * Tighter padding, smaller heading. Cards render in normal
 * document flow — no stacking animation. */
@media (max-width: 599.98px) {
  .scss__sticky {
    gap: 40px;
    padding: 40px 24px 0;
  }

  .scss__title {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -0.8px;
  }

  .scss__subtitle {
    font-size: 18px;
  }
}
</style>
