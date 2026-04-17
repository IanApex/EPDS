<script setup lang="ts">
import mapLocationIcon from '@icons/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'
import closeIcon from '@icons/Style=Display, Detail=Default, Icon=Close.svg?raw'

const props = withDefaults(
  defineProps<{
    /**
     * `location` — blue pill with map-location icon + zip + “|” + distance (separate hit targets).
     * `dismissible` — light pill with label + dismiss control.
     */
    variant: 'location' | 'dismissible'
    /** Zip code segment (bold), `location` only */
    zipCode?: string
    /** Text after the separator, e.g. “Cars within 100 mi” — `location` only */
    distanceLabel?: string
    /** Main label — `dismissible` only */
    label?: string
  }>(),
  {
    zipCode:       '',
    distanceLabel: '',
    label:         '',
  },
)

const emit = defineEmits<{
  zipClick:     []
  distanceClick: []
  dismiss:      []
  labelClick:   []
}>()

function onZipClick(e: MouseEvent) {
  e.stopPropagation()
  if (props.variant === 'location') emit('zipClick')
}

function onDistanceClick(e: MouseEvent) {
  e.stopPropagation()
  if (props.variant === 'location') emit('distanceClick')
}

function onDismissLabelClick(e: MouseEvent) {
  e.stopPropagation()
  if (props.variant === 'dismissible') emit('labelClick')
}
</script>

<template>
  <!-- Location (primary) pill -->
  <div
    v-if="variant === 'location'"
    class="sfp sfp--location"
    role="group"
    :aria-label="`Location ${zipCode}, ${distanceLabel}`"
  >
    <button
      type="button"
      class="sfp__zip"
      @click="onZipClick"
    >
      <span class="sfp__zip-icon" aria-hidden="true" v-html="mapLocationIcon" />
      <span class="sfp__zip-text">{{ zipCode }}</span>
    </button>
    <span class="sfp__sep" aria-hidden="true">|</span>
    <button
      type="button"
      class="sfp__distance"
      @click="onDistanceClick"
    >
      {{ distanceLabel }}
    </button>
  </div>

  <!-- Dismissible (secondary) pill -->
  <div
    v-else
    class="sfp sfp--dismissible"
    role="group"
    :aria-label="`Filter ${label}`"
  >
    <button
      type="button"
      class="sfp__text"
      @click="onDismissLabelClick"
    >
      {{ label }}
    </button>
    <button
      type="button"
      class="sfp__dismiss"
      aria-label="Remove filter"
      @click="emit('dismiss')"
    >
      <span class="sfp__dismiss-icon" aria-hidden="true" v-html="closeIcon" />
    </button>
  </div>
</template>

<style scoped>
/* ─── Shared typography (Body SM) ─────────────────────────── */
.sfp {
  box-sizing: border-box;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
}

.sfp button {
  font: inherit;
  color: inherit;
}

/* ═══ Location variant ═══════════════════════════════════════ */
.sfp--location {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 4px 12px 4px 0;
  gap: var(--spacing-nano);
  border-radius: 34px;
  border: var(--border-width-hairline) solid var(--color-action-accent);
  background: var(--color-action-accent);
  color: var(--color-neutral-100);
}

.sfp__zip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* Tight icon ↔ zip; 8px gap to “|” is on the pill container */
  gap: var(--spacing-quarck);
  margin: -4px 0;
  /* Figma zip hover: 36×32r pill behind icon + zip (fills pill height) */
  height: 36px;
  padding: 0 var(--spacing-nano) 0 var(--spacing-micro);
  border: none;
  border-radius: 32px;
  background: transparent;
  cursor: pointer;
  color: inherit;
  transition: background-color 0.15s ease;
}

.sfp__zip:hover {
  background: var(--color-action-accent-active);
}

.sfp__zip:active {
  background: var(--color-action-accent-press);
}

.sfp__zip:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-accessibility-90);
}

.sfp__zip-icon {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.sfp__zip-icon :deep(svg) {
  display: block;
  width: 16px;
  height: 16px;
}

.sfp__zip-icon :deep(path) {
  fill: currentColor;
}

.sfp__zip-text {
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
}

.sfp__sep {
  flex-shrink: 0;
  opacity: 0.85;
  line-height: var(--text-body-sm-line-height);
}

.sfp__distance {
  margin: 0;
  padding: 0 2px;
  border: none;
  border-radius: var(--border-radius-sm);
  background: transparent;
  cursor: pointer;
  color: var(--color-neutral-100);
  text-decoration: none;
  text-decoration-color: transparent;
  white-space: nowrap;
  transition:
    text-decoration-color 0.15s ease,
    color 0.15s ease;
}

.sfp__distance:hover {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.sfp__distance:active {
  text-decoration: underline;
  text-decoration-skip-ink: none;
  color: var(--color-neutral-90);
}

.sfp__distance:focus-visible {
  outline: 2px solid var(--color-accessibility-90);
  outline-offset: 2px;
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

/* ═══ Dismissible variant ════════════════════════════════════ */
.sfp--dismissible {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 4px 1px 4px 12px;
  gap: var(--spacing-quarck);
  border-radius: 32px;
  border: var(--border-width-hairline) solid var(--color-action-accent);
  background: var(--color-action-accent-subtle);
  color: var(--color-action-accent);
}

.sfp--dismissible .sfp__text {
  margin: 0;
  padding: 0 2px;
  border: none;
  border-radius: var(--border-radius-sm);
  background: transparent;
  cursor: pointer;
  color: var(--color-action-accent);
  text-decoration: none;
  text-decoration-color: transparent;
  white-space: nowrap;
  transition:
    text-decoration-color 0.15s ease,
    color 0.15s ease;
}

.sfp--dismissible .sfp__text:hover {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.sfp--dismissible .sfp__text:active {
  text-decoration: underline;
  text-decoration-skip-ink: none;
  color: var(--color-action-accent-hover);
}

.sfp--dismissible .sfp__text:focus-visible {
  outline: 2px solid var(--color-accessibility-90);
  outline-offset: 2px;
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.sfp__dismiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  margin: 0;
  padding: 0 6px;
  border: none;
  border-radius: 24px;
  background: transparent;
  cursor: pointer;
  color: var(--color-action-accent);
  transition: background-color 0.15s ease, box-shadow 0.15s ease;
}

.sfp__dismiss:hover {
  background: var(--color-action-accent-tint);
}

.sfp__dismiss:active {
  background: var(--color-action-accent-muted);
}

.sfp__dismiss:focus-visible {
  outline: none;
  background: var(--color-action-accent-tint);
  box-shadow: 0 0 0 1px var(--color-accessibility-90);
}

.sfp__dismiss-icon {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
}

.sfp__dismiss-icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.sfp__dismiss-icon :deep(path) {
  fill: currentColor;
}
</style>
