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
  | 'Accepts electronic requests'
  | 'Social media'
  | 'Ongoing activity'
  | 'Senior staff sign-off'
  | 'Ask youth for placement options'
  | 'Ask kin for more kin'
  | 'Formal plan to stay connected'
  | 'Expansive legal definition of kin';