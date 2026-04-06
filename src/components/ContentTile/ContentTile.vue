<script setup lang="ts">
import LinkCta from '../LinkCta/LinkCta.vue'

withDefaults(defineProps<{
  /** Main heading text */
  heading: string
  /** Supporting body copy */
  body?: string
  /** `tile` = tall vertical card (460px); `banner` = wide horizontal card */
  type?: 'tile' | 'banner'
  /**
   * Width variant.
   * Tiles: `sm`=280px, `md`=327px, `lg`=420px
   * Banners: `sm`=280px, `md`=327px, `lg`=420px, `xl`=690px (row layout)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Which edge the decorative circle protrudes from */
  imageLocation?: 'top' | 'bottom'
  /** URL of the circular decorative image. Shows a neutral placeholder if omitted. */
  imageUrl?: string
  /** Label for the LinkCta. Omit to hide the CTA. */
  linkLabel?: string
  /** href passed to LinkCta */
  linkHref?: string
  /** target passed to LinkCta */
  linkTarget?: string
}>(), {
  type: 'tile',
  size: 'lg',
  imageLocation: 'top',
})
</script>

<template>
  <div
    class="ctile"
    :class="[`ctile--${type}`, `ctile--${size}`, `ctile--img-${imageLocation}`]"
  >
    <!-- Decorative circle ───────────────────────────────── -->
    <div class="ctile__circle" aria-hidden="true">
      <img v-if="imageUrl" :src="imageUrl" alt="" class="ctile__circle-img" />
    </div>

    <!-- Content ─────────────────────────────────────────── -->
    <div class="ctile__inner">
      <div class="ctile__text">
        <p class="ctile__heading">{{ heading }}</p>
        <p v-if="body" class="ctile__body">{{ body }}</p>
      </div>
      <LinkCta
        v-if="linkLabel"
        :label="linkLabel"
        :href="linkHref"
        :target="linkTarget"
        :arrow="true"
        theme="light"
      />
    </div>
  </div>
</template>

<style scoped>
/* ─── Card shell ──────────────────────────────────────────── */
.ctile {
  position: relative;
  overflow: hidden;
  background: var(--color-neutral-100);
  border: var(--border-width-hairline) solid var(--color-neutral-90);
  border-radius: var(--border-radius-md); /* 8px */
  box-sizing: border-box;
  padding: var(--spacing-xxs); /* 24px — overridden per variant */
}

/* ─── Width + height by type + size ──────────────────────── */
/* Tiles — all 460px tall */
.ctile--tile.ctile--sm { width: 280px; height: 460px; }
.ctile--tile.ctile--md { width: 327px; height: 460px; }
.ctile--tile.ctile--lg { width: 420px; height: 460px; }

/* Banners sm/md/lg — 196px tall */
.ctile--banner.ctile--sm { width: 280px; height: 196px; }
.ctile--banner.ctile--md { width: 327px; height: 196px; }
.ctile--banner.ctile--lg { width: 420px; height: 196px; }

/* Banner XL — 106px tall, wider */
.ctile--banner.ctile--xl { width: 690px; height: 106px; }

/* ─── Padding per type ────────────────────────────────────── */
.ctile--tile {
  padding-left:  var(--spacing-xxs); /* 24px */
  padding-right: var(--spacing-xxs);
}

/* Tile: image-top → content pinned to bottom → less top padding */
.ctile--tile.ctile--img-top {
  padding-top:    44px;
  padding-bottom: var(--spacing-md); /* 48px */
}

/* Tile: image-bottom → content at top → more top padding */
.ctile--tile.ctile--img-bottom {
  padding-top:    var(--spacing-md); /* 48px */
  padding-bottom: 44px;
}

/* Banners sm/md/lg: 15px top/bottom */
.ctile--banner.ctile--sm,
.ctile--banner.ctile--md,
.ctile--banner.ctile--lg {
  padding: 15px var(--spacing-xxs); /* 15px 24px */
}

/* Banner XL: extra left padding creates space for left-side circle */
.ctile--banner.ctile--xl {
  padding: 15px var(--spacing-xxs) 15px var(--spacing-xl); /* 15px 24px 15px 80px */
}

/* ─── Inner content wrapper ───────────────────────────────── */
.ctile__inner {
  position: relative; /* above the circle */
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs); /* 24px between text group and CTA */
  height: 100%;
}

/* Tile image-top: content pushed to bottom */
.ctile--tile.ctile--img-top .ctile__inner {
  justify-content: flex-end;
}

/* Banner XL: horizontal layout — text expands, CTA is fixed */
.ctile--banner.ctile--xl .ctile__inner {
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xxs);
  height: 100%;
}

/* ─── Text group ──────────────────────────────────────────── */
.ctile__text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-nano); /* 8px */
}

/* Banner XL: text takes all remaining width */
.ctile--banner.ctile--xl .ctile__text {
  flex: 1;
  min-width: 0;
}

/* ─── Heading ─────────────────────────────────────────────── */
.ctile__heading {
  margin: 0;
  font-family: var(--font-family-base);
  font-weight: var(--font-weight-light); /* 300 */
  color: var(--color-neutral-20);        /* #313D47 */
  line-height: var(--line-height-sm);    /* 1.2 */
}

/* Tile heading: H2 (42px, -0.8px letter-spacing) */
.ctile--tile .ctile__heading {
  font-size: var(--text-h2-size);                   /* 42px */
  letter-spacing: var(--text-h2-letter-spacing);    /* -0.8px */
}

/* Banner heading: H5 (22px) */
.ctile--banner .ctile__heading {
  font-size: var(--text-h5-size);                   /* 22px */
  letter-spacing: var(--text-h5-letter-spacing);
}

/* ─── Body ────────────────────────────────────────────────── */
.ctile__body {
  margin: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);              /* 14px */
  font-weight: var(--font-weight-regular);          /* 400 */
  line-height: var(--text-body-sm-line-height);     /* 22px */
  color: var(--color-neutral-0);                    /* #242C33 */
}

/* ─── Decorative circle ───────────────────────────────────── */
.ctile__circle {
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-neutral-90); /* placeholder colour */
}

.ctile__circle-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Tile circle: 308×308px */
.ctile--tile .ctile__circle {
  width: 308px;
  height: 308px;
  left: 136px;
}

.ctile--tile.ctile--img-top .ctile__circle    { top:    -87px; }
.ctile--tile.ctile--img-bottom .ctile__circle { bottom: -78px; }

/* Banner sm/md/lg circle: 191×191px, bottom-right corner */
.ctile--banner.ctile--sm .ctile__circle,
.ctile--banner.ctile--md .ctile__circle,
.ctile--banner.ctile--lg .ctile__circle {
  width: 191px;
  height: 191px;
  right: -16px;
}

.ctile--banner.ctile--img-bottom .ctile__circle { bottom: -133px; }
.ctile--banner.ctile--img-top    .ctile__circle { top:    -133px; }

/* Banner XL circle: 124×124px, top-left */
.ctile--banner.ctile--xl .ctile__circle {
  width: 124px;
  height: 124px;
  left: -62px;
  top:  -9px;
}
</style>
