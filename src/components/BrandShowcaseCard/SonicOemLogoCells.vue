<script setup lang="ts">
import type { SonicOemLogoCellData } from './SonicOemLogoCell.vue'
import SonicOemLogoCell from './SonicOemLogoCell.vue'

defineProps<{
  cells: readonly SonicOemLogoCellData[]
}>()
</script>

<template>
  <SonicOemLogoCell
    v-for="cell in cells"
    :key="cell.id"
    :id="cell.id"
    :name="cell.name"
    :src="cell.src"
  />
</template>
