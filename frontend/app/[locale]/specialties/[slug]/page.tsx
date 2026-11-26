import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getSpecialties, getSpecialtyBySlug } from "@/lib/api/specialties";
import { getHospitalsBySpecialty } from "@/lib/api/hospitals";
import { HospitalCard } from "@/components/cards/HospitalCard";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import {
  ShieldCheck,
  CheckCircle2,
  Building,
  ArrowLeft,
  ArrowRight,
  FileText,
  Activity,
  HeartPulse,
  Brain,
  Bone,
  Stethoscope,
  Baby,
  ShieldAlert,
  MapPin,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export async function generateStaticParams() {
  const specialties = await getSpecialties();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const spec of specialties) {
      params.push({ locale, slug: spec.slug });
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
  const specialty = await getSpecialtyBySlug(slug);

  if (!specialty) {
    return {
      title: "Specialty Not Found | Sun Breeze Healthcare",
    };
  }

  const isBn = locale === "bn";
  const name = isBn ? specialty.nameBn : specialty.name;

  return {
    title: isBn
      ? `${name} উন্নত চিকিৎসা ও হাসপাতাল তালিকা | সান ব্রিজ হেলথকেয়ার`
      : `${name} Advanced Treatment & Partner Hospitals | Sun Breeze Healthcare`,
    description: isBn ? specialty.summaryBn : specialty.summary,
  };
}

export default async function SpecialtyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const specialty = await getSpecialtyBySlug(slug);

  if (!specialty) {
    notFound();
  }

  const t = await getTranslations("specialtyDetails");
  const tCommon = await getTranslations("common");
  const isBn = locale === "bn";

  const name = isBn ? specialty.nameBn : specialty.name;
  const fullDescription = isBn ? specialty.fullDescriptionBn : specialty.fullDescription;

  // MANDATORY BUSINESS RULE: Only verified partner hospitals from data/service layer
  const verifiedHospitals = await getHospitalsBySpecialty(specialty.name);

  const formattedFaq = specialty.specialtyFaq.map((faq, idx) => ({
    id: `spec-faq-${idx}`,
    question: isBn ? faq.qBn : faq.q,
    answer: isBn ? faq.aBn : faq.a,
  }));

  const renderIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-[#147D78]";
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className={iconClass} />;
      case "ShieldAlert":
        return <ShieldAlert className={iconClass} />;
      case "Activity":
        return <Activity className={iconClass} />;
      case "Brain":
        return <Brain className={iconClass} />;
      case "Bone":
        return <Bone className={iconClass} />;
      case "Stethoscope":
        return <Stethoscope className={iconClass} />;
      case "Baby":
        return <Baby className={iconClass} />;
      default:
        return <Activity className={iconClass} />;
    }
  };

  return (
    <div className="bg-[#F3F6F5] min-h-screen pb-20">
      {/* Back to Specialties Bar */}
      <div className="bg-white border-b border-[#E1E7E8] py-3.5">
        <div className="container-custom">
          <Link
            href="/specialties"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#147D78] hover:text-[#105F5B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("backToSpecialties")}</span>
          </Link>
        </div>
      </div>

      {/* Specialty Hero Banner */}
      <section className="relative bg-[#102D46] text-white overflow-hidden py-14 md:py-20 border-b border-[#183F5B]">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#183F5B] border border-white/20 text-xs font-semibold text-emerald-300 uppercase tracking-widest">
              <span>{isBn ? "টারশিয়ারি কেয়ার বিভাগ" : "TERTIARY CLINICAL DEPARTMENT"}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-white flex items-center justify-center shrink-0">
                {renderIcon(specialty.iconName)}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                {name}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-normal">
              {fullDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <Button href="/inquiry" variant="teal" size="md">
                {tCommon("freeCaseReview")}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button href="#hospitals" variant="outline" size="md" className="text-white border-white/40 hover:bg-white/10 hover:text-white">
                {t("verifiedHospitalsTitle")} ({verifiedHospitals.length})
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container-custom py-12 space-y-16">
        {/* Top Destinations for this Specialty */}
        <section className="bg-white border border-[#E1E7E8] rounded-lg p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#102D46] uppercase tracking-wider">
              {t("topDestinationsForSpecialty")}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {specialty.topCountries.map((c) => (
              <Link
                key={c.slug}
                href={`/destinations/${c.slug}`}
                className="flex items-center justify-between p-4 rounded-md border border-[#E1E7E8] bg-[#F3F6F5] hover:border-[#147D78] hover:bg-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#147D78]" />
                  <span className="font-bold text-sm text-[#102D46] group-hover:text-[#147D78]">
                    {isBn ? c.nameBn : c.name}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#647580] group-hover:translate-x-1 group-hover:text-[#147D78] transition-all" />
              </Link>
            ))}
          </div>
        </section>

        {/* Advanced Technologies & Procedures */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147D78] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? "উন্নত সার্জিক্যাল বিজ্ঞান" : "Advanced Surgical Medicine"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102D46]">
              {t("advancedProceduresTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialty.advancedProcedures.map((proc, i) => (
              <div
                key={i}
                className="bg-white border border-[#E1E7E8] rounded-lg p-6 space-y-2 hover:border-[#147D78] transition-colors"
              >
                <h3 className="text-lg font-bold text-[#102D46] leading-snug">
                  {isBn ? proc.nameBn : proc.name}
                </h3>
                <p className="text-sm text-[#647580] leading-relaxed">
                  {isBn ? proc.descriptionBn : proc.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conditions & Diagnoses Treated */}
        <section className="bg-white border border-[#E1E7E8] rounded-lg p-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#102D46]">
            {t("conditionsTreated")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {specialty.commonConditions.map((cond, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-[#172B3A]">
                <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                <span>{isBn ? cond.nameBn : cond.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Partner Hospitals Section */}
        <section className="space-y-6 scroll-mt-24" id="hospitals">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#247A52] uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{isBn ? "যাচাইকৃত হাসপাতাল নেটওয়ার্ক" : "Strict Verification Protocol"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102D46]">
                {name}-এ {t("verifiedHospitalsTitle")}
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

        {/* Required Medical Records for Case Review */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147D78] uppercase tracking-wider mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>{isBn ? "ডকুমেন্ট প্রস্তুতি" : "Document Readiness"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102D46]">
              {t("requiredRecordsTitle")}
            </h2>
            <p className="text-sm text-[#647580] mt-1">{t("requiredRecordsNotice")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialty.requiredRecords.map((rec, i) => (
              <div
                key={i}
                className="bg-white border border-[#E1E7E8] rounded-lg p-6 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#147D78] shrink-0" />
                  <h3 className="text-base font-bold text-[#102D46]">
                    {isBn ? rec.titleBn : rec.title}
                  </h3>
                </div>
                <p className="text-sm text-[#647580] leading-relaxed pl-6">
                  {isBn ? rec.descBn : rec.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        {formattedFaq.length > 0 && (
          <section className="bg-white border border-[#E1E7E8] rounded-lg p-8 space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#147D78]" />
              <h2 className="text-2xl font-bold text-[#102D46]">
                {t("specialtyFaqTitle")}
              </h2>
            </div>
            <Accordion items={formattedFaq} />
          </section>
        )}

        {/* Conversion Request Section */}
        <section className="bg-[#102D46] text-white rounded-lg p-8 md:p-12 border border-[#183F5B] text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#183F5B] text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SUN BREEZE CLINICAL LIAISON</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {name}: {t("requestSpecialtyReview")}
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
