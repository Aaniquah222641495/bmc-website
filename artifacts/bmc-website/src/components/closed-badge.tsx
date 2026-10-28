/** Shown wherever a programme appears while its registration is closed (CMS: "Registration closed"). */
export function ClosedBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full bg-bmc-gold-light px-2.5 py-0.5 font-utility text-[0.78rem] font-bold uppercase tracking-[0.1em] text-primary ${className}`}>
      Registration closed
    </span>
  );
}
