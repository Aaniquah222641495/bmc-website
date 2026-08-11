/**
 * MughalArch — SVG decorative frame in the style of a Mughal mihrab (prayer niche).
 * Pointed keel/ogee arch with double-line gold border and ornamental details.
 * Used as an absolute overlay; pointer-events are disabled so content beneath is clickable.
 */
export function MughalArch({ className = '' }: { className?: string }) {
  const gold = '#C9A84C';
  const goldFaint = 'rgba(201,168,76,0.45)';
  const goldVeryFaint = 'rgba(201,168,76,0.22)';

  return (
    <svg
      viewBox="0 0 540 710"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* ── Outer rectangular frame ─────────────────────────────── */}
      <rect x="6"  y="6"  width="528" height="698" stroke={gold}      strokeWidth="2.5" />
      <rect x="17" y="17" width="506" height="676" stroke={goldFaint}  strokeWidth="1"   />

      {/* ── Corner ornaments ─────────────────────────────────────── */}
      {/* Top-left */}
      <g stroke={gold} strokeWidth="1.2" opacity="0.7">
        <line x1="17"  y1="42"  x2="52"  y2="42"  />
        <line x1="42"  y1="17"  x2="42"  y2="52"  />
        <circle cx="42" cy="42" r="7" strokeWidth="1" />
        <circle cx="42" cy="42" r="3" fill={gold} />
      </g>
      {/* Top-right */}
      <g stroke={gold} strokeWidth="1.2" opacity="0.7">
        <line x1="488" y1="42"  x2="523" y2="42"  />
        <line x1="498" y1="17"  x2="498" y2="52"  />
        <circle cx="498" cy="42" r="7" strokeWidth="1" />
        <circle cx="498" cy="42" r="3" fill={gold} />
      </g>

      {/* ── Outer arch path — the pointed keel/ogee arch ─────────── */}
      {/*
          Arch anatomy:
          - Two vertical columns: x=62 (left) and x=478 (right), from y=710 to y=430 (springing line)
          - Lower concave section: slight outward bulge (arch widens above springing line)
          - Upper convex section: curves sharply inward to meet at the pointed keystone (270, 62)
      */}
      <path
        d="
          M 62 710
          L 62 430
          C 62 368, 28 328, 28 282
          C 28 210, 108 140, 270 62
          C 432 140, 512 210, 512 282
          C 512 328, 478 368, 478 430
          L 478 710
        "
        stroke={gold}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* ── Inner arch path (double-line effect) ─────────────────── */}
      <path
        d="
          M 76 710
          L 76 432
          C 76 376, 46 340, 46 296
          C 46 232, 120 166, 270 90
          C 420 166, 494 232, 494 296
          C 494 340, 464 376, 464 432
          L 464 710
        "
        stroke={goldFaint}
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* ── Keystone ornament — 8-pointed star at arch tip ──────── */}
      <g transform="translate(270, 62)">
        {/* Outer star */}
        <polygon
          points="0,-13 3,-3 13,0 3,3 0,13 -3,3 -13,0 -3,-3"
          fill={gold}
        />
        {/* Rotated 45° star */}
        <polygon
          points="0,-9 2.2,-2.2 9,0 2.2,2.2 0,9 -2.2,2.2 -9,0 -2.2,-2.2"
          fill={gold}
          transform="rotate(45)"
          opacity="0.7"
        />
        {/* Centre dot */}
        <circle r="4" fill={gold} />
      </g>

      {/* ── Spandrel decorations (corners between arch and frame) ── */}
      {/* Left spandrel chain of small diamonds */}
      <g fill={gold} opacity="0.5">
        <polygon points="42,160  49,167  42,174  35,167" />
        <polygon points="42,188  48,194  42,200  36,194" />
        <polygon points="42,216  47,221  42,226  37,221" />
      </g>
      {/* Right spandrel chain */}
      <g fill={gold} opacity="0.5">
        <polygon points="498,160  505,167  498,174  491,167" />
        <polygon points="498,188  504,194  498,200  492,194" />
        <polygon points="498,216  503,221  498,226  493,221" />
      </g>

      {/* ── Horizontal rule lines at top and bottom of spandrel ─── */}
      <line x1="17"  y1="110" x2="62"  y2="110" stroke={goldVeryFaint} strokeWidth="1" />
      <line x1="478" y1="110" x2="523" y2="110" stroke={goldVeryFaint} strokeWidth="1" />

      {/* ── Small star in upper-left spandrel corner ─────────────── */}
      <polygon
        points="42,90  44.5,84  47,90  41,86.5  43,86.5"
        fill={gold}
        opacity="0.55"
        transform="translate(-2,0)"
      />
      {/* ── Small star in upper-right spandrel corner ─────────────── */}
      <polygon
        points="498,90  500.5,84  503,90  497,86.5  499,86.5"
        fill={gold}
        opacity="0.55"
        transform="translate(-2,0)"
      />

      {/* ── Flanking vertical dotted lines (pilaster hint) ───────── */}
      <line x1="44" y1="430" x2="44" y2="650" stroke={goldVeryFaint} strokeWidth="1" strokeDasharray="4 6" />
      <line x1="496" y1="430" x2="496" y2="650" stroke={goldVeryFaint} strokeWidth="1" strokeDasharray="4 6" />
    </svg>
  );
}
