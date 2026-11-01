import { CARD } from '@/components/page-shell';
import { IconTile, iconFor } from '@/components/ornaments/cute-icons';

/**
 * Shared building blocks for the individual class/programme pages
 * (src/pages/classes/*.tsx), which otherwise repeat this markup verbatim.
 */

export interface DetailItem {
  label: string;
  value: string;
}

export interface PastWorkshop {
  title: string;
  type: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

interface IncludedListProps {
  items: string[];
  heading?: string;
}

/** Bold the lead-in ("Tajweed: ...") when an item has a short label before a colon. Same words, just easier to scan. */
function splitLead(item: string): [string | null, string] {
  const i = item.indexOf(': ');
  if (i > 0 && i <= 44) return [item.slice(0, i), item.slice(i + 2)];
  return [null, item];
}

export function IncludedList({ items, heading = "What you'll learn" }: IncludedListProps) {
  return (
    <div>
      <h2 className="mb-7 text-[1.6rem] leading-tight text-primary md:text-[1.9rem]">{heading}</h2>
      <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {items.map((item) => {
          const [lead, rest] = splitLead(item);
          return (
            <li key={item} className="bmc-lift flex items-center gap-4 rounded-2xl bg-card p-4 pr-5 leading-[1.6] text-foreground/85 shadow-soft">
              <IconTile Icon={iconFor(item)} />
              <span>
                {lead ? (
                  <>
                    <strong className="font-semibold text-primary">{lead}:</strong> {rest}
                  </>
                ) : (
                  rest
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The at-a-glance facts: who it is for, when, how much. */
export function DetailsGrid({ items }: { items: DetailItem[] }) {
  return (
    <dl className="space-y-6">
      {items.map(({ label, value }) => (
        <div key={label}>
          <dt className="bmc-eyebrow !text-[0.74rem]">{label}</dt>
          <dd className="mt-1.5 font-display text-[1.2rem] leading-snug text-primary">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface PastWorkshopsGridProps {
  workshops: PastWorkshop[];
  /** Tailwind classes controlling the grid's responsive column count. */
  gridClassName?: string;
}

export function PastWorkshopsGrid({ workshops, gridClassName = 'sm:grid-cols-2' }: PastWorkshopsGridProps) {
  return (
    <ul className={`grid grid-cols-1 ${gridClassName} gap-6 md:gap-8`}>
      {workshops.map((workshop) => (
        <li key={workshop.title} className={`bmc-reveal ${CARD} flex flex-col p-3 sm:p-4`}>
          {workshop.image && (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9rem]">
              <img src={workshop.image} alt={workshop.imageAlt ?? workshop.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-primary/80 px-3 py-1 font-utility text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground backdrop-blur-sm">
                Past
              </span>
            </div>
          )}
          <div className="flex flex-1 flex-col px-2 pb-3 pt-6 sm:px-4">
            {!workshop.image && <p className="bmc-eyebrow mb-2 !text-[0.74rem]">Past</p>}
            <p className="bmc-eyebrow mb-2 !text-[0.74rem]">{workshop.type}</p>
            <h3 className="mb-3 text-[1.35rem] leading-snug text-primary">{workshop.title}</h3>
            <p className="text-[0.98rem] leading-[1.7] text-foreground/80">{workshop.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
