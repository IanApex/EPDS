<script setup lang="ts">
import { computed } from 'vue'
import shipToStoreSrc   from '../../../icon/Icon Type=Vehicle Descriptors, Size=Large, Theme=Ship to store.svg?url'
import echoParkStoreSrc from '../../../icon/Icon Type=Vehicle Descriptors, Size=Large, Theme=EchoPark Store.svg?url'
import infoSvg          from '../../../icon/Style=Alerts, Detail=Info, Icon=NA.svg?raw'

const props = withDefaults(defineProps<{
  /** Content/availability type */
  type: 'not-available' | 'pick-up-today' | 'shipping-available'
  /** Layout variant */
  size?: 'desktop' | 'mobile'
  /** Store name — shown for pick-up-today and shipping-available */
  storeName?: string
  /**
   * Formatted distance string shown below the store name.
   * Include parens if needed, e.g. "(677 mi from 75214)"
   */
  distance?: string
  /**
   * Price string — e.g. "Free" or "$399"
   * Shown for pick-up-today and shipping-available
   */
  price?: string
}>(), {
  size: 'desktop',
})

const isAvailable  = computed(() => props.type !== 'not-available')
const isPickUpToday = computed(() => props.type === 'pick-up-today')

const vehicleIconSrc   = computed(() => isPickUpToday.value ? echoParkStoreSrc : shipToStoreSrc)
const leftLabel        = computed(() => isPickUpToday.value ? 'Pick up today' : 'Ship to store')
</script>

<template>
  <div
    class="lvdp"
    :class="{
      'lvdp--desktop': size === 'desktop',
      'lvdp--mobile':  size === 'mobile',
    }"
  >
    <div class="lvdp__main">

      <!-- ── Left: icon + label ──────────────────────────── -->
      <div class="lvdp__left">
        <img
          :src="vehicleIconSrc"
          :alt="leftLabel"
          class="lvdp__vehicle-icon"
          :class="{ 'lvdp__vehicle-icon--grey': !isAvailable }"
        />
        <span class="lvdp__left-label">{{ leftLabel }}</span>
      </div>

      <!-- ── Vertical divider ───────────────────────────── -->
      <div class="lvdp__divider" aria-hidden="true" />

      <!-- ── Right: info or unavailable ────────────────── -->
      <div class="lvdp__right">

        <!-- Not available -->
        <p v-if="!isAvailable" class="lvdp__unavailable">Not available</p>

        <!-- Pick up today / Shipping available -->
        <template v-else>
          <div class="lvdp__name-row">
            <span class="lvdp__store-name">{{ storeName }}</span>
            <span class="lvdp__info-icon" aria-hidden="true" v-html="infoSvg" />
          </div>
          <p v-if="distance" class="lvdp__distance">{{ distance }}</p>
          <p v-if="price" class="lvdp__price">{{ price }}</p>
        </template>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── Card shell ───────────────────────────────────────────── */
.lvdp {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-neutral-100);
  border: var(--border-width-hairline) solid var(--color-neutral-90);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xxs); /* 24px */
  box-sizing: border-box;
}

.lvdp--desktop {
  width: 380px;
  height: 138px;
}

.lvdp--mobile {
  width: 328px;
  height: 162px;
}

/* ─── Main container ───────────────────────────────────────── */
.lvdp__main {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xxxs); /* 16px */
  width: 100%;
  height: 100%;
}

/* ─── Left container ───────────────────────────────────────── */
.lvdp__left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 130px;
  flex-shrink: 0;
}

.lvdp__vehicle-icon {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Grey out the icon for not-available state */
.lvdp__vehicle-icon--grey {
  filter: grayscale(1) opacity(0.4);
}

.lvdp__left-label {
  font-family: var(--font-family-base);
  font-size: var(--text-h5-size);           /* 22px */
  font-weight: var(--font-weight-light);    /* 300 */
  line-height: var(--text-h5-line-height);
  letter-spacing: var(--text-h5-letter-spacing);
  color: var(--color-neutral-0);
  text-align: center;
  white-space: nowrap;
}

/* ─── Divider ──────────────────────────────────────────────── */
.lvdp__divider {
  width: 1px;
  align-self: stretch;
  background: var(--color-neutral-90);
  flex-shrink: 0;
}

/* ─── Right container ──────────────────────────────────────── */
.lvdp__right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Not available label */
.lvdp__unavailable {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  text-align: center;
}

/* Store name row */
.lvdp__name-row {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  width: 100%;
}

.lvdp__store-name {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  text-align: center;
}

/* Info icon */
.lvdp__info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.lvdp__info-icon :deep(path) {
  fill: var(--color-neutral-0);
}

/* Distance */
.lvdp__distance {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);        /* 12px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-neutral-0);
  text-align: center;
}

/* Price */
.lvdp__price {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-h2-size);           /* 42px */
  font-weight: var(--font-weight-light);    /* 300 */
  line-height: var(--text-h2-line-height);
  letter-spacing: var(--text-h2-letter-spacing);
  color: var(--color-neutral-20);
  white-space: nowrap;
}
</style>
