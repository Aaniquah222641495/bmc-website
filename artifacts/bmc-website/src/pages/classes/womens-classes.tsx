import { ClassPageLayout } from '@/components/class-page-layout';
import { IncludedList, DetailsGrid } from '@/components/class-page-blocks';
import { motion } from 'framer-motion';

const INCLUDED = [
  'Aqaaid (Islamic Belief): understand the foundations of faith',
  'Fiqh (Islamic Jurisprudence): how to practice Islam correctly',
  'Tajweed: Quran recitation with proper pronunciation',
  'Seerah: the life and character of the Prophet (SAW)',
  'Akhlaaq: Islamic character and moral conduct',
  'Hadith: sayings and teachings of the Prophet (SAW)',
  'Essential duas for daily life',
];

export default function WomensClasses() {
  return (
    <ClassPageLayout
      title="Women's Online Madrasah"
      description="A structured, beginner-friendly Islamic studies programme for women 18+, designed to fit around your life."
      formUrl="https://forms.gle/UQoRpDfaXptJrMXj8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-10"
      >
        {/* Description */}
        <div>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            Our Women's Online Madrasah is a comprehensive, beginner-friendly Islamic studies programme for women 18 and older. Lessons are pre-recorded and uploaded to Google Classroom, allowing you to learn at your own pace, whenever and wherever suits you best.
          </p>
        </div>

        <IncludedList items={INCLUDED} />

        <DetailsGrid
          items={[
            { label: 'Format', value: 'Online · Google Classroom (pre-recorded)' },
            { label: 'Who it\'s for', value: 'Women 18+' },
            { label: 'Access', value: 'Learn at your own pace, anytime' },
            { label: 'Investment', value: 'R150 per month' },
          ]}
        />
      </motion.div>
    </ClassPageLayout>
  );
}
