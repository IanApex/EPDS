import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SrpFilterChildTextLink from './SrpFilterChildTextLink.vue'

const meta = {
  title: 'Molecules/SRP Filters/FilterChildTextLink',
  component: SrpFilterChildTextLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Filter option row with a split interaction zone: the left portion is a ' +
          'checkbox (toggles the filter), and the right portion is a secondary text ' +
          'link that navigates to a sub-filter view (e.g. "Trim →").\n\n' +
          'Hover states are independent — the active half highlights while the other ' +
          'stays neutral. Focus rings are also per-half.\n\n' +
          '**Selected Left side** = pointer over the checkbox half while selected.\n' +
          '**Selected Right side** = pointer over the link half while selected.\n\n' +
          'Listen for `@link-click` to handle the link navigation.',
      },
    },
    backgrounds: { default: 'light' },
  },
  argTypes: {
    label:      { control: 'text' },
    count:      { control: 'number' },
    selected:   { control: 'boolean' },
    returning:  { control: 'boolean' },
    linkLabel:  { control: 'text' },
    linkHref:   { control: 'text' },
  },
  args: {
    label:     '4WD',
    count:     82,
    selected:  false,
    returning: false,
    linkLabel: 'Trim',
    linkHref:  undefined,
  },
} satisfies Meta<typeof SrpFilterChildTextLink>

export default meta
type Story = StoryObj<typeof meta>

const w = 'width:306px;'

// ─── Static states ────────────────────────────────────────────────────────────

export const Normal: Story = {
  name: 'Normal (unselected)',
  render: (args) => ({
    components: { SrpFilterChildTextLink },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterChildTextLink v-bind="args" /></div>`,
  }),
}

export const SelectedLeftSide: Story = {
  name: 'Selected — left side',
  args: { selected: true },
  parameters: {
    docs: {
      description: { story: 'Checkbox is selected. Hover the left half to see its highlight.' },
    },
  },
  render: (args) => ({
    components: { SrpFilterChildTextLink },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterChildTextLink v-bind="args" /></div>`,
  }),
}

export const SelectedRightSide: Story = {
  name: 'Selected — right side (link hover)',
  args: { selected: true },
  parameters: {
    docs: {
      description: { story: 'Checkbox is selected. Hover the right "Trim ›" link to see its highlight and underline.' },
    },
  },
  render: (args) => ({
    components: { SrpFilterChildTextLink },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterChildTextLink v-bind="args" /></div>`,
  }),
}

export const ReturningToSelected: Story = {
  name: 'Returning to selected',
  args: { selected: true, returning: true },
  parameters: {
    docs: {
      description: {
        story: 'Filter was applied; user has returned. Left half shows primary-90 green background.',
      },
    },
  },
  render: (args) => ({
    components: { SrpFilterChildTextLink },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterChildTextLink v-bind="args" /></div>`,
  }),
}

// ─── Interactive group ────────────────────────────────────────────────────────

export const InteractiveGroup: Story = {
  name: 'Interactive group',
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select group. Click the left half to toggle the filter. ' +
          'Click the "Trim ›" link to emit a `link-click` event (logged to console).',
      },
    },
  },
  render: () => ({
    components: { SrpFilterChildTextLink },
    setup() {
      const selected = ref<string[]>(['awd'])
      function toggle(val: string, isSelected: boolean) {
        if (isSelected) selected.value = [...selected.value, val]
        else selected.value = selected.value.filter(v => v !== val)
      }
      const opts = [
        { value: '4wd', label: '4WD', count: 82  },
        { value: 'awd', label: 'AWD', count: 145 },
        { value: 'fwd', label: 'FWD', count: 63  },
        { value: 'rwd', label: 'RWD', count: 29  },
      ]
      return { selected, toggle, opts }
    },
    template: `
      <div style="${w}">
        <SrpFilterChildTextLink
          v-for="opt in opts"
          :key="opt.value"
          :label="opt.label"
          :count="opt.count"
          :selected="selected.includes(opt.value)"
          :returning="opt.value === 'awd'"
          linkLabel="Trim"
          @update:selected="(v) => toggle(opt.value, v)"
          @link-click="console.log('link-click', opt.value)"
        />
        <p style="margin-top:8px;font-size:12px;color:#666;">Selected: {{ selected.join(', ') || 'none' }}</p>
      </div>
    `,
  }),
}

// ─── Full accordion demo ──────────────────────────────────────────────────────

export const FullFilterPanel: Story = {
  name: 'Full filter panel (composed)',
  parameters: {
    docs: {
      description: {
        story:
          'Shows all three filter row types composed with `SrpFilterParent` into a realistic accordion. ' +
          'Import `SrpFilterParent` and `SrpFilterChild` from their own packages to reproduce.',
      },
    },
  },
  render: () => ({
    components: { SrpFilterChildTextLink },
    setup() {
      const selected = ref<string[]>([])
      function toggle(val: string, on: boolean) {
        if (on) selected.value = [...selected.value, val]
        else selected.value = selected.value.filter(v => v !== val)
      }
      const opts = [
        { value: 'base',    label: 'Base',    count: 44 },
        { value: 'sport',   label: 'Sport',   count: 31 },
        { value: 'limited', label: 'Limited', count: 18 },
        { value: 'premier', label: 'Premier', count: 9  },
      ]
      return { selected, toggle, opts }
    },
    template: `
      <div style="${w}">
        <div style="font-size:13px;font-weight:700;padding:8px 24px;background:#f4f5f7;border:1px solid #e8e9eb;">
          Trim
        </div>
        <SrpFilterChildTextLink
          v-for="opt in opts"
          :key="opt.value"
          :label="opt.label"
          :count="opt.count"
          :selected="selected.includes(opt.value)"
          linkLabel="Details"
          @update:selected="(v) => toggle(opt.value, v)"
          @link-click="console.log('details', opt.value)"
        />
        <p style="margin-top:8px;font-size:12px;color:#666;">Selected: {{ selected.join(', ') || 'none' }}</p>
      </div>
    `,
  }),
}
