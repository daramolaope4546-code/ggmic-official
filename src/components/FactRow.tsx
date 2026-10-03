import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import {
  colors,
  fontSizes,
  fontWeights,
  minTouchTarget,
  spacing,
} from '@/theme';

interface FactRowProps {
  label: string;
  value: string;
  /** Navigates when set; renders a chevron affordance. */
  onPress?: () => void;
  /** Hide the top divider (first row inside a card). */
  hideDivider?: boolean;
  accessibilityLabel?: string;
}

/**
 * Label/value fact row used in identity and overview cards. Optional press
 * navigation keeps the row on the touch-target minimum for accessibility.
 */
export function FactRow({
  label,
  value,
  onPress,
  hideDivider = false,
  accessibilityLabel,
}: FactRowProps) {
  const { sp } = useResponsive();
  const rowStyle = [
    styles.row,
    !hideDivider && styles.divider,
    { paddingVertical: sp(spacing.sm) },
  ];
  const content = (
    <>
      <View style={styles.text}>
        <Text style={[styles.label, { fontSize: sp(fontSizes.caption) }]}>
          {label}
        </Text>
        <Text style={[styles.value, { fontSize: sp(fontSizes.body) }]}>
          {value}
        </Text>
      </View>
      {onPress ? (
        <MaterialIcons name="chevron-right" size={sp(22)} color={colors.textDisabled} />
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? `${label}: ${value}`}
        onPress={onPress}
        style={({ pressed }) => [...rowStyle, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: minTouchTarget,
    gap: spacing.sm,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  text: {
    flex: 1,
  },
  label: {
    color: colors.textSecondary,
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
    lineHeight: 22,
  },
  pressed: {
    opacity: 0.6,
  },
});