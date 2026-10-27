import { useId, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Seo } from '@/components/seo';
import { CATEGORIES } from '@/data/faq';
import { faqJsonLd } from '@/lib/structured-data';
import { CARD, ClosingBand, CONTAINER, PageHeader } from '@/components/page-shell';

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={`rounded-2xl transition-colors duration-300 ${open ? 'bg-bmc-paper' : 'hover:bg-bmc-paper/70'}`}>
      <h3>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={id}
          className="group flex min-h-14 w-full items-center justify-between gap-5 rounded-2xl px-5 py-4 text-left md:px-6"
        >
          <span className="font-display text-[1.05rem] font-medium leading-snug text-primary md:text-[1.2rem]">{q}</span>
          <span
            aria-hidden="true"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 motion-reduce:transition-none ${
              open ? 'rotate-180 bg-primary text-bmc-gold-light' : 'bg-bmc-gold-light/35 text-bmc-gold-ink group-hover:bg-bmc-gold-light/60'
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={id}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className={`px-5 pb-6 pr-16 leading-[1.75] text-foreground/85 md:px-6 md:pr-20 ${open ? '' : 'invisible'}`}>{a}</p>
        </div>
      </div>
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
      <PageHeader
        eyebrow="Need help?"
        title="Frequently Asked Questions"
        intro="Can't find your answer here? We're always happy to help."
      />

      <section className="bg-bmc-paper pb-28 pt-14 md:pb-40 md:pt-20">
        <div className={`${CONTAINER} mx-auto max-w-3xl space-y-10 md:space-y-14`}>
          {CATEGORIES.map((category) => {
            return (
              <div key={category.label} className={`bmc-reveal ${CARD} p-4 md:p-7`}>
                <h2 className="bmc-eyebrow !text-[0.78rem] px-5 pb-4 pt-4 md:px-6">{category.label}</h2>
                <div className="space-y-1.5">
                  {category.items.map((item, i) => (
                    <FaqItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ClosingBand
        title="Still have questions?"
        actions={
          <a
            href="https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20find%20out%20more%20about%20your%20programmes"
            target="_blank"
            rel="noreferrer"
            className="bmc-btn bmc-btn-light"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        }
      >
        We'd love to hear from you. Send us a message on WhatsApp and we'll get back to you as soon as possible.
      </ClosingBand>
    </>
  );
}
