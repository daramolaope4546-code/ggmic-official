import type { ComponentProps } from 'react';
import type { MaterialIcons } from '@expo/vector-icons';

export type IconName = ComponentProps<typeof MaterialIcons>['name'];

export type BreakpointName =
  | 'smallPhone'
  | 'phone'
  | 'largePhone'
  | 'tablet'
  | 'largeTablet';

// Church data models. Phase 1+ ship as static demo data; a later phase will
// map these to backend / PostgreSQL responses.
export interface Service {
  id: string;
  name: string;
  day: string;
  time: string;
  /** Recurrence label such as "Every Sunday". */
  frequency?: string;
  icon: IconName;
  branch: string;
  location: string;
}

/** Church program/service schedule model. Alias kept for future SDK clarity. */
export type ServiceProgram = Service;

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

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date?: string;
}

export interface QuickAccessItem {
  id: string;
  label: string;
  icon: IconName;
  route: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: IconName;
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
 * implemented; no invented coordinates are ever stored.
 */
export interface Branch extends Address {
  id: string;
  name: string;
  latitude?: number;
  longitude?: number;
  /** Marks the confirmed headquarters/main location. */
  isMain?: boolean;
}

/**
 * A ministry leader. `photo` accepts a require()'d asset once official
 * photographs are supplied; when absent the UI renders a placeholder.
 */
export interface Leader {
  id: string;
  name: string;
  /** Display role shown on cards, e.g. "Founder / First General Overseer". */
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