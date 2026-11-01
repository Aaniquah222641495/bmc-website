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
        title="Beginner Quran Class, Mitchell's Plain"
        description="A beginner Quran reading programme for women in Mitchell's Plain, Cape Town — every Saturday morning, from the Arabic alphabet to confidently reciting the Mushaf."
        path="/programmes/quran-classes"
        jsonLd={programmeJsonLd('/programmes/quran-classes')}
      />
      <ClassPageLayout
        path="/quran-classes"
        // Matches the questions in the shared registration form (forms.gle/7tFCxqL8Ypgv9Jps5), read 2026-10-27.
        formNeeds="Your full name, email, date of birth, WhatsApp number, and city and country."
        title="Get Into Qur'an: In Person"
        description="A Qur'an programme for women who are complete beginners or want to start again, held every Saturday morning in Mitchell's Plain, Cape Town."
        intro={
          <>
            <p>
              This in-person Qur'an programme for women is designed for complete beginners, or for those who once learned but want to start again from the foundations. You will be guided step by step through Qur'an reading, with the goal of progressing to confidently reciting directly from the Mushaf.
            </p>
            <p>
              Classes are held every Saturday morning in Mitchell's Plain, Cape Town, giving you the added blessing of learning in community with other students on the same journey.
            </p>
          </>
        }
        forYou={[
          "You're a woman and a complete beginner at reading the Qur'an",
          'You learned once and want to start again from the foundations',
          "You can get to Mitchell's Plain on Saturday mornings",
          "You'd like to learn in person, with others on the same journey",
        ]}
        questions={faqByQuestion("Are classes suitable for complete beginners?", "What do I need to get started?", "How do I pay for my class?")}
        included={INCLUDED}
        details={[
          { label: 'Format', value: 'In-Person' },
          { label: 'Who it\'s for', value: 'Women' },
          { label: 'Schedule', value: 'Every Saturday morning' },
          { label: 'Location', value: "Mitchell's Plain, Cape Town" },
          { label: 'Fee', value: 'R200 per month' },
        ]}
      />
    </>
  );
}
