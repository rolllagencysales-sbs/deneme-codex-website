import { Bot, MessageCircle, Webhook } from "lucide-react";
import { DemoAiAssistatBasic } from "@/components/ui/demo";
import { useReveal } from "./useReveal";

const points = [
  {
    title: "Anında Ön Yanıt",
    description:
      "Ziyaretçiler temel sorularına saniyeler içinde cevap alır ve iletişim süreci hızlanır.",
    icon: MessageCircle,
  },
  {
    title: "Markaya Uyumlu Ton",
    description:
      "Asistan arayüzü Rolll Agency renkleri ve mevcut tasarım diliyle tamamen uyumlu çalışır.",
    icon: Bot,
  },
  {
    title: "Detaylı Bilgi Odaklı",
    description:
      "AI hizmeti sunmuyoruz; detaylı bilgi almak için asistanla konuşabilirsiniz.",
    icon: Webhook,
  },
];

const AiAssistantSection = () => {
  const ref = useReveal();

  return (
    <section id="ai-assistant" ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
        <div>
          <span className="reveal animate-fade-up inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium mb-4">
            Bilgilendirme Asistanı
          </span>
          <h2 className="reveal animate-fade-up stagger-1 font-heading text-3xl md:text-5xl font-bold mb-6">
            Detaylı Bilgi İçin <span className="text-gradient">AI Asistan</span>
          </h2>
          <p className="reveal animate-fade-up stagger-2 text-foreground/65 text-lg max-w-xl mb-8">
            Bu bölüm yalnızca bilgilendirme amaçlıdır. AI hizmeti sunmuyoruz; teklif, süreç ve
            hizmet detayları için AI asistanımızla konuşabilirsiniz.
          </p>

          <div className="space-y-4">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className={`reveal animate-fade-up stagger-${index + 2} p-4 rounded-xl border border-border/80 bg-card/50 flex gap-3`}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/15 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{point.title}</h3>
                    <p className="text-sm text-foreground/60">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal animate-fade-up stagger-4">
          <DemoAiAssistatBasic />
        </div>
      </div>
    </section>
  );
};

export default AiAssistantSection;
