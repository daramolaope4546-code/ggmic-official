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
import { getEvent } from '@/services/events';
import { colors, fontSizes, fontWeights, radius, spacing } from '@/theme';
import { formatDisplayDate } from '@/utils/dates';

/** Event detail: description, when/where, and image/map/registration placeholders. */
export default function EventDetailScreen() {
  const { sp } = useResponsive();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const event = id ? getEvent(id) : undefined;

  if (!event) {
    return (
      <ScreenContainer scroll={false} centered>
        <AppHeader title="Event" showBack />
        <EmptyState
          icon="event"
          title="Event not found"
          message="This event could not be found. Go back and choose another."
        />
      </ScreenContainer>
    );
  }

  const isSample = event.title.startsWith('Sample');
  const when = [formatDisplayDate(event.date), event.time]
    .filter(Boolean)
    .join(' · ');
  const until = event.endTime ? ` – ${event.endTime}` : '';

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Event" showBack />

      <View style={{ marginTop: sp(spacing.xs), gap: sp(spacing.md) }}>
        <AppCard>
          <Text style={[styles.title, { fontSize: sp(fontSizes.heading), lineHeight: sp(34) }]}>
            {event.title}
          </Text>
          {event.category ? (
            <Text style={[styles.category, { fontSize: sp(fontSizes.small) }]}>
              {event.category}
            </Text>
          ) : null}
        </AppCard>

        <View style={[styles.imagePlaceholder, { borderRadius: sp(radius.lg) }]}>
          <MaterialIcons name="photo" size={sp(32)} color={colors.textDisabled} />
          <Text style={[styles.imageText, { fontSize: sp(fontSizes.small) }]}>
            Event image coming soon.
          </Text>
        </View>

        <AppCard>
          <View style={[styles.infoRow, { gap: sp(spacing.sm) }]}>
            <MaterialIcons name="schedule" size={sp(22)} color={colors.primary} />
            <Text style={[styles.infoText, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
              {when}
              {until}
            </Text>
          </View>
          {event.location ? (
            <View style={[styles.infoRow, { gap: sp(spacing.sm), marginTop: sp(spacing.md) }]}>
              <MaterialIcons name="location-on" size={sp(22)} color={colors.primary} />
              <Text style={[styles.infoText, { fontSize: sp(fontSizes.body), lineHeight: sp(24) }]}>
                {event.location}
              </Text>
            </View>
          ) : null}
        </AppCard>

        {event.description ? (
          <AppCard>
            <Text style={[styles.section, { fontSize: sp(fontSizes.subtitle) }]}>
              About this event
            </Text>
            <Text
              style={[styles.description, { fontSize: sp(fontSizes.body), lineHeight: sp(26) }]}
            >
              {event.description}
            </Text>
          </AppCard>
        ) : null}

        <View style={[styles.mapPlaceholder, { borderRadius: sp(radius.lg) }]}>
          <MaterialIcons name="map" size={sp(24)} color={colors.textSecondary} />
          <Text style={[styles.mapText, { fontSize: sp(fontSizes.small) }]}>
            Map location coming soon.
          </Text>
        </View>

        <AppButton
          title="Registration coming soon"
          icon="event-available"
          disabled
          fullWidth
          onPress={() => {}}
        />

        {isSample ? (
          <View style={[styles.sampleNote, { borderRadius: sp(radius.lg) }]}>
            <MaterialIcons name="info" size={sp(16)} color={colors.textSecondary} />
            <Text style={[styles.sampleText, { fontSize: sp(fontSizes.small), lineHeight: sp(20) }]}>
              This is sample/demo content. Official event details will be added when
              the events feed is connected.
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
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    paddingVertical: spacing.xxl,
    gap: spacing.xs,
  },
  imageText: {
    color: colors.textDisabled,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    color: colors.textPrimary,
  },
  section: {
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textSecondary,
  },
  mapPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.md,
  },
  mapText: {
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