<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import ImageContentCard from '../ImageContentCard/ImageContentCard.vue'

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

const CARD_H    = 447   // px — ImageContentCard fixed height
const GAP       = 34    // px — gap between cards in expanded state
const PEEK_H    = 80    // px — visible strip of a covered card
const SCALE_MIN = 0.95  // scale of a card when fully covered

const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    cards: StackingCardEntry[]
    /** Height of any fixed nav above, so sticky content locks below it. */
    stickyOffset?: number
  }>(),
  { stickyOffset: 0 },
)

const emit = defineEmits<{
  'cta-click': [{ index: number; event: MouseEvent }]
}>()

const sectionRef     = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)
const shouldAnimate  = ref(false)
const isMobile       = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 599
}

// On mobile: nav is shorter (35px) and each card steps 450px instead of the
// desktop-derived CARD_H+GAP-PEEK_H (401px).
const effectiveStickyOffset = computed(() => isMobile.value ? 35 : props.stickyOffset)
const stepSize = computed(() => isMobile.value ? 450 : CARD_H + GAP - PEEK_H)

const totalScroll = computed(() =>
  (props.cards.length - 1) * stepSize.value,
)

const naturalCardsHeight = computed(() =>
  props.cards.length * CARD_H + (props.cards.length - 1) * GAP,
)

function updateProgress() {
  if (!sectionRef.value || !shouldAnimate.value) return
  const top = sectionRef.value.getBoundingClientRect().top
  // Progress starts when section.top reaches stickyOffset, not viewport top.
  scrollProgress.value = Math.max(0, Math.min(1, (effectiveStickyOffset.value - top) / totalScroll.value))
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
  checkMobile()
  window.addEventListener('resize', checkMobile, { passive: true })
  shouldAnimate.value = true
  window.addEventListener('scroll', onScroll, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  window.removeEventListener('scroll', onScroll)
  if (rafId !== null) cancelAnimationFrame(rafId)
})

const sectionStyle = computed(() =>
  shouldAnimate.value
    ? {
        '--scss-total-scroll': `${totalScroll.value}px`,
        '--scss-sticky-top':   `${effectiveStickyOffset.value}px`,
      }
    : {},
)

// Sequential stacking: N-1 segments. Card i only starts rising once segment i-1 completes.
// Scale compounds so earlier cards shrink more, giving a depth-receding effect.
const cardWrapStyles = computed(() => {
  const n        = props.cards.length
  const segments = Math.max(n - 1, 1)

  return props.cards.map((_, i) => {
    if (!shouldAnimate.value) return {}

    const naturalTop = i * (CARD_H + GAP)

    let translateY = 0
    for (let k = 0; k < i; k++) {
      const segStart = k / segments
      const segEnd   = (k + 1) / segments
      const p = Math.max(0, Math.min(1,
        (scrollProgress.value - segStart) / (segEnd - segStart),
      ))
      translateY -= stepSize.value * p
    }

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
    <div class="scss__sticky">
      <header class="scss__header">
        <h2 class="scss__title">{{ title }}</h2>
        <p v-if="subtitle" class="scss__subtitle">{{ subtitle }}</p>
      </header>

      <div class="scss__cards" :style="cardsContainerStyle">
        <div
          v-for="(card, i) in cards"
          :key="card.heading"
          class="scss__card"
          :style="cardWrapStyles[i]"
        >
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
.scss--animated {
  /* --scss-sticky-cap bounds the sticky viewport to the stacked content height so the
   * section ends exactly when animation ends — no empty void at the bottom on large screens.
   * 850px ≈ pad-top(60) + header(~92) + gap(88) + stacked-cards(160+447). */
  --scss-sticky-cap: 850px;
  height: calc(min(calc(100vh - var(--scss-sticky-top, 0px)), var(--scss-sticky-cap)) + var(--scss-total-scroll));
}

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
  height: min(calc(100vh - var(--scss-sticky-top, 0px)), var(--scss-sticky-cap, 850px));
}

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

.scss--animated .scss__card {
  position: absolute;
  left: 0;
  right: 0;
  will-change: transform;
  transform-origin: top center;
}

@media (max-width: 599.98px) {
  /* Mobile stacked content ≈ pad-top(40) + header(~72) + gap(40) + stacked-cards(607) = 759px */
  .scss--animated {
    --scss-sticky-cap: 660px;
  }

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
