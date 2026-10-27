import { useState } from 'react';
import { Link } from 'wouter';
import { GirihPattern } from '@/components/ornaments';
import { Seo } from '@/components/seo';
import { simplePageJsonLd } from '@/lib/structured-data';
import { CARD, ClosingBand, CONTAINER, H2, PageHeader, SECTION_Y, SectionHead } from '@/components/page-shell';


interface Testimonial {
  quote: string;
  name: string;
}

const FEATURED = {
  quote:
    "From the depth of my heart, I want to say shukran. You have been a means of change in my life. Allah placed you in my path at a time when I needed it most. Through you, I found the courage to start again, push past my embarrassment, and reconnect with the Qur'an in a way I never thought I could. You made me feel seen, supported and capable, and I will carry that with me always.",
  tag: 'Student, 2025',
};

const NAMED_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Yasmeen Zingitwa',
    quote:
      "I am immensely grateful for the opportunity to be part of this wonderful madrasah class. I can confidently say that this has been a truly enriching experience. Mualimah's dedication has shone through, guiding us with patience and clarity every step of the way. Alhamdulillah, I've been amazed at how much I've learned over such a short period of time. I encourage anyone considering joining to take this step!",
  },
  {
    name: 'Naadhirah Gilbert',
    quote:
      "I am thoroughly enjoying myself in the class. Mualimah takes her time with each topic and always makes sure that everyone is on the same page before moving on or starting a new topic. The class is perfect for beginners, reverts or even just a refresher course to bring you closer to the Almighty. Alhamdulillah, I've learnt so much in the short period of time.",
  },
  {
    name: 'Saarah Hercules',
    quote:
      "This class has been so insightful and helpful. Mualimah Rukeya is patient and supportive, and caters to all ladies, young and old. Being a revert, I've felt comfortable and very supported from the start, alhamdulillah. Shukran for your time and dedication to us.",
  },
  {
    name: 'Nasheetah De Jongh',
    quote:
      "She makes each and every individual feel equal and comfortable in the class. She brings out the confidence in each person, and alhamdulillah she tends to keep a smile on her face and ours. I look forward to class every week — it's become a new and fun social experience even though it's online.",
  },
  {
    name: 'Aaliyah Arendse',
    quote:
      "The beginners class has been nothing but the best decision I've made — going back and refreshing my memory on the basics of our religion. Mualima Rukeya has made it such a pleasure for me to want to learn even more. Even though I'm a very shy and nervous person, she makes you feel comfortable in every class.",
  },
  {
    name: 'Zaytoon Jordaan',
    quote:
      "So far I have loved the Madrassah classes. You are very thoughtful and you bring points across very well during classes. You make learning about Islam easy, and there's an atmosphere that makes me feel safe to ask for help if I am stuck or lost.",
  },
];

const MORE_STORIES = [
  {
    label: 'Reverts to Islam',
    items: [
      "I just wanted to thank you again for the classes. I am learning so much, and it feels so much easier than when I was trying to learn on my own without knowing where to start. May Allah bless you for what you are doing, especially for reverts to Islam.",
      "Shukran so much for the classes. They were very informative and I learnt so much, especially being a revert. I was very nervous every Sunday morning before the class started, but you made everything easy to understand. I also now know that making salaah is not as difficult as I thought it would be.",
    ],
  },
  {
    label: 'Starting Again',
    items: [
      "This year came with many difficulties and challenges, but when I joined this class, a heaviness in my heart was lifted. Alhamdulillah, Allah places serenity where He wills, and this class has been a source of comfort and guidance.",
      "Just want to mention that you are a very good teacher, and I can see that you love what you do. Keep it up. You don't know how much it means to your students. Alhamdulillah for all you do.",
    ],
  },
  {
    label: 'Consistency & Community',
    items: [
      "Shukran soooo much for the classes. Going to class every Sunday has made my life feel so light, Alhamdulillah. Shukran for teaching us the basics of Islam.",
      "I only joined mid-year, but I thoroughly enjoyed the classes, Alhamdulillah. The pace was good, the teaching was good, and the lessons were easy to understand throughout.",
    ],
  },
  {
    label: 'Gratitude',
    items: [
      "Shukran Mualimah for everything you've done for us. Shukran for your patience, empathy, understanding, kindness and for the love you have for what you are doing. Mualimah is a true inspiration.",
      "Mualimah, shukran for creating this space for us to grow, become better and learn without feeling ashamed. Your classes were truly inspiring and so relatable.",
    ],
  },
  {
    label: 'A Milestone Moment',
    items: [
      "Salaam, shukran for this. I wanted to let you know that I finally know Surah Faatihah after struggling for so long to remember it. I can now focus on the next surah and continue learning.",
    ],
  },
  {
    label: 'Family & Home',
    items: [
      "These classes kept me on track and were a constant reminder to me. My children would sometimes sit with me during the classes, and they absorbed more than I realised. I was able to help them with their Islamic Studies, and seeing their achievements made me extremely emotional. Shukran, Mualimah. You will always be in my duas, Insha Allah.",
    ],
  },
];

export default function Testimonials() {
  return (
    <>
      <Seo
        title="Student Testimonials"
        description="Real stories from women who found their footing through Beginners Madrasah Classes — reverts, beginners and mothers sharing their own journeys."
        path="/testimonials"
        jsonLd={simplePageJsonLd('Testimonials', '/testimonials')}
      />
      <PageHeader
        eyebrow="In their own words"
        title="Student Testimonials"
        intro="Real stories from the women who've joined our classes — reverts finding their footing, beginners building confidence, and mothers passing it on to their children."
        art={<FeaturedQuote />}
      />

      {/* Named testimonials: heading holds on the left while the cards scroll */}
      <section className={`${SECTION_Y} bg-background`}>
        <div className={`${CONTAINER} mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.75fr_2fr] lg:gap-14`}>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="bmc-eyebrow mb-4">In their own names</p>
            <h2 className={H2} style={{ fontSize: 'clamp(2rem, 3.6vw, 2.9rem)' }}>From Our Students</h2>
            <p className="mt-5 max-w-sm text-[1.05rem] leading-[1.7] text-foreground/75">
              Six students who were happy to put their names to their words.
            </p>
          </div>
          <ul className="gap-6 md:columns-2 lg:gap-7">
            {NAMED_TESTIMONIALS.map((t) => (
              <li key={t.name} className="mb-6 break-inside-avoid lg:mb-7">
                <figure className={`bmc-reveal ${CARD} relative overflow-hidden p-8 md:p-9`}>
                  <blockquote className="relative leading-[1.75] text-foreground/90">"{t.quote}"</blockquote>
                  <figcaption className="relative mt-7 flex items-center gap-3">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-display text-lg text-bmc-gold-light" aria-hidden="true">
                      {t.name.charAt(0)}
                    </span>
                    <span className="font-display text-[1.08rem] text-primary">{t.name}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The class behind the words: wide photo with a caption card resting on it */}
      <section className={`${SECTION_Y} bg-bmc-paper`}>
        <div className={`${CONTAINER} mx-auto max-w-6xl`}>
          <div className="bmc-reveal relative">
            <div className="bmc-photo">
              <img
                src="/assets/photo-womens-madrasah.webp"
                alt="The Women's Online Madrasah, gathered together on a class call"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover object-[center_25%] sm:aspect-[16/8]"
              />
            </div>
            <div className={`${CARD} relative -mt-16 mx-4 p-7 sm:absolute sm:bottom-8 sm:left-8 sm:m-0 sm:max-w-md md:p-9`}>
              <p className="bmc-eyebrow mb-3">Behind the scenes</p>
              <h2 className="text-primary leading-[1.12]" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)' }}>The Women's Online Madrasah</h2>
              <p className="mt-4 leading-[1.7] text-foreground/80">A familiar circle of faces behind these words. Real classes, real questions, real friendships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* More stories: one card per story, filter by theme */}
      <MoreStories />

      <ClosingBand
        title="Ready to start your own journey?"
        actions={
          <Link href="/programmes" className="bmc-btn bmc-btn-light">
            Explore Our Programmes
          </Link>
        }
      >
        Join the women who found their footing here. Every class starts with someone who felt exactly where you are now.
      </ClosingBand>
    </>
  );
}

function FeaturedQuote() {
  return (
    <figure className="relative overflow-hidden rounded-[1.75rem] bg-primary p-8 text-primary-foreground shadow-lift md:p-11">
      <GirihPattern />
      <div className="relative">
        <span
          className="block select-none font-display leading-none text-bmc-gold-light"
          style={{ fontSize: 'clamp(4.5rem, 8vw, 6.5rem)', height: 'clamp(3rem, 5.2vw, 4.2rem)' }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote className="mt-2 font-display text-[1.18rem] font-normal italic leading-[1.5] md:text-[1.3rem]">{FEATURED.quote}</blockquote>
        <figcaption className="mt-7 font-utility text-[0.75rem] font-bold uppercase tracking-[0.16em] text-bmc-gold-light">{FEATURED.tag}</figcaption>
      </div>
    </figure>
  );
}

function MoreStories() {
  const [theme, setTheme] = useState<string>('All');
  const stories = MORE_STORIES.flatMap((g) => g.items.map((quote) => ({ quote, label: g.label })));
  const visible = theme === 'All' ? stories : stories.filter((s) => s.label === theme);
  const themes = ['All', ...MORE_STORIES.map((g) => g.label)];
  return (
    <section className={`${SECTION_Y} bg-background`}>
      <div className={CONTAINER}>
        <SectionHead title="More Stories" intro="Shared with love, by students who asked to stay anonymous." center className="mb-10 md:mb-12" />
        <div role="group" aria-label="Filter stories by theme" className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-2.5 md:mb-16">
          {themes.map((t) => {
            const on = theme === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTheme(t)}
                className={`min-h-11 rounded-full px-5 font-utility text-[0.9rem] font-semibold transition-colors duration-300 motion-reduce:transition-none ${
                  on ? 'bg-primary text-primary-foreground shadow-soft' : 'bg-card text-foreground/80 shadow-soft hover:text-primary'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        <ul className="mx-auto max-w-6xl gap-6 md:columns-2 lg:columns-3 lg:gap-8" aria-live="polite">
          {visible.map(({ quote, label }) => (
            <li key={quote} className="mb-6 break-inside-avoid lg:mb-8">
              <figure className={`${CARD} p-8`}>
                <span className="inline-flex rounded-full bg-bmc-gold-light/35 px-3 py-1 font-utility text-[0.7rem] font-bold uppercase tracking-[0.12em] text-bmc-gold-ink">
                  {label}
                </span>
                <blockquote className="mt-5 leading-[1.75] text-foreground/85">"{quote}"</blockquote>
                <figcaption className="mt-5 font-utility text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground/65">Student, 2025</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
