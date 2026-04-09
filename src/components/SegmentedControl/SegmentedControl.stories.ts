import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import SegmentedControl from './SegmentedControl.vue'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Atoms/Inputs/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    name:       { control: 'text' },
    disabled:   { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof SegmentedControl>

const twoOptions = [
  { value: 'label1', label: 'Label' },
  { value: 'label2', label: 'Label' },
]

const threeOptions = [
  { value: 'label1', label: 'Label' },
  { value: 'label2', label: 'Label' },
  { value: 'label3', label: 'Label' },
]

/* ─── Core variants ───────────────────────────────────────── */

export const TwoOptions: Story = {
  name: '2 Options — First Selected',
  args: {
    options:    twoOptions,
    name:       'sc-two',
    modelValue: 'label1',
  },
}

export const TwoOptionsSecond: Story = {
  name: '2 Options — Second Selected',
  args: {
    options:    twoOptions,
    name:       'sc-two-b',
    modelValue: 'label2',
  },
}

export const ThreeOptions: Story = {
  name: '3 Options — First Selected',
  args: {
    options:    threeOptions,
    name:       'sc-three',
    modelValue: 'label1',
  },
}

export const ThreeOptionsMiddle: Story = {
  name: '3 Options — Middle Selected',
  args: {
    options:    threeOptions,
    name:       'sc-three-b',
    modelValue: 'label2',
  },
}

export const Disabled: Story = {
  args: {
    options:    twoOptions,
    name:       'sc-disabled',
    modelValue: 'label1',
    disabled:   true,
  },
}

/* ─── All Chip States ─────────────────────────────────────── */
export const AllChipStates: Story = {
  name: 'All Chip States',
  render: () => ({
    components: { SegmentedControl },
    template: `
      <div style="display:flex; flex-direction:column; gap:32px; font-family:var(--font-family-base);">
        <div style="display:flex; gap:48px; align-items:flex-end; flex-wrap:wrap;">

          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Default (chip 2)</p>
            <SegmentedControl
              :options="[{value:'a',label:'Label'},{value:'b',label:'Label'}]"
              name="cs-default"
              model-value="a"
            />
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Hover (use addon or hover chip 2)</p>
            <SegmentedControl
              :options="[{value:'a',label:'Label'},{value:'b',label:'Label'}]"
              name="cs-hover"
              model-value="a"
            />
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Selected (chip 1)</p>
            <SegmentedControl
              :options="[{value:'a',label:'Label'},{value:'b',label:'Label'}]"
              name="cs-selected"
              model-value="a"
            />
          </div>

          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Focus Selected (tab to chip)</p>
            <SegmentedControl
              :options="[{value:'a',label:'Label'},{value:'b',label:'Label'}]"
              name="cs-focus"
              model-value="a"
              class="pseudo-focus-within"
            />
          </div>

        </div>

        <div style="display:flex; gap:48px; align-items:flex-end; flex-wrap:wrap;">
          <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-start;">
            <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">Disabled</p>
            <SegmentedControl
              :options="[{value:'a',label:'Label'},{value:'b',label:'Label'}]"
              name="cs-dis"
              model-value="a"
              :disabled="true"
            />
          </div>
        </div>
      </div>
    `,
  }),
}

/* ─── Interactive playground ──────────────────────────────── */
export const Interactive: Story = {
  name: 'Interactive',
  render: () => ({
    components: { SegmentedControl },
    setup() {
      const view2 = ref('list')
      const view3 = ref('new')
      return { view2, view3 }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:32px; font-family:var(--font-family-base);">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">
            2 options — active: <strong>{{ view2 }}</strong>
          </p>
          <SegmentedControl
            v-model="view2"
            name="view-toggle"
            :options="[{value:'list',label:'List'},{value:'grid',label:'Grid'}]"
          />
        </div>

        <div style="display:flex; flex-direction:column; gap:12px;">
          <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">
            3 options — active: <strong>{{ view3 }}</strong>
          </p>
          <SegmentedControl
            v-model="view3"
            name="sort-toggle"
            :options="[
              {value:'new',     label:'Newest'},
              {value:'price',   label:'Price' },
              {value:'mileage', label:'Miles' },
            ]"
          />
        </div>
      </div>
    `,
  }),
}

/* ─── Auto-select on mount ────────────────────────────────── */
export const AutoSelect: Story = {
  name: 'Auto-Select First on Mount',
  render: () => ({
    components: { SegmentedControl },
    setup() {
      const val = ref('')
      return { val }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; font-family:var(--font-family-base);">
        <p style="font-size:14px; color:var(--color-neutral-40); max-width:340px; line-height:1.5; margin:0;">
          modelValue starts as <code>''</code> — the component auto-selects
          the first chip on mount (Figma: "first chip always auto-selected on page arrival").
        </p>
        <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">
          Active: <strong>{{ val || '(mounting…)' }}</strong>
        </p>
        <SegmentedControl
          v-model="val"
          name="auto-select"
          :options="[
            {value:'option1', label:'Option 1'},
            {value:'option2', label:'Option 2'},
            {value:'option3', label:'Option 3'},
          ]"
        />
      </div>
    `,
  }),
}

/* ─── Real-world usage: SRP sort filter ───────────────────── */
export const SRPSortFilter: Story = {
  name: 'SRP Sort Filter',
  render: () => ({
    components: { SegmentedControl },
    setup() {
      const sort = ref('price')
      return { sort }
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; font-family:var(--font-family-base);">
        <p style="font-size:12px; color:var(--color-neutral-40); margin:0;">
          Sorting by: <strong>{{ sort }}</strong>
        </p>
        <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap; max-width:360px;">
          <span style="font-size:14px; color:var(--color-neutral-0);">Sort by</span>
          <div style="flex:1 1 200px; min-width:0;">
            <SegmentedControl
              v-model="sort"
              name="srp-sort"
              :options="[
                {value:'price',   label:'Price'  },
                {value:'mileage', label:'Mileage'},
              ]"
            />
          </div>
        </div>
      </div>
    `,
  }),
}
