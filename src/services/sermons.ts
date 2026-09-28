import { DEMO_SERMONS, SERMON_CATEGORIES } from '@/constants/sermons';
import type { Sermon } from '@/types';

// ── Queries ─────────────────────────────────────────────────────────────────

export function getSermons(): Sermon[] {
  return DEMO_SERMONS;
}

export function getFeaturedSermon(): Sermon | undefined {
  return DEMO_SERMONS.find((s) => s.featured);
}

export function getSermon(id: string): Sermon | undefined {
  return DEMO_SERMONS.find((s) => s.id === id);
}

export function getSermonCategories(): string[] {
  return SERMON_CATEGORIES;
}

export function searchSermons(
  query: string,
  category?: string | null,
): Sermon[] {
  const trimmed = query.trim().toLowerCase();
  let results = DEMO_SERMONS;

  if (category) {
    results = results.filter(
      (s) => s.category?.toLowerCase() === category.toLowerCase(),
    );
  }

  if (trimmed.length < 2) return results;

  return results.filter(
    (s) =>
      s.title.toLowerCase().includes(trimmed) ||
      s.description?.toLowerCase().includes(trimmed) ||
      s.preacher?.toLowerCase().includes(trimmed),
  );
}
