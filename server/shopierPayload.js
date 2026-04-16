import crypto from "crypto";

export const SHOPIER_ACTION_URL = "https://www.shopier.com/ShowProduct/api_pay4.php";

const normalizeString = (value, fallback) => {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const normalizeAmount = (value) => {
  const amount = Number.parseFloat(String(value ?? "").replace(",", "."));
  return Number.isFinite(amount) ? amount : NaN;
};

const createHttpError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const buildShopierPaymentPayload = (body = {}, env = process.env) => {
  const apiKey = env.SHOPIER_API_KEY;
  const apiSecret = env.SHOPIER_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw createHttpError(
      500,
      "SHOPIER_API_KEY ve SHOPIER_API_SECRET tanimli olmali.",
    );
  }

  const amount = normalizeAmount(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw createHttpError(400, "Gecerli bir fiyat gondermelisiniz.");
  }

  const buyer = body.buyer ?? {};
  const buyerId = normalizeString(
    buyer.id,
    Math.floor(Date.now() / 1000).toString(),
  );
  const orderId = normalizeString(
    body.orderId,
    `order-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`,
  );
  const totalOrderValue = Number(amount.toFixed(2)).toString();
  const currency = Number(env.SHOPIER_CURRENCY ?? 0);
  const randomNr = Math.floor(Math.random() * 900000 + 100000).toString();
  const signaturePayload = `${randomNr}${orderId}${totalOrderValue}${currency}`;
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(signaturePayload)
    .digest("base64");

  const fields = {
    API_key: apiKey,
    website_index: Number(env.SHOPIER_WEBSITE_INDEX ?? 1),
    platform_order_id: orderId,
    product_name: normalizeString(body.productName, "Hizmet"),
    product_type: Number(env.SHOPIER_PRODUCT_TYPE ?? 1),
    buyer_name: normalizeString(buyer.name, "Musteri"),
    buyer_surname: normalizeString(buyer.surname, "Adi"),
    buyer_email: normalizeString(buyer.email, "musteri@example.com"),
    buyer_account_age: Number(env.SHOPIER_BUYER_ACCOUNT_AGE ?? 0),
    buyer_id_nr: buyerId,
    buyer_phone: normalizeString(buyer.phone, "5000000000"),
    billing_address: normalizeString(
      buyer.address,
      "Adres bilgisi girilmedi",
    ),
    billing_city: normalizeString(buyer.city, "Istanbul"),
    billing_country: normalizeString(buyer.country, "Turkey"),
    billing_postcode: normalizeString(buyer.postcode, "34000"),
    shipping_address: normalizeString(
      buyer.shippingAddress ?? buyer.address,
      "Adres bilgisi girilmedi",
    ),
    shipping_city: normalizeString(buyer.shippingCity ?? buyer.city, "Istanbul"),
    shipping_country: normalizeString(
      buyer.shippingCountry ?? buyer.country,
      "Turkey",
    ),
    shipping_postcode: normalizeString(
      buyer.shippingPostcode ?? buyer.postcode,
      "34000",
    ),
    total_order_value: totalOrderValue,
    currency,
    platform: Number(env.SHOPIER_PLATFORM ?? 0),
    is_in_frame: Number(env.SHOPIER_IS_IN_FRAME ?? 0),
    current_language: Number(env.SHOPIER_LANGUAGE ?? 0),
    modul_version: normalizeString(env.SHOPIER_MODULE_VERSION, "1.0.4"),
    random_nr: randomNr,
    signature,
  };

  if (env.SHOPIER_SUCCESS_URL) {
    fields.success_url = env.SHOPIER_SUCCESS_URL;
  }

  if (env.SHOPIER_FAIL_URL) {
    fields.fail_url = env.SHOPIER_FAIL_URL;
  }

  return {
    actionUrl: SHOPIER_ACTION_URL,
    orderId,
    fields,
  };
};
