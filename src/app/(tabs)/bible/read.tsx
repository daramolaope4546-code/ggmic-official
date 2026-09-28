import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppButton, EmptyState, ScreenContainer } from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import {
  getBibleBook,
  getBibleChapter,
  getBookmarks,
  saveReadingPosition,
  toggleVerseBookmark,
} from '@/services/bible';
import {
  colors,
  fontSizes,
  fontWeights,
  iconSizes,
  lineHeights,
  minTouchTarget,
  radius,
  spacing,
} from '@/theme';

import type { ReadingMode } from '@/theme';
import type { BibleChapter } from '@/types';

type FontScale = 'small' | 'medium' | 'large';

const FONT_SETTINGS: Record<FontScale, { size: number; lineHeight: number }> = {
  small: { size: fontSizes.subtitle, lineHeight: lineHeights.subtitle },
  medium: { size: fontSizes.title, lineHeight: lineHeights.title },
  large: { size: fontSizes.heading, lineHeight: lineHeights.heading },
};

const FONT_LABELS: Record<FontScale, string> = {
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
};

const MODE_LABELS: Record<ReadingMode, string> = {
  light: 'Light',
  sepia: 'Sepia',
  night: 'Night',
};

/**
 * Bible reader. Supports previous/next chapter navigation, three font sizes,
 * Light/Sepia/Night reading modes, verse bookmarking and an in-memory reading
 * position so the Bible home can show "Continue Reading".
 */
export default function ReadingScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const params = useLocalSearchParams<{ bookId?: string; chapter?: string }>();

  const book = params.bookId ? getBibleBook(params.bookId) : undefined;
  const chapterNumRaw = Number.parseInt(params.chapter ?? '1', 10);
  const chapterNum = Number.isNaN(chapterNumRaw) ? 1 : chapterNumRaw;

  const chapter: BibleChapter | null = book
    ? getBibleChapter(book.id, chapterNum)
    : null;

  const [fontScale, setFontScale] = useState<FontScale>('small');
  const [mode, setMode] = useState<ReadingMode>('light');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [, setRevision] = useState(0);

  const readingTheme = colors.reading[mode];

  const savedOnThisChapter =
    book !== undefined &&
    getBookmarks().some((b) => b.bookId === book.id && b.chapter === chapterNum);

  useEffect(() => {
    if (book) saveReadingPosition(book.id, book.name, chapterNum);
    setSettingsOpen(false);
  }, [book, chapterNum]);

  if (!book || !chapter) {
    return (
      <ScreenContainer scroll={false} centered>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/bible'))}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
          >
            <MaterialIcons name="arrow-back" size={sp(24)} color={colors.textPrimary} />
          </Pressable>
          <Text style={[styles.headerTitle, { fontSize: sp(fontSizes.heading) }]}>
            Bible
          </Text>
        </View>
        <EmptyState
          icon="menu-book"
          title="Passage unavailable"
          message="This passage could not be found. Go back and choose another chapter."
        />
        <View style={{ marginTop: sp(spacing.lg), alignSelf: 'stretch' }}>
          <AppButton
            title="Back"
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/bible'))}
          />
        </View>
      </ScreenContainer>
    );
  }

  const fontSetting = FONT_SETTINGS[fontScale];
  const chipText = mode === 'night' ? colors.black : colors.white;
  const goTo = (ch: number) => {
    if (!book) return;
    saveReadingPosition(book.id, book.name, ch);
    router.push({
      pathname: '/bible/read',
      params: { bookId: book.id, chapter: String(ch) },
    });
  };

  return (
    <ScreenContainer scroll centered backgroundColor={readingTheme.background}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/bible'))}
          style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
        >
          <MaterialIcons name="arrow-back" size={sp(24)} color={readingTheme.text} />
        </Pressable>

        <View style={styles.headerBody}>
          <Text
            style={[
              styles.headerTitle,
              { fontSize: sp(fontSizes.heading), color: readingTheme.text },
            ]}
          >
            {book.name} {chapterNum}
          </Text>
          <Text
            style={[styles.headerSub, { fontSize: sp(fontSizes.small), color: readingTheme.subtle }]}
          >
            Chapter {chapterNum} of {chapter.totalChapters}
          </Text>
        </View>

        <Pressable
          accessibilityLabel={savedOnThisChapter ? 'Remove chapter bookmark' : 'Bookmark this chapter'}
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => {
            if (!book) return;
            toggleVerseBookmark(book.id, book.name, chapterNum, 0);
            setRevision((v) => v + 1);
          }}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <MaterialIcons
            name={savedOnThisChapter ? 'bookmark' : 'bookmark-border'}
            size={sp(22)}
            color={readingTheme.accent}
          />
        </Pressable>

        <Pressable
          accessibilityLabel="Reading settings"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => setSettingsOpen((v) => !v)}
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <MaterialIcons name="format-size" size={sp(24)} color={readingTheme.text} />
        </Pressable>
      </View>

      {settingsOpen ? (
        <View
          style={[
            styles.settingsPanel,
            {
              backgroundColor: readingTheme.surface,
              borderRadius: sp(radius.lg),
              padding: sp(spacing.md),
              gap: sp(spacing.md),
            },
          ]}
        >
          <View style={{ gap: sp(spacing.xs) }}>
            <Text style={[styles.settingLabel, { fontSize: sp(fontSizes.small), color: readingTheme.subtle }]}>
              Font size
            </Text>
            <View style={[styles.settingRow, { gap: sp(spacing.xs) }]}>
              {(Object.keys(FONT_LABELS) as FontScale[]).map((key) => (
                <SettingChip
                  key={key}
                  label={FONT_LABELS[key]}
                  selected={fontScale === key}
                  onPress={() => setFontScale(key)}
                  backgroundColor={readingTheme.accent}
                  textColor={chipText}
                  mutedColor={readingTheme.subtle}
                  baseText={readingTheme.text}
                  sp={sp}
                />
              ))}
            </View>
          </View>

          <View style={{ gap: sp(spacing.xs) }}>
            <Text style={[styles.settingLabel, { fontSize: sp(fontSizes.small), color: readingTheme.subtle }]}>
              Reading mode
            </Text>
            <View style={[styles.settingRow, { gap: sp(spacing.xs) }]}>
              {(Object.keys(MODE_LABELS) as ReadingMode[]).map((key) => (
                <SettingChip
                  key={key}
                  label={MODE_LABELS[key]}
                  selected={mode === key}
                  onPress={() => setMode(key)}
                  backgroundColor={readingTheme.accent}
                  textColor={chipText}
                  mutedColor={readingTheme.subtle}
                  baseText={readingTheme.text}
                  sp={sp}
                />
              ))}
            </View>
          </View>
        </View>
      ) : null}

      {chapter.isSample ? (
        <View
          style={[
            styles.sampleBanner,
            { backgroundColor: readingTheme.surface, borderRadius: sp(radius.lg) },
          ]}
        >
          <MaterialIcons name="info" size={sp(16)} color={readingTheme.accent} />
          <Text
            style={[
              styles.sampleBannerText,
              { fontSize: sp(fontSizes.small), color: readingTheme.subtle },
            ]}
          >
            Sample content — this is a development preview. The full Bible text will be
            connected later.
          </Text>
        </View>
      ) : null}

      {chapter.verses.length === 0 ? (
        <View style={{ marginTop: sp(spacing.lg) }}>
          <EmptyState
            icon="menu-book"
            title={`Chapter ${chapterNum} unavailable`}
            message="Full Bible text will be available when the Bible library is connected."
          />
        </View>
      ) : (
        <View style={{ marginTop: sp(spacing.md) }}>
          {chapter.verses.map((verse) => {
            const saved = getBookmarks().some(
              (b) => b.bookId === book.id && b.chapter === chapterNum && b.verse === verse.number,
            );
            return (
              <View key={verse.number} style={styles.verseRow}>
                <Pressable
                  accessibilityLabel={
                    saved
                      ? `Remove bookmark from ${book.name} ${chapterNum}:${verse.number}`
                      : `Bookmark ${book.name} ${chapterNum}:${verse.number}`
                  }
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={() => {
                    toggleVerseBookmark(book.id, book.name, chapterNum, verse.number);
                    setRevision((v) => v + 1);
                  }}
                  style={({ pressed }) => [styles.verseBookmark, pressed && styles.pressed]}
                >
                  <MaterialIcons
                    name={saved ? 'bookmark' : 'bookmark-border'}
                    size={sp(16)}
                    color={readingTheme.accent}
                  />
                </Pressable>
                <Text
                  style={[
                    styles.verseNum,
                    { fontSize: sp(fontSizes.caption), color: readingTheme.verseNum },
                  ]}
                >
                  {verse.number}
                </Text>
                <Text
                  style={[
                    styles.verseText,
                    {
                      fontSize: sp(fontSetting.size),
                      lineHeight: sp(fontSetting.lineHeight),
                      color: readingTheme.text,
                    },
                  ]}
                >
                  {verse.text}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      <View style={[styles.navRow, { gap: sp(spacing.sm), marginTop: sp(spacing.xl) }]}>
        <View style={styles.navBtn}>
          <AppButton
            title="Previous"
            icon="chevron-left"
            variant="outline"
            disabled={chapterNum <= 1}
            onPress={() => goTo(chapterNum - 1)}
          />
        </View>
        <View style={styles.navBtn}>
          <AppButton
            title="Next"
            icon="chevron-right"
            iconPosition="right"
            disabled={chapterNum >= chapter.totalChapters}
            onPress={() => goTo(chapterNum + 1)}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

interface SettingChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
  baseText: string;
  sp: (value: number) => number;
}

function SettingChip({
  label,
  selected,
  onPress,
  backgroundColor,
  textColor,
  mutedColor,
  baseText,
  sp,
}: SettingChipProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingChip,
        {
          minHeight: sp(minTouchTarget),
          borderRadius: sp(radius.md),
          paddingHorizontal: sp(spacing.sm),
          backgroundColor: selected ? backgroundColor : 'transparent',
          borderColor: mutedColor,
        },
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.settingChipText,
          { fontSize: sp(fontSizes.small), color: selected ? textColor : baseText },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  backBtn: {
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.xs,
  },
  iconBtn: {
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBody: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: fontWeights.bold,
  },
  headerSub: {
    marginTop: 2,
  },
  settingsPanel: {
    marginTop: spacing.md,
  },
  settingLabel: {
    fontWeight: fontWeights.semibold,
  },
  settingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  settingChip: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  settingChipText: {
    fontWeight: fontWeights.semibold,
  },
  sampleBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    padding: spacing.sm,
    marginTop: spacing.md,
  },
  sampleBannerText: {
    flex: 1,
    lineHeight: 20,
  },
  verseRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  verseBookmark: {
    width: iconSizes.md,
    height: iconSizes.md,
    marginTop: spacing.xxs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verseNum: {
    fontWeight: fontWeights.bold,
    marginTop: spacing.xs,
    minWidth: iconSizes.xs,
  },
  verseText: {
    flex: 1,
  },
  navRow: {
    flexDirection: 'row',
  },
  navBtn: {
    flex: 1,
  },
  pressed: { opacity: 0.7 },
});