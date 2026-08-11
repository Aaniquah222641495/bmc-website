import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-accent text-3xl mb-4">☽</div>
            <h1 className="text-4xl md:text-5xl font-display text-primary mb-6">About Mualimah Rukeya</h1>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </motion.div>
        </div>

        {/* Content Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
        >
          {/* Hero photo */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <img
              src="/assets/workshop-teaching.png"
              alt="Mualimah Rukeya teaching a workshop"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p className="font-utility text-xs text-accent uppercase tracking-widest mb-1">Founder & Teacher</p>
              <h2 className="font-display text-2xl md:text-3xl text-white">Mualimah Rukeya</h2>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-p:font-body prose-p:text-foreground/80 max-w-none">
              <p className="lead text-2xl text-primary font-display mb-8 text-center italic">
                "Knowledge is a light that finds its way into open hearts."
              </p>
              
              <p>
                Mualimah Rukeya began her journey into teaching Islamic sciences with a simple but profound realization: many women and children feel intimidated when starting their Islamic education. The fear of "starting late" or "not knowing enough" often keeps beautiful souls away from the sweetness of learning their Deen.
              </p>
              
              <p>
                Established in 2024, Beginners Madrasah Classes was born from this exact need. Mualimah Rukeya set out to create a sanctuary—a digital and physical space that feels like stepping into a warm, sunlit courtyard. A place where questions are welcomed, mistakes are part of the journey, and every student is met with gentle encouragement.
              </p>
            </div>

            <div className="gold-divider" />

            {/* Mission & Vision Grid */}
            <div className="grid md:grid-cols-2 gap-12 my-12">
              <div className="bg-muted p-8 rounded-xl border border-border relative">
                <div className="absolute top-0 right-0 p-4 text-accent/20 text-4xl">★</div>
                <h3 className="font-display text-2xl text-primary mb-4">Our Mission</h3>
                <p className="font-body text-foreground/80">
                  To make authentic Islamic education accessible to every woman and child, wherever they are on their journey.
                </p>
              </div>
              <div className="bg-muted p-8 rounded-xl border border-border relative">
                <div className="absolute top-0 right-0 p-4 text-accent/20 text-4xl">☽</div>
                <h3 className="font-display text-2xl text-primary mb-4">Our Vision</h3>
                <p className="font-body text-foreground/80">
                  A world where every Muslim woman and child has access to a safe, nurturing space to learn the foundations of their deen.
                </p>
              </div>
            </div>

            {/* Closing Message */}
            <div className="islamic-pattern rounded-2xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              <div className="relative z-10">
                <p className="font-display text-xl md:text-2xl text-white leading-relaxed mb-6">
                  "Whether you are taking your very first steps or returning to your roots, there is a place for you here. Bismillah — let's begin."
                </p>
                <span className="font-utility text-accent uppercase tracking-widest text-sm">— Mualimah Rukeya</span>
              </div>
            </div>
            
          </div>
        </motion.div>

      </div>
    </div>
  );
}
