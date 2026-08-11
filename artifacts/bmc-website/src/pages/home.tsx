import { Link } from 'wouter';
import { motion } from 'framer-motion';

const PROGRAMMES = [
  { title: "Women's Classes", path: "/womens-classes", desc: "Foundational and advanced learning for women." },
  { title: "Revert Classes", path: "/revert-classes", desc: "A gentle introduction to Islamic practice." },
  { title: "Quran Classes", path: "/quran-classes", desc: "Learn to read with correct tajweed." },
  { title: "Hifdh Classes", path: "/hifdh-classes", desc: "Memorisation of the Holy Quran." },
  { title: "Children's Classes", path: "/childrens-classes", desc: "General Maktab programme for kids." },
  { title: "Workshops", path: "/workshops", desc: "Focused sessions on specific topics." }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="islamic-arch max-w-3xl"
          >
            <div className="islamic-arch-inner bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center">
              <img src="/assets/bmc-logo.png" alt="BMC Logo" className="h-32 md:h-48 w-auto object-contain mb-8" />
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-primary mb-4 leading-tight">
                Beginners Madrasah <br/><span className="text-accent italic">Classes</span>
              </h1>
              
              <p className="text-sm md:text-base font-utility text-primary/60 tracking-[0.2em] uppercase mb-6">
                Foundations of Islamic Knowledge — EST 2024
              </p>
              
              <div className="w-16 h-px bg-accent mb-6" />
              
              <p className="text-lg md:text-xl font-body text-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed">
                A warm, safe, beginner-friendly Islamic learning space for women and children.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Link href="/programmes" className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-primary text-primary font-utility font-bold hover:bg-primary hover:text-white transition-all inline-block">
                    View Programmes
                </Link>
                <a href="https://wa.me/27686498593" target="_blank" rel="noreferrer">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-primary font-utility font-bold hover:bg-accent/90 hover:shadow-lg hover:-translate-y-1 transition-all">
                    Register Now
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose BMC */}
      <section className="islamic-pattern py-20 relative text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: '☽', title: 'Learn from Anywhere' },
              { icon: '★', title: 'Beginner Friendly' },
              { icon: '☽', title: 'Safe Environment' },
              { icon: '★', title: 'Affordable Learning' }
            ].map((pillar, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="text-center flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full border border-accent flex items-center justify-center text-accent text-2xl mb-4 group-hover:bg-accent group-hover:text-primary transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="font-display text-xl">{pillar.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Programmes */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display text-primary mb-4">Featured Programmes</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMMES.map((prog, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
              >
                <Link href={`/programmes${prog.path}`}>
                  <div className="bg-white rounded-2xl p-8 border border-border hover:border-accent hover:shadow-xl transition-all cursor-pointer h-full flex flex-col group">
                    <div className="text-accent text-2xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">☽</div>
                    <h3 className="text-2xl font-display text-primary mb-3">{prog.title}</h3>
                    <p className="text-foreground/70 font-body mb-8 flex-1">{prog.desc}</p>
                    <span className="text-primary font-utility font-bold group-hover:text-accent transition-colors flex items-center gap-2">
                      Learn More <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Strip */}
      <section className="py-24 bg-muted border-y border-border relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="aspect-[4/5] bg-primary/5 rounded-[2rem] border-2 border-accent/20 relative overflow-hidden flex items-center justify-center">
                {/* Illustration Placeholder */}
                <div className="absolute inset-0 islamic-pattern opacity-5" />
                <div className="relative z-10 text-center px-8">
                  <div className="text-6xl text-accent mb-4">☽</div>
                  <h3 className="font-display text-2xl text-primary mb-2">Mualimah Rukeya</h3>
                  <p className="font-utility text-sm text-primary/60 tracking-wider">FOUNDER & TEACHER</p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-display text-primary mb-6">About Our Founder</h2>
              <p className="text-lg font-body text-foreground/80 leading-relaxed mb-6">
                Mualimah Rukeya has been teaching Islamic sciences since 2024, guiding women and children toward a deeper connection with their faith in a safe, nurturing environment. 
              </p>
              <p className="text-lg font-body text-foreground/80 leading-relaxed mb-8">
                She founded Beginners Madrasah Classes to make authentic Islamic education accessible to all, wherever you are.
              </p>
              <Link href="/about" className="border-b-2 border-accent text-primary font-utility font-bold pb-1 hover:text-accent transition-colors inline-block">
                  Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="islamic-pattern py-24 text-center text-white relative">
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-5xl text-accent mb-6">☽</div>
          <h2 className="text-4xl md:text-5xl font-display mb-6 max-w-2xl mx-auto leading-tight">
            A Safe Space for Growth
          </h2>
          <p className="text-xl font-body text-cream/90 max-w-xl mx-auto mb-10">
            Whether you are taking your very first steps or returning to your roots, there is a place for you here.
          </p>
          <Link href="/programmes" className="bg-white text-primary font-utility font-bold px-10 py-4 rounded-full hover:bg-accent hover:text-white transition-all shadow-xl inline-block">
              Start Your Journey
          </Link>
        </div>
      </section>

    </div>
  );
}
