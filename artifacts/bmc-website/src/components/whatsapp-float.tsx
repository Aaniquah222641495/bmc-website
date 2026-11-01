import { useEffect, useState } from 'react';
import { SiWhatsapp } from 'react-icons/si';

/**
 * Floating "Chat on WhatsApp" button, bottom-right on every page (founder 2026-10-27).
 * A plain link to the client's existing WhatsApp number: no widget, no script, no tracking.
 * On phones it steps aside while a form is on screen, so it never covers a field or the send
 * button (every form has its own "Contact us on WhatsApp" line).
 */
export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const small = window.matchMedia('(max-width: 767px)');
    const visible = new Set<Element>();
    const update = () => setHidden(small.matches && visible.size > 0);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      update();
    });
    const watched = new Set<Element>();
    const scan = () => {
      for (const el of watched) if (!el.isConnected) { io.unobserve(el); watched.delete(el); visible.delete(el); }
      document.querySelectorAll('main form').forEach((f) => {
        if (!watched.has(f)) { watched.add(f); io.observe(f); }
      });
      update();
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    small.addEventListener('change', update);
    return () => { io.disconnect(); mo.disconnect(); small.removeEventListener('change', update); };
  }, []);

  return (
    <a
      href="https://wa.me/27686498593"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Beginners Madrasah Classes on WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`wa-float fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-10px_hsl(150_60%_20%/0.55)] transition-[transform,opacity] duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--bmc-gold))] md:bottom-8 md:right-8 md:size-16 ${hidden ? 'pointer-events-none translate-y-4 opacity-0' : ''}`}
    >
      <SiWhatsapp className="size-7 md:size-8" aria-hidden="true" />
    </a>
  );
}
