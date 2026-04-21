import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import CompareTray from './CompareTray.vue'

const meta = {
  title: 'Molecules/CompareTray',
  component: CompareTray,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Floating notification card that appears when one or more vehicles are added to the **compare list** from an SRP tile.\n\n' +
          '- **count = 0** → tray is hidden.\n' +
          '- **count = 1** (or below `ctaThreshold`) → 85px card with the prompt *"Add more to compare"*.\n' +
          '- **count ≥ 2** (≥ `ctaThreshold`) → 149px card showing *`<N> vehicles selected`* and a `Compare` CTA that routes to the compare page.\n\n' +
          '**Desktop**: 412px fixed-width card pinned to the **bottom-right** corner of the viewport; shadow falls up-and-left.\n\n' +
          '**Mobile** (<600px): stretches to full viewport width at the **bottom** edge; shadow falls straight up.\n\n' +
          'Brand-agnostic — the CTA uses `BaseButton variant="primary"`, so EchoPark shows green and Sonic shows red automatically.\n\n' +
          'Figma: nodes `13945:38154` (count+CTA) and `13945:38159` (prompt only).',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    count:              { control: { type: 'number', min: 0, max: 20 } },
    ctaThreshold:       { control: { type: 'number', min: 1, max: 10 } },
    addMoreLabel:       { control: 'text' },
    selectedLabel:      { control: 'text' },
    compareLabel:       { control: 'text' },
    ariaLabel:          { control: 'text' },
    onCompare:          { action: 'compare' },
  },
  args: {
    count: 1,
    ctaThreshold: 2,
    addMoreLabel: 'Add more to compare',
    selectedLabel: 'vehicles selected',
    compareLabel: 'Compare',
  },
} satisfies Meta<typeof CompareTray>

export default meta
type Story = StoryObj<typeof meta>

/* Re-used page body — gives the tray something to overlay so its
 * shadow & bottom-right placement read correctly. */
const PAGE_BACKDROP = `
  <div style="
    position: relative;
    min-height: 100vh;
    background: #f5f6f7;
    padding: 32px;
    font-family: Roboto, sans-serif;
    color: #242c33;
  ">
    <h1 style="margin:0 0 16px;font-size:24px;">Search results</h1>
    <p style="max-width:640px;line-height:1.5;">
      The Compare tray lives above page content — this placeholder helps
      preview the drop-shadow and bottom-right positioning in Storybook.
    </p>
  </div>
`

/* ─── Single-item prompt ──────────────────────────────────────────────────── */

export const AddMorePrompt: Story = {
  name: '1 selected · "Add more to compare"',
  args: { count: 1 },
  parameters: {
    docs: {
      description: { story: 'Shown the moment a user adds their first vehicle — below the `ctaThreshold`, so only the prompt is visible.' },
    },
  },
  render: (args) => ({
    components: { CompareTray },
    setup() { return { args } },
    template: `
      ${PAGE_BACKDROP}
      <CompareTray v-bind="args" />
    `,
  }),
}

/* ─── Two selected ────────────────────────────────────────────────────────── */

export const TwoSelected: Story = {
  name: '2 selected · Compare CTA',
  args: { count: 2 },
  parameters: {
    docs: {
      description: { story: 'Meets the default `ctaThreshold` of 2 — the tray grows to 149px and reveals the **Compare** CTA.' },
    },
  },
  render: (args) => ({
    components: { CompareTray },
    setup() { return { args } },
    template: `
      ${PAGE_BACKDROP}
      <CompareTray v-bind="args" />
    `,
  }),
}

/* ─── Three selected (Figma example) ──────────────────────────────────────── */

export const ThreeSelected: Story = {
  name: '3 selected (Figma spec)',
  args: { count: 3 },
  render: (args) => ({
    components: { CompareTray },
    setup() { return { args } },
    template: `
      ${PAGE_BACKDROP}
      <CompareTray v-bind="args" />
    `,
  }),
}

/* ─── Hidden state ────────────────────────────────────────────────────────── */

export const Hidden: Story = {
  name: '0 selected (hidden)',
  args: { count: 0 },
  parameters: {
    docs: {
      description: { story: 'Count is `0` — tray renders nothing so focus and page space are not affected.' },
    },
  },
  render: (args) => ({
    components: { CompareTray },
    setup() { return { args } },
    template: `
      ${PAGE_BACKDROP}
      <CompareTray v-bind="args" />
    `,
  }),
}

/* ─── Interactive stepper ─────────────────────────────────────────────────── */

export const Interactive: Story = {
  name: 'Interactive (step through states)',
  parameters: {
    docs: {
      description: {
        story:
          'Use the **Add** / **Remove** buttons to watch the tray transition between hidden → prompt → count+CTA. Clicking **Compare** logs the event to the Actions panel.',
      },
    },
  },
  render: () => ({
    components: { CompareTray },
    setup() {
      const count = ref(0)
      const add = () => (count.value += 1)
      const remove = () => (count.value = Math.max(0, count.value - 1))
      const onCompare = () => console.log('[CompareTray] compare clicked, count =', count.value)
      return { count, add, remove, onCompare }
    },
    template: `
      <div style="position:relative;min-height:100vh;background:#f5f6f7;padding:32px;font-family:Roboto,sans-serif;color:#242c33;">
        <h1 style="margin:0 0 16px;font-size:24px;">Compare tray playground</h1>
        <p style="max-width:640px;line-height:1.5;">
          Selected: <strong>{{ count }}</strong>
        </p>
        <div style="display:flex;gap:12px;margin-top:16px;">
          <button type="button" @click="add"
            style="padding:8px 16px;border-radius:8px;border:1px solid #242c33;background:#fff;cursor:pointer;">
            Add to compare
          </button>
          <button type="button" @click="remove" :disabled="count === 0"
            style="padding:8px 16px;border-radius:8px;border:1px solid #242c33;background:#fff;cursor:pointer;">
            Remove one
          </button>
        </div>
        <CompareTray :count="count" @compare="onCompare" />
      </div>
    `,
  }),
}

/* ─── Mobile preview ──────────────────────────────────────────────────────── */

export const Mobile: Story = {
  name: 'Mobile (full-width bottom bar)',
  args: { count: 2 },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: { story: 'Below 600px the tray stretches to the full viewport width and pins to the bottom edge.' },
    },
  },
  render: (args) => ({
    components: { CompareTray },
    setup() { return { args } },
    template: `
      ${PAGE_BACKDROP}
      <CompareTray v-bind="args" />
    `,
  }),
}
