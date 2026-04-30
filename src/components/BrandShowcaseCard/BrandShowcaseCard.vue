<script setup lang="ts">
import { computed, useSlots } from 'vue'
import BaseButton from '../BaseButton/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    name: string
    imageUrl: string
    tagline?: string
    logoLight: string
    logoLightHeight?: number
    logoColor?: string
    logoColorHeight?: number
    description?: string
    hoverScrimColor?: string
    defaultScrimColor?: string
    selectedScrimColor?: string
    ctaLabel?: string
    selected?: boolean
    ariaLabel?: string
  }>(),
  {
    logoLightHeight: 83,
    logoColorHeight: 57,
    hoverScrimColor: 'rgba(242, 73, 34, 0.7)',
    defaultScrimColor: 'rgba(37, 45, 55, 0.7)',
    selectedScrimColor: 'rgba(255, 255, 255, 0.9)',
    selected: false,
  },
)

const emit = defineEmits<{
  'update:selected': [value: boolean]
  'select': [event: Event]
  'cta-click': [event: MouseEvent]
}>()

const slots = useSlots()
const hasSelectedContent = computed(() => Boolean(slots['selected-content']))

const rootStyle = computed(() => ({
  '--bsc-default-scrim': props.defaultScrimColor,
  '--bsc-hover-scrim': props.hoverScrimColor,
  '--bsc-selected-scrim': props.selectedScrimColor,
  '--bsc-logo-light-height': `${props.logoLightHeight}px`,
  '--bsc-logo-color-height': `${props.logoColorHeight}px`,
}))

const resolvedAriaLabel = computed(() =>
  props.ariaLabel ??
  (props.selected ? `${props.name} — currently selected` : `Show details for ${props.name}`),
)

function selectCard(event: Event) {
  if (props.selected) return
  emit('update:selected', true)
  emit('select', event)
}

function onClick(event: MouseEvent) {
  selectCard(event)
}

function onKeydown(event: KeyboardEvent) {
  if (props.selected) return
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    selectCard(event)
  }
}

function onCtaClick(event: MouseEvent) {
  event.stopPropagation()
  emit('cta-click', event)
}
</script>

<template>
  <div
    class="bsc"
    :class="{ 'bsc--selected': selected, 'bsc--collapsed': !selected }"
    :style="rootStyle"
    :role="selected ? undefined : 'button'"
    :tabindex="selected ? undefined : 0"
    :aria-pressed="selected ? undefined : 'false'"
    :aria-label="resolvedAriaLabel"
    @click="onClick"
    @keydown="onKeydown"
  >
    <div class="bsc__bg" aria-hidden="true">
      <img :src="imageUrl" alt="" class="bsc__bg-image" />
      <div class="bsc__scrim" />
    </div>

    <div v-if="!selected" class="bsc__collapsed">
      <img :src="logoLight" :alt="`${name} logo`" class="bsc__logo-light" />
      <p v-if="tagline" class="bsc__tagline">{{ tagline }}</p>
    </div>

    <div v-else class="bsc__expanded">
      <div class="bsc__expanded-content">
        <header class="bsc__expanded-header">
          <img
            v-if="logoColor"
            :src="logoColor"
            :alt="`${name} logo`"
            class="bsc__logo-color"
          />
          <p v-if="description" class="bsc__description">{{ description }}</p>
        </header>

        <div v-if="hasSelectedContent" class="bsc__expanded-body">
          <slot name="selected-content" />
        </div>
      </div>

      <div v-if="$slots.cta || ctaLabel" class="bsc__cta-area">
        <slot name="cta" :onCtaClick="onCtaClick">
          <BaseButton
            class="bsc__cta"
            variant="primary"
            size="sm"
            :label="ctaLabel"
            @click="onCtaClick"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bsc {
  position: relative;
  flex-shrink: 0;
  width: var(--bsc-width-collapsed, 322px);
  height: var(--bsc-height, 455px);
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  font-family: var(--font-family-brand, var(--font-family-base));
  transition: width 0.3s ease, flex-basis 0.3s ease, flex-grow 0.3s ease;
}

.bsc--selected {
  width: var(--bsc-width-selected, 384px);
  cursor: default;
}

.bsc:focus-visible {
  outline: 3px solid var(--color-focus-ring, var(--color-accessibility-80));
  outline-offset: 2px;
}

.bsc__bg {
  position: absolute;
  inset: 0;
}

.bsc__bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.bsc__scrim {
  position: absolute;
  inset: 0;
  background: var(--bsc-default-scrim);
  transition: background 0.2s ease;
}

.bsc--collapsed:hover .bsc__scrim {
  background: var(--bsc-hover-scrim);
}

.bsc--selected .bsc__scrim {
  background: var(--bsc-selected-scrim);
}

.bsc__collapsed {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  box-sizing: border-box;
}

.bsc__logo-light {
  display: block;
  height: var(--bsc-logo-light-height);
  width: auto;
  max-width: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.bsc__tagline {
  margin: 0;
  font-family: inherit;
  font-size: 18px;
  font-weight: var(--font-weight-light, 300);
  line-height: 1.3;
  letter-spacing: -0.198px;
  color: var(--color-neutral-100);
  text-align: center;
}

.bsc__expanded {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px;
  box-sizing: border-box;
}

.bsc__expanded-content {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.bsc__expanded-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.bsc__logo-color {
  display: block;
  height: var(--bsc-logo-color-height);
  width: auto;
  max-width: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.bsc__description {
  margin: 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: var(--font-weight-regular, 400);
  line-height: 22px;
  letter-spacing: -0.5px;
  text-align: center;
  color: var(--color-neutral-0);
}

.bsc__expanded-body {
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
}

.bsc__cta-area {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.bsc__cta {
  flex-shrink: 0;
}
</style>
