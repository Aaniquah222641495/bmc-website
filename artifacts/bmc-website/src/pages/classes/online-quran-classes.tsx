import { ClassPageLayout } from '@/components/class-page-layout';
import { Seo } from '@/components/seo';
import { programmeJsonLd } from '@/lib/structured-data';
import { faqByQuestion } from '@/data/faq';

// The online version of Get Into Qur'an (client, 2026-11-01). Facts from her "Online Get Into Qur'an
// Registration Form – 2027" Google Form, which is the form embedded below.
const INCLUDED = [
  'The Arabic alphabet: every letter, sound, and form',
  'Joining letters and reading words with confidence',
  'Correct pronunciation and basic Tajweed rules',
  'Building reading fluency, progressing to the Mushaf',
  'Reading practice and homework between classes',
  'Live guidance and corrections in every session',
];

export default function OnlineQuranClasses() {
  return (
    <>
      <Seo
        title="Online Beginner Quran Class for Women"
        description="Learn to read the Qur'an from the very beginning, live on Zoom every Tuesday, 19:00 to 20:30. For women 16+, complete beginners welcome. R150/month, starts 19 January 2027."
        path="/programmes/online-quran-classes"
        jsonLd={programmeJsonLd('/programmes/online-quran-classes')}
      />
      <ClassPageLayout
        path="/online-quran-classes"
        title="Get Into Qur'an: Online"
        description="Learn to read the Qur'an from the very beginning, live on Zoom every Tuesday evening. For women who are complete beginners."
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSei3m3QiWHxB_wqsN83l6srQYLbYPW3hnaufMt09HWGnTRiVw/viewform"
        intro={
          <>
            <p>
              Have you always wanted to read the Qur'an but never knew where to begin? This is the online version of our Get Into Qur'an programme, for women who are complete beginners. No previous Arabic or Qur'an reading knowledge is needed.
            </p>
            <p>
              Classes are live on Zoom every Tuesday from 19:00 to 20:30, starting on Tuesday 19 January 2027, in a supportive and encouraging space where you can learn from home.
            </p>
          </>
        }
        forYou={[
          "You're a woman aged 16 or older",
          "You're a complete beginner at reading the Qur'an, or want to start again",
          'You can join live on Zoom on Tuesday evenings, 19:00 to 20:30',
          "You'd rather learn from home than travel to a class",
        ]}
        questions={faqByQuestion('Are classes suitable for complete beginners?', 'What do I need to get started?', 'How do I pay for my class?')}
        included={INCLUDED}
        details={[
          { label: 'Format', value: 'Live online · Zoom' },
          { label: "Who it's for", value: 'Women 16+' },
          { label: 'Schedule', value: 'Tuesdays, 19:00–20:30' },
          { label: 'Starts', value: 'Tuesday 19 January 2027' },
          { label: 'Fee', value: 'R150 per month' },
        ]}
      />
    </>
  );
}
