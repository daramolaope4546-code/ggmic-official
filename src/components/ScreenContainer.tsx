import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, contentMaxWidth, screenPadding } from '@/theme';

interface ScreenContainerProps {
  children: ReactNode;
  /** Use a ScrollView so content is never clipped on small screens. Default true. */
  scroll?: boolean;
  /** Centre content horizontally and cap its width on very wide screens. */
  centered?: boolean;
  /** Override the root background (e.g. Bible reader night/sepia modes). */
  backgroundColor?: string;
  /** Extra style for the scroll/root container's content. */
  contentContainerStyle?: object;
}

/**
 * Base screen wrapper: safe-area aware, optionally scrollable, respects screen
 * padding and caps content width on tablets so nothing looks over-stretched.
 */
export function ScreenContainer({
  children,
  scroll = true,
  centered = false,
  backgroundColor,
  contentContainerStyle,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const { sp, isTablet } = useResponsive();

  const horizontalPadding = sp(screenPadding);
  const topInsetPad = isTablet ? sp(10) : sp(6);
  const content = (
    <View
      style={[
        styles.content,
        {
          paddingTop: insets.top + topInsetPad,
          paddingHorizontal: horizontalPadding,
          paddingBottom: sp(24),
        },
        centered && { alignItems: 'center' },
        contentContainerStyle,
      ]}
    >
      <View style={centered ? styles.maxWidth : undefined}>{children}</View>
    </View>
  );

  if (!scroll) {
    return <View style={[styles.flex, backgroundColor ? { backgroundColor } : undefined]}>{content}</View>;
  }

  return (
    <ScrollView
      style={[styles.flex, backgroundColor ? { backgroundColor } : undefined]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {content}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
  },
  maxWidth: {
    width: '100%',
    maxWidth: contentMaxWidth,
  },
});