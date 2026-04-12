/*
 * ServicesSection Component — Rolll Agency
 * Design: Light neutral background with dark navy service cards, orange icons
 * Services: Web Design, Brand Identity, Corporate Video, Social Media Content
 */
import { useEffect, useRef, useState } from "react";
import { Monitor, Palette, Video, Share2, ArrowRight, CheckCircle } from "lucide-react";

const WEB_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663546179848/ALwGvdJLx9EPnjnb98fwKX/services-web-iCMJ2fjoJiF8JJE3xwY9fQ.webp";
const BRAND_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663546179848/ALwGvdJLx9EPnjnb98fwKX/services-brand-GJVxnsaEVgtRY55ADnbhz8.webp";

function useInView(threshold = 0.1) {
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

const services = [
  {
    num: "01",
    icon: Monitor,
    title: "Web Sitesi Tasarımı",
    shortDesc: "Markanız için tamamen size özel, SEO optimize web siteleri.",
    fullDesc: "Markanız için tamamen size özel ve tercihlerinize uygun web siteleri tasarlıyoruz. Her detayda profesyonellik ve estetiği ön planda tutuyor, markanızın dijital dünyadaki imajını güçlendiriyoruz.",
    features: ["SEO Optimizasyonu", "Hızlı & Güvenilir Hosting", "SSL Sertifikası", "Mobil Uyumlu Tasarım"],
    image: WEB_IMG,
    color: "#F79E02",
  },
  {
    num: "02",
    icon: Palette,
    title: "Marka Kimliği Tasarımı",
    shortDesc: "Logo, renk paleti ve tipografiyle güçlü bir marka kimliği.",
    fullDesc: "Markanızın dijital ve fiziksel dünyadaki kimliğini tamamen size özel tasarlıyoruz. Logo, renk paleti, tipografi ve tüm görsel öğeler, markanızın karakterini yansıtacak şekilde oluşturulur.",
    features: ["Logo Tasarımı", "Renk Paleti", "Tipografi Sistemi", "Marka Rehberi"],
    image: BRAND_IMG,
    color: "#F79E02",
  },
  {
    num: "03",
    icon: Video,
    title: "Şirket Tanıtım Videosu",
    shortDesc: "Markanızın hikayesini anlatan etkileyici tanıtım animasyonları.",
    fullDesc: "Markanızın hikayesini ve değerlerini etkileyici bir şekilde anlatan tamamen size özel tanıtım animasyonları hazırlıyoruz. Görsel efektler, akıcı geçişler ve yaratıcı konseptlerle desteklenir.",
    features: ["Özel Animasyon", "Görsel Efektler", "Akıcı Geçişler", "Sosyal Medya Formatları"],
    image: null,
    color: "#F79E02",
  },
  {
    num: "04",
    icon: Share2,
    title: "Sosyal Medya İçerik Tasarımı",
    shortDesc: "Hedef kitlenize özel yaratıcı sosyal medya içerikleri.",
    fullDesc: "Markanızın sosyal medya hesapları için tamamen size özel ve hedef kitlenize uygun içerikler tasarlıyoruz. Yaratıcı grafikler, dikkat çekici görseller ve etkileyici metinlerle desteklenir.",
    features: ["Özel Grafik Tasarım", "İçerik Stratejisi", "Platform Uyumlu Formatlar", "Marka Tutarlılığı"],
    image: null,
    color: "#F79E02",
  },
];

export default function ServicesSection() {
  const { ref, visible } = useInView();
  const [activeService, setActiveService] = useState(0);

  const scrollToContact = () => {
    const el = document.querySelector("#iletisim");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hizmetler"
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "#F8F8F8" }}
    >
      <div className="container">
        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <div className="section-label mb-4">Uzmanlık Alanlarımız</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-extrabold leading-tight"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "#0D1B2A",
              }}
            >
              Hizmetlerimiz
            </h2>
            <p
              className="text-base max-w-md"
              style={{ color: "#666" }}
            >
              Markanızı dijital dünyada öne çıkarmak için kapsamlı çözümler sunuyoruz.
            </p>
          </div>
        </div>

        {/* Service Tabs */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.2s",
          }}
        >
          {services.map((s, i) => (
            <button
              key={s.num}
              onClick={() => setActiveService(i)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: activeService === i ? "#F79E02" : "transparent",
                color: activeService === i ? "#0D1B2A" : "#666",
                border: activeService === i ? "1px solid #F79E02" : "1px solid #ddd",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {s.num} {s.title}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.num}
              className="service-card rounded-2xl overflow-hidden cursor-pointer"
              style={{
                backgroundColor: "#0D1B2A",
                border: activeService === i ? "1px solid rgba(247, 158, 2, 0.5)" : "1px solid rgba(247, 158, 2, 0.1)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s ease ${0.2 + i * 0.1}s, transform 0.7s ease ${0.2 + i * 0.1}s, border-color 0.3s ease`,
              }}
              onClick={() => setActiveService(i)}
            >
              {/* Image (for first two services) */}
              {service.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}

              <div className="p-8">
                {/* Number + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-5xl font-extrabold leading-none"
                    style={{
                      color: "rgba(247, 158, 2, 0.15)",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {service.num}
                  </span>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "rgba(247, 158, 2, 0.15)" }}
                  >
                    <service.icon size={24} style={{ color: "#F79E02" }} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "#FFFFFF" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(229, 229, 229, 0.7)" }}
                >
                  {service.fullDesc}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5">
                      <CheckCircle size={12} style={{ color: "#F79E02" }} />
                      <span
                        className="text-xs"
                        style={{ color: "rgba(229, 229, 229, 0.6)", fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={(e) => { e.stopPropagation(); scrollToContact(); }}
                  className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group"
                  style={{ color: "#F79E02", fontFamily: "'Space Grotesk', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
                >
                  Teklif Al
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
