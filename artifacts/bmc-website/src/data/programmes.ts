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
  /** Optional short facts for the Programmes card (CMS). */
  when?: string;
  where?: string;
  who?: string;
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

/**
 * Small audience/format tags for the homepage cards, derived from existing
 * fields (title and type) so the client has nothing extra to maintain. If a
 * title is renamed and no keyword matches, the card simply shows fewer tags.
 */
export function programmeTags(p: Pick<Programme, 'title' | 'type'>): string[] {
  const tags: string[] = [];
  if (/women/i.test(p.title)) tags.push('Women');
  if (/children/i.test(p.title)) tags.push('Children');
  if (/hifdh/i.test(p.title)) tags.push('Hifdh');
  if (/workshop/i.test(p.title)) tags.push('Workshops');
  if (p.type === 'inperson') tags.push('In person');
  return tags;
}
