import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FaqBlogTab from './FaqBlogTab.vue'

import experienceGuideIcon from '../../../icon/Icon=Illustrative, Name=Experience-Guide.svg?url'
import aboutOurCarsIcon    from '../../../icon/Icon=Illustrative, Name=About-Our-Cars.svg?url'
import popularIcon         from '../../../icon/Icon=Illustrative, Name=Popular.svg?url'
import carInfoIcon         from '../../../icon/Icon=Illustrative, Name=Car-Info.svg?url'

const meta = {
  title: 'Molecules/FaqBlogTab',
  component: FaqBlogTab,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Card-style radio tab for content-type selection (e.g. FAQ vs Blog). ' +
          'Place multiple instances in a group sharing the same `name` prop.\n\n' +
          '**States:** Default → Hover → Selected (2px Neutral0 border) → Focus (3px Accessibility80 border)\n\n' +
          '**Icon slot:** pass an illustrative icon as `<img>` imported with `?url`:\n' +
          '```html\n' +
          '<FaqBlogTab value="faq" name="content" label="FAQ" v-model="selected">\n' +
          '  <template #icon><img :src="guideIcon" alt="" /></template>\n' +
          '</FaqBlogTab>\n' +
          '```\n\n' +
          'Figma: "FAQ / Blog Tabs".',
      },
    },
  },
  argTypes: {
    label:      { control: 'text' },
    modelValue: { control: 'text' },
    disabled:   { control: 'boolean' },
  },
  args: {
    value:      'tab',
    name:       'content-type',
    label:      'Label',
    modelValue: '',
    disabled:   false,
  },
} satisfies Meta<typeof FaqBlogTab>

export default meta
type Story = StoryObj<typeof meta>

// ─── States ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    components: { FaqBlogTab },
    setup() { return { args, experienceGuideIcon } },
    template: `
      <div style="padding:24px;">
        <FaqBlogTab v-bind="args">
          <template #icon><img :src="experienceGuideIcon" alt="" /></template>
        </FaqBlogTab>
      </div>
    `,
  }),
}

export const Selected: Story = {
  name: 'Selected',
  args: { modelValue: 'tab' },
  render: (args) => ({
    components: { FaqBlogTab },
    setup() { return { args, experienceGuideIcon } },
    template: `
      <div style="padding:24px;">
        <FaqBlogTab v-bind="args">
          <template #icon><img :src="experienceGuideIcon" alt="" /></template>
        </FaqBlogTab>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
  render: (args) => ({
    components: { FaqBlogTab },
    setup() { return { args, experienceGuideIcon } },
    template: `
      <div style="padding:24px;">
        <FaqBlogTab v-bind="args">
          <template #icon><img :src="experienceGuideIcon" alt="" /></template>
        </FaqBlogTab>
      </div>
    `,
  }),
}

// ─── Interactive group ────────────────────────────────────────────────────────

export const Group: Story = {
  name: 'Group (interactive)',
  parameters: {
    docs: {
      description: {
        story: 'Four tabs sharing a radio group. Click to select.',
      },
    },
  },
  render: () => ({
    components: { FaqBlogTab },
    setup() {
      const selected = ref('faq')
      return { selected, experienceGuideIcon, aboutOurCarsIcon, popularIcon, carInfoIcon }
    },
    template: `
      <div style="padding:24px;display:flex;gap:12px;flex-wrap:wrap;">
        <FaqBlogTab v-model="selected" name="content-type" value="faq" label="FAQ">
          <template #icon><img :src="experienceGuideIcon" alt="" /></template>
        </FaqBlogTab>
        <FaqBlogTab v-model="selected" name="content-type" value="blog" label="Blog">
          <template #icon><img :src="aboutOurCarsIcon" alt="" /></template>
        </FaqBlogTab>
        <FaqBlogTab v-model="selected" name="content-type" value="popular" label="Popular">
          <template #icon><img :src="popularIcon" alt="" /></template>
        </FaqBlogTab>
        <FaqBlogTab v-model="selected" name="content-type" value="car-info" label="Car Info">
          <template #icon><img :src="carInfoIcon" alt="" /></template>
        </FaqBlogTab>
      </div>
    `,
  }),
}
