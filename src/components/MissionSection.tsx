import { useReveal } from "./useReveal";

const values = [
  { title: "Hızlı Çözüm", desc: "Firmaların mevcut sorunlarını hızlı ve etkili bir şekilde çözüyoruz." },
  { title: "Dijital Erişim", desc: "Müşterilerinizin daha çok insanla temasa geçmesini sağlıyoruz." },
  { title: "Güvenilirlik", desc: "İş ahlakına bağlı, şeffaf ve profesyonel standartlarda çalışıyoruz." },
];

const MissionSection = () => {
  const ref = useReveal();

  return (
    <section id="mission" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="reveal animate-fade-up inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary font-body text-sm font-medium mb-4">
              Misyonumuz
            </span>
            <h2 className="reveal animate-fade-up stagger-1 font-heading text-3xl md:text-5xl font-bold mb-6">
              Başarıyı <span className="text-gradient">Büyütürüz</span>
            </h2>
            <p className="reveal animate-fade-up stagger-2 font-body text-foreground/60 leading-relaxed mb-6">
              Rolll Agency olarak amacımız, firmaların mevcut sorunlarını hızlı ve etkili bir
              şekilde çözerek iş süreçlerini sorunsuz hâle getirmektir. Misyonumuz, sadece hizmet
              sunmak değil; firmaların büyümesine destek olan güvenilir ve stratejik çözümler
              üretmektir.
            </p>
            <p className="reveal animate-fade-up stagger-3 font-body text-foreground/50 leading-relaxed italic border-l-2 border-primary pl-4">
              "Başarıyı büyütürüz, markayı sıfırdan kurarız."
            </p>
          </div>

          <div className="space-y-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`reveal animate-slide-left stagger-${i + 3} p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-500`}
                style={{ background: "var(--gradient-card)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-primary-foreground font-heading font-bold text-sm"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold mb-1">{v.title}</h3>
                    <p className="font-body text-foreground/55 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
