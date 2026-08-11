import { ClassPageLayout } from '@/components/class-page-layout';
import { motion } from 'framer-motion';

const INCLUDED = [
  'A structured, personalised memorisation plan',
  'Live sessions 3 times a week — Monday, Wednesday & Friday',
  'Guided recitation and correction in every class',
  'Systematic revision to keep what you have memorised',
  'Spiritual encouragement throughout your Hifdh journey',
  'Accountability and consistent progress tracking',
];

export default function HifdhClasses() {
  return (
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
            Hifdh — the memorisation of the Holy Quran — is one of the most beloved acts in Islam. Our Women's Hifdh Programme provides a structured, supportive online environment for women who have taken this beautiful step.
          </p>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            Live classes are held three times a week via Microsoft Teams. Students receive consistent guidance with their memorisation, revision, and recitation to help them progress steadily and confidently in their Hifdh journey.
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
            { label: 'Schedule', value: 'Mon, Wed & Fri (3x per week)' },
            { label: 'Who it\'s for', value: 'Women beginning or continuing Hifdh' },
            { label: 'Investment', value: 'R200 per month' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted rounded-xl p-5 border border-border">
              <p className="font-utility text-xs text-foreground/50 uppercase tracking-widest mb-1">{label}</p>
              <p className="font-display text-primary text-lg">{value}</p>
            </div>
          ))}
        </div>

        {/* Inspirational note */}
        <div className="bg-primary rounded-2xl p-7 text-center text-white">
          <div className="text-3xl text-accent mb-3">★</div>
          <p className="font-body italic leading-relaxed max-w-lg mx-auto" style={{ color: '#F5F0E8' }}>
            "The best among you are those who learn the Quran and teach it."
          </p>
          <p className="font-utility text-sm mt-3" style={{ color: '#C9A84C' }}>— Prophet Muhammad (SAW)</p>
        </div>
      </motion.div>
    </ClassPageLayout>
  );
}
