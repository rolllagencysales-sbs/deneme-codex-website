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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Sadece POST desteklenir." });
  }

  try {
    const body = parseRequestBody(req.body);
    const paymentData = buildShopierPaymentPayload(body, process.env);
    return res.status(200).json(paymentData);
  } catch (error) {
    const statusCode = Number(error.statusCode ?? 500);
    return res.status(statusCode).json({
      message:
        error.message ?? "Odeme olusturulamadi. Shopier ayarlarinizi kontrol edin.",
    });
  }
}
