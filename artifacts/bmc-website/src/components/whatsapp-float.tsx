import { SiWhatsapp } from 'react-icons/si';

/**
 * Floating "Chat on WhatsApp" button, bottom-right on every page (founder 2026-10-27).
 * A plain link to the client's existing WhatsApp number: no widget, no script, no tracking.
 */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/27686498593"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Beginners Madrasah Classes on WhatsApp"
      className="wa-float fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-10px_hsl(150_60%_20%/0.55)] transition-transform duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--bmc-gold))] md:bottom-8 md:right-8 md:size-16"
    >
      <SiWhatsapp className="size-7 md:size-8" aria-hidden="true" />
    </a>
  );
}
