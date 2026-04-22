<script setup lang="ts">
import { computed } from 'vue'
import BaseButton    from '../BaseButton/BaseButton.vue'
import mapPinSvg     from '../../../icon/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'

const props = withDefaults(defineProps<{
  /** Vehicle year — displayed on the first title line ("2026 BMW"). */
  year?: number | string
  /** Vehicle make — displayed after the year. */
  make?: string
  /** Vehicle model — primary display name ("X5 M60i"). Required. */
  model: string
  /** Optional trim, appended after the model with a space. */
  trim?: string
  /**
   * Numeric or pre-formatted price string. Numbers render as `1,234` with a
   * leading `$` glyph rendered separately so it can be typographically aligned.
   */
  price?: number | string
  /** Muted label next to the price (default `MSRP`). Hidden when empty. */
  priceLabel?: string
  /** Secondary button label (default `See Store Price`). Hidden when empty. */
  secondaryLabel?: string
  /** Location / dealer name shown with a map-pin icon. Hidden when empty. */
  dealerName?: string
  /** Primary CTA label (default `Test Drive`). Hidden when empty. */
  ctaLabel?: string
  /** Vehicle VIN — shown in the bottom meta row. Hidden when empty. */
  vin?: string
  /** Stock # — shown in the bottom meta row. Hidden when empty. */
  stockNumber?: string
}>(), {
  priceLabel:     'MSRP',
  secondaryLabel: 'See Store Price',
  ctaLabel:       'Test Drive',
})

const emit = defineEmits<{
  /** Fired when the primary CTA is clicked. */
  'click:cta':       [event: MouseEvent]
  /** Fired when the secondary "See Store Price" button is clicked. */
  'click:secondary': [event: MouseEvent]
}>()

const titleLead = computed(() =>
  [props.year, props.make].filter(Boolean).join(' '),
)

const titleMain = computed(() =>
  [props.model, props.trim].filter(Boolean).join(' '),
)

const formattedPrice = computed(() => {
  const raw = props.price
  if (raw === undefined || raw === null || raw === '') return ''
  if (typeof raw === 'number') return raw.toLocaleString('en-US')
  return String(raw)
})

const hasMeta = computed(() => Boolean(props.vin) || Boolean(props.stockNumber))

function onCtaClick(event: MouseEvent) {
  emit('click:cta', event)
}

function onSecondaryClick(event: MouseEvent) {
  emit('click:secondary', event)
}
</script>

<template>
  <!--
    Desktop VDP above-the-fold summary (right column). Fixed 416px content
    width per Figma; column stack of: title → price row → location →
    primary CTA → VIN/Stock # meta. Reuses `BaseButton` for both the
    secondary and primary buttons so the brand's primary color applies
    automatically.
  -->
  <section class="vdps" aria-label="Vehicle summary">
    <!-- ── Title ─────────────────────────────────────────── -->
    <header class="vdps__titles">
      <p v-if="titleLead" class="vdps__make">{{ titleLead }}</p>
      <h1 class="vdps__model">{{ titleMain }}</h1>
    </header>

    <!-- ── Main content block ───────────────────────────── -->
    <div class="vdps__body">
      <!-- Price + location group -->
      <div class="vdps__price-group">
        <div class="vdps__price-row">
          <p v-if="formattedPrice" class="vdps__price">
            <span class="vdps__price-currency">$</span>
            <span class="vdps__price-value">{{ formattedPrice }}</span>
            <span v-if="priceLabel" class="vdps__price-label">{{ priceLabel }}</span>
          </p>

          <BaseButton
            v-if="secondaryLabel"
            class="vdps__secondary"
            variant="secondary"
            size="sm"
            :label="secondaryLabel"
            @click="onSecondaryClick"
          />
        </div>

        <p v-if="dealerName" class="vdps__location">
          <span class="vdps__location-icon" aria-hidden="true" v-html="mapPinSvg" />
          <span class="vdps__location-name">{{ dealerName }}</span>
        </p>
      </div>

      <!-- CTA + meta group -->
      <div class="vdps__cta-group">
        <BaseButton
          v-if="ctaLabel"
          class="vdps__cta"
          variant="primary"
          size="sm"
          :label="ctaLabel"
          @click="onCtaClick"
        />

        <p v-if="hasMeta" class="vdps__meta">
          <span v-if="vin" class="vdps__meta-item">VIN: {{ vin }}</span>
          <span
            v-if="vin && stockNumber"
            class="vdps__meta-divider"
            aria-hidden="true"
          >|</span>
          <span v-if="stockNumber" class="vdps__meta-item">Stock #: {{ stockNumber }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Layout ───────────────────────────────────────────────
 * Matches Figma Group 1631 (416 px content width, stacked
 * title → body with 112 px vertical rhythm, body gap 40 px).
 * -------------------------------------------------------- */
.vdps {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 416px;
  font-family: var(--font-family-base);
  color: var(--color-neutral-0);
}

/* ─── Tablet (<1024) ──────────────────────────────────────
 * On tablet the summary stacks beneath the full-width gallery
 * and expands to fill the content area. The existing internal
 * structure (right-aligned secondary price button, full-width
 * CTA, centered VIN/Stock meta) already matches the Figma
 * tablet frame — only the desktop 416 px cap needs to lift. */
@media (max-width: 1023.98px) {
  .vdps {
    max-width: none;
  }
}

/* ─── Mobile (<600) ───────────────────────────────────────
 * Figma mobile frame 3069: the "2026 BMW" make line scales
 * down (27 → 16 px), the big model headline stays at 40 px,
 * the title → body rhythm tightens to ~12 px, and the gap
 * between the price group and the CTA group collapses from
 * 40 → 24 px. The horizontal layout of every row (price +
 * right-aligned secondary button, full-width CTA, centered
 * VIN/Stock meta) is identical to tablet and needs no change. */
@media (max-width: 599.98px) {
  .vdps__titles {
    margin-bottom: var(--spacing-nano, 12px);
  }

  .vdps__make {
    font-size: 16px;
    letter-spacing: -0.5px;
  }

  .vdps__body {
    gap: var(--spacing-xxs, 24px);
  }
}

/* ─── Titles ───────────────────────────────────────────── */
.vdps__titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: var(--spacing-sm); /* 40px between title block and body */
}

.vdps__make {
  margin: 0;
  font-size: 27px;
  font-weight: var(--font-weight-regular);
  letter-spacing: -1px;
  line-height: 1;
  color: var(--color-neutral-0);
}

.vdps__model {
  margin: 0;
  font-size: 40px;
  font-weight: var(--font-weight-bold);
  letter-spacing: -1px;
  line-height: 1.1;
  color: var(--color-neutral-0);
}

/* ─── Body stack ───────────────────────────────────────── */
.vdps__body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm); /* 40px between price group and CTA group */
}

/* Price + location sub-group */
.vdps__price-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xxs); /* 24px between price row and location */
}

/* ─── Price row ────────────────────────────────────────── */
.vdps__price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--spacing-xxxs);
}

.vdps__price {
  margin: 0;
  display: inline-flex;
  align-items: baseline;
  gap: var(--spacing-nano);
  line-height: 1;
  white-space: nowrap;
}

.vdps__price-currency {
  font-size: 18px;
  font-weight: var(--font-weight-regular);
  line-height: 1;
}

.vdps__price-value {
  font-size: 40px;
  font-weight: var(--font-weight-regular);
  letter-spacing: -1px;
  line-height: 1;
}

.vdps__price-label {
  font-size: 14px;
  font-weight: var(--font-weight-regular);
  line-height: 1;
  color: var(--color-neutral-40);
  align-self: flex-end;
}

.vdps__secondary {
  flex-shrink: 0;
}

/* ─── Location row ─────────────────────────────────────── */
.vdps__location {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-nano);
  font-size: 16px;
  line-height: 18px;
  color: var(--color-neutral-0);
}

.vdps__location-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  color: var(--color-action-accent);
}

.vdps__location-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.vdps__location-icon :deep(path),
.vdps__location-icon :deep(circle),
.vdps__location-icon :deep(rect),
.vdps__location-icon :deep(polygon) {
  fill: currentColor;
}

/* ─── CTA group ────────────────────────────────────────── */
.vdps__cta-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs); /* 32px between CTA and VIN meta */
}

/* Primary CTA expands to the full 416 px summary width. */
.vdps__cta {
  width: 100%;
  max-width: none;
}

/* ─── Meta (VIN + Stock #) ─────────────────────────────── */
.vdps__meta {
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-nano);
  font-size: 12px;
  line-height: 16px;
  color: var(--color-neutral-0);
  /* Stock # is often read aloud to an associate — keep it selectable. */
  user-select: text;
}

.vdps__meta-divider {
  color: var(--color-neutral-90);
  font-size: 14px;
  line-height: 1;
  letter-spacing: -1px;
  user-select: none;
}
</style>
