<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Total number of dots (one per slide) */
    count: number
    /** Index of the active dot (0-based, bind with v-model) */
    modelValue?: number
  }>(),
  {
    modelValue: 0,
  },
)

const emit = defineEmits<{
  'update:modelValue': [index: number]
}>()
</script>

<template>
  <div class="cdots" role="group" aria-label="Carousel navigation">
    <button
      v-for="i in count"
      :key="i"
      class="cdots__dot"
      :class="{ 'cdots__dot--active': i - 1 === modelValue }"
      :aria-label="`Go to slide ${i}`"
      :aria-current="i - 1 === modelValue ? 'true' : undefined"
      @click="emit('update:modelValue', i - 1)"
    />
  </div>
</template>

<style scoped>
.cdots {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.cdots__dot {
  display: block;
  padding: 0;
  border: none;
  border-radius: var(--border-radius-circular);
  background: var(--color-neutral-90);
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  cursor: pointer;
  transition:
    width 0.2s ease,
    height 0.2s ease,
    background-color 0.15s ease;
}

.cdots__dot--active {
  background: var(--color-neutral-20);
  width: 12px;
  height: 12px;
}
</style>
