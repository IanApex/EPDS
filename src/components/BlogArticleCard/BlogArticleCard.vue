<script setup lang="ts">
import { computed } from 'vue'

import epLogoRaw from '@logos/Property 1=EP-GreenWhite.svg?raw'

const props = withDefaults(
  defineProps<{
    /** `photo` — hero image card; `branded` — green panel + EchoPark logo */
    variant?: 'photo' | 'branded'
    /** Date + category line, e.g. "August 10, 2021 • Buying tips" */
    meta: string
    /** Article headline */
    title: string
    /** Hero image URL (photo variant only; ignored for branded) */
    imageUrl?: string
    /** Makes the entire card a link */
    href?: string
    target?: string
  }>(),
  {
    variant: 'photo',
    imageUrl: '',
  },
)

const rootTag = computed(() => (props.href ? 'a' : 'article'))

const linkRel = computed(() =>
  props.href && props.target === '_blank' ? 'noopener noreferrer' : undefined,
)
</script>

<template>
  <component
    :is="rootTag"
    class="blog-card"
    :class="{ 'blog-card--link': !!href }"
    :href="href || undefined"
    :target="href ? target : undefined"
    :rel="linkRel"
  >
    <!-- Photo variant -->
    <div v-if="variant === 'photo'" class="blog-card__media">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt=""
        class="blog-card__img"
      />
      <div v-else class="blog-card__placeholder" aria-hidden="true" />
      <div class="blog-card__gradient" aria-hidden="true" />
    </div>

    <!-- Branded variant -->
    <div v-else class="blog-card__media blog-card__media--branded">
      <span
        class="blog-card__logo"
        role="img"
        aria-label="EchoPark Automotive"
        v-html="epLogoRaw"
      />
    </div>

    <div class="blog-card__text">
      <p class="blog-card__meta">{{ meta }}</p>
      <h3 class="blog-card__title">{{ title }}</h3>
    </div>
  </component>
</template>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxxs);
  width: 384px;
  max-width: 100%;
  color: var(--color-neutral-0);
}

.blog-card--link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.blog-card--link:hover .blog-card__title {
  text-decoration: underline;
}

.blog-card--link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}

/* ─── Media panel (240 px, 16 px radius) ─────────────────── */
.blog-card__media {
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-neutral-95);
}

.blog-card__media--branded {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-action-primary);
}

.blog-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blog-card__placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-neutral-90);
}

.blog-card__gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 39%
  );
}

.blog-card__logo {
  display: block;
  width: 160px;
  color: var(--color-neutral-100);
}

.blog-card__logo :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
}

.blog-card__logo :deep(path) {
  fill: currentColor;
}

/* ─── Text block ─────────────────────────────────────────── */
.blog-card__text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-nano);
}

.blog-card__meta {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
}

.blog-card__title {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: 22px;
  font-weight: var(--font-weight-bold);
  line-height: 26px;
}
</style>
