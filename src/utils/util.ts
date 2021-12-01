type GeoState = {
  abbrev: string;
  code: string;
  name: string;
  admin: string;
  population: number | string;
};

export const findGeoState = (statesGeoData: GeoState[], stateCode: string) =>
  statesGeoData.find(({ code }) => stateCode === code) ?? null;
