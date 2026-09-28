import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, radius, shadows, spacing } from '@/theme';

interface AppCardProps {
  children: ReactNode;
  /** Make the card pressable. */
  onPress?: () => void;
  /** Remove the default inner padding. */
  noPadding?: boolean;
  accessibilityLabel?: string;
}

/**
 * Standard card surface used across the app. Consistent radius, padding and
 * elevation. Optionally tappable.
 */
export function AppCard({
  children,
  onPress,
  noPadding = false,
  accessibilityLabel,
}: AppCardProps) {
  const { sp } = useResponsive();
  const cardStyle = [
    styles.base,
    { borderRadius: sp(radius.lg), padding: noPadding ? 0 : sp(spacing.md) },
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [...cardStyle, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.9,
  },
});