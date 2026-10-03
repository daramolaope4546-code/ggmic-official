import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppCard } from '@/components/AppCard';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

import type { Branch } from '@/types';

interface BranchCardProps {
  branch: Branch;
}

/**
 * Presents a church branch with its address. Map coordinates are optional; when
 * absent a "Map location coming soon." note is shown instead of a fake map.
 */
export function BranchCard({ branch }: BranchCardProps) {
  const { sp } = useResponsive();
  const hasCoordinates = branch.latitude != null && branch.longitude != null;

  return (
    <AppCard>
      <View style={[styles.row, { gap: sp(spacing.sm) }]}>
        <View
          style={[
            styles.iconChip,
            { width: sp(48), height: sp(48), borderRadius: sp(24) },
          ]}
        >
          <MaterialIcons name="location-city" size={sp(24)} color={colors.primary} />
        </View>
        <View style={styles.titles}>
          <Text style={[styles.name, { fontSize: sp(fontSizes.title) }]}>{branch.name}</Text>
          {branch.isMain ? (
            <Text style={[styles.badge, { fontSize: sp(fontSizes.caption) }]}>
              Main Branch
            </Text>
          ) : null}
        </View>
      </View>

      <View style={[styles.addressBlock, { gap: sp(spacing.xs), marginTop: sp(spacing.sm) }]}>
        <View style={styles.line}>
          <MaterialIcons name="place" size={sp(18)} color={colors.primaryDark} />
          <Text style={[styles.text, { fontSize: sp(fontSizes.body) }]}>
            {branch.addressLine}
          </Text>
        </View>
        <View style={styles.line}>
          <MaterialIcons name="location-on" size={sp(18)} color={colors.primaryDark} />
          <Text style={[styles.text, { fontSize: sp(fontSizes.body) }]}>
            {branch.city}, {branch.state}
          </Text>
        </View>
        <View style={styles.line}>
          <MaterialIcons name="public" size={sp(18)} color={colors.primaryDark} />
          <Text style={[styles.text, { fontSize: sp(fontSizes.body) }]}>
            {branch.country}
          </Text>
        </View>
        {branch.phone ? (
          <View style={styles.line}>
            <MaterialIcons name="phone" size={sp(18)} color={colors.primaryDark} />
            <Text style={[styles.text, { fontSize: sp(fontSizes.body) }]}>
              {branch.phone}
            </Text>
          </View>
        ) : null}
        {branch.email ? (
          <View style={styles.line}>
            <MaterialIcons name="email" size={sp(18)} color={colors.primaryDark} />
            <Text style={[styles.text, { fontSize: sp(fontSizes.body) }]}>
              {branch.email}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={[styles.mapRow, { marginTop: sp(spacing.md), gap: sp(spacing.xs) }]}>
        {hasCoordinates ? (
          <View style={[styles.line, { gap: sp(spacing.xxs) }]}>
            <MaterialIcons name="map" size={sp(18)} color={colors.primary} />
            <Text style={[styles.mapText, { fontSize: sp(fontSizes.body) }]}>
              View on Map
            </Text>
          </View>
        ) : (
          <View style={[styles.line, { gap: sp(spacing.xxs) }]}>
            <MaterialIcons name="map" size={sp(18)} color={colors.textSecondary} />
            <Text style={[styles.mapText, { fontSize: sp(fontSizes.small) }]}>
              Map location coming soon.
            </Text>
          </View>
        )}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: 99,
  },
  titles: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  badge: {
    color: colors.primary,
    fontWeight: fontWeights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  addressBlock: {
    width: '100%',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
    marginLeft: spacing.xxs,
  },
  mapRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  mapText: {
    color: colors.textSecondary,
    fontWeight: fontWeights.medium,
  },
});