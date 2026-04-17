<script lang="ts">
export interface SeoCarouselItem {
  label: string
  href: string
}
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import chevronLeftRaw from '@icons/Style=Arrows, Detail=No-Tail, Icon=Left-Small.svg?raw'
import chevronRightRaw from '@icons/Style=Arrows, Detail=No-Tail, Icon=Right-Small.svg?raw'

defineProps<{
  heading: string
  items: SeoCarouselItem[]
}>()

const SCROLL_STEP = 280

const track = ref<HTMLElement | null>(null)
const canPrev = ref(false)
const canNext = ref(false)

function update() {
  if (!track.value) return
  const { scrollLeft, scrollWidth, clientWidth } = track.value
  canPrev.value = scrollLeft > 1
  canNext.value = scrollLeft < scrollWidth - clientWidth - 1
}

function scroll(direction: 1 | -1) {
  track.value?.scrollBy({ left: direction * SCROLL_STEP, behavior: 'smooth' })
}

let ro: ResizeObserver | null = null

onMounted(() => {
  nextTick(update)
  ro = new ResizeObserver(update)
  if (track.value) ro.observe(track.value)
})

onUnmounted(() => {
  ro?.disconnect()
})
</script>

<template>
  <div class="seo-carousel">
    <p class="seo-carousel__heading">{{ heading }}</p>

    <div class="seo-carousel__pill">
      <div v-show="canPrev" class="seo-carousel__fade-left" />

      <div
        ref="track"
        class="seo-carousel__track"
        @scroll.passive="update"
      >
        <a
          v-for="(item, i) in items"
          :key="i"
          :href="item.href"
          class="seo-carousel__link"
        >{{ item.label }}</a>
      </div>

      <div class="seo-carousel__controls">
        <div class="seo-carousel__fade-right" />
        <div class="seo-carousel__divider" />
        <div class="seo-carousel__arrows">
          <button
            class="seo-carousel__arrow"
            :class="{ 'seo-carousel__arrow--disabled': !canPrev }"
            :disabled="!canPrev"
            aria-label="Scroll left"
            @click="scroll(-1)"
          >
            <span v-html="chevronLeftRaw" />
          </button>
          <button
            class="seo-carousel__arrow"
            :class="{ 'seo-carousel__arrow--disabled': !canNext }"
            :disabled="!canNext"
            aria-label="Scroll right"
            @click="scroll(1)"
          >
            <span v-html="chevronRightRaw" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.seo-carousel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs);
  width: 100%;
}

.seo-carousel__heading {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: 22px;
  font-weight: var(--font-weight-light);
  line-height: normal;
  color: var(--color-neutral-0);
}

/* ─── Pill container ─────────────────────────────────────── */
.seo-carousel__pill {
  position: relative;
  display: flex;
  align-items: center;
  height: 55px;
  border: 1px solid #D4D7D9;
  border-radius: 12px;
  background: var(--color-neutral-100);
  overflow: hidden;
}

/* ─── Scrollable link track ──────────────────────────────── */
.seo-carousel__track {
  display: flex;
  align-items: center;
  gap: 48px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0 0 0 24px;
  height: 100%;
  flex: 1;
  min-width: 0;
}

.seo-carousel__track::-webkit-scrollbar {
  display: none;
}

.seo-carousel__link {
  flex-shrink: 0;
  font-family: var(--font-family-base);
  font-size: 16px;
  font-weight: var(--font-weight-medium);
  line-height: 16px;
  letter-spacing: 0.4px;
  color: var(--color-action-accent);
  text-decoration: none;
  white-space: nowrap;
}

.seo-carousel__link:hover {
  text-decoration: underline;
}

.seo-carousel__link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─── Left fade (only visible when scrolled) ─────────────── */
.seo-carousel__fade-left {
  position: absolute;
  top: 1px;
  left: 0px;
  bottom: 1px;
  width: 30px;
  border-radius: 12px 0 0 12px;
  background: linear-gradient(90deg, white 33%, transparent 100%);
  pointer-events: none;
  z-index: 1;
}

/* ─── Right-side controls (solid zone — links don't bleed through) */
.seo-carousel__controls {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
  background: var(--color-neutral-100);
  z-index: 2;
}

.seo-carousel__fade-right {
  width: 41px;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(270deg, white 33%, transparent 100%);
  pointer-events: none;
  margin-left: -41px;
}

.seo-carousel__divider {
  width: 1px;
  height: 100%;
  background: #D4D7D9;
  flex-shrink: 0;
}

.seo-carousel__arrows {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxxs);
  padding: 0 16px;
  height: 100%;
  background: var(--color-neutral-100);
}

.seo-carousel__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: var(--color-neutral-100);
  cursor: pointer;
  color: var(--color-neutral-0);
}

.seo-carousel__arrow :deep(svg) {
  width: 24px;
  height: 24px;
}

.seo-carousel__arrow :deep(path) {
  fill: currentColor;
}

.seo-carousel__arrow:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 1px;
  border-radius: 2px;
}

.seo-carousel__arrow--disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
