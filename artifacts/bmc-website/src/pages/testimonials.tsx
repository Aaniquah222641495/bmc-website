import { Link } from 'wouter';
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
      />

      {/* Featured quote */}
      <section className={`${SECTION_Y} bg-bmc-paper !pt-16 md:!pt-24`}>
        <div className={CONTAINER}>
          <figure className="bmc-reveal mx-auto max-w-4xl text-center">
            <span
              className="bmc-gold-text block select-none font-display leading-none"
              style={{ fontSize: 'clamp(5rem, 10vw, 7.5rem)', height: 'clamp(3.5rem, 7vw, 5rem)' }}
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote
              className="font-display font-normal italic leading-[1.4] tracking-[-0.01em] text-primary"
              style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2rem)' }}
            >
              {FEATURED.quote}
            </blockquote>
            <figcaption className="bmc-eyebrow mt-9">{FEATURED.tag}</figcaption>
          </figure>
        </div>
      </section>

      {/* Named testimonials */}
      <section className={`${SECTION_Y} bg-background`}>
        <div className={CONTAINER}>
          <SectionHead title="From Our Students" center className="mb-14 md:mb-20" />
          <ul className="mx-auto max-w-6xl gap-6 md:columns-2 lg:columns-3 lg:gap-8">
            {NAMED_TESTIMONIALS.map((t) => (
              <li key={t.name} className="mb-6 break-inside-avoid lg:mb-8">
                <figure className={`bmc-reveal ${CARD} relative overflow-hidden p-8 md:p-9`}>
                  <span className="bmc-gold-text pointer-events-none absolute right-6 top-2 select-none font-display text-7xl leading-none opacity-30" aria-hidden="true">
                    &rdquo;
                  </span>
                  <blockquote className="relative leading-[1.75] text-foreground/90">"{t.quote}"</blockquote>
                  <figcaption className="relative mt-7 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bmc-gold-light/40 font-display font-semibold text-bmc-gold-ink" aria-hidden="true">
                      {t.name.charAt(0)}
                    </span>
                    <span className="bmc-eyebrow !text-[0.68rem]">{t.name}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Real class photo */}
      <section className={`${SECTION_Y} bg-bmc-paper`}>
        <div className={`${CONTAINER} mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20`}>
          <div className="bmc-photo bmc-reveal">
            <img
              src="/assets/photo-womens-madrasah.webp"
              alt="The Women's Online Madrasah, gathered together on a live class call"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-top"
            />
          </div>
          <div className="bmc-reveal">
            <p className="bmc-eyebrow mb-4">Behind the Scenes</p>
            <h2 className={H2} style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)' }}>The Women's Online Madrasah</h2>
            <p className="mt-5 text-[1.08rem] leading-[1.7] text-foreground/80">
              Live, every week — a familiar circle of faces behind these words. Real classes, real questions, real friendships.
            </p>
          </div>
        </div>
      </section>

      {/* More stories, grouped */}
      <section className={`${SECTION_Y} bg-background`}>
        <div className={CONTAINER}>
          <SectionHead title="More Stories" intro="Shared with love, by students who asked to stay anonymous." center className="mb-14 md:mb-20" />
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {MORE_STORIES.map((group) => {
              return (
                <li key={group.label} className="flex">
                  <div className={`bmc-reveal bmc-lift ${CARD} w-full p-8 md:p-10`}>
                    <h3 className="bmc-eyebrow mb-7 !text-[0.78rem]">{group.label}</h3>
                    <div className="space-y-7">
                      {group.items.map((quote) => (
                        <figure key={quote}>
                          <blockquote className="mb-3 leading-[1.75] text-foreground/85">"{quote}"</blockquote>
                          <figcaption className="font-utility text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground/70">Student, 2025</figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

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
