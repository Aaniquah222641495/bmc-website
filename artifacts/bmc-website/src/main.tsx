import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

const root = document.getElementById('root')!;
const tree = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
// Keeps caught errors off reportError(), which would raise the dev overlay.
const onCaughtError = (error: unknown, errorInfo: { componentStack?: string }) => {
  console.error(error, errorInfo.componentStack);
};

if (root.hasChildNodes()) {
  // Prerendered page (scripts/prerender.mjs). Its <head> tags are there for crawlers;
  // remove them so React's own <Seo> tags don't duplicate them, then attach to the HTML.
  document.head.querySelectorAll('[data-prerendered]').forEach((el) => el.remove());
  hydrateRoot(root, tree, { onCaughtError });
} else {
  createRoot(root, { onCaughtError }).render(tree);
}
