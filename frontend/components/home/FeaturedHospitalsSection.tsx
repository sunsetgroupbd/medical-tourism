import React from "react";
import { useTranslations } from "next-intl";
import { getVerifiedHospitals } from "@/mocks/data";
import { HospitalCard } from "../cards/HospitalCard";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const FeaturedHospitalsSection: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("featuredHospitals");

  // MANDATORY BUSINESS RULE: Only verified partner hospitals from data/service layer
  const verifiedHospitals = getVerifiedHospitals();

  return (
    <section className="bg-white py-16 md:py-24 border-b border-[#E1E7E8]" id="hospitals">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#247A52] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Strict Verification Protocol</span>
            </div>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </div>
          <Button href="/hospitals" variant="outline" size="md" className="shrink-0 self-start md:self-end">
            {t("viewAllHospitals")}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        {/* Verified Hospitals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedHospitals.slice(0, 6).map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
