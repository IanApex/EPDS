import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import TextBoxSM from './TextBoxSM.vue'

const meta: Meta<typeof TextBoxSM> = {
  title: 'Atoms/Inputs/TextBoxSM',
  component: TextBoxSM,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    modelValue: { control: 'text' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    type: { control: 'text' },
    inputmode: { control: 'text' },
    maxlength: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Label',
  },
  decorators: [
    () => ({
      template: '<div style="padding: 32px; display: flex; gap: 32px; flex-wrap: wrap; align-items: flex-end;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof TextBoxSM>

export const Default: Story = {
  args: { label: 'Label', modelValue: '' },
}

export const Focused: Story = {
  parameters: { pseudo: { focus: true } },
  args: { label: 'Max price', modelValue: '' },
  decorators: [
    () => ({
      template: '<div style="padding: 32px;"><story /></div>',
    }),
  ],
}

export const Filled: Story = {
  args: { label: 'Max price', modelValue: '32,000' },
}

export const WithPrefix: Story = {
  args: { label: 'Down payment', prefix: '$', modelValue: '' },
}

export const WithPrefixFilled: Story = {
  args: { label: 'Down payment', prefix: '$', modelValue: '10,000' },
}

export const WithSuffix: Story = {
  args: { label: 'Mileage', modelValue: '32,000', suffix: 'mi' },
}

export const DisabledFilled: Story = {
  args: { label: 'Max price', modelValue: '32,000', disabled: true },
}

export const WithError: Story = {
  args: { label: 'Max price', modelValue: '', error: 'Please enter a value' },
}

export const AllStates: Story = {
  render: () => ({
    components: { TextBoxSM },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 32px;">
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom: 8px;">Default (empty)</p>
          <TextBoxSM label="Label" model-value="" />
        </div>
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom: 8px;">Filled</p>
          <TextBoxSM label="Max price" model-value="32,000" />
        </div>
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom: 8px;">With Prefix</p>
          <TextBoxSM label="Down payment" prefix="$" model-value="10,000" />
        </div>
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom: 8px;">With Suffix</p>
          <TextBoxSM label="Mileage" model-value="32,000" suffix="mi" />
        </div>
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom: 8px;">Disabled Filled</p>
          <TextBoxSM label="Max price" model-value="32,000" :disabled="true" />
        </div>
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom: 8px;">Error</p>
          <TextBoxSM label="Max price" model-value="" error="Please enter a valid price" />
        </div>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { TextBoxSM },
    setup() {
      const price = ref('')
      const mileage = ref('32,000')
      return { price, mileage }
    },
    template: `
      <div style="display: flex; gap: 24px; padding: 32px; align-items: flex-end;">
        <TextBoxSM label="Max price" prefix="$" v-model="price" inputmode="numeric" />
        <TextBoxSM label="Mileage" v-model="mileage" suffix="mi" inputmode="numeric" />
      </div>
    `,
  }),
}

export const NumericUseCases: Story = {
  render: () => ({
    components: { TextBoxSM },
    setup() {
      const maxPrice = ref('32,000')
      const minPrice = ref('10,000')
      const mileage = ref('85,000')
      const payment = ref('599')
      const down = ref('5,000')
      const name = ref('Jane')
      return { maxPrice, minPrice, mileage, payment, down, name }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 32px; padding: 32px; align-items: flex-end;">
        <TextBoxSM label="Max price" prefix="$" v-model="maxPrice" inputmode="numeric" />
        <TextBoxSM label="Min price" prefix="$" v-model="minPrice" inputmode="numeric" />
        <TextBoxSM label="Mileage" v-model="mileage" suffix="mi" inputmode="numeric" />
        <TextBoxSM label="Monthly payment" prefix="$" v-model="payment" suffix="/mo" inputmode="numeric" />
        <TextBoxSM label="Down payment" prefix="$" v-model="down" inputmode="numeric" />
        <TextBoxSM label="Name" v-model="name" />
      </div>
    `,
  }),
}
