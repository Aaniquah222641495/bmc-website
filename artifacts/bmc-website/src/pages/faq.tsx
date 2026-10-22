import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Seo } from '@/components/seo';
import { CATEGORIES } from '@/data/faq';
import { faqJsonLd } from '@/lib/structured-data';


function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-display text-base md:text-lg text-primary group-hover:text-accent transition-colors leading-snug">
          {q}
        </span>
        <span className={cn(
          'flex-shrink-0 w-7 h-7 rounded-full border border-accent/40 flex items-center justify-center text-accent transition-all',
          open ? 'bg-accent text-primary rotate-180' : 'group-hover:border-accent'
        )}>
          <ChevronDown className="w-3.5 h-3.5" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-body text-foreground/75 leading-relaxed pb-5 pr-11">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to common questions about getting started, class platforms, schedules, payments and policies at Beginners Madrasah Classes, online and in-person."
        path="/faq"
        jsonLd={faqJsonLd()}
      />
      <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">

      {/* Hanging lanterns — bleeds off the right edge, alongside the cards */}
      <motion.img
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        src="/assets/faq-lanterns.webp"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute top-16 right-0 xl:right-6 w-80 xl:w-[26rem] pointer-events-none select-none"
      />

      <div className="container mx-auto px-4 max-w-3xl relative">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-utility text-xs text-accent uppercase tracking-widest mb-3">Need help?</p>
            <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="font-body text-foreground/70 text-lg">
              Can't find your answer here? We're always happy to help.
            </p>
          </motion.div>
        </div>

        {/* FAQ Categories */}
        <div className="relative space-y-8">
          {CATEGORIES.map((category, ci) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08 }}
              className="relative bg-card border border-border rounded-2xl shadow-sm px-7 md:px-8 py-2"
            >
              <div className="flex items-center gap-3 pt-5 pb-1">
                <img src="/assets/bullet.webp" alt="" width={16} height={16} loading="lazy" decoding="async" className="flex-shrink-0" />
                <h2 className="font-utility text-xs text-accent uppercase tracking-widest font-bold">
                  {category.label}
                </h2>
              </div>
              <div>
                {category.items.map((item, i) => (
                  <FaqItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-primary rounded-2xl p-10 text-white"
        >
          <div className="text-3xl text-accent mb-4">★</div>
          <h2 className="font-display text-2xl mb-3">Still have questions?</h2>
          <p className="font-body text-white/80 mb-6">
            We'd love to hear from you. Send us a message on WhatsApp and we'll get back to you as soon as possible.
          </p>
          <a
            href="https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20find%20out%20more%20about%20your%20programmes"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-primary font-utility font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
      </div>
    </>
  );
}
