import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';

import {
  AppCard,
  AppHeader,
  BibleBookChipGrid,
  EmptyState,
  ScreenContainer,
  SectionHeader,
  SectionHero,
} from '@/components';
import { CORE_ART_RATIO } from '@/constants/assets';
import { useResponsive } from '@/hooks/useResponsive';
import {
  getBookmarks,
  getLastRead,
  getTestamentBooks,
} from '@/services/bible';
import { colors, fontSizes, fontWeights, minTouchTarget, radius, spacing } from '@/theme';

import type { BibleBookmark, ReadingRecord } from '@/types';

const PREVIEW_BOOKS = 8;

/** Bible home: search, continue reading, saved verses and testament sections. */
export default function BibleScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const [lastRead, setLastRead] = useState<ReadingRecord | null>(() => getLastRead());
  const [bookmarks, setBookmarks] = useState<BibleBookmark[]>(() => getBookmarks());

  useFocusEffect(
    useCallback(() => {
      setLastRead(getLastRead());
      setBookmarks(getBookmarks());
    }, []),
  );

  const openBook = (bookId: string) => {
    router.push({ pathname: '/bible/chapters', params: { bookId } });
  };

  const openRead = (bookId: string, chapter: number) => {
    router.push({
      pathname: '/bible/read',
      params: { bookId, chapter: String(chapter) },
    });
  };

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Bible" subtitle="Read and study the Word" />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <SectionHero
          aspectRatio={CORE_ART_RATIO}
          image={require('../../../../assets/images/core-icons/bible.png')}
          maxWidth={150}
        />
      </View>

      <Pressable
        accessibilityLabel="Search the Bible"
        accessibilityRole="button"
        onPress={() => router.push('/bible/search')}
        style={({ pressed }) => [
          styles.searchCard,
          { minHeight: sp(minTouchTarget), borderRadius: sp(radius.lg) },
          pressed && styles.pressed,
        ]}
      >
        <MaterialIcons name="search" size={sp(20)} color={colors.textSecondary} />
        <View style={styles.searchBody}>
          <Text style={[styles.searchTitle, { fontSize: sp(fontSizes.body) }]}>
            Search the Bible
          </Text>
          <Text style={[styles.searchHint, { fontSize: sp(fontSizes.small) }]}>
            Find verses and passages
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={sp(20)} color={colors.textSecondary} />
      </Pressable>

      {lastRead ? (
        <View style={{ marginTop: sp(spacing.xl) }}>
          <SectionHeader title="Continue Reading" />
          <AppCard
            onPress={() => openRead(lastRead.bookId, lastRead.chapter)}
            accessibilityLabel={`Continue reading ${lastRead.bookName} chapter ${lastRead.chapter}`}
          >
            <View style={[styles.row, { gap: sp(spacing.sm) }]}>
              <View
                style={[
                  styles.iconChip,
                  { width: sp(44), height: sp(44), borderRadius: sp(radius.pill) },
                ]}
              >
                <MaterialIcons name="menu-book" size={sp(22)} color={colors.primary} />
              </View>
              <View style={styles.rowBody}>
                <Text style={[styles.cardTitle, { fontSize: sp(fontSizes.body) }]}>
                  {lastRead.bookName} {lastRead.chapter}
                </Text>
                <Text style={[styles.cardHint, { fontSize: sp(fontSizes.small) }]}>
                  Where you left off
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={sp(20)} color={colors.textSecondary} />
            </View>
          </AppCard>
        </View>
      ) : null}

      {bookmarks.length > 0 ? (
        <View style={{ marginTop: sp(spacing.xl) }}>
          <SectionHeader title="Saved Verses" />
          <View style={[styles.wrap, { gap: sp(spacing.xs) }]}>
            {bookmarks.map((b) => (
              <Pressable
                key={`${b.bookId}-${b.chapter}-${b.verse}`}
                accessibilityLabel={b.verse > 0 ? `${b.bookName} ${b.chapter}:${b.verse}` : `${b.bookName} ${b.chapter}`}
                accessibilityRole="button"
                onPress={() => openRead(b.bookId, b.chapter)}
                style={({ pressed }) => [
                  styles.chip,
                  { minHeight: sp(minTouchTarget), borderRadius: sp(radius.pill) },
                  pressed && styles.pressed,
                ]}
              >
                <MaterialIcons name="bookmark" size={sp(14)} color={colors.primary} />
                <Text style={[styles.chipText, { fontSize: sp(fontSizes.small) }]}>
                  {b.verse > 0 ? `${b.bookName} ${b.chapter}:${b.verse}` : `${b.bookName} ${b.chapter}`}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      <View style={{ marginTop: sp(spacing.xl) }}>
        <SectionHeader
          title="Old Testament"
          actionLabel="See all"
          onActionPress={() =>
            router.push({ pathname: '/bible/books', params: { testament: 'ot' } })
          }
        />
        <BibleBookChipGrid
          books={getTestamentBooks('ot')}
          limit={PREVIEW_BOOKS}
          onPressBook={openBook}
        />
      </View>

      <View style={{ marginTop: sp(spacing.xl) }}>
        <SectionHeader
          title="New Testament"
          actionLabel="See all"
          onActionPress={() =>
            router.push({ pathname: '/bible/books', params: { testament: 'nt' } })
          }
        />
        <BibleBookChipGrid
          books={getTestamentBooks('nt')}
          limit={PREVIEW_BOOKS}
          onPressBook={openBook}
        />
      </View>

      {(getTestamentBooks('ot').length === 0 || getTestamentBooks('nt').length === 0) ? (
        <View style={{ marginTop: sp(spacing.xl) }}>
          <EmptyState
            icon="menu-book"
            title="Bible library unavailable"
            message="Books will appear here when the Bible library is connected."
          />
        </View>
      ) : null}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBody: {
    flex: 1,
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
  cardHint: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    gap: spacing.xxs,
  },
  chipText: {
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
  pressed: { opacity: 0.7 },
});