import { Link } from 'wouter';
import { SiWhatsapp, SiInstagram, SiTiktok } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-[4px] border-accent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img src="/assets/bmc-logo-final.png" alt="BMC Logo" className="h-24 w-auto object-contain mb-2" />
            <p className="font-body text-primary-foreground/80 max-w-sm">
              Foundations of Islamic Knowledge. A warm, safe, beginner-friendly Islamic learning space for women and children.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-xl mb-6 text-accent">Quick Links</h4>
            <ul className="flex flex-col gap-3 font-utility">
              <li><Link href="/"><span className="hover:text-accent transition-colors cursor-pointer">Home</span></Link></li>
              <li><Link href="/about"><span className="hover:text-accent transition-colors cursor-pointer">About Mualimah Rukeya</span></Link></li>
              <li><Link href="/programmes"><span className="hover:text-accent transition-colors cursor-pointer">Programmes</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-accent transition-colors cursor-pointer">FAQ</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-accent transition-colors cursor-pointer">Contact Us</span></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-xl mb-6 text-accent">Connect</h4>
            <ul className="flex flex-col gap-4 font-utility">
              <li>
                <a href="https://wa.me/27686498593" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <SiWhatsapp className="w-5 h-5 text-accent" />
                  <span>068 649 8593</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/beginners_classes" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <SiInstagram className="w-5 h-5 text-accent" />
                  <span>@beginners_classes</span>
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@rukeyabaradien_" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors">
                  <SiTiktok className="w-5 h-5 text-accent" />
                  <span>@rukeyabaradien_</span>
                </a>
              </li>
              <li className="text-primary-foreground/70 text-sm mt-2">
                beginnersmadrasah.co.za
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-primary-foreground/10 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-utility text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Beginners Madrasah Classes. All rights reserved.</p>
          <div className="flex gap-2 items-center">
            <span>☽</span>
            <span className="text-accent text-xs">★</span>
            <span>☽</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
