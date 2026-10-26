import { useId } from 'react';
import { GoldGradient } from './gold-gradient';

/** Eight-point star (khatam): two overlapping squares, an inner star and a centre point. Hairline metallic gold. */
export function Khatam({ size = 28, className = '' }: { size?: number; className?: string }) {
  const g = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="-30 -30 60 60"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <GoldGradient id={g} />
      </defs>
      <g stroke={`url(#${g})`} strokeWidth="1.1" strokeLinejoin="miter" vectorEffect="non-scaling-stroke">
        <path d="M-18 -18H18V18H-18Z M0 -25.5L25.5 0 0 25.5-25.5 0Z" vectorEffect="non-scaling-stroke" />
        <path d="M-8.5 -8.5H8.5V8.5H-8.5Z M0 -12L12 0 0 12-12 0Z" vectorEffect="non-scaling-stroke" />
      </g>
      <circle r="1.6" fill={`url(#${g})`} />
    </svg>
  );
}
