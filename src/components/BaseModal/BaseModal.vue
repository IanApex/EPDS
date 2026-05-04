<script setup lang="ts">
import Overlay from '../Overlay/Overlay.vue'

withDefaults(defineProps<{
  modelValue: boolean
  size?: 'sm' | 'lg'
  theme?: 'light' | 'dark'
  ariaLabel?: string
}>(), {
  modelValue: false,
  size: 'lg',
  theme: 'light',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <Overlay
    :modelValue="modelValue"
    :zIndex="1000"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <div class="modal-center">
      <div
        class="modal"
        :class="[`modal--${size}`, `modal--${theme}`]"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
      >
        <slot />
      </div>
    </div>
  </Overlay>
</template>

<style scoped>
/* pointer-events:none lets backdrop clicks pass through to Overlay's scrim */
.modal-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxs);
  pointer-events: none;
}

.modal {
  position: relative;
  width: 100%;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xxs);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  box-sizing: border-box;
  pointer-events: auto;
}

/* ─── Sizes ───────────────────────────────────────────────── */
.modal--sm { max-width: 500px; }
.modal--lg { max-width: 800px; }

/* ─── Themes ──────────────────────────────────────────────── */
.modal--light { background: var(--color-neutral-100); }
.modal--dark  { background: var(--color-neutral-20);  }
</style>
