import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { CardThumb } from '@/components/CardThumb';
import { SERVICE_RECURRENCE_LABELS } from '@/constants/services';
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

import type { ImageSourcePropType } from 'react-native';
import type { IconName } from '@/types';
import type { Service } from '@/types';

const ARTWORK_SIZE = 60;

interface ServiceCardProps {
  service: Service;
  /** Visually emphasises the promoted/next service. */
  highlighted?: boolean;
  /** Optional overline shown beside the recurrence badge (e.g. "Join us"). */
  label?: string;
  /** Optional section artwork overriding the service image. */
  image?: ImageSourcePropType;
  /** Opens the service detail when provided; renders a "View details" row. */
  onPress?: () => void;
}

/** Single confirmed detail line: icon plus value. */
function DetailLine({ icon, value }: { icon: IconName; value: string }) {
  const { sp } = useResponsive();

  return (
    <View style={[styles.detailRow, { marginTop: sp(spacing.xs), gap: sp(spacing.xs) }]}>
      <MaterialIcons name={icon} size={sp(17)} color={colors.primaryDark} />
      <Text style={[styles.detail, { fontSize: sp(fontSizes.small) }]}>{value}</Text>
    </View>
  );
}

/**
 * Presents a service/program with its confirmed schedule as a polished card:
 * artwork (or a themed icon), recurrence badge, name, schedule, and optional
 * time/venue lines. Tappable when `onPress` is set.
 */
export function ServiceCard({
  service,
  highlighted = true,
  label,
  image,
  onPress,
}: ServiceCardProps) {
  const { sp } = useResponsive();
  const artwork = image ?? service.image;

  const cardStyle = [
    styles.card,
    {
      borderRadius: sp(radius.lg),
      backgroundColor: highlighted ? colors.primarySoft : colors.surface,
      borderWidth: highlighted ? 1 : 0,
      borderColor: highlighted ? colors.primary : colors.transparent,
    },
  ];

  const body = (
    <View style={{ padding: sp(spacing.md) }}>
      <View style={[styles.topRow, { gap: sp(spacing.md) }]}>
        {artwork ? (
          <CardThumb image={artwork} size={ARTWORK_SIZE} />
        ) : (
          <View
            style={[
              styles.iconChip,
              {
                width: sp(ARTWORK_SIZE),
                height: sp(ARTWORK_SIZE),
                borderRadius: sp(radius.md),
              },
            ]}
          >
            <MaterialIcons
              name={service.icon ?? 'church'}
              size={sp(28)}
              color={colors.primaryDark}
            />
          </View>
        )}

        <View style={styles.topBody}>
          <View style={[styles.badgeRow, { gap: sp(spacing.xs) }]}>
            <View
              style={[
                styles.badge,
                {
                  paddingHorizontal: sp(spacing.xs),
                  paddingVertical: sp(3),
                  borderRadius: sp(radius.pill),
                  gap: sp(4),
                },
              ]}
            >
              <MaterialIcons name="event-repeat" size={sp(12)} color={colors.primaryDark} />
              <Text style={[styles.badgeText, { fontSize: sp(fontSizes.caption) }]}>
                {SERVICE_RECURRENCE_LABELS[service.recurrence]}
              </Text>
            </View>
            {label ? (
              <Text style={[styles.overline, { fontSize: sp(fontSizes.caption) }]}>{label}</Text>
            ) : null}
          </View>

          <Text
            style={[styles.name, { fontSize: sp(fontSizes.subtitle), lineHeight: sp(24) }]}
          >
            {service.title}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: sp(spacing.sm) }}>
        <DetailLine icon="calendar-month" value={service.schedule} />
        {service.time ? <DetailLine icon="schedule" value={service.time} /> : null}
        {service.location ? <DetailLine icon="location-on" value={service.location} /> : null}
      </View>
    </View>
  );

  const footer = onPress ? (
    <View
      style={[
        styles.footer,
        {
          borderTopColor: colors.border,
          paddingHorizontal: sp(spacing.md),
          paddingVertical: sp(spacing.sm),
          gap: sp(spacing.xs),
        },
      ]}
    >
      <Text style={[styles.footerText, { fontSize: sp(fontSizes.small) }]}>View details</Text>
      <MaterialIcons name="chevron-right" size={sp(18)} color={colors.primary} />
    </View>
  ) : null;

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={[
          service.title,
          SERVICE_RECURRENCE_LABELS[service.recurrence],
          service.schedule,
          service.time,
          service.location,
        ]
          .filter(Boolean)
          .join(', ')}
        onPress={onPress}
        style={({ pressed }) => [
          ...cardStyle,
          { minHeight: sp(minTouchTarget) },
          pressed && styles.pressed,
        ]}
      >
        {body}
        {footer}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle}>
      {body}
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadows.card,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBody: {
    flex: 1,
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: spacing.xxs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  badgeText: {
    color: colors.primaryDark,
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  overline: {
    color: colors.textSecondary,
    fontWeight: fontWeights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    flex: 1,
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.small,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerText: {
    color: colors.primary,
    fontWeight: fontWeights.semibold,
  },
  pressed: {
    opacity: 0.9,
  },
});
