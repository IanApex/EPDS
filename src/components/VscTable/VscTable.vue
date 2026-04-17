<script lang="ts">
export interface VscTableRow {
  label: string
  withoutPlan: string
  withPlan: string
}

const DEFAULT_ROWS: VscTableRow[] = [
  { label: 'Brakes', withoutPlan: '$1,574', withPlan: '$100' },
  { label: 'Electrical system', withoutPlan: '$808', withPlan: '$100' },
  { label: 'Air conditioning', withoutPlan: '$1,402', withPlan: '$100' },
  { label: 'Fuel system', withoutPlan: '$1,382', withPlan: '$100' },
  { label: 'Engine', withoutPlan: '$5,329', withPlan: '$100' },
]
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  /** Display size */
  size?: 'sm' | 'lg'
  /** Table data rows */
  rows?: VscTableRow[]
}>(), {
  size: 'lg',
  rows: () => DEFAULT_ROWS,
})
</script>

<template>
  <div class="vsc-table" :class="`vsc-table--${size}`">

    <!-- Small: banner -->
    <div v-if="size === 'sm'" class="vsc-table__banner">
      Save more with a <strong class="vsc-table__banner-highlight">vehicle service contract</strong>
    </div>

    <!-- Table grid -->
    <div class="vsc-table__grid">

      <!-- Column 1: Repair type -->
      <div class="vsc-table__col vsc-table__col--labels">
        <div class="vsc-table__header vsc-table__cell">
          <span class="vsc-table__header-title">Repair type</span>
          <span class="vsc-table__header-sub">Most common</span>
        </div>
        <div
          v-for="(row, i) in rows"
          :key="`label-${i}`"
          class="vsc-table__cell vsc-table__label-cell"
          :class="{ 'vsc-table__cell--alt': i % 2 === 0 }"
        >
          {{ row.label }}
        </div>
      </div>

      <!-- Column 2: Without plan -->
      <div class="vsc-table__col">
        <div class="vsc-table__header vsc-table__header--center vsc-table__cell">
          <span class="vsc-table__header-title">{{ size === 'sm' ? 'w/o plan' : 'without plan' }}</span>
          <span class="vsc-table__header-sub">Avg. cost</span>
        </div>
        <div
          v-for="(row, i) in rows"
          :key="`without-${i}`"
          class="vsc-table__cell vsc-table__cost-cell"
          :class="{ 'vsc-table__cell--alt': i % 2 === 0 }"
        >
          {{ row.withoutPlan }}
        </div>
      </div>

      <!-- Column 3: With plan (highlighted) -->
      <div class="vsc-table__col vsc-table__col--highlight">
        <div class="vsc-table__header vsc-table__header--center vsc-table__cell">
          <span class="vsc-table__header-title vsc-table__header-title--green">{{ size === 'sm' ? 'w/ plan' : 'with plan' }}</span>
          <span class="vsc-table__header-sub">Your cost<sup>1</sup></span>
        </div>
        <div
          v-for="(row, i) in rows"
          :key="`with-${i}`"
          class="vsc-table__cell vsc-table__plan-cell"
          :class="{ 'vsc-table__cell--alt': i % 2 === 0 }"
        >
          {{ row.withPlan }}
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.vsc-table {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-base);
}

/* ── Banner (small only) ── */
.vsc-table__banner {
  background: var(--color-neutral-95);
  padding: var(--spacing-xxxs);
  text-align: center;
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-light);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.vsc-table__banner-highlight {
  font-weight: var(--font-weight-bold);
  color: var(--color-action-primary);
}

/* ── Grid ── */
.vsc-table__grid {
  display: flex;
}

.vsc-table__col {
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  min-width: 0;
}

.vsc-table--sm .vsc-table__col--labels {
  flex: 1.25 1 0%;
}

.vsc-table__col--highlight {
  border-radius: var(--border-radius-sm);
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 1;
}

/* ── Cells ── */
.vsc-table__cell {
  display: flex;
  align-items: center;
  padding: var(--spacing-xxxs);
  background: var(--color-neutral-100);
  box-sizing: border-box;
}

.vsc-table__cell--alt {
  background: var(--color-neutral-95);
}

/* ── Header cells ── */
.vsc-table__header {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.vsc-table__header--center {
  align-items: center;
}

.vsc-table__header-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-20);
}

.vsc-table__header-title--green {
  color: var(--color-action-primary);
}

.vsc-table__header-sub {
  font-weight: var(--font-weight-light);
  color: var(--color-neutral-0);
}

.vsc-table__header-sub sup {
  font-size: 0.65em;
}

/* ── Data cells ── */
.vsc-table__label-cell {
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-0);
  white-space: nowrap;
}

.vsc-table__cost-cell {
  justify-content: center;
  font-weight: var(--font-weight-regular);
  color: var(--color-neutral-0);
  white-space: nowrap;
}

.vsc-table__plan-cell {
  justify-content: center;
  font-weight: var(--font-weight-bold);
  color: var(--color-action-primary);
  white-space: nowrap;
}

/* ── Large size ── */
.vsc-table--lg .vsc-table__header {
  height: 71px;
}

.vsc-table--lg .vsc-table__header-title {
  font-size: 24px;
  line-height: 24px;
}

.vsc-table--lg .vsc-table__header-sub {
  font-size: var(--text-body-lg-size);
  line-height: var(--text-body-lg-line-height);
}

.vsc-table--lg .vsc-table__cell:not(.vsc-table__header) {
  height: 67px;
}

.vsc-table--lg .vsc-table__label-cell {
  font-size: var(--text-body-lg-size);
  line-height: var(--text-body-lg-line-height);
}

.vsc-table--lg .vsc-table__cost-cell {
  font-size: var(--text-body-sm-size);
  line-height: var(--text-body-sm-line-height);
}

.vsc-table--lg .vsc-table__plan-cell {
  font-size: var(--text-body-lg-size);
  line-height: var(--text-body-lg-line-height);
}

/* ── Small size ── */
.vsc-table--sm .vsc-table__header {
  height: 71px;
}

.vsc-table--sm .vsc-table__header-title {
  font-size: var(--text-body-lg-size);
  line-height: var(--text-body-lg-line-height);
}

.vsc-table--sm .vsc-table__header-sub {
  font-size: var(--text-body-sm-size);
  line-height: var(--text-body-sm-line-height);
}

.vsc-table--sm .vsc-table__cell:not(.vsc-table__header) {
  height: 52px;
}

.vsc-table--sm .vsc-table__label-cell {
  font-size: var(--text-body-sm-size);
  line-height: var(--text-body-sm-line-height);
}

.vsc-table--sm .vsc-table__cost-cell {
  font-size: var(--text-body-sm-size);
  line-height: var(--text-body-sm-line-height);
}

.vsc-table--sm .vsc-table__plan-cell {
  font-size: var(--text-body-sm-size);
  line-height: var(--text-body-sm-line-height);
}
</style>
