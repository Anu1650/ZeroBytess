import { motion } from "framer-motion";
import { Suspense } from "react";
import BackgroundScene3D from "./BackgroundScene3D";
import { ParallaxOrb } from "./ParallaxOrb";

const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <Suspense fallback={null}>
        <BackgroundScene3D />
      </Suspense>
      <ParallaxOrb className="absolute top-10 left-10 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[100px]" speed={0.18} />
      <ParallaxOrb className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-secondary/4 blur-[80px]" speed={-0.12} />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-secondary/3 to-primary/3" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Let's Build <span className="gradient-text">Intelligent Solutions</span> Together
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Transform your ideas into future-ready digital systems with Zerobytes Studio.
          </p>
          <motion.a href="#contact" className="btn-primary inline-block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Work With Zerobytes Studio
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
