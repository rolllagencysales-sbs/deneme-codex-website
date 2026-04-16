# Odeme Entegrasyonu (Shopier)

Bu projeye fiyat girilerek odeme baslatilabilen bir alan eklendi.

## 1) Ortam degiskenlerini hazirla

`.env.example` dosyasini `.env` olarak kopyala ve kendi Shopier bilgilerini gir:

```env
SHOPIER_API_KEY=your_api_key
SHOPIER_API_SECRET=your_api_secret
SHOPIER_API_URL=https://api.shopier.com/payment
SHOPIER_WEBSITE_INDEX=1
SHOPIER_SUCCESS_URL=https://rolllagency.com.tr/odeme/basarili
SHOPIER_FAIL_URL=https://rolllagency.com.tr/odeme/basarisiz
PORT=3000
```

## 2) Backend odeme sunucusunu baslat

```bash
npm run server
```

## 3) Frontend'i baslat

```bash
npm run dev
```

Ardindan `http://localhost:8080` uzerinden siteye gidip `Odeme` bolumunde fiyat girerek odeme baslatabilirsin.
