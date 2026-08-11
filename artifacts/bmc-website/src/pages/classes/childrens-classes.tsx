import { ClassPageLayout } from '@/components/class-page-layout';
import { motion } from 'framer-motion';

const INCLUDED = [
  'Quran recitation — building a strong foundation in reading',
  'Surahs — memorising short chapters of the Quran',
  'Aqaaid — understanding the pillars of Islamic belief',
  'Fiqh — how to perform wudhu, salah, and daily acts of worship',
  'Akhlaaq — Islamic character, kindness, and good manners',
  'Islamic History — the stories of the Prophets and Companions',
  'Hadith — the sayings and teachings of the Prophet (SAW)',
  'Daily duas — morning, evening, eating, sleeping, and more',
];

export default function ChildrensClasses() {
  return (
    <ClassPageLayout
      title="Children's Online Madrasah"
      description="Live Islamic classes for children aged 6–13, held three times a week via Microsoft Teams in a fun and structured environment."
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
            Classes are held live three times a week via Microsoft Teams — Monday, Tuesday, and Thursday — creating a consistent routine that children can look forward to.
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
            { label: 'Format', value: 'Live Online — Microsoft Teams' },
            { label: 'Schedule', value: 'Mon, Tue & Thu (3x per week)' },
            { label: 'Ages', value: 'Children aged 6–13' },
            { label: 'Investment', value: 'R150 per month' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted rounded-xl p-5 border border-border">
              <p className="font-utility text-xs text-foreground/50 uppercase tracking-widest mb-1">{label}</p>
              <p className="font-display text-primary text-lg">{value}</p>
            </div>
          ))}
        </div>

        {/* Parent note */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-7">
          <div className="flex items-start gap-4">
            <span className="text-accent text-2xl flex-shrink-0">☽</span>
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
