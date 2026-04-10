import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Overlay from './Overlay.vue'

const meta = {
  title: 'Atoms/Overlay',
  component: Overlay,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-viewport semi-transparent scrim used behind modals, fly-out panels, and other ' +
          'focus-stealing UI. Teleports to `<body>`, locks scroll, dismisses on click or ESC. ' +
          'Use when the user\'s action calls for a modal, fly-out, or important information to be ' +
          'in focus without losing context of the page.',
      },
    },
  },
  argTypes: {
    modelValue: { control: 'boolean' },
    lockScroll: { control: 'boolean' },
    dismissOnClick: { control: 'boolean' },
    dismissOnEsc: { control: 'boolean' },
    zIndex: { control: 'number' },
  },
} satisfies Meta<typeof Overlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Default (Interactive)',
  render: () => ({
    components: { Overlay },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <button
          style="padding: 12px 24px; font-size: 14px; font-family: Roboto, sans-serif; border-radius: 8px; border: 2px solid #313D47; background: white; cursor: pointer;"
          @click="open = true"
        >
          Show Overlay
        </button>
        <Overlay v-model="open">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 32px; border-radius: 8px; font-family: Roboto, sans-serif; text-align: center;">
            <p style="margin: 0 0 16px; font-size: 16px; font-weight: 700; color: #242C33;">Overlay is active</p>
            <p style="margin: 0 0 16px; font-size: 14px; color: #666B70;">Click the dark area or press ESC to dismiss.</p>
            <button
              style="padding: 8px 24px; font-size: 14px; font-family: Roboto, sans-serif; border-radius: 999px; border: none; background: #3E8500; color: white; cursor: pointer;"
              @click="open = false"
            >
              Close
            </button>
          </div>
        </Overlay>
      </div>
    `,
  }),
}

export const ModalContext: Story = {
  name: 'Modal Context',
  render: () => ({
    components: { Overlay },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <button
          style="padding: 12px 24px; font-size: 14px; font-family: Roboto, sans-serif; border-radius: 8px; border: 2px solid #313D47; background: white; cursor: pointer;"
          @click="open = true"
        >
          Open Modal
        </button>
        <Overlay v-model="open">
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 12px; width: 400px; max-width: 90vw; font-family: Roboto, sans-serif; overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid #E8E9EB;">
              <strong style="font-size: 16px; color: #242C33;">Schedule test drive</strong>
              <button
                style="background: none; border: none; font-size: 20px; cursor: pointer; color: #666B70; padding: 4px;"
                @click="open = false"
              >&times;</button>
            </div>
            <div style="padding: 24px;">
              <p style="margin: 0; font-size: 14px; color: #666B70;">This car will stay in our inventory &amp; may sell before your test drive, so schedule your first ride soon!</p>
            </div>
          </div>
        </Overlay>
      </div>
    `,
  }),
}

export const FlyOutContext: Story = {
  name: 'Fly-out Context',
  render: () => ({
    components: { Overlay },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <button
          style="padding: 12px 24px; font-size: 14px; font-family: Roboto, sans-serif; border-radius: 8px; border: 2px solid #313D47; background: white; cursor: pointer;"
          @click="open = true"
        >
          Open Fly-out
        </button>
        <Overlay v-model="open">
          <div style="position: absolute; top: 0; right: 0; bottom: 0; width: 360px; max-width: 90vw; background: white; font-family: Roboto, sans-serif; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid #E8E9EB;">
              <strong style="font-size: 16px; color: #242C33;">Filters</strong>
              <button
                style="background: none; border: none; font-size: 20px; cursor: pointer; color: #666B70; padding: 4px;"
                @click="open = false"
              >&times;</button>
            </div>
            <div style="padding: 24px;">
              <p style="margin: 0 0 16px; font-size: 14px; color: #666B70;">Fly-out panel content goes here. Click the overlay or press ESC to close.</p>
            </div>
          </div>
        </Overlay>
      </div>
    `,
  }),
}
