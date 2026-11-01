import { ArrowRight } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { RegistrationForm } from '@/components/registration-form';
import { REGISTER_ENDPOINT, type WorkshopListKey } from '@/data/registration';
import { CONTAINER } from '@/components/page-shell';

/**
 * "Tell me about the next one" on the workshop pages. With the client's Apps Script live, it is a
 * short form: the script emails everyone on the list when a new workshop is published (ADR-0031).
 * Without it, the old WhatsApp link.
 */
const scrollToNotify = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('notify')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  window.setTimeout(() => document.querySelector<HTMLElement>('#notify form input:not([tabindex="-1"])')?.focus({ preventScroll: true }), reduce ? 0 : 600);
};

export function NotifyButton({ whatsapp, className, label = 'Tell me about the next one' }: { whatsapp: string; className: string; label?: string }) {
  if (REGISTER_ENDPOINT) {
    return (
      <button type="button" onClick={scrollToNotify} className={className}>
        {label} <ArrowRight size={16} aria-hidden="true" />
      </button>
    );
  }
  return (
    <a href={whatsapp} target="_blank" rel="noreferrer" className={className}>
      <SiWhatsapp className="size-[1.1rem]" aria-hidden="true" /> {label}
    </a>
  );
}

export function NotifySection({ listKey, title, source }: { listKey: WorkshopListKey; title: string; source: string }) {
  if (!REGISTER_ENDPOINT) return null;
  return (
    <section id="notify" className="scroll-mt-20 bg-[hsl(var(--bmc-gold-light)/0.35)] py-20 md:py-28">
      <div className={`${CONTAINER} mx-auto max-w-2xl text-center`}>
        <h2 className="mb-3 text-primary" style={{ fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)' }}>Hear about the next one</h2>
        <p className="mx-auto mb-10 max-w-md leading-[1.7] text-foreground/80">Leave your email and we'll let you know as soon as a new workshop date is announced, InshaAllah.</p>
        <RegistrationForm classKey={listKey} title={title} source={source} mode="waitlist" />
      </div>
    </section>
  );
}
