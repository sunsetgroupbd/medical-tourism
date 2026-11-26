import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getDestinations, getDestinationBySlug } from "@/lib/api/destinations";
import { getHospitalsByCountry } from "@/lib/api/hospitals";
import { HospitalCard } from "@/components/cards/HospitalCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Plane,
  Clock,
  ShieldCheck,
  Building,
  Coins,
  Languages,
  CheckCircle2,
  FileCheck2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  const destinations = await getDestinations();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const dest of destinations) {
      params.push({ locale, slug: dest.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: "Destination Not Found | Sun Breeze Healthcare",
    };
  }

  const isBn = locale === "bn";
  const name = isBn ? destination.nameBn : destination.name;

  return {
    title: isBn
      ? `${name} চিকিৎসা পর্যটন ও হাসপাতাল তালিকা | সান ব্রিজ হেলথকেয়ার`
      : `${name} Medical Travel & Verified Hospitals | Sun Breeze Healthcare`,
    description: isBn ? destination.summaryBn : destination.summary,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const t = await getTranslations("destinationDetails");
  const tCommon = await getTranslations("common");
  const isBn = locale === "bn";

  const name = isBn ? destination.nameBn : destination.name;
  const fullOverview = isBn ? destination.fullOverviewBn : destination.fullOverview;
  const flight = isBn ? destination.flightDurationFromDhakaBn : destination.flightDurationFromDhaka;
  const visaTime = isBn ? destination.visaProcessingTimeBn : destination.visaProcessingTime;
  const specialties = isBn ? destination.popularSpecialtiesBn : destination.popularSpecialties;

  // MANDATORY BUSINESS RULE: Only verified partner hospitals from data/service layer
  const verifiedHospitals = await getHospitalsByCountry(destination.name);

  return (
    <div className="bg-[#F3F6F5] min-h-screen pb-20">
      {/* Back to Listing Bar */}
      <div className="bg-white border-b border-[#E1E7E8] py-3.5">
        <div className="container-custom">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#147D78] hover:text-[#105F5B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("backToDestinations")}</span>
          </Link>
        </div>
      </div>

      {/* Destination Hero Banner */}
      <section className="relative bg-[#102D46] text-white overflow-hidden py-14 md:py-20 border-b border-[#183F5B]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={destination.heroImage || destination.image}
            alt={name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#183F5B] border border-white/20 text-xs font-semibold text-emerald-300 uppercase tracking-widest">
              <span>{destination.code}</span>
              <span>•</span>
              <span>{isBn ? "আন্তর্জাতিক চিকিৎসা কেন্দ্র" : "GLOBAL HEALTHCARE DESTINATION"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {name}
            </h1>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal">
              {fullOverview}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button href="/inquiry" variant="teal" size="md">
                {tCommon("freeCaseReview")}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button href="#hospitals" variant="outline" size="md" className="text-white border-white/40 hover:bg-white/10 hover:text-white">
                {t("verifiedHospitals")} ({verifiedHospitals.length})
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Logistics Facts Strip */}
      <section className="bg-white border-b border-[#E1E7E8] py-6">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-md bg-[#F3F6F5] border border-[#E1E7E8] flex items-center justify-center shrink-0">
                <Plane className="w-4 h-4 text-[#147D78]" />
              </div>
              <div>
                <span className="text-xs text-[#647580] block font-medium">{t("flightDuration")}</span>
                <span className="font-bold text-[#102D46]">{flight}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-md bg-[#F3F6F5] border border-[#E1E7E8] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#147D78]" />
              </div>
              <div>
                <span className="text-xs text-[#647580] block font-medium">{t("visaProcessingTime")}</span>
                <span className="font-bold text-[#102D46]">{visaTime}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-md bg-[#F3F6F5] border border-[#E1E7E8] flex items-center justify-center shrink-0">
                <Coins className="w-4 h-4 text-[#147D78]" />
              </div>
              <div>
                <span className="text-xs text-[#647580] block font-medium">{t("currency")}</span>
                <span className="font-bold text-[#102D46]">{destination.currency}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-md bg-[#F3F6F5] border border-[#E1E7E8] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-4 h-4 text-[#147D78]" />
              </div>
              <div>
                <span className="text-xs text-[#647580] block font-medium">{t("bengaliInterpreter")}</span>
                <span className="font-bold text-[#247A52] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {destination.bengaliInterpreterAvailable ? t("available") : t("notAvailable")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-custom py-12 space-y-16">
        {/* Clinical Highlights & Specialties */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147D78] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? "ক্লিনিক্যাল শ্রেষ্ঠত্ব" : "Clinical Excellence"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102D46]">
              {t("clinicalStrengths")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.clinicalHighlights.map((hl, i) => (
              <div
                key={i}
                className="bg-white border border-[#E1E7E8] rounded-lg p-6 space-y-2 hover:border-[#147D78] transition-colors"
              >
                <h3 className="text-lg font-bold text-[#102D46]">
                  {isBn ? hl.titleBn : hl.title}
                </h3>
                <p className="text-sm text-[#647580] leading-relaxed">
                  {isBn ? hl.descriptionBn : hl.description}
                </p>
              </div>
            ))}
          </div>

          {/* Specialties Pills */}
          <div className="bg-white border border-[#E1E7E8] rounded-lg p-6">
            <h4 className="text-xs font-bold text-[#102D46] uppercase tracking-wider mb-3">
              {isBn ? "জনপ্রিয় চিকিৎসা সুবিধাসমূহ" : "Key Specialties Offered"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <span
                  key={spec}
                  className="text-xs font-medium bg-[#F3F6F5] text-[#172B3A] px-3 py-1.5 rounded border border-[#E1E7E8]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Verified Hospitals Section */}
        <section className="space-y-6 scroll-mt-24" id="hospitals">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#247A52] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{isBn ? "যাচাইকৃত হাসপাতাল নেটওয়ার্ক" : "Strict Verification Protocol"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102D46]">
                {name}-এ {t("verifiedHospitals")}
              </h2>
            </div>
            <span className="text-xs text-[#647580]">
              {verifiedHospitals.length} {isBn ? "টি অনুমোদিত হাসপাতাল" : "accredited facilities"}
            </span>
          </div>

          {verifiedHospitals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedHospitals.map((hosp) => (
                <HospitalCard key={hosp.id} hospital={hosp} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#E1E7E8] rounded-lg p-8 text-center text-[#647580]">
              <p className="text-sm">{t("noHospitalsFound")}</p>
            </div>
          )}
        </section>

        {/* Medical Travel & Visa Guidance */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147D78] uppercase tracking-wider mb-1">
              <Building className="w-3.5 h-3.5" />
              <span>{isBn ? "লজিস্টিকস ও পরামর্শ" : "Logistics & Travel Coordination"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102D46]">
              {t("travelGuidance")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.travelTips.map((tip, i) => (
              <div
                key={i}
                className="bg-white border border-[#E1E7E8] rounded-lg p-6 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                  <h3 className="text-base font-bold text-[#102D46]">
                    {isBn ? tip.titleBn : tip.title}
                  </h3>
                </div>
                <p className="text-sm text-[#647580] leading-relaxed pl-6">
                  {isBn ? tip.descBn : tip.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conversion Request Section */}
        <section className="bg-[#102D46] text-white rounded-lg p-8 md:p-12 border border-[#183F5B] text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#183F5B] text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SUN BREEZE MEDICAL CONCIERGE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {name}-এ {t("requestQuoteForCountry")}
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t("quoteDescription")}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/inquiry" variant="teal" size="lg">
              {t("requestCta")}
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="text-white border-white/40 hover:bg-white/10 hover:text-white"
            >
              {tCommon("contactCounsellor")}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
