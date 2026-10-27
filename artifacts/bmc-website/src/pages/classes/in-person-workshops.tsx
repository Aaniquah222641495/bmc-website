import { useState, useEffect } from 'react';
import { ClassPageLayout } from '@/components/class-page-layout';
import { PastWorkshopsGrid } from '@/components/class-page-blocks';
import { CARD, CONTAINER, SECTION_Y, SectionHead } from '@/components/page-shell';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Seo } from '@/components/seo';
import { programmeJsonLd } from '@/lib/structured-data';

import { pastInPersonWorkshops, type Workshop } from '@/data/workshops';
import { useNow } from '@/hooks/use-now';

const INCLUDED = [
  'Interactive, face-to-face learning with real discussion',
  'Opportunities to ask questions and get immediate answers',
  'Practical, hands-on guidance on the topic covered',
  'A warm, welcoming and judgement-free environment',
  'Topics include Women in Islam, Salaah, Wudhu & Ghusl, Ramadan and more',
];

const GALLERY_IMAGES = [
  '/assets/photo-wudhu-workshop-1.webp',
  '/assets/photo-workshop-audience.webp',
  '/assets/photo-workshop-stage.webp',
  '/assets/workshop-teaching.webp',
];

// Past in-person workshops are authored as files under content/workshops/
// (directly, or via the CMS at /admin) — see src/data/workshops.ts.
const toPastCard = (w: Workshop) => ({
  title: w.title,
  type: w.typeLabel ?? 'In-Person',
  description: w.description,
  image: w.image,
  imageAlt: w.imageAlt,
});

function WorkshopGallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  // Auto-advance only for people who have not asked for reduced motion, and pause while hovered or focused.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => go(1), 4000);
    return () => clearInterval(timer);
  }, [paused, index]);

  const arrow =
    'absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-bmc-paper/90 text-primary shadow-soft transition-colors hover:bg-bmc-paper';

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="bmc-photo">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[11px] bg-muted">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={index}
              src={GALLERY_IMAGES[index]}
              alt="Sisters at a Beginners Madrasah in-person workshop"
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
              loading="lazy"
            />
          </AnimatePresence>

          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${arrow} left-3`}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${arrow} right-3`}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        {GALLERY_IMAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            className="group flex h-11 w-8 items-center justify-center"
          >
            <span className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-bmc-gold-ink' : 'w-2 bg-bmc-gold-ink/35 group-hover:bg-bmc-gold-ink/60'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function InPersonWorkshops() {
  const PAST_WORKSHOPS = pastInPersonWorkshops(useNow()).map(toPastCard);
  return (
    <>
      <Seo
        title="In-Person Islamic Workshops, Cape Town"
        description="Interactive face-to-face Islamic workshops with open discussion and practical learning — topics include Wudhu, Ghusl, Salaah and more, from R100."
        path="/programmes/in-person-workshops"
        jsonLd={programmeJsonLd('/programmes/in-person-workshops')}
      />
      <ClassPageLayout
        path="/in-person-workshops"
        title="In-Person Workshops"
        description="Interactive face-to-face workshops covering important Islamic topics, with opportunities for discussion, questions and practical learning."
        heroImage="/assets/workshop-teaching.webp"
        heroImageAlt="Mualimah Rukeya teaching at an in-person workshop"
        showRegistration={false}
        intro={
          <>
            <p>
              Our in-person workshops bring the community together for focused, face-to-face sessions on practical Islamic topics. These once-off events give you the chance to learn, ask questions, and engage with others in a warm and welcoming setting.
            </p>
            <p>
              Each workshop is designed to be accessible for complete beginners while offering real depth, so whether you are new to a topic or looking to strengthen your knowledge, you will leave with something valuable.
            </p>
          </>
        }
        included={INCLUDED}
        includedHeading="What to Expect"
        details={[
          { label: 'Format', value: 'In-Person' },
          { label: 'Duration', value: 'Once-off session' },
          { label: 'Location', value: 'Varies by workshop' },
          { label: 'Investment', value: 'From R100' },
        ]}
        after={
          <>
            {/* Past Workshops */}
            {PAST_WORKSHOPS.length > 0 && (
              <section className={`${SECTION_Y} bg-background`}>
                <div className={CONTAINER}>
                  <SectionHead title="Previous Workshops" className="mb-14 md:mb-16" />
                  <PastWorkshopsGrid workshops={PAST_WORKSHOPS} />
                </div>
              </section>
            )}

            {/* Gallery and CTA */}
            <section className={`${SECTION_Y} bg-bmc-paper`}>
              <div className={`${CONTAINER} grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24`}>
                <div className="bmc-reveal">
                  <SectionHead title="From Our Workshops" className="mb-10" />
                  <WorkshopGallery />
                </div>
                <div className="bmc-reveal">
                  <div className={`${CARD} p-8 text-center md:p-12`}>
                    <p className="mx-auto mb-8 max-w-lg leading-[1.75] text-foreground/85">
                      Workshop dates and locations are announced on Instagram and TikTok. Send us a WhatsApp message to be added to the notification list.
                    </p>
                    <a
                      href="https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20find%20out%20about%20upcoming%20in-person%20workshops"
                      target="_blank"
                      rel="noreferrer"
                      className="bmc-btn bmc-btn-primary"
                    >
                      Enquire via WhatsApp <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        }
      />
    </>
  );
}
