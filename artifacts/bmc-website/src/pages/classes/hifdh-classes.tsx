import { ClassPageLayout } from '@/components/class-page-layout';
import { Seo } from '@/components/seo';
import { programmeJsonLd } from '@/lib/structured-data';
import { faqByQuestion } from '@/data/faq';
import { GirihPattern } from '@/components/ornaments';


const INCLUDED = [
  'A structured, personalised memorisation plan',
  'Live sessions 3 times a week: Monday, Wednesday & Friday',
  'Guided recitation and correction in every class',
  'Systematic revision to keep what you have memorised',
  'Spiritual encouragement throughout your Hifdh journey',
  'Accountability and consistent progress tracking',
];

export default function HifdhClasses() {
  return (
    <>
      <Seo
        title="Women's Hifdh Programme"
        description="Structured online Quran memorisation for women, with live guidance three times a week via Microsoft Teams — memorisation, revision and recitation."
        path="/programmes/hifdh-classes"
        jsonLd={programmeJsonLd('/programmes/hifdh-classes')}
      />
      <ClassPageLayout
        path="/hifdh-classes"
        // Matches the questions in the shared registration form (forms.gle/7tFCxqL8Ypgv9Jps5), read 2026-10-27.
        formNeeds="Your full name, email, date of birth, WhatsApp number, and city and country."
        title="Women's Hifdh Programme"
        description="A structured online Qur'an memorisation programme for women, with live guidance three times a week."
        intro={
          <>
            <p>
              Hifdh, the memorisation of the Holy Qur'an, is one of the most beloved acts in Islam. Our Women's Hifdh Programme provides a structured, supportive online environment for women who have taken this beautiful step.
            </p>
            <p>
              Live classes are held three times a week via Microsoft Teams. Students receive consistent guidance with their memorisation, revision, and recitation to help them progress steadily and confidently in their Hifdh journey.
            </p>
          </>
        }
        forYou={[
          "You're a woman beginning or continuing Hifdh",
          'You can join live on Monday, Wednesday and Friday',
          "You'd like a personal plan and someone to keep you on track",
        ]}
        questions={faqByQuestion("What platform are classes held on?", "What if I miss a session?", "How do I pay for my class?")}
        included={INCLUDED}
        details={[
          { label: 'Format', value: 'Live Online · Microsoft Teams' },
          { label: 'Schedule', value: 'Mon, Wed & Fri (3x per week)' },
          { label: 'Who it\'s for', value: 'Women beginning or continuing Hifdh' },
          { label: 'Fee', value: 'R200 per month' },
        ]}
      >
        {/* Inspirational note */}
        <figure className="relative overflow-hidden rounded-[1.25rem] bg-primary px-8 py-12 text-center text-primary-foreground shadow-soft md:px-12">
          <GirihPattern />
          <div className="relative">
            <blockquote className="mx-auto max-w-lg font-display text-[1.35rem] italic leading-[1.5]">
              "The best among you are those who learn the Qur'an and teach it."
            </blockquote>
            <figcaption className="bmc-eyebrow on-dark mt-5">Prophet Muhammad (SAW)</figcaption>
          </div>
        </figure>
      </ClassPageLayout>
    </>
  );
}
