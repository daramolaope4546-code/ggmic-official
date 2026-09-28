// GGMIC design tokens - colours derived from the official GGMIC logo.
// Extracted programmatically from assets/images/ggmic-logo.png:
//   primary teal-green  #036B57, accent red #DB3E49, off-white #F1F5FB, near-black #0A0908.
// All app colours must come from this single source.
//
// `reading` — auxiliary palette used exclusively by the Bible reader screens
// (Light/Sepia/Night modes). Not a separate design system; these tokens are
// confined to the reading experience.

export const colors = {
  // Brand
  primary: '#036B57',
  primaryDark: '#02433A',
  primaryDarker: '#01352A',
  primaryLight: '#0D8468',
  primarySoft: '#D6EFE6',
  primarySoftDark: '#B7E0D2',

  // Accent (used sparingly, e.g. highlighted service)
  accent: '#DB3E49',
  accentDark: '#B3313C',
  accentSoft: '#FBEBEC',

  // Neutrals
  background: '#F1F5FB',
  surface: '#FFFFFF',
  surfaceMuted: '#F7FAFC',

  // Text
  textPrimary: '#161B20',
  textSecondary: '#5A656E',
  textDisabled: '#9AA5AC',
  textOnPrimary: '#FFFFFF',

  // Lines & elevation
  border: '#E1E8EE',
  shadow: '#0A0908',

  // Status
  success: '#2E7D32',
  successSoft: '#E8F5E9',
  warning: '#8A5A00',
  warningSoft: '#FFF8E1',
  danger: '#C6152E',
  dangerSoft: '#FDECEF',
  info: '#1D4ED8',
  infoSoft: '#E8EEFF',

  // Misc
  white: '#FFFFFF',
  black: '#0A0908',
  transparent: 'transparent',

  // Bible reader modes (Light / Sepia / Night)
  reading: {
    light: {
      background: '#F1F5FB',
      text: '#161B20',
      accent: '#036B57',
      subtle: '#5A656E',
      verseNum: '#02433A',
      surface: '#FFFFFF',
    },
    sepia: {
      background: '#F7EDDC',
      text: '#4A3222',
      accent: '#7A5624',
      subtle: '#7A6244',
      verseNum: '#5A3E1C',
      surface: '#EDE2CC',
    },
    night: {
      background: '#101922',
      text: '#D9E4EC',
      accent: '#7FB5C9',
      subtle: '#94A8B4',
      verseNum: '#7FB5C9',
      surface: '#18232C',
    },
  },
} as const;

export type ColorName = keyof typeof colors;

export type ReadingMode = 'light' | 'sepia' | 'night';