import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  Wifi, ShieldCheck, BadgeDollarSign,
  GraduationCap, Heart, BookOpen, BookMarked, Star, Lightbulb,
  type LucideIcon,
} from 'lucide-react';

const PROGRAMMES: { title: string; path: string; desc: string; price: string; Icon: LucideIcon; color: string }[] = [
  {
    title: "Women's Online Madrasah",
    path: "/womens-classes",
    desc: "Beginner-friendly Islamic studies for women 18+. Pre-recorded lessons on Google Classroom — learn at your own pace. Covers Aqaaid, Fiqh, Tajweed, Seerah, Akhlaaq, Hadith & Du'as.",
    price: "R150/month",
    Icon: GraduationCap,
    color: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white',
  },
  {
    title: "In-Person Workshops",
    path: "/revert-classes",
    desc: "Interactive face-to-face workshops on important Islamic topics, with open discussion and practical learning.",
    price: "From R100",
    Icon: Heart,
    color: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
  },
  {
    title: "Get Into Qur'an – In Person",
    path: "/quran-classes",
    desc: "A Qur'an programme for complete beginners. Step-by-step guidance toward confidently reading the Mushaf. Every Saturday morning in Mitchell's Plain, Cape Town.",
    price: "R200/month",
    Icon: BookOpen,
    color: 'bg-amber-50 text-amber-700 group-hover:bg-amber-700 group-hover:text-white',
  },
  {
    title: "Women's Hifdh Programme",
    path: "/hifdh-classes",
    desc: "Structured online Qur'an memorisation for women. Live classes Mon, Wed & Fri via Microsoft Teams — covering memorisation, revision and recitation.",
    price: "R200/month",
    Icon: BookMarked,
    color: 'bg-violet-50 text-violet-700 group-hover:bg-violet-700 group-hover:text-white',
  },
  {
    title: "Children's Online Madrasah",
    path: "/childrens-classes",
    desc: "Live online Islamic classes for children aged 6–13, three times a week via Microsoft Teams. Covers Qur'an, Surahs, Aqaaid, Fiqh, Akhlaaq, Islamic History & Du'as.",
    price: "R150/month",
    Icon: Star,
    color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
  },
  {
    title: "Online Workshops & Short Courses",
    path: "/workshops",
    desc: "Once-off online workshops on specific Islamic topics — Women in Islam, Salaah, Wudhu & Ghusl, Ramadan preparation and more.",
    price: "From R100",
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

        <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Text ─────────────────────────────────────── */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-primary leading-[1.1] mb-3" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
              Beginners<br />
              Madrasah<br />
              <span className="text-accent italic">Classes</span>
            </h1>

            {/* EST badge — sits directly under the title */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-px bg-accent" />
              <span className="font-utility uppercase tracking-[0.2em] text-accent/70" style={{ fontSize: '0.62rem' }}>
                Est 2024 · Foundations of Islamic Knowledge
              </span>
            </div>

            {/* Gold diamond rule — anchored left */}
            <div className="flex items-center gap-3 mb-6 w-48">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #C9A84C, transparent)' }} />
              <div className="w-2 h-2 rotate-45 shrink-0 bg-accent" />
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, #C9A84C, transparent)' }} />
            </div>

            <p className="font-body text-foreground/65 leading-relaxed mb-10" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', maxWidth: '38ch' }}>
              A warm, safe, beginner-friendly Islamic learning space for women and children — online and in-person.
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

          {/* ── Right: Illustration ────────────────────────────── */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src="/assets/bmc-logo-final.png"
              alt="Beginners Madrasah Classes — illustrated mascot"
              className="w-full max-w-sm lg:max-w-md xl:max-w-lg"

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

      {/* ── Featured Programmes ──────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-primary mb-4">Featured Programmes</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMMES.map(({ title, path, desc, price, Icon, color }, i) => (
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
                    <h3 className="text-xl font-display text-primary mb-3">{title}</h3>
                    <p className="text-foreground/70 font-body mb-4 flex-1 text-sm leading-relaxed">{desc}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-utility text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{price}</span>
                      <span className="text-primary font-utility font-bold group-hover:text-accent transition-colors flex items-center gap-1 text-sm">
                        Learn More <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </span>
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
