import { SERVICES } from '@/constants/services';
import { getNextOccurrence, getUpcomingOccurrences } from '@/utils/recurrence';

import type { ServiceProgram, UpcomingService } from '@/types';

/**
 * Services/programs query layer. Screens depend on these functions rather than
 * the raw constant, so a later phase can swap the source for an API call
 * without reshaping the UI. Only active services are surfaced.
 *
 * Upcoming dates are always calculated from each programme's recurrence rule;
 * individual occurrences are never stored as records.
 */

export function getServices(): ServiceProgram[] {
  return SERVICES.filter((service) => service.active);
}

export function getService(id: string): ServiceProgram | undefined {
  return SERVICES.find((service) => service.id === id && service.active);
}

/** The next date a programme recurs, or undefined when it has no rule. */
export function getNextOccurrenceFor(
  service: ServiceProgram,
  from: Date = new Date(),
): Date | undefined {
  return getNextOccurrence(service.rule, { time: service.time, from });
}

/** The next `count` dates for a single programme, generated from its rule. */
export function getServiceOccurrences(
  service: ServiceProgram,
  from: Date = new Date(),
  count = 5,
): Date[] {
  return getUpcomingOccurrences(service.rule, { time: service.time, from, count });
}

/** One entry per active programme: its soonest occurrence, earliest first. */
export function getUpcomingServices(from: Date = new Date(), limit?: number): UpcomingService[] {
  const upcoming: UpcomingService[] = [];

  for (const service of getServices()) {
    const date = getNextOccurrenceFor(service, from);
    if (date) upcoming.push({ service, date });
  }

  upcoming.sort(byDateThenTitle);
  return typeof limit === 'number' ? upcoming.slice(0, limit) : upcoming;
}

/**
 * Every generated occurrence within `horizonDays`, earliest first. Dates come
 * from recurrence rules, so no duplicate occurrence records are stored.
 */
export function getUpcomingSchedule(from: Date = new Date(), horizonDays = 180): UpcomingService[] {
  const end = new Date(from.getFullYear(), from.getMonth(), from.getDate() + horizonDays);
  const schedule: UpcomingService[] = [];

  for (const service of getServices()) {
    const dates = getUpcomingOccurrences(service.rule, {
      time: service.time,
      from,
      count: 80,
    });
    for (const date of dates) {
      if (date.getTime() > end.getTime()) break;
      schedule.push({ service, date });
    }
  }

  return schedule.sort(byDateThenTitle);
}

function byDateThenTitle(a: UpcomingService, b: UpcomingService): number {
  return a.date.getTime() - b.date.getTime() || a.service.title.localeCompare(b.service.title);
}
