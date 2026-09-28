import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import {
  AppHeader,
  EmptyState,
  ScreenContainer,
  SearchBar,
} from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import {
  addRecentSearch,
  getRecentSearches,
  searchBible,
} from '@/services/bible';
import { colors, fontSizes, fontWeights, minTouchTarget, radius, spacing } from '@/theme';

import type { BibleSearchResult } from '@/types';

/**
 * Bible search over the development-preview sample passage. Results link into
 * the reader; recent searches are tracked in-memory for the session.
 */
export default function BibleSearchScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<BibleSearchResult[]>([]);
  const [recent, setRecent] = useState<string[]>(() => getRecentSearches());

  const runSearch = (term: string) => {
    const t = term || query;
    if (!t.trim()) return;
    addRecentSearch(t);
    setRecent(getRecentSearches());
    setResults(searchBible(t));
    setSubmitted(true);
  };

  const clear = () => {
    setQuery('');
    setSubmitted(false);
    setResults([]);
  };

  const showRecent = !submitted && query.trim().length === 0;

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Search" subtitle="Find verses" showBack />

      <View style={{ marginTop: sp(spacing.sm) }}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={clear}
          onSubmit={() => runSearch(query)}
          placeholder="Search the Bible…"
          autoFocus
        />
      </View>

      <Text style={[styles.hint, { fontSize: sp(fontSizes.small), marginTop: sp(spacing.sm) }]}>
        Searching the development-preview sample passage.
      </Text>

      {showRecent ? (
        <View style={{ marginTop: sp(spacing.lg) }}>
          {recent.length > 0 ? (
            <>
              <Text style={[styles.sectionTitle, { fontSize: sp(fontSizes.subtitle) }]}>
                Recent searches
              </Text>
              <View style={[styles.wrap, { gap: sp(spacing.xs), marginTop: sp(spacing.sm) }]}>
                {recent.map((term) => (
                  <Pressable
                    key={term}
                    accessibilityLabel={`Search for ${term}`}
                    accessibilityRole="button"
                    onPress={() => {
                      setQuery(term);
                      runSearch(term);
                    }}
                    style={({ pressed }) => [
                      styles.chip,
                      {
                        minHeight: sp(minTouchTarget),
                        borderRadius: sp(radius.pill),
                        paddingHorizontal: sp(spacing.md),
                      },
                      pressed && styles.pressed,
                    ]}
                  >
                    <MaterialIcons name="history" size={sp(14)} color={colors.primary} />
                    <Text style={[styles.chipText, { fontSize: sp(fontSizes.small) }]}>{term}</Text>
                  </Pressable>
                ))}
              </View>
            </>
          ) : (
            <EmptyState
              icon="search"
              title="Search the Bible"
              message="Verses from the sample passage will appear here when the Bible library is connected."
            />
          )}
        </View>
      ) : null}

      {submitted ? (
        <View style={{ marginTop: sp(spacing.lg) }}>
          {results.length === 0 ? (
            <EmptyState
              icon="search-off"
              title="No verses found"
              message="Bible search content will be available when the Bible library is connected."
            />
          ) : (
            <View style={{ gap: sp(spacing.sm) }}>
              <Text style={[styles.sectionTitle, { fontSize: sp(fontSizes.subtitle) }]}>
                {results.length} result{results.length === 1 ? '' : 's'}
              </Text>
              {results.map((r) => (
                <ResultRow
                  key={`${r.bookId}-${r.chapter}-${r.verse}`}
                  result={r}
                  onPress={() =>
                    router.push({
                      pathname: '/bible/read',
                      params: { bookId: r.bookId, chapter: String(r.chapter) },
                    })
                  }
                  sp={sp}
                />
              ))}
            </View>
          )}
        </View>
      ) : null}
    </ScreenContainer>
  );
}

interface ResultRowProps {
  result: BibleSearchResult;
  onPress: () => void;
  sp: (value: number) => number;
}

function ResultRow({ result, onPress, sp }: ResultRowProps) {
  return (
    <Pressable
      accessibilityLabel={`${result.bookName} ${result.chapter}:${result.verse}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.resultCard,
        { padding: sp(spacing.md), borderRadius: sp(radius.lg) },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.ref, { fontSize: sp(fontSizes.body) }]}>
        {result.bookName} {result.chapter}:{result.verse}
      </Text>
      <Text
        style={[styles.resultText, { fontSize: sp(fontSizes.small), lineHeight: sp(20) }]}
        numberOfLines={2}
      >
        {result.text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hint: {
    color: colors.textSecondary,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    gap: spacing.xxs,
  },
  chipText: {
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
  resultCard: {
    backgroundColor: colors.surface,
  },
  ref: {
    color: colors.primaryDark,
    fontWeight: fontWeights.bold,
  },
  resultText: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  pressed: { opacity: 0.7 },
});