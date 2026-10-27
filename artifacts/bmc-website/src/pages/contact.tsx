import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/seo';
import { contactJsonLd } from '@/lib/structured-data';
import { CARD, ClosingBand, CONTAINER, PageHeader, SECTION_Y } from '@/components/page-shell';


const CONTACTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.123 1.532 5.853L0 24l6.305-1.654A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.655-.516-5.167-1.416l-.371-.22-3.742.982.998-3.649-.24-.378A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
    label: 'WhatsApp',
    value: '068 649 8593',
    href: 'https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20find%20out%20more%20about%20your%20programmes',
    cta: 'Send a message',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    label: 'Instagram',
    value: '@beginners_classes',
    href: 'https://instagram.com/beginners_classes',
    cta: 'Follow us',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z"/>
      </svg>
    ),
    label: 'TikTok',
    value: '@rukeyabaradien_',
    href: 'https://tiktok.com/@rukeyabaradien_',
    cta: 'Watch videos',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: 'Website',
    value: 'beginnersmadrasah.co.za',
    href: 'https://beginnersmadrasah.co.za',
    cta: 'Visit site',
  },
];

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.123 1.532 5.853L0 24l6.305-1.654A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.655-.516-5.167-1.416l-.371-.22-3.742.982.998-3.649-.24-.378A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
);

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact & Enrolment Enquiries"
        description="Contact Beginners Madrasah Classes via WhatsApp, Instagram or TikTok — we're here to help you find the right programme and answer your questions."
        path="/contact"
        jsonLd={contactJsonLd()}
      />
      <PageHeader
        title="Get In Touch"
        intro="We'd love to hear from you. Reach out on any of the platforms below and we'll get back to you as soon as possible, InshaAllah."
      />

      <section className={`${SECTION_Y} bg-bmc-paper !pt-14 md:!pt-20`}>
        <div className={`${CONTAINER} mx-auto max-w-5xl`}>
          {/* Note */}
          <div className={`bmc-reveal ${CARD} mx-auto mb-14 max-w-2xl p-6 md:mb-20 md:p-8`}>
            <p className="font-utility leading-[1.7] text-foreground/85">
              <span className="font-bold text-bmc-gold-ink">Note:</span> For class registrations, please use the{' '}
              <Link href="/programmes" className="bmc-link-inline">Register</Link> button on the relevant class page.
            </p>
          </div>

          {/* Contact cards */}
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {CONTACTS.map((contact) => (
              <li key={contact.label} className="flex">
                <a
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`bmc-reveal bmc-lift group flex w-full items-start gap-5 p-7 transition-shadow duration-500 hover:shadow-lift md:p-9 ${CARD}`}
                >
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-bmc-gold-light shadow-soft"
                    aria-hidden="true"
                  >
                    {contact.icon}
                  </span>
                  <span className="block min-w-0">
                    <span className="bmc-eyebrow block !text-[0.68rem]">{contact.label}</span>
                    <span className="mb-3 mt-1.5 block break-words font-display text-[1.25rem] leading-snug text-primary">{contact.value}</span>
                    <span className="inline-flex items-center gap-1.5 font-utility text-sm font-bold text-bmc-gold-ink">
                      {contact.cta}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand
        title="Ready to start your journey?"
        actions={
          <a
            href="https://wa.me/27686498593?text=Slm%2C%20I%27d%20like%20to%20find%20out%20more%20about%20your%20programmes"
            target="_blank"
            rel="noreferrer"
            className="bmc-btn bmc-btn-light"
          >
            {WHATSAPP_ICON}
            Chat on WhatsApp
          </a>
        }
      >
        Send us a WhatsApp message and we'll guide you to the right programme for you.
      </ClosingBand>
    </>
  );
}
