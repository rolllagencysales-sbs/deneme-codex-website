import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReveal } from "./useReveal";

type PaymentFormState = {
  amount: string;
  productName: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
};

type PaymentApiResponse = {
  redirectUrl?: string;
  message?: string;
};

const initialForm: PaymentFormState = {
  amount: "",
  productName: "Web Tasarim Hizmeti",
  name: "",
  surname: "",
  email: "",
  phone: "",
};

const PaymentSection = () => {
  const ref = useReveal();
  const [form, setForm] = useState<PaymentFormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onFieldChange = (field: keyof PaymentFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const normalizedAmount = Number.parseFloat(form.amount.replace(",", "."));

    if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
      setErrorMessage("Lutfen 0'dan buyuk gecerli bir fiyat girin.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: normalizedAmount,
          productName: form.productName,
          buyer: {
            name: form.name,
            surname: form.surname,
            email: form.email,
            phone: form.phone,
          },
        }),
      });

      let data: PaymentApiResponse | null = null;
      try {
        data = (await response.json()) as PaymentApiResponse;
      } catch {
        data = null;
      }

      if (!response.ok || !data?.redirectUrl) {
        throw new Error(data?.message ?? "Odeme baglantisi olusturulamadi.");
      }

      window.location.href = data.redirectUrl;
    } catch (error) {
      const fallbackMessage = "Odeme baslatilirken bir hata olustu.";
      const errorText = error instanceof Error ? error.message : fallbackMessage;
      setErrorMessage(errorText || fallbackMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="payment" ref={ref} className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="reveal animate-fade-up inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary font-body text-sm font-medium mb-4">
            Online Odeme
          </span>
          <h2 className="reveal animate-fade-up stagger-1 font-heading text-3xl md:text-5xl font-bold mb-6">
            Fiyat Gir, <span className="text-gradient">Odemeyi Baslat</span>
          </h2>
          <p className="reveal animate-fade-up stagger-2 font-body text-foreground/60 text-lg max-w-2xl mx-auto">
            Tutar ve musteri bilgilerini girdikten sonra odeme sayfasina yonlendirilirsiniz.
          </p>
        </div>

        <div
          className="reveal animate-fade-up stagger-3 rounded-2xl border border-border p-6 md:p-8 max-w-3xl mx-auto"
          style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
        >
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="amount" className="text-sm text-foreground/75 block mb-2">
                Fiyat (TRY)
              </label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="Ornek: 1500"
                value={form.amount}
                onChange={(event) => onFieldChange("amount", event.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="productName" className="text-sm text-foreground/75 block mb-2">
                Urun/Hizmet Adi
              </label>
              <Input
                id="productName"
                type="text"
                placeholder="Ornek: Kurumsal Web Sitesi"
                value={form.productName}
                onChange={(event) => onFieldChange("productName", event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="name" className="text-sm text-foreground/75 block mb-2">
                Musteri Adi
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Ad"
                value={form.name}
                onChange={(event) => onFieldChange("name", event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="surname" className="text-sm text-foreground/75 block mb-2">
                Musteri Soyadi
              </label>
              <Input
                id="surname"
                type="text"
                placeholder="Soyad"
                value={form.surname}
                onChange={(event) => onFieldChange("surname", event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm text-foreground/75 block mb-2">
                E-posta
              </label>
              <Input
                id="email"
                type="email"
                placeholder="mail@ornek.com"
                value={form.email}
                onChange={(event) => onFieldChange("email", event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm text-foreground/75 block mb-2">
                Telefon
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="5xxxxxxxxx"
                value={form.phone}
                onChange={(event) => onFieldChange("phone", event.target.value)}
                required
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Yonlendiriliyor..." : "Kredi Karti ile Ode"}
              </Button>
            </div>

            {errorMessage ? (
              <p className="md:col-span-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
                {errorMessage}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
