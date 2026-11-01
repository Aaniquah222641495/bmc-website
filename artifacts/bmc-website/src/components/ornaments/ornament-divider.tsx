import { Khatam } from './khatam';

/** A lone khatam flanked by two small gold diamonds. No rules or hairlines. Use once or twice per page, never in a tap target. */
export function OrnamentDivider({ className = '' }: { className?: string; tone?: 'light' | 'dark' }) {
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`} aria-hidden="true">
      <span className="size-1.5 rotate-45 bg-[image:var(--bmc-gold-metal)] opacity-70" />
      <Khatam size={28} />
      <span className="size-1.5 rotate-45 bg-[image:var(--bmc-gold-metal)] opacity-70" />
    </div>
  );
}
