import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppCard } from '@/components/AppCard';
import { LeaderPhoto } from '@/components/LeaderPhoto';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, lineHeights, spacing } from '@/theme';

import type { Leader } from '@/types';

interface LeaderCardProps {
  leader: Leader;
  onViewProfile: () => void;
}

/**
 * Leadership grid card: photo area, name, role and a biography preview, with a
 * "View Profile" action. Biography/photo render placeholders until supplied.
 */
export function LeaderCard({ leader, onViewProfile }: LeaderCardProps) {
  const { sp } = useResponsive();

  return (
    <AppCard noPadding>
      <View style={[styles.body, { padding: sp(spacing.md) }]}>
        <LeaderPhoto size={112} name={leader.name} />
        <Text
          style={[
            styles.name,
            { fontSize: sp(fontSizes.subtitle), lineHeight: sp(lineHeights.subtitle), marginTop: sp(spacing.sm) },
          ]}
        >
          {leader.name}
        </Text>
        <Text
          style={[
            styles.title,
            { fontSize: sp(fontSizes.small), lineHeight: sp(lineHeights.small), marginTop: sp(spacing.xxs) },
          ]}
        >
          {leader.title}
        </Text>
        {leader.bioPreview ? (
          <Text
            numberOfLines={2}
            style={[
              styles.bio,
              { fontSize: sp(fontSizes.small), lineHeight: sp(lineHeights.small), marginTop: sp(spacing.sm) },
            ]}
          >
            {leader.bioPreview}
          </Text>
        ) : null}
      </View>
      <View style={styles.footer}>
        <AppButton
          title="View Profile"
          variant="outline"
          icon="chevron-right"
          iconPosition="right"
          fullWidth
          onPress={onViewProfile}
          accessibilityLabel={`View ${leader.name} profile`}
        />
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
  },
  name: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
  },
  title: {
    color: colors.primary,
    fontWeight: fontWeights.semibold,
    textAlign: 'center',
  },
  bio: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});