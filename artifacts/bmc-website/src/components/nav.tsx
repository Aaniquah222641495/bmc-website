import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export function Nav() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu on Escape and lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 bg-background transition-[border-color,box-shadow] duration-300 border-b',
          isScrolled ? 'border-border shadow-[0_8px_24px_-18px_hsl(155_42%_18%/0.4)]' : 'border-transparent',
        )}
      >
        <nav aria-label="Main" className="container mx-auto px-5 md:px-10 h-[4.5rem] flex items-center justify-between">
          <Link href="/" aria-label="Beginners Madrasah Classes, home" className="rounded-md">
            <span className="flex items-center gap-2.5">
              <img src="/assets/bmc-logo-final.webp" alt="" width={260} height={291} className="h-11 w-auto object-contain" />
              <span className="font-display font-semibold text-primary leading-[1.05] text-[1.05rem]">
                Beginners Madrasah<span className="block text-[0.8rem] font-medium italic text-bmc-gold-ink">Classes</span>
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-9">
            <ul className="flex gap-7">
              {NAV_LINKS.map((link) => {
                const active = location === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'font-utility text-[0.95rem] font-medium py-1 border-b-2 transition-colors',
                        active
                          ? 'text-primary border-accent'
                          : 'text-foreground/80 border-transparent hover:text-primary hover:border-accent/60',
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/programmes"
              className="rounded-full bg-primary text-primary-foreground font-utility font-semibold text-[0.95rem] px-6 py-2.5 transition-colors hover:bg-secondary active:translate-y-px"
            >
              Start Learning
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 -mr-2 text-primary rounded-md"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] bg-primary text-primary-foreground flex flex-col">
          <div className="flex items-center justify-between px-5 h-[4.5rem]">
            <span className="font-display text-lg">Beginners Madrasah</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 -mr-2 rounded-md focus-visible:outline-bmc-gold-light"
              aria-label="Close menu"
              autoFocus
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <ul className="flex-1 flex flex-col justify-center gap-1 px-8 pb-16">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={location === link.href ? 'page' : undefined}
                  className={cn(
                    'block py-3 font-display text-3xl',
                    location === link.href ? 'text-bmc-gold-light' : 'text-primary-foreground hover:text-bmc-gold-light',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link href="/programmes" className="inline-block rounded-full bg-bmc-paper text-primary font-utility font-semibold px-8 py-3.5">
                Start Learning
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
