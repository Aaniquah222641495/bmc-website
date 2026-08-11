import { Link } from 'wouter';
import { motion } from 'framer-motion';

const PROGRAMMES = [
  {
    title: "Women's Online Madrasah",
    path: "/womens-classes",
    desc: "Structured, beginner-friendly Islamic studies for women 18+. Pre-recorded lessons on Google Classroom, learn at your own pace. Covers Aqaaid, Fiqh, Tajweed, Seerah, Akhlaaq, Hadith, Du'as and more.",
    format: "Online — Google Classroom",
    price: "R150/month"
  },
  {
    title: "In-Person Workshops",
    path: "/revert-classes",
    desc: "Interactive face-to-face workshops covering important Islamic topics, with opportunities for discussion, questions and practical learning.",
    format: "In-Person",
    price: "From R100"
  },
  {
    title: "Get Into Qur'an – In Person",
    path: "/quran-classes",
    desc: "A Qur'an programme for complete beginners or those wanting to start again from the basics. Step-by-step guidance toward confidently reciting from the Mushaf. Every Saturday morning in Mitchell's Plain, Cape Town.",
    format: "In-Person — Mitchell's Plain",
    price: "R200/month"
  },
  {
    title: "Women's Hifdh Programme",
    path: "/hifdh-classes",
    desc: "A structured online Qur'an memorisation programme for women. Live classes three times a week — Monday, Wednesday & Friday via Microsoft Teams. Includes guidance on memorisation, revision and recitation.",
    format: "Live Online — Microsoft Teams",
    price: "R200/month"
  },
  {
    title: "Children's Online Madrasah",
    path: "/childrens-classes",
    desc: "Live online Islamic classes for children aged 6–13, held three times a week — Monday, Tuesday & Thursday via Microsoft Teams. Covers Qur'an, Surahs, Aqaaid, Fiqh, Akhlaaq, Islamic History, Hadith and Du'as.",
    format: "Live Online — Microsoft Teams",
    price: "R150/month"
  },
  {
    title: "Online Workshops & Short Courses",
    path: "/workshops",
    desc: "Once-off online workshops focusing on specific Islamic topics. Topics include Women in Islam, Salaah, Wudhu & Ghusl, Ramadan preparation and other practical areas of the Deen.",
    format: "Online",
    price: "From R100"
  }
];

export default function Programmes() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-display text-primary mb-6">Our Programmes</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-8" />
            <p className="font-body text-xl text-foreground/80 leading-relaxed">
              Our programmes are designed to meet you wherever you are on your journey. Whether you are taking your very first steps or looking to deepen your knowledge, there is a programme for you. <span className="text-accent">☽</span>
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMMES.map((prog, i) => (
            <motion.div
              key={prog.path}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/programmes${prog.path}`}>
                <div className="bg-card rounded-2xl p-8 border border-border hover:border-accent hover:shadow-xl transition-all cursor-pointer h-full flex flex-col group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-display text-primary group-hover:text-accent transition-colors">{prog.title}</h3>
                  </div>
                  
                  <p className="font-body text-foreground/80 flex-1 mb-8">{prog.desc}</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-utility border-t border-border pt-4">
                      <span className="text-primary/60">Format</span>
                      <span className="font-medium text-primary">{prog.format}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-utility border-t border-border pt-4 mb-6">
                      <span className="text-primary/60">Investment</span>
                      <span className="font-medium text-primary bg-muted px-3 py-1 rounded-full">{prog.price}</span>
                    </div>
                    
                    <span className="w-full py-3 rounded-full border border-primary text-primary font-utility font-bold group-hover:bg-primary group-hover:text-white transition-all inline-block text-center">
                      View Class Details
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
