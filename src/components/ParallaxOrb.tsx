import { useRef, useEffect, useState, ReactNode } from "react";

interface ParallaxOrbProps {
  className: string;
  speed?: number;
  children?: ReactNode;
}

export function ParallaxOrb({ className, speed = 0.15 }: ParallaxOrbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const viewCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const delta = (elementCenter - viewCenter) * speed;
            setOffset(delta);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translateY(${offset}px)`, willChange: "transform", transition: "transform 0.1s linear" }}
    />
  );
}
