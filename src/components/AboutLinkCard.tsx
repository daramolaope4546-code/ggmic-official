import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  minTouchTarget,
  radius,
  spacing,
} from '@/theme';

import type { ImageSourcePropType } from 'react-native';

const ARTWORK_SIZE = 40;

interface AboutLinkCardProps {
  label: string;
  image: ImageSourcePropType;
  onPress: () => void;
  accessibilityLabel?: string;
}

/**
 * Compact tile for the Home "About GGMIC" grid. Uses the existing core-icon
 * artwork on a soft brand tint, giving a different visual weight to the Quick
 * Access tiles while staying within the design system.
 */
export function AboutLinkCard({ label, image, onPress, accessibilityLabel }: AboutLinkCardProps) {
  const { sp } = useResponsive();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        {
          borderRadius: sp(radius.lg),
          paddingVertical: sp(spacing.sm),
          paddingHorizontal: sp(spacing.xs),
          gap: sp(spacing.xs),
          minHeight: sp(minTouchTarget),
        },
        pressed && styles.pressed,
      ]}
    >
      <Image
        accessible={false}
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={image}
        style={{ width: sp(ARTWORK_SIZE), height: sp(ARTWORK_SIZE) }}
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
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primarySoftDark,
  },
  label: {
    color: colors.primaryDark,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
