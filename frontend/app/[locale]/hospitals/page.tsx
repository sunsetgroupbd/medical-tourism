import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Check, DollarSign, ShieldCheck } from "lucide-react";
import { getHospitals } from "@/lib/api/hospitals";
import { HospitalsListClient } from "@/components/hospitals/HospitalsListClient";

interface HospitalsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: HospitalsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hospitalsPage" });

  return {
    title: `${t("title")} | Sun Breeze Healthcare`,
    description: t("subtitle"),
  };
}

export default async function HospitalsPage({ params }: HospitalsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hospitalsPage" });

  // Strictly retrieves verified hospitals only
  const hospitals = await getHospitals();

  return (
    <div className="bg-bg-alt min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb & Introduction */}
        <div className="bg-white border border-border rounded-lg p-6 lg:p-10 shadow-2xs">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-teal bg-brand-teal/10 px-3 py-1 rounded">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{t("badge")}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
              {t("title")}
            </h1>

            <p className="text-base text-text-secondary leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Institutional Partner Verification Guarantee */}
          <div className="mt-8 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">
                  {locale === "bn" ? "প্রত্যক্ষ পার্টনারশিপ" : "Direct Partnership"}
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {locale === "bn"
                    ? "শুধুমাত্র আন্তর্জাতিকভাবে স্বীকৃত এবং যাচাইকৃত হাসপাতালের সাথে সরাসরি চুক্তি।"
                    : "Direct institutional tie-ups with strictly accredited tertiary hospitals."}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0 mt-0.5">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">
                  {locale === "bn" ? "অফিসিয়াল হাসপাতাল ট্যারিফ" : "Official Hospital Tariffs"}
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {locale === "bn"
                    ? "কোনো গোপন ফি বা কমিশন নেই। রোগী সরাসরি হাসপাতালে সরকারি মূল্যে বিল পরিশোধ করেন।"
                    : "Zero markups or hidden fees. Patients pay transparent bills directly to the hospital."}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded bg-emerald-50 text-brand-verified flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">
                  {locale === "bn" ? "ডেডিকেটেড রোগী সহায়তা" : "Dedicated Patient Advocacy"}
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {locale === "bn"
                    ? "ঢাকা ও চট্টগ্রামে সরাসরি কনসালটেশন থেকে শুরু করে বিদেশে ভর্তি ও ডিসচার্জ সমন্বয়।"
                    : "Comprehensive care coordination from records review to visa, admission, and post-discharge."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Filter & Hospital Listing */}
        <HospitalsListClient hospitals={hospitals} />
      </div>
    </div>
  );
}
