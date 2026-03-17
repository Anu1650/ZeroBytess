import { motion } from "framer-motion";
import { Eye, Target, Cpu } from "lucide-react";
import { ParallaxOrb } from "./ParallaxOrb";

const cards = [
  { icon: Eye, title: "Vision", desc: "To be a global leader in intelligent digital systems that redefine how businesses operate." },
  { icon: Target, title: "Mission", desc: "Empower startups and enterprises with scalable, AI-driven technology solutions." },
  { icon: Cpu, title: "Technology-First", desc: "Every solution we build is rooted in modern engineering and intelligent architecture." },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <ParallaxOrb className="absolute top-20 right-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px]" speed={0.15} />
      <ParallaxOrb className="absolute bottom-10 left-10 w-[250px] h-[250px] rounded-full bg-primary/4 blur-[90px]" speed={-0.12} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-10 md:mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3 md:mb-4">About Us</p>
          <h2 className="font-display text-2xl md:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground">
            Who is <span className="gradient-text">Zerobytes Studio</span>?
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            We are an engineering-driven studio that builds intelligent digital systems. From AI automation to full-stack platforms, we transform complex ideas into elegant, scalable technology.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, i) => (
            <motion.div key={card.title} className="glass-card-hover p-8 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
