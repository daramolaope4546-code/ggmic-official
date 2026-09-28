import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppCard } from '@/components/AppCard';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';

import type { Sermon } from '@/types';

interface SermonCardProps {
  /** When no sermon is supplied the card renders an honest placeholder. */
  sermon?: Sermon;
  placeholder?: boolean;
  onPress?: () => void;
}

/** Latest/featured sermon entry with a play affordance. */
export function SermonCard({ sermon, placeholder = false, onPress }: SermonCardProps) {
  const { sp } = useResponsive();
  const hasSermon = !placeholder && sermon;

  return (
    <AppCard
      onPress={onPress}
      accessibilityLabel={hasSermon ? sermon?.title : 'Latest sermon placeholder'}
    >
      <View style={[styles.row, { gap: sp(spacing.sm) }]}>
        <View
          style={[
            styles.playChip,
            { width: sp(52), height: sp(52), borderRadius: sp(26) },
            hasSermon && styles.playChipActive,
          ]}
        >
          <MaterialIcons
            name={hasSermon ? 'play-arrow' : 'headset'}
            size={sp(24)}
            color={hasSermon ? colors.textOnPrimary : colors.textSecondary}
          />
        </View>
        <View style={styles.body}>
          <Text style={[styles.title, { fontSize: sp(fontSizes.body) }]}>
            {hasSermon ? sermon!.title : 'Latest Sermon'}
          </Text>
          <Text style={[styles.muted, { fontSize: sp(fontSizes.small) }]}>
            {hasSermon
              ? [sermon!.preacher, sermon!.date, sermon!.category]
                  .filter(Boolean)
                  .join(' • ')
              : 'Sermon recordings will appear here.'}
          </Text>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
  },
  playChipActive: {
    backgroundColor: colors.primary,
  },
  body: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
  muted: {
    color: colors.textSecondary,
    marginTop: 2,
  },
});