type GeoState = {
  abbrev: string;
  code: string;
  name: string;
};

export const findGeoState = (statesGeoData: GeoState[], stateCode: string) =>
  statesGeoData.find(({ code }) => stateCode === code) ?? null;

export type topicContent = {
  hero: {
    backgroundColor: 'primary' | 'secondary' | 'info' | 'light' | 'white';
    title: 'string';
    image: 'string';
    imgAlt: 'string';
  };
  layout: 'topic';
  title: 'string';
  image: 'string';
  about: 'string';
  why: 'string';
  what: 'string';
  recommendations: Array<string>;
};
