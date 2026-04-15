<script setup lang="ts">
import { computed } from 'vue'
import SrpFilterChild from '@/components/SrpFilterChild/SrpFilterChild.vue'

export interface FeatureOption {
  value: string
  label: string
  count: number
  /** Raw SVG string for the trailing icon (popular features only) */
  icon?: string
}

const props = withDefaults(defineProps<{
  /** Popular features (shown with trailing icons) */
  popular: FeatureOption[]
  /** Additional features (no icons) */
  more: FeatureOption[]
  /** Currently selected feature values */
  selected?: string[]
  /**
   * Snapshot of selected values at the time the panel opened.
   * Items in this list render with the "returning" green style at the top.
   */
  committed?: string[]
}>(), {
  selected:  () => [],
  committed: () => [],
})

const emit = defineEmits<{
  'update:selected': [values: string[]]
}>()

const allOptions = computed(() => [
  ...props.popular.map(o => ({ ...o, section: 'popular' as const })),
  ...props.more.map(o => ({ ...o, section: 'more' as const })),
])

/**
 * When there are committed (returning) selections, float them to the top
 * in their original order (popular icons first, then more features).
 */
const sortedOptions = computed(() => {
  if (props.committed.length === 0) return null
  const top    = allOptions.value.filter(o =>  props.committed.includes(o.value))
  const bottom = allOptions.value.filter(o => !props.committed.includes(o.value))
  return { top, bottom }
})

const sortedPopular = computed(() => {
  if (!sortedOptions.value) return props.popular
  return sortedOptions.value.bottom.filter(o => o.section === 'popular')
})

const sortedMore = computed(() => {
  if (!sortedOptions.value) return props.more
  return sortedOptions.value.bottom.filter(o => o.section === 'more')
})

function isSelected(value: string) {
  return props.selected.includes(value)
}

function isReturning(value: string) {
  return props.committed.includes(value) && props.selected.includes(value)
}

function toggle(value: string, on: boolean) {
  if (on) {
    emit('update:selected', [...props.selected, value])
  } else {
    emit('update:selected', props.selected.filter(v => v !== value))
  }
}
</script>

<template>
  <div class="srp-features">

    <!-- Returning selections floated to top -->
    <template v-if="sortedOptions && sortedOptions.top.length > 0">
      <SrpFilterChild
        v-for="opt in sortedOptions.top"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isSelected(opt.value)"
        :returning="isReturning(opt.value)"
        @update:selected="toggle(opt.value, $event)"
      >
        <template v-if="opt.icon" #trailing-icon>
          <span
            class="srp-features__icon"
            :class="{ 'srp-features__icon--green': isSelected(opt.value) }"
            aria-hidden="true"
            v-html="opt.icon"
          />
        </template>
      </SrpFilterChild>
    </template>

    <!-- Popular section -->
    <template v-if="sortedPopular.length > 0">
      <div class="srp-features__section-title">Popular</div>
      <SrpFilterChild
        v-for="opt in sortedPopular"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isSelected(opt.value)"
        @update:selected="toggle(opt.value, $event)"
      >
        <template v-if="opt.icon" #trailing-icon>
          <span
            class="srp-features__icon"
            :class="{ 'srp-features__icon--green': isSelected(opt.value) }"
            aria-hidden="true"
            v-html="opt.icon"
          />
        </template>
      </SrpFilterChild>
    </template>

    <!-- More features section -->
    <template v-if="sortedMore.length > 0">
      <div class="srp-features__section-title">More features</div>
      <SrpFilterChild
        v-for="opt in sortedMore"
        :key="opt.value"
        :label="opt.label"
        :count="opt.count"
        :selected="isSelected(opt.value)"
        @update:selected="toggle(opt.value, $event)"
      />
    </template>

  </div>
</template>

<style scoped>
.srp-features {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.srp-features__section-title {
  padding: var(--spacing-xxxs) var(--spacing-xxs);   /* 16px 24px */
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.srp-features__icon {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}

.srp-features__icon :deep(svg) {
  display: block;
  height: 24px;
  width: auto;
}

.srp-features__icon :deep(path),
.srp-features__icon :deep(rect),
.srp-features__icon :deep(circle) {
  fill: var(--color-neutral-0);
}

.srp-features__icon--green :deep(path),
.srp-features__icon--green :deep(rect),
.srp-features__icon--green :deep(circle) {
  fill: var(--color-action-primary);
}
</style>
