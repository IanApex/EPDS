<script setup lang="ts">
import audiUrl       from '@logos/OEMs/Audi.svg?url'
import bmwUrl        from '@logos/OEMs/BMW.svg?url'
import cadillacUrl   from '@logos/OEMs/Cadillac.svg?url'
import chevyUrl      from '@logos/OEMs/Chevy.svg?url'
import chryslerUrl   from '@logos/OEMs/Logo container.svg?url'
import dodgeUrl      from '@logos/OEMs/Dodge.svg?url'
import fordUrl       from '@logos/OEMs/Ford.svg?url'
import gmcUrl        from '@logos/OEMs/GMC.svg?url'
import hondaUrl      from '@logos/OEMs/Honda.svg?url'
import hyundaiUrl    from '@logos/OEMs/Hyundai.svg?url'
import jaguarUrl     from '@logos/OEMs/Jaguar.svg?url'
import jeepUrl       from '@logos/OEMs/Jeep.svg?url'
import landRoverUrl  from '@logos/OEMs/Land Rover.svg?url'
import lexusUrl      from '@logos/OEMs/Lexus.svg?url'
import mercedesUrl   from '@logos/OEMs/Mercedes.svg?url'
import miniUrl       from '@logos/OEMs/Mini.svg?url'
import nissanUrl     from '@logos/OEMs/Nissan.svg?url'
import porscheUrl    from '@logos/OEMs/Porsche.svg?url'
import ramUrl        from '@logos/OEMs/Ram.svg?url'
import subaruUrl     from '@logos/OEMs/Subary.svg?url'
import toyotaUrl     from '@logos/OEMs/Toyota.svg?url'
import vwUrl         from '@logos/OEMs/VW.svg?url'
import volvoUrl      from '@logos/OEMs/Volvo.svg?url'

import SonicOemLogoCells from './SonicOemLogoCells.vue'
import type { SonicOemLogoCellData } from './SonicOemLogoCell.vue'

const oemCells: SonicOemLogoCellData[] = [
  { id: 'audi',       name: 'Audi',          src: audiUrl },
  { id: 'bmw',        name: 'BMW',           src: bmwUrl },
  { id: 'cadillac',   name: 'Cadillac',      src: cadillacUrl },
  { id: 'chevy',      name: 'Chevrolet',     src: chevyUrl },
  { id: 'chrysler',   name: 'Chrysler',      src: chryslerUrl },
  { id: 'dodge',      name: 'Dodge',         src: dodgeUrl },
  { id: 'jeep',       name: 'Jeep',          src: jeepUrl },
  { id: 'honda',      name: 'Honda',         src: hondaUrl },
  { id: 'hyundai',    name: 'Hyundai',       src: hyundaiUrl },
  { id: 'gmc',        name: 'GMC',           src: gmcUrl },
  { id: 'jaguar',     name: 'Jaguar',        src: jaguarUrl },
  { id: 'ford',       name: 'Ford',          src: fordUrl },
  { id: 'land-rover', name: 'Land Rover',    src: landRoverUrl },
  { id: 'lexus',      name: 'Lexus',         src: lexusUrl },
  { id: 'mercedes',   name: 'Mercedes-Benz', src: mercedesUrl },
  { id: 'mini',       name: 'MINI',          src: miniUrl },
  { id: 'nissan',     name: 'Nissan',        src: nissanUrl },
  { id: 'porsche',    name: 'Porsche',       src: porscheUrl },
  { id: 'ram',        name: 'Ram',           src: ramUrl },
  { id: 'subaru',     name: 'Subaru',        src: subaruUrl },
  { id: 'toyota',     name: 'Toyota',        src: toyotaUrl },
  { id: 'vw',         name: 'Volkswagen',    src: vwUrl },
  { id: 'volvo',      name: 'Volvo',         src: volvoUrl },
]
</script>

<template>
  <ul class="sog" role="list">
    <SonicOemLogoCells :cells="oemCells" />
    <!-- Empty 24th cell keeps the 4×6 grid shape (row 6 col 4 has no OEM). -->
    <li class="sog__slot-placeholder" aria-hidden="true" />
  </ul>
</template>

<style scoped>
.sog {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 0px;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Presentational OEM cells live in `SonicOemLogoCell.vue` (scoped). Match grid slot sizing here only. */

.sog__slot-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-height: 30px;
  min-width: 0;
  min-height: 0;
}
</style>
