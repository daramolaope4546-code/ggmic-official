import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  AppCard,
  AppHeader,
  EmptyState,
  ScreenContainer,
} from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import { getTestamentBooks } from '@/services/bible';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

type Testament = 'ot' | 'nt';

const TESTAMENT_LABELS: Record<Testament, string> = {
  ot: 'Old Testament',
  nt: 'New Testament',
};

/**
 * Full book list for one testament. Rows show book name + chapter count and
 * navigate to the chapter selector.
 */
export default function BookSelectionScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const params = useLocalSearchParams<{ testament?: string }>();
  const testament: Testament = params.testament === 'nt' ? 'nt' : 'ot';
  const books = getTestamentBooks(testament);

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Books" subtitle={TESTAMENT_LABELS[testament]} showBack />

      {books.length === 0 ? (
        <View style={{ marginTop: sp(spacing.xl) }}>
          <EmptyState
            icon="menu-book"
            title="No books found"
            message="Books will appear here when the Bible library is connected."
          />
        </View>
      ) : (
        <View style={{ marginTop: sp(spacing.sm), gap: sp(spacing.sm) }}>
          {books.map((book) => (
            <AppCard
              key={book.id}
              accessibilityLabel={`${book.name}, ${book.chapters} chapters`}
              onPress={() =>
                router.push({ pathname: '/bible/chapters', params: { bookId: book.id } })
              }
            >
              <View style={[styles.row, { gap: sp(spacing.sm) }]}>
                <View style={styles.body}>
                  <Text style={[styles.name, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
                    {book.name}
                  </Text>
                  <Text style={[styles.meta, { fontSize: sp(fontSizes.small) }]}>
                    {book.chapters} chapters
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={sp(20)} color={colors.textSecondary} />
              </View>
            </AppCard>
          ))}
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
  meta: {
    color: colors.textSecondary,
    marginTop: 2,
  },
});