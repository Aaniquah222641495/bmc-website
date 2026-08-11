import { Link } from 'wouter';
import { motion } from 'framer-motion';

const PROGRAMMES = [
  {
    title: "Women's Classes",
    path: "/womens-classes",
    desc: "Foundational and advanced learning in a supportive sisterhood community. Available online and in-person.",
    format: "Online & In-Person",
    price: "R100–R200"
  },
  {
    title: "Revert Classes",
    path: "/revert-classes",
    desc: "Specially designed for those new to Islam. A gentle, safe, and judgement-free introduction to Islamic practice.",
    format: "Online",
    price: "Contact Us"
  },
  {
    title: "Quran Classes",
    path: "/quran-classes",
    desc: "Learn to read the Quran with correct tajweed, starting from the basics of the Arabic alphabet.",
    format: "Online",
    price: "Contact Us"
  },
  {
    title: "Hifdh Classes",
    path: "/hifdh-classes",
    desc: "A structured memorisation plan with regular revision sessions and personal spiritual encouragement.",
    format: "Online",
    price: "Contact Us"
  },
  {
    title: "Children's Classes",
    path: "/childrens-classes",
    desc: "General Maktab programme covering Quran, Aqeedah, Fiqh, Hadith, and Akhlaaq.",
    format: "Live Online",
    price: "R150/month"
  },
  {
    title: "Workshops",
    path: "/workshops",
    desc: "Interactive sessions on essential topics like Ramadan preparation, Wudhu, Ghusl, and more.",
    format: "Online & In-Person",
    price: "Contact Us"
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
