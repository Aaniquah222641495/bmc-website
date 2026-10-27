import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { PastWorkshopsGrid } from '@/components/class-page-blocks';
import { GirihPattern } from '@/components/ornaments';
import { OpenBookIcon } from '@/components/ornaments/madrasah';
import { CARD, CONTAINER, PageHeader, SECTION_Y, SectionHead, StarBullet, TagList } from '@/components/page-shell';
import { Seo } from '@/components/seo';
import { PROGRAMMES } from '@/data/programmes';
import { currentOnlineWorkshops, pastOnlineWorkshops, type Workshop } from '@/data/workshops';
import { useNow } from '@/hooks/use-now';
import { graph, programmeJsonLd, eventsJsonLd } from '@/lib/structured-data';

// Workshops are authored as files under content/workshops/ (directly, or via
// the CMS at /admin) — see src/data/workshops.ts. PastWorkshopsGrid wants a
// simpler shape than the "available now" cards below, so map it here.
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
              <dt className="bmc-eyebrow on-dark !text-[0.66rem]">{label}</dt>
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
              Register Now <ArrowRight size={16} aria-hidden="true" />
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
      <PageHeader
        back={{ href: '/programmes', label: 'Back to Programmes' }}
        eyebrow={PROGRAMMES.find((p) => p.path === '/workshops')?.tag}
        title="Online Workshops & Short Courses"
        intro="Focused online sessions and short courses on essential Islamic topics: practical, accessible, and designed to leave you with knowledge you can use straight away."
        mark={<span className="inline-flex text-bmc-gold-ink" aria-hidden="true"><OpenBookIcon size={52} strokeWidth={1.2} /></span>}
      />

      {/* Currently Available */}
      <section className={`${SECTION_Y} bg-bmc-paper !pt-16 md:!pt-24`}>
        <div className={CONTAINER}>
          <SectionHead title="Available Now" center className="mb-12 md:mb-16" />
          {CURRENT_ONLINE_WORKSHOPS.length === 0 ? (
            <p className="mx-auto max-w-xl text-center leading-[1.75] text-foreground/80">
              No workshops are open for registration right now. Have a look at the previous
              workshops below, or follow us to hear when new dates are announced.
            </p>
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
            title="Previous Workshops"
            intro="These workshops have been run before and may return in future. Follow us to be notified when they open again."
            className="mb-14 md:mb-16"
          />
          <PastWorkshopsGrid workshops={PAST_WORKSHOPS} gridClassName="md:grid-cols-2" />
        </div>
      </section>
      )}

      {/* In-Person Workshops */}
      <section className={`${SECTION_Y} bg-bmc-paper`}>
        <div className={`${CONTAINER} mx-auto max-w-5xl`}>
          <SectionHead title="Also Available" className="mb-12" />
          <div className={`bmc-reveal ${CARD} flex flex-col items-start gap-8 p-8 md:flex-row md:items-center md:p-12`}>
            <div className="flex-1">
              <h3 className="mb-3 text-[1.6rem] text-primary">In-Person Workshops</h3>
              <p className="mb-5 leading-[1.7] text-foreground/80">
                Interactive face-to-face workshops covering important Islamic topics, with opportunities for discussion, questions and practical learning.
              </p>
              <TagList tags={['In-Person', 'From R100']} />
            </div>
            <Link href="/programmes/in-person-workshops" className="bmc-btn bmc-btn-primary whitespace-nowrap">
              View In-Person <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stay Updated */}
      <section className={`${SECTION_Y} bg-background`}>
        <div className={`${CONTAINER} bmc-reveal mx-auto max-w-3xl text-center`}>
          <SectionHead title="Stay Updated" center className="mb-6" />
          <p className="mx-auto mb-8 max-w-md leading-[1.7] text-foreground/80">
            New workshop dates are announced on Instagram and TikTok. Follow along so you don't miss the next one.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-x-8 gap-y-1">
            <a href="https://instagram.com/beginners_classes" target="_blank" rel="noreferrer" className="bmc-link-inline inline-flex min-h-11 items-center font-utility">
              @beginners_classes
            </a>
            <a href="https://tiktok.com/@rukeyabaradien_" target="_blank" rel="noreferrer" className="bmc-link-inline inline-flex min-h-11 items-center font-utility">
              @rukeyabaradien_
            </a>
          </div>
          <p className="text-sm leading-[1.7] text-foreground/75">
            Or send us a{' '}
            <a
              href="https://wa.me/27686498593?text=Slm%2C%20please%20let%20me%20know%20about%20upcoming%20workshops"
              target="_blank"
              rel="noreferrer"
              className="bmc-link-inline"
            >
              WhatsApp message
            </a>
            {' '}to be added to the notification list.
          </p>
        </div>
      </section>
    </>
  );
}
