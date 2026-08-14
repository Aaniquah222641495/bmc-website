import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { PastWorkshopsGrid } from '@/components/class-page-blocks';

const PAST_WORKSHOPS = [
  {
    title: 'Ramadan Preparation',
    type: 'Online',
    description:
      'How to enter Ramadan spiritually and practically prepared: fasting rules, Taraweeh, Laylatul Qadr, Zakat, and more.',
    image: '/assets/photo-ramadan-preparation.webp',
    imageAlt: 'A bowl of dates beside an open Qur’an, prepared for Ramadan',
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
          <div className="islamic-pattern py-12 px-8 md:px-12">
            <h1 className="text-4xl md:text-5xl font-display text-white mb-4">Online Workshops & Short Courses</h1>
            <div className="w-20 h-1 bg-accent mb-6" />
            <p className="font-body text-lg leading-relaxed max-w-2xl text-bmc-cream">
              Focused, once-off online sessions on essential Islamic topics: practical, accessible, and designed to leave you with knowledge you can use straight away.
            </p>
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
            <div>
              {/* Hero image — spans the full width of the card */}
              <div className="relative w-full h-64 md:h-80 overflow-hidden">
                <img
                  src="/assets/photo-women-in-islam.webp"
                  alt="Women in an Islamic study circle"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white font-utility text-[0.65rem] uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Online Workshop
                </span>
              </div>

            <div className="p-8 md:p-12 text-white">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-3">Women in Islam</h2>
                  <p className="font-body text-lg leading-relaxed text-bmc-cream">
                    Join us for a beneficial morning exploring the role, value and identity of Muslim women through faith, family, spirituality and everyday life.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Format', value: 'Via Zoom' },
                  { label: 'Date', value: '29 August 2026' },
                  { label: 'Time', value: '09:00 – 11:30' },
                  { label: 'Investment', value: 'R100 per person' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/10 rounded-xl p-4">
                    <p className="font-utility text-xs uppercase tracking-widest mb-1 text-accent">{label}</p>
                    <p className="font-display text-white text-lg">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <p className="font-utility text-xs uppercase tracking-widest mb-3 text-accent">Topics Covered</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {[
                    'The spiritual role of women',
                    'Marriage & Motherhood',
                    'Modesty & Character',
                    'Rights of women in Islam',
                    'Balancing Dunya & Deen',
                    'Building a peaceful home',
                    'Self-worth & Identity',
                    'Women in Islamic history',
                  ].map((topic) => (
                    <li key={topic} className="font-body text-sm leading-relaxed flex items-start gap-2 text-bmc-cream">
                      <img src="/assets/bullet.webp" alt="" width={16} height={16} loading="lazy" decoding="async" className="flex-shrink-0 mt-1" />
                      {topic}
                    </li>
                  ))}
                </ul>
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

          <PastWorkshopsGrid workshops={PAST_WORKSHOPS} delayBase={0.3} gridClassName="md:grid-cols-2" />
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
              <h2 className="font-display text-2xl text-primary mb-2">In-Person Workshops</h2>
              <p className="font-body text-foreground/70 leading-relaxed mb-3">
                Interactive face-to-face workshops covering important Islamic topics, with opportunities for discussion, questions and practical learning.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-utility">
                <span className="bg-muted rounded-full px-4 py-1 text-primary border border-border">In-Person</span>
                <span className="bg-muted rounded-full px-4 py-1 text-primary border border-border">From R100</span>
              </div>
            </div>
            <Link href="/programmes/in-person-workshops">
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
