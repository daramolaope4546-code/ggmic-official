import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import {
  AppHeader,
  EmptyState,
  EventCard,
  ScreenContainer,
  SectionHeader,
} from '@/components';
import { useResponsive } from '@/hooks/useResponsive';
import { getNextEvent, getUpcomingEvents, getPastEvents } from '@/services/events';
import { colors, fontSizes, fontWeights, minTouchTarget, radius, spacing } from '@/theme';

const PAST_LIMIT = 5;

/** Events home: next/featured, upcoming list and recent past events. */
export default function EventsScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const next = getNextEvent();
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  const openDetail = (id: string) =>
    router.push({ pathname: '/events/detail', params: { id } });

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Events" subtitle="Gather with us" />

      <Pressable
        accessibilityLabel="Search or filter events"
        accessibilityRole="button"
        onPress={() => router.push('/events/search')}
        style={({ pressed }) => [
          styles.searchCard,
          { minHeight: sp(minTouchTarget), borderRadius: sp(radius.lg) },
          pressed && styles.pressed,
        ]}
      >
        <MaterialIcons name="search" size={sp(20)} color={colors.textSecondary} />
        <View style={styles.searchBody}>
          <Text style={[styles.searchTitle, { fontSize: sp(fontSizes.body) }]}>
            Search and filter events
          </Text>
          <Text style={[styles.searchHint, { fontSize: sp(fontSizes.small) }]}>
            By name, category or date
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={sp(20)} color={colors.textSecondary} />
      </Pressable>

      {next ? (
        <View style={{ marginTop: sp(spacing.xl) }}>
          <SectionHeader title="Next Event" />
          <EventCard event={next} onPress={() => openDetail(next.id)} />
        </View>
      ) : null}

      <View style={{ marginTop: sp(spacing.xl) }}>
        <SectionHeader title="Upcoming Events" />
        {upcoming.length === 0 ? (
          <EmptyState
            icon="event"
            title="No upcoming events"
            message="Check back soon — new events are posted here when announced."
          />
        ) : (
          <View style={{ gap: sp(spacing.sm) }}>
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} onPress={() => openDetail(event.id)} />
            ))}
          </View>
        )}
      </View>

      <View style={{ marginTop: sp(spacing.xl) }}>
        <SectionHeader
          title="Past Events"
          actionLabel={past.length > PAST_LIMIT ? 'See all' : undefined}
          onActionPress={
            past.length > PAST_LIMIT
              ? () => router.push({ pathname: '/events/search', params: { filter: 'past' } })
              : undefined
          }
        />
        {past.length === 0 ? (
          <EmptyState
            icon="event-note"
            title="No past events yet"
            message="Recorded past events will appear here."
          />
        ) : (
          <View style={{ gap: sp(spacing.sm) }}>
            {past.slice(0, PAST_LIMIT).map((event) => (
              <EventCard key={event.id} event={event} onPress={() => openDetail(event.id)} />
            ))}
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  searchBody: {
    flex: 1,
  },
  searchTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.semibold,
  },
  searchHint: {
    color: colors.textSecondary,
  },
  pressed: { opacity: 0.8 },
});