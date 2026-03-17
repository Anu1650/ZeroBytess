import { motion } from "framer-motion";
import { Lightbulb, Bot, MonitorSmartphone, Server, Zap, Database } from "lucide-react";

const reasons = [
  { icon: Lightbulb, title: "Innovation Driven", desc: "Cutting-edge solutions that push boundaries" },
  { icon: Bot, title: "AI Integration", desc: "Intelligent automation woven into every system" },
  { icon: MonitorSmartphone, title: "Modern UI/UX", desc: "Beautiful, intuitive user experiences" },
  { icon: Server, title: "Scalable Architecture", desc: "Systems built to grow with your business" },
  { icon: Zap, title: "Startup Speed", desc: "Rapid execution without compromising quality" },
  { icon: Database, title: "Data-first Thinking", desc: "Every decision backed by data intelligence" },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-4">Why Us</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Why Choose <span className="gradient-text">Zerobytes Studio</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="glass-card-hover flex items-start gap-4 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <r.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold mb-1 text-foreground">{r.title}</h3>
                <p className="text-muted-foreground text-sm">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
