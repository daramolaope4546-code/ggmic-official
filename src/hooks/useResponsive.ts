import { useWindowDimensions } from 'react-native';

import { breakpoints, screenPadding } from '@/theme';

import type { BreakpointName } from '@/types';

/**
 * Live responsive query backed by useWindowDimensions. Re-renders on rotation
 * and across device sizes. Use `sp()` to scale spacing values for the current
 * size class and `columns` for adaptive grid layout.
 */
export function useResponsive() {
  const { width, height, fontScale } = useWindowDimensions();

  const breakpoint: BreakpointName =
    width >= breakpoints.largeTablet
      ? 'largeTablet'
      : width >= breakpoints.tablet
        ? 'tablet'
        : width >= breakpoints.largePhone
          ? 'largePhone'
          : width >= breakpoints.phone
            ? 'phone'
            : 'smallPhone';

  const isTablet = width >= breakpoints.tablet;
  const isPortrait = height >= width;

  // Grid columns for adaptive grids (Quick Access, lists).
  const columns =
    width >= breakpoints.largeTablet ? 4 : width >= breakpoints.tablet ? 3 : 2;

  // Slight size up-scaling on larger displays; 1 on phones.
  const sizeScale = isTablet ? (width >= breakpoints.largeTablet ? 1.15 : 1.08) : 1;

  /** Scale a base spacing value for the current device class. */
  function sp(value: number): number {
    return Math.round(value * sizeScale);
  }

  /** Usable content width after horizontal padding is subtracted. */
  const contentWidth = width - sp(screenPadding) * 2;

  return {
    width,
    height,
    fontScale,
    breakpoint,
    isTablet,
    isPortrait,
    columns,
    contentWidth,
    sizeScale,
    sp,
  };
}