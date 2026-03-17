import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "AI Analytics Dashboard", category: "Web App" },
  { title: "E-Commerce Platform", category: "Full-Stack" },
  { title: "Brand Identity System", category: "Branding" },
  { title: "Automation Pipeline", category: "AI/ML" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-4">Portfolio</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass-card-hover group overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/8 to-secondary/8 flex items-center justify-center">
                <span className="font-display text-sm tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors">
                  {project.category}
                </span>
              </div>
              <div className="p-6 flex items-center justify-between">
                <h3 className="font-display text-sm font-semibold text-foreground">{project.title}</h3>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
