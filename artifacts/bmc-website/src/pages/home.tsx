import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { PROGRAMMES as ALL_PROGRAMMES } from '@/data/programmes';
import { Seo } from '@/components/seo';
import { homeJsonLd } from '@/lib/structured-data';
import { GirihPattern, HeroGraphic, Rosette } from '@/components/ornaments';
import { BookStackIcon, HeroLetters, MasjidIcon, MasjidSkyline, SlateIcon } from '@/components/ornaments/madrasah';
import { ChooseArt, FirstClassArt, LaptopBookIcon, RegisterArt } from '@/components/ornaments/steps-art';

// Real student words, supplied by the client (see pages/testimonials.tsx). Verbatim only: consecutive
// sentences may be quoted on their own, but never reordered, joined or reworded.
const HERO_QUOTE = {
  name: 'Aaliyah Arendse',
  quote: "Even though I'm a very shy and nervous person, she makes you feel comfortable in every class.",
};
const TESTIMONIALS_PREVIEW = [
  {
    name: 'Saarah Hercules',
    quote:
      "Mualimah Rukeya is patient and supportive, and caters to all ladies, young and old. Being a revert, I've felt comfortable and very supported from the start, alhamdulillah.",
  },
  {
    name: 'Zaytoon Jordaan',
    quote:
      "You make learning about Islam easy, and there's an atmosphere that makes me feel safe to ask for help if I am stuck or lost.",
  },
  {
    name: 'Naadhirah Gilbert',
    quote:
      'Mualimah takes her time with each topic and always makes sure that everyone is on the same page before moving on or starting a new topic. The class is perfect for beginners, reverts or even just a refresher course to bring you closer to the Almighty.',
  },
];

// Programmes grouped by who they are for, so a visitor recognises herself (or her child) at a glance.
// Content comes from content/settings/programmes.json.
const byPath = (path: string) => ALL_PROGRAMMES.find((p) => p.path === path)!;
const FOR_YOU = ['/womens-classes', '/quran-classes', '/hifdh-classes', '/workshops', '/in-person-workshops'].map(byPath);
const FOR_CHILD = byPath('/childrens-classes');

const WHATSAPP = 'https://wa.me/27686498593';

const STEPS = [
  {
    title: 'Choose a programme',
    desc: 'Pick the class that suits you: for women, for children, Qur\'an, Hifdh or workshops, online or in person.',
    cta: 'View programmes',
    href: '/programmes',
    Art: ChooseArt,
  },
  {
    title: 'Fill in the form',
    desc: 'Each class page has a short registration form. We will be in touch once it comes through.',
    cta: 'Questions first? Ask on WhatsApp',
    href: WHATSAPP,
    external: true,
    Art: RegisterArt,
  },
  {
    title: 'Join your first class',
    desc: 'Begin in a warm, nurturing space where every question is welcome.',
    Art: FirstClassArt,
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

// The four worries beginners bring, answered in one line each. Every answer is backed by the
// programme data or a student's own words.
const WORRIES = [
  { Icon: SlateIcon, worry: "I don't know where to start.", answer: 'You do not need to. We start from absolute zero.' },
  { Icon: MasjidIcon, worry: "I'm shy to ask questions.", answer: 'Every question is welcome, and Mualimah takes her time with each topic.' },
  { Icon: LaptopBookIcon, worry: "I don't have much time.", answer: 'Learn online from home, live or at your own pace.' },
  { Icon: BookStackIcon, worry: 'Can I afford it?', answer: 'Monthly classes from R150. Workshops from R100.' },
];

// Shared type sizes for the calmer, lighter display scale.
const H2_STYLE = { fontSize: 'clamp(2.25rem, 4.6vw, 3.6rem)' } as const;
const H2 = 'text-primary leading-[1.08] tracking-[-0.018em]';
const SECTION = 'py-20 md:py-28';

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

      {/* Hero: lead with the promise a nervous beginner needs to hear, then one peer voice as proof. */}
      <section className="relative overflow-hidden bg-background pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Quiet warmth and a large faint khatam rosette: decoration only, behind everything, never under text. */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(40rem 34rem at 80% 46%, hsl(32 85% 88% / 0.85) 0%, transparent 70%), radial-gradient(36rem 30rem at 0% 100%, hsl(150 38% 84% / 0.7) 0%, transparent 72%), radial-gradient(30rem 20rem at 38% 0%, hsl(10 70% 92% / 0.6) 0%, transparent 70%)',
          }}
        />
        <Rosette className="absolute left-0 bottom-0 h-[34rem] w-[48rem]" origin="0% 100%" opacity={0.2} />
        <Rosette className="absolute right-0 top-0 hidden h-[30rem] w-[44rem] sm:block" origin="100% 0%" opacity={0.14} />
        {/* Masjid skyline along the foot of the hero: a community learning space, at a glance */}
        <MasjidSkyline
          className="hg-fade absolute inset-x-0 bottom-0 mx-auto h-24 w-full max-w-[90rem] sm:h-32 lg:h-40 pointer-events-none"
          color="hsl(152 26% 84%)"
          crescent="hsl(40 70% 58%)"
        />

        <HeroLetters />

        <div className="pointer-events-none relative container mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          <div className="pointer-events-auto">
            <p className="bmc-rise bmc-eyebrow mb-6 leading-[1.9]">
              Islamic classes &middot; Online and in Cape Town
            </p>
            <h1
              className="bmc-rise text-primary leading-[1.02] tracking-[-0.025em] mb-7"
              style={{ fontSize: 'clamp(2.7rem, 6.4vw, 5rem)' }}
            >
              It&rsquo;s never too late to <span className="italic font-normal text-bmc-gold-ink">begin.</span>
            </h1>
            <p
              className="bmc-rise bmc-rise-2 text-foreground/80 leading-[1.7] mb-10"
              style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', maxWidth: '38ch' }}
            >
              Patient, beginner-friendly Islamic classes for women and children. No prior knowledge needed. From R150 a month.
            </p>
            <div className="bmc-rise bmc-rise-3 flex flex-wrap gap-x-8 gap-y-3 items-center">
              <Link href="/programmes" className="bmc-btn bmc-btn-primary">
                Find your class <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="bmc-link">
                <SiWhatsapp className="size-[1rem]" aria-hidden="true" />
                Questions? Ask on WhatsApp
              </a>
            </div>

            <figure className="bmc-rise bmc-rise-3 mt-12 flex max-w-[30rem] items-start gap-4">
              <Initial name={HERO_QUOTE.name} />
              <div>
                <blockquote className="font-display italic text-primary leading-[1.4] text-[1.12rem]">
                  &ldquo;{HERO_QUOTE.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-2 font-utility text-[0.85rem] font-semibold tracking-[0.03em] text-foreground/70">
                  {HERO_QUOTE.name}, student
                </figcaption>
              </div>
            </figure>
          </div>

          {/* Mascot inside a code-drawn mihrab arch (HeroGraphic). Mascot-2 is the brand's mascot (founder, 2026-10-26). */}
          <div className="pointer-events-auto flex justify-center lg:justify-end">
            <HeroGraphic className="max-w-[17rem] sm:max-w-[22rem] lg:max-w-[27rem]" />
          </div>
        </div>
      </section>

      {/* The worries beginners bring, said in their own words and answered in one line each. */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <GirihPattern />
        <div className="relative container mx-auto px-5 md:px-10 py-16 md:py-24">
          <h2
            className="text-center text-primary-foreground leading-[1.1] tracking-[-0.015em] mb-12 md:mb-16"
            style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
          >
            Every beginner asks these
          </h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8 lg:gap-y-0">
            {WORRIES.map(({ Icon, worry, answer }) => (
              <li key={worry} className="bmc-reveal flex flex-col items-center text-center lg:px-4">
                <div className="bmc-gold-frame relative size-12 sm:size-16 rounded-full flex items-center justify-center mb-5 text-bmc-gold-light" aria-hidden="true">
                  <Icon size={34} strokeWidth={1.25} />
                </div>
                <p className="font-display italic text-[1.12rem] sm:text-[1.35rem] leading-snug text-bmc-gold-light mb-3">
                  &ldquo;{worry}&rdquo;
                </p>
                <p className="text-primary-foreground/85 leading-[1.65] text-[0.9rem] sm:text-[0.98rem] max-w-[17rem]">{answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programmes, grouped by who they are for */}
      <section className={`${SECTION} bg-bmc-paper`}>
        <div className="container mx-auto px-5 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-12 md:mb-16">
            <h2 className={H2} style={H2_STYLE}>
              Find your class
            </h2>
            <Link href="/programmes" className="bmc-link">
              Compare all programmes <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start">
            <div className="bmc-reveal">
              <h3 className="text-[1.5rem] leading-tight text-primary">For you</h3>
              <p className="mt-1.5 mb-5 text-foreground/75 text-[0.98rem]">Classes and workshops for women, online or in Cape Town.</p>
              <ul className="flex flex-col overflow-hidden rounded-[1.25rem] bg-card shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.3)] gap-1 p-2">
                {FOR_YOU.map((p) => (
                  <li key={p.path}>
                    <Link
                      href={`/programmes${p.path}`}
                      className="group flex items-center gap-4 rounded-[0.9rem] p-3 sm:p-4 transition-colors duration-300 hover:bg-bmc-paper"
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
                        <h4 className="font-display text-[1.12rem] leading-snug text-primary">{p.title}</h4>
                        <p className="mt-1 text-[0.9rem] text-foreground/70">{p.tag}</p>
                        <p className="mt-1 font-utility text-sm font-semibold text-bmc-gold-ink sm:hidden">{p.price}</p>
                      </div>
                      <span className="hidden sm:inline shrink-0 text-right font-utility text-sm font-semibold text-bmc-gold-ink">{p.price}</span>
                      <ArrowRight size={18} className="shrink-0 text-primary transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bmc-reveal">
              <h3 className="text-[1.5rem] leading-tight text-primary">For your child</h3>
              <p className="mt-1.5 mb-5 text-foreground/75 text-[0.98rem]">Live online madrasah for ages 6 to 13.</p>
              <Link
                href={`/programmes${FOR_CHILD.path}`}
                className="group flex flex-col rounded-[1.25rem] bg-card p-3 sm:p-4 shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.3)] bmc-lift transition-shadow duration-500 hover:shadow-lift"
              >
                <div className={`relative aspect-[4/3] overflow-hidden rounded-[0.9rem] bg-gradient-to-br ${FOR_CHILD.gradient}`}>
                  {FOR_CHILD.image && (
                    <img
                      src={FOR_CHILD.image}
                      alt=""
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: FOR_CHILD.imagePosition ?? 'center' }}
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                    />
                  )}
                </div>
                <div className="px-2 sm:px-3 pt-6 pb-3 flex flex-col">
                  <h4 className="font-display text-primary leading-[1.15] text-[1.6rem]">{FOR_CHILD.title}</h4>
                  <p className="mt-3 text-foreground/80 leading-[1.7] text-[1rem]">{FOR_CHILD.descShort}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-display text-xl font-medium text-primary">{FOR_CHILD.price}</span>
                    <span className="bmc-link !min-h-0 group-hover:text-bmc-gold-ink">
                      Learn more
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How to start */}
      <section className={`${SECTION} bg-background`}>
        <div className="container mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-12 md:mb-16">
            <h2 className={`${H2} mb-5`} style={H2_STYLE}>
              How to start
            </h2>
            <p className="text-foreground/80 leading-[1.7] text-[1.1rem]">Registering takes a few minutes, with a short form on each class page.</p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-14">
            {STEPS.map((step, i) => (
              <li key={step.title} className="bmc-reveal relative flex flex-col">
                <div
                  className="mb-7 flex aspect-[16/9] items-center justify-center rounded-2xl shadow-soft"
                  style={{ background: 'radial-gradient(70% 70% at 50% 45%, hsl(42 70% 97%), hsl(40 36% 90%))' }}
                >
                  <step.Art className="h-[78%] w-auto" />
                </div>
                <p className="mb-3" aria-hidden="true">
                  <span className="font-display italic text-bmc-gold-ink text-[1.4rem] leading-none">0{i + 1}</span>
                </p>
                <h3 className="text-[1.55rem] leading-tight text-primary mb-3">
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

      {/* Testimonials: one featured voice on deep green, two more beside it. Quotes verbatim. */}
      <section className={`relative overflow-hidden ${SECTION}`} style={{ backgroundColor: 'hsl(40 26% 91%)' }}>
        <div className="container mx-auto px-5 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-12 md:mb-16">
            <h2 className={H2} style={H2_STYLE}>
              What our students say
            </h2>
            <Link href="/testimonials" className="bmc-link">
              Read all stories <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 md:gap-8 items-stretch">
            <figure className="bmc-reveal relative overflow-hidden rounded-[1.75rem] bg-primary text-primary-foreground p-9 md:p-14 shadow-lift flex flex-col justify-between min-h-[22rem]">
              <GirihPattern />
              <div className="relative">
                <span
                  className="block font-display leading-none select-none text-bmc-gold-light"
                  style={{ fontSize: 'clamp(5rem, 9vw, 7rem)', height: 'clamp(3.2rem, 5.8vw, 4.4rem)' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote
                  className="mt-4 font-display italic font-normal leading-[1.32] tracking-[-0.01em]"
                  style={{ fontSize: 'clamp(1.45rem, 2.4vw, 1.95rem)' }}
                >
                  {lead.quote}
                </blockquote>
              </div>
              <figcaption className="relative mt-10 flex items-center gap-4">
                <Initial name={lead.name} dark />
                <span className="font-utility font-semibold tracking-[0.04em] text-primary-foreground/90">{lead.name}</span>
              </figcaption>
            </figure>

            <div className="grid grid-cols-1 gap-6 md:gap-8">
              {others.map((t) => (
                <figure
                  key={t.name}
                  className="bmc-reveal flex flex-col justify-between rounded-[1.5rem] bg-bmc-paper p-8 md:p-10 shadow-soft"
                >
                  <blockquote className="text-foreground/90 leading-[1.75] text-[1.06rem]">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-7 flex items-center gap-3.5">
                    <Initial name={t.name} />
                    <span className="font-utility font-semibold tracking-[0.03em] text-primary">{t.name}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet your teacher */}
      <section className={`${SECTION} bg-background`}>
        <div className="container mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-24 items-center">
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
            <h2 className={`${H2} mb-8`} style={H2_STYLE}>
              Meet your teacher
            </h2>
            <p className="text-foreground/85 leading-[1.75] mb-6 text-[1.15rem]" style={{ maxWidth: '56ch' }}>
              Mualimah Rukeya has been teaching Islamic sciences since 2024, guiding women and children toward a deeper connection with their faith in a safe, nurturing environment.
            </p>
            <p className="text-foreground/80 leading-[1.75] mb-6 text-[1.05rem]" style={{ maxWidth: '56ch' }}>
              Alhamdulillah, what started as a small class has grown into a thriving learning community, offering six programmes to hundreds of students across South Africa and beyond.
            </p>
            <p className="text-foreground/80 leading-[1.75] mb-9 text-[1.05rem]" style={{ maxWidth: '56ch' }}>
              She founded Beginners Madrasah Classes to make authentic Islamic education accessible to all, wherever you are.
            </p>
            <Link href="/about" className="bmc-link">
              Read our story <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Moments */}
      <section className={`${SECTION} bg-bmc-paper`}>
        <div className="container mx-auto px-5 md:px-10">
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

      {/* Closing invitation: her women's class illustration, and the masjid skyline leading into the footer */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <GirihPattern />
        <div className="relative container mx-auto px-5 md:px-10 pt-20 pb-36 md:pt-28 md:pb-48 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div className="bmc-reveal relative mx-auto w-full max-w-[20rem] sm:max-w-[28rem] lg:max-w-[34rem]">
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
            <h2 className="text-primary-foreground leading-[1.08] tracking-[-0.018em] mb-6 max-w-2xl mx-auto lg:mx-0" style={{ fontSize: 'clamp(2.25rem, 4.8vw, 3.8rem)' }}>
              There is a place for you here
            </h2>
            <p className="text-[1.15rem] text-primary-foreground/85 max-w-xl mx-auto lg:mx-0 mb-11 leading-[1.7]">
              Whether you are taking your very first steps or returning to your roots, choose your class and register in a few minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link href="/programmes" className="bmc-btn bmc-btn-light">
                Find your class
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-outline">
                <SiWhatsapp className="size-[1.1rem]" aria-hidden="true" />
                Ask on WhatsApp
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

/** Initial of a student's first name in a small round badge (decorative; the name is shown beside it). */
function Initial({ name, dark = false }: { name: string; dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full font-display text-lg ${
        dark ? 'bg-bmc-gold-light text-primary' : 'bg-primary text-bmc-gold-light'
      }`}
    >
      {name.trim().charAt(0)}
    </span>
  );
}
