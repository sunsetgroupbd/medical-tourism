import React from "react";
import { useTranslations } from "next-intl";
import { specialtiesData } from "@/mocks/data";
import { SpecialtyCard } from "../cards/SpecialtyCard";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

export const SpecialtiesSection: React.FC<{ locale: string }> = ({ locale }) => {
  const t = useTranslations("specialties");

  return (
    <section className="bg-white py-16 md:py-24 border-b border-[#E1E7E8]" id="specialties">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <Button href="/specialties" variant="outline" size="md" className="shrink-0 self-start md:self-end">
            {t("viewAllSpecialties")}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>

        {/* Specialties Grid: 2 cards per row on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {specialtiesData.map((spec) => (
            <SpecialtyCard
              key={spec.id}
              specialty={spec}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
