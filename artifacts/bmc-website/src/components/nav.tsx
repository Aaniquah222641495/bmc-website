import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Nav() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Programmes', href: '/programmes' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-card shadow-sm py-4' : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img src="/assets/bmc-logo.webp" alt="BMC Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={cn(
                      'font-utility text-sm font-medium tracking-wide transition-colors relative group py-1 cursor-pointer',
                      location === link.href ? 'text-primary' : 'text-foreground/80 hover:text-primary'
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300',
                        location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </span>
                </Link>
              ))}
            </div>
            
            <Link href="/programmes" className="bg-accent hover:bg-accent/90 text-primary font-utility font-medium px-6 py-2.5 rounded-full transition-all hover:shadow-md active:scale-95 cursor-pointer">
                Start Learning
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-primary p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-primary flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-primary-foreground p-2"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link href={link.href}>
                    <span 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-3xl font-display font-bold text-primary-foreground transition-colors cursor-pointer",
                        location === link.href ? "text-accent" : "hover:text-accent"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                className="mt-8"
              >
                <Link href="/programmes" onClick={() => setIsMobileMenuOpen(false)} className="bg-accent text-primary font-utility text-lg font-bold px-8 py-4 rounded-full inline-block">
                    Start Learning
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
