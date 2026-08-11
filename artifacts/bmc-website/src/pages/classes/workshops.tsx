import { ClassPageLayout } from '@/components/class-page-layout';
import { motion } from 'framer-motion';

const ONLINE_TOPICS = [
  'Ramadan Preparation — get ready spiritually and practically',
  'Salaah — understanding and perfecting your prayer',
  'Wudhu & Ghusl — step-by-step with confidence',
  'Women in Islam — our honoured role and beautiful rights',
  'The Month of Rajab & Sha\'ban — spiritual preparation',
  'And more — topics announced throughout the year',
];

const INPERSON_TOPICS = [
  'Interactive face-to-face learning and discussion',
  'Opportunities to ask questions in a safe space',
  'Practical demonstrations for acts of worship',
  'Community and sisterhood with fellow students',
  'Certificate of attendance (where applicable)',
];

export default function Workshops() {
  return (
    <ClassPageLayout
      title="Workshops & Short Courses"
      description="Focused once-off sessions on essential Islamic topics, available both online and in person."
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-12"
      >
        {/* Description */}
        <div>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            Our workshops are perfect for deepening your knowledge of specific Islamic topics without committing to an ongoing programme. Each workshop is a focused, standalone session or short course that leaves you with practical knowledge you can use right away.
          </p>
        </div>

        {/* Online Workshops */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-accent text-2xl">☽</span>
            <h2 className="font-display text-2xl text-primary">Online Workshops & Short Courses</h2>
          </div>
          <p className="font-body text-foreground/70 mb-6">
            Join from the comfort of your home. Once-off online workshops focusing on specific Islamic topics.
          </p>
          <ul className="space-y-3 mb-6">
            {ONLINE_TOPICS.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
                className="flex items-start gap-3 font-body text-foreground/80"
              >
                <span className="text-accent text-lg flex-shrink-0 leading-6">★</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="flex gap-6 text-sm font-utility pt-4 border-t border-border">
            <div>
              <span className="text-foreground/50 uppercase tracking-widest text-xs block mb-1">Format</span>
              <span className="text-primary font-medium">Online</span>
            </div>
            <div>
              <span className="text-foreground/50 uppercase tracking-widest text-xs block mb-1">Price</span>
              <span className="text-primary font-medium">From R100 per workshop</span>
            </div>
          </div>
        </div>

        {/* In-Person Workshops */}
        <div className="bg-primary rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-accent text-2xl">★</span>
            <h2 className="font-display text-2xl text-white">In-Person Workshops</h2>
          </div>
          <p className="mb-6" style={{ color: '#F5F0E8' }}>
            There is something irreplaceable about learning together in the same room. Our in-person workshops offer the added richness of community, discussion, and real connection.
          </p>
          <ul className="space-y-3 mb-6">
            {INPERSON_TOPICS.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="flex items-start gap-3 font-body"
                style={{ color: '#F5F0E8' }}
              >
                <span className="text-accent text-lg flex-shrink-0 leading-6">☽</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="flex gap-6 text-sm font-utility pt-4 border-t border-white/20">
            <div>
              <span className="uppercase tracking-widest text-xs block mb-1" style={{ color: '#C9A84C' }}>Format</span>
              <span className="text-white font-medium">In-Person</span>
            </div>
            <div>
              <span className="uppercase tracking-widest text-xs block mb-1" style={{ color: '#C9A84C' }}>Location</span>
              <span className="text-white font-medium">Varies by workshop</span>
            </div>
            <div>
              <span className="uppercase tracking-widest text-xs block mb-1" style={{ color: '#C9A84C' }}>Price</span>
              <span className="text-white font-medium">From R100 per workshop</span>
            </div>
          </div>
        </div>

        {/* Stay Updated */}
        <div className="text-center bg-muted rounded-2xl p-7 border border-border">
          <p className="font-body text-foreground/80 mb-4">
            Workshop dates and topics are announced throughout the year. Follow us on Instagram and TikTok to stay updated.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://instagram.com/beginners_classes"
              target="_blank"
              rel="noreferrer"
              className="font-utility text-sm font-bold text-primary hover:text-accent transition-colors underline"
            >
              @beginners_classes
            </a>
            <span className="text-border">|</span>
            <a
              href="https://tiktok.com/@rukeyabaradien_"
              target="_blank"
              rel="noreferrer"
              className="font-utility text-sm font-bold text-primary hover:text-accent transition-colors underline"
            >
              @rukeyabaradien_
            </a>
          </div>
        </div>
      </motion.div>
    </ClassPageLayout>
  );
}
