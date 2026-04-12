import AiAssistat from "@/components/ui/ai-assistat";

const WEBHOOK_URL =
  "https://mar1vb6m.rcld.app/webhook/d431e05b-c7fd-4cdc-90f1-c6d303c7c521";

const extractWebhookText = (payload: unknown): string => {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") return "";

  const data = payload as Record<string, unknown>;
  const direct =
    data.reply ??
    data.response ??
    data.message ??
    data.output ??
    data.text ??
    data.answer ??
    data.content;

  if (typeof direct === "string") return direct;

  if (Array.isArray(data.messages) && data.messages.length > 0) {
    const last = data.messages[data.messages.length - 1];
    if (typeof last === "string") return last;
    if (last && typeof last === "object" && typeof (last as Record<string, unknown>).content === "string") {
      return (last as Record<string, string>).content;
    }
  }

  return "";
};

const sendToWebhook = async (userMessage: string): Promise<string> => {
  const url = new URL(WEBHOOK_URL);
  url.searchParams.set("message", userMessage);

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const raw = await res.text();
    if (!raw.trim()) return "Webhook calisti ama bos yanit dondu.";
    let data: unknown;
    try {
      data = JSON.parse(raw) as unknown;
    } catch {
      return raw;
    }
    const parsed = extractWebhookText(data);
    return parsed || "Webhook yanit verdi ancak metin formati anlasilmadi.";
  }

  const text = await res.text();
  if (!text.trim()) return "Webhook bos bir yanit dondurdu.";

  try {
    const jsonCandidate = JSON.parse(text) as unknown;
    const parsed = extractWebhookText(jsonCandidate);
    return parsed || text;
  } catch {
    return text;
  }
};

function DemoAiAssistatBasic() {
  return <AiAssistat onSendMessage={sendToWebhook} />;
}

export { DemoAiAssistatBasic };
