import { ClassPageLayout } from '@/components/class-page-layout';
import { Seo } from '@/components/seo';
import { programmeJsonLd } from '@/lib/structured-data';
import { faqByQuestion } from '@/data/faq';


const INCLUDED = [
  'The Arabic alphabet: every letter, sound, and form',
  'Joining letters and reading words with confidence',
  'Correct pronunciation and basic Tajweed rules',
  'Building reading fluency, progressing to the Mushaf',
  'Personal guidance and corrections in every session',
  'Small class sizes for focused, individual attention',
];

export default function QuranClasses() {
  return (
    <>
      <Seo
        title="Get Into Qur'an: Beginner Quran Class for Women"
        description="A beginner Quran reading programme for women: in person on Saturdays in Woodlands, Mitchell's Plain, or online on Tuesday evenings. From the Arabic alphabet to reciting the Mushaf."
        path="/programmes/quran-classes"
        jsonLd={programmeJsonLd('/programmes/quran-classes')}
      />
      <ClassPageLayout
        path="/quran-classes"
        // Matches the questions in the shared registration form (forms.gle/7tFCxqL8Ypgv9Jps5), read 2026-10-27.
        formNeeds="Your full name, email, date of birth, WhatsApp number, and city and country."
        title="Get Into Qur'an"
        description="A Qur'an programme for women who are complete beginners or want to start again. Join in person on Saturdays, or online on Tuesday evenings."
        intro={
          <>
            <p>
              This Qur'an programme for women is designed for complete beginners, or for those who once learned but want to start again from the foundations. You will be guided step by step through Qur'an reading, with the goal of progressing to confidently reciting directly from the Mushaf.
            </p>
            <p>
              Choose the class that suits you. In person every Saturday from 09:00 to 10:30 in Woodlands, Mitchell's Plain, with the added blessing of learning in community with other students on the same journey. The exact address is shared after you register. Or join online every Tuesday from 19:00 to 20:30.
            </p>
          </>
        }
        forYou={[
          "You're a woman and a complete beginner at reading the Qur'an",
          'You learned once and want to start again from the foundations',
          "You can get to Mitchell's Plain on a Saturday morning, or join online on a Tuesday evening",
          "You'd like to learn with others on the same journey",
        ]}
        questions={faqByQuestion("Are classes suitable for complete beginners?", "What do I need to get started?", "How do I pay for my class?")}
        included={INCLUDED}
        details={[
          { label: 'Format', value: 'In person or online' },
          { label: 'Who it\'s for', value: 'Women' },
          { label: 'In person', value: 'Saturday, 09:00–10:30' },
          { label: 'Online', value: 'Tuesday, 19:00–20:30' },
          { label: 'Location', value: "Woodlands, Mitchell's Plain (address after you register)" },
          { label: 'Fee', value: 'R200 per month' },
        ]}
      />
    </>
  );
}
