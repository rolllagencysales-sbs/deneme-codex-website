/*
 * Footer Component — Rolll Agency
 * Design: Dark navy footer with orange accents
 */
import { Instagram } from "lucide-react";

const navLinks = [
  { label: "Biz Kimiz", href: "#biz-kimiz" },
  { label: "Misyonumuz", href: "#misyon" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "İletişim", href: "#iletisim" },
];

const services = [
  "Web Sitesi Tasarımı",
  "Marka Kimliği Tasarımı",
  "Şirket Tanıtım Videosu",
  "Sosyal Medya İçerik Tasarımı",
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ backgroundColor: "#080f18" }}>
      {/* Top border accent */}
      <div className="h-0.5" style={{ backgroundColor: "#F79E02", opacity: 0.3 }} />

      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span
                className="font-extrabold text-2xl tracking-tight"
                style={{ color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}
              >
                rolll
              </span>
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "#F79E02", color: "#0D1B2A", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}
              >
                agency
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(229, 229, 229, 0.5)" }}
            >
              Markanızın dijital dünyada güçlü ve etkileyici bir kimliğe sahip olmasını sağlayan yaratıcı dijital ajansınız.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/rolllagency"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ backgroundColor: "rgba(247, 158, 2, 0.1)", color: "#F79E02" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F79E02";
                  e.currentTarget.style.color = "#0D1B2A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(247, 158, 2, 0.1)";
                  e.currentTarget.style.color = "#F79E02";
                }}
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-xs font-semibold mb-5"
              style={{ color: "#F79E02", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.15em" }}
            >
              SAYFALAR
            </div>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm transition-colors duration-200"
                  style={{ color: "rgba(229, 229, 229, 0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F79E02")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229, 229, 229, 0.5)")}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div
              className="text-xs font-semibold mb-5"
              style={{ color: "#F79E02", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.15em" }}
            >
              HİZMETLER
            </div>
            <div className="flex flex-col gap-3">
              {services.map((s) => (
                <button
                  key={s}
                  onClick={() => handleNavClick("#hizmetler")}
                  className="text-left text-sm transition-colors duration-200"
                  style={{ color: "rgba(229, 229, 229, 0.5)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F79E02")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229, 229, 229, 0.5)")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(247, 158, 2, 0.1)" }}
        >
          <p className="text-xs" style={{ color: "rgba(229, 229, 229, 0.3)" }}>
            © 2026 Rolll Agency. Tüm Hakları Saklıdır.
          </p>
          <p className="text-xs" style={{ color: "rgba(229, 229, 229, 0.3)" }}>
            Bursa, Türkiye
          </p>
        </div>
      </div>
    </footer>
  );
}
