import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useResponsive } from '@/hooks/useResponsive';
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  minTouchTarget,
  spacing,
} from '@/theme';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  /** Show back button (stack screens). */
  showBack?: boolean;
  /** Optional trailing element, e.g. an action button. */
  right?: ReactNode;
}

/**
 * Consistent screen header. When `showBack` is set it navigates back using the
 * router, respecting the platform back behaviour.
 */
export function AppHeader({ title, subtitle, showBack, right }: AppHeaderProps) {
  const router = useRouter();
  const { sp, isTablet } = useResponsive();

  return (
    <View style={[styles.container, { paddingVertical: isTablet ? sp(6) : sp(4) }]} accessibilityRole="header">
      {showBack ? (
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={8}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/menu'))}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <MaterialIcons name="arrow-back" size={sp(24)} color={colors.textPrimary} />
        </Pressable>
      ) : null}

      <View style={styles.titles}>
        <Text
          style={[
            styles.title,
            { fontSize: sp(fontSizes.heading), lineHeight: sp(lineHeights.heading) },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              { fontSize: sp(fontSizes.small), lineHeight: sp(lineHeights.small) },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: minTouchTarget + spacing.xs,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  backButton: {
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.xs,
  },
  pressed: {
    opacity: 0.6,
  },
  titles: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  subtitle: {
    color: colors.textSecondary,
    fontWeight: fontWeights.regular,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
});