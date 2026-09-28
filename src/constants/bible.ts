import type { BibleBook, BibleVerse } from '@/types';

/**
 * Bible book definitions (Protestant canon). Chapter counts are factual
 * standard data and not copyrighted. Actual Bible text is NOT included here;
 * a tiny hand-written demo passage is provided separately for UI previews.
 *
 * LOCAL DEMO DATA — A later phase will load full Bible content from an API.
 */

// ── Old Testament (39 books) ────────────────────────────────────────────────

const OT_BOOKS: BibleBook[] = [
  { id: 'genesis', name: 'Genesis', testament: 'ot', chapters: 50, order: 1 },
  { id: 'exodus', name: 'Exodus', testament: 'ot', chapters: 40, order: 2 },
  { id: 'leviticus', name: 'Leviticus', testament: 'ot', chapters: 27, order: 3 },
  { id: 'numbers', name: 'Numbers', testament: 'ot', chapters: 36, order: 4 },
  { id: 'deuteronomy', name: 'Deuteronomy', testament: 'ot', chapters: 34, order: 5 },
  { id: 'joshua', name: 'Joshua', testament: 'ot', chapters: 24, order: 6 },
  { id: 'judges', name: 'Judges', testament: 'ot', chapters: 21, order: 7 },
  { id: 'ruth', name: 'Ruth', testament: 'ot', chapters: 4, order: 8 },
  { id: '1-samuel', name: '1 Samuel', testament: 'ot', chapters: 31, order: 9 },
  { id: '2-samuel', name: '2 Samuel', testament: 'ot', chapters: 24, order: 10 },
  { id: '1-kings', name: '1 Kings', testament: 'ot', chapters: 22, order: 11 },
  { id: '2-kings', name: '2 Kings', testament: 'ot', chapters: 25, order: 12 },
  { id: '1-chronicles', name: '1 Chronicles', testament: 'ot', chapters: 29, order: 13 },
  { id: '2-chronicles', name: '2 Chronicles', testament: 'ot', chapters: 36, order: 14 },
  { id: 'ezra', name: 'Ezra', testament: 'ot', chapters: 10, order: 15 },
  { id: 'nehemiah', name: 'Nehemiah', testament: 'ot', chapters: 13, order: 16 },
  { id: 'esther', name: 'Esther', testament: 'ot', chapters: 10, order: 17 },
  { id: 'job', name: 'Job', testament: 'ot', chapters: 42, order: 18 },
  { id: 'psalms', name: 'Psalms', testament: 'ot', chapters: 150, order: 19 },
  { id: 'proverbs', name: 'Proverbs', testament: 'ot', chapters: 31, order: 20 },
  { id: 'ecclesiastes', name: 'Ecclesiastes', testament: 'ot', chapters: 12, order: 21 },
  { id: 'song-of-solomon', name: 'Song of Solomon', testament: 'ot', chapters: 8, order: 22 },
  { id: 'isaiah', name: 'Isaiah', testament: 'ot', chapters: 66, order: 23 },
  { id: 'jeremiah', name: 'Jeremiah', testament: 'ot', chapters: 52, order: 24 },
  { id: 'lamentations', name: 'Lamentations', testament: 'ot', chapters: 5, order: 25 },
  { id: 'ezekiel', name: 'Ezekiel', testament: 'ot', chapters: 48, order: 26 },
  { id: 'daniel', name: 'Daniel', testament: 'ot', chapters: 12, order: 27 },
  { id: 'hosea', name: 'Hosea', testament: 'ot', chapters: 14, order: 28 },
  { id: 'joel', name: 'Joel', testament: 'ot', chapters: 3, order: 29 },
  { id: 'amos', name: 'Amos', testament: 'ot', chapters: 9, order: 30 },
  { id: 'obadiah', name: 'Obadiah', testament: 'ot', chapters: 1, order: 31 },
  { id: 'jonah', name: 'Jonah', testament: 'ot', chapters: 4, order: 32 },
  { id: 'micah', name: 'Micah', testament: 'ot', chapters: 7, order: 33 },
  { id: 'nahum', name: 'Nahum', testament: 'ot', chapters: 3, order: 34 },
  { id: 'habakkuk', name: 'Habakkuk', testament: 'ot', chapters: 3, order: 35 },
  { id: 'zephaniah', name: 'Zephaniah', testament: 'ot', chapters: 3, order: 36 },
  { id: 'haggai', name: 'Haggai', testament: 'ot', chapters: 2, order: 37 },
  { id: 'zechariah', name: 'Zechariah', testament: 'ot', chapters: 14, order: 38 },
  { id: 'malachi', name: 'Malachi', testament: 'ot', chapters: 4, order: 39 },
];

// ── New Testament (27 books) ────────────────────────────────────────────────

const NT_BOOKS: BibleBook[] = [
  { id: 'matthew', name: 'Matthew', testament: 'nt', chapters: 28, order: 40 },
  { id: 'mark', name: 'Mark', testament: 'nt', chapters: 16, order: 41 },
  { id: 'luke', name: 'Luke', testament: 'nt', chapters: 24, order: 42 },
  { id: 'john', name: 'John', testament: 'nt', chapters: 21, order: 43 },
  { id: 'acts', name: 'Acts', testament: 'nt', chapters: 28, order: 44 },
  { id: 'romans', name: 'Romans', testament: 'nt', chapters: 16, order: 45 },
  { id: '1-corinthians', name: '1 Corinthians', testament: 'nt', chapters: 16, order: 46 },
  { id: '2-corinthians', name: '2 Corinthians', testament: 'nt', chapters: 13, order: 47 },
  { id: 'galatians', name: 'Galatians', testament: 'nt', chapters: 6, order: 48 },
  { id: 'ephesians', name: 'Ephesians', testament: 'nt', chapters: 6, order: 49 },
  { id: 'philippians', name: 'Philippians', testament: 'nt', chapters: 4, order: 50 },
  { id: 'colossians', name: 'Colossians', testament: 'nt', chapters: 4, order: 51 },
  { id: '1-thessalonians', name: '1 Thessalonians', testament: 'nt', chapters: 5, order: 52 },
  { id: '2-thessalonians', name: '2 Thessalonians', testament: 'nt', chapters: 3, order: 53 },
  { id: '1-timothy', name: '1 Timothy', testament: 'nt', chapters: 6, order: 54 },
  { id: '2-timothy', name: '2 Timothy', testament: 'nt', chapters: 4, order: 55 },
  { id: 'titus', name: 'Titus', testament: 'nt', chapters: 3, order: 56 },
  { id: 'philemon', name: 'Philemon', testament: 'nt', chapters: 1, order: 57 },
  { id: 'hebrews', name: 'Hebrews', testament: 'nt', chapters: 13, order: 58 },
  { id: 'james', name: 'James', testament: 'nt', chapters: 5, order: 59 },
  { id: '1-peter', name: '1 Peter', testament: 'nt', chapters: 5, order: 60 },
  { id: '2-peter', name: '2 Peter', testament: 'nt', chapters: 3, order: 61 },
  { id: '1-john', name: '1 John', testament: 'nt', chapters: 5, order: 62 },
  { id: '2-john', name: '2 John', testament: 'nt', chapters: 1, order: 63 },
  { id: '3-john', name: '3 John', testament: 'nt', chapters: 1, order: 64 },
  { id: 'jude', name: 'Jude', testament: 'nt', chapters: 1, order: 65 },
  { id: 'revelation', name: 'Revelation', testament: 'nt', chapters: 22, order: 66 },
];

export const BIBLE_BOOKS: BibleBook[] = [...OT_BOOKS, ...NT_BOOKS];

// ── Sample passages (hand-written, clearly not the actual Bible text) ────────
// These exist only to populate the reading interface during development.
// Full Bible text will be loaded from an API in a later phase.

interface SampleChapter {
  verses: BibleVerse[];
}

const SAMPLE_CHAPTERS: Record<string, Record<number, SampleChapter>> = {
  genesis: {
    1: {
      verses: [
        {
          number: 1,
          text: 'Sample verse one — In the beginning the world was formed. This is development-preview content for the Bible reader.',
        },
        {
          number: 2,
          text: 'Sample verse two — The full Bible text will be connected when the Bible library integration is complete.',
        },
        {
          number: 3,
          text: 'Sample verse three — Use this preview to explore the reading interface, font sizes and reading modes.',
        },
        {
          number: 4,
          text: 'Sample verse four — Chapters without sample content will display an honest placeholder message.',
        },
        {
          number: 5,
          text: 'Sample verse five — No copyrighted scripture text is included in this development preview.',
        },
      ],
    },
  },
  mark: {
    1: {
      verses: [
        {
          number: 1,
          text: 'Sample verse one — This is a development-preview passage in the book of Mark.',
        },
        {
          number: 2,
          text: 'Sample verse two — The full Bible text will be loaded from a future API integration.',
        },
        {
          number: 3,
          text: 'Sample verse three — This sample keeps the reading interface functional during development.',
        },
      ],
    },
  },
  psalms: {
    23: {
      verses: [
        {
          number: 1,
          text: 'Sample verse one — This is a development-preview passage in the Psalms.',
        },
        {
          number: 2,
          text: 'Sample verse two — Full scripture content arrives with the Bible library integration.',
        },
        {
          number: 3,
          text: 'Sample verse three — Use this preview to test chapter navigation and reading settings.',
        },
        {
          number: 4,
          text: 'Sample verse four — The reading mode controls support Light, Sepia and Night themes.',
        },
        {
          number: 5,
          text: 'Sample verse five — No copyrighted text is included in this demo build.',
        },
      ],
    },
  },
  john: {
    3: {
      verses: [
        {
          number: 16,
          text: 'Sample verse — This is a development-preview placeholder in the book of John.',
        },
      ],
    },
  },
};

export function getSampleChapter(bookId: string, chapter: number): SampleChapter | undefined {
  return SAMPLE_CHAPTERS[bookId]?.[chapter];
}
