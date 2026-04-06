<script setup lang="ts">
import { watch, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  /** v-model — true = open */
  modelValue: boolean
  /** 500px (sm) or 800px (lg) */
  size?: 'sm' | 'lg'
  /** White (light) or Neutral20/dark-navy (dark) */
  theme?: 'light' | 'dark'
  /** Accessible label for the dialog (use when no heading is slotted) */
  ariaLabel?: string
}>(), {
  modelValue: false,
  size: 'lg',
  theme: 'light',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.addEventListener('keydown', onKeydown)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', onKeydown)
      document.body.style.overflow = ''
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click.self="close"
      >
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
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ─── Overlay ─────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(36, 44, 51, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xxs); /* 24px safe zone */
}

/* ─── Dialog container ────────────────────────────────────── */
.modal {
  position: relative;
  width: 100%;
  border-radius: var(--border-radius-lg); /* 16px */
  padding: var(--spacing-xxs);            /* 24px */
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  box-sizing: border-box;
}

/* ─── Sizes ───────────────────────────────────────────────── */
.modal--sm { max-width: 500px; }
.modal--lg { max-width: 800px; }

/* ─── Themes ──────────────────────────────────────────────── */
.modal--light { background: var(--color-neutral-100); }
.modal--dark  { background: var(--color-neutral-20);  }

/* ─── Transition ──────────────────────────────────────────── */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: translateY(8px);
  opacity: 0;
}
</style>
