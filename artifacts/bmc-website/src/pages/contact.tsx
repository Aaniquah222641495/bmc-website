import { Link } from 'wouter';
import { ArrowRight, SendHorizontal } from 'lucide-react';
import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si';
import { Seo } from '@/components/seo';
import { contactJsonLd } from '@/lib/structured-data';
import { CARD, ClosingBand, CONTAINER, PageHeader, SECTION_Y } from '@/components/page-shell';

const PREFILL = "Slm, I'd like to find out more about your programmes";
const WHATSAPP = `https://wa.me/27686498593?text=${encodeURIComponent(PREFILL)}`;

const SOCIALS = [
  { Icon: SiInstagram, label: 'Instagram', value: '@beginners_classes', href: 'https://instagram.com/beginners_classes', cta: 'Follow us' },
  { Icon: SiTiktok, label: 'TikTok', value: '@rukeyabaradien_', href: 'https://tiktok.com/@rukeyabaradien_', cta: 'Watch videos' },
];

/** Hero art: a WhatsApp chat preview showing exactly what opens when you tap. */
function ChatCard() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Send us a WhatsApp message on 068 649 8593"
      className="group mx-auto block w-full max-w-md overflow-hidden rounded-[1.75rem] bg-card shadow-lift ring-1 ring-[hsl(var(--bmc-gold)/0.35)] lg:ml-auto"
    >
      <div className="flex items-center gap-3 bg-primary px-5 py-4 text-primary-foreground">
        <span className="inline-flex size-11 items-center justify-center overflow-hidden rounded-full bg-bmc-paper">
          <img src="/assets/mascot-figures-sm.webp" alt="" width={231} height={128} className="h-8 w-auto" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[1.1rem] leading-tight">Beginners Madrasah</span>
          <span className="block font-utility text-[0.82rem] text-primary-foreground/75">068 649 8593</span>
        </span>
        <SiWhatsapp className="size-6 text-[#25D366]" aria-hidden="true" />
      </div>
      <div className="space-y-3 bg-bmc-paper px-5 py-7" aria-hidden="true">
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#dcf3e3] px-4 py-3 font-utility text-[0.95rem] leading-snug text-foreground shadow-soft">
          {PREFILL}
        </p>
        <p className="font-utility text-[0.78rem] text-foreground/55">This message is ready for you. Just tap send.</p>
      </div>
      <div className="flex items-center justify-between gap-3 bg-card px-5 py-4">
        <span className="font-utility text-[0.95rem] font-semibold text-primary">Open WhatsApp</span>
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none">
          <SendHorizontal size={18} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

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
        eyebrow="WhatsApp is quickest"
        title="Get in touch"
        intro="We'd love to hear from you. Reach out on any of the platforms below and we'll get back to you as soon as possible, InshaAllah."
        art={<ChatCard />}
      />

      <section className={`${SECTION_Y} bg-bmc-paper !pt-16 md:!pt-24`}>
        <div className={`${CONTAINER} mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8`}>
          {/* Registering */}
          <div className={`bmc-reveal ${CARD} flex flex-col p-8 md:p-10`}>
            <p className="bmc-eyebrow mb-3">Ready to register?</p>
            <h2 className="text-primary leading-[1.12]" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)' }}>Choose your class first</h2>
            <p className="mt-4 flex-1 leading-[1.7] text-foreground/80">
              For class registrations, please use the Register button on the relevant class page.
            </p>
            <div className="mt-7">
              <Link href="/programmes" className="bmc-btn bmc-btn-primary">
                See the programmes
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div className={`bmc-reveal ${CARD} p-8 md:p-10`}>
            <p className="bmc-eyebrow mb-3">Follow along</p>
            <h2 className="text-primary leading-[1.12]" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)' }}>Lessons, reminders and news</h2>
            <ul className="mt-6 space-y-3">
              {SOCIALS.map(({ Icon, label, value, href, cta }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl bg-bmc-paper p-4 transition-shadow duration-300 hover:shadow-soft">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-bmc-gold-light" aria-hidden="true">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-utility text-[0.72rem] font-bold uppercase tracking-[0.14em] text-bmc-gold-ink">{label}</span>
                      <span className="block break-words font-display text-[1.15rem] leading-snug text-primary">{value}</span>
                    </span>
                    <span className="hidden items-center gap-1.5 font-utility text-sm font-bold text-bmc-gold-ink sm:inline-flex">
                      {cta}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClosingBand
        title="Ready to start your journey?"
        actions={
          <Link href="/programmes" className="bmc-btn bmc-btn-light">
            Explore Our Programmes
          </Link>
        }
      >
        Every class starts with one small step. Find the one that suits you.
      </ClosingBand>
    </>
  );
}
