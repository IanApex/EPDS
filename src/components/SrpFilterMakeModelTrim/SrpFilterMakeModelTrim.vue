<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import checkSvg        from '@icons/Style=Display, Detail=Default, Icon=Check-Small.svg?raw'
import closeSvg        from '@icons/Style=Display, Detail=Default, Icon=Close.svg?raw'
import rightChevronSvg from '@icons/Style=Arrows, Detail=No-Tail, Icon=Right.svg?raw'
import searchSvg       from '@icons/Style=Display, Detail=Default, Icon=Search.svg?raw'

// ─── Public types ────────────────────────────────────────────────────────────

export interface TrimItem {
  value: string
  count: number
}

export interface ModelItem {
  value: string
  count: number
  /** When provided, a selected model shows a "Trim ›" navigation link */
  trims?: TrimItem[]
}

export interface MakeItem {
  value: string
  count: number
  /** When provided, a selected make shows a "Model ›" navigation link */
  models?: ModelItem[]
}

// ─── Props ────────────────────────────────────────────────────────────────────

const props = withDefaults(defineProps<{
  /** Full list of makes (with nested models/trims). Sorted alphabetically internally. */
  makes: MakeItem[]
  /** Currently selected make values — bind with `v-model:selectedMakes` */
  selectedMakes?: string[]
  /** Currently selected model values — bind with `v-model:selectedModels` */
  selectedModels?: string[]
  /** Currently selected trim values — bind with `v-model:selectedTrims` */
  selectedTrims?: string[]
  /**
   * Pre-sets the sub-view on mount. Useful for stories and returning-to-filter states.
   * Does not update after mount.
   */
  initialView?: 'make' | 'model' | 'trim'
  /** Pre-sets the active make on mount (pairs with `initialView: 'model' | 'trim'`). */
  initialMake?: string
  /** Pre-sets the active model on mount (pairs with `initialView: 'trim'`). */
  initialModel?: string
}>(), {
  selectedMakes:  () => [],
  selectedModels: () => [],
  selectedTrims:  () => [],
  initialView:    'make',
  initialMake:    '',
  initialModel:   '',
})

// ─── Emits ────────────────────────────────────────────────────────────────────

const emit = defineEmits<{
  'update:selectedMakes':  [value: string[]]
  'update:selectedModels': [value: string[]]
  'update:selectedTrims':  [value: string[]]
}>()

// ─── Internal sub-view state ──────────────────────────────────────────────────

const view        = ref<'make' | 'model' | 'trim'>(props.initialView)
const activeMake  = ref<string | null>(props.initialMake  || null)
const activeModel = ref<string | null>(props.initialModel || null)
const searchQuery = ref('')

// ─── Search helpers ───────────────────────────────────────────────────────────

/**
 * Returns true when `query` matches the START of any whitespace-separated word
 * in `name` (case-insensitive).
 * "ch" → matches "Charger" and "Grand Cherokee", but NOT "Beach Cruiser".
 */
function wordStartMatch(name: string, query: string): boolean {
  const q = query.toLowerCase()
  return name.toLowerCase().split(/\s+/).some(word => word.startsWith(q))
}

/** Controls icon toggle (magnifying glass → X) — true after first character. */
const hasSearchQuery = computed(() => searchQuery.value.length >= 1)

/** True when there is enough input to display search results (≥ 2 chars). */
const isSearchActive = computed(() => searchQuery.value.trim().length >= 2)

interface SearchGroup {
  makeItem:     MakeItem
  /** When true: the make name itself matched — rendered as a normal selectable row. */
  makeMatches:  boolean
  /** When makeMatches is false: the list of models under this make that matched. */
  modelMatches: ModelItem[]
}

/**
 * Groups of results sorted alphabetically by make.
 * Rule: if the make name itself matches, show it as a selectable make row and do
 * NOT list its models separately (the user can navigate to them via "Model ›").
 * If only models match, show the make as a non-interactive context header above
 * the matching model rows.
 */
const searchResults = computed((): SearchGroup[] => {
  const q = searchQuery.value.trim()
  if (q.length < 2) return []

  const groups: SearchGroup[] = []
  const sorted = [...props.makes].sort((a, b) => a.value.localeCompare(b.value))

  for (const make of sorted) {
    if (wordStartMatch(make.value, q)) {
      groups.push({ makeItem: make, makeMatches: true, modelMatches: [] })
    } else {
      const modelMatches = (make.models ?? [])
        .filter(m => wordStartMatch(m.value, q))
        .sort((a, b) => a.value.localeCompare(b.value))
      if (modelMatches.length > 0) {
        groups.push({ makeItem: make, makeMatches: false, modelMatches })
      }
    }
  }

  return groups
})

function clearSearch() {
  searchQuery.value = ''
}

// ─── Committed state — drives the "returning" visual ─────────────────────────
// Initialised from current selections when the filter first opens (component mounts).
// Snapshotted again whenever the user navigates between sub-views so that items
// selected in a previous session float to the top with the green background.

const committedMakes  = ref<string[]>([...(props.selectedMakes  ?? [])])
const committedModels = ref<string[]>([...(props.selectedModels ?? [])])
const committedTrims  = ref<string[]>([...(props.selectedTrims  ?? [])])

// Keep committed in sync when selections are dismissed from outside the panel
// (e.g. a filter pill is dismissed). Deselected items must stop floating.
watch(() => props.selectedMakes,  (makes)  => {
  committedMakes.value  = committedMakes.value.filter(m  => makes?.includes(m))
})
watch(() => props.selectedModels, (models) => {
  committedModels.value = committedModels.value.filter(m => models?.includes(m))
})
watch(() => props.selectedTrims,  (trims)  => {
  committedTrims.value  = committedTrims.value.filter(t  => trims?.includes(t))
})

// ─── Derived lists — returning items float to the top ────────────────────────

const sortedFilteredMakes = computed(() => {
  const q      = searchQuery.value.trim().toLowerCase()
  const sorted = [...props.makes].sort((a, b) => a.value.localeCompare(b.value))
  const all    = q ? sorted.filter(m => m.value.toLowerCase().includes(q)) : sorted

  const committed = committedMakes.value
  if (committed.length === 0) return all
  const top    = all.filter(m =>  committed.includes(m.value))
  const bottom = all.filter(m => !committed.includes(m.value))
  return [...top, ...bottom]
})

const currentMake = computed(() =>
  props.makes.find(m => m.value === activeMake.value) ?? null
)

const currentModels = computed(() => {
  const all = [...(currentMake.value?.models ?? [])].sort((a, b) => a.value.localeCompare(b.value))

  // Search mode (model view): filter in-place, no returning-state reordering
  // (per spec: selected results appear pre-selected but not at top or with green bg)
  if (isSearchActive.value) {
    const q = searchQuery.value.trim()
    return all.filter(m => wordStartMatch(m.value, q))
  }

  const committed = committedModels.value
  if (committed.length === 0) return all
  const top    = all.filter(m =>  committed.includes(m.value))
  const bottom = all.filter(m => !committed.includes(m.value))
  return [...top, ...bottom]
})

const currentModel = computed(() =>
  currentModels.value.find(m => m.value === activeModel.value) ?? null
)

const currentTrims = computed(() => {
  const all = [...(currentModel.value?.trims ?? [])].sort((a, b) => a.value.localeCompare(b.value))
  const committed = committedTrims.value
  if (committed.length === 0) return all
  const top    = all.filter(t =>  committed.includes(t.value))
  const bottom = all.filter(t => !committed.includes(t.value))
  return [...top, ...bottom]
})

// ─── Selection helpers ────────────────────────────────────────────────────────

const isMakeSelected  = (v: string) => props.selectedMakes?.includes(v)  ?? false
const isModelSelected = (v: string) => props.selectedModels?.includes(v) ?? false
const isTrimSelected  = (v: string) => props.selectedTrims?.includes(v)  ?? false

// Returning = was committed (snapshot from a previous visit) AND still selected.
// Suppressed while searching — selected items appear pre-checked but not floated or green.
const isMakeReturning  = (v: string) => !isSearchActive.value && committedMakes.value.includes(v)  && isMakeSelected(v)
const isModelReturning = (v: string) => !isSearchActive.value && committedModels.value.includes(v) && isModelSelected(v)
const isTrimReturning  = (v: string) =>                          committedTrims.value.includes(v)  && isTrimSelected(v)

// ─── Toggle handlers ──────────────────────────────────────────────────────────

function toggleMake(make: string) {
  const cur = props.selectedMakes ?? []
  if (cur.includes(make)) {
    emit('update:selectedMakes', cur.filter(m => m !== make))
    // Remove from committed so item immediately slides back to original position
    committedMakes.value = committedMakes.value.filter(m => m !== make)
  } else {
    emit('update:selectedMakes', [...cur, make])
  }
}

function toggleModel(model: string) {
  const cur = props.selectedModels ?? []
  if (cur.includes(model)) {
    emit('update:selectedModels', cur.filter(m => m !== model))
    committedModels.value = committedModels.value.filter(m => m !== model)
  } else {
    emit('update:selectedModels', [...cur, model])
  }
}

function toggleTrim(trim: string) {
  const cur = props.selectedTrims ?? []
  if (cur.includes(trim)) {
    emit('update:selectedTrims', cur.filter(t => t !== trim))
    committedTrims.value = committedTrims.value.filter(t => t !== trim)
  } else {
    emit('update:selectedTrims', [...cur, trim])
  }
}

// ─── Sub-view navigation ──────────────────────────────────────────────────────
// Each navigation event snapshots the relevant committed state so that when the
// user returns to a view, their prior selections appear at the top in the green
// "returning" state — matching the body-style filter pattern.

function drillToModel(make: string) {
  searchQuery.value     = ''                         // clear search on sub-view entry
  // Leaving Make view → commit current make selections
  committedMakes.value  = [...(props.selectedMakes ?? [])]
  activeMake.value      = make
  activeModel.value     = null
  view.value            = 'model'
  // Entering Model view → commit current model selections
  committedModels.value = [...(props.selectedModels ?? [])]
}

function drillToTrim(model: string) {
  // Leaving Model view → commit current model selections
  committedModels.value = [...(props.selectedModels ?? [])]
  activeModel.value     = model
  view.value            = 'trim'
  // Entering Trim view → commit current trim selections
  committedTrims.value  = [...(props.selectedTrims ?? [])]
}

/** Called from search results where we must also set the active make context. */
function drillToTrimFromSearch(makeValue: string, modelValue: string) {
  searchQuery.value     = ''
  committedModels.value = [...(props.selectedModels ?? [])]
  activeMake.value      = makeValue
  activeModel.value     = modelValue
  view.value            = 'trim'
  committedTrims.value  = [...(props.selectedTrims ?? [])]
}

function backToMake() {
  searchQuery.value    = ''              // clear model-view search on breadcrumb back
  // Re-entering Make view → refresh committed makes so current selections float
  committedMakes.value = [...(props.selectedMakes ?? [])]
  view.value           = 'make'
  activeModel.value    = null
}

function backToModel() {
  // Re-entering Model view → refresh committed models so current selections float
  committedModels.value = [...(props.selectedModels ?? [])]
  view.value            = 'model'
  activeModel.value     = null
}

// ─── Pane CSS class helpers ───────────────────────────────────────────────────
// Map each view state to a translate class for each pane.
//
//  view  │ make pane   │ model pane  │ trim pane
// ───────┼─────────────┼─────────────┼───────────
//  make  │ active (0)  │ right (+)   │ right (+)
//  model │ left  (-)   │ active (0)  │ right (+)
//  trim  │ left  (-)   │ left  (-)   │ active (0)

const makePaneClass  = computed(() => view.value === 'make'  ? 'mmt__pane--active' : 'mmt__pane--left')
const modelPaneClass = computed(() => {
  if (view.value === 'make')  return 'mmt__pane--right'
  if (view.value === 'model') return 'mmt__pane--active'
  return 'mmt__pane--left'
})
const trimPaneClass  = computed(() => view.value === 'trim'  ? 'mmt__pane--active' : 'mmt__pane--right')
</script>

<template>
  <div class="mmt">

    <!-- ─── Header: title in Make view; breadcrumb in Model/Trim views ─── -->
    <div class="mmt__header">
      <div v-if="view === 'make'" class="mmt__title">Make</div>

      <nav v-else-if="view === 'model'" class="mmt__breadcrumb" aria-label="Filter navigation">
        <button type="button" class="mmt__bc-link" @click="backToMake">Make</button>
        <span class="mmt__bc-sep" aria-hidden="true">/</span>
        <span class="mmt__bc-current" aria-current="step">Model</span>
      </nav>

      <nav v-else class="mmt__breadcrumb" aria-label="Filter navigation">
        <button type="button" class="mmt__bc-link" @click="backToMake">Make</button>
        <span class="mmt__bc-sep" aria-hidden="true">/</span>
        <button type="button" class="mmt__bc-link" @click="backToModel">Model</button>
        <span class="mmt__bc-sep" aria-hidden="true">/</span>
        <span class="mmt__bc-current" aria-current="step">Trim</span>
      </nav>
    </div>

    <!-- ─── Search bar (Make + Model views) ─────────────────────────────── -->
    <div v-if="view === 'make' || view === 'model'" class="mmt__search">
      <input
        type="search"
        class="mmt__search-input"
        :placeholder="view === 'make' ? 'Search make or model' : 'Search model'"
        v-model="searchQuery"
        :aria-label="view === 'make' ? 'Search make or model' : 'Search model'"
        autocomplete="off"
      />
      <!-- X clear button after 1st character; magnifying glass otherwise -->
      <button
        v-if="hasSearchQuery"
        type="button"
        class="mmt__search-clear"
        aria-label="Clear search"
        @click="clearSearch"
      >
        <span aria-hidden="true" v-html="closeSvg" />
      </button>
      <span v-else class="mmt__search-icon" aria-hidden="true" v-html="searchSvg" />
    </div>

    <!-- ─── Search results (Make view + ≥ 2 chars) ───────────────────────── -->
    <template v-if="view === 'make' && isSearchActive">
      <p v-if="searchResults.length === 0" class="mmt__no-results" role="status">
        No results
      </p>
      <ul v-else class="mmt__list mmt__search-list" role="list">
        <template v-for="group in searchResults" :key="group.makeItem.value">

          <!-- Case A: Make name matched → normal selectable make row -->
          <li
            v-if="group.makeMatches"
            class="mmt__row"
            :class="{ 'mmt__row--selected': isMakeSelected(group.makeItem.value) }"
          >
            <label class="mmt__row-label">
              <input
                type="checkbox"
                class="mmt__row-input"
                :checked="isMakeSelected(group.makeItem.value)"
                :aria-label="group.makeItem.value"
                @change="toggleMake(group.makeItem.value)"
              />
              <span
                v-if="isMakeSelected(group.makeItem.value)"
                class="mmt__check"
                aria-hidden="true"
                v-html="checkSvg"
              />
              <span class="mmt__row-content">
                <span class="mmt__row-name">{{ group.makeItem.value }}</span>
                <span class="mmt__row-count">({{ group.makeItem.count }})</span>
              </span>
            </label>
            <button
              v-if="isMakeSelected(group.makeItem.value) && group.makeItem.models"
              type="button"
              class="mmt__sub-nav"
              :aria-label="`View ${group.makeItem.value} models`"
              @click.stop="drillToModel(group.makeItem.value)"
            >
              <span class="mmt__sub-nav-text">Model</span>
              <span class="mmt__sub-nav-icon" aria-hidden="true" v-html="rightChevronSvg" />
            </button>
          </li>

          <!-- Case B: Model(s) matched → non-selectable make context header + model rows -->
          <template v-else>
            <li class="mmt__context-header" role="presentation" aria-hidden="true">
              {{ group.makeItem.value }}
            </li>
            <li
              v-for="model in group.modelMatches"
              :key="model.value"
              class="mmt__row mmt__row--model-result"
              :class="{ 'mmt__row--selected': isModelSelected(model.value) }"
            >
              <label class="mmt__row-label">
                <input
                  type="checkbox"
                  class="mmt__row-input"
                  :checked="isModelSelected(model.value)"
                  :aria-label="`${model.value} (${group.makeItem.value})`"
                  @change="toggleModel(model.value)"
                />
                <span
                  v-if="isModelSelected(model.value)"
                  class="mmt__check"
                  aria-hidden="true"
                  v-html="checkSvg"
                />
                <!-- Truncate if name + count overflow the row -->
                <span class="mmt__row-content mmt__row-content--truncate">
                  <span class="mmt__row-name">{{ model.value }}</span>
                  <span class="mmt__row-count mmt__row-count--fixed">({{ model.count }})</span>
                </span>
              </label>
              <button
                v-if="isModelSelected(model.value) && model.trims?.length"
                type="button"
                class="mmt__sub-nav"
                :aria-label="`View ${model.value} trims`"
                @click.stop="drillToTrimFromSearch(group.makeItem.value, model.value)"
              >
                <span class="mmt__sub-nav-text">Trim</span>
                <span class="mmt__sub-nav-icon" aria-hidden="true" v-html="rightChevronSvg" />
              </button>
            </li>
          </template>

        </template>
      </ul>
    </template>

    <!-- ─── Sliding list panes (hidden while search results are shown) ─────── -->
    <div v-else class="mmt__panes">

      <!-- Make list — normal flow (determines container height) -->
      <div
        class="mmt__pane mmt__pane--make"
        :class="makePaneClass"
        :aria-hidden="view !== 'make' ? 'true' : undefined"
      >
        <div
          v-if="sortedFilteredMakes.length === 0"
          class="mmt__empty"
        >
          No results for "{{ searchQuery }}"
        </div>
        <ul v-else class="mmt__list" role="list">
          <li
            v-for="make in sortedFilteredMakes"
            :key="make.value"
            class="mmt__row"
            :class="{
              'mmt__row--selected':  isMakeSelected(make.value),
              'mmt__row--returning': isMakeReturning(make.value),
            }"
          >
            <label class="mmt__row-label">
              <input
                type="checkbox"
                class="mmt__row-input"
                :checked="isMakeSelected(make.value)"
                :aria-label="make.value"
                @change="toggleMake(make.value)"
              />
              <span
                v-if="isMakeSelected(make.value)"
                class="mmt__check"
                aria-hidden="true"
                v-html="checkSvg"
              />
              <span class="mmt__row-content">
                <span class="mmt__row-name">{{ make.value }}</span>
                <span class="mmt__row-count">({{ make.count }})</span>
              </span>
            </label>

            <!-- "Model ›" link — only when make is selected AND has model data -->
            <button
              v-if="isMakeSelected(make.value) && make.models"
              type="button"
              class="mmt__sub-nav"
              :aria-label="`View ${make.value} models`"
              @click.stop="drillToModel(make.value)"
            >
              <span class="mmt__sub-nav-text">Model</span>
              <span class="mmt__sub-nav-icon" aria-hidden="true" v-html="rightChevronSvg" />
            </button>
          </li>
        </ul>
      </div>

      <!-- Model list — absolute, slides in/out -->
      <div
        class="mmt__pane mmt__pane--model"
        :class="modelPaneClass"
        :aria-hidden="view !== 'model' ? 'true' : undefined"
      >
        <!-- Empty state when model search finds nothing -->
        <p
          v-if="isSearchActive && currentModels.length === 0"
          class="mmt__no-results"
          role="status"
        >
          No results
        </p>
        <ul v-else class="mmt__list" role="list">
          <li
            v-for="model in currentModels"
            :key="model.value"
            class="mmt__row"
            :class="{
              'mmt__row--selected':  isModelSelected(model.value),
              'mmt__row--returning': isModelReturning(model.value),
            }"
          >
            <label class="mmt__row-label">
              <input
                type="checkbox"
                class="mmt__row-input"
                :checked="isModelSelected(model.value)"
                :aria-label="model.value"
                @change="toggleModel(model.value)"
              />
              <span
                v-if="isModelSelected(model.value)"
                class="mmt__check"
                aria-hidden="true"
                v-html="checkSvg"
              />
              <span class="mmt__row-content">
                <span class="mmt__row-name">{{ model.value }}</span>
                <span class="mmt__row-count">({{ model.count }})</span>
              </span>
            </label>

            <!-- "Trim ›" link — only when model is selected AND has trims -->
            <button
              v-if="isModelSelected(model.value) && model.trims?.length"
              type="button"
              class="mmt__sub-nav"
              :aria-label="`View ${model.value} trims`"
              @click.stop="drillToTrim(model.value)"
            >
              <span class="mmt__sub-nav-text">Trim</span>
              <span class="mmt__sub-nav-icon" aria-hidden="true" v-html="rightChevronSvg" />
            </button>
          </li>
        </ul>
      </div>

      <!-- Trim list — absolute, slides in/out -->
      <div
        class="mmt__pane mmt__pane--trim"
        :class="trimPaneClass"
        :aria-hidden="view !== 'trim' ? 'true' : undefined"
      >
        <ul class="mmt__list" role="list">
          <li
            v-for="trim in currentTrims"
            :key="trim.value"
            class="mmt__row"
            :class="{
              'mmt__row--selected':  isTrimSelected(trim.value),
              'mmt__row--returning': isTrimReturning(trim.value),
            }"
          >
            <label class="mmt__row-label">
              <input
                type="checkbox"
                class="mmt__row-input"
                :checked="isTrimSelected(trim.value)"
                :aria-label="trim.value"
                @change="toggleTrim(trim.value)"
              />
              <span
                v-if="isTrimSelected(trim.value)"
                class="mmt__check"
                aria-hidden="true"
                v-html="checkSvg"
              />
              <span class="mmt__row-content">
                <span class="mmt__row-name">{{ trim.value }}</span>
                <span class="mmt__row-count">({{ trim.count }})</span>
              </span>
            </label>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ─── Outer wrapper ─────────────────────────────────────────────────────── */
.mmt {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* ─── Header: "Make" title or "Make / Model" breadcrumb ─────────────────── */
/* Fixed height so the title (16px bold) and breadcrumb (14px) never differ. */
.mmt__header {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 56px;
  box-sizing: border-box;
  border-top: var(--border-width-hairline) solid var(--color-neutral-90);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
}

/* Plain "Make" title in Make view */
.mmt__title {
  width: 100%;
  padding: 0 var(--spacing-xxs);                     /* horizontal only — container drives height */
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);               /* 16px */
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

/* Breadcrumb row in Model / Trim views */
.mmt__breadcrumb {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-xxxs);                          /* 16px */
  padding: 0 var(--spacing-xxs);                     /* horizontal only — container drives height */
}

.mmt__bc-link {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);               /* 14px */
  font-weight: var(--font-weight-medium);            /* 500 */
  line-height: var(--text-body-sm-line-height);
  color: var(--color-action-accent);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.mmt__bc-link:hover {
  text-decoration: underline;
}

.mmt__bc-link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

.mmt__bc-sep {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  color: var(--color-neutral-70);
  user-select: none;
}

.mmt__bc-current {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  color: var(--color-neutral-0);
}

/* ─── Search bar (Make view only) ──────────────────────────────────────── */
.mmt__search {
  display: flex;
  align-items: center;
  gap: var(--spacing-xxs);                           /* 24px */
  padding: var(--spacing-xxxs) var(--spacing-xxs);  /* 16px 24px */
  background: var(--color-neutral-95);              /* #F4F5F7 */
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  flex-shrink: 0;
}

.mmt__search-input {
  flex: 1;
  min-width: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);               /* 16px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
  /* Remove native search-input decorations */
  -webkit-appearance: none;
  appearance: none;
}

.mmt__search-input::placeholder {
  color: var(--color-neutral-40);
}

/* Hide native clear button on search inputs */
.mmt__search-input::-webkit-search-cancel-button {
  -webkit-appearance: none;
}

.mmt__search-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.mmt__search-icon :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.mmt__search-icon :deep(path) {
  fill: var(--color-neutral-0);
}

/* ─── X clear button ───────────────────────────────────────────────────── */
.mmt__search-clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-neutral-0);
  line-height: 0;
}

.mmt__search-clear :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.mmt__search-clear :deep(path) {
  fill: currentColor;
}

.mmt__search-clear:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─── Search results list ──────────────────────────────────────────────── */
.mmt__search-list {
  width: 100%;
}

/* "No results" message */
.mmt__no-results {
  padding: var(--spacing-xxxs) var(--spacing-xxs);
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);               /* 14px */
  font-weight: var(--font-weight-regular);
  color: var(--color-neutral-40);
  margin: 0;
}

/* ─── Context header (non-selectable make label above model results) ────── */
.mmt__context-header {
  display: flex;
  align-items: center;
  padding: 6px var(--spacing-xxs);                   /* 6px 24px */
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);                 /* 12px */
  font-weight: var(--font-weight-medium);            /* 500 */
  letter-spacing: var(--text-label-letter-spacing);  /* 0.2px */
  line-height: var(--text-label-line-height);
  color: var(--color-neutral-40);
  background: var(--color-neutral-95);              /* subtle grey band */
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  list-style: none;
}

/* Model result rows get slight left indent so they visually nest under the header */
.mmt__row--model-result .mmt__row-label {
  padding-left: var(--spacing-xxs);                  /* 24px — same as normal */
}

/* ─── Sliding panes container ──────────────────────────────────────────── */
.mmt__panes {
  position: relative;
  overflow-x: clip;
}

/* ─── Individual panes ─────────────────────────────────────────────────── */
.mmt__pane {
  width: 100%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

/* Model and Trim panes sit in absolute overlay on top of the Make pane.
   The Make pane stays in normal flow and determines the container height. */
.mmt__pane--model,
.mmt__pane--trim {
  position: absolute;
  top: 0;
  left: 0;
}

/* Visible — centered in the viewport */
.mmt__pane--active {
  transform: translateX(0);
}

/* Off-screen left (slides out when navigating forward) */
.mmt__pane--left {
  transform: translateX(-100%);
  pointer-events: none;
  user-select: none;
}

/* Off-screen right (waiting to slide in) */
.mmt__pane--right {
  transform: translateX(100%);
  pointer-events: none;
  user-select: none;
}

/* ─── List ─────────────────────────────────────────────────────────────── */
.mmt__list {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}

.mmt__empty {
  padding: var(--spacing-xxxs) var(--spacing-xxs);
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  color: var(--color-neutral-40);
}

/* ─── Row ──────────────────────────────────────────────────────────────── */
.mmt__row {
  position: relative;                              /* for returning ::after overlay */
  display: flex;
  align-items: stretch;
  background: var(--color-neutral-100);
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
  transition: background-color 0.15s ease;
}

.mmt__row:hover {
  background: var(--color-neutral-95);
}

.mmt__row:active {
  background: var(--color-neutral-90);
}

/* ─── Returning state (green bg — re-opened with prior selection) ───────── */
.mmt__row--returning {
  background: var(--color-action-primary-subtle);
  border-bottom-color: var(--color-neutral-100);   /* white separator between grouped items */
}

.mmt__row--returning:hover {
  background: var(--color-action-primary-subtle);
  border-bottom-color: var(--color-neutral-100);
}

.mmt__row--returning:active {
  background: var(--color-action-primary-subtle);
  border-bottom-color: var(--color-neutral-100);
}

/* Pressed overlay — slightly darker tint on the green bg */
.mmt__row--returning:active::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.06);
  pointer-events: none;
}

/* Underline on label text for selected/returning hover */
.mmt__row--selected:hover .mmt__row-content,
.mmt__row--returning:hover .mmt__row-content {
  text-decoration: underline;
  text-decoration-color: var(--color-neutral-20);
  text-underline-offset: 2px;
}

/* ─── Checkbox label (left interactive area) ───────────────────────────── */
.mmt__row-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-nano);                          /* 8px */
  flex: 1;
  min-width: 0;
  height: 56px;
  padding: 0 var(--spacing-nano) 0 var(--spacing-xxs);  /* right: 8px left: 24px */
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
}

/* When there is no sub-nav button, extend padding to the right */
.mmt__row:not(.mmt__row--selected) .mmt__row-label,
.mmt__row--selected:not(:has(.mmt__sub-nav)) .mmt__row-label {
  padding-right: var(--spacing-xxs);               /* 24px when no sub-nav */
}

/* Visually-hidden checkbox — keeps dimensions so Tab key can reach it */
.mmt__row-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  pointer-events: none;  /* mouse clicks go to the wrapping <label> instead */
}

/* ─── Green checkmark badge ─────────────────────────────────────────────── */
.mmt__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: var(--color-action-primary);
  border-radius: var(--border-radius-sm);            /* 4px */
}

.mmt__check :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.mmt__check :deep(path) {
  fill: var(--color-neutral-100);
}

/* ─── Name + count text ─────────────────────────────────────────────────── */
.mmt__row-content {
  display: flex;
  align-items: baseline;
  gap: 4px;
  min-width: 0;
}

/* Truncating variant used on model rows inside search results */
.mmt__row-content--truncate {
  overflow: hidden;
}

.mmt__row-content--truncate .mmt__row-name {
  flex: 1 1 0%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mmt__row-name {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);               /* 16px */
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
  white-space: nowrap;
}

.mmt__row-count {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-light);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-40);
  white-space: nowrap;
}

/* Count stays pinned when name truncates */
.mmt__row-count--fixed {
  flex-shrink: 0;
}

/* ─── Sub-nav button: "Model ›" / "Trim ›" ─────────────────────────────── */
.mmt__sub-nav {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  height: 56px;
  padding: 0 var(--spacing-xxs) 0 var(--spacing-nano);  /* 24px right, 8px left */
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-action-accent);
}

.mmt__sub-nav-text {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);                 /* 12px */
  font-weight: var(--font-weight-medium);
  line-height: var(--text-body-lg-line-height);
  white-space: nowrap;
}

.mmt__sub-nav-icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  line-height: 0;
}

.mmt__sub-nav-icon :deep(svg) {
  display: block;
  width: 16px;
  height: 16px;
}

.mmt__sub-nav-icon :deep(path) {
  fill: currentColor;
}

.mmt__sub-nav:hover .mmt__sub-nav-text {
  text-decoration: underline;
}

.mmt__sub-nav:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: -2px;
  border-radius: 2px;
}

/* ─── Focus ring on checkbox label ─────────────────────────────────────── */
.mmt__row-label:has(.mmt__row-input:focus-visible) {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: -3px;
}
</style>
