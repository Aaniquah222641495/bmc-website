import { ClassPageLayout } from '@/components/class-page-layout';
import { motion } from 'framer-motion';

const INCLUDED = [
  'Aqaaid (Islamic Belief) — understand the foundations of faith',
  'Fiqh (Islamic Jurisprudence) — how to practice Islam correctly',
  'Tajweed — Quran recitation with proper pronunciation',
  'Seerah — the life and character of the Prophet (SAW)',
  'Akhlaaq — Islamic character and moral conduct',
  'Hadith — sayings and teachings of the Prophet (SAW)',
  'Essential duas for daily life',
];

export default function WomensClasses() {
  return (
    <ClassPageLayout
      title="Women's Online Madrasah"
      description="A structured, beginner-friendly Islamic studies programme for women 18+, designed to fit around your life."
      illustration="/assets/womens-classes-illustration.png"
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
            Our Women's Online Madrasah is a comprehensive, beginner-friendly Islamic studies programme for women 18 and older. Lessons are pre-recorded and uploaded to Google Classroom, allowing you to learn at your own pace — whenever and wherever suits you best.
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
            { label: 'Format', value: 'Online — Google Classroom (pre-recorded)' },
            { label: 'Who it\'s for', value: 'Women 18+' },
            { label: 'Access', value: 'Learn at your own pace, anytime' },
            { label: 'Investment', value: 'R150 per month' },
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
