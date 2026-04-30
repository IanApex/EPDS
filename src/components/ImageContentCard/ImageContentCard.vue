<script setup lang="ts">
import { computed, useSlots } from 'vue'
import BaseButton from '../BaseButton/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    imageUrl: string
    imageAlt?: string
    iconSvg?: string
    heading: string
    body: string
    ctaLabel: string
    imagePosition?: 'left' | 'right'
    contentAlign?: 'center' | 'top'
    imageProportion?: 'large' | 'small'
  }>(),
  {
    imageAlt: '',
    imagePosition: 'left',
    imageProportion: 'large',
    contentAlign: 'center',
  },
)

const emit = defineEmits<{
  'cta-click': [event: MouseEvent]
}>()

const slots = useSlots()

// imagePosition='right' inverts the column order visually via CSS `order`,
// so the fr values must be swapped relative to the 'left' case.
const gridColumns = computed(() => {
  const imgLeft  = props.imagePosition  !== 'right'
  const imgLarge = props.imageProportion !== 'small'
  return (imgLeft === imgLarge) ? '58fr 42fr' : '42fr 58fr'
})

function onCtaClick(event: MouseEvent) {
  emit('cta-click', event)
}
</script>

<template>
  <div
    class="icc"
    :class="[`icc--image-${imagePosition}`]"
    :style="{ '--icc-columns': gridColumns }"
  >
    <div
      class="icc__image-wrap"
      :aria-hidden="imageAlt === '' ? 'true' : undefined"
    >
      <img :src="imageUrl" :alt="imageAlt" class="icc__image" />
    </div>

    <div class="icc__content" :class="{ 'icc__content--top': contentAlign === 'top' }">
      <div class="icc__text">
        <div class="icc__header">
          <span v-if="slots.icon || iconSvg" class="icc__icon" aria-hidden="true">
            <slot name="icon">
              <span v-html="iconSvg" />
            </slot>
          </span>
          <h2 class="icc__heading">{{ heading }}</h2>
        </div>
        <p class="icc__body">{{ body }}</p>
      </div>

      <BaseButton
        class="icc__cta"
        variant="primary"
        size="md"
        :label="ctaLabel"
        @click="onCtaClick"
      />
    </div>
  </div>
</template>

<style scoped>
.icc {
  display: grid;
  grid-template-columns: var(--icc-columns, 58fr 42fr);
  min-height: 447px;
  overflow: hidden;
  border-radius: 2px;
  background: var(--color-neutral-95, #f2f2f2);
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.08);
}

/* DOM order stays image-first for screen readers in both orientations. */
.icc--image-right .icc__image-wrap { order: 2; }
.icc--image-right .icc__content    { order: 1; }

.icc__image-wrap {
  position: relative;
  overflow: hidden;
}

.icc__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.icc__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 32px;
  padding: 48px 56px;
  box-sizing: border-box;
}

.icc__text {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.icc__header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icc__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  color: var(--color-neutral-0);
}

.icc__icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.icc__icon :deep(path),
.icc__icon :deep(rect),
.icc__icon :deep(circle),
.icc__icon :deep(polygon) {
  fill: currentColor;
}

.icc__heading {
  margin: 0;
  font-family: var(--font-family-brand, var(--font-family-base));
  font-weight: var(--font-weight-bold, 700);
  font-size: 36px;
  line-height: 1.3;
  letter-spacing: -0.396px;
  color: var(--color-neutral-0);
}

.icc__body {
  margin: 0;
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-regular, 400);
  font-size: 24px;
  line-height: 29px;
  letter-spacing: -0.5px;
  color: var(--color-neutral-0);
}

/* Top-align anchors the heading in the PEEK_H strip during scroll-stacking. */
.icc__content--top {
  justify-content: flex-start;
  padding-top: 24px;
}

.icc__cta {
  flex-shrink: 0;
  align-self: flex-start;
}

@media (max-width: 599.98px) {
  .icc {
    grid-template-columns: 1fr;
    min-height: 0;
    box-shadow: 0 -4px 2px 0 rgba(0, 0, 0, 0.08);
  }

  .icc--image-right .icc__image-wrap,
  .icc__image-wrap {
    order: 0;
    position: relative;
    height: 180px;
  }

  .icc--image-right .icc__content,
  .icc__content {
    order: 1;
    gap: 24px;
    padding: 24px;
  }

  .icc__text { gap: 8px; }
  .icc__header { gap: 8px; }

  .icc__icon {
    width: 28px;
    height: 28px;
  }

  .icc__heading {
    font-size: 24px;
    letter-spacing: -0.264px;
  }

  .icc__body {
    font-size: 16px;
    line-height: 29px;
  }

  .icc__cta {
    align-self: stretch;
    max-width: none;
    width: 100%;
  }
}
</style>
