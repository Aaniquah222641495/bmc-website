import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { PastWorkshopsGrid } from '@/components/class-page-blocks';
import { GirihPattern } from '@/components/ornaments';
import { InPersonArt } from '@/components/ornaments/programmes-art';
import { ProgrammeHero } from '@/components/programme-hero';
import { SiInstagram, SiTiktok } from 'react-icons/si';
import { CONTAINER, SECTION_Y, SectionHead, StarBullet } from '@/components/page-shell';
import { Seo } from '@/components/seo';
import { currentOnlineWorkshops, pastOnlineWorkshops, type Workshop } from '@/data/workshops';
import { useNow } from '@/hooks/use-now';
import { NotifyButton, NotifySection } from '@/components/workshop-notify';
import { REGISTER_ENDPOINT } from '@/data/registration';
import { graph, programmeJsonLd, eventsJsonLd } from '@/lib/structured-data';

// Workshops are authored as files under content/workshops/ (directly, or via
// the CMS at /admin) — see src/data/workshops.ts. PastWorkshopsGrid wants a
// simpler shape than the "available now" cards below, so map it here.
const NOTIFY = 'https://wa.me/27686498593?text=Slm%2C%20please%20let%20me%20know%20about%20upcoming%20workshops';

const toPastCard = (w: Workshop) => ({
  title: w.title,
  type: w.typeLabel ?? 'Workshop',
  description: w.description,
  image: w.image,
  imageAlt: w.imageAlt,
});

// One "Available Now" card. Extracted so the section can lay the cards out
// either stacked (a lone workshop) or two-up in a grid.
function CurrentWorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <article className="bmc-reveal relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-primary text-primary-foreground shadow-lift">
      {workshop.image ? (
        <div className="relative h-64 w-full overflow-hidden md:h-72">
          <img src={workshop.image} alt={workshop.imageAlt ?? workshop.title} loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
          <span className="absolute left-4 top-4 rounded-full bg-primary/80 px-3 py-1 font-utility text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground backdrop-blur-sm">
            {workshop.badge}
          </span>
        </div>
      ) : (
        <div className="relative px-8 pb-2 pt-8 md:px-12">
          <GirihPattern />
          <span className="relative inline-block rounded-full bg-bmc-gold-light px-3 py-1 font-utility text-[0.68rem] font-bold uppercase tracking-[0.14em] text-primary">
            {workshop.badge}
          </span>
        </div>
      )}

      <div className="relative flex flex-1 flex-col p-8 md:p-12">
        <h2 className="mb-2 text-[1.9rem] leading-tight text-primary-foreground md:text-[2.3rem]">{workshop.title}</h2>
        {workshop.subtitle && <p className="mb-4 italic text-bmc-gold-light">{workshop.subtitle}</p>}
        <p className="mb-9 text-[1.05rem] leading-[1.7] text-primary-foreground/90">{workshop.description}</p>

        <dl className="mb-10 grid gap-4 sm:grid-cols-2">
          {(workshop.details ?? []).map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-white/10 p-4">
              <dt className="bmc-eyebrow on-dark !text-[0.74rem]">{label}</dt>
              <dd className="mt-1 font-display text-[1.1rem] text-primary-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mb-9">
          <p className="bmc-eyebrow on-dark mb-4">{workshop.topicsLabel ?? 'Topics Covered'}</p>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {(workshop.topics ?? []).map((topic) => (
              <li key={topic} className="flex items-start gap-3 text-[0.95rem] leading-[1.6] text-primary-foreground/90">
                <StarBullet className="mt-[0.35rem] !h-3.5 !w-3.5 !text-bmc-gold-light" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {workshop.includes && (
          <div className="mb-9">
            <p className="bmc-eyebrow on-dark mb-4">What You'll Receive</p>
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {workshop.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-[1.6] text-primary-foreground/90">
                  <StarBullet className="mt-[0.35rem] !h-3.5 !w-3.5 !text-bmc-gold-light" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {workshop.registrationUrl && (
          <div className="mt-auto pt-4">
            <a href={workshop.registrationUrl} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-light">
              Register now <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Workshops() {
  const now = useNow();
  const CURRENT_ONLINE_WORKSHOPS = currentOnlineWorkshops(now);
  const PAST_WORKSHOPS = pastOnlineWorkshops(now).map(toPastCard);
  const events = eventsJsonLd(CURRENT_ONLINE_WORKSHOPS, '/programmes/workshops');
  const multiple = CURRENT_ONLINE_WORKSHOPS.length > 1;

  return (
    <>
      <Seo
        title="Online Workshops & Short Courses"
        description="Online workshops and short courses on Islamic topics — Women in Islam, the Nikah Series, Wudhu, Ghusl and Ramadan preparation — accessible, from R100."
        path="/programmes/workshops"
        jsonLd={[programmeJsonLd('/programmes/workshops'), ...(events.length ? [graph(...events)] : [])]}
      />
      <ProgrammeHero
        path="/workshops"
        title="Online Workshops & Short Courses"
        intro="Focused online sessions and short courses on essential Islamic topics: practical, accessible, and designed to leave you with knowledge you can use straight away."
        actions={
          <NotifyButton whatsapp={NOTIFY} className="bmc-btn bmc-btn-light" />
        }
      />

      {/* Currently Available */}
      <section className={`${SECTION_Y} bg-bmc-paper !pt-16 md:!pt-24`}>
        <div className={CONTAINER}>
          <SectionHead title="Available now" center className="mb-12 md:mb-16" />
          {CURRENT_ONLINE_WORKSHOPS.length === 0 ? (
            <div className="bmc-reveal mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[1.75rem] bg-bmc-gold-light/45 p-8 text-center sm:flex-row sm:p-10 sm:text-left">
              <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-card text-primary shadow-soft" aria-hidden="true">
                <svg width="34" height="34" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="11" width="32" height="29" rx="4" />
                  <path d="M8 19H40M16 7V14M32 7V14" />
                  <path d="M24 24V32M20 28H28" />
                </svg>
              </span>
              <div className="flex-1">
                <p className="font-display text-[1.35rem] leading-snug text-primary">New dates are on the way</p>
                <p className="mt-1.5 leading-[1.7] text-foreground/80">
                  No workshops are open for registration right now. Have a look at the previous
                  workshops below, or {REGISTER_ENDPOINT ? 'leave your email below' : 'follow us'} to hear when new dates are announced.
                </p>
              </div>
              <NotifyButton whatsapp={NOTIFY} className="bmc-btn bmc-btn-primary whitespace-nowrap" label="Notify me" />
            </div>
          ) : (
            <div className={`mx-auto ${multiple ? 'grid max-w-6xl items-stretch gap-8 md:grid-cols-2' : 'max-w-5xl space-y-8'}`}>
              {CURRENT_ONLINE_WORKSHOPS.map((workshop) => (
                <CurrentWorkshopCard key={workshop.title} workshop={workshop} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Workshops */}
      {PAST_WORKSHOPS.length > 0 && (
      <section className={`${SECTION_Y} bg-background`}>
        <div className={CONTAINER}>
          <SectionHead
            title="Previous workshops"
            intro="These workshops have been run before and may return in future. Follow us to be notified when they open again."
            className="mb-14 md:mb-16"
          />
          <PastWorkshopsGrid workshops={PAST_WORKSHOPS} gridClassName="md:grid-cols-2" />
        </div>
      </section>
      )}

      {/* Also available + stay updated */}
      <section className={`${SECTION_Y} bg-bmc-paper`}>
        <div className={`${CONTAINER} mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-8`}>
          <Link
            href="/programmes/in-person-workshops"
            className="bmc-reveal group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-primary p-8 text-primary-foreground shadow-lift sm:flex-row sm:items-center sm:gap-8 md:p-10"
          >
            <GirihPattern />
            <span className="relative mb-6 block w-40 shrink-0 rounded-2xl bg-bmc-paper p-2 sm:mb-0 sm:w-44">
              <InPersonArt className="block h-auto w-full" />
            </span>
            <span className="relative block">
              <span className="block font-utility text-[0.72rem] font-bold uppercase tracking-[0.16em] text-bmc-gold-light">Also available</span>
              <span className="mt-2 block font-display text-[1.7rem] leading-tight">In-Person Workshops</span>
              <span className="mt-3 block leading-[1.7] text-primary-foreground/85">
                Interactive face-to-face workshops covering important Islamic topics, with opportunities for discussion, questions and practical learning.
              </span>
              <span className="mt-5 inline-flex items-center gap-2 font-utility font-semibold text-bmc-gold-light">
                View In-Person <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </span>
            </span>
          </Link>

          <div className="bmc-reveal flex flex-col rounded-[1.75rem] bg-card p-8 shadow-soft md:p-10">
            <p className="bmc-eyebrow mb-3">Stay updated</p>
            <h2 className="text-primary leading-[1.12]" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2rem)' }}>{REGISTER_ENDPOINT ? 'Follow along' : 'Hear about the next one first'}</h2>
            <p className="mt-3 leading-[1.7] text-foreground/80">
              New workshop dates are announced on Instagram and TikTok. Follow along so you don't miss the next one.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://instagram.com/beginners_classes" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-bmc-paper px-4 font-utility text-[0.9rem] font-semibold text-primary hover:shadow-soft">
                <SiInstagram className="size-4 text-bmc-gold-ink" aria-hidden="true" /> @beginners_classes
              </a>
              <a href="https://tiktok.com/@rukeyabaradien_" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-bmc-paper px-4 font-utility text-[0.9rem] font-semibold text-primary hover:shadow-soft">
                <SiTiktok className="size-4 text-bmc-gold-ink" aria-hidden="true" /> @rukeyabaradien_
              </a>
            </div>
            {!REGISTER_ENDPOINT && (
              <p className="mt-6 text-sm leading-[1.7] text-foreground/75">
                Or send us a{' '}
                <a href={NOTIFY} target="_blank" rel="noreferrer" className="bmc-link-inline">WhatsApp message</a>
                {' '}to be added to the notification list.
              </p>
            )}
          </div>
        </div>
      </section>
      <NotifySection listKey="workshops" title="Online workshop" source="workshops" />
    </>
  );
}
