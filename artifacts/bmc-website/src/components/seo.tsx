import { SITE_URL, SITE_NAME } from '@/lib/structured-data';

/** Short brand suffix keeps full titles under ~60 characters. */
const TITLE_SUFFIX = ' | Beginners Madrasah';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  /** JSON-LD objects for this page (see lib/structured-data.ts). */
  jsonLd?: object | object[];
}

/**
 * Per-page metadata. React 19 hoists title/meta/link tags rendered anywhere
 * in the tree into <head>, so this can just be dropped into each page.
 */
export function Seo({ title, description, path, image, noIndex, jsonLd }: SeoProps) {
  const fullTitle = path === '/' ? title : `${title}${TITLE_SUFFIX}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!noIndex && <link rel="canonical" href={url} />}
      <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_ZA" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON-LD is data, not code. Escape "<" so content can't close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
