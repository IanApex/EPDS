// TODO: revisit the modal shell used in these stories (header, close button,
// padding, border-radius, shadow) once the Modal component is built — replace
// the hand-rolled div wrappers here with the real Modal component.

import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ModalTabs from './ModalTabs.vue'

const meta: Meta<typeof ModalTabs> = {
  title: 'Components/ModalTabs',
  component: ModalTabs,
  parameters: {
    backgrounds: { default: 'light' },
  },
  argTypes: {
    showSeparator: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof ModalTabs>

// ─── Shared helpers ─────────────────────────────────────

const panelStyle = 'padding: 20px 0; font: 400 14px/22px Roboto, sans-serif; color: #242C33;'
const modalShell = (content: string) => `
  <div style="
    width: 640px;
    border: 1px solid #BCBFC2;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    font-family: Roboto, sans-serif;
  ">
    <!-- Modal header (stays constant while tabs change) -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px 0;">
      <h2 style="margin:0;font:700 22px/26px Roboto,sans-serif;color:#242C33;">All features &amp; specs</h2>
      <button style="background:none;border:none;cursor:pointer;font-size:20px;color:#666;">✕</button>
    </div>

    <!-- Tab bar sits inside modal, below header -->
    <div style="padding: 16px 24px 0;">${content}</div>
  </div>`

// ─── Core: 4 tabs (VDP features & specs) ───────────────

export const FeaturesAndSpecs: Story = {
  name: 'Features & specs (4 tabs)',
  render: () => ({
    components: { ModalTabs },
    setup() {
      const tabs = [
        { id: 'exterior',   label: 'Exterior'   },
        { id: 'interior',   label: 'Interior'   },
        { id: 'mechanical', label: 'Mechanical' },
        { id: 'safety',     label: 'Safety'     },
      ]
      const active = ref('exterior')
      return { tabs, active }
    },
    template: `
      <div style="width:640px;border:1px solid #BCBFC2;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px 0;">
          <h2 style="margin:0;font:700 22px/26px Roboto,sans-serif;color:#242C33;">All features &amp; specs</h2>
          <button style="background:none;border:none;cursor:pointer;font-size:18px;color:#666;">✕</button>
        </div>
        <div style="padding:16px 24px 0;">
          <ModalTabs v-model="active" :tabs="tabs">
            <template #default="{ activeId }">
              <div v-show="activeId === 'exterior'" style="${panelStyle}">
                <ul style="margin:0;padding-left:18px;display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;">
                  <li>Autolamp Auto On/Off</li><li>Galvanized Steel/Aluminum Panels</li>
                  <li>Aero-Composite Lid</li><li>Fixed Rear Window w/ Defroster</li>
                  <li>Cargo Tie-Down Hooks (4)</li><li>Locking Tailgate</li>
                  <li>Headlights: Automatic Nightmore</li><li>Navigation System</li>
                  <li>Lighting Preference Setting</li><li>Third Row Seating</li>
                  <li>Android Auto</li><li>Apple CarPlay</li>
                </ul>
              </div>
              <div v-show="activeId === 'interior'" style="${panelStyle}">
                <ul style="margin:0;padding-left:18px;display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;">
                  <li>Leather Seating Surfaces</li><li>Heated Front Seats</li>
                  <li>8-Way Power Driver Seat</li><li>Dual-Zone Climate Control</li>
                  <li>Panoramic Sunroof</li><li>Ambient Interior Lighting</li>
                </ul>
              </div>
              <div v-show="activeId === 'mechanical'" style="${panelStyle}">
                <ul style="margin:0;padding-left:18px;display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;">
                  <li>16.9 Gal. Fuel Tank</li><li>Engine Oil Cooler</li>
                  <li>HD Radiator</li><li>4-Wheel ABS</li>
                  <li>Front/Rear Stabilizer Bar</li><li>Direct Injection</li>
                </ul>
              </div>
              <div v-show="activeId === 'safety'" style="${panelStyle}">
                <ul style="margin:0;padding-left:18px;display:grid;grid-template-columns:1fr 1fr;gap:4px 24px;">
                  <li>Lane Departure Warning</li><li>Forward Collision Alert</li>
                  <li>Blind Spot Monitoring</li><li>Rear Cross-Traffic Alert</li>
                  <li>Automatic Emergency Braking</li><li>10 Airbags</li>
                </ul>
              </div>
            </template>
          </ModalTabs>
        </div>
      </div>`,
  }),
}

// ─── First tab auto-selected ────────────────────────────

export const FirstTabAutoSelected: Story = {
  name: 'Auto-select first tab on mount',
  render: () => ({
    components: { ModalTabs },
    setup() {
      const tabs = [
        { id: 'features', label: 'Features & specs' },
        { id: 'reviews',  label: 'Reviews'          },
        { id: 'calc',     label: 'Calculator'       },
      ]
      // No initial value — component auto-selects tab[0]
      const active = ref('')
      return { tabs, active }
    },
    template: `
      <div style="padding:40px;max-width:600px;">
        <ModalTabs v-model="active" :tabs="tabs">
          <template #default="{ activeId }">
            <div v-show="activeId === 'features'" style="${panelStyle}">Features content — auto-selected on load</div>
            <div v-show="activeId === 'reviews'"  style="${panelStyle}">Reviews content</div>
            <div v-show="activeId === 'calc'"     style="${panelStyle}">Calculator content</div>
          </template>
        </ModalTabs>
        <p style="font:12px/1 Roboto,sans-serif;color:#666;margin-top:16px;">Active: <strong>{{ active || '(none)' }}</strong></p>
      </div>`,
  }),
}

// ─── Many tabs (horizontal scroll) ──────────────────────

export const ManyTabsScrollable: Story = {
  name: 'Many tabs — horizontal scroll',
  render: () => ({
    components: { ModalTabs },
    setup() {
      const tabs = [
        { id: 'exterior',   label: 'Exterior'     },
        { id: 'interior',   label: 'Interior'     },
        { id: 'mechanical', label: 'Mechanical'   },
        { id: 'safety',     label: 'Safety'       },
        { id: 'warranty',   label: 'Warranty'     },
        { id: 'history',    label: 'History'      },
        { id: 'finance',    label: 'Finance'      },
        { id: 'reviews',    label: 'Reviews'      },
      ]
      const active = ref('exterior')
      return { tabs, active }
    },
    template: `
      <div style="width:420px;border:1px solid #BCBFC2;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.1);">
        <div style="padding:16px 16px 0;">
          <p style="font:700 18px/1 Roboto,sans-serif;color:#242C33;margin:0 0 12px;">All features &amp; specs</p>
          <ModalTabs v-model="active" :tabs="tabs">
            <template #default="{ activeId }">
              <div style="${panelStyle}">Active tab: <strong>{{ activeId }}</strong></div>
            </template>
          </ModalTabs>
        </div>
      </div>`,
  }),
}

// ─── Minimal tab bar only ───────────────────────────────

/** Just the bar with no panel content — useful when panel is managed externally. */
export const TabBarOnly: Story = {
  render: () => ({
    components: { ModalTabs },
    setup() {
      const tabs = [
        { id: 'features', label: 'Features & specs' },
        { id: 'reviews',  label: 'Reviews'          },
        { id: 'calc',     label: 'Calculator'       },
      ]
      const active = ref('features')
      return { tabs, active }
    },
    template: `
      <div style="padding:40px;max-width:600px;">
        <ModalTabs v-model="active" :tabs="tabs" />
        <p style="font:12px/1 Roboto,sans-serif;color:#666;margin-top:16px;">Active: {{ active }}</p>
      </div>`,
  }),
}

// ─── No separator ───────────────────────────────────────

export const NoSeparator: Story = {
  args: { showSeparator: false },
  render: (args) => ({
    components: { ModalTabs },
    setup() {
      const tabs = [
        { id: 'one', label: 'Tab one'   },
        { id: 'two', label: 'Tab two'   },
        { id: 'thr', label: 'Tab three' },
      ]
      const active = ref('one')
      return { args, tabs, active }
    },
    template: `
      <div style="padding:40px;">
        <ModalTabs v-bind="args" v-model="active" :tabs="tabs">
          <template #default="{ activeId }">
            <div style="${panelStyle} padding-top:16px;">Active: {{ activeId }}</div>
          </template>
        </ModalTabs>
      </div>`,
  }),
}

// ─── All individual tab states ──────────────────────────

export const AllStates: Story = {
  render: () => ({
    components: { ModalTabs },
    setup() {
      const tabs = [
        { id: 'a', label: 'Link action' },
        { id: 'b', label: 'Link action' },
        { id: 'c', label: 'Link action' },
        { id: 'd', label: 'Link action' },
        { id: 'e', label: 'Link action' },
      ]
      return { tabs }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;padding:40px;">
        <div>
          <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0 0 12px;">Default (none selected)</p>
          <ModalTabs :tabs="tabs" model-value="" :show-separator="false" />
        </div>
        <div>
          <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0 0 12px;">First tab active (auto-selected on load)</p>
          <ModalTabs :tabs="tabs" model-value="a" :show-separator="false" />
        </div>
        <div>
          <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0 0 12px;">Middle tab active</p>
          <ModalTabs :tabs="tabs" model-value="c" :show-separator="false" />
        </div>
        <div>
          <p style="font:12px/1 Roboto,sans-serif;color:#666;margin:0 0 12px;">With separator (default for modals)</p>
          <ModalTabs :tabs="tabs" model-value="b" />
        </div>
      </div>`,
  }),
}
