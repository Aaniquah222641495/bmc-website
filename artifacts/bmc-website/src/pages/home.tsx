import { Link } from 'wouter';
import { ArrowRight, BookOpen, MessageCircle, ShieldCheck, Wallet, Wifi } from 'lucide-react';
import { PROGRAMMES as ALL_PROGRAMMES, programmeTags } from '@/data/programmes';
import { Seo } from '@/components/seo';
import { homeJsonLd } from '@/lib/structured-data';

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
  { Icon: BookOpen, title: 'Beginner Friendly', desc: 'No prior knowledge needed. We start from absolute zero.' },
  { Icon: ShieldCheck, title: 'Safe Environment', desc: 'A warm, nurturing space where every question is welcome.' },
  { Icon: Wifi, title: 'Learn from Anywhere', desc: 'Online classes accessible from home, anywhere in the world.' },
  { Icon: Wallet, title: 'Affordable Learning', desc: 'Quality Islamic education from just R150 per month.' },
];

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
      <section className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Decorative ornaments from the original design: star texture, lace corners, hanging lanterns. All aria-hidden, no pointer events. */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 L43.5 22 L57 18 L48 29 L62 33 L48 37 L57 48 L43.5 44 L40 58 L36.5 44 L23 48 L32 37 L18 33 L32 29 L23 18 L36.5 22 Z' fill='none' stroke='%23C9A84C' stroke-width='0.6'/%3E%3C/svg%3E")`,
            opacity: 0.06,
          }}
        />
        <img
          src="/assets/deco-corner.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute top-20 left-0 pointer-events-none select-none"
          style={{ width: 'clamp(90px, 18vw, 280px)', opacity: 0.5 }}
        />
        <img
          src="/assets/deco-corner.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute bottom-0 right-0 pointer-events-none select-none"
          style={{ width: 'clamp(90px, 18vw, 280px)', opacity: 0.5, transform: 'rotate(180deg)' }}
        />
        <img
          src="/assets/deco-lanterns.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute top-20 right-1 sm:right-8 lg:right-auto lg:left-[46.5%] pointer-events-none select-none"
          style={{ width: 'clamp(56px, 11vw, 150px)', opacity: 0.65 }}
        />
        <div className="relative container mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <h1
              className="bmc-rise text-primary leading-[1.04] tracking-[-0.02em] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6.2vw, 4.6rem)' }}
            >
              Beginners Madrasah <span className="italic font-medium text-bmc-gold-ink">Classes</span>
            </h1>
            <p
              className="bmc-rise bmc-rise-2 text-foreground/80 leading-relaxed mb-9"
              style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', maxWidth: '36ch' }}
            >
              A warm, safe, beginner-friendly Islamic learning space for women and children, online and in-person.
            </p>
            <div className="bmc-rise bmc-rise-3 flex flex-wrap gap-3 items-center">
              <a
                href="https://wa.me/27686498593"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-primary text-primary-foreground font-utility font-semibold px-7 py-3.5 text-[0.95rem] shadow-[0_8px_20px_-8px_hsl(155_42%_18%/0.55)] transition-all hover:bg-secondary active:translate-y-px"
              >
                Register Now
              </a>
              <Link
                href="/programmes"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-utility font-semibold text-[0.95rem] text-primary underline decoration-accent decoration-2 underline-offset-[6px] hover:text-secondary transition-colors"
              >
                View Programmes <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="bmc-rise bmc-rise-3 mt-10 font-utility text-sm text-foreground/70">
              Est. 2024 &middot; Six programmes &middot; Online and in Cape Town
            </p>
          </div>

          {/* Mascot in an arch window, the brand's own shape (founder kept this, 2026-10-26) */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[19rem] sm:max-w-sm lg:max-w-[28rem]">
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[2rem] border border-accent/60"
                aria-hidden="true"
              />
              <div className="relative rounded-t-[999px] rounded-b-[2rem] bg-bmc-paper px-6 pt-14 pb-8 sm:px-10 sm:pt-20 shadow-[0_30px_60px_-30px_hsl(155_42%_18%/0.35)]">
                <img
                  src="/assets/mascot-2.webp"
                  alt="Illustration of Mualimah and two students reading the Qur'an, with the Beginners Madrasah Classes banner"
                  width={800}
                  height={640}
                  fetchPriority="high"
                  decoding="async"
                  draggable={false}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you can expect */}
      <section className="islamic-pattern relative text-primary-foreground">
        <div className="container mx-auto px-5 md:px-10 py-14 md:py-20">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {PILLARS.map(({ Icon, title, desc }) => (
              <li key={title} className="bmc-reveal flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border border-accent flex items-center justify-center mb-4 text-bmc-gold-light" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <h2 className="text-xl text-primary-foreground mb-2">{title}</h2>
                <p className="text-primary-foreground/85 leading-relaxed text-[0.95rem]">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How to start */}
      <section className="py-20 md:py-28 bg-bmc-paper border-y border-border">
        <div className="container mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-primary leading-tight tracking-[-0.01em] mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              How to start
            </h2>
            <p className="text-foreground/80 leading-relaxed text-[1.05rem]">
              No prior knowledge needed. We start from absolute zero.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {STEPS.map((step, i) => (
              <li key={step.title} className="bmc-reveal relative flex flex-col">
                <img
                  src={step.img}
                  alt={step.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="mb-6 aspect-[16/10] md:aspect-[4/3] w-full rounded-xl object-cover shadow-[0_24px_48px_-32px_hsl(155_42%_18%/0.4)]"
                />
                <span className="font-display italic text-bmc-gold-ink leading-none mb-4" style={{ fontSize: '3.5rem' }} aria-hidden="true">
                  {i + 1}
                </span>
                <div className="border-t-2 border-accent pt-5 flex-1 flex flex-col">
                  <h3 className="text-xl text-primary mb-2">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-[0.98rem] mb-4">{step.desc}</p>
                  {step.href &&
                    (step.external ? (
                      <a
                        href={step.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex min-h-11 items-center gap-2 self-start font-utility font-semibold text-primary underline decoration-accent decoration-2 underline-offset-[6px] hover:text-secondary transition-colors"
                      >
                        {step.cta} <ArrowRight size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <Link
                        href={step.href}
                        className="mt-auto inline-flex min-h-11 items-center gap-2 self-start font-utility font-semibold text-primary underline decoration-accent decoration-2 underline-offset-[6px] hover:text-secondary transition-colors"
                      >
                        {step.cta} <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Story and founder */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
          <figure className="bmc-reveal relative max-w-sm mx-auto lg:mx-0 w-full">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-[0_30px_60px_-34px_hsl(155_42%_18%/0.4)]">
              <img
                src="/assets/photo-founder-teaching.webp"
                alt="Mualimah Rukeya teaching a workshop"
                width={1000}
                height={1333}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center lg:text-left">
              <span className="block font-display text-lg text-primary">Mualimah Rukeya</span>
              <span className="block font-utility text-sm text-foreground/70">Founder &amp; Teacher</span>
            </figcaption>
          </figure>

          <div className="bmc-reveal">
            <h2 className="text-primary leading-tight tracking-[-0.01em] mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Born from a passion for teaching
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-5 text-[1.05rem]" style={{ maxWidth: '58ch' }}>
              Alhamdulillah, what started as a small class has grown into a thriving learning community, offering six programmes to hundreds of students across South Africa and beyond.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-5 text-[1.05rem]" style={{ maxWidth: '58ch' }}>
              Mualimah Rukeya has been teaching Islamic sciences since 2024, guiding women and children toward a deeper connection with their faith in a safe, nurturing environment.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-8 text-[1.05rem]" style={{ maxWidth: '58ch' }}>
              She founded Beginners Madrasah Classes to make authentic Islamic education accessible to all, wherever you are.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-utility font-semibold text-primary underline decoration-accent decoration-2 underline-offset-[6px] hover:text-secondary transition-colors"
            >
              Read Our Story <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Programmes: one featured, the rest compact */}
      <section className="py-20 md:py-28 bg-bmc-paper border-y border-border">
        <div className="container mx-auto px-5 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
            <h2 className="text-primary leading-tight tracking-[-0.01em]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Our programmes
            </h2>
            <Link
              href="/programmes"
              className="inline-flex min-h-11 items-center gap-2 font-utility font-semibold text-primary underline decoration-accent decoration-2 underline-offset-[6px] hover:text-secondary transition-colors"
            >
              See all programmes <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10">
            <Link
              href={`/programmes${FEATURED.path}`}
              className="bmc-reveal group flex flex-col rounded-2xl bg-card p-3 sm:p-4 shadow-[0_24px_48px_-30px_hsl(155_42%_18%/0.4)] ring-1 ring-border"
            >
              <div className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${FEATURED.gradient}`}>
                {FEATURED.image && (
                  <img
                    src={FEATURED.image}
                    alt=""
                    width={1500}
                    height={1449}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: FEATURED.imagePosition ?? 'top' }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                )}
              </div>
              <div className="px-2 sm:px-3 pt-6 pb-3 flex flex-col flex-1">
                <p className="font-utility text-sm font-medium text-bmc-gold-ink">{FEATURED.tag}</p>
                <h3 className="mt-1 text-primary leading-tight" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)' }}>
                  {FEATURED.title}
                </h3>
                <TagList tags={programmeTags(FEATURED)} className="mt-4" />
                <p className="mt-4 text-foreground/80 leading-relaxed text-[1.02rem] flex-1">{FEATURED.descShort}</p>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-utility text-lg font-semibold text-primary">{FEATURED.price}</span>
                  <span className="inline-flex items-center gap-1.5 font-utility text-sm font-semibold text-primary group-hover:text-secondary">
                    Learn more
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>

            <ul className="flex flex-col gap-4">
              {REST.map((p) => (
                <li key={p.path} className="bmc-reveal flex-1">
                  <Link
                    href={`/programmes${p.path}`}
                    className="group flex h-full items-center gap-4 rounded-2xl bg-card p-3 ring-1 ring-border transition-shadow hover:shadow-[0_16px_32px_-22px_hsl(155_42%_18%/0.5)]"
                  >
                    <div className={`relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br ${p.gradient}`}>
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
                      <h3 className="text-[1.05rem] leading-snug text-primary">{p.title}</h3>
                      <TagList tags={programmeTags(p)} className="mt-2" />
                      <p className="mt-2 font-utility text-sm font-semibold text-primary">{p.price}</p>
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
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-5 md:px-10">
          <h2 className="text-primary leading-tight tracking-[-0.01em] mb-10 md:mb-14" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Moments from our classes
          </h2>
          <ul
            className="-mx-5 px-5 md:mx-0 md:px-0 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 md:overflow-visible md:grid md:grid-cols-4 md:auto-rows-[15rem] lg:auto-rows-[17rem] md:gap-5"
            aria-label="Photos from our classes and workshops"
          >
            {MOMENTS.map((m) => (
              <li
                key={m.src}
                className={`bmc-reveal snap-center shrink-0 basis-[72%] sm:basis-[46%] md:basis-auto overflow-hidden rounded-2xl bg-muted shadow-[0_20px_40px_-28px_hsl(155_42%_18%/0.5)] aspect-[4/5] md:aspect-auto ${m.cls}`}
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
      <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: 'hsl(150 20% 89%)' }}>
        <div className="container mx-auto px-5 md:px-10">
          <h2 className="text-center text-primary leading-tight tracking-[-0.01em]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            What Our Students Say
          </h2>

          <figure className="bmc-reveal mx-auto mt-6 max-w-4xl text-center">
            <span
              className="block font-display text-bmc-gold-ink leading-none select-none"
              style={{ fontSize: 'clamp(6rem, 12vw, 9rem)', height: 'clamp(4rem, 8vw, 6rem)' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote
              className="font-display italic font-normal text-primary leading-[1.25] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(1.6rem, 3.6vw, 2.8rem)' }}
            >
              {lead.quote}
            </blockquote>
            <figcaption className="mt-7 font-utility font-semibold text-foreground/85">{lead.name}</figcaption>
          </figure>

          <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {others.map((t) => (
              <figure key={t.name} className="bmc-reveal rounded-2xl bg-bmc-paper p-7 md:p-9 border border-accent/50 shadow-[0_20px_40px_-30px_hsl(155_42%_18%/0.45)]">
                <blockquote className="text-foreground/90 leading-relaxed text-[1.05rem]">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 font-utility text-sm font-semibold text-foreground/85">{t.name}</figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/testimonials"
              className="inline-flex min-h-11 items-center gap-2 font-utility font-semibold text-primary underline decoration-accent decoration-2 underline-offset-[6px] hover:text-secondary transition-colors"
            >
              Read All Stories <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing invitation */}
      <section className="bg-background">
        <div className="bmc-reveal islamic-pattern relative overflow-hidden px-6 py-16 md:py-24 text-center text-primary-foreground">
          <div className="absolute inset-0 bg-primary/55" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-primary-foreground leading-tight tracking-[-0.01em] mb-5 max-w-2xl mx-auto" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.2rem)' }}>
              A Safe Space for Growth
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-xl mx-auto mb-9 leading-relaxed">
              Whether you are taking your very first steps or returning to your roots, there is a place for you here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/programmes"
                className="inline-flex min-h-11 items-center rounded-full bg-bmc-paper text-primary font-utility font-semibold px-8 py-3.5 transition-all hover:bg-accent active:translate-y-px focus-visible:outline-bmc-gold-light"
              >
                Start Your Journey
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-bmc-gold-light text-primary-foreground font-utility font-semibold px-7 py-3 transition-colors hover:bg-bmc-gold-light hover:text-primary active:translate-y-px focus-visible:outline-bmc-gold-light"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TagList({ tags, className = '' }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Programme tags">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-accent/70 bg-bmc-paper px-2.5 py-0.5 font-utility text-xs font-medium text-bmc-gold-ink">
          {t}
        </li>
      ))}
    </ul>
  );
}
