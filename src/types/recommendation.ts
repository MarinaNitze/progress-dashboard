export type Recommendation = {
  about: string;
  benefits: Array<string>;
  costs: Array<string>;
  heading: string;
  how: string;
  inspiration: string;
  outcome: string;
  summary: string;
  title: string;
  who: {
    image: string;
    number: number;
    what: string;
  };
};
