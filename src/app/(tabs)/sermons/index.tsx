import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import {
  AppHeader,
  EmptyState,
  FilterChip,
  ScreenContainer,
  SectionHeader,
  SermonCard,
} from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import {
  getFeaturedSermon,
  getSermonCategories,
  getSermons,
} from '@/services/sermons';
import { colors, fontSizes, fontWeights, minTouchTarget, radius, spacing } from '@/theme';

/** Sermons home: featured, categories and the latest library. */
export default function SermonsScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featured = getFeaturedSermon();
  const sermons = selectedCategory
    ? getSermons().filter(
        (s) => s.category?.toLowerCase() === selectedCategory.toLowerCase(),
      )
    : getSermons();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Sermons" subtitle="Listen and be encouraged" />

      <Pressable
        accessibilityLabel="Search sermons"
        accessibilityRole="button"
        onPress={() => router.push('/sermons/search')}
        style={({ pressed }) => [
          styles.searchCard,
          { minHeight: sp(minTouchTarget), borderRadius: sp(radius.lg) },
          pressed && styles.pressed,
        ]}
      >
        <MaterialIcons name="search" size={sp(20)} color={colors.textSecondary} />
        <View style={styles.searchBody}>
          <Text style={[styles.searchTitle, { fontSize: sp(fontSizes.body) }]}>
            Search sermons
          </Text>
          <Text style={[styles.searchHint, { fontSize: sp(fontSizes.small) }]}>
            By title, speaker or category
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={sp(20)} color={colors.textSecondary} />
      </Pressable>

      {featured ? (
        <View style={{ marginTop: sp(spacing.xl) }}>
          <SectionHeader title="Featured Sermon" />
          <SermonCard
            sermon={featured}
            onPress={() =>
              router.push({ pathname: '/sermons/detail', params: { id: featured.id } })
            }
          />
        </View>
      ) : null}

      <View style={{ marginTop: sp(spacing.xl) }}>
        <SectionHeader title="Browse by Category" />
        <View style={[styles.wrap, { gap: sp(spacing.xs) }]}>
          <FilterChip
            label="All"
            selected={selectedCategory === null}
            onPress={() => setSelectedCategory(null)}
          />
          {getSermonCategories().map((category) => (
            <FilterChip
              key={category}
              label={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </View>
      </View>

      <View style={{ marginTop: sp(spacing.xl) }}>
        <SectionHeader
          title={selectedCategory ?? 'Latest Sermons'}
          actionLabel={selectedCategory ? 'Show all' : undefined}
          onActionPress={
            selectedCategory ? () => setSelectedCategory(null) : undefined
          }
        />
        <View style={{ gap: sp(spacing.sm) }}>
          {sermons.length === 0 ? (
            <EmptyState
              icon="headset"
              title="No sermons here yet"
              message="Sermon recordings will be added when the ministry library is connected."
            />
          ) : (
            sermons.map((sermon) => (
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
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  searchBody: {
    flex: 1,
  },
  searchTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
  searchHint: {
    color: colors.textSecondary,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pressed: { opacity: 0.8 },
});