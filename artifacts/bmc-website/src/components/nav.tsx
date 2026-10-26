import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GirihPattern } from '@/components/ornaments';

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
          'fixed top-0 inset-x-0 z-50 bg-background/95 backdrop-blur-md transition-shadow duration-300',
          isScrolled ? 'shadow-[0_18px_32px_-22px_hsl(158_44%_8%/0.4)]' : 'shadow-none',
        )}
      >
        <nav aria-label="Main" className="container mx-auto px-5 md:px-10 h-[4.5rem] flex items-center justify-between">
          <Link href="/" aria-label="Beginners Madrasah Classes, home" className="rounded-md inline-flex min-h-11 items-center">
            <img src="/assets/mascot-figures-sm.webp" alt="" width={229} height={128} className="h-11 sm:h-14 w-auto shrink-0" />
          </Link>

          <div className="hidden md:flex items-center gap-9">
            <ul className="flex gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => {
                const active = location === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group relative inline-flex min-h-11 items-center px-0.5 font-utility text-[0.9rem] font-semibold tracking-[0.03em] transition-colors',
                        active ? 'text-primary' : 'text-foreground/75 hover:text-primary',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute left-1/2 bottom-1 size-[5px] -translate-x-1/2 rotate-45 bg-[image:var(--bmc-gold-metal)] transition-[opacity,transform] duration-300 motion-reduce:transition-none',
                          active ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-60 group-hover:scale-100',
                        )}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/programmes"
              className="bmc-btn bmc-btn-primary !min-h-11 !px-6 !py-2 !text-[0.88rem]"
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
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] bg-primary text-primary-foreground flex flex-col overflow-hidden">
          <GirihPattern />
          <div className="relative flex items-center justify-between px-5 h-[4.5rem]">
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
          <ul className="relative flex-1 flex flex-col justify-center gap-1 px-8 pb-16">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={location === link.href ? 'page' : undefined}
                  className={cn(
                    'block py-3 font-display font-normal text-3xl tracking-tight',
                    location === link.href ? 'text-bmc-gold-light' : 'text-primary-foreground hover:text-bmc-gold-light',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link href="/programmes" className="bmc-btn bmc-btn-light">
                Start Learning
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
