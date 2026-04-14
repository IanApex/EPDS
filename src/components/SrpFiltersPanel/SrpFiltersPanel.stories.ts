import { ref, computed, watch } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SrpFiltersPanel from './SrpFiltersPanel.vue'
import type { FilterCategory } from './SrpFiltersPanel.vue'
import SrpFilterChild from '@/components/SrpFilterChild/SrpFilterChild.vue'

import coupeIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Coupe.svg?raw'
import convertibleIcon from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Convertible.svg?raw'
import hatchbackIcon   from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Hatchback.svg?raw'
import sedanIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Sedan.svg?raw'
import suvIcon         from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=SUV.svg?raw'
import truckIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Truck.svg?raw'
import vanIcon         from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Van.svg?raw'
import wagonIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Wagon.svg?raw'

const CATEGORIES: FilterCategory[] = [
  { key: 'distance',    label: 'Distance & shipping',        hasSelection: false },
  { key: 'make',        label: 'Make/Model/Trim',            hasSelection: false },
  { key: 'body-style',  label: 'Body style',                 hasSelection: false },
  { key: 'price',       label: 'Price & payment',            hasSelection: false },
  { key: 'year',        label: 'Year',                       hasSelection: false },
  { key: 'mileage',     label: 'Mileage',                    hasSelection: false },
  { key: 'features',    label: 'Features',                   hasSelection: false },
  { key: 'mpg',         label: 'MPG & engine type',          hasSelection: false },
  { key: 'drive',       label: 'Drive type & transmission',  hasSelection: false },
  { key: 'color',       label: 'Color',                      hasSelection: false },
]

const CATEGORIES_WITH_SELECTION: FilterCategory[] = CATEGORIES.map(c =>
  c.key === 'distance' ? { ...c, hasSelection: true } : c,
)

const BODY_STYLE_OPTIONS = [
  { value: 'coupe',       label: 'Coupe',       count: 102,   icon: coupeIcon },
  { value: 'convertible', label: 'Convertible', count: 66,    icon: convertibleIcon },
  { value: 'hatchback',   label: 'Hatchback',   count: 87,    icon: hatchbackIcon },
  { value: 'sedan',       label: 'Sedan',       count: 3102,  icon: sedanIcon },
  { value: 'suv',         label: 'SUV',         count: 124,   icon: suvIcon },
  { value: 'truck',       label: 'Truck',       count: 573,   icon: truckIcon },
  { value: 'van',         label: 'Van/Minivan', count: 77,    icon: vanIcon },
  { value: 'wagon',       label: 'Wagon',       count: 2,     icon: wagonIcon },
]

const meta = {
  title: 'Organisms/SRP Filters/FiltersPanel',
  component: SrpFiltersPanel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'SRP sidebar filter panel organism. Manages a two-panel slide animation: the parent ' +
          'category list slides left as the selected child filter slides in from the right. ' +
          'Bind `v-model` to control the active child filter key (or `null` for the parent view). ' +
          'Provide child filter content via the `#child` slot — the slot receives `{ activeFilter }` ' +
          'so the parent can render the correct options per category.',
      },
    },
    backgrounds: { default: 'light' },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SrpFiltersPanel>

export default meta
type Story = StoryObj<typeof meta>

const panelWrapper = 'width:306px;border-right:1px solid var(--color-neutral-90);min-height:400px;overflow:hidden;'

// ─── Static snapshots ─────────────────────────────────────────────────────────

export const ParentView: Story = {
  name: 'Parent view (default)',
  render: () => ({
    components: { SrpFiltersPanel },
    setup() { return { CATEGORIES } },
    template: `
      <div style="${panelWrapper}">
        <SrpFiltersPanel :categories="CATEGORIES" :modelValue="null" />
      </div>
    `,
  }),
}

export const ParentWithSelection: Story = {
  name: 'Parent — with active selection',
  parameters: {
    docs: {
      description: { story: '"Distance & shipping" is bold because a child option is applied.' },
    },
  },
  render: () => ({
    components: { SrpFiltersPanel },
    setup() { return { cats: CATEGORIES_WITH_SELECTION } },
    template: `
      <div style="${panelWrapper}">
        <SrpFiltersPanel :categories="cats" :modelValue="null" />
      </div>
    `,
  }),
}

// Shared icon span style — used by all body-style stories
const iconSpanStyle = 'display:inline-flex;width:48px;align-items:center;justify-content:flex-end;'

// CSS injected into story templates for the green-icon modifier
const iconStyles = `
<style>
.sfp-story-icon path, .sfp-story-icon polygon, .sfp-story-icon rect { fill: var(--color-neutral-0); }
.sfp-story-icon--green path, .sfp-story-icon--green polygon, .sfp-story-icon--green rect { fill: var(--color-action-primary); }
</style>`

export const BodyStyleChild: Story = {
  name: 'Body style — selecting (first time)',
  parameters: {
    docs: {
      description: {
        story:
          'First-time selection: items stay in their original positions. ' +
          'Selected items show the green checkmark badge and green vehicle icon, but no reorder.',
      },
    },
  },
  render: () => ({
    components: { SrpFiltersPanel, SrpFilterChild },
    setup() {
      const selected = ref<string[]>([])
      function toggle(value: string, on: boolean) {
        selected.value = on
          ? [...selected.value, value]
          : selected.value.filter(v => v !== value)
      }
      return { CATEGORIES, BODY_STYLE_OPTIONS, selected, toggle }
    },
    template: `
      ${iconStyles}
      <div style="${panelWrapper}">
        <SrpFiltersPanel :categories="CATEGORIES" modelValue="body-style">
          <template #child>
            <SrpFilterChild
              v-for="opt in BODY_STYLE_OPTIONS"
              :key="opt.value"
              :label="opt.label"
              :count="opt.count"
              :selected="selected.includes(opt.value)"
              @update:selected="toggle(opt.value, $event)"
            >
              <template #trailing-icon>
                <span
                  :class="['sfp-story-icon', selected.includes(opt.value) && 'sfp-story-icon--green']"
                  :style="'${iconSpanStyle}'"
                  aria-hidden="true"
                  v-html="opt.icon"
                />
              </template>
            </SrpFilterChild>
          </template>
        </SrpFiltersPanel>
      </div>
    `,
  }),
}

export const BodyStyleReturning: Story = {
  name: 'Body style — returning (re-opened with selections)',
  parameters: {
    docs: {
      description: {
        story:
          'Re-opening the filter after Sedan and Truck were previously selected. ' +
          'The two applied filters float to the top with green background, white separators, ' +
          'and green vehicle icons. Deselecting one immediately returns it to its original position.',
      },
    },
  },
  render: () => ({
    components: { SrpFiltersPanel, SrpFilterChild },
    setup() {
      const selectedBodyStyles  = ref<string[]>(['sedan', 'truck'])
      const committedBodyStyles = ref<string[]>(['sedan', 'truck'])

      const sortedOptions = computed(() => {
        const top    = BODY_STYLE_OPTIONS.filter(o =>  committedBodyStyles.value.includes(o.value))
        const bottom = BODY_STYLE_OPTIONS.filter(o => !committedBodyStyles.value.includes(o.value))
        return [...top, ...bottom]
      })

      function toggle(value: string, on: boolean) {
        if (on) {
          selectedBodyStyles.value = [...selectedBodyStyles.value, value]
        } else {
          selectedBodyStyles.value  = selectedBodyStyles.value.filter(v => v !== value)
          committedBodyStyles.value = committedBodyStyles.value.filter(v => v !== value)
        }
      }

      return { CATEGORIES, sortedOptions, selectedBodyStyles, committedBodyStyles, toggle }
    },
    template: `
      ${iconStyles}
      <div style="${panelWrapper}">
        <SrpFiltersPanel :categories="CATEGORIES" modelValue="body-style">
          <template #child>
            <SrpFilterChild
              v-for="opt in sortedOptions"
              :key="opt.value"
              :label="opt.label"
              :count="opt.count"
              :selected="selectedBodyStyles.includes(opt.value)"
              :returning="committedBodyStyles.includes(opt.value) && selectedBodyStyles.includes(opt.value)"
              @update:selected="toggle(opt.value, $event)"
            >
              <template #trailing-icon>
                <span
                  :class="['sfp-story-icon', selectedBodyStyles.includes(opt.value) && 'sfp-story-icon--green']"
                  :style="'${iconSpanStyle}'"
                  aria-hidden="true"
                  v-html="opt.icon"
                />
              </template>
            </SrpFilterChild>
          </template>
        </SrpFiltersPanel>
      </div>
    `,
  }),
}

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive',
  parameters: {
    docs: {
      description: {
        story:
          'Full behaviour: click a filter row to open it; click "← All filters" to return. ' +
          'First-time selections stay in place. Re-opening floats applied filters to the top ' +
          'with green background + white separators + green icon. Deselecting a returning item ' +
          'moves it back to its original position.',
      },
    },
  },
  render: () => ({
    components: { SrpFiltersPanel, SrpFilterChild },
    setup() {
      const activeFilter        = ref<string | null>(null)
      const selectedBodyStyles  = ref<string[]>([])
      const committedBodyStyles = ref<string[]>([])

      const categories = ref<FilterCategory[]>([
        { key: 'distance',   label: 'Distance & shipping',       hasSelection: false },
        { key: 'make',       label: 'Make/Model/Trim',           hasSelection: false },
        { key: 'body-style', label: 'Body style',                hasSelection: false },
        { key: 'price',      label: 'Price & payment',           hasSelection: false },
        { key: 'year',       label: 'Year',                      hasSelection: false },
        { key: 'mileage',    label: 'Mileage',                   hasSelection: false },
        { key: 'features',   label: 'Features',                  hasSelection: false },
        { key: 'mpg',        label: 'MPG & engine type',         hasSelection: false },
        { key: 'drive',      label: 'Drive type & transmission', hasSelection: false },
        { key: 'color',      label: 'Color',                     hasSelection: false },
      ])

      watch(activeFilter, (newKey) => {
        if (newKey === 'body-style') {
          committedBodyStyles.value = [...selectedBodyStyles.value]
        }
      })

      const sortedBodyStyleOptions = computed(() => {
        const committed = committedBodyStyles.value
        if (committed.length === 0) return BODY_STYLE_OPTIONS
        const top    = BODY_STYLE_OPTIONS.filter(o =>  committed.includes(o.value))
        const bottom = BODY_STYLE_OPTIONS.filter(o => !committed.includes(o.value))
        return [...top, ...bottom]
      })

      function toggleBodyStyle(value: string, on: boolean) {
        if (on) {
          selectedBodyStyles.value = [...selectedBodyStyles.value, value]
        } else {
          selectedBodyStyles.value  = selectedBodyStyles.value.filter(v => v !== value)
          committedBodyStyles.value = committedBodyStyles.value.filter(v => v !== value)
        }
        const idx = categories.value.findIndex(c => c.key === 'body-style')
        if (idx !== -1) {
          categories.value[idx] = {
            ...categories.value[idx],
            hasSelection: selectedBodyStyles.value.length > 0,
          }
        }
      }

      function handleReset() {
        selectedBodyStyles.value  = []
        committedBodyStyles.value = []
        categories.value = categories.value.map(c => ({ ...c, hasSelection: false }))
      }

      return {
        activeFilter, categories,
        selectedBodyStyles, committedBodyStyles,
        sortedBodyStyleOptions,
        toggleBodyStyle, handleReset,
      }
    },
    template: `
      ${iconStyles}
      <div style="${panelWrapper}">
        <SrpFiltersPanel
          :categories="categories"
          v-model="activeFilter"
          @reset="handleReset"
        >
          <template #child="{ activeFilter }">
            <template v-if="activeFilter === 'body-style'">
              <SrpFilterChild
                v-for="opt in sortedBodyStyleOptions"
                :key="opt.value"
                :label="opt.label"
                :count="opt.count"
                :selected="selectedBodyStyles.includes(opt.value)"
                :returning="committedBodyStyles.includes(opt.value) && selectedBodyStyles.includes(opt.value)"
                @update:selected="toggleBodyStyle(opt.value, $event)"
              >
                <template #trailing-icon>
                  <span
                    :class="['sfp-story-icon', selectedBodyStyles.includes(opt.value) && 'sfp-story-icon--green']"
                    :style="'${iconSpanStyle}'"
                    aria-hidden="true"
                    v-html="opt.icon"
                  />
                </template>
              </SrpFilterChild>
            </template>
            <template v-else>
              <div style="padding:24px;color:var(--color-neutral-40);font-size:14px;">
                Child filter for "{{ activeFilter }}" not yet implemented.
              </div>
            </template>
          </template>
        </SrpFiltersPanel>
      </div>
    `,
  }),
}
