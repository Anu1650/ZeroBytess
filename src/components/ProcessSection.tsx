import { motion } from "framer-motion";
import { Search, ClipboardList, PenTool, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, title: "Discovery", num: "01" },
  { icon: ClipboardList, title: "Planning", num: "02" },
  { icon: PenTool, title: "Design", num: "03" },
  { icon: Code2, title: "Development", num: "04" },
  { icon: Rocket, title: "Deployment", num: "05" },
  { icon: TrendingUp, title: "Growth", num: "06" },
];

const ProcessSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-4">Process</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            How We <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="glass-card-hover p-6 text-center group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-primary/30 font-display text-xs font-bold group-hover:text-primary/60 transition-colors">{step.num}</span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto my-4 group-hover:bg-primary/15 transition-colors">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xs font-semibold tracking-wider uppercase text-foreground">{step.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
