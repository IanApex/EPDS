<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  lockScroll?: boolean
  dismissOnClick?: boolean
  dismissOnEsc?: boolean
  zIndex?: number
}>(), {
  modelValue: false,
  lockScroll: true,
  dismissOnClick: true,
  dismissOnEsc: true,
  zIndex: 900,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  click: [event: MouseEvent]
}>()

function handleClick(e: MouseEvent) {
  emit('click', e)
  if (props.dismissOnClick) emit('update:modelValue', false)
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue && props.dismissOnEsc) {
    emit('update:modelValue', false)
  }
}

watch(() => props.modelValue, (visible) => {
  if (!props.lockScroll) return
  document.body.style.overflow = visible ? 'hidden' : ''
})

onMounted(() => {
  document.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div
        v-if="modelValue"
        class="overlay"
        :style="{ zIndex }"
        @click.self="handleClick"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(36, 44, 51, 0.5);
}

/* ── Transition ── */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.2s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
