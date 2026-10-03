import { APP } from '@/constants/app';
import type { ChurchInformation } from '@/types';

/**
 * Confirmed church identity and education content.
 *
 * Mission/Vision text is reproduced exactly as supplied by the organisation.
 * History and Motto are placeholders until the organisation provides the
 * official text; placeholder copy is marked clearly and never passed off as
 * real content.
 */
export const CHURCH_INFO: ChurchInformation = {
  organisationName: APP.organizationLong,
  shortName: APP.shortName,
  founder: APP.founder,
  generalOverseer: APP.generalOverseer,
  mainLocation: APP.mainLocation,
  history:
    'The official history of GGMIC will be added here once provided by the organisation.',
  mission: [
    'Ready to study and demostrate the word of God daily.',
    'Ready to rescue the Perishing Souls',
    "Ready to integrate others into God's covenants of blessing, breakthrough, provisions, protection",
  ],
  vision: [
    'To deliver those that are held bound by satan and sin through prayer and the word of God.',
    "To align people with God's grace agenda through the word.",
    "To be example of God's kindness everywhere we go.",
    'To raise leaders that will raise leaders in every sphere of life.',
    'To make heaven at last.',
  ],
  motto:
    'The official motto of GGMIC will be added here once provided by the organisation.',
};