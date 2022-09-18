export const enum Value {
  full = 'Fully Implemented',
  partial = 'Partially Implemented',
  not = 'Not Implemented',
  na = 'NA',
}

export type Topic = 'Background Checks' | 'Family Finding';
export type PracticeName =
  | 'No witnesses'
  | 'No fee'
  | 'No notary'
  | 'General inbox for receiving requests'
  | 'Accept electronic requests'
  | 'Use social media to find kin'
  | 'Ongoing kin-finding activities'
  | 'Require senior staff sign-off for non-kin placements'
  | 'Ask youth for placement options'
  | 'Ask kin for more kin'
  | 'Formal plan to stay connected to kin'
  | 'Expansive legal definition of kin';
