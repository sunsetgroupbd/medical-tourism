import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";

interface PrivacyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalPage" });

  return {
    title: `${t("privacyTitle")} | Sun Breeze Healthcare`,
    description: t("privacySubtitle"),
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
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
            {t("privacyTitle")}
          </h1>
          <p className="text-sm text-[#647580] leading-relaxed">
            {t("privacySubtitle")}
          </p>
        </div>

        <div className="bg-white border border-[#E1E7E8] rounded-lg p-6 lg:p-10 shadow-2xs space-y-8 text-sm text-[#172B3A] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#102D46]">
              1. Confidentiality of Health Records & Clinical Data
            </h2>
            <p className="text-xs text-[#647580] leading-relaxed">
              Sun Breeze Healthcare enforces strict institutional confidentiality standards regarding all patient medical histories, diagnostic laboratory reports, biopsy findings, radiological imaging, and doctor consultations. Your records are transmitted over 256-bit encrypted channels and stored strictly for medical evaluation purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#102D46]">
              2. Authorized Data Sharing with Accredited Hospitals
            </h2>
            <p className="text-xs text-[#647580] leading-relaxed">
              Diagnostic records submitted via our online case review intake or in-person at our Dhaka coordination desk are shared strictly and exclusively with certified medical boards and departmental specialists at our pre-vetted partner hospitals in China, Thailand, Malaysia, Singapore, Turkey, and India for second opinions and itemized treatment quotations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#102D46]">
              3. No Commercialization of Personal Information
            </h2>
            <p className="text-xs text-[#647580] leading-relaxed">
              We never sell, rent, monetize, or disclose your contact details or health metrics to third-party marketing firms, insurance brokers, or unauthorized intermediaries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#102D46]">
              4. Patient Rights & Record Deletion
            </h2>
            <p className="text-xs text-[#647580] leading-relaxed">
              Patients and designated legal guardians retain full rights to request verification, digital export, or permanent deletion of their archived diagnostic files at any point by contacting our Data Protection Officer at <span className="font-mono text-[#102D46]">privacy@sunbreezehealthcare.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
