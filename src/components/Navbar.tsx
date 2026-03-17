import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "hsla(220, 30%, 97%, 0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid hsla(220, 20%, 90%, 0.5)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16">
        <a href="#" className="font-display text-lg font-bold gradient-text">
          Zerobytes Studio
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary text-xs py-2 px-5">Get Started</a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-b border-border/30"
            style={{ background: "hsla(220, 30%, 97%, 0.95)", backdropFilter: "blur(20px)" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map(link => (
                <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary text-xs py-2 px-5 text-center" onClick={() => setOpen(false)}>Get Started</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
