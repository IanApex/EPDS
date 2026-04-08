<script setup lang="ts">
import { computed, ref } from 'vue'
import SmallIconButton   from '../SmallIconButton/SmallIconButton.vue'
import ArrowCircleButton from '../ArrowCircleButton/ArrowCircleButton.vue'
import MediumIconButton  from '../MediumIconButton/MediumIconButton.vue'
import TileCta           from '../TileCta/TileCta.vue'
import CarouselDots      from '../CarouselDots/CarouselDots.vue'

import heartFilledSvg  from '../../../icon/Style=Account, Detail=Heart-Filled, Icon=NA.svg?raw'
import calculatorSvg   from '../../../icon/Style=Finance, Detail=Payment, Icon=Calculator.svg?raw'
import infoSvg         from '../../../icon/Style=Alerts, Detail=Info, Icon=NA.svg?raw'
import testDriveSvg    from '../../../icon/Icon Type=Vehicle Descriptors, Size=Small, Theme=Test Drive.svg?raw'

const props = withDefaults(defineProps<{
  /** Model year, e.g. "2020" */
  year: string
  /** Mileage display string, e.g. "126k mi" */
  mileage: string
  /** Stock number, e.g. "PDW077969" */
  stockNumber?: string
  /** Full vehicle title — year/make/model/trim */
  title: string
  /** Price without currency symbol, e.g. "30,499" */
  price: string
  /** Monthly payment range string, e.g. "$250—$1,450/mo" */
  monthlyPayment?: string
  /** Tooltip text for the payment info icon */
  tooltipText?: string
  /** First line of delivery info, e.g. "Pick up today at" or "Ship for $3,000 to" */
  deliveryLabel?: string
  /** Store name for delivery */
  deliveryStore?: string
  /** Distance string, e.g. "(125 mi)" */
  deliveryDistance?: string
  /** Vehicle photo URL */
  imageUrl?: string
  /** Total number of vehicle photos — drives carousel dots */
  imageCount?: number
  /** Current photo index, 0-based (bind with v-model:imageIndex) */
  imageIndex?: number
  /** Whether this vehicle is saved to favorites (bind with v-model:favorited) */
  favorited?: boolean
  /** Link to the Vehicle Detail Page */
  href?: string
}>(), {
  imageCount: 1,
  imageIndex: 0,
  favorited:  false,
})

const emit = defineEmits<{
  'update:favorited':   [value: boolean]
  'update:imageIndex':  [index: number]
  /** Calculator button or payment range row clicked */
  'calculator':         []
  /** "Schedule test drive" CTA clicked */
  'test-drive':         []
}>()

const showTooltip = ref(false)

const isLastImage = computed(() =>
  props.imageCount > 1 && props.imageIndex === props.imageCount - 1
)

function prevImage(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  if (props.imageIndex > 0) emit('update:imageIndex', props.imageIndex - 1)
}

function nextImage(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  if (props.imageIndex < props.imageCount - 1) emit('update:imageIndex', props.imageIndex + 1)
}

function toggleFavorite(e: MouseEvent) {
  e.preventDefault()
  emit('update:favorited', !props.favorited)
}

function openCalculator(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  emit('calculator')
}

function openTestDrive(e: MouseEvent) {
  e.stopPropagation()
  emit('test-drive')
}
</script>

<template>
  <article
    class="srpt"
    :class="{ 'srpt--last-image': isLastImage }"
  >

    <!-- ═══════════════════════════════════════════════════ -->
    <!--  IMAGE AREA                                         -->
    <!-- ═══════════════════════════════════════════════════ -->
    <div class="srpt__image-area">

      <!-- Background photo -->
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="title"
        class="srpt__photo"
      />
      <div v-else class="srpt__photo-placeholder" />

      <!-- Transparent full-area link → VDP (ADA tab stop 1) -->
      <a
        v-if="href"
        :href="href"
        class="srpt__image-link"
        :aria-label="`View photos of ${title}`"
      />

      <!-- Last-image overlay (blur + See car details) -->
      <div v-if="isLastImage" class="srpt__last-overlay">
        <a
          v-if="href"
          :href="href"
          class="srpt__see-details"
        >See car details</a>
      </div>

      <!-- Favorite button — ADA tab stop 2 -->
      <div class="srpt__favorite">
        <SmallIconButton
          :aria-label="favorited ? 'Remove from favorites' : 'Save to favorites'"
          :selected="favorited"
          @click="toggleFavorite"
        >
          <template #icon>
            <span v-html="heartFilledSvg" style="display:contents" />
          </template>
        </SmallIconButton>
      </div>

      <!-- Carousel arrows (visible on image-area hover) -->
      <div v-if="imageCount > 1" class="srpt__arrows">
        <ArrowCircleButton
          aria-label="Previous photo"
          direction="left"
          size="sm"
          @click="prevImage"
        />
        <ArrowCircleButton
          aria-label="Next photo"
          direction="right"
          size="sm"
          @click="nextImage"
        />
      </div>

    </div><!-- /.srpt__image-area -->

    <!-- Carousel dots — straddling image/content boundary -->
    <div v-if="imageCount > 1" class="srpt__dots">
      <CarouselDots
        :count="imageCount"
        :modelValue="imageIndex"
        @update:modelValue="emit('update:imageIndex', $event)"
      />
    </div>


    <!-- ═══════════════════════════════════════════════════ -->
    <!--  CONTENT AREA                                       -->
    <!-- ═══════════════════════════════════════════════════ -->
    <div class="srpt__content">

      <!-- ── Car details ─────────────────────────────── -->
      <div class="srpt__details">

        <!-- Year / mileage / stock# row — ADA tab stops 3 -->
        <a
          v-if="href"
          :href="href"
          class="srpt__meta srpt__vdp-link"
          :aria-label="`${year}, ${mileage}`"
        >
          <span class="srpt__meta-year">{{ year }}</span>
          <span class="srpt__meta-sep">|</span>
          <span class="srpt__meta-mileage">{{ mileage }}</span>
          <template v-if="stockNumber">
            <span class="srpt__meta-sep">|</span>
            <span class="srpt__meta-stock">Stock #: {{ stockNumber }}</span>
          </template>
        </a>
        <div v-else class="srpt__meta">
          <span class="srpt__meta-year">{{ year }}</span>
          <span class="srpt__meta-sep">|</span>
          <span class="srpt__meta-mileage">{{ mileage }}</span>
          <template v-if="stockNumber">
            <span class="srpt__meta-sep">|</span>
            <span class="srpt__meta-stock">Stock #: {{ stockNumber }}</span>
          </template>
        </div>

        <!-- Title — ADA tab stop 4 -->
        <a
          v-if="href"
          :href="href"
          class="srpt__title srpt__vdp-link"
        >{{ title }}</a>
        <p v-else class="srpt__title">{{ title }}</p>

      </div>

      <!-- ── Price / delivery row ─────────────────────── -->
      <div class="srpt__price-row">

        <!-- Price column -->
        <div class="srpt__price-col">

          <!-- Price — ADA tab stop 5 -->
          <a
            v-if="href"
            :href="href"
            class="srpt__price srpt__vdp-link"
            :aria-label="`Price: $${price}`"
          >
            <span class="srpt__price-curr" aria-hidden="true">$</span>
            <span class="srpt__price-num">{{ price }}</span>
          </a>
          <div v-else class="srpt__price" :aria-label="`Price: $${price}`">
            <span class="srpt__price-curr" aria-hidden="true">$</span>
            <span class="srpt__price-num">{{ price }}</span>
          </div>

          <!-- Monthly payment + info icon — ADA tab stops 6 & 7 -->
          <div v-if="monthlyPayment" class="srpt__payment">
            <button
              class="srpt__payment-btn"
              aria-label="Open payment calculator"
              @click="openCalculator"
            >{{ monthlyPayment }}</button>
            <div class="srpt__tooltip-wrap">
              <button
                class="srpt__info-btn"
                aria-label="Payment info"
                :aria-expanded="showTooltip"
                @click.stop="showTooltip = !showTooltip"
              >
                <span v-html="infoSvg" aria-hidden="true" />
              </button>
              <div v-if="showTooltip" class="srpt__tooltip" role="tooltip">
                {{ tooltipText || 'Based on $1,000 down and 60 months at 4.79% APR' }}
                <div class="srpt__tooltip-caret" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <!-- Delivery info — ADA tab stop 9 -->
        <a
          v-if="href && (deliveryLabel || deliveryStore)"
          :href="href"
          class="srpt__delivery srpt__vdp-link"
        >
          <span v-if="deliveryLabel" class="srpt__delivery-label">{{ deliveryLabel }}</span>
          <span v-if="deliveryStore" class="srpt__delivery-store">
            {{ deliveryStore }}<span v-if="deliveryDistance" class="srpt__delivery-dist">{{ deliveryDistance }}</span>
          </span>
        </a>
        <div v-else-if="deliveryLabel || deliveryStore" class="srpt__delivery">
          <span v-if="deliveryLabel" class="srpt__delivery-label">{{ deliveryLabel }}</span>
          <span v-if="deliveryStore" class="srpt__delivery-store">
            {{ deliveryStore }}<span v-if="deliveryDistance" class="srpt__delivery-dist">{{ deliveryDistance }}</span>
          </span>
        </div>

      </div>

      <!-- ── CTAs ─────────────────────────────────────── -->
      <div class="srpt__ctas">

        <!-- Calculator — ADA tab stop 8 -->
        <MediumIconButton
          aria-label="Open payment calculator"
          @click="openCalculator"
        >
          <template #icon>
            <span v-html="calculatorSvg" style="display:contents" />
          </template>
        </MediumIconButton>

        <!-- Schedule test drive — ADA tab stop 10 -->
        <TileCta
          label="Schedule test drive"
          @click="openTestDrive"
        >
          <template #icon>
            <span v-html="testDriveSvg" class="srpt__cta-icon" aria-hidden="true" />
          </template>
        </TileCta>

      </div>

    </div><!-- /.srpt__content -->

  </article>
</template>

<style scoped>
/* ─── Card shell ───────────────────────────────────────────── */
.srpt {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-width: 420px;
  background: var(--color-neutral-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;                         /* clips image to card radius */
  box-sizing: border-box;
  transition: box-shadow 0.2s ease;
}

/* Border via ::after so it paints above image (same pattern as LocationTile) */
.srpt::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-md);
  box-shadow: inset 0 0 0 1px var(--color-neutral-90);
  pointer-events: none;
  z-index: 10;
}

/* Drop shadow on any hover */
.srpt:hover {
  box-shadow: var(--shadow-level-1);
}

/* ─── Image area ───────────────────────────────────────────── */
.srpt__image-area {
  position: relative;
  height: 294px;
  flex-shrink: 0;
  background: var(--color-neutral-90);
  overflow: hidden;
}

.srpt__photo,
.srpt__photo-placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.srpt__photo-placeholder {
  background: var(--color-neutral-90);
}

/* Full-area transparent VDP link sits behind everything else */
.srpt__image-link {
  position: absolute;
  inset: 0;
  z-index: 1;
}

/* ─── Last-image overlay ───────────────────────────────────── */
.srpt__last-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(36, 44, 51, 0.45);
  backdrop-filter: blur(7px);
}

.srpt__see-details {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 var(--spacing-xxs);
  border-radius: var(--border-radius-pill);
  border: 2px solid var(--color-neutral-90);
  color: var(--color-neutral-100);
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-sm-line-height);
  text-decoration: none;
  white-space: nowrap;
}

/* ─── Favorite button ──────────────────────────────────────── */
.srpt__favorite {
  position: absolute;
  top: var(--spacing-xxxs);   /* 16px */
  right: var(--spacing-xxxs);
  z-index: 3;
}

/* ─── Carousel arrows (visible on image-area hover) ───────── */
.srpt__arrows {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-xxxs);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.srpt__image-area:hover .srpt__arrows {
  opacity: 1;
}

.srpt__arrows > * {
  pointer-events: all;
}

/* ─── Carousel dots — straddle image/content boundary ─────── */
.srpt__dots {
  position: absolute;
  top: 294px;             /* = image area height */
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
}

/* ─── Content section ──────────────────────────────────────── */
.srpt__content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: var(--spacing-xxxs);   /* 16px */
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
}

/* ─── Car details ──────────────────────────────────────────── */
.srpt__details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.srpt__meta {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-light);
  font-size: var(--text-body-lg-size);   /* 16px */
  white-space: nowrap;
  text-decoration: none;
  color: inherit;
  flex-wrap: nowrap;
  overflow: hidden;
}

.srpt__meta-year,
.srpt__meta-mileage {
  color: var(--color-neutral-0);
  line-height: 16px;
  white-space: nowrap;
}

.srpt__meta-sep {
  color: var(--color-neutral-70);
  line-height: 26px;
}

.srpt__meta-stock {
  color: var(--color-neutral-40);
  font-size: var(--text-label-size);     /* 12px */
  letter-spacing: var(--text-label-letter-spacing);
  line-height: 16px;
  /* Allow selection so EGs can copy stock # on tablets (per ADA spec) */
  user-select: text;
  -webkit-user-select: text;
}

.srpt__title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 0;
  font-family: var(--font-family-base);
  font-size: 18px;
  font-weight: var(--font-weight-medium);
  line-height: 24px;
  color: var(--color-neutral-0);
  text-decoration: none;
  max-height: 48px;
}

/* ─── Price / delivery row ─────────────────────────────────── */
.srpt__price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--spacing-micro);  /* 12px */
}

.srpt__price-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

/* Price display ($30,499) */
.srpt__price {
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  padding-left: 9px;
  color: var(--color-action-primary);
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
}

.srpt__price-curr {
  position: absolute;
  top: 3px;
  left: 0;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.4px;
}

.srpt__price-num {
  font-size: 26px;
  line-height: 24px;
  letter-spacing: 0.4px;
}

/* Monthly payment row */
.srpt__payment {
  display: flex;
  align-items: center;
  gap: 4px;
}

.srpt__payment-btn {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: 26px;
  color: var(--color-neutral-0);
  white-space: nowrap;
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.15s ease;
}

.srpt__payment-btn:hover {
  text-decoration-color: currentColor;
}

/* Info icon button */
.srpt__info-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  flex-shrink: 0;
  line-height: 0;
  color: var(--color-neutral-0);
}

.srpt__info-btn :deep(svg) {
  width: 16px;
  height: 16px;
}

.srpt__info-btn :deep(path) {
  fill: currentColor;
}

.srpt__info-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  border-radius: var(--border-radius-circular);
}

/* Tooltip */
.srpt__tooltip-wrap {
  position: relative;
}

.srpt__tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  width: 155px;
  background: var(--color-neutral-0);
  color: var(--color-neutral-100);
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  text-align: center;
  padding: var(--spacing-xxxs);
  border-radius: 6px;
  z-index: 20;
  white-space: normal;
}

.srpt__tooltip-caret {
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid var(--color-neutral-0);
}

/* Delivery info */
.srpt__delivery {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  text-decoration: none;
  color: var(--color-neutral-0);
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);   /* 14px */
  line-height: var(--text-body-sm-line-height);
  min-width: 0;
}

.srpt__delivery-label {
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.srpt__delivery-store {
  font-weight: var(--font-weight-regular);
  white-space: nowrap;
}

.srpt__delivery-dist {
  margin-left: 4px;
  font-size: var(--text-label-size);
  letter-spacing: var(--text-label-letter-spacing);
}

/* ─── CTA row ──────────────────────────────────────────────── */
.srpt__ctas {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Test drive icon inside TileCta slot — blue to match accent CTA style */
.srpt__cta-icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  line-height: 0;
}

.srpt__cta-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.srpt__cta-icon :deep(path) {
  fill: var(--color-action-accent);
}

/* ─── VDP link focus styles ────────────────────────────────── */
.srpt__vdp-link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}
</style>
