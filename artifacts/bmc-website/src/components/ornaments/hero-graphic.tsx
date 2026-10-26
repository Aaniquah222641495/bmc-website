import { useId, type CSSProperties } from 'react';

/**
 * Hero composition: a layered mihrab arch in fine metallic gold around the Beginners Madrasah mascot.
 * Pure SVG + CSS (see the "hg-" rules in index.css): strokes draw in, lanterns drop and sway, stars twinkle.
 * No lettering or calligraphy. The mascot is a real <img> (LCP, alt text) laid over the SVG.
 *
 * Coordinates: viewBox 0 -46 480 650. Arch axis x=240, base y=520, tip y=10, finial above the tip.
 */

type P = [number, number];
type Seg = [P, P, P, P];

const CX = 240;
const BASE = 520;

/** Pointed ogee arch outline, inset `i` units from the outer edge. Left base, up and over, right base. */
function archSegs(i: number): Seg[] {
  const hw = 216 - i;
  const spring = 232 + i * 0.35;
  const a0: P = [CX - hw, BASE];
  const a1: P = [CX - hw, spring];
  const s: P = [CX - 0.23 * hw, 62 + i * 1.5];
  const t: P = [CX, 10 + i * 2.3];
  const left: Seg[] = [
    [a0, [a0[0], BASE - (BASE - spring) / 3], [a0[0], BASE - (2 * (BASE - spring)) / 3], a1],
    [a1, [CX - hw, 150 + i * 0.9], [CX - 0.6 * hw, 104 + i * 1.2], s],
    [s, [CX - 0.116 * hw, 48 + i * 1.7], [CX - 0.037 * hw, 30 + i * 2.0], t],
  ];
  const m = (p: P): P => [2 * CX - p[0], p[1]];
  const right: Seg[] = [...left].reverse().map(([p0, c1, c2, p1]) => [m(p1), m(c2), m(c1), m(p0)] as Seg);
  return [...left, ...right];
}

const f = (n: number) => Math.round(n * 100) / 100;
const pt = (p: P) => `${f(p[0])} ${f(p[1])}`;

function pathD(segs: Seg[]): string {
  let d = `M${pt(segs[0][0])}`;
  for (const [, c1, c2, p1] of segs) d += `C${pt(c1)} ${pt(c2)} ${pt(p1)}`;
  return d;
}

function bez(s: Seg, t: number): P {
  const u = 1 - t;
  const [p0, c1, c2, p1] = s;
  return [
    u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p1[0],
    u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p1[1],
  ];
}

function polyline(segs: Seg[], steps = 40): P[] {
  const out: P[] = [];
  segs.forEach((s, si) => {
    for (let k = si === 0 ? 0 : 1; k <= steps; k++) out.push(bez(s, k / steps));
  });
  return out;
}

function evenPoints(poly: P[], spacing: number): P[] {
  const cum = [0];
  for (let k = 1; k < poly.length; k++) cum.push(cum[k - 1] + Math.hypot(poly[k][0] - poly[k - 1][0], poly[k][1] - poly[k - 1][1]));
  const total = cum[cum.length - 1];
  const n = Math.max(2, Math.round(total / spacing));
  const out: P[] = [];
  let j = 0;
  for (let k = 0; k <= n; k++) {
    const target = (total * k) / n;
    while (j < cum.length - 2 && cum[j + 1] < target) j++;
    const span = cum[j + 1] - cum[j] || 1;
    const r = (target - cum[j]) / span;
    out.push([poly[j][0] + (poly[j + 1][0] - poly[j][0]) * r, poly[j][1] + (poly[j + 1][1] - poly[j][1]) * r]);
  }
  return out;
}

// ----- static geometry (computed once) -----
const OUTER = archSegs(0);
const MID = archSegs(17);
const BEAD_ARCH = archSegs(9);
const INNER = archSegs(34);

const OUTER_D = pathD(OUTER) + 'Z';
const MID_D = pathD(MID);

/** Scalloped (multifoil) panel edge: lobes bulge outward, cusps point into the opening. */
const innerCurve = INNER.slice(1, INNER.length - 1);
const scallopPts = evenPoints(polyline(innerCurve), 25);
let SCALLOP_D = `M${pt(INNER[0][0])}L${pt(INNER[0][3])}`;
for (let k = 1; k < scallopPts.length; k++) {
  const a = scallopPts[k - 1];
  const b = scallopPts[k];
  const r = Math.hypot(b[0] - a[0], b[1] - a[1]) * 0.56;
  SCALLOP_D += `A${f(r)} ${f(r)} 0 0 1 ${pt(b)}`;
}
SCALLOP_D += `L${pt(INNER[INNER.length - 1][3])}`;
const PANEL_D = SCALLOP_D + 'Z';

const BEADS = evenPoints(polyline(BEAD_ARCH.slice(1, BEAD_ARCH.length - 1)), 15.5);

/** y of the inner arch edge at a given x (left half or right half). */
const innerPoly = polyline(innerCurve, 60);
function edgeY(x: number): number {
  let best = innerPoly[0];
  for (const p of innerPoly) if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p;
  return best[1];
}

const SPARKLE = 'M0-1C.1-.28.28-.1 1 0 .28.1.1.28 0 1-.1.28-.28.1-1 0-.28-.1-.1-.28 0-1Z';

type Star = { x: number; y: number; r: number; t: number; td: number; kind?: 'sparkle' | 'khatam' };
const STARS: Star[] = [
  { x: 112, y: 168, r: 10.1, t: 4.2, td: 0.2 },
  { x: 372, y: 150, r: 12.2, t: 5.1, td: 1.4 },
  { x: 168, y: 92, r: 6.8, t: 3.6, td: 2.1 },
  { x: 322, y: 84, r: 7.4, t: 4.6, td: 0.7 },
  { x: 84, y: 258, r: 6.8, t: 5.4, td: 1.9 },
  { x: 400, y: 264, r: 8.8, t: 3.9, td: 2.6 },
  { x: 240, y: 190, r: 6.1, t: 4.8, td: 1.1 },
];

const d = (s: number, dur?: number): CSSProperties => ({ ['--hg-d' as string]: `${s}s`, ...(dur ? { ['--hg-dur' as string]: `${dur}s` } : {}) });

function LanternShape({ ext, gid }: { ext: number; gid: string }) {
  return (
    <g stroke={`url(#${gid})`} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" fill="none">
      <path d={`M20 0V${ext + 22}`} />
      <g transform={`translate(0 ${ext})`}>
        <circle cx="20" cy="24" r="2" />
        <path d="M11 36L20 27 29 36Z" />
        <path d="M11 36L8 58 11 80H29L32 58 29 36" />
        <path d="M20 40L26 58 20 76 14 58Z" fill="#f1dfa2" fillOpacity="0.5" />
        <path d="M11 36L14 58 11 80M29 36L26 58 29 80" />
        <path d="M14 80L20 92 26 80" />
        <path d="M20 92V100" />
        <circle cx="20" cy="103" r="1.6" fill={`url(#${gid})`} />
      </g>
    </g>
  );
}

const LANTERNS = [
  { x: 126, scale: 1.2, ext: 2, s: 6.4, sd: -1.2, d: 1.35 },
  { x: 240, scale: 0.92, ext: 0, s: 5.2, sd: -3.1, d: 1.55 },
  { x: 354, scale: 1.2, ext: 10, s: 7.2, sd: -0.4, d: 1.75 },
];

export function HeroGraphic({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const gold = `hg-gold-${uid}`;
  const lg = `hg-lg-${uid}`;
  const band = `hg-band-${uid}`;
  const paper = `hg-paper-${uid}`;
  const lat = `hg-lat-${uid}`;
  const latMask = `hg-latm-${uid}`;
  const latFade = `hg-latf-${uid}`;
  const clip = `hg-clip-${uid}`;
  const shade = `hg-shade-${uid}`;
  const glowG = `hg-glow-${uid}`;
  const lanternGlow = `hg-lglow-${uid}`;

  const star8 = 'M-12-12H12V12H-12ZM0-17L17 0 0 17-17 0Z';

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: '480 / 664' }}
    >
      {/* Soft warm halo behind the arch */}
      <div
        aria-hidden="true"
        className="hg-glow pointer-events-none absolute -inset-[14%]"
        style={{
          background:
            'radial-gradient(50% 46% at 50% 44%, hsl(var(--bmc-gold-light) / 0.38) 0%, hsl(var(--bmc-gold-light) / 0.12) 48%, transparent 74%)',
        }}
      />

      <svg
        viewBox="0 -60 480 664"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gold} gradientUnits="userSpaceOnUse" x1="0" y1="-60" x2="480" y2="604">
            <stop offset="0" stopColor="#b08a30" />
            <stop offset="0.3" stopColor="#d6b04c" />
            <stop offset="0.5" stopColor="#ecd283" />
            <stop offset="0.72" stopColor="#b88f35" />
            <stop offset="1" stopColor="#86661f" />
          </linearGradient>
          <linearGradient id={lg} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="120">
            <stop offset="0" stopColor="#9b7a2a" />
            <stop offset="0.45" stopColor="#e3c777" />
            <stop offset="0.6" stopColor="#f6e7b4" />
            <stop offset="1" stopColor="#b08a33" />
          </linearGradient>
          <linearGradient id={band} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="560">
            <stop offset="0" stopColor="hsl(42 62% 90%)" />
            <stop offset="1" stopColor="hsl(39 48% 80%)" />
          </linearGradient>
          <radialGradient id={paper} gradientUnits="userSpaceOnUse" cx="240" cy="330" r="270">
            <stop offset="0" stopColor="hsl(42 70% 99%)" />
            <stop offset="0.65" stopColor="hsl(41 50% 96%)" />
            <stop offset="1" stopColor="hsl(40 40% 92%)" />
          </radialGradient>
          <radialGradient id={lanternGlow}>
            <stop offset="0" stopColor="#f6dd8a" stopOpacity="0.5" />
            <stop offset="1" stopColor="#f6dd8a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={latFade} gradientUnits="userSpaceOnUse" cx="240" cy="150" r="250">
            <stop offset="0.15" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id={latMask}>
            <rect x="0" y="-60" width="480" height="664" fill={`url(#${latFade})`} />
          </mask>
          <pattern id={lat} width="56" height="56" patternUnits="userSpaceOnUse" x="-4" y="-2">
            <g fill="none" stroke="#b8923a" strokeOpacity="0.7" strokeWidth="0.9" transform="scale(1.1666)">
              {[
                [24, 24],
                [0, 0],
                [48, 0],
                [0, 48],
                [48, 48],
              ].map(([x, y]) => (
                <path key={`${x}-${y}`} d={star8} transform={`translate(${x} ${y})`} />
              ))}
            </g>
          </pattern>
          <linearGradient id={shade} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="330">
            <stop offset="0" stopColor="hsl(38 45% 62%)" stopOpacity="0.38" />
            <stop offset="1" stopColor="hsl(38 45% 62%)" stopOpacity="0" />
          </linearGradient>
          <clipPath id={clip}>
            <path d={PANEL_D} />
          </clipPath>
          <radialGradient id={glowG} gradientUnits="userSpaceOnUse" cx="240" cy="590" r="210" gradientTransform="translate(0 590) scale(1 .12) translate(0 -590)">
            <stop offset="0" stopColor="hsl(158 44% 8%)" stopOpacity="0.28" />
            <stop offset="1" stopColor="hsl(158 44% 8%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="240" cy="588" rx="232" ry="14" fill={`url(#${glowG})`} className="hg-fade" style={d(0.8, 1.2)} />

        {/* Outer arch: band fill, then a drawn gold edge */}
        <path d={OUTER_D} fill={`url(#${band})`} className="hg-fade" style={d(0.2, 1.1)} />
        <path d={OUTER_D} fill="none" stroke={`url(#${gold})`} strokeWidth="2.2" strokeLinejoin="round" pathLength={1} className="hg-draw" style={d(0, 1.9)} />

        {/* Bead ring */}
        <g fill={`url(#${gold})`} className="hg-fade" style={d(1.0, 1.1)}>
          {BEADS.map((p, k) => (
            <circle key={k} cx={f(p[0])} cy={f(p[1])} r={k % 2 ? 1.4 : 2.2} />
          ))}
        </g>

        {/* Middle arch */}
        <path d={MID_D} fill="none" stroke={`url(#${gold})`} strokeWidth="1.5" strokeLinecap="round" pathLength={1} className="hg-draw" style={d(0.3, 1.7)} />

        {/* Ivory panel with scalloped edge */}
        <path d={PANEL_D} fill={`url(#${paper})`} className="hg-fade" style={d(0.55, 1.1)} />
        <g clipPath={`url(#${clip})`}>
          <rect x="0" y="-60" width="480" height="664" fill={`url(#${lat})`} mask={`url(#${latMask})`} className="hg-fade" style={d(1.0, 1.6)} />
        </g>
        <path d={PANEL_D} fill={`url(#${shade})`} className="hg-fade" style={d(0.8, 1.2)} />
        <path d={PANEL_D} fill="none" stroke={`url(#${gold})`} strokeWidth="1.7" strokeLinejoin="round" pathLength={1} className="hg-draw" style={d(0.5, 1.9)} />

        {/* Lanterns */}
        {LANTERNS.map((l, k) => {
          const y = edgeY(l.x) - 1;
          return (
            <g key={k} transform={`translate(${l.x - 20 * l.scale} ${f(y)}) scale(${l.scale})`}>
              <g className="hg-drop" style={d(l.d)}>
                <circle cx="20" cy={l.ext + 62} r="26" fill={`url(#${lanternGlow})`} />
                <g className="hg-sway" style={{ ['--hg-s' as string]: `${l.s}s`, ['--hg-sd' as string]: `${l.sd}s` }}>
                  <LanternShape ext={l.ext} gid={lg} />
                </g>
              </g>
            </g>
          );
        })}

        {/* Stars */}
        {STARS.map((s, k) => (
          <g key={k} transform={`translate(${s.x} ${s.y})`}>
            <g className="hg-fade" style={d(1.9 + k * 0.12, 0.8)}>
              <g transform={`scale(${s.r})`}>
                <path d={SPARKLE} fill={`url(#${gold})`} className="hg-star" style={{ ['--hg-t' as string]: `${s.t}s`, ['--hg-td' as string]: `${s.td}s` }} />
              </g>
            </g>
          </g>
        ))}

        {/* Finial: crescent and star above the tip */}
        <g transform="translate(240 -24)" className="hg-fade" style={d(1.6, 1)}>
          <g transform="rotate(-62)">
            <path d="M0-24A24 24 0 1 0 0 24A26 26 0 0 1 0-24Z" fill={`url(#${gold})`} />
          </g>
          <g transform="translate(15 -9) scale(6)">
            <path d={SPARKLE} fill={`url(#${gold})`} className="hg-star" style={{ ['--hg-t' as string]: '3.4s' }} />
          </g>
        </g>

        {/* Plinth */}
        <g>
          <path d="M14 520H466V542H14Z" fill={`url(#${band})`} className="hg-fade" style={d(0.9, 1)} />
          <path d="M14 520H466V542H14Z" fill="none" stroke={`url(#${gold})`} strokeWidth="1.3" strokeLinejoin="round" pathLength={1} className="hg-draw" style={d(0.9, 1.4)} />
          <path d="M0 542H480V574H0Z" fill={`url(#${band})`} className="hg-fade" style={d(1.0, 1)} />
          <path d="M0 542H480V574H0Z" fill="none" stroke={`url(#${gold})`} strokeWidth="1.5" strokeLinejoin="round" pathLength={1} className="hg-draw" style={d(1.0, 1.5)} />
          {/* Arabesque scroll, mirrored about the centre */}
          <g fill="none" stroke={`url(#${gold})`} strokeWidth="1.6" strokeLinecap="round" className="hg-fade" style={d(1.5, 1.1)}>
            {[false, true].map((mirror) => (
              <g key={String(mirror)} transform={mirror ? 'translate(480 0) scale(-1 1)' : undefined}>
                <path d="M256 558C276 558 282 548 298 548C318 548 324 565 308 566C298 566.5 295 556 304 555" />
                <path d="M298 548C306 541 318 540 326 545" />
                <path d="M326 545C340 553 352 566 372 563C392 560 396 548 410 548C424 548 432 556 442 556" />
                <path d="M372 563C378 552 388 549 396 553" />
                <path d="M410 548C414 541 422 538 430 541" />
              </g>
            ))}
            <path d="M240 549L249 558 240 567 231 558Z" fill={`url(#${gold})`} />
          </g>
        </g>
      </svg>

      <img
        src="/assets/mascot-2.webp"
        alt="Illustration of Mualimah and two students reading the Qur'an, with the Beginners Madrasah Classes banner"
        width={800}
        height={640}
        fetchPriority="high"
        decoding="async"
        draggable={false}
        className="hg-mascot absolute h-auto"
        style={{ left: '12.1%', width: '75.8%', top: `${((211 + 60) / 664) * 100}%` }}
      />
    </div>
  );
}
