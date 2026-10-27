import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROGRAMMES, programmeTags, type ProgrammeType } from '@/data/programmes';
import { Seo } from '@/components/seo';
import { programmesJsonLd } from '@/lib/structured-data';
import { CARD, CONTAINER, IconChip, PageHeader, PROGRAMME_ICONS, TagList } from '@/components/page-shell';
import { OpenBookIcon } from '@/components/ornaments/madrasah';

type Tab = ProgrammeType;

const TABS: { id: Tab; label: string; sub: string }[] = [
  { id: 'online',   label: 'Online Classes',   sub: '4 programmes' },
  { id: 'inperson', label: 'In-Person Classes', sub: '2 programmes' },
];

export default function Programmes() {
  const [active, setActive] = useState<Tab>('online');
  const visible = PROGRAMMES.filter(p => p.type === active);

  return (
    <>
      <Seo
        title="Islamic Classes for Women & Children"
        description="Six beginner-friendly Islamic programmes for women and children — online and in-person classes in Cape Town, from R100 once-off to R200 per month."
        path="/programmes"
        jsonLd={programmesJsonLd()}
      />
      <PageHeader
        title="Our Programmes"
        intro="Designed to meet you wherever you are on your journey, whether you're taking your very first steps or looking to deepen your knowledge."
      />

      <section className="bg-bmc-paper pb-24 pt-14 md:pb-36 md:pt-20">
        <div className={CONTAINER}>
          {/* Tabs: a soft pill group, no outlines */}
          <div className="mb-14 flex justify-center md:mb-20">
            <div role="group" aria-label="Choose how you would like to learn" className="inline-flex gap-1.5 rounded-full bg-card p-1.5 shadow-soft">
              {TABS.map(({ id, label, sub }) => {
                const on = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(id)}
                    className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full px-5 py-2.5 font-utility transition-colors duration-300 motion-reduce:transition-none sm:px-9 ${
                      on ? 'bg-primary text-primary-foreground shadow-[inset_0_0_0_1px_hsl(var(--bmc-gold)/0.55)]' : 'text-foreground/75 hover:text-primary'
                    }`}
                  >
                    <span className="text-sm font-bold tracking-wide">{label}</span>
                    <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${on ? 'text-bmc-gold-light' : 'text-bmc-gold-ink'}`}>{sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
            >
              {visible.map((p) => {
                const Icon = PROGRAMME_ICONS[p.path] ?? OpenBookIcon;
                return (
                  <li key={p.path} className="flex">
                    <Link
                      href={`/programmes${p.path}`}
                      className={`group flex w-full flex-col p-3 transition-shadow duration-500 hover:shadow-lift sm:p-4 ${CARD} bmc-lift`}
                    >
                      <div className={`relative aspect-[16/10] overflow-hidden rounded-[0.9rem] bg-gradient-to-br ${p.gradient}`}>
                        {p.image && (
                          <img
                            src={p.image}
                            alt=""
                            width={1200}
                            height={750}
                            loading="lazy"
                            decoding="async"
                            style={{ objectPosition: p.imagePosition ?? 'top' }}
                            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col px-2 pb-4 pt-7 sm:px-4">
                        <div className="flex items-center gap-4">
                          <IconChip Icon={Icon} size={30} />
                          <p className="bmc-eyebrow">{p.tag}</p>
                        </div>
                        <h2 className="mt-5 text-[1.65rem] leading-[1.15] text-primary">{p.title}</h2>
                        <TagList tags={programmeTags(p)} className="mt-4" />
                        <p className="mt-4 flex-1 text-[1rem] leading-[1.7] text-foreground/80">{p.descLong}</p>
                        <div className="mt-7 flex items-center justify-between">
                          <span className="font-display text-xl font-medium text-primary">{p.price}</span>
                          <span className="bmc-link !min-h-0 group-hover:text-bmc-gold-ink">
                            View Details
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
