import { useStaticQuery } from 'gatsby';

export const mockStaticData = <T = unknown>(data: T) =>
  (useStaticQuery as jest.Mock).mockReturnValue({ ...data });
