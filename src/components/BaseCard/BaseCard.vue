<script setup lang="ts">
withDefaults(defineProps<{
  /** min = 280px width, max = 420px width */
  size?: 'min' | 'max'
}>(), {
  size: 'min',
})
</script>

<template>
  <div class="card" :class="`card--${size}`">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--color-neutral-100);
  border: var(--border-width-hairline) solid var(--color-neutral-90);
  border-radius: var(--border-radius-md); /* 8px */
  padding: var(--spacing-xxs);            /* 24px */
  overflow: hidden;
  box-sizing: border-box;
}

.card--min { width: 280px; }
.card--max { width: 420px; }
</style>
