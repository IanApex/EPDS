<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * Button label text. Alternatively use the default slot.
   */
  label?: string
  /**
   * When provided the component renders as an `<a>` tag.
   * When omitted it renders as a `<button>`.
   */
  href?: string
  /** Target attribute for the anchor tag (e.g. '_blank'). Only used when href is set. */
  target?: string
  disabled?: boolean
}>(), {
  disabled: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    class="tile-cta"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :disabled="!href ? disabled : undefined"
    :aria-disabled="href && disabled ? 'true' : undefined"
    @click="!disabled && $emit('click', $event)"
  >
    <!--
      Icon slot — pass any 24×24 SVG via the #icon slot.
      Import SVG files with ?raw and wrap in a span using v-html
      so fill: currentColor in the CSS below automatically adapts
      the icon colour to match each interaction state.
      Example: <template #icon><span v-html="myIconSvg" style="display:contents" /></template>
    -->
    <span v-if="$slots.icon" class="tile-cta__icon" aria-hidden="true">
      <slot name="icon" />
    </span>

    <span class="tile-cta__label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<style scoped>
.tile-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;

  border: none;
  border-radius: var(--border-radius-pill);
  background: none;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;

  color: var(--color-accent-40);
  font-family: var(--font-family-btn);
  font-size: var(--font-size-btn-sm);
  font-weight: var(--font-weight-btn-sm);
  line-height: var(--line-height-btn-sm);
  letter-spacing: var(--letter-spacing-btn-sm);

  /* Default 2px Accent40 border rendered inside — no layout impact */
  box-shadow: inset 0 0 0 2px var(--color-accent-40);

  transition:
    color 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;
}

/* ─── Hover ────────────────────────────────────────────── */
.tile-cta:hover:not(:disabled):not([aria-disabled='true']) {
  color: var(--color-accent-30);
  box-shadow: inset 0 0 0 3px var(--color-accent-30);
}

/* ─── Active / Pressed ─────────────────────────────────── */
.tile-cta:active:not(:disabled):not([aria-disabled='true']) {
  color: var(--color-accent-40);
  box-shadow: inset 0 0 0 3px var(--color-accent-40);
  background-color: var(--color-accent-90);
}

/* ─── Focus ────────────────────────────────────────────── */
.tile-cta:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 3px var(--color-accessibility-80);
}

/* ─── Disabled ─────────────────────────────────────────── */
.tile-cta:disabled,
.tile-cta[aria-disabled='true'] {
  color: var(--color-neutral-70);
  box-shadow: none;
  background-color: var(--color-neutral-secondary-90);
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Icon slot ────────────────────────────────────────── */
.tile-cta__icon {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

/* Inherit current text colour so icon tracks all state changes automatically */
.tile-cta__icon :deep(path),
.tile-cta__icon :deep(circle),
.tile-cta__icon :deep(rect),
.tile-cta__icon :deep(polygon) {
  fill: currentColor;
}

/* ─── Label ────────────────────────────────────────────── */
.tile-cta__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
