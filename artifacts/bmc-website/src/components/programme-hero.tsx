import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, CalendarDays, Laptop, MapPin, UserRound } from 'lucide-react';
import { GirihPattern } from '@/components/ornaments';
import { PROGRAMME_SCENES } from '@/components/ornaments/programme-scenes';
import { CONTAINER } from '@/components/page-shell';
import { PROGRAMMES } from '@/data/programmes';

/**
 * Coloured hero for every programme page: forest green with the girih pattern, the programme's
 * facts as pills (from the CMS), its price, actions, and a drawn scene of how the class runs.
 */
export function ProgrammeHero({
  path,
  title,
  intro,
  actions,
}: {
  /** Programme path as in content/settings/programmes.json, e.g. "/workshops". */
  path: string;
  title: string;
  intro: ReactNode;
  actions?: ReactNode;
}) {
  const p = PROGRAMMES.find((x) => x.path === path);
  const Scene = PROGRAMME_SCENES[path];
  const facts = p
    ? [
        { Icon: p.type === 'online' ? Laptop : MapPin, label: 'Where', value: p.where ?? (p.type === 'online' ? 'Online' : 'In person') },
        { Icon: CalendarDays, label: 'When', value: p.when },
        { Icon: UserRound, label: 'For', value: p.who },
      ].filter((f) => f.value && !/^(online|in person)$/i.test(f.value))
    : [];

  return (
    <header className="relative overflow-hidden bg-primary pb-20 pt-28 text-primary-foreground md:pb-28 md:pt-36">
      <GirihPattern />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(42rem 30rem at 82% 45%, hsl(var(--bmc-gold) / 0.22) 0%, transparent 70%)' }}
      />
      <div className={`relative ${CONTAINER}`}>
        <Link href="/programmes" className="mb-8 inline-flex min-h-11 items-center gap-2 font-utility text-sm font-semibold text-bmc-gold-light hover:text-primary-foreground md:mb-10">
          <ArrowLeft size={16} aria-hidden="true" /> Back to programmes
        </Link>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            {p && (
              <span className="bmc-rise mb-5 inline-flex items-center gap-2 rounded-full bg-bmc-gold-light px-3.5 py-1 font-utility text-[0.72rem] font-bold uppercase tracking-[0.14em] text-primary">
                <span className={`size-1.5 rounded-full ${p.type === 'online' ? 'bg-[#25D366]' : 'bg-primary'}`} aria-hidden="true" />
                {p.type === 'online' ? 'Online' : 'In person'}
              </span>
            )}
            <h1 className="bmc-rise leading-[1.05] tracking-[-0.022em] text-primary-foreground" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.9rem)' }}>
              {title}
            </h1>
            <p className="bmc-rise bmc-rise-2 mt-6 max-w-[46ch] text-[1.1rem] leading-[1.7] text-primary-foreground/85">{intro}</p>
            {facts.length > 0 && (
              <ul className="bmc-rise bmc-rise-2 mt-7 flex flex-wrap gap-2.5">
                {facts.map(({ Icon, label, value }) => (
                  <li key={label} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-utility text-[0.9rem] text-primary-foreground">
                    <Icon size={16} className="text-bmc-gold-light" aria-hidden="true" />
                    <span className="sr-only">{label}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            )}
            <div className="bmc-rise bmc-rise-3 mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              {p && (
                <p className="font-display text-[1.7rem] leading-none text-bmc-gold-light">
                  {p.price}
                </p>
              )}
              {actions}
            </div>
          </div>
          {Scene && (
            <div className="mx-auto w-full max-w-xl rounded-[2rem] bg-bmc-paper p-5 shadow-lift sm:p-8">
              <Scene className="block h-auto w-full" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
