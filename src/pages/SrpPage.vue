<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter.vue'
import SrpTile from '@/components/SrpTile/SrpTile.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import SeoCarousel from '@/components/SeoCarousel/SeoCarousel.vue'
import SrpFiltersPanel from '@/components/SrpFiltersPanel/SrpFiltersPanel.vue'
import SrpFilterChild from '@/components/SrpFilterChild/SrpFilterChild.vue'
import SrpFilterPill from '@/components/SrpFilterPill/SrpFilterPill.vue'
import SrpPricePaymentFilter from '@/components/SrpPricePaymentFilter/SrpPricePaymentFilter.vue'
import type { SeoCarouselItem } from '@/components/SeoCarousel/SeoCarousel.vue'
import type { FilterCategory } from '@/components/SrpFiltersPanel/SrpFiltersPanel.vue'

import BaseButton from '@/components/BaseButton/BaseButton.vue'
import filterIcon      from '@icons/Style=Display, Detail=Menu, Icon=Menu-Filter.svg?raw'
import closeIcon       from '@icons/Style=Display, Detail=Default, Icon=Close.svg?raw'
import chevronDownIcon from '@icons/Style=Arrows, Detail=No-Tail, Icon=Down.svg?raw'

import coupeIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Coupe.svg?raw'
import convertibleIcon from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Convertible.svg?raw'
import hatchbackIcon   from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Hatchback.svg?raw'
import sedanIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Sedan.svg?raw'
import suvIcon         from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=SUV.svg?raw'
import truckIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Truck.svg?raw'
import vanIcon         from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Van.svg?raw'
import wagonIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Wagon.svg?raw'

/** Same placeholder vehicle photo as `SrpTile.stories.ts` */
const DUMMY_CAR_IMAGE =
  'https://content.homenetiol.com/scaler/400/400/eb9a7bffdd55493f8934eb98a5b0be7c.jpg'

const currentPage = ref(1)
const totalPages = 217

// ─── Filter state ────────────────────────────────────────────────────────────

const activeFilter = ref<string | null>(null)
const selectedBodyStyles  = ref<string[]>([])

/**
 * Snapshot of selectedBodyStyles taken the moment the body-style child panel
 * opens. Items in this list float to the top with the green "returning" style.
 * When a returning item is deselected, it is removed from this list immediately
 * so it slides back to its original position.
 */
const committedBodyStyles = ref<string[]>([])

watch(activeFilter, (newKey) => {
  if (newKey === 'body-style') {
    // Snapshot current selections so they float to top as "returning"
    committedBodyStyles.value = [...selectedBodyStyles.value]
  }
})

const BASE_CATEGORIES = [
  { key: 'distance',   label: 'Distance & shipping',       alwaysSelected: true  },
  { key: 'make',       label: 'Make/Model/Trim'                                   },
  { key: 'body-style', label: 'Body style'                                        },
  { key: 'price',      label: 'Price & payment'                                   },
  { key: 'year',       label: 'Year'                                               },
  { key: 'mileage',    label: 'Mileage'                                            },
  { key: 'features',   label: 'Features'                                           },
  { key: 'mpg',        label: 'MPG & engine type'                                 },
  { key: 'drive',      label: 'Drive type & transmission'                         },
  { key: 'color',      label: 'Color'                                              },
]

const filterCategories = computed<FilterCategory[]>(() =>
  BASE_CATEGORIES.map(c => ({
    key:          c.key,
    label:        c.label,
    hasSelection: c.alwaysSelected === true
      || (c.key === 'body-style' && selectedBodyStyles.value.length > 0)
      || (c.key === 'price'      && isPriceFiltered.value),
  })),
)

// ─── Body style options ───────────────────────────────────────────────────────

const bodyStyleOptions = [
  { value: 'coupe',       label: 'Coupe',       count: 102,  icon: coupeIcon },
  { value: 'convertible', label: 'Convertible', count: 66,   icon: convertibleIcon },
  { value: 'hatchback',   label: 'Hatchback',   count: 87,   icon: hatchbackIcon },
  { value: 'sedan',       label: 'Sedan',       count: 3102, icon: sedanIcon },
  { value: 'suv',         label: 'SUV',         count: 124,  icon: suvIcon },
  { value: 'truck',       label: 'Truck',       count: 573,  icon: truckIcon },
  { value: 'van',         label: 'Van/Minivan', count: 77,   icon: vanIcon },
  { value: 'wagon',       label: 'Wagon',       count: 2,    icon: wagonIcon },
]

function toggleBodyStyle(value: string, on: boolean) {
  if (on) {
    selectedBodyStyles.value = [...selectedBodyStyles.value, value]
  } else {
    selectedBodyStyles.value = selectedBodyStyles.value.filter(v => v !== value)
    // Remove from committed so the item immediately returns to its original position
    committedBodyStyles.value = committedBodyStyles.value.filter(v => v !== value)
  }
}

// ─── Price & Payment filter state ────────────────────────────

// Absolute bounds (would come from the API in production)
const PRICE_ABS_MIN   =  5_000
const PRICE_ABS_MAX   = 70_000
const PAYMENT_ABS_MIN =    250
const PAYMENT_ABS_MAX =  1_250

const priceMin   = ref(PRICE_ABS_MIN)
const priceMax   = ref(PRICE_ABS_MAX)
const paymentMin = ref(PAYMENT_ABS_MIN)
const paymentMax = ref(PAYMENT_ABS_MAX)

// Committed values — only update when the user releases the slider or blurs an input.
// Pills are driven by these so they don't flash during dragging.
const committedPriceMin   = ref(PRICE_ABS_MIN)
const committedPriceMax   = ref(PRICE_ABS_MAX)
const committedPaymentMin = ref(PAYMENT_ABS_MIN)
const committedPaymentMax = ref(PAYMENT_ABS_MAX)

type PricePaymentCommit = {
  priceMin: number; priceMax: number; paymentMin: number; paymentMax: number
}
function onPricePaymentCommit(p: PricePaymentCommit) {
  committedPriceMin.value   = p.priceMin
  committedPriceMax.value   = p.priceMax
  committedPaymentMin.value = p.paymentMin
  committedPaymentMax.value = p.paymentMax
}

const isPriceRangeFiltered = computed(
  () => committedPriceMin.value !== PRICE_ABS_MIN || committedPriceMax.value !== PRICE_ABS_MAX,
)
const isPaymentFiltered = computed(
  () => committedPaymentMin.value !== PAYMENT_ABS_MIN || committedPaymentMax.value !== PAYMENT_ABS_MAX,
)
const isPriceFiltered = computed(
  () => isPriceRangeFiltered.value || isPaymentFiltered.value,
)

function fmtPillAmt(n: number): string {
  return '$' + n.toLocaleString('en-US')
}
const pricePillLabel = computed(
  () => `${fmtPillAmt(committedPriceMin.value)} – ${fmtPillAmt(committedPriceMax.value)}`,
)
const paymentPillLabel = computed(
  () => `${fmtPillAmt(committedPaymentMin.value)} – ${fmtPillAmt(committedPaymentMax.value)}/mo`,
)

function resetPriceRange() {
  priceMin.value   = PRICE_ABS_MIN
  priceMax.value   = PRICE_ABS_MAX
  committedPriceMin.value = PRICE_ABS_MIN
  committedPriceMax.value = PRICE_ABS_MAX
}
function resetPayment() {
  paymentMin.value   = PAYMENT_ABS_MIN
  paymentMax.value   = PAYMENT_ABS_MAX
  committedPaymentMin.value = PAYMENT_ABS_MIN
  committedPaymentMax.value = PAYMENT_ABS_MAX
}

function resetFilters() {
  selectedBodyStyles.value  = []
  priceMin.value            = PRICE_ABS_MIN
  priceMax.value            = PRICE_ABS_MAX
  paymentMin.value          = PAYMENT_ABS_MIN
  paymentMax.value          = PAYMENT_ABS_MAX
  committedPriceMin.value   = PRICE_ABS_MIN
  committedPriceMax.value   = PRICE_ABS_MAX
  committedPaymentMin.value = PAYMENT_ABS_MIN
  committedPaymentMax.value = PAYMENT_ABS_MAX
}

const bodyStylePills = computed(() =>
  selectedBodyStyles.value.map(v => ({
    key:   v,
    label: bodyStyleOptions.find(o => o.value === v)?.label ?? v,
  })),
)

/**
 * When the body-style panel opens with prior selections, those items float to
 * the top (returning state). All others follow in their original order.
 * While the panel is open and new items are selected, they stay in their
 * original position (no immediate reorder).
 */
const sortedBodyStyleOptions = computed(() => {
  const committed = committedBodyStyles.value
  if (committed.length === 0) return bodyStyleOptions
  const top    = bodyStyleOptions.filter(o =>  committed.includes(o.value))
  const bottom = bodyStyleOptions.filter(o => !committed.includes(o.value))
  return [...top, ...bottom]
})

interface VehicleListing {
  id: number
  year: string
  mileage: string
  stockNumber: string
  title: string
  price: string
  monthlyPayment: string
  deliveryLabel: string
  deliveryStore: string
  deliveryDistance: string
  imageUrl: string
  favorited: boolean
}

const listings = ref<VehicleListing[]>(
  Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    year: '2020',
    mileage: '126k mi',
    stockNumber: 'PDW077969',
    title: 'Lamborghini Aventador LP 750-4 Superveloce Roadster SE',
    price: '30,499',
    monthlyPayment: '$250—$1,450/mo',
    deliveryLabel: 'Pick up today at',
    deliveryStore: 'SW Houston store',
    deliveryDistance: '125 mi',
    imageUrl: DUMMY_CAR_IMAGE,
    favorited: false,
  }))
)

const sortOption = ref('Distance: Nearest')
const showSortDropdown = ref(false)
const showSortDropdownMobile = ref(false)
const sortOptions = ['Distance: Nearest', 'Price: Low to High', 'Price: High to Low', 'Mileage: Low to High', 'Year: Newest']

function selectSort(option: string) {
  sortOption.value = option
  showSortDropdown.value = false
  showSortDropdownMobile.value = false
}

const showMobileFilters = ref(false)

function openMobileFilters() {
  showMobileFilters.value = true
}

function closeMobileFilters() {
  showMobileFilters.value = false
  // Return to the parent filter level on close (per Figma annotation)
  activeFilter.value = null
}

// Lock body scroll while the drawer is open so only the drawer scrolls
watch(showMobileFilters, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// Clean up if the component unmounts while the drawer is open
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

function closeAllSortMenus() {
  showSortDropdown.value = false
  showSortDropdownMobile.value = false
}

onMounted(() => document.addEventListener('click', closeAllSortMenus))
onBeforeUnmount(() => document.removeEventListener('click', closeAllSortMenus))

const seoByMake: SeoCarouselItem[] = [
  { label: 'Used Jaguar', href: '#' },
  { label: 'Used Mitsubishi', href: '#' },
  { label: 'Used Mazda', href: '#' },
  { label: 'Used Ram', href: '#' },
  { label: 'Used Toyota', href: '#' },
  { label: 'Used Audi', href: '#' },
  { label: 'Used Cadillac', href: '#' },
  { label: 'Used Acura', href: '#' },
  { label: 'Used Buick', href: '#' },
  { label: 'Used Chrysler', href: '#' },
  { label: 'Used Ford', href: '#' },
  { label: 'Used Honda', href: '#' },
  { label: 'Used Dodge', href: '#' },
]

const seoByBody: SeoCarouselItem[] = [
  { label: 'Used Convertibles', href: '#' },
  { label: 'Used Hatchbacks', href: '#' },
  { label: 'Used SUVs', href: '#' },
  { label: 'Used Coupes', href: '#' },
  { label: 'Used Sedans', href: '#' },
  { label: 'Used Minivans/Vans', href: '#' },
  { label: 'Crossovers', href: '#' },
  { label: 'Trucks', href: '#' },
  { label: 'Wagons', href: '#' },
]

const shipToStoreFilterActive = ref(true)

function toggleFavorite(index: number) {
  listings.value[index].favorited = !listings.value[index].favorited
}

</script>

<template>
  <div class="srp-page">
    <!-- Header -->
    <GlobalHeader variant="global-search" zipCode="75214" phoneNumber="(877) 708-4049" />

    <!-- Main content -->
    <div class="srp-page__main">
      <!-- Left sidebar filters -->
      <aside class="srp-page__sidebar">
        <div class="srp-page__sidebar-sticky">
          <SrpFiltersPanel
            :categories="filterCategories"
            v-model="activeFilter"
            @reset="resetFilters"
          >
            <template #child="{ activeFilter }">
              <!-- Body style -->
              <template v-if="activeFilter === 'body-style'">
                <SrpFilterChild
                  v-for="opt in sortedBodyStyleOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :count="opt.count"
                  :selected="selectedBodyStyles.includes(opt.value)"
                  :returning="committedBodyStyles.includes(opt.value) && selectedBodyStyles.includes(opt.value)"
                  @update:selected="toggleBodyStyle(opt.value, $event)"
                >
                  <template #trailing-icon>
                    <span
                      class="srp-page__body-icon"
                      :class="{ 'srp-page__body-icon--green': selectedBodyStyles.includes(opt.value) }"
                      aria-hidden="true"
                      v-html="opt.icon"
                    />
                  </template>
                </SrpFilterChild>
              </template>

              <!-- Price & payment -->
              <template v-else-if="activeFilter === 'price'">
                <SrpPricePaymentFilter
                  :priceAbsMin="PRICE_ABS_MIN"
                  :priceAbsMax="PRICE_ABS_MAX"
                  v-model:priceMin="priceMin"
                  v-model:priceMax="priceMax"
                  :paymentAbsMin="PAYMENT_ABS_MIN"
                  :paymentAbsMax="PAYMENT_ABS_MAX"
                  v-model:paymentMin="paymentMin"
                  v-model:paymentMax="paymentMax"
                  @commit="onPricePaymentCommit"
                />
              </template>

              <!-- Placeholder for unimplemented child filters -->
              <template v-else-if="activeFilter">
                <div class="srp-page__filter-placeholder">
                  {{ filterCategories.find(c => c.key === activeFilter)?.label }} filter coming soon.
                </div>
              </template>
            </template>
          </SrpFiltersPanel>
        </div>
      </aside>

      <!-- Right content area -->
      <div class="srp-page__content">

        <!-- Filter/Sort bar — collapsed layout (≤1239px only) -->
        <div class="srp-page__filter-sort-bar">
          <button
            class="srp-page__fsb-filter-btn"
            type="button"
            @click="openMobileFilters"
          >
            <span class="srp-page__fsb-icon" v-html="filterIcon" aria-hidden="true" />
            <span class="srp-page__fsb-label">Filters</span>
          </button>

          <div class="srp-page__fsb-divider" aria-hidden="true" />

          <div class="srp-page__fsb-sort-wrapper" @click.stop>
            <button
              class="srp-page__fsb-sort-btn"
              type="button"
              :aria-expanded="showSortDropdownMobile"
              aria-haspopup="listbox"
              @click="showSortDropdownMobile = !showSortDropdownMobile"
            >
              <span class="srp-page__fsb-sort-meta">Sort by</span>
              <span class="srp-page__fsb-sort-value-row">
                <span class="srp-page__fsb-sort-value">{{ sortOption }}</span>
                <span class="srp-page__sort-chevron" aria-hidden="true" v-html="chevronDownIcon" />
              </span>
            </button>
            <ul
              v-if="showSortDropdownMobile"
              class="srp-page__sort-menu"
              role="listbox"
            >
              <li
                v-for="opt in sortOptions"
                :key="opt"
                role="option"
                :aria-selected="opt === sortOption"
                class="srp-page__sort-option"
                :class="{ 'srp-page__sort-option--active': opt === sortOption }"
                @click="selectSort(opt)"
              >{{ opt }}</li>
            </ul>
          </div>
        </div>

        <!-- Active filter chips -->
        <div class="srp-page__chips-bar">
          <div class="srp-page__chips">
            <SrpFilterPill
              variant="location"
              zipCode="75214"
              distanceLabel="Cars within 100 mi"
            />
            <SrpFilterPill
              v-if="shipToStoreFilterActive"
              variant="dismissible"
              label="Ship to store"
              @dismiss="shipToStoreFilterActive = false"
            />
            <SrpFilterPill
              v-for="pill in bodyStylePills"
              :key="pill.key"
              variant="dismissible"
              :label="pill.label"
              @dismiss="toggleBodyStyle(pill.key, false)"
            />
            <SrpFilterPill
              v-if="isPriceRangeFiltered"
              variant="dismissible"
              :label="pricePillLabel"
              @dismiss="resetPriceRange"
            />
            <SrpFilterPill
              v-if="isPaymentFiltered"
              variant="dismissible"
              :label="paymentPillLabel"
              @dismiss="resetPayment"
            />
          </div>
        </div>

        <!-- Results area -->
        <div class="srp-page__results">
          <!-- Results header -->
          <div class="srp-page__results-header">
            <div class="srp-page__results-count">
              2,110 used cars at EchoPark
            </div>
            <div class="srp-page__sort">
              <span class="srp-page__sort-label">Sort by</span>
              <div class="srp-page__sort-dropdown-wrapper" @click.stop>
                <button
                  class="srp-page__sort-trigger"
                  type="button"
                  :aria-expanded="showSortDropdown"
                  aria-haspopup="listbox"
                  @click="showSortDropdown = !showSortDropdown"
                >
                  <span class="srp-page__sort-value">{{ sortOption }}</span>
                  <span class="srp-page__sort-chevron" aria-hidden="true" v-html="chevronDownIcon" />
                </button>
                <ul
                  v-if="showSortDropdown"
                  class="srp-page__sort-menu"
                  role="listbox"
                >
                  <li
                    v-for="opt in sortOptions"
                    :key="opt"
                    role="option"
                    :aria-selected="opt === sortOption"
                    class="srp-page__sort-option"
                    :class="{ 'srp-page__sort-option--active': opt === sortOption }"
                    @click="selectSort(opt)"
                  >
                    {{ opt }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Vehicle tile grid — column count per Figma SRP responsive spec -->
          <div class="srp-page__grid">
            <SrpTile
              v-for="(car, index) in listings"
              :key="car.id"
              :year="car.year"
              :mileage="car.mileage"
              :stockNumber="car.stockNumber"
              :title="car.title"
              :price="car.price"
              :monthlyPayment="car.monthlyPayment"
              :deliveryLabel="car.deliveryLabel"
              :deliveryStore="car.deliveryStore"
              :deliveryDistance="car.deliveryDistance"
              :imageUrl="car.imageUrl"
              :favorited="car.favorited"
              :imageCount="5"
              href="#"
              @update:favorited="toggleFavorite(index)"
            />
          </div>

          <!-- Pagination + Bottom -->
          <div class="srp-page__bottom">
            <div class="srp-page__pagination">
              <Pagination v-model="currentPage" :totalPages="totalPages" />
            </div>

            <!-- SEO Carousels -->
            <div class="srp-page__seo-section">
              <SeoCarousel heading="Used cars by make" :items="seoByMake" />
            </div>

            <div class="srp-page__seo-section">
              <SeoCarousel heading="Used cars by body style" :items="seoByBody" />
            </div>

            <!-- Legal disclaimer -->
            <div class="srp-page__legal">
              <p>
                EchoPark advertised pricing is subject to the following based on the vehicle's physical location: in
                <strong>AL</strong>, price excludes required taxes, tag, title, other governmental fees, and a $699 documentary fee; in
                <strong>AZ</strong>, price excludes required taxes, tag, title, other governmental fees, and a $699 documentary fee; in
                <strong>CA</strong>, price excludes government fees and taxes, any finance charges, any dealer document processing charge ($85), any electronic filing charge, and any emission testing charge; in
                <strong>CO</strong>, price excludes required taxes, tag, title, other governmental fees, and registration fees; in
                <strong>GA</strong>, price excludes required taxes, tag, title, and other governmental fees; in
                <strong>MO</strong>, price excludes required taxes, tag, title, other governmental fees, and a $604.47 administrative fee; in
                <strong>NC</strong>, price excludes required taxes, tag, title, and a $799 administrative fee as regulated by N.C.G.S. 20-101.1; in
                <strong>NV</strong>, price excludes required taxes, tag, title, other governmental fees, and a $699 documentary fee; in
                <strong>TN</strong>, price excludes required taxes, tag, other governmental fees, and a $699 processing fee; and in
                <strong>TX</strong>, price excludes required taxes, tag, title, and a $225 documentary fee.
              </p>
              <p>
                We have taken reasonable efforts to ensure display of accurate data; however, the information shown may contain errors and omissions, may not reflect all vehicle items and accessories, and errors with regard to pricing may occur. All displayed inventory is subject to prior sale and all prices expire at midnight on the date displayed. Price shown is for the state in which Dealer is physically located and if transferred to another state, the price may change. Dealer is not responsible for any errors but should be consulted in person to confirm the information on this page.
              </p>
              <p class="srp-page__legal--caps">
                USED VEHICLES MAY BE SUBJECT TO UNREPAIRED MANUFACTURER RECALLS. PLEASE CONTACT THE MANUFACTURER OR A DEALER FOR THAT LINE MAKE FOR RECALL ASSISTANCE/QUESTIONS OR CHECK THE NATIONAL HIGHWAY TRAFFIC SAFETY ADMINISTRATION WEBSITE FOR CURRENT RECALL INFORMATION BEFORE PURCHASING.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <GlobalFooter phoneNumber="(877) 708-4049" />

    <!-- ─── Mobile filter drawer (≤1239px) ──────────────────── -->
    <Teleport to="body">
      <!-- Backdrop -->
      <div
        class="srp-mobile-drawer__backdrop"
        :class="{ 'srp-mobile-drawer__backdrop--visible': showMobileFilters }"
        aria-hidden="true"
        @click="closeMobileFilters"
      />

      <!-- Drawer panel -->
      <div
        class="srp-mobile-drawer"
        :class="{ 'srp-mobile-drawer--open': showMobileFilters }"
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <!-- Header row -->
        <div class="srp-mobile-drawer__header">
          <div class="srp-mobile-drawer__title">
            <span class="srp-mobile-drawer__filter-icon" aria-hidden="true" v-html="filterIcon" />
            <span class="srp-mobile-drawer__title-text">Filters</span>
          </div>
          <button
            class="srp-mobile-drawer__close-btn"
            type="button"
            aria-label="Close filters"
            @click="closeMobileFilters"
          >
            <span class="srp-mobile-drawer__close-icon" aria-hidden="true" v-html="closeIcon" />
          </button>
        </div>

        <!-- Scrollable body -->
        <div class="srp-mobile-drawer__body">

          <!-- Active filter pills -->
          <div class="srp-mobile-drawer__pills">
            <SrpFilterPill
              variant="location"
              zipCode="75214"
              distanceLabel="Cars within 100 mi"
            />
            <div class="srp-mobile-drawer__pill-row">
              <SrpFilterPill
                v-if="shipToStoreFilterActive"
                variant="dismissible"
                label="Ship to store"
                @dismiss="shipToStoreFilterActive = false"
              />
              <SrpFilterPill
                v-for="pill in bodyStylePills"
                :key="pill.key"
                variant="dismissible"
                :label="pill.label"
                @dismiss="toggleBodyStyle(pill.key, false)"
              />
              <SrpFilterPill
                v-if="isPriceRangeFiltered"
                variant="dismissible"
                :label="pricePillLabel"
                @dismiss="resetPriceRange"
              />
              <SrpFilterPill
                v-if="isPaymentFiltered"
                variant="dismissible"
                :label="paymentPillLabel"
                @dismiss="resetPayment"
              />
            </div>
          </div>

          <!-- Reset link -->
          <div class="srp-mobile-drawer__reset-row">
            <button class="srp-mobile-drawer__reset-btn" type="button" @click="resetFilters">
              Reset
            </button>
          </div>

          <!-- Filter panel — header hidden, drawer provides its own -->
          <SrpFiltersPanel
            :categories="filterCategories"
            :hideHeader="true"
            v-model="activeFilter"
            @reset="resetFilters"
          >
            <template #child="{ activeFilter: mobileActiveFilter }">
              <template v-if="mobileActiveFilter === 'body-style'">
                <SrpFilterChild
                  v-for="opt in sortedBodyStyleOptions"
                  :key="opt.value"
                  :label="opt.label"
                  :count="opt.count"
                  :selected="selectedBodyStyles.includes(opt.value)"
                  :returning="committedBodyStyles.includes(opt.value) && selectedBodyStyles.includes(opt.value)"
                  @update:selected="toggleBodyStyle(opt.value, $event)"
                >
                  <template #trailing-icon>
                    <span
                      class="srp-page__body-icon"
                      :class="{ 'srp-page__body-icon--green': selectedBodyStyles.includes(opt.value) }"
                      aria-hidden="true"
                      v-html="opt.icon"
                    />
                  </template>
                </SrpFilterChild>
              </template>
              <template v-else-if="mobileActiveFilter === 'price'">
                <SrpPricePaymentFilter
                  :priceAbsMin="PRICE_ABS_MIN"
                  :priceAbsMax="PRICE_ABS_MAX"
                  v-model:priceMin="priceMin"
                  v-model:priceMax="priceMax"
                  :paymentAbsMin="PAYMENT_ABS_MIN"
                  :paymentAbsMax="PAYMENT_ABS_MAX"
                  v-model:paymentMin="paymentMin"
                  v-model:paymentMax="paymentMax"
                  @commit="onPricePaymentCommit"
                />
              </template>
              <template v-else-if="mobileActiveFilter">
                <div class="srp-page__filter-placeholder">
                  {{ filterCategories.find(c => c.key === mobileActiveFilter)?.label }} filter coming soon.
                </div>
              </template>
            </template>
          </SrpFiltersPanel>
        </div>

        <!-- Sticky footer CTA -->
        <div class="srp-mobile-drawer__footer">
          <BaseButton
            variant="primary"
            size="md"
            label="View 85 results"
            style="width: 100%"
            @click="closeMobileFilters"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.srp-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-neutral-100);
}

/* ─── Main layout ───────────────────────────────────────── */
.srp-page__main {
  display: flex;
  flex: 1;
}

/* ─── Left sidebar ──────────────────────────────────────── */
.srp-page__sidebar {
  width: 306px;
  flex-shrink: 0;
  border-right: var(--border-width-hairline) solid var(--color-neutral-90);
  background: var(--color-neutral-100);
}

.srp-page__sidebar-sticky {
  position: sticky;
  top: 0;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden; /* SrpFiltersPanel's own overflow:hidden clips the slide animation */
}

/* ─── Body style trailing icon (vehicle silhouette) ──────── */
.srp-page__body-icon {
  display: inline-flex;
  width: 48px;
  align-items: center;
  justify-content: flex-end;
}

.srp-page__body-icon :deep(svg) {
  width: 48px;
  height: auto;
  max-height: 24px;
}

.srp-page__body-icon :deep(path),
.srp-page__body-icon :deep(rect),
.srp-page__body-icon :deep(polygon) {
  fill: var(--color-neutral-0);
}

/* Green icon when the item is selected or returning */
.srp-page__body-icon--green :deep(path),
.srp-page__body-icon--green :deep(rect),
.srp-page__body-icon--green :deep(polygon) {
  fill: var(--color-action-primary);
}

/* ─── Placeholder for unimplemented child filters ────────── */
.srp-page__filter-placeholder {
  padding: 24px;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  color: var(--color-neutral-40);
}

/* ─── Right content ─────────────────────────────────────── */
.srp-page__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* ─── Filter pills bar ──────────────────────────────────── */
.srp-page__chips-bar {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-neutral-90);
  background: var(--color-neutral-100);
}

.srp-page__chips {
  display: flex;
  gap: var(--spacing-micro);
  flex-wrap: wrap;
  align-items: center;
}

/* ─── Results area ──────────────────────────────────────── */
.srp-page__results {
  flex: 1;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #f5f5f5;
}

.srp-page__results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.srp-page__results-count {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
}

/* ─── Sort dropdown ─────────────────────────────────────── */
.srp-page__sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.srp-page__sort-label {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-neutral-40);
  white-space: nowrap;
}

.srp-page__sort-dropdown-wrapper {
  position: relative;
}

.srp-page__sort-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-quarck);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-accent-40);
}

.srp-page__sort-value {
  color: var(--color-accent-40);
}

.srp-page__sort-trigger:hover .srp-page__sort-value {
  text-decoration: underline;
  text-decoration-skip-ink: none;
}

.srp-page__sort-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.srp-page__sort-chevron :deep(svg) {
  display: block;
  width: 24px;
  height: 24px;
}

.srp-page__sort-chevron :deep(path) {
  fill: currentColor;
}

.srp-page__sort-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  min-width: 200px;
  margin: 4px 0 0;
  padding: 4px 0;
  list-style: none;
  background: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-90);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-level-2);
}

.srp-page__sort-option {
  padding: 10px 16px;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-body-sm-line-height);
  color: var(--color-neutral-0);
  cursor: pointer;
}

.srp-page__sort-option:hover {
  background: var(--color-neutral-95);
}

.srp-page__sort-option--active {
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-40);
}

/* ─── Filter/Sort bar (≤1239px collapsed layout) ────────── */
.srp-page__filter-sort-bar {
  display: none;                           /* hidden on desktop */
  flex-shrink: 0;
  height: 50px;
  background: var(--color-neutral-100);
  border-bottom: 1px solid var(--color-neutral-90);
}

.srp-page__fsb-filter-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.srp-page__fsb-icon {
  display: inline-flex;
  align-items: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  line-height: 0;
}

.srp-page__fsb-icon :deep(svg) {
  display: block;
  width: 18px;
  height: 18px;
}

.srp-page__fsb-icon :deep(path) {
  fill: var(--color-accent-40);
}

.srp-page__fsb-label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent-40);
  white-space: nowrap;
}

.srp-page__fsb-divider {
  width: 1px;
  height: 100%;
  background: var(--color-neutral-90);
  flex-shrink: 0;
}

.srp-page__fsb-sort-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.srp-page__fsb-sort-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.srp-page__fsb-sort-meta {
  font-family: var(--font-family-base);
  font-size: var(--text-label-size);
  font-weight: var(--font-weight-regular);
  line-height: var(--text-label-line-height);
  letter-spacing: var(--text-label-letter-spacing);
  color: var(--color-neutral-0);
}

.srp-page__fsb-sort-value-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.srp-page__fsb-sort-value {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  color: var(--color-accent-40);
  white-space: nowrap;
}

/* ─── Collapsed layout breakpoint ───────────────────────── */
@media (max-width: 1239px) {
  .srp-page__sidebar {
    display: none;
  }
  .srp-page__filter-sort-bar {
    display: flex;
  }
  .srp-page__results-count {
    flex: 1;
    text-align: center;
  }
  .srp-page__sort {
    display: none;
  }
}

/* ─── Tile grid (Figma: Screen size → columns) ─────────────
   ≤624px: 1 · 625–979: 2 · 980–1534: 3 · ≥1535: 4
   Columns cap at the tile max-width (420px); extra space
   accumulates on the right instead of stretching tiles. */
.srp-page__grid {
  display: grid;
  grid-template-columns: minmax(0, 420px);
  justify-content: center;
  gap: 16px;
}

@media (min-width: 625px) {
  .srp-page__grid {
    grid-template-columns: repeat(2, minmax(0, 420px));
    justify-content: start;
  }
}

@media (min-width: 980px) {
  .srp-page__grid {
    grid-template-columns: repeat(3, minmax(0, 420px));
  }
}

@media (min-width: 1535px) {
  .srp-page__grid {
    grid-template-columns: repeat(4, minmax(0, 420px));
  }
}

/* ─── Bottom section ────────────────────────────────────── */
.srp-page__bottom {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding-top: 24px;
}

.srp-page__pagination {
  display: flex;
  justify-content: center;
}

.srp-page__seo-section {
  width: 100%;
}

/* ─── Legal ─────────────────────────────────────────────── */
.srp-page__legal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-regular);
  line-height: 16px;
  letter-spacing: 0.2px;
  color: var(--color-neutral-40);
}

.srp-page__legal p {
  margin: 0;
}

.srp-page__legal strong {
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-0);
}

.srp-page__legal--caps {
  text-transform: uppercase;
}

/* ─── Mobile filter drawer ──────────────────────────────── */

/* Backdrop scrim */
.srp-mobile-drawer__backdrop {
  position: fixed;
  inset: 0;
  z-index: 299;
  background: rgba(36, 44, 51, 0.5);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.srp-mobile-drawer__backdrop--visible {
  opacity: 1;
  pointer-events: auto;
}

/* Drawer panel */
.srp-mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  z-index: 300;
  background: var(--color-neutral-100);
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

@media (max-width: 624px) {
  .srp-mobile-drawer {
    max-width: 100%;
  }
}

.srp-mobile-drawer--open {
  transform: translateX(0);
}

/* Header row */
.srp-mobile-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  height: 76px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.srp-mobile-drawer__title {
  display: flex;
  align-items: center;
  gap: var(--spacing-nano);   /* 8px */
}

.srp-mobile-drawer__title-text {
  font-family: var(--font-family-base);
  font-size: var(--text-body-lg-size);
  font-weight: var(--font-weight-bold);
  line-height: var(--text-body-lg-line-height);
  color: var(--color-neutral-0);
}

.srp-mobile-drawer__filter-icon {
  display: inline-flex;
  align-items: center;
  width: 24px;
  height: 24px;
  line-height: 0;
  flex-shrink: 0;
}

.srp-mobile-drawer__filter-icon :deep(svg) { width: 24px; height: 24px; }
.srp-mobile-drawer__filter-icon :deep(path) { fill: var(--color-neutral-0); }

.srp-mobile-drawer__close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.srp-mobile-drawer__close-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

.srp-mobile-drawer__close-icon {
  display: inline-flex;
  width: 24px;
  height: 24px;
  line-height: 0;
}

.srp-mobile-drawer__close-icon :deep(svg) { width: 24px; height: 24px; }
.srp-mobile-drawer__close-icon :deep(path) { fill: var(--color-neutral-0); }

/* Scrollable body */
.srp-mobile-drawer__body {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* iOS momentum scroll */
  display: flex;
  flex-direction: column;
  min-height: 0;
}

/* Pills area */
.srp-mobile-drawer__pills {
  padding: 0 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-nano);   /* 8px */
}

/* Row of dismissible pills (wraps onto new line) */
.srp-mobile-drawer__pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-nano);   /* 8px */
  align-items: center;
}

/* Reset row */
.srp-mobile-drawer__reset-row {
  padding: 0 24px 16px;
  border-bottom: var(--border-width-hairline) solid var(--color-neutral-90);
}

.srp-mobile-drawer__reset-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  color: var(--color-action-accent);
}

.srp-mobile-drawer__reset-btn:hover {
  text-decoration: underline;
}

.srp-mobile-drawer__reset-btn:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Sticky footer CTA */
.srp-mobile-drawer__footer {
  padding: 16px;
  flex-shrink: 0;
  background: var(--color-neutral-100);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.14);
}
</style>
