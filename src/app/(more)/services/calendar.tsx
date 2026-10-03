import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  AppHeader,
  EmptyState,
  ScreenContainer,
  SectionHeader,
  SectionHero,
  UpcomingProgramCard,
} from '@/components';
import { CORE_ART_RATIO } from '@/constants/assets';
import { useResponsive } from '@/hooks/useResponsive';
import { getUpcomingSchedule } from '@/services/programs';
import { colors, fontSizes, spacing } from '@/theme';
import { formatMonthYear } from '@/utils';

import type { UpcomingService } from '@/types';

/** How far ahead occurrences are generated for the calendar list. */
const HORIZON_DAYS = 180;

interface MonthGroup {
  key: string;
  label: string;
  items: UpcomingService[];
}

/**
 * Program Calendar: a chronological list of upcoming GGMIC gatherings grouped
 * by month. Every date is generated from the central recurrence rules, so no
 * duplicate occurrence records exist and future dates stay correct over time.
 */
export default function ProgramCalendarScreen() {
  const router = useRouter();
  const { sp } = useResponsive();
  const schedule = getUpcomingSchedule(new Date(), HORIZON_DAYS);

  const groups: MonthGroup[] = [];
  for (const item of schedule) {
    const key = `${item.date.getFullYear()}-${item.date.getMonth()}`;
    const current = groups[groups.length - 1];
    if (current && current.key === key) {
      current.items.push(item);
    } else {
      groups.push({ key, label: formatMonthYear(item.date), items: [item] });
    }
  }

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="Program Calendar" subtitle="Upcoming gatherings" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <SectionHero
          image={require('../../../../assets/images/core-icons/upcoming-event.png')}
          aspectRatio={CORE_ART_RATIO}
        />
      </View>

      {groups.length === 0 ? (
        <EmptyState
          icon="event-available"
          title="No upcoming programs"
          message="Upcoming dates will appear here as they are calculated."
        />
      ) : (
        groups.map((group) => (
          <View key={group.key}>
            <SectionHeader title={group.label} />
            <View style={{ gap: sp(spacing.md) }}>
              {group.items.map((item) => (
                <UpcomingProgramCard
                  key={`${item.service.id}-${item.date.toISOString()}`}
                  service={item.service}
                  date={item.date}
                  onPress={() =>
                    router.push({
                      pathname: '/services/detail',
                      params: { id: item.service.id },
                    })
                  }
                />
              ))}
            </View>
          </View>
        ))
      )}

      <Text style={[styles.note, { fontSize: sp(fontSizes.caption), marginTop: sp(spacing.lg) }]}>
        Dates are calculated automatically from each program&apos;s confirmed schedule.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  note: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
