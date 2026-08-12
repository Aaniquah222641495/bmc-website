import { Link } from 'wouter';
import { motion } from 'framer-motion';

const PAST_WORKSHOPS = [
  {
    title: 'Women in Islam',
    type: 'Online',
    description:
      'An empowering exploration of the role, rights, and honour of women in Islam — grounded in Quran and Sunnah.',
  },
  {
    title: 'Wudhu & Ghusl',
    type: 'Online & In-Person',
    description:
      'A practical, step-by-step guide to ritual purification — covering common mistakes and frequently asked questions.',
  },
  {
    title: 'The Complete Guide to Salaah',
    type: 'Online',
    description:
      'A comprehensive breakdown of the daily prayer — its conditions, pillars, obligations, and the common errors to avoid.',
  },
  {
    title: 'Ramadan Preparation',
    type: 'Online',
    description:
      'How to enter Ramadan spiritually and practically prepared — fasting rules, Taraweeh, Laylatul Qadr, Zakat, and more.',
  },
];

export default function Workshops() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Back link */}
        <div className="mb-8">
          <Link href="/programmes">
            <span className="text-primary hover:text-accent font-utility text-sm inline-flex items-center gap-2 cursor-pointer transition-colors">
              &larr; Back to Programmes
            </span>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bg-card rounded-2xl overflow-hidden border border-border shadow-xl"
        >
          <div className="islamic-pattern flex flex-col md:flex-row items-center">
            {/* Text */}
            <div className="flex-1 py-12 px-8 md:px-12">
              <div className="text-3xl text-accent mb-4">☽</div>
              <h1 className="text-4xl md:text-5xl font-display text-white mb-4">Online Workshops & Short Courses</h1>
              <div className="w-20 h-1 bg-accent mb-6" />
              <p className="font-body text-lg leading-relaxed" style={{ color: '#F5F0E8' }}>
                Focused, once-off online sessions on essential Islamic topics — practical, accessible, and designed to leave you with knowledge you can use straight away.
              </p>
            </div>
            {/* Illustration */}
            <div className="w-full md:w-80 flex-shrink-0">
              <img
                src="/assets/workshops-illustration.png"
                alt="Women in an Islamic study circle"
                className="w-full h-64 md:h-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>

        {/* Currently Available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-accent flex-1" />
            <span className="font-utility text-sm text-accent uppercase tracking-widest font-bold whitespace-nowrap">Available Now</span>
            <div className="h-px bg-accent flex-1" />
          </div>

          <div className="bg-primary rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 text-white">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
                <div>
                  <span className="inline-block bg-accent text-primary font-utility text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                    Online Workshop
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-3">Women in Islam</h2>
                  <p className="font-body text-lg leading-relaxed" style={{ color: '#F5F0E8' }}>
                    An empowering exploration of the role, rights, and honour of women in Islam — grounded in Quran and Sunnah. Discover what Allah and His Messenger truly said about Muslim women, and leave feeling seen, valued, and inspired.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Format', value: 'Online' },
                  { label: 'Duration', value: 'Once-off session' },
                  { label: 'Investment', value: 'From R100' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/10 rounded-xl p-4">
                    <p className="font-utility text-xs uppercase tracking-widest mb-1" style={{ color: '#C9A84C' }}>{label}</p>
                    <p className="font-display text-white text-lg">{value}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://forms.gle/GX8ZQRMdNRKJq7T89"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-utility font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Register Now &rarr;
              </a>
            </div>
          </div>
        </motion.div>

        {/* Past Workshops */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-border flex-1" />
            <span className="font-utility text-sm text-foreground/50 uppercase tracking-widest whitespace-nowrap">Previous Workshops</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <p className="font-body text-foreground/60 text-center mb-8">
            These workshops have been run before and may return in future. Follow us to be notified when they open again.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {PAST_WORKSHOPS.map((workshop, i) => (
              <motion.div
                key={workshop.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-7 relative overflow-hidden group"
              >
                {/* Subtle past indicator */}
                <div className="absolute top-4 right-4">
                  <span className="font-utility text-xs text-foreground/30 uppercase tracking-widest border border-border rounded-full px-3 py-1">
                    Past
                  </span>
                </div>

                <div className="text-accent text-xl mb-3">☽</div>
                <h3 className="font-display text-xl text-primary mb-2">{workshop.title}</h3>
                <p className="font-utility text-xs text-foreground/50 uppercase tracking-widest mb-3">{workshop.type}</p>
                <p className="font-body text-foreground/70 text-sm leading-relaxed">{workshop.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* In-Person Workshops */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px bg-accent flex-1" />
            <span className="font-utility text-sm text-accent uppercase tracking-widest font-bold whitespace-nowrap">Also Available</span>
            <div className="h-px bg-accent flex-1" />
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="text-accent text-2xl mb-3">☽</div>
              <h2 className="font-display text-2xl text-primary mb-2">In-Person Workshops</h2>
              <p className="font-body text-foreground/70 leading-relaxed mb-3">
                Interactive face-to-face workshops covering important Islamic topics, with opportunities for discussion, questions and practical learning.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-utility">
                <span className="bg-muted rounded-full px-4 py-1 text-primary border border-border">In-Person</span>
                <span className="bg-muted rounded-full px-4 py-1 text-primary border border-border">From R100</span>
              </div>
            </div>
            <Link href="/programmes/revert-classes">
              <span className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white font-utility font-bold px-6 py-3 rounded-full transition-all cursor-pointer whitespace-nowrap">
                View In-Person &rarr;
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Stay Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-muted rounded-2xl p-10 border border-border"
        >
          <div className="text-3xl text-accent mb-4">★</div>
          <h2 className="font-display text-2xl text-primary mb-3">Stay Updated</h2>
          <p className="font-body text-foreground/70 mb-6 max-w-md mx-auto">
            New workshop dates are announced on Instagram and TikTok. Follow along so you don't miss the next one.
          </p>
          <div className="flex justify-center gap-6 flex-wrap mb-6">
            <a
              href="https://instagram.com/beginners_classes"
              target="_blank"
              rel="noreferrer"
              className="font-utility font-bold text-primary hover:text-accent transition-colors underline"
            >
              @beginners_classes
            </a>
            <a
              href="https://tiktok.com/@rukeyabaradien_"
              target="_blank"
              rel="noreferrer"
              className="font-utility font-bold text-primary hover:text-accent transition-colors underline"
            >
              @rukeyabaradien_
            </a>
          </div>
          <p className="font-body text-sm text-foreground/50">
            Or send us a{' '}
            <a
              href="https://wa.me/27686498593?text=Slm%2C%20please%20let%20me%20know%20about%20upcoming%20workshops"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline hover:text-accent transition-colors"
            >
              WhatsApp message
            </a>
            {' '}to be added to the notification list.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
