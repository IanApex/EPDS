import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SrpFilterPill from './SrpFilterPill.vue'

const meta = {
  title: 'Molecules/SRP Filters/SrpFilterPill',
  component: SrpFilterPill,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'SRP active filter pills (Figma selection spec — `location` and `dismissible` variants, separate hit targets per segment). ' +
          '**Location:** `Style=Location, Detail=Map-Location` (16×16) + zip — hover fills a 36×32r inner chip with `--color-accent-55` (Figma); press `--color-accent-60`; focus `--color-accessibility-90` ring. Distance label: underline hover/focus, muted press. ' +
          '**Dismissible:** label (underline, press `--color-accent-30`) · dismiss control with 16×16 close icon (hover `--color-accent-85`, press `--color-accent-80`, focus ring + fill).',
      },
    },
  },
} satisfies Meta<typeof SrpFilterPill>

export default meta
type Story = StoryObj<typeof meta>

const locationArgs = {
  variant:       'location' as const,
  zipCode:       '75214',
  distanceLabel: 'Cars within 250 mi',
}

export const LocationDefault: Story = {
  name: 'Location — default',
  args: locationArgs,
}

export const LocationZipHover: Story = {
  name: 'Location — zip :hover',
  parameters: { pseudo: { hover: '.sfp__zip' } },
  args: locationArgs,
}

export const LocationZipPressed: Story = {
  name: 'Location — zip :active',
  parameters: { pseudo: { active: '.sfp__zip' } },
  args: locationArgs,
}

export const LocationZipFocus: Story = {
  name: 'Location — zip :focus-visible',
  parameters: { pseudo: { focusVisible: '.sfp__zip' } },
  args: locationArgs,
}

export const LocationDistanceHover: Story = {
  name: 'Location — distance :hover',
  parameters: { pseudo: { hover: '.sfp__distance' } },
  args: locationArgs,
}

export const LocationDistancePressed: Story = {
  name: 'Location — distance :active',
  parameters: { pseudo: { active: '.sfp__distance' } },
  args: locationArgs,
}

export const LocationDistanceFocus: Story = {
  name: 'Location — distance :focus-visible',
  parameters: { pseudo: { focusVisible: '.sfp__distance' } },
  args: locationArgs,
}

const dismissArgs = {
  variant: 'dismissible' as const,
  label:   'Ship to store',
}

export const DismissibleDefault: Story = {
  name: 'Dismissible — default',
  args: dismissArgs,
}

export const DismissibleDismissHover: Story = {
  name: 'Dismissible — dismiss :hover',
  parameters: { pseudo: { hover: '.sfp__dismiss' } },
  args: dismissArgs,
}

export const DismissibleDismissPressed: Story = {
  name: 'Dismissible — dismiss :active',
  parameters: { pseudo: { active: '.sfp__dismiss' } },
  args: dismissArgs,
}

export const DismissibleDismissFocus: Story = {
  name: 'Dismissible — dismiss :focus-visible',
  parameters: { pseudo: { focusVisible: '.sfp__dismiss' } },
  args: dismissArgs,
}

export const DismissibleLabelHover: Story = {
  name: 'Dismissible — label :hover',
  parameters: { pseudo: { hover: '.sfp--dismissible .sfp__text' } },
  args: dismissArgs,
}

export const DismissibleLabelPressed: Story = {
  name: 'Dismissible — label :active',
  parameters: { pseudo: { active: '.sfp--dismissible .sfp__text' } },
  args: dismissArgs,
}

export const DismissibleLabelFocus: Story = {
  name: 'Dismissible — label :focus-visible',
  parameters: { pseudo: { focusVisible: '.sfp--dismissible .sfp__text' } },
  args: dismissArgs,
}

export const BothInBar: Story = {
  name: 'Bar (location + dismissible)',
  render: () => ({
    components: { SrpFilterPill },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:var(--spacing-micro);align-items:center;padding:16px;background:var(--color-neutral-100);border:1px solid var(--color-neutral-90);">
        <SrpFilterPill variant="location" zip-code="75214" distance-label="Cars within 100 mi" />
        <SrpFilterPill variant="dismissible" label="Ship to store" />
      </div>
    `,
  }),
}
