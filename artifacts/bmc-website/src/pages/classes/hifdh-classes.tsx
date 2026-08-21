import { ClassPageLayout } from '@/components/class-page-layout';
import { IncludedList, DetailsGrid } from '@/components/class-page-blocks';
import { motion } from 'framer-motion';
import { Seo } from '@/components/seo';

const INCLUDED = [
  'A structured, personalised memorisation plan',
  'Live sessions 3 times a week: Monday, Wednesday & Friday',
  'Guided recitation and correction in every class',
  'Systematic revision to keep what you have memorised',
  'Spiritual encouragement throughout your Hifdh journey',
  'Accountability and consistent progress tracking',
];

export default function HifdhClasses() {
  return (
    <>
      <Seo
        title="Women's Hifdh Programme"
        description="Structured online Quran memorisation for women, with live guidance three times a week via Microsoft Teams — memorisation, revision and recitation."
        path="/programmes/hifdh-classes"
      />
      <ClassPageLayout
      title="Women's Hifdh Programme"
      description="A structured online Quran memorisation programme for women, with live guidance three times a week."
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
            Hifdh, the memorisation of the Holy Quran, is one of the most beloved acts in Islam. Our Women's Hifdh Programme provides a structured, supportive online environment for women who have taken this beautiful step.
          </p>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            Live classes are held three times a week via Microsoft Teams. Students receive consistent guidance with their memorisation, revision, and recitation to help them progress steadily and confidently in their Hifdh journey.
          </p>
        </div>

        <IncludedList items={INCLUDED} />

        <DetailsGrid
          items={[
            { label: 'Format', value: 'Live Online · Microsoft Teams' },
            { label: 'Schedule', value: 'Mon, Wed & Fri (3x per week)' },
            { label: 'Who it\'s for', value: 'Women beginning or continuing Hifdh' },
            { label: 'Investment', value: 'R200 per month' },
          ]}
        />

        {/* Inspirational note */}
        <div className="bg-primary rounded-2xl p-7 text-center text-white">
          <div className="text-3xl text-accent mb-3">★</div>
          <p className="font-body italic leading-relaxed max-w-lg mx-auto text-bmc-cream">
            "The best among you are those who learn the Quran and teach it."
          </p>
          <p className="font-utility text-sm mt-3 text-accent">Prophet Muhammad (SAW)</p>
        </div>
      </motion.div>
    </ClassPageLayout>
    </>
  );
}
