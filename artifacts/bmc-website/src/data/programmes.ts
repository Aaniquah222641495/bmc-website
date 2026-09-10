import programmesSettings from '../../content/settings/programmes.json';

export type ProgrammeType = 'online' | 'inperson';

export interface Programme {
  title: string;
  path: string;
  /** Short teaser copy, used on the homepage. */
  descShort: string;
  /** Fuller copy, used on the Programmes page. */
  descLong: string;
  tag: string;
  price: string;
  type: ProgrammeType;
  image?: string;
  imagePosition?: string;
  gradient: string;
}

/**
 * Single source of truth for the site's six programmes. Content lives in
 * content/settings/programmes.json — edit it directly, or through the CMS at
 * /admin — and is consumed by both the homepage teaser (Home) and the full
 * listing (Programmes). Each entry's detail page still lives in code under
 * src/pages/classes/, so adding a brand-new programme here also needs a
 * developer to build the page it links to.
 */
export const PROGRAMMES: Programme[] = programmesSettings.programmes as Programme[];
