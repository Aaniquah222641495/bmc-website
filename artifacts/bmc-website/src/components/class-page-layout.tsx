import { type ReactNode } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

interface ClassPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  illustration?: string; // optional hero image shown in the header instead of the marble arch
}

const FORM_URL = 'https://forms.gle/7tFCxqL8Ypgv9Jps5';

export function ClassPageLayout({ title, description, children, illustration }: ClassPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      <img src="/assets/deco-corner.png" alt="" aria-hidden="true" className="absolute top-0 left-0 pointer-events-none select-none" style={{ width: 'clamp(120px, 14vw, 220px)', opacity: 0.4 }} />
      <img src="/assets/deco-corner.png" alt="" aria-hidden="true" className="absolute bottom-0 right-0 pointer-events-none select-none" style={{ width: 'clamp(120px, 14vw, 220px)', opacity: 0.4, transform: 'rotate(180deg)' }} />
      <img src="/assets/deco-lanterns.png" alt="" aria-hidden="true" className="absolute top-0 left-1/2 pointer-events-none select-none" style={{ width: 'clamp(120px, 14vw, 200px)', opacity: 0.5, transform: 'translateX(-50%)' }} />
      <div className="container mx-auto px-4 max-w-4xl">
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
          {/* Header — marble arch for standard pages, split layout when illustration provided */}
          <div className="islamic-pattern relative overflow-hidden">
            {illustration ? (
              <div className="flex flex-col md:flex-row items-center gap-0">
                <div className="flex-1 py-12 px-8 text-center md:text-left relative z-10">
                  <h1 className="text-4xl md:text-5xl font-display mb-4 text-white">{title}</h1>
                  <p className="text-lg font-body" style={{ color: '#F5F0E8' }}>{description}</p>
                </div>
                <div className="w-full md:w-64 lg:w-72 flex-shrink-0 flex items-end justify-center px-4 pt-2 md:pt-0 max-h-56 md:max-h-none overflow-hidden">
                  <img
                    src={illustration}
                    alt=""
                    aria-hidden="true"
                    className="w-full max-w-[200px] md:max-w-full h-auto object-contain object-bottom drop-shadow-xl"
                    draggable={false}
                  />
                </div>
              </div>
            ) : (
              <div className="py-12 px-8 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-display mb-4 text-white">{title}</h1>
                <p className="text-lg md:text-xl font-body max-w-2xl mx-auto" style={{ color: '#F5F0E8' }}>{description}</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {children}

            {/* Registration Section */}
            <div className="mt-16">
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px bg-accent flex-1 max-w-[100px]" />
                <span className="font-display text-primary text-xl tracking-widest uppercase">Register Below</span>
                <div className="h-px bg-accent flex-1 max-w-[100px]" />
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-accent/30 shadow-lg">
                <div className="bg-primary/5 py-4 px-6 border-b border-accent/20 text-center">
                  <p className="font-utility text-sm text-primary/70 tracking-wide">
                    Complete the form below to register for <strong className="text-primary">{title}</strong>
                  </p>
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
