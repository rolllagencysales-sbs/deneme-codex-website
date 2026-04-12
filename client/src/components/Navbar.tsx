/*
 * Navbar Component — Rolll Agency
 * Design: Sticky dark navy header with orange accent, smooth scroll navigation
 */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Biz Kimiz", href: "#biz-kimiz" },
  { label: "Misyonumuz", href: "#misyon" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(13, 27, 42, 0.97)" : "rgba(13, 27, 42, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid rgba(247, 158, 2, 0.15)" : "1px solid transparent",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-1 group"
            >
              <span
                className="font-extrabold text-xl tracking-tight"
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
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="hover-underline-orange text-sm font-medium tracking-wide transition-colors duration-200"
                  style={{
                    color: "#E5E5E5",
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F79E02")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#E5E5E5")}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#iletisim")}
                className="px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: "#F79E02",
                  color: "#0D1B2A",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffb733";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F79E02";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Bizimle Çalış
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: "#E5E5E5" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menüyü aç"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden border-t"
            style={{
              backgroundColor: "#0D1B2A",
              borderColor: "rgba(247, 158, 2, 0.2)",
            }}
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200"
                  style={{
                    color: "#E5E5E5",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#F79E02";
                    e.currentTarget.style.backgroundColor = "rgba(247, 158, 2, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#E5E5E5";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick("#iletisim")}
                className="mt-2 mx-4 px-5 py-3 rounded-md text-sm font-semibold text-center"
                style={{
                  backgroundColor: "#F79E02",
                  color: "#0D1B2A",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Bizimle Çalış
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
