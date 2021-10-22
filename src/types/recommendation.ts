export type Recommendation = {
  about: string;
  benefits: Array<string>;
  // Temporary prop until case study column in table is figured out
  case?: string;
  costs: Array<string>;
  heading: string;
  how: string;
  inspiration: string;
  outcome: string;
  need: string;
  summary: string;
  title: string;
  who: {
    image: string;
    number: number;
    what: string;
  };
};
