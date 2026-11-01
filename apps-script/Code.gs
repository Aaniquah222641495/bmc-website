/**
 * Beginners Madrasah Classes: registration endpoint (Google Apps Script web app). ADR-0031.
 *
 * The class pages on beginnersmadrasah.co.za have their own registration form. Each registration
 * is posted here, checked again, and submitted INTO that class's Google Form, so it shows up in the
 * form's Responses tab (and any linked sheet) like every other response.
 *
 * If a registration cannot be put into the Google Form (a question was renamed, the form is
 * missing), it is never lost: it goes into a backup sheet and an alert email is sent.
 *
 * "Tell me when it opens": while a class's Google Form is closed, visitors can join a waitlist.
 * Every hour checkReopened() looks at each form; when one goes from closed to open, everyone on
 * that class's waitlist gets one email, and the owner gets the list with a WhatsApp link per person.
 *
 * Set-up steps: README.md next to this file. Change only the CONFIG block.
 * The question lists below must match src/data/registration.ts in the website code.
 */

const CONFIG = {
  // Where alerts go (problems, and a copy of each registration if ALERT_EVERY_REGISTRATION is true).
  OWNER_EMAIL: 'beginnersmadrasah@gmail.com',
  ALERT_EVERY_REGISTRATION: false, // Google Forms emails her itself (Responses > ... > Get email notifications)
  // Edit links of her 2027 Google Forms. A class left empty keeps the Google Form embed on the website.
  FORMS: {
    womens: 'https://docs.google.com/forms/d/1yn1xhsaXcgDRSotpkRLDq0mfgvCw7FI9CoAu4RSxFwQ/edit',
    children: 'https://docs.google.com/forms/d/1D98-F5GuClKXy6y7hlDmlhGSMpw8xk4Q__tq38AP4e0/edit',
    hifdh: 'https://docs.google.com/forms/d/17MQUDWe_B0q32HZKlO35-rRsoTLkDac0Kph1NTkce7o/edit',
    quranOnline: 'https://docs.google.com/forms/d/15gq6mDE7Au3irtyYzV-gzlCvrrJM4e0KNICaeZXe2ZQ/edit',
    quran: '' // in person: her form is not published yet
  },
  // Added to the confirmation email after a registration. Same as the banking details on her forms.
  PAYMENT_DETAILS: 'Bank: FNB\nAccount holder: Beginners Madrasah\nAccount number: 63165815524\nBranch code: 250655\nAccount type: Current Account\nReference: your name and surname',
  SITE_URL: 'https://beginnersmadrasah.co.za',
  WHATSAPP_NUMBER: '27686498593',
  WHATSAPP_DISPLAY: '068 649 8593',
  TIMEZONE: 'Africa/Johannesburg',
  SEND_CONFIRMATION: true,       // one plain "we received it" email to the person who registered
  MAX_BODY_CHARS: 8000,
  DUPLICATE_WINDOW_SECONDS: 600,
  MAX_PER_EMAIL_PER_HOUR: 6,     // a parent may register several children
  MAX_PER_HOUR: 60,
  MIN_QUOTA_FOR_CONFIRMATION: 5
};

const CLASS_TITLES = {
  womens: "Women's Online Madrasah",
  hifdh: "Women's Hifdh Programme",
  quranOnline: "Get Into Qur'an Online",
  quran: "Get Into Qur'an In Person",
  children: "Children's Online Madrasah"
};
const CLASS_PATHS = { womens: '/womens-classes', hifdh: '/hifdh-classes', quranOnline: '/online-quran-classes', quran: '/quran-classes', children: '/childrens-classes' };

// Workshop lists: no registration here (workshops have their own links); people are emailed
// every time a new workshop is published on the site (checkWorkshops_, hourly).
const WORKSHOP_LISTS = {
  workshops: 'Online workshops',
  'in-person-workshops': 'In-person workshops'
};
function listTitle_(key) { return CLASS_TITLES[key] || WORKSHOP_LISTS[key]; }

// question: her Google Form question title, word for word (spaces and curly quotes do not matter).
// kind: how it is checked. optional: may be left empty. A "consent" answer on a multiple-choice
// question picks its first choice ("Yes I understand"); on a checkbox question, its first box.
// The website's own terms tick box is not sent: her forms show the terms as text.
// Same lists as src/data/registration.ts in the website code. Change one, change both.
const EMAIL = { id: 'email', question: 'Email', kind: 'email', max: 254 };
const UNDERSTAND = ['Yes I understand', 'No I need clarity'];
const HEARD = ['WhatsApp', 'Facebook', 'Instagram', 'Family/Friend', 'Other'];
const FEES_150 = 'Do you acknowledge the following fees?\nR50 once-off registration fee\nR150 monthly fee';

const WOMENS_FIELDS = [
  EMAIL,
  { id: 'name', question: 'Full Name & Surname', kind: 'text', max: 100 },
  { id: 'age', question: 'Age', kind: 'number' },
  { id: 'whatsapp', question: 'WhatsApp Number', kind: 'phone' },
  { id: 'city', question: 'City & Country', kind: 'text', max: 100 },
  { id: 'faith', question: 'Are you a revert to Islam or a born Muslim?', kind: 'choice', options: ['Revert to Islam', 'Born Muslim'] },
  { id: 'level', question: 'How would you describe your current level of Islamic knowledge?', kind: 'choice', options: ['Complete beginner', 'I have some basic Islamic knowledge', 'I have studied Islam before but would like to refresh my knowledge'] },
  { id: 'reason', question: 'What encouraged you to register for Beginners Madrasah?', kind: 'text', max: 500, optional: true },
  { id: 'recorded', question: 'Do you understand that this is not a live class and that lessons are pre-recorded?', kind: 'choice', options: UNDERSTAND },
  { id: 'classroom', question: 'Do you understand that lessons, activities and homework will be available through Google Classroom?', kind: 'choice', options: UNDERSTAND },
  { id: 'fees', question: FEES_150, kind: 'consent' },
  { id: 'monthly', question: 'Do you understand that monthly fees are payable while you are enrolled in the programme?', kind: 'consent' }
];
const CHILD_FIELDS = [
  EMAIL,
  { id: 'childName', question: "Child's full name and surname", kind: 'text', max: 100 },
  { id: 'childAge', question: "Child's Age", kind: 'choice', options: ['6', '7', '8', '9', '10', '11', '12', '13'] },
  { id: 'childDob', question: "Child's date of birth", kind: 'date' },
  { id: 'medical', question: 'Medical conditions or allergies', kind: 'text', max: 300 },
  { id: 'experience', question: 'Does your child have any previous Madrasah experience?', kind: 'choice', options: ['Yes', 'No'] },
  { id: 'support', question: 'Does your child have any learning difficulties or additional support needs we should be aware of?', kind: 'text', max: 300 },
  { id: 'parentName', question: "Parent/Guardian's full name and surname", kind: 'text', max: 100 },
  { id: 'whatsapp', question: "Parent/Guardian's WhatsApp number", kind: 'phone' },
  { id: 'emergency', question: 'Emergency contact number', kind: 'text', max: 120 },
  { id: 'heard', question: 'How did you hear about Beginners Madrasah Classes?', kind: 'choice', options: ['WhatsApp', 'Facebook / Instagram', 'Family or friend', 'Other'] },
  { id: 'fees', question: FEES_150, kind: 'consent' },
  { id: 'monthly', question: 'Do you understand that monthly fees are payable while your child/children are enrolled in the programme?', kind: 'consent' },
  { id: 'consent', question: 'Parental consent', kind: 'consent' }
];
const HIFDH_FIELDS = [
  EMAIL,
  { id: 'name', question: 'Full name and surname', kind: 'text', max: 100 },
  { id: 'age', question: 'Age', kind: 'number' },
  { id: 'whatsapp', question: 'WhatsApp number', kind: 'phone' },
  { id: 'previous', question: 'Have you previously attended Hifdh classes?', kind: 'choice', options: ['Yes', 'No'] },
  { id: 'goal', question: 'What is your main goal for joining the Hifdh programme?', kind: 'text', max: 500 },
  { id: 'heard', question: 'How did you hear about Beginners Madrasah Classes?', kind: 'choice', options: HEARD }
];
const QURAN_FIELDS = [
  EMAIL,
  { id: 'name', question: 'Full name and surname', kind: 'text', max: 100 },
  { id: 'age', question: 'Age', kind: 'number' },
  { id: 'whatsapp', question: 'WhatsApp number', kind: 'phone' },
  { id: 'previous', question: "Have you previously attended any Qur'an reading classes?", kind: 'choice', options: ['Yes', 'No'] },
  { id: 'faith', question: 'Are you a revert to Islam or a born Muslim?', kind: 'choice', options: ['Born Muslim', 'Revert'] },
  { id: 'ability', question: "How would you describe your current Qur'an reading ability?", kind: 'choice', options: ['I am a complete beginner and do not know the Arabic letters.', 'I recognise some Arabic letters but cannot read words.', 'I can read some Arabic words but struggle to join them.', 'I can read slowly but need assistance.'] },
  { id: 'motivation', question: "What motivated you to join the Get Into Qur'an programme?", kind: 'text', max: 500, optional: true },
  { id: 'heard', question: 'How did you hear about Beginners Madrasah Classes?', kind: 'choice', options: HEARD }
];
const FIELDS = { womens: WOMENS_FIELDS, children: CHILD_FIELDS, hifdh: HIFDH_FIELDS, quranOnline: QURAN_FIELDS, quran: QURAN_FIELDS };

const BACKUP_HEADERS = ['Received (SAST)', 'Class', 'Why it is here', 'Answers'];
const WAITLIST_HEADERS = ['Added (SAST)', 'Class', 'Name', 'Email', 'WhatsApp', 'Status'];

/* ------------------------------------------------------------------ */
/* Web app entry points                                                */
/* ------------------------------------------------------------------ */

/** ?status=1 tells the website which forms are open. Without it: a health check. */
function doGet(e) {
  if (e && e.parameter && e.parameter.status) {
    const cache = CacheService.getScriptCache();
    const cached = cache.get('open_status');
    if (cached) return reply_(JSON.parse(cached));
    const open = {};
    Object.keys(CLASS_TITLES).forEach(function (key) {
      try {
        const form = form_(key);
        if (form) open[key] = form.isAcceptingResponses();
      } catch (err) {
        console.error('Status check failed for ' + key + ': ' + err);
      }
    });
    const out = { ok: true, open: open };
    cache.put('open_status', JSON.stringify(out), 300); // 5 minutes
    return reply_(out);
  }
  return reply_({ ok: true, service: 'Beginners Madrasah registration endpoint', status: 'running' });
}

/** The class pages post here as text/plain JSON: { classKey, answers: {...}, website, source }. */
function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? String(e.postData.contents) : '';
    if (!body || body.length > CONFIG.MAX_BODY_CHARS) return reply_({ ok: false, error: 'invalid' });
    let data;
    try { data = JSON.parse(body); } catch (err) { return reply_({ ok: false, error: 'invalid' }); }
    if (!data || typeof data !== 'object') return reply_({ ok: false, error: 'invalid' });
    return reply_(processRegistration_(data));
  } catch (err) {
    console.error('doPost failed: ' + err);
    return reply_({ ok: false, error: 'server' });
  }
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------------------ */
/* The pipeline                                                        */
/* ------------------------------------------------------------------ */

function processRegistration_(data) {
  // Honeypot: only bots fill it in. Pretend all is well and save nothing.
  if (clean_(data.website, 200) !== '') return { ok: true };

  const key = String(data.classKey || '');
  if (data.type === 'waitlist' && (FIELDS[key] || WORKSHOP_LISTS[key])) return processWaitlist_(key, data.answers || {});
  if (!FIELDS[key]) return { ok: false, error: 'invalid' };
  const v = validate_(key, data.answers || {});
  if (!v.ok) return { ok: false, error: 'invalid' };
  const a = v.answers;

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { ok: false, error: 'busy' };
  try {
    const cache = CacheService.getScriptCache();
    const dupeKey = 'dupe_' + hash_(key + '|' + JSON.stringify(a));
    if (cache.get(dupeKey)) return { ok: true, duplicate: true };
    const emailKey = 'rl_' + hash_(a.email);
    const perEmail = Number(cache.get(emailKey) || 0);
    const all = Number(cache.get('rl_all') || 0);
    if (perEmail >= CONFIG.MAX_PER_EMAIL_PER_HOUR || all >= CONFIG.MAX_PER_HOUR) return { ok: false, error: 'rate_limited' };

    const form = form_(key);
    if (form && !form.isAcceptingResponses()) return { ok: false, error: 'closed' };

    let problem = '';
    if (!form) {
      problem = 'No Google Form is set for this class.';
    } else {
      try {
        problem = submitToForm_(form, key, a);
      } catch (err) {
        problem = 'Google Form submit failed: ' + err;
      }
    }
    if (problem) {
      // Never lose a registration: keep it in the backup sheet and tell the owner.
      backup_(key, problem, a);
      alert_('Registration needs attention: ' + CLASS_TITLES[key], problem + '\n\nIt is saved in the backup sheet: ' + backupSheet_().getParent().getUrl() + '\n\n' + summary_(key, a));
    } else if (CONFIG.ALERT_EVERY_REGISTRATION) {
      alert_('New registration: ' + CLASS_TITLES[key], summary_(key, a));
    }

    cache.put(dupeKey, '1', CONFIG.DUPLICATE_WINDOW_SECONDS);
    cache.put(emailKey, String(perEmail + 1), 3600);
    cache.put('rl_all', String(all + 1), 3600);
  } finally {
    lock.releaseLock();
  }

  try {
    if (CONFIG.SEND_CONFIRMATION && MailApp.getRemainingDailyQuota() >= CONFIG.MIN_QUOTA_FOR_CONFIRMATION) sendConfirmation_(key, a);
  } catch (err) {
    console.error('Confirmation email failed: ' + err);
  }
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Waitlist: "Tell me when it opens"                                   */
/* ------------------------------------------------------------------ */

function processWaitlist_(key, raw) {
  const name = clean_(raw.name, 100);
  const email = clean_(raw.email, 254);
  const waRaw = clean_(raw.whatsapp, 40).replace(/[\s\-().]/g, '');
  const za = /^(?:\+27|0027|27|0)([1-9]\d{8})$/.exec(waRaw);
  const intl = /^(?:\+|00)([1-9]\d{7,14})$/.exec(waRaw);
  const whatsapp = za ? '+27' + za[1] : intl ? '+' + intl[1] : '';
  const ok = name.length >= 1 && name.length <= 100 &&
    /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(email) && email.length <= 254 &&
    (waRaw === '' || whatsapp !== '') && clean_(raw.consent, 10) === 'yes';
  if (!ok) return { ok: false, error: 'invalid' };

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { ok: false, error: 'busy' };
  try {
    const cache = CacheService.getScriptCache();
    const all = Number(cache.get('rl_all') || 0);
    if (all >= CONFIG.MAX_PER_HOUR) return { ok: false, error: 'rate_limited' };
    const sheet = waitlistSheet_();
    // Already waiting for this class? Nothing to add.
    const rows = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, WAITLIST_HEADERS.length).getValues() : [];
    const active = WORKSHOP_LISTS[key] ? function (st) { return String(st).indexOf('Subscribed') === 0; } : function (st) { return st === 'Waiting'; };
    const already = rows.some(function (r) { return r[1] === listTitle_(key) && String(r[3]).toLowerCase() === email.toLowerCase() && active(r[5]); });
    if (!already) {
      const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, WAITLIST_HEADERS.length);
      range.setNumberFormat('@');
      range.setValues([[Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'), listTitle_(key), name, email, whatsapp, WORKSHOP_LISTS[key] ? 'Subscribed' : 'Waiting']]);
    }
    cache.put('rl_all', String(all + 1), 3600);
  } finally {
    lock.releaseLock();
  }
  return { ok: true };
}

/**
 * Runs every hour (setup() installs the trigger). When a class's Google Form goes from closed to
 * open, emails everyone waiting for it once, marks them "Emailed", and sends the owner the list
 * with a tap-to-WhatsApp link for each person who left a number.
 */
function checkReopened() {
  const props = PropertiesService.getScriptProperties();
  Object.keys(CLASS_TITLES).forEach(function (key) {
    let open;
    try {
      const form = form_(key);
      if (!form) return;
      open = form.isAcceptingResponses();
    } catch (err) {
      console.error('Could not check ' + key + ': ' + err);
      return;
    }
    const was = props.getProperty('open_' + key);
    props.setProperty('open_' + key, open ? 'yes' : 'no');
    if (open && was === 'no') notifyWaitlist_(key);
  });
  CacheService.getScriptCache().remove('open_status');
  try {
    checkWorkshops_();
  } catch (err) {
    console.error('Workshop check failed: ' + err);
  }
}

/**
 * Reads SITE_URL/workshops.json (written by the site build: the workshops open right now). Any
 * workshop not seen before is new: everyone subscribed to that list gets one email about it.
 * The first run only records what is already there, so nobody is emailed about old news.
 */
function checkWorkshops_() {
  const res = UrlFetchApp.fetch(CONFIG.SITE_URL + '/workshops.json', { muteHttpExceptions: true, followRedirects: true });
  if (res.getResponseCode() !== 200) return;
  const data = JSON.parse(res.getContentText());
  const open = (data && data.open) || [];
  const props = PropertiesService.getScriptProperties();
  const seenRaw = props.getProperty('seen_workshops');
  const seen = seenRaw ? JSON.parse(seenRaw) : [];
  const fresh = open.filter(function (w) { return w && w.id && seen.indexOf(w.id) === -1 && WORKSHOP_LISTS[w.list]; });
  if (seenRaw !== null) fresh.forEach(function (w) { notifyWorkshop_(w); });
  props.setProperty('seen_workshops', JSON.stringify(seen.concat(fresh.map(function (w) { return w.id; })).slice(-200)));
}

function notifyWorkshop_(w) {
  const sheet = waitlistSheet_();
  if (sheet.getLastRow() < 2) return;
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, WAITLIST_HEADERS.length).getValues();
  const listName = WORKSHOP_LISTS[w.list];
  const pageUrl = CONFIG.SITE_URL + '/programmes/' + w.list;
  const forOwner = [];
  rows.forEach(function (r, i) {
    if (r[1] !== listName || String(r[5]).indexOf('Subscribed') !== 0) return;
    if (MailApp.getRemainingDailyQuota() < CONFIG.MIN_QUOTA_FOR_CONFIRMATION) return;
    const first = String(r[2]).split(' ')[0].slice(0, 40);
    try {
      MailApp.sendEmail({
        to: String(r[3]),
        subject: 'New workshop: ' + w.title,
        name: 'Beginners Madrasah Classes',
        replyTo: CONFIG.OWNER_EMAIL || undefined,
        body: [
          'Slm ' + first + ',',
          '',
          'A new workshop has just been announced: ' + w.title + '.',
          'Details and registration: ' + pageUrl,
          '',
          'Questions? Reply to this email or WhatsApp us on ' + CONFIG.WHATSAPP_DISPLAY + '.',
          '',
          'Beginners Madrasah Classes',
          '',
          '---',
          'You asked to hear about new ' + listName.toLowerCase() + '. To stop these emails, reply and say so.'
        ].join('\n')
      });
      sheet.getRange(i + 2, 6).setValue('Subscribed (last emailed ' + Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd') + ')');
      if (r[4]) {
        const msg = 'Slm ' + first + ', a new workshop has been announced: ' + w.title + '. Details: ' + pageUrl;
        forOwner.push(r[2] + ' (' + r[4] + '): https://wa.me/' + String(r[4]).replace('+', '') + '?text=' + encodeURIComponent(msg));
      }
    } catch (err) {
      console.error('Workshop email failed for row ' + (i + 2) + ': ' + err);
    }
  });
  if (forOwner.length) {
    alert_('New workshop sent to the list: ' + w.title,
      'Everyone on the ' + listName.toLowerCase() + ' list has been emailed. These people also left a WhatsApp number. Tap each link to send them a ready-made message:\n\n' + forOwner.join('\n\n'));
  }
}

function notifyWaitlist_(key) {
  const sheet = waitlistSheet_();
  if (sheet.getLastRow() < 2) return;
  const range = sheet.getRange(2, 1, sheet.getLastRow() - 1, WAITLIST_HEADERS.length);
  const rows = range.getValues();
  const pageUrl = CONFIG.SITE_URL + '/programmes' + CLASS_PATHS[key];
  const forOwner = [];
  rows.forEach(function (r, i) {
    if (r[1] !== CLASS_TITLES[key] || r[5] !== 'Waiting') return;
    if (MailApp.getRemainingDailyQuota() < CONFIG.MIN_QUOTA_FOR_CONFIRMATION) return; // the rest go next hour
    const first = String(r[2]).split(' ')[0].slice(0, 40);
    try {
      MailApp.sendEmail({
        to: String(r[3]),
        subject: 'Registration is open: ' + CLASS_TITLES[key],
        name: 'Beginners Madrasah Classes',
        replyTo: CONFIG.OWNER_EMAIL || undefined,
        body: [
          'Slm ' + first + ',',
          '',
          'You asked us to let you know: registration for ' + CLASS_TITLES[key] + ' is now open.',
          'Register here: ' + pageUrl,
          '',
          'Questions? Reply to this email or WhatsApp us on ' + CONFIG.WHATSAPP_DISPLAY + '.',
          '',
          'Beginners Madrasah Classes',
          '',
          '---',
          'You asked to be told once when this class opened. This is that one email; you are now off the list.'
        ].join('\n')
      });
      sheet.getRange(i + 2, 6).setValue('Emailed ' + Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd'));
      if (r[4]) {
        const msg = 'Slm ' + first + ', registration for ' + CLASS_TITLES[key] + ' is now open: ' + pageUrl;
        forOwner.push(r[2] + ' (' + r[4] + '): https://wa.me/' + String(r[4]).replace('+', '') + '?text=' + encodeURIComponent(msg));
      }
    } catch (err) {
      console.error('Waitlist email failed for row ' + (i + 2) + ': ' + err);
    }
  });
  if (forOwner.length) {
    alert_('Waitlist: ' + CLASS_TITLES[key] + ' is open',
      'Everyone on the waitlist has been emailed. These people also left a WhatsApp number. Tap each link to send them a ready-made message:\n\n' + forOwner.join('\n\n'));
  }
}

function waitlistSheet_() {
  const ss = backupSheet_().getParent();
  let sheet = ss.getSheetByName('Waitlist');
  if (!sheet) sheet = ss.insertSheet('Waitlist');
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, WAITLIST_HEADERS.length).setValues([WAITLIST_HEADERS]).setFontWeight('bold').setBackground('#F0D080');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Puts the answers into the Google Form as a normal response. Questions are matched by title.
 * Returns '' when everything went in, or a plain description of what did not.
 */
function submitToForm_(form, key, a) {
  const fields = FIELDS[key];
  const byTitle = {};
  fields.forEach(function (f) { byTitle[norm_(f.question)] = f; });

  const response = form.createResponse();
  const used = {};
  const missingRequired = [];

  form.getItems().forEach(function (item) {
    const f = byTitle[norm_(item.getTitle())];
    const T = FormApp.ItemType;
    const type = item.getType();
    if (!f) {
      if (isRequired_(item)) missingRequired.push(item.getTitle());
      return;
    }
    const value = a[f.id];
    if (f.optional && !value) { used[f.id] = true; return; } // e.g. no terms for this class
    if (type === T.TEXT) response.withItemResponse(item.asTextItem().createResponse(textValue_(f, value)));
    else if (type === T.PARAGRAPH_TEXT) response.withItemResponse(item.asParagraphTextItem().createResponse(textValue_(f, value)));
    else if (type === T.DATE) response.withItemResponse(item.asDateItem().createResponse(dateValue_(value)));
    else if (type === T.MULTIPLE_CHOICE) {
      const mc = item.asMultipleChoiceItem();
      response.withItemResponse(mc.createResponse(f.kind === 'consent' ? mc.getChoices()[0].getValue() : value));
    }
    else if (type === T.LIST) response.withItemResponse(item.asListItem().createResponse(value));
    else if (type === T.CHECKBOX) {
      const cb = item.asCheckboxItem();
      response.withItemResponse(cb.createResponse(f.kind === 'consent' ? [cb.getChoices()[0].getValue()] : [value]));
    } else {
      if (isRequired_(item)) missingRequired.push(item.getTitle());
      return;
    }
    used[f.id] = true;
  });

  const unmatched = fields.filter(function (f) { return !used[f.id] && !(f.optional && !a[f.id]); }).map(function (f) { return f.question; });
  if (missingRequired.length) {
    return 'The Google Form has required questions the website does not ask: ' + missingRequired.join('; ') + '. Run checkForms() for details.';
  }
  response.submit();
  if (unmatched.length) {
    // The response went in, but some answers had no matching question. Keep the full set too.
    return 'Submitted to the Google Form, but these answers had no matching question there: ' + unmatched.join('; ') + '.';
  }
  return '';
}

function isRequired_(item) {
  const T = FormApp.ItemType;
  const t = item.getType();
  try {
    if (t === T.TEXT) return item.asTextItem().isRequired();
    if (t === T.PARAGRAPH_TEXT) return item.asParagraphTextItem().isRequired();
    if (t === T.DATE) return item.asDateItem().isRequired();
    if (t === T.MULTIPLE_CHOICE) return item.asMultipleChoiceItem().isRequired();
    if (t === T.LIST) return item.asListItem().isRequired();
    if (t === T.CHECKBOX) return item.asCheckboxItem().isRequired();
  } catch (err) { /* section headers, images and so on are never required */ }
  return false;
}

function norm_(s) { return String(s || '').toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim(); }

/** Text questions get the date as 14/03/1990 and the consent as a plain sentence. */
function textValue_(f, value) {
  if (f.kind === 'date') { const p = value.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  if (f.kind === 'consent') return 'Yes: ' + (f.help || 'agreed');
  return value;
}
function dateValue_(iso) { const p = iso.split('-'); return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])); }

/* ------------------------------------------------------------------ */
/* Validation (mirrors src/data/registration.ts)                       */
/* ------------------------------------------------------------------ */

function clean_(value, maxLen) {
  let s = value === null || value === undefined ? '' : String(value);
  s = s.replace(/[\u0000-\u001F\u007F]+/g, ' ').trim(); // single line: also blocks email header tricks
  return s.length > maxLen ? s.slice(0, maxLen + 1) : s;
}

function validate_(key, raw) {
  const answers = {};
  let ok = true;
  FIELDS[key].forEach(function (f) {
    let v = clean_(raw[f.id], f.max || 120);
    if (f.kind === 'consent') { ok = ok && v === 'yes'; answers[f.id] = v; return; }
    if (!v) { if (!f.optional) ok = false; answers[f.id] = ''; return; }
    if (f.kind === 'number' && !/^\d{1,3}$/.test(v)) ok = false;
    if (f.max && v.length > f.max) ok = false;
    if (f.kind === 'email' && !/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(v)) ok = false;
    if (f.kind === 'phone') {
      const d = v.replace(/[\s\-().]/g, '');
      const za = /^(?:\+27|0027|27|0)([1-9]\d{8})$/.exec(d);
      const intl = /^(?:\+|00)([1-9]\d{7,14})$/.exec(d);
      v = za ? '+27' + za[1] : intl ? '+' + intl[1] : '';
      if (!v) ok = false;
    }
    if (f.kind === 'date') {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
      if (!m || Number(m[1]) < 1920 || new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) > new Date()) ok = false;
    }
    if (f.kind === 'choice' && f.options.indexOf(v) === -1) ok = false;
    answers[f.id] = v;
  });
  return { ok: ok, answers: answers };
}

function hash_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, String(text).toLowerCase());
  return bytes.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
}

/* ------------------------------------------------------------------ */
/* Forms, backup sheet, emails                                         */
/* ------------------------------------------------------------------ */

function form_(key) {
  const url = CONFIG.FORMS[key] || PropertiesService.getScriptProperties().getProperty('form_' + key);
  return url ? FormApp.openByUrl(url) : null;
}

function backupSheet_() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('backup_sheet');
  let ss;
  if (id) ss = SpreadsheetApp.openById(id);
  else {
    ss = SpreadsheetApp.create('Website registrations (backup)');
    props.setProperty('backup_sheet', ss.getId());
  }
  const sheet = ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, BACKUP_HEADERS.length).setValues([BACKUP_HEADERS]).setFontWeight('bold').setBackground('#F0D080');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function backup_(key, problem, a) {
  const sheet = backupSheet_();
  const row = sheet.getLastRow() + 1;
  const range = sheet.getRange(row, 1, 1, BACKUP_HEADERS.length);
  range.setNumberFormat('@'); // plain text, so nothing typed into the form can run as a formula
  range.setValues([[Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'), CLASS_TITLES[key], problem, summary_(key, a)]]);
}

function summary_(key, a) {
  return FIELDS[key].filter(function (f) { return !(f.optional && !a[f.id]); }).map(function (f) { return f.question + ': ' + (f.kind === 'consent' ? (a[f.id] === 'yes' ? 'Yes' : 'No') : a[f.id]); }).join('\n');
}

function alert_(subject, body) {
  if (!CONFIG.OWNER_EMAIL) { console.warn('OWNER_EMAIL is empty: alert not sent. ' + subject); return; }
  MailApp.sendEmail({ to: CONFIG.OWNER_EMAIL, subject: subject, body: body, name: 'Beginners Madrasah website' });
}

/** One plain confirmation to the person who registered. Plain text only. */
function sendConfirmation_(key, a) {
  const nameField = key === 'children' ? 'parentName' : 'name';
  const first = String(a[nameField] || '').split(' ')[0].slice(0, 40);
  const what = key === 'children' ? CLASS_TITLES[key] + ' for ' + String(a.childName || '').split(' ')[0] : CLASS_TITLES[key];
  const body = [
    'Slm ' + first + ',',
    '',
    'Shukran for registering for ' + what + '. Your registration has come through.',
    'Mualimah Rukeya will be in touch with the next steps, InshaAllah.',
    ''
  ].concat(CONFIG.PAYMENT_DETAILS ? ['How to pay:', CONFIG.PAYMENT_DETAILS, '',
    'Once you have paid, send your proof of payment to Mualimah Rukeya on WhatsApp: ' + CONFIG.WHATSAPP_DISPLAY + ' (https://wa.me/' + CONFIG.WHATSAPP_NUMBER + ').', ''] : []).concat([
    'Questions? Reply to this email or WhatsApp us on ' + CONFIG.WHATSAPP_DISPLAY + ' (https://wa.me/' + CONFIG.WHATSAPP_NUMBER + ').',
    '',
    'Beginners Madrasah Classes',
    CONFIG.SITE_URL,
    '',
    '---',
    'You are receiving this because this email address was used to register on ' + CONFIG.SITE_URL + '. ' +
      'We only use your details to arrange your class. To have them deleted, reply and say so.'
  ]).join('\n');
  MailApp.sendEmail({ to: a.email, subject: 'We received your registration | Beginners Madrasah Classes', body: body, name: 'Beginners Madrasah Classes', replyTo: CONFIG.OWNER_EMAIL || undefined });
}

/* ------------------------------------------------------------------ */
/* Run these by hand from the editor (see README)                      */
/* ------------------------------------------------------------------ */

/** Run once (and again after changing CONFIG). Backup sheet, email question on each form, hourly check. Never creates forms. */
function setup() {
  console.log('Backup sheet: ' + backupSheet_().getParent().getUrl());
  prepareForms();
  checkForms();
  waitlistSheet_();
  // Hourly reopen check for the waitlist (only one trigger, however often setup() is run).
  const exists = ScriptApp.getProjectTriggers().some(function (t) { return t.getHandlerFunction() === 'checkReopened'; });
  if (!exists) ScriptApp.newTrigger('checkReopened').timeBased().everyHours(1).create();
  checkReopened(); // records whether each form is open now, so the first real reopening is noticed
  console.log('Emails left today: ' + MailApp.getRemainingDailyQuota());
}

/**
 * A script cannot fill in Google's own "collect email" box, so each form gets a normal required
 * "Email" question at the top instead, and the built-in box is switched off (nobody is asked twice).
 */
function prepareForms() {
  Object.keys(CLASS_TITLES).forEach(function (key) {
    const form = form_(key);
    if (!form) return;
    const has = form.getItems().some(function (i) { return norm_(i.getTitle()) === 'email'; });
    if (!has) {
      const v = FormApp.createTextValidation().setHelpText('Please enter a valid email address.').requireTextIsEmail().build();
      const item = form.addTextItem().setTitle('Email').setRequired(true).setValidation(v);
      if (key === 'children') item.setHelpText("Parent or guardian's email");
      form.moveItem(item.getIndex(), 0);
      console.log('Added Email question to ' + CLASS_TITLES[key]);
    }
    if (form.collectsEmail()) { form.setCollectEmail(false); console.log('Switched off built-in email collection on ' + CLASS_TITLES[key]); }
  });
}

/** Lists, per class, questions the website sends that the form lacks, and required form questions the website does not ask. */
function checkForms() {
  Object.keys(CLASS_TITLES).forEach(function (key) {
    const form = form_(key);
    if (!form) { console.log(CLASS_TITLES[key] + ': NO FORM SET'); return; }
    const titles = form.getItems().map(function (i) { return norm_(i.getTitle()); });
    const missing = FIELDS[key].filter(function (f) { return titles.indexOf(norm_(f.question)) === -1; }).map(function (f) { return f.question; });
    const known = FIELDS[key].map(function (f) { return norm_(f.question); });
    const extraRequired = form.getItems().filter(function (i) { return isRequired_(i) && known.indexOf(norm_(i.getTitle())) === -1; }).map(function (i) { return i.getTitle(); });
    console.log(CLASS_TITLES[key] + ' | open: ' + form.isAcceptingResponses() +
      ' | missing in form: ' + (missing.join('; ') || 'none') +
      ' | required but not on website: ' + (extraRequired.join('; ') || 'none'));
  });
}

/** Test with a pretend registration. Use a COPY of a form first (put its edit link in CONFIG.FORMS). */
function testRegistration() {
  const result = processRegistration_({
    classKey: 'hifdh',
    website: '',
    answers: { email: CONFIG.OWNER_EMAIL, name: 'TEST - script check (please delete)', age: '30', whatsapp: '0600000000', previous: 'No', goal: 'Test', heard: 'WhatsApp' }
  });
  console.log(JSON.stringify(result));
}
