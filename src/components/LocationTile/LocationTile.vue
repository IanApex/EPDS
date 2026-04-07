<script setup lang="ts">
import { computed } from 'vue'
import arrowCircleSvg from '../../../icon/Style=Location, Detail=Arrow-Circle, Icon=NA.svg?raw'
import storeSvg       from '../../../icon/Style=Location, Detail=Store, Icon=NA.svg?raw'
import arrowRightSvg  from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Right.svg?raw'

const props = withDefaults(defineProps<{
  /** This tile's value — emitted when selected (v-model). */
  value: string
  /** Radio group name — all tiles in the same group share this. */
  name: string
  /** Store display name */
  storeName: string
  /** Full street address */
  address: string
  /** Currently selected value in the group (bind with v-model). */
  modelValue?: string
  /** Distance from user, e.g. "12 Miles" */
  distance?: string
  /** Phone number string */
  phoneNumber?: string
  /** Store photo URL */
  imageUrl?: string
  /** Layout variant */
  size?: 'desktop' | 'mobile'
  /** href for "Get directions" — renders as <a> when provided */
  directionsHref?: string
  directionsTarget?: string
  /** href for "Shop this store" — renders as <a> when provided */
  shopHref?: string
  shopTarget?: string
}>(), {
  size: 'desktop',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isSelected = computed(() => props.modelValue === props.value)

const directionsTag = computed(() => props.directionsHref ? 'a' : 'div')
const shopTag       = computed(() => props.shopHref ? 'a' : 'div')
</script>

<template>
  <label
    class="lt"
    :class="{
      'lt--desktop':  size === 'desktop',
      'lt--mobile':   size === 'mobile',
      'lt--selected': isSelected,
    }"
  >
    <!-- Visually hidden radio — provides selection semantics + keyboard nav -->
    <input
      type="radio"
      class="lt__radio"
      :name="name"
      :value="value"
      :checked="isSelected"
      @change="emit('update:modelValue', value)"
    />

    <!-- ── Image ───────────────────────────────────────────── -->
    <div class="lt__image">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="storeName"
        class="lt__photo"
      />
    </div>

    <!-- ── Right / bottom content ─────────────────────────── -->
    <div class="lt__right">

      <!-- Information section -->
      <div class="lt__info">
        <div class="lt__name-row">
          <span class="lt__store-name">{{ storeName }}</span>
          <span v-if="distance" class="lt__distance">{{ distance }}</span>
        </div>

        <p class="lt__address">{{ address }}</p>

        <!-- Desktop: phone left, directions right ─────────── -->
        <div v-if="size === 'desktop'" class="lt__info-cta lt__info-cta--desktop">
          <span v-if="phoneNumber" class="lt__phone">{{ phoneNumber }}</span>
          <component
            :is="directionsTag"
            class="lt__directions lt__directions--desktop"
            :href="directionsHref || undefined"
            :target="directionsHref ? directionsTarget : undefined"
          >
            <span class="lt__dir-icon" aria-hidden="true" v-html="arrowCircleSvg" />
            <span class="lt__dir-label">Get directions</span>
          </component>
        </div>

        <!-- Mobile: directions above phone ─────────────────── -->
        <div v-else class="lt__info-cta lt__info-cta--mobile">
          <component
            :is="directionsTag"
            class="lt__directions lt__directions--mobile"
            :href="directionsHref || undefined"
            :target="directionsHref ? directionsTarget : undefined"
          >
            <span class="lt__dir-icon" aria-hidden="true" v-html="arrowCircleSvg" />
            <span class="lt__dir-label lt__dir-label--mobile">Get directions</span>
          </component>
          <span v-if="phoneNumber" class="lt__phone">{{ phoneNumber }}</span>
        </div>
      </div>

      <!-- Shop action row -->
      <component
        :is="shopTag"
        class="lt__shop"
        :href="shopHref || undefined"
        :target="shopHref ? shopTarget : undefined"
      >
        <span class="lt__shop-left">
          <span class="lt__shop-icon" aria-hidden="true" v-html="storeSvg" />
          <span class="lt__shop-label">Shop this store</span>
        </span>
        <span class="lt__shop-arrow" aria-hidden="true" v-html="arrowRightSvg" />
      </component>

    </div>
  </label>
</template>

<style scoped>
/* ─── Card shell ───────────────────────────────────────────── */
.lt {
  display: flex;
  position: relative;
  background: var(--color-neutral-100);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
}

/*
 * ::after overlay renders the border on top of ALL children (including the
 * image). box-shadow inset means no layout shift when thickness changes.
 * pointer-events:none keeps clicks/hover working on the card content.
 * z-index:1 ensures it sits above positioned children (e.g. the photo).
 */
.lt::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-lg);
  pointer-events: none;
  z-index: 1;
  box-shadow: inset 0 0 0 1px var(--color-neutral-85);
}

.lt--desktop {
  flex-direction: row;
  align-items: stretch;
  width: 544px;
}

.lt--mobile {
  flex-direction: column;
  align-items: flex-start;
  width: 241px;
}

.lt--selected::after {
  box-shadow: inset 0 0 0 2px var(--color-base-primary-60);
}

/* ─── Hidden radio ─────────────────────────────────────────── */
.lt__radio {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ─── Image panel ──────────────────────────────────────────── */
/*
 * The img is position:absolute so it never contributes to the panel's
 * natural height. On desktop the panel height is set entirely by
 * align-self:stretch (= right content height), eliminating the extra
 * whitespace that appeared when the photo's natural dimensions were taller
 * than the text content.
 */
.lt__image {
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background: var(--color-neutral-90);
}

.lt--desktop .lt__image {
  width: 241px;
  align-self: stretch;
}

.lt--mobile .lt__image {
  width: 100%;
  height: 200px;
}

.lt__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ─── Right / bottom panel ─────────────────────────────────── */
.lt__right {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

/* ─── Information section ──────────────────────────────────── */
.lt__info {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xxxs); /* 16px */
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-85);
}

.lt--desktop .lt__info {
  gap: 0;
}

.lt--mobile .lt__info {
  gap: 14px;
}

/* Name row */
.lt__name-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-micro); /* 12px */
  padding-bottom: 8px;
}

.lt--mobile .lt__name-row {
  padding-bottom: 0;
}

.lt__store-name {
  flex: 1;
  min-width: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-accent-40);
}

.lt__distance {
  flex-shrink: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
  white-space: nowrap;
}

/* Address */
.lt__address {
  margin: 0;
  font-family: var(--font-family-base);
  color: var(--color-neutral-0);
}

.lt--desktop .lt__address {
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
}

.lt--mobile .lt__address {
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
}

/* Info + CTA row */
.lt__info-cta--desktop {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
}

.lt__info-cta--mobile {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs); /* 16px */
}

/* Phone */
.lt__phone {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-accent-40);
}

/* Directions CTA */
.lt__directions {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.lt__directions--desktop {
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.lt__directions--mobile {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.lt__dir-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  line-height: 0;
}

.lt__dir-icon :deep(svg) {
  width: 40px;
  height: 40px;
}

.lt__dir-icon :deep(path) {
  fill: var(--color-neutral-40);
}

.lt__dir-label {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);         /* 12px */
  font-weight: var(--font-weight-medium);
  line-height: var(--text-label-line-height);
  color: var(--color-accent-40);
  white-space: nowrap;
}

.lt__dir-label--mobile {
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-sm-line-height);
}

/* ─── Shop action row ──────────────────────────────────────── */
.lt__shop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-xxxs); /* 16px */
  background: var(--color-neutral-100);
  text-decoration: none;
  color: inherit;
}

.lt__shop-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lt__shop-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.lt__shop-icon :deep(path) {
  fill: var(--color-neutral-0);
}

.lt__shop-label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-accent-40);
  white-space: nowrap;
}

.lt__shop-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.lt__shop-arrow :deep(path) {
  fill: var(--color-neutral-0);
}
</style>
