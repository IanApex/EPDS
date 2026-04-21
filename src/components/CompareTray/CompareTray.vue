<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '../BaseButton/BaseButton.vue'

const props = withDefaults(defineProps<{
  /**
   * Number of vehicles currently in the compare list.
   * - `0` → tray is hidden.
   * - `1` → shows the short "Add more to compare" prompt.
   * - `>=2` → shows `<count> vehicles selected` + the **Compare** CTA.
   */
  count: number
  /**
   * Number of selected vehicles required before the Compare CTA appears.
   * Defaults to `2` — below this value the "add more" message is shown.
   */
  ctaThreshold?: number
  /**
   * Prompt copy shown while below `ctaThreshold`.
   */
  addMoreLabel?: string
  /**
   * Suffix shown after the numeric count once `ctaThreshold` is reached.
   * Defaults to `"vehicles selected"`.
   */
  selectedLabel?: string
  /**
   * CTA label shown on the count variant.
   */
  compareLabel?: string
  /**
   * Override the computed `aria-label` for the tray region.
   */
  ariaLabel?: string
}>(), {
  ctaThreshold: 2,
  addMoreLabel: 'Add more to compare',
  selectedLabel: 'vehicles selected',
  compareLabel: 'Compare',
})

const emit = defineEmits<{
  /** Fired when the user clicks the **Compare** CTA. */
  compare: [event: MouseEvent]
}>()

const visible = computed(() => props.count > 0)
const showCta = computed(() => props.count >= props.ctaThreshold)

const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  return showCta.value
    ? `${props.count} ${props.selectedLabel}. Press Compare to view them side by side.`
    : props.addMoreLabel
})

function onCompareClick(event: MouseEvent) {
  emit('compare', event)
}
</script>

<template>
  <Transition name="compare-tray">
    <aside
      v-if="visible"
      class="compare-tray"
      :class="{ 'compare-tray--with-cta': showCta }"
      role="status"
      aria-live="polite"
      :aria-label="computedAriaLabel"
    >
      <template v-if="showCta">
        <p class="compare-tray__count">
          <span class="compare-tray__count-num">{{ count }}</span>
          <span class="compare-tray__count-label">&nbsp;{{ selectedLabel }}</span>
        </p>
        <BaseButton
          class="compare-tray__cta"
          variant="primary"
          size="md"
          :label="compareLabel"
          @click="onCompareClick"
        />
      </template>

      <p v-else class="compare-tray__prompt">
        {{ addMoreLabel }}
      </p>
    </aside>
  </Transition>
</template>

<style scoped>
/* ─── Surface ─────────────────────────────────────────────
 * Desktop: 412px fixed-width card pinned to the bottom-right
 *          corner of the viewport. Shadow falls up-and-left
 *          so the card reads as floating above page content.
 *
 * Mobile (<600px): full-width bar pinned to the bottom edge;
 *          shadow falls straight up.
 *
 * Figma: node 13945:38154 (count+CTA) / 13945:38159 (prompt).
 * -------------------------------------------------------- */
.compare-tray {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 900;

  box-sizing: border-box;
  width: 412px;
  max-width: 100vw;
  min-height: 85px;
  padding: 10px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xxs, 24px);

  background-color: var(--color-neutral-100);
  color: var(--color-neutral-0);
  box-shadow: -4px -4px 20.7px 0 rgba(0, 0, 0, 0.16);

  font-family: var(--font-family-base);
}

/* Count variant is taller to accommodate the CTA. */
.compare-tray--with-cta {
  min-height: 149px;
}

/* ─── Prompt text (count < threshold) ─────────────────── */
.compare-tray__prompt {
  margin: 0;
  font-size: 22px;
  font-weight: 300;
  line-height: 1.2;
  color: var(--color-neutral-0);
  text-align: center;
}

/* ─── Count + selected label ──────────────────────────── */
.compare-tray__count {
  margin: 0;
  font-size: 22px;
  font-weight: 300;
  line-height: 1.2;
  color: var(--color-neutral-0);
  text-align: center;
}

.compare-tray__count-num {
  font-weight: 700;
}

/* ─── Compare CTA ─────────────────────────────────────── */
.compare-tray__cta {
  min-width: 148px;
}

/* ─── Mobile (<600px) — full-width bar ─────────────────── */
@media (max-width: 599.98px) {
  .compare-tray {
    width: 100%;
    right: 0;
    left: 0;
    padding: 12px 24px;
    box-shadow: 0 -4px 20.7px 0 rgba(0, 0, 0, 0.16);
  }
}

/* ─── Enter / leave animation ─────────────────────────── */
.compare-tray-enter-active,
.compare-tray-leave-active {
  transition:
    transform 0.25s ease,
    opacity 0.2s ease;
}

.compare-tray-enter-from,
.compare-tray-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

@media (prefers-reduced-motion: reduce) {
  .compare-tray-enter-active,
  .compare-tray-leave-active {
    transition: opacity 0.15s ease;
  }
  .compare-tray-enter-from,
  .compare-tray-leave-to {
    transform: none;
  }
}
</style>
