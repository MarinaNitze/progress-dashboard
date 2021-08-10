import { GeoState } from '../types/airtable/geoState';

export const findGeoState = (statesGeoData: GeoState[], stateCode: string) =>
  statesGeoData.find(({ code }) => stateCode === code) ?? null;
