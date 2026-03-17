import { motion } from "framer-motion";
import { Globe, BarChart3, Palette, Bot, Layers, TrendingUp } from "lucide-react";
import { ParallaxOrb } from "./ParallaxOrb";

const services = [
  { icon: Globe, title: "Web Development", desc: "Modern scalable websites and web applications with responsive design, blazing performance, and SEO-friendly architecture.", tags: ["Responsive Sites", "Web Apps", "Dashboards", "Landing Pages"] },
  { icon: BarChart3, title: "Data Analytics & Science", desc: "Data-driven insights for smarter decisions. Visualization dashboards, reporting systems, and trend analysis.", tags: ["Data Analysis", "Visualization", "Reporting", "Insights"] },
  { icon: Palette, title: "Branding & Design", desc: "Strong visual identity and creative branding. Logos, social media creatives, and complete brand strategy.", tags: ["Brand Identity", "Logo Design", "Social Media", "Marketing Assets"] },
  { icon: Bot, title: "AI Automation", desc: "Smart automation solutions with AI workflows, intelligent assistants, and automation pipelines.", tags: ["AI Workflows", "Automation", "Integrations", "Smart Systems"] },
  { icon: Layers, title: "Full-Stack Systems", desc: "Complete end-to-end system engineering. Backend architecture, API integration, and scalable infrastructure.", tags: ["Full-Stack Apps", "APIs", "Databases", "Auth Systems"] },
  { icon: TrendingUp, title: "Digital Marketing", desc: "Growth-focused digital strategies. Performance marketing, audience targeting, and analytics-based optimization.", tags: ["Performance Marketing", "SEO", "Social Media", "Growth Strategy"] },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <ParallaxOrb className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" speed={0.2} />
      <ParallaxOrb className="absolute top-20 right-10 w-[350px] h-[350px] rounded-full bg-secondary/4 blur-[100px]" speed={-0.15} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div className="text-center mb-10 md:mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3 md:mb-4">What We Do</p>
          <h2 className="font-display text-2xl md:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-foreground">
            Intelligent Digital Services <span className="gradient-text">Built For The Future</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Zerobytes Studio helps businesses transform ideas into powerful digital systems through modern technology and intelligent solutions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div key={service.title} className="glass-card-hover p-8 group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.desc}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-primary/5 text-primary/80 border border-primary/10">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
