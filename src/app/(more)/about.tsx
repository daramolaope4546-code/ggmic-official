import { View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  AppCard,
  AppHeader,
  BulletList,
  EmptyState,
  FactRow,
  GGMICBrand,
  InfoLinkCard,
  ScreenContainer,
  SectionHeader,
} from '@/components';
import { CHURCH_INFO } from '@/constants/churchInfo';
import { useResponsive } from '@/hooks/useResponsive';
import { spacing } from '@/theme';

/**
 * About GGMIC: the complete church identity experience. Presents the
 * organisation name and logo, the confirmed leadership, the main location and
 * the official mission, vision, motto and history. Only supplied content is
 * shown; motto and history display clear placeholders until officially
 * provided.
 */
export default function AboutScreen() {
  const router = useRouter();
  const { sp } = useResponsive();

  return (
    <ScreenContainer scroll centered>
      <AppHeader title="About GGMIC" subtitle="Learn about the organisation" showBack />

      <View style={{ marginTop: sp(spacing.xs) }}>
        <GGMICBrand size={112} />
      </View>

      <View style={{ marginTop: sp(spacing.lg) }}>
        <AppCard>
          <FactRow
            hideDivider
            label="Organisation"
            value={CHURCH_INFO.organisationName}
          />
          <FactRow label="Main Location" value={CHURCH_INFO.mainLocation} />
        </AppCard>
      </View>

      <SectionHeader title="Leadership" />
      <AppCard>
        <FactRow
          hideDivider
          label="Founder"
          value={CHURCH_INFO.founder}
          onPress={() => router.push('/founder')}
        />
        <FactRow
          label="General Overseer"
          value={CHURCH_INFO.generalOverseer}
          onPress={() => router.push('/general-overseer')}
        />
      </AppCard>

      <View style={{ marginTop: sp(spacing.md) }}>
        <InfoLinkCard
          icon="groups"
          image={require('../../../assets/images/menu/menu-leadership.png')}
          label="Meet our Leaders"
          subtitle="Leadership profiles"
          onPress={() => router.push('/leadership')}
        />
      </View>

      <SectionHeader title="Our Mission" image={require('../../../assets/images/core-icons/mission.png')} />
      <AppCard>
        <BulletList
          items={CHURCH_INFO.mission ?? []}
          icon="flag"
          accessibilityLabel="GGMIC mission statements"
        />
      </AppCard>

      <SectionHeader title="Our Vision" image={require('../../../assets/images/core-icons/vision.png')} />
      <AppCard>
        <BulletList
          items={CHURCH_INFO.vision ?? []}
          icon="check-circle"
          accessibilityLabel="GGMIC vision statements"
        />
      </AppCard>

      <SectionHeader title="Our Motto" image={require('../../../assets/images/core-icons/motto.png')} />
      <AppCard>
        <EmptyState
          compact
          icon="format-quote"
          title={CHURCH_INFO.motto ?? 'Information coming soon.'}
          message="The official motto will be displayed here once it is provided by the organisation."
        />
      </AppCard>

      <SectionHeader title="Our History" image={require('../../../assets/images/core-icons/our-history.png')} />
      <AppCard>
        <EmptyState
          compact
          icon="history"
          title={CHURCH_INFO.history ?? 'Information coming soon.'}
          message="A timeline of GGMIC milestones will be displayed here once the official history is provided."
        />
      </AppCard>
    </ScreenContainer>
  );
}
