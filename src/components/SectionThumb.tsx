import { Image, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { MENU_ART_RATIO } from '@/constants/assets';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, radius } from '@/theme';

import type { ImageSourcePropType } from 'react-native';
import type { IconName } from '@/types';

/** Nominal thumbnail height in design points; width follows the artwork ratio. */
const THUMB_HEIGHT = 40;

interface SectionThumbProps {
  /** Local artwork for the section. Falls back to the icon chip when absent. */
  image?: ImageSourcePropType;
  /** Fallback icon for sections that have no artwork yet. */
  icon?: IconName;
}

/**
 * Leading visual for menu-style rows. Renders local artwork inside a fixed
 * landscape slot on a soft primary tint, or the circular primary-soft icon chip
 * when a section has no artwork. The slot uses `contain`, so both the landscape
 * menu art and the near-square core art keep their proportions and are never
 * cropped or stretched.
 */
export function SectionThumb({ image, icon = 'circle' }: SectionThumbProps) {
  const { sp } = useResponsive();

  if (image) {
    const height = sp(THUMB_HEIGHT);

    return (
      <Image
        accessible={false}
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={image}
        style={[
          styles.artwork,
          { height, width: Math.round(height * MENU_ART_RATIO), borderRadius: sp(radius.sm) },
        ]}
      />
    );
  }

  const dimension = sp(THUMB_HEIGHT);

  return (
    <View
      style={[styles.chip, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}
    >
      <MaterialIcons name={icon} size={Math.round(dimension / 2)} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  artwork: {
    backgroundColor: colors.primarySoft,
  },
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
});