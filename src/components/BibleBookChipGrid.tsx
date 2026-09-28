import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, minTouchTarget, radius, spacing } from '@/theme';

import type { BibleBook } from '@/types';

interface BibleBookChipGridProps {
  books: BibleBook[];
  limit?: number;
  onPressBook: (bookId: string) => void;
}

/**
 * Wrapped grid of book-name chips. Used on the Bible home to show a compact
 * preview of Old/New Testament books. Tap navigates to the chapter selector.
 */
export function BibleBookChipGrid({
  books,
  limit,
  onPressBook,
}: BibleBookChipGridProps) {
  const { sp } = useResponsive();
  const display = limit ? books.slice(0, limit) : books;
  const hidden = limit ? books.length - display.length : 0;

  return (
    <View style={styles.wrap}>
      {display.map((book) => (
        <Pressable
          key={book.id}
          accessibilityLabel={book.name}
          accessibilityRole="button"
          onPress={() => onPressBook(book.id)}
          style={({ pressed }) => [
            styles.chip,
            {
              minHeight: sp(minTouchTarget),
              borderRadius: sp(radius.pill),
              paddingHorizontal: sp(spacing.md),
              paddingVertical: sp(spacing.xs),
            },
            pressed && styles.pressed,
          ]}
        >
          <Text
            style={[styles.label, { fontSize: sp(fontSizes.small) }]}
            numberOfLines={1}
          >
            {book.name}
          </Text>
        </Pressable>
      ))}
      {hidden > 0 ? (
        <View
          style={[
            styles.chip,
            {
              minHeight: sp(minTouchTarget),
              borderRadius: sp(radius.pill),
              paddingHorizontal: sp(spacing.md),
              paddingVertical: sp(spacing.xs),
            },
          ]}
        >
          <Text
            style={[styles.moreLabel, { fontSize: sp(fontSizes.small) }]}
          >
            +{hidden} more
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
  moreLabel: {
    color: colors.textSecondary,
    fontWeight: fontWeights.medium,
  },
  pressed: { opacity: 0.7 },
});
