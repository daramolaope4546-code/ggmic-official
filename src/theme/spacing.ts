// Spacing scale. All spacing values in the app must come from this source.
// Values are multiplied for padding, gaps, and margins; never rely on literal px.

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  huge: 48,
} as const;

export const screenPadding = spacing.md;

export const gridGap = spacing.sm;

export type SpacingToken = keyof typeof spacing;