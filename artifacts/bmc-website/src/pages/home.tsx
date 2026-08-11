import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  Wifi, ShieldCheck, BadgeDollarSign,
  GraduationCap, Heart, BookOpen, BookMarked, Star, Lightbulb,
  type LucideIcon,
} from 'lucide-react';

const PROGRAMMES: { title: string; path: string; desc: string; Icon: LucideIcon; color: string }[] = [
  {
    title: "Women's Classes",
    path: "/womens-classes",
    desc: "Online Madrasah covering Fiqh, Aqeedah, Seerah and more. Self-paced via Google Classroom.",
    Icon: GraduationCap,
    color: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white',
  },
  {
    title: "Revert Classes",
    path: "/revert-classes",
    desc: "A gentle, welcoming introduction to Islamic practice for those new to the faith.",
    Icon: Heart,
    color: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
  },
  {
    title: "Quran Classes",
    path: "/quran-classes",
    desc: "In-person Quran reading from the Arabic alphabet to the Mushaf. Saturdays in Mitchell's Plain.",
    Icon: BookOpen,
    color: 'bg-amber-50 text-amber-700 group-hover:bg-amber-700 group-hover:text-white',
  },
  {
    title: "Hifdh Classes",
    path: "/hifdh-classes",
    desc: "Women's Quran memorisation programme. Live sessions on Microsoft Teams three times a week.",
    Icon: BookMarked,
    color: 'bg-violet-50 text-violet-700 group-hover:bg-violet-700 group-hover:text-white',
  },
  {
    title: "Children's Classes",
    path: "/childrens-classes",
    desc: "General Maktab for ages 6–13. Live classes on Teams covering Quran, Du'as, and Islamic basics.",
    Icon: Star,
    color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
  },
  {
    title: "Workshops",
    path: "/workshops",
    desc: "Once-off focused sessions on topics like Women in Islam, Salaah, Wudhu, and Ramadan.",
    Icon: Lightbulb,
    color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
  },
];

const PILLARS = [
  { Icon: Wifi,            title: 'Learn from Anywhere',  desc: 'Online classes accessible from home, anywhere in the world.' },
  { Icon: BookOpen,        title: 'Beginner Friendly',     desc: 'No prior knowledge needed — we start from absolute zero.' },
  { Icon: ShieldCheck,     title: 'Safe Environment',      desc: 'A warm, nurturing space where every question is welcome.' },
  { Icon: BadgeDollarSign, title: 'Affordable Learning',   desc: 'Quality Islamic education from just R150 per month.' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative flex flex-col items-center pt-20 pb-16 bg-background overflow-hidden">

        {/* Arch canopy — sized so it + content both fit in the viewport */}
        <motion.div
          className="w-full max-w-3xl mx-auto px-6"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <img
            src="/assets/arch-marble-header-trimmed.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto block select-none"
            draggable={false}
          />
        </motion.div>

        {/* Content tucked into the arch opening with negative margin */}
        <motion.div
          className="flex flex-col items-center text-center px-4 -mt-16 max-w-xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
        >
          {/* Logo — multiply blend merges white bg into cream background */}
          <img
            src="/assets/bmc-logo-illustrated.png"
            alt="Beginners Madrasah Classes"
            style={{ mixBlendMode: 'multiply', width: 'clamp(110px, 14vw, 180px)', height: 'auto' }}
            className="object-contain mb-4"
          />

          <h1 className="font-display text-primary leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Beginners Madrasah<br />
            <span className="text-accent italic">Classes</span>
          </h1>

          <p className="font-utility text-primary/50 uppercase tracking-widest mb-3" style={{ fontSize: 'clamp(0.55rem, 1vw, 0.7rem)' }}>
            Foundations of Islamic Knowledge — Est 2024
          </p>

          <div className="w-10 h-px bg-accent mb-5" />

          <p className="font-body text-foreground/70 leading-relaxed mb-7" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', maxWidth: '34ch' }}>
            A warm, safe, beginner-friendly Islamic learning space for women and children.
          </p>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link
              href="/programmes"
              className="rounded-full border-2 border-primary text-primary font-utility font-bold px-7 py-2.5 hover:bg-primary hover:text-white transition-all"
              style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}
            >
              View Programmes
            </Link>
            <a href="https://wa.me/27686498593" target="_blank" rel="noreferrer">
              <button
                className="rounded-full bg-accent text-primary font-utility font-bold px-7 py-2.5 hover:bg-accent/90 hover:shadow-lg transition-all"
                style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}
              >
                Register Now
              </button>
            </a>
          </div>
        </motion.div>
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

      {/* ── Featured Programmes ──────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-primary mb-4">Featured Programmes</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMMES.map(({ title, path, desc, Icon, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/programmes${path}`}>
                  <div className="bg-white rounded-2xl p-8 border border-border hover:border-accent hover:shadow-xl transition-all cursor-pointer h-full flex flex-col group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors ${color}`}>
                      <Icon size={22} strokeWidth={1.6} />
                    </div>
                    <h3 className="text-2xl font-display text-primary mb-3">{title}</h3>
                    <p className="text-foreground/70 font-body mb-6 flex-1 text-sm leading-relaxed">{desc}</p>
                    <span className="text-primary font-utility font-bold group-hover:text-accent transition-colors flex items-center gap-2 text-sm">
                      Learn More <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
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
                  src="/assets/workshop-teaching.png"
                  alt="Mualimah Rukeya teaching a workshop"
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
          <div className="text-5xl text-accent mb-6">☽</div>
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
