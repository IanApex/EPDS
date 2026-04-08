<script setup lang="ts">
import checkSvg       from '../../../icon/Style=Display, Detail=Default, Icon=Check-Small.svg?raw'
import rightSvg  from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Right.svg?raw'

withDefaults(defineProps<{
  /** Visible option label, e.g. "4WD" */
  label: string
  /** Inventory count, e.g. 82 — shown as "(82)" in Neutral40 */
  count?: number
  /** Whether this option is checked (bind with v-model) */
  selected?: boolean
  /**
   * "Returning to selected" state — option was previously applied.
   * Renders light-green background on the filter (left) half.
   */
  returning?: boolean
  /** Label for the secondary navigation link, e.g. "Trim" */
  linkLabel: string
  /** href for the secondary link — renders as <a> when provided */
  linkHref?: string
  /** target for the secondary link */
  linkTarget?: string
}>(), {
  selected:  false,
  returning: false,
})

const emit = defineEmits<{
  'update:selected': [value: boolean]
  /** Emitted when the secondary text link is clicked */
  'link-click':      [event: MouseEvent]
}>()

function handleLinkClick(e: MouseEvent) {
  e.stopPropagation()      // don't toggle the checkbox
  emit('link-click', e)
}
</script>

<template>
  <div
    class="srp-ftl"
    :class="{
      'srp-ftl--selected':  selected,
      'srp-ftl--returning': returning,
    }"
  >
    <!-- ── Left: filter toggle ─────────────────────────── -->
    <label class="srp-ftl__left">
      <input
        type="checkbox"
        class="srp-ftl__input"
        :checked="selected"
        @change="emit('update:selected', ($event.target as HTMLInputElement).checked)"
      />

      <!-- Checkmark badge -->
      <span
        v-if="selected || returning"
        class="srp-ftl__check"
        aria-hidden="true"
        v-html="checkSvg"
      />

      <!-- Label + count -->
      <span class="srp-ftl__content">
        <span class="srp-ftl__label">{{ label }}</span>
        <span v-if="count !== undefined" class="srp-ftl__count">({{ count }})</span>
      </span>
    </label>

    <!-- ── Right: secondary text link ────────────────── -->
    <component
      :is="linkHref ? 'a' : 'button'"
      class="srp-ftl__link"
      :href="linkHref"
      :target="linkHref ? linkTarget : undefined"
      :rel="linkTarget === '_blank' ? 'noopener noreferrer' : undefined"
      :type="linkHref ? undefined : 'button'"
      @click="handleLinkClick"
    >
      <span class="srp-ftl__link-text">{{ linkLabel }}</span>
      <span class="srp-ftl__link-chevron" aria-hidden="true" v-html="rightSvg" />
    </component>
  </div>
</template>

<style scoped>
/* ─── Outer row ────────────────────────────────────────── */
.srp-ftl {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  background: var(--color-neutral-100);
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  transition: background-color 0.15s ease;
}

/* Entire row highlights when EITHER half is hovered */
.srp-ftl:hover {
  background: var(--color-neutral-95);
}

.srp-ftl:has(*:active) {
  background: var(--color-neutral-90);
  border-top-color: var(--color-neutral-90);
  border-bottom-color: var(--color-neutral-90);
}

@media (hover: none) {
  .srp-ftl:has(*:active) {
    background: rgba(0, 111, 166, 0.15);
    border-top-color: var(--color-action-accent);
    border-bottom-color: var(--color-action-accent);
  }
}

/* ─── Left: filter half ────────────────────────────────── */
.srp-ftl__left {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-nano);               /* 8px */
  flex: 1 1 0;
  min-width: 0;
  padding: var(--spacing-xxxs) var(--spacing-xxs);  /* 16px 24px */
  box-sizing: border-box;
  background: transparent;               /* inherits container bg */
  cursor: pointer;
  user-select: none;
}

.srp-ftl__left:has(.srp-ftl__input:focus-visible) {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: -3px;
}

/* ─── Returning to selected — left half green bg ───────── */
.srp-ftl--returning .srp-ftl__left {
  background: var(--color-action-primary-subtle);
}

/* On hover the container goes neutral-95 but left stays green */
.srp-ftl--returning:hover .srp-ftl__left {
  background: var(--color-action-primary-subtle);
}

/* Pressed over returning row: subtle darken via overlay */
.srp-ftl--returning:has(*:active) .srp-ftl__left::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.06);
  pointer-events: none;
}

/* ─── Hidden checkbox ──────────────────────────────────── */
.srp-ftl__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

/* ─── Checkmark badge ──────────────────────────────────── */
.srp-ftl__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: var(--color-action-primary);
  border-radius: var(--border-radius-sm);
}

.srp-ftl__check :deep(svg) {
  width: 24px;
  height: 24px;
}

.srp-ftl__check :deep(path) {
  fill: var(--color-neutral-100);
}

/* ─── Label + count ────────────────────────────────────── */
.srp-ftl__content {
  display: flex;
  align-items: baseline;
  gap: 4px;
  min-width: 0;
}

.srp-ftl__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  white-space: nowrap;
}

.srp-ftl__count {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-light);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-40);
  white-space: nowrap;
}

/* Underline when selected + hover */
.srp-ftl--selected .srp-ftl__left:hover .srp-ftl__content,
.srp-ftl--returning .srp-ftl__left:hover .srp-ftl__content {
  text-decoration: underline;
  text-decoration-color: var(--color-neutral-20);
  text-underline-offset: 2px;
}

/* ─── Right: text link half ────────────────────────────── */
.srp-ftl__link {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: var(--spacing-xxxs) var(--spacing-xxs);  /* 16px 24px */
  box-sizing: border-box;

  background: transparent;               /* inherits container bg */
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.srp-ftl__link:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: -3px;
}

/* ─── Link label ───────────────────────────────────────── */
.srp-ftl__link-text {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);         /* 12px */
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-action-accent);
  white-space: nowrap;
}

.srp-ftl__link:hover .srp-ftl__link-text {
  text-decoration: underline;
  text-decoration-color: var(--color-action-accent);
  text-underline-offset: 2px;
}

/* ─── Link chevron ─────────────────────────────────────── */
.srp-ftl__link-chevron {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.srp-ftl__link-chevron :deep(svg) {
  width: 16px;
  height: 16px;
}

.srp-ftl__link-chevron :deep(path) {
  fill: var(--color-action-accent);
}
</style>
