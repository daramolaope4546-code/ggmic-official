import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  AppHeader,
  EmptyState,
  FilterChip,
  ScreenContainer,
  SearchBar,
  SermonCard,
} from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import { getSermonCategories, searchSermons } from '@/services/sermons';
import { spacing } from '@/theme';

/** Sermon search with category filter. Initial category can arrive as a param. */
export default function SermonSearchScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const params = useLocalSearchParams<{ category?: string }>();
  const initialCategory = params.category ?? null;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(initialCategory);

  const results = searchSermons(query, category);

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Search Sermons" showBack />

      <View style={{ marginTop: sp(spacing.sm) }}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Search titles and speakers…"
        />
      </View>

      <View style={[styles.wrap, { gap: sp(spacing.xs), marginTop: sp(spacing.md) }]}>
        <FilterChip label="All" selected={category === null} onPress={() => setCategory(null)} />
        {getSermonCategories().map((c) => (
          <FilterChip
            key={c}
            label={c}
            selected={category === c}
            onPress={() => setCategory(category === c ? null : c)}
          />
        ))}
      </View>

      <View style={{ gap: sp(spacing.sm), marginTop: sp(spacing.lg) }}>
        {results.length === 0 ? (
          <EmptyState
            icon="search-off"
            title="No sermons found"
            message="Try a different search term or category. Official sermon recordings will be added when the ministry library is connected."
          />
        ) : (
          results.map((sermon) => (
            <SermonCard
              key={sermon.id}
              sermon={sermon}
              onPress={() =>
                router.push({ pathname: '/sermons/detail', params: { id: sermon.id } })
              }
            />
          ))
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});