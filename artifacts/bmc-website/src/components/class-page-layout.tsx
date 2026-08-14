import { type ReactNode, useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export interface ClassPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  heroImage?: string;
  formUrl?: string; // per-class registration form URL
  showRegistration?: boolean;
}

const DEFAULT_FORM_URL = 'https://forms.gle/7tFCxqL8Ypgv9Jps5';

export function ClassPageLayout({ title, description, children, heroImage, formUrl, showRegistration = true }: ClassPageLayoutProps) {
  const FORM_URL = formUrl ?? DEFAULT_FORM_URL;
  const [formOpen, setFormOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Link href="/programmes">
            <span className="text-primary hover:text-accent font-utility text-sm inline-flex items-center gap-2 cursor-pointer transition-colors">
              &larr; Back to Programmes
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
        >
          {/* Header — marble arch pattern for standard pages, full-bleed photo when heroImage is provided */}
          <div className="islamic-pattern relative overflow-hidden">
            {heroImage && (
              <>
                <img
                  src={heroImage}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/50" />
              </>
            )}
            <div className={`text-center relative z-10 px-8 ${heroImage ? 'py-16' : 'py-12'}`}>
              <h1 className="text-4xl md:text-5xl font-display mb-4 text-white">{title}</h1>
              <p className="text-lg md:text-xl font-body max-w-2xl mx-auto text-bmc-cream">{description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {children}

            {/* Registration Section */}
            {showRegistration && (
              <div className="mt-16">
                <div className="flex items-center justify-center gap-4 mb-10">
                  <div className="h-px bg-accent flex-1 max-w-[100px]" />
                  <span className="font-display text-primary text-xl tracking-widest uppercase">Register Below</span>
                  <div className="h-px bg-accent flex-1 max-w-[100px]" />
                </div>

                {!formOpen && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setFormOpen(true)}
                      className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-utility font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      Register Now &rarr;
                    </button>
                  </div>
                )}

                <AnimatePresence initial={false}>
                  {formOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-2xl overflow-hidden border-2 border-accent/30 shadow-lg">
                        <div className="bg-primary/5 py-4 px-6 border-b border-accent/20 flex items-center justify-between gap-4">
                          <p className="font-utility text-sm text-primary/70 tracking-wide">
                            Complete the form below to register for <strong className="text-primary">{title}</strong>
                          </p>
                          <button
                            type="button"
                            onClick={() => setFormOpen(false)}
                            className="font-utility text-sm text-primary/70 hover:text-primary underline whitespace-nowrap"
                          >
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
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-center text-sm font-utility text-foreground/50 mt-4">
                  Having trouble? Contact us on{' '}
                  <a
                    href={`https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20register%20for%20${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline hover:text-accent transition-colors"
                  >
                    WhatsApp
                  </a>
                  {' '}and we will assist you.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
