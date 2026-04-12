import { useReveal } from "./useReveal";

const AboutSection = () => {
  const ref = useReveal();

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="reveal animate-fade-up inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary font-body text-sm font-medium mb-4">
            Biz Kimiz
          </span>
          <h2 className="reveal animate-fade-up stagger-1 font-heading text-3xl md:text-5xl font-bold mb-6">
            Dijital Dünyada <span className="text-gradient">Güçlü Kimlikler</span> Yaratıyoruz
          </h2>
          <p className="reveal animate-fade-up stagger-2 font-body text-foreground/60 text-lg max-w-3xl mx-auto leading-relaxed">
            2026 yılında Bursa'da kurulan Rolll Agency, markaların dijital dünyada güçlü ve etkileyici bir kimliğe sahip olmasını sağlayan yaratıcı bir ajanstır.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="reveal animate-slide-right stagger-3 p-8 rounded-2xl border border-border"
            style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--gradient-accent)" }}>
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className="font-heading text-2xl font-bold mb-4">Yaratıcılık ve Strateji</h3>
            <p className="font-body text-foreground/60 leading-relaxed">
              Her projede, markanın hedef kitlesini anlamak, estetik ve işlevselliği birleştirmek ve özgün çözümler sunmak önceliğimizdir. Amacımız sadece tasarım yapmak değil; markaların dijital dünyada fark edilmesini sağlayan, akılda kalıcı ve etkili bir deneyim yaratmaktır.
            </p>
          </div>

          <div
            className="reveal animate-slide-left stagger-4 p-8 rounded-2xl border border-border"
            style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--gradient-accent)" }}>
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="font-heading text-2xl font-bold mb-4">Başarı Odaklı Çözümler</h3>
            <p className="font-body text-foreground/60 leading-relaxed">
              Rolll Agency olarak, her adımda yenilikçi, stratejik ve yaratıcı yaklaşımlarımızla müşterilerimizin başarısını büyütmeyi hedefliyoruz. Çözümlerimiz her zaman markanızın hedefleriyle uyumlu ve sonuç odaklıdır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
