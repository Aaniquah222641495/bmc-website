import { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'online' | 'inperson';

const PROGRAMMES = [
  {
    title: "Women's Online Madrasah",
    path: "/womens-classes",
    desc: "Beginner-friendly Islamic studies for women 18+. Pre-recorded lessons on Google Classroom — learn at your own pace. Covers Aqaaid, Fiqh, Tajweed, Seerah, Akhlaaq, Hadith & Du'as.",
    tag: "Online · Self-paced",
    price: "R150/month",
    type: "online" as Tab,
    image: "/assets/womens-classes-illustration.png",
    gradient: "from-emerald-800 to-emerald-950",
  },
  {
    title: "Women's Hifdh Programme",
    path: "/hifdh-classes",
    desc: "Structured online Qur'an memorisation for women. Live classes Mon, Wed & Fri via Microsoft Teams — covering memorisation, revision and recitation.",
    tag: "Online · Live classes",
    price: "R200/month",
    type: "online" as Tab,
    gradient: "from-violet-800 to-violet-950",
  },
  {
    title: "Children's Online Madrasah",
    path: "/childrens-classes",
    desc: "Live online Islamic classes for children aged 6–13, three times a week via Microsoft Teams. Covers Qur'an, Surahs, Aqaaid, Fiqh, Akhlaaq, Islamic History & Du'as.",
    tag: "Online · Ages 6–13",
    price: "R150/month",
    type: "online" as Tab,
    gradient: "from-sky-800 to-sky-950",
  },
  {
    title: "Online Workshops & Short Courses",
    path: "/workshops",
    desc: "Once-off online workshops on specific Islamic topics — Women in Islam, Salaah, Wudhu & Ghusl, Ramadan preparation and more.",
    tag: "Online · Once-off",
    price: "From R100",
    type: "online" as Tab,
    image: "/assets/workshops-illustration.png",
    gradient: "from-[#1B4332] to-[#0d2419]",
  },
  {
    title: "Get Into Qur'an – In Person",
    path: "/quran-classes",
    desc: "A Qur'an programme for complete beginners. Step-by-step guidance toward confidently reading the Mushaf. Every Saturday morning in Mitchell's Plain, Cape Town.",
    tag: "In-Person · Cape Town",
    price: "R200/month",
    type: "inperson" as Tab,
    image: "/assets/quran-lesson.png",
    gradient: "from-amber-800 to-amber-950",
  },
  {
    title: "In-Person Workshops",
    path: "/revert-classes",
    desc: "Interactive face-to-face workshops on important Islamic topics, with open discussion and practical learning.",
    tag: "In-Person",
    price: "From R100",
    type: "inperson" as Tab,
    image: "/assets/workshop-teaching.png",
    gradient: "from-rose-800 to-rose-950",
  },
];

const TABS: { id: Tab; label: string; sub: string }[] = [
  { id: 'online',   label: 'Online Classes',   sub: '4 programmes' },
  { id: 'inperson', label: 'In-Person Classes', sub: '2 programmes' },
];

export default function Programmes() {
  const [active, setActive] = useState<Tab>('online');
  const visible = PROGRAMMES.filter(p => p.type === active);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">Our Programmes</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="font-body text-lg text-foreground/70 leading-relaxed">
            Designed to meet you wherever you are on your journey — whether you're taking your very first steps or looking to deepen your knowledge. <span className="text-accent">☽</span>
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-card border border-border rounded-2xl p-1.5 gap-1">
            {TABS.map(({ id, label, sub }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`relative px-8 py-3 rounded-xl font-utility text-sm font-bold transition-all duration-200 flex flex-col items-center gap-0.5 ${
                  active === id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-foreground/60 hover:text-primary'
                }`}
              >
                {active === id && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 bg-primary rounded-xl"
                    style={{ zIndex: 0 }}
                  />
                )}
                <span className="relative z-10 tracking-wide">{label}</span>
                <span className={`relative z-10 text-[0.65rem] font-normal tracking-widest uppercase ${active === id ? 'text-accent' : 'text-foreground/40'}`}>
                  {sub}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visible.map(({ title, path, desc, tag, price, image, gradient }, i) => (
              <motion.div
                key={path}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="h-full"
              >
                <Link href={`/programmes${path}`}>
                  <div className="bg-card rounded-2xl border border-border hover:border-accent hover:shadow-xl transition-all cursor-pointer h-full flex flex-col group overflow-hidden">

                    {/* Image block */}
                    <div className={`relative w-full h-52 overflow-hidden bg-gradient-to-br ${gradient} shrink-0`}>
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 opacity-15"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 6 L32.5 16 L42 13 L36 21 L46 25 L36 29 L42 37 L32.5 34 L30 44 L27.5 34 L18 37 L24 29 L14 25 L24 21 L18 13 L27.5 16 Z' fill='none' stroke='%23C9A84C' stroke-width='0.8'/%3E%3C/svg%3E")`,
                          }}
                        />
                      )}
                      <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white font-utility text-[0.65rem] uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-display text-primary mb-2 leading-snug group-hover:text-accent transition-colors">
                        {title}
                      </h3>
                      <p className="text-foreground/65 font-body text-sm leading-relaxed flex-1">{desc}</p>
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                        <span className="font-utility text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">{price}</span>
                        <span className="text-primary font-utility font-bold group-hover:text-accent transition-colors flex items-center gap-1 text-sm">
                          View Details <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
