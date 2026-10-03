import type { ServiceRecurrenceRule } from '@/types';

export interface RecurrenceOptions {
  /** Confirmed start time in 12-hour form (e.g. "8:00 AM"). Omit when none. */
  time?: string;
  /** Reference moment; defaults to now. */
  from?: Date;
}

/** Local midnight for the given date. Never mutates the input. */
export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Parse "8:00 AM" / "5:30 PM" into 24-hour parts, or undefined if absent. */
export function parseTime(time?: string): { hours: number; minutes: number } | undefined {
  if (!time) return undefined;
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time.trim());
  if (!match) return undefined;

  const minutes = Number(match[2]);
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === 'PM') hours += 12;
  return { hours, minutes };
}

function instantOf(date: Date, time?: string): Date {
  const base = startOfDay(date);
  const parsed = parseTime(time);
  if (parsed) base.setHours(parsed.hours, parsed.minutes, 0, 0);
  return base;
}

/**
 * Whether a candidate calendar date is still upcoming relative to `from`.
 * With a confirmed time the exact start moment is compared, so a service whose
 * time already passed today rolls to its next occurrence. Without a time only
 * the calendar day is compared, so a programme happening today still counts as
 * upcoming rather than being skipped.
 */
function isUpcoming(candidate: Date, time: string | undefined, from: Date): boolean {
  const threshold = time ? from : startOfDay(from);
  return instantOf(candidate, time).getTime() >= threshold.getTime();
}

function addMonths(year: number, month: number, delta: number): { year: number; month: number } {
  const total = year * 12 + month + delta;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
}

/**
 * Nth weekday of a month. `nth` is 1-based; a negative value counts backwards
 * from the end of the month (-1 = last).
 */
function nthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): Date {
  if (nth > 0) {
    const offset = (weekday - new Date(year, month, 1).getDay() + 7) % 7;
    return new Date(year, month, 1 + offset + (nth - 1) * 7);
  }

  const last = new Date(year, month + 1, 0);
  const offset = (last.getDay() - weekday + 7) % 7;
  return new Date(year, month, last.getDate() - offset);
}

function nextOccurrence(rule: ServiceRecurrenceRule, options: RecurrenceOptions): Date | undefined {
  const from = options.from ?? new Date();
  const { time } = options;

  switch (rule.type) {
    case 'weekly': {
      const candidate = startOfDay(from);
      candidate.setDate(candidate.getDate() + ((rule.weekday - candidate.getDay() + 7) % 7));
      if (!isUpcoming(candidate, time, from)) candidate.setDate(candidate.getDate() + 7);
      return candidate;
    }

    case 'monthly-nth-weekday': {
      let cursor = { year: from.getFullYear(), month: from.getMonth() };
      for (let i = 0; i < 24; i += 1) {
        const candidate = nthWeekdayOfMonth(cursor.year, cursor.month, rule.weekday, rule.nth);
        if (isUpcoming(candidate, time, from)) return candidate;
        cursor = addMonths(cursor.year, cursor.month, 1);
      }
      return undefined;
    }

    case 'monthly-day': {
      let cursor = { year: from.getFullYear(), month: from.getMonth() };
      for (let i = 0; i < 24; i += 1) {
        const candidate = new Date(cursor.year, cursor.month, rule.day);
        if (isUpcoming(candidate, time, from)) return candidate;
        cursor = addMonths(cursor.year, cursor.month, 1);
      }
      return undefined;
    }

    case 'yearly-days': {
      const months = [...rule.months].sort((a, b) => a - b);
      const day = Math.min(...rule.days);
      for (let year = from.getFullYear(); year <= from.getFullYear() + 3; year += 1) {
        for (const month of months) {
          const candidate = new Date(year, month - 1, day);
          if (isUpcoming(candidate, time, from)) return candidate;
        }
      }
      return undefined;
    }
  }
}

/** The next occurrence of a rule on/after `from`, or undefined if unset. */
export function getNextOccurrence(
  rule: ServiceRecurrenceRule | undefined,
  options: RecurrenceOptions = {},
): Date | undefined {
  if (!rule) return undefined;
  return nextOccurrence(rule, options);
}

/**
 * The next `count` occurrences, generated from the rule (never stored). Each
 * date is the local calendar date of the occurrence.
 */
export function getUpcomingOccurrences(
  rule: ServiceRecurrenceRule | undefined,
  options: RecurrenceOptions & { count?: number } = {},
): Date[] {
  if (!rule) return [];

  const { time, from = new Date(), count = 5 } = options;
  const occurrences: Date[] = [];
  let cursor = from;

  for (let i = 0; i < count; i += 1) {
    const next = nextOccurrence(rule, { time, from: cursor });
    if (!next) break;
    occurrences.push(next);
    // Advance one calendar day (DST-safe) so the next search starts after it.
    cursor = new Date(next.getFullYear(), next.getMonth(), next.getDate() + 1);
  }

  return occurrences;
}
