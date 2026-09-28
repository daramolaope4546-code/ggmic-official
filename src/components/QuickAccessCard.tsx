import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, minTouchTarget, radius, spacing } from '@/theme';

import type { IconName } from '@/types';

interface QuickAccessCardProps {
  label: string;
  icon: IconName;
  onPress: () => void;
  accessibilityLabel?: string;
}

/**
 * Tappable grid tile used in the Home Quick Access grid. Sized exclusively via
 * flex/width percentages so it adapts to any column count.
 */
export function QuickAccessCard({ label, icon, onPress, accessibilityLabel }: QuickAccessCardProps) {
  const { sp } = useResponsive();

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          borderRadius: sp(radius.lg),
          paddingVertical: sp(spacing.md),
        },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconChip,
          { width: sp(56), height: sp(56), borderRadius: sp(28) },
        ]}
      >
        <MaterialIcons name={icon} size={sp(26)} color={colors.primary} />
      </View>
      <Text
        numberOfLines={2}
        style={[
          styles.label,
          { fontSize: sp(fontSizes.small), lineHeight: sp(20) },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: minTouchTarget + spacing.md,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xs,
  },
  pressed: {
    opacity: 0.85,
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
});