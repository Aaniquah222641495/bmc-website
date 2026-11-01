import { type ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { programmeByPath } from '@/data/programmes';
import { CLASS_BY_PATH, fetchOpenStatus, OWN_FORM_CLASSES, REGISTER_ENDPOINT, USE_OWN_FORMS } from '@/data/registration';
import { RegistrationForm } from '@/components/registration-form';
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
  /** "This is for you if": lines a visitor can recognise herself in. Only facts already on the site. */
  forYou?: string[];
  /** Questions people ask before registering, taken verbatim from the FAQ (faqByQuestion). */
  questions?: { q: string; a: string }[];
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
  /** @deprecated No longer shown (the "Ready to join" cards were folded into one line); kept so pages compile. */
  formNeeds?: string;
  showRegistration?: boolean;
  /** Hero action for pages without registration (e.g. ask about the next in-person workshop). */
  heroAction?: ReactNode;
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
  forYou,
  questions,
  quote,
  children,
  after,
  formUrl,
  showRegistration = true,
  heroAction,
}: ClassPageLayoutProps) {
  const FORM_URL = formUrl ?? DEFAULT_FORM_URL;
  // Our own form when the client's Apps Script is deployed (ADR-0031); otherwise the embedded Google Form.
  const classKey = CLASS_BY_PATH[path];
  const ownForm = Boolean(USE_OWN_FORMS && REGISTER_ENDPOINT && classKey && OWN_FORM_CLASSES.includes(classKey));
  // With our own form, her Google Form decides: open there means open here (so the waitlist email and
  // the page always agree). The CMS box is the fallback before the status arrives, or without the script.
  const [liveOpen, setLiveOpen] = useState<boolean | null>(null);
  useEffect(() => {
    if (!ownForm || !showRegistration) return;
    let live = true;
    fetchOpenStatus().then((open) => {
      if (live && open && classKey && typeof open[classKey] === 'boolean') setLiveOpen(open[classKey] as boolean);
    });
    return () => {
      live = false;
    };
  }, [ownForm, showRegistration, classKey]);
  const cmsClosed = programmeByPath(path)?.registrationClosed === true;
  const closed = showRegistration && (liveOpen === null ? cmsClosed : !liveOpen);
  const WAITLIST = `https://wa.me/27686498593?text=${encodeURIComponent(`Slm, please let me know when registration for ${title} opens`)}`;
  const waitlistButton = (cls: string) =>
    ownForm ? (
      // Own form: jump to the "Tell me when it opens" form at the foot of the page.
      <button type="button" onClick={openForm} className={cls}>
        Tell me when it opens <ArrowRight size={16} aria-hidden="true" />
      </button>
    ) : (
      <a href={WAITLIST} target="_blank" rel="noreferrer" className={cls}>
        <SiWhatsapp className="size-[1.05rem]" aria-hidden="true" /> Tell me when it opens
      </a>
    );
  const [formOpen, setFormOpen] = useState(false);

  const openForm = () => {
    setFormOpen(true);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('register')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (ownForm) window.setTimeout(() => document.querySelector<HTMLElement>('#register form input:not([tabindex="-1"])')?.focus({ preventScroll: true }), reduce ? 0 : 600);
  };

  // The last doubts, answered in the FAQ's own words, right where the decision is made.
  const questionList =
    questions && questions.length > 0 ? (
      <div className="mx-auto mb-10 max-w-3xl text-left">
        <h3 className="mb-4 text-center font-display text-[1.3rem] text-primary">Before you register</h3>
        <div className="space-y-3">
          {questions.map(({ q, a }) => (
            <details key={q} className="group rounded-2xl bg-card shadow-soft [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display text-[1.08rem] leading-snug text-primary">
                {q}
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-bmc-gold-light/70 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true">
                  <ChevronDown size={16} />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-[1.75] text-foreground/85">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-4 text-center font-utility text-sm text-foreground/75">
          More answers on the <Link href="/faq" className="bmc-link-inline">FAQ page</Link>.
        </p>
      </div>
    ) : null;

  return (
    <>
      <ProgrammeHero
        path={path}
        title={title}
        intro={description}
        actions={
          closed ? (
            waitlistButton('bmc-btn bmc-btn-light')
          ) : showRegistration ? (
            <button type="button" onClick={openForm} className="bmc-btn bmc-btn-light">
              Register now <ArrowRight size={16} aria-hidden="true" />
            </button>
          ) : (
            heroAction
          )
        }
      />

      <section className={`${SECTION_Y} bg-bmc-paper !pt-16 md:!pt-24`}>
        <div className={`${CONTAINER} grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16 xl:grid-cols-[1fr_23rem]`}>
          <div className="space-y-10 md:space-y-12">
            {/* Self-identification first: a nervous beginner looks for "people like me" before reading details. */}
            {forYou && forYou.length > 0 && (
              <div className="rounded-[1.5rem] bg-card p-7 shadow-soft md:p-9">
                <h2 className="mb-5 text-[1.6rem] leading-tight text-primary md:text-[1.9rem]">This is for you if</h2>
                <ul className="space-y-3.5">
                  {forYou.map((line) => (
                    <li key={line} className="flex items-start gap-3.5 text-[1.05rem] leading-[1.6] text-foreground/85">
                      <span className="mt-[0.2rem] inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-bmc-gold-light text-primary" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5 19 7" /></svg>
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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

          {/* On phones the facts come straight after the header (price, when, who), not four screens down. */}
          <aside className="order-first rounded-[1.5rem] bg-bmc-gold-light/45 p-7 lg:order-none shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.35)] md:p-9 lg:sticky lg:top-28" aria-label="Programme details">
            <DetailsGrid items={details} />
            {closed && (
              <>
                <p className="mt-9 rounded-xl bg-bmc-paper/80 px-4 py-3 font-utility text-[0.92rem] leading-[1.5] text-primary">
                  <strong>Registration is closed for now.</strong> We'll let you know when it opens again.
                </p>
                {waitlistButton('bmc-btn bmc-btn-primary mt-4 hidden w-full lg:inline-flex')}
              </>
            )}
            {showRegistration && !closed && (
              // Phones already have the Register button in the header right above this card.
              <button type="button" onClick={openForm} className="bmc-btn bmc-btn-primary mt-9 hidden w-full lg:inline-flex">
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
                <span className="bmc-eyebrow block !text-[0.74rem]">Your teacher</span>
                <span className="mt-0.5 block font-display text-[1.1rem] leading-snug text-primary">Mualimah Rukeya</span>
                <Link href="/about" className="bmc-link-inline font-utility text-[0.85rem]">Read her story</Link>
              </span>
            </div>
          </aside>
        </div>
      </section>

      {after}

      {closed && (
        <section id="register" className={`${SECTION_Y} scroll-mt-20 bg-[hsl(var(--bmc-gold-light)/0.35)]`}>
          <div className={`${CONTAINER} mx-auto max-w-3xl text-center`}>
            <RegisterArt className="mx-auto mb-4 block h-auto w-48 md:w-56" />
            <h2 className={`mb-3 ${H2}`} style={H2_STYLE}>Be the first to know when it opens</h2>
            <p className="mx-auto mb-8 max-w-md leading-[1.7] text-foreground/80">
              {ownForm
                ? "This class isn't taking new students right now. Leave your details and we'll email you as soon as registration opens, InshaAllah."
                : "This class isn't taking new students right now. Send us a WhatsApp and we'll tell you as soon as registration opens, InshaAllah."}
            </p>
            {ownForm && classKey ? (
              <div className="mx-auto max-w-2xl">
                <RegistrationForm classKey={classKey} title={title} source={path.slice(1)} mode="waitlist" />
              </div>
            ) : (
              waitlistButton('bmc-btn bmc-btn-primary')
            )}
            <div className="mt-14">{questionList}</div>
          </div>
        </section>
      )}

      {showRegistration && !closed && (
        <section id="register" className={`${SECTION_Y} scroll-mt-20 bg-[hsl(var(--bmc-gold-light)/0.35)]`}>
          <div className={`${CONTAINER} mx-auto max-w-4xl text-center`}>
            <RegisterArt className="mx-auto mb-4 block h-auto w-48 md:w-56" />
            <h2 className={`mb-3 ${H2}`} style={H2_STYLE}>Ready to join?</h2>
            <p className="mx-auto mb-10 max-w-lg leading-[1.7] text-foreground/80">
              {ownForm
                ? "One short form, a few minutes. As soon as it's sent you'll see how to pay, and Mualimah Rukeya will be in touch with the next steps."
                : "One short form, a few minutes. We'll be in touch once it comes through, and fees and how to pay are explained in the form."}
            </p>

            {questionList}

            {ownForm && classKey && <RegistrationForm classKey={classKey} title={title} source={path.slice(1)} />}

            {!ownForm && !formOpen && (
              <button type="button" onClick={() => setFormOpen(true)} className="bmc-btn bmc-btn-primary">
                Register now <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}

            <AnimatePresence initial={false}>
              {!ownForm && formOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden text-left"
                >
                  <div className="p-1">
                    <div className={`${CARD} overflow-hidden`}>
                      <div className="flex flex-col gap-1 bg-bmc-paper px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <p className="font-utility text-sm tracking-wide text-foreground/80">
                          Complete the form below to register for <strong className="text-primary">{title}</strong>
                        </p>
                        <span className="flex shrink-0 items-center gap-4">
                          {/* Fallback: sign-in or cookie walls do not work inside an embedded form, but do in a full tab. */}
                          <a href={FORM_URL} target="_blank" rel="noreferrer" className="bmc-link-inline inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap font-utility text-sm">
                            Open in new tab <ExternalLink size={14} aria-hidden="true" />
                          </a>
                          <button type="button" onClick={() => setFormOpen(false)} className="bmc-link-inline inline-flex min-h-11 items-center whitespace-nowrap font-utility text-sm">
                            Hide form
                          </button>
                        </span>
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
