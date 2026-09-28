import { breakpoints } from '@/theme';

/**
 * Returns a percentage string for a single grid item width given `columns` and
 * an inter-item `gap` (in pixels). Each item width includes exactly one gap on
 * its trailing edge so that wrapping produces uniform spacing.
 */
export function gridItemWidth(columns: number, gap: number, contentWidth: number): `${number}%` {
  if (columns <= 1) return '100%';
  const availableForItems = contentWidth - gap * (columns - 1);
  const percent = Number(((availableForItems / columns / contentWidth) * 100).toFixed(2));
  return `${percent}%`;
}

/** Whether a given width should be treated as a tablet (or landscape phone). */
export function isTabletWidth(width: number): boolean {
  return width >= breakpoints.tablet;
}