import { Link } from 'wouter';
import { ArrowRight, BookOpen, ShieldCheck, Wallet, Wifi } from 'lucide-react';
import { PROGRAMMES as ALL_PROGRAMMES } from '@/data/programmes';
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
          className="absolute top-20 right-1 sm:right-8 lg:right-auto lg:left-1/2 pointer-events-none select-none lg:-translate-x-1/2"
          style={{ width: 'clamp(56px, 16vw, 240px)', opacity: 0.65 }}
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

          {/* Mascot sits freely in the hero, with a gentle float (stopped under reduced motion) */}
          <div className="flex justify-center">
            <img
              src="/assets/mascot-2.webp"
              alt="Illustration of Mualimah and two students reading the Qur'an, with the Beginners Madrasah Classes banner"
              width={800}
              height={640}
              fetchPriority="high"
              decoding="async"
              draggable={false}
              className="bmc-float w-full max-w-[17rem] sm:max-w-sm lg:max-w-[30rem] h-auto"
            />
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

      {/* Story and founder */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
          <figure className="bmc-reveal max-w-sm mx-auto lg:mx-0 w-full">
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

      {/* Programmes */}
      <section className="py-20 md:py-28 bg-bmc-paper border-y border-border">
        <div className="container mx-auto px-5 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 md:mb-16">
            <h2 className="text-primary leading-tight tracking-[-0.01em]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Our programmes
            </h2>
            <Link
              href="/programmes"
              className="inline-flex items-center gap-2 font-utility font-semibold text-primary underline decoration-accent decoration-2 underline-offset-[6px] hover:text-secondary transition-colors"
            >
              See all programmes <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {PROGRAMMES.map(({ title, path, descShort, price, tag, image, imagePosition, gradient }) => (
              <li key={path} className="bmc-reveal">
                <Link href={`/programmes${path}`} className="group flex flex-col h-full rounded-2xl">
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br ${gradient}`}>
                    {image && (
                      <img
                        src={image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        style={{ objectPosition: imagePosition ?? 'top' }}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                    )}
                  </div>
                  <p className="mt-5 font-utility text-sm font-medium text-bmc-gold-ink">{tag}</p>
                  <h3 className="mt-1 text-xl text-primary leading-snug">{title}</h3>
                  <p className="mt-3 text-foreground/75 leading-relaxed text-[0.95rem] flex-1">{descShort}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-utility font-semibold text-primary">{price}</span>
                    <span className="inline-flex items-center gap-1.5 font-utility text-sm font-semibold text-primary group-hover:text-secondary">
                      Learn more
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-5 md:px-10">
          <h2 className="text-primary leading-tight tracking-[-0.01em] mb-12 md:mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            What Our Students Say
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-20">
            <figure className="bmc-reveal">
              <blockquote
                className="font-display italic font-normal text-primary leading-[1.25] tracking-[-0.01em]"
                style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)' }}
              >
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 font-utility font-semibold text-foreground/80">{lead.name}</figcaption>
            </figure>

            <div className="flex flex-col gap-10 lg:border-l lg:border-border lg:pl-14">
              {others.map((t) => (
                <figure key={t.name} className="bmc-reveal">
                  <blockquote className="text-foreground/85 leading-relaxed text-[1.02rem]">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-3 font-utility text-sm font-semibold text-foreground/80">{t.name}</figcaption>
                </figure>
              ))}
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 font-utility font-semibold text-primary underline decoration-accent decoration-2 underline-offset-[6px] hover:text-secondary transition-colors self-start"
              >
                Read All Stories <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
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
            <Link
              href="/programmes"
              className="inline-flex items-center rounded-full bg-bmc-paper text-primary font-utility font-semibold px-8 py-3.5 transition-all hover:bg-accent active:translate-y-px"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
