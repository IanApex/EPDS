<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import SegmentedControl from '@/components/SegmentedControl/SegmentedControl.vue'
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown.vue'
import SrpLocationFlyIn from '@/components/SrpLocationFlyIn/SrpLocationFlyIn.vue'
import type { LocationStoreItem } from '@/components/SrpLocationFlyIn/SrpLocationFlyIn.vue'
import type { SelectOption } from '@/components/SelectDropdown/SelectDropdown.vue'
import checkSmallSvg   from '@icons/Style=Display, Detail=Default, Icon=Check-Small.svg?raw'
import leftArrowSvg    from '@icons/Style=Arrows, Detail=No-Tail, Icon=Left.svg?raw'
import mapPinSvg       from '@icons/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'
import chevronDownSvg  from '@icons/Style=Arrows, Detail=No-Tail, Icon=Down-Small.svg?raw'
import chevronUpSvg    from '@icons/Style=Arrows, Detail=No-Tail, Icon=Up-Small.svg?raw'

// ─── Public types ─────────────────────────────────────────────────────────────

export interface DistanceStoreItem {
  id: string
  /** Display name, e.g. "EchoPark Colorado Springs" */
  name: string
  /** Driving distance from current zip, in whole miles */
  distanceMiles: number
}

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<{
  /**
   * Which sub-view is currently active.
   * Bind with `v-model` or `v-model:mode`.
   */
  mode?: 'radius' | 'store'
  /** Zip code to display (clickable — opens the location fly-in) */
  zipCode?: string
  /** Current shopping radius in miles — bind with `v-model:radius` */
  radius?: number
  /** Selected store IDs — bind with `v-model:selectedStores` */
  selectedStores?: string[]
  /**
   * Available stores ordered nearest-first.
   * Should contain only hub / delivery-center stores — no VBCs.
   */
  stores?: DistanceStoreItem[]
  /**
   * Count of hub/delivery stores within the current radius.
   * Drives the dynamic "There are X stores within Y miles" copy.
   */
  storeCountInRadius?: number
  /**
   * Full store data (with address + phone) passed to the location sub-panel.
   * When omitted the sub-panel omits address/directions details.
   */
  locationStores?: LocationStoreItem[]
}>(), {
  mode:               'radius',
  zipCode:            '',
  radius:             100,
  selectedStores:     () => [],
  stores:             () => [],
  storeCountInRadius: 0,
  locationStores:     () => [],
})

// ─── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits<{
  'update:mode':           ['radius' | 'store']
  'update:radius':         [number]
  'update:selectedStores': [string[]]
  'update:zipCode':        [zip: string]
}>()

// ─── Location sub-panel state ─────────────────────────────────────────────────

const showLocationEdit = ref(false)

// ─── Segmented control ────────────────────────────────────────────────────────

const modeOptions = [
  { value: 'radius', label: 'Shop by radius' },
  { value: 'store',  label: 'Shop by store'  },
]

function onModeChange(newMode: string) {
  const m = newMode as 'radius' | 'store'
  emit('update:mode', m)
  if (m === 'store') {
    // Auto-select the first (nearest) store and reset any previous multi-selection
    const firstId = props.stores[0]?.id
    emit('update:selectedStores', firstId ? [firstId] : [])
  } else {
    // Reset radius to default when switching back to radius view
    emit('update:radius', 100)
  }
}

// ─── Radius select ────────────────────────────────────────────────────────────

const radiusOptions: SelectOption[] = [
  { value: '25',  label: '25 miles'  },
  { value: '50',  label: '50 miles'  },
  { value: '100', label: '100 miles' },
  { value: '150', label: '150 miles' },
  { value: '200', label: '200 miles' },
  { value: '250', label: '250 miles' },
]

const radiusStrValue = computed(() => String(props.radius))

function onRadiusChange(val: string) {
  emit('update:radius', parseInt(val, 10))
}

// ─── Dynamic count copy ───────────────────────────────────────────────────────

const countCopyIsSingular = computed(() => props.storeCountInRadius === 1)

// ─── Store list ───────────────────────────────────────────────────────────────

const DEFAULT_VISIBLE = 3

const isExpanded = ref(false)

const visibleStores = computed(() =>
  isExpanded.value ? props.stores : props.stores.slice(0, DEFAULT_VISIBLE),
)

const hasMoreStores = computed(() => props.stores.length > DEFAULT_VISIBLE)

function isSelected(storeId: string) {
  return props.selectedStores.includes(storeId)
}

/** The last remaining selected store is locked — cannot be deselected. */
function isLocked(storeId: string) {
  return props.selectedStores.length === 1 && isSelected(storeId)
}

function toggleStore(storeId: string) {
  if (isLocked(storeId)) return
  if (isSelected(storeId)) {
    emit('update:selectedStores', props.selectedStores.filter(id => id !== storeId))
  } else {
    emit('update:selectedStores', [...props.selectedStores, storeId])
  }
}

// ─── Bootstrap store mode ─────────────────────────────────────────────────────

onMounted(() => {
  if (props.mode === 'store' && props.selectedStores.length === 0 && props.stores.length > 0) {
    emit('update:selectedStores', [props.stores[0].id])
  }
})

// Reset expanded state when switching away from store view
watch(() => props.mode, (newMode) => {
  if (newMode !== 'store') isExpanded.value = false
})
</script>

<template>
  <div class="dist-filter">

    <!-- ─── Title row — always present; becomes a back link when location sub-panel is open -->
    <button
      type="button"
      class="dist-filter__title-row"
      :class="{ 'dist-filter__title-row--link': showLocationEdit }"
      :tabindex="showLocationEdit ? 0 : -1"
      @click="showLocationEdit && (showLocationEdit = false)"
    >
      <span
        v-if="showLocationEdit"
        class="dist-filter__title-arrow"
        aria-hidden="true"
        v-html="leftArrowSvg"
      />
      <span class="dist-filter__title-label">Distance &amp; stores</span>
    </button>

    <!-- Pane container — both panes live here; title row stays above -->
    <div class="dist-filter__panes">

    <!-- ─── Pane 1: main filter content (always in-flow; drives container height) -->
    <div
      class="dist-filter__main"
      :class="{ 'dist-filter__main--out': showLocationEdit }"
      :aria-hidden="showLocationEdit ? 'true' : undefined"
      :inert="showLocationEdit ? true : undefined"
    >

      <!-- Static header: location + segmented control -->
      <div class="dist-filter__header">
        <div class="dist-filter__location">
          <p class="dist-filter__location-label">Your location:</p>
          <button
            type="button"
            class="dist-filter__zip-btn"
            :aria-label="`Change location, currently ${zipCode}`"
            @click="showLocationEdit = true"
          >
            <span class="dist-filter__pin" aria-hidden="true" v-html="mapPinSvg" />
            <span class="dist-filter__zip">{{ zipCode }}</span>
          </button>
        </div>
      </div>

      <!-- Mode toggle -->
      <div class="dist-filter__toggle">
        <SegmentedControl
          :options="modeOptions"
          name="distance-mode"
          :modelValue="mode"
          @update:modelValue="onModeChange"
        />
      </div>

      <!-- Mode-specific content (fades in on switch) -->
      <Transition name="dist-filter-fade" mode="out-in">

        <!-- A: Shop by radius -->
        <div v-if="mode === 'radius'" key="radius" class="dist-filter__radius-section">
          <SelectDropdown
            label="Shopping radius"
            name="shopping-radius"
            :options="radiusOptions"
            :modelValue="radiusStrValue"
            @update:modelValue="onRadiusChange"
          />
          <p class="dist-filter__count-text">
            <template v-if="countCopyIsSingular">
              There is <strong>1 store within {{ radius }} miles</strong>.
            </template>
            <template v-else>
              There are <strong>{{ storeCountInRadius }} stores within {{ radius }} miles</strong>.
            </template>
          </p>
        </div>

        <!-- B/C/D: Shop by store -->
        <div v-else key="store" class="dist-filter__store-section">
          <p class="dist-filter__stores-label">Select your stores</p>

          <div class="dist-filter__store-list" role="group" aria-label="Store selection">
            <button
              v-for="store in visibleStores"
              :key="store.id"
              type="button"
              class="dist-filter__store-row"
              :class="{
                'dist-filter__store-row--locked':   isLocked(store.id),
                'dist-filter__store-row--selected': isSelected(store.id) && !isLocked(store.id),
              }"
              :aria-disabled="isLocked(store.id)"
              :aria-pressed="isSelected(store.id)"
              @click="toggleStore(store.id)"
            >
              <span
                v-if="isSelected(store.id)"
                class="dist-filter__store-check"
                :class="{ 'dist-filter__store-check--locked': isLocked(store.id) }"
                aria-hidden="true"
                v-html="checkSmallSvg"
              />
              <span v-else class="dist-filter__store-check-spacer" aria-hidden="true" />

              <span class="dist-filter__store-name">{{ store.name }}</span>
              <span class="dist-filter__store-dist">{{ store.distanceMiles }} mi</span>
            </button>
          </div>

          <!-- Show more / Show less -->
          <template v-if="hasMoreStores">
            <button
              v-if="!isExpanded"
              type="button"
              class="dist-filter__show-more"
              @click="isExpanded = true"
            >
              <span>Show more</span>
              <span class="dist-filter__show-chevron" aria-hidden="true" v-html="chevronDownSvg" />
            </button>
            <button
              v-else
              type="button"
              class="dist-filter__show-more"
              @click="isExpanded = false"
            >
              <span>Show less</span>
              <span class="dist-filter__show-chevron dist-filter__show-chevron--up" aria-hidden="true" v-html="chevronUpSvg" />
            </button>
          </template>
        </div>

      </Transition>
    </div>

    <!-- ─── Pane 2: location edit sub-panel (slides in from the right) ── -->
    <div
      class="dist-filter__loc-panel"
      :class="{ 'dist-filter__loc-panel--active': showLocationEdit }"
      :aria-hidden="!showLocationEdit ? 'true' : undefined"
      :inert="!showLocationEdit ? true : undefined"
    >
      <SrpLocationFlyIn
        :zipCode="zipCode"
        :stores="locationStores"
        :hideHeader="true"
        @close="showLocationEdit = false"
        @update:zipCode="emit('update:zipCode', $event)"
      />
    </div>

    </div><!-- /.dist-filter__panes -->

  </div>
</template>

<style scoped>
/* ─── Root ──────────────────────────────────────────────────── */
.dist-filter {
  width: 100%;
}

/* Container for the two sliding panes — title row stays above this */
.dist-filter__panes {
  position: relative;
  overflow-x: clip;
}

/* ─── Two-pane drill-down slide ─────────────────────────────── */

/* Pane 1 — main content. Always in flow (drives container height). */
.dist-filter__main {
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dist-filter__main--out {
  transform: translateX(-100%);
  pointer-events: none;
}

/* Pane 2 — location sub-panel. Absolutely positioned; slides from right. */
.dist-filter__loc-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--color-neutral-100);
  will-change: transform;
}

.dist-filter__loc-panel--active {
  transform: translateX(0);
}

/* ─── Title row (mirrors SrpFiltersPanel__child-title) ──────── */
.dist-filter__title-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-nano);                        /* 8px */
  width: 100%;
  padding: var(--spacing-xxxs) var(--spacing-xxs); /* 16px 24px */
  flex-shrink: 0;
  background: none;
  border: none;
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  cursor: default;
  text-align: left;
  font-family: var(--font-family-base);
}

.dist-filter__title-label {
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

/* Link mode — when location sub-panel is open */
.dist-filter__title-row--link {
  cursor: pointer;
}

.dist-filter__title-row--link .dist-filter__title-label {
  color: var(--color-action-accent);
}

.dist-filter__title-row--link:hover .dist-filter__title-label {
  text-decoration: underline;
}

.dist-filter__title-row--link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: -2px;
  border-radius: 2px;
}

.dist-filter__title-arrow {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.dist-filter__title-arrow :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.dist-filter__title-arrow :deep(path) {
  fill: var(--color-action-accent);
}

/* ─── Static header ─────────────────────────────────────────── */
.dist-filter__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxxs) var(--spacing-xxs);   /* 16px 24px */
  gap: var(--spacing-quarck);                         /* 4px */
}

/* Location block */
.dist-filter__location {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-quarck);                         /* 4px */
}

.dist-filter__location-label {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);                  /* 12px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);   /* 0.2px */
  color: var(--color-neutral-0);
  margin: 0;
}

/* Zip button */
.dist-filter__zip-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-quarck);                         /* 4px */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.dist-filter__zip-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

.dist-filter__pin {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 14px;
  height: 16px;
  line-height: 0;
}

.dist-filter__pin :deep(svg) {
  display: block;
  width: 14px;
  height: 16px;
}

.dist-filter__pin :deep(path),
.dist-filter__pin :deep(polygon) {
  fill: var(--color-action-accent);
}

.dist-filter__zip {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);                /* 16px */
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-action-accent);
  text-align: right;
}

.dist-filter__zip-btn:hover .dist-filter__zip {
  text-decoration: underline;
}

/* ─── Mode toggle ───────────────────────────────────────────── */
.dist-filter__toggle {
  display: flex;
  justify-content: center;
  padding: 0 var(--spacing-xxs);                      /* 0 24px */
  padding-bottom: var(--spacing-xxxs);                /* 16px */
}

/* ─── Fade transition ───────────────────────────────────────── */
.dist-filter-fade-enter-active,
.dist-filter-fade-leave-active {
  transition: opacity 0.2s ease;
}

.dist-filter-fade-enter-from,
.dist-filter-fade-leave-to {
  opacity: 0;
}

/* ─── Radius section ────────────────────────────────────────── */
.dist-filter__radius-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-nano);                           /* 8px */
  padding: 0 var(--spacing-xxs) var(--spacing-xxxs); /* 0 24px 16px */
}

/* Count copy */
.dist-filter__count-text {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);                  /* 12px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-neutral-0);
  text-align: center;
  margin: 0;
}

.dist-filter__count-text strong {
  font-weight: var(--font-weight-bold);
}

/* ─── Store section ─────────────────────────────────────────── */
.dist-filter__store-section {
  display: flex;
  flex-direction: column;
}

.dist-filter__stores-label {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);                  /* 12px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-neutral-40);
  margin: 0;
  padding: 0 var(--spacing-xxs) var(--spacing-nano);  /* 0 24px 8px */
}

/* Store list wrapper — top border separates from the label above */
.dist-filter__store-list {
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
}

/* ─── Individual store row ──────────────────────────────────── */
.dist-filter__store-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-nano);                           /* 8px */
  width: 100%;
  padding: var(--spacing-xxxs) var(--spacing-xxs);   /* 16px 24px */
  box-sizing: border-box;

  background: var(--color-neutral-100);
  border: none;
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  cursor: pointer;
  text-align: left;

  transition: background-color 0.15s ease;
}

.dist-filter__store-row:hover:not(.dist-filter__store-row--locked) {
  background: var(--color-neutral-95);
}

.dist-filter__store-row:active:not(.dist-filter__store-row--locked) {
  background: var(--color-neutral-90);
}

.dist-filter__store-row:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: -3px;
}

/* Locked: disable all pointer interaction */
.dist-filter__store-row--locked {
  cursor: default;
  pointer-events: none;
}

/* Check icon box (24×24 with colour bg + white check) */
.dist-filter__store-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: var(--color-action-primary);            /* green */
  border-radius: var(--border-radius-sm);             /* 4px */
}

.dist-filter__store-check--locked {
  background: var(--color-neutral-80);                /* gray — #D4D7D9 */
}

.dist-filter__store-check :deep(svg) {
  width: 24px;
  height: 24px;
}

.dist-filter__store-check :deep(path) {
  fill: var(--color-neutral-100);                     /* white check */
}

/* Invisible spacer matching check icon width when unselected */
.dist-filter__store-check-spacer {
  display: inline-flex;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.dist-filter__store-name {
  flex: 1;
  min-width: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);                /* 16px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.dist-filter__store-dist {
  flex-shrink: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);                /* 14px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
  white-space: nowrap;
}

/* ─── Show more / Show less ─────────────────────────────────── */
.dist-filter__show-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-quarck);                         /* 4px */
  width: 100%;
  padding: var(--spacing-xxxs) var(--spacing-xxs);   /* 16px 24px */
  background: none;
  border: none;
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
  cursor: pointer;

  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);                /* 14px */
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-action-accent);
}

.dist-filter__show-more:hover span:first-child {
  text-decoration: underline;
}

.dist-filter__show-more:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.dist-filter__show-chevron {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 10px;
  line-height: 0;
}

.dist-filter__show-chevron :deep(svg) {
  display: block;
  width: 16px;
  height: 10px;
}

.dist-filter__show-chevron :deep(path) {
  fill: var(--color-action-accent);
}
</style>
