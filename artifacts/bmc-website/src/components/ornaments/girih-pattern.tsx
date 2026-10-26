import { useId } from 'react';

/**
 * Tone-on-tone eight-point star lattice for dark green bands. Fills its (relative) parent,
 * very low contrast, fades toward the edges so text always sits on a calm field.
 */
export function GirihPattern({ opacity = 0.09, className = '' }: { opacity?: number; className?: string }) {
  const id = useId();
  const star = 'M-12-12H12V12H-12ZM0-17L17 0 0 17-17 0Z';
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{
        maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, #000 35%, rgba(0,0,0,0.45) 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, #000 35%, rgba(0,0,0,0.45) 100%)',
      }}
    >
      <defs>
        <pattern id={id} width="48" height="48" patternUnits="userSpaceOnUse" x="0" y="0">
          <g fill="none" stroke="#E8D9A8" strokeOpacity={opacity} strokeWidth="0.7">
            {[
              [24, 24],
              [0, 0],
              [48, 0],
              [0, 48],
              [48, 48],
            ].map(([x, y]) => (
              <path key={`${x}-${y}`} d={star} transform={`translate(${x} ${y})`} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
