import { Link } from 'wouter';
import { SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Mualimah Rukeya', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];

const linkClass = 'hover:text-bmc-gold-light underline-offset-4 hover:underline transition-colors';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12 mb-14">
          <div className="flex flex-col items-start gap-4">
            <img src="/assets/bmc-logo-final.webp" alt="Beginners Madrasah Classes" loading="lazy" width={96} height={96} className="h-24 w-auto object-contain" />
            <p className="text-primary-foreground/85 max-w-sm leading-relaxed">
              Foundations of Islamic Knowledge. A warm, safe, beginner-friendly Islamic learning space for women and children.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-lg text-bmc-gold-light mb-5">Quick Links</h2>
            <ul className="flex flex-col gap-3 font-utility">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-lg text-bmc-gold-light mb-5">Connect</h2>
            <ul className="flex flex-col gap-4 font-utility">
              <li>
                <a href="https://wa.me/27686498593" target="_blank" rel="noreferrer" className={`flex items-center gap-3 ${linkClass}`}>
                  <SiWhatsapp className="w-5 h-5 text-bmc-gold-light" aria-hidden="true" />
                  <span>068 649 8593</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/beginners_classes" target="_blank" rel="noreferrer" className={`flex items-center gap-3 ${linkClass}`}>
                  <SiInstagram className="w-5 h-5 text-bmc-gold-light" aria-hidden="true" />
                  <span>@beginners_classes</span>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@rukeyabaradien_" target="_blank" rel="noreferrer" className={`flex items-center gap-3 ${linkClass}`}>
                  <SiTiktok className="w-5 h-5 text-bmc-gold-light" aria-hidden="true" />
                  <span>@rukeyabaradien_</span>
                </a>
              </li>
              <li className="text-primary-foreground/75 text-sm pt-1">beginnersmadrasah.co.za</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm font-utility text-primary-foreground/75">
          <p>&copy; {new Date().getFullYear()} Beginners Madrasah Classes. All rights reserved.</p>
          {/* Studio credit, added with the client's permission (2026-10-24) */}
          <p>
            Website by{' '}
            <a href="https://digitalpantry.co.za" target="_blank" rel="noopener" className="underline decoration-primary-foreground/40 underline-offset-4 hover:text-bmc-gold-light transition-colors">
              Digital Pantry
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
