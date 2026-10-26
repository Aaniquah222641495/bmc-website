import { Khatam } from './khatam';

/** Hairline - khatam - hairline. Use once or twice per page, never in a tap target. */
export function OrnamentDivider({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const line =
    tone === 'dark'
      ? 'bg-gradient-to-r from-transparent to-[hsl(43_70%_72%/0.7)]'
      : 'bg-gradient-to-r from-transparent to-[hsl(40_55%_45%/0.7)]';
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className={`h-px w-16 sm:w-24 ${line}`} />
      <Khatam size={26} />
      <span className={`h-px w-16 sm:w-24 rotate-180 ${line}`} />
    </div>
  );
}
