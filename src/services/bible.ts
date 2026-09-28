import { BIBLE_BOOKS, getSampleChapter } from '@/constants/bible';
import type {
  BibleBook,
  BibleBookmark,
  BibleChapter,
  BibleSearchResult,
  ReadingRecord,
} from '@/types';

// ── Book queries ────────────────────────────────────────────────────────────

export function getBibleBooks(): BibleBook[] {
  return BIBLE_BOOKS;
}

export function getBibleBook(bookId: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === bookId);
}

export function getTestamentBooks(testament: 'ot' | 'nt'): BibleBook[] {
  return BIBLE_BOOKS.filter((b) => b.testament === testament);
}

export function getChapterCount(bookId: string): number {
  return getBibleBook(bookId)?.chapters ?? 0;
}

// ── Chapter content ─────────────────────────────────────────────────────────

export function getBibleChapter(bookId: string, chapter: number): BibleChapter | null {
  const book = getBibleBook(bookId);
  if (!book || chapter < 1 || chapter > book.chapters) return null;

  const sample = getSampleChapter(bookId, chapter);

  return {
    bookId,
    bookName: book.name,
    chapter,
    verses: sample?.verses ?? [],
    isSample: sample !== undefined,
    totalChapters: book.chapters,
  };
}

// ── Search ──────────────────────────────────────────────────────────────────

export function searchBible(query: string): BibleSearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 2) return [];

  const results: BibleSearchResult[] = [];

  for (const book of BIBLE_BOOKS) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      const sample = getSampleChapter(book.id, ch);
      if (!sample) continue;
      for (const verse of sample.verses) {
        if (verse.text.toLowerCase().includes(trimmed)) {
          results.push({
            bookId: book.id,
            bookName: book.name,
            chapter: ch,
            verse: verse.number,
            text: verse.text,
          });
        }
      }
    }
  }

  return results;
}

// ── Reading history (in-memory, session-only in Phase 3) ────────────────────

let lastRead: ReadingRecord | null = null;

export function saveReadingPosition(
  bookId: string,
  bookName: string,
  chapter: number,
): void {
  lastRead = { bookId, bookName, chapter, updatedAt: Date.now() };
}

export function getLastRead(): ReadingRecord | null {
  return lastRead;
}

// ── Bookmarks (in-memory, session-only in Phase 3) ─────────────────────────

const bookmarks: BibleBookmark[] = [];

export function getBookmarks(): BibleBookmark[] {
  return bookmarks;
}

export function isVerseBookmarked(
  bookId: string,
  chapter: number,
  verse: number,
): boolean {
  return bookmarks.some(
    (b) => b.bookId === bookId && b.chapter === chapter && b.verse === verse,
  );
}

/** Toggle bookmark for a verse. Returns `true` if the verse is now bookmarked. */
export function toggleVerseBookmark(
  bookId: string,
  bookName: string,
  chapter: number,
  verse: number,
): boolean {
  const idx = bookmarks.findIndex(
    (b) => b.bookId === bookId && b.chapter === chapter && b.verse === verse,
  );
  if (idx >= 0) {
    bookmarks.splice(idx, 1);
    return false;
  }
  bookmarks.push({ bookId, bookName, chapter, verse, createdAt: Date.now() });
  return true;
}

// ── Recent searches (in-memory, session-only) ───────────────────────────────

const recentSearches: string[] = [];
const MAX_RECENT = 5;

export function getRecentSearches(): string[] {
  return recentSearches;
}

export function addRecentSearch(term: string): void {
  const trimmed = term.trim();
  if (!trimmed) return;
  const filtered = recentSearches.filter(
    (s) => s.toLowerCase() !== trimmed.toLowerCase(),
  );
  filtered.unshift(trimmed);
  recentSearches.splice(0, recentSearches.length, ...filtered.slice(0, MAX_RECENT));
}
