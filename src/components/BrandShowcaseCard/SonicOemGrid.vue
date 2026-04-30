<script setup lang="ts">
import audiUrl      from '@logos/OEMs/Audi.svg?url'
import bmwUrl       from '@logos/OEMs/BMW.svg?url'
import cadillacUrl  from '@logos/OEMs/Cadillac.svg?url'
import chevyUrl     from '@logos/OEMs/Chevy.svg?url'
import chryslerUrl  from '@logos/OEMs/Logo container.svg?url'
import dodgeUrl     from '@logos/OEMs/Dodge.svg?url'
import fordUrl      from '@logos/OEMs/Ford.svg?url'
import gmcUrl       from '@logos/OEMs/GMC.svg?url'
import hondaUrl     from '@logos/OEMs/Honda.svg?url'
import hyundaiUrl   from '@logos/OEMs/Hyundai.svg?url'
import jaguarUrl    from '@logos/OEMs/Jaguar.svg?url'
import jeepUrl      from '@logos/OEMs/Jeep.svg?url'
import landRoverUrl from '@logos/OEMs/Land Rover.svg?url'
import lexusUrl     from '@logos/OEMs/Lexus.svg?url'
import mercedesUrl  from '@logos/OEMs/Mercedes.svg?url'
import miniUrl      from '@logos/OEMs/Mini.svg?url'
import nissanUrl    from '@logos/OEMs/Nissan.svg?url'
import porscheUrl   from '@logos/OEMs/Porsche.svg?url'
import ramUrl       from '@logos/OEMs/Ram.svg?url'
import subaruUrl    from '@logos/OEMs/Subary.svg?url'
import toyotaUrl    from '@logos/OEMs/Toyota.svg?url'
import vwUrl        from '@logos/OEMs/VW.svg?url'
import volvoUrl     from '@logos/OEMs/Volvo.svg?url'

const logos = [
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
    <li v-for="logo in logos" :key="logo.id" class="sog__cell">
      <img :src="logo.src" :alt="logo.name" :data-mark="logo.id" class="sog__logo" />
    </li>
    <!-- Empty 24th cell keeps the 4×6 grid shape (row 6 col 4 has no OEM). -->
    <li class="sog__cell sog__cell--empty" aria-hidden="true" />
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
.sog__logo[data-mark="audi"]       { width: 33px; height: 12px; }
.sog__logo[data-mark="bmw"]        { width: 22px; height: 22px; }
.sog__logo[data-mark="cadillac"]   { width: 35px; height: 20px; }
.sog__logo[data-mark="chevy"]      { width: 33px; height: 19px; }

/* Row 2 */
.sog__logo[data-mark="chrysler"]   { width: 35px; height: 20px; }
.sog__logo[data-mark="dodge"]      { width: 31px; height: 12px; }
.sog__logo[data-mark="jeep"]       { width: 55px; height: 15px; }
.sog__logo[data-mark="honda"]      { width: 35px; height: 20px; }

/* Row 3 */
.sog__logo[data-mark="hyundai"]    { width: 40px; height: 40px; }
.sog__logo[data-mark="gmc"]        { width: 38px; height: 10px; }
.sog__logo[data-mark="jaguar"]     { width: 55px; height: 31px; }
.sog__logo[data-mark="ford"]       { width: 37px; height: 14px; }

/* Row 4 */
.sog__logo[data-mark="land-rover"] { width: 34px; height: 18px; }
.sog__logo[data-mark="lexus"]      { width: 23px; height: 22px; }
.sog__logo[data-mark="mercedes"]   { width: 40px; height: 40px; }
.sog__logo[data-mark="mini"]       { width: 34px; height: 15px; }

/* Row 5 */
.sog__logo[data-mark="nissan"]     { width: 27px; height: 23px; }
.sog__logo[data-mark="porsche"]    { width: 63px; height: 11px; }
.sog__logo[data-mark="ram"]        { width: 43px; height: 13px; }
.sog__logo[data-mark="subaru"]     { width: 33px; height: 20px; }

/* Row 6 */
.sog__logo[data-mark="toyota"]     { width: 32px; height: 23px; }
.sog__logo[data-mark="vw"]         { width: 26px; height: 26px; }
.sog__logo[data-mark="volvo"]      { width: 63px; height: 10px; }
</style>
