import type { ComponentType, ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { GirihPattern, Rosette } from '@/components/ornaments';
import {
  BookStackIcon,
  HEADER_SCATTER,
  HeroLetters,
  MasjidIcon,
  MasjidSkyline,
  OpenBookIcon,
  RehalIcon,
  SlateIcon,
  TasbihIcon,
} from '@/components/ornaments/madrasah';

/**
 * Shared page furniture for every inner page, so each one reads as the same madrasah as Home:
 * rehal section mark, gold-ink eyebrow, Lora heading, scattered letters, masjid skyline at the foot.
 * No rules, no underlines: spacing and soft shadow do the separating (founder 2026-10-26).
 */

export const CONTAINER = 'container mx-auto px-5 md:px-10';
export const SECTION_Y = 'py-20 md:py-32';
export const H2_STYLE = { fontSize: 'clamp(1.85rem, 3.2vw, 2.6rem)' } as const;
export const H2 = 'text-primary leading-[1.1] tracking-[-0.018em]';
/** Raised white card: soft shadow plus a hairline gold ring, the same as Home's programme cards. */
export const CARD = 'rounded-[1.25rem] bg-card shadow-soft ring-1 ring-[hsl(var(--bmc-gold)/0.3)]';

type IconType = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

/** One madrasah motif per programme, matched to what it teaches. */
export const PROGRAMME_ICONS: Record<string, IconType> = {
  '/womens-classes': BookStackIcon,
  '/hifdh-classes': TasbihIcon,
  '/childrens-classes': SlateIcon,
  '/workshops': OpenBookIcon,
  '/quran-classes': RehalIcon,
  '/in-person-workshops': MasjidIcon,
};

export function IconChip({ Icon, size = 30, className = '' }: { Icon: IconType; size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background text-bmc-gold-ink shadow-soft ${className}`}
    >
      <Icon size={size} strokeWidth={1.3} />
    </span>
  );
}

export function TagList({ tags, className = '' }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Programme tags">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-[hsl(var(--bmc-gold)/0.6)] px-2.5 py-0.5 font-utility text-[0.7rem] font-semibold tracking-[0.05em] text-bmc-gold-ink">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Small solid eight-point star used as a list marker. */
export function StarBullet({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-14 -14 28 28" aria-hidden="true" focusable="false" className={`h-4 w-4 shrink-0 text-bmc-gold-ink ${className}`}>
      <g fill="currentColor" opacity=".85">
        <rect x="-9" y="-9" width="18" height="18" />
        <rect x="-9" y="-9" width="18" height="18" transform="rotate(45)" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------------- */

export function PageHeader({
  eyebrow,
  title,
  intro,
  back,
  mark,
  image,
  imageAlt = '',
  art,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Optional "back" link shown at the top of the header. */
  back?: { href: string; label: string };
  /** Optional mark above the heading (the programme icon on class pages, the Bismillah on About). */
  mark?: ReactNode;
  /** When set, the header becomes two columns: text left, framed photo right. */
  image?: string;
  imageAlt?: string;
  /** Custom art for the right column (split layout), e.g. the About story path. */
  art?: ReactNode;
  children?: ReactNode;
}) {
  const split = Boolean(image || art);
  return (
    // Forest green like the programme pages (founder 2026-10-28, option 1): one brand colour across every inner page.
    <header className="on-dark relative overflow-hidden bg-primary pt-32 pb-20 text-primary-foreground md:pt-40 md:pb-28">
      <GirihPattern />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(42rem 30rem at 80% 42%, hsl(var(--bmc-gold) / 0.22) 0%, transparent 70%), radial-gradient(34rem 24rem at 0% 100%, hsl(var(--bmc-gold) / 0.12) 0%, transparent 70%)',
        }}
      />
      <Rosette className="absolute right-0 top-0 hidden h-[24rem] w-[36rem] sm:block" origin="100% 0%" opacity={0.1} />
      {!split && <HeroLetters items={HEADER_SCATTER} />}

      <div className={`relative ${CONTAINER}`}>
        {back && (
          <div className="mb-8 md:mb-10">
            <Link href={back.href} className="inline-flex min-h-11 items-center gap-2 font-utility text-sm font-semibold text-bmc-gold-light hover:text-primary-foreground">
              <ArrowLeft size={16} aria-hidden="true" /> {back.label}
            </Link>
          </div>
        )}
        <div className={split ? 'grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20' : ''}>
          <div className={split ? '' : 'mx-auto flex max-w-3xl flex-col items-center text-center'}>
            {mark && <div className={`mb-6 ${split ? '' : 'flex justify-center'}`}>{mark}</div>}
            {eyebrow && <p className="bmc-rise bmc-eyebrow mb-5 leading-[1.9]">{eyebrow}</p>}
            <h1
              className="bmc-rise text-primary-foreground leading-[1.04] tracking-[-0.024em]"
              style={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.3rem)' }}
            >
              {title}
            </h1>
            {intro && (
              <p
                className="bmc-rise bmc-rise-2 mt-7 leading-[1.7] text-primary-foreground/85"
                style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', maxWidth: '44ch' }}
              >
                {intro}
              </p>
            )}
            {children && <div className="bmc-rise bmc-rise-3 mt-9">{children}</div>}
          </div>
          {split && art && <div className="mx-auto w-full max-w-xl lg:max-w-none">{art}</div>}
          {split && image && (
            <div className="bmc-photo mx-auto w-full max-w-xl lg:max-w-none">
              <img src={image} alt={imageAlt} width={1200} height={900} decoding="async" fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/** Section heading: rehal mark, optional eyebrow, Lora heading, optional intro. */
export function SectionHead({
  title,
  eyebrow,
  intro,
  center = false,
  light = false,
  className = '',
}: {
  title: ReactNode;
  eyebrow?: string;
  intro?: ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && <p className={`bmc-eyebrow mb-4 ${light ? 'on-dark' : ''}`}>{eyebrow}</p>}
      <h2 className={`${light ? 'text-primary-foreground' : H2} leading-[1.1] tracking-[-0.018em]`} style={H2_STYLE}>
        {title}
      </h2>
      {intro && <p className={`mt-5 text-[1.08rem] leading-[1.7] ${light ? 'text-primary-foreground/85' : 'text-foreground/80'}`}>{intro}</p>}
    </div>
  );
}

/** Light closing band (warm gold on ivory) so the page does not end in two dark blocks; the dark skyline is the step into the footer. */
export function ClosingBand({
  title,
  children,
  actions,
}: {
  title?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--bmc-gold-light)/0.42)] text-foreground">
      <div className={`relative ${CONTAINER} pb-40 pt-24 text-center md:pb-52 md:pt-32`}>
        <div className="bmc-reveal mx-auto max-w-3xl">
          {title && (
            <h2 className="mx-auto mb-6 max-w-2xl leading-[1.1] tracking-[-0.018em] text-primary" style={{ fontSize: 'clamp(1.95rem, 3.6vw, 2.8rem)' }}>
              {title}
            </h2>
          )}
          {children && <div className="mx-auto mb-11 max-w-2xl text-[1.12rem] leading-[1.7] text-foreground/80">{children}</div>}
          {actions && <div className="flex flex-wrap items-center justify-center gap-4">{actions}</div>}
        </div>
      </div>
      <MasjidSkyline
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-28 w-full max-w-[90rem] sm:h-36 lg:h-44"
        color="hsl(158 46% 10.5%)"
        crescent="hsl(40 58% 62%)"
      />
    </section>
  );
}
