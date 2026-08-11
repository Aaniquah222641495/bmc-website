import { ClassPageLayout } from '@/components/class-page-layout';
import { motion } from 'framer-motion';

const INCLUDED = [
  'The Shahadah and its meaning — what it means to be Muslim',
  'Wudhu (purification) — step by step, with confidence',
  'Salah (prayer) — how to pray correctly from scratch',
  'Essential duas for morning, evening, and daily life',
  'Basic Aqaaid — the pillars of Islamic belief',
  'Gentle guidance through your questions and concerns',
  'A safe, completely judgement-free learning environment',
];

export default function RevertClasses() {
  return (
    <ClassPageLayout
      title="Revert Classes"
      description="A gentle, safe, and judgement-free introduction to Islam for those who are new to the faith."
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
            Welcome to Islam — may Allah make your journey beautiful. Our Revert Classes are designed specifically for those who are new to the faith and need a gentle, structured introduction to Islamic practice.
          </p>
          <p className="font-body text-lg text-foreground/80 leading-relaxed">
            There is no prior knowledge required and no questions are too basic. This is your safe space to learn, ask, and grow at your own pace. Mualimah Rukeya will personally guide you with warmth and care.
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
            { label: 'Format', value: 'Online' },
            { label: 'Who it\'s for', value: 'New Muslims & Reverts' },
            { label: 'Pace', value: 'Flexible — go at your own pace' },
            { label: 'Investment', value: 'Included in Women\'s Online Madrasah (R150/month)' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted rounded-xl p-5 border border-border">
              <p className="font-utility text-xs text-foreground/50 uppercase tracking-widest mb-1">{label}</p>
              <p className="font-display text-primary text-lg">{value}</p>
            </div>
          ))}
        </div>

        {/* Warm note */}
        <div className="bg-accent/10 border border-accent/30 rounded-2xl p-7 text-center">
          <div className="text-3xl text-accent mb-3">☽</div>
          <p className="font-body text-foreground/80 italic leading-relaxed max-w-lg mx-auto">
            "Whether you took your Shahadah yesterday or years ago, you are welcome here exactly as you are. There is no rush. There is no judgement. Just learning, one step at a time."
          </p>
          <p className="font-utility text-sm text-primary/60 mt-3">— Mualimah Rukeya</p>
        </div>
      </motion.div>
    </ClassPageLayout>
  );
}
