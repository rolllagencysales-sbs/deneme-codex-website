import crypto from "crypto";

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
      const params = new URLSearchParams(body);
      return Object.fromEntries(params.entries());
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

const resolveRedirectUrl = (baseUrl, envValue, fallbackPath) => {
  if (envValue && /^https?:\/\//i.test(envValue)) {
    return envValue;
  }

  if (envValue && envValue.startsWith("/")) {
    return baseUrl ? `${baseUrl}${envValue}` : envValue;
  }

  return baseUrl ? `${baseUrl}${fallbackPath}` : fallbackPath;
};

const verifySignature = (payload, secret) => {
  const signatureBase64 = String(payload.signature || "");
  if (!signatureBase64) {
    return false;
  }

  const rawData = `${payload.random_nr || ""}${payload.platform_order_id || ""}${payload.total_order_value || ""}${payload.currency || ""}`;
  const expected = crypto.createHmac("sha256", secret).update(rawData).digest();

  let provided;
  try {
    provided = Buffer.from(signatureBase64, "base64");
  } catch {
    return false;
  }

  if (provided.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(provided, expected);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Method Not Allowed");
  }

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
    return res.redirect(302, failUrl);
  }

  const payload = parseRequestBody(req.body);
  const verified = verifySignature(payload, apiSecret);
  const successfulPayment = String(payload.status || "").toLowerCase() === "success";

  if (verified && successfulPayment) {
    return res.redirect(302, successUrl);
  }

  return res.redirect(302, failUrl);
}
