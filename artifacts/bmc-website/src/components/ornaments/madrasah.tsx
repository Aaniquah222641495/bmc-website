import type { CSSProperties, SVGProps } from 'react';

/**
 * Madrasah motif set (founder 2026-10-26: "the branding needs to say madrasah throughout").
 * Learning objects drawn in one fine-line language: rehal (Qur'an stand), open book, book stack,
 * tasbih, writing slate (takhti), masjid skyline, and the first letters alif, ba, ta.
 * No Qur'anic text and no name of Allah. All decorative: aria-hidden.
 * Icons use currentColor so they take the surrounding text colour.
 */

type IconProps = { size?: number; className?: string; style?: CSSProperties; strokeWidth?: number };

function Svg({ size = 28, className = '', style, strokeWidth = 1.4, children, viewBox = '0 0 48 48' }: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
}

/** Rehal: X-shaped wooden stand holding an open book. The studio's signature madrasah mark. */
export function RehalIcon(p: IconProps) {
  return (
    <Svg {...p}>
      {/* open book resting on the stand */}
      <path d="M24 21.5C20 18.5 13.5 17.6 8 18.6V27.4C13.5 26.4 20 27.3 24 30.3C28 27.3 34.5 26.4 40 27.4V18.6C34.5 17.6 28 18.5 24 21.5Z" />
      <path d="M24 21.5V30.3" />
      <path d="M11.5 21.2C15.4 20.8 19.4 21.6 21.6 23" opacity=".55" />
      <path d="M36.5 21.2C32.6 20.8 28.6 21.6 26.4 23" opacity=".55" />
      {/* crossed stand */}
      <path d="M12 30.5L33 42.5M36 30.5L15 42.5" />
      <path d="M10.5 42.5H17.5M30.5 42.5H37.5" />
      <circle cx="24" cy="36.5" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function OpenBookIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 14C19.5 10.8 12.5 10 6 11.2V36C12.5 34.8 19.5 35.6 24 38.8C28.5 35.6 35.5 34.8 42 36V11.2C35.5 10 28.5 10.8 24 14Z" />
      <path d="M24 14V38.8" />
      <path d="M10 17C14 16.6 18 17.3 20.5 18.6M10 22.5C14 22.1 18 22.8 20.5 24.1M10 28C14 27.6 18 28.3 20.5 29.6" opacity=".55" />
      <path d="M38 17C34 16.6 30 17.3 27.5 18.6M38 22.5C34 22.1 30 22.8 27.5 24.1" opacity=".55" />
      <path d="M33 26.5L35 28.5 33 30.5 31 28.5Z" fill="currentColor" stroke="none" opacity=".8" />
    </Svg>
  );
}

export function BookStackIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 34H40V41H8Z" />
      <path d="M11 34V41M36 36.5H40" opacity=".55" />
      <path d="M11 27H37V34H11Z" />
      <path d="M33 27V34M11 29.5H14" opacity=".55" />
      <path d="M9.5 20H38.5V27H9.5Z" />
      <path d="M13 20V27M33 23.5H38.5" opacity=".55" />
      {/* small khatam on the top cover */}
      <path d="M24 9.5L25.6 12.4 28.8 12.6 26.5 14.8 27.2 18 24 16.4 20.8 18 21.5 14.8 19.2 12.6 22.4 12.4Z" fill="currentColor" stroke="none" opacity=".75" />
    </Svg>
  );
}

/** Tasbih: loop of beads with a short strand and tassel. */
export function TasbihIcon(p: IconProps) {
  const beads: [number, number][] = [];
  const n = 15;
  for (let k = 0; k < n; k++) {
    const a = (Math.PI * 2 * k) / n - Math.PI / 2;
    beads.push([24 + 12.5 * Math.cos(a), 19 + 10.5 * Math.sin(a)]);
  }
  return (
    <Svg {...p}>
      {beads
        .filter((_, k) => k !== 0)
        .map(([x, y], k) => (
          <circle key={k} cx={x.toFixed(2)} cy={y.toFixed(2)} r="1.75" fill="currentColor" stroke="none" opacity=".85" />
        ))}
      <path d="M24 29.5V33.5" />
      <circle cx="24" cy="35.6" r="2.1" />
      <path d="M24 37.7V39.5M21.5 40L24 39.2 26.5 40M21 44.5L22.4 40.4M27 44.5L25.6 40.4M24 44.8V39.8" />
    </Svg>
  );
}

/** Takhti: the wooden writing slate beginners first write their letters on. */
export function SlateIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M21 6.5C21 5.1 22.1 4 23.5 4H24.5C25.9 4 27 5.1 27 6.5V9" />
      <path d="M12 9H36C37.7 9 39 10.3 39 12V40C39 41.7 37.7 43 36 43H12C10.3 43 9 41.7 9 40V12C9 10.3 10.3 9 12 9Z" />
      {/* alif and ba, as a beginner would write them */}
      <path d="M31 16.5L30 30" strokeWidth={(p.strokeWidth ?? 1.4) * 1.6} />
      <path d="M26.5 27.5C26.8 30.6 25.2 32.2 21.5 32.2H17C14.6 32.2 13.6 30.7 14.3 28.8" strokeWidth={(p.strokeWidth ?? 1.4) * 1.4} />
      <path d="M20 36L21 37 20 38 19 37Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Masjid silhouette: central dome, two small domes, two minarets. Filled, so it reads as a skyline. */
export function MasjidIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M24 9.5C24 11 24 11.5 24 12.5" />
      <path d="M22.4 8.4A2 2 0 1 0 25.4 6.2A2.6 2.6 0 0 1 22.4 8.4Z" fill="currentColor" stroke="none" />
      <path d="M14 26C14 19 18.5 14.5 24 12.5C29.5 14.5 34 19 34 26" />
      <path d="M12.5 26H35.5V42H12.5Z" />
      <path d="M20.5 42V35C20.5 33 22 31.5 24 31.5C26 31.5 27.5 33 27.5 35V42" />
      <path d="M6 42V20.5L7.5 16.5 9 20.5V42M39 42V20.5L40.5 16.5 42 20.5V42" />
      <path d="M5.5 25H9.5M38.5 25H42.5" />
      <path d="M3.5 42H44.5" />
    </Svg>
  );
}

/* ------------------------------------------------------------------------- */
/* Arabic letters alif, ba, ta (drawn, not typed, so they render the same    */
/* everywhere). Filled naskh-style shapes in a 100x100 box.                  */
/* ------------------------------------------------------------------------- */

const BA_BODY =
  'M90 36C93 41 93 57 82 62.5C79 64 75 64.5 70 64.5H28C14 64.5 7 58 8.5 46C9 42.5 13.5 42 14 45.5C14.6 51 19 54.5 27 54.5H72C78 54.5 81 52.5 81.5 47C81.8 43 82 39 84 36.5C85.6 34.6 88.6 34.2 90 36Z';
const JIM_BODY =
  'M80 24C71 19.5 42 20 27.5 28C24.5 29.8 26.5 34.5 30 33.2C40 30 52 29.6 60 31.4C38 40.5 20 54 20.5 70.5C21 87.5 40 95.5 62 93.5C70 92.8 76.5 89.8 81 85.5C83.4 83.2 80.8 79.4 77.6 81.4C70.6 85.6 62.4 86.6 54.4 86C38.6 84.6 30.6 77.6 31.5 68.4C32.8 54.4 51.6 42.4 79 34.4C83.6 33 84.6 26.4 80 24Z';
const DOT = (cx: number, cy: number, s = 5.5) => `M${cx} ${cy - s}L${cx + s} ${cy}L${cx} ${cy + s}L${cx - s} ${cy}Z`;

export const LETTERS = {
  alif: 'M55 8C59.5 7.5 61.5 10.5 60.5 15L52 88C51.3 93 44.7 93 45 88L49.5 15C49.8 11 51.5 8.3 55 8Z',
  ba: `${BA_BODY}${DOT(48, 79)}`,
  ta: `${BA_BODY}${DOT(41, 30)}${DOT(57, 30)}`,
  tha: `${BA_BODY}${DOT(41, 31)}${DOT(57, 31)}${DOT(49, 18)}`,
  jim: JIM_BODY + DOT(55, 62),
  ha: JIM_BODY,
  kha: JIM_BODY + DOT(52, 12),
  dal: 'M42 26C49 27.5 63 47 68 59C71 66 67.5 72.5 59.5 72.5H27C21.5 72.5 21.5 63.5 27 63.5H55.5C58 63.5 59 61.5 57.8 59C53 49.5 45 39.5 37.5 35.5C32.8 33 36 25 42 26Z',
  ra: 'M63 36C68 36 70.5 41 68.5 48.5C64 66 49 83 27.5 89.5C22.5 91 19.5 84 24.5 81.5C41.5 73 53.5 60.5 57.5 43.5C58.6 38.8 60 36 63 36Z',
} as const;

export function Letter({ name, ...rest }: { name: keyof typeof LETTERS } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" {...rest}>
      <path d={LETTERS[name]} fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------------- */
/* Masjid skyline band: domes and minarets, filled, used along section edges. */
/* ------------------------------------------------------------------------- */

function minaret(x: number, h: number, base: number, w = 9): string {
  const top = base - h;
  return [
    `M${x - w / 2} ${base}V${top + 26}`,
    `H${x - w / 2 - 2}V${top + 21}H${x + w / 2 + 2}V${top + 26}H${x + w / 2}V${base}Z`,
    `M${x - w / 2} ${top + 21}V${top + 10}Q${x - w / 2} ${top + 2} ${x} ${top - 6}Q${x + w / 2} ${top + 2} ${x + w / 2} ${top + 10}V${top + 21}Z`,
  ].join('');
}

function dome(cx: number, r: number, base: number, drum = 10): string {
  const y = base - drum;
  // onion-ish dome with a small point, on a drum
  return [
    `M${cx - r} ${base}V${y}`,
    `C${cx - r} ${y - r * 0.9} ${cx - r * 0.35} ${y - r * 1.25} ${cx} ${y - r * 1.55}`,
    `C${cx + r * 0.35} ${y - r * 1.25} ${cx + r} ${y - r * 0.9} ${cx + r} ${y}`,
    `V${base}Z`,
    `M${cx - 0.9} ${y - r * 1.55}V${y - r * 1.55 - 9}H${cx + 0.9}V${y - r * 1.55}Z`,
  ].join('');
}

const SKY_BASE = 120;
const SKYLINE_D = [
  // left cluster
  minaret(70, 92, SKY_BASE, 8),
  dome(130, 26, SKY_BASE, 8),
  `M95 ${SKY_BASE}V${SKY_BASE - 22}H165V${SKY_BASE}Z`,
  // centre masjid
  minaret(268, 112, SKY_BASE, 10),
  dome(360, 60, SKY_BASE, 16),
  `M262 ${SKY_BASE}V${SKY_BASE - 30}H458V${SKY_BASE}Z`,
  dome(300, 20, SKY_BASE - 30, 6),
  dome(420, 20, SKY_BASE - 30, 6),
  minaret(452, 112, SKY_BASE, 10),
  // right cluster
  dome(560, 30, SKY_BASE, 10),
  `M520 ${SKY_BASE}V${SKY_BASE - 24}H600V${SKY_BASE}Z`,
  minaret(632, 84, SKY_BASE, 8),
  dome(700, 18, SKY_BASE, 6),
  `M675 ${SKY_BASE}V${SKY_BASE - 16}H725V${SKY_BASE}Z`,
  // ground
  `M0 ${SKY_BASE}H760V${SKY_BASE + 6}H0Z`,
].join('');

/** Crescent for the main dome's finial (separate so it can be gold while the skyline is tinted). */
const SKY_CRESCENT = 'M357.2 -9.5A6 6 0 1 0 365.4 -2.4A7.4 7.4 0 0 1 357.2 -9.5Z';

export function MasjidSkyline({ className = '', style, color = 'currentColor', crescent }: { className?: string; style?: CSSProperties; color?: string; crescent?: string }) {
  return (
    <svg
      viewBox="0 -14 760 140"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <path d={SKYLINE_D} fill={color} />
      <path d={SKY_CRESCENT} fill={crescent ?? color} />
    </svg>
  );
}

/** Small section marker: a rehal in gold-ink, used above section headings. */
export function SectionMark({ className = '', light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center ${light ? 'text-bmc-gold-light' : 'text-bmc-gold-ink'} ${className}`} aria-hidden="true">
      <RehalIcon size={48} strokeWidth={1.2} />
    </span>
  );
}

/* ------------------------------------------------------------------------- */
/* Letters scattered over the hero. Each grows on hover (founder 2026-10-27). */
/* ------------------------------------------------------------------------- */

type Scatter = { name: keyof typeof LETTERS; left: string; top: string; size: number; rot: number; f: number; fd: number; hideSm?: boolean };

const SCATTER: Scatter[] = [
  { name: 'alif', left: '6%', top: '13%', size: 3.2, rot: -8, f: 7, fd: -1, hideSm: true },
  { name: 'ba', left: '27%', top: '10%', size: 3.6, rot: 6, f: 8, fd: -3, hideSm: true },
  { name: 'ta', left: '47%', top: '15%', size: 3.4, rot: -4, f: 7.5, fd: -5, hideSm: true },
  { name: 'tha', left: '64%', top: '9%', size: 3.2, rot: 8, f: 6.6, fd: -2, hideSm: true },
  { name: 'jim', left: '91%', top: '12%', size: 3.6, rot: -6, f: 8.2, fd: -4, hideSm: true },
  { name: 'ha', left: '49%', top: '40%', size: 3, rot: 10, f: 7.2, fd: -6, hideSm: true },
  { name: 'kha', left: '52%', top: '66%', size: 3.4, rot: -10, f: 6.8, fd: -1.5, hideSm: true },
  { name: 'dal', left: '95%', top: '48%', size: 2.8, rot: 6, f: 7.8, fd: -3.5, hideSm: true },
  { name: 'ra', left: '4%', top: '90%', size: 3, rot: -6, f: 7.4, fd: -2.5 },
  { name: 'ba', left: '24%', top: '93%', size: 2.8, rot: 4, f: 6.4, fd: -4.5, hideSm: true },
  { name: 'alif', left: '41%', top: '89%', size: 3.4, rot: 10, f: 8, fd: -0.5 },
  { name: 'ta', left: '93%', top: '86%', size: 3, rot: -8, f: 7, fd: -5.5 },
];

export function HeroLetters() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {SCATTER.map((l, k) => (
        <span
          key={k}
          className={`hl-letter pointer-events-auto absolute ${l.hideSm ? 'hidden sm:block' : ''}`}
          style={{ left: l.left, top: l.top, width: `${l.size}rem`, height: `${l.size}rem`, ['--hl-r' as string]: `${l.rot}deg`, ['--hl-d' as string]: `${0.6 + k * 0.08}s` }}
        >
          <span className="hl-float block h-full w-full" style={{ ['--hl-f' as string]: `${l.f}s`, ['--hl-fd' as string]: `${l.fd}s` }}>
            <Letter name={l.name} className="block h-full w-full" />
          </span>
        </span>
      ))}
    </div>
  );
}
