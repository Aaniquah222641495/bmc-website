import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

const GALLERY_IMAGES = [
  '/assets/photo-founder-teaching.webp',
  '/assets/photo-wudhu-workshop-1.webp',
  '/assets/photo-wudhu-workshop-2.webp',
  '/assets/photo-workshop-audience.webp',
  '/assets/photo-workshop-stage.webp',
  '/assets/photo-workshop-awards.webp',
  '/assets/photo-achievement.webp',
  '/assets/photo-quran-completion.webp',
  '/assets/photo-quran-lesson.webp',
];

function AutoSlideshow({ images, startIndex = 0 }: { images: string[]; startIndex?: number }) {
  const [index, setIndex] = useState(startIndex % images.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="mt-auto pt-6">
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden border border-border">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Beginners Madrasah Classes community"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

const STORY_SECTIONS = [
  {
    label: 'How It Began',
    text: 'Beginners Madrasah Classes was born from a passion for both teaching and serving the Muslim community. From a young age, I always had a deep love for teaching and a strong desire to be involved in Islamic work.',
  },
  {
    label: 'The Gap We Noticed',
    text: 'As the years went by, I noticed a gap in our communities. Many women over the age of 18 wanted to learn about Islam but didn\'t know where to start. Some had never attended madrasah, some felt they didn\'t have the basic foundation, some were reverts looking for guidance, and others simply wanted to refresh their knowledge. For many, joining a traditional madrasah felt intimidating, and there weren\'t enough programmes designed specifically for women in these situations.',
  },
  {
    label: 'Life Gets in the Way',
    text: 'I also realised that many sisters genuinely wanted to seek knowledge but were balancing work, university, motherhood, or other daily responsibilities. Attending classes at a fixed time every week simply wasn\'t realistic for everyone.',
  },
  {
    label: 'Our Solution',
    text: 'With this in mind, Beginners Madrasah Classes was established in 2024 with one simple goal: to make authentic Islamic knowledge accessible, welcoming, flexible, and affordable. We began with live online classes via Microsoft Teams at just R150 per month, ensuring that cost wouldn\'t become a barrier to seeking knowledge. I later introduced Google Classroom, where students can access pre-recorded lessons in their own time, so whether they\'re a busy mother, a full-time student, or someone with a demanding work schedule, they can learn when it suits them.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <img
            src="/assets/deco-bismillah.webp"
            alt="Bismillah"
            fetchPriority="high"
            decoding="async"
            className="mx-auto mb-4 pointer-events-none select-none"
            style={{ width: 'clamp(140px, 18vw, 220px)', opacity: 0.9 }}
          />
          <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">Our Story</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="font-body text-foreground/60 text-lg max-w-xl mx-auto">
            How a passion for teaching grew into a thriving Islamic learning community.
          </p>
        </motion.div>

        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border mb-10"
        >
          <div className="relative w-full h-56 md:h-80 overflow-hidden">
            <img
              src="/assets/photo-founder-teaching.webp"
              alt="Mualimah Rukeya teaching"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p className="font-utility text-xs text-accent uppercase tracking-widest mb-1">Founder & Teacher</p>
              <h2 className="font-display text-2xl md:text-3xl text-white">Mualimah Rukeya</h2>
            </div>
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-8 md:p-12 mb-12 space-y-8"
        >
          {STORY_SECTIONS.map(({ label, text }) => (
            <div key={label}>
              <p className="font-utility text-xs text-accent uppercase tracking-widest mb-2">{label}</p>
              <p className="font-body text-foreground/80 leading-relaxed text-[1.05rem]">{text}</p>
            </div>
          ))}
        </motion.div>

        {/* Growth stat highlight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { num: '300+', label: 'Google Classroom students' },
            { num: '4',    label: "Children's classes" },
            { num: '1',    label: 'Hifdh programme' },
            { num: '2024', label: 'Year established' },
          ].map(({ num, label }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-6 text-center">
              <p className="font-display text-3xl text-accent font-bold mb-1">{num}</p>
              <p className="font-utility text-xs text-foreground/55 uppercase tracking-wide leading-snug">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-muted p-8 rounded-xl border border-border relative overflow-hidden flex flex-col">
            <div className="absolute top-3 right-4 text-accent/15 text-5xl font-display">★</div>
            <h3 className="font-display text-2xl text-primary mb-3">Our Mission</h3>
            <p className="font-body text-foreground/75 leading-relaxed">
              To make authentic Islamic education accessible to every woman and child, wherever they are on their journey: affordable, flexible, and always welcoming.
            </p>
            <AutoSlideshow images={GALLERY_IMAGES} startIndex={0} />
          </div>
          <div className="bg-muted p-8 rounded-xl border border-border relative overflow-hidden flex flex-col">
            <div className="absolute top-3 right-4 text-accent/15 text-5xl font-display">☽</div>
            <h3 className="font-display text-2xl text-primary mb-3">Our Vision</h3>
            <p className="font-body text-foreground/75 leading-relaxed">
              A world where no Muslim woman or child feels too late, too lost, or too busy to begin learning their deen.
            </p>
            <AutoSlideshow images={GALLERY_IMAGES} startIndex={5} />
          </div>
        </motion.div>

        {/* Closing du'a */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="islamic-pattern rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
        >
          <p className="font-body text-lg md:text-xl leading-relaxed mb-6 text-bmc-cream">
            "Alhamdulillah for how far Allah has brought us, and we pray that this is only the beginning. We ask Allah to accept this effort, place barakah in it, and allow Beginners Madrasah Classes to continue benefiting communities for many years to come."
          </p>
          <span className="font-utility text-accent uppercase tracking-widest text-sm">Mualimah Rukeya</span>

          <div className="mt-10">
            <Link href="/programmes">
              <button className="rounded-full bg-accent text-primary font-utility font-bold px-8 py-3 hover:bg-accent/90 transition-all"
                style={{ fontSize: '0.88rem', letterSpacing: '0.06em' }}>
                Explore Our Programmes
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
