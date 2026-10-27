import { Link } from 'wouter';
import { SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';
import { GirihPattern, Khatam } from '@/components/ornaments';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Mualimah Rukeya', href: '/about' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];

const linkClass = 'inline-flex min-h-11 items-center text-primary-foreground/85 hover:text-bmc-gold-light transition-colors';

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[hsl(158_46%_10.5%)] text-primary-foreground pt-20 pb-8">
      <GirihPattern />
      <div className="relative container mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-14 mb-16">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4 rounded-2xl bg-bmc-paper px-5 py-4 shadow-lift">
              <img
                src="/assets/mascot-figures.webp"
                alt="Illustration of Mualimah and two students reading the Qur'an at wooden stands"
                loading="lazy"
                decoding="async"
                width={789}
                height={437}
                className="h-16 w-auto"
              />
              <span className="font-display font-semibold text-primary text-[1.7rem] leading-none tracking-[0.06em]">BMC</span>
            </div>
            <p className="text-primary-foreground/85 max-w-sm leading-relaxed">
              Foundations of Islamic Knowledge. A warm, safe, beginner-friendly Islamic learning space for women and children.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="bmc-eyebrow on-dark mb-4 !font-utility">Quick Links</h2>
            <ul className="flex flex-col font-utility">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="bmc-eyebrow on-dark mb-4 !font-utility">Connect</h2>
            <ul className="flex flex-col font-utility">
              <li>
                <a href="https://wa.me/27686498593" target="_blank" rel="noreferrer" className={`gap-3 ${linkClass}`}>
                  <SiWhatsapp className="w-[1.15rem] h-[1.15rem] text-bmc-gold-light" aria-hidden="true" />
                  <span>068 649 8593</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/beginners_classes" target="_blank" rel="noreferrer" className={`gap-3 ${linkClass}`}>
                  <SiInstagram className="w-[1.15rem] h-[1.15rem] text-bmc-gold-light" aria-hidden="true" />
                  <span>@beginners_classes</span>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@rukeyabaradien_" target="_blank" rel="noreferrer" className={`gap-3 ${linkClass}`}>
                  <SiTiktok className="w-[1.15rem] h-[1.15rem] text-bmc-gold-light" aria-hidden="true" />
                  <span>@rukeyabaradien_</span>
                </a>
              </li>
              <li className="text-primary-foreground/75 text-sm pt-3">beginnersmadrasah.co.za</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm font-utility text-primary-foreground/75">
          <p>&copy; {new Date().getFullYear()} Beginners Madrasah Classes. All rights reserved.</p>
          <Khatam size={22} className="hidden md:block" />
          {/* Studio credit, added with the client's permission (2026-10-24) */}
          <p>
            Website by{' '}
            <a href="https://digitalpantry.co.za" target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-semibold text-bmc-gold-light hover:text-primary-foreground transition-colors">
              Digital Pantry
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
