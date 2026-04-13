import { Bot, Info, MessageSquareText, PhoneCall, Sparkles } from "lucide-react";
import { DemoAiAssistatBasic } from "@/components/ui/demo";
import { useReveal } from "./useReveal";

const points = [
  {
    title: "Anında Bilgi",
    description: "Hizmetlerimiz, süreçlerimiz ve teklif adımları hakkında hızlı ön bilgi alın.",
    icon: MessageSquareText,
  },
  {
    title: "Doğru Yönlendirme",
    description: "Sorunuza göre sizi doğru hizmete ve doğru iletişim kanalına yönlendirir.",
    icon: Info,
  },
  {
    title: "Bize Ulaşın",
    description: "Detaylar netleştiğinde ekibimizle kolayca iletişime geçin.",
    icon: PhoneCall,
  },
];

const AiAssistantSection = () => {
  const ref = useReveal();

  return (
    <section id="ai-assistant" ref={ref} className="py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.05] to-transparent" />
      <div className="absolute -top-28 right-[-8rem] w-[26rem] h-[26rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-28 left-[-10rem] w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
        <div>
          <span className="reveal animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Bize Ulaşın
          </span>

          <h2 className="reveal animate-fade-up stagger-1 font-heading text-3xl md:text-5xl font-bold leading-tight mb-6">
            Yapay zekamızdan <span className="text-gradient">bilgi alın</span>,
            <br className="hidden md:block" />
            ardından bize kolayca ulaşın.
          </h2>

          <p className="reveal animate-fade-up stagger-2 text-foreground/70 text-lg max-w-xl mb-8">
            Bu asistan satış ürünü değil; sizi hızlıca bilgilendiren bir ön danışman alanıdır.
            Hedefinize göre doğru hizmeti öğrenin, sonra ekibimizle iletişime geçin.
          </p>

          <div className="reveal animate-fade-up stagger-3 flex flex-wrap items-center gap-3 mb-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors"
            >
              Hemen İletişime Geç
            </a>
            <span className="text-sm text-foreground/55 font-body">Sorunu yaz, yapay zekamız ilk yönlendirmeyi anında yapsın.</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className={`reveal animate-fade-up stagger-${Math.min(index + 3, 6)} p-4 rounded-xl border border-border/80 bg-card/55 backdrop-blur-sm`}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/15 text-primary mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{point.title}</h3>
                  <p className="text-sm text-foreground/65 font-body">{point.description}</p>
                </div>
              );
            })}

            <div className="reveal animate-fade-up stagger-6 p-4 rounded-xl border border-primary/25 bg-primary/[0.08] sm:col-span-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary/20 text-primary">
                  <Bot className="w-5 h-5" />
                </div>
                <p className="text-sm md:text-base text-foreground/80 font-body">
                  “Misyonumuz, hizmet paketleri, teslim süresi veya web proje detayları” gibi konularda
                  yapay zekamızdan bilgi alabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal animate-fade-up stagger-4">
          <div className="rounded-3xl p-[1px] bg-gradient-to-br from-primary/50 via-primary/20 to-transparent">
            <div className="rounded-3xl bg-background/70 backdrop-blur-xl p-3 md:p-4 border border-border/70">
              <DemoAiAssistatBasic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAssistantSection;
