import { Image, StyleSheet, Text, View } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import { APP } from '@/constants/app';
import { colors, fontSizes, fontWeights, lineHeights, spacing } from '@/theme';

interface GGMICBrandProps {
  /** Base logo width before responsive scaling. */
  size?: number;
  centered?: boolean;
}

const LOGO_HEIGHT_RATIO = 365 / 389; // intrinsic logo dimensions

/**
 * Official GGMIC logo plus organisation name. The logo asset is used as-is and
 * never modified. Always rendered with resizeMode="contain" so dimensions stay
 * proportional across devices.
 */
export function GGMICBrand({ size = 128, centered = true }: GGMICBrandProps) {
  const { sp, isTablet } = useResponsive();
  const logoWidth = sp(size);
  const logoHeight = logoWidth * LOGO_HEIGHT_RATIO;

  return (
    <View style={[styles.container, centered && styles.centered]}>
      <Image
        source={APP.logoSource}
        style={{ width: logoWidth, height: logoHeight }}
        resizeMode="contain"
        accessibilityLabel="GGMIC logo"
        accessible
      />
      <Text
        style={[
          styles.name,
          {
            fontSize: sp(fontSizes.small),
            lineHeight: sp(lineHeights.small),
            marginTop: isTablet ? sp(spacing.sm) : sp(spacing.xs),
          },
        ]}
      >
        {APP.organizationLong}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  centered: {
    alignSelf: 'center',
  },
  name: {
    color: colors.textSecondary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    paddingHorizontal: spacing.md,
  },
});