import { Image, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import { colors, radius } from '@/theme';

import type { ImageSourcePropType } from 'react-native';
import type { IconName } from '@/types';

const DEFAULT_SIZE = 52;

interface CardThumbProps {
  image: ImageSourcePropType;
  /** Square size in design points, scaled for the active size class. */
  size?: number;
  /** Optional small badge centred over the artwork (for example a play icon). */
  overlayIcon?: IconName;
}

/**
 * Square section artwork used as the leading visual in feature cards. Uses
 * `contain` so the near-square core art is never cropped or stretched, over a
 * soft surface so the thin letterbox blends with the card.
 */
export function CardThumb({ image, size = DEFAULT_SIZE, overlayIcon }: CardThumbProps) {
  const { sp } = useResponsive();
  const dimension = sp(size);

  return (
    <View
      style={[
        styles.container,
        { width: dimension, height: dimension, borderRadius: sp(radius.md) },
      ]}
    >
      <Image
        accessible={false}
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={image}
        style={styles.image}
      />
      {overlayIcon ? (
        <View style={[styles.overlay, { width: sp(30), height: sp(30), borderRadius: sp(15) }]}>
          <MaterialIcons name={overlayIcon} size={sp(18)} color={colors.textOnPrimary} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});