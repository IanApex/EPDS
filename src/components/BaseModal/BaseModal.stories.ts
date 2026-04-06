import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseModal from './BaseModal.vue'

const meta = {
  title: 'Components/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-screen overlay dialog. Teleports to `<body>`, locks scroll, dismisses on ESC or backdrop click.\n\n' +
          '**Sizes:** `sm` = 500px, `lg` = 800px\n\n' +
          '**Themes:** `light` (white), `dark` (Neutral20 navy)\n\n' +
          '**Content padding:** 24px on all sides — built in.\n\n' +
          '```html\n' +
          '<BaseModal v-model="open" size="lg" aria-label="My dialog">\n' +
          '  <h2>Title</h2>\n' +
          '  <p>Body content here.</p>\n' +
          '</BaseModal>\n' +
          '```\n\n' +
          'Figma: "UI Components/Modal base".',
      },
    },
  },
  argTypes: {
    modelValue: { control: 'boolean' },
    size:       { control: 'radio', options: ['sm', 'lg'] },
    theme:      { control: 'radio', options: ['light', 'dark'] },
    ariaLabel:  { control: 'text' },
  },
  args: {
    modelValue: false,
    size: 'lg',
    theme: 'light',
    ariaLabel: 'Example dialog',
  },
} satisfies Meta<typeof BaseModal>

export default meta
type Story = StoryObj<typeof meta>

// ─── Interactive ──────────────────────────────────────────────────────────────

export const Interactive: Story = {
  name: 'Interactive — light / open / close',
  parameters: {
    docs: {
      description: {
        story: 'Click the button to open. Dismiss via ESC, backdrop click, or the close button.',
      },
    },
  },
  render: () => ({
    components: { BaseModal },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="padding:32px;">
        <button
          @click="open = true"
          style="font-family:Roboto,sans-serif;font-size:16px;padding:12px 24px;background:#3E8500;color:#fff;border:none;border-radius:4px;cursor:pointer;"
        >
          Open modal
        </button>

        <BaseModal v-model="open" size="lg" theme="light" aria-label="Example dialog">
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <h2 style="font-family:Roboto,sans-serif;font-size:24px;font-weight:700;margin:0;color:#242C33;">Dialog title</h2>
              <button
                @click="open = false"
                aria-label="Close dialog"
                style="background:none;border:none;cursor:pointer;font-size:20px;color:#666B70;line-height:1;padding:4px;"
              >✕</button>
            </div>
            <p style="font-family:Roboto,sans-serif;font-size:16px;margin:0;color:#242C33;line-height:1.5;">
              This is the modal body. Press <strong>ESC</strong>, click the backdrop, or the ✕ button to close.
            </p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
}

export const InteractiveDark: Story = {
  name: 'Interactive — dark theme',
  render: () => ({
    components: { BaseModal },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div style="padding:32px;">
        <button
          @click="open = true"
          style="font-family:Roboto,sans-serif;font-size:16px;padding:12px 24px;background:#3E8500;color:#fff;border:none;border-radius:4px;cursor:pointer;"
        >
          Open dark modal
        </button>

        <BaseModal v-model="open" size="sm" theme="dark" aria-label="Example dark dialog">
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <h2 style="font-family:Roboto,sans-serif;font-size:24px;font-weight:700;margin:0;color:#fff;">Dialog title</h2>
              <button
                @click="open = false"
                aria-label="Close dialog"
                style="background:none;border:none;cursor:pointer;font-size:20px;color:#A2A6AB;line-height:1;padding:4px;"
              >✕</button>
            </div>
            <p style="font-family:Roboto,sans-serif;font-size:16px;margin:0;color:#E8E9EB;line-height:1.5;">
              Dark theme modal. Press <strong>ESC</strong> or click outside to close.
            </p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
}
