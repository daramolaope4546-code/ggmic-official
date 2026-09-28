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