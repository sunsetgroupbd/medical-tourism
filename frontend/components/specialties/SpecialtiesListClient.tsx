"use client";

import React, { useState, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Specialty } from "@/types";
import {
  HeartPulse,
  ShieldAlert,
  Activity,
  Brain,
  Bone,
  Stethoscope,
  Baby,
  Search,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface SpecialtiesListClientProps {
  specialties: Specialty[];
  locale: string;
}

export const SpecialtiesListClient: React.FC<SpecialtiesListClientProps> = ({
  specialties,
  locale,
}) => {
  const t = useTranslations("specialtiesPage");
  const isBn = locale === "bn";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

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

  const filteredSpecialties = useMemo(() => {
    return specialties.filter((spec) => {
      const name = (isBn ? spec.nameBn : spec.name).toLowerCase();
      const summary = (isBn ? spec.summaryBn : spec.summary).toLowerCase();
      const procedures = spec.keyProcedures.join(" ").toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        query === "" ||
        name.includes(query) ||
        summary.includes(query) ||
        procedures.includes(query);

      const matchesFilter =
        selectedFilter === "all" || spec.slug === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [specialties, searchQuery, selectedFilter, isBn]);

  return (
    <div className="space-y-10">
      {/* Search and Department Filter Controls */}
      <div className="bg-white p-5 rounded-lg border border-[#E1E7E8] space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-[#647580] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-[#E1E7E8] focus:outline-none focus:border-[#147D78] focus:ring-1 focus:ring-[#147D78] bg-[#F3F6F5]/50 text-[#172B3A]"
            />
          </div>

          {/* Counter */}
          <span className="text-xs font-semibold text-[#647580] shrink-0 self-end sm:self-center">
            {isBn
              ? `${filteredSpecialties.length}টি বিভাগ প্রদর্শিত`
              : `Showing ${filteredSpecialties.length} departments`}
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E1E7E8]">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
              selectedFilter === "all"
                ? "bg-[#102D46] text-white"
                : "bg-[#F3F6F5] text-[#172B3A] hover:bg-[#E1E7E8]"
            }`}
          >
            {t("allFilter")}
          </button>
          {specialties.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedFilter(s.slug)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                selectedFilter === s.slug
                  ? "bg-[#147D78] text-white"
                  : "bg-[#F3F6F5] text-[#172B3A] hover:bg-[#E1E7E8]"
              }`}
            >
              {isBn ? s.nameBn : s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Specialty Cards Grid: 2 cards per row on mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
        {filteredSpecialties.map((spec) => {
          const name = isBn ? spec.nameBn : spec.name;
          const summary = isBn ? spec.summaryBn : spec.summary;

          return (
            <div
              key={spec.id}
              className="bg-white border border-[#E1E7E8] rounded-lg p-3.5 sm:p-6 flex flex-col justify-between hover:border-[#147D78] transition-all group"
            >
              <div>
                {/* Icon and Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-[#F3F6F5] border border-[#E1E7E8] flex items-center justify-center group-hover:bg-[#147D78]/10 group-hover:border-[#147D78]/30 transition-colors">
                    {renderIcon(spec.iconName)}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#147D78] bg-[#147D78]/10 px-1.5 sm:px-2 py-0.5 rounded border border-[#147D78]/20 hidden xs:inline-block">
                    {isBn ? "টারশিয়ারি কেয়ার" : "Tertiary Care"}
                  </span>
                </div>

                <h3 className="text-sm sm:text-xl font-bold text-[#102D46] group-hover:text-[#147D78] transition-colors leading-snug">
                  {name}
                </h3>

                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#647580] leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {summary}
                </p>

                {/* Key Procedures (hidden on mobile 2-col to keep heights balanced) */}
                <div className="mt-4 pt-3 border-t border-[#E1E7E8] space-y-2 hidden sm:block">
                  <span className="text-[11px] font-semibold text-[#647580] uppercase tracking-wider block">
                    {t("keyProcedures")}
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#172B3A]">
                    {spec.keyProcedures.map((proc) => (
                      <li key={proc} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#147D78] shrink-0" />
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Top Countries Tags (hidden on mobile 2-col to keep clean) */}
                <div className="mt-4 pt-3 border-t border-[#E1E7E8] hidden sm:block">
                  <span className="text-[11px] font-semibold text-[#647580] uppercase tracking-wider block mb-1.5">
                    {t("topDestinations")}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {spec.topCountries.map((c) => (
                      <span
                        key={c.slug}
                        className="inline-flex items-center gap-1 text-[11px] bg-[#F3F6F5] text-[#102D46] px-2 py-0.5 rounded border border-[#E1E7E8]"
                      >
                        <MapPin className="w-2.5 h-2.5 text-[#147D78]" />
                        {isBn ? c.nameBn : c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-[#E1E7E8]">
                <Link
                  href={`/specialties/${spec.slug}`}
                  className="w-full inline-flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#102D46] group-hover:text-[#147D78] transition-colors py-1"
                >
                  <span className="truncate">{t("viewDepartmentDetails")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
