import { buildShopierPaymentPayload } from "../server/shopierPayload.js";

const parseRequestBody = (body) => {
  if (!body) {
    return {};
  }

  if (typeof body === "object") {
    return body;
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return {};
};

const resolveBaseUrl = (req) => {
  const protocolHeader = String(req.headers["x-forwarded-proto"] || "https");
  const protocol = protocolHeader.split(",")[0].trim();
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "").trim();

  if (!host) {
    return "";
  }

  return `${protocol}://${host}`;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Sadece POST desteklenir." });
  }

  try {
    const body = parseRequestBody(req.body);
    const baseUrl = resolveBaseUrl(req);
    const callbackUrl = process.env.SHOPIER_CALLBACK_URL || (baseUrl ? `${baseUrl}/api/shopier-callback` : "");
    const paymentData = buildShopierPaymentPayload(body, process.env, { callbackUrl });
    return res.status(200).json(paymentData);
  } catch (error) {
    const statusCode = Number(error.statusCode ?? 500);
    return res.status(statusCode).json({
      message:
        error.message ?? "Odeme olusturulamadi. Shopier ayarlarinizi kontrol edin.",
    });
  }
}
