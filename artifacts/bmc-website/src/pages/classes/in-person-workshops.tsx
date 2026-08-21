import { useState, useEffect } from 'react';
import { ClassPageLayout } from '@/components/class-page-layout';
import { IncludedList, DetailsGrid, PastWorkshopsGrid } from '@/components/class-page-blocks';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Seo } from '@/components/seo';

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

const PAST_WORKSHOPS = [
  {
    title: 'Wudhu, Ghusl & Salaah',
    type: 'In-Person',
    description:
      'A simple and practical workshop to help sisters learn Wudhu, Ghusl and Salaah properly in an easy and comfortable way, perfect for beginners or anyone wanting to refresh their knowledge.',
    image: '/assets/photo-wudhu-ghusl-salaah.webp',
    imageAlt: 'A woman performing Salaah on a prayer mat',
  },
];

function WorkshopGallery() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), 4000);
    return () => clearInterval(timer);
  }, [paused, index]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
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
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            loading="lazy"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {GALLERY_IMAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-accent' : 'w-2 bg-border'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function InPersonWorkshops() {
  return (
    <>
      <Seo
        title="In-Person Workshops"
        description="Interactive face-to-face Islamic workshops with open discussion and practical learning — topics include Wudhu, Ghusl, Salaah and more, from R100."
        path="/programmes/in-person-workshops"
      />
      <ClassPageLayout
      title="In-Person Workshops"
      description="Interactive face-to-face workshops covering important Islamic topics, with opportunities for discussion, questions and practical learning."
      heroImage="/assets/workshop-teaching.webp"
      showRegistration={false}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-10"
      >
        {/* Description */}
        <div>
          <p className="font-body text-lg text-foreground/80 leading-relaxed mb-4">
            Our in-person workshops bring the community together for focused, face-to-face sessions on practical Islamic topics. These once-off events give you the chance to learn, ask questions, and engage with others in a warm and welcoming setting.
          </p>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            Each workshop is designed to be accessible for complete beginners while offering real depth, so whether you are new to a topic or looking to strengthen your knowledge, you will leave with something valuable.
          </p>
        </div>

        <IncludedList items={INCLUDED} heading="What to Expect" />

        <DetailsGrid
          items={[
            { label: 'Format', value: 'In-Person' },
            { label: 'Duration', value: 'Once-off session' },
            { label: 'Location', value: 'Varies by workshop' },
            { label: 'Investment', value: 'From R100' },
          ]}
        />

        {/* Past Workshops */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-border flex-1" />
            <span className="font-utility text-sm text-foreground/50 uppercase tracking-widest whitespace-nowrap">Previous Workshops</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <PastWorkshopsGrid workshops={PAST_WORKSHOPS} delayBase={0.45} />
        </div>

        {/* Gallery */}
        <div className="bg-card border border-border rounded-2xl p-7 md:p-8">
          <h2 className="font-display text-2xl text-primary mb-6">From Our Workshops</h2>
          <WorkshopGallery />
        </div>

        {/* CTA */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-7 text-center">
          <p className="font-body text-foreground/80 leading-relaxed max-w-lg mx-auto mb-6">
            Workshop dates and locations are announced on Instagram and TikTok. Send us a WhatsApp message to be added to the notification list.
          </p>
          <a
            href="https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20find%20out%20about%20upcoming%20in-person%20workshops"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-utility font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Enquire via WhatsApp &rarr;
          </a>
        </div>
      </motion.div>
    </ClassPageLayout>
    </>
  );
}
