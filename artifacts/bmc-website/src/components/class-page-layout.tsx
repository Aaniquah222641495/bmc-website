import { type ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Clock, ClipboardList, MessageCircleHeart } from 'lucide-react';
import { DetailsGrid, IncludedList, type DetailItem } from '@/components/class-page-blocks';
import { CARD, CONTAINER, H2, H2_STYLE, SECTION_Y } from '@/components/page-shell';
import { ProgrammeHero } from '@/components/programme-hero';
import { RegisterArt } from '@/components/ornaments/steps-art';

export interface ClassPageLayoutProps {
  title: string;
  description: string;
  /** Programme path as in content/settings/programmes.json (e.g. "/womens-classes"). Gives the header its tag. */
  path: string;
  /** The introductory paragraphs. */
  intro: ReactNode;
  included: string[];
  includedHeading?: string;
  /** Who it's for, when, where and how much. */
  details: DetailItem[];
  /** A verbatim student quote for this class (peer proof). Only use quotes the client gave for this class. */
  quote?: { text: string; name: string };
  /** Extra blocks in the main column (e.g. a note for parents). */
  children?: ReactNode;
  /** Full-width sections after the main block (e.g. previous workshops). */
  after?: ReactNode;
  /** @deprecated The hero now uses the programme's drawn scene; kept so existing pages still compile. */
  heroImage?: string;
  heroImageAlt?: string;
  formUrl?: string; // per-class registration form URL
  /** What the visitor should have ready, matching the questions in this class's Google Form. Keep in step with the form. */
  formNeeds?: string;
  showRegistration?: boolean;
}

const DEFAULT_FORM_URL = 'https://forms.gle/7tFCxqL8Ypgv9Jps5';

export function ClassPageLayout({
  title,
  description,
  path,
  intro,
  included,
  includedHeading,
  details,
  quote,
  children,
  after,
  formUrl,
  formNeeds = 'Your name and contact details.',
  showRegistration = true,
}: ClassPageLayoutProps) {
  const FORM_URL = formUrl ?? DEFAULT_FORM_URL;
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => {
    setFormOpen(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('register')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <ProgrammeHero
        path={path}
        title={title}
        intro={description}
        actions={
          showRegistration ? (
            <button type="button" onClick={openForm} className="bmc-btn bmc-btn-light">
              Register now <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : undefined
        }
      />

      <section className={`${SECTION_Y} bg-bmc-paper !pt-16 md:!pt-24`}>
        <div className={`${CONTAINER} grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16 xl:grid-cols-[1fr_23rem]`}>
          <div className="space-y-10 md:space-y-12">
            <div className="max-w-[60ch] space-y-5 text-[1.1rem] leading-[1.75] text-foreground/85">{intro}</div>
            <IncludedList items={included} heading={includedHeading} />
            {quote && (
              <figure className="rounded-[1.5rem] bg-primary p-7 text-primary-foreground shadow-soft md:p-9">
                <blockquote className="font-display text-[1.2rem] italic leading-[1.6] md:text-[1.3rem]">"{quote.text}"</blockquote>
                <figcaption className="bmc-eyebrow on-dark mt-5">{quote.name}</figcaption>
              </figure>
            )}
            {children}
          </div>

          <aside className="rounded-[1.5rem] bg-bmc-gold-light/45 p-7 shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.35)] md:p-9 lg:sticky lg:top-28" aria-label="Programme details">
            <DetailsGrid items={details} />
            {showRegistration && (
              <button type="button" onClick={openForm} className="bmc-btn bmc-btn-primary mt-9 w-full">
                Register now <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}
            {/* Who teaches: Mualimah Rukeya teaches every class (founder, 2026-10-28). A known face lowers the beginner's fear. */}
            <div className="mt-8 flex items-center gap-4 rounded-[1.1rem] bg-bmc-paper/80 p-4">
              <span className="block size-16 shrink-0 overflow-hidden rounded-[0.9rem]">
                <img
                  src="/assets/photo-founder-teaching.webp"
                  alt="Mualimah Rukeya"
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full scale-[2.4] object-cover"
                  style={{ objectPosition: '50% 40%', transformOrigin: '80% 42%' }}
                />
              </span>
              <span className="min-w-0">
                <span className="bmc-eyebrow block !text-[0.66rem]">Your teacher</span>
                <span className="mt-0.5 block font-display text-[1.1rem] leading-snug text-primary">Mualimah Rukeya</span>
                <Link href="/about" className="bmc-link-inline font-utility text-[0.85rem]">Read her story</Link>
              </span>
            </div>
          </aside>
        </div>
      </section>

      {after}

      {showRegistration && (
        <section id="register" className={`${SECTION_Y} scroll-mt-20 bg-[hsl(var(--bmc-gold-light)/0.35)]`}>
          <div className={`${CONTAINER} mx-auto max-w-4xl text-center`}>
            <RegisterArt className="mx-auto mb-4 block h-auto w-48 md:w-56" />
            <h2 className={`mb-3 ${H2}`} style={H2_STYLE}>Ready to join?</h2>
            <p className="mx-auto mb-10 max-w-md leading-[1.7] text-foreground/80">Here is what to expect before you start.</p>

            {/* Before you start: tell a nervous beginner how long it takes, what to have ready and what happens next. */}
            <ul className="mx-auto mb-10 grid max-w-3xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
              {[
                { Icon: Clock, title: 'Takes a few minutes', text: 'One short form, on this page.' },
                { Icon: ClipboardList, title: 'Have ready', text: formNeeds },
                { Icon: MessageCircleHeart, title: 'What happens next', text: "We'll be in touch once your form comes through. Fees and how to pay are explained in the form." },
              ].map(({ Icon, title: t, text }) => (
                <li key={t} className="flex gap-3.5 rounded-[1.1rem] bg-bmc-paper p-5 shadow-soft">
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-bmc-gold-light" aria-hidden="true">
                    <Icon size={19} strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="block font-display text-[1.08rem] leading-snug text-primary">{t}</span>
                    <span className="mt-1 block text-[0.92rem] leading-[1.6] text-foreground/80">{text}</span>
                  </span>
                </li>
              ))}
            </ul>

            {!formOpen && (
              <button type="button" onClick={() => setFormOpen(true)} className="bmc-btn bmc-btn-primary">
                Register now <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}

            <AnimatePresence initial={false}>
              {formOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden text-left"
                >
                  <div className="p-1">
                    <div className={`${CARD} overflow-hidden`}>
                      <div className="flex items-center justify-between gap-4 bg-bmc-paper px-6 py-3">
                        <p className="font-utility text-sm tracking-wide text-foreground/80">
                          Complete the form below to register for <strong className="text-primary">{title}</strong>
                        </p>
                        <button type="button" onClick={() => setFormOpen(false)} className="bmc-link-inline inline-flex min-h-11 items-center whitespace-nowrap font-utility text-sm">
                          Hide form
                        </button>
                      </div>
                      <iframe
                        src={`${FORM_URL}?embedded=true`}
                        width="100%"
                        height="800"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title={`Registration form for ${title}`}
                        className="block w-full bg-white"
                      >
                        Loading registration form…
                      </iframe>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-8 font-utility text-sm text-foreground/75">
              Having trouble? Contact us on{' '}
              <a
                href={`https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20register%20for%20${encodeURIComponent(title)}`}
                target="_blank"
                rel="noreferrer"
                className="bmc-link-inline"
              >
                WhatsApp
              </a>
              {' '}and we will assist you.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
