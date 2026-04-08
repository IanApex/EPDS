/**
 * TypeScript token map — mirrors tokens.css + semantic.css.
 * References CSS variable names so that CSS handles theming and TS provides
 * autocomplete + type safety when tokens are used in dynamic style bindings.
 *
 * Usage in a component:
 *   import { tokens } from '@/tokens/tokens'
 *   // Use in :style bindings or pass as prop values.
 *   // In static <style scoped> blocks, reference the CSS var directly.
 *
 * Token layers:
 *   tokens.semantic  — intent-based aliases (use these in new components)
 *   tokens.color     — raw brand primitives (avoid in new code; kept for compat)
 */

type CSSVar = `var(--${string})`;

function v(name: string): CSSVar {
  return `var(--${name})`;
}

export const tokens = {
  /**
   * Semantic color tokens — map design intent to brand primitives.
   * Prefer these over raw `color.*` tokens in dynamic style bindings.
   */
  semantic: {
    action: {
      primary:        v('color-action-primary'),
      primaryHover:   v('color-action-primary-hover'),
      primaryPress:   v('color-action-primary-press'),
      primarySubtle:  v('color-action-primary-subtle'),
      accent:         v('color-action-accent'),
      accentHover:    v('color-action-accent-hover'),
      accentPress:    v('color-action-accent-press'),
      accentSubtle:   v('color-action-accent-subtle'),
    },
    focus: {
      ring: v('color-focus-ring'),
    },
    disabled: {
      surface: v('color-surface-disabled'),
      text:    v('color-text-disabled'),
    },
    feedback: {
      error:          v('color-feedback-error'),
      errorText:      v('color-feedback-error-text'),
      errorSurface:   v('color-feedback-error-surface'),
      warning:        v('color-feedback-warning'),
      warningSurface: v('color-feedback-warning-surface'),
      success:        v('color-feedback-success'),
      successSurface: v('color-feedback-success-surface'),
      info:           v('color-feedback-info'),
      infoSurface:    v('color-feedback-info-surface'),
    },
  },

  color: {
    base: {
      primary40: v('color-base-primary-40'),
      primary50: v('color-base-primary-50'),
      primary55: v('color-base-primary-55'),
      primary60: v('color-base-primary-60'),
      primary90: v('color-base-primary-90'),
    },
    accent: {
      a30: v('color-accent-30'),
      a40: v('color-accent-40'),
      a60: v('color-accent-60'),
      a80: v('color-accent-80'),
      a85: v('color-accent-85'),
      a90: v('color-accent-90'),
    },
    neutral: {
      n0:   v('color-neutral-0'),
      n20:  v('color-neutral-20'),
      n40:  v('color-neutral-40'),
      n70:  v('color-neutral-70'),
      n80:  v('color-neutral-80'),
      n85:  v('color-neutral-85'),
      n90:  v('color-neutral-90'),
      n95:  v('color-neutral-95'),
      n100: v('color-neutral-100'),
    },
    neutralSecondary: {
      s40: v('color-neutral-secondary-40'),
      s70: v('color-neutral-secondary-70'),
      s80: v('color-neutral-secondary-80'),
      s85: v('color-neutral-secondary-85'),
      s90: v('color-neutral-secondary-90'),
      s95: v('color-neutral-secondary-95'),
    },
    neutralTertiary: {
      t70: v('color-neutral-tertiary-70'),
      t80: v('color-neutral-tertiary-80'),
      t85: v('color-neutral-tertiary-85'),
      t90: v('color-neutral-tertiary-90'),
      t95: v('color-neutral-tertiary-95'),
    },
    alias: {
      white:     v('color-white'),
      parkGray0: v('color-parkgray-0'),
    },
    warning: {
      w40: v('color-warning-40'),
      w50: v('color-warning-50'),
      w90: v('color-warning-90'),
    },
    alert: {
      a50: v('color-alert-50'),
      a70: v('color-alert-70'),
      a80: v('color-alert-80'),
      a90: v('color-alert-90'),
    },
    system: {
      red60: v('color-system-red-60'),
    },
    accessibility: {
      a80: v('color-accessibility-80'),
    },
  },

  spacing: {
    quarck: v('spacing-quarck'),
    nano:   v('spacing-nano'),
    micro:  v('spacing-micro'),
    xxxs:   v('spacing-xxxs'),
    xxs:    v('spacing-xxs'),
    xs:     v('spacing-xs'),
    sm:     v('spacing-sm'),
    md:     v('spacing-md'),
    lg:     v('spacing-lg'),
    xl:     v('spacing-xl'),
    xxl:    v('spacing-xxl'),
    xxxl:   v('spacing-xxxl'),
    huge:   v('spacing-huge'),
    giant:  v('spacing-giant'),

    inset: {
      quarck: v('spacing-inset-quarck'),
      nano:   v('spacing-inset-nano'),
      xs:     v('spacing-inset-xs'),
      sm:     v('spacing-inset-sm'),
      md:     v('spacing-inset-md'),
      lg:     v('spacing-inset-lg'),
    },

    squish: {
      quarck: v('spacing-squish-quarck'),
      nano:   v('spacing-squish-nano'),
      sm:     v('spacing-squish-sm'),
      md:     v('spacing-squish-md'),
      lg:     v('spacing-squish-lg'),
    },

    stretch: {
      quarck: v('spacing-stretch-quarck'),
      nano:   v('spacing-stretch-nano'),
      xs:     v('spacing-stretch-xs'),
      sm:     v('spacing-stretch-sm'),
      md:     v('spacing-stretch-md'),
      lg:     v('spacing-stretch-lg'),
    },
  },

  grid: {
    padding: {
      sm:  v('grid-padding-sm'),
      md:  v('grid-padding-md'),
      lg:  v('grid-padding-lg'),
      xlg: v('grid-padding-xlg'),
      max: v('grid-padding-max'),
    },
    margin: {
      md:  v('grid-margin-md'),
      lg:  v('grid-margin-lg'),
      xlg: v('grid-margin-xlg'),
      max: v('grid-margin-max'),
    },
    miniUnit: v('grid-mini-unit'),
    sideRail: v('grid-side-rail'),
  },

  borderRadius: {
    none:     v('border-radius-none'),
    sm:       v('border-radius-sm'),
    md:       v('border-radius-md'),
    lg:       v('border-radius-lg'),
    pill:     v('border-radius-pill'),
    circular: v('border-radius-circular'),
  },

  borderWidth: {
    none:     v('border-width-none'),
    hairline: v('border-width-hairline'),
    thin:     v('border-width-thin'),
    thick:    v('border-width-thick'),
    heavy:    v('border-width-heavy'),
  },

  opacity: {
    semiopaque:      v('opacity-level-semiopaque'),
    intense:         v('opacity-level-intense'),
    medium:          v('opacity-level-medium'),
    light:           v('opacity-level-light'),
    semitransparent: v('opacity-level-semitransparent'),
  },

  shadow: {
    level1: v('shadow-level-1'),
    level2: v('shadow-level-2'),
    level3: v('shadow-level-3'),
    level4: v('shadow-level-4'),
  },

  font: {
    family: {
      base: v('font-family-base'),
    },
    weight: {
      light:   v('font-weight-light'),
      regular: v('font-weight-regular'),
      medium:  v('font-weight-medium'),
      bold:    v('font-weight-bold'),
    },
    lineHeight: {
      default: v('line-height-default'),
      xs:      v('line-height-xs'),
      sm:      v('line-height-sm'),
      md:      v('line-height-md'),
      lg:      v('line-height-lg'),
    },
    text: {
      h1:      { size: v('text-h1-size'),      weight: v('text-h1-weight'),      lineHeight: v('text-h1-line-height'),      letterSpacing: v('text-h1-letter-spacing') },
      h2:      { size: v('text-h2-size'),      weight: v('text-h2-weight'),      lineHeight: v('text-h2-line-height'),      letterSpacing: v('text-h2-letter-spacing') },
      h3:      { size: v('text-h3-size'),      weight: v('text-h3-weight'),      lineHeight: v('text-h3-line-height'),      letterSpacing: v('text-h3-letter-spacing') },
      h4:      { size: v('text-h4-size'),      weight: v('text-h4-weight'),      lineHeight: v('text-h4-line-height'),      letterSpacing: v('text-h4-letter-spacing') },
      h5:      { size: v('text-h5-size'),      weight: v('text-h5-weight'),      lineHeight: v('text-h5-line-height'),      letterSpacing: v('text-h5-letter-spacing') },
      h2Bold:  { size: v('text-h2-bold-size'), weight: v('text-h2-bold-weight'), lineHeight: v('text-h2-bold-line-height'), letterSpacing: v('text-h2-bold-letter-spacing') },
      h5Bold:  { size: v('text-h5-bold-size'), weight: v('text-h5-bold-weight'), lineHeight: v('text-h5-bold-line-height'), letterSpacing: v('text-h5-bold-letter-spacing') },
      h6Bold:  { size: v('text-h6-bold-size'), weight: v('text-h6-bold-weight'), lineHeight: v('text-h6-bold-line-height'), letterSpacing: v('text-h6-bold-letter-spacing') },
      subhead: { size: v('text-subhead-size'), weight: v('text-subhead-weight'), lineHeight: v('text-subhead-line-height'), letterSpacing: v('text-subhead-letter-spacing') },
      bodyLg:  { size: v('text-body-lg-size'), weight: v('text-body-lg-weight'), lineHeight: v('text-body-lg-line-height'), letterSpacing: v('text-body-lg-letter-spacing') },
      bodySm:  { size: v('text-body-sm-size'), weight: v('text-body-sm-weight'), lineHeight: v('text-body-sm-line-height'), letterSpacing: v('text-body-sm-letter-spacing') },
      label:   { size: v('text-label-size'),   weight: v('text-label-weight'),   lineHeight: v('text-label-line-height'),   letterSpacing: v('text-label-letter-spacing') },
    },
    btn: {
      family:        v('font-family-btn'),
      size:          v('font-size-btn'),
      weight:        v('font-weight-btn'),
      lineHeight:    v('line-height-btn'),
      letterSpacing: v('letter-spacing-btn'),
    },
    btnSm: {
      size:          v('font-size-btn-sm'),
      weight:        v('font-weight-btn-sm'),
      lineHeight:    v('line-height-btn-sm'),
      letterSpacing: v('letter-spacing-btn-sm'),
    },
  },
} as const;

export type Tokens = typeof tokens;
