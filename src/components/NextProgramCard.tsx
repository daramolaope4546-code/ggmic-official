import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
import { formatLongDate } from '@/utils';

import type { IconName } from '@/types';
import type { ServiceProgram } from '@/types';

const ARTWORK_SIZE = 64;

interface NextProgramCardProps {
  service: ServiceProgram;
  /** Calculated date of the soonest occurrence. */
  date: Date;
  onPress?: () => void;
}

function DetailLine({ icon, value }: { icon: IconName; value: string }) {
  const { sp } = useResponsive();

  return (
    <View style={[styles.detailRow, { marginTop: sp(spacing.xs), gap: sp(spacing.xs) }]}>
      <MaterialIcons name={icon} size={sp(17)} color={colors.primarySoft} />
      <Text style={[styles.detail, { fontSize: sp(fontSizes.small), lineHeight: sp(20) }]}>
        {value}
      </Text>
    </View>
  );
}

/**
 * Prominent "next program" feature card. Sits on the brand colour for strong
 * hierarchy beneath the hero, surfaces the calculated next occurrence from the
 * recurrence rules, and only shows a time/venue when the programme supplies
 * one.
 */
export function NextProgramCard({ service, date, onPress }: NextProgramCardProps) {
  const { sp } = useResponsive();
  const artwork = service.image;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Next program: ${service.title}, ${formatLongDate(date)}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { borderRadius: sp(radius.lg), padding: sp(spacing.md), minHeight: sp(minTouchTarget) },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.top, { gap: sp(spacing.md) }]}>
        <View
          style={[
            styles.artChip,
            {
              width: sp(ARTWORK_SIZE),
              height: sp(ARTWORK_SIZE),
              borderRadius: sp(radius.md),
            },
          ]}
        >
          {artwork ? (
            <Image
              accessible={false}
              accessibilityIgnoresInvertColors
              resizeMode="contain"
              source={artwork}
              style={styles.art}
            />
          ) : (
            <MaterialIcons
              name={service.icon ?? 'church'}
              size={sp(30)}
              color={colors.primaryDark}
            />
          )}
        </View>

        <View style={styles.body}>
          <Text style={[styles.overline, { fontSize: sp(fontSizes.caption) }]}>
            Next Program
          </Text>
          <Text
            numberOfLines={2}
            style={[
              styles.title,
              { fontSize: sp(fontSizes.title), lineHeight: sp(lineHeights.subtitle) },
            ]}
          >
            {service.title}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: sp(spacing.sm) }}>
        <DetailLine icon="event" value={formatLongDate(date)} />
        <DetailLine icon="calendar-month" value={service.schedule} />
        {service.time ? <DetailLine icon="schedule" value={service.time} /> : null}
        {service.location ? <DetailLine icon="location-on" value={service.location} /> : null}
      </View>

      {onPress ? (
        <View
          style={[
            styles.footer,
            { marginTop: sp(spacing.md), paddingTop: sp(spacing.sm), gap: sp(spacing.xxs) },
          ]}
        >
          <Text style={[styles.footerText, { fontSize: sp(fontSizes.small) }]}>
            View details
          </Text>
          <MaterialIcons name="chevron-right" size={sp(18)} color={colors.textOnPrimary} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primaryDark,
    ...shadows.lifted,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  art: {
    width: '100%',
    height: '100%',
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
  title: {
    color: colors.textOnPrimary,
    fontWeight: fontWeights.bold,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    flex: 1,
    color: colors.white,
    fontWeight: fontWeights.medium,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.primaryLight,
  },
  footerText: {
    color: colors.textOnPrimary,
    fontWeight: fontWeights.semibold,
  },
  pressed: {
    opacity: 0.92,
  },
});
