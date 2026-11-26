import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sun Breeze Healthcare | International Medical Tourism Concierge",
  description:
    "Connecting Bangladeshi patients with verified partner hospitals and world-class specialists in China, Thailand, Malaysia, Singapore, Turkey, and India.",
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "bn" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} data-locale={locale} data-scroll-behavior="smooth" className="h-full" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-[#172B3A]" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
