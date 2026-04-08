<script setup lang="ts">
/**
 * ModalTabs — horizontal tab bar for use inside modals and slide-in panels.
 *
 * Tabs switch the content shown below while leaving the modal header/title
 * untouched. Only one tab can be active at a time. The first tab is
 * auto-selected when the modal opens (set v-model to tabs[0].id on open).
 *
 * Usage:
 *   <ModalTabs
 *     v-model="activeTab"
 *     :tabs="[
 *       { id: 'exterior',   label: 'Exterior'   },
 *       { id: 'interior',   label: 'Interior'   },
 *       { id: 'mechanical', label: 'Mechanical' },
 *       { id: 'safety',     label: 'Safety'     },
 *     ]"
 *   >
 *     <template #default="{ activeId }">
 *       <div v-show="activeId === 'exterior'">Exterior content…</div>
 *       <div v-show="activeId === 'interior'">Interior content…</div>
 *     </template>
 *   </ModalTabs>
 *
 * Build guidelines (Figma):
 *   - First tab auto-selected on modal open
 *   - Only one tab active at a time
 *   - Tabs only change content below — title/header above stays unchanged
 *   - Tabs must be parallel in nature; dissimilar tabs feel like site nav
 *   - 24px right padding per tab = visual spacing between tabs
 *   - 16px gap from label to the active indicator bar
 *   - Horizontal scroll with white fade when tabs overflow the container
 *   - 1px separator line below the tab bar shows on all modals + mobile
 */
import { onMounted } from 'vue'

export interface ModalTab {
  id: string
  label: string
}

const props = withDefaults(defineProps<{
  /** Tab definitions — id must be unique. */
  tabs: ModalTab[]
  /** Currently active tab id (bind with v-model). */
  modelValue?: string
  /** Show the 1px separator line below the tab bar. Default true. */
  showSeparator?: boolean
}>(), {
  showSeparator: true,
})

const emit = defineEmits<{
  'update:modelValue': [id: string]
}>()

/** Auto-select first tab if no value is set when the component mounts. */
onMounted(() => {
  if (!props.modelValue && props.tabs.length > 0) {
    emit('update:modelValue', props.tabs[0].id)
  }
})

function activate(id: string) {
  emit('update:modelValue', id)
}

/** Left/right arrow keys cycle through tabs (roving tabindex pattern). */
function activatePrev(currentId: string) {
  const idx = props.tabs.findIndex(t => t.id === currentId)
  const prev = props.tabs[(idx - 1 + props.tabs.length) % props.tabs.length]
  activate(prev.id)
}
function activateNext(currentId: string) {
  const idx = props.tabs.findIndex(t => t.id === currentId)
  const next = props.tabs[(idx + 1) % props.tabs.length]
  activate(next.id)
}
</script>

<template>
  <div class="modal-tabs">
    <!-- Scrollable tab bar — right fade hints at overflow -->
    <div class="modal-tabs__scroll-region">
      <div
        class="modal-tabs__bar"
        role="tablist"
        aria-label="Content tabs"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="modal-tabs__tab"
          :class="{ 'modal-tabs__tab--active': modelValue === tab.id }"
          role="tab"
          :aria-selected="modelValue === tab.id"
          :tabindex="modelValue === tab.id ? 0 : -1"
          type="button"
          @click="activate(tab.id)"
          @keydown.left.prevent="activatePrev(tab.id)"
          @keydown.right.prevent="activateNext(tab.id)"
        >
          <span class="modal-tabs__tab-label">{{ tab.label }}</span>
        </button>
      </div>

      <!-- Right-edge gradient — always rendered, fades gracefully when content fits -->
      <div class="modal-tabs__fade" aria-hidden="true" />
    </div>

    <!-- 1px separator shown on all modal contexts and mobile sizes (Figma) -->
    <div v-if="showSeparator" class="modal-tabs__separator" />

    <!--
      Tab panel slot — parent shows/hides content based on activeId:
        <template #default="{ activeId }">
          <div v-show="activeId === 'exterior'">…</div>
        </template>
    -->
    <div class="modal-tabs__panel" role="tabpanel">
      <slot :activeId="modelValue" />
    </div>
  </div>
</template>

<style scoped>
/* ─── Outer wrapper ─────────────────────────────────────── */
.modal-tabs {
  display: flex;
  flex-direction: column;
}

/* ─── Scroll region ─────────────────────────────────────── */
/*
  position: relative so the ::after fade can be absolutely placed.
  overflow: hidden clips that gradient to the container's right edge.
*/
.modal-tabs__scroll-region {
  position: relative;
  overflow: hidden;
}

/* ─── Tab bar ───────────────────────────────────────────── */
/*
  Horizontally scrollable flex row. Scrollbar hidden for clean appearance.
  Spacing between tabs is handled by padding-right on each tab (24px).
*/
.modal-tabs__bar {
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.modal-tabs__bar::-webkit-scrollbar {
  display: none;
}

/* ─── Right-edge gradient ───────────────────────────────── */
/*
  White fade on the right edge hints that tabs are horizontally scrollable.
  Always present; visually inert when all tabs fit in view.
*/
.modal-tabs__fade {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(to right, transparent, var(--color-neutral-100, #fff));
  pointer-events: none;
}

/* ─── Individual tab button ─────────────────────────────── */
/*
  Fixed 34px total height = 16px label + 16px gap + 2px bar.
  The ::after bar lives at the bottom, absolutely positioned, so its
  height transitions (0 → 1 → 2 → 3px) never shift the layout.
  padding-right: 24px creates the Figma-specified spacing between tabs.
*/
.modal-tabs__tab {
  position: relative;
  flex-shrink: 0;
  display: inline-flex;
  align-items: flex-start;
  height: 34px;
  padding: 0 24px 0 0;
  background: none;
  border: none;
  cursor: pointer;
}

/* ─── Label ─────────────────────────────────────────────── */
.modal-tabs__tab-label {
  font-family: var(--font-family-base);
  font-size: 16px;
  font-weight: var(--font-weight-medium); /* 500 */
  line-height: 16px;
  color: var(--color-action-accent);          /* #006FA6 */
  white-space: nowrap;
}

/* ─── Active indicator bar ──────────────────────────────── */
/*
  Absolutely at the bottom. right: 24px mirrors the padding-right so
  the bar spans only the label text width, not into the spacing gap.
*/
.modal-tabs__tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 24px;
  height: 0;
  background: var(--color-action-accent);
  transition: height 0.12s ease;
}

/* Hover on inactive tab: subtle 1px hint */
.modal-tabs__tab:hover:not(.modal-tabs__tab--active)::after {
  height: 1px;
}

/* Active tab: 2px bar */
.modal-tabs__tab--active::after {
  height: 2px;
}

/* Active tab + hover: 3px bar */
.modal-tabs__tab--active:hover::after {
  height: 3px;
}

/* ─── Focus ring ────────────────────────────────────────── */
.modal-tabs__tab:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─── Separator ─────────────────────────────────────────── */
/*
  1px neutral line below the tab bar — present on all modal/mobile contexts.
*/
.modal-tabs__separator {
  height: 1px;
  background: var(--color-neutral-80); /* #BCBFC2 */
  flex-shrink: 0;
}

/* ─── Panel ─────────────────────────────────────────────── */
.modal-tabs__panel {
  flex: 1;
}
</style>
