// Typography tokens. Fonts intentionally use the platform default (no custom
// font assets exist in Phase 1) so system font scaling is fully supported.

export const fontSizes = {
  caption: 12,
  small: 14,
  body: 16,
  subtitle: 18,
  title: 20,
  heading: 24,
  display: 30,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeights = {
  caption: 16,
  small: 20,
  body: 24,
  subtitle: 26,
  title: 28,
  heading: 33,
  display: 40,
} as const;

export type FontSize = keyof typeof fontSizes;