import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SrpFilterChild from './SrpFilterChild.vue'

// Vehicle descriptor icon for the icon variant stories
import hatchbackSrc from '../../../icon/Icon Type=Vehicle Descriptors, Size=Large, Theme=Hatchback.svg?url'

const meta = {
  title: 'Components/SRP Filters/FilterChild',
  component: SrpFilterChild,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Individual filter option row. Pair with `SrpFilterParent` in an accordion.\n\n' +
          '`v-model` (`:selected`) toggles the checked state. ' +
          'Pass `returning` when the filter was previously applied and the user has returned — ' +
          'renders a light-green background.\n\n' +
          '**Icon variant**: use the `#trailing-icon` slot to show a vehicle descriptor image ' +
          '(48×20px area, import with `?url` + `<img>`).\n\n' +
          '```html\n' +
          '<SrpFilterChild label="Hatchback" :count="34" v-model:selected="sel">\n' +
          '  <template #trailing-icon>\n' +
          '    <img :src="hatchbackSrc" alt="" />\n' +
          '  </template>\n' +
          '</SrpFilterChild>\n' +
          '```',
      },
    },
    backgrounds: { default: 'light' },
  },
  argTypes: {
    label:     { control: 'text' },
    count:     { control: 'number' },
    selected:  { control: 'boolean' },
    returning: { control: 'boolean' },
  },
  args: {
    label:     '4WD',
    count:     82,
    selected:  false,
    returning: false,
  },
} satisfies Meta<typeof SrpFilterChild>

export default meta
type Story = StoryObj<typeof meta>

const w = 'width:306px;'

// ─── Basic child (no icon) ────────────────────────────────────────────────────

export const Normal: Story = {
  name: 'Normal (unselected)',
  render: (args) => ({
    components: { SrpFilterChild },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterChild v-bind="args" /></div>`,
  }),
}

export const Selected: Story = {
  name: 'Selected',
  args: { selected: true },
  render: (args) => ({
    components: { SrpFilterChild },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterChild v-bind="args" /></div>`,
  }),
}

export const ReturningToSelected: Story = {
  name: 'Returning to selected',
  args: { selected: true, returning: true },
  parameters: {
    docs: {
      description: {
        story: 'Selection was applied; user has returned to the filter panel. Light-green background.',
      },
    },
  },
  render: (args) => ({
    components: { SrpFilterChild },
    setup() { return { args } },
    template: `<div style="${w}"><SrpFilterChild v-bind="args" /></div>`,
  }),
}

// ─── Icon variant ─────────────────────────────────────────────────────────────

export const WithIcon: Story = {
  name: 'With vehicle icon (normal)',
  parameters: {
    docs: {
      description: { story: 'Use the `#trailing-icon` slot to show a vehicle descriptor image on the right.' },
    },
  },
  render: (args) => ({
    components: { SrpFilterChild },
    setup() { return { args, hatchbackSrc } },
    template: `
      <div style="${w}">
        <SrpFilterChild v-bind="args">
          <template #trailing-icon>
            <img :src="hatchbackSrc" alt="" style="width:48px;height:20px;object-fit:contain;" />
          </template>
        </SrpFilterChild>
      </div>
    `,
  }),
}

export const WithIconSelected: Story = {
  name: 'With vehicle icon (selected)',
  args: { selected: true },
  render: (args) => ({
    components: { SrpFilterChild },
    setup() { return { args, hatchbackSrc } },
    template: `
      <div style="${w}">
        <SrpFilterChild v-bind="args">
          <template #trailing-icon>
            <img :src="hatchbackSrc" alt="" style="width:48px;height:20px;object-fit:contain;" />
          </template>
        </SrpFilterChild>
      </div>
    `,
  }),
}

export const WithIconReturning: Story = {
  name: 'With vehicle icon (returning)',
  args: { selected: true, returning: true },
  render: (args) => ({
    components: { SrpFilterChild },
    setup() { return { args, hatchbackSrc } },
    template: `
      <div style="${w}">
        <SrpFilterChild v-bind="args">
          <template #trailing-icon>
            <img :src="hatchbackSrc" alt="" style="width:48px;height:20px;object-fit:contain;" />
          </template>
        </SrpFilterChild>
      </div>
    `,
  }),
}

// ─── Interactive group ────────────────────────────────────────────────────────

export const InteractiveGroup: Story = {
  name: 'Interactive group',
  parameters: {
    docs: {
      description: {
        story: 'Multi-select — click options to toggle. "Returning" items start pre-selected with green bg.',
      },
    },
  },
  render: () => ({
    components: { SrpFilterChild },
    setup() {
      const selected = ref<string[]>(['awd'])
      function toggle(val: string, isSelected: boolean) {
        if (isSelected) selected.value = [...selected.value, val]
        else selected.value = selected.value.filter(v => v !== val)
      }
      const opts = [
        { value: '4wd',  label: '4WD',  count: 82  },
        { value: 'awd',  label: 'AWD',  count: 145 },
        { value: 'fwd',  label: 'FWD',  count: 63  },
        { value: 'rwd',  label: 'RWD',  count: 29  },
      ]
      return { selected, toggle, opts }
    },
    template: `
      <div style="${w}">
        <SrpFilterChild
          v-for="opt in opts"
          :key="opt.value"
          :label="opt.label"
          :count="opt.count"
          :selected="selected.includes(opt.value)"
          :returning="opt.value === 'awd'"
          @update:selected="(v) => toggle(opt.value, v)"
        />
        <p style="margin-top:8px;font-size:12px;color:#666;">Selected: {{ selected.join(', ') || 'none' }}</p>
      </div>
    `,
  }),
}
