import { ClassPageLayout } from '@/components/class-page-layout';
import { IncludedList, DetailsGrid } from '@/components/class-page-blocks';
import { motion } from 'framer-motion';

const INCLUDED = [
  'Quran recitation: building a strong foundation in reading',
  'Surahs: memorising short chapters of the Quran',
  'Aqaaid: understanding the pillars of Islamic belief',
  'Fiqh: how to perform wudhu, salah, and daily acts of worship',
  'Akhlaaq: Islamic character, kindness, and good manners',
  'Islamic History: the stories of the Prophets and Companions',
  'Hadith: the sayings and teachings of the Prophet (SAW)',
  'Daily duas: morning, evening, eating, sleeping, and more',
];

export default function ChildrensClasses() {
  return (
    <ClassPageLayout
      title="Children's Online Madrasah"
      description="Live Islamic classes for children aged 6–13, held three times a week via Microsoft Teams in a fun and structured environment."
      formUrl="https://docs.google.com/forms/d/e/1FAIpQLSdmyJNXuxXONvtvW_LEeLVPgMLSYhdI8eh3ZRJWtabzwPeSzQ/viewform"
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
            Give your child a strong Islamic foundation in a structured, engaging, and supportive online classroom. Our Children's Online Madrasah follows a comprehensive Maktab curriculum that covers all the essential areas of Islamic knowledge.
          </p>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            Classes are held live three times a week via Microsoft Teams (Monday, Tuesday, and Thursday), creating a consistent routine that children can look forward to.
          </p>
        </div>

        <IncludedList items={INCLUDED} />

        <DetailsGrid
          items={[
            { label: 'Format', value: 'Live Online · Microsoft Teams' },
            { label: 'Schedule', value: 'Mon, Tue & Thu (3x per week)' },
            { label: 'Ages', value: 'Children aged 6–13' },
            { label: 'Investment', value: 'R150 per month' },
          ]}
        />

        {/* Parent note */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-7">
          <div className="flex items-start gap-4">
            <img src="/assets/parents.webp" alt="" width={32} height={32} loading="lazy" decoding="async" className="flex-shrink-0" />
            <div>
              <h3 className="font-display text-primary text-xl mb-2">A note for parents</h3>
              <p className="font-body text-foreground/80 leading-relaxed">
                We understand that parents want assurance that their children are in safe, capable hands. Mualimah Rukeya creates a warm, structured classroom environment where children feel encouraged, seen, and excited to learn. Regular feedback is provided to ensure you always know how your child is progressing.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </ClassPageLayout>
  );
}
