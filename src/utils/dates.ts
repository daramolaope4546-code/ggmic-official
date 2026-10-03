const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Format an ISO date (YYYY-MM-DD) for display, omitting the year when it is the current year. */
export function formatDisplayDate(dateValue: string): string {
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return dateValue;
  const month = d.toLocaleString('en', { month: 'short' });
  const day = d.getDate();
  const currentYear = new Date().getFullYear();
  return d.getFullYear() === currentYear
    ? `${month} ${day}`
    : `${month} ${day}, ${d.getFullYear()}`;
}

/** "Sunday, 5 October 2026". */
export function formatLongDate(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** "Sun, 5 Oct". */
export function formatShortDate(date: Date): string {
  return `${WEEKDAYS_SHORT[date.getDay()]}, ${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

/** "October 2026". */
export function formatMonthYear(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Three-letter month, e.g. "OCT", for compact date chips. */
export function formatMonthAbbreviation(date: Date): string {
  return MONTHS_SHORT[date.getMonth()].toUpperCase();
}

/** Whole local calendar days from `from` to `date` (negative when past). */
export function daysBetween(from: Date, date: Date): number {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  return Math.round((end - start) / MS_PER_DAY);
}

/**
 * Friendly relative label: "Today", "Tomorrow", "In 3 days", otherwise the
 * short date. Comparisons are made at calendar-day granularity.
 */
export function formatRelativeDay(date: Date, from: Date = new Date()): string {
  const diff = daysBetween(from, date);
  if (diff <= 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff < 7) return `In ${diff} days`;
  return formatShortDate(date);
}
