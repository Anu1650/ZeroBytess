import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-lg font-bold gradient-text">Zerobytes Studio</h3>
            <p className="text-muted-foreground text-sm mt-1">Intelligent Solutions For A Better Future</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</a>
            <a href="#portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
            <a href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors" target="_blank">Admin</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://instagram.com/zerobytesstudio" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:zerobytesstudio@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="text-center mt-10 pt-6 border-t border-border/30">
          <p className="text-muted-foreground text-xs">&copy; {new Date().getFullYear()} Zerobytes Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
