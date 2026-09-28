import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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

import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  /** Visually emphasises the promoted/next service. */
  highlighted?: boolean;
  /** Small overline shown above the name. */
  label?: string;
}

/**
 * Presents a service with its schedule and location. Data-driven so the same
 * card later renders backend services unchanged.
 */
export function ServiceCard({ service, highlighted = true, label }: ServiceCardProps) {
  const { sp } = useResponsive();

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: sp(radius.lg),
          padding: sp(spacing.md),
          backgroundColor: highlighted ? colors.primarySoft : colors.surface,
          borderWidth: highlighted ? 1 : 0,
          borderColor: highlighted ? colors.primary : colors.transparent,
        },
      ]}
    >
      {label ? (
        <Text
          style={[
            styles.overline,
            { fontSize: sp(fontSizes.caption), lineHeight: sp(16) },
          ]}
        >
          {label}
        </Text>
      ) : null}

      <View style={[styles.titleRow, { gap: sp(spacing.sm) }]}>
        <View
          style={[
            styles.iconChip,
            { width: sp(44), height: sp(44), borderRadius: sp(22) },
          ]}
        >
          <MaterialIcons name={service.icon ?? 'church'} size={sp(22)} color={colors.primary} />
        </View>
        <Text
          style={[
            styles.name,
            { fontSize: sp(fontSizes.title), lineHeight: sp(28) },
          ]}
        >
          {service.name}
        </Text>
      </View>

      <View style={[styles.detailRow, { marginTop: sp(spacing.sm), gap: sp(spacing.xs) }]}>
        <MaterialIcons name="schedule" size={sp(18)} color={colors.primaryDark} />
        <Text style={[styles.detail, { fontSize: sp(fontSizes.body) }]}>
          {service.day} • {service.time}
        </Text>
      </View>

      <View style={[styles.detailRow, { marginTop: sp(spacing.xs), gap: sp(spacing.xs) }]}>
        <MaterialIcons name="location-on" size={sp(18)} color={colors.primaryDark} />
        <Text style={[styles.detail, { fontSize: sp(fontSizes.body) }]}>
          {service.branch} • {service.location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadows.card,
  },
  overline: {
    color: colors.primaryDark,
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  name: {
    flex: 1,
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
    lineHeight: lineHeights.body,
  },
});