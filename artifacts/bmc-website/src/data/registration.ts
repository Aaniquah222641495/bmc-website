// Registration forms on the class pages (ADR-0031). Visitors fill in our own form; the Apps Script
// web app in apps-script/ submits each one into that class's Google Form, so Mualimah Rukeya keeps
// her Responses view exactly as it is.
//
// Every field's `question` must match the question title in the class's Google Form word for word:
// that is how the script finds where each answer goes. The same lists live in apps-script/Code.gs.
// Change one, change both.

export type FieldKind = 'text' | 'email' | 'phone' | 'date' | 'choice' | 'age' | 'consent';

export interface RegField {
  id: string;
  /** The question title in the Google Form, word for word. */
  question: string;
  /** What the visitor sees, if it should read differently from the form question. */
  label?: string;
  kind: FieldKind;
  required: boolean;
  hint?: string;
  options?: string[];
  autoComplete?: string;
  max?: number;
}

export type ClassKey = 'womens' | 'hifdh' | 'quran' | 'children';
/** Waitlist-only lists: no registration form, people are emailed when a new workshop is published. */
export type WorkshopListKey = 'workshops' | 'in-person-workshops';

/** Programme path (content/settings/programmes.json) to registration form. */
export const CLASS_BY_PATH: Record<string, ClassKey> = {
  '/womens-classes': 'womens',
  '/hifdh-classes': 'hifdh',
  '/quran-classes': 'quran',
  '/childrens-classes': 'children',
};

const ADULT_CONSENT =
  'I agree that Beginners Madrasah Classes may keep these details, including my answer about my faith, to arrange my classes and contact me about them.';

// Adult classes: the questions on the client's current Google Form (read 2026-10-28), plus consent.
const ADULT_FIELDS: RegField[] = [
  { id: 'name', question: 'Full Name & Surname', label: 'Full name and surname', kind: 'text', required: true, autoComplete: 'name', max: 100 },
  { id: 'email', question: 'Email', kind: 'email', required: true, autoComplete: 'email', max: 254 },
  { id: 'dob', question: 'Date of Birth', label: 'Date of birth', kind: 'date', required: true, autoComplete: 'bday' },
  { id: 'whatsapp', question: 'WhatsApp Number', label: 'WhatsApp number', kind: 'phone', required: true, autoComplete: 'tel', hint: 'South African, or with your country code from abroad' },
  { id: 'faith', question: 'Are you a', label: 'Are you a', kind: 'choice', required: true, options: ['Revert', 'Born Muslim', 'Non-Muslim'] },
  { id: 'city', question: 'City & Country', label: 'City and country', kind: 'text', required: true, autoComplete: 'address-level2', max: 100 },
  { id: 'consent', question: 'Consent', label: ADULT_CONSENT, kind: 'consent', required: true },
];

// Children's class: the client's form is behind a Google sign-in, so these are our proposal
// (founder to confirm with the client). A parent registers; only the child's name and age are asked.
const CHILD_FIELDS: RegField[] = [
  { id: 'parentName', question: "Parent or guardian's full name", kind: 'text', required: true, autoComplete: 'name', max: 100 },
  { id: 'email', question: "Parent's email", kind: 'email', required: true, autoComplete: 'email', max: 254 },
  { id: 'whatsapp', question: "Parent's WhatsApp number", kind: 'phone', required: true, autoComplete: 'tel', hint: 'South African, or with your country code from abroad' },
  { id: 'childName', question: "Child's full name", kind: 'text', required: true, autoComplete: 'off', max: 100 },
  { id: 'childAge', question: "Child's age", kind: 'age', required: true, options: ['6', '7', '8', '9', '10', '11', '12', '13'] },
  { id: 'city', question: 'City & Country', label: 'City and country', kind: 'text', required: true, autoComplete: 'address-level2', max: 100 },
  {
    id: 'consent',
    question: 'Parent consent',
    label: "I am this child's parent or guardian, and I agree that Beginners Madrasah Classes may keep these details to arrange my child's classes and contact me about them.",
    kind: 'consent',
    required: true,
  },
];

/** Added to a class's form only when its CMS terms are filled in. The Google Form question title is TERMS_QUESTION. */
export const TERMS_QUESTION = 'I agree to the terms and conditions';
export const TERMS_FIELD: RegField = { id: 'terms', question: TERMS_QUESTION, label: 'I have read and agree to the terms and conditions.', kind: 'consent', required: true };

export const REG_FIELDS: Record<ClassKey, RegField[]> = {
  womens: ADULT_FIELDS,
  hifdh: ADULT_FIELDS,
  quran: ADULT_FIELDS,
  children: CHILD_FIELDS,
};

/**
 * The client's Apps Script web app URL (public by design, no secret). Empty until it is deployed in
 * her Google account: while empty, class pages keep the embedded Google Form exactly as before.
 * VITE_REGISTER_ENDPOINT overrides it for a test deployment. Anything that is not an Apps Script
 * web app URL is ignored, so a typo can never send registrations elsewhere.
 */
const DEFAULT_ENDPOINT = '';
const raw = ((import.meta.env.VITE_REGISTER_ENDPOINT as string | undefined) ?? '').trim() || DEFAULT_ENDPOINT;
/** Demo (VITE_REGISTER_DEMO=1: local, or Cloudflare preview builds, never main): forms show, nothing is sent anywhere. */
export const DEMO = import.meta.env.VITE_REGISTER_DEMO === '1';
export const REGISTER_ENDPOINT = DEMO ? 'demo' : /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(raw) ? raw : '';

/** South African numbers become +27...; international ones keep their country code. Same rule as the script. */
export function normalisePhone(input: string): string | null {
  const digits = input.replace(/[\s\-().]/g, '');
  const za = /^(?:\+27|0027|27|0)([1-9]\d{8})$/.exec(digits);
  if (za) return `+27${za[1]}`;
  const intl = /^(?:\+|00)([1-9]\d{7,14})$/.exec(digits);
  return intl ? `+${intl[1]}` : null;
}

const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

/** Returns a plain-English message per field that needs fixing (empty object when all is well). */
export function validate(fields: RegField[], values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of fields) {
    const v = (values[f.id] ?? '').trim();
    if (f.kind === 'consent') {
      if (f.required && v !== 'yes') errors[f.id] = 'Please tick this box so we can register you.';
      continue;
    }
    if (!v) {
      if (f.required) errors[f.id] = f.kind === 'choice' || f.kind === 'age' ? 'Please choose one.' : 'Please fill this in.';
      continue;
    }
    if (f.max && v.length > f.max) errors[f.id] = `Please keep it under ${f.max} characters.`;
    else if (f.kind === 'email' && !EMAIL_RE.test(v)) errors[f.id] = "That email doesn't look right.";
    else if (f.kind === 'phone' && !normalisePhone(v)) errors[f.id] = 'Use a number like 068 123 4567, or +44... from abroad.';
    else if (f.kind === 'date') {
      const d = new Date(`${v}T00:00:00`);
      const year = d.getFullYear();
      if (Number.isNaN(d.getTime()) || year < 1920 || d > new Date()) errors[f.id] = 'Please check the date.';
    } else if ((f.kind === 'choice' || f.kind === 'age') && f.options && !f.options.includes(v)) errors[f.id] = 'Please choose one.';
  }
  return errors;
}

/** "Tell me when it opens": the minimum to send one email (and, if given, one WhatsApp) when registration opens. */
export function waitlistFields(classTitle: string, workshop = false): RegField[] {
  return [
    { id: 'name', question: 'Name', label: 'Your name', kind: 'text', required: true, autoComplete: 'name', max: 100 },
    { id: 'email', question: 'Email', kind: 'email', required: true, autoComplete: 'email', max: 254 },
    { id: 'whatsapp', question: 'WhatsApp', label: 'WhatsApp number (optional)', kind: 'phone', required: false, autoComplete: 'tel', hint: 'Add it if you would like a WhatsApp too' },
    {
      id: 'consent',
      question: 'Consent',
      label: workshop
        ? `Email me when a new ${classTitle.toLowerCase()} date is announced. My details are only used for that, and I can ask to be removed at any time.`
        : `Let me know once when registration for ${classTitle} opens. My details are only used for that, and I can ask to be removed at any time.`,
      kind: 'consent',
      required: true,
    },
  ];
}

export async function submitWaitlist(classKey: ClassKey | WorkshopListKey, values: Record<string, string>, source: string): Promise<SubmitResult> {
  if (!REGISTER_ENDPOINT) return { status: 'failed', reason: 'network' };
  const wa = (values.whatsapp ?? '').trim();
  return post({
    type: 'waitlist',
    classKey,
    answers: { name: (values.name ?? '').trim(), email: (values.email ?? '').trim(), whatsapp: wa ? normalisePhone(wa) ?? wa : '', consent: values.consent ?? '' },
    website: values.website ?? '',
    source,
  });
}

export type SubmitResult = { status: 'sent' } | { status: 'failed'; reason: 'closed' | 'rejected' | 'network' };

/**
 * Posts as text/plain JSON (a "simple" request, so no CORS preflight, which Apps Script cannot answer).
 * Any failure means we cannot be sure it was saved, so the form offers WhatsApp instead.
 */
export async function submitRegistration(classKey: ClassKey, values: Record<string, string>, source: string, fields: RegField[] = REG_FIELDS[classKey]): Promise<SubmitResult> {
  if (!REGISTER_ENDPOINT) return { status: 'failed', reason: 'network' };
  const answers: Record<string, string> = {};
  for (const f of fields) {
    const v = (values[f.id] ?? '').trim();
    answers[f.id] = f.kind === 'phone' ? normalisePhone(v) ?? v : v;
  }
  return post({ classKey, answers, website: values.website ?? '', source });
}

async function post(payload: object): Promise<SubmitResult> {
  if (DEMO) {
    console.info('Demo registration (not sent):', payload);
    await new Promise((r) => window.setTimeout(r, 900));
    return { status: 'sent' };
  }
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(REGISTER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: 'omit',
      redirect: 'follow',
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (data.ok === true) return { status: 'sent' };
    return { status: 'failed', reason: data.error === 'closed' ? 'closed' : 'rejected' };
  } catch {
    return { status: 'failed', reason: 'network' };
  } finally {
    window.clearTimeout(timer);
  }
}

/** Which classes' Google Forms are accepting responses right now (null if unknown). */
export async function fetchOpenStatus(): Promise<Partial<Record<ClassKey, boolean>> | null> {
  if (!REGISTER_ENDPOINT || DEMO) return null;
  try {
    const res = await fetch(`${REGISTER_ENDPOINT}?status=1`, { credentials: 'omit', redirect: 'follow' });
    const data = (await res.json()) as { ok?: boolean; open?: Partial<Record<ClassKey, boolean>> };
    return data.ok && data.open ? data.open : null;
  } catch {
    return null;
  }
}
