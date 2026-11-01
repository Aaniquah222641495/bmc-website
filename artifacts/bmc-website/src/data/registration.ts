// Registration forms on the class pages (ADR-0031). Visitors fill in our own form; the Apps Script
// web app in apps-script/ submits each one into that class's Google Form, so Mualimah Rukeya keeps
// her Responses view exactly as it is.
//
// Every field's `question` must match the question title in the class's Google Form word for word:
// that is how the script finds where each answer goes. The same lists live in apps-script/Code.gs.
// Change one, change both.

export type FieldKind = 'text' | 'longtext' | 'number' | 'email' | 'phone' | 'date' | 'choice' | 'age' | 'consent';

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
  /** Starts a new group on the form, with this heading (her form's section titles). */
  section?: string;
}

/** On since 2026-11-01 (founder): our styled forms, matched to her 2027 Google Forms, for the classes below. */
export const USE_OWN_FORMS = true;

export type ClassKey = 'womens' | 'hifdh' | 'quranOnline' | 'quran' | 'children';
/** Classes whose Google Form the script submits into. Others keep the embedded Google Form. */
export const OWN_FORM_CLASSES: ClassKey[] = ['womens', 'children', 'hifdh', 'quranOnline'];
/** Waitlist-only lists: no registration form, people are emailed when a new workshop is published. */
export type WorkshopListKey = 'workshops' | 'in-person-workshops';

/** Programme path (content/settings/programmes.json) to registration form. */
export const CLASS_BY_PATH: Record<string, ClassKey> = {
  '/womens-classes': 'womens',
  '/hifdh-classes': 'hifdh',
  '/online-quran-classes': 'quranOnline',
  '/quran-classes': 'quran',
  '/childrens-classes': 'children',
};

// Her 2027 Google Forms (read 2026-11-01). `question` must match her question title word for word:
// the Apps Script finds where each answer goes by title. Same lists live in apps-script/Code.gs.
const EMAIL: RegField = { id: 'email', question: 'Email', kind: 'email', required: true, autoComplete: 'email', max: 254 };
const UNDERSTAND = ['Yes I understand', 'No I need clarity'];
const HEARD = ['WhatsApp', 'Facebook', 'Instagram', 'Family/Friend', 'Other'];
const FEES_150 = 'Do you acknowledge the following fees?\nR50 once-off registration fee\nR150 monthly fee';
const PHONE_HINT = 'South African, or with your country code from abroad';

const WOMENS_FIELDS: RegField[] = [
  { id: 'name', question: 'Full Name & Surname', label: 'Full name and surname', kind: 'text', required: true, autoComplete: 'name', max: 100, section: 'About you' },
  EMAIL,
  { id: 'whatsapp', question: 'WhatsApp Number', label: 'WhatsApp number', kind: 'phone', required: true, autoComplete: 'tel', hint: PHONE_HINT },
  { id: 'age', question: 'Age', kind: 'number', required: true },
  { id: 'city', question: 'City & Country', label: 'City and country', kind: 'text', required: true, autoComplete: 'address-level2', max: 100 },
  { id: 'faith', question: 'Are you a revert to Islam or a born Muslim?', kind: 'choice', required: true, options: ['Revert to Islam', 'Born Muslim'] },
  { id: 'level', question: 'How would you describe your current level of Islamic knowledge?', kind: 'choice', required: true, options: ['Complete beginner', 'I have some basic Islamic knowledge', 'I have studied Islam before but would like to refresh my knowledge'], section: 'Islamic learning background' },
  { id: 'reason', question: 'What encouraged you to register for Beginners Madrasah?', label: 'What encouraged you to register? (optional)', kind: 'longtext', required: false, max: 500 },
  { id: 'recorded', question: 'Do you understand that this is not a live class and that lessons are pre-recorded?', kind: 'choice', required: true, options: UNDERSTAND, section: 'How the classes work' },
  { id: 'classroom', question: 'Do you understand that lessons, activities and homework will be available through Google Classroom?', kind: 'choice', required: true, options: UNDERSTAND },
  { id: 'fees', question: FEES_150, label: 'I acknowledge the fees: R50 once-off registration fee and R150 per month.', kind: 'consent', required: true, section: 'Fees' },
  { id: 'monthly', question: 'Do you understand that monthly fees are payable while you are enrolled in the programme?', label: 'I understand that monthly fees are payable while I am enrolled in the programme.', kind: 'consent', required: true },
];

// Children's class: a parent registers. Medical details are special personal information (POPIA):
// asked only to keep the child safe, and covered by the parental consent at the end.
const CHILD_FIELDS: RegField[] = [
  { id: 'childName', question: "Child's full name and surname", kind: 'text', required: true, autoComplete: 'off', max: 100, section: 'About your child' },
  { id: 'childAge', question: "Child's Age", label: "Child's age", kind: 'age', required: true, options: ['6', '7', '8', '9', '10', '11', '12', '13'] },
  { id: 'childDob', question: "Child's date of birth", kind: 'date', required: true, autoComplete: 'off' },
  { id: 'medical', question: 'Medical conditions or allergies', kind: 'longtext', required: true, max: 300, hint: 'So we can keep your child safe in class. Write "None" if there are none.' },
  { id: 'experience', question: 'Does your child have any previous Madrasah experience?', kind: 'choice', required: true, options: ['Yes', 'No'] },
  { id: 'support', question: 'Does your child have any learning difficulties or additional support needs we should be aware of?', kind: 'longtext', required: true, max: 300, hint: 'Write "None" if there are none.' },
  { id: 'parentName', question: "Parent/Guardian's full name and surname", label: "Parent or guardian's full name and surname", kind: 'text', required: true, autoComplete: 'name', max: 100, section: 'Parent or guardian' },
  { ...EMAIL, label: "Parent or guardian's email" },
  { id: 'whatsapp', question: "Parent/Guardian's WhatsApp number", label: "Parent or guardian's WhatsApp number", kind: 'phone', required: true, autoComplete: 'tel', hint: PHONE_HINT },
  { id: 'emergency', question: 'Emergency contact number', label: 'Emergency contact', kind: 'text', required: true, autoComplete: 'off', max: 120, hint: "Name and number of someone we can call if we can't reach you" },
  { id: 'heard', question: 'How did you hear about Beginners Madrasah Classes?', label: 'How did you hear about us?', kind: 'choice', required: true, options: ['WhatsApp', 'Facebook / Instagram', 'Family or friend', 'Other'] },
  { id: 'fees', question: FEES_150, label: 'I acknowledge the fees: R50 once-off registration fee and R150 per month.', kind: 'consent', required: true, section: 'Fees and consent' },
  { id: 'monthly', question: 'Do you understand that monthly fees are payable while your child/children are enrolled in the programme?', label: 'I understand that monthly fees are payable while my child is enrolled, even if classes are missed.', kind: 'consent', required: true },
  {
    id: 'consent',
    question: 'Parental consent',
    label: "I am this child's parent or legal guardian. I give consent for my child to join the classes, and for Beginners Madrasah Classes to keep these details, including any medical conditions or allergies, to arrange my child's classes and keep my child safe.",
    kind: 'consent',
    required: true,
  },
];

const HIFDH_FIELDS: RegField[] = [
  { id: 'name', question: 'Full name and surname', kind: 'text', required: true, autoComplete: 'name', max: 100, section: 'About you' },
  EMAIL,
  { id: 'whatsapp', question: 'WhatsApp number', kind: 'phone', required: true, autoComplete: 'tel', hint: PHONE_HINT },
  { id: 'age', question: 'Age', kind: 'number', required: true, hint: 'The Hifdh programme is for sisters aged 16 and older' },
  { id: 'previous', question: 'Have you previously attended Hifdh classes?', kind: 'choice', required: true, options: ['Yes', 'No'], section: "Qur'an reading and Hifdh experience" },
  { id: 'goal', question: 'What is your main goal for joining the Hifdh programme?', kind: 'longtext', required: true, max: 500 },
  { id: 'heard', question: 'How did you hear about Beginners Madrasah Classes?', label: 'How did you hear about us?', kind: 'choice', required: true, options: HEARD },
];

const QURAN_FIELDS: RegField[] = [
  { id: 'name', question: 'Full name and surname', kind: 'text', required: true, autoComplete: 'name', max: 100, section: 'About you' },
  EMAIL,
  { id: 'whatsapp', question: 'WhatsApp number', kind: 'phone', required: true, autoComplete: 'tel', hint: PHONE_HINT },
  { id: 'age', question: 'Age', kind: 'number', required: true },
  { id: 'faith', question: 'Are you a revert to Islam or a born Muslim?', kind: 'choice', required: true, options: ['Born Muslim', 'Revert'] },
  { id: 'previous', question: "Have you previously attended any Qur'an reading classes?", kind: 'choice', required: true, options: ['Yes', 'No'], section: "Your Qur'an reading" },
  {
    id: 'ability',
    question: "How would you describe your current Qur'an reading ability?",
    kind: 'choice',
    required: true,
    options: ['I am a complete beginner and do not know the Arabic letters.', 'I recognise some Arabic letters but cannot read words.', 'I can read some Arabic words but struggle to join them.', 'I can read slowly but need assistance.'],
  },
  { id: 'motivation', question: "What motivated you to join the Get Into Qur'an programme?", label: 'What motivated you to join? (optional)', kind: 'longtext', required: false, max: 500 },
  { id: 'heard', question: 'How did you hear about Beginners Madrasah Classes?', label: 'How did you hear about us?', kind: 'choice', required: true, options: HEARD },
];

/** Added when a class's CMS terms are filled in. Shown and checked on the website only: her forms show the terms as text. */
export const TERMS_QUESTION = 'I agree to the terms and conditions';
export const TERMS_FIELD: RegField = { id: 'terms', question: TERMS_QUESTION, label: 'I have read and agree to the terms and conditions.', kind: 'consent', required: true, section: 'Terms' };

export const REG_FIELDS: Record<ClassKey, RegField[]> = {
  womens: WOMENS_FIELDS,
  hifdh: HIFDH_FIELDS,
  quranOnline: QURAN_FIELDS,
  quran: QURAN_FIELDS,
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
    else if (f.kind === 'number' && (!/^\d{1,3}$/.test(v) || Number(v) < 5 || Number(v) > 110)) errors[f.id] = 'Please write your age in numbers, like 25.';
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
