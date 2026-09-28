// Responsive breakpoints. Widths are compared against these values using
// useWindowDimensions. Everything below "tablet" is treated as a phone.

export const breakpoints = {
  smallPhone: 340, // < 340
  phone: 360, // 340 - 399
  largePhone: 480, // 400 - 599
  tablet: 600, // 600 - 839
  largeTablet: 840, // >= 840
} as const;

// Content narrower than this is centred on large screens so cards do not
// stretch excessively on tablets / landscape.
export const contentMaxWidth = 720;

// Minimum touch target height to satisfy accessibility guidance (44 - 48pt).
export const minTouchTarget = 48;

// Icon size tokens.
export const iconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

export type BreakpointToken = keyof typeof breakpoints;