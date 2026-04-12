import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["yaratıcı", "yenilikçi", "etkileyici", "stratejik", "güçlü"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <a
              href="#services"
              className="inline-flex gap-2 items-center rounded-full border border-border px-4 py-1.5 text-sm font-body text-foreground/70 hover:text-primary hover:border-primary/40 transition-all duration-300"
            >
              Hizmetlerimizi Keşfedin <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-heading font-bold">
              <span className="text-gradient">Dijital dünyada</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                <AnimatePresence mode="wait">
                  {titles.map((title, index) =>
                    titleNumber === index ? (
                      <motion.span
                        key={index}
                        className="absolute font-heading text-primary"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 20,
                        }}
                      >
                        {title}
                      </motion.span>
                    ) : null,
                  )}
                </AnimatePresence>
              </span>
              çözümler sunuyoruz
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-foreground/60 max-w-2xl text-center font-body">
              2026 yılında Bursa&apos;da kurulan Rolll Agency, markaların dijital dünyada güçlü ve
              etkileyici bir kimliğe sahip olmasını sağlayan yaratıcı bir ajanstır.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground/80 hover:border-primary/50 hover:text-primary transition-all duration-300 font-body font-medium"
            >
              Bizi Tanıyın <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
              style={{
                background: "var(--gradient-accent)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              Hizmetlerimiz <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
