import { defineComponent, h } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VideoControlButton from './VideoControlButton.vue'

// ─── Icon imports ─────────────────────────────────────────────────────────────

import playSvg         from '../../../icon/Style=Media, Detail=Play, Icon=NA.svg?raw'
import pauseSvg        from '../../../icon/Style=Media, Detail=Pause, Icon=NA.svg?raw'
import stopSvg         from '../../../icon/Style=Media, Detail=Stop, Icon=NA.svg?raw'
import skipFwdSvg      from '../../../icon/Style=Media, Detail=Skip-Forward, Icon=NA.svg?raw'
import skipBwdSvg      from '../../../icon/Style=Media, Detail=Skip-Backward, Icon=NA.svg?raw'
import fullscreenSvg   from '../../../icon/Style=Media, Detail=Fullscreen, Icon=NA.svg?raw'
import exitFsSvg       from '../../../icon/Style=Media, Detail=Exit-Fullscreen, Icon=NA.svg?raw'
import refreshSvg      from '../../../icon/Style=Media, Detail=Refresh, Icon=NA.svg?raw'

// ─── Helper: slot icon wrapper ────────────────────────────────────────────────

function iconSlot(svg: string) {
  return defineComponent({
    render: () => h('span', { innerHTML: svg, style: 'display:contents' }),
  })
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Buttons/VideoControlButton',
  component: VideoControlButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Circular 40×40px video/media control button with dark and light themes.\n\n' +
          '**Pass any 24×24 SVG** via the `#icon` slot — use `?raw` import + `v-html` wrapper:\n\n' +
          '```html\n' +
          '<VideoControlButton aria-label="Play" color="dark">\n' +
          '  <template #icon>\n' +
          '    <span v-html="playSvg" style="display:contents" />\n' +
          '  </template>\n' +
          '</VideoControlButton>\n' +
          '```\n\n' +
          '| Theme | Default bg | Hover/Press bg | Icon colour |\n' +
          '|-------|------------|----------------|-------------|\n' +
          '| `dark` | `--color-neutral-20` (#313D47) | `--color-neutral-0` (#242C33) | White |\n' +
          '| `light` | `rgba(255,255,255,0.6)` | `--color-neutral-100` | Dark (`--color-neutral-0`) |\n\n' +
          'Focus ring: 3px `--color-accessibility-80` border (no layout shift — `box-sizing: border-box`).\n\n' +
          'Figma: "Buttons/VideoControls".',
      },
    },
  },
  argTypes: {
    color: { control: 'select', options: ['dark', 'light'] },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  args: {
    color: 'dark',
    ariaLabel: 'Play',
    disabled: false,
  },
} satisfies Meta<typeof VideoControlButton>

export default meta
type Story = StoryObj<typeof meta>

// ─── Shared background params ─────────────────────────────────────────────────

const darkBg  = { backgrounds: { default: 'dark' } }
const lightBg = { backgrounds: { default: 'light' } }

// ─── Dark theme ───────────────────────────────────────────────────────────────

export const DarkDefault: Story = {
  name: 'Dark · Default',
  args: { color: 'dark', ariaLabel: 'Play' },
  parameters: darkBg,
  render: (args) => ({
    components: { VideoControlButton },
    setup: () => ({ args, PlayIcon: iconSlot(playSvg) }),
    template: `
      <VideoControlButton v-bind="args">
        <template #icon><component :is="PlayIcon" /></template>
      </VideoControlButton>
    `,
  }),
}

export const DarkHover: Story = {
  name: 'Dark · Hover',
  args: { color: 'dark', ariaLabel: 'Play' },
  parameters: { ...darkBg, pseudo: { hover: true } },
  render: DarkDefault.render,
}

export const DarkPressed: Story = {
  name: 'Dark · Pressed',
  args: { color: 'dark', ariaLabel: 'Play' },
  parameters: { ...darkBg, pseudo: { active: true } },
  render: DarkDefault.render,
}

export const DarkFocus: Story = {
  name: 'Dark · Focus',
  args: { color: 'dark', ariaLabel: 'Play' },
  parameters: { ...darkBg, pseudo: { focusVisible: true } },
  render: DarkDefault.render,
}

export const DarkDisabled: Story = {
  name: 'Dark · Disabled',
  args: { color: 'dark', ariaLabel: 'Play', disabled: true },
  parameters: darkBg,
  render: DarkDefault.render,
}

// ─── Light theme ──────────────────────────────────────────────────────────────

export const LightDefault: Story = {
  name: 'Light · Default',
  args: { color: 'light', ariaLabel: 'Play' },
  parameters: lightBg,
  render: (args) => ({
    components: { VideoControlButton },
    setup: () => ({ args, PlayIcon: iconSlot(playSvg) }),
    template: `
      <VideoControlButton v-bind="args">
        <template #icon><component :is="PlayIcon" /></template>
      </VideoControlButton>
    `,
  }),
}

export const LightHover: Story = {
  name: 'Light · Hover',
  args: { color: 'light', ariaLabel: 'Play' },
  parameters: { ...lightBg, pseudo: { hover: true } },
  render: LightDefault.render,
}

export const LightFocus: Story = {
  name: 'Light · Focus',
  args: { color: 'light', ariaLabel: 'Play' },
  parameters: { ...lightBg, pseudo: { focusVisible: true } },
  render: LightDefault.render,
}

// ─── All States ───────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: 'All states',
  parameters: {
    docs: {
      description: {
        story: 'Dark and light themes across all interaction states.',
      },
    },
  },
  render: () => ({
    components: { VideoControlButton },
    setup: () => ({ PlayIcon: iconSlot(playSvg) }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px;">
        <div style="background: #1a1a1a; padding: 20px; border-radius: 8px;">
          <p style="color: #fff; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 12px; opacity: .6;">Dark theme</p>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="text-align: center;">
              <VideoControlButton color="dark" aria-label="Play">
                <template #icon><component :is="PlayIcon" /></template>
              </VideoControlButton>
              <p style="color: #fff; font-size: 11px; margin: 6px 0 0; opacity: .5;">Default</p>
            </div>
            <div style="text-align: center;">
              <VideoControlButton color="dark" aria-label="Play" class="pseudo-hover">
                <template #icon><component :is="PlayIcon" /></template>
              </VideoControlButton>
              <p style="color: #fff; font-size: 11px; margin: 6px 0 0; opacity: .5;">Hover</p>
            </div>
            <div style="text-align: center;">
              <VideoControlButton color="dark" aria-label="Play" disabled>
                <template #icon><component :is="PlayIcon" /></template>
              </VideoControlButton>
              <p style="color: #fff; font-size: 11px; margin: 6px 0 0; opacity: .5;">Disabled</p>
            </div>
          </div>
        </div>
        <div style="background: #f0f0f0; padding: 20px; border-radius: 8px;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: .08em; margin: 0 0 12px; opacity: .5;">Light theme</p>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="text-align: center;">
              <VideoControlButton color="light" aria-label="Play">
                <template #icon><component :is="PlayIcon" /></template>
              </VideoControlButton>
              <p style="font-size: 11px; margin: 6px 0 0; opacity: .5;">Default</p>
            </div>
            <div style="text-align: center;">
              <VideoControlButton color="light" aria-label="Play" class="pseudo-hover">
                <template #icon><component :is="PlayIcon" /></template>
              </VideoControlButton>
              <p style="font-size: 11px; margin: 6px 0 0; opacity: .5;">Hover</p>
            </div>
            <div style="text-align: center;">
              <VideoControlButton color="light" aria-label="Play" disabled>
                <template #icon><component :is="PlayIcon" /></template>
              </VideoControlButton>
              <p style="font-size: 11px; margin: 6px 0 0; opacity: .5;">Disabled</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// ─── Icon Variety ─────────────────────────────────────────────────────────────

export const IconVariety: Story = {
  name: 'Icon variety',
  parameters: {
    docs: {
      description: {
        story: 'All available media icons shown in the dark theme.',
      },
    },
  },
  render: () => ({
    components: { VideoControlButton },
    setup: () => ({
      controls: [
        { label: 'Play',            icon: playSvg,        aria: 'Play' },
        { label: 'Pause',           icon: pauseSvg,       aria: 'Pause' },
        { label: 'Stop',            icon: stopSvg,        aria: 'Stop' },
        { label: 'Skip forward',    icon: skipFwdSvg,     aria: 'Skip forward' },
        { label: 'Skip backward',   icon: skipBwdSvg,     aria: 'Skip backward' },
        { label: 'Fullscreen',      icon: fullscreenSvg,  aria: 'Fullscreen' },
        { label: 'Exit fullscreen', icon: exitFsSvg,      aria: 'Exit fullscreen' },
        { label: 'Refresh',         icon: refreshSvg,     aria: 'Refresh' },
      ],
    }),
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; padding: 24px; background: #1a1a1a; align-items: flex-start;">
        <div
          v-for="ctrl in controls"
          :key="ctrl.label"
          style="display: flex; flex-direction: column; align-items: center; gap: 6px;"
        >
          <VideoControlButton color="dark" :aria-label="ctrl.aria">
            <template #icon>
              <span v-html="ctrl.icon" style="display:contents" />
            </template>
          </VideoControlButton>
          <span style="color: #fff; font-size: 10px; opacity: .5;">{{ ctrl.label }}</span>
        </div>
      </div>
    `,
  }),
}
