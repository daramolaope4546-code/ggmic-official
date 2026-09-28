import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  AppHeader,
  EmptyState,
  EventCard,
  FilterChip,
  ScreenContainer,
  SearchBar,
} from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import { getEventCategories, searchEvents } from '@/services/events';
import { spacing } from '@/theme';

type FilterPreset = 'all' | 'upcoming' | 'past';

const FILTER_LABELS: Record<FilterPreset, string> = {
  all: 'All',
  upcoming: 'Upcoming',
  past: 'Past',
};

/** Event search + filter by time frame and category. */
export default function EventSearchScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const params = useLocalSearchParams<{ filter?: string; category?: string }>();
  const initialFilter: FilterPreset =
    params.filter === 'upcoming' || params.filter === 'past' ? params.filter : 'all';

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterPreset>(initialFilter);
  const [category, setCategory] = useState<string | null>(params.category ?? null);

  const results = searchEvents(query, {
    upcoming: filter === 'upcoming',
    past: filter === 'past',
    category,
  });

  const openDetail = (id: string) =>
    router.push({ pathname: '/events/detail', params: { id } });

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Search Events" subtitle="Find and filter upcoming gatherings" showBack />

      <View style={{ marginTop: sp(spacing.sm) }}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Search events…"
        />
      </View>

      <View style={[styles.wrap, { gap: sp(spacing.xs), marginTop: sp(spacing.md) }]}>
        {(Object.keys(FILTER_LABELS) as FilterPreset[]).map((key) => (
          <FilterChip
            key={key}
            label={FILTER_LABELS[key]}
            selected={filter === key}
            onPress={() => setFilter(key)}
          />
        ))}
      </View>

      <View style={[styles.wrap, { gap: sp(spacing.xs), marginTop: sp(spacing.sm) }]}>
        {getEventCategories().map((c) => (
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
            title="No events found"
            message="Try a different search term or filter. Official events will appear once the events feed is connected."
          />
        ) : (
          results.map((event) => (
            <EventCard key={event.id} event={event} onPress={() => openDetail(event.id)} />
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