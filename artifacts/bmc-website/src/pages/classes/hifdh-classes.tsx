import { ClassPageLayout } from '@/components/class-page-layout';
import { Seo } from '@/components/seo';
import { programmeJsonLd } from '@/lib/structured-data';
import { faqByQuestion } from '@/data/faq';
import { GirihPattern } from '@/components/ornaments';


const INCLUDED = [
  'A structured, personalised memorisation plan',
  'Live sessions twice a week: Tuesday & Thursday, 18:00 to 19:00',
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
        description="Structured online Quran memorisation for women who read the Qur'an fluently, live on Tuesday and Thursday evenings via Microsoft Teams: memorisation, revision and recitation."
        path="/programmes/hifdh-classes"
        jsonLd={programmeJsonLd('/programmes/hifdh-classes')}
      />
      <ClassPageLayout
        path="/hifdh-classes"
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSfCpNLMgV0T3cveTmzWKFjKMuWuS46RRr9qU2YwYZ48rEv3_Q/viewform"
        // Her "Hifth Programme 2027" Google Form, read 2026-11-01.
        formNeeds="Your full name, age, WhatsApp number and email, plus a few questions about your Hifdh experience and goals."
        title="Women's Hifdh Programme"
        description="A structured online Qur'an memorisation programme for women, with live guidance twice a week."
        intro={
          <>
            <p>
              Hifdh, the memorisation of the Holy Qur'an, is one of the most beloved acts in Islam. Our Women's Hifdh Programme provides a structured, supportive online environment for women who have taken this beautiful step.
            </p>
            <p>
              Live classes are held twice a week, on Tuesday and Thursday from 18:00 to 19:00, via Microsoft Teams. Before joining, you need to be able to read the Qur'an fluently. Students receive consistent guidance with their memorisation, revision, and recitation to help them progress steadily and confidently in their Hifdh journey.
            </p>
          </>
        }
        forYou={[
          "You're a woman aged 16 or older, beginning or continuing Hifdh",
          "You can already read the Qur'an fluently",
          'You can join live on Tuesday and Thursday, 18:00 to 19:00',
          "You'd like a personal plan and someone to keep you on track",
        ]}
        questions={faqByQuestion("What platform are classes held on?", "What if I miss a session?", "How do I pay for my class?")}
        included={INCLUDED}
        details={[
          { label: 'Format', value: 'Live Online · Microsoft Teams' },
          { label: 'Schedule', value: 'Tue & Thu, 18:00–19:00' },
          { label: 'Before you join', value: "You read the Qur'an fluently" },
          { label: 'Who it\'s for', value: 'Women 16+ beginning or continuing Hifdh' },
          { label: 'Starts', value: 'Tuesday 19 January 2027' },
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
