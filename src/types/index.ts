import type { ComponentProps } from 'react';
import type { MaterialIcons } from '@expo/vector-icons';
import type { ImageSourcePropType } from 'react-native';

export type IconName = ComponentProps<typeof MaterialIcons>['name'];

export type BreakpointName =
  | 'smallPhone'
  | 'phone'
  | 'largePhone'
  | 'tablet'
  | 'largeTablet';

// Church data models. Phase 1+ ship as static demo data; a later phase will
// map these to backend / PostgreSQL responses.
/**
 * How often a service/program gathers. Kept machine-readable so the Services
 * screen can group programmes and a future CMS/admin dashboard can map it
 * directly to a schedule record.
 */
export type ServiceRecurrence = 'weekly' | 'monthly' | 'seasonal';

/**
 * Machine-readable recurrence rule used to generate upcoming occurrences on
 * the fly. Individual dates are never stored; the Services/Calendar screens
 * derive them from this rule so a future CMS can keep authoring one record per
 * programme. Weekdays follow `Date.getDay()` (0 = Sunday … 6 = Saturday) and
 * months follow the calendar (1 = January … 12 = December).
 */
export type ServiceRecurrenceRule =
  | { type: 'weekly'; weekday: number }
  | { type: 'monthly-nth-weekday'; weekday: number; nth: number }
  | { type: 'monthly-day'; day: number }
  | { type: 'yearly-days'; months: number[]; days: number[] };

/**
 * A recurring church service/program. Only confirmed details are stored here;
 * `time`, `location` and `description` stay empty until the organisation
 * supplies them, and new programmes are added by appending to the services
 * constant.
 */
export interface Service {
  id: string;
  title: string;
  /** Cadence used to group programmes on the Services screen. */
  recurrence: ServiceRecurrence;
  /** Rule used to calculate upcoming dates without storing occurrences. */
  rule: ServiceRecurrenceRule;
  /** Human-readable schedule, copied exactly from the confirmed details. */
  schedule: string;
  /** Start time; omitted when the organisation has not supplied one. */
  time?: string;
  /** Venue; omitted unless officially supplied. */
  location?: string;
  /** Only populated when the organisation supplies official wording. */
  description?: string;
  /** Local section artwork; the card falls back to the icon when absent. */
  image?: ImageSourcePropType;
  /** Source aspect ratio (width / height) so artwork is never distorted. */
  imageAspectRatio?: number;
  /** Inactive services are hidden from the UI without being deleted. */
  active: boolean;
  /** Fallback icon used when no artwork is available. */
  icon: IconName;
}

/** Church program/service schedule model. Alias kept for future SDK clarity. */
export type ServiceProgram = Service;

/** A single calculated occurrence pairing an active programme with its date. */
export interface UpcomingService {
  service: ServiceProgram;
  /** Local calendar date of the occurrence (start of day). */
  date: Date;
}

export interface Sermon {
  id: string;
  title: string;
  preacher?: string;
  date?: string;
  category?: string;
  description?: string;
  audioUrl?: string;
  videoUrl?: string;
  duration?: string;
  featured?: boolean;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  endTime?: string;
  location?: string;
  category?: string;
  description?: string;
  image?: string;
  registrationUrl?: string;
  latitude?: number;
  longitude?: number;
}

// Bible / reading / bookmark models (Phase 3)
export interface BibleBook {
  id: string;
  name: string;
  testament: 'ot' | 'nt';
  chapters: number;
  order: number;
}

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  bookId: string;
  bookName: string;
  chapter: number;
  verses: BibleVerse[];
  isSample: boolean;
  totalChapters: number;
}

export interface BibleSearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface ReadingRecord {
  bookId: string;
  bookName: string;
  chapter: number;
  updatedAt: number;
}

export interface BibleBookmark {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  createdAt: number;
}

/**
 * Announcement grouping. Kept machine-readable (rather than a free-text label)
 * so screens can filter and a future CMS/admin dashboard can map each notice to
 * a category record directly.
 */
export type AnnouncementCategory =
  | 'general'
  | 'service'
  | 'program'
  | 'event'
  | 'important'
  | 'reminder';

/** Presentation metadata for an announcement category (label + fallback icon). */
export interface AnnouncementCategoryMeta {
  id: AnnouncementCategory;
  /** Human-readable label shown on cards and filter chips. */
  label: string;
  icon: IconName;
}

/**
 * A church announcement/notice. `shortDescription` powers list cards while
 * `fullDescription` powers the detail screen. Every optional field is omitted
 * when the organisation has not supplied it, so the UI never renders an empty
 * label. `date` is the display/publish date; `startDate`/`endDate` describe an
 * optional bounded period (for example a multi-day event).
 */
export interface Announcement {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: AnnouncementCategory;
  /** Display/publish date (ISO YYYY-MM-DD). */
  date: string;
  /** Optional time label shown only when supplied. */
  time?: string;
  /** Optional period start (ISO YYYY-MM-DD) for multi-day notices. */
  startDate?: string;
  /** Optional period end (ISO YYYY-MM-DD) for multi-day notices. */
  endDate?: string;
  /** Venue shown only when supplied. */
  location?: string;
  /** Local artwork; the card falls back to the category icon when absent. */
  image?: ImageSourcePropType;
  /** Source aspect ratio (width / height) so artwork is never distorted. */
  imageAspectRatio?: number;
  /** Pinned to the featured slot on the Announcements screen. */
  isFeatured?: boolean;
  /** Highlighted as important across the app. */
  isImportant?: boolean;
}

export interface QuickAccessItem {
  id: string;
  label: string;
  image: ImageSourcePropType;
  route: string;
}

export interface MenuItem {
  id: string;
  label: string;
  /** Used when the section has no artwork. */
  icon: IconName;
  /** Local section artwork; supersedes the icon when supplied. */
  image?: ImageSourcePropType;
  route: string;
}

export interface MenuSection {
  id: string;
  title: string;
  items: MenuItem[];
}

/** Postal contact details for a church location. */
export interface Address {
  addressLine: string;
  city: string;
  state: string;
  country: string;
}

/**
 * A church branch/location. Coordinates are optional until map integration is
 * implemented; no invented coordinates are ever stored. Contact details are
 * optional too and are only populated with officially supplied values.
 */
export interface Branch extends Address {
  id: string;
  name: string;
  latitude?: number;
  longitude?: number;
  /** Marks the confirmed headquarters/main location. */
  isMain?: boolean;
  /** Official phone/email contact, only when supplied by the organisation. */
  phone?: string;
  email?: string;
}

/**
 * A ministry leader. `photo` accepts a require()'d asset once official
 * photographs are supplied; when absent the UI renders a placeholder.
 */
export interface Leader {
  id: string;
  name: string;
  /** Display role shown on cards, e.g. "Founder / Late General Overseer". */
  title: string;
  /** Short preview for cards when a biography is not yet supplied. */
  bioPreview?: string;
  /** Full biography. Only populated with organisation-provided text. */
  biography?: string;
  photo?: number;
  /** Profile screen route for this leader. */
  route: string;
}

/** Confirmed church identity and education content. */
export interface ChurchInformation {
  organisationName: string;
  shortName: string;
  founder: string;
  generalOverseer: string;
  mainLocation: string;
  /** Set only when the organisation supplies the text. */
  history?: string;
  mission?: string[];
  vision?: string[];
  motto?: string;
}