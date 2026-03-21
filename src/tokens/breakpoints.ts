/**
 * Grid breakpoints — sourced from Figma "Grid Breakpoints" foundations page.
 *
 * These are plain numeric constants (px) because CSS custom properties
 * cannot be used inside @media query expressions.
 *
 * Use in:
 *   - CSS: write the values directly, e.g. @media (min-width: 600px)
 *   - JS/Vue: use the helpers below for window.matchMedia or
 *             programmatic responsive logic
 *
 * Grid spec summary:
 *   sm  (0+):    4 col,  padding 24px
 *   md  (600+):  12 col, padding 24px, margin 16px
 *   lg  (1024+): 12 col, padding 32px, margin 16px
 *   xlg (1440+): 12 col, padding 32px, margin 80px
 *   max (1920):  12 col, padding 32px, margin 128px
 */

export const breakpoints = {
  sm:  0,
  md:  600,
  lg:  1024,
  xlg: 1440,
  max: 1920,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Returns a min-width media query string for the given breakpoint. */
export function mq(bp: Breakpoint): string {
  return `(min-width: ${breakpoints[bp]}px)`;
}

/**
 * CSS @media query strings for use in Vue <style> blocks or JS.
 *
 * @example
 *   // In a <style> block comment for reference:
 *   // @media #{media.md} { ... }
 *
 *   // In JS (e.g. a composable):
 *   window.matchMedia(media.lg)
 */
export const media = {
  sm:  mq('sm'),
  md:  mq('md'),
  lg:  mq('lg'),
  xlg: mq('xlg'),
  max: mq('max'),
} as const;
