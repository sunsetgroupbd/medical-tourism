import { Suspense } from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Check, Clock, ShieldCheck } from "lucide-react";
import { getDestinations } from "@/lib/api/destinations";
import { getHospitals } from "@/lib/api/hospitals";
import { getSpecialties } from "@/lib/api/specialties";
import { InquiryFormClient } from "@/components/inquiry/InquiryFormClient";

interface InquiryPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: InquiryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inquiryPage" });

  return {
    title: `${t("title")} | Sun Breeze Healthcare`,
    description: t("subtitle"),
  };
}

export default async function InquiryPage({ params }: InquiryPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inquiryPage" });

  const [destinations, hospitals, specialties] = await Promise.all([
    getDestinations(),
    getHospitals(),
    getSpecialties(),
  ]);

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb & Introduction */}
        <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-2xs">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#147D78] bg-[#147D78]/10 px-3 py-1 rounded">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{t("eyebrow")}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-[#172B3A] tracking-tight">
              {t("title")}
            </h1>

            <p className="text-base text-[#647580] leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 pt-6 border-t border-[#E1E7E8] grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded bg-[#147D78]/10 text-[#147D78] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-[#172B3A]">
                  {locale === "bn" ? "কোনো অ্যাকাউন্ট খোলার প্রয়োজন নেই" : "No Login Required"}
                </h4>
                <p className="text-xs text-[#647580] mt-1">
                  {locale === "bn"
                    ? "সরাসরি ফর্ম পূরণ করে জমা দিন। প্রতিটি আবেদনের জন্য তাৎক্ষণিক ট্র্যাকিং আইডি প্রদান করা হয়।"
                    : "Immediate submission without registration. Receive an official case tracking ID instantly."}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded bg-[#102D46]/10 text-[#102D46] flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-[#172B3A]">
                  {locale === "bn" ? "২৪–৪৮ ঘণ্টায় কোটেশন" : "24–48h Case Review"}
                </h4>
                <p className="text-xs text-[#647580] mt-1">
                  {locale === "bn"
                    ? "যাচাইকৃত হাসপাতাল থেকে সরাসরি চিকিৎসকের মতামত ও আনুষ্ঠানিক খরচের বিবরণ।"
                    : "Direct hospital evaluation, surgical recommendations, and itemized cost estimation."}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded bg-emerald-50 text-[#247A52] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-[#172B3A]">
                  {locale === "bn" ? "পূর্ণ গোপনীয়তা ও জিরো মার্কআপ" : "Strict Privacy & Zero Markup"}
                </h4>
                <p className="text-xs text-[#647580] mt-1">
                  {locale === "bn"
                    ? "মেডিকেল তথ্য সম্পূর্ণ সুরক্ষিত। কোনো অতিরিক্ত এজেন্সি কমিশন বা মধ্যস্থতাকারী ফি নেই।"
                    : "Encrypted records sent strictly to certified hospitals. 100% direct official hospital billing."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form Suspense wrapper for useSearchParams */}
        <Suspense
          fallback={
            <div className="bg-white border border-[#E1E7E8] rounded-lg p-12 text-center text-[#647580]">
              <div className="animate-spin w-8 h-8 border-2 border-[#102D46] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-sm">Loading inquiry system...</p>
            </div>
          }
        >
          <InquiryFormClient
            destinations={destinations}
            hospitals={hospitals}
            specialties={specialties}
          />
        </Suspense>
      </div>
    </div>
  );
}
