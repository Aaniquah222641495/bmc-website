import { useId } from 'react';
import { GoldGradient } from './gold-gradient';

/** Fine-line hanging lantern. Drawn as hairlines so it stays light at any size. Hangs from the top of its box. */
export function Lantern({ width = 40, className = '' }: { width?: number; className?: string }) {
  const g = useId();
  return (
    <svg
      width={width}
      height={(width * 120) / 40}
      viewBox="0 0 40 120"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <GoldGradient id={g} />
      </defs>
      <g stroke={`url(#${g})`} strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
        <path d="M20 0V22" vectorEffect="non-scaling-stroke" />
        <circle cx="20" cy="24" r="2" vectorEffect="non-scaling-stroke" />
        <path d="M11 36L20 27 29 36Z" vectorEffect="non-scaling-stroke" />
        <path d="M11 36L8 58 11 80H29L32 58 29 36" vectorEffect="non-scaling-stroke" />
        <path d="M20 40L26 58 20 76 14 58Z" vectorEffect="non-scaling-stroke" />
        <path d="M11 36L14 58 11 80M29 36L26 58 29 80" vectorEffect="non-scaling-stroke" />
        <path d="M14 80L20 92 26 80" vectorEffect="non-scaling-stroke" />
        <path d="M20 92V100" vectorEffect="non-scaling-stroke" />
        <circle cx="20" cy="103" r="1.6" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}
