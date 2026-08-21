import { Link } from "wouter";
import { motion } from "framer-motion";
import { Seo } from "@/components/seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for has been moved or no longer exists — head back to the Beginners Madrasah Classes homepage to find your next class."
        path="/404"
        noIndex
      />
      <div className="min-h-screen bg-background flex items-center justify-center pt-24 pb-12">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="islamic-arch"
        >
          <div className="islamic-arch-inner bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center p-12">
            <div className="text-accent text-5xl mb-6">☽</div>
            <h1 className="text-6xl font-display text-primary mb-4">404</h1>
            <p className="text-xl font-body text-foreground/80 mb-8">
              The page you are looking for has been moved or no longer exists.
            </p>
            <Link href="/" className="bg-primary hover:bg-primary/90 text-white font-utility font-bold px-8 py-3 rounded-full transition-all inline-block">
                Return Home
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
    </>
  );
}
