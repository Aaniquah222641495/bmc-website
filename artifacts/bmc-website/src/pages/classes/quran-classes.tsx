import { ClassPageLayout } from '@/components/class-page-layout';
import { motion } from 'framer-motion';

const INCLUDED = [
  'The Arabic alphabet — every letter, sound, and form',
  'Joining letters and reading words with confidence',
  'Correct pronunciation and basic Tajweed rules',
  'Building reading fluency — progressing to the Mushaf',
  'Personal guidance and corrections in every session',
  'Small class sizes for focused, individual attention',
];

export default function QuranClasses() {
  return (
    <ClassPageLayout
      title="Get Into Quran — In Person"
      description="A Quran programme for complete beginners or those wanting to start again, held every Saturday morning in Mitchell's Plain, Cape Town."
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-10"
      >
        {/* Photo + Quran book accent */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
            <img
              src="/assets/quran-lesson.png"
              alt="One-on-one Quran lesson at Beginners Madrasah Classes"
              className="w-full h-64 md:h-80 object-cover object-center"
            />
          </div>
          <img
            src="/assets/deco-quran.png"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-10 -right-6 pointer-events-none select-none hidden md:block"
            style={{ width: '110px', opacity: 0.85 }}
          />
        </div>

        {/* Description */}
        <div>
          <p className="font-body text-lg text-foreground/80 leading-relaxed mb-4">
            This in-person Quran programme is designed for complete beginners — or for those who once learned but want to start again from the foundations. You will be guided step by step through Quran reading, with the goal of progressing to confidently reciting directly from the Mushaf.
          </p>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            Classes are held every Saturday morning in Mitchell's Plain, Cape Town, giving you the added blessing of learning in community with other students on the same journey.
          </p>
        </div>

        {/* What's Included */}
        <div>
          <h2 className="font-display text-2xl text-primary mb-6 flex items-center gap-3">
            <span className="text-accent">★</span> What's Included
          </h2>
          <ul className="space-y-3">
            {INCLUDED.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-start gap-3 font-body text-foreground/80"
              >
                <span className="text-accent text-lg flex-shrink-0 leading-6">☽</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Details */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Format', value: 'In-Person' },
            { label: 'Schedule', value: 'Every Saturday morning' },
            { label: 'Location', value: "Mitchell's Plain, Cape Town" },
            { label: 'Investment', value: 'R200 per month' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted rounded-xl p-5 border border-border">
              <p className="font-utility text-xs text-foreground/50 uppercase tracking-widest mb-1">{label}</p>
              <p className="font-display text-primary text-lg">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </ClassPageLayout>
  );
}
