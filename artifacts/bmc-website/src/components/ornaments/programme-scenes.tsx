import type { ReactNode } from 'react';
import { LETTERS } from './madrasah';
import { FOREST, FOREST_2, GOLD, INK, InPersonArt, PAGE, Person, SKIN, TAN } from './programmes-art';

/**
 * One drawn scene per programme for the class-page hero (founder 2026-10-27: pages lacked colour and assets).
 * Each scene shows how that programme actually runs, taken from its own description. Decorative: aria-hidden.
 * Faceless figures, no Qur'anic text (book pages are plain strokes).
 */

function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true" focusable="false" className={className}>
      {children}
    </svg>
  );
}

function Shadow({ rx = 80 }: { rx?: number }) {
  return <ellipse cx="100" cy="130" rx={rx} ry="6" fill="hsl(40 30% 82%)" />;
}

/** Laptop with a screen area of x 45..155, y 27..95. */
function Laptop({ children }: { children: ReactNode }) {
  return (
    <g>
      <rect x="40" y="22" width="120" height="78" rx="6" fill={FOREST} />
      <rect x="45" y="27" width="110" height="68" rx="3" fill={PAGE} />
      {children}
      <path d="M26 100H174L166 112H34Z" fill={FOREST_2} />
      <rect x="88" y="100" width="24" height="3" rx="1.5" fill={FOREST} />
    </g>
  );
}

function Cup({ x = 170, y = 98 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x - 170} ${y - 98})`}>
      <path d="M170 98H184V108C184 112 181 115 177 115C173 115 170 112 170 108Z" fill={PAGE} stroke={INK} strokeWidth="1.2" />
      <path d="M184 101C188 101 188 107 184 107" fill="none" stroke={INK} strokeWidth="1.2" />
      <path d="M174 92C174 89 177 89 177 86M180 92C180 89 183 89 183 86" fill="none" stroke={INK} strokeWidth="1" strokeLinecap="round" opacity=".6" />
    </g>
  );
}

function Calendar({ x, y, days }: { x: number; y: number; days: boolean[] }) {
  // A small week card; filled dots are class days.
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="44" height="36" rx="5" fill={PAGE} stroke={INK} strokeWidth="1.2" />
      <path d="M0 5C0 2.2 2.2 0 5 0H39C41.8 0 44 2.2 44 5V10H0Z" fill={TAN} />
      {days.map((on, k) => (
        <circle key={k} cx={6 + (k % 4) * 10.7} cy={k < 4 ? 18 : 28} r="3.2" fill={on ? FOREST : 'hsl(40 30% 86%)'} />
      ))}
    </g>
  );
}

function Child({ x, y, s = 1, boy, skin }: { x: number; y: number; s?: number; boy: boolean; skin: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-9 14C-9 7 -5 4 0 4S9 7 9 14Z" fill={boy ? 'hsl(0 0% 96%)' : 'hsl(330 35% 72%)'} />
      {boy ? (
        <>
          <circle cx="0" cy="-2" r="5" fill={skin} />
          <path d="M-5 -4C-5 -8.5 5 -8.5 5 -4Z" fill="hsl(0 0% 98%)" stroke="hsl(40 20% 80%)" strokeWidth=".6" />
        </>
      ) : (
        <>
          <circle cx="0" cy="-3" r="6" fill="hsl(330 35% 72%)" />
          <circle cx="0" cy="-2.2" r="3.8" fill={skin} />
        </>
      )}
    </g>
  );
}

/** Women's Online Madrasah: pre-recorded lessons, learn at your own pace. */
export function WomensScene({ className = '' }: { className?: string }) {
  return (
    <Frame className={className}>
      <Shadow />
      <Laptop>
        <rect x="49" y="31" width="102" height="60" rx="3" fill="hsl(40 34% 88%)" />
        <Person x={84} y={62} s={1.25} scarf={'hsl(0 0% 15%)'} skin={SKIN[0]} />
        {/* lesson notes beside the teacher */}
        <rect x="104" y="42" width="38" height="30" rx="2" fill={PAGE} />
        <g fill={INK} opacity=".45">
          <rect x="108" y="47" width="28" height="2.4" rx="1.2" />
          <rect x="108" y="53" width="22" height="2.4" rx="1.2" />
          <rect x="108" y="59" width="26" height="2.4" rx="1.2" />
          <rect x="108" y="65" width="16" height="2.4" rx="1.2" />
        </g>
        {/* play button and progress: a recorded lesson */}
        <circle cx="100" cy="60" r="9" fill={FOREST} opacity=".88" />
        <path d="M97 55.5L104.5 60 97 64.5Z" fill={PAGE} />
        <rect x="53" y="84" width="94" height="3" rx="1.5" fill="hsl(40 24% 78%)" />
        <rect x="53" y="84" width="40" height="3" rx="1.5" fill={GOLD} />
        <circle cx="93" cy="85.5" r="3" fill={GOLD} />
      </Laptop>
      <Cup />
      {/* notebook and pen */}
      <rect x="10" y="102" width="26" height="18" rx="2" fill={TAN} transform="rotate(-8 23 111)" />
      <rect x="13" y="104" width="20" height="14" rx="1.5" fill={PAGE} transform="rotate(-8 23 111)" />
    </Frame>
  );
}

/** Women's Hifdh: memorisation, live Tue & Thu. */
export function HifdhScene({ className = '' }: { className?: string }) {
  return (
    <Frame className={className}>
      <Shadow rx={70} />
      {/* reading stand and open book */}
      <path d="M92 104L72 128M92 104L112 128" stroke="hsl(26 52% 36%)" strokeWidth="5" strokeLinecap="round" />
      <path d="M92 74C80 65 60 63 42 67V100C60 96 80 98 92 107C104 98 124 96 142 100V67C124 63 104 65 92 74Z" fill={PAGE} stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M92 74V107" stroke={INK} strokeWidth="1.5" />
      <path d="M40 100C60 96 80 98 92 108C104 98 124 96 144 100V105C124 101 104 103 92 113C80 103 60 101 40 105Z" fill={FOREST_2} />
      <g stroke={INK} strokeWidth="1.3" strokeLinecap="round" opacity=".45">
        <path d="M52 76C62 74 74 75 84 79M52 84C62 82 74 83 84 87M52 92C62 90 72 91 80 94" />
        <path d="M100 79C110 75 122 74 132 76M100 87C110 83 122 82 132 84M100 95C108 91 118 90 126 91" />
      </g>
      {/* ribbon bookmark: where you are up to */}
      <path d="M118 66V84L122 80 126 84V66" fill={GOLD} />
      {/* tasbih */}
      {Array.from({ length: 16 }, (_, k) => {
        const a = (Math.PI * 2 * k) / 16;
        return <circle key={k} cx={(160 + 13 * Math.cos(a)).toFixed(1)} cy={(118 + 6 * Math.sin(a)).toFixed(1)} r="2" fill="hsl(30 40% 28%)" />;
      })}
      <circle cx="146" cy="118" r="2.6" fill={GOLD} />
      {/* Tue, Thu */}
      <Calendar x={146} y={22} days={[false, true, false, true, false, false, false]} />
    </Frame>
  );
}

/** Children's Online Madrasah: live classes on Teams, ages 6 to 13. */
export function ChildrensScene({ className = '' }: { className?: string }) {
  const tiles = [
    { x: 64, y: 40, c: 'hsl(40 34% 88%)', boy: true, skin: SKIN[0] },
    { x: 100, y: 40, c: 'hsl(158 20% 86%)', boy: false, skin: SKIN[2] },
    { x: 136, y: 40, c: 'hsl(40 40% 82%)', boy: false, skin: SKIN[1] },
    { x: 64, y: 68, c: 'hsl(158 20% 86%)', boy: false, skin: SKIN[0] },
    { x: 100, y: 68, c: 'hsl(40 34% 88%)', boy: true, skin: SKIN[1] },
    { x: 136, y: 68, c: 'hsl(158 20% 86%)', boy: true, skin: SKIN[2] },
  ];
  return (
    <Frame className={className}>
      <Shadow />
      <Laptop>
        {tiles.map((t, k) => (
          <g key={k}>
            <rect x={t.x - 16} y={t.y - 12} width="32" height="24" rx="3" fill={t.c} />
            <Child x={t.x} y={t.y + 1} s={0.85} boy={t.boy} skin={t.skin} />
          </g>
        ))}
      </Laptop>
      {/* beginner's slate with alif and ba */}
      <g transform="translate(150 54) rotate(8)">
        <rect width="38" height="50" rx="5" fill="hsl(36 42% 62%)" />
        <rect x="4" y="5" width="30" height="40" rx="3" fill={PAGE} />
        <g fill={FOREST}>
          <path d={LETTERS.alif} transform="translate(18 8) scale(.16)" />
          <path d={LETTERS.ba} transform="translate(5 25) scale(.18)" />
        </g>
      </g>
      {/* crayons */}
      <rect x="14" y="110" width="22" height="4" rx="2" fill={GOLD} transform="rotate(-14 25 112)" />
      <rect x="18" y="116" width="22" height="4" rx="2" fill={FOREST_2} transform="rotate(-6 29 118)" />
    </Frame>
  );
}

/** Online Workshops & Short Courses: a teacher presenting a topic on screen. */
export function WorkshopsScene({ className = '' }: { className?: string }) {
  return (
    <Frame className={className}>
      <Shadow />
      <Laptop>
        {/* slide */}
        <rect x="49" y="31" width="66" height="44" rx="2" fill={FOREST} />
        <rect x="55" y="38" width="36" height="4" rx="2" fill={GOLD} />
        <g fill={PAGE} opacity=".85">
          <rect x="55" y="48" width="50" height="2.6" rx="1.3" />
          <rect x="55" y="54" width="44" height="2.6" rx="1.3" />
          <rect x="55" y="60" width="48" height="2.6" rx="1.3" />
          <rect x="55" y="66" width="30" height="2.6" rx="1.3" />
        </g>
        {/* presenter */}
        <rect x="119" y="31" width="32" height="44" rx="2" fill="hsl(40 40% 82%)" stroke={GOLD} strokeWidth="1.2" />
        <Person x={135} y={56} s={1.05} scarf={'hsl(0 0% 15%)'} skin={SKIN[0]} />
        {/* attendees strip */}
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k}>
            <rect x={49 + k * 20.6} y="78" width="18" height="13" rx="2" fill={k % 2 ? 'hsl(158 20% 86%)' : 'hsl(40 34% 88%)'} />
            <Person x={58 + k * 20.6} y={85} s={0.45} scarf={[FOREST, TAN, FOREST_2, 'hsl(20 40% 70%)', 'hsl(210 30% 72%)'][k]} skin={SKIN[k % 3]} />
          </g>
        ))}
      </Laptop>
      {/* a set date */}
      <Calendar x={150} y={6} days={[false, false, false, false, false, true, false]} />
      <Cup x={174} y={100} />
    </Frame>
  );
}

/** Get Into Qur'an: Saturday mornings on the rug (also online on Tuesdays). */
export function QuranScene({ className = '' }: { className?: string }) {
  return <InPersonArt className={className} />;
}

/** In-Person Workshops: a teacher presenting to a seated circle of women. */
export function InPersonWorkshopsScene({ className = '' }: { className?: string }) {
  const audience = [
    { x: 46, y: 112, c: FOREST },
    { x: 74, y: 116, c: TAN },
    { x: 102, y: 117, c: 'hsl(20 40% 66%)' },
    { x: 130, y: 115, c: FOREST_2 },
    { x: 60, y: 96, c: 'hsl(210 30% 66%)' },
    { x: 88, y: 99, c: 'hsl(0 0% 22%)' },
    { x: 116, y: 98, c: 'hsl(330 30% 64%)' },
  ];
  return (
    <Frame className={className}>
      <Shadow />
      {/* projector screen */}
      <rect x="34" y="14" width="96" height="58" rx="3" fill={PAGE} stroke={INK} strokeWidth="1.2" />
      <rect x="44" y="24" width="44" height="5" rx="2.5" fill={GOLD} />
      <g fill={INK} opacity=".4">
        <rect x="44" y="36" width="70" height="3" rx="1.5" />
        <rect x="44" y="44" width="62" height="3" rx="1.5" />
        <rect x="44" y="52" width="66" height="3" rx="1.5" />
      </g>
      {/* standing teacher */}
      <g transform="translate(154 40)">
        <path d="M-12 82C-12 50 -10 22 0 22S12 50 12 82Z" fill="hsl(0 0% 15%)" />
        <circle cx="0" cy="12" r="10" fill="hsl(0 0% 15%)" />
        <circle cx="0" cy="13" r="6.5" fill={SKIN[0]} />
      </g>
      {/* seated audience, seen from behind */}
      {audience.map((a, k) => (
        <g key={k} transform={`translate(${a.x} ${a.y})`}>
          <path d="M-13 16C-13 4 -7 -1 0 -1S13 4 13 16Z" fill={a.c} />
          <circle cx="0" cy="-6" r="8" fill={a.c} />
        </g>
      ))}
    </Frame>
  );
}

export const PROGRAMME_SCENES: Record<string, (p: { className?: string }) => ReactNode> = {
  '/womens-classes': WomensScene,
  '/hifdh-classes': HifdhScene,
  '/childrens-classes': ChildrensScene,
  '/workshops': WorkshopsScene,
  '/quran-classes': QuranScene,
  '/online-quran-classes': QuranScene,
  '/in-person-workshops': InPersonWorkshopsScene,
};
