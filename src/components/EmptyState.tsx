import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';

import type { IconName } from '@/types';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  message?: string;
  /** Compact layout for use inside cards rather than full screens. */
  compact?: boolean;
}

/** Clear, positive empty state for screens and cards that have no data yet. */
export function EmptyState({ icon, title, message, compact = false }: EmptyStateProps) {
  const { sp } = useResponsive();
  const iconSize = sp(compact ? 40 : 64);
  const chipSize = sp(compact ? 72 : 112);

  return (
    <View
      style={[
        styles.container,
        compact ? styles.compact : styles.full,
        { padding: sp(spacing.lg) },
      ]}
      accessibilityRole="summary"
    >
      <View
        style={[
          styles.iconChip,
          { width: chipSize, height: chipSize, borderRadius: chipSize / 2 },
        ]}
      >
        <MaterialIcons name={icon} size={iconSize} color={colors.primary} />
      </View>
      <Text
        style={[
          styles.title,
          { fontSize: sp(compact ? fontSizes.body : fontSizes.title) },
        ]}
      >
        {title}
      </Text>
      {message ? (
        <Text
          style={[
            styles.message,
            { fontSize: sp(compact ? fontSizes.small : fontSizes.body) },
          ]}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: {
    flex: 1,
    minHeight: 220,
  },
  compact: {
    minHeight: 120,
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  message: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    maxWidth: 320,
  },
});