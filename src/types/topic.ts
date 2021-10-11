export type Topic = {
  hero: {
    backgroundColor: 'primary' | 'secondary' | 'info' | 'light' | 'white';
    title: string;
    image: string;
    imgAlt: string;
  };
  layout: 'topic';
  title: string;
  image: string;
  about: string;
  why: string;
  what: string;
  recommendations: Array<string>;
};
