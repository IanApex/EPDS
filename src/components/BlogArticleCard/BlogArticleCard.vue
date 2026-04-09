<script setup lang="ts">
import { computed, useId } from 'vue'

import epLogoGreenWhite from '@logos/Property 1=EP-GreenWhite.svg?url'

const props = withDefaults(
  defineProps<{
    /**
     * `threeUp` — photo + top gradient (marketing 3-column layout).
     * `fourUp` — tighter crop / alternate hero treatment (4-column layout).
     * `branded` — solid primary panel + EchoPark logo (no photo).
     */
    variant?: 'threeUp' | 'fourUp' | 'branded'
    /** Single line, e.g. `August 10, 2021 • Buying tips` */
    meta: string
    /** Article headline */
    title: string
    /** Hero image URL (`threeUp` / `fourUp`). Ignored for `branded`. */
    imageUrl?: string
    /** Optional card link (entire block is the hit target). */
    href?: string
    target?: string
  }>(),
  {
    variant: 'threeUp',
    imageUrl: '',
  },
)

const titleId = useId()

const isBranded = computed(() => props.variant === 'branded')
const isFourUp = computed(() => props.variant === 'fourUp')

const rootTag = computed(() => (props.href ? 'a' : 'article'))

const linkRel = computed(() =>
  props.href && props.target === '_blank' ? 'noopener noreferrer' : undefined,
)
</script>

<template>
  <component
    :is="rootTag"
    class="blog-acard"
    :class="{
      'blog-acard--link': !!href,
      [`blog-acard--${variant}`]: true,
    }"
    :href="href || undefined"
    :target="href ? target : undefined"
    :rel="linkRel"
  >
    <div
      class="blog-acard__media"
      :class="{
        'blog-acard__media--branded': isBranded,
        'blog-acard__media--photo': !isBranded,
      }"
    >
      <template v-if="isBranded">
        <img
          :src="epLogoGreenWhite"
          alt="EchoPark Automotive"
          class="blog-acard__logo"
          width="160"
          height="54"
        />
      </template>
      <template v-else>
        <div class="blog-acard__img-shell">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt=""
            class="blog-acard__img"
            :class="{ 'blog-acard__img--four-up': isFourUp }"
          />
          <div v-else class="blog-acard__placeholder" aria-hidden="true" />
          <div class="blog-acard__gradient" aria-hidden="true" />
        </div>
      </template>
    </div>

    <div class="blog-acard__text">
      <p class="blog-acard__meta">{{ meta }}</p>
      <h3 :id="titleId" class="blog-acard__title">{{ title }}</h3>
    </div>
  </component>
</template>

<style scoped>
/* ─── Card shell ──────────────────────────────────────────── */
.blog-acard {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--spacing-xxxs); /* 16px image → text */
  width: 100%;
  max-width: 384px;
  box-sizing: border-box;
  color: var(--color-neutral-0);
}

.blog-acard--link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.blog-acard--link:hover .blog-acard__title {
  text-decoration: underline;
}

.blog-acard--link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}

/* ─── Media (240px tall, 16px radius) ───────────────────────── */
.blog-acard__media {
  flex-shrink: 0;
  width: 100%;
  height: 240px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}

.blog-acard__media--branded {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-action-primary);
}

.blog-acard__logo {
  display: block;
  max-width: 62%;
  height: auto;
  max-height: 54px;
  width: auto;
  object-fit: contain;
}

.blog-acard__img-shell {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--color-neutral-95);
}

.blog-acard__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.blog-acard__img--four-up {
  transform: scale(1.08);
  transform-origin: center center;
}

.blog-acard__placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-neutral-90);
}

/* Top fade — matches Figma 3-up / 4-up treatment */
.blog-acard__gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--color-neutral-0) 80%, transparent) 0%,
    color-mix(in srgb, var(--color-neutral-0) 35%, transparent) 28%,
    transparent 62%
  );
}

/* ─── Typography ──────────────────────────────────────────── */
.blog-acard__text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-nano); /* 8px */
  width: 100%;
}

.blog-acard__meta {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--text-label-weight);
  line-height: var(--line-height-lg);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-neutral-40);
}

.blog-acard__title {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-h5-size);
  font-weight: var(--font-weight-bold);
  line-height: 1.18; /* ~26px on 22px */
  letter-spacing: var(--text-h5-letter-spacing);
  color: var(--color-neutral-0);
}
</style>
