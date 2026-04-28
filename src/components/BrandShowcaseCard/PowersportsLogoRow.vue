<script setup lang="ts">
/**
 * PowersportsLogoRow — story / organism helper that renders
 * the 3 dealership logos shown in the Sonic Powersports
 * selected-state card (Team Mancuso, Motorcycles Charlotte,
 * Harley-Davidson).
 *
 * Lives next to `BrandShowcaseCard.vue` (alongside `SonicOemGrid`
 * + `EchoParkLocationsGrid`) because it is the Powersports-
 * specific marketing payload for that card's `#selected-content`
 * slot.
 *
 * Each logo's footprint mirrors the Figma "Powersports —
 * selected" frame: 73 × 57 (Mancuso) · 64 × 63 (Motorcycles
 * Charlotte / "Civic Cycle") · 77 × 59 (Harley-Davidson). The
 * row uses 24 px gaps and centred alignment so the logos always
 * read as a balanced trio regardless of the card's available
 * width. Per-mark sizing lives in scoped CSS as `[data-mark]`
 * attribute selectors so the markup carries no inline styles.
 */
import mancusoUrl  from '@logos/Logo_Team_Mancuso_Powersports_primary50 1.svg?url'
import charlotteUrl from '@logos/Logo_Motorcycles_Charlotte.svg?url'
import harleyUrl    from '@logos/Logo_Harley_Davidson.svg?url'

interface PowersportsLogo {
  id: string
  name: string
  src: string
}

const logos: PowersportsLogo[] = [
  { id: 'mancuso',   name: 'Team Mancuso Powersports',   src: mancusoUrl },
  { id: 'charlotte', name: 'Motorcycles Charlotte',      src: charlotteUrl },
  { id: 'harley',    name: 'Harley-Davidson',            src: harleyUrl },
]
</script>

<template>
  <ul class="pslr" role="list">
    <li
      v-for="logo in logos"
      :key="logo.id"
      class="pslr__cell"
    >
      <img
        :src="logo.src"
        :alt="logo.name"
        :data-mark="logo.id"
        class="pslr__logo"
      />
    </li>
  </ul>
</template>

<style scoped>
/* 3 logos in a row, 24 px gap between, centred horizontally.
 * Vertical alignment is also centred so logos with different
 * heights (57 / 63 / 59 in Figma) sit on a shared midline. */
.pslr {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pslr__cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pslr__logo {
  display: block;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

/* Per-mark dimensions taken straight from the Figma cell sizes. */
.pslr__logo[data-mark="mancuso"]   { width: 73px; height: 57px; }
.pslr__logo[data-mark="charlotte"] { width: 64px; height: 63px; }
.pslr__logo[data-mark="harley"]    { width: 77px; height: 59px; }
</style>
