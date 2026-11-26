import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getDestinations } from "@/lib/api/destinations";
import { DestinationsListClient } from "@/components/destinations/DestinationsListClient";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isBn = locale === "bn";
  return {
    title: isBn
      ? "আন্তর্জাতিক চিকিৎসা গন্তব্যসমূহ | সান ব্রিজ হেলথকেয়ার"
      : "International Healthcare Destinations | Sun Breeze Healthcare",
    description: isBn
      ? "চীন, থাইল্যান্ড, মালয়েশিয়া, সিঙ্গাপুর, তুরস্ক ও ভারতের শীর্ষ অ্যাক্রিডিটেড হাসপাতাল।"
      : "Explore verified partner hospitals across China, Thailand, Malaysia, Singapore, Turkey, and India.",
  };
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("destinationsPage");
  const destinations = await getDestinations();

  return (
    <div className="bg-[#F3F6F5] min-h-screen pb-20">
      {/* Page Header */}
      <section className="relative bg-white border-b border-[#E1E7E8] py-12 md:py-16 overflow-hidden">
        {/* Solid architectural corner facet */}
        <svg
          className="absolute right-0 top-0 w-80 h-full pointer-events-none hidden md:block"
          viewBox="0 0 200 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <polygon points="80,0 200,0 200,120 140,120" fill="#F3F6F5" />
        </svg>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm font-semibold text-[#147D78] tracking-widest uppercase mb-2">
              {t("eyebrow")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#102D46] tracking-tight">
              {t("title")}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#647580] leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-custom pt-10">
        <DestinationsListClient destinations={destinations} locale={locale} />
      </section>

      {/* Why Facilitate with Sun Breeze Banner */}
      <section className="container-custom mt-16">
        <div className="bg-[#102D46] text-white rounded-lg p-8 md:p-10 border border-[#183F5B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>INSTITUTIONAL COMMITMENT</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {t("whyTravelWithUs")}
              </h2>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                  <span>{t("whyTravelPoint1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                  <span>{t("whyTravelPoint2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                  <span>{t("whyTravelPoint3")}</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Button href="/inquiry" variant="teal" size="lg">
                ফ্রি কেস রিভিউ ও সহায়তা
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
