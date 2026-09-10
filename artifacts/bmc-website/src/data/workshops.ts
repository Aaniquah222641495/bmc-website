export interface WorkshopDetail {
  label: string;
  value: string;
}

export interface Workshop {
  title: string;
  /** Which page the workshop is listed on. */
  page: 'online' | 'in-person';
  /**
   * "available" shows in the current section; "past" shows in the past-workshops
   * grid. A workshop also moves to "past" automatically the day after its
   * startDate / endDate — see isPast() below.
   */
  status: 'available' | 'past';
  /** Lower numbers sort first within their section. Tie-breaker only. */
  order?: number;
  /**
   * ISO date (written by the CMS). The workshop's date, or the first session's
   * date if it runs over several days. Drives the running order of the
   * "Available Now" section and the automatic move to "past".
   */
  startDate?: string;
  /** ISO date of the last session, for workshops that span several days. */
  endDate?: string;
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

const ALL_WORKSHOPS: Workshop[] = Object.values(modules);

/** The date a workshop is "done" — its last session, or its only session. */
function effectiveEnd(w: Workshop): string | undefined {
  return w.endDate ?? w.startDate;
}

/**
 * True once the workshop's date has fully passed. It stays visible through the
 * whole of its end date and only counts as past from the next day onwards.
 * Undated workshops never expire on their own.
 */
function hasPassed(w: Workshop, now: Date = new Date()): boolean {
  const end = effectiveEnd(w);
  if (!end) return false;
  const endOfDay = new Date(end);
  if (Number.isNaN(endOfDay.getTime())) return false;
  endOfDay.setHours(23, 59, 59, 999);
  return now.getTime() > endOfDay.getTime();
}

/** Effective status, combining the manual flag with automatic date expiry. */
function isPast(w: Workshop): boolean {
  return w.status === 'past' || hasPassed(w);
}

/** Soonest upcoming first; undated workshops last; `order` then title break ties. */
function byUpcoming(a: Workshop, b: Workshop): number {
  const da = a.startDate ? Date.parse(a.startDate) : Number.POSITIVE_INFINITY;
  const db = b.startDate ? Date.parse(b.startDate) : Number.POSITIVE_INFINITY;
  return da - db || (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title);
}

/** Most recent first; undated workshops last; `order` then title break ties. */
function byMostRecent(a: Workshop, b: Workshop): number {
  const ea = effectiveEnd(a);
  const eb = effectiveEnd(b);
  const da = ea ? Date.parse(ea) : Number.NEGATIVE_INFINITY;
  const db = eb ? Date.parse(eb) : Number.NEGATIVE_INFINITY;
  return db - da || (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title);
}

export const CURRENT_ONLINE_WORKSHOPS = ALL_WORKSHOPS.filter(
  (w) => w.page === 'online' && !isPast(w),
).sort(byUpcoming);
export const PAST_ONLINE_WORKSHOPS = ALL_WORKSHOPS.filter(
  (w) => w.page === 'online' && isPast(w),
).sort(byMostRecent);
export const PAST_IN_PERSON_WORKSHOPS = ALL_WORKSHOPS.filter(
  (w) => w.page === 'in-person' && isPast(w),
).sort(byMostRecent);
