import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SrpFilterMakeModelTrim from './SrpFilterMakeModelTrim.vue'
import type { MakeItem } from './SrpFilterMakeModelTrim.vue'
import SrpFiltersPanel from '@/components/SrpFiltersPanel/SrpFiltersPanel.vue'
import type { FilterCategory } from '@/components/SrpFiltersPanel/SrpFiltersPanel.vue'

// ─── Sample data ──────────────────────────────────────────────────────────────

const MAKES: MakeItem[] = [
  {
    value: 'Acura',
    count: 34,
    models: [
      { value: 'ILX',  count: 12, trims: [{ value: 'Premium', count: 8 }, { value: 'Technology', count: 4 }] },
      { value: 'MDX',  count: 10, trims: [{ value: 'Base', count: 5 }, { value: 'SH-AWD', count: 5 }] },
      { value: 'RDX',  count: 8,  trims: [] },
      { value: 'TLX',  count: 4,  trims: [{ value: '2.4L', count: 2 }, { value: 'V6 SH-AWD', count: 2 }] },
    ],
  },
  {
    value: 'Audi',
    count: 82,
    models: [
      { value: 'A3',        count: 11, trims: [{ value: '2.0T Premium', count: 4 }, { value: '2.0T Prestige', count: 7 }] },
      { value: 'A4',        count: 11, trims: [] },
      { value: 'A5',        count: 11, trims: [] },
      {
        value: 'A6',
        count: 11,
        trims: [
          { value: '2.0T Premium',       count: 11 },
          { value: '3.0T Prestige',       count: 11 },
          { value: '3.0T Prestige Plus',  count: 11 },
          { value: '3.0T Quattro Premium', count: 11 },
          { value: '45 TFSI Premium Plus', count: 11 },
          { value: '55 TFSI Premium Plus', count: 11 },
          { value: 'competition',         count: 11 },
          { value: 'TDI Premium Plus',    count: 11 },
          { value: 'TDI Prestige',        count: 11 },
        ],
      },
      { value: 'A7',      count: 11, trims: [] },
      { value: 'A8',      count: 11, trims: [] },
      { value: 'allroad', count: 11, trims: [] },
      { value: 'e-tron',  count: 11, trims: [] },
      { value: 'Q3',      count: 11, trims: [] },
      { value: 'Q5',      count: 11, trims: [] },
      { value: 'S3',      count: 11, trims: [] },
      { value: 'S5',      count: 11, trims: [] },
    ],
  },
  { value: 'BMW',       count: 57, models: [{ value: '3 Series', count: 20, trims: [{ value: '330i', count: 12 }, { value: 'M340i', count: 8 }] }, { value: '5 Series', count: 22, trims: [] }, { value: 'X3', count: 15, trims: [] }] },
  { value: 'Buick',     count: 21, models: [{ value: 'Enclave', count: 10, trims: [] }, { value: 'Encore', count: 11, trims: [] }] },
  { value: 'Cadillac',  count: 18, models: [] },
  { value: 'Chevrolet', count: 93, models: [] },
  { value: 'Chrysler',  count: 14, models: [] },
  { value: 'Dodge',     count: 29, models: [] },
  { value: 'Ford',      count: 112, models: [] },
  { value: 'GMC',       count: 44, models: [] },
  { value: 'Honda',     count: 78, models: [] },
  { value: 'Hyundai',   count: 51, models: [] },
  { value: 'Infinity',  count: 22, models: [] },
  { value: 'Jaguar',    count: 11, models: [] },
  { value: 'Jeep',      count: 67, models: [] },
  { value: 'Kia',       count: 43, models: [] },
]

const panelWrapper = 'width:320px;border-right:1px solid var(--color-neutral-90);min-height:400px;overflow:hidden;'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Molecules/SRP Filters/MakeModelTrimFilter',
  component: SrpFilterMakeModelTrim,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Three-level drill-down filter for Make → Model → Trim. ' +
          'Manages its own internal sub-navigation with a sliding panel animation. ' +
          'Selecting a make reveals a "Model ›" link; selecting a model (that has trims) reveals a "Trim ›" link. ' +
          'The breadcrumb at the top updates to reflect the current depth and provides back-navigation. ' +
          'Place inside `SrpFiltersPanel` with `hideTitle: true` on the corresponding `FilterCategory` ' +
          'so the panel does not render a duplicate title.',
      },
    },
    backgrounds: { default: 'light' },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SrpFilterMakeModelTrim>

export default meta
type Story = StoryObj<typeof meta>

// ─── Make view ────────────────────────────────────────────────────────────────

export const MakeView: Story = {
  name: 'Make view — Audi selected',
  render: () => ({
    components: { SrpFilterMakeModelTrim },
    setup() {
      const selectedMakes  = ref(['Audi'])
      const selectedModels = ref<string[]>([])
      const selectedTrims  = ref<string[]>([])
      return { MAKES, selectedMakes, selectedModels, selectedTrims }
    },
    template: `
      <div style="${panelWrapper}">
        <SrpFilterMakeModelTrim
          :makes="MAKES"
          v-model:selectedMakes="selectedMakes"
          v-model:selectedModels="selectedModels"
          v-model:selectedTrims="selectedTrims"
        />
      </div>
    `,
  }),
}

// ─── Model view ───────────────────────────────────────────────────────────────

export const ModelView: Story = {
  name: 'Model view — Audi / A6 selected',
  render: () => ({
    components: { SrpFilterMakeModelTrim },
    setup() {
      const selectedMakes  = ref(['Audi'])
      const selectedModels = ref(['A6'])
      const selectedTrims  = ref<string[]>([])
      return { MAKES, selectedMakes, selectedModels, selectedTrims }
    },
    template: `
      <div style="${panelWrapper}">
        <SrpFilterMakeModelTrim
          :makes="MAKES"
          initialView="model"
          initialMake="Audi"
          v-model:selectedMakes="selectedMakes"
          v-model:selectedModels="selectedModels"
          v-model:selectedTrims="selectedTrims"
        />
      </div>
    `,
  }),
}

// ─── Trim view ────────────────────────────────────────────────────────────────

export const TrimView: Story = {
  name: 'Trim view — Audi / A6 / 3.0T Prestige Plus selected',
  render: () => ({
    components: { SrpFilterMakeModelTrim },
    setup() {
      const selectedMakes  = ref(['Audi'])
      const selectedModels = ref(['A6'])
      const selectedTrims  = ref(['3.0T Prestige Plus'])
      return { MAKES, selectedMakes, selectedModels, selectedTrims }
    },
    template: `
      <div style="${panelWrapper}">
        <SrpFilterMakeModelTrim
          :makes="MAKES"
          initialView="trim"
          initialMake="Audi"
          initialModel="A6"
          v-model:selectedMakes="selectedMakes"
          v-model:selectedModels="selectedModels"
          v-model:selectedTrims="selectedTrims"
        />
      </div>
    `,
  }),
}

// ─── Make view — nothing selected ────────────────────────────────────────────

export const MakeViewEmpty: Story = {
  name: 'Make view — nothing selected',
  render: () => ({
    components: { SrpFilterMakeModelTrim },
    setup() {
      const selectedMakes  = ref<string[]>([])
      const selectedModels = ref<string[]>([])
      const selectedTrims  = ref<string[]>([])
      return { MAKES, selectedMakes, selectedModels, selectedTrims }
    },
    template: `
      <div style="${panelWrapper}">
        <SrpFilterMakeModelTrim
          :makes="MAKES"
          v-model:selectedMakes="selectedMakes"
          v-model:selectedModels="selectedModels"
          v-model:selectedTrims="selectedTrims"
        />
      </div>
    `,
  }),
}

// ─── Multiple makes selected ──────────────────────────────────────────────────

export const MultipleSelected: Story = {
  name: 'Make view — multiple makes selected',
  render: () => ({
    components: { SrpFilterMakeModelTrim },
    setup() {
      const selectedMakes  = ref(['Audi', 'BMW', 'Honda'])
      const selectedModels = ref<string[]>([])
      const selectedTrims  = ref<string[]>([])
      return { MAKES, selectedMakes, selectedModels, selectedTrims }
    },
    template: `
      <div style="${panelWrapper}">
        <SrpFilterMakeModelTrim
          :makes="MAKES"
          v-model:selectedMakes="selectedMakes"
          v-model:selectedModels="selectedModels"
          v-model:selectedTrims="selectedTrims"
        />
      </div>
    `,
  }),
}

// ─── Interactive — standalone ─────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive — standalone',
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive: select makes, click "Model ›" to drill in, ' +
          'select models with trims and click "Trim ›", use the breadcrumb to navigate back.',
      },
    },
  },
  render: () => ({
    components: { SrpFilterMakeModelTrim },
    setup() {
      const selectedMakes  = ref<string[]>([])
      const selectedModels = ref<string[]>([])
      const selectedTrims  = ref<string[]>([])
      return { MAKES, selectedMakes, selectedModels, selectedTrims }
    },
    template: `
      <div style="${panelWrapper}">
        <SrpFilterMakeModelTrim
          :makes="MAKES"
          v-model:selectedMakes="selectedMakes"
          v-model:selectedModels="selectedModels"
          v-model:selectedTrims="selectedTrims"
        />
      </div>
      <div style="padding:16px;font-size:12px;color:var(--color-neutral-40);">
        Makes: {{ selectedMakes.join(', ') || '—' }}<br/>
        Models: {{ selectedModels.join(', ') || '—' }}<br/>
        Trims: {{ selectedTrims.join(', ') || '—' }}
      </div>
    `,
  }),
}

// ─── Integrated inside SrpFiltersPanel ───────────────────────────────────────

const CATEGORIES: FilterCategory[] = [
  { key: 'distance',    label: 'Distance & shipping',       hasSelection: false },
  { key: 'make',        label: 'Make/Model/Trim',           hasSelection: false, hideTitle: true },
  { key: 'body-style',  label: 'Body style',                hasSelection: false },
  { key: 'price',       label: 'Price & payment',           hasSelection: false },
  { key: 'year',        label: 'Year',                      hasSelection: false },
  { key: 'mileage',     label: 'Mileage',                   hasSelection: false },
]

export const InsideFiltersPanel: Story = {
  name: 'Integrated — inside SrpFiltersPanel',
  parameters: {
    docs: {
      description: {
        story:
          'The Make/Model/Trim filter shown inside the full `SrpFiltersPanel`. ' +
          'Note `hideTitle: true` on the "Make/Model/Trim" category — this suppresses the panel\'s ' +
          'default title section so the filter can render its own breadcrumb header. ' +
          'Click "Make/Model/Trim" from the parent list to open the filter.',
      },
    },
  },
  render: () => ({
    components: { SrpFiltersPanel, SrpFilterMakeModelTrim },
    setup() {
      const activeFilter   = ref<string | null>(null)
      const categories     = ref<FilterCategory[]>(CATEGORIES.map(c => ({ ...c })))
      const selectedMakes  = ref<string[]>([])
      const selectedModels = ref<string[]>([])
      const selectedTrims  = ref<string[]>([])

      function handleReset() {
        selectedMakes.value  = []
        selectedModels.value = []
        selectedTrims.value  = []
        categories.value = categories.value.map(c => ({ ...c, hasSelection: false }))
      }

      function onMakesChange(val: string[]) {
        selectedMakes.value = val
        const idx = categories.value.findIndex(c => c.key === 'make')
        if (idx !== -1) {
          categories.value[idx] = {
            ...categories.value[idx],
            hasSelection: val.length > 0 || selectedModels.value.length > 0 || selectedTrims.value.length > 0,
          }
        }
      }

      return { MAKES, categories, activeFilter, selectedMakes, selectedModels, selectedTrims, handleReset, onMakesChange }
    },
    template: `
      <div style="${panelWrapper}">
        <SrpFiltersPanel
          :categories="categories"
          v-model="activeFilter"
          @reset="handleReset"
        >
          <template #child="{ activeFilter: af }">
            <SrpFilterMakeModelTrim
              v-if="af === 'make'"
              :makes="MAKES"
              v-model:selectedMakes="selectedMakes"
              v-model:selectedModels="selectedModels"
              v-model:selectedTrims="selectedTrims"
              @update:selectedMakes="onMakesChange"
            />
          </template>
        </SrpFiltersPanel>
      </div>
    `,
  }),
}
