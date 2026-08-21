import { ClassPageLayout } from '@/components/class-page-layout';
import { IncludedList, DetailsGrid } from '@/components/class-page-blocks';
import { motion } from 'framer-motion';
import { Seo } from '@/components/seo';

const INCLUDED = [
  'The Arabic alphabet: every letter, sound, and form',
  'Joining letters and reading words with confidence',
  'Correct pronunciation and basic Tajweed rules',
  'Building reading fluency, progressing to the Mushaf',
  'Personal guidance and corrections in every session',
  'Small class sizes for focused, individual attention',
];

export default function QuranClasses() {
  return (
    <>
      <Seo
        title="Get Into Quran: In Person"
        description="A beginner Quran reading programme in Mitchell's Plain, Cape Town — every Saturday morning, from the Arabic alphabet to confidently reciting the Mushaf."
        path="/programmes/quran-classes"
      />
      <ClassPageLayout
      title="Get Into Quran: In Person"
      description="A Quran programme for complete beginners or those wanting to start again, held every Saturday morning in Mitchell's Plain, Cape Town."
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
            This in-person Quran programme is designed for complete beginners, or for those who once learned but want to start again from the foundations. You will be guided step by step through Quran reading, with the goal of progressing to confidently reciting directly from the Mushaf.
          </p>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            Classes are held every Saturday morning in Mitchell's Plain, Cape Town, giving you the added blessing of learning in community with other students on the same journey.
          </p>
        </div>

        <IncludedList items={INCLUDED} />

        <DetailsGrid
          items={[
            { label: 'Format', value: 'In-Person' },
            { label: 'Schedule', value: 'Every Saturday morning' },
            { label: 'Location', value: "Mitchell's Plain, Cape Town" },
            { label: 'Investment', value: 'R200 per month' },
          ]}
        />
      </motion.div>
    </ClassPageLayout>
    </>
  );
}
