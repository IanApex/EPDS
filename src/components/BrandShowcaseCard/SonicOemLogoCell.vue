<script setup lang="ts">
/** Single OEM mark in the Sonic showcase grid (presentational; keeps `v-for` inference simple). */
export interface SonicOemLogoCellData {
  id: string
  name: string
  src: string
}

defineProps<SonicOemLogoCellData>()
</script>

<template>
  <li class="sog__cell">
    <img :src="src" :alt="name" :data-mark="id" class="sog__logo" />
  </li>
</template>

<style scoped>
.sog__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  box-sizing: border-box;
  max-height: 30px;
  min-width: 0;
  min-height: 0;
}

.sog__logo {
  display: block;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  pointer-events: none;
  user-select: none;
}

/* Row 1 */
.sog__logo[data-mark='audi']       { width: 33px; height: 12px; }
.sog__logo[data-mark='bmw']        { width: 22px; height: 22px; }
.sog__logo[data-mark='cadillac']   { width: 35px; height: 20px; }
.sog__logo[data-mark='chevy']      { width: 33px; height: 19px; }

/* Row 2 */
.sog__logo[data-mark='chrysler']   { width: 35px; height: 20px; }
.sog__logo[data-mark='dodge']      { width: 31px; height: 12px; }
.sog__logo[data-mark='jeep']       { width: 55px; height: 15px; }
.sog__logo[data-mark='honda']      { width: 35px; height: 20px; }

/* Row 3 */
.sog__logo[data-mark='hyundai']    { width: 40px; height: 40px; }
.sog__logo[data-mark='gmc']        { width: 38px; height: 10px; }
.sog__logo[data-mark='jaguar']     { width: 55px; height: 31px; }
.sog__logo[data-mark='ford']       { width: 37px; height: 14px; }

/* Row 4 */
.sog__logo[data-mark='land-rover'] { width: 34px; height: 18px; }
.sog__logo[data-mark='lexus']      { width: 23px; height: 22px; }
.sog__logo[data-mark='mercedes']   { width: 40px; height: 40px; }
.sog__logo[data-mark='mini']       { width: 34px; height: 15px; }

/* Row 5 */
.sog__logo[data-mark='nissan']     { width: 27px; height: 23px; }
.sog__logo[data-mark='porsche']    { width: 63px; height: 11px; }
.sog__logo[data-mark='ram']        { width: 43px; height: 13px; }
.sog__logo[data-mark='subaru']     { width: 33px; height: 20px; }

/* Row 6 */
.sog__logo[data-mark='toyota']     { width: 32px; height: 23px; }
.sog__logo[data-mark='vw']         { width: 26px; height: 26px; }
.sog__logo[data-mark='volvo']      { width: 63px; height: 10px; }
</style>
