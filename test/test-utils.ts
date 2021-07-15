import { useStaticQuery } from 'gatsby';

export const mockStaticData = <T = unknown>(data: T) =>
  useStaticQuery.mockReturnValue({ ...data });
