import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";

interface TermsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalPage" });

  return {
    title: `${t("termsTitle")} | Sun Breeze Healthcare`,
    description: t("termsSubtitle"),
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalPage" });

  return (
    <div className="bg-[#F3F6F5] min-h-screen py-10 lg:py-16">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-2xs space-y-4">
          <Badge variant="verified" size="sm">
            {t("lastUpdated")}
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#172B3A] tracking-tight">
            {t("termsTitle")}
          </h1>
          <p className="text-sm text-[#647580] leading-relaxed">
            {t("termsSubtitle")}
          </p>
        </div>

        <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-2xs space-y-8 text-sm text-[#172B3A] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#102D46]">
              1. Nature of Medical Tourism Facilitation
            </h2>
            <p className="text-xs text-[#647580] leading-relaxed">
              Sun Breeze Healthcare functions as an independent, institutional healthcare concierge and patient facilitation agency based in Bangladesh. We facilitate cross-border hospital introductions, preliminary clinical evaluations, medical visa invitation letters, and travel logistics. We are not a licensed hospital; all clinical diagnoses, invasive surgeries, and pharmaceutical treatments are rendered solely by accredited partner tertiary hospitals.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#102D46]">
              2. Transparent Hospital Billing Policy (Zero Agency Markup)
            </h2>
            <p className="text-xs text-[#647580] leading-relaxed">
              Patients pay medical costs directly to the treating international hospital at official hospital tariff rates. Sun Breeze Healthcare does not inflate treatment fees, add hidden surcharges, or deduct markups from hospital invoices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#102D46]">
              3. Clinical Quotations as Preliminary Estimates
            </h2>
            <p className="text-xs text-[#647580] leading-relaxed">
              Treatment quotations and length-of-stay estimates issued prior to travel are based on the diagnostic summaries submitted by the patient. The final clinical treatment plan and billing remain subject to in-person diagnostic confirmation, physician evaluation, and intra-operative clinical findings at the hospital.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#102D46]">
              4. Patient Commitments & Travel Preparedness
            </h2>
            <p className="text-xs text-[#647580] leading-relaxed">
              Patients are responsible for providing authentic, up-to-date diagnostic records, maintaining valid passports with at least 6 months validity, and complying with the sovereign immigration laws of the destination country.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
