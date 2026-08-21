import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Link } from 'wouter';
import { Seo } from '@/components/seo';

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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-8 justify-center"
    >
      <img src="/assets/bullet.webp" alt="" width={16} height={16} loading="lazy" decoding="async" />
      <h2 className="font-utility text-xs text-accent uppercase tracking-widest font-bold">{children}</h2>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <>
      <Seo
        title="Student Testimonials"
        description="Real stories from women who found their footing through Beginners Madrasah Classes — reverts, beginners and mothers sharing their own journeys."
        path="/testimonials"
      />
      <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden">

      {/* Faint tiling gold star texture, echoes the homepage hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 L43.5 22 L57 18 L48 29 L62 33 L48 37 L57 48 L43.5 44 L40 58 L36.5 44 L23 48 L32 37 L18 33 L32 29 L23 18 L36.5 22 Z' fill='none' stroke='%23C9A84C' stroke-width='0.6'/%3E%3C/svg%3E")`,
          opacity: 0.05,
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 max-w-2xl mx-auto relative"
        >
          <p className="font-utility text-xs text-accent uppercase tracking-widest mb-3">In their own words</p>
          <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">Student Testimonials</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          <p className="font-body text-foreground/70 text-lg">
            Real stories from the women who've joined our classes — reverts finding their footing, beginners building confidence, and mothers passing it on to their children.
          </p>
        </motion.div>

        {/* Featured quote */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="islamic-pattern rounded-2xl p-10 md:p-14 text-center relative overflow-hidden mb-16 shadow-lg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: 'backOut' }}
          >
            <Quote className="w-8 h-8 text-accent mx-auto mb-6" />
          </motion.div>
          <p className="font-body text-lg md:text-2xl leading-relaxed text-bmc-cream mb-6">
            "{FEATURED.quote}"
          </p>
          <span className="font-utility text-accent uppercase tracking-widest text-sm">{FEATURED.tag}</span>
        </motion.div>

        {/* Named testimonials grid */}
        <div className="mb-16">
          <SectionLabel>From Our Students</SectionLabel>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAMED_TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl hover:border-accent/40 transition-shadow duration-300 p-7 flex flex-col"
              >
                <span className="absolute -top-2 right-4 font-display text-7xl leading-none text-accent/10 select-none pointer-events-none" aria-hidden="true">
                  &rdquo;
                </span>
                <p className="font-body text-foreground/80 leading-relaxed flex-1 mb-6 relative">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/60 relative">
                  <div className="w-9 h-9 rounded-full bg-accent/15 text-accent font-display font-bold flex items-center justify-center flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <span className="font-utility text-sm text-primary font-medium">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real class photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden mb-16 max-w-3xl mx-auto"
        >
          <div className="relative w-full h-56 md:h-72 overflow-hidden">
            <img
              src="/assets/photo-womens-madrasah.webp"
              alt="The Women's Online Madrasah, gathered together on a live class call"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
            <div className="absolute bottom-5 left-6">
              <p className="font-utility text-xs text-accent uppercase tracking-widest mb-1">Behind the Scenes</p>
              <h3 className="font-display text-xl md:text-2xl text-white">The Women's Online Madrasah</h3>
            </div>
          </div>
          <div className="p-6 md:p-7 text-center">
            <p className="font-body text-foreground/70 leading-relaxed">
              Live, every week — a familiar circle of faces behind these words. Real classes, real questions, real friendships.
            </p>
          </div>
        </motion.div>

        {/* More stories, grouped */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-display text-primary mb-3">More Stories</h2>
            <p className="font-body text-foreground/60">Shared with love, by students who asked to stay anonymous.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {MORE_STORIES.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border border-l-4 border-l-accent/50 rounded-2xl shadow-sm hover:shadow-lg hover:border-l-accent transition-shadow duration-300 p-7"
              >
                <div className="flex items-center gap-3 mb-5">
                  <img src="/assets/bullet.webp" alt="" width={14} height={14} loading="lazy" decoding="async" />
                  <h3 className="font-utility text-xs text-accent uppercase tracking-widest font-bold">{group.label}</h3>
                </div>
                <div className="space-y-5">
                  {group.items.map((quote, i) => (
                    <div key={i} className={i > 0 ? 'pt-5 border-t border-border/60' : ''}>
                      <p className="font-body text-foreground/75 leading-relaxed text-sm mb-2">"{quote}"</p>
                      <span className="font-utility text-[0.7rem] text-foreground/40 uppercase tracking-widest">Student, 2025</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center bg-primary rounded-2xl p-10 text-white relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, ease: 'backOut' }}
            className="text-3xl text-accent mb-4"
          >
            ★
          </motion.div>
          <h2 className="font-display text-2xl mb-3">Ready to start your own journey?</h2>
          <p className="font-body text-white/80 mb-6 max-w-lg mx-auto">
            Join the women who found their footing here. Every class starts with someone who felt exactly where you are now.
          </p>
          <Link
            href="/programmes"
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-primary font-utility font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95"
          >
            Explore Our Programmes
          </Link>
        </motion.div>
      </div>
      </div>
    </>
  );
}
