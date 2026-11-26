import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getSpecialties } from "@/lib/api/specialties";
import { SpecialtiesListClient } from "@/components/specialties/SpecialtiesListClient";
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
      ? "বিশেষায়িত চিকিৎসা বিভাগসমূহ | সান ব্রিজ হেলথকেয়ার"
      : "Medical Specialties & Advanced Surgery | Sun Breeze Healthcare",
    description: isBn
      ? "হৃদরোগ, ক্যান্সার, কিডনি ও লিভার ট্রান্সপ্ল্যান্ট, নিউরোসার্জারি, অর্থোপেডিকস এবং আইভিএফ চিকিৎসার শীর্ষ আন্তর্জাতিক সেন্টার।"
      : "Comprehensive medical specialties connecting Bangladeshi patients with apex tertiary hospitals across Asia and Europe.",
  };
}

export default async function SpecialtiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("specialtiesPage");
  const specialties = await getSpecialties();

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

      {/* Main Listing Area */}
      <section className="container-custom pt-10">
        <SpecialtiesListClient specialties={specialties} locale={locale} />
      </section>

      {/* Why Seek Cross-Border Care Banner */}
      <section className="container-custom mt-16">
        <div className="bg-[#102D46] text-white rounded-lg p-8 md:p-10 border border-[#183F5B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CLINICAL EXCELLENCE GUARANTEE</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {t("whyInternationalCare")}
              </h2>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                  <span>{t("whyPoint1")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                  <span>{t("whyPoint2")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                  <span>{t("whyPoint3")}</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Button href="/inquiry" variant="teal" size="lg">
                {t("whyCta")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
