// Build-time entry: renders one route to HTML for scripts/prerender.mjs.
import { prerenderToNodeStream } from 'react-dom/static';
import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';
import { PROGRAMMES } from '@/data/programmes';
import { ALL_WORKSHOPS, currentOnlineWorkshops } from '@/data/workshops';
import { programmeUrlPath, SITE_URL, SITE_NAME } from '@/lib/structured-data';

export { PROGRAMMES, ALL_WORKSHOPS, currentOnlineWorkshops, programmeUrlPath, SITE_URL, SITE_NAME };

export async function render(path: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <ErrorBoundary>
      <App ssrPath={path} />
    </ErrorBoundary>,
  );
  let html = '';
  for await (const chunk of prelude) html += chunk.toString();
  return html;
}
