<script setup lang="ts">
import gapCarUrl from '../../../Illustrations/GapCar.png'

withDefaults(defineProps<{
  size?: 'sm' | 'lg'
}>(), {
  size: 'lg',
})
</script>

<template>
  <div class="gap-graphic" :class="`gap-graphic--${size}`">

    <!-- Title -->
    <p class="gap-graphic__title">E.g. $20,000 loan balance</p>

    <!-- Amounts row -->
    <div class="gap-graphic__amounts">
      <div class="gap-graphic__amount-group gap-graphic__amount-group--left">
        <span class="gap-graphic__amount">$15,000</span>
        <span class="gap-graphic__label">Insurance payout (market value)</span>
      </div>
      <div class="gap-graphic__amount-group gap-graphic__amount-group--right">
        <span class="gap-graphic__amount">$5,000</span>
        <span class="gap-graphic__label">Total loss protection coverage<sup>1</sup></span>
      </div>
    </div>

    <!-- Bracket lines -->
    <div class="gap-graphic__brackets">
      <!-- Left bracket (black) — insurance payout -->
      <div class="gap-graphic__bracket gap-graphic__bracket--left" />
      <!-- Right bracket (green) — total loss coverage -->
      <div class="gap-graphic__bracket gap-graphic__bracket--right" />
    </div>

    <!-- Car image -->
    <img
      class="gap-graphic__car"
      :src="gapCarUrl"
      alt="Car split showing insurance payout and GAP coverage"
    />
  </div>
</template>

<style scoped>
.gap-graphic {
  position: relative;
  font-family: var(--font-family-base);
  color: var(--color-neutral-0);
}

/* ── Title ── */
.gap-graphic__title {
  margin: 0;
  font-weight: var(--font-weight-light);
  font-style: italic;
}

/* ── Amounts row ── */
.gap-graphic__amounts {
  display: flex;
}

.gap-graphic__amount-group {
  display: flex;
  flex-direction: column;
}

.gap-graphic__amount-group--left {
  flex: 61;
}

.gap-graphic__amount-group--right {
  flex: 39;
}

.gap-graphic__amount {
  font-weight: var(--font-weight-medium);
}

.gap-graphic__label {
  font-weight: var(--font-weight-light);
}

.gap-graphic__label sup {
  font-size: 0.65em;
}

/* ── Brackets ── */
.gap-graphic__brackets {
  display: flex;
}

.gap-graphic__bracket {
  position: relative;
  border-bottom: 1px solid;
}

.gap-graphic__bracket::before,
.gap-graphic__bracket::after {
  content: '';
  position: absolute;
  width: 1px;
}

.gap-graphic__bracket::before {
  left: 0;
}

.gap-graphic__bracket::after {
  right: 0;
}

.gap-graphic__bracket--left {
  flex: 61;
  border-color: var(--color-neutral-0);
}

.gap-graphic__bracket--left::before,
.gap-graphic__bracket--left::after {
  background: var(--color-neutral-0);
}

.gap-graphic__bracket--right {
  flex: 39;
  border-color: var(--color-base-primary-60);
}

.gap-graphic__bracket--right::before,
.gap-graphic__bracket--right::after {
  background: var(--color-base-primary-60);
}

/* ── Car image ── */
.gap-graphic__car {
  display: block;
  width: 100%;
  height: auto;
}

/* ═══════ Large ═══════ */
.gap-graphic--lg {
  max-width: 671px;
}

.gap-graphic--lg .gap-graphic__title {
  font-size: 40px;
  line-height: 46px;
  margin-bottom: 4px;
}

.gap-graphic--lg .gap-graphic__amount {
  font-size: 28px;
  line-height: 14px;
  padding: 8px 0;
}

.gap-graphic--lg .gap-graphic__label {
  font-size: var(--text-body-lg-size);
  line-height: var(--text-body-lg-line-height);
}

.gap-graphic--lg .gap-graphic__brackets {
  margin-top: 4px;
  margin-bottom: 22px;
}

.gap-graphic--lg .gap-graphic__bracket {
  height: 4px;
}

.gap-graphic--lg .gap-graphic__bracket::before,
.gap-graphic--lg .gap-graphic__bracket::after {
  top: 0;
  height: calc(100% + 3px);
}

/* ═══════ Small ═══════ */
.gap-graphic--sm {
  max-width: 336px;
}

.gap-graphic--sm .gap-graphic__title {
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 2px;
}

.gap-graphic--sm .gap-graphic__amount {
  font-size: 16px;
  line-height: 16px;
  font-weight: var(--font-weight-bold);
  padding: 4px 0;
}

.gap-graphic--sm .gap-graphic__label {
  font-size: 8px;
  line-height: 10px;
}

.gap-graphic--sm .gap-graphic__brackets {
  margin-top: 2px;
  margin-bottom: 11px;
}

.gap-graphic--sm .gap-graphic__bracket {
  height: 2px;
}

.gap-graphic--sm .gap-graphic__bracket::before,
.gap-graphic--sm .gap-graphic__bracket::after {
  top: 0;
  height: calc(100% + 2px);
}
</style>
