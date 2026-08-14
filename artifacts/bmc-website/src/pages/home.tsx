import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Wifi, ShieldCheck, BadgeDollarSign, BookOpen } from 'lucide-react';
import { PROGRAMMES as ALL_PROGRAMMES } from '@/data/programmes';

// Curated order for the homepage teaser (alternates online/in-person for variety).
const FEATURED_PATHS = [
  '/womens-classes',
  '/in-person-workshops',
  '/quran-classes',
  '/hifdh-classes',
  '/childrens-classes',
  '/workshops',
];
const PROGRAMMES = FEATURED_PATHS.map(
  (path) => ALL_PROGRAMMES.find((p) => p.path === path)!,
);

const PILLARS = [
  { Icon: Wifi,            title: 'Learn from Anywhere',  desc: 'Online classes accessible from home, anywhere in the world.' },
  { Icon: BookOpen,        title: 'Beginner Friendly',     desc: 'No prior knowledge needed. We start from absolute zero.' },
  { Icon: ShieldCheck,     title: 'Safe Environment',      desc: 'A warm, nurturing space where every question is welcome.' },
  { Icon: BadgeDollarSign, title: 'Affordable Learning',   desc: 'Quality Islamic education from just R150 per month.' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-background pt-20 overflow-hidden">

        {/* Faint tiling gold star texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 L43.5 22 L57 18 L48 29 L62 33 L48 37 L57 48 L43.5 44 L40 58 L36.5 44 L23 48 L32 37 L18 33 L32 29 L23 18 L36.5 22 Z' fill='none' stroke='%23C9A84C' stroke-width='0.6'/%3E%3C/svg%3E")`,
            opacity: 0.05,
          }}
        />

        {/* Corner lace arch — top-left (hidden on mobile/tablet, where it crowds the heading) */}
        <img
          src="/assets/deco-corner.webp"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 pointer-events-none select-none hidden lg:block"
          style={{ width: 'clamp(160px, 18vw, 280px)', opacity: 0.55 }}
        />
        {/* Corner lace arch — bottom-right (rotated 180°, hidden on mobile/tablet) */}
        <img
          src="/assets/deco-corner.webp"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 pointer-events-none select-none hidden lg:block"
          style={{ width: 'clamp(160px, 18vw, 280px)', opacity: 0.55, transform: 'rotate(180deg)' }}
        />
        {/* Hanging lanterns — top-centre (hidden on mobile/tablet, where there isn't room above the heading) */}
        <img
          src="/assets/deco-lanterns.webp"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-1/2 pointer-events-none select-none hidden lg:block"
          style={{ width: 'clamp(140px, 16vw, 240px)', opacity: 0.6, transform: 'translateX(-50%)' }}
        />

        <div className="container mx-auto px-4 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── Left: Text ─────────────────────────────────────── */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full">
              {/* Small illustration, top-right of the heading — mobile/tablet only; lg+ uses the full-size illustration column */}
              <img
                src="/assets/bmc-logo-final.webp"
                alt="Beginners Madrasah Classes illustrated mascot"
                className="absolute top-0 right-0 w-16 sm:w-20 lg:hidden"
                draggable={false}
              />
              <h1 className="font-display text-primary leading-[1.1] mb-3 pr-20 sm:pr-24 lg:pr-0" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
                Beginners<br />
                Madrasah<br />
                <span className="text-accent italic">Classes</span>
              </h1>
            </div>

            {/* EST badge — sits directly under the title */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-px bg-accent" />
              <span className="font-utility uppercase tracking-[0.2em] text-accent/70" style={{ fontSize: '0.62rem' }}>
                Est 2024 · Foundations of Islamic Knowledge
              </span>
            </div>

            {/* Gold diamond rule — anchored left */}
            <div className="flex items-center gap-3 mb-6 w-48">
              <div className="h-px flex-1 bg-gradient-to-r from-accent to-transparent" />
              <div className="w-2 h-2 rotate-45 shrink-0 bg-accent" />
              <div className="h-px flex-1 bg-gradient-to-l from-accent to-transparent" />
            </div>

            <p className="font-body text-foreground/65 leading-relaxed mb-10" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', maxWidth: '38ch' }}>
              A warm, safe, beginner-friendly Islamic learning space for women and children, online and in-person.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/programmes"
                className="rounded-full border-2 border-primary text-primary font-utility font-bold px-8 py-3 hover:bg-primary hover:text-white transition-all"
                style={{ fontSize: '0.88rem', letterSpacing: '0.06em' }}
              >
                View Programmes
              </Link>
              <a href="https://wa.me/27686498593" target="_blank" rel="noreferrer">
                <button
                  className="rounded-full bg-accent text-primary font-utility font-bold px-8 py-3 hover:bg-accent/90 transition-all"
                  style={{ fontSize: '0.88rem', letterSpacing: '0.06em', boxShadow: '0 6px 24px rgba(201,168,76,0.38)' }}
                >
                  Register Now
                </button>
              </a>
            </div>

            {/* Stats strip */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-border">
              {[
                { num: '200+', label: 'Students enrolled' },
                { num: '6',   label: 'Programmes' },
                { num: '2+',  label: 'Years teaching' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display text-primary text-2xl font-bold leading-none mb-1">{num}</p>
                  <p className="font-utility text-foreground/50 text-xs tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Illustration (lg+ only — mobile/tablet use the small version beside the heading) ── */}
          <motion.div
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src="/assets/bmc-logo-final.webp"
              alt="Beginners Madrasah Classes illustrated mascot"
              className="w-full max-w-[260px] sm:max-w-sm lg:max-w-md xl:max-w-lg mx-auto"
              fetchPriority="high"
              draggable={false}
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            />
          </motion.div>

        </div>
      </section>

      {/* ── Why Choose BMC ───────────────────────────────────── */}
      <section className="islamic-pattern py-20 relative text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {PILLARS.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full border border-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-primary transition-colors text-accent">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl mb-2">{title}</h3>
                <p className="font-body text-sm text-white/70 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story Teaser ─────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-10 bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Accent bar — top on mobile, left on desktop */}
            <div className="md:hidden h-1.5 w-full bg-accent shrink-0" />
            <div className="hidden md:block w-1.5 self-stretch bg-accent shrink-0" />

            <div className="flex-1 py-10 px-8 md:pl-0 md:pr-12">
              <p className="font-utility text-xs text-accent uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="font-display text-3xl md:text-4xl text-primary mb-5 leading-snug">
                Born from a passion<br className="hidden md:block" /> for teaching
              </h2>
              <p className="font-body text-foreground/70 leading-relaxed mb-6" style={{ maxWidth: '52ch' }}>
                Alhamdulillah, what started as a small class has grown into a thriving learning community, offering six programmes to hundreds of students across South Africa and beyond.
              </p>
              <Link href="/about">
                <span className="inline-flex items-center gap-2 text-accent font-utility font-bold text-sm hover:gap-3 transition-all cursor-pointer uppercase tracking-widest">
                  Read Our Story &rarr;
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-border w-full md:w-72 shrink-0 md:self-stretch">
              {[
                { num: '300+', label: 'Students' },
                { num: '6',    label: 'Programmes' },
                { num: '2024', label: 'Established' },
                { num: '2+',   label: 'Years teaching' },
              ].map(({ num, label }) => (
                <div key={label} className="bg-muted flex flex-col items-center justify-center p-6">
                  <p className="font-display text-2xl text-accent font-bold">{num}</p>
                  <p className="font-utility text-xs text-foreground/50 uppercase tracking-wide mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Programmes ──────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-primary mb-4">Featured Programmes</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMMES.map(({ title, path, descShort: desc, price, tag, image, imagePosition, gradient }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="h-full"
              >
                <Link href={`/programmes${path}`}>
                  <div className="bg-card rounded-2xl border border-border hover:border-accent hover:shadow-xl transition-all cursor-pointer h-full flex flex-col group overflow-hidden">

                    {/* Image block */}
                    <div className={`relative w-full h-48 overflow-hidden bg-gradient-to-br ${gradient} shrink-0`}>
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          loading="lazy"
                          style={{ objectPosition: imagePosition ?? 'top' }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        /* Placeholder: Islamic pattern overlay on gradient */
                        <div className="absolute inset-0 flex items-center justify-center opacity-20"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 6 L32.5 16 L42 13 L36 21 L46 25 L36 29 L42 37 L32.5 34 L30 44 L27.5 34 L18 37 L24 29 L14 25 L24 21 L18 13 L27.5 16 Z' fill='none' stroke='%23C9A84C' stroke-width='0.8'/%3E%3C/svg%3E")`,
                          }}
                        />
                      )}
                      {/* Tag pill */}
                      <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white font-utility text-[0.65rem] uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-display text-primary mb-2 leading-snug">{title}</h3>
                      <p className="text-foreground/65 font-body text-sm leading-relaxed flex-1">{desc}</p>
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                        <span className="font-utility text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{price}</span>
                        <span className="text-primary font-utility font-bold group-hover:text-accent transition-colors flex items-center gap-1 text-sm">
                          Learn More <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Strip ──────────────────────────────────────── */}
      <section className="py-24 bg-muted border-y border-border relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/5] rounded-[2rem] border-2 border-accent/30 relative overflow-hidden shadow-xl">
                <img
                  src="/assets/photo-founder-teaching.webp"
                  alt="Mualimah Rukeya teaching a workshop"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm px-6 py-4">
                  <h3 className="font-display text-lg text-white">Mualimah Rukeya</h3>
                  <p className="font-utility text-xs text-accent uppercase tracking-widest">Founder & Teacher</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-display text-primary mb-6">About Our Founder</h2>
              <p className="text-lg font-body text-foreground/80 leading-relaxed mb-6">
                Mualimah Rukeya has been teaching Islamic sciences since 2024, guiding women and children toward a deeper connection with their faith in a safe, nurturing environment.
              </p>
              <p className="text-lg font-body text-foreground/80 leading-relaxed mb-8">
                She founded Beginners Madrasah Classes to make authentic Islamic education accessible to all, wherever you are.
              </p>
              <Link href="/about" className="border-b-2 border-accent text-primary font-utility font-bold pb-1 hover:text-accent transition-colors inline-block">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <section className="islamic-pattern py-24 text-center text-white relative">
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display mb-6 max-w-2xl mx-auto leading-tight">
            A Safe Space for Growth
          </h2>
          <p className="text-xl font-body text-white/90 max-w-xl mx-auto mb-10">
            Whether you are taking your very first steps or returning to your roots, there is a place for you here.
          </p>
          <Link href="/programmes" className="bg-white text-primary font-utility font-bold px-10 py-4 rounded-full hover:bg-accent hover:text-white transition-all shadow-xl inline-block">
            Start Your Journey
          </Link>
        </div>
      </section>

    </div>
  );
}
