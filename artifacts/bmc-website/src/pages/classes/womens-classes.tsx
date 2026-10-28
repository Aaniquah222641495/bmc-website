import { ClassPageLayout } from '@/components/class-page-layout';
import { Seo } from '@/components/seo';
import { programmeJsonLd } from '@/lib/structured-data';


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
        included={INCLUDED}
        quote={{
          text: "I am thoroughly enjoying myself in the class. Mualimah takes her time with each topic and always makes sure that everyone is on the same page before moving on or starting a new topic. The class is perfect for beginners, reverts or even just a refresher course to bring you closer to the Almighty. Alhamdulillah, I've learnt so much in the short period of time.",
          name: 'Naadhirah Gilbert',
        }}
        details={[
          { label: 'Format', value: 'Online · Google Classroom (pre-recorded)' },
          { label: 'Who it\'s for', value: 'Women 18+' },
          { label: 'Access', value: 'Learn at your own pace, anytime' },
          { label: 'Fee', value: 'R150 per month' },
        ]}
      />
    </>
  );
}
