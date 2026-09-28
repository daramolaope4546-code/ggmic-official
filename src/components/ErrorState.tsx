import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppButton } from '@/components/AppButton';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

/** Reusable error state with optional retry action. */
export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  const { sp } = useResponsive();

  return (
    <View style={[styles.container, { padding: sp(spacing.xl) }]} accessibilityRole="alert">
      <View style={[styles.iconChip, { borderRadius: sp(radius.pill) }]}>
        <MaterialIcons name="error-outline" size={sp(40)} color={colors.danger} />
      </View>
      <Text style={[styles.title, { fontSize: sp(fontSizes.title) }]}>{title}</Text>
      <Text style={[styles.message, { fontSize: sp(fontSizes.body) }]}>{message}</Text>
      {onRetry ? (
        <View style={[styles.retry, { marginTop: sp(spacing.lg) }]}>
          <AppButton title="Try Again" variant="outline" onPress={onRetry} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconChip: {
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dangerSoft,
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
    maxWidth: 340,
  },
  retry: {
    minWidth: 160,
  },
});