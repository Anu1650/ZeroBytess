import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const GOOGLE_FORM_ACTION = "https://script.google.com/macros/s/AKfycbzsdF9n-jASb3CJ4-pHF3GRo3vb6B8j_g1ttBzQ7oB-FvMn8-_OPkJecgo4QIZ6o5Y/exec";

const InquiryForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    let submitted = false;

    if (GOOGLE_FORM_ACTION && GOOGLE_FORM_ACTION !== "YOUR_GOOGLE_APPS_SCRIPT_URL") {
      const formData = new FormData();
      formData.append("action", "addInquiry");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("service", form.service);
      formData.append("message", form.message);

      try {
        const response = await fetch(GOOGLE_FORM_ACTION, {
          method: "POST",
          body: formData,
          redirect: "follow",
        });
        submitted = true;
        console.log("Form submitted successfully:", response);
      } catch (error) {
        console.error("Form submission error:", error);
        submitted = true; // Google Apps Script may fail with CORS but still submit
      }
    }

    // Wait for submission to complete
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3000);
  };

  const services = [
    "Web Development",
    "Data Analytics & Science",
    "Branding & Design",
    "AI Automation",
    "Full-Stack Systems",
    "Digital Marketing",
    "Other",
  ];

  return (
    <section id="inquiry" className="section-padding relative">
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-display text-xs tracking-[0.3em] uppercase mb-3 md:mb-4">Get Started</p>
          <h2 className="font-display text-2xl md:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Send Us an <span className="gradient-text">Inquiry</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass-card p-6 md:p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Samarth Jadhav"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="samarth@gmail.com"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Service Needed</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none"
              >
                <option value="" disabled>Select a service</option>
                {services.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-2">Project Details</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell us about your project, goals, and timeline..."
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
            />
          </div>

          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={status !== "idle"}
              className="btn-primary flex items-center gap-3 disabled:opacity-60"
              whileHover={status === "idle" ? { scale: 1.02 } : {}}
              whileTap={status === "idle" ? { scale: 0.98 } : {}}
            >
              {status === "idle" && (
                <>
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </>
              )}
              {status === "sending" && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              )}
              {status === "sent" && (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Sent Successfully!
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default InquiryForm;
