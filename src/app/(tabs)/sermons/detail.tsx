import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

import {
  AppButton,
  AppCard,
  AppHeader,
  EmptyState,
  ScreenContainer,
} from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import { getSermon } from '@/services/sermons';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';

/** Sermon detail: metadata, description and a media placeholder. */
export default function SermonDetailScreen() {
  const { sp } = useResponsive();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const sermon = id ? getSermon(id) : undefined;

  if (!sermon) {
    return (
      <ScreenContainer scroll={false} centered>
        <AppHeader title="Sermon" showBack />
        <EmptyState
          icon="headset"
          title="Sermon not found"
          message="This sermon could not be found. Go back and choose another."
        />
      </ScreenContainer>
    );
  }

  const isSample = sermon.title.startsWith('Sample');
  const meta = [sermon.preacher, sermon.date].filter(Boolean).join(' • ') || 'Speaker TBD';

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Sermon" showBack />

      <View style={{ marginTop: sp(spacing.xs), gap: sp(spacing.md) }}>
        <AppCard>
          <Text style={[styles.title, { fontSize: sp(fontSizes.heading), lineHeight: sp(34) }]}>
            {sermon.title}
          </Text>
          {sermon.category ? (
            <Text style={[styles.category, { fontSize: sp(fontSizes.small) }]}>
              {sermon.category}
            </Text>
          ) : null}
          <Text style={[styles.meta, { fontSize: sp(fontSizes.small) }]}>{meta}</Text>
          {sermon.duration ? (
            <Text style={[styles.meta, { fontSize: sp(fontSizes.small) }]}>
              Duration: {sermon.duration}
            </Text>
          ) : null}
        </AppCard>

        <View style={[styles.media, { borderRadius: sp(radius.lg) }]}>
          <View style={styles.mediaChip}>
            <MaterialIcons name="play-arrow" size={sp(36)} color={colors.primary} />
          </View>
          <Text style={[styles.mediaTitle, { fontSize: sp(fontSizes.body) }]}>
            Media coming soon.
          </Text>
          <Text style={[styles.mediaText, { fontSize: sp(fontSizes.small), lineHeight: sp(20) }]}>
            Audio and video playback will be added in a later phase when official
            sermon recordings are connected.
          </Text>
          <View style={{ marginTop: sp(spacing.md), alignSelf: 'stretch' }}>
            <AppButton
              title="Play audio — coming soon"
              icon="play-arrow"
              disabled
              onPress={() => {}}
            />
          </View>
        </View>

        {sermon.description ? (
          <>
            <Text style={[styles.section, { fontSize: sp(fontSizes.subtitle) }]}>
              About this sermon
            </Text>
            <AppCard>
              <Text
                style={[styles.description, { fontSize: sp(fontSizes.body), lineHeight: sp(26) }]}
              >
                {sermon.description}
              </Text>
            </AppCard>
          </>
        ) : null}

        {isSample ? (
          <View style={[styles.sampleNote, { borderRadius: sp(radius.lg) }]}>
            <MaterialIcons name="info" size={sp(16)} color={colors.textSecondary} />
            <Text style={[styles.sampleText, { fontSize: sp(fontSizes.small), lineHeight: sp(20) }]}>
              This is sample/demo content. Official sermon recordings will be added
              when the ministry library is connected.
            </Text>
          </View>
        ) : null}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  category: {
    color: colors.primaryDark,
    fontWeight: fontWeights.semibold,
    marginTop: spacing.xs,
  },
  meta: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  media: {
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    padding: spacing.xl,
  },
  mediaChip: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
  },
  mediaTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
  mediaText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  section: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
  },
  description: {
    color: colors.textSecondary,
  },
  sampleNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.md,
  },
  sampleText: {
    flex: 1,
    color: colors.textSecondary,
  },
});