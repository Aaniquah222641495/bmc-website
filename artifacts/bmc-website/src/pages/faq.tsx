import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { IconTile, LaptopClassIcon, PurseIcon, SeedlingIcon } from '@/components/ornaments/cute-icons';
import { Seo } from '@/components/seo';
import { CATEGORIES } from '@/data/faq';
import { faqJsonLd } from '@/lib/structured-data';
import { ClosingBand, CONTAINER, PageHeader } from '@/components/page-shell';

const WHATSAPP = "https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20find%20out%20more%20about%20your%20programmes";

/** Each topic's icon says what the topic is about. */
const TOPIC_ICON: Record<string, typeof SeedlingIcon> = {
  'Getting started': SeedlingIcon,
  'Classes and logistics': LaptopClassIcon,
  'Payments and policies': PurseIcon,
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
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-light">
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
                    <span className="mb-4 block"><IconTile Icon={Icon} size="lg" /></span>
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
            {Icon && <IconTile Icon={Icon} />}
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
