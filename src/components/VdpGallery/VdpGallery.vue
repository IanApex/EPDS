<script setup lang="ts">
import { computed } from 'vue'
import OverlayIconButton from '../OverlayIconButton'
import imageStackSvg  from '../../../icon/Style=Media, Detail=Image, Icon=NA.svg?raw'
import heartFilledSvg from '../../../icon/Style=Account, Detail=Heart-Filled, Icon=NA.svg?raw'

const props = withDefaults(defineProps<{
  /** Primary hero photo URL. When omitted a neutral placeholder renders. */
  imageUrl?: string
  /** Alt text for the hero photo. Falls back to `title` or an empty string. */
  imageAlt?: string
  /**
   * Optional vehicle title — used to compose a fallback `imageAlt` and the
   * gallery button's `aria-label` ("View all photos of …").
   */
  title?: string
  /**
   * Total number of photos in the gallery — reserved for a future count
   * badge inside the photos icon. Not rendered visually yet.
   */
  imageCount?: number
  /** Whether the vehicle is saved to favorites (use with `v-model:favorited`). */
  favorited?: boolean
}>(), {
  favorited: false,
})

const emit = defineEmits<{
  /** Two-way binding for favorite state. */
  'update:favorited': [value: boolean]
  /** Fired when the photos icon is clicked — host opens the full gallery. */
  'click:photos':    [event: MouseEvent]
}>()

const resolvedAlt = computed(() => props.imageAlt ?? props.title ?? '')

const photosAriaLabel = computed(() =>
  props.title ? `View all photos of ${props.title}` : 'View all photos',
)
const favoriteAriaLabel = computed(() =>
  props.favorited ? 'Remove from favorites' : 'Save to favorites',
)

function onPhotosClick(event: MouseEvent) {
  emit('click:photos', event)
}

function onFavoriteClick() {
  emit('update:favorited', !props.favorited)
}
</script>

<template>
  <div class="vdpg">
    <div class="vdpg__frame">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="resolvedAlt"
        class="vdpg__photo"
      />
      <div v-else class="vdpg__photo-placeholder" aria-hidden="true" />

      <div class="vdpg__overlays">
        <OverlayIconButton
          :ariaLabel="photosAriaLabel"
          @click="onPhotosClick"
        >
          <template #icon>
            <span style="display: contents" v-html="imageStackSvg" />
          </template>
        </OverlayIconButton>

        <OverlayIconButton
          :selected="favorited"
          :ariaPressed="favorited"
          :ariaLabel="favoriteAriaLabel"
          @click="onFavoriteClick"
        >
          <template #icon>
            <span style="display: contents" v-html="heartFilledSvg" />
          </template>
        </OverlayIconButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vdpg {
  width: 100%;
  max-width: 864px;
}

.vdpg__frame {
  position: relative;
  width: 100%;
  aspect-ratio: 864 / 455;
  overflow: hidden;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-neutral-95);
}

.vdpg__photo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.vdpg__photo-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--color-neutral-95) 0%,
    var(--color-neutral-90) 100%
  );
}

.vdpg__overlays {
  position: absolute;
  top: 20px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-nano);
  z-index: 2;
}

/* ─── Mobile (<600) ───────────────────────────────────────
 * Figma mobile frame 3069: hero photo is shorter/stubbier
 * (419 × 271 ≈ 1.55 aspect) vs the 864 × 455 tablet crop,
 * and the overlay cluster shifts up to a 16 px top inset
 * (right inset stays at 16 px). */
@media (max-width: 599.98px) {
  .vdpg__frame {
    aspect-ratio: 419 / 271;
  }

  .vdpg__overlays {
    top: 16px;
  }
}
</style>
