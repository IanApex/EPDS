import { ref, computed } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CompareTool, { type CompareVehicle } from './CompareTool.vue'

const DUMMY_CAR_IMAGE =
  'https://content.homenetiol.com/scaler/400/400/eb9a7bffdd55493f8934eb98a5b0be7c.jpg'

/**
 * Seed catalogue used by all stories. Each vehicle differs in a few comparison
 * fields so the side-by-side experience reads correctly.
 */
const SEED: CompareVehicle[] = [
  {
    id: 1,
    year: '2020',
    mileage: '126k mi',
    stockNumber: 'PDW077969',
    title: 'Lamborghini Aventador LP 750-4 Superveloce Roadster SE',
    price: '30,499',
    monthlyPayment: '$250—$1,450/mo',
    deliveryLabel: 'Pick up today at',
    deliveryStore: 'SW Houston store',
    deliveryDistance: '125 mi',
    imageUrl: DUMMY_CAR_IMAGE,
    imageCount: 5,
    favorited: false,
    href: '#',
    trim: 'LP 750-4 Superveloce Roadster SE',
    bodyStyle: 'Convertible',
    engine: 'V12 6.5L',
    transmission: 'Automated Manual',
    driveType: 'AWD',
    mpgCity: 11,
    mpgHwy: 18,
    exteriorColor: 'Yellow',
    interiorColor: 'Black',
    features: ['Backup camera', 'Leather seats', 'Sunroof/Moonroof'],
  },
  {
    id: 2,
    year: '2021',
    mileage: '64k mi',
    stockNumber: 'PDW091243',
    title: 'Audi RS6 Avant Quattro',
    price: '82,999',
    monthlyPayment: '$1,100—$1,650/mo',
    deliveryLabel: 'Pick up today at',
    deliveryStore: 'Centennial store',
    deliveryDistance: '29 mi',
    imageUrl: DUMMY_CAR_IMAGE,
    imageCount: 5,
    favorited: true,
    href: '#',
    trim: 'Quattro Premium Plus',
    bodyStyle: 'Wagon',
    engine: 'V8 4.0L Twin-Turbo',
    transmission: 'Automatic',
    driveType: 'AWD',
    mpgCity: 15,
    mpgHwy: 22,
    exteriorColor: 'Nardo Gray',
    interiorColor: 'Black',
    features: ['Adaptive cruise control', 'Apple CarPlay', 'Heated seats', 'Sunroof/Moonroof'],
  },
  {
    id: 3,
    year: '2023',
    mileage: '12k mi',
    stockNumber: 'PDW118822',
    title: 'BMW M3 Competition xDrive',
    price: '74,500',
    monthlyPayment: '$950—$1,250/mo',
    deliveryLabel: 'Ship for $499 to',
    deliveryStore: 'Aurora store',
    deliveryDistance: '44 mi',
    imageUrl: DUMMY_CAR_IMAGE,
    imageCount: 5,
    favorited: false,
    href: '#',
    trim: 'Competition xDrive',
    bodyStyle: 'Sedan',
    engine: 'I6 3.0L Twin-Turbo',
    transmission: 'Automatic',
    driveType: 'AWD',
    mpgCity: 16,
    mpgHwy: 23,
    exteriorColor: 'Isle of Man Green',
    interiorColor: 'Tartufo',
    features: ['Adaptive cruise control', 'Apple CarPlay', 'Android Auto', 'Heated seats'],
  },
  {
    id: 4,
    year: '2022',
    mileage: '38k mi',
    stockNumber: 'PDW104577',
    title: 'Porsche 911 Carrera S',
    price: '128,750',
    monthlyPayment: '$1,650—$2,100/mo',
    deliveryLabel: 'Pick up today at',
    deliveryStore: 'Boulder store',
    deliveryDistance: '72 mi',
    imageUrl: DUMMY_CAR_IMAGE,
    imageCount: 5,
    favorited: false,
    href: '#',
    trim: 'Carrera S',
    bodyStyle: 'Coupe',
    engine: 'Flat-6 3.0L Twin-Turbo',
    transmission: 'PDK Automatic',
    driveType: 'RWD',
    mpgCity: 18,
    mpgHwy: 25,
    exteriorColor: 'GT Silver',
    interiorColor: 'Bordeaux Red',
    features: ['Adaptive cruise control', 'Apple CarPlay', 'Sunroof/Moonroof'],
  },
]

const meta = {
  title: 'Organisms/CompareTool',
  component: CompareTool,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modal compare tool launched from the SRP `CompareTray`.\n\n' +
          '- Centered ~95vw × 88vh panel that overlays the SRP via the `Overlay` atom (Esc / backdrop / X to close).\n' +
          '- Each selected vehicle is a sticky `SrpTile` column header pinned to the top of the body as the user scrolls comparison rows.\n' +
          '- The label column is sticky-left so row context stays visible while scrolling horizontally.\n' +
          '- An **X** icon (top-left of every tile) emits `remove`; favorite + VDP-drill behaviour comes from the underlying `SrpTile`.\n' +
          '- Comparison rows intentionally skip everything `SrpTile` already shows (year / mileage / stock # / price / payment / status / delivery) so the focus is on **new** information.\n' +
          '- When the parent removes the last vehicle, the modal auto-closes so the user lands back on the SRP with its prior scroll / filters / pills intact.',
      },
    },
  },
  argTypes: {
    modelValue:        { control: 'boolean' },
    title:             { control: 'text' },
    isSonic:           { control: 'boolean' },
    emptyLabel:        { control: 'text' },
    'onUpdate:modelValue': { action: 'update:modelValue' },
    'onUpdate:favorited':  { action: 'update:favorited' },
    onRemove:              { action: 'remove' },
  },
  args: {
    modelValue: true,
    vehicles: [],
    title: 'Compare vehicles',
    isSonic: false,
  },
} satisfies Meta<typeof CompareTool>

export default meta
type Story = StoryObj<typeof meta>

// ─── 2-vehicle baseline ──────────────────────────────────────────────────────

export const TwoVehicles: Story = {
  name: '2 vehicles · default',
  args: {},
  render: (args) => ({
    components: { CompareTool },
    setup() {
      const vehicles = ref<CompareVehicle[]>(SEED.slice(0, 2))
      const open = ref<boolean>(true)
      function removeVehicle(payload: { id: CompareVehicle['id'] }) {
        vehicles.value = vehicles.value.filter(v => v.id !== payload.id)
      }
      function setFavorite(payload: { id: CompareVehicle['id']; value: boolean }) {
        const v = vehicles.value.find(x => x.id === payload.id)
        if (v) v.favorited = payload.value
      }
      return { args, vehicles, open, removeVehicle, setFavorite }
    },
    template: `
      <CompareTool
        v-bind="args"
        v-model="open"
        :vehicles="vehicles"
        @remove="removeVehicle"
        @update:favorited="setFavorite"
      />
    `,
  }),
}

// ─── 3-vehicle layout ────────────────────────────────────────────────────────

export const ThreeVehicles: Story = {
  name: '3 vehicles · default',
  args: {},
  render: (args) => ({
    components: { CompareTool },
    setup() {
      const vehicles = ref<CompareVehicle[]>(SEED.slice(0, 3))
      const open = ref<boolean>(true)
      function removeVehicle(payload: { id: CompareVehicle['id'] }) {
        vehicles.value = vehicles.value.filter(v => v.id !== payload.id)
      }
      function setFavorite(payload: { id: CompareVehicle['id']; value: boolean }) {
        const v = vehicles.value.find(x => x.id === payload.id)
        if (v) v.favorited = payload.value
      }
      return { args, vehicles, open, removeVehicle, setFavorite }
    },
    template: `
      <CompareTool
        v-bind="args"
        v-model="open"
        :vehicles="vehicles"
        @remove="removeVehicle"
        @update:favorited="setFavorite"
      />
    `,
  }),
}

// ─── Maxed-out 4-vehicle layout ──────────────────────────────────────────────

export const FourVehicles: Story = {
  name: '4 vehicles · max grid',
  args: {},
  render: (args) => ({
    components: { CompareTool },
    setup() {
      const vehicles = ref<CompareVehicle[]>([...SEED])
      const open = ref<boolean>(true)
      function removeVehicle(payload: { id: CompareVehicle['id'] }) {
        vehicles.value = vehicles.value.filter(v => v.id !== payload.id)
      }
      function setFavorite(payload: { id: CompareVehicle['id']; value: boolean }) {
        const v = vehicles.value.find(x => x.id === payload.id)
        if (v) v.favorited = payload.value
      }
      return { args, vehicles, open, removeVehicle, setFavorite }
    },
    template: `
      <CompareTool
        v-bind="args"
        v-model="open"
        :vehicles="vehicles"
        @remove="removeVehicle"
        @update:favorited="setFavorite"
      />
    `,
  }),
}

// ─── Sonic brand variant ─────────────────────────────────────────────────────

export const SonicVehicleStatus: Story = {
  name: 'Sonic · with vehicleStatus tiles',
  args: { isSonic: true },
  parameters: {
    docs: {
      description: {
        story:
          'When `isSonic` is `true`, the `vehicleStatus` field is forwarded to each `SrpTile`, replacing the delivery block with the On-the-lot / In-transit status row.',
      },
    },
  },
  render: (args) => ({
    components: { CompareTool },
    setup() {
      const vehicles = ref<CompareVehicle[]>(
        SEED.slice(0, 3).map((v, i) => ({
          ...v,
          vehicleStatus: i === 0 ? 'in-transit' : 'on-lot',
        })),
      )
      const open = ref<boolean>(true)
      function removeVehicle(payload: { id: CompareVehicle['id'] }) {
        vehicles.value = vehicles.value.filter(v => v.id !== payload.id)
      }
      function setFavorite(payload: { id: CompareVehicle['id']; value: boolean }) {
        const v = vehicles.value.find(x => x.id === payload.id)
        if (v) v.favorited = payload.value
      }
      return { args, vehicles, open, removeVehicle, setFavorite }
    },
    template: `
      <CompareTool
        v-bind="args"
        v-model="open"
        :vehicles="vehicles"
        @remove="removeVehicle"
        @update:favorited="setFavorite"
      />
    `,
  }),
}

// ─── Mobile preview ──────────────────────────────────────────────────────────

export const Mobile: Story = {
  name: 'Mobile (full-bleed)',
  args: {},
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story:
          'Below 600px the panel is full-bleed (16px gutters), columns shrink, and the body horizontally scrolls so the user can swipe through additional vehicles.',
      },
    },
  },
  render: (args) => ({
    components: { CompareTool },
    setup() {
      const vehicles = ref<CompareVehicle[]>(SEED.slice(0, 3))
      const open = ref<boolean>(true)
      function removeVehicle(payload: { id: CompareVehicle['id'] }) {
        vehicles.value = vehicles.value.filter(v => v.id !== payload.id)
      }
      function setFavorite(payload: { id: CompareVehicle['id']; value: boolean }) {
        const v = vehicles.value.find(x => x.id === payload.id)
        if (v) v.favorited = payload.value
      }
      return { args, vehicles, open, removeVehicle, setFavorite }
    },
    template: `
      <CompareTool
        v-bind="args"
        v-model="open"
        :vehicles="vehicles"
        @remove="removeVehicle"
        @update:favorited="setFavorite"
      />
    `,
  }),
}

// ─── Interactive — open / close / remove / re-add ────────────────────────────

export const Interactive: Story = {
  name: 'Interactive (open · remove · re-add)',
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Click **Open compare tool** to launch the modal. Inside, use the X icon on a tile to remove a vehicle; click **Reset selection** to put the starting four back. Closes via the header X, Esc, or backdrop click.',
      },
    },
  },
  render: () => ({
    components: { CompareTool },
    setup() {
      const open = ref<boolean>(false)
      const vehicles = ref<CompareVehicle[]>([...SEED])

      function reset() {
        vehicles.value = [...SEED]
      }
      function removeVehicle(payload: { id: CompareVehicle['id'] }) {
        vehicles.value = vehicles.value.filter(v => v.id !== payload.id)
      }
      function setFavorite(payload: { id: CompareVehicle['id']; value: boolean }) {
        const v = vehicles.value.find(x => x.id === payload.id)
        if (v) v.favorited = payload.value
      }

      const summary = computed(() => `${vehicles.value.length} vehicles selected`)

      return { open, vehicles, summary, reset, removeVehicle, setFavorite }
    },
    template: `
      <div style="padding:32px; font-family: Roboto, sans-serif; color:#242c33;">
        <h1 style="margin:0 0 16px; font-size:24px;">Compare tool sandbox</h1>
        <p style="margin: 0 0 16px;">{{ summary }}</p>
        <div style="display:flex; gap:12px;">
          <button
            type="button"
            @click="open = true"
            style="padding:12px 24px; border-radius:4px; border:none; background:#3E8500; color:#fff; cursor:pointer;"
          >Open compare tool</button>
          <button
            type="button"
            @click="reset"
            style="padding:12px 24px; border-radius:4px; border:1px solid #242c33; background:#fff; cursor:pointer;"
          >Reset selection</button>
        </div>

        <CompareTool
          v-model="open"
          :vehicles="vehicles"
          @remove="removeVehicle"
          @update:favorited="setFavorite"
        />
      </div>
    `,
  }),
}
