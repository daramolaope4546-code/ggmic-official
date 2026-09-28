import { Pressable, StyleSheet, Text } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, minTouchTarget, radius, spacing } from '@/theme';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  const { sp } = useResponsive();

  return (
    <Pressable
      accessibilityLabel={`${label}${selected ? ' (selected)' : ''}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          minHeight: sp(minTouchTarget),
          borderRadius: sp(radius.pill),
          paddingHorizontal: sp(spacing.md),
          paddingVertical: sp(spacing.xs),
        },
        selected && styles.chipSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            fontSize: sp(fontSizes.small),
            color: selected ? colors.textOnPrimary : colors.textPrimary,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    fontWeight: fontWeights.semibold,
  },
  pressed: { opacity: 0.7 },
});
