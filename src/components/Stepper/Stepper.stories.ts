import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Stepper from './Stepper.vue'
import type { StepperStep } from './Stepper.vue'

const standardSteps: StepperStep[] = [
  { label: 'Personal details' },
  { label: 'Store' },
  { label: 'Employment' },
  { label: 'Additional info' },
  { label: 'Review & submit' },
]

const coApplicantSteps: StepperStep[] = [
  { label: 'Personal details' },
  { label: 'Store' },
  { label: 'Employment' },
  { label: 'Additional info' },
  { label: 'Co-applicant details' },
  { label: 'Co-applicant employment' },
  { label: 'Review & submit' },
]

const meta = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Circular progress stepper showing current step, total steps, step name, and next step hint.\n\n' +
          '**Progress:** Green arc fills proportionally — `(currentStep - 1) / totalSteps`. ' +
          'E.g. step 3 of 5 = 40% filled (2 completed out of 5).\n\n' +
          '**Circle:** 90×90px, 8px stroke, grey track (`--color-neutral-90`), green fill (`--color-base-primary-60`).\n\n' +
          'Step labels and count are CMS-editable via the `steps` prop array.',
      },
    },
  },
  argTypes: {
    steps: { control: 'object' },
    modelValue: { control: { type: 'number', min: 1 } },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Step1of5: Story = {
  name: 'Step 1 of 5',
  args: {
    steps: standardSteps,
    modelValue: 1,
  },
}

export const Step2of5: Story = {
  name: 'Step 2 of 5',
  args: {
    steps: standardSteps,
    modelValue: 2,
  },
}

export const Step3of5: Story = {
  name: 'Step 3 of 5',
  args: {
    steps: standardSteps,
    modelValue: 3,
  },
}

export const Step4of5: Story = {
  name: 'Step 4 of 5',
  args: {
    steps: standardSteps,
    modelValue: 4,
  },
}

export const Step5of5: Story = {
  name: 'Step 5 of 5 (last)',
  args: {
    steps: standardSteps,
    modelValue: 5,
  },
}

export const CoApplicantStep5of7: Story = {
  name: 'Co-applicant — Step 5 of 7',
  args: {
    steps: coApplicantSteps,
    modelValue: 5,
  },
}

export const CoApplicantStep7of7: Story = {
  name: 'Co-applicant — Step 7 of 7 (last)',
  args: {
    steps: coApplicantSteps,
    modelValue: 7,
  },
}

export const AllStepsStandard: Story = {
  name: 'All Steps — Standard (5)',
  render: () => ({
    components: { Stepper },
    setup() {
      return { standardSteps }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <Stepper v-for="i in 5" :key="i" :steps="standardSteps" :modelValue="i" />
      </div>
    `,
  }),
}

export const AllStepsCoApplicant: Story = {
  name: 'All Steps — Co-applicant (7)',
  render: () => ({
    components: { Stepper },
    setup() {
      return { coApplicantSteps }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <Stepper v-for="i in 7" :key="i" :steps="coApplicantSteps" :modelValue="i" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { Stepper },
    setup() {
      const step = ref(1)
      const steps: StepperStep[] = [
        { label: 'Personal details' },
        { label: 'Store' },
        { label: 'Employment' },
        { label: 'Additional info' },
        { label: 'Review & submit' },
      ]
      function prev() { if (step.value > 1) step.value-- }
      function next() { if (step.value < steps.length) step.value++ }
      return { step, steps, prev, next }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <Stepper :steps="steps" v-model="step" />
        <div style="display: flex; gap: 12px;">
          <button
            :disabled="step <= 1"
            @click="prev"
            style="padding: 8px 20px; font-family: Roboto, sans-serif; font-size: 14px; border-radius: 8px; border: 2px solid #313D47; background: white; cursor: pointer;"
          >Back</button>
          <button
            :disabled="step >= steps.length"
            @click="next"
            style="padding: 8px 20px; font-family: Roboto, sans-serif; font-size: 14px; border-radius: 999px; border: none; background: #3E8500; color: white; cursor: pointer;"
          >Next</button>
        </div>
      </div>
    `,
  }),
}
