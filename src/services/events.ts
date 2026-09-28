import { DEMO_EVENTS, EVENT_CATEGORIES } from '@/constants/events';
import type { ChurchEvent } from '@/types';

const TODAY = new Date('2026-09-15');

function isUpcoming(event: ChurchEvent): boolean {
  return event.date >= '2026-09-15';
}

function sortByDateAsc(a: ChurchEvent, b: ChurchEvent): number {
  return a.date.localeCompare(b.date);
}

function sortByDateDesc(a: ChurchEvent, b: ChurchEvent): number {
  return b.date.localeCompare(a.date);
}

// ── Queries ─────────────────────────────────────────────────────────────────

export function getUpcomingEvents(): ChurchEvent[] {
  return DEMO_EVENTS.filter(isUpcoming).sort(sortByDateAsc);
}

export function getPastEvents(): ChurchEvent[] {
  return DEMO_EVENTS.filter((e) => !isUpcoming(e)).sort(sortByDateDesc);
}

export function getNextEvent(): ChurchEvent | undefined {
  return getUpcomingEvents()[0];
}

export function getEvent(id: string): ChurchEvent | undefined {
  return DEMO_EVENTS.find((e) => e.id === id);
}

export function getEventCategories(): string[] {
  return EVENT_CATEGORIES;
}

export function searchEvents(
  query: string,
  opts?: { upcoming?: boolean; past?: boolean; category?: string | null },
): ChurchEvent[] {
  const trimmed = query.trim().toLowerCase();

  let results = DEMO_EVENTS;

  if (opts?.upcoming && !opts?.past) {
    results = results.filter(isUpcoming);
  } else if (opts?.past && !opts?.upcoming) {
    results = results.filter((e) => !isUpcoming(e));
  }

  if (opts?.category) {
    results = results.filter(
      (e) => e.category?.toLowerCase() === opts.category!.toLowerCase(),
    );
  }

  if (trimmed.length >= 2) {
    results = results.filter(
      (e) =>
        e.title.toLowerCase().includes(trimmed) ||
        e.description?.toLowerCase().includes(trimmed) ||
        e.location?.toLowerCase().includes(trimmed),
    );
  }

  return results.sort(sortByDateAsc);
}
