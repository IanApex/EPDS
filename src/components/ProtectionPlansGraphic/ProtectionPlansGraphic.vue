<script lang="ts">
import carUrl from '../../../Illustrations/ProtectionPlansCar.png'

interface Callout {
  id: string
  title: string
  description: string
  iconPos: { x: number; y: number }
  textPos: { x: number; y: number }
  lineStart: { x: number; y: number }
  lineEnd: { x: number; y: number }
}

const LG_W = 653
const LG_H = 345

const LG_CALLOUTS: Callout[] = [
  {
    id: 'windshield',
    title: 'Windshield repairs & replacements',
    description: 'Covered with windshield protection',
    iconPos: { x: 229, y: 1 },
    textPos: { x: 291, y: 5 },
    lineStart: { x: 243, y: 54 },
    lineEnd: { x: 228, y: 96 },
  },
  {
    id: 'ding',
    title: 'Ding & dent repairs',
    description: 'Covered with dent protection',
    iconPos: { x: 399, y: 101 },
    textPos: { x: 460, y: 105 },
    lineStart: { x: 396, y: 131 },
    lineEnd: { x: 352, y: 135 },
  },
  {
    id: 'appearance',
    title: 'Interior/exterior appearance upkeep',
    description: 'Covered with appearance protection',
    iconPos: { x: 333, y: 211 },
    textPos: { x: 394, y: 218 },
    lineStart: { x: 339, y: 222 },
    lineEnd: { x: 289, y: 176 },
  },
  {
    id: 'engine',
    title: 'Engine & core system maintenance',
    description: 'Covered with vehicle service contract',
    iconPos: { x: 151, y: 293 },
    textPos: { x: 211, y: 297 },
    lineStart: { x: 163, y: 295 },
    lineEnd: { x: 91, y: 177 },
  },
]

const SM_W = 360
const SM_H = 224

const SM_CALLOUTS: Callout[] = [
  {
    id: 'windshield',
    title: 'Windshield repairs & replacements',
    description: '',
    iconPos: { x: 142, y: 0 },
    textPos: { x: 189, y: 9 },
    lineStart: { x: 149, y: 40 },
    lineEnd: { x: 155, y: 67 },
  },
  {
    id: 'ding',
    title: 'Ding & dent repairs',
    description: '',
    iconPos: { x: 236, y: 68 },
    textPos: { x: 282, y: 77 },
    lineStart: { x: 236, y: 91 },
    lineEnd: { x: 222, y: 91 },
  },
  {
    id: 'appearance',
    title: 'Interior/exterior appearance',
    description: '',
    iconPos: { x: 209, y: 138 },
    textPos: { x: 257, y: 149 },
    lineStart: { x: 214, y: 148 },
    lineEnd: { x: 182, y: 118 },
  },
  {
    id: 'engine',
    title: 'Engine & core system maintenance',
    description: '',
    iconPos: { x: 101, y: 184 },
    textPos: { x: 147, y: 193 },
    lineStart: { x: 103, y: 193 },
    lineEnd: { x: 57, y: 118 },
  },
]

export { carUrl }
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'lg'
}>(), {
  size: 'lg',
})

function pct(val: number, total: number) {
  return `${(val / total) * 100}%`
}
</script>

<template>
  <div
    class="pp-graphic"
    :class="`pp-graphic--${size}`"
    :style="{ aspectRatio: size === 'lg' ? `${LG_W}/${LG_H}` : `${SM_W}/${SM_H}` }"
  >
    <!-- Car image -->
    <img
      class="pp-graphic__car"
      :src="carUrl"
      alt="Vehicle showing protection plan coverage areas"
    />

    <!-- Leader lines SVG overlay -->
    <svg
      class="pp-graphic__lines"
      :viewBox="size === 'lg' ? `0 0 ${LG_W} ${LG_H}` : `0 0 ${SM_W} ${SM_H}`"
      preserveAspectRatio="none"
    >
      <line
        v-for="c in (size === 'lg' ? LG_CALLOUTS : SM_CALLOUTS)"
        :key="c.id"
        :x1="c.lineStart.x"
        :y1="c.lineStart.y"
        :x2="c.lineEnd.x"
        :y2="c.lineEnd.y"
        stroke="#242C33"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <!-- Callouts -->
    <div
      v-for="c in (size === 'lg' ? LG_CALLOUTS : SM_CALLOUTS)"
      :key="c.id"
      class="pp-graphic__callout"
      :style="{
        left: pct(c.iconPos.x, size === 'lg' ? LG_W : SM_W),
        top: pct(c.iconPos.y, size === 'lg' ? LG_H : SM_H),
      }"
    >
      <!-- Check icon -->
      <span class="pp-graphic__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12ZM17.655 9.17L10.585 16.24L6.342 12L7.756 10.583L10.585 13.412L16.241 7.756L17.655 9.17Z"
            fill="currentColor"
          />
        </svg>
      </span>

      <!-- Text -->
      <div class="pp-graphic__text">
        <strong class="pp-graphic__title">{{ c.title }}</strong>
        <span v-if="c.description" class="pp-graphic__desc">{{ c.description }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pp-graphic {
  position: relative;
  width: 100%;
  font-family: var(--font-family-base);
}

/* ── Car ── */
.pp-graphic__car {
  position: absolute;
  display: block;
}

.pp-graphic--lg .pp-graphic__car {
  left: 0;
  top: 20.8%;
  width: 58%;
  height: auto;
}

.pp-graphic--sm .pp-graphic__car {
  left: 0;
  top: 23.2%;
  width: 66.4%;
  height: auto;
}

/* ── Leader lines ── */
.pp-graphic__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* ── Callouts ── */
.pp-graphic__callout {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ── Check icon ── */
.pp-graphic__icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px dashed var(--color-neutral-0);
  color: #006FA6;
  box-sizing: border-box;
}

.pp-graphic__icon svg {
  display: block;
}

/* ── Text ── */
.pp-graphic__text {
  display: flex;
  flex-direction: column;
  color: var(--color-neutral-0);
  white-space: nowrap;
}

.pp-graphic__title {
  font-weight: var(--font-weight-bold);
}

.pp-graphic__desc {
  font-weight: var(--font-weight-regular);
}

/* ═══════ Large ═══════ */
.pp-graphic--lg {
  max-width: 653px;
}

.pp-graphic--lg .pp-graphic__icon {
  width: 54px;
  height: 54px;
}

.pp-graphic--lg .pp-graphic__icon svg {
  width: 48px;
  height: 48px;
}

.pp-graphic--lg .pp-graphic__title {
  font-size: var(--text-body-lg-size);
  line-height: var(--text-body-lg-line-height);
}

.pp-graphic--lg .pp-graphic__desc {
  font-size: var(--text-body-sm-size);
  line-height: var(--text-body-sm-line-height);
}

/* ═══════ Small ═══════ */
.pp-graphic--sm {
  max-width: 360px;
}

.pp-graphic--sm .pp-graphic__icon {
  width: 40px;
  height: 40px;
}

.pp-graphic--sm .pp-graphic__icon svg {
  width: 36px;
  height: 36px;
}

.pp-graphic--sm .pp-graphic__callout {
  gap: 4px;
}

.pp-graphic--sm .pp-graphic__title {
  font-size: 12px;
  line-height: 16px;
  white-space: normal;
  max-width: 120px;
}
</style>
