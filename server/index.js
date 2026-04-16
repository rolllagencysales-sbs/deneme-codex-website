import crypto from "crypto";
import express from "express";
import dotenv from "dotenv";
import { buildShopierPaymentPayload } from "./shopierPayload.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const resolveBaseUrl = (req) => `${req.protocol}://${req.get("host")}`;

const resolveRedirectUrl = (baseUrl, envValue, fallbackPath) => {
  if (envValue && /^https?:\/\//i.test(envValue)) {
    return envValue;
  }

  if (envValue && envValue.startsWith("/")) {
    return `${baseUrl}${envValue}`;
  }

  return `${baseUrl}${fallbackPath}`;
};

const verifySignature = (payload, secret) => {
  const signatureBase64 = String(payload.signature || "");
  if (!signatureBase64) {
    return false;
  }

  const rawData = `${payload.random_nr || ""}${payload.platform_order_id || ""}${payload.total_order_value || ""}${payload.currency || ""}`;
  const expected = crypto.createHmac("sha256", secret).update(rawData).digest();

  const provided = Buffer.from(signatureBase64, "base64");
  if (provided.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(provided, expected);
};

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/pay", async (req, res) => {
  try {
    const callbackUrl =
      process.env.SHOPIER_CALLBACK_URL || `${resolveBaseUrl(req)}/api/shopier-callback`;
    const paymentData = buildShopierPaymentPayload(req.body, process.env, { callbackUrl });
    return res.json(paymentData);
  } catch (error) {
    const statusCode = Number(error.statusCode ?? 500);
    console.error("Shopier payment error:", error.message);

    return res.status(statusCode).json({
      message:
        error.message ?? "Odeme olusturulamadi. Shopier ayarlarinizi kontrol edin.",
    });
  }
});

app.post("/api/shopier-callback", (req, res) => {
  const baseUrl = resolveBaseUrl(req);
  const successUrl = resolveRedirectUrl(
    baseUrl,
    process.env.SHOPIER_SUCCESS_URL,
    "/odeme/basarili",
  );
  const failUrl = resolveRedirectUrl(
    baseUrl,
    process.env.SHOPIER_FAIL_URL,
    "/odeme/basarisiz",
  );
  const apiSecret = String(
    process.env.SHOPIER_API_SECRET || process.env.SHOPIER_CLIENT_SECRET || "",
  ).trim();

  if (!apiSecret) {
    return res.redirect(failUrl);
  }

  const verified = verifySignature(req.body ?? {}, apiSecret);
  const successfulPayment = String(req.body?.status || "").toLowerCase() === "success";

  if (verified && successfulPayment) {
    return res.redirect(successUrl);
  }

  return res.redirect(failUrl);
});

app.listen(port, () => {
  console.log(`Payment server running on http://localhost:${port}`);
});
