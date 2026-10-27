import type { CSSProperties } from 'react';
import { LETTERS } from './madrasah';

/**
 * "How to start" illustrations, drawn in the madrasah line language (founder 2026-10-27:
 * replace the stock photos with our own graphics). Forest fills, gold-ink lines, ivory pages.
 * Decorative: aria-hidden. No Qur'anic text.
 */

const INK = 'hsl(var(--bmc-gold-ink))';
const FOREST = 'hsl(158 44% 18%)';
const FOREST_2 = 'hsl(158 34% 30%)';
const TAN = 'hsl(36 46% 42%)';
const PAGE = 'hsl(42 60% 96%)';
const GOLD = 'hsl(42 62% 58%)';

function Frame({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 200 150" aria-hidden="true" focusable="false" className={className} style={style}>
      {children}
    </svg>
  );
}

function Sparkle({ x, y, r = 5 }: { x: number; y: number; r?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${r})`}
      d="M0-1C.1-.28.28-.1 1 0 .28.1.1.28 0 1-.1.28-.28.1-1 0-.28-.1-.1-.28 0-1Z"
      fill={GOLD}
    />
  );
}

/** 1. Choose a programme: a row of kitabs, one lifted out and chosen. */
export function ChooseArt({ className = '' }: { className?: string }) {
  const books = [
    { x: 44, w: 16, h: 70, c: FOREST },
    { x: 61, w: 13, h: 62, c: TAN },
    { x: 75, w: 18, h: 74, c: FOREST_2 },
    { x: 125, w: 15, h: 66, c: TAN },
    { x: 141, w: 17, h: 72, c: FOREST },
  ];
  return (
    <Frame className={className}>
      <ellipse cx="100" cy="122" rx="74" ry="6" fill="hsl(40 30% 82%)" />
      <rect x="34" y="112" width="132" height="8" rx="2" fill={TAN} />
      {books.map((b, k) => (
        <g key={k}>
          <rect x={b.x} y={112 - b.h} width={b.w} height={b.h} rx="2" fill={b.c} />
          <rect x={b.x + 3} y={112 - b.h + 8} width={b.w - 6} height="3" rx="1" fill={GOLD} opacity=".8" />
          <rect x={b.x + 3} y={112 - 14} width={b.w - 6} height="3" rx="1" fill={GOLD} opacity=".8" />
        </g>
      ))}
      {/* the chosen book, lifted and tilted forward */}
      <g transform="translate(108 30) rotate(-12)">
        <rect x="-11" y="0" width="22" height="70" rx="2.5" fill={FOREST} />
        <rect x="-7" y="9" width="14" height="3" rx="1" fill={GOLD} />
        <path d="M0 26L3 31 0 36 -3 31Z" fill={GOLD} />
        <rect x="-7" y="56" width="14" height="3" rx="1" fill={GOLD} />
      </g>
      {/* gentle check bubble */}
      <circle cx="146" cy="28" r="13" fill={PAGE} stroke={INK} strokeWidth="1.4" />
      <path d="M140 28.5L144.5 33 152.5 24" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <Sparkle x={56} y={26} r={5} />
      <Sparkle x={168} y={58} r={3.5} />
    </Frame>
  );
}

/** 2. Register: a phone with a short WhatsApp-style chat. */
export function RegisterArt({ className = '' }: { className?: string }) {
  return (
    <Frame className={className}>
      <ellipse cx="100" cy="134" rx="46" ry="5" fill="hsl(40 30% 82%)" />
      <rect x="70" y="10" width="60" height="120" rx="11" fill={FOREST} />
      <rect x="75" y="20" width="50" height="100" rx="5" fill={PAGE} />
      <rect x="92" y="13.5" width="16" height="3" rx="1.5" fill={FOREST_2} />
      {/* incoming bubble */}
      <path d="M80 34H106C108.2 34 110 35.8 110 38V48C110 50.2 108.2 52 106 52H86L80 57Z" fill="hsl(40 34% 88%)" />
      <rect x="85" y="40" width="18" height="2.6" rx="1.3" fill={INK} opacity=".55" />
      <rect x="85" y="45" width="12" height="2.6" rx="1.3" fill={INK} opacity=".55" />
      {/* outgoing bubble */}
      <path d="M120 62H94C91.8 62 90 63.8 90 66V78C90 80.2 91.8 82 94 82H114L120 87Z" fill={FOREST_2} />
      <rect x="95" y="68" width="18" height="2.6" rx="1.3" fill={PAGE} opacity=".9" />
      <rect x="95" y="73" width="11" height="2.6" rx="1.3" fill={PAGE} opacity=".9" />
      {/* typing dots */}
      <rect x="80" y="94" width="24" height="12" rx="6" fill="hsl(40 34% 88%)" />
      <circle cx="86" cy="100" r="1.8" fill={INK} />
      <circle cx="92" cy="100" r="1.8" fill={INK} opacity=".7" />
      <circle cx="98" cy="100" r="1.8" fill={INK} opacity=".45" />
      {/* floating message icon */}
      <g transform="translate(150 40)">
        <circle r="15" fill={PAGE} stroke={INK} strokeWidth="1.4" />
        <path d="M-7 -4H7V5H-1L-5 9V5H-7Z" fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      <Sparkle x={48} y={46} r={5} />
      <Sparkle x={156} y={92} r={3.5} />
    </Frame>
  );
}

/** 3. Join your first class: an open book and a beginner's slate with alif and ba. */
export function FirstClassArt({ className = '' }: { className?: string }) {
  return (
    <Frame className={className}>
      <ellipse cx="100" cy="128" rx="78" ry="6" fill="hsl(40 30% 82%)" />
      {/* low table */}
      <rect x="28" y="108" width="144" height="9" rx="3" fill={TAN} />
      <rect x="40" y="117" width="8" height="10" rx="1.5" fill={TAN} />
      <rect x="152" y="117" width="8" height="10" rx="1.5" fill={TAN} />
      {/* slate (takhti) standing behind */}
      <g transform="translate(126 12) rotate(6)">
        <rect x="0" y="0" width="46" height="62" rx="6" fill="hsl(36 42% 62%)" />
        <rect x="5" y="6" width="36" height="50" rx="3" fill={PAGE} />
        <path d="M18 -6C18 -9 28 -9 28 -6V2" fill="none" stroke={TAN} strokeWidth="2" strokeLinecap="round" />
        <g fill={FOREST}>
          <path d={LETTERS.alif} transform="translate(22 10) scale(.2)" />
          <path d={LETTERS.ba} transform="translate(5 30) scale(.22)" />
        </g>
      </g>
      {/* open book */}
      <path d="M100 82C88 74 66 72 46 76V106C66 102 88 104 100 112Z" fill={PAGE} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M100 82C112 74 134 72 154 76V106C134 102 112 104 100 112Z" fill={PAGE} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M100 82V112" stroke={INK} strokeWidth="1.4" />
      <path d="M44 106C64 102 86 104 100 113C114 104 136 102 156 106V110C136 106 114 108 100 116C86 108 64 106 44 110Z" fill={FOREST} />
      <g stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity=".45">
        <path d="M56 84C66 82.5 78 83 88 86.5M56 91C66 89.5 78 90 88 93.5M56 98C66 96.5 76 97 84 100" />
        <path d="M112 86.5C122 83 134 82.5 144 84M112 93.5C122 90 134 89.5 144 91" />
      </g>
      <Sparkle x={70} y={52} r={6} />
      <Sparkle x={92} y={36} r={3.5} />
      <Sparkle x={40} y={64} r={3} />
    </Frame>
  );
}

/** Online learning: a laptop with an open book on the screen. currentColor line icon. */
export function LaptopBookIcon({ size = 28, className = '', strokeWidth = 1.4 }: { size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <path d="M10 13C10 11.9 10.9 11 12 11H36C37.1 11 38 11.9 38 13V31H10Z" />
      <path d="M5 31H43L41 36H7Z" />
      <path d="M24 18.5C21.5 16.8 17.8 16.4 15 17V26C17.8 25.4 21.5 25.8 24 27.5C26.5 25.8 30.2 25.4 33 26V17C30.2 16.4 26.5 16.8 24 18.5Z" />
      <path d="M24 18.5V27.5" />
    </svg>
  );
}
