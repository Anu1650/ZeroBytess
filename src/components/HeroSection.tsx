import { motion } from "framer-motion";
import { Suspense } from "react";
import AIScene3D from "./AIScene3D";
import ParticleField from "./ParticleField";
import { ParallaxOrb } from "./ParallaxOrb";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <ParticleField />
      <ParallaxOrb className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" speed={0.12} />
      <ParallaxOrb className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px]" speed={0.18} />
      <ParallaxOrb className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px]" speed={-0.1} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Zerobytes Studio
            </motion.p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6 text-foreground">
              Building{" "}
              <span className="gradient-text">Intelligent Digital Systems</span>{" "}
              for the Future
            </h1>
            <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-10 max-w-lg font-body">
              We engineer scalable, AI-powered digital solutions that transform ideas into world-class technology systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a href="#inquiry" className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Start Your Project
              </motion.a>
              <motion.a href="#services" className="btn-outline" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Explore Services
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block relative h-[400px] md:h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading...</div>}>
              <AIScene3D />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
