import { motion } from 'framer-motion';

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

export function IncludedList({ items, heading = "What's Included" }: IncludedListProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px bg-accent w-8" />
        <h2 className="font-display text-2xl text-primary whitespace-nowrap">{heading}</h2>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.06 }}
            className="flex items-start gap-3 font-body text-foreground/80"
          >
            <img src="/assets/bullet.webp" alt="" width={16} height={16} loading="lazy" decoding="async" className="flex-shrink-0 mt-1" />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

interface DetailsGridProps {
  items: DetailItem[];
}

export function DetailsGrid({ items }: DetailsGridProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map(({ label, value }) => (
        <div key={label} className="bg-muted rounded-xl p-5 border border-border">
          <p className="font-utility text-xs text-foreground/50 uppercase tracking-widest mb-1">{label}</p>
          <p className="font-display text-primary text-lg">{value}</p>
        </div>
      ))}
    </div>
  );
}

interface PastWorkshopsGridProps {
  workshops: PastWorkshop[];
  delayBase?: number;
  delayStep?: number;
  /** Tailwind classes controlling the grid's responsive column count. */
  gridClassName?: string;
}

export function PastWorkshopsGrid({
  workshops,
  delayBase = 0.3,
  delayStep = 0.08,
  gridClassName = 'sm:grid-cols-2',
}: PastWorkshopsGridProps) {
  return (
    <div className={`grid ${gridClassName} gap-5`}>
      {workshops.map((workshop, i) => (
        <motion.div
          key={workshop.title}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delayBase + i * delayStep }}
          className="bg-card border border-border rounded-2xl relative overflow-hidden"
        >
          {workshop.image && (
            <div className="relative w-full h-44 overflow-hidden">
              <img
                src={workshop.image}
                alt={workshop.imageAlt ?? workshop.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="font-utility text-xs text-white/80 uppercase tracking-widest border border-white/30 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                  Past
                </span>
              </div>
            </div>
          )}

          <div className="p-7 relative">
            {!workshop.image && (
              <div className="absolute top-4 right-4">
                <span className="font-utility text-xs text-foreground/30 uppercase tracking-widest border border-border rounded-full px-3 py-1">
                  Past
                </span>
              </div>
            )}
            <h3 className="font-display text-xl text-primary mb-2">{workshop.title}</h3>
            <p className="font-utility text-xs text-foreground/50 uppercase tracking-widest mb-3">{workshop.type}</p>
            <p className="font-body text-foreground/70 text-sm leading-relaxed">{workshop.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
