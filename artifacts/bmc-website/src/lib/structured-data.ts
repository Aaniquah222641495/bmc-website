// Structured data (JSON-LD) for search engines and AI assistants.
// Built from the same content the pages show (content/*.json via src/data), so edits made
// in /admin flow through on the next deploy. Only facts that appear on the site go here.
import { PROGRAMMES, type Programme } from '@/data/programmes';
import { type Workshop } from '@/data/workshops';
import { CATEGORIES } from '@/data/faq';

export const SITE_URL = 'https://beginnersmadrasah.co.za';
export const SITE_NAME = 'Beginners Madrasah Classes';
const ORG_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/#mualimah-rukeya`;
const PHONE = '+27686498593';

export const orgRef = { '@id': ORG_ID };

const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

/** Programme card paths are relative to /programmes (e.g. "/womens-classes"). */
export const programmeUrlPath = (p: Programme) => `/programmes${p.path}`;

/** "R150/month" -> 150 per month; "From R100" -> 100 (lowest); undefined if no rand amount. */
function parsePrice(text?: string): { price: number; monthly: boolean; from: boolean } | undefined {
  const m = text?.match(/R\s?([\d\s]+)/);
  if (!m) return undefined;
  return { price: Number(m[1].replace(/\s/g, '')), monthly: /month/i.test(text!), from: /from/i.test(text!) };
}

export const organization = {
  '@type': 'EducationalOrganization',
  '@id': ORG_ID,
  name: SITE_NAME,
  alternateName: 'BMC',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/assets/bmc-logo-final.webp`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    'A beginner-friendly Islamic learning space for women and children in Cape Town, with online and in-person programmes.',
  foundingDate: '2024',
  founder: { '@id': FOUNDER_ID },
  areaServed: ['Cape Town', 'Western Cape', 'South Africa'],
  address: { '@type': 'PostalAddress', addressLocality: 'Cape Town', addressRegion: 'Western Cape', addressCountry: 'ZA' },
  telephone: PHONE,
  contactPoint: { '@type': 'ContactPoint', telephone: PHONE, contactType: 'Enrolment enquiries', areaServed: 'ZA' },
  sameAs: ['https://instagram.com/beginners_classes'],
};

export const founder = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Mualimah Rukeya',
  jobTitle: 'Founder',
  worksFor: orgRef,
  sameAs: ['https://tiktok.com/@rukeyabaradien_'],
};

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

function courseNode(p: Programme) {
  const price = parsePrice(p.price);
  const url = `${SITE_URL}${programmeUrlPath(p)}`;
  return {
    '@type': 'Course',
    name: p.title,
    description: p.descLong,
    url,
    inLanguage: 'en',
    provider: orgRef,
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: p.type === 'online' ? 'Online' : 'Onsite' },
    ...(price && {
      offers: {
        '@type': 'Offer',
        category: price.monthly ? 'Subscription' : 'Paid',
        priceCurrency: 'ZAR',
        url,
        ...(price.monthly
          ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: price.price, priceCurrency: 'ZAR', unitText: 'MONTH' } }
          : price.from
            ? { priceSpecification: { '@type': 'PriceSpecification', minPrice: price.price, priceCurrency: 'ZAR' } }
            : { price: price.price }),
      },
    }),
  };
}

/** Home: who we are. */
export const homeJsonLd = () =>
  graph(
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, publisher: orgRef, inLanguage: 'en-ZA' },
    organization,
    founder,
  );

/** About: the organisation and its founder. */
export const aboutJsonLd = () =>
  graph({ '@type': 'AboutPage', url: `${SITE_URL}/about`, about: orgRef }, organization, founder, breadcrumbJsonLd([{ name: 'Our Story', path: '/about' }]));

/** Programmes listing: every programme as a Course. */
export const programmesJsonLd = () =>
  graph(
    {
      '@type': 'ItemList',
      name: 'Programmes',
      itemListElement: PROGRAMMES.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: courseNode(p) })),
    },
    breadcrumbJsonLd([{ name: 'Programmes', path: '/programmes' }]),
  );

/** One programme detail page, looked up by its URL path. */
export function programmeJsonLd(urlPath: string) {
  const p = PROGRAMMES.find((x) => programmeUrlPath(x) === urlPath);
  const name = p?.title ?? 'Programme';
  return graph(
    ...(p ? [courseNode(p)] : []),
    breadcrumbJsonLd([
      { name: 'Programmes', path: '/programmes' },
      { name, path: urlPath },
    ]),
  );
}

/** "29 August 2026" + "09:00 – 11:30" -> ISO with South African time (+02:00). */
function withTime(date: string, time: string | undefined, part: 0 | 1) {
  const t = time?.match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
  return t ? `${date}T${t[part + 1].padStart(5, '0')}:00+02:00` : date;
}

/** Upcoming online workshops as Events. Only dated, not-yet-past workshops (callers pass the current list). */
export function eventsJsonLd(workshops: Workshop[], pageUrlPath: string) {
  return workshops
    .filter((w) => w.startDate)
    .map((w) => {
      const detail = (label: string) => w.details?.find((d) => d.label.toLowerCase() === label)?.value;
      const price = parsePrice(detail('investment'));
      const time = detail('time');
      return {
        '@type': 'Event',
        name: w.title,
        description: w.description,
        startDate: withTime(w.startDate!, time, 0),
        endDate: withTime(w.endDate ?? w.startDate!, time, 1),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode:
          w.page === 'online' ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
        ...(w.page === 'online' && { location: { '@type': 'VirtualLocation', url: w.registrationUrl ?? `${SITE_URL}${pageUrlPath}` } }),
        ...(w.image && { image: `${SITE_URL}${w.image}` }),
        organizer: orgRef,
        url: `${SITE_URL}${pageUrlPath}`,
        ...(price && {
          offers: { '@type': 'Offer', price: price.price, priceCurrency: 'ZAR', url: w.registrationUrl ?? `${SITE_URL}${pageUrlPath}`, availability: 'https://schema.org/InStock' },
        }),
      };
    });
}

/** FAQ page: the visible questions and answers, word for word. */
export const faqJsonLd = () =>
  graph(
    {
      '@type': 'FAQPage',
      mainEntity: CATEGORIES.flatMap((c) => c.items).map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    breadcrumbJsonLd([{ name: 'FAQ', path: '/faq' }]),
  );

export const contactJsonLd = () =>
  graph({ '@type': 'ContactPage', url: `${SITE_URL}/contact`, about: orgRef }, organization, breadcrumbJsonLd([{ name: 'Contact', path: '/contact' }]));

export const simplePageJsonLd = (name: string, path: string) => graph(breadcrumbJsonLd([{ name, path }]));

export { graph };
