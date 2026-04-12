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

const fallbackResponse = (userMessage: string) => {
  const normalized = userMessage.toLowerCase();

  if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("selam")) {
    return "Merhaba. Rolll AI asistan buradayim, nasil destek olayim?";
  }

  if (normalized.includes("help") || normalized.includes("yardim")) {
    return "Web sitesi, icerik, tasarim ve teknik konularda sorularina yardimci olabilirim.";
  }

  if (normalized.includes("thank") || normalized.includes("tesekkur")) {
    return "Rica ederim. Istersen bir sonraki adimi birlikte planlayabiliriz.";
  }

  if (normalized.includes("who are you") || normalized.includes("kimsin")) {
    return "Ben Rolll Agency sitesindeki AI asistanim. Hizli ve net cevaplar icin buradayim.";
  }

  return "Mesajini aldim. Istersen bunu webhook baglantisiyla gercek AI cevabina cevirebiliriz.";
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
          : "Mesajini aldim. Webhook baglantisi hazir olunca daha kapsamli cevap verecegim.";

      await new Promise((resolve) => setTimeout(resolve, onSendMessage ? 300 : 1100));
      setMessages((prev) => [...prev, { text: responseText, isUser: false }]);
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message
          ? `Webhook hatasi: ${error.message}`
          : "Su anda yanit uretemiyorum. Birazdan tekrar deneyebilirsin.";
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
        "w-full max-w-xl mx-auto h-[560px] md:h-[600px] rounded-2xl overflow-hidden flex flex-col",
        "border border-primary/25 shadow-[var(--shadow-card)]",
        "bg-gradient-to-br from-background via-secondary/80 to-background",
        className,
      )}
    >
      <div className="p-4 flex-1 overflow-y-auto bg-background/60">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <Sparkles className="h-11 w-11 text-primary mb-4" />
            <h3 className="text-foreground text-xl mb-2">Rolll AI asistanina hos geldin</h3>
            <p className="text-foreground/60 text-sm max-w-sm">Hedefin, hizmetin veya web projenle ilgili bir soru sor.</p>
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
                  <p className="text-sm leading-relaxed">{msg.text}</p>
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
          "p-4 border-t transition-colors duration-200",
          isFocused ? "border-primary/60 bg-card/60" : "border-border bg-card/30",
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
            aria-label="Mesaj gonder"
          >
            {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiAssistat;
