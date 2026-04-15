<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import filterIconSvg from '@icons/Style=Display, Detail=Menu, Icon=Menu-Filter.svg?raw'
import leftArrowSvg  from '@icons/Style=Arrows, Detail=No-Tail, Icon=Left.svg?raw'
import SrpFilterParent from '@/components/SrpFilterParent/SrpFilterParent.vue'

export interface FilterCategory {
  /** Unique key used to identify which child panel to show */
  key: string
  /** Display label for the filter category row */
  label: string
  /** True when one or more child options are selected — bolds the row label */
  hasSelection: boolean
  /**
   * When true, the standard child-title section is hidden.
   * Use for filters that render their own header (e.g. `SrpFilterMakeModelTrim`).
   */
  hideTitle?: boolean
}

const props = withDefaults(defineProps<{
  /** Ordered list of filter categories shown in the parent panel */
  categories: FilterCategory[]
  /**
   * Key of the currently active child filter panel, or `null` for the parent list.
   * Bind with `v-model`.
   */
  modelValue?: string | null
  /**
   * When true, hides the built-in "Filters / Reset" header row.
   * Use in the mobile drawer which provides its own header.
   */
  hideHeader?: boolean
}>(), {
  modelValue:  null,
  hideHeader:  false,
})

const emit = defineEmits<{
  /** v-model for the active child filter key; `null` means parent view */
  'update:modelValue': [key: string | null]
  /** Fired when the user clicks the "Reset" button in the parent header */
  'reset': []
}>()

const backBtnRef = ref<HTMLButtonElement | null>(null)

const activeKey = computed(() => props.modelValue ?? null)

const activeCategory = computed(
  () => props.categories.find(c => c.key === activeKey.value) ?? null,
)

function openFilter(key: string) {
  emit('update:modelValue', key)
}

function closeFilter() {
  emit('update:modelValue', null)
}

// Move focus to the back button when entering a child panel for keyboard users
watch(activeKey, async (newKey) => {
  if (newKey !== null) {
    await nextTick()
    backBtnRef.value?.focus()
  }
})
</script>

<template>
  <div class="srp-filters-panel" :class="{ 'srp-filters-panel--no-header': hideHeader }">
      <!-- ─── Parent panel — normal flow, drives container height ── -->
      <div
        class="srp-filters-panel__pane srp-filters-panel__pane--parent"
        :class="{
          'srp-filters-panel__pane--parent-out':  activeKey !== null,
          'srp-filters-panel__pane--no-interact': activeKey !== null,
        }"
        :aria-hidden="activeKey !== null ? 'true' : undefined"
        aria-label="Filter categories"
      >
        <!-- Header: filter icon + "Filters" label + Reset link -->
        <div v-if="!hideHeader" class="srp-filters-panel__parent-header">
          <div class="srp-filters-panel__parent-title">
            <span
              class="srp-filters-panel__filter-icon"
              aria-hidden="true"
              v-html="filterIconSvg"
            />
            <span class="srp-filters-panel__filter-label">Filters</span>
          </div>
          <button
            type="button"
            class="srp-filters-panel__reset"
            @click="emit('reset')"
          >
            Reset
          </button>
        </div>

        <!-- Category rows -->
        <div class="srp-filters-panel__parent-list" role="list">
          <SrpFilterParent
            v-for="cat in categories"
            :key="cat.key"
            :label="cat.label"
            :hasSelection="cat.hasSelection"
            @click="openFilter(cat.key)"
          />
        </div>
      </div>

      <!-- ─── Child panel — absolute overlay, slides in from right ── -->
      <div
        class="srp-filters-panel__pane srp-filters-panel__pane--child"
        :class="{
          'srp-filters-panel__pane--child-in':    activeKey !== null,
          'srp-filters-panel__pane--no-interact': activeKey === null,
        }"
        :aria-hidden="activeKey === null ? 'true' : undefined"
        :aria-label="activeCategory ? `${activeCategory.label} filters` : 'Filter options'"
      >
        <!-- Back nav: ← All filters -->
        <div class="srp-filters-panel__child-header">
          <button
            ref="backBtnRef"
            type="button"
            class="srp-filters-panel__back-btn"
            @click="closeFilter"
          >
            <span
              class="srp-filters-panel__back-icon"
              aria-hidden="true"
              v-html="leftArrowSvg"
            />
            <span class="srp-filters-panel__back-label">All filters</span>
          </button>
        </div>

        <!-- Section title — e.g. "Body style" (hidden when the child renders its own header) -->
        <div
          v-if="activeCategory && !activeCategory.hideTitle"
          class="srp-filters-panel__child-title"
        >
          {{ activeCategory.label }}
        </div>

        <!-- Consumer-provided child filter options -->
        <div class="srp-filters-panel__child-body">
          <slot name="child" :activeFilter="activeKey" />
        </div>
      </div>
  </div>
</template>

<style scoped>
/* ─── Outer wrapper — clips horizontal slide ──────────────── */
.srp-filters-panel {
  position: relative;
  /* clip only the horizontal axis so the sliding animation is contained
     but NO scroll container is created — scroll events pass through to the
     sidebar / drawer body, which own the vertical scroll. */
  overflow-x: clip;
  width: 100%;
  background: var(--color-neutral-100);
}

/* When the built-in header is hidden (mobile drawer provides its own) */
.srp-filters-panel--no-header .srp-filters-panel__pane {
  padding-top: 0;
}

/* ─── Shared pane base ────────────────────────────────────── */
.srp-filters-panel__pane {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: var(--spacing-xxs);    /* 24px */
  gap: var(--spacing-xxs);            /* 24px */
}

/* ─── Parent pane — normal flow, drives container height ───── */
.srp-filters-panel__pane--parent {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

/* Slide parent left when a child filter is active */
.srp-filters-panel__pane--parent-out {
  transform: translateX(-100%);
}

/* ─── Prevent interaction on the offscreen pane ──────────── */
.srp-filters-panel__pane--no-interact {
  pointer-events: none;
  user-select: none;
}

/* ─── Child pane — absolute, starts offscreen right ──────── */
.srp-filters-panel__pane--child {
  position: absolute;
  top: 0;
  left: 0;
  gap: 0;                             /* sections touch edge-to-edge; borders provide separation */
  transform: translateX(100%);        /* offscreen right by default */
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

/* Slide child in when active */
.srp-filters-panel__pane--child-in {
  transform: translateX(0);
}

/* ─── Parent header: [filter icon + "Filters"] [Reset] ─────── */
.srp-filters-panel__parent-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px var(--spacing-xxxs);  /* 2px 16px */
  flex-shrink: 0;
}

.srp-filters-panel__parent-title {
  display: flex;
  align-items: center;
  gap: var(--spacing-nano);           /* 8px */
}

.srp-filters-panel__filter-icon {
  display: inline-flex;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.srp-filters-panel__filter-icon :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.srp-filters-panel__filter-icon :deep(path) {
  fill: var(--color-neutral-0);
}

.srp-filters-panel__filter-label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);     /* 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
}

.srp-filters-panel__reset {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);     /* 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-action-accent);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.srp-filters-panel__reset:hover {
  text-decoration: underline;
}

.srp-filters-panel__reset:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─── Filter category list ────────────────────────────────── */
.srp-filters-panel__parent-list {
  display: flex;
  flex-direction: column;
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
}

/* ─── Child back button header ────────────────────────────── */
.srp-filters-panel__child-header {
  padding: 2px var(--spacing-xxs) 22px;   /* 2px 24px 22px */
  flex-shrink: 0;
}

@media (max-width: 1023px) {
  .srp-filters-panel__child-header {
    padding: var(--spacing-xxxs) var(--spacing-xxs);   /* 16px 24px */
  }
}

.srp-filters-panel__back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-nano);          /* 8px */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 24px;
}

.srp-filters-panel__back-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.srp-filters-panel__back-icon :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.srp-filters-panel__back-icon :deep(path) {
  fill: var(--color-action-accent);
}

.srp-filters-panel__back-label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);   /* 16px */
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-action-accent);
}

.srp-filters-panel__back-btn:hover .srp-filters-panel__back-label {
  text-decoration: underline;
}

.srp-filters-panel__back-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 4px;
  border-radius: 2px;
}

/* ─── Child section title — e.g. "Body style" ─────────────── */
.srp-filters-panel__child-title {
  padding: var(--spacing-xxxs) var(--spacing-xxs);  /* 16px 24px */
  flex-shrink: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);   /* 16px */
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
}

/* ─── Child body — wraps the slot content ──────────────────── */
.srp-filters-panel__child-body {
  display: flex;
  flex-direction: column;
}
</style>
