<script lang="ts">
export interface PackageItem {
  title: string
  description: string
  seeMoreHref?: string
}
</script>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import arrowLeftRaw from '@icons/Style=Arrows, Detail=Tail, Icon=Left.svg?raw'
import arrowRightRaw from '@icons/Style=Arrows, Detail=Tail, Icon=Right.svg?raw'

const props = withDefaults(defineProps<{
  label?: string
  packages: PackageItem[]
}>(), {
  label: 'Packages:',
})

const CARD_WIDTH = 272
const GAP = 16

const track = ref<HTMLElement | null>(null)
const scrollLeft = ref(0)
const trackWidth = ref(0)
const viewportWidth = ref(0)

const showControls = computed(() => props.packages.length >= 3)
const maxScroll = computed(() => Math.max(0, trackWidth.value - viewportWidth.value))
const canPrev = computed(() => scrollLeft.value > 1)
const canNext = computed(() => scrollLeft.value < maxScroll.value - 1)
const progress = computed(() => {
  if (maxScroll.value <= 0) return 1
  return Math.min(1, scrollLeft.value / maxScroll.value)
})

function scrollBy(direction: 1 | -1) {
  if (!track.value) return
  track.value.scrollBy({ left: direction * (CARD_WIDTH + GAP), behavior: 'smooth' })
}

function onScroll() {
  if (!track.value) return
  scrollLeft.value = track.value.scrollLeft
}

function measure() {
  if (!track.value) return
  trackWidth.value = track.value.scrollWidth
  viewportWidth.value = track.value.clientWidth
  scrollLeft.value = track.value.scrollLeft
}

let ro: ResizeObserver | null = null

onMounted(() => {
  nextTick(measure)
  ro = new ResizeObserver(measure)
  if (track.value) ro.observe(track.value)
})

onUnmounted(() => {
  ro?.disconnect()
})
</script>

<template>
  <div class="pkg-carousel">
    <p v-if="label" class="pkg-carousel__label">{{ label }}</p>

    <div class="pkg-carousel__viewport">
      <!-- Left arrow -->
      <button
        v-if="showControls && canPrev"
        class="pkg-carousel__arrow pkg-carousel__arrow--left"
        aria-label="Previous packages"
        @click="scrollBy(-1)"
      >
        <span class="pkg-carousel__arrow-icon" v-html="arrowLeftRaw" />
      </button>

      <!-- Scrollable track -->
      <div
        ref="track"
        class="pkg-carousel__track"
        @scroll.passive="onScroll"
      >
        <div
          v-for="(pkg, i) in packages"
          :key="i"
          class="pkg-carousel__card"
          :class="{ 'pkg-carousel__card--expanded': !!pkg.seeMoreHref }"
        >
          <p class="pkg-carousel__card-title">{{ pkg.title }}</p>
          <p class="pkg-carousel__card-desc">{{ pkg.description }}</p>
          <a
            v-if="pkg.seeMoreHref"
            :href="pkg.seeMoreHref"
            class="pkg-carousel__card-link"
          >See more</a>
        </div>
      </div>

      <!-- Right fade + arrow -->
      <div v-if="showControls && canNext" class="pkg-carousel__fade" />
      <button
        v-if="showControls && canNext"
        class="pkg-carousel__arrow pkg-carousel__arrow--right"
        aria-label="Next packages"
        @click="scrollBy(1)"
      >
        <span class="pkg-carousel__arrow-icon" v-html="arrowRightRaw" />
      </button>
    </div>

    <!-- Progress bar -->
    <div v-if="showControls" class="pkg-carousel__progress">
      <div
        class="pkg-carousel__progress-fill"
        :style="{ width: `${Math.max(20, progress * 100)}%` }"
      />
    </div>
  </div>
</template>

<style scoped>
.pkg-carousel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);
  width: 100%;
}

.pkg-carousel__label {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

/* ─── Viewport ───────────────────────────────────────────── */
.pkg-carousel__viewport {
  position: relative;
  overflow: visible;
}

.pkg-carousel__track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.pkg-carousel__track::-webkit-scrollbar {
  display: none;
}

/* ─── Card ───────────────────────────────────────────────── */
.pkg-carousel__card {
  flex: 0 0 272px;
  min-height: 164px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-nano);
  padding: 24px 24px 40px;
  border: 1px solid var(--color-neutral-90);
  border-radius: var(--border-radius-lg);
  background: var(--color-neutral-100);
  box-sizing: border-box;
  scroll-snap-align: start;
}

.pkg-carousel__card--expanded {
  min-height: auto;
  padding-bottom: 16px;
}

.pkg-carousel__card-title {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.pkg-carousel__card-desc {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  line-height: 20px;
  letter-spacing: -0.28px;
  color: #313D47;
}

.pkg-carousel__card-link {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-action-accent);
  text-decoration: none;
  text-align: right;
  align-self: flex-end;
}

.pkg-carousel__card-link:hover {
  text-decoration: underline;
}

.pkg-carousel__card-link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─── Arrow buttons ──────────────────────────────────────── */
.pkg-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-pill);
  background: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-90);
  cursor: pointer;
  padding: 0;
  color: var(--color-neutral-0);
  box-shadow: var(--shadow-level-2);
  transition: background 0.15s ease;
}

.pkg-carousel__arrow:hover {
  background: var(--color-action-accent-subtle);
  border-color: var(--color-action-accent-subtle);
}

.pkg-carousel__arrow:focus-visible {
  outline: none;
  border: 3px solid var(--color-accessibility-80);
}

.pkg-carousel__arrow--left {
  left: -24px;
}

.pkg-carousel__arrow--right {
  right: -24px;
}

.pkg-carousel__arrow-icon {
  display: flex;
  width: 24px;
  height: 24px;
}

.pkg-carousel__arrow-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.pkg-carousel__arrow-icon :deep(path) {
  fill: currentColor;
}

/* Right edge fade */
.pkg-carousel__fade {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 64px;
  background: linear-gradient(to right, transparent, var(--color-neutral-100));
  pointer-events: none;
  z-index: 1;
}

/* ─── Progress bar ───────────────────────────────────────── */
.pkg-carousel__progress {
  height: 2px;
  width: 100%;
  background: var(--color-neutral-90);
  border-radius: 6px;
  margin-top: 16px;
  overflow: hidden;
}

.pkg-carousel__progress-fill {
  height: 100%;
  background: var(--color-action-primary-vivid);
  border-radius: 6px;
  transition: width 0.3s ease;
}
</style>
