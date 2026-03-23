import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import TextBoxLG from './TextBoxLG.vue'

const meta: Meta<typeof TextBoxLG> = {
  title: 'Components/Inputs/TextBoxLG',
  component: TextBoxLG,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    modelValue: { control: 'text' },
    maxlength: { control: 'number' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Label',
    maxlength: 500,
  },
  decorators: [
    () => ({
      template: '<div style="padding: 40px 32px 32px; display: flex; gap: 32px; flex-wrap: wrap;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof TextBoxLG>

export const Default: Story = {
  args: {
    label: 'Share your car buying experience at EchoPark',
    modelValue: '',
  },
  decorators: [
    () => ({
      template: '<div style="padding: 40px 32px 24px;"><story /></div>',
    }),
  ],
}

export const Filled: Story = {
  args: {
    label: 'Share your car buying experience at EchoPark',
    modelValue:
      'This is a bunch of text from the user about their car buying experience at EchoPark.',
  },
  decorators: [
    () => ({
      template: '<div style="padding: 40px 32px 24px;"><story /></div>',
    }),
  ],
}

export const DisabledFilled: Story = {
  args: {
    label: 'Share your car buying experience at EchoPark',
    modelValue:
      'This is a bunch of text from the user about their car buying experience at EchoPark.',
    disabled: true,
  },
  decorators: [
    () => ({
      template: '<div style="padding: 40px 32px 24px;"><story /></div>',
    }),
  ],
}

export const WithError: Story = {
  args: {
    label: 'Share your experience',
    modelValue: '',
    error: 'This field is required',
  },
  decorators: [
    () => ({
      template: '<div style="padding: 40px 32px 40px;"><story /></div>',
    }),
  ],
}

export const AllStates: Story = {
  render: () => ({
    components: { TextBoxLG },
    template: `
      <div style="display: flex; flex-direction: column; gap: 56px; padding: 40px 32px;">
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom:8px;">Default (empty)</p>
          <TextBoxLG
            label="Share your car buying experience at EchoPark"
            model-value=""
            style="width: 452px;"
          />
        </div>
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom:8px;">Filled</p>
          <TextBoxLG
            label="Share your car buying experience at EchoPark"
            model-value="This is a bunch of text from the user about their car buying experience at EchoPark."
            style="width: 452px;"
          />
        </div>
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom:8px;">Disabled Filled</p>
          <TextBoxLG
            label="Share your car buying experience at EchoPark"
            model-value="This is a bunch of text from the user about their car buying experience at EchoPark."
            :disabled="true"
            style="width: 452px;"
          />
        </div>
        <div>
          <p style="font-size:12px; color:#666B70; margin-bottom:8px;">Error</p>
          <TextBoxLG
            label="Share your experience"
            model-value=""
            error="This field is required"
            style="width: 452px;"
          />
        </div>
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { TextBoxLG },
    setup() {
      const experience = ref('')
      return { experience }
    },
    template: `
      <div style="padding: 40px 32px 40px;">
        <TextBoxLG
          label="Share your car buying experience at EchoPark"
          v-model="experience"
          :maxlength="500"
          style="width: 452px;"
        />
        <p style="margin-top: 12px; font-size: 12px; color: #666B70;">
          Characters: {{ experience.length }} / 500
        </p>
      </div>
    `,
  }),
}

export const AtCharacterLimit: Story = {
  args: {
    label: 'Share your experience',
    modelValue:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.',
    maxlength: 500,
  },
  decorators: [
    () => ({
      template: '<div style="padding: 40px 32px 40px;"><story /></div>',
    }),
  ],
}

