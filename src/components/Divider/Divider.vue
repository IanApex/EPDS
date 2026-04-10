<script setup lang="ts">
withDefaults(defineProps<{
  /** Color intensity */
  color?: 'light' | 'dark'
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical'
}>(), {
  color: 'light',
  orientation: 'horizontal',
})
</script>

<template>
  <div
    class="divider"
    :class="[
      `divider--${color}`,
      `divider--${orientation}`,
    ]"
    role="separator"
    :aria-orientation="orientation"
  />
</template>

<style scoped>
.divider {
  flex-shrink: 0;
}

.divider--horizontal {
  width: 100%;
  height: 1px;
}

.divider--vertical {
  height: 100%;
  width: 1px;
}

.divider--light {
  background: var(--color-neutral-90);
}

.divider--dark {
  background: var(--color-neutral-40);
}
</style>
