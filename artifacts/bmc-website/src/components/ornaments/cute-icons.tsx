import type { ReactNode } from 'react';
import { LETTERS } from './madrasah';

/**
 * Cute drawn icons (founder 2026-10-28: "use cute icons where necessary").
 * Same palette as steps-art / programme-scenes: forest, tan, gold, ivory page.
 * Rules: every icon names the thing beside it (no decoration-only icons), faceless, no Qur'anic text.
 * Decorative: aria-hidden (the text next to it says the same thing).
 */

const FOREST = 'hsl(158 44% 18%)';
const FOREST_2 = 'hsl(158 34% 30%)';
const MINT = 'hsl(150 28% 78%)';
const TAN = 'hsl(36 46% 42%)';
const PAGE = 'hsl(42 60% 96%)';
const GOLD = 'hsl(42 62% 58%)';
const BLUSH = 'hsl(10 62% 80%)';

function Svg({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

function Sparkle({ x, y, r = 3 }: { x: number; y: number; r?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${r})`} d="M0-1C.1-.28.28-.1 1 0 .28.1.1.28 0 1-.1.28-.28.1-1 0-.28-.1-.1-.28 0-1Z" fill={GOLD} />;
}

type IconProps = { className?: string };

/** Belief (Aqaaid): crescent and star. */
export const BeliefIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M27 8a16 16 0 1 0 13 25A13 13 0 1 1 27 8Z" fill={FOREST} />
    <path d="M35 14l1.6 3.4 3.7.4-2.8 2.5.8 3.6-3.3-1.9-3.3 1.9.8-3.6-2.8-2.5 3.7-.4Z" fill={GOLD} />
    <Sparkle x={10} y={10} r={2.4} />
  </Svg>
);

/** Fiqh, salah, wudhu: a prayer mat with a little arch and tassels. */
export const PrayerMatIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="13" y="7" width="22" height="34" rx="4" fill={FOREST} />
    <path d="M18 24v-6a6 6 0 0 1 12 0v6Z" fill={PAGE} />
    <rect x="17" y="28" width="14" height="3" rx="1.5" fill={GOLD} />
    <rect x="17" y="33" width="14" height="3" rx="1.5" fill={MINT} />
    <path d="M16 41v3M20 41v3M24 41v3M28 41v3M32 41v3M16 4v3M20 4v3M24 4v3M28 4v3M32 4v3" stroke={GOLD} strokeWidth="1.6" />
  </Svg>
);

/** Recitation, reading, Tajweed: an open book on a stand with little sound waves. */
export const ReciteIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M24 18c-4-3-9-3.5-15-3v18c6-.5 11 0 15 3 4-3 9-3.5 15-3V15c-6-.5-11 0-15 3Z" fill={PAGE} stroke={FOREST} strokeWidth="2" />
    <path d="M24 18v18" stroke={FOREST} strokeWidth="2" />
    <path d="M12 21h8M12 25h8M28 21h8M28 25h6" stroke={MINT} strokeWidth="2" />
    <path d="M14 36l-4 7M34 36l4 7M10 43h28" stroke={TAN} strokeWidth="2.4" />
    <path d="M36 8c2 1.5 2 4.5 0 6M40 6c3.3 2.6 3.3 7.4 0 10" stroke={GOLD} strokeWidth="2" />
  </Svg>
);

/** A drawn letter (same shapes as the hero letters) inside a soft block. */
function LetterBlock({ x, y, size, fill, ink, name, rotate = 0 }: { x: number; y: number; size: number; fill: string; ink: string; name: keyof typeof LETTERS; rotate?: number }) {
  const k = (size * 0.78) / 100;
  const off = size * 0.11;
  return (
    <g transform={`rotate(${rotate} ${x + size / 2} ${y + size / 2})`}>
      <rect x={x} y={y} width={size} height={size} rx={size * 0.26} fill={fill} />
      <path d={LETTERS[name]} fill={ink} transform={`translate(${x + off} ${y + off}) scale(${k})`} />
    </g>
  );
}

/** Arabic alphabet: three letter blocks (alif, ba, ta). */
export const LettersIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <LetterBlock x={4} y={23} size={19} fill={FOREST} ink={PAGE} name="ba" />
    <LetterBlock x={25} y={23} size={19} fill={TAN} ink={PAGE} name="ta" />
    <LetterBlock x={14.5} y={4} size={19} fill={GOLD} ink={FOREST} name="alif" rotate={-8} />
  </Svg>
);

/** Joining letters into words: two letter blocks pulled together, with a word bar below. */
export const JoinIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <LetterBlock x={6} y={8} size={17} fill={FOREST} ink={PAGE} name="ba" />
    <LetterBlock x={25} y={8} size={17} fill={TAN} ink={PAGE} name="dal" />
    <path d="M10 31l-3 3 3 3M38 31l3 3-3 3" stroke={GOLD} strokeWidth="2" />
    <rect x="12" y="31" width="24" height="7" rx="3.5" fill={MINT} />
    <Sparkle x={24} y={44} r={2.2} />
  </Svg>
);

/** Reading fluency, progressing to the Mushaf: a closed Mushaf resting on a stand. */
export const MushafIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="12" y="6" width="24" height="25" rx="3" fill={FOREST} />
    <path d="M24 12l5 6.5-5 6.5-5-6.5Z" fill="none" stroke={GOLD} strokeWidth="1.8" />
    <path d="M10 30l28 12M38 30L10 42" stroke={TAN} strokeWidth="3.2" />
    <Sparkle x={41} y={9} r={2.6} />
  </Svg>
);

/** Seerah, history, stories of the Prophets: a green dome with a crescent finial. */
export const DomeIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M24 9v4" stroke={GOLD} strokeWidth="2" />
    <path d="M22 7.5a2.6 2.6 0 1 0 3.6 2.6 2.2 2.2 0 1 1-3.6-2.6Z" fill={GOLD} />
    <path d="M11 30a13 13 0 0 1 26 0Z" fill={FOREST_2} />
    <rect x="9" y="30" width="30" height="12" rx="2" fill={PAGE} stroke={FOREST} strokeWidth="2" />
    <path d="M21 42v-6a3 3 0 0 1 6 0v6" fill={FOREST} />
    <rect x="3" y="20" width="4" height="22" rx="2" fill={TAN} />
    <path d="M5 16v4" stroke={GOLD} strokeWidth="2" />
    <Sparkle x={42} y={14} r={2.6} />
  </Svg>
);

/** Character, kindness, warmth: a soft heart with a shine. */
export const HeartIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M24 40S7 30 7 18.5A8.5 8.5 0 0 1 24 15a8.5 8.5 0 0 1 17 3.5C41 30 24 40 24 40Z" fill={FOREST} />
    <path d="M13 17.5a4 4 0 0 1 4-3.5" stroke={MINT} strokeWidth="2.2" />
    <circle cx="33" cy="22" r="2.4" fill={BLUSH} />
    <Sparkle x={40} y={8} r={2.8} />
  </Svg>
);

/** Hadith: a rolled scroll. */
export const ScrollIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="12" y="10" width="24" height="28" rx="2" fill={PAGE} stroke={FOREST} strokeWidth="2" />
    <rect x="8" y="6" width="32" height="6" rx="3" fill={TAN} />
    <rect x="8" y="36" width="32" height="6" rx="3" fill={TAN} />
    <path d="M17 18h14M17 23h14M17 28h9" stroke={FOREST_2} strokeWidth="2" />
    <circle cx="33" cy="30" r="3" fill={GOLD} />
  </Svg>
);

/** Duas: two open hands raised, with a sparkle above. */
export const DuaIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M23 40c-7 0-12-5-13-11l-2-11a2 2 0 0 1 4-.6L14 25V13a2 2 0 0 1 4 0v12" fill={MINT} stroke={FOREST} strokeWidth="2" />
    <path d="M25 40c7 0 12-5 13-11l2-11a2 2 0 0 0-4-.6L34 25V13a2 2 0 0 0-4 0v12" fill={MINT} stroke={FOREST} strokeWidth="2" />
    <path d="M23 40V26M25 40V26" stroke={FOREST} strokeWidth="2" />
    <Sparkle x={24} y={10} r={3.4} />
    <Sparkle x={9} y={7} r={1.8} />
    <Sparkle x={39} y={7} r={1.8} />
  </Svg>
);

/** Memorising: a closed book with a heart bookmark. */
export const MemoriseIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="11" y="7" width="26" height="34" rx="3" fill={FOREST} />
    <rect x="11" y="35" width="26" height="6" rx="2" fill={PAGE} stroke={FOREST} strokeWidth="2" />
    <path d="M18 18l6-6 6 6-6 6Z" fill="none" stroke={GOLD} strokeWidth="1.8" />
    <path d="M30 4v14l3-2.5 3 2.5V4" fill={BLUSH} />
    <Sparkle x={42} y={24} r={2.6} />
  </Svg>
);

/** Schedule: a little calendar with three marked days. */
export const CalendarIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="7" y="10" width="34" height="31" rx="5" fill={PAGE} stroke={FOREST} strokeWidth="2" />
    <path d="M7 15a5 5 0 0 1 5-5h24a5 5 0 0 1 5 5v4H7Z" fill={FOREST} />
    <path d="M16 6v7M32 6v7" stroke={TAN} strokeWidth="2.6" />
    <circle cx="15" cy="27" r="3" fill={GOLD} />
    <circle cx="24" cy="27" r="3" fill={GOLD} />
    <circle cx="33" cy="27" r="3" fill={MINT} />
    <circle cx="15" cy="35" r="3" fill={MINT} />
    <circle cx="24" cy="35" r="3" fill={GOLD} />
  </Svg>
);

/** Revision: a book inside a looping arrow. */
export const RevisionIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M38 20a15 15 0 0 0-27-5M10 28a15 15 0 0 0 27 5" stroke={TAN} strokeWidth="2.6" />
    <path d="M9 9v7h7M39 39v-7h-7" stroke={TAN} strokeWidth="2.6" />
    <rect x="17" y="16" width="14" height="17" rx="2" fill={FOREST} />
    <path d="M21 22h6" stroke={GOLD} strokeWidth="2" />
  </Svg>
);

/** Questions, discussion: two chat bubbles. */
export const ChatIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 12a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H15l-6 5v-5.5A5 5 0 0 1 6 20Z" fill={FOREST} />
    <path d="M17 13.5a3 3 0 1 1 3.2 3v1.5" stroke={PAGE} strokeWidth="2" />
    <circle cx="20" cy="21" r="1.2" fill={PAGE} />
    <path d="M42 26a5 5 0 0 0-5-5H25a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h9l5 4v-4.4A5 5 0 0 0 42 32Z" fill={MINT} />
    <circle cx="26" cy="29" r="1.6" fill={FOREST} />
    <circle cx="31" cy="29" r="1.6" fill={FOREST} />
    <circle cx="36" cy="29" r="1.6" fill={FOREST} />
  </Svg>
);

/** Personal guidance, corrections: a page with a gentle tick and a pencil. */
export const GuidanceIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="8" y="7" width="24" height="32" rx="3" fill={PAGE} stroke={FOREST} strokeWidth="2" />
    <path d="M13 15h14M13 20h10" stroke={MINT} strokeWidth="2" />
    <path d="M13 28l4 4 8-9" stroke={GOLD} strokeWidth="2.6" />
    <path d="M36 12l5 5-14 14-6 1 1-6Z" fill={TAN} />
    <path d="M36 12l5 5" stroke={FOREST} strokeWidth="2" />
  </Svg>
);

/** Small class / together: three faceless figures in hijab. */
export const GroupIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 40c0-6 3-10 7-10s7 4 7 10Z" fill={MINT} />
    <path d="M28 40c0-6 3-10 7-10s7 4 7 10Z" fill={MINT} />
    <path d="M7.5 26a5.5 6 0 0 1 11 0v4h-11Z" fill={TAN} />
    <path d="M29.5 26a5.5 6 0 0 1 11 0v4h-11Z" fill={TAN} />
    <path d="M15 42c0-8 4-13 9-13s9 5 9 13Z" fill={FOREST} />
    <path d="M17 22a7 7.5 0 0 1 14 0v7H17Z" fill={FOREST_2} />
    <ellipse cx="24" cy="22.5" rx="4" ry="4.4" fill={PAGE} />
    <Sparkle x={24} y={8} r={2.6} />
  </Svg>
);

/** Progress, accountability: a star badge on a ribbon. */
export const ProgressIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M17 28l-5 14 6-3 3 5 4-12M31 28l5 14-6-3-3 5-4-12" fill={TAN} />
    <circle cx="24" cy="20" r="13" fill={FOREST} />
    <path d="M24 12.5l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5-3.7-3.4 5-.6Z" fill={GOLD} />
  </Svg>
);

/** Ramadan, topics: a hanging lantern. */
export const LanternIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M24 3v5" stroke={TAN} strokeWidth="2" />
    <path d="M18 12l6-4 6 4Z" fill={FOREST} />
    <path d="M16 14h16l-2 22H18Z" fill={FOREST_2} />
    <path d="M19 17h10l-1.5 15h-7Z" fill={GOLD} />
    <path d="M24 20c2 2.5 2 6 0 8-2-2-2-5.5 0-8Z" fill={PAGE} />
    <rect x="15" y="36" width="18" height="4" rx="2" fill={FOREST} />
    <path d="M24 40v4" stroke={TAN} strokeWidth="2" />
    <Sparkle x={38} y={14} r={2.6} />
    <Sparkle x={9} y={26} r={2} />
  </Svg>
);

/** A few minutes: a round little alarm clock. */
export const ClockIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="12" cy="11" r="5" fill={TAN} />
    <circle cx="36" cy="11" r="5" fill={TAN} />
    <circle cx="24" cy="26" r="15" fill={FOREST} />
    <circle cx="24" cy="26" r="11" fill={PAGE} />
    <path d="M24 19v7l5 3" stroke={FOREST} strokeWidth="2.4" />
    <path d="M14 41l-3 3M34 41l3 3" stroke={TAN} strokeWidth="2.4" />
    <circle cx="24" cy="26" r="1.6" fill={GOLD} />
  </Svg>
);

/** Have ready: a clipboard with ticks. */
export const ChecklistIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="9" y="8" width="30" height="35" rx="4" fill={TAN} />
    <rect x="13" y="12" width="22" height="27" rx="2" fill={PAGE} />
    <rect x="18" y="5" width="12" height="7" rx="2.5" fill={FOREST} />
    <path d="M16 20l2 2 3.5-3.5M16 29l2 2 3.5-3.5" stroke={FOREST_2} strokeWidth="2" />
    <path d="M25 21h7M25 30h7" stroke={MINT} strokeWidth="2.2" />
    <Sparkle x={42} y={8} r={2.4} />
  </Svg>
);

/** What happens next: a chat bubble with a heart. */
export const ReplyHeartIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M6 14a7 7 0 0 1 7-7h22a7 7 0 0 1 7 7v12a7 7 0 0 1-7 7H19l-8 7v-7.3A7 7 0 0 1 6 26Z" fill={FOREST} />
    <path d="M24 28s-7-4.2-7-9a3.6 3.6 0 0 1 7-1.2 3.6 3.6 0 0 1 7 1.2c0 4.8-7 9-7 9Z" fill={BLUSH} />
    <Sparkle x={42} y={40} r={2.6} />
  </Svg>
);

/** How it began: a seedling in a pot. */
export const SeedlingIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M24 30V17" stroke={FOREST} strokeWidth="2.4" />
    <path d="M24 20c0-6-5-10-12-10 0 7 5 10 12 10Z" fill={FOREST_2} />
    <path d="M24 17c0-5 4-9 10-9 0 6-4 9-10 9Z" fill={MINT} />
    <path d="M13 30h22l-3 12H16Z" fill={TAN} />
    <rect x="11" y="28" width="26" height="5" rx="2.5" fill={FOREST} />
    <Sparkle x={40} y={20} r={2.4} />
  </Svg>
);

/** The gap we noticed: a magnifying glass over a small question mark. */
export const NoticeIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <circle cx="20" cy="20" r="12" fill={PAGE} stroke={FOREST} strokeWidth="3" />
    <path d="M29 29l11 11" stroke={TAN} strokeWidth="5" />
    <path d="M16.5 16.5a3.6 3.6 0 1 1 4.6 3.5c-.8.3-1.1.9-1.1 1.7v1" stroke={FOREST_2} strokeWidth="2.2" />
    <circle cx="20" cy="26.5" r="1.3" fill={FOREST_2} />
    <Sparkle x={38} y={10} r={2.4} />
  </Svg>
);

/** Life gets in the way: a warm mug beside a busy little calendar page. */
export const BusyIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="22" y="6" width="20" height="22" rx="3" fill={PAGE} stroke={FOREST} strokeWidth="2" />
    <path d="M22 11h20" stroke={FOREST} strokeWidth="2" />
    <path d="M26 16h4M33 16h5M26 21h7" stroke={GOLD} strokeWidth="2" />
    <path d="M6 24h20v10a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8Z" fill={FOREST} />
    <path d="M26 27h2a4 4 0 0 1 0 8h-2" stroke={FOREST} strokeWidth="2.4" />
    <path d="M12 14c-1.5 2 1.5 3 0 5M18 14c-1.5 2 1.5 3 0 5" stroke={TAN} strokeWidth="1.8" />
  </Svg>
);

/** Our solution: a laptop with a heart on screen. */
export const LaptopHeartIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="9" y="9" width="30" height="21" rx="3" fill={FOREST} />
    <rect x="12" y="12" width="24" height="15" rx="1.5" fill={PAGE} />
    <path d="M24 24.5s-5-3-5-6.4a2.6 2.6 0 0 1 5-.9 2.6 2.6 0 0 1 5 .9c0 3.4-5 6.4-5 6.4Z" fill={BLUSH} />
    <path d="M4 33h40l-3 5H7Z" fill={TAN} />
    <Sparkle x={42} y={9} r={2.4} />
  </Svg>
);

/** Online classes and logistics: a laptop showing a small class call. */
export const LaptopClassIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="8" y="9" width="32" height="22" rx="3" fill={FOREST} />
    <rect x="11" y="12" width="12" height="7.5" rx="1.5" fill={MINT} />
    <rect x="25" y="12" width="12" height="7.5" rx="1.5" fill={PAGE} />
    <rect x="11" y="21" width="12" height="7" rx="1.5" fill={PAGE} />
    <rect x="25" y="21" width="12" height="7" rx="1.5" fill={GOLD} />
    <path d="M3 34h42l-3 5H6Z" fill={TAN} />
    <Sparkle x={43} y={8} r={2.4} />
  </Svg>
);

/** Payments and fees: a soft coin purse with a coin. */
export const PurseIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M16 17c0-5 3.5-8 8-8s8 3 8 8" stroke={TAN} strokeWidth="2.6" />
    <path d="M7 22a5 5 0 0 1 5-5h24a5 5 0 0 1 5 5v13a6 6 0 0 1-6 6H13a6 6 0 0 1-6-6Z" fill={FOREST} />
    <path d="M41 25h-8a3.5 3.5 0 0 0 0 7h8Z" fill={FOREST_2} />
    <circle cx="33.5" cy="28.5" r="1.6" fill={GOLD} />
    <circle cx="14" cy="9" r="5" fill={GOLD} />
    <path d="M14 6.5v5" stroke={TAN} strokeWidth="1.6" />
  </Svg>
);

/** Fallback for "what you'll learn" items with no closer match: an open book. */
export const BookIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M24 14c-5-3.5-11-4-17-3v25c6-1 12-.5 17 3 5-3.5 11-4 17-3V11c-6-1-12-.5-17 3Z" fill={PAGE} stroke={FOREST} strokeWidth="2" />
    <path d="M24 14v25" stroke={FOREST} strokeWidth="2" />
    <path d="M11 18h8M11 23h8M29 18h8M29 23h6" stroke={MINT} strokeWidth="2" />
    <Sparkle x={40} y={6} r={2.4} />
  </Svg>
);

/** Pick the icon that says what an item is about. Order matters: the first match wins. */
const RULES: [RegExp, (p: IconProps) => ReactNode][] = [
  [/topics include/i, LanternIcon],
  [/joining/i, JoinIcon],
  [/alphabet|letter/i, LettersIcon],
  [/mushaf/i, MushafIcon],
  [/aqaaid|belief|pillars of/i, BeliefIcon],
  [/fiqh|wudh|salah|salaah|worship/i, PrayerMatIcon],
  [/seerah|history|prophets and/i, DomeIcon],
  [/hadith/i, ScrollIcon],
  [/\bdua'?s?\b/i, DuaIcon],
  [/revision|keep what/i, RevisionIcon],
  [/surah|memoris/i, MemoriseIcon],
  [/tajweed|recitation|pronunciation|reading|fluency/i, ReciteIcon],
  [/akhlaaq|character|kindness|encouragement|warm|welcoming/i, HeartIcon],
  [/live sessions|times a week|schedule/i, CalendarIcon],
  [/accountab|progress/i, ProgressIcon],
  [/small class|face-to-face|together/i, GroupIcon],
  [/question|discussion|interactive/i, ChatIcon],
  [/guidance|correction/i, GuidanceIcon],
  [/topics|ramadan/i, LanternIcon],
];

export function iconFor(text: string): (p: IconProps) => ReactNode {
  return RULES.find(([re]) => re.test(text))?.[1] ?? BookIcon;
}

/** Soft ivory-gold tile that holds a cute icon at a consistent size. */
export function IconTile({ Icon, size = 'md' }: { Icon: (p: IconProps) => ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  const box = size === 'lg' ? 'size-16 rounded-[1.1rem]' : size === 'sm' ? 'size-11 rounded-xl' : 'size-14 rounded-2xl';
  const art = size === 'lg' ? 'size-12' : size === 'sm' ? 'size-8' : 'size-10';
  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-[hsl(var(--bmc-gold-light)/0.55)] ${box}`} aria-hidden="true">
      <Icon className={art} />
    </span>
  );
}
