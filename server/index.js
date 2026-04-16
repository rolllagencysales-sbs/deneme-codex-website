import crypto from "crypto";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);
const defaultApiUrl = "https://api.shopier.com/payment";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/pay", async (req, res) => {
  try {
    const apiKey = process.env.SHOPIER_API_KEY;
    const apiSecret = process.env.SHOPIER_API_SECRET;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({
        message: "SHOPIER_API_KEY ve SHOPIER_API_SECRET .env dosyasinda tanimli olmali.",
      });
    }

    const amount = normalizeAmount(req.body?.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: "Gecerli bir fiyat gondermelisiniz." });
    }

    const buyer = req.body?.buyer ?? {};
    const orderId = `order-${Date.now()}-${crypto.randomInt(1000, 9999)}`;

    const orderData = {
      order_id: orderId,
      amount: Number(amount.toFixed(2)),
      buyer: {
        id: Date.now(),
        name: normalizeString(buyer.name, "Musteri"),
        surname: normalizeString(buyer.surname, "Adi"),
        email: normalizeString(buyer.email, "musteri@example.com"),
        phone: normalizeString(buyer.phone, "5000000000"),
      },
      address: {
        address: normalizeString(buyer.address, "Adres bilgisi girilmedi"),
        city: normalizeString(buyer.city, "Istanbul"),
        country: normalizeString(buyer.country, "Turkey"),
        postcode: normalizeString(buyer.postcode, "34000"),
      },
      product: {
        name: normalizeString(req.body?.productName, "Hizmet"),
        type: "downloadable_virtual",
      },
      website_index: Number(process.env.SHOPIER_WEBSITE_INDEX ?? 1),
      success_url: process.env.SHOPIER_SUCCESS_URL,
      fail_url: process.env.SHOPIER_FAIL_URL,
    };

    const paymentRequest = JSON.parse(JSON.stringify(orderData));
    if (!paymentRequest.success_url) {
      delete paymentRequest.success_url;
    }
    if (!paymentRequest.fail_url) {
      delete paymentRequest.fail_url;
    }

    const apiUrl = process.env.SHOPIER_API_URL ?? defaultApiUrl;

    const response = await axios.post(apiUrl, paymentRequest, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "X-API-SECRET": apiSecret,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    const redirectUrl =
      response.data?.payment_url ?? response.data?.paymentUrl ?? response.data?.url ?? null;

    if (!redirectUrl) {
      return res.status(502).json({
        message: "Shopier yanitinda odeme linki bulunamadi.",
        providerResponse: response.data,
      });
    }

    return res.json({ redirectUrl, orderId });
  } catch (error) {
    const providerError = error.response?.data ?? error.message;
    console.error("Shopier payment error:", providerError);

    return res.status(500).json({
      message: "Odeme olusturulamadi. Shopier ayarlarinizi kontrol edin.",
      detail: providerError,
    });
  }
});

app.listen(port, () => {
  console.log(`Payment server running on http://localhost:${port}`);
});
