import { Link } from 'wouter';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { PROGRAMMES as ALL_PROGRAMMES, programmeTags } from '@/data/programmes';
import { Seo } from '@/components/seo';
import { homeJsonLd } from '@/lib/structured-data';
import { GirihPattern, HeroGraphic, Rosette } from '@/components/ornaments';
import { BookStackIcon, HeroLetters, MasjidIcon, MasjidSkyline, RehalIcon, SectionMark, SlateIcon } from '@/components/ornaments/madrasah';

// Real student words, supplied by the client. Use verbatim; do not edit or add.
const TESTIMONIALS_PREVIEW = [
  {
    name: 'Aaliyah Arendse',
    quote:
      "Even though I'm a very shy and nervous person, she makes you feel comfortable in every class. Best decision I've made.",
  },
  {
    name: 'Naadhirah Gilbert',
    quote:
      'Mualimah takes her time with each topic and always makes sure that everyone is on the same page. The class is perfect for beginners, reverts or even just a refresher course.',
  },
  {
    name: 'Yasmeen Zingitwa',
    quote:
      "I've been amazed at how much I've learned over such a short period of time. I encourage anyone considering joining to take this step!",
  },
];

// Curated order for the homepage (alternates online and in-person). Content comes from content/settings/programmes.json.
const FEATURED_PATHS = [
  '/womens-classes',
  '/in-person-workshops',
  '/quran-classes',
  '/hifdh-classes',
  '/childrens-classes',
  '/workshops',
];
const PROGRAMMES = FEATURED_PATHS.map((path) => ALL_PROGRAMMES.find((p) => p.path === path)!);
// The first programme is shown large; the rest are compact. Women's Online Madrasah is first in the list.
const [FEATURED, ...REST] = PROGRAMMES;

const WHATSAPP = 'https://wa.me/27686498593';

const STEPS = [
  {
    title: 'Choose a programme',
    desc: 'Pick the class that suits you: for women, for children, Qur\'an, Hifdh or workshops, online or in person.',
    cta: 'View programmes',
    href: '/programmes',
    img: '/assets/stock/step-choose-laptop.webp',
    alt: 'A woman in a mustard hijab typing on a laptop at a white table',
  },
  {
    title: 'Register',
    desc: 'Send us a message on WhatsApp and we will help you register.',
    cta: 'Register on WhatsApp',
    href: WHATSAPP,
    external: true,
    img: '/assets/stock/step-register-mushaf.webp',
    alt: 'A closed pink Mushaf resting on a white cloth with pink prayer beads and flowers',
  },
  {
    title: 'Join your first class',
    desc: 'Begin in a warm, nurturing space where every question is welcome.',
    img: '/assets/stock/step-first-class-lanterns.webp',
    alt: 'A table with lit candles, two gold lanterns, a small framed print and a cup of coffee',
  },
];

// Real photos for the Moments gallery. No event names or dates are claimed.
const MOMENTS = [
  {
    src: '/assets/photo-workshop-awards.webp',
    alt: 'A teacher speaking at a workshop, with framed certificates on a table beside her',
    width: 750,
    height: 1000,
    cls: 'md:col-start-1 md:row-span-2',
    pos: 'center 72%',
  },
  {
    src: '/assets/photo-ramadan-preparation.webp',
    alt: 'A bowl of dates beside an ornate decorative box and an open Qur\'an',
    width: 924,
    height: 614,
    cls: 'md:col-span-2',
    pos: 'center',
  },
  {
    src: '/assets/photo-quran-lesson.webp',
    alt: 'Two women sitting outdoors reading together from a book on a small table',
    width: 800,
    height: 1067,
    cls: 'md:col-start-4 md:row-start-1 md:row-span-2',
    pos: 'center 40%',
  },
  {
    src: '/assets/photo-achievement.webp',
    alt: 'Two women standing together, one holding a framed certificate, in a workshop hall',
    width: 750,
    height: 1000,
    cls: '',
    pos: 'center 55%',
  },
  {
    src: '/assets/photo-wudhu-workshop-1.webp',
    alt: 'A presenter standing in front of a slide titled Wudhu, Ghusl and Salaah Workshop',
    width: 800,
    height: 1067,
    cls: '',
    pos: 'center 45%',
  },
];

const PILLARS = [
  { Icon: SlateIcon, title: 'Beginner Friendly', desc: 'No prior knowledge needed. We start from absolute zero.' },
  { Icon: MasjidIcon, title: 'Safe Environment', desc: 'A warm, nurturing space where every question is welcome.' },
  { Icon: RehalIcon, title: 'Learn from Anywhere', desc: 'Online classes accessible from home, anywhere in the world.' },
  { Icon: BookStackIcon, title: 'Affordable Learning', desc: 'Quality Islamic education from just R150 per month.' },
];

// Shared type sizes for the calmer, lighter display scale.
const H2_STYLE = { fontSize: 'clamp(2.25rem, 4.6vw, 3.6rem)' } as const;
const H2 = 'text-primary leading-[1.08] tracking-[-0.018em]';
const SECTION = 'py-24 md:py-36';

export default function Home() {
  const [lead, ...others] = TESTIMONIALS_PREVIEW;
  return (
    <>
      <Seo
        title="Beginners Madrasah Classes | Islamic Classes, Cape Town"
        description="A warm, safe, beginner-friendly Islamic learning space for women and children, online and in-person. Six programmes from R150/month, est. 2024."
        path="/"
        jsonLd={homeJsonLd()}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background pt-36 pb-24 md:pt-44 md:pb-36">
        {/* Quiet warmth and a large faint khatam rosette: decoration only, behind everything, never under text. */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(60% 70% at 74% 46%, hsl(var(--bmc-paper)) 0%, transparent 70%), radial-gradient(42% 52% at 0% 100%, hsl(var(--bmc-gold-light) / 0.22) 0%, transparent 70%)',
          }}
        />
        <Rosette className="absolute left-0 bottom-0 h-[34rem] w-[48rem]" origin="0% 100%" opacity={0.2} />
        <Rosette className="absolute right-0 top-0 hidden h-[30rem] w-[44rem] sm:block" origin="100% 0%" opacity={0.14} />
        {/* Masjid skyline along the foot of the hero: a community learning space, at a glance */}
        <MasjidSkyline
          className="hg-fade absolute inset-x-0 bottom-0 mx-auto h-24 w-full max-w-[90rem] sm:h-32 lg:h-40 pointer-events-none"
          color="hsl(40 34% 87%)"
          crescent="hsl(40 58% 62%)"
        />

        <HeroLetters />

        <div className="pointer-events-none relative container mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          <div className="pointer-events-auto">
            <p className="bmc-rise bmc-eyebrow mb-7 leading-[1.9]">
              Est. 2024 &middot; Six programmes &middot; Online and in Cape Town
            </p>
            <h1
              className="bmc-rise text-primary leading-[1.02] tracking-[-0.025em] mb-8"
              style={{ fontSize: 'clamp(2.7rem, 6.6vw, 5.2rem)' }}
            >
              Beginners Madrasah <span className="italic font-normal text-bmc-gold-ink">Classes</span>
            </h1>
            <p
              className="bmc-rise bmc-rise-2 text-foreground/80 leading-[1.7] mb-11"
              style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', maxWidth: '34ch' }}
            >
              A warm, safe, beginner-friendly Islamic learning space for women and children, online and in-person.
            </p>
            <div className="bmc-rise bmc-rise-3 flex flex-wrap gap-x-8 gap-y-2 items-center">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-primary">
                Register Now
              </a>
              <Link href="/programmes" className="bmc-link">
                View Programmes <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Mascot inside a code-drawn mihrab arch (HeroGraphic). Mascot-2 is the brand's mascot (founder, 2026-10-26). */}
          <div className="pointer-events-auto flex justify-center lg:justify-end">
            <HeroGraphic className="max-w-[19.5rem] sm:max-w-[22rem] lg:max-w-[27rem]" />
          </div>
        </div>
      </section>

      {/* What you can expect */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <GirihPattern />
        <div className="relative container mx-auto px-5 md:px-10 py-20 md:py-28">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 lg:gap-y-0">
            {PILLARS.map(({ Icon, title, desc }) => (
              <li key={title} className="bmc-reveal flex flex-col items-center text-center lg:px-6">
                <div className="bmc-gold-frame relative w-16 h-16 rounded-full flex items-center justify-center mb-6 text-bmc-gold-light" aria-hidden="true">
                  <Icon size={40} strokeWidth={1.25} />
                </div>
                <h2 className="text-[1.4rem] leading-snug text-primary-foreground mb-3">{title}</h2>
                <p className="text-primary-foreground/80 leading-[1.7] text-[0.95rem] max-w-[17rem]">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to start */}
      <section className={`${SECTION} bg-bmc-paper`}>
        <div className="container mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-16 md:mb-24">
            <SectionMark className="mb-5" />
            <h2 className={`${H2} mb-6`} style={H2_STYLE}>
              How to start
            </h2>
            <p className="text-foreground/80 leading-[1.7] text-[1.1rem]">
              No prior knowledge needed. We start from absolute zero.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10 lg:gap-14">
            {STEPS.map((step, i) => (
              <li key={step.title} className="bmc-reveal relative flex flex-col">
                <div className="bmc-photo mb-9">
                  <img
                    src={step.img}
                    alt={step.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <p className="mb-4" aria-hidden="true">
                  <span className="font-display italic text-bmc-gold-ink text-[1.5rem] leading-none">0{i + 1}</span>
                </p>
                <h3 className="text-[1.65rem] leading-tight text-primary mb-3">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="text-foreground/80 leading-[1.7] text-[1rem] mb-5">{step.desc}</p>
                {step.href &&
                  (step.external ? (
                    <a href={step.href} target="_blank" rel="noreferrer" className="bmc-link mt-auto self-start">
                      {step.cta} <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={step.href} className="bmc-link mt-auto self-start">
                      {step.cta} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  ))}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Story and founder */}
      <section className={`${SECTION} bg-background`}>
        <div className="container mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-28 items-center">
          <figure className="bmc-reveal relative max-w-sm mx-auto lg:mx-0 w-full">
            <div className="bmc-photo">
              <img
                src="/assets/photo-founder-teaching.webp"
                alt="Mualimah Rukeya teaching a workshop"
                width={1000}
                height={1333}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="mt-6 text-center lg:text-left">
              <span className="block font-display text-[1.25rem] text-primary">Mualimah Rukeya</span>
              <span className="bmc-eyebrow mt-1.5 block !text-[0.68rem]">Founder &amp; Teacher</span>
            </figcaption>
          </figure>

          <div className="bmc-reveal">
            <SectionMark className="mb-5" />
            <h2 className={`${H2} mb-9`} style={H2_STYLE}>
              Born from a passion for teaching
            </h2>
            <p className="text-foreground/85 leading-[1.75] mb-6 text-[1.15rem]" style={{ maxWidth: '56ch' }}>
              Alhamdulillah, what started as a small class has grown into a thriving learning community, offering six programmes to hundreds of students across South Africa and beyond.
            </p>
            <p className="text-foreground/80 leading-[1.75] mb-6 text-[1.05rem]" style={{ maxWidth: '56ch' }}>
              Mualimah Rukeya has been teaching Islamic sciences since 2024, guiding women and children toward a deeper connection with their faith in a safe, nurturing environment.
            </p>
            <p className="text-foreground/80 leading-[1.75] mb-9 text-[1.05rem]" style={{ maxWidth: '56ch' }}>
              She founded Beginners Madrasah Classes to make authentic Islamic education accessible to all, wherever you are.
            </p>
            <Link href="/about" className="bmc-link">
              Read Our Story <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Programmes: one featured, the rest in a single quiet list */}
      <section className={`${SECTION} bg-bmc-paper`}>
        <div className="container mx-auto px-5 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-14 md:mb-20">
            <div>
              <SectionMark className="mb-5" />
              <h2 className={H2} style={H2_STYLE}>
                Our programmes
              </h2>
            </div>
            <Link href="/programmes" className="bmc-link">
              See all programmes <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12">
            <Link
              href={`/programmes${FEATURED.path}`}
              className="bmc-reveal group flex flex-col rounded-[1.25rem] bg-card p-3 sm:p-4 shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.3)] bmc-lift transition-shadow duration-500 hover:shadow-lift"
            >
              <div className={`relative aspect-[4/3] overflow-hidden rounded-[0.9rem] bg-gradient-to-br ${FEATURED.gradient}`}>
                {FEATURED.image && (
                  <img
                    src={FEATURED.image}
                    alt=""
                    width={1500}
                    height={1449}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: FEATURED.imagePosition ?? 'top' }}
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                  />
                )}
              </div>
              <div className="px-2 sm:px-4 pt-8 pb-4 flex flex-col flex-1">
                <p className="bmc-eyebrow">{FEATURED.tag}</p>
                <h3 className="mt-3 text-primary leading-[1.12]" style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)' }}>
                  {FEATURED.title}
                </h3>
                <TagList tags={programmeTags(FEATURED)} className="mt-5" />
                <p className="mt-5 text-foreground/80 leading-[1.7] text-[1.02rem] flex-1">{FEATURED.descShort}</p>
                <div className="mt-8 flex items-center justify-between pt-2">
                  <span className="font-display text-xl font-medium text-primary">{FEATURED.price}</span>
                  <span className="bmc-link !min-h-0 group-hover:text-bmc-gold-ink">
                    Learn more
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>

            <ul className="bmc-reveal flex flex-col overflow-hidden rounded-[1.25rem] bg-card shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.3)] gap-1.5 p-2">
              {REST.map((p) => (
                <li key={p.path} className="flex-1">
                  <Link
                    href={`/programmes${p.path}`}
                    className="group flex h-full items-center gap-4 rounded-[0.9rem] p-3 sm:p-4 transition-colors duration-300 hover:bg-bmc-paper"
                  >
                    <div className={`relative h-[4.5rem] w-[4.5rem] sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-[0.7rem] bg-gradient-to-br ${p.gradient}`}>
                      {p.image && (
                        <img
                          src={p.image}
                          alt=""
                          width={96}
                          height={96}
                          loading="lazy"
                          decoding="async"
                          style={{ objectPosition: p.imagePosition ?? 'top' }}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1.1rem] leading-snug text-primary">{p.title}</h3>
                      <TagList tags={programmeTags(p)} className="mt-2" />
                      <p className="mt-2 font-utility text-sm font-semibold text-bmc-gold-ink">{p.price}</p>
                    </div>
                    <ArrowRight size={18} className="shrink-0 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Moments */}
      <section className={`${SECTION} bg-background`}>
        <div className="container mx-auto px-5 md:px-10">
          <SectionMark className="mb-5" />
          <h2 className={`${H2} mb-12 md:mb-16`} style={H2_STYLE}>
            Moments from our classes
          </h2>
          <ul
            className="-mx-5 px-5 md:mx-0 md:px-0 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 md:overflow-visible md:grid md:grid-cols-4 md:auto-rows-[15rem] lg:auto-rows-[17rem] md:gap-6"
            aria-label="Photos from our classes and workshops"
          >
            {MOMENTS.map((m) => (
              <li
                key={m.src}
                className={`bmc-reveal bmc-photo snap-center shrink-0 basis-[72%] sm:basis-[46%] md:basis-auto aspect-[4/5] md:aspect-auto ${m.cls}`}
              >
                <img
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: m.pos }}
                  className="h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`relative overflow-hidden ${SECTION}`} style={{ backgroundColor: 'hsl(40 26% 91%)' }}>
        <div className="container mx-auto px-5 md:px-10">
          <div className="mb-8 flex justify-center"><SectionMark /></div>
          <h2 className={`text-center ${H2}`} style={H2_STYLE}>
            What Our Students Say
          </h2>

          <figure className="bmc-reveal mx-auto mt-10 max-w-4xl text-center">
            <span
              className="bmc-gold-text block font-display leading-none select-none"
              style={{ fontSize: 'clamp(5rem, 10vw, 7.5rem)', height: 'clamp(3.5rem, 7vw, 5rem)' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote
              className="font-display italic font-normal text-primary leading-[1.3] tracking-[-0.012em]"
              style={{ fontSize: 'clamp(1.55rem, 3.3vw, 2.5rem)' }}
            >
              {lead.quote}
            </blockquote>
            <figcaption className="bmc-eyebrow mt-9">{lead.name}</figcaption>
          </figure>

          <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {others.map((t) => (
              <figure key={t.name} className="bmc-reveal rounded-[1.25rem] bg-bmc-paper p-8 md:p-11 ring-1 ring-[hsl(var(--bmc-gold)/0.35)] shadow-soft">
                <blockquote className="text-foreground/90 leading-[1.75] text-[1.05rem]">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="bmc-eyebrow mt-6 !text-[0.68rem]">{t.name}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/testimonials" className="bmc-link">
              Read All Stories <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing invitation: her women's class illustration, and the masjid skyline leading into the footer */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <GirihPattern />
        <div className="relative container mx-auto px-5 md:px-10 pt-24 pb-40 md:pt-32 md:pb-52 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">
          <div className="bmc-reveal relative mx-auto w-full max-w-[22rem] sm:max-w-[28rem] lg:max-w-[34rem]">
            <div
              aria-hidden="true"
              className="absolute -inset-[12%] rounded-full"
              style={{ background: 'radial-gradient(closest-side, hsl(var(--bmc-gold-light) / 0.28), transparent 72%)' }}
            />
            <img
              src="/assets/womens-circle.webp"
              alt="Illustration of a teacher reading with a circle of women students on a green mat, with books and a laptop"
              width={1100}
              height={796}
              loading="lazy"
              decoding="async"
              className="relative w-full h-auto drop-shadow-[0_30px_40px_hsl(158_50%_5%/0.45)]"
            />
          </div>
          <div className="bmc-reveal text-center lg:text-left">
            <div className="mb-8 flex justify-center lg:justify-start"><SectionMark light /></div>
            <h2 className="text-primary-foreground leading-[1.08] tracking-[-0.018em] mb-6 max-w-2xl mx-auto lg:mx-0" style={{ fontSize: 'clamp(2.25rem, 4.8vw, 3.8rem)' }}>
              A Safe Space for Growth
            </h2>
            <p className="text-[1.15rem] text-primary-foreground/85 max-w-xl mx-auto lg:mx-0 mb-12 leading-[1.7]">
              Whether you are taking your very first steps or returning to your roots, there is a place for you here.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link href="/programmes" className="bmc-btn bmc-btn-light">
                Start Your Journey
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-outline">
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
        <MasjidSkyline
          className="absolute inset-x-0 bottom-0 mx-auto h-28 w-full max-w-[90rem] sm:h-36 lg:h-44 pointer-events-none"
          color="hsl(158 46% 10.5%)"
          crescent="hsl(40 58% 62%)"
        />
      </section>
    </>
  );
}

function TagList({ tags, className = '' }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Programme tags">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-[hsl(var(--bmc-gold)/0.6)] px-2.5 py-0.5 font-utility text-[0.7rem] font-semibold tracking-[0.05em] text-bmc-gold-ink">
          {t}
        </li>
      ))}
    </ul>
  );
}
