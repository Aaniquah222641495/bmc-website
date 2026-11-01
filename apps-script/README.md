# Registration forms: set-up guide (about 15 minutes, once)

The class pages on the website have their own registration form. This small Google script, in
**Mualimah Rukeya's own Google account** (the one that owns her Google Forms), receives each one and:

1. puts it into that class's Google Form as a normal response, so the **Responses tab looks exactly as before**,
2. emails the person a short "we received your registration",
3. keeps anything it cannot put into the form in a **backup sheet** and emails an alert (nothing is lost),
4. runs the **"Tell me when it opens"** waitlist: when a Google Form is reopened, everyone waiting gets one email within the hour, and she gets the list with a one-tap WhatsApp link for each person who left a number.

5. runs the **workshop lists**: on the Online and In-Person Workshops pages people leave their email; when she publishes a new workshop in the site editor, everyone on that list gets an email within the hour (the script reads `beginnersmadrasah.co.za/workshops.json`, written by every site build). These people stay on the list until they ask to be removed (delete their row in the Waitlist tab).

Opening and closing a class is done the usual way: in the Google Form, **Responses > Accepting responses** on or off. The website follows it within a few minutes.

## Part 1: Paste the script
1. Signed in as her account, go to https://script.google.com and click **New project**. Name it **BMC registrations**.
2. Delete what is in `Code.gs`, paste all of `apps-script/Code.gs` from this repo, and save (Cmd+S).
3. In the CONFIG block at the top fill in:
   - `OWNER_EMAIL`: her email (alerts and the waitlist list go here).
   - `FORMS.womens` and `FORMS.children`: open each existing Google Form, copy the address bar (ends in `/edit`), paste between the quotes.
   - Leave `FORMS.hifdh` and `FORMS.quran` empty: setup creates those two forms.
4. Save.

## Part 2: Run setup
1. In the function drop-down choose **setup**, click **Run**, and allow the permissions (Advanced > Go to BMC registrations > Allow). It asks for her forms, a spreadsheet, email and triggers: that is all it uses.
2. The log shows: the backup sheet link, the two new form links (Hifdh, Get Into Qur'an), and a line per class: `missing in form: ...` and `required but not on website: ...`.
3. If a class says **missing in form: Consent** (her existing forms do not have it), choose **addMissingQuestions** and Run: it adds the consent tick box at the end of those forms. Anything under **required but not on website** must be made optional or renamed to match, or registrations for that class go to the backup sheet instead.
4. Children's form: the website asks Parent or guardian's full name, Parent's email, Parent's WhatsApp number, Child's full name, Child's age, Child's date of birth, Emergency contact number, Medical conditions or allergies, City & Country, Parent consent. Add any of these her form is missing. Rename her questions to match (or tell us her wording and we change the website).

## Part 3: Publish
1. **Deploy > New deployment**, gear > **Web app**. Execute as **Me**, Who has access **Anyone**. Deploy.
2. Copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`) and send it to Digital Pantry. Opening it in a browser shows `{"ok":true,...,"status":"running"}`.
3. We put the URL in `src/data/registration.ts` (`DEFAULT_ENDPOINT`). Until then the site keeps the embedded Google Forms.

## Part 4: Test before going live
Use a COPY of a form first (File > Make a copy in the form, paste the copy's /edit link into CONFIG), run **testRegistration**, and check the response appears in the copy's Responses tab like a normal one. Then put the real links back.

## Changing the script later
Deploy > Manage deployments > pencil > Version: New version > Deploy. The URL stays the same.

## Limits
- Free Google accounts can send about 100 emails a day. If a big waitlist exceeds that, the rest go out the next hour.
- WhatsApp cannot be sent automatically without WhatsApp's paid business API; the alert email gives her tap-to-send links instead.
