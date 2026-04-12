/*
 * HeroSection Component — Rolll Agency
 * Design: Full-bleed dark navy hero with animated text, orange accents, cinematic background
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663546179848/ALwGvdJLx9EPnjnb98fwKX/hero-bg-672FiSgBRYbHZwuDuknhV7.webp";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector("#biz-kimiz");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.querySelector("#hizmetler");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          opacity: 0.6,
        }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(13,27,42,0.95) 0%, rgba(13,27,42,0.7) 50%, rgba(13,27,42,0.85) 100%)",
        }}
      />

      {/* Decorative orange line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: "#F79E02", opacity: 0.7 }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-4xl">
          {/* Label */}
          <div
            className="section-label mb-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}
          >
            Yaratıcı Dijital Ajans — Bursa, Türkiye
          </div>

          {/* Main Heading */}
          <h1
            className="font-extrabold leading-none mb-4"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              color: "#FFFFFF",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            Yaratıcı Tasarım.
          </h1>
          <h1
            className="font-extrabold leading-none mb-4"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              color: "#F79E02",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}
          >
            Dijital Çözümler.
          </h1>
          <h1
            className="font-extrabold leading-none mb-8"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              color: "#FFFFFF",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
            }}
          >
            Rolll Agency.
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
            style={{
              color: "rgba(229, 229, 229, 0.8)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
            }}
          >
            Markanızın dijital dünyada güçlü ve etkileyici bir kimliğe sahip olmasını sağlayan yaratıcı dijital ajansınız.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s",
            }}
          >
            <button
              onClick={scrollToContact}
              className="group flex items-center gap-2 px-7 py-4 rounded-md font-semibold text-base transition-all duration-300"
              style={{
                backgroundColor: "#F79E02",
                color: "#0D1B2A",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ffb733";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(247, 158, 2, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F79E02";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Bizimle İletişime Geçin
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToServices}
              className="flex items-center gap-2 px-7 py-4 rounded-md font-semibold text-base transition-all duration-300"
              style={{
                backgroundColor: "transparent",
                color: "#E5E5E5",
                border: "1px solid rgba(229, 229, 229, 0.3)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#F79E02";
                e.currentTarget.style.color = "#F79E02";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(229, 229, 229, 0.3)";
                e.currentTarget.style.color = "#E5E5E5";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Hizmetlerimiz
            </button>
          </div>

          {/* Stats Row */}
          <div
            className="flex flex-wrap gap-8 mt-16 pt-8"
            style={{
              borderTop: "1px solid rgba(247, 158, 2, 0.2)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 1s",
            }}
          >
            {[
              { num: "2026", label: "Kuruluş Yılı" },
              { num: "4+", label: "Uzmanlık Alanı" },
              { num: "100%", label: "Müşteri Odaklı" },
              { num: "∞", label: "Yaratıcılık" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-3xl font-extrabold"
                  style={{ color: "#F79E02", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {stat.num}
                </span>
                <span
                  className="text-sm mt-1"
                  style={{ color: "rgba(229, 229, 229, 0.6)", fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-300"
        style={{
          color: "rgba(229, 229, 229, 0.5)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 1.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#F79E02")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229, 229, 229, 0.5)")}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Keşfet
        </span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
