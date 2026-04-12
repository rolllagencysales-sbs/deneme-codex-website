/*
 * CTASection Component — Rolll Agency
 * Design: Bold orange background CTA section
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Instagram } from "lucide-react";

const CTA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663546179848/ALwGvdJLx9EPnjnb98fwKX/cta-bg-8gS5PeVP9HEsx3AGXsXcfB.webp";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function CTASection() {
  const { ref, visible } = useInView();

  const scrollToContact = () => {
    const el = document.querySelector("#iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#F79E02" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${CTA_BG})` }}
      />

      <div className="container relative z-10 text-center">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <h2
            className="font-extrabold leading-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              color: "#0D1B2A",
            }}
          >
            Başarıyı Birlikte
            <br />
            İnşa Edelim.
          </h2>
          <p
            className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(13, 27, 42, 0.75)" }}
          >
            Markanızı dijital dünyada öne çıkarmak için hazır mısınız? Hemen iletişime geçin, birlikte harika işler çıkaralım.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2 px-8 py-4 rounded-md font-bold text-base transition-all duration-300"
              style={{
                backgroundColor: "#0D1B2A",
                color: "#FFFFFF",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#162338";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(13, 27, 42, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#0D1B2A";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Bizimle İletişime Geçin
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://www.instagram.com/rolllagency"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-md font-bold text-base transition-all duration-300"
              style={{
                backgroundColor: "transparent",
                color: "#0D1B2A",
                border: "2px solid rgba(13, 27, 42, 0.4)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0D1B2A";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(13, 27, 42, 0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Instagram size={18} />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
