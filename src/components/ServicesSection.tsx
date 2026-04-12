import { useReveal } from "./useReveal";

const services = [
  {
    title: "Web Sitesi Tasarımı",
    description:
      "Markanız için tamamen size özel ve tercihlerinize uygun web siteleri tasarlıyoruz. Her detayda profesyonellik ve estetiği ön planda tutuyor, güçlü SEO optimizasyonu ile arama motorlarında görünürlüğünüzü artırıyoruz.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Marka Kimliği Tasarımı",
    description:
      "Markanızın dijital ve fiziksel dünyadaki kimliğini tamamen size özel tasarlıyoruz. Logo, renk paleti, tipografi ve tüm görsel öğeler, markanızın karakterini güçlendirecek şekilde tasarlanır.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    title: "Şirket Tanıtım Videosu",
    description:
      "Markanızın hikayesini ve değerlerini etkileyici bir şekilde anlatan tamamen size özel tanıtım animasyonları hazırlıyoruz. Görsel efektler, akıcı geçişler ve yaratıcı konseptlerle desteklenir.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Sosyal Medya İçerik Tasarımı",
    description:
      "Markanızın sosyal medya hesapları için tamamen size özel içerikler tasarlıyoruz. Yaratıcı grafikler, dikkat çekici görseller ve etkileyici metinlerle etkileşiminizi artırıyoruz.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
  },
];

const ServicesSection = () => {
  const ref = useReveal();

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="reveal animate-fade-up inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary font-body text-sm font-medium mb-4">
            Hizmetlerimiz
          </span>
          <h2 className="reveal animate-fade-up stagger-1 font-heading text-3xl md:text-5xl font-bold mb-6">
            Neler <span className="text-gradient">Yapıyoruz</span>
          </h2>
          <p className="reveal animate-fade-up stagger-2 font-body text-foreground/60 text-lg max-w-2xl mx-auto">
            Sosyal medya içerik üretimi, web tasarım, marka kimliği tasarımı ve benzeri dijital
            hizmetler alanlarında uzman ekibimizle yanınızdayız.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`reveal animate-fade-up stagger-${i + 2} group p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-500`}
              style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-primary-foreground transition-transform duration-500 group-hover:scale-110"
                style={{ background: "var(--gradient-accent)" }}
              >
                {service.icon}
              </div>
              <h3 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-body text-foreground/55 leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
