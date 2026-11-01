import { ClassPageLayout } from '@/components/class-page-layout';
import { Seo } from '@/components/seo';
import { programmeJsonLd } from '@/lib/structured-data';
import { faqByQuestion } from '@/data/faq';
import { CARD } from '@/components/page-shell';


const INCLUDED = [
  'Qur\'an recitation: building a strong foundation in reading',
  'Surahs: memorising short chapters of the Qur\'an',
  'Aqaaid: understanding the pillars of Islamic belief',
  'Fiqh: how to perform wudhu, salah, and daily acts of worship',
  'Akhlaaq: Islamic character, kindness, and good manners',
  'Islamic History: the stories of the Prophets and Companions',
  'Hadith: the sayings and teachings of the Prophet (SAW)',
  'Daily duas: morning, evening, eating, sleeping, and more',
];

export default function ChildrensClasses() {
  return (
    <>
      <Seo
        title="Children's Online Madrasah"
        description="Live Islamic classes for children aged 6-13, three times a week via Microsoft Teams — Quran, Aqaaid, Fiqh, Akhlaaq and Islamic History, R150/month."
        path="/programmes/childrens-classes"
        jsonLd={programmeJsonLd('/programmes/childrens-classes')}
      />
      <ClassPageLayout
        path="/childrens-classes"
        title="Children's Online Madrasah"
        description="Live Islamic classes for children aged 6–13, held three times a week via Microsoft Teams in a fun and structured environment."
        formUrl="https://docs.google.com/forms/d/e/1FAIpQLSd85qaL_rGHPefSE3k7IxJsDtV8mXsBdOc55iiHi-8287yslw/viewform"
        intro={
          <>
            <p>
              Give your child a strong Islamic foundation in a structured, engaging, and supportive online classroom. Our Children's Online Madrasah follows a comprehensive Maktab curriculum that covers all the essential areas of Islamic knowledge.
            </p>
            <p>
              Classes are held live three times a week via Microsoft Teams (Monday, Tuesday and Thursday, 17:00 to 18:00), creating a consistent routine that children can look forward to.
            </p>
          </>
        }
        forYou={[
          'Your child is between 6 and 13',
          'You want a steady routine: live classes on Monday, Tuesday and Thursday, 17:00 to 18:00',
          "You'd like regular feedback on how your child is doing",
          'Learning from home suits your family',
        ]}
        questions={faqByQuestion("How do I join the Children's Classes?", "Do you have classes for children under 6 or teenagers?", "What if I miss a session?", "How do I pay for my class?")}
        included={INCLUDED}
        details={[
          { label: 'Format', value: 'Live Online · Microsoft Teams' },
          { label: 'Schedule', value: 'Mon, Tue & Thu, 17:00–18:00' },
          { label: 'Ages', value: 'Children aged 6–13' },
          { label: 'Starts', value: 'Monday 18 January 2027' },
          { label: 'Fee', value: 'R150 per month' },
        ]}
      >
        {/* Parent note */}
        <div className={`${CARD} flex items-start gap-5 p-7 md:p-10`}>
          <img src="/assets/parents.webp" alt="" width={32} height={32} loading="lazy" decoding="async" className="mt-1 shrink-0" />
          <div>
            <h3 className="mb-3 text-[1.4rem] text-primary">A note for parents</h3>
            <p className="leading-[1.7] text-foreground/85">
              We understand that parents want assurance that their children are in safe, capable hands. Mualimah Rukeya creates a warm, structured classroom environment where children feel encouraged, seen, and excited to learn. Regular feedback is provided to ensure you always know how your child is progressing.
            </p>
          </div>
        </div>
      </ClassPageLayout>
    </>
  );
}
