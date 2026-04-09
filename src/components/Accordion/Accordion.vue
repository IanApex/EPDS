<script setup lang="ts">
import { ref, computed } from 'vue'
import chevronSvg from '../../../icon/Style=Arrows, Detail=No-Tail, Icon=Down.svg?raw'

const props = withDefaults(defineProps<{
  /** Header text */
  label: string
  /** sm: 16px Light label, 12px gap; lg: 22px Light label, 24px gap */
  size?: 'sm' | 'lg'
  /** Controlled open state — use with v-model */
  modelValue?: boolean
}>(), {
  size: 'sm',
  modelValue: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Uncontrolled fallback when v-model not provided
const internalOpen = ref(false)
const isOpen = computed(() =>
  props.modelValue !== undefined ? props.modelValue : internalOpen.value
)

function toggle() {
  const next = !isOpen.value
  if (props.modelValue !== undefined) {
    emit('update:modelValue', next)
  } else {
    internalOpen.value = next
  }
}

// ─── Height animation (0 → scrollHeight → auto) ───────────────────────────────
function beforeEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = '0'
  e.style.overflow = 'hidden'
}
function onEnter(el: Element, done: () => void) {
  const e = el as HTMLElement
  e.style.height = e.scrollHeight + 'px'
  e.addEventListener('transitionend', done, { once: true })
}
function afterEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = 'auto'
  e.style.overflow = ''
}
function beforeLeave(el: Element) {
  const e = el as HTMLElement
  e.style.height = e.scrollHeight + 'px'
  e.style.overflow = 'hidden'
}
function onLeave(el: Element, done: () => void) {
  const e = el as HTMLElement
  void e.offsetHeight // force reflow before collapsing
  e.style.height = '0'
  e.addEventListener('transitionend', done, { once: true })
}
function afterLeave(el: Element) {
  const e = el as HTMLElement
  e.style.height = ''
  e.style.overflow = ''
}
</script>

<template>
  <div
    class="accordion"
    :class="[`accordion--${size}`, { 'accordion--open': isOpen }]"
  >
    <button
      class="accordion__trigger"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="accordion__label">{{ label }}</span>
      <span class="accordion__chevron" aria-hidden="true" v-html="chevronSvg" />
    </button>

    <Transition
      @before-enter="beforeEnter"
      @enter="onEnter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="onLeave"
      @after-leave="afterLeave"
    >
      <div v-if="isOpen" class="accordion__body">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ─── Outer container ─────────────────────────────────────── */
.accordion {
  background: var(--color-neutral-100);
  border: var(--border-width-hairline) solid var(--color-neutral-85);
  border-radius: var(--border-radius-lg); /* 16px */
  padding: var(--spacing-xxs);            /* 24px */
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}

.accordion:has(.accordion__trigger:hover) {
  border-color: var(--color-neutral-80);
}

/* ─── Trigger button (full-width header row) ──────────────── */
.accordion__trigger {
  display: flex;
  align-items: center;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  color: var(--color-neutral-0);
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-light); /* 300 */
}

.accordion__trigger:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}

/* ─── Size variants ───────────────────────────────────────── */
.accordion--sm .accordion__trigger {
  gap: var(--spacing-micro); /* 12px */
  min-height: 24px;
}

.accordion--sm .accordion__label {
  font-size: var(--text-body-lg-size);        /* 16px */
  line-height: var(--text-body-lg-line-height); /* 1.5 → 24px */
}

.accordion--lg .accordion__trigger {
  gap: var(--spacing-xxs); /* 24px */
  min-height: 24px;
}

.accordion--lg .accordion__label {
  font-size: var(--text-h5-size);        /* 22px */
  line-height: var(--text-h5-line-height); /* 1.2 */
}

/* ─── Label ───────────────────────────────────────────────── */
.accordion__label {
  flex: 1;
  min-width: 0;
}

/* ─── Chevron ─────────────────────────────────────────────── */
.accordion__chevron {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease;
  line-height: 0;
}

.accordion__chevron :deep(path) {
  fill: var(--color-neutral-0);
}

.accordion--open .accordion__chevron {
  transform: rotate(180deg);
}

/* ─── Body (animated) ─────────────────────────────────────── */
.accordion__body {
  padding-top: var(--spacing-micro); /* 12px gap between label and content */
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);        /* 14px */
  font-weight: var(--font-weight-regular);    /* 400 */
  line-height: var(--text-body-sm-line-height); /* 1.57 → 22px */
  color: var(--color-neutral-0);
  transition: height 0.25s ease;
}
</style>
