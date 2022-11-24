import React from 'react';
import { ReactNode } from 'react-markdown';
import { PracticeLinkMap, Topic } from '../types/compare';

export const COMPARE_TOPIC_FULL_TITLE_MAP: Record<Topic, string> = {
  'Background Checks':
    'Out of State Child Abuse and Neglect Checks (Adam Walsh Checks)',
  'Family Finding': 'Kin Finding',
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
  'Use social media to find kin': '/recommendation/use-social-media',
  'Ongoing kin-finding activities': '/recommendation/ask-about-connections',
  'Require senior staff sign-off for non-kin placements':
    '/recommendation/senior-staff-sign-off-for-non-relative-placements',
  'Ask youth for placement options':
    '/recommendation/ask-about-supportive-adults',
  'Ask kin for more kin':
    '/recommendation/ask-family-members-for-more-family-members',
  'Formal plan to stay connected to kin':
    '/recommendation/plan-for-youth-to-keep-connected-supportive-adults',
  'Expansive legal definition of kin':
    '/recommendation/Use-expansive-legal-definition-of-kin',
};

export const COMPARE_TOPIC_PRACTICE_LINKS_MAP: Record<Topic, PracticeLinkMap> =
  {
    'Family Finding': family_finding_link_map,
    'Background Checks': background_checks_link_map,
  };

export const COMPARE_TOPIC_CONTENT_MAP: Record<Topic, ReactNode> = {
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
