<script setup lang="ts">
/**
 * JourneySelector — one-click card that immediately routes a user into a
 * specific flow (credit app, trade-in, cash purchase, etc.).
 *
 * Usage: render 2–4 JourneySelectors side-by-side inside a flex container.
 * The parent controls which is `selected` based on click events.
 *
 *   <div style="display:flex; gap:16px;">
 *     <JourneySelector
 *       v-for="opt in options"
 *       :key="opt.value"
 *       :label="opt.label"
 *       :selected="chosen === opt.value"
 *       @select="chosen = opt.value"
 *     >
 *       <template #icon>
 *         <span v-html="opt.svg" style="display:contents" />
 *       </template>
 *     </JourneySelector>
 *   </div>
 *
 * UX note (Figma build guideline): allow a ~5-second visual delay between
 * the user clicking and the application navigating, so the selected state
 * is clearly visible before the view changes. Handle this delay in the
 * parent — the component emits immediately on click.
 */
withDefaults(defineProps<{
  /** Text label displayed below the icon. */
  label: string
  /** Whether this option is currently selected. */
  selected?: boolean
  /** Renders as `<a>` when provided, `<button>` otherwise. */
  href?: string
  target?: string
  disabled?: boolean
}>(), {
  selected:  false,
  disabled:  false,
})

const emit = defineEmits<{
  /** Fired on click (when not disabled). Parent should update selected state. */
  select: [event: MouseEvent]
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="journey-selector"
    :class="{ 'journey-selector--selected': selected }"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :disabled="!href ? disabled : undefined"
    :aria-disabled="href && disabled ? 'true' : undefined"
    :aria-pressed="selected"
    type="button"
    @click="!disabled && emit('select', $event)"
  >
    <!--
      Icon slot — pass any 24×24 SVG imported with ?raw:
        <template #icon>
          <span v-html="profileSvg" style="display:contents" />
        </template>
    -->
    <span class="journey-selector__icon" aria-hidden="true">
      <slot name="icon" />
    </span>

    <span class="journey-selector__label">{{ label }}</span>
  </component>
</template>

<style scoped>
/* ─── Base ─────────────────────────────────────────────── */
.journey-selector {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  height: 90px;
  min-width: 120px;
  padding: 12px 16px;
  box-sizing: border-box;

  border: none; /* reset <button> default */
  border-radius: 8px;
  background: var(--color-action-accent-subtle); /* #E6F1F5 — always */
  color: var(--color-action-accent);       /* #006FA6 Blue60 */
  cursor: pointer;
  text-decoration: none;

  /* 1px border via inset shadow — never shifts layout as weight changes */
  box-shadow: inset 0 0 0 1px var(--color-action-accent);

  transition:
    background-color 0.15s ease,
    box-shadow       0.15s ease,
    color            0.15s ease;
}

/* ─── Hover ────────────────────────────────────────────── */
.journey-selector:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-action-accent-tint); /* #C8E0E9 */
  box-shadow: inset 0 0 0 2px var(--color-action-accent);
  color: var(--color-action-accent-hover);      /* #004D80 */
}
.journey-selector:hover:not(:disabled):not([aria-disabled='true']) .journey-selector__label {
  text-decoration: underline;
}

/* ─── Selected ─────────────────────────────────────────── */
.journey-selector--selected {
  box-shadow: inset 0 0 0 2px var(--color-action-accent-hover); /* #004D80 */
  color: var(--color-action-accent-hover);
}

/* Selected + hover: keep selected border, change bg */
.journey-selector--selected:hover:not(:disabled):not([aria-disabled='true']) {
  background: var(--color-action-accent-tint);
  box-shadow: inset 0 0 0 2px var(--color-action-accent-hover);
}

/* ─── Focus ────────────────────────────────────────────── */
.journey-selector:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 3px var(--color-focus-ring);
}

/* ─── Disabled ─────────────────────────────────────────── */
.journey-selector:disabled,
.journey-selector[aria-disabled='true'] {
  opacity: var(--opacity-level-medium);
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Icon ─────────────────────────────────────────────── */
.journey-selector__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

/* Override SVG hardcoded fills to track currentColor */
.journey-selector__icon :deep(path),
.journey-selector__icon :deep(circle),
.journey-selector__icon :deep(rect),
.journey-selector__icon :deep(polygon) {
  fill: currentColor;
}

/* ─── Label ─────────────────────────────────────────────── */
.journey-selector__label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);    /* 16px */
  font-weight: var(--font-weight-medium); /* 500 */
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
}
</style>
