<script setup lang="ts">
import { ref, watch } from 'vue'
import LinkCta from '@/components/LinkCta/LinkCta.vue'
import leftArrowSvg   from '@icons/Style=Arrows, Detail=No-Tail, Icon=Left.svg?raw'
import mapPinSvg      from '@icons/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'
import directionsSvg  from '@icons/Style=Location, Detail=Arrow, Icon=NA.svg?raw'

export interface LocationStoreItem {
  id:            string
  name:          string
  distanceMiles: number
  address:       string
  phone:         string
}

const props = withDefaults(defineProps<{
  zipCode?: string
  stores?:  LocationStoreItem[]
  /** When true, hides the built-in back header (parent renders its own). */
  hideHeader?: boolean
}>(), {
  zipCode:    '',
  stores:     () => [],
  hideHeader: false,
})

const emit = defineEmits<{
  close:              []
  'update:zipCode':   [zip: string]
}>()

const zipInput = ref(props.zipCode)

watch(() => props.zipCode, (z) => { zipInput.value = z })

function applyZip() {
  const z = zipInput.value.trim()
  if (z.length === 5) emit('update:zipCode', z)
}
</script>

<template>
  <div class="loc-fly" role="region" aria-label="Change location">
    <!-- Back header (hidden when parent provides its own title row) -->
    <div v-if="!hideHeader" class="loc-fly__header">
      <button type="button" class="loc-fly__back-btn" @click="emit('close')">
        <span class="loc-fly__back-icon" aria-hidden="true" v-html="leftArrowSvg" />
        <span class="loc-fly__back-label">Distance &amp; stores</span>
      </button>
    </div>

    <!-- You're at + zip input -->
    <div class="loc-fly__zip-section">
      <div class="loc-fly__youre-at">
        <span class="loc-fly__youre-at-text">You're at</span>
        <span class="loc-fly__youre-at-zip">
          <span class="loc-fly__pin" aria-hidden="true" v-html="mapPinSvg" />
          <strong>{{ zipCode }}</strong>
        </span>
      </div>
      <p class="loc-fly__instruction">Enter a Zip code to shop your nearest store:</p>

      <div class="loc-fly__search">
        <input
          v-model="zipInput"
          class="loc-fly__search-input"
          type="text"
          inputmode="numeric"
          placeholder="Zip"
          maxlength="5"
          aria-label="Zip code"
          @keydown.enter="applyZip"
        />
        <button type="button" class="loc-fly__search-btn" @click="applyZip">Change</button>
      </div>
    </div>

    <!-- Nearest store card -->
    <div v-if="stores.length" class="loc-fly__nearest-card">
      <p class="loc-fly__card-heading">Your nearest pickup store:</p>
      <div class="loc-fly__store-row">
        <div class="loc-fly__store-info">
          <p class="loc-fly__store-name">
            {{ stores[0].name }}
            <span class="loc-fly__store-dist">({{ stores[0].distanceMiles }} mi)</span>
          </p>
          <p class="loc-fly__store-address">{{ stores[0].address }}</p>
          <a :href="`tel:${stores[0].phone}`" class="loc-fly__store-phone">{{ stores[0].phone }}</a>
        </div>
        <div class="loc-fly__directions">
          <button
            type="button"
            class="loc-fly__directions-btn"
            :aria-label="`Get directions to ${stores[0].name}`"
          >
            <span aria-hidden="true" v-html="directionsSvg" />
          </button>
          <span class="loc-fly__directions-label" aria-hidden="true">Get directions</span>
        </div>
      </div>
    </div>

    <!-- Other stores -->
    <div v-if="stores.length > 1" class="loc-fly__others">
      <p class="loc-fly__others-heading">Other store(s):</p>

      <div
        v-for="(store, i) in stores.slice(1)"
        :key="store.id"
        class="loc-fly__other-item"
      >
        <div v-if="i > 0" class="loc-fly__divider" role="separator" />
        <div class="loc-fly__store-row">
          <div class="loc-fly__store-info">
            <p class="loc-fly__store-name">
              {{ store.name }}
              <span class="loc-fly__store-dist">({{ store.distanceMiles }} mi)</span>
            </p>
            <p class="loc-fly__store-address">{{ store.address }}</p>
            <a :href="`tel:${store.phone}`" class="loc-fly__store-phone">{{ store.phone }}</a>
          </div>
          <div class="loc-fly__directions">
            <button
              type="button"
              class="loc-fly__directions-btn"
              :aria-label="`Get directions to ${store.name}`"
            >
              <span aria-hidden="true" v-html="directionsSvg" />
            </button>
            <span class="loc-fly__directions-label" aria-hidden="true">Get directions</span>
          </div>
        </div>
      </div>
    </div>

    <!-- See all stores -->
    <div class="loc-fly__see-all">
      <LinkCta label="See all stores" :arrow="true" href="#" />
    </div>
  </div>
</template>

<style scoped>
/* ─── Root ───────────────────────────────────────────────── */
.loc-fly {
  background: var(--color-neutral-100);
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  /* Ensure Roboto cascades to all children (buttons/inputs don't inherit by default) */
  font-family: var(--font-family-base);
}

/* ─── Header / back button ───────────────────────────────── */
.loc-fly__header {
  padding: 24px;
  flex-shrink: 0;
}

.loc-fly__back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-nano);   /* 8px */
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  height: 24px;
  color: var(--color-action-accent);
  /* Browsers don't inherit font into <button> — set it here so the label span picks it up */
  font-family: var(--font-family-base);
}

.loc-fly__back-btn:hover .loc-fly__back-label {
  text-decoration: underline;
}

.loc-fly__back-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 4px;
  border-radius: 2px;
}

.loc-fly__back-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;   /* prevent inline-block gap from the SVG */
}

.loc-fly__back-icon :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.loc-fly__back-icon :deep(path) {
  fill: currentColor;
}

.loc-fly__back-label {
  font-size: var(--text-body-lg-size);          /* 16px */
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-action-accent);
}

/* ─── "You're at" + zip input ────────────────────────────── */
.loc-fly__zip-section {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
}

.loc-fly__youre-at {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--text-body-lg-size);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.loc-fly__youre-at-text {
  font-weight: var(--font-weight-light);
}

.loc-fly__youre-at-zip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: var(--font-weight-bold);
}

.loc-fly__pin {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 14px;
  height: 16px;
  line-height: 0;   /* kill inline-block gap */
}

.loc-fly__pin :deep(svg) {
  display: block;
  width: 14px;
  height: 16px;
}

.loc-fly__pin :deep(path) {
  fill: var(--color-neutral-0);
}

.loc-fly__instruction {
  margin: 0;
  font-size: var(--text-label-size);            /* 12px */
  line-height: var(--text-label-line-height);
  color: var(--color-neutral-0);
  font-weight: var(--font-weight-regular);
  width: 241px;
}

/* ─── Zip search field ───────────────────────────────────── */
.loc-fly__search {
  display: flex;
  align-items: center;
  width: 258px;
  height: 48px;
  border-radius: var(--border-radius-pill);
  border: 1px solid var(--color-neutral-80);
  padding: 4px 4px 4px 19px;
  background: var(--color-neutral-100);
  gap: 8px;
  box-sizing: border-box;
}

.loc-fly__search-input {
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  /* inherits font-family from .loc-fly, but font-size/weight must be explicit on inputs */
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.loc-fly__search-input::placeholder {
  color: #a2a6ab;
}

.loc-fly__search-btn {
  flex-shrink: 0;
  height: 40px;
  padding: 0 24px;
  border-radius: var(--border-radius-pill);
  border: none;
  background: var(--color-action-primary);
  color: var(--color-neutral-100);
  /* Buttons don't inherit font from parent — must be explicit */
  font-family: var(--font-family-btn);
  font-size: var(--font-size-btn-sm);           /* 14px */
  font-weight: var(--font-weight-btn);          /* 500 medium */
  line-height: var(--line-height-btn-sm);
  cursor: pointer;
  white-space: nowrap;
}

.loc-fly__search-btn:hover {
  background: var(--color-action-primary-hover);
}

.loc-fly__search-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* ─── Nearest store card ─────────────────────────────────── */
.loc-fly__nearest-card {
  background: var(--color-neutral-95);
  border-top: 1px solid var(--color-neutral-90);
  border-bottom: 1px solid var(--color-neutral-90);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
}

.loc-fly__card-heading {
  margin: 0;
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-light);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

/* ─── Store row (shared nearest + others) ────────────────── */
.loc-fly__store-row {
  display: flex;
  align-items: flex-end;
  gap: 9px;
}

.loc-fly__store-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 13px;
  min-width: 0;
}

.loc-fly__store-name {
  margin: 0;
  font-size: var(--text-body-sm-size);          /* 14px */
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
}

.loc-fly__store-dist {
  font-weight: var(--font-weight-light);
}

.loc-fly__store-address {
  margin: 0;
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
}

.loc-fly__store-phone {
  display: block;
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-lg-line-height); /* 24px — matches Figma spec */
  color: var(--color-action-accent);
  text-decoration: none;
}

.loc-fly__store-phone:hover {
  text-decoration: underline;
}

/* ─── Directions CTA ─────────────────────────────────────── */
.loc-fly__directions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.loc-fly__directions-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-action-accent);
  background: transparent;
  cursor: pointer;
  color: var(--color-action-accent);
  flex-shrink: 0;
}

.loc-fly__directions-btn :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.loc-fly__directions-btn :deep(path) {
  fill: var(--color-action-accent);
}

.loc-fly__directions-btn:hover {
  background: var(--color-accent-90);
}

.loc-fly__directions-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.loc-fly__directions-label {
  font-size: var(--text-label-size);            /* 12px */
  font-weight: var(--font-weight-medium);
  line-height: var(--text-label-line-height);
  color: var(--color-action-accent);
  white-space: nowrap;
  text-align: center;
}

/* ─── Other stores section ───────────────────────────────── */
.loc-fly__others {
  padding: 24px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
}

.loc-fly__others-heading {
  margin: 0;
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-light);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.loc-fly__other-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.loc-fly__divider {
  width: 100%;
  height: 1px;
  background: var(--color-neutral-90);
}

/* ─── See all stores ─────────────────────────────────────── */
.loc-fly__see-all {
  display: flex;
  justify-content: center;
  padding: 32px 24px 32px;
  margin-top: auto;
}
</style>
