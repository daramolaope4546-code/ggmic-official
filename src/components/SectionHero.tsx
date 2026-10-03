import { Image } from 'react-native';

import { MENU_ART_RATIO } from '@/constants/assets';
import { useResponsive } from '@/hooks/useResponsive';
import { radius } from '@/theme';

import type { ImageSourcePropType } from 'react-native';

/** Caps the banner on tablets so the artwork stays a banner, not a billboard. */
const DEFAULT_MAX_WIDTH = 320;

interface SectionHeroProps {
  image: ImageSourcePropType;
  /** Source aspect ratio (width / height). Defaults to the landscape menu art. */
  aspectRatio?: number;
  /** Design-point cap for large screens. Scales with the active size class. */
  maxWidth?: number;
}

/**
 * Section artwork banner. The rendered box always matches the supplied source
 * ratio so the image is never stretched, and the width is capped for large
 * screens. Decorative: the screen header already names the section.
 */
export function SectionHero({
  image,
  aspectRatio = MENU_ART_RATIO,
  maxWidth = DEFAULT_MAX_WIDTH,
}: SectionHeroProps) {
  const { sp } = useResponsive();

  return (
    <Image
      accessible={false}
      accessibilityIgnoresInvertColors
      resizeMode="contain"
      source={image}
      style={{
        width: '100%',
        maxWidth: sp(maxWidth),
        aspectRatio,
        alignSelf: 'center',
        borderRadius: sp(radius.lg),
      }}
    />
  );
}
