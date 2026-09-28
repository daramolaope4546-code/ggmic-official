import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppButton, AppHeader, ChapterGrid, EmptyState, ScreenContainer } from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import { getBibleBook } from '@/services/bible';
import { spacing } from '@/theme';

/** Chapter selector: adaptive numbered grid for one book. */
export default function ChapterSelectionScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const { bookId } = useLocalSearchParams<{ bookId?: string }>();
  const book = bookId ? getBibleBook(bookId) : undefined;

  if (!book) {
    return (
      <ScreenContainer scroll={false} centered>
        <AppHeader title="Book" showBack />
        <EmptyState
          icon="menu-book"
          title="Book not found"
          message="The requested Bible book could not be found."
        />
        <View style={{ marginTop: sp(spacing.lg), alignSelf: 'stretch' }}>
          <AppButton
            title="Back to Books"
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/bible'))}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll centered>
      <AppHeader title={book.name} subtitle={`${book.chapters} chapters`} showBack />

      <View style={{ marginTop: sp(spacing.md) }}>
        <ChapterGrid
          totalChapters={book.chapters}
          onSelect={(chapter) =>
            router.push({
              pathname: '/bible/read',
              params: { bookId: book.id, chapter: String(chapter) },
            })
          }
        />
      </View>
    </ScreenContainer>
  );
}