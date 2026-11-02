import { Link } from 'wouter';
import { ArrowRight, CalendarDays, Laptop, MapPin, UserRound } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { PROGRAMMES, programmeByPath, type ProgrammeType } from '@/data/programmes';
import { ClosedBadge } from '@/components/closed-badge';
import { Seo } from '@/components/seo';
import { programmesJsonLd } from '@/lib/structured-data';
import { CARD, ClosingBand, CONTAINER, PageHeader } from '@/components/page-shell';
import { InPersonArt, OnlineArt } from '@/components/ornaments/programmes-art';
import { IconTile, LettersIcon, MushafIcon, SeedlingIcon } from '@/components/ornaments/cute-icons';

// Fewer choices for a first-time visitor: three starting points, each backed by the site's own facts
// (the FAQ names the Women's Online Madrasah as the place for reverts and beginners to start).
const QUICK_PICKS = [
  { Icon: SeedlingIcon, who: 'New to it all, or a revert?', name: "Women's Online Madrasah", note: 'Learn at your own pace. R150 a month.', href: '/programmes/womens-classes' },
  { Icon: LettersIcon, who: 'For your child (6 to 13)', name: "Children's Online Madrasah", note: 'Live classes three times a week. R150 a month.', href: '/programmes/childrens-classes' },
  { Icon: MushafIcon, who: 'Rather learn in person?', name: "Get Into Qur'an", note: "For women 16+, Saturday mornings in Mitchell's Plain. R200 a month.", href: '/programmes/quran-classes' },
];

type Tab = ProgrammeType;

const WHATSAPP = 'https://wa.me/27686498593';

const FORMAT_LABEL: Record<Tab, string> = { online: 'Online', inperson: 'In person' };

const TABS: { id: Tab; label: string; sub: string; Art: typeof OnlineArt }[] = [
  { id: 'online',   label: 'Learn online',    sub: 'From home, live or in your own time', Art: OnlineArt },
  { id: 'inperson', label: 'Learn in person', sub: 'Classes and workshops in Cape Town', Art: InPersonArt },
];

export default function Programmes() {
  // Both groups are always on the page (only six programmes): the header choices jump to them.
  const jump = (id: Tab) => (e: React.MouseEvent) => {
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <Seo
        title="Islamic Classes for Women & Children"
        description="Six beginner-friendly Islamic programmes for women and children — online and in-person classes in Cape Town, from R100 once-off to R200 per month."
        path="/programmes"
        jsonLd={programmesJsonLd()}
      />
      <PageHeader
        title="Find your class"
        intro="Every class is made for beginners. Learn online from home, or in person in Cape Town."
      >
          {/* The choice is the hero: two drawn scenes that jump to each group below */}
        <nav aria-label="Choose how you would like to learn" className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          {TABS.map(({ id, label, sub, Art }) => {
            const on = true;
            const count = PROGRAMMES.filter((p) => p.type === id).length;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={jump(id)}
                className={`group flex items-center gap-4 rounded-[1.4rem] p-3 pr-5 text-left transition-all duration-300 motion-reduce:transition-none sm:p-5 sm:pb-6 ${
                  on
                    ? 'bg-card shadow-lift ring-2 ring-[hsl(var(--bmc-gold)/0.7)]'
                    : 'bg-bmc-paper shadow-soft hover:bg-card'
                }`}
              >
                <OnlineOrInPerson Art={Art} on={on} />
                <span className="min-w-0">
                <span className="block font-display text-[1.25rem] leading-tight text-primary sm:text-[1.35rem]">{label}</span>
                <span className="mt-1 block font-utility text-[0.85rem] leading-snug text-foreground/70">{sub}</span>
                <span className={`mt-2 block font-utility text-[0.68rem] font-bold uppercase tracking-[0.14em] ${on ? 'text-bmc-gold-ink' : 'text-foreground/55'}`}>
                  {count} programmes
                </span>
                </span>
              </a>
            );
          })}
        </nav>
      </PageHeader>

      <section className="bg-bmc-paper pb-24 pt-16 md:pb-32 md:pt-24">
        <div className={CONTAINER}>
          <div className="mx-auto mb-14 max-w-6xl md:mb-20">
            <h2 className="mb-6 text-center text-[1.6rem] leading-tight text-primary md:text-[1.9rem]">Not sure? Start here</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {QUICK_PICKS.map(({ Icon, who, name, note, href }) => (
                <li key={href} className="flex">
                  <Link href={href} className="bmc-lift group flex w-full items-start gap-4 rounded-[1.25rem] bg-card p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift">
                    <IconTile Icon={Icon} />
                    <span className="min-w-0">
                      <span className="bmc-eyebrow block !text-[0.74rem]">{who}</span>
                      <span className="mt-1 block font-display text-[1.18rem] leading-snug text-primary">{name}</span>
                      <span className="mt-1 block text-[0.92rem] leading-[1.55] text-foreground/75">{note}</span>
                      {programmeByPath(href.replace('/programmes', ''))?.registrationClosed && <ClosedBadge className="mt-2" />}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {TABS.map(({ id, label }) => (
            <section key={id} id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 [&+&]:mt-16 md:[&+&]:mt-24">
              <h2 id={`${id}-title`} className="mx-auto mb-8 max-w-6xl text-[1.6rem] leading-tight text-primary md:text-[1.9rem]">{label}</h2>
              <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
              {PROGRAMMES.filter((p) => p.type === id).map((p) => {
                    return (
                      <li key={p.path} className="flex">
                        <Link
                          href={`/programmes${p.path}`}
                          className={`group flex w-full flex-col p-3 transition-shadow duration-500 hover:shadow-lift sm:p-4 ${CARD} bmc-lift`}
                        >
                          <div className={`relative aspect-[2/1] overflow-hidden rounded-[0.9rem] bg-gradient-to-br ${p.gradient}`}>
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
                            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1 font-utility text-[0.72rem] font-bold uppercase tracking-[0.12em] text-primary shadow-soft">
                              <span className={`size-1.5 rounded-full ${p.type === 'online' ? 'bg-[#25D366]' : 'bg-bmc-gold'}`} aria-hidden="true" />
                              {FORMAT_LABEL[p.type]}
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col px-2 pb-3 pt-5 sm:px-3">
                            {p.registrationClosed && <ClosedBadge className="mb-2 self-start" />}
                            <h3 className="text-[1.5rem] leading-[1.15] text-primary">{p.title}</h3>
                            <Facts p={p} />
                            <p className="mt-3 flex-1 text-[0.98rem] leading-[1.65] text-foreground/80">{p.descLong}</p>
                            <div className="mt-5 flex items-center justify-between">
                              <span className="font-display text-xl font-medium text-primary">{p.price}</span>
                              <span className="bmc-link !min-h-0 group-hover:text-bmc-gold-ink">
                                View details
                                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <ClosingBand
        title="Not sure where to start?"
        actions={
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-primary">
            <SiWhatsapp className="size-[1.1rem]" aria-hidden="true" />
            Ask us on WhatsApp
          </a>
        }
      >
        Send us a message and we will help you choose the class that suits you.
      </ClosingBand>
    </>
  );
}

function OnlineOrInPerson({ Art, on }: { Art: typeof OnlineArt; on: boolean }) {
  return (
    <span className={`block w-28 shrink-0 overflow-hidden rounded-2xl bg-bmc-paper p-1.5 transition-transform sm:w-32 duration-500 motion-reduce:transition-none ${on ? '' : 'group-hover:-translate-y-0.5'}`}>
      <Art className={`block h-auto w-full transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-75'}`} />
    </span>
  );
}

/** Quick facts: each icon names the fact beside it (when / where / who). Empty facts are hidden. */
function Facts({ p }: { p: (typeof PROGRAMMES)[number] }) {
  const facts = [
    { Icon: CalendarDays, label: 'When', value: p.when },
    { Icon: p.type === 'online' ? Laptop : MapPin, label: 'Where', value: p.where },
    { Icon: UserRound, label: 'For', value: p.who },
  ].filter((f) => f.value);
  if (!facts.length) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-utility text-[0.88rem] text-foreground/80">
      {facts.map(({ Icon, label, value }) => (
        <li key={label} className="inline-flex items-center gap-1.5">
          <Icon size={16} className="shrink-0 text-bmc-gold-ink" aria-hidden="true" />
          <span className="sr-only">{label}: </span>
          {value}
        </li>
      ))}
    </ul>
  );
}
