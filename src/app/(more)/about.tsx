import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  AppCard,
  AppHeader,
  GGMICBrand,
  InfoLinkCard,
  ScreenContainer,
} from '@/components';
import { CHURCH_INFO } from '@/constants/churchInfo';
import { useResponsive } from '@/hooks/useResponsive';
import { colors, fontSizes, fontWeights, spacing } from '@/theme';

/** Purpose-built links shown on the About screen. */
const SECTIONS = [
  { key: 'history', label: 'Our History', subtitle: 'How it all began', icon: 'history' as const, route: '/history' },
  { key: 'mission', label: 'Our Mission', subtitle: 'What we are called to do', icon: 'flag' as const, route: '/mission' },
  { key: 'vision', label: 'Our Vision', subtitle: 'Where we are headed', icon: 'visibility' as const, route: '/vision' },
  { key: 'motto', label: 'Our Motto', subtitle: 'Our guiding words', icon: 'format-quote' as const, route: '/motto' },
  { key: 'leadership', label: 'Leadership', subtitle: 'Meet our leaders', icon: 'groups' as const, route: '/leadership' },
];

/** Fact rows for the organisation overview card. */
const OVERVIEW_FACTS = [
  { label: 'Organisation', value: CHURCH_INFO.organisationName },
  { label: 'Founder', value: CHURCH_INFO.founder },
  { label: 'General Overseer', value: CHURCH_INFO.generalOverseer },
  { label: 'Main Location', value: CHURCH_INFO.mainLocation },
];

/**
 * About GGMIC: organisation overview plus quick links to the information
 * sections. Only confirmed facts are shown.
 */
export default function AboutScreen() {
  const router = useRouter();
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="About GGMIC" subtitle="Learn about the organisation" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <GGMICBrand size={96} />
      </View>

      <View style={{ marginTop: sp(spacing.xl) }}>
        <AppCard>
          {OVERVIEW_FACTS.map((fact, index) => (
            <View
              key={fact.label}
              style={[
                styles.factRow,
                index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
                { paddingVertical: sp(spacing.sm) },
              ]}
            >
              <Text style={[styles.factLabel, { fontSize: sp(fontSizes.small) }]}>{fact.label}</Text>
              <Text style={[styles.factValue, { fontSize: sp(fontSizes.body) }]}>{fact.value}</Text>
            </View>
          ))}
        </AppCard>
      </View>

      <View style={{ marginTop: sp(spacing.xl), gap: sp(spacing.sm) }}>
        {SECTIONS.map((section) => (
          <InfoLinkCard
            key={section.key}
            icon={section.icon}
            label={section.label}
            subtitle={section.subtitle}
            onPress={() => router.push(section.route)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  factRow: {
    paddingTop: spacing.sm,
  },
  factLabel: {
    color: colors.textSecondary,
    fontWeight: fontWeights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  factValue: {
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
});