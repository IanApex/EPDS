import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BoxInputMD from './BoxInputMD.vue'

import mapLocationSvg from '../../../icon/Style=Location, Detail=Map-Location, Icon=NA.svg?raw'

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Atoms/Inputs/Box Input/MD',
  component: BoxInputMD,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Medium (86px) styled radio-button option box designed for location / store selection.\n\n' +
          '**Layout**: bold primary label + optional secondary and tertiary lines on the left; ' +
          'right-aligned side label (e.g. distance) on the right.\n\n' +
          'The optional `#secondary-icon` slot (map-pin, etc.) is **only visible in the default state** ' +
          '— it is automatically hidden on hover, selected, and focus per the Figma spec.\n\n' +
          '```html\n' +
          '<BoxInputMD\n' +
          '  v-model="selected"\n' +
          '  name="location"\n' +
          '  value="charlotte"\n' +
          '  primary-label="EchoPark Charlotte"\n' +
          '  secondary-label="123 Main St, Charlotte, NC"\n' +
          '  side-label="4 mi"\n' +
          '>\n' +
          '  <template #secondary-icon>\n' +
          '    <span v-html="mapPinSvg" style="display:contents" />\n' +
          '  </template>\n' +
          '</BoxInputMD>\n' +
          '```\n\n' +
          'Figma: "Inputs/BoxInputs/Medium".',
      },
    },
  },
  argTypes: {
    primaryLabel:   { control: 'text' },
    secondaryLabel: { control: 'text' },
    tertiaryLabel:  { control: 'text' },
    sideLabel:      { control: 'text' },
    value:          { control: 'text' },
    name:           { control: 'text' },
    disabled:       { control: 'boolean' },
  },
  args: {
    primaryLabel:   'EchoPark Charlotte',
    secondaryLabel: '',
    tertiaryLabel:  '',
    sideLabel:      '4 mi',
    value:          'opt1',
    name:           'story-group',
    modelValue:     '',
    disabled:       false,
  },
} satisfies Meta<typeof BoxInputMD>

export default meta
type Story = StoryObj<typeof meta>

// ─── Helper: render with map-pin icon ─────────────────────────────────────────

const withIcon = (args: Record<string, unknown>) => ({
  components: { BoxInputMD },
  setup: () => ({ args, mapLocationSvg }),
  template: `
    <BoxInputMD v-bind="args">
      <template #secondary-icon>
        <span v-html="mapLocationSvg" style="display:contents" />
      </template>
    </BoxInputMD>
  `,
})

// ─── States — label only ──────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { primaryLabel: 'EchoPark Charlotte', sideLabel: '4 mi', modelValue: '' },
}

export const Hover: Story = {
  name: 'Hover',
  args: { primaryLabel: 'EchoPark Charlotte', sideLabel: '4 mi', modelValue: '' },
  parameters: { pseudo: { hover: true } },
}

export const Selected: Story = {
  name: 'Selected',
  args: { primaryLabel: 'EchoPark Charlotte', sideLabel: '4 mi', modelValue: 'opt1' },
}

export const FocusSelected: Story = {
  name: 'Focus selected',
  args: { primaryLabel: 'EchoPark Charlotte', sideLabel: '4 mi', modelValue: 'opt1' },
  parameters: { pseudo: { focusVisible: true } },
}

export const Disabled: Story = {
  name: 'Disabled',
  args: { primaryLabel: 'EchoPark Charlotte', sideLabel: '4 mi', modelValue: '', disabled: true },
}

// ─── With secondary line ──────────────────────────────────────────────────────

export const WithSecondaryLabel: Story = {
  name: 'With secondary label',
  args: {
    primaryLabel:   'EchoPark Charlotte',
    secondaryLabel: '5401 E Independence Blvd, Charlotte, NC',
    sideLabel:      '4 mi',
    modelValue:     '',
  },
  render: (args) => withIcon(args),
}

export const WithSecondarySelected: Story = {
  name: 'With secondary label — selected',
  args: {
    primaryLabel:   'EchoPark Charlotte',
    secondaryLabel: '5401 E Independence Blvd, Charlotte, NC',
    sideLabel:      '4 mi',
    value:          'opt1',
    modelValue:     'opt1',
  },
  render: (args) => withIcon(args),
}

export const WithAllLines: Story = {
  name: 'With all three lines',
  args: {
    primaryLabel:   'EchoPark Charlotte',
    secondaryLabel: '5401 E Independence Blvd',
    tertiaryLabel:  'Charlotte, NC 28212',
    sideLabel:      '4 mi',
    modelValue:     '',
  },
  render: (args) => withIcon(args),
}

// ─── No side label ────────────────────────────────────────────────────────────

export const NoSideLabel: Story = {
  name: 'No side label',
  args: {
    primaryLabel:   'EchoPark Charlotte',
    secondaryLabel: '5401 E Independence Blvd, Charlotte, NC',
    sideLabel:      undefined,
    modelValue:     '',
  },
  render: (args) => withIcon(args),
}

// ─── Interactive — location picker ───────────────────────────────────────────

export const LocationPicker: Story = {
  name: 'Interactive — Location picker',
  parameters: {
    docs: {
      description: {
        story: 'Typical store-selection group. Secondary-icon is a map-pin (hidden when selected/hovered).',
      },
    },
  },
  render: () => ({
    components: { BoxInputMD },
    setup() {
      const selected = ref('')
      return { selected, mapLocationSvg }
    },
    template: `
      <fieldset style="display:flex;flex-direction:column;gap:8px;border:none;padding:0;margin:0;width:440px;">
        <legend style="font-family:Roboto,sans-serif;font-size:14px;color:#6b7280;margin-bottom:8px;width:100%;">
          Choose your nearest EchoPark
        </legend>
        <BoxInputMD v-model="selected" name="location" value="charlotte"
          primary-label="EchoPark Charlotte"
          secondary-label="5401 E Independence Blvd, Charlotte, NC"
          side-label="4 mi">
          <template #secondary-icon><span v-html="mapLocationSvg" style="display:contents" /></template>
        </BoxInputMD>
        <BoxInputMD v-model="selected" name="location" value="denver"
          primary-label="EchoPark Denver"
          secondary-label="1000 S Colorado Blvd, Denver, CO"
          side-label="12 mi">
          <template #secondary-icon><span v-html="mapLocationSvg" style="display:contents" /></template>
        </BoxInputMD>
        <BoxInputMD v-model="selected" name="location" value="houston"
          primary-label="EchoPark Houston"
          secondary-label="8711 Katy Freeway, Houston, TX"
          side-label="18 mi">
          <template #secondary-icon><span v-html="mapLocationSvg" style="display:contents" /></template>
        </BoxInputMD>
      </fieldset>
    `,
  }),
}

// ─── All states ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  render: () => ({
    components: { BoxInputMD },
    setup: () => ({ mapLocationSvg }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;padding:16px;width:460px;">
        <div v-for="item in [
          { label: 'Default',   modelValue: '',     selected: false },
          { label: 'Selected',  modelValue: 'opt1', selected: true  },
          { label: 'Disabled',  modelValue: '',     selected: false, disabled: true },
        ]" :key="item.label" style="display:flex;flex-direction:column;gap:4px;">
          <span style="font-family:Roboto,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;">
            {{ item.label }}
          </span>
          <BoxInputMD
            :name="'state-' + item.label"
            value="opt1"
            :model-value="item.modelValue"
            primary-label="EchoPark Charlotte"
            secondary-label="5401 E Independence Blvd, Charlotte, NC"
            side-label="4 mi"
            :disabled="item.disabled"
          >
            <template #secondary-icon>
              <span v-html="mapLocationSvg" style="display:contents" />
            </template>
          </BoxInputMD>
        </div>
      </div>
    `,
  }),
}
