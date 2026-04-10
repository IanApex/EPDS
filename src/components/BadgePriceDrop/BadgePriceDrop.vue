<script setup lang="ts">
import arrowDownRightSvg from '../../../icon/Style=Arrows, Detail=Tail, Icon=Down-Right.svg?raw'

withDefaults(defineProps<{
  /** Badge text — e.g. "New price drop" or "Just dropped $2,000" */
  label?: string
  /** Whether to show the circular arrow icon */
  showIcon?: boolean
  /** Visual variant: SRP sits on the card corner; VDP is a standalone rounded pill */
  variant?: 'srp' | 'vdp'
}>(), {
  label: 'New price drop',
  showIcon: true,
  variant: 'srp',
})
</script>

<template>
  <div
    class="badge-price-drop"
    :class="`badge-price-drop--${variant}`"
  >
    <span
      v-if="showIcon"
      class="badge-price-drop__icon"
      aria-hidden="true"
      v-html="arrowDownRightSvg"
    />
    <span class="badge-price-drop__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.badge-price-drop {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-base-primary-90);
  white-space: nowrap;
}

/* ── SRP variant: sits in the top-left corner of an SRP tile ── */
.badge-price-drop--srp {
  padding: 6px 15px 6px 16px;
  border-top-left-radius: var(--border-radius-md);
  border-bottom-right-radius: 2px;
}

/* ── VDP variant: standalone rounded pill ── */
.badge-price-drop--vdp {
  height: 32px;
  padding: 8px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  box-sizing: border-box;
}

/* ── Icon circle ── */
.badge-price-drop__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: var(--border-radius-pill);
  background: var(--color-base-primary-40);
  color: var(--color-neutral-100);
}

.badge-price-drop__icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.badge-price-drop__icon :deep(path) {
  fill: currentColor;
}

/* ── Label ── */
.badge-price-drop__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-base-primary-40);
}
</style>
