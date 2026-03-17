import { motion } from "framer-motion";
import { Bot, Code2, BarChart3, Rocket } from "lucide-react";

const badges = [
  { icon: Bot, label: "AI Automation" },
  { icon: Code2, label: "Full-Stack Engineering" },
  { icon: BarChart3, label: "Data Intelligence" },
  { icon: Rocket, label: "Digital Growth" },
];

const TrustBar = () => {
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8">
        <div className="glass-card px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.label}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <badge.icon className="w-5 h-5" />
                <span className="font-display text-xs tracking-widest uppercase">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
