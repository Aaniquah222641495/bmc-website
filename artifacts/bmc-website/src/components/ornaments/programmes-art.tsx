/**
 * Programmes header art (founder 2026-10-27: a hero specific to this page).
 * The page is one choice, online or in person, so each option gets its own small scene.
 * Same palette and line language as the How to start illustrations. Decorative: aria-hidden.
 */

const INK = 'hsl(var(--bmc-gold-ink))';
const FOREST = 'hsl(158 44% 18%)';
const FOREST_2 = 'hsl(158 34% 30%)';
const TAN = 'hsl(36 46% 42%)';
const PAGE = 'hsl(42 60% 96%)';
const GOLD = 'hsl(42 62% 58%)';
const SKIN = ['hsl(28 45% 62%)', 'hsl(24 38% 44%)', 'hsl(30 50% 72%)'];

function Person({ x, y, s = 1, scarf, skin }: { x: number; y: number; s?: number; scarf: string; skin: string }) {
  // Faceless, modest figure: head with hijab and shoulders, as in a video-call tile
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-11 14C-11 6 -6 2 0 2S11 6 11 14Z" fill={scarf} />
      <circle cx="0" cy="-4" r="6.5" fill={scarf} />
      <circle cx="0" cy="-3" r="4.3" fill={skin} />
    </g>
  );
}

export function OnlineArt({ className = '' }: { className?: string }) {
  const tiles = [
    { x: 58, y: 38, c: 'hsl(40 34% 88%)', scarf: FOREST, skin: SKIN[0] },
    { x: 92, y: 38, c: 'hsl(158 20% 86%)', scarf: TAN, skin: SKIN[1] },
    { x: 126, y: 38, c: 'hsl(40 34% 88%)', scarf: FOREST_2, skin: SKIN[2] },
    { x: 58, y: 66, c: 'hsl(158 20% 86%)', scarf: 'hsl(20 40% 70%)', skin: SKIN[1] },
    { x: 92, y: 66, c: 'hsl(40 40% 82%)', scarf: 'hsl(0 0% 15%)', skin: SKIN[0], teacher: true },
    { x: 126, y: 66, c: 'hsl(40 34% 88%)', scarf: 'hsl(210 30% 72%)', skin: SKIN[2] },
  ];
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true" focusable="false" className={className}>
      <ellipse cx="100" cy="128" rx="80" ry="6" fill="hsl(40 30% 82%)" />
      {/* laptop */}
      <rect x="40" y="22" width="120" height="78" rx="6" fill={FOREST} />
      <rect x="45" y="27" width="110" height="68" rx="3" fill={PAGE} />
      {tiles.map((t, k) => (
        <g key={k}>
          <rect x={t.x - 15} y={t.y - 12} width="30" height="24" rx="3" fill={t.c} stroke={t.teacher ? GOLD : 'none'} strokeWidth="1.5" />
          <Person x={t.x} y={t.y + 1} s={0.8} scarf={t.scarf} skin={t.skin} />
        </g>
      ))}
      <path d="M26 100H174L166 112H34Z" fill={FOREST_2} />
      <rect x="88" y="100" width="24" height="3" rx="1.5" fill={FOREST} />
      {/* cup of tea beside it: learning from home */}
      <path d="M170 98H184V108C184 112 181 115 177 115C173 115 170 112 170 108Z" fill={PAGE} stroke={INK} strokeWidth="1.2" />
      <path d="M184 101C188 101 188 107 184 107" fill="none" stroke={INK} strokeWidth="1.2" />
      <path d="M174 92C174 89 177 89 177 86M180 92C180 89 183 89 183 86" fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}

export function InPersonArt({ className = '' }: { className?: string }) {
  // Zoomed viewBox (same 10:7 ratio as OnlineArt) so the scene fills its tile.
  return (
    <svg viewBox="18 30 164 115" aria-hidden="true" focusable="false" className={className}>
      <ellipse cx="100" cy="130" rx="80" ry="6" fill="hsl(40 30% 82%)" />
      {/* floor rug */}
      <ellipse cx="100" cy="112" rx="78" ry="20" fill={FOREST} />
      <ellipse cx="100" cy="112" rx="70" ry="15.5" fill="none" stroke={GOLD} strokeWidth="1.3" />
      {/* floor cushions, one each side: a teacher and a student */}
      <ellipse cx="44" cy="108" rx="18" ry="8" fill={TAN} />
      <ellipse cx="44" cy="105" rx="16" ry="5.5" fill="hsl(36 46% 54%)" />
      <ellipse cx="156" cy="108" rx="18" ry="8" fill={TAN} />
      <ellipse cx="156" cy="105" rx="16" ry="5.5" fill="hsl(36 46% 54%)" />
      {/* low reading stand holding an open book */}
      <path d="M100 86L84 112M100 86L116 112" stroke="hsl(26 52% 36%)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M100 62C90 55 74 54 60 57V82C74 79 90 80 100 87C110 80 126 79 140 82V57C126 54 110 55 100 62Z" fill={PAGE} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M100 62V87" stroke={INK} strokeWidth="1.4" />
      <path d="M58 82C74 79 90 80 100 88C110 80 126 79 142 82V86C126 83 110 84 100 92C90 84 74 83 58 86Z" fill={FOREST_2} />
      <g stroke={INK} strokeWidth="1.1" strokeLinecap="round" opacity=".45">
        <path d="M68 63C76 61.5 85 62 93 65M68 69.5C76 68 85 68.5 93 71.5M68 76C76 74.5 83 75 89 77.5" />
        <path d="M107 65C115 62 124 61.5 132 63M107 71.5C115 68.5 124 68 132 69.5" />
      </g>
      {/* tasbih resting on the rug */}
      {Array.from({ length: 14 }, (_, k) => {
        const a = (Math.PI * 2 * k) / 14;
        return <circle key={k} cx={(138 + 10 * Math.cos(a)).toFixed(1)} cy={(121 + 4.2 * Math.sin(a)).toFixed(1)} r="1.7" fill="hsl(30 40% 28%)" />;
      })}
      <circle cx="127.5" cy="121" r="2.2" fill={GOLD} />
      {/* a small stack of kitabs */}
      <rect x="52" y="117" width="26" height="6" rx="1.5" fill={FOREST_2} />
      <rect x="54" y="111.5" width="22" height="5.5" rx="1.5" fill={TAN} />
      <rect x="57" y="113.2" width="16" height="1.6" rx=".8" fill={GOLD} />
    </svg>
  );
}
