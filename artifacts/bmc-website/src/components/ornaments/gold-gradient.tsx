/** Metallic gold gradient for ornament strokes. Render inside an <svg><defs>. Use a unique id per SVG (useId). */
export function GoldGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#8a6a22" />
      <stop offset="0.38" stopColor="#d6b45c" />
      <stop offset="0.52" stopColor="#f1dfa2" />
      <stop offset="1" stopColor="#a8822f" />
    </linearGradient>
  );
}
