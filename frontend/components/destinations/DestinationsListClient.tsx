"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Destination } from "@/types";
import {
  Plane,
  Clock,
  ShieldCheck,
  Building,
  Search,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

interface DestinationsListClientProps {
  destinations: Destination[];
  locale: string;
}

export const DestinationsListClient: React.FC<DestinationsListClientProps> = ({
  destinations,
  locale,
}) => {
  const t = useTranslations("destinationsPage");
  const tCommon = useTranslations("common");
  const isBn = locale === "bn";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const name = (isBn ? dest.nameBn : dest.name).toLowerCase();
      const summary = (isBn ? dest.summaryBn : dest.summary).toLowerCase();
      const specialties = (isBn ? dest.popularSpecialtiesBn : dest.popularSpecialties)
        .join(" ")
        .toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        query === "" ||
        name.includes(query) ||
        summary.includes(query) ||
        specialties.includes(query);

      const matchesFilter =
        selectedFilter === "all" || dest.slug === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [destinations, searchQuery, selectedFilter, isBn]);

  return (
    <div className="space-y-10">
      {/* Search and Filter Controls */}
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

          {/* Result Count */}
          <span className="text-xs font-semibold text-[#647580] shrink-0 self-end sm:self-center">
            {isBn
              ? `${filteredDestinations.length}টি গন্তব্য প্রদর্শিত`
              : `Showing ${filteredDestinations.length} destinations`}
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
          {destinations.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedFilter(d.slug)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                selectedFilter === d.slug
                  ? "bg-[#147D78] text-white"
                  : "bg-[#F3F6F5] text-[#172B3A] hover:bg-[#E1E7E8]"
              }`}
            >
              {isBn ? d.nameBn : d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => {
          const name = isBn ? dest.nameBn : dest.name;
          const summary = isBn ? dest.summaryBn : dest.summary;
          const flight = isBn ? dest.flightDurationFromDhakaBn : dest.flightDurationFromDhaka;
          const visaTime = isBn ? dest.visaProcessingTimeBn : dest.visaProcessingTime;
          const specialties = isBn ? dest.popularSpecialtiesBn : dest.popularSpecialties;

          return (
            <div
              key={dest.id}
              className="bg-white border border-[#E1E7E8] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#147D78] transition-all group"
            >
              <div>
                {/* Photographic Header */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={dest.image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-[#102D46] text-white text-xs font-bold px-2.5 py-1 rounded">
                    {dest.code}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#102D46]/95 text-white text-xs font-medium px-3 py-1 rounded flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{dest.verifiedHospitalsCount} {t("verifiedHospitalsCount")}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#102D46] group-hover:text-[#147D78] transition-colors">
                      {name}
                    </h3>
                    <p className="mt-2 text-sm text-[#647580] leading-relaxed line-clamp-3">
                      {summary}
                    </p>
                  </div>

                  {/* Travel & Visa Badges */}
                  <div className="space-y-2 pt-2 border-t border-[#E1E7E8] text-xs text-[#172B3A]">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-[#147D78] shrink-0" />
                      <span className="text-[#647580]">{t("flightFromDhaka")}:</span>
                      <span className="font-semibold text-[#102D46]">{flight}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#147D78] shrink-0" />
                      <span className="text-[#647580]">{t("visaProcessing")}:</span>
                      <span className="font-semibold text-[#102D46]">{visaTime}</span>
                    </div>
                    {dest.bengaliInterpreterAvailable && (
                      <div className="flex items-center gap-2 text-emerald-800">
                        <FileCheck2 className="w-3.5 h-3.5 text-[#247A52] shrink-0" />
                        <span className="font-medium text-[11px]">
                          {isBn ? "হাসপাতালে বাংলা ইন্টারপ্রেটার সাপোর্ট অন্তর্ভুক্ত" : "Bangladeshi Translation Included"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Specialties Pills */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-[#647580] uppercase tracking-wider block mb-1.5">
                      {isBn ? "শীর্ষ চিকিৎসা বিভাগসমূহ" : "Popular Specialties"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {specialties.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="text-xs bg-[#F3F6F5] text-[#172B3A] px-2.5 py-1 rounded border border-[#E1E7E8]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 pt-0 mt-2 border-t border-[#E1E7E8] flex items-center justify-between gap-3">
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#147D78] hover:text-[#105F5B] transition-colors py-2"
                >
                  <span>{t("viewDetails")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/inquiry"
                  className="text-xs font-semibold px-3 py-1.5 rounded-md bg-[#102D46] hover:bg-[#183F5B] text-white transition-colors"
                >
                  {t("requestCountryQuote")}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
