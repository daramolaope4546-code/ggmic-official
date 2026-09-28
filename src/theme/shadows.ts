// Shadow / elevation tokens. Both iOS shadow props and Android elevation are
// set together so a single style works on every platform (each ignores the
// props that do not apply to it).

export const shadows = {
  card: {
    shadowColor: '#0A0908',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lifted: {
    shadowColor: '#0A0908',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

export type ShadowToken = keyof typeof shadows;