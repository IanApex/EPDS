import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseRadio from './BaseRadio.vue'

const meta: Meta<typeof BaseRadio> = {
  title: 'Atoms/Inputs/BaseRadio',
  component: BaseRadio,
  tags: ['autodocs'],
  argTypes: {
    value:       { control: 'text' },
    name:        { control: 'text' },
    label:       { control: 'text' },
    modelValue:  { control: 'text' },
    disabled:    { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof BaseRadio>

/* ─── Single radio states ─────────────────────────────────── */

export const Default: Story = {
  args: { value: 'a', name: 'demo', label: 'Radio button', modelValue: '' },
}

export const Selected: Story = {
  args: { value: 'a', name: 'demo', label: 'Radio button', modelValue: 'a' },
}

export const Disabled: Story = {
  args: { value: 'a', name: 'demo', label: 'Radio button', modelValue: '', disabled: true },
}

export const DisabledSelected: Story = {
  name: 'Disabled Selected',
  args: { value: 'a', name: 'demo', label: 'Radio button', modelValue: 'a', disabled: true },
}

export const NoLabel: Story = {
  name: 'No Label',
  args: { value: 'a', name: 'demo', modelValue: '' },
}

/* ─── All States ──────────────────────────────────────────── */
export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { BaseRadio },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; font-family:var(--font-family-base);">
        <div style="display:flex; gap:48px; align-items:flex-start; flex-wrap:wrap;">

          <!-- Default -->
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Default</p>
            <BaseRadio value="x" name="s1" label="Radio button" model-value="" />
          </div>

          <!-- Hover (use pseudo-states addon or hover manually) -->
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Hover</p>
            <BaseRadio value="x" name="s2" label="Radio button" model-value="" class="pseudo-hover" />
          </div>

          <!-- Selected -->
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Selected</p>
            <BaseRadio value="x" name="s3" label="Radio button" model-value="x" />
          </div>

          <!-- Hover Selected -->
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Hover Selected</p>
            <BaseRadio value="x" name="s4" label="Radio button" model-value="x" class="pseudo-hover" />
          </div>

          <!-- Focus Selected -->
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Focus Selected</p>
            <BaseRadio value="x" name="s5" label="Radio button" model-value="x" class="pseudo-focus-within" />
          </div>

          <!-- Disabled -->
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Disabled</p>
            <BaseRadio value="x" name="s6" label="Radio button" model-value="" :disabled="true" />
          </div>

          <!-- Disabled Selected -->
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Disabled Selected</p>
            <BaseRadio value="x" name="s7" label="Radio button" model-value="x" :disabled="true" />
          </div>
        </div>
      </div>
    `,
  }),
}

/* ─── Radio Group — interactive ───────────────────────────── */
export const RadioGroup: Story = {
  name: 'Radio Group',
  render: () => ({
    components: { BaseRadio },
    setup() {
      const chosen = ref('option2')
      const options = [
        { value: 'option1', label: 'Option 01' },
        { value: 'option2', label: 'Option 02' },
        { value: 'option3', label: 'Option 03' },
        { value: 'option4', label: 'Option 04' },
      ]
      return { chosen, options }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:8px;">
        <p style="font-size:12px; color:var(--color-neutral-40); margin:0 0 8px;">
          Selected: <strong>{{ chosen }}</strong>
        </p>
        <div
          role="radiogroup"
          aria-label="Option group"
          style="display:flex; flex-direction:column; gap:16px;"
        >
          <BaseRadio
            v-for="opt in options"
            :key="opt.value"
            v-model="chosen"
            name="group"
            :value="opt.value"
            :label="opt.label"
          />
        </div>
      </div>
    `,
  }),
}

/* ─── Multiple columns ────────────────────────────────────── */
export const TwoColumn: Story = {
  name: 'Two Column Group',
  render: () => ({
    components: { BaseRadio },
    setup() {
      const chosen = ref('')
      const options = [
        { value: 'financing', label: 'Financing' },
        { value: 'text',      label: 'Text'       },
        { value: 'cash',      label: 'Cash'        },
        { value: 'email',     label: 'Email'       },
      ]
      return { chosen, options }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:8px;">
        <p style="font-size:12px; color:var(--color-neutral-40); margin:0 0 8px;">
          Selected: <strong>{{ chosen || 'none' }}</strong>
        </p>
        <div
          role="radiogroup"
          aria-label="Payment type"
          style="display:grid; grid-template-columns:1fr 1fr; gap:16px 48px;"
        >
          <BaseRadio
            v-for="opt in options"
            :key="opt.value"
            v-model="chosen"
            name="twoCol"
            :value="opt.value"
            :label="opt.label"
          />
        </div>
      </div>
    `,
  }),
}

/* ─── Long wrapping label ─────────────────────────────────── */
export const LongLabel: Story = {
  name: 'Long Wrapping Label',
  render: () => ({
    components: { BaseRadio },
    setup() {
      const chosen = ref('')
      const options = [
        { value: 'a', label: 'Option 01' },
        { value: 'b', label: 'Option 02' },
        { value: 'c', label: 'Option 03 that has a really long name so it goes to two lines' },
        { value: 'd', label: 'Option 04' },
      ]
      return { chosen, options }
    },
    template: `
      <div
        role="radiogroup"
        aria-label="Long label group"
        style="display:flex; flex-direction:column; gap:16px; max-width:280px;"
      >
        <BaseRadio
          v-for="opt in options"
          :key="opt.value"
          v-model="chosen"
          name="longLabel"
          :value="opt.value"
          :label="opt.label"
        />
      </div>
    `,
  }),
}

/* ─── With default selection (Figma usage guideline) ─────── */
export const WithDefaultSelection: Story = {
  name: 'With Default Selection',
  render: () => ({
    components: { BaseRadio },
    setup() {
      const chosen = ref('option1')
      const options = [
        { value: 'option1', label: 'Option 01' },
        { value: 'option2', label: 'Option 02' },
        { value: 'option3', label: 'Option 03' },
        { value: 'option4', label: 'Option 04' },
      ]
      return { chosen, options }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:8px;">
        <p
          style="font-size:14px; color:var(--color-neutral-40); max-width:320px; line-height:1.4; margin:0 0 16px;"
        >
          One radio must be selected by default on page load. Only one can be
          selected at a time within a group.
        </p>
        <div
          role="radiogroup"
          aria-label="Option group"
          style="display:flex; flex-direction:column; gap:16px;"
        >
          <BaseRadio
            v-for="opt in options"
            :key="opt.value"
            v-model="chosen"
            name="defaultSel"
            :value="opt.value"
            :label="opt.label"
          />
        </div>
      </div>
    `,
  }),
}
