<script setup lang="ts">
import { computed } from 'vue'
import arrowCircleSvg from '../../../icon/Style=Location, Detail=Arrow-Circle, Icon=NA.svg?raw'
import storeSvg       from '../../../icon/Style=Location, Detail=Store, Icon=NA.svg?raw'
import arrowRightSvg  from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Right.svg?raw'

const props = withDefaults(defineProps<{
  /** Store display name */
  storeName: string
  /** Full street address */
  address: string
  /** Distance from user, e.g. "12 Miles" */
  distance?: string
  /** Phone number string */
  phoneNumber?: string
  /** Store photo URL */
  imageUrl?: string
  /** Layout variant */
  size?: 'desktop' | 'mobile'
  /** Highlighted / chosen state */
  selected?: boolean
  /** href for "Get directions" — renders as <a> when provided */
  directionsHref?: string
  directionsTarget?: string
  /** href for "Shop this store" — renders as <a> when provided */
  shopHref?: string
  shopTarget?: string
}>(), {
  size: 'desktop',
  selected: false,
})

const directionsTag = computed(() => props.directionsHref ? 'a' : 'div')
const shopTag       = computed(() => props.shopHref ? 'a' : 'div')
</script>

<template>
  <div
    class="lt"
    :class="{
      'lt--desktop':  size === 'desktop',
      'lt--mobile':   size === 'mobile',
      'lt--selected': selected,
    }"
  >
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
  </div>
</template>

<style scoped>
/* ─── Card shell ───────────────────────────────────────────── */
.lt {
  display: flex;
  background: var(--color-neutral-100);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-sizing: border-box;
  border: var(--border-width-hairline) solid var(--color-neutral-85);
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

.lt--selected {
  border: var(--border-width-thin) solid var(--color-base-primary-60);
}

/* ─── Image panel ──────────────────────────────────────────── */
.lt__image {
  flex-shrink: 0;
  background: var(--color-neutral-90);
}

.lt--desktop .lt__image {
  width: 241px;
  align-self: stretch;
}

.lt--mobile .lt__image {
  width: 241px;
  height: 200px;
}

.lt__photo {
  display: block;
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
  font-size: var(--text-body-lg-size);       /* 16px */
  font-weight: var(--font-weight-bold);      /* 700 */
  line-height: var(--text-body-lg-line-height);
  color: var(--color-accent-40);
}

.lt__distance {
  flex-shrink: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);       /* 14px */
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
  font-size: var(--text-body-lg-size);       /* 16px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
}

.lt--mobile .lt__address {
  font-size: var(--text-body-sm-size);       /* 14px */
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
  font-size: var(--text-body-sm-size);       /* 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-accent-40);
}

/* Directions CTA */
.lt__directions {
  display: flex;
  align-items: center;
  gap: 0;
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
  font-weight: var(--font-weight-medium);    /* 500 */
  line-height: var(--text-label-line-height);
  color: var(--color-accent-40);
  white-space: nowrap;
}

.lt__dir-label--mobile {
  font-size: var(--text-body-sm-size);       /* 14px */
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
  font-size: var(--text-body-sm-size);       /* 14px */
  font-weight: var(--font-weight-bold);      /* 700 */
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
