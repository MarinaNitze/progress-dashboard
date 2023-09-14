// Must match values in the state columns of the Progress Dashboard airtable
export const enum Value {
  full = 'Fully Implemented',
  partial = 'Partially Implemented',
  not = 'Not Implemented',
  na = 'NA',
}

// Must match values in the "Topic" column of the Progress Dashboard airtable
// (Renaming here because "Topic" refers to something else! see Topic)
export type PracticeArea = 'Background Checks' | 'Kin Finding';

// Must match values in the "Name" column of the Progress Dashboard airtable
export type PracticeName =
  | 'No witnesses'
  | 'No fee'
  | 'No notary'
  | 'General inbox for receiving requests'
  | 'Accept electronic requests'
  | 'Use social media to find kin'
  | 'Maintain a shared list of kin'
  | 'Establish a dedicated family-finding responsibility'
  | 'Require senior staff sign-off for non-kin placements'
  | 'Ask youth about their kin'
  | 'Use a variety of contact methods'
  | 'Dedicated kin-finding responsibility'
  | 'Expansive legal definition of kin';

export type PracticeLinkMap = Partial<Record<PracticeName, string>>;
