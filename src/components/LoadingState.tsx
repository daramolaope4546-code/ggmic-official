import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, spacing } from '@/theme';

interface LoadingStateProps {
  message?: string;
  /** Inline row layout (e.g. inside buttons). */
  inline?: boolean;
}

/** Reusable loading indicator with optional label. */
export function LoadingState({ message, inline = false }: LoadingStateProps) {
  const { sp } = useResponsive();

  if (inline) {
    return (
      <View style={[styles.inline, { gap: sp(spacing.xs) }]} accessibilityRole="progressbar">
        <ActivityIndicator size="small" color={colors.primary} />
        {message ? (
          <Text style={[styles.inlineText, { fontSize: sp(fontSizes.small) }]}>{message}</Text>
        ) : null}
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { gap: sp(spacing.sm) }]}
      accessibilityRole="progressbar"
      accessibilityLabel={message ?? 'Loading'}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? (
        <Text style={[styles.message, { fontSize: sp(fontSizes.body) }]}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  inlineText: {
    color: colors.textSecondary,
  },
});