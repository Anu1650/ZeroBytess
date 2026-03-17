import { motion } from "framer-motion";
import { Phone, Mail, Instagram } from "lucide-react";

const contacts = [
  { icon: Phone, label: "+91 90493 91868", href: "tel:+919049391868" },
  { icon: Phone, label: "+91 90216 73977", href: "tel:+919021673977" },
  { icon: Mail, label: "zerobytesstudio@gmail.com", href: "mailto:zerobytesstudio@gmail.com?subject=Inquiry from Website" },
  { icon: Instagram, label: "@zerobytesstudio", href: "https://instagram.com/zerobytesstudio" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3 md:mb-4">Contact</p>
          <h2 className="font-display text-2xl md:text-3xl md:text-4xl font-bold text-foreground">
            Get In <span className="gradient-text">Touch</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contacts.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="glass-card-hover p-6 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-foreground font-medium">{c.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
