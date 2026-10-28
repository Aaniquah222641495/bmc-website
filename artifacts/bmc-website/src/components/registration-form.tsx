import { useId, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Link } from 'wouter';
import { REG_FIELDS, submitRegistration, submitWaitlist, TERMS_FIELD, validate, waitlistFields, type ClassKey, type RegField } from '@/data/registration';
import { PAYMENT_DETAILS, programmeByPath } from '@/data/programmes';

const WHATSAPP_NUMBER = '27686498593';

const INPUT =
  'block w-full min-h-12 rounded-xl bg-bmc-paper px-4 py-3 font-utility text-[1rem] text-foreground shadow-[inset_0_0_0_1px_hsl(var(--bmc-gold)/0.45)] outline-none transition-shadow focus:shadow-[inset_0_0_0_2px_hsl(var(--primary))] aria-[invalid=true]:shadow-[inset_0_0_0_2px_hsl(0_62%_45%)]';

type Phase = { name: 'form' } | { name: 'sending' } | { name: 'sent'; first: string; full: string } | { name: 'failed'; reason: 'closed' | 'rejected' | 'network' };

/**
 * Our own registration form (ADR-0031). Answers go into the class's Google Form through the client's Apps Script.
 * mode="waitlist" is the "Tell me when it opens" form: the script emails everyone on it once the Google Form opens.
 */
export function RegistrationForm({ classKey, title, source, mode = 'register' }: { classKey: ClassKey; title: string; source: string; mode?: 'register' | 'waitlist' }) {
  const waitlist = mode === 'waitlist';
  const programme = programmeByPath(`/${source}`);
  const terms = waitlist ? '' : (programme?.terms ?? '').trim();
  const fields = waitlist ? waitlistFields(title) : terms ? [...REG_FIELDS[classKey], TERMS_FIELD] : REG_FIELDS[classKey];
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
    const res = waitlist ? await submitWaitlist(classKey, values, source) : await submitRegistration(classKey, values, source, fields);
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
            We'll email you as soon as registration for <strong className="text-primary">{title}</strong> opens, InshaAllah.
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

      {!waitlist && <p className="mb-6 font-utility text-sm text-foreground/70">All questions are needed to register.</p>}

      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        {fields.map((f) => (
          <FieldWithTerms key={f.id} terms={f.id === 'terms' ? terms : ''}>
            <Field f={f} uid={uid} value={values[f.id] ?? ''} error={errors[f.id]} onChange={(v) => set(f.id, v)} disabled={sending} />
          </FieldWithTerms>
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
        {waitlist ? 'We email you once, when it opens. Nothing else.' : 'Your details go only to Mualimah Rukeya, to arrange your class.'} Questions?{' '}
        <Link href="/faq" className="bmc-link-inline">See the FAQ</Link>.
      </p>

      <button type="submit" disabled={sending} className="bmc-btn bmc-btn-primary mt-6 w-full sm:w-auto">
        {sending ? (
          <>
            <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            {waitlist ? 'Tell me when it opens' : 'Send my registration'} <ArrowRight size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

/** The class's terms, in her words: lines ending in ":" are headings. Scrolls if long. */
function FieldWithTerms({ terms, children }: { terms: string; children: React.ReactNode }) {
  if (!terms) return <>{children}</>;
  const blocks = terms.split(/\n\s*\n/);
  return (
    <>
      <section aria-label="Terms and conditions" tabIndex={0} className="max-h-80 overflow-y-auto rounded-xl bg-bmc-paper p-5 text-[0.92rem] leading-[1.6] text-foreground/85 outline-none focus-visible:ring-2 focus-visible:ring-primary sm:col-span-2">
        <h3 className="mb-3 font-display text-[1.15rem] text-primary">Terms and conditions</h3>
        {blocks.map((b, i) => (
          <div key={i} className="mb-3 last:mb-0">
            {b.split('\n').map((line, j) =>
              /:\s*$/.test(line) ? (
                <p key={j} className="mt-1 font-utility font-bold text-primary">{line.replace(/:\s*$/, '')}</p>
              ) : (
                <p key={j}>{line}</p>
              ),
            )}
          </div>
        ))}
      </section>
      {children}
    </>
  );
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
            <label key={o} className="inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full bg-bmc-paper px-5 shadow-[inset_0_0_0_1px_hsl(var(--bmc-gold)/0.45)] has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary">
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
    <div className={f.kind === 'text' && (f.id === 'name' || f.id === 'parentName' || f.id === 'childName') ? 'sm:col-span-2' : ''}>
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
      ) : (
        <input
          id={id}
          name={f.id}
          type={f.kind === 'email' ? 'email' : f.kind === 'phone' ? 'tel' : f.kind === 'date' ? 'date' : 'text'}
          inputMode={f.kind === 'phone' ? 'tel' : f.kind === 'email' ? 'email' : undefined}
          autoComplete={f.autoComplete}
          maxLength={f.max ? f.max + 1 : undefined}
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
