export interface WorkshopDetail {
  label: string;
  value: string;
}

export interface Workshop {
  title: string;
  /** Which page the workshop is listed on. */
  page: 'online' | 'in-person';
  /** "available" shows in the current section; "past" shows in the past-workshops grid. */
  status: 'available' | 'past';
  /** Lower numbers sort first within their section. */
  order?: number;
  description: string;
  image?: string;
  imageAlt?: string;
  /** Available workshops only. */
  badge?: string;
  /** Available workshops only. */
  subtitle?: string;
  /** Shown on the past-workshops grid, e.g. "Online" or "In-Person". */
  typeLabel?: string;
  /** Available workshops only: Format / Date / Time / Investment chips. */
  details?: WorkshopDetail[];
  topicsLabel?: string;
  topics?: string[];
  /** Available workshops only. */
  includes?: string[];
  registrationUrl?: string;
}

// Every workshop is authored as its own file under content/workshops/ — by hand,
// or through the CMS at /admin — and picked up here automatically. Add a file,
// it shows up; delete one, it's gone. No code changes needed either way.
const modules = import.meta.glob<Workshop>('/content/workshops/*.json', {
  eager: true,
  import: 'default',
});

const ALL_WORKSHOPS: Workshop[] = Object.values(modules).sort(
  (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title),
);

export const CURRENT_ONLINE_WORKSHOPS = ALL_WORKSHOPS.filter(
  (w) => w.page === 'online' && w.status === 'available',
);
export const PAST_ONLINE_WORKSHOPS = ALL_WORKSHOPS.filter(
  (w) => w.page === 'online' && w.status === 'past',
);
export const PAST_IN_PERSON_WORKSHOPS = ALL_WORKSHOPS.filter(
  (w) => w.page === 'in-person' && w.status === 'past',
);
