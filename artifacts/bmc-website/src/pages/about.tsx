import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Seo } from '@/components/seo';
import { aboutJsonLd } from '@/lib/structured-data';
import { CARD, ClosingBand, CONTAINER, PageHeader, SECTION_Y } from '@/components/page-shell';
import { GirihPattern } from '@/components/ornaments';
import { StoryPath } from '@/components/ornaments/story-path';
import { BusyIcon, IconTile, LaptopHeartIcon, NoticeIcon, SeedlingIcon } from '@/components/ornaments/cute-icons';

const STORY_ICONS = [SeedlingIcon, NoticeIcon, BusyIcon, LaptopHeartIcon];


const GALLERY_IMAGES = [
  '/assets/photo-wudhu-workshop-1.webp',
  '/assets/photo-wudhu-workshop-2.webp',
  '/assets/photo-workshop-audience.webp',
  '/assets/photo-workshop-stage.webp',
  '/assets/photo-achievement.webp',
  '/assets/photo-quran-completion.webp',
  '/assets/photo-quran-lesson.webp',
];

function AutoSlideshow({ images, startIndex = 0 }: { images: string[]; startIndex?: number }) {
  const [index, setIndex] = useState(startIndex % images.length);

  // Slow cross-fade; skipped entirely for people who have asked for reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="bmc-photo mt-auto">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[11px] bg-muted">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Beginners Madrasah Classes community"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover"
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

const STATS = [
  { num: '300+', label: 'Google Classroom students' },
  { num: '6', label: 'Programmes for women and children' },
  { num: '3', label: "Live children's classes a week" },
  { num: '2024', label: 'Year established' },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Mualimah Rukeya & Our Story"
        description="Meet Mualimah Rukeya, founder of Beginners Madrasah Classes since 2024 — making Islamic education accessible, flexible and welcoming for all."
        path="/about"
        jsonLd={aboutJsonLd()}
      />
      <PageHeader
        title="Meet Mualimah Rukeya"
        intro="Founder of Beginners Madrasah Classes, and the teacher in every class. This is how it began."
        art={<StoryPath />}
      />

      {/* Founder and story */}
      <section className={`${SECTION_Y} bg-bmc-paper !pt-16 md:!pt-24`}>
        <div className={`${CONTAINER} grid grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24`}>
          <figure className="bmc-reveal mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:mx-0 lg:self-start">
            <div className="bmc-photo">
              <img
                src="/assets/photo-founder-teaching.webp"
                alt="Mualimah Rukeya teaching"
                width={1000}
                height={1333}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="mt-6 text-center lg:text-left">
              <span className="block font-display text-[1.25rem] text-primary">Mualimah Rukeya</span>
              <span className="bmc-eyebrow mt-1.5 block !text-[0.74rem]">Founder &amp; Teacher</span>
            </figcaption>
          </figure>

          <div className="space-y-12 md:space-y-14">
            {STORY_SECTIONS.map(({ label, text }, k) => (
              <div key={label} className="bmc-reveal grid grid-cols-[auto_1fr] gap-x-5">
                <IconTile Icon={STORY_ICONS[k] ?? SeedlingIcon} />
                <div>
                  <h2 className="bmc-eyebrow mb-3 mt-1">{label}</h2>
                  <p className="max-w-[60ch] text-[1.08rem] leading-[1.8] text-foreground/85">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth in numbers */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <GirihPattern />
        <div className={`relative ${CONTAINER} py-20 md:py-28`}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
            {STATS.map(({ num, label }) => (
              <li key={label} className="bmc-reveal text-center">
                <p className="font-display text-[clamp(2.6rem,5vw,3.8rem)] font-medium leading-none text-bmc-gold-light">{num}</p>
                <p className="mx-auto mt-4 max-w-[12rem] font-utility text-[0.74rem] font-semibold uppercase leading-snug tracking-[0.14em] text-primary-foreground/85">{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* A student's words about her: liking and trust come from peers, not from us. Verbatim. */}
      <section className="bg-bmc-paper pt-20 md:pt-28">
        <figure className={`${CONTAINER} bmc-reveal mx-auto max-w-3xl text-center`}>
          <blockquote className="font-display text-[1.35rem] italic leading-[1.55] text-primary md:text-[1.65rem]">
            "She makes each and every individual feel equal and comfortable in the class. She brings out the confidence in each person, and alhamdulillah she tends to keep a smile on her face and ours."
          </blockquote>
          <figcaption className="bmc-eyebrow mt-6">Nasheetah De Jongh, student</figcaption>
        </figure>
      </section>

      {/* Mission and vision */}
      <section className={`${SECTION_Y} bg-bmc-paper`}>
        <div className={`${CONTAINER} grid gap-8 md:grid-cols-2 lg:gap-12`}>
          {[
            { title: 'Our mission', start: 3, tone: 'green', text: 'To make authentic Islamic education accessible to every woman and child, wherever they are on their journey: affordable, flexible, and always welcoming.' },
            { title: 'Our vision', start: 1, tone: 'gold', text: 'A world where no Muslim woman or child feels too late, too lost, or too busy to begin learning their deen.' },
          ].map(({ title, start, tone, text }) => (
            <div
              key={title}
              className={`bmc-reveal relative flex flex-col overflow-hidden rounded-[1.75rem] p-6 shadow-lift sm:p-8 md:p-10 ${
                tone === 'green' ? 'bg-primary text-primary-foreground' : 'bg-bmc-gold-light/50 text-foreground'
              }`}
            >
              {tone === 'green' && <GirihPattern />}
              <h2 className={`relative mb-4 text-[1.9rem] leading-tight ${tone === 'green' ? 'text-primary-foreground' : 'text-primary'}`}>{title}</h2>
              <p className={`relative mb-9 font-display text-[1.25rem] italic leading-[1.5] ${tone === 'green' ? 'text-primary-foreground/90' : 'text-primary'}`}>{text}</p>
              <AutoSlideshow images={GALLERY_IMAGES} startIndex={start} />
            </div>
          ))}
        </div>
      </section>

      {/* Closing du'a */}
      <ClosingBand
        actions={
          <Link href="/programmes" className="bmc-btn bmc-btn-primary">
            Find your class
          </Link>
        }
      >
        <figure>
          <blockquote className="font-display text-[1.25rem] italic leading-[1.6] md:text-[1.5rem]">
            "Alhamdulillah for how far Allah has brought us, and we pray that this is only the beginning. We ask Allah to accept this effort, place barakah in it, and allow Beginners Madrasah Classes to continue benefiting communities for many years to come."
          </blockquote>
          <figcaption className="bmc-eyebrow mt-7">Mualimah Rukeya</figcaption>
        </figure>
      </ClosingBand>
    </>
  );
}
