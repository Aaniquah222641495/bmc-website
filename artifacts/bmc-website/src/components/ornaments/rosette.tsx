import { useId } from 'react';

/**
 * Soft field of tiny solid eight-point stars (a tone-on-tone khatam lattice) that fades out from one corner.
 * Pure filled shapes, no rules or outlines. Position it absolutely and give it a size.
 * `origin` is the corner (or point) where the pattern is strongest.
 */
export function Rosette({
  className = '',
  opacity = 0.2,
  origin = '0% 100%',
}: {
  className?: string;
  opacity?: number;
  origin?: string;
}) {
  const id = useId().replace(/:/g, '');
  const star = 'M-9-9H9V9H-9ZM0-12.7L12.7 0 0 12.7-12.7 0Z';
  return (
    <svg aria-hidden="true" focusable="false" className={`pointer-events-none ${className}`} style={{ opacity }}>
      <defs>
        <radialGradient id={`f${id}`} cx={origin.split(' ')[0]} cy={origin.split(' ')[1]} r="75%">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={`m${id}`}>
          <rect width="100%" height="100%" fill={`url(#f${id})`} />
        </mask>
        <pattern id={`p${id}`} width="64" height="64" patternUnits="userSpaceOnUse">
          <g fill="#b8923a">
            {[
              [32, 32],
              [0, 0],
              [64, 0],
              [0, 64],
              [64, 64],
            ].map(([x, y]) => (
              <path key={`${x}-${y}`} d={star} transform={`translate(${x} ${y}) scale(${x === 32 ? 1 : 0.55})`} />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#p${id})`} mask={`url(#m${id})`} />
    </svg>
  );
}
