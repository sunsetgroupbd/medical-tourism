"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Hospital } from "@/types";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

interface HospitalsListClientProps {
  hospitals: Hospital[];
}

export function HospitalsListClient({ hospitals }: HospitalsListClientProps) {
  const t = useTranslations("hospitalsPage");
  const locale = useLocale();

  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique countries and specialties from verified hospitals
  const countryOptions = useMemo(() => {
    const countries = Array.from(new Set(hospitals.map((h) => h.country)));
    return ["all", ...countries];
  }, [hospitals]);

  const specialtyOptions = useMemo(() => {
    const specs = new Set<string>();
    hospitals.forEach((h) => {
      h.specialties.forEach((s) => specs.add(s));
    });
    return ["all", ...Array.from(specs)];
  }, [hospitals]);

  // Filter hospitals based on user selections
  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      const matchesCountry =
        selectedCountry === "all" ||
        h.country.toLowerCase() === selectedCountry.toLowerCase();

      const matchesSpecialty =
        selectedSpecialty === "all" ||
        h.specialties.some(
          (s) => s.toLowerCase() === selectedSpecialty.toLowerCase()
        );

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        h.name.toLowerCase().includes(q) ||
        (h.nameBn && h.nameBn.includes(q)) ||
        h.city.toLowerCase().includes(q) ||
        (h.cityBn && h.cityBn.includes(q)) ||
        h.country.toLowerCase().includes(q) ||
        (h.countryBn && h.countryBn.includes(q)) ||
        h.specialties.some((s) => s.toLowerCase().includes(q)) ||
        h.specialtiesBn.some((s) => s.includes(q));

      return matchesCountry && matchesSpecialty && matchesSearch;
    });
  }, [hospitals, selectedCountry, selectedSpecialty, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Control Bar */}
      <div className="bg-white border border-[#E1E7E8] rounded-lg p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Keyword Search */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-sm text-[#172B3A] placeholder:text-[#647580] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors"
            />
            <svg
              className="w-4 h-4 text-[#647580] absolute left-3.5 top-3.5 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-[#647580] hover:text-[#172B3A] p-1 rounded bg-white border border-[#E1E7E8] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Specialty Dropdown */}
          <div className="md:col-span-6">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F3F6F5] border border-[#E1E7E8] rounded-md text-sm text-[#172B3A] focus:outline-hidden focus:border-[#102D46] focus:bg-white transition-colors"
            >
              <option value="all">{t("allSpecialties")}</option>
              {specialtyOptions
                .filter((s) => s !== "all")
                .map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Country Filter Badges */}
        <div className="pt-2 border-t border-[#E1E7E8] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#647580] uppercase tracking-wider mr-1">
            {t("filterByCountry")}:
          </span>
          {countryOptions.map((country) => {
            const isSelected = selectedCountry === country;
            return (
              <button
                key={country}
                type="button"
                onClick={() => setSelectedCountry(country)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#102D46] text-white"
                    : "bg-[#F3F6F5] text-[#647580] hover:bg-[#E1E7E8]/60 hover:text-[#172B3A]"
                }`}
              >
                {country === "all" ? t("allDestinations") : country}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#647580]">
        <div>
          {locale === "bn" ? (
            <>
              মোট <span className="font-semibold text-[#172B3A]">{filteredHospitals.length}</span> টি যাচাইকৃত অংশীদার হাসপাতাল প্রদর্শিত হচ্ছে
            </>
          ) : (
            <>
              Showing <span className="font-semibold text-[#172B3A]">{filteredHospitals.length}</span> verified partner hospitals
            </>
          )}
        </div>
        {(selectedCountry !== "all" || selectedSpecialty !== "all" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCountry("all");
              setSelectedSpecialty("all");
              setSearchQuery("");
            }}
            className="text-[#147D78] hover:underline cursor-pointer"
          >
            {locale === "bn" ? "ফিল্টার রিসেট করুন" : "Reset Filters"}
          </button>
        )}
      </div>

      {/* Hospitals Grid */}
      {filteredHospitals.length === 0 ? (
        <div className="bg-white border border-[#E1E7E8] rounded-lg p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F3F6F5] flex items-center justify-center mx-auto text-[#647580]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#172B3A]">
            {t("noResultsTitle")}
          </h3>
          <p className="text-sm text-[#647580] max-w-md mx-auto">
            {t("noResultsDesc")}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCountry("all");
              setSelectedSpecialty("all");
              setSearchQuery("");
            }}
          >
            {locale === "bn" ? "সমস্ত হাসপাতাল দেখুন" : "View All Hospitals"}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => {
            const name = (locale === "bn" && hospital.nameBn) ? hospital.nameBn : hospital.name;
            const city = (locale === "bn" && hospital.cityBn) ? hospital.cityBn : hospital.city;
            const country = (locale === "bn" && hospital.countryBn) ? hospital.countryBn : hospital.country;
            const description = locale === "bn" ? hospital.descriptionBn : hospital.description;
            const specialtiesList = locale === "bn" ? hospital.specialtiesBn : hospital.specialties;

            return (
              <div
                key={hospital.id}
                className="bg-white border border-[#E1E7E8] rounded-lg overflow-hidden flex flex-col hover:border-[#147D78]/50 transition-colors shadow-2xs group"
              >
                {/* Hospital Photo */}
                <div className="relative h-48 w-full bg-[#102D46]/10 overflow-hidden">
                  <Image
                    src={hospital.image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-[#102D46]/90 text-white text-xs font-medium rounded-sm backdrop-blur-xs">
                      {city}, {country}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#172B3A] leading-snug group-hover:text-[#147D78] transition-colors">
                      <Link href={`/${locale}/hospitals/${hospital.slug}`}>
                        {name}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#647580] line-clamp-2 leading-relaxed">
                      {description}
                    </p>

                    {/* Accreditations */}
                    {hospital.accreditations && hospital.accreditations.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {hospital.accreditations.map((acc) => (
                          <span
                            key={acc}
                            className="inline-block text-[11px] font-semibold tracking-wide uppercase px-1.5 py-0.5 bg-[#F3F6F5] text-[#102D46] border border-[#E1E7E8]/80 rounded"
                          >
                            {acc}
                          </span>
                        ))}
                        {hospital.establishedYear && (
                          <span className="inline-block text-[11px] text-[#647580] px-1.5 py-0.5">
                            Est. {hospital.establishedYear}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Specialties Pills */}
                  <div className="space-y-2 pt-2 border-t border-[#E1E7E8]">
                    <div className="text-[11px] font-semibold text-[#647580] uppercase tracking-wider">
                      {t("featuredSpecialties")}:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {specialtiesList.slice(0, 3).map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-[#147D78]/10 text-[#147D78] font-medium rounded"
                        >
                          {spec}
                        </span>
                      ))}
                      {specialtiesList.length > 3 && (
                        <span className="text-xs px-1.5 py-0.5 text-[#647580]">
                          +{specialtiesList.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tariff Policy / Pricing Note */}
                  <div className="bg-[#F3F6F5] p-2.5 rounded text-xs text-[#647580] border border-[#E1E7E8]/60">
                    <div className="font-medium text-[#172B3A]">
                      {t("tariffGuaranteeTitle")}
                    </div>
                    <div className="text-[11px] text-[#647580]">
                      {t("contactForQuotation")}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button
                      href={`/${locale}/hospitals/${hospital.slug}`}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                    >
                      {t("viewHospitalDetails")}
                    </Button>
                    <Button
                      href={`/${locale}/inquiry?hospital=${encodeURIComponent(hospital.slug)}`}
                      variant="teal"
                      size="sm"
                      className="w-full text-xs"
                    >
                      {t("inquireHospital")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
