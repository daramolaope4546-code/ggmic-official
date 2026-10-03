import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  minTouchTarget,
  radius,
  shadows,
  spacing,
} from '@/theme';

interface QuickAccessCardProps {
  label: string;
  image: ImageSourcePropType;
  onPress: () => void;
  accessibilityLabel?: string;
}

/**
 * Tappable grid tile used in the Home Quick Access grid. Sized exclusively via
 * flex/width percentages so it adapts to any column count. The illustration is
 * a square PNG with a built-in soft chip, so no extra background is needed.
 */
export function QuickAccessCard({ label, image, onPress, accessibilityLabel }: QuickAccessCardProps) {
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
          paddingVertical: sp(spacing.sm),
        },
        pressed && styles.pressed,
      ]}
    >
      <Image
        accessible={false}
        accessibilityIgnoresInvertColors
        source={image}
        style={[
          styles.image,
          {
            width: sp(48),
            height: sp(48),
            borderRadius: sp(radius.sm),
          },
        ]}
      />
      <Text
        numberOfLines={2}
        style={[
          styles.label,
          { fontSize: sp(fontSizes.caption), lineHeight: sp(lineHeights.caption) },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: minTouchTarget,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.85,
  },
  image: {
    marginBottom: spacing.xxs,
    resizeMode: 'contain',
  },
  label: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
});