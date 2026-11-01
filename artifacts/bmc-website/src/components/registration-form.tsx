import { Fragment, useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Link } from 'wouter';
import { DEMO, REG_FIELDS, submitRegistration, submitWaitlist, TERMS_FIELD, validate, waitlistFields, type ClassKey, type RegField, type WorkshopListKey } from '@/data/registration';
import { PAYMENT_DETAILS, programmeByPath } from '@/data/programmes';

const WHATSAPP_NUMBER = '27686498593';

const INPUT =
  'block w-full min-h-12 rounded-xl bg-bmc-paper px-4 py-3 font-utility text-[1rem] text-foreground shadow-[inset_0_0_0_1px_hsl(var(--bmc-gold)/0.45)] outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_hsl(var(--primary))] aria-[invalid=true]:shadow-[inset_0_0_0_2px_hsl(0_62%_45%)]';

type Phase = { name: 'form' } | { name: 'sending' } | { name: 'sent'; first: string; full: string } | { name: 'failed'; reason: 'closed' | 'rejected' | 'network' };

/**
 * Our own registration form (ADR-0031). Answers go into the class's Google Form through the client's Apps Script.
 * mode="waitlist" is the "Tell me when it opens" form: the script emails everyone on it once the Google Form opens.
 */
export function RegistrationForm({ classKey, title, source, mode = 'register' }: { classKey: ClassKey | WorkshopListKey; title: string; source: string; mode?: 'register' | 'waitlist' }) {
  const waitlist = mode === 'waitlist';
  const workshopList = classKey === 'workshops' || classKey === 'in-person-workshops';
  const programme = programmeByPath(`/${source}`);
  const terms = waitlist ? '' : (programme?.terms ?? '').trim();
  const regKey = classKey as ClassKey;
  const fields = waitlist ? waitlistFields(title, workshopList) : terms ? [...REG_FIELDS[regKey], TERMS_FIELD] : REG_FIELDS[regKey];
  const uid = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>({ name: 'form' });
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const set = (id: string, v: string) => {
    setValues((s) => ({ ...s, [id]: v }));
    if (errors[id]) setErrors((e) => ({ ...e, [id]: '' }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(fields, values);
    setErrors(errs);
    const firstBad = fields.find((f) => errs[f.id]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad.id}"]`)?.focus();
      return;
    }
    setPhase({ name: 'sending' });
    const res = waitlist ? await submitWaitlist(classKey, values, source) : await submitRegistration(regKey, values, source, fields);
    const nameField = !waitlist && classKey === 'children' ? 'parentName' : 'name';
    const full = (values[nameField] ?? '').trim();
    setPhase(res.status === 'sent' ? { name: 'sent', first: full.split(/\s+/)[0], full } : { name: 'failed', reason: res.reason });
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };

  if (phase.name === 'sent') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[1.25rem] bg-card p-8 text-center shadow-soft outline-none md:p-12">
        <p className="bmc-eyebrow mb-3">{waitlist ? "You're on the list" : 'Registration received'}</p>
        <h3 className="font-display text-[1.8rem] leading-tight text-primary">Shukran{phase.first ? `, ${phase.first}` : ''}</h3>
        {waitlist ? (
          <p className="mx-auto mt-4 max-w-md leading-[1.7] text-foreground/85">
            {workshopList ? (
              <>We'll email you when a new <strong className="text-primary">{title.toLowerCase()}</strong> date is announced, InshaAllah.</>
            ) : (
              <>We'll email you as soon as registration for <strong className="text-primary">{title}</strong> opens, InshaAllah.</>
            )}
          </p>
        ) : (
          <>
            <p className="mx-auto mt-4 max-w-md leading-[1.7] text-foreground/85">
              Your registration for <strong className="text-primary">{title}</strong> has come through. Mualimah Rukeya will be in touch with the next steps{PAYMENT_DETAILS.trim() ? '' : ' and payment options'}, InshaAllah.
            </p>
            {PAYMENT_DETAILS.trim() && (
              <div className="mx-auto mt-7 max-w-sm rounded-xl bg-bmc-paper p-5 text-left">
                <p className="bmc-eyebrow mb-2">How to pay</p>
                {programme?.price && <p className="mb-2 font-display text-[1.1rem] text-primary">Fee: {programme.price}</p>}
                <p className="whitespace-pre-line font-utility text-[0.95rem] leading-[1.65] text-foreground/85">{PAYMENT_DETAILS.trim()}</p>
                {/* Her process (founder 2026-10-28): register, pay, then send the proof of payment on WhatsApp. */}
                <p className="mt-4 font-utility text-[0.95rem] font-semibold leading-[1.55] text-primary">Once you've paid, send your proof of payment to Mualimah Rukeya on WhatsApp.</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Slm, here is my proof of payment for ${title}${phase.full ? ` (${phase.full}${classKey === 'children' && values.childName ? `, for ${values.childName.trim()}` : ''})` : ''}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bmc-btn bmc-btn-primary mt-4 w-full"
                >
                  <SiWhatsapp className="size-[1.05rem]" aria-hidden="true" /> Send proof of payment
                </a>
              </div>
            )}
            <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-[1.7] text-foreground/75">We've also sent a copy to your email.</p>
          </>
        )}
      </div>
    );
  }

  const waText = `Slm, I'd like to register for ${title}`;
  const sending = phase.name === 'sending';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="rounded-[1.25rem] bg-card p-6 text-left shadow-soft md:p-10" aria-label={`Register for ${title}`}>
      {DEMO && (
        <p className="mb-6 rounded-lg bg-secondary px-4 py-3 text-sm text-foreground">
          Preview only: this form is not connected yet, so nothing you type here is sent.
        </p>
      )}
      {phase.name === 'failed' && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="mb-8 rounded-xl bg-bmc-gold-light/50 p-5 outline-none">
          <p className="font-display text-[1.15rem] text-primary">
            {phase.reason === 'closed' && !waitlist ? 'Registration for this class has just closed.' : "Sorry, your form didn't come through."}
          </p>
          <p className="mt-2 text-[0.95rem] leading-[1.65] text-foreground/85">
            {phase.reason === 'closed' && !waitlist
              ? "Send us a WhatsApp and we'll let you know when it opens again."
              : 'Please try again in a minute, or send us a WhatsApp and we will register you.'}
          </p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" className="bmc-btn bmc-btn-primary mt-4">
            <SiWhatsapp className="size-[1.05rem]" aria-hidden="true" /> Register on WhatsApp
          </a>
        </div>
      )}

      {!waitlist && <p className="mb-6 font-utility text-sm text-foreground/70">All questions are needed to register, unless they say optional.</p>}

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        {fields.map((f, i) => (
          <Fragment key={f.id}>
            {f.section && (
              <h3 className={`font-display text-[1.25rem] leading-snug text-primary sm:col-span-2 ${i > 0 ? 'mt-4 border-t border-[hsl(var(--bmc-gold)/0.35)] pt-8' : ''}`}>{f.section}</h3>
            )}
            <FieldWithTerms terms={f.id === 'terms' ? terms : ''}>
              <Field f={f} uid={uid} value={values[f.id] ?? ''} error={errors[f.id]} onChange={(v) => set(f.id, v)} disabled={sending} />
            </FieldWithTerms>
          </Fragment>
        ))}
      </div>

      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website ?? ''} onChange={(e) => set('website', e.target.value)} />
        </label>
      </div>

      <p className="mt-8 text-[0.85rem] leading-[1.6] text-foreground/70">
        {waitlist ? (workshopList ? 'We only email you about new workshop dates.' : 'We email you once, when it opens. Nothing else.') : 'Your details go only to Mualimah Rukeya, to arrange your class.'} Questions?{' '}
        <Link href="/faq" className="bmc-link-inline">See the FAQ</Link>.
      </p>

      <button type="submit" disabled={sending} className="bmc-btn bmc-btn-primary mt-6 w-full sm:w-auto">
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            {waitlist ? (workshopList ? 'Keep me posted' : 'Tell me when it opens') : 'Send my registration'} <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

/** The class's terms, in her words (lines ending in ":" are headings), behind a small link that opens them in a dialog. */
function FieldWithTerms({ terms, children }: { terms: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  if (!terms) return <>{children}</>;
  const blocks = terms.split(/\n\s*\n/);
  return (
    <div className="sm:col-span-2">
      {children}
      <button type="button" onClick={() => ref.current?.showModal()} className="bmc-link-inline mt-2 inline-flex min-h-11 items-center font-utility text-[0.92rem]">
        Read the full terms and conditions
      </button>
      <dialog
        ref={ref}
        aria-labelledby="terms-title"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="m-auto w-[min(40rem,calc(100vw-2rem))] max-h-[85vh] rounded-[1.25rem] bg-card p-0 text-foreground shadow-lift backdrop:bg-[hsl(158_44%_8%/0.55)]"
      >
        <div className="sticky top-0 flex items-center justify-between gap-4 bg-card px-6 pb-3 pt-6 md:px-8">
          <h3 id="terms-title" className="font-display text-[1.4rem] text-primary">Terms and conditions</h3>
          <button type="button" onClick={() => ref.current?.close()} className="bmc-btn bmc-btn-soft !min-h-11 !px-4" aria-label="Close terms and conditions">
            Close
          </button>
        </div>
        <div className="px-6 pb-8 md:px-8">
          {blocks.map((b, i) => (
            <TermsSection key={i} text={b} />
          ))}
        </div>
      </dialog>
    </div>
  );
}

/**
 * One block of her terms, easy to scan: the line ending in ":" is the heading, short lines with no
 * full stop (e.g. "Monthly Fees") are sub-headings, everything else is a bullet. Her words are not
 * changed; amounts (R50), dates and "non-refundable" are bold so the money rules stand out.
 */
function TermsSection({ text }: { text: string }) {
  const lines = text.split('\n').map((l) => l.replace(/^\s*[-\u2022*]\s*/, '').trim()).filter(Boolean);
  const groups: { sub?: string; items: string[] }[] = [];
  let heading = '';
  for (const line of lines) {
    if (/:\s*$/.test(line) && !heading && groups.length === 0) heading = line.replace(/:\s*$/, '');
    else if (line.split(/\s+/).length <= 4 && !/[.!?]$/.test(line)) groups.push({ sub: line.replace(/:\s*$/, ''), items: [] });
    else {
      if (groups.length === 0) groups.push({ items: [] });
      groups[groups.length - 1].items.push(line);
    }
  }
  return (
    <section className="mb-6 rounded-xl bg-bmc-paper p-5 last:mb-0">
      {heading && <h4 className="mb-3 font-display text-[1.15rem] leading-snug text-primary">{heading}</h4>}
      {groups.map((g, i) => (
        <div key={i} className={i > 0 ? 'mt-4' : ''}>
          {g.sub && <p className="mb-2 font-utility text-[0.8rem] font-bold uppercase tracking-[0.12em] text-bmc-gold-ink">{g.sub}</p>}
          <ul className="space-y-2">
            {g.items.map((item, j) => (
              <li key={j} className="flex gap-3 text-[0.95rem] leading-[1.6] text-foreground/85">
                <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-bmc-gold" aria-hidden="true" />
                <span>{emphasise(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

/** Bold the money rules: rand amounts, dates like "1st of each month" or "June 7th", and "non-refundable". */
function emphasise(line: string) {
  const re = /(R\d[\d\s,]*(?:\.\d+)?(?:\s*per month)?|\b\d{1,2}(?:st|nd|rd|th)(?: of each month)?\b|\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?\b|non-refundable)/gi;
  const parts = line.split(re);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold text-primary">{part}</strong> : part));
}

function Field({ f, uid, value, error, onChange, disabled }: { f: RegField; uid: string; value: string; error?: string; onChange: (v: string) => void; disabled: boolean }) {
  const id = `${uid}-${f.id}`;
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = [f.hint ? hintId : '', error ? errId : ''].filter(Boolean).join(' ') || undefined;
  const label = f.label ?? f.question;
  const err = error ? (
    <p id={errId} className="mt-2 font-utility text-[0.88rem] font-semibold text-[hsl(0_62%_40%)]">
      {error}
    </p>
  ) : null;

  if (f.kind === 'consent') {
    return (
      <div className="sm:col-span-2">
        <label htmlFor={id} className="flex cursor-pointer items-start gap-3.5 rounded-xl bg-bmc-paper p-4">
          <input
            id={id}
            name={f.id}
            type="checkbox"
            checked={value === 'yes'}
            onChange={(e) => onChange(e.target.checked ? 'yes' : '')}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className="mt-0.5 size-5 shrink-0 accent-[hsl(var(--primary))]"
          />
          <span className="text-[0.95rem] leading-[1.6] text-foreground/85">{label}</span>
        </label>
        {err}
      </div>
    );
  }

  if (f.kind === 'choice') {
    return (
      <fieldset className="sm:col-span-2" aria-describedby={describedBy}>
        <legend className="mb-2.5 font-utility text-[0.95rem] font-semibold text-primary">{label}</legend>
        <div className="flex flex-wrap gap-3">
          {f.options!.map((o) => (
            <label key={o} className="inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-3xl bg-bmc-paper px-5 py-2.5 text-left shadow-[inset_0_0_0_1px_hsl(var(--bmc-gold)/0.45)] has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary">
              <input type="radio" name={f.id} value={o} checked={value === o} onChange={() => onChange(o)} disabled={disabled} className="sr-only" aria-invalid={error ? true : undefined} />
              <span className="font-utility text-[0.95rem] font-semibold">{o}</span>
            </label>
          ))}
        </div>
        {err}
      </fieldset>
    );
  }

  return (
    <div className={f.kind === 'longtext' || (f.kind === 'text' && (f.id === 'name' || f.id === 'parentName' || f.id === 'childName')) ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="mb-2 block font-utility text-[0.95rem] font-semibold text-primary">
        {label}
      </label>
      {f.kind === 'age' ? (
        <select id={id} name={f.id} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={INPUT}>
          <option value="">Choose an age</option>
          {f.options!.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : f.kind === 'longtext' ? (
        <textarea
          id={id}
          name={f.id}
          rows={3}
          maxLength={f.max ? f.max + 1 : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={INPUT}
        />
      ) : (
        <input
          id={id}
          name={f.id}
          type={f.kind === 'email' ? 'email' : f.kind === 'phone' ? 'tel' : f.kind === 'date' ? 'date' : 'text'}
          inputMode={f.kind === 'phone' ? 'tel' : f.kind === 'email' ? 'email' : f.kind === 'number' ? 'numeric' : undefined}
          autoComplete={f.autoComplete}
          maxLength={f.kind === 'number' ? 3 : f.max ? f.max + 1 : undefined}
          max={f.kind === 'date' ? new Date().toISOString().slice(0, 10) : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={INPUT}
        />
      )}
      {f.hint && (
        <p id={hintId} className="mt-1.5 font-utility text-[0.85rem] text-foreground/65">
          {f.hint}
        </p>
      )}
      {err}
    </div>
  );
}
