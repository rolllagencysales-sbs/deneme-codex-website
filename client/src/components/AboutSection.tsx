/*
 * AboutSection Component — Rolll Agency
 * Design: Light neutral section with dark navy text, asymmetric layout
 */
import { useEffect, useRef, useState } from "react";
import { Target, Lightbulb, TrendingUp } from "lucide-react";

const ABOUT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663546179848/ALwGvdJLx9EPnjnb98fwKX/about-team-UPPBoGFAJAxSp6pJsYWyY2.webp";

const pillars = [
  {
    icon: Target,
    title: "Hedef Odaklı",
    desc: "Her projede markanızın hedefleriyle uyumlu, sonuç odaklı çözümler üretiyoruz.",
  },
  {
    icon: Lightbulb,
    title: "Yaratıcılık ve Strateji",
    desc: "Estetik ve işlevselliği birleştirerek özgün, akılda kalıcı deneyimler yaratıyoruz.",
  },
  {
    icon: TrendingUp,
    title: "Başarı Odaklı",
    desc: "Yenilikçi ve stratejik yaklaşımlarımızla müşterilerimizin başarısını büyütüyoruz.",
  },
];

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

export default function AboutSection() {
  const { ref, visible } = useInView();

  return (
    <section
      id="biz-kimiz"
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "#E5E5E5" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={ABOUT_IMG}
                alt="Rolll Agency Ekibi"
                className="w-full h-80 lg:h-96 object-cover"
              />
              {/* Orange accent overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: "#F79E02" }}
              />
            </div>
            {/* Floating accent card */}
            <div
              className="absolute -bottom-6 -right-6 rounded-xl px-6 py-4 shadow-2xl hidden md:block"
              style={{ backgroundColor: "#0D1B2A" }}
            >
              <div className="text-3xl font-extrabold" style={{ color: "#F79E02" }}>2026</div>
              <div className="text-xs mt-1" style={{ color: "rgba(229,229,229,0.7)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em" }}>
                KURULUŞ YILI
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <div className="section-label mb-4">Biz Kimiz</div>
            <h2
              className="font-extrabold leading-tight mb-6"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "#0D1B2A",
              }}
            >
              Dijital Varlığınızı{" "}
              <span style={{ color: "#F79E02" }}>Baştan Yaratıyoruz.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-4"
              style={{ color: "#444", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              2026 yılında Bursa'da kurulan Rolll Agency, markaların dijital dünyada güçlü ve etkileyici bir kimliğe sahip olmasını sağlayan yaratıcı bir ajanstır.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#555", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Sosyal medya içerik üretimi, web tasarım, marka kimliği tasarımı ve benzeri dijital hizmetler alanlarında uzman ekibimizle, markaların dijital varlıklarını baştan yaratıyor veya mevcut potansiyellerini maksimuma çıkarıyoruz.
            </p>

            {/* Pillars */}
            <div className="flex flex-col gap-4">
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="flex items-start gap-4"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(247, 158, 2, 0.15)" }}
                  >
                    <pillar.icon size={20} style={{ color: "#F79E02" }} />
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1" style={{ color: "#0D1B2A" }}>
                      {pillar.title}
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: "#666" }}>
                      {pillar.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
