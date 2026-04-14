<script setup lang="ts">
import { onMounted, onUnmounted, ref, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Tooltip body copy */
    text: string
    /** Accessible name for the trigger control */
    ariaLabel: string
    /** Where the caret sits along the panel edge */
    caretAlign?: 'center' | 'right' | 'left'
    closeOnClickOutside?: boolean
    closeOnEscape?: boolean
  }>(),
  {
    caretAlign: 'center',
    closeOnClickOutside: false,
    closeOnEscape: false,
  },
)

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelId = useId()

function toggle(e: MouseEvent) {
  e.stopPropagation()
  open.value = !open.value
}

function close() {
  open.value = false
}

function onDocPointerDown(e: MouseEvent) {
  if (!open.value || !props.closeOnClickOutside) return
  if (!rootRef.value?.contains(e.target as Node)) close()
}

function onDocKeydown(e: KeyboardEvent) {
  if (!open.value || !props.closeOnEscape) return
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocPointerDown)
  document.addEventListener('keydown', onDocKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocPointerDown)
  document.removeEventListener('keydown', onDocKeydown)
})
</script>

<template>
  <div
    ref="rootRef"
    class="tooltip"
  >
    <button
      type="button"
      class="tooltip__trigger"
      :aria-expanded="open"
      :aria-controls="panelId"
      :aria-label="ariaLabel"
      @click="toggle"
    >
      <slot name="icon" />
    </button>
    <div
      v-show="open"
      :id="panelId"
      class="tooltip__panel"
      :class="`tooltip__panel--caret-${caretAlign}`"
      role="tooltip"
    >
      {{ text }}
      <div
        class="tooltip__caret"
        :class="`tooltip__caret--${caretAlign}`"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* ── Trigger button ── */
.tooltip__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  flex-shrink: 0;
  line-height: 0;
  color: var(--color-neutral-0);
}

.tooltip__trigger :deep(svg) {
  width: 16px;
  height: 16px;
}

.tooltip__trigger :deep(path) {
  fill: currentColor;
}

.tooltip__trigger:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  border-radius: var(--border-radius-circular);
}

/* ── Panel (always above trigger) ── */
.tooltip__panel {
  position: absolute;
  z-index: 20;
  bottom: calc(100% + 12px);
  width: max-content;
  max-width: 175px;
  background: var(--color-neutral-0);
  color: var(--color-neutral-100);
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  text-align: center;
  padding: var(--spacing-xxxs);
  border-radius: 6px;
  white-space: normal;
}

/* ── Caret alignment — panel positioning ── */
.tooltip__panel--caret-center {
  left: 50%;
  transform: translateX(-50%);
}

.tooltip__panel--caret-right {
  right: -8px;
}

.tooltip__panel--caret-left {
  left: -8px;
}

/* ── Caret triangle (16×8) ── */
.tooltip__caret {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}

/* Caret pointing down (panel always above) */
.tooltip__caret {
  bottom: -8px;
  border-top: 8px solid var(--color-neutral-0);
}

/* Horizontal caret positions */
.tooltip__caret--center {
  left: 50%;
  transform: translateX(-50%);
}

.tooltip__caret--right {
  right: 14px;
}

.tooltip__caret--left {
  left: 14px;
}
</style>
