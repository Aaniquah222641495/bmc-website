import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { SeedlingIcon } from '@/components/ornaments/story-path';
import { LaptopBookIcon } from '@/components/ornaments/steps-art';
import { Seo } from '@/components/seo';
import { CATEGORIES } from '@/data/faq';
import { faqJsonLd } from '@/lib/structured-data';
import { ClosingBand, CONTAINER, PageHeader } from '@/components/page-shell';

const WHATSAPP = "https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20find%20out%20more%20about%20your%20programmes";

/** A coin purse: payments and fees. Same 48-box line style as the other drawn icons. */
function PurseIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 20C9 17.8 10.8 16 13 16H35C37.2 16 39 17.8 39 20V36C39 38.2 37.2 40 35 40H13C10.8 40 9 38.2 9 36Z" />
      <path d="M17 16C17 11 20 8 24 8S31 11 31 16" />
      <path d="M39 25H32C30.3 25 29 26.3 29 28S30.3 31 32 31H39" />
      <circle cx="33" cy="28" r="1" fill="currentColor" />
    </svg>
  );
}

/** Each topic's icon says what the topic is about. */
const TOPIC_ICON: Record<string, (p: { size?: number }) => React.ReactElement> = {
  'Getting Started': SeedlingIcon,
  'Classes & Logistics': LaptopBookIcon,
  'Payments & Policies': PurseIcon,
};

const slug = (label: string) => label.toLowerCase().replace(/&/g, 'and').replace(/[^a-z]+/g, '-');

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={`rounded-2xl bg-card shadow-soft transition-shadow duration-300 ${open ? 'shadow-lift' : 'hover:shadow-lift'}`}>
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
        title="Frequently asked questions"
        intro="Can't find your answer here? We're always happy to help."
        art={<TopicCards />}
      >
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-primary">
          <SiWhatsapp className="size-[1.1rem]" aria-hidden="true" />
          Ask us on WhatsApp
        </a>
      </PageHeader>

      <section className="bg-bmc-paper pb-28 pt-16 md:pb-36 md:pt-24">
        <div className={`${CONTAINER} mx-auto max-w-6xl space-y-16 md:space-y-24`}>
          {CATEGORIES.map((category) => {
            const Icon = TOPIC_ICON[category.label];
            return (
              <div key={category.label} id={slug(category.label)} className="bmc-reveal grid scroll-mt-28 grid-cols-1 gap-6 lg:grid-cols-[0.7fr_2fr] lg:gap-14">
                <div className="lg:sticky lg:top-32 lg:self-start">
                  {Icon && (
                    <span className="mb-4 inline-flex size-14 items-center justify-center rounded-full bg-card text-primary shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.5)]">
                      <Icon size={28} />
                    </span>
                  )}
                  <h2 className="text-primary leading-[1.12]" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)' }}>{category.label}</h2>
                  <p className="mt-2 font-utility text-[0.85rem] text-foreground/65">{category.items.length} questions</p>
                </div>
                <div className="space-y-3">
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
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-light">
            <SiWhatsapp className="size-[1.1rem]" aria-hidden="true" />
            Chat on WhatsApp
          </a>
        }
      >
        We'd love to hear from you. Send us a message on WhatsApp and we'll get back to you as soon as possible.
      </ClosingBand>
    </>
  );
}

/** Hero art: the three topics as jump links, each with its own icon and question count. */
function TopicCards() {
  return (
    <nav aria-label="FAQ topics" className="mx-auto grid w-full max-w-md gap-3 lg:ml-auto">
      {CATEGORIES.map((c) => {
        const Icon = TOPIC_ICON[c.label];
        return (
          <a
            key={c.label}
            href={`#${slug(c.label)}`}
            className="group flex items-center gap-4 rounded-[1.25rem] bg-card p-4 pr-5 shadow-soft transition-shadow duration-300 hover:shadow-lift"
          >
            <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-bmc-paper text-primary">
              {Icon && <Icon size={30} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[1.2rem] leading-tight text-primary">{c.label}</span>
              <span className="mt-0.5 block font-utility text-[0.82rem] text-foreground/65">{c.items.length} questions</span>
            </span>
            <ChevronDown size={18} className="-rotate-90 text-bmc-gold-ink transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </a>
        );
      })}
    </nav>
  );
}
