import express from "express";
import dotenv from "dotenv";
import { buildShopierPaymentPayload } from "./shopierPayload.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/pay", async (req, res) => {
  try {
    const paymentData = buildShopierPaymentPayload(req.body, process.env);
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

app.listen(port, () => {
  console.log(`Payment server running on http://localhost:${port}`);
});
