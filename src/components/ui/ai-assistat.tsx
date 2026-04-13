import { FormEvent, useEffect, useRef, useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  text: string;
  isUser: boolean;
};

type AiAssistatProps = {
  placeholder?: string;
  className?: string;
  onSendMessage?: (userMessage: string, history: ChatMessage[]) => Promise<string> | string;
};

const quickPrompts = [
  "Marka kimliği süreciniz nasıl ilerliyor?",
  "Web sitesi teslim süreniz ortalama ne kadar?",
  "Hangi hizmet paketleri bizim için uygun olur?",
];

const fallbackResponse = (userMessage: string) => {
  const normalized = userMessage.toLowerCase();

  if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("selam")) {
    return "Merhaba. Rolll AI asistanı buradayım, nasıl destek olayım?";
  }

  if (normalized.includes("help") || normalized.includes("yardım")) {
    return "Web sitesi, içerik, tasarım ve teknik konularda sorularına yardımcı olabilirim.";
  }

  if (normalized.includes("thank") || normalized.includes("teşekkür")) {
    return "Rica ederim. İstersen bir sonraki adımı birlikte planlayabiliriz.";
  }

  if (normalized.includes("who are you") || normalized.includes("kimsin")) {
    return "Ben Rolll Agency sitesindeki AI asistanıyım. Hızlı ve net cevaplar için buradayım.";
  }

  return "Mesajını aldım. İstersen bunu webhook bağlantısıyla gerçek AI cevabına çevirebiliriz.";
};

const AiAssistat = ({
  placeholder = "Mesajını yaz...",
  className,
  onSendMessage,
}: AiAssistatProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    const updatedHistory: ChatMessage[] = [...messages, { text: userMessage, isUser: true }];
    setMessages(updatedHistory);

    setIsTyping(true);

    try {
      const response = onSendMessage
        ? await onSendMessage(userMessage, updatedHistory)
        : fallbackResponse(userMessage);
      const responseText =
        typeof response === "string" && response.trim()
          ? response
          : "Mesajını aldım. Webhook bağlantısı hazır olunca daha kapsamlı cevap vereceğim.";

      await new Promise((resolve) => setTimeout(resolve, onSendMessage ? 300 : 1100));
      setMessages((prev) => [...prev, { text: responseText, isUser: false }]);
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message
          ? `Webhook hatası: ${error.message}`
          : "Şu anda yanıt üretemiyorum. Birazdan tekrar deneyebilirsin.";
      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          isUser: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto h-[580px] md:h-[620px] rounded-2xl overflow-hidden flex flex-col relative",
        "border border-primary/25 shadow-[var(--shadow-card)]",
        "bg-gradient-to-br from-background via-secondary/80 to-background",
        className,
      )}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.15),transparent_35%)]" />

      <div className="p-4 flex-1 overflow-y-auto bg-background/55 relative z-10">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <Sparkles className="h-11 w-11 text-primary mb-4" />
            <h3 className="text-foreground text-2xl font-heading mb-2">Bize ulaşın, AI asistanımızdan bilgi alın</h3>
            <p className="text-foreground/65 text-sm max-w-sm mb-5 font-body">
              Hedefin, hizmetin veya web projenle ilgili bir soru sor.
            </p>

            <div className="w-full max-w-md flex flex-col gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setInput(prompt)}
                  className="text-left text-sm font-body px-3 py-2 rounded-lg border border-border bg-card/70 hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={`${msg.text}-${index}`}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={cn(
                    "max-w-[85%] p-3 rounded-2xl",
                    "animate-fade-in",
                    msg.isUser
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-card text-card-foreground rounded-tl-none border border-border",
                  )}
                >
                  <p className="text-sm leading-relaxed font-body">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 rounded-2xl bg-card text-card-foreground rounded-tl-none border border-border">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span
                      className="h-2 w-2 rounded-full bg-primary animate-pulse"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-primary animate-pulse"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "p-4 border-t transition-colors duration-200 relative z-10",
          isFocused ? "border-primary/60 bg-card/70" : "border-border bg-card/35",
        )}
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full font-body bg-background/80 border border-border rounded-full py-3 pl-4 pr-12 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring/80"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={cn(
              "absolute right-1 rounded-full p-2 transition-colors",
              !input.trim() || isTyping
                ? "text-foreground/40 bg-secondary cursor-not-allowed"
                : "text-primary-foreground bg-primary hover:bg-primary/90",
            )}
            aria-label="Mesaj gönder"
          >
            {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiAssistat;
