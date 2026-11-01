import { ClassPageLayout } from '@/components/class-page-layout';
import { Seo } from '@/components/seo';
import { programmeJsonLd } from '@/lib/structured-data';
import { faqByQuestion } from '@/data/faq';


const INCLUDED = [
  'Aqaaid (Islamic Belief): understand the foundations of faith',
  'Fiqh (Islamic Jurisprudence): how to practice Islam correctly',
  'Tajweed: Qur\'an recitation with proper pronunciation',
  'Seerah: the life and character of the Prophet (SAW)',
  'Akhlaaq: Islamic character and moral conduct',
  'Hadith: sayings and teachings of the Prophet (SAW)',
  'Essential duas for daily life',
];

export default function WomensClasses() {
  return (
    <>
      <Seo
        title="Women's Online Madrasah"
        description="Beginner-friendly, self-paced Islamic studies for women 18+ via Google Classroom — Aqaaid, Fiqh, Tajweed, Seerah, Akhlaaq, Hadith and more, R150/month."
        path="/programmes/womens-classes"
        jsonLd={programmeJsonLd('/programmes/womens-classes')}
      />
      <ClassPageLayout
        path="/womens-classes"
        title="Women's Online Madrasah"
        description="A structured, beginner-friendly Islamic studies programme for women 18+, designed to fit around your life."
        formUrl="https://forms.gle/UQoRpDfaXptJrMXj8"
        intro={
          <p>
            Our Women's Online Madrasah is a comprehensive, beginner-friendly Islamic studies programme for women 18 and older. Lessons are pre-recorded and uploaded to Google Classroom, allowing you to learn at your own pace, whenever and wherever suits you best.
          </p>
        }
        forYou={[
          "You're a woman aged 18 or older",
          'You never went to madrasah, or want to refresh the basics',
          "You're a revert looking for a gentle place to start",
          'You need to learn around work, studies or motherhood',
        ]}
        questions={faqByQuestion("Are classes suitable for complete beginners?", "I am a revert. Where do I start?", "What if I miss a session?", "How do I pay for my class?")}
        included={INCLUDED}
        quote={{
          text: "I am thoroughly enjoying myself in the class. Mualimah takes her time with each topic and always makes sure that everyone is on the same page before moving on or starting a new topic. The class is perfect for beginners, reverts or even just a refresher course to bring you closer to the Almighty. Alhamdulillah, I've learnt so much in the short period of time.",
          name: 'Naadhirah Gilbert',
        }}
        details={[
          { label: 'Format', value: 'Online · Google Classroom (pre-recorded)' },
          { label: 'Who it\'s for', value: 'Women 18+' },
          { label: 'Access', value: 'Learn at your own pace, anytime' },
          { label: 'Registration', value: 'Open 1 November 2026 to 1 January 2027' },
          { label: 'Classes begin', value: 'January 2027' },
          { label: 'Fee', value: 'R150 per month' },
        ]}
      />
    </>
  );
}
