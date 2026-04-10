<script setup lang="ts">
import { computed } from 'vue'
import arrowLeftRaw from '@icons/Style=Arrows, Detail=Tail, Icon=Left.svg?raw'
import arrowRightRaw from '@icons/Style=Arrows, Detail=Tail, Icon=Right.svg?raw'

const props = withDefaults(defineProps<{
  totalPages: number
  modelValue?: number
}>(), {
  modelValue: 1,
})

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

const isFirst = computed(() => props.modelValue <= 1)
const isLast = computed(() => props.modelValue >= props.totalPages)

type PageItem = number | '...'

const pages = computed<PageItem[]>(() => {
  const total = props.totalPages
  const current = props.modelValue

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 3) {
    return [1, 2, 3, 4, '...', total]
  }

  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
})

function go(page: number) {
  if (page < 1 || page > props.totalPages || page === props.modelValue) return
  emit('update:modelValue', page)
}
</script>

<template>
  <nav class="pagination" aria-label="Pagination">
    <button
      class="pagination__arrow"
      :class="{ 'pagination__arrow--hidden': isFirst }"
      :disabled="isFirst"
      :aria-label="'Previous page'"
      @click="go(modelValue - 1)"
    >
      <span class="pagination__arrow-icon" v-html="arrowLeftRaw" />
    </button>

    <div class="pagination__pill">
      <div class="pagination__pages">
        <template v-for="(item, i) in pages" :key="i">
          <span v-if="item === '...'" class="pagination__ellipsis">...</span>
          <button
            v-else
            class="pagination__number"
            :class="{ 'pagination__number--active': item === modelValue }"
            :aria-label="`Page ${item}`"
            :aria-current="item === modelValue ? 'page' : undefined"
            @click="go(item)"
          >
            {{ item }}
          </button>
        </template>
      </div>
    </div>

    <button
      class="pagination__arrow"
      :class="{ 'pagination__arrow--hidden': isLast }"
      :disabled="isLast"
      :aria-label="'Next page'"
      @click="go(modelValue + 1)"
    >
      <span class="pagination__arrow-icon" v-html="arrowRightRaw" />
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-nano);
}

/* ─── Arrow buttons ──────────────────────────────────────── */
.pagination__arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: var(--border-radius-pill);
  background: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-90);
  cursor: pointer;
  padding: 0;
  color: var(--color-neutral-0);
  transition: background 0.15s ease, border-color 0.15s ease;
}

.pagination__arrow:hover:not(:disabled) {
  background: var(--color-accent-90);
  border-color: var(--color-accent-90);
}

.pagination__arrow:active:not(:disabled) {
  background: #C8E0E9;
  border-color: #C8E0E9;
}

.pagination__arrow:focus-visible {
  outline: none;
  border: 3px solid var(--color-accessibility-80);
  background: var(--color-neutral-100);
}

.pagination__arrow--hidden {
  opacity: 0;
  pointer-events: none;
}

.pagination__arrow-icon {
  display: flex;
  width: 24px;
  height: 24px;
}

.pagination__arrow-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.pagination__arrow-icon :deep(path) {
  fill: currentColor;
}

.pagination__arrow:hover:not(:disabled) .pagination__arrow-icon {
  width: 26px;
  height: 26px;
}

/* ─── Pill container ─────────────────────────────────────── */
.pagination__pill {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 2px;
  border-radius: 46px;
  background: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-90);
  box-sizing: border-box;
}

.pagination__pages {
  display: flex;
  align-items: center;
  gap: 2px;
}

/* ─── Number buttons ─────────────────────────────────────── */
.pagination__number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 22px;
  border: 3px solid transparent;
  background: none;
  padding: 0;
  cursor: pointer;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
  box-sizing: border-box;
  transition: background 0.15s ease, color 0.15s ease;
}

.pagination__number:hover:not(.pagination__number--active) {
  background: var(--color-accent-90);
  font-weight: var(--font-weight-bold);
}

.pagination__number:active:not(.pagination__number--active) {
  background: #C8E0E9;
  font-weight: var(--font-weight-bold);
}

.pagination__number:focus-visible {
  outline: none;
  border-color: var(--color-accessibility-80);
}

.pagination__number--active {
  background: var(--color-accent-40);
  color: var(--color-neutral-100);
  font-weight: var(--font-weight-bold);
  cursor: default;
}

/* ─── Ellipsis ───────────────────────────────────────────── */
.pagination__ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 44px;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-70);
  user-select: none;
  flex-shrink: 0;
}

/* ─── Responsive: mobile pill stretches ──────────────────── */
@media (max-width: 599px) {
  .pagination__pill {
    flex: 1 1 0%;
    min-width: 0;
  }

  .pagination__pages {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
