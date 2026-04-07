<script setup lang="ts">
import { computed } from 'vue'
import errorSvg       from '../../../icon/Style=Alerts, Detail=Warning, Icon=NA.svg?raw'
import warningSvg     from '../../../icon/Style=Alerts, Detail=Info, Icon=NA.svg?raw'
import successSvg     from '../../../icon/Style=Display, Detail=Default, Icon=Check-Circle.svg?raw'
import notificationSvg from '../../../icon/Style=Alerts, Detail=Bell, Icon=NA.svg?raw'

const props = withDefaults(defineProps<{
  /** Visual variant */
  variant?: 'error' | 'warning' | 'success' | 'notification'
  /** Optional title text above the body */
  title?: string
}>(), {
  variant: 'warning',
})

const iconMap: Record<string, string> = {
  error:        errorSvg,
  warning:      warningSvg,
  success:      successSvg,
  notification: notificationSvg,
}

const icon = computed(() => iconMap[props.variant])

// error/warning are live regions; others are polite status
const role = computed(() =>
  props.variant === 'error' || props.variant === 'warning' ? 'alert' : 'status'
)
</script>

<template>
  <div
    class="alert"
    :class="`alert--${variant}`"
    :role="role"
  >
    <span class="alert__icon" aria-hidden="true" v-html="icon" />
    <div class="alert__content">
      <p v-if="title" class="alert__title">{{ title }}</p>
      <div class="alert__body"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
/* ─── Shared layout ───────────────────────────────────────── */
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-nano);        /* 8px */
  padding: var(--spacing-xxxs);   /* 16px */
  border-radius: var(--border-radius-lg); /* 16px */
  border-width: var(--border-width-hairline);
  border-style: solid;
  box-sizing: border-box;
}

/* ─── Icon ────────────────────────────────────────────────── */
.alert__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: var(--alert-icon-color);
}

.alert__icon :deep(path) {
  fill: var(--alert-icon-color);
}

/* ─── Content ─────────────────────────────────────────────── */
.alert__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.alert__title {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);        /* 16px */
  font-weight: var(--font-weight-bold);       /* 700 */
  line-height: var(--text-body-lg-line-height);
  color: var(--alert-text-color);
}

.alert__body {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);        /* 16px */
  font-weight: var(--font-weight-regular);    /* 400 */
  line-height: var(--text-body-lg-line-height);
  color: var(--alert-text-color);
}

/* ─── Variants ────────────────────────────────────────────── */
.alert--error {
  background: var(--color-warning-90);
  border-color: var(--color-warning-40);
  --alert-icon-color: var(--color-warning-40);
  --alert-text-color: var(--color-neutral-0);
}

.alert--warning {
  background: var(--color-alert-90);
  border-color: var(--color-alert-70);
  --alert-icon-color: var(--color-alert-70);
  --alert-text-color: var(--color-neutral-0);
}

.alert--success {
  background: var(--color-base-primary-90);
  border-color: var(--color-base-primary-50);
  --alert-icon-color: var(--color-base-primary-50);
  --alert-text-color: var(--color-neutral-0);
}

.alert--notification {
  background: var(--color-accent-90);
  border-color: var(--color-accent-40);
  --alert-icon-color: var(--color-accent-40);
  --alert-text-color: var(--color-neutral-0);
}
</style>
