<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    brandName?: string
    phoneNumber?: string
  }>(),
  { brandName: 'EchoPark', phoneNumber: '(877) 708-4049' },
)

const isSonic = computed(() => props.brandName.toLowerCase().includes('sonic'))

const headerLogoUrl = computed(() =>
  isSonic.value ? saLogoDefaultUrl : undefined
)

const headerNavLinks = computed<NavLink[] | undefined>(() =>
  isSonic.value
    ? [
        { label: 'New cars' },
        { label: 'Used cars' },
        { label: 'Sell your car' },
        { label: 'More', dropdown: true },
      ]
    : undefined
)

const footerLogoUrl = computed(() =>
  isSonic.value ? saLogoDefaultUrl : undefined
)

const footerLinkColumns = computed<FooterLinkColumn[] | undefined>(() =>
  isSonic.value
    ? [
        {
          heading: 'Shop',
          links: [
            { label: 'New vehicles', href: '#' },
            { label: 'Used vehicles', href: '#' },
            { label: 'Sell your car', href: '#' },
            { label: 'Finance', href: '#' },
            { label: 'Service & parts', href: '#' },
            { label: 'Special offers', href: '#' },
          ],
        },
        {
          heading: 'About',
          links: [
            { label: 'Find a dealership', href: '#' },
            { label: 'About Sonic Automotive', href: '#' },
            { label: 'Reviews', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Investor relations', href: '#' },
          ],
        },
        {
          heading: 'Support',
          links: [
            { label: 'Help center', href: '#' },
            { label: 'Contact us', href: '#' },
            { label: 'Accessibility', href: '#' },
            { label: 'Manage cookies', href: '#' },
            { label: 'Sitemap', href: '#' },
          ],
        },
      ]
    : undefined
)

const footerSocialLinks = computed<SocialLink[] | undefined>(() =>
  isSonic.value
    ? [
        { platform: 'facebook',  href: 'https://facebook.com/sonicautomotive',  ariaLabel: 'Facebook' },
        { platform: 'x',         href: 'https://x.com/sonicautomotive',         ariaLabel: 'X' },
        { platform: 'youtube',   href: 'https://youtube.com/sonicautomotive',   ariaLabel: 'YouTube' },
        { platform: 'instagram', href: 'https://instagram.com/sonicautomotive', ariaLabel: 'Instagram' },
      ]
    : undefined
)

const footerLegalLinks = computed<LegalLink[] | undefined>(() =>
  isSonic.value
    ? [
        { label: 'Privacy policy', href: '#' },
        { label: 'Terms of use',   href: '#' },
      ]
    : undefined
)

const footerTrustBadges = computed(() =>
  isSonic.value ? [] : undefined
)

const footerCopyrightText = computed(() =>
  isSonic.value
    ? `Copyright \u00A9 2026 Sonic Automotive, Inc. All Rights Reserved.`
    : undefined
)

import GlobalHeader from '@/components/GlobalHeader/GlobalHeader.vue'
import type { NavLink } from '@/components/GlobalHeader/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter/GlobalFooter.vue'
import type { FooterLinkColumn, SocialLink, LegalLink } from '@/components/GlobalFooter/GlobalFooter.vue'

import saLogoDefaultUrl from '@logos/Color=SA-FullColor.svg?url'

import SrpTile from '@/components/SrpTile/SrpTile.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import SeoCarousel from '@/components/SeoCarousel/SeoCarousel.vue'
import SrpFiltersPanel from '@/components/SrpFiltersPanel/SrpFiltersPanel.vue'
import SrpFilterChild from '@/components/SrpFilterChild/SrpFilterChild.vue'
import SrpFilterMakeModelTrim from '@/components/SrpFilterMakeModelTrim/SrpFilterMakeModelTrim.vue'
import SrpFilterPill from '@/components/SrpFilterPill/SrpFilterPill.vue'
import SrpPricePaymentFilter from '@/components/SrpPricePaymentFilter/SrpPricePaymentFilter.vue'
import SrpFilterYear from '@/components/SrpFilterYear/SrpFilterYear.vue'
import SrpFilterMileage from '@/components/SrpFilterMileage/SrpFilterMileage.vue'
import SrpFilterFeatures from '@/components/SrpFilterFeatures/SrpFilterFeatures.vue'
import type { FeatureOption } from '@/components/SrpFilterFeatures/SrpFilterFeatures.vue'
import SrpFilterMpgEngine from '@/components/SrpFilterMpgEngine/SrpFilterMpgEngine.vue'
import type { EngineTypeOption } from '@/components/SrpFilterMpgEngine/SrpFilterMpgEngine.vue'
import SrpFilterDriveTrans from '@/components/SrpFilterDriveTrans/SrpFilterDriveTrans.vue'
import type { DriveTransOption } from '@/components/SrpFilterDriveTrans/SrpFilterDriveTrans.vue'
import SrpFilterColor from '@/components/SrpFilterColor/SrpFilterColor.vue'
import type { ColorOption } from '@/components/SrpFilterColor/SrpFilterColor.vue'
import SrpFilterCondition from '@/components/SrpFilterCondition/SrpFilterCondition.vue'
import type { ConditionOption } from '@/components/SrpFilterCondition/SrpFilterCondition.vue'

import thirdRowSeatIcon  from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=3rd Row Seat.svg?raw'
import backupCameraIcon  from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Backup Camera.svg?raw'
import blindSpotIcon     from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Blind Spot.svg?raw'
import heatedSeatsIcon   from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Heated Seats.svg?raw'
import leatherSeatsIcon  from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Leather Seats.svg?raw'
import sunroofIcon       from '@icons/Icon Type=Vehicle Descriptors, Size=Large, Theme=Sunroof Moonroof.svg?raw'
import SrpFilterDistance from '@/components/SrpFilterDistance/SrpFilterDistance.vue'
import type { DistanceStoreItem } from '@/components/SrpFilterDistance/SrpFilterDistance.vue'
import type { LocationStoreItem } from '@/components/SrpLocationFlyIn/SrpLocationFlyIn.vue'
import type { SeoCarouselItem } from '@/components/SeoCarousel/SeoCarousel.vue'
import type { FilterCategory } from '@/components/SrpFiltersPanel/SrpFiltersPanel.vue'
import type { MakeItem } from '@/components/SrpFilterMakeModelTrim/SrpFilterMakeModelTrim.vue'

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

// ─── Makes / Models / Trims data ─────────────────────────────────────────────

const MAKES_DATA: MakeItem[] = [
  { value: 'Acura',     count: 34,  models: [{ value: 'ILX', count: 12, trims: [{ value: 'Premium', count: 8 }, { value: 'Technology', count: 4 }] }, { value: 'MDX', count: 10, trims: [] }, { value: 'RDX', count: 8, trims: [] }, { value: 'TLX', count: 4, trims: [{ value: '2.4L', count: 2 }, { value: 'V6 SH-AWD', count: 2 }] }] },
  { value: 'Audi',      count: 82,  models: [{ value: 'A3', count: 11, trims: [{ value: '2.0T Premium', count: 4 }, { value: '2.0T Prestige', count: 7 }] }, { value: 'A4', count: 11, trims: [] }, { value: 'A5', count: 11, trims: [] }, { value: 'A6', count: 11, trims: [{ value: '2.0T Premium', count: 11 }, { value: '3.0T Prestige', count: 11 }, { value: '3.0T Prestige Plus', count: 11 }, { value: '3.0T Quattro Premium', count: 11 }, { value: '45 TFSI Premium Plus', count: 11 }, { value: '55 TFSI Premium Plus', count: 11 }, { value: 'competition', count: 11 }, { value: 'TDI Premium Plus', count: 11 }, { value: 'TDI Prestige', count: 11 }] }, { value: 'A7', count: 11, trims: [] }, { value: 'A8', count: 11, trims: [] }, { value: 'allroad', count: 11, trims: [] }, { value: 'e-tron', count: 11, trims: [] }, { value: 'Q3', count: 11, trims: [] }, { value: 'Q5', count: 11, trims: [] }, { value: 'S3', count: 11, trims: [] }, { value: 'S5', count: 11, trims: [] }] },
  { value: 'BMW',       count: 57,  models: [{ value: '3 Series', count: 20, trims: [{ value: '330i', count: 12 }, { value: 'M340i', count: 8 }] }, { value: '5 Series', count: 22, trims: [] }, { value: 'X3', count: 15, trims: [] }] },
  { value: 'Buick',     count: 21,  models: [{ value: 'Enclave', count: 10, trims: [] }, { value: 'Encore', count: 11, trims: [] }] },
  { value: 'Cadillac',  count: 18,  models: [] },
  { value: 'Chevrolet', count: 93,  models: [] },
  { value: 'Chrysler',  count: 14,  models: [] },
  { value: 'Dodge',     count: 29,  models: [] },
  { value: 'Ford',      count: 112, models: [] },
  { value: 'GMC',       count: 44,  models: [] },
  { value: 'Honda',     count: 78,  models: [] },
  { value: 'Hyundai',   count: 51,  models: [] },
  { value: 'Infinity',  count: 22,  models: [] },
  { value: 'Jaguar',    count: 11,  models: [] },
  { value: 'Jeep',      count: 67,  models: [] },
  { value: 'Kia',       count: 43,  models: [] },
  { value: 'Lexus',     count: 38,  models: [] },
  { value: 'Mazda',     count: 29,  models: [] },
  { value: 'Mercedes-Benz', count: 46, models: [] },
  { value: 'Nissan',    count: 61,  models: [] },
  { value: 'Ram',       count: 33,  models: [] },
  { value: 'Subaru',    count: 25,  models: [] },
  { value: 'Toyota',    count: 88,  models: [] },
  { value: 'Volkswagen', count: 19, models: [] },
  { value: 'Volvo',     count: 14,  models: [] },
]

// ─── Filter state ────────────────────────────────────────────────────────────

const activeFilter = ref<string | null>(null)
const selectedBodyStyles  = ref<string[]>([])
const selectedMakes       = ref<string[]>([])
const selectedModels      = ref<string[]>([])
const selectedTrims       = ref<string[]>([])

/**
 * Snapshot of selectedBodyStyles taken the moment the body-style child panel
 * opens. Items in this list float to the top with the green "returning" style.
 * When a returning item is deselected, it is removed from this list immediately
 * so it slides back to its original position.
 */
const committedBodyStyles = ref<string[]>([])

watch(activeFilter, (newKey) => {
  if (newKey === 'body-style') {
    committedBodyStyles.value = [...selectedBodyStyles.value]
  }
  if (newKey === 'features') {
    onFeaturesOpen()
  }
  if (newKey === 'mpg') {
    onMpgEngineOpen()
  }
  if (newKey === 'drive') {
    onDriveTransOpen()
  }
  if (newKey === 'color') {
    onColorOpen()
  }
  if (newKey === 'condition') {
    onConditionOpen()
  }
})

/**
 * Base filter categories. Condition is Sonic-only — EchoPark exclusively sells
 * used vehicles, so the filter would be a no-op. It's inserted right after
 * Distance so shoppers can narrow by inventory type early in their journey.
 */
const baseCategories = computed(() => {
  const items = [
    { key: 'distance',   label: 'Distance & stores',         alwaysSelected: true,  hideTitle: true  },
    { key: 'make',       label: 'Make/Model/Trim',           alwaysSelected: false, hideTitle: true  },
    { key: 'body-style', label: 'Body style',                alwaysSelected: false, hideTitle: false },
    { key: 'price',      label: 'Price & payment',           alwaysSelected: false, hideTitle: false },
    { key: 'year',       label: 'Year',                      alwaysSelected: false, hideTitle: false },
    { key: 'mileage',    label: 'Mileage',                   alwaysSelected: false, hideTitle: false },
    { key: 'features',   label: 'Features',                  alwaysSelected: false, hideTitle: false },
    { key: 'mpg',        label: 'MPG & engine type',         alwaysSelected: false, hideTitle: false },
    { key: 'drive',      label: 'Drive type & transmission', alwaysSelected: false, hideTitle: false },
    { key: 'color',      label: 'Color',                     alwaysSelected: false, hideTitle: false },
  ]
  if (isSonic.value) {
    items.splice(1, 0, { key: 'condition', label: 'Condition', alwaysSelected: false, hideTitle: false })
  }
  return items
})

const filterCategories = computed<FilterCategory[]>(() =>
  baseCategories.value.map(c => ({
    key:          c.key,
    label:        c.label,
    hideTitle:    c.hideTitle,
    hasSelection: c.alwaysSelected === true
      || (c.key === 'make'       && (selectedMakes.value.length > 0 || selectedModels.value.length > 0 || selectedTrims.value.length > 0))
      || (c.key === 'body-style' && selectedBodyStyles.value.length > 0)
      || (c.key === 'price'      && isPriceFiltered.value)
      || (c.key === 'year'       && isYearFiltered.value)
      || (c.key === 'mileage'    && isMileageFiltered.value)
      || (c.key === 'features'   && isFeaturesFiltered.value)
      || (c.key === 'mpg'        && isMpgEngineFiltered.value)
      || (c.key === 'drive'      && isDriveTransFiltered.value)
      || (c.key === 'color'      && isColorFiltered.value)
      || (c.key === 'condition'  && isConditionFiltered.value),
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

// ─── Distance & stores filter state ──────────────────────────

const distanceStores = computed<DistanceStoreItem[]>(() => [
  { id: 'co-springs',   name: `${props.brandName} Colorado Springs`, distanceMiles: 9  },
  { id: 'centennial',   name: `${props.brandName} Centennial`,        distanceMiles: 29 },
  { id: 'thornton',     name: `${props.brandName} Thornton`,          distanceMiles: 36 },
  { id: 'aurora',       name: `${props.brandName} Aurora`,            distanceMiles: 44 },
  { id: 'lakewood',     name: `${props.brandName} Lakewood`,          distanceMiles: 51 },
  { id: 'fort-collins', name: `${props.brandName} Fort Collins`,      distanceMiles: 67 },
  { id: 'boulder',      name: `${props.brandName} Boulder`,           distanceMiles: 72 },
])

const locationStores = computed<LocationStoreItem[]>(() => [
  { id: 'co-springs',   name: `${props.brandName} Colorado Springs`, distanceMiles: 9,  address: '1234 Powers Blvd, Colorado Springs, CO 80920', phone: '(719) 555-0101' },
  { id: 'centennial',   name: `${props.brandName} Centennial`,        distanceMiles: 29, address: '6820 S. Havana St, Centennial, CO 80112',      phone: '(720) 555-0202' },
  { id: 'thornton',     name: `${props.brandName} Thornton`,          distanceMiles: 36, address: '9501 Grant St, Thornton, CO 80229',            phone: '(720) 555-0303' },
  { id: 'aurora',       name: `${props.brandName} Aurora`,            distanceMiles: 44, address: '15500 E. Colfax Ave, Aurora, CO 80011',        phone: '(720) 555-0404' },
  { id: 'lakewood',     name: `${props.brandName} Lakewood`,          distanceMiles: 51, address: '1950 S. Wadsworth Blvd, Lakewood, CO 80227',  phone: '(303) 555-0505' },
  { id: 'fort-collins', name: `${props.brandName} Fort Collins`,      distanceMiles: 67, address: '2351 S. College Ave, Fort Collins, CO 80525', phone: '(970) 555-0606' },
  { id: 'boulder',      name: `${props.brandName} Boulder`,           distanceMiles: 72, address: '1550 30th St, Boulder, CO 80303',             phone: '(303) 555-0707' },
])

const currentZipCode = ref('75214')

function onZipChange(newZip: string) {
  currentZipCode.value = newZip
}

const distanceMode           = ref<'radius' | 'store'>('radius')
const distanceRadius         = ref(100)
const distanceSelectedStores = ref<string[]>([])

/** Stores whose distance is within the chosen radius (drives the count copy). */
const storesInRadius = computed(() =>
  distanceStores.value.filter(s => s.distanceMiles <= distanceRadius.value).length,
)

/** Label for the persistent location pill's distance segment. */
const locationDistanceLabel = computed(() =>
  distanceMode.value === 'store'
    ? 'Shop by store'
    : `Cars within ${distanceRadius.value} mi`,
)

/** Dismissible pills for each selected store (store mode only). */
const storePills = computed(() =>
  distanceMode.value === 'store'
    ? distanceSelectedStores.value.map(id => ({
        key:   id,
        label: distanceStores.value.find(s => s.id === id)?.name ?? id,
      }))
    : [],
)

function dismissStorePill(storeId: string) {
  const next = distanceSelectedStores.value.filter(id => id !== storeId)
  distanceSelectedStores.value = next
  if (next.length === 0) {
    // No stores left — fall back to radius mode
    distanceMode.value = 'radius'
  }
}

/**
 * Open the named child filter panel.
 * On narrow viewports (sidebar hidden) also opens the mobile drawer.
 */
function openFilterFromPill(key: string) {
  activeFilter.value = key
  if (window.innerWidth < 1240) {
    showMobileFilters.value = true
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

// ─── Year filter state ────────────────────────────────────────
const YEAR_ABS_MIN = 2012
const YEAR_ABS_MAX = 2026

const yearMin          = ref(YEAR_ABS_MIN)
const yearMax          = ref(YEAR_ABS_MAX)
const committedYearMin = ref(YEAR_ABS_MIN)
const committedYearMax = ref(YEAR_ABS_MAX)

type YearCommit = { minYear: number; maxYear: number }
function onYearCommit(p: YearCommit) {
  committedYearMin.value = p.minYear
  committedYearMax.value = p.maxYear
}

const isYearFiltered = computed(
  () => committedYearMin.value !== YEAR_ABS_MIN || committedYearMax.value !== YEAR_ABS_MAX,
)

const yearPillLabel = computed(
  () => `${committedYearMin.value} – ${committedYearMax.value}`,
)

function resetYear() {
  yearMin.value          = YEAR_ABS_MIN
  yearMax.value          = YEAR_ABS_MAX
  committedYearMin.value = YEAR_ABS_MIN
  committedYearMax.value = YEAR_ABS_MAX
}

// ─── Mileage filter state ─────────────────────────────────────
const MILEAGE_ABS_MAX = 150_000

const mileageMax = ref(MILEAGE_ABS_MAX)

const isMileageFiltered = computed(
  () => mileageMax.value !== MILEAGE_ABS_MAX,
)

const mileagePillLabel = computed(
  () => `${mileageMax.value.toLocaleString('en-US')} mi or less`,
)

function resetMileage() {
  mileageMax.value = MILEAGE_ABS_MAX
}

// ─── Features ─────────────────────────────────────────────────────────────────

const POPULAR_FEATURES: FeatureOption[] = [
  { value: '3rd-row-seat',       label: '3rd row seat',        count: 102, icon: thirdRowSeatIcon },
  { value: 'backup-camera',      label: 'Backup camera',       count: 102, icon: backupCameraIcon },
  { value: 'blind-spot-monitor', label: 'Blind spot monitor',  count: 102, icon: blindSpotIcon },
  { value: 'heated-seats',       label: 'Heated seats',        count: 102, icon: heatedSeatsIcon },
  { value: 'leather-seats',      label: 'Leather(ette) seats', count: 102, icon: leatherSeatsIcon },
  { value: 'sunroof',            label: 'Sunroof/Moonroof',    count: 102, icon: sunroofIcon },
]

const MORE_FEATURES: FeatureOption[] = [
  { value: 'adaptive-cruise',    label: 'Adaptive cruise control', count: 102 },
  { value: 'android-auto',       label: 'Android Auto',            count: 102 },
  { value: 'apple-carplay',      label: 'Apple CarPlay',           count: 102 },
]

const selectedFeatures  = ref<string[]>([])
const committedFeatures = ref<string[]>([])

function onFeaturesOpen() {
  committedFeatures.value = [...selectedFeatures.value]
}

const isFeaturesFiltered = computed(
  () => selectedFeatures.value.length > 0,
)

const ALL_FEATURES = [...POPULAR_FEATURES, ...MORE_FEATURES]

const featurePills = computed(() =>
  selectedFeatures.value.map(v => ({
    key:   v,
    label: ALL_FEATURES.find(o => o.value === v)?.label ?? v,
  })),
)

function removeFeature(value: string) {
  selectedFeatures.value = selectedFeatures.value.filter(v => v !== value)
}

function resetFeatures() {
  selectedFeatures.value  = []
  committedFeatures.value = []
}

// ─── MPG & Engine type ────────────────────────────────────────────────────────

const MPG_ABS_MIN = 18
const MPG_ABS_MAX = 100

const ENGINE_TYPES: EngineTypeOption[] = [
  { value: 'diesel-6',  label: 'Diesel 6-cyl', count: 8 },
  { value: 'gas-3',     label: 'Gas 3-cyl',    count: 100 },
  { value: 'gas-4',     label: 'Gas 4-cyl',    count: 2100 },
  { value: 'gas-6',     label: 'Gas 6-cyl',    count: 845 },
  { value: 'gas-8',     label: 'Gas 8-cyl',    count: 153 },
  { value: 'hybrid',    label: 'Hybrid',        count: 34 },
]

const mpgMin = ref(MPG_ABS_MIN)
const mpgMax = ref(MPG_ABS_MAX)
const selectedEngines  = ref<string[]>([])
const committedEngines = ref<string[]>([])

function onMpgEngineOpen() {
  committedEngines.value = [...selectedEngines.value]
}

const isMpgFiltered = computed(
  () => mpgMin.value !== MPG_ABS_MIN || mpgMax.value !== MPG_ABS_MAX,
)

const isEngineFiltered = computed(
  () => selectedEngines.value.length > 0,
)

const isMpgEngineFiltered = computed(
  () => isMpgFiltered.value || isEngineFiltered.value,
)

const mpgPillLabel = computed(() => {
  if (mpgMin.value !== MPG_ABS_MIN && mpgMax.value !== MPG_ABS_MAX) {
    return `${mpgMin.value}–${mpgMax.value} MPG`
  }
  if (mpgMin.value !== MPG_ABS_MIN) return `${mpgMin.value}+ MPG`
  return `Up to ${mpgMax.value} MPG`
})

const enginePills = computed(() =>
  selectedEngines.value.map(v => ({
    key:   v,
    label: ENGINE_TYPES.find(o => o.value === v)?.label ?? v,
  })),
)

function removeEngine(value: string) {
  selectedEngines.value = selectedEngines.value.filter(v => v !== value)
}

function resetMpg() {
  mpgMin.value = MPG_ABS_MIN
  mpgMax.value = MPG_ABS_MAX
}

function resetMpgEngine() {
  resetMpg()
  selectedEngines.value  = []
  committedEngines.value = []
}

// ─── Drive type & Transmission ────────────────────────────────────────────────

const DRIVE_TYPES: DriveTransOption[] = [
  { value: 'fwd', label: 'FWD',  count: 843 },
  { value: 'awd', label: 'AWD',  count: 1843 },
  { value: '4wd', label: '4WD',  count: 843 },
  { value: 'rwd', label: 'RWD',  count: 843 },
]

const TRANSMISSIONS: DriveTransOption[] = [
  { value: 'automatic', label: 'Automatic', count: 3444 },
  { value: 'manual',    label: 'Manual',    count: 4 },
]

const selectedDriveTypes     = ref<string[]>([])
const selectedTransmissions  = ref<string[]>([])
const committedDriveTypes    = ref<string[]>([])
const committedTransmissions = ref<string[]>([])

function onDriveTransOpen() {
  committedDriveTypes.value    = [...selectedDriveTypes.value]
  committedTransmissions.value = [...selectedTransmissions.value]
}

const isDriveFiltered = computed(
  () => selectedDriveTypes.value.length > 0,
)

const isTransFiltered = computed(
  () => selectedTransmissions.value.length > 0,
)

const isDriveTransFiltered = computed(
  () => isDriveFiltered.value || isTransFiltered.value,
)

const driveTypePills = computed(() =>
  selectedDriveTypes.value.map(v => ({
    key:   v,
    label: DRIVE_TYPES.find(o => o.value === v)?.label ?? v,
  })),
)

const transmissionPills = computed(() =>
  selectedTransmissions.value.map(v => ({
    key:   v,
    label: TRANSMISSIONS.find(o => o.value === v)?.label ?? v,
  })),
)

function removeDriveType(value: string) {
  selectedDriveTypes.value = selectedDriveTypes.value.filter(v => v !== value)
}

function removeTransmission(value: string) {
  selectedTransmissions.value = selectedTransmissions.value.filter(v => v !== value)
}

function resetDriveTrans() {
  selectedDriveTypes.value     = []
  selectedTransmissions.value  = []
  committedDriveTypes.value    = []
  committedTransmissions.value = []
}

// ─── Color filter state ───────────────────────────────────────────────────────

const EXTERIOR_COLORS: ColorOption[] = [
  { value: 'white',  label: 'White',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #ffffff, #e0e0e0)' },
  { value: 'silver', label: 'Silver', count: 8, swatch: 'radial-gradient(circle at 35% 35%, #d0d3d6, #9ba0a5)' },
  { value: 'gold',   label: 'Gold',   count: 8, swatch: 'radial-gradient(circle at 35% 35%, #e6b422, #b8860b)' },
  { value: 'gray',   label: 'Gray',   count: 8, swatch: 'radial-gradient(circle at 35% 35%, #a0a4a8, #6b7075)' },
  { value: 'red',    label: 'Red',    count: 8, swatch: 'radial-gradient(circle at 35% 35%, #e8242c, #a01020)' },
  { value: 'orange', label: 'Orange', count: 8, swatch: 'radial-gradient(circle at 35% 35%, #f39c12, #d35400)' },
  { value: 'yellow', label: 'Yellow', count: 8, swatch: 'radial-gradient(circle at 35% 35%, #f1c40f, #d4ac0d)' },
  { value: 'green',  label: 'Green',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #3a7d28, #1a4a10)' },
  { value: 'blue',   label: 'Blue',   count: 8, swatch: 'radial-gradient(circle at 35% 35%, #2980b9, #1a4f7a)' },
  { value: 'purple', label: 'Purple', count: 8, swatch: 'radial-gradient(circle at 35% 35%, #9b59b6, #6c3483)' },
  { value: 'beige',  label: 'Beige',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #f5e6c8, #d2b48c)' },
  { value: 'brown',  label: 'Brown',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #a0724a, #6d4c2e)' },
  { value: 'black',  label: 'Black',  count: 8, swatch: 'radial-gradient(circle at 35% 35%, #555555, #1a1a1a)' },
]

const INTERIOR_COLORS: ColorOption[] = [
  { value: 'black',  label: 'Black',  count: 12, swatch: 'radial-gradient(circle at 35% 35%, #555555, #1a1a1a)' },
  { value: 'gray',   label: 'Gray',   count: 10, swatch: 'radial-gradient(circle at 35% 35%, #a0a4a8, #6b7075)' },
  { value: 'beige',  label: 'Beige',  count: 6,  swatch: 'radial-gradient(circle at 35% 35%, #f5e6c8, #d2b48c)' },
  { value: 'brown',  label: 'Brown',  count: 4,  swatch: 'radial-gradient(circle at 35% 35%, #a0724a, #6d4c2e)' },
  { value: 'red',    label: 'Red',    count: 2,  swatch: 'radial-gradient(circle at 35% 35%, #e8242c, #a01020)' },
  { value: 'white',  label: 'White',  count: 1,  swatch: 'radial-gradient(circle at 35% 35%, #ffffff, #e0e0e0)' },
]

const colorMode              = ref<'exterior' | 'interior'>('exterior')
const selectedExteriorColors = ref<string[]>([])
const selectedInteriorColors = ref<string[]>([])
const committedExteriorColors = ref<string[]>([])
const committedInteriorColors = ref<string[]>([])

function onColorOpen() {
  committedExteriorColors.value = [...selectedExteriorColors.value]
  committedInteriorColors.value = [...selectedInteriorColors.value]
}

const isColorFiltered = computed(
  () => selectedExteriorColors.value.length > 0 || selectedInteriorColors.value.length > 0,
)

const colorPills = computed(() => {
  const pills: { key: string; label: string; type: 'ext' | 'int' }[] = []
  for (const v of selectedExteriorColors.value) {
    pills.push({ key: `ext-${v}`, label: EXTERIOR_COLORS.find(c => c.value === v)?.label ?? v, type: 'ext' })
  }
  for (const v of selectedInteriorColors.value) {
    pills.push({ key: `int-${v}`, label: `${INTERIOR_COLORS.find(c => c.value === v)?.label ?? v} (Int.)`, type: 'int' })
  }
  return pills
})

function removeColorPill(pill: { key: string; type: 'ext' | 'int' }) {
  const raw = pill.key.replace(/^(ext|int)-/, '')
  if (pill.type === 'ext') {
    selectedExteriorColors.value = selectedExteriorColors.value.filter(v => v !== raw)
  } else {
    selectedInteriorColors.value = selectedInteriorColors.value.filter(v => v !== raw)
  }
}

function resetColor() {
  colorMode.value              = 'exterior'
  selectedExteriorColors.value = []
  selectedInteriorColors.value = []
  committedExteriorColors.value = []
  committedInteriorColors.value = []
}

// ─── Condition filter state (Sonic only) ──────────────────────────────────────

const CONDITION_OPTIONS: ConditionOption[] = [
  { value: 'new',                 label: 'New',                 count: 1245 },
  { value: 'pre-owned',           label: 'Pre-owned',           count: 2110 },
  { value: 'certified-pre-owned', label: 'Certified pre-owned', count: 389  },
]

const selectedCondition  = ref<string[]>([])
const committedCondition = ref<string[]>([])

function onConditionOpen() {
  committedCondition.value = [...selectedCondition.value]
}

const isConditionFiltered = computed(
  () => selectedCondition.value.length > 0,
)

const conditionPills = computed(() =>
  selectedCondition.value.map(v => ({
    key:   v,
    label: CONDITION_OPTIONS.find(o => o.value === v)?.label ?? v,
  })),
)

function removeCondition(value: string) {
  selectedCondition.value = selectedCondition.value.filter(v => v !== value)
}

function resetCondition() {
  selectedCondition.value  = []
  committedCondition.value = []
}

function resetFilters() {
  selectedMakes.value           = []
  selectedModels.value          = []
  selectedTrims.value           = []
  selectedBodyStyles.value      = []
  distanceMode.value            = 'radius'
  distanceRadius.value          = 100
  distanceSelectedStores.value  = []
  priceMin.value                = PRICE_ABS_MIN
  priceMax.value                = PRICE_ABS_MAX
  paymentMin.value              = PAYMENT_ABS_MIN
  paymentMax.value              = PAYMENT_ABS_MAX
  committedPriceMin.value       = PRICE_ABS_MIN
  committedPriceMax.value       = PRICE_ABS_MAX
  committedPaymentMin.value     = PAYMENT_ABS_MIN
  committedPaymentMax.value     = PAYMENT_ABS_MAX
  yearMin.value                 = YEAR_ABS_MIN
  yearMax.value                 = YEAR_ABS_MAX
  committedYearMin.value        = YEAR_ABS_MIN
  committedYearMax.value        = YEAR_ABS_MAX
  mileageMax.value              = MILEAGE_ABS_MAX
  resetFeatures()
  resetMpgEngine()
  resetDriveTrans()
  resetColor()
  resetCondition()
}

const bodyStylePills = computed(() =>
  selectedBodyStyles.value.map(v => ({
    key:   v,
    label: bodyStyleOptions.find(o => o.value === v)?.label ?? v,
  })),
)

// ─── Make / Model / Trim pills — interleaved and ordered ────────────────────
// Priority: for each selected make (alpha), immediately follow it with its
// selected models (alpha), and each model with its selected trims (alpha).

interface MmtPill {
  key:   string
  label: string
  type:  'make' | 'model' | 'trim'
}

const mmtPills = computed((): MmtPill[] => {
  const pills: MmtPill[] = []
  const sortedMakes = [...selectedMakes.value].sort((a, b) => a.localeCompare(b))

  for (const makeValue of sortedMakes) {
    pills.push({ key: `make:${makeValue}`, label: makeValue, type: 'make' })

    const makeData   = MAKES_DATA.find(m => m.value === makeValue)
    const makeModels = makeData?.models ?? []

    const sortedModels = makeModels
      .filter(m => selectedModels.value.includes(m.value))
      .sort((a, b) => a.value.localeCompare(b.value))

    for (const model of sortedModels) {
      pills.push({ key: `model:${model.value}`, label: model.value, type: 'model' })

      const sortedTrims = (model.trims ?? [])
        .filter(t => selectedTrims.value.includes(t.value))
        .sort((a, b) => a.value.localeCompare(b.value))

      for (const trim of sortedTrims) {
        pills.push({ key: `trim:${trim.value}`, label: trim.value, type: 'trim' })
      }
    }
  }

  return pills
})

// ─── Cascade dismiss helpers ─────────────────────────────────────────────────

function dismissMake(makeValue: string) {
  selectedMakes.value = selectedMakes.value.filter(m => m !== makeValue)

  // Cascade: remove all of this make's models
  const makeData        = MAKES_DATA.find(m => m.value === makeValue)
  const makeModelValues = (makeData?.models ?? []).map(m => m.value)
  const removedModels   = makeModelValues.filter(m => selectedModels.value.includes(m))

  if (removedModels.length > 0) {
    selectedModels.value = selectedModels.value.filter(m => !removedModels.includes(m))
    // Cascade: remove trims that belonged to any removed model
    const trimsToRemove = removedModels.flatMap(modelValue => {
      const model = makeData?.models?.find(m => m.value === modelValue)
      return (model?.trims ?? []).map(t => t.value)
    })
    if (trimsToRemove.length > 0) {
      selectedTrims.value = selectedTrims.value.filter(t => !trimsToRemove.includes(t))
    }
  }
}

function dismissModel(modelValue: string) {
  selectedModels.value = selectedModels.value.filter(m => m !== modelValue)

  // Cascade: remove all trims that belong to this model
  const parentMake  = MAKES_DATA.find(m => m.models?.some(mo => mo.value === modelValue))
  const modelData   = parentMake?.models?.find(m => m.value === modelValue)
  const trimValues  = (modelData?.trims ?? []).map(t => t.value)

  if (trimValues.length > 0) {
    selectedTrims.value = selectedTrims.value.filter(t => !trimValues.includes(t))
  }
}

function dismissTrim(trimValue: string) {
  selectedTrims.value = selectedTrims.value.filter(t => t !== trimValue)
}

function dismissMmtPill(pill: MmtPill) {
  if      (pill.type === 'make')  dismissMake(pill.label)
  else if (pill.type === 'model') dismissModel(pill.label)
  else                            dismissTrim(pill.label)
}

// ─── Auto-select parent make when a model is selected ────────────────────────
// Ensures a model pill is never orphaned without its parent make pill.
watch(selectedModels, (newModels, oldModels) => {
  if (!oldModels) return
  const added = newModels.filter(m => !oldModels.includes(m))
  for (const modelValue of added) {
    const parentMake = MAKES_DATA.find(m => m.models?.some(mo => mo.value === modelValue))
    if (parentMake && !selectedMakes.value.includes(parentMake.value)) {
      selectedMakes.value = [...selectedMakes.value, parentMake.value]
    }
  }
})

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

function toggleFavorite(index: number) {
  listings.value[index].favorited = !listings.value[index].favorited
}

</script>

<template>
  <div class="srp-page">
    <!-- Header -->
    <GlobalHeader
      variant="global-search"
      zipCode="75214"
      :phoneNumber="phoneNumber"
      :brandName="brandName"
      :logoUrl="headerLogoUrl"
      :navLinks="headerNavLinks"
    />

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
              <!-- Make / Model / Trim -->
              <template v-if="activeFilter === 'make'">
                <SrpFilterMakeModelTrim
                  :makes="MAKES_DATA"
                  v-model:selectedMakes="selectedMakes"
                  v-model:selectedModels="selectedModels"
                  v-model:selectedTrims="selectedTrims"
                />
              </template>

              <!-- Body style -->
              <template v-else-if="activeFilter === 'body-style'">
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

              <!-- Distance & stores -->
              <template v-else-if="activeFilter === 'distance'">
                <SrpFilterDistance
                  v-model:mode="distanceMode"
                  v-model:radius="distanceRadius"
                  v-model:selectedStores="distanceSelectedStores"
                  :zipCode="currentZipCode"
                  :stores="distanceStores"
                  :locationStores="locationStores"
                  :storeCountInRadius="storesInRadius"
                  @update:zipCode="onZipChange"
                />
              </template>

              <!-- Condition (Sonic only) -->
              <template v-else-if="activeFilter === 'condition' && isSonic">
                <SrpFilterCondition
                  :options="CONDITION_OPTIONS"
                  v-model:selected="selectedCondition"
                  :committed="committedCondition"
                />
              </template>

              <!-- Year -->
              <template v-else-if="activeFilter === 'year'">
                <SrpFilterYear
                  :absMin="YEAR_ABS_MIN"
                  :absMax="YEAR_ABS_MAX"
                  v-model:minYear="yearMin"
                  v-model:maxYear="yearMax"
                  @commit="onYearCommit"
                />
              </template>

              <!-- Mileage -->
              <template v-else-if="activeFilter === 'mileage'">
                <SrpFilterMileage
                  :absMax="MILEAGE_ABS_MAX"
                  v-model="mileageMax"
                />
              </template>

              <!-- Features -->
              <template v-else-if="activeFilter === 'features'">
                <SrpFilterFeatures
                  :popular="POPULAR_FEATURES"
                  :more="MORE_FEATURES"
                  v-model:selected="selectedFeatures"
                  :committed="committedFeatures"
                />
              </template>

              <!-- MPG & Engine type -->
              <template v-else-if="activeFilter === 'mpg'">
                <SrpFilterMpgEngine
                  :absMin="MPG_ABS_MIN"
                  :absMax="MPG_ABS_MAX"
                  :engineTypes="ENGINE_TYPES"
                  v-model:minMpg="mpgMin"
                  v-model:maxMpg="mpgMax"
                  v-model:selectedEngines="selectedEngines"
                  :committedEngines="committedEngines"
                />
              </template>

              <!-- Drive type & Transmission -->
              <template v-else-if="activeFilter === 'drive'">
                <SrpFilterDriveTrans
                  :driveTypes="DRIVE_TYPES"
                  :transmissions="TRANSMISSIONS"
                  v-model:selectedDriveTypes="selectedDriveTypes"
                  v-model:selectedTransmissions="selectedTransmissions"
                  :committedDriveTypes="committedDriveTypes"
                  :committedTransmissions="committedTransmissions"
                />
              </template>

              <!-- Color -->
              <template v-else-if="activeFilter === 'color'">
                <SrpFilterColor
                  :exteriorColors="EXTERIOR_COLORS"
                  :interiorColors="INTERIOR_COLORS"
                  v-model:mode="colorMode"
                  v-model:selectedExterior="selectedExteriorColors"
                  v-model:selectedInterior="selectedInteriorColors"
                  :committedExterior="committedExteriorColors"
                  :committedInterior="committedInteriorColors"
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
            <!-- 1. Persistent location pill -->
            <SrpFilterPill
              variant="location"
              :zipCode="currentZipCode"
              :distanceLabel="locationDistanceLabel"
              @distanceClick="openFilterFromPill('distance')"
            />
            <!-- 1b. Selected store pills (store mode only) -->
            <SrpFilterPill
              v-for="pill in storePills"
              :key="pill.key"
              variant="dismissible"
              :label="pill.label"
              @labelClick="openFilterFromPill('distance')"
              @dismiss="dismissStorePill(pill.key)"
            />
            <!-- 1c. Condition (Sonic only) -->
            <SrpFilterPill
              v-for="cp in conditionPills"
              :key="`cond-${cp.key}`"
              variant="dismissible"
              :label="cp.label"
              @labelClick="openFilterFromPill('condition')"
              @dismiss="removeCondition(cp.key)"
            />
            <!-- 2. Make / Model / Trim — interleaved: make, then its models, then their trims -->
            <SrpFilterPill
              v-for="pill in mmtPills"
              :key="pill.key"
              variant="dismissible"
              :label="pill.label"
              @labelClick="openFilterFromPill('make')"
              @dismiss="dismissMmtPill(pill)"
            />
            <!-- 3. Body style -->
            <SrpFilterPill
              v-for="pill in bodyStylePills"
              :key="pill.key"
              variant="dismissible"
              :label="pill.label"
              @labelClick="openFilterFromPill('body-style')"
              @dismiss="toggleBodyStyle(pill.key, false)"
            />
            <!-- 4. Price range -->
            <SrpFilterPill
              v-if="isPriceRangeFiltered"
              variant="dismissible"
              :label="pricePillLabel"
              @labelClick="openFilterFromPill('price')"
              @dismiss="resetPriceRange"
            />
            <!-- 5. Payment -->
            <SrpFilterPill
              v-if="isPaymentFiltered"
              variant="dismissible"
              :label="paymentPillLabel"
              @labelClick="openFilterFromPill('price')"
              @dismiss="resetPayment"
            />
            <!-- 6. Year -->
            <SrpFilterPill
              v-if="isYearFiltered"
              variant="dismissible"
              :label="yearPillLabel"
              @labelClick="openFilterFromPill('year')"
              @dismiss="resetYear"
            />
            <!-- 7. Mileage -->
            <SrpFilterPill
              v-if="isMileageFiltered"
              variant="dismissible"
              :label="mileagePillLabel"
              @labelClick="openFilterFromPill('mileage')"
              @dismiss="resetMileage"
            />
            <!-- 8. Features (AND — each pill is one feature) -->
            <SrpFilterPill
              v-for="fp in featurePills"
              :key="fp.key"
              variant="dismissible"
              :label="fp.label"
              @labelClick="openFilterFromPill('features')"
              @dismiss="removeFeature(fp.key)"
            />
            <!-- 9. MPG -->
            <SrpFilterPill
              v-if="isMpgFiltered"
              variant="dismissible"
              :label="mpgPillLabel"
              @labelClick="openFilterFromPill('mpg')"
              @dismiss="resetMpg"
            />
            <!-- 10. Engine type (each pill is one engine) -->
            <SrpFilterPill
              v-for="ep in enginePills"
              :key="ep.key"
              variant="dismissible"
              :label="ep.label"
              @labelClick="openFilterFromPill('mpg')"
              @dismiss="removeEngine(ep.key)"
            />
            <!-- 11. Drive type -->
            <SrpFilterPill
              v-for="dp in driveTypePills"
              :key="dp.key"
              variant="dismissible"
              :label="dp.label"
              @labelClick="openFilterFromPill('drive')"
              @dismiss="removeDriveType(dp.key)"
            />
            <!-- 12. Transmission -->
            <SrpFilterPill
              v-for="tp in transmissionPills"
              :key="tp.key"
              variant="dismissible"
              :label="tp.label"
              @labelClick="openFilterFromPill('drive')"
              @dismiss="removeTransmission(tp.key)"
            />
            <!-- 13. Color -->
            <SrpFilterPill
              v-for="cp in colorPills"
              :key="cp.key"
              variant="dismissible"
              :label="cp.label"
              @labelClick="openFilterFromPill('color')"
              @dismiss="removeColorPill(cp)"
            />
          </div>
        </div>

        <!-- Results area -->
        <div class="srp-page__results">
          <!-- Results header -->
          <div class="srp-page__results-header">
            <div class="srp-page__results-count">
              2,110 used cars at {{ brandName }}
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
                {{ brandName }} advertised pricing is subject to the following based on the vehicle's physical location: in
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
    <GlobalFooter
      :phoneNumber="phoneNumber"
      :brandName="brandName"
      :logoUrl="footerLogoUrl"
      :linkColumns="footerLinkColumns"
      :socialLinks="footerSocialLinks"
      :trustBadges="footerTrustBadges"
      :legalLinks="footerLegalLinks"
      :copyrightText="footerCopyrightText"
    />

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
              :zipCode="currentZipCode"
              :distanceLabel="locationDistanceLabel"
              @distanceClick="openFilterFromPill('distance')"
            />
            <div class="srp-mobile-drawer__pill-row">
              <!-- Selected store pills (store mode only) -->
              <SrpFilterPill
                v-for="pill in storePills"
                :key="pill.key"
                variant="dismissible"
                :label="pill.label"
                @labelClick="openFilterFromPill('distance')"
                @dismiss="dismissStorePill(pill.key)"
              />
              <!-- Condition (Sonic only) -->
              <SrpFilterPill
                v-for="cp in conditionPills"
                :key="`cond-${cp.key}`"
                variant="dismissible"
                :label="cp.label"
                @labelClick="openFilterFromPill('condition')"
                @dismiss="removeCondition(cp.key)"
              />
              <!-- Make / Model / Trim — interleaved -->
              <SrpFilterPill
                v-for="pill in mmtPills"
                :key="pill.key"
                variant="dismissible"
                :label="pill.label"
                @labelClick="openFilterFromPill('make')"
                @dismiss="dismissMmtPill(pill)"
              />
              <!-- Body style -->
              <SrpFilterPill
                v-for="pill in bodyStylePills"
                :key="pill.key"
                variant="dismissible"
                :label="pill.label"
                @labelClick="openFilterFromPill('body-style')"
                @dismiss="toggleBodyStyle(pill.key, false)"
              />
              <!-- Price range -->
              <SrpFilterPill
                v-if="isPriceRangeFiltered"
                variant="dismissible"
                :label="pricePillLabel"
                @labelClick="openFilterFromPill('price')"
                @dismiss="resetPriceRange"
              />
              <!-- Payment -->
              <SrpFilterPill
                v-if="isPaymentFiltered"
                variant="dismissible"
                :label="paymentPillLabel"
                @labelClick="openFilterFromPill('price')"
                @dismiss="resetPayment"
              />
              <!-- Year -->
              <SrpFilterPill
                v-if="isYearFiltered"
                variant="dismissible"
                :label="yearPillLabel"
                @labelClick="openFilterFromPill('year')"
                @dismiss="resetYear"
              />
              <!-- Mileage -->
              <SrpFilterPill
                v-if="isMileageFiltered"
                variant="dismissible"
                :label="mileagePillLabel"
                @labelClick="openFilterFromPill('mileage')"
                @dismiss="resetMileage"
              />
              <!-- Features (AND — each pill is one feature) -->
              <SrpFilterPill
                v-for="fp in featurePills"
                :key="fp.key"
                variant="dismissible"
                :label="fp.label"
                @labelClick="openFilterFromPill('features')"
                @dismiss="removeFeature(fp.key)"
              />
              <!-- MPG -->
              <SrpFilterPill
                v-if="isMpgFiltered"
                variant="dismissible"
                :label="mpgPillLabel"
                @labelClick="openFilterFromPill('mpg')"
                @dismiss="resetMpg"
              />
              <!-- Engine type -->
              <SrpFilterPill
                v-for="ep in enginePills"
                :key="ep.key"
                variant="dismissible"
                :label="ep.label"
                @labelClick="openFilterFromPill('mpg')"
                @dismiss="removeEngine(ep.key)"
              />
              <!-- Drive type -->
              <SrpFilterPill
                v-for="dp in driveTypePills"
                :key="dp.key"
                variant="dismissible"
                :label="dp.label"
                @labelClick="openFilterFromPill('drive')"
                @dismiss="removeDriveType(dp.key)"
              />
              <!-- Transmission -->
              <SrpFilterPill
                v-for="tp in transmissionPills"
                :key="tp.key"
                variant="dismissible"
                :label="tp.label"
                @labelClick="openFilterFromPill('drive')"
                @dismiss="removeTransmission(tp.key)"
              />
              <!-- Color -->
              <SrpFilterPill
                v-for="cp in colorPills"
                :key="cp.key"
                variant="dismissible"
                :label="cp.label"
                @labelClick="openFilterFromPill('color')"
                @dismiss="removeColorPill(cp)"
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
              <!-- Make / Model / Trim -->
              <template v-if="mobileActiveFilter === 'make'">
                <SrpFilterMakeModelTrim
                  :makes="MAKES_DATA"
                  v-model:selectedMakes="selectedMakes"
                  v-model:selectedModels="selectedModels"
                  v-model:selectedTrims="selectedTrims"
                />
              </template>

              <template v-else-if="mobileActiveFilter === 'body-style'">
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
              <template v-else-if="mobileActiveFilter === 'distance'">
                <SrpFilterDistance
                  v-model:mode="distanceMode"
                  v-model:radius="distanceRadius"
                  v-model:selectedStores="distanceSelectedStores"
                  :zipCode="currentZipCode"
                  :stores="distanceStores"
                  :locationStores="locationStores"
                  :storeCountInRadius="storesInRadius"
                  @update:zipCode="onZipChange"
                />
              </template>
              <template v-else-if="mobileActiveFilter === 'condition' && isSonic">
                <SrpFilterCondition
                  :options="CONDITION_OPTIONS"
                  v-model:selected="selectedCondition"
                  :committed="committedCondition"
                />
              </template>
              <template v-else-if="mobileActiveFilter === 'year'">
                <SrpFilterYear
                  :absMin="YEAR_ABS_MIN"
                  :absMax="YEAR_ABS_MAX"
                  v-model:minYear="yearMin"
                  v-model:maxYear="yearMax"
                  @commit="onYearCommit"
                />
              </template>
              <template v-else-if="mobileActiveFilter === 'mileage'">
                <SrpFilterMileage
                  :absMax="MILEAGE_ABS_MAX"
                  v-model="mileageMax"
                />
              </template>
              <template v-else-if="mobileActiveFilter === 'features'">
                <SrpFilterFeatures
                  :popular="POPULAR_FEATURES"
                  :more="MORE_FEATURES"
                  v-model:selected="selectedFeatures"
                  :committed="committedFeatures"
                />
              </template>
              <template v-else-if="mobileActiveFilter === 'mpg'">
                <SrpFilterMpgEngine
                  :absMin="MPG_ABS_MIN"
                  :absMax="MPG_ABS_MAX"
                  :engineTypes="ENGINE_TYPES"
                  v-model:minMpg="mpgMin"
                  v-model:maxMpg="mpgMax"
                  v-model:selectedEngines="selectedEngines"
                  :committedEngines="committedEngines"
                />
              </template>
              <template v-else-if="mobileActiveFilter === 'drive'">
                <SrpFilterDriveTrans
                  :driveTypes="DRIVE_TYPES"
                  :transmissions="TRANSMISSIONS"
                  v-model:selectedDriveTypes="selectedDriveTypes"
                  v-model:selectedTransmissions="selectedTransmissions"
                  :committedDriveTypes="committedDriveTypes"
                  :committedTransmissions="committedTransmissions"
                />
              </template>
              <template v-else-if="mobileActiveFilter === 'color'">
                <SrpFilterColor
                  :exteriorColors="EXTERIOR_COLORS"
                  :interiorColors="INTERIOR_COLORS"
                  v-model:mode="colorMode"
                  v-model:selectedExterior="selectedExteriorColors"
                  v-model:selectedInterior="selectedInteriorColors"
                  :committedExterior="committedExteriorColors"
                  :committedInterior="committedInteriorColors"
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
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden; /* clips both the child-panel slide-right and fly-in slide-left */
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
  color: var(--color-action-accent);
}

.srp-page__sort-value {
  color: var(--color-action-accent);
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
  color: var(--color-action-accent);
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
  fill: var(--color-action-accent);
}

.srp-page__fsb-label {
  font-family: var(--font-family-base);
  font-size: var(--text-body-sm-size);
  font-weight: var(--font-weight-medium);
  color: var(--color-action-accent);
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
  color: var(--color-action-accent);
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
  overflow: hidden; /* clips the fly-in slide animation */
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
