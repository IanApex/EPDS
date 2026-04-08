<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * Accessible label for the button — required because there is no visible text.
   * Rendered as `aria-label` on the root element.
   */
  ariaLabel: string
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
    class="medium-icon-btn"
    :aria-label="ariaLabel"
    :href="href"
    :target="href ? target : undefined"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    :disabled="!href ? disabled : undefined"
    :aria-disabled="href && disabled ? 'true' : undefined"
    @click="!disabled && $emit('click', $event)"
  >
    <!--
      Icon slot — pass any SVG via the #icon slot.
      Import SVG files with ?raw and wrap in a span using v-html:
        <template #icon>
          <span v-html="myIconSvg" style="display:contents" />
        </template>
      The fill: currentColor CSS rule below adapts icon colour
      to each interaction state automatically.
    -->
    <span class="medium-icon-btn__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </component>
</template>

<style scoped>
.medium-icon-btn {
  /* Fixed 40×40 circle */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;

  border: none;
  border-radius: var(--border-radius-pill);
  background: none;
  cursor: pointer;
  text-decoration: none;

  color: var(--color-action-accent);

  /* Default 2px Accent40 border rendered as inset shadow */
  box-shadow: inset 0 0 0 2px var(--color-action-accent);

  transition:
    color 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;
}

/* ─── Hover ────────────────────────────────────────────── */
.medium-icon-btn:hover:not(:disabled):not([aria-disabled='true']) {
  color: var(--color-action-accent-hover);
  box-shadow: inset 0 0 0 3px var(--color-action-accent-hover);
}

/* ─── Active / Pressed ─────────────────────────────────── */
.medium-icon-btn:active:not(:disabled):not([aria-disabled='true']) {
  color: var(--color-action-accent);
  box-shadow: inset 0 0 0 3px var(--color-action-accent);
  background-color: var(--color-action-accent-subtle);
}

/* ─── Focus ────────────────────────────────────────────── */
.medium-icon-btn:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 3px var(--color-focus-ring);
}

/* ─── Disabled ─────────────────────────────────────────── */
.medium-icon-btn:disabled,
.medium-icon-btn[aria-disabled='true'] {
  color: var(--color-neutral-70);
  box-shadow: none;
  background-color: var(--color-neutral-secondary-90);
  cursor: not-allowed;
  pointer-events: none;
}

/* ─── Icon ─────────────────────────────────────────────── */
.medium-icon-btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* Figma renders icon at 20×20 inside the 40×40 circle */
  width: 20px;
  height: 20px;
}

/* Inherit current text colour so icon tracks all state changes automatically */
.medium-icon-btn__icon :deep(path),
.medium-icon-btn__icon :deep(circle),
.medium-icon-btn__icon :deep(rect),
.medium-icon-btn__icon :deep(polygon) {
  fill: currentColor;
}
</style>
