import { LaptopBookIcon } from './steps-art';

/**
 * About page header art (founder 2026-10-27: "design something for this section specifically").
 * A gold path climbing through four milestones taken from the client's own story text.
 * Each icon matches its words. Labels are real text (readable, translatable); the path is decorative.
 */

export function SeedlingIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 40V22" />
      <path d="M24 26C24 18 18 13 10 13C10 21 16 26 24 26Z" />
      <path d="M24 22C24 14.5 29.5 9.5 37.5 9.5C37.5 17 32 22 24 22Z" />
      <path d="M15 40H33" />
    </svg>
  );
}

function PlayLessonIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="7" y="10" width="34" height="24" rx="4" />
      <path d="M21 17L29 22 21 27Z" fill="currentColor" stroke="none" />
      <path d="M14 40H34M24 34V40" />
    </svg>
  );
}

function StudentsIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="24" cy="15" r="5.5" />
      <path d="M13.5 38C13.5 30 18 25.5 24 25.5S34.5 30 34.5 38" />
      <circle cx="11.5" cy="19" r="4" />
      <path d="M4.5 36C4.5 30.5 7.5 27.5 11.5 27.5C13 27.5 14.3 27.9 15.4 28.6" />
      <circle cx="36.5" cy="19" r="4" />
      <path d="M43.5 36C43.5 30.5 40.5 27.5 36.5 27.5C35 27.5 33.7 27.9 32.6 28.6" />
    </svg>
  );
}

const MILESTONES = [
  { Icon: SeedlingIcon, title: 'Established 2024', sub: 'Born from a passion for teaching', x: 10, y: 80 },
  { Icon: LaptopBookIcon, title: 'Live online classes', sub: 'From R150 a month', x: 38, y: 59 },
  { Icon: PlayLessonIcon, title: 'Google Classroom', sub: 'Lessons in your own time', x: 64, y: 38 },
  { Icon: StudentsIcon, title: '300+ students', sub: 'And growing', x: 89, y: 14 },
];

const PATH = 'M50 320C110 318 140 248 190 236S282 186 320 152S400 70 445 56';

function Node({ m, k, labelSide }: { m: (typeof MILESTONES)[number]; k: number; labelSide: 'right' | 'left' }) {
  const { Icon } = m;
  return (
    <div
      className="sp-node absolute flex items-center gap-3"
      style={{
        left: `${m.x}%`,
        top: `${m.y}%`,
        translate: labelSide === 'right' ? '-1.75rem -50%' : 'calc(-100% + 1.75rem) -50%',
        flexDirection: labelSide === 'right' ? 'row' : 'row-reverse',
        ['--sp-d' as string]: `${0.9 + k * 0.35}s`,
      }}
    >
      <span className="relative inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-bmc-paper text-primary shadow-lift ring-1 ring-[hsl(var(--bmc-gold)/0.55)]">
        <Icon size={28} />
      </span>
      <span className={`whitespace-nowrap ${labelSide === 'right' ? 'text-left' : 'text-right'}`}>
        <span className="block font-display text-[1.15rem] leading-tight text-primary-foreground">{m.title}</span>
        <span className="block font-utility text-[0.85rem] text-primary-foreground/75">{m.sub}</span>
      </span>
    </div>
  );
}

export function StoryPath() {
  return (
    <>
      {/* Tablet and up: the climbing path */}
      <div className="relative hidden aspect-[5/4] w-full sm:block" role="list" aria-label="Our journey so far">
        <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="sp-gold" x1="0" y1="400" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#b08a30" />
              <stop offset="0.5" stopColor="#e3c777" />
              <stop offset="1" stopColor="#9b7a2a" />
            </linearGradient>
          </defs>
          <path d={PATH} fill="none" stroke="hsl(158 30% 30%)" strokeWidth="14" strokeLinecap="round" />
          <path d={PATH} fill="none" stroke="url(#sp-gold)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 0" pathLength={1} className="hg-draw" style={{ ['--hg-dur' as string]: '2.2s', ['--hg-d' as string]: '0.3s' }} />
          {/* little footsteps of light along the way */}
          {[0.18, 0.33, 0.5, 0.66, 0.82].map((t, k) => (
            <circle key={k} r="2.6" fill="#d6b04c" className="hg-fade" style={{ ['--hg-d' as string]: `${1 + k * 0.25}s`, offsetPath: `path('${PATH}')`, offsetDistance: `${t * 100}%` }} />
          ))}
        </svg>
        {MILESTONES.map((m, k) => (
          <div role="listitem" key={m.title}>
            <Node m={m} k={k} labelSide={k >= 2 ? 'left' : 'right'} />
          </div>
        ))}
      </div>

      {/* Phones: the same journey as a simple vertical timeline */}
      <ol className="relative space-y-6 pl-1 sm:hidden" aria-label="Our journey so far">
        {MILESTONES.map(({ Icon, title, sub }) => (
          <li key={title} className="flex items-center gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-bmc-paper text-primary shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.55)]">
              <Icon size={24} />
            </span>
            <span>
              <span className="block font-display text-[1.1rem] leading-tight text-primary-foreground">{title}</span>
              <span className="block font-utility text-[0.85rem] text-primary-foreground/75">{sub}</span>
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
