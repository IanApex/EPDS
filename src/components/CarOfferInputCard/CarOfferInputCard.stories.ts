import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import CarOfferInputCard from './CarOfferInputCard.vue'

const meta = {
  title: 'Molecules/CarOfferInputCard',
  component: CarOfferInputCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Trade-in / offer entry card from Figma **Car offer input card**. Composes `SegmentedControl`, ' +
          '`TextField`, `SelectDropdown`, `BaseButton`, and `LinkCta`.\n\n' +
          '**v-model:** `offerType` (`vin` | `license`), `vin`, `licensePlate`, `state`. ' +
          '**Events:** `submit`, `vin-help`.',
      },
    },
    backgrounds: { default: 'neutral-95' },
  },
  argTypes: {
    offerType: { control: 'radio', options: ['vin', 'license'] },
    vin: { control: 'text' },
    licensePlate: { control: 'text' },
    state: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    offerType: 'vin',
    vin: '',
    licensePlate: '',
    state: '',
    disabled: false,
  },
} satisfies Meta<typeof CarOfferInputCard>

export default meta
type Story = StoryObj<typeof meta>

export const VinMode: Story = {
  name: 'VIN mode',
  args: {
    offerType: 'vin',
    vin: '',
  },
}

export const LicensePlateMode: Story = {
  name: 'License plate mode',
  args: {
    offerType: 'license',
    licensePlate: '',
    state: '',
  },
}

export const FilledVin: Story = {
  name: 'VIN — filled',
  args: {
    offerType: 'vin',
    vin: '1HGBH41JXMN109186',
  },
}

export const FilledLicense: Story = {
  name: 'License plate — filled',
  args: {
    offerType: 'license',
    licensePlate: 'ABC1234',
    state: 'TX',
  },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    offerType: 'vin',
    vin: '1VIN',
    disabled: true,
  },
}

export const Interactive: Story = {
  name: 'Interactive',
  render: () => ({
    components: { CarOfferInputCard },
    setup() {
      const offerType = ref<'vin' | 'license'>('vin')
      const vin = ref('')
      const licensePlate = ref('')
      const state = ref('')
      return { offerType, vin, licensePlate, state }
    },
    template: `
      <div style="padding:24px;">
        <CarOfferInputCard
          v-model:offer-type="offerType"
          v-model:vin="vin"
          v-model:license-plate="licensePlate"
          v-model:state="state"
          @submit="console.info('submit', { offerType, vin, licensePlate, state })"
          @vin-help="console.info('vin-help')"
        />
        <pre style="margin-top:16px;font-size:12px;">{{ JSON.stringify({ offerType, vin, licensePlate, state }, null, 2) }}</pre>
      </div>
    `,
  }),
}
