import { Image, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { APP } from '@/constants/app';
import { CORE_ART_RATIO, LOGO_ASPECT_RATIO } from '@/constants/assets';
import { useResponsive } from '@/hooks/useResponsive';
import {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  radius,
  shadows,
  spacing,
} from '@/theme';

const VISUAL_SIZE = 96;
const BADGE_SIZE = 34;
const LOGO_SIZE = 22;

interface WelcomeHeroProps {
  /** Primary call to action — typically opens the About GGMIC screen. */
  onExplore: () => void;
}

/**
 * Branded welcome banner for the Home landing page. Uses the existing GGMIC
 * church illustration with the official logo as a badge over the brand colour,
 * the confirmed organisation name and location, and a single primary call to
 * action. No motto or invented claims are introduced.
 */
export function WelcomeHero({ onExplore }: WelcomeHeroProps) {
  const { sp } = useResponsive();

  return (
    <View
      style={[
        styles.card,
        { borderRadius: sp(radius.xl), padding: sp(spacing.lg), ...shadows.lifted },
      ]}
    >
      <View style={[styles.top, { gap: sp(spacing.md) }]}>
        <View
          style={[
            styles.visual,
            {
              width: sp(VISUAL_SIZE),
              height: sp(VISUAL_SIZE),
              borderRadius: sp(radius.lg),
            },
          ]}
        >
          <Image
            accessible={false}
            accessibilityIgnoresInvertColors
            resizeMode="contain"
            source={require('../../assets/images/core-icons/sunday-service.png')}
            style={[styles.visualImage, { aspectRatio: CORE_ART_RATIO }]}
          />
          <View
            style={[
              styles.badge,
              {
                width: sp(BADGE_SIZE),
                height: sp(BADGE_SIZE),
                borderRadius: sp(BADGE_SIZE),
              },
            ]}
          >
            <Image
              accessible={false}
              resizeMode="contain"
              source={APP.logoSource}
              style={{ width: sp(LOGO_SIZE), aspectRatio: LOGO_ASPECT_RATIO }}
            />
          </View>
        </View>

        <View style={styles.body}>
          <Text style={[styles.overline, { fontSize: sp(fontSizes.caption) }]}>
            Welcome to GGMIC
          </Text>
          <Text
            numberOfLines={3}
            style={[
              styles.name,
              { fontSize: sp(fontSizes.title), lineHeight: sp(lineHeights.subtitle) },
            ]}
          >
            {APP.organizationLong}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.location,
          { fontSize: sp(fontSizes.small), lineHeight: sp(20), marginTop: sp(spacing.md) },
        ]}
      >
        {APP.mainLocation}
      </Text>

      <View style={{ marginTop: sp(spacing.lg) }}>
        <AppButton
          title="Explore Our Church"
          icon="church"
          iconPosition="right"
          variant="outline"
          fullWidth
          onPress={onExplore}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryDark,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visual: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  visualImage: {
    width: '78%',
  },
  badge: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primaryDark,
  },
  body: {
    flex: 1,
  },
  overline: {
    color: colors.primarySoft,
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xxs,
  },
  name: {
    color: colors.textOnPrimary,
    fontWeight: fontWeights.bold,
  },
  location: {
    color: colors.primarySoft,
    fontWeight: fontWeights.medium,
  },
});
