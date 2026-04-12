/*
 * MissionSection Component — Rolll Agency
 * Design: Dark navy section with orange accents, quote highlight
 */
import { useEffect, useRef, useState } from "react";
import { Eye, Compass, Shield } from "lucide-react";

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

const missionCards = [
  {
    icon: Compass,
    title: "Misyonumuz",
    desc: "Firmaların mevcut sorunlarını hızlı ve etkili bir şekilde çözerek iş süreçlerini sorunsuz hâle getirmek. Her projede, firmalara sorun çıkarmadan destek olmayı önceliğimiz olarak görüyoruz.",
  },
  {
    icon: Eye,
    title: "Vizyonumuz",
    desc: "Müşterilerimizin daha çok insanla temasa geçmesini sağlayacak dijital çözümler sunarak markalarının erişimini ve görünürlüğünü artırmak. Hedef kitleleriyle etkili ve sürdürülebilir bir iletişim kurmalarını sağlamak.",
  },
  {
    icon: Shield,
    title: "Değerlerimiz",
    desc: "İş ahlakına bağlı, şeffaf ve güvenilir yaklaşımlarımızla her projeyi profesyonel standartlarda yürütüyoruz. Sadece hizmet sunmak değil; firmaların büyümesine destek olan güvenilir çözümler üretmek.",
  },
];

export default function MissionSection() {
  const { ref, visible } = useInView();

  return (
    <section
      id="misyon"
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #F79E02 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <div className="section-label mb-4">Misyon & Vizyon</div>
          <h2
            className="font-extrabold leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              color: "#FFFFFF",
            }}
          >
            Misyonumuz ve{" "}
            <span style={{ color: "#F79E02" }}>Vizyonumuz</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {missionCards.map((card, i) => (
            <div
              key={card.title}
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "#162338",
                border: "1px solid rgba(247, 158, 2, 0.15)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${0.2 + i * 0.15}s, transform 0.7s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(247, 158, 2, 0.15)" }}
              >
                <card.icon size={24} style={{ color: "#F79E02" }} />
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "#FFFFFF" }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(229, 229, 229, 0.7)" }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          className="max-w-3xl mx-auto text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.65s, transform 0.7s ease 0.65s",
          }}
        >
          <div
            className="text-4xl font-bold mb-4 leading-none"
            style={{ color: "#F79E02", opacity: 0.4 }}
          >
            "
          </div>
          <blockquote
            className="text-lg md:text-xl font-medium leading-relaxed italic"
            style={{ color: "rgba(229, 229, 229, 0.9)" }}
          >
            Başarıyı büyütürüz, markayı sıfırdan kurarız. Yaratıcı tasarım ve dijital çözümlerle başarıyı birlikte inşa ediyoruz.
          </blockquote>
          <div
            className="mt-4 text-sm font-semibold"
            style={{ color: "#F79E02", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em" }}
          >
            — ROLLL AGENCY
          </div>
        </div>
      </div>
    </section>
  );
}
