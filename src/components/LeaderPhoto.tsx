import { Image, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { useResponsive } from '@/hooks/useResponsive';
import { colors } from '@/theme';

import type { IconName } from '@/types';

interface LeaderPhotoProps {
  /** Official photograph once supplied (require()'d asset). */
  photo?: number;
  /** Nominal size in the design scale; scaled via sp(). */
  size: number;
  /** Leader name used for the accessibility label. */
  name?: string;
  /** Icon shown while no photograph is available. */
  icon?: IconName;
}

/**
 * Photo area for leadership. Shows the official photograph when one is
 * supplied, otherwise a neutral placeholder circle so profiles never ship
 * with fake imagery.
 */
export function LeaderPhoto({ photo, size, name, icon = 'person' }: LeaderPhotoProps) {
  const { sp } = useResponsive();
  const dimension = sp(size);
  const accessibilityLabel = name ? `Photo placeholder for ${name}` : 'Photo placeholder';

  if (photo != null) {
    return (
      <Image
        source={photo}
        style={styles.circle}
        resizeMode="cover"
        accessibilityLabel={accessibilityLabel}
        accessible
      />
    );
  }

  return (
    <View
      style={[styles.circle, styles.placeholder, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
    >
      <MaterialIcons name={icon} size={sp(size * 0.45)} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 999,
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    borderWidth: 2,
    borderColor: colors.primarySoft,
  },
});