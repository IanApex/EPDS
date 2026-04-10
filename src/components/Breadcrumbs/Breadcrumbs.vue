<script lang="ts">
export interface BreadcrumbItem {
  label: string
  href?: string
}
</script>

<script setup lang="ts">
import phoneIconRaw from '@icons/Style=Communication, Detail=Support, Icon=Phone.svg?raw'

withDefaults(defineProps<{
  items: BreadcrumbItem[]
  phone?: string
}>(), {
  phone: '',
})
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs__list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="breadcrumbs__item"
      >
        <span v-if="i > 0" class="breadcrumbs__separator" aria-hidden="true">/</span>
        <a
          v-if="item.href"
          :href="item.href"
          class="breadcrumbs__link"
        >{{ item.label }}</a>
        <span
          v-else
          class="breadcrumbs__current"
          aria-current="page"
        >{{ item.label }}</span>
      </li>
    </ol>

    <div v-if="phone" class="breadcrumbs__phone">
      <span class="breadcrumbs__phone-icon" aria-hidden="true" v-html="phoneIconRaw" />
      <a :href="`tel:${phone.replace(/[^+\d]/g, '')}`" class="breadcrumbs__phone-number">{{ phone }}</a>
    </div>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);
  height: 48px;
  padding: var(--spacing-xxxs) 0;
  box-sizing: border-box;
  width: 100%;
}

.breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1 1 0%;
  min-width: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0;
}

.breadcrumbs__item {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.breadcrumbs__separator {
  margin: 0 12px;
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-neutral-0);
  user-select: none;
}

.breadcrumbs__link {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-accent-30);
  text-decoration: none;
}

.breadcrumbs__link:hover {
  text-decoration: underline;
}

.breadcrumbs__link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

.breadcrumbs__current {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-neutral-0);
}

/* ─── Phone ──────────────────────────────────────────────── */
.breadcrumbs__phone {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.breadcrumbs__phone-icon {
  display: flex;
  width: 18px;
  height: 18px;
  color: var(--color-neutral-0);
}

.breadcrumbs__phone-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.breadcrumbs__phone-icon :deep(path) {
  fill: currentColor;
}

.breadcrumbs__phone-number {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  text-decoration: none;
  white-space: nowrap;
}

.breadcrumbs__phone-number:hover {
  text-decoration: underline;
}

.breadcrumbs__phone-number:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─── Mobile: hide phone, allow wrap ─────────────────────── */
@media (max-width: 599px) {
  .breadcrumbs__phone {
    display: none;
  }
}
</style>
