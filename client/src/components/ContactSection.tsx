/*
 * ContactSection Component — Rolll Agency
 * Design: Dark navy section with contact form and info
 */
import { useState, useRef, useEffect } from "react";
import { MapPin, Instagram, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

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

export default function ContactSection() {
  const { ref, visible } = useInView();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Lütfen zorunlu alanları doldurun.");
      return;
    }
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success("Mesajınız alındı! En kısa sürede size dönüş yapacağız.");
  };

  const inputStyle = {
    backgroundColor: "#162338",
    border: "1px solid rgba(247, 158, 2, 0.2)",
    borderRadius: "8px",
    color: "#E5E5E5",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <section
      id="iletisim"
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: "#0D1B2A" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            <div className="section-label mb-4">İletişim</div>
            <h2
              className="font-extrabold leading-tight mb-6"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                color: "#FFFFFF",
              }}
            >
              Projenizi Birlikte{" "}
              <span style={{ color: "#F79E02" }}>Hayata Geçirelim</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "rgba(229, 229, 229, 0.7)" }}
            >
              Markanız için doğru dijital çözümü bulmak için buradayız. Bize ulaşın, ihtiyaçlarınızı konuşalım ve birlikte harika işler çıkaralım.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(247, 158, 2, 0.15)" }}
                >
                  <MapPin size={20} style={{ color: "#F79E02" }} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: "#FFFFFF" }}>Konum</div>
                  <div className="text-sm" style={{ color: "rgba(229, 229, 229, 0.6)" }}>Bursa, Türkiye</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(247, 158, 2, 0.15)" }}
                >
                  <Instagram size={20} style={{ color: "#F79E02" }} />
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1" style={{ color: "#FFFFFF" }}>Instagram</div>
                  <a
                    href="https://www.instagram.com/rolllagency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(229, 229, 229, 0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F79E02")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229, 229, 229, 0.6)")}
                  >
                    @rolllagency
                  </a>
                </div>
              </div>
            </div>

            {/* Services Quick List */}
            <div
              className="mt-10 p-6 rounded-2xl"
              style={{ backgroundColor: "#162338", border: "1px solid rgba(247, 158, 2, 0.1)" }}
            >
              <div className="text-sm font-semibold mb-4" style={{ color: "#F79E02", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.1em" }}>
                HİZMETLERİMİZ
              </div>
              {["Web Sitesi Tasarımı", "Marka Kimliği Tasarımı", "Şirket Tanıtım Videosu", "Sosyal Medya İçerik Tasarımı"].map((s) => (
                <div key={s} className="flex items-center gap-2 py-2" style={{ borderBottom: "1px solid rgba(247, 158, 2, 0.07)" }}>
                  <CheckCircle size={14} style={{ color: "#F79E02" }} />
                  <span className="text-sm" style={{ color: "rgba(229, 229, 229, 0.7)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center py-16 rounded-2xl"
                style={{ backgroundColor: "#162338", border: "1px solid rgba(247, 158, 2, 0.2)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(247, 158, 2, 0.15)" }}
                >
                  <CheckCircle size={32} style={{ color: "#F79E02" }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: "#FFFFFF" }}>
                  Mesajınız Alındı!
                </h3>
                <p className="text-sm" style={{ color: "rgba(229, 229, 229, 0.7)" }}>
                  En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8"
                style={{ backgroundColor: "#162338", border: "1px solid rgba(247, 158, 2, 0.1)" }}
              >
                <h3 className="text-xl font-bold mb-6" style={{ color: "#FFFFFF" }}>
                  Bize Yazın
                </h3>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(229, 229, 229, 0.6)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}>
                      AD SOYAD *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Adınız Soyadınız"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#F79E02")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(247, 158, 2, 0.2)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(229, 229, 229, 0.6)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}>
                      E-POSTA *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@email.com"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#F79E02")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(247, 158, 2, 0.2)")}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(229, 229, 229, 0.6)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}>
                    ŞİRKET / MARKA
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Şirket veya marka adınız"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#F79E02")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(247, 158, 2, 0.2)")}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(229, 229, 229, 0.6)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}>
                    İLGİLENDİĞİNİZ HİZMET
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    style={{ ...inputStyle, appearance: "none" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#F79E02")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(247, 158, 2, 0.2)")}
                  >
                    <option value="" style={{ backgroundColor: "#162338" }}>Hizmet seçin...</option>
                    <option value="web" style={{ backgroundColor: "#162338" }}>Web Sitesi Tasarımı</option>
                    <option value="brand" style={{ backgroundColor: "#162338" }}>Marka Kimliği Tasarımı</option>
                    <option value="video" style={{ backgroundColor: "#162338" }}>Şirket Tanıtım Videosu</option>
                    <option value="social" style={{ backgroundColor: "#162338" }}>Sosyal Medya İçerik Tasarımı</option>
                    <option value="other" style={{ backgroundColor: "#162338" }}>Diğer</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(229, 229, 229, 0.6)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}>
                    MESAJINIZ *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Projeniz hakkında bize bilgi verin..."
                    rows={4}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#F79E02")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(247, 158, 2, 0.2)")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-md font-bold text-base transition-all duration-300"
                  style={{
                    backgroundColor: loading ? "rgba(247, 158, 2, 0.6)" : "#F79E02",
                    color: "#0D1B2A",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#ffb733";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = loading ? "rgba(247, 158, 2, 0.6)" : "#F79E02";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Mesaj Gönder
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
