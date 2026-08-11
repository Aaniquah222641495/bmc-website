import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    q: 'How do online classes work?',
    a: 'Classes are held live via Microsoft Teams or Google Classroom, depending on the programme. You will receive all access details before your first session. Some programmes also have pre-recorded lessons available on Google Classroom so you can learn at your own pace.',
  },
  {
    q: 'What platform are classes held on?',
    a: "Children's Online Madrasah and the Women's Hifdh Programme are held live via Microsoft Teams. The Women's Online Madrasah uses Google Classroom with pre-recorded lessons. The in-person Quran programme takes place every Saturday morning in Mitchell's Plain, Cape Town.",
  },
  {
    q: 'How do I pay for my class?',
    a: 'Payment details are provided upon registration. Please complete the registration form and Mualimah Rukeya will follow up with payment options. You can also contact us directly on WhatsApp for assistance.',
  },
  {
    q: 'What if I miss a session?',
    a: "We understand life gets busy. The Women's Online Madrasah has pre-recorded lessons you can access at any time. For live programmes, please contact Mualimah Rukeya directly and she will do her best to assist with missed session queries.",
  },
  {
    q: 'Are classes suitable for complete beginners?',
    a: 'Absolutely — that is exactly what we are here for. Our programmes are designed from the ground up for beginners. No prior knowledge of Arabic, Quran, or Islamic studies is required. You are welcome exactly as you are.',
  },
  {
    q: 'What is the refund policy?',
    a: 'Please reach out to us on WhatsApp if you have any concerns about your registration or payment. We handle each situation with care and understanding, and we will always try to find a solution that works for you.',
  },
  {
    q: "How do I join the Children's Classes?",
    a: "Register via the Children's Classes page. Once your registration is confirmed and the fee is paid, your child's spot is secured. You will receive the Microsoft Teams link and all class details before the first session.",
  },
  {
    q: 'I am a revert — where do I start?',
    a: "Welcome to Islam — may Allah make your journey beautiful. Our Women's Online Madrasah is an excellent starting point. It covers all the foundational knowledge a new Muslim needs, in a gentle, supportive, and completely judgement-free environment. Feel free to reach out on WhatsApp and we will guide you personally.",
  },
  {
    q: 'What do I need to get started?',
    a: "Just a stable internet connection, a device to join class on, and an open heart. We provide all learning materials. For the in-person Quran programme, you will need to be able to travel to Mitchell's Plain, Cape Town on Saturday mornings.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="border border-border rounded-2xl overflow-hidden bg-card"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left group"
      >
        <span className="font-display text-lg text-primary group-hover:text-accent transition-colors leading-snug">
          {q}
        </span>
        <span className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full border border-accent/40 flex items-center justify-center text-accent transition-all',
          open ? 'bg-accent text-primary rotate-180' : 'group-hover:border-accent'
        )}>
          <ChevronDown className="w-4 h-4" />
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
            <div className="px-7 pb-7 border-t border-border/50 pt-4">
              <p className="font-body text-foreground/80 leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src="/assets/deco-bismillah.png"
              alt="Bismillah"
              className="mx-auto mb-4 pointer-events-none select-none"
              style={{ width: 'clamp(130px, 16vw, 210px)', opacity: 0.9 }}
            />
            <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="font-body text-foreground/70 text-lg">
              Can't find your answer here? We're always happy to help.
            </p>
            <div className="flex justify-center mt-8" aria-hidden="true">
              <img
                src="/assets/deco-divider.png"
                alt=""
                className="pointer-events-none select-none"
                style={{ width: 'clamp(180px, 35vw, 320px)', opacity: 0.55 }}
              />
            </div>
          </motion.div>
        </div>

        {/* FAQ List */}
        <div className="relative">
          <img src="/assets/deco-window.png" alt="" aria-hidden="true"
            className="absolute top-1/2 left-1/2 pointer-events-none select-none"
            style={{ width: 'min(340px, 80vw)', opacity: 0.06, transform: 'translate(-50%, -50%)' }} />
          <div className="relative space-y-4">
            {FAQS.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
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
  );
}
