import { ClassPageLayout } from '@/components/class-page-layout';
import { motion } from 'framer-motion';

const INCLUDED = [
  'Interactive, face-to-face learning with real discussion',
  'Opportunities to ask questions and get immediate answers',
  'Practical, hands-on guidance on the topic covered',
  'A warm, welcoming and judgement-free environment',
  'Topics include Women in Islam, Salaah, Wudhu & Ghusl, Ramadan and more',
];

export default function InPersonWorkshops() {
  return (
    <ClassPageLayout
      title="In-Person Workshops"
      description="Interactive face-to-face workshops covering important Islamic topics, with opportunities for discussion, questions and practical learning."
      formUrl="https://forms.gle/qSg93UZRpjdA9dE96"
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
            Each workshop is designed to be accessible for complete beginners while offering real depth — so whether you are new to a topic or looking to strengthen your knowledge, you will leave with something valuable.
          </p>
        </div>

        {/* What's Included */}
        <div>
          <h2 className="font-display text-2xl text-primary mb-6 flex items-center gap-3">
            <span className="text-accent">★</span> What to Expect
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
            { label: 'Duration', value: 'Once-off session' },
            { label: 'Location', value: 'Varies by workshop' },
            { label: 'Investment', value: 'From R100' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted rounded-xl p-5 border border-border">
              <p className="font-utility text-xs text-foreground/50 uppercase tracking-widest mb-1">{label}</p>
              <p className="font-display text-primary text-lg">{value}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-7 text-center">
          <div className="text-3xl text-accent mb-3">☽</div>
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
  );
}
