import React, { ReactNode } from 'react';
import { PracticeArea, PracticeLinkMap } from '../types/compare';

///////////// mappings for `src/pages/[regionKey]/[practiceArea].tsx` /////////
export const COMPARE_DASHBOARD_FULL_TITLE_MAP: Record<PracticeArea, string> = {
  'Background Checks':
    'Out of State Child Abuse and Neglect Checks (Adam Walsh Checks)',
  'Kin Finding': 'Kin Finding',
};

const background_checks_link_map: PracticeLinkMap = {
  'No witnesses': '/topic/out-of-state-background-checks#what-we-can-do',
  'No fee': '/topic/out-of-state-background-checks#what-we-can-do',
  'No notary': '/topic/out-of-state-background-checks#what-we-can-do',
  'General inbox for receiving requests':
    '/topic/out-of-state-background-checks#what-we-can-do',
  'Accept electronic requests': '/recommendation/electronic-background-check',
};

const family_finding_link_map: PracticeLinkMap = {
  'Ask youth about their kin': '/recommendation/ask-about-supportive-adults',
  'Expansive legal definition of kin':
    '/recommendation/Use-expansive-legal-definition-of-kin',
  'Require senior staff sign-off for non-kin placements':
    '/recommendation/senior-staff-sign-off-for-non-relative-placements',
  'Maintain a shared list of kin':
    '/recommendation/ask-family-members-for-more-family-members',
  'Dedicated kin-finding responsibility':
    '/recommendation/ask-about-connections',
  'Use social media to find kin': '/recommendation/use-social-media',
  'Use a variety of contact methods':
    '/recommendation/plan-for-youth-to-keep-connected-supportive-adults',
};

export const PRACTICE_AREA_PRACTICE_LINKS_MAP: Record<
  PracticeArea,
  PracticeLinkMap
> = {
  'Family Finding': family_finding_link_map,
  'Background Checks': background_checks_link_map,
};

export const PRACTICE_AREA_CONTENT_MAP: Record<PracticeArea, ReactNode> = {
  'Background Checks': (
    <div>
      <p>
        If a prospective foster parent lived in another state within the last 5
        years, their <em>current</em> state must check the child abuse & neglect
        registry from their prior state(s) before approving them as foster
        parents.
      </p>
      <p>
        This sounds like a good idea. But in practice, inconsistent processes
        across states for fulfilling these requests are putting children at
        risk, and cause some of the most significant delays in licensing
        (paying) foster parents, particularly for kinship caregivers who already
        have placement of children but who do not receive any financial support
        until they are licensed.
      </p>
      <p>
        While the playbook has 21 recommended practices for kin-finding, this
        progress dashboard focuses on the Top 7.
      </p>
    </div>
  ),
  'Family Finding': (
    <div>
      <p>
        The best thing for a child in foster care is living with an adult they
        already know and trust ("kin"). The vast majority of children entering
        care have kin available to care for them, but most systems fail to find
        these adults for most children.
      </p>
      <p>
        When systems adopt more effective kin-finding practices, they can
        achieve initial kinship placement rates in excess of 80%.
      </p>
    </div>
  ),
};

/////////// HELPERS FOR `src/pages/compare.tsx` //////////////////////////////////
function getCompareDashboards(
  searchTitles: string[],
  titleMapping: [PracticeArea, string],
) {
  const [practiceArea, fullTitle] = titleMapping;
  if (practiceArea === 'Family Finding') {
    searchTitles.push(`${fullTitle} (Nationwide)`);
    searchTitles.push(`${fullTitle} (CA Counties)`);
  } else {
    searchTitles.push(fullTitle);
  }
  return searchTitles;
}
export const COMPARE_DASHBOARDS = (
  Object.entries(COMPARE_DASHBOARD_FULL_TITLE_MAP) as [PracticeArea, string][]
).reduce(getCompareDashboards, [] as string[]);

function getPracticeAreaForDashboard(dashboard: string): string {
  const [practiceArea] = Object.entries(COMPARE_DASHBOARD_FULL_TITLE_MAP).find(
    ([_, fullTitle]) => dashboard.includes(fullTitle),
  ) ?? [''];

  return practiceArea;
}

export function getPathToDashboard(dashboard: string) {
  return dashboard.includes('CA Counties')
    ? `/compare/CA/${getPracticeAreaForDashboard(dashboard)}`
    : `/compare/states/${getPracticeAreaForDashboard(dashboard)}`;
}
