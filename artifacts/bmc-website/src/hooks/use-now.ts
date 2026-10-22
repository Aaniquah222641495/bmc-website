import { useEffect, useState } from 'react';

declare const __BUILD_TIME__: string;

/** The build time on first render (matches the prerendered HTML), then the real time after load. */
export function useNow(): Date {
  const [now, setNow] = useState(() => new Date(__BUILD_TIME__));
  useEffect(() => setNow(new Date()), []);
  return now;
}
